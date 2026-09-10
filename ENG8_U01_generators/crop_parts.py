import sys, subprocess, re, os
from pathlib import Path
import fitz  # PyMuPDF

OUT=Path("wsassets"); OUT.mkdir(exist_ok=True)
for n in range(1,15):
    nn=f"{n:02d}"
    pdf=Path("out")/f"ENG8_U01_L{nn}_Worksheet_v1.pdf"
    if not pdf.exists(): continue
    doc=fitz.open(pdf)
    # gather Part heading rects across pages
    heads=[]  # (page_idx, letter, y0)
    for pi,page in enumerate(doc):
        for blk in page.get_text("dict")["blocks"]:
            for line in blk.get("lines",[]):
                txt="".join(s["text"] for s in line["spans"]).strip()
                m=re.match(r"Part\s+([A-Z])\b", txt)
                if m:
                    heads.append((pi, m.group(1), line["bbox"][1]))
    # for each heading, crop from its y to the next heading's y (or page bottom)
    for i,(pi,letter,y0) in enumerate(heads):
        page=doc[pi]
        H=page.rect.height; Wd=page.rect.width
        # end: next heading on same page, else bottom margin
        y1=H-54
        for (pj,l2,yy) in heads[i+1:]:
            if pj==pi and yy>y0: y1=yy-6; break
            if pj>pi: break
        y0c=max(0,y0-10)
        clip=fitz.Rect(48, y0c, Wd-48, y1)
        pix=page.get_pixmap(matrix=fitz.Matrix(130/72,130/72), clip=clip)
        pix.save(str(OUT/f"L{nn}-part{letter}.png"))
    print(f"L{nn}: {len(heads)} parts -> {[h[1] for h in heads]}")
