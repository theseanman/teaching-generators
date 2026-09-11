import pymupdf, json
def blanks(pdf):
    doc=pymupdf.open(pdf); runs=[]
    for pno,p in enumerate(doc):
        d=p.get_text('rawdict')
        prs=[]
        for b in d['blocks']:
            for l in b.get('lines',[]):
                for s in l['spans']:
                    cur=None
                    for c in s['chars']:
                        if c['c']=='_':
                            x0,y0,x1,y1=c['bbox']
                            if cur and abs(x0-cur[2])<3: cur[2]=x1
                            else:
                                if cur: prs.append(cur)
                                cur=[x0,y0,x1,y1]
                        else:
                            if cur: prs.append(cur); cur=None
                    if cur: prs.append(cur)
        # merge runs on the same baseline that touch
        prs.sort(key=lambda r:(round(r[3]),r[0])); m=[]
        for r in prs:
            if m and abs(m[-1][3]-r[3])<2 and r[0]-m[-1][2]<4: m[-1][2]=max(m[-1][2],r[2])
            else: m.append(r)
        for r in m: runs.append({'page':pno,'rect':r})
    return runs
if __name__=='__main__':
    r=blanks('out/ELL3_U01_Worksheet_L02_ColdStartFirstReading_v2.pdf'); man=json.load(open('out/manifest.json'))
    print(len(r),len(man))
    for a,b in list(zip(man,r))[:12]: print(a,b['page'],[round(x) for x in b['rect']])
