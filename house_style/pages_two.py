# Two-level courses (ELL 1/2): rasterize each level's worksheet PDF into ws/ and write previews.json {sheets:[{lvl,pages}]} + sizes.json.
# Walkthroughs and reveals are TYPED on slides from lesson data, so only full-page images are needed.
import sys, os, glob, json, subprocess, pymupdf
from PIL import Image
LESSON, ODIR = sys.argv[1], sys.argv[2]; OUT = f'{ODIR}/ws'; os.makedirs(OUT, exist_ok=True)
sheets = json.loads(subprocess.check_output(['node', '-e', f"console.log(JSON.stringify(require(require('path').resolve('{LESSON}')).sheets))"]))
res = {'sheets': []}
for sh in sheets:
    pdf = [p for p in glob.glob(f'{ODIR}/*_Worksheet_*_{sh["suffix"]}.pdf')][0]
    pages = []
    for i, p in enumerate(pymupdf.open(pdf)):
        f = f'{sh["suffix"]}-page-{i+1}.png'; p.get_pixmap(dpi=200).save(f'{OUT}/{f}'); pages.append(f)
    res['sheets'].append({'lvl': sh['lvl'], 'pages': pages}); print(sh['lvl'], len(pages), 'pages')
json.dump(res, open(f'{OUT}/previews.json', 'w'), indent=1)
json.dump({os.path.basename(f): Image.open(f).size for f in glob.glob(f'{OUT}/*.png')}, open(f'{OUT}/sizes.json', 'w'))
