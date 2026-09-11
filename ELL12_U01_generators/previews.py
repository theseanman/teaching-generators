import sys, os, re, json, subprocess, glob
from xml.etree import ElementTree as ET
from PIL import Image

DPI = 110
src = sys.argv[1]; out = sys.argv[2]
os.makedirs(out, exist_ok=True)
result = {}
for pdf in sorted(glob.glob(os.path.join(src, "*.pdf"))):
    base = os.path.splitext(os.path.basename(pdf))[0]
    prefix = os.path.join(out, base)
    subprocess.run(["pdftoppm", "-png", "-r", str(DPI), pdf, prefix], check=True)
    pages = sorted(glob.glob(prefix + "-*.png"))
    # word boxes
    bbox = subprocess.run(["pdftotext", "-bbox-layout", pdf, "-"], capture_output=True, text=True).stdout
    ns = {"x": "http://www.w3.org/1999/xhtml"}
    root = ET.fromstring(bbox)
    heads = []  # (page_index, y_top, y_bottom, label)
    for pi, page in enumerate(root.iter("{http://www.w3.org/1999/xhtml}page")):
        ph = float(page.get("height"))
        for line in page.iter("{http://www.w3.org/1999/xhtml}line"):
            words = [w.text for w in line.iter("{http://www.w3.org/1999/xhtml}word")]
            if len(words) >= 2 and words[0] == "Part" and re.fullmatch(r"[A-F]", words[1] or ""):
                heads.append((pi, float(line.get("yMin")), float(line.get("yMax")), "Part " + words[1], ph))
    crops = []
    for i, (pi, y0, y1, label, ph) in enumerate(heads):
        img = Image.open(pages[pi]); W, H = img.size
        sc = H / ph
        top = max(0, int((y0 - 6) * sc))
        if i + 1 < len(heads) and heads[i + 1][0] == pi:
            bottom = int((heads[i + 1][1] - 8) * sc)
        else:
            bottom = int(H - 0.65 * DPI)  # above footer
        crop = img.crop((int(0.55 * DPI), top, W - int(0.55 * DPI), bottom))
        # if a part spills to the next page, append that page's top until the next heading
        if i + 1 < len(heads) and heads[i + 1][0] == pi + 1:
            img2 = Image.open(pages[pi + 1]); H2 = img2.size[1]
            b2 = int((heads[i + 1][1] - 8) * (H2 / ph))
            t2 = int(0.75 * DPI)
            if b2 - t2 > 40:
                c2 = img2.crop((int(0.55 * DPI), t2, W - int(0.55 * DPI), b2))
                merged = Image.new("RGB", (crop.width, crop.height + c2.height + 6), "white")
                merged.paste(crop, (0, 0)); merged.paste(c2, (0, crop.height + 6)); crop = merged
        cp = f"{prefix}-{label.replace(' ', '')}.png"
        crop.save(cp); crops.append({"label": label, "file": cp, "w": crop.width, "h": crop.height})
    result[base] = {"pages": pages, "parts": crops}
json.dump(result, open(os.path.join(out, "previews.json"), "w"), indent=1)
print("previewed", len(result), "worksheets")
