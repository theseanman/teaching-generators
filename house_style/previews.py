import pymupdf, json, re, os
from PIL import Image, ImageDraw, ImageFont
from locate import blanks
import sys, glob
LESSON, ODIR = sys.argv[1], sys.argv[2]
PDF=glob.glob(f'{ODIR}/*_Worksheet_*.pdf')[0]; OUT=f'{ODIR}/ws'; os.makedirs(OUT,exist_ok=True)
DPI=200; K=DPI/72
D=json.loads(os.popen(f"node -e \"console.log(JSON.stringify(require(require('path').resolve('{LESSON}')).worksheet))\"").read())
man=json.load(open(f'{ODIR}/manifest.json'))
runs=[r for r in blanks(PDF) if r['rect'][2]-r['rect'][0]>40]
assert len(runs)==len(man),(len(runs),len(man))
for m,r in zip(man,runs): m.update(r)
doc=pymupdf.open(PDF)
pages=[]
for i,p in enumerate(doc):
    pix=p.get_pixmap(dpi=DPI); f=f'{OUT}/page-{i+1}.png'; pix.save(f); pages.append(f)
# headings and item starts
heads={}; starts=[]; bottoms={}
for pno,p in enumerate(doc):
    bot=0
    for b in p.get_text('dict')['blocks']:
        for l in b.get('lines',[]):
            t=''.join(s['text'] for s in l['spans']).strip(); y0=l['bbox'][1]; y1=l['bbox'][3]
            if y0>740 or y0<45: continue
            bot=max(bot,y1)
            mm=re.match(r'^Part ([A-Z]) \u2014',t)
            if mm and l['bbox'][0]<60: heads[mm.group(1)]=(pno,y0)
            if re.match(r'^(Ex\.|\d+\.)',t) and l['bbox'][0]<62: starts.append((pno,y0))
    # include check-box table rows / lines
    bottoms[pno]=bot
for m in man: bottoms[m['page']]=max(bottoms[m['page']],m['rect'][3])
order=[p['id'] for p in D['parts']]
def pos(pp): return pp[0]*10000+pp[1]
segs={}
for i,pid in enumerate(order):
    a=heads[pid]; b=heads[order[i+1]] if i+1<len(order) else (len(doc)-1,bottoms[len(doc)-1]+8)
    out=[]
    for pno in range(a[0],b[0]+1):
        y0=a[1]-6 if pno==a[0] else 45
        y1=(b[1]-10) if pno==b[0] and i+1<len(order) else bottoms[pno]+8
        if pno==b[0] and i+1==len(order): y1=bottoms[pno]+8
        if y1-y0>20: out.append([pno,y0,y1])
    segs[pid]=out
MAXH=390
import math
kinds={p['id']:p['kind'] for p in D['parts']}
chunks={}
for pid,ss in segs.items():
    cl=[]
    for pno,y0,y1 in ss:
        br=sorted(y-4 for (pp,y) in starts if pp==pno and y0+15<y<y1)
        mx=280 if kinds[pid]=='lines' else MAXH  # long written Parts are cut smaller so type stays readable
        n=math.ceil((y1-y0)/mx); cuts=[y0]
        for j in range(1,n):
            t=y0+(y1-y0)*j/n; c=min(br,key=lambda b:abs(b-t)) if br else t
            if c>cuts[-1]+20: cuts.append(c)
        cuts.append(y1)
        for a,b in zip(cuts,cuts[1:]): cl.append([pno,a,b])
    chunks[pid]=cl
X0,X1=38,574
FB=ImageFont.truetype('/usr/share/fonts/truetype/crosextra/Carlito-Bold.ttf',int(14.5*K))
INKB=(21,101,192)
def crop(pno,y0,y1,fills=()):
    im=Image.open(pages[pno]).convert('RGB'); dr=ImageDraw.Draw(im)
    for m,text in fills: draw_answer(dr,m,text)
    return im.crop((int(X0*K),int(y0*K),int(X1*K),int(y1*K)))
def draw_answer(dr,lines,text):
    # lines: list of manifest entries (rects) to write across in order
    words=text.split(); li=0
    while words and li<len(lines):
        r=lines[li]['rect']; x=r[0]+6; maxw=(r[2]-r[0]-10)*K; cur=''
        while words:
            t=(cur+' '+words[0]).strip()
            if dr.textlength(t,font=FB)<=maxw: cur=t; words.pop(0)
            else: break
        dr.text((x*K,(r[3]-4.5)*K),cur,font=FB,fill=INKB,anchor='ls'); li+=1
    assert not words, ('overflow',text)
def slots(pid):
    return {}
res={'pages':[os.path.basename(p) for p in pages],'parts':{}}
for part in D['parts']:
    pid=part['id']; ents=[m for m in man if m['part']==pid]
    def chunk_of(pno,y):
        for ci,(cp,a,b) in enumerate(chunks[pid]):
            if cp==pno and a<=y<=b: return ci
    info={'chunks':[],'reveals':[]}
    for ci,(pno,a,b) in enumerate(chunks[pid]):
        f=f'{OUT}/part{pid}-c{ci+1}.png'; crop(pno,a,b).save(f); info['chunks'].append(os.path.basename(f))
    items=part.get('items',[])
    if part['kind'] in ('cloze','lines') and items and 'ans' in items[0]:
        filled=[]
        for k,it in enumerate(items):
            ls=[m for m in ents if m['slot']==k]
            filled.append((ls,it['ans']))
            ci=chunk_of(ls[0]['page'],ls[0]['rect'][1]); pno,a,b=chunks[pid][ci]
            vis=[(l,t) for (l,t) in filled if chunk_of(l[0]['page'],l[0]['rect'][1])==ci]
            f=f'{OUT}/part{pid}-r{k+1}.png'; crop(pno,a,b,vis).save(f)
            info['reveals'].append({'file':os.path.basename(f),'n':k+1,'ans':it['ans'],'chunk':ci})
    res['parts'][pid]=info
json.dump(res,open(f'{OUT}/previews.json','w'),indent=1)
for pid,v in res['parts'].items(): print(pid,len(v['chunks']),'chunks',len(v['reveals']),'reveals',[ [round(x) for x in c] for c in chunks[pid]])

from PIL import Image as _I
json.dump({os.path.basename(f):_I.open(f).size for f in glob.glob(f'{OUT}/*.png')},open(f'{OUT}/sizes.json','w'))
