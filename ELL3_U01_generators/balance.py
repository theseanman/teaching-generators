import subprocess, glob, os, sys, re, json
from xml.etree import ElementTree as ET
out = sys.argv[1]
SOFF = ["python", "/mnt/skills/public/docx/scripts/office/soffice.py", "--headless", "--convert-to", "pdf"]
def render(docx):
    subprocess.run(SOFF + [os.path.basename(docx)], cwd=os.path.dirname(docx), capture_output=True)
    pdf = docx[:-5] + ".pdf"
    bbox = subprocess.run(["pdftotext", "-bbox-layout", pdf, "-"], capture_output=True, text=True).stdout
    pages = list(ET.fromstring(bbox).iter("{http://www.w3.org/1999/xhtml}page"))
    last = pages[-1]; ph = float(last.get("height"))
    ys = [float(w.get("yMax")) for w in last.iter("{http://www.w3.org/1999/xhtml}word") if float(w.get("yMax")) < ph * 0.93]  # ignore footer
    fill = (max(ys) if ys else 0) / (ph * 0.9)
    return len(pages), fill
def build(name, scale):
    subprocess.run(["node", "make_worksheets.js", out], env=dict(os.environ, SCALE=str(scale), ONLY=name), capture_output=True, check=True)
subprocess.run(["node", "make_worksheets.js", out], capture_output=True, check=True)
report = {}
def fill_up(name, docx, scale, pages, fill, tried):
    # grow writing space until the last page is well used, without adding a page
    while fill < 0.72 and scale < 1.8:
        nxt = round(scale + 0.1, 2); build(name, nxt); p2, f2 = render(docx); tried.append((nxt, p2, round(f2, 2)))
        if p2 > pages: build(name, scale); render(docx); break
        scale, pages, fill = nxt, p2, f2
    return scale, pages, fill
for docx in sorted(glob.glob(os.path.join(out, "*.docx"))):
    name = os.path.basename(docx)[:-5]
    name = name.split("Worksheet_")[1] if "Worksheet_" in name else name
    scale = 1.0; pages, fill = render(docx); tried = [(scale, pages, round(fill, 2))]
    if pages >= 3 and fill < 0.6:
        # a light third page: try a modest tighten (floor 0.9) to pull it back to two
        for nxt in (0.94, 0.9):
            build(name, nxt); p2, f2 = render(docx); tried.append((nxt, p2, round(f2, 2)))
            if p2 < pages: scale, pages, fill = nxt, p2, f2; break
        else:
            build(name, 1.0); pages, fill = render(docx); scale = 1.0
    scale, pages, fill = fill_up(name, docx, scale, pages, fill, tried)
    report[name] = tried
    print(f"{pages}p {fill:.2f} scale {scale:<5} {name}")
json.dump(report, open(os.path.join(out, "balance.json"), "w"), indent=1)
