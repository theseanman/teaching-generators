#!/usr/bin/env python3
"""Two edits to the Term 1 Marking Workbook:
   1. 'clean copy' -> 'good copy' everywhere, keeping each occurrence's own case.
   2. 'abs' (absent) and 'ns' (not submitted) added to every level-code dropdown,
      and the 8 hand-typed 'absent' cells converted to 'abs'.
Saves a new file; the original is untouched."""
import re, sys
from pathlib import Path
import openpyxl
from openpyxl.worksheet.datavalidation import DataValidation

LEVEL_SETS = {'NYM,MM,M,FM', 'EM,DV,PR,EX'}
EXTRA = ['abs', 'ns']

def recase(src, new_lower):
    """'CLEAN COPY'->'GOOD COPY', 'Clean copy'->'Good copy', 'clean copy'->'good copy'."""
    if src.isupper():
        return new_lower.upper()
    if src[0].isupper():
        return new_lower[0].upper() + new_lower[1:]
    return new_lower

def main(src_path, out_path):
    wb = openpyxl.load_workbook(src_path)
    renamed = absent_fixed = dv_changed = 0

    # ---- 1. clean copy -> good copy
    pat = re.compile(r'clean(\s+)copy', re.I)
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for cell in row:
                v = cell.value
                if isinstance(v, str) and pat.search(v):
                    def rep(m):
                        return recase(m.group(0), 'good' + m.group(1) + 'copy')
                    cell.value = pat.sub(rep, v)
                    renamed += 1

    # ---- 2. widen the level dropdowns, and fix the typed-out 'absent' cells
    for ws in wb.worksheets:
        if not ws.title.endswith('Gradebook'):
            continue
        keep = []
        for dv in list(ws.data_validations.dataValidation):
            raw = str(dv.formula1).strip().strip('"')
            if raw in LEVEL_SETS:
                new = DataValidation(
                    type='list',
                    formula1='"' + ','.join(raw.split(',') + EXTRA) + '"',
                    allow_blank=dv.allowBlank)
                new.sqref = dv.sqref
                keep.append(new)
                dv_changed += 1
            else:
                keep.append(dv)
        ws.data_validations.dataValidation = keep

        for row in ws.iter_rows(min_row=9, max_row=48, min_col=3):
            for cell in row:
                if isinstance(cell.value, str) and cell.value.strip().lower() in (
                        'absent', 'not submitted', 'not sub'):
                    cell.value = 'abs' if cell.value.strip().lower() == 'absent' else 'ns'
                    absent_fixed += 1

    # ---- document the new codes on the Start here sheet
    sh = wb['Start here']
    for r in range(1, sh.max_row + 1):
        v = sh.cell(r, 1).value
        if isinstance(v, str) and 'Level codes:' in v and 'abs' not in v:
            sh.cell(r, 1).value = (
                v.rstrip() + ' Absence and non-submission: abs (absent) / ns (not submitted) — '
                'allowed in any level column, and left out of the evidence count and the '
                'suggested proficiency.')
            break

    wb.save(out_path)
    print(f'renamed in {renamed} cells; {absent_fixed} "absent" cells -> abs; '
          f'{dv_changed} dropdowns widened')
    return out_path

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
