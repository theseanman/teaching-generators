#!/usr/bin/env python3
"""ELL 2 Unit 7 build checks.

Check 1: every worksheet cloze answer appears in that worksheet's own word bank,
         and every bank word is actually present in the generated document.
Check 2: the printed total on each test equals the sum of the printed section
         marks. Read from raw word/document.xml — NOT pandoc, which truncates
         at the '&' in titles and gives false readings.
"""
import json
import re
import sys
import zipfile
from pathlib import Path

from lxml import etree

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else "/mnt/user-data/outputs/ELL3_Unit01")
MANIFEST = Path(sys.argv[2] if len(sys.argv) > 2 else "/home/claude/ell2_u07/manifest.json")

failures = []
notes = []


def paragraphs(docx_path):
    """Return the text of every paragraph, runs joined, straight from document.xml."""
    with zipfile.ZipFile(docx_path) as z:
        xml = z.read("word/document.xml")
    root = etree.fromstring(xml)
    out = []
    for p in root.iter(f"{W}p"):
        text = "".join(t.text or "" for t in p.iter(f"{W}t"))
        out.append(text)
    return out


def norm(s):
    return re.sub(r"[\u00a0\s]+", " ", s).strip().lower()


# ---------------------------------------------------------------- check 1
def check_cloze(manifest):
    print("CHECK 1 — cloze answers present in their own word bank")
    for entry in manifest["cloze"]:
        lesson = entry["lesson"]
        path = OUT / entry["file"]
        if not path.exists():
            failures.append(f"L{lesson:02d}: worksheet missing at {path}")
            continue
        doc_text = norm(" ".join(paragraphs(path)))
        bank = [b for b in entry["bank"] if b]

        # (a) every answer must be in the declared bank
        bank_norm = {norm(b) for b in bank}
        for part_title, answers in entry["parts"]:
            for a in answers:
                if norm(a) not in bank_norm:
                    failures.append(
                        f"L{lesson:02d} {part_title}: answer '{a}' is NOT in its word bank"
                    )

        # (b) every bank word must actually appear in the rendered document
        for b in bank:
            if norm(b) not in doc_text:
                failures.append(
                    f"L{lesson:02d}: bank word '{b}' declared but absent from document.xml"
                )

        n_ans = sum(len(a) for _, a in entry["parts"])
        print(f"  L{lesson:02d}  bank={len(bank):2d}  answers={n_ans:2d}  ok")


# ---------------------------------------------------------------- check 2
SEC_RE = re.compile(r"([A-F])\s*\((\d+)\)")
MARKS_RE = re.compile(r"^\((\d+)\s+marks?\)$")
HEAD_RE = re.compile(r"^Section\s+([A-F])\s*[—\-–]\s*(.+)$")


def check_totals(manifest):
    print("\nCHECK 2 — printed total equals sum of printed section marks (raw XML)")
    for entry in manifest["tests"]:
        path = OUT / entry["file"]
        if not path.exists():
            failures.append(f"{entry['file']}: missing")
            continue
        paras = paragraphs(path)
        flat = [norm(p) for p in paras]

        # printed total, from the header table cell
        total = None
        for p in paras:
            m = re.search(r"Total marks:\s*(\d+)", p)
            if m:
                total = int(m.group(1))
                break
        if total is None:
            failures.append(f"{entry['file']}: no 'Total marks:' found in document.xml")
            continue

        # printed section list, from the same header table
        listed = {}
        for p in paras:
            if "Sections:" in p:
                for sid, mk in SEC_RE.findall(p):
                    listed[sid] = int(mk)
                break

        # printed per-section marks, from the '(N marks)' paragraph that follows
        # each 'Section X — Title' heading
        body = {}
        for i, p in enumerate(paras):
            h = HEAD_RE.match(p.strip())
            if not h:
                continue
            sid = h.group(1)
            for j in range(i + 1, min(i + 4, len(paras))):
                m = MARKS_RE.match(paras[j].strip())
                if m:
                    body[sid] = int(m.group(1))
                    break

        s_listed = sum(listed.values())
        s_body = sum(body.values())

        print(f"  {entry['file']}")
        print(f"    printed total .......... {total}")
        print(f"    header section list .... {sorted(listed.items())} = {s_listed}")
        print(f"    in-body section marks .. {sorted(body.items())} = {s_body}")

        if not listed:
            failures.append(f"{entry['file']}: header section list not found")
        elif s_listed != total:
            failures.append(
                f"{entry['file']}: header list sums to {s_listed} but printed total is {total}"
            )
        if not body:
            failures.append(f"{entry['file']}: in-body section marks not found")
        elif s_body != total:
            failures.append(
                f"{entry['file']}: in-body section marks sum to {s_body} but printed total is {total}"
            )
        if listed and body and listed != body:
            diff = {k: (listed.get(k), body.get(k)) for k in set(listed) | set(body) if listed.get(k) != body.get(k)}
            failures.append(f"{entry['file']}: header list disagrees with in-body marks: {diff}")
        if total != entry["expected"]:
            failures.append(
                f"{entry['file']}: printed total {total} != spec total {entry['expected']}"
            )


# ---------------------------------------------------------------- check 3
def check_inventory(manifest):
    print("\nCHECK 3 — file inventory")
    present = sorted(p.name for p in OUT.iterdir() if p.is_file())
    expected = manifest["expected_files"]
    missing = [f for f in expected if f not in present]
    extra = [f for f in present if f not in expected]
    print(f"  expected {len(expected)}, present {len(present)}")
    for m in missing:
        failures.append(f"missing file: {m}")
    for e in extra:
        notes.append(f"unexpected file: {e}")


def main():
    manifest = json.loads(MANIFEST.read_text())
    check_cloze(manifest)
    check_totals(manifest)
    check_inventory(manifest)

    print()
    for n in notes:
        print("NOTE:", n)
    if failures:
        print(f"\nFAILED — {len(failures)} problem(s):")
        for f in failures:
            print("  ✗", f)
        sys.exit(1)
    print("ALL CHECKS PASSED")


if __name__ == "__main__":
    main()
