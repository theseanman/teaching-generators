#!/usr/bin/env python3
"""Keep every worksheet Part's heading with its first question (Sean's standing order: a Part never starts at
the foot of a page and continues overleaf).

Why this exists (found Oct 23 2026, ELL12 U2 L02/L03): make_worksheet.js glues each Part with keep-with-next,
but LibreOffice — which renders the PDFs Sean prints — ignores that chain at some page bottoms and strands the
Part heading and instructions alone at the foot of the page. The flags in the .docx are correct; the renderer
drops them. So instead of trusting the glue, this script checks the real rendered PDF and, for any stranded
heading, adds a page break before that Part in the .docx, then re-renders. Only Parts that are actually
stranded move, so no long page breaks are added anywhere else.

Usage:  python3 keep_parts.py <out-dir> <soffice.py>      (run after the worksheet .docx files are written)
"""
import sys, os, re, glob, zipfile, shutil, subprocess, tempfile
import pymupdf

HEAD = re.compile(r"^(Part|Section) [A-Z]\s+—\s+")           # "Part B — Where the word goes"
ITEM = re.compile(r"^(Ex\.|\d+\.|☐|_{5,}|\d{1,2}$)")   # a worked example, a numbered item, a tick box, a writing line, or a numbered story paragraph


def render(docx, soffice):
    docx = os.path.abspath(docx)
    d = os.path.dirname(docx)
    subprocess.run(["python3", soffice, "--headless", "--convert-to", "pdf", "--outdir", d, docx],
                   capture_output=True, cwd=d)
    return os.path.splitext(docx)[0] + ".pdf"


NUM = re.compile(r"^\d+\.")
RULE = re.compile(r"^_{5,}$")
HEADER = re.compile(r"\u00B7 Unit \d+ \u00B7 |^Page \d+$")                   # the running header line


def stranded(pdf):
    """Headings that start too close to the foot of a page: nothing to write on after them, or the Part
    continues overleaf after fewer than two of its questions (a short Part split down the middle)."""
    out, pages = [], [[l.strip() for l in pg.get_text().splitlines() if l.strip()] for pg in pymupdf.open(pdf)]
    for n, lines in enumerate(pages):
        heads = [i for i, l in enumerate(lines) if HEAD.match(l)]
        if not heads:
            continue
        last, after = heads[-1], lines[heads[-1] + 1:]
        if not any(ITEM.match(l) for l in after):
            out.append((n, lines[last])); continue
        nxt = [l for l in pages[n + 1] if not HEADER.search(l)] if n + 1 < len(pages) else []
        continues = bool(nxt) and not HEAD.match(nxt[0])          # the same Part/Section carries on overleaf
        # an open writing Part (a draft) may run overleaf once it has real writing room on this page
        # a reading text may also run overleaf once two of its numbered paragraphs sit under the heading
        if continues and sum(1 for l in after if NUM.match(l)) < 2 and sum(1 for l in after if RULE.match(l)) < 6 \
                and sum(1 for l in after if re.match(r"^\d{1,2}$", l)) < 2:
            out.append((n, lines[last]))
    # a question at the foot of a page whose writing lines went overleaf (LibreOffice drops keep-with-next here too)
    for n, lines in enumerate(pages[:-1]):
        body = [l for l in lines if not HEADER.search(l)]
        nxt = [l for l in pages[n + 1] if not HEADER.search(l)]
        if body and nxt and RULE.match(nxt[0]) and not RULE.match(body[-1]) and not HEAD.match(body[-1]):
            out.append((n, "PROMPT::" + body[-1]))
    # earliest page first: fixing one break moves everything after it, so the caller fixes ONE per pass
    return [h for _, h in sorted(out, key=lambda x: x[0])]


def add_breaks(docx, headings):
    tmp = tempfile.mkdtemp()
    with zipfile.ZipFile(docx) as z:
        z.extractall(tmp)
        names = z.namelist()
    path = os.path.join(tmp, "word", "document.xml")
    xml = open(path, encoding="utf-8").read()
    done = 0
    for p in re.finditer(r"<w:p\b.*?</w:p>", xml, re.S):
        text = "".join(re.findall(r"<w:t[^>]*>([^<]*)", p.group(0)))
        # match on the start: a test heading carries its "____ / 8" score box on the same line in the .docx
        hit = any(text.strip().startswith(h) for h in headings if not h.startswith("PROMPT::")) or \
            any(h[8:] in text for h in headings if h.startswith("PROMPT::"))
        if hit and "<w:pageBreakBefore" not in p.group(0):
            para = p.group(0)
            # schema order inside w:pPr: pStyle, keepNext, keepLines, pageBreakBefore, ...
            m = re.search(r"<w:keepLines[^>]*/>", para) or re.search(r"<w:keepNext[^>]*/>", para)
            if m:
                new = para[:m.end()] + "<w:pageBreakBefore/>" + para[m.end():]
            else:
                new = para.replace("<w:pPr>", "<w:pPr><w:pageBreakBefore/>", 1)
            xml = xml.replace(para, new, 1)
            done += 1
    open(path, "w", encoding="utf-8").write(xml)
    with zipfile.ZipFile(docx, "w", zipfile.ZIP_DEFLATED) as z:
        for n in names:
            z.write(os.path.join(tmp, n), n)
    shutil.rmtree(tmp)
    return done


def main(out, soffice, pattern="*_Worksheet_*.docx"):
    for docx in sorted(glob.glob(os.path.join(out, pattern))):
        name = os.path.basename(docx)
        for _ in range(20):                     # ONE break per pass, earliest page first: a break moves everything after it,
            heads = stranded(render(docx, soffice))   # so fixing all at once over-breaks and leaves half-empty pages
            if not heads:
                break
            heads = heads[:1]
            add_breaks(docx, set(heads))
            print(f"  {name}: moved to a new page — " + "; ".join(h.replace("PROMPT::", "question: ") for h in heads))
        else:
            render(docx, soffice)
        left = stranded(os.path.splitext(docx)[0] + ".pdf")
        if left:
            print(f"  STILL STRANDED in {name}: " + "; ".join(left))
            sys.exit(1)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], *(sys.argv[3:4]))
