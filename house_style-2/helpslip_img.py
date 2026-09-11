# Renders one blank help slip and one filled sample (from the course file) as PNGs for the routine slides.
import sys, json, os, subprocess
from PIL import Image, ImageDraw, ImageFont
code, odir = sys.argv[1], sys.argv[2]
C = json.loads(subprocess.check_output(['node', '-e', f"console.log(JSON.stringify(require('./courses/{code}.js')))"]))
pdf = f'{odir}/{code}_HelpSlip_4perPage_v1.pdf'
subprocess.run(['pdftoppm', '-png', '-r', '200', '-f', '1', '-l', '1', pdf, f'{odir}/hs'], check=True)
page = [f for f in os.listdir(odir) if f.startswith('hs-')][0]
blank = Image.open(f'{odir}/{page}').convert('RGB').crop((92, 92, 858, 1072))
os.makedirs(f'{odir}/ws', exist_ok=True); blank.save(f'{odir}/ws/helpslip.png')
s = C['helpSlip']['sample']; im = blank.copy(); d = ImageDraw.Draw(im)
f = ImageFont.truetype('/usr/share/fonts/truetype/crosextra/Carlito-BoldItalic.ttf', 30); B = (21, 101, 192)
d.text((135, 178), s['name'], font=f, fill=B, anchor='ls'); d.text((460, 178), s['date'], font=f, fill=B, anchor='ls')
d.line((223, 303, 230, 311), fill=B, width=4); d.line((230, 311, 241, 294), fill=B, width=4)   # ticks 'sentence'
d.text((266, 386), s['need'], font=f, fill=B, anchor='ls')
for i, q in enumerate(s['question'][:2]): d.text((50, 545 + 82 * i), q, font=f, fill=B, anchor='ls')
for i, r in enumerate(s['reply'][:2]): d.text((66, 800 + 45 * i), r, font=f, fill=(11, 44, 77), anchor='ls')
im.save(f'{odir}/ws/helpslip-filled.png')
print('help slip images ok')
