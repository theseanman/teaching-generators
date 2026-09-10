#!/usr/bin/env python3
# check_totals.py — printed TOTAL must equal the sum of printed section marks.
# Reads raw word/document.xml (NOT pandoc, which truncates at '&' in titles).
import sys, re, zipfile

def text_of(docx):
    with zipfile.ZipFile(docx) as z:
        xml = z.read("word/document.xml").decode("utf-8", "replace")
    # concatenate all <w:t> runs so numbers split across runs are rejoined
    runs = re.findall(r"<w:t[^>]*>(.*?)</w:t>", xml, re.S)
    txt = "".join(runs)
    # decode the few entities we care about
    for a,b in [("&amp;","&"),("&lt;","<"),("&gt;",">"),("&#160;"," "),("\u00a0"," ")]:
        txt = txt.replace(a,b)
    return txt

def check(docx):
    txt = text_of(docx)
    m = re.search(r"TOTAL:\s*(\d+)\s*MARKS", txt, re.I)
    if not m:
        print(f"FAIL {docx}: no 'TOTAL: N MARKS' found"); return 1
    total = int(m.group(1))
    # section marks: "... N marks" occurrences that are NOT the total
    all_marks = [int(x) for x in re.findall(r"(\d+)\s*marks", txt, re.I)]
    # remove one instance equal to total (the TOTAL line)
    sect = list(all_marks)
    if total in sect: sect.remove(total)
    s = sum(sect)
    ok = (s == total)
    print(f"{'PASS' if ok else 'FAIL'} {docx}: sections {sect} sum={s}  total={total}")
    return 0 if ok else 1

if __name__ == "__main__":
    rc = 0
    for f in sys.argv[1:]:
        rc |= check(f)
    sys.exit(rc)
