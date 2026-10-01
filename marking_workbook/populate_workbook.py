#!/usr/bin/env python3
"""
populate_workbook.py — write MARK.ONE marks into the Term 1 Marking Workbook.

    python3 populate_workbook.py <mark-one-data.json> <workbook.xlsx> [overrides.json]

Saves <workbook>_populated.xlsx next to the original. The original is never changed.

What it touches: Gradebook data cells only (rows 9-48, column C onward), in the
sheets A/E/C/G/F/H Gradebook. It never touches a Results sheet, a Schedule, the
Calendar or the Statement bank; never header rows 1-8; never the grey example row;
and never a "Your judgement ·" column, which stays yours to fill in by hand.

How a mark finds its column: assignment title -> gradebook item label. Columns that
share a label prefix, week and lesson are one group (the nine "Clean copy ·" columns
at W4/L11 are one group), and the overall level is written across the group. When a
label repeats at several weeks ("Duotang sweep"), the mark's own date picks the week
from the Calendar sheet. Anything that cannot be resolved is reported, never guessed.

overrides.json, if given, pins a title to explicit columns and skips all matching:
    {"A": {"Unit 1 Good Copy": ["H","I","L","M"]}}
"""
import json, re, sys, unicodedata, datetime
from pathlib import Path
import openpyxl
from openpyxl.utils import get_column_letter

# MARK.ONE class scales, verbatim from mark-one.html (SCALES / COURSE)
COURSE_SCALE = {'ELL12': 'DLO', 'ELL3': 'DLO', 'ENG8': 'PROF', 'FLA': 'PROF'}
# scale index -> the code the workbook's data validation accepts.
# DLO index 0 is 'N/A' = not assessed, which is not the same as NYM, so it writes nothing.
DLO_TO_CELL  = {0: None, 1: 'NYM', 2: 'MM', 3: 'M', 4: 'FM'}
PROF_TO_CELL = {0: 'EM', 1: 'DV', 2: 'PR', 3: 'EX'}

LEVEL_ROW7 = {'1A': {'1A', '1A + 2A'}, '2A': {'2A', '1A + 2A'},
              '3A': {'3'}, 'ENG8': {'8'},
              '6': {'6', '6 + 7'}, '7': {'7', '6 + 7'}}   # FLA night class

HDR_WEEK, HDR_LESSON, HDR_ITEM, HDR_OUTCOME, HDR_APPLIES = 3, 4, 5, 6, 7
FIRST_DATA_ROW, LAST_DATA_ROW, FIRST_DATA_COL, EXAMPLE_ROW = 9, 48, 3, 8
MONTHS = {'jan':1,'feb':2,'mar':3,'apr':4,'may':5,'jun':6,
          'jul':7,'aug':8,'sep':9,'oct':10,'nov':11,'dec':12}


def norm(s):
    s = unicodedata.normalize('NFKD', str(s or ''))
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r'\([^)]*\)', ' ', s.lower())
    return ' '.join(re.sub(r'[^a-z0-9]+', ' ', s).split())


def tokens(s):
    return set(norm(s).split())


def prefix(label):
    """'Clean copy · 1A: compound sentences' -> 'Clean copy'."""
    return str(label).split('·')[0].strip()


def week_ranges(wb, start_year=2026):
    """{'W1': (date, date), ...} parsed from the Calendar sheet's date column."""
    out = {}
    if 'Calendar' not in wb.sheetnames:
        return out
    ws = wb['Calendar']
    for r in range(1, ws.max_row + 1):
        label = str(ws.cell(r, 1).value or '').strip()
        rng = str(ws.cell(r, 2).value or '').strip()
        if not re.fullmatch(r'W\d+', label) or not rng:
            continue
        parts = re.split(r'\s*[–—-]\s*', rng)
        if len(parts) != 2:
            continue
        def one(txt, fallback_month=None):
            m = re.match(r'([A-Za-z]{3,})?\s*(\d{1,2})', txt.strip())
            if not m:
                return None, fallback_month
            mon = MONTHS.get((m.group(1) or '')[:3].lower(), fallback_month)
            if mon is None:
                return None, fallback_month
            year = start_year if mon >= 8 else start_year + 1
            try:
                return datetime.date(year, mon, int(m.group(2))), mon
            except ValueError:
                return None, mon
        a, mon = one(parts[0])
        b, _ = one(parts[1], mon)
        if a and b:
            out[label] = (a, b)
    return out


class Data:
    def __init__(self, raw):
        self.d = raw
        self.classes = {c['id']: c for c in raw.get('classes', [])}
        self.sections = {s['id']: s for s in raw.get('sections', [])}
        self.students = {s['id']: s for s in raw.get('students', [])}

    def to_cell(self, class_id, idx):
        if idx is None:
            return None
        table = (DLO_TO_CELL if COURSE_SCALE.get(self.classes[class_id]['course']) == 'DLO'
                 else PROF_TO_CELL)
        return table.get(int(idx))

    def student_level(self, sid, class_id):
        for sec_id in self.students[sid].get('sectionIds', []):
            sec = self.sections.get(sec_id)
            if sec and sec.get('classId') == class_id:
                return sec.get('level')
        return None

    def latest_mark(self, aid, sid):
        ms = [m for m in self.d.get('marks', [])
              if m.get('assignmentId') == aid and m.get('studentId') == sid]
        return sorted(ms, key=lambda m: m.get('date', ''), reverse=True)[0] if ms else None

    def check(self, aid, sid):
        for k in self.d.get('checks', []) or []:
            if k.get('assignmentId') == aid and k.get('studentId') == sid:
                return k
        return None


SCHEDULE_FOR = {'A': 'ELL 1-2 Schedule', 'E': 'ELL 1-2 Schedule',
                'C': 'ELL 3 Schedule',   'G': 'ELL 3 Schedule',
                'F': 'English 8 Schedule', 'H': 'English 8 Schedule'}


def schedule_index(wb, class_id):
    """{normalised Item: [(week, lesson), ...]} from this course's Schedule sheet.

    Sean's assignment titles follow the Schedule's wording, which is not always the
    Gradebook's column label, so the Schedule is the bridge between the two."""
    name = SCHEDULE_FOR.get(class_id)
    if not name or name not in wb.sheetnames:
        return {}
    ws = wb[name]
    hdr = None
    for r in range(1, 8):
        row = [str(ws.cell(r, c).value or '').strip().lower() for c in range(1, 11)]
        if 'week' in row and 'item' in row:
            hdr = {v: i + 1 for i, v in enumerate(row) if v}
            break
    if not hdr:
        return {}
    out = {}
    for r in range(hdr and 1 or 1, ws.max_row + 1):
        item = ws.cell(r, hdr.get('item', 3)).value
        if not item:
            continue
        wk = str(ws.cell(r, hdr.get('week', 1)).value or '').strip()
        ls = str(ws.cell(r, hdr.get('lesson', 2)).value or '').strip()
        if norm(item) in ('item',):
            continue
        out.setdefault(norm(item), []).append((wk, ls))
    return out


def expand_weeks(wk):
    """'W3-4' -> {'W3','W4'};  'W5' -> {'W5'};  'Dec' -> {'Dec'}."""
    wk = wk.strip()
    m = re.fullmatch(r'W(\d+)\s*[\u2013\u2014-]\s*(\d+)', wk)
    if m:
        return {f'W{n}' for n in range(int(m.group(1)), int(m.group(2)) + 1)}
    return {wk} if wk else set()


def via_schedule(title, groups, sched):
    """Resolve through the Schedule sheet: title -> (week, lesson) -> gradebook columns."""
    t = norm(title)
    hit = sched.get(t)
    if not hit:
        best, bs = None, 0.0
        tt = tokens(title)
        for key, v in sched.items():
            kt = set(key.split())
            if not kt or not tt:
                continue
            sc = len(tt & kt) / len(tt | kt)
            if sc > bs:
                best, bs = v, sc
        if bs < 0.6:
            return None, None
        hit = best
    for wk, ls in hit:
        weeks_wanted = expand_weeks(wk)
        scored = []
        for (pre, gwk, gls), cols in groups.items():
            pts = (2 if ls and gls and norm(ls) == norm(ls) and gls == ls else 0) \
                  + (1 if gwk in weeks_wanted else 0)
            if pts:
                scored.append((pts, pre, gwk, gls, cols))
        if scored:
            top = max(x[0] for x in scored)
            best = [x for x in scored if x[0] == top]
            if len(best) == 1:
                pts, pre, gwk, gls, cols = best[0]
                return cols, f'via schedule ({wk}/{ls}) -> {pre} @ {gwk}/{gls}'
    return None, None


def column_groups(ws):
    """Data columns grouped by (label prefix, week, lesson). 'Your judgement' excluded."""
    groups = {}
    for c in range(FIRST_DATA_COL, ws.max_column + 1):
        item = ws.cell(HDR_ITEM, c).value
        if item is None:
            continue
        item = str(item).strip()
        if norm(item).startswith('your judgement'):
            continue
        key = (prefix(item),
               str(ws.cell(HDR_WEEK, c).value or '').strip(),
               str(ws.cell(HDR_LESSON, c).value or '').strip())
        groups.setdefault(key, []).append({
            'col': c, 'item': item,
            'outcome': str(ws.cell(HDR_OUTCOME, c).value or '').strip(),
            'applies': str(ws.cell(HDR_APPLIES, c).value or '').strip(),
        })
    return groups


def roster_rows(ws):
    out = {}
    for r in range(FIRST_DATA_ROW, LAST_DATA_ROW + 1):
        v = ws.cell(r, 1).value
        if v:
            out[norm(v)] = r
    return out


def pick_group(title, groups, when, weeks):
    """Resolve an assignment to one column group. Returns (cols, how) or (None, why)."""
    cands = []
    for (pre, wk, lesson), cols in groups.items():
        t, p = tokens(title), tokens(pre)
        if not t or not p:
            continue
        score = 1.0 if norm(title) == norm(pre) else len(t & p) / len(t | p)
        if score >= 0.5:
            cands.append((score, wk, lesson, cols, pre))
    if not cands:
        return None, 'no gradebook item matched the title'
    top = max(c[0] for c in cands)
    cands = [c for c in cands if c[0] == top]
    if len(cands) == 1:
        s, wk, lesson, cols, pre = cands[0]
        return cols, f'{"exact" if s == 1.0 else f"fuzzy {s:.2f}"} -> {pre} @ {wk}/{lesson}'
    # same label at several weeks: let the date decide
    if when:
        inside = [c for c in cands if c[1] in weeks and weeks[c[1]][0] <= when <= weeks[c[1]][1]]
        if len(inside) == 1:
            s, wk, lesson, cols, pre = inside[0]
            return cols, f'{pre} @ {wk} (by date {when})'
        dated = [c for c in cands if c[1] in weeks]
        if dated:
            s, wk, lesson, cols, pre = min(
                dated, key=lambda c: min(abs((when - weeks[c[1]][0]).days),
                                         abs((when - weeks[c[1]][1]).days)))
            return cols, f'{pre} @ {wk} (nearest week to {when})'
    wks = ', '.join(sorted({c[1] for c in cands}))
    return None, f'label appears at {wks} and no date to choose between them'


def put(ws, row, col, value, conflicts, overwrite=False):
    """Write a cell unless Sean already typed something different there.

    Some items are recorded ONLY in the workbook (sweeps, collected books), so a
    non-empty cell is his own judgement and outranks anything from MARK.ONE."""
    cell = ws.cell(row, col)
    old = cell.value
    if old not in (None, ''):
        if str(old).strip() == str(value).strip():
            return False                      # already says the same thing
        if not overwrite:
            conflicts.append((ws.title, cell.coordinate, old, value))
            return False
    cell.value = value
    return True


def populate(data_path, wb_path, overrides_path=None, overwrite=False):
    data = Data(json.loads(Path(data_path).read_text()))
    overrides = json.loads(Path(overrides_path).read_text()) if overrides_path else {}
    wb = openpyxl.load_workbook(wb_path)          # formulas preserved
    weeks = week_ranges(wb)

    written = blanked = 0
    log, bad_item, bad_name, conflicts = [], [], set(), []

    homeless = sorted({(a.get('classId'), a.get('title')) for a in data.d.get('assignments', [])
                       if f"{a.get('classId')} Gradebook" not in wb.sheetnames})

    for class_id in sorted(data.classes):
        sheet = f'{class_id} Gradebook'
        if sheet not in wb.sheetnames:
            continue
        ws, groups, roster = wb[sheet], column_groups(wb[sheet]), roster_rows(wb[sheet])
        sched = schedule_index(wb, class_id)

        for a in sorted((x for x in data.d.get('assignments', []) if x.get('classId') == class_id),
                        key=lambda x: x.get('createdAt', '')):
            title = a.get('title', '')

            dates = [m['date'] for m in data.d.get('marks', [])
                     if m.get('assignmentId') == a['id'] and m.get('date')]
            dates += [k['date'] for k in (data.d.get('checks', []) or [])
                      if k.get('assignmentId') == a['id'] and k.get('date')]
            if a.get('dueDate'):
                dates.append(a['dueDate'])
            when = None
            if dates:
                try:
                    when = datetime.date.fromisoformat(sorted(dates)[0])
                except ValueError:
                    pass

            ov = (overrides.get(class_id) or {}).get(title)
            if ov:
                flat = [c for cols in groups.values() for c in cols]
                cols = [c for c in flat if get_column_letter(c['col']) in ov or c['item'] in ov]
                how = 'override'
                if not cols:
                    bad_item.append((class_id, title, 'override matched no column'))
                    continue
            else:
                cols, how = pick_group(title, groups, when, weeks)
                if not cols:
                    scols, show = via_schedule(title, groups, sched)
                    if scols:
                        cols, how = scols, show
                    else:
                        bad_item.append((class_id, title, how))
                        continue

            before = written
            entry = (f'{class_id}  "{title}"  -> '
                     f'{",".join(get_column_letter(c["col"]) for c in cols)}  ({how})')

            for sid, stu in data.students.items():
                level = data.student_level(sid, class_id)
                if level is None:
                    continue
                name = f'{stu["last"]}, {stu["first"]}'
                row = roster.get(norm(name))
                if row is None:
                    bad_name.add((class_id, name))
                    continue
                if row == EXAMPLE_ROW:
                    continue
                ok = LEVEL_ROW7.get(level, set())
                mark = data.latest_mark(a['id'], sid)

                for cl in cols:
                    if cl['applies'] and ok and cl['applies'] not in ok:
                        continue
                    if a.get('recordOnly'):
                        if data.check(a['id'], sid):
                            written += put(ws, row, cl['col'], '✓', conflicts, overwrite)
                        continue
                    if mark is None:
                        continue
                    if cl['outcome'] == 'score':
                        if mark.get('earned') is not None:
                            written += put(ws, row, cl['col'], mark['earned'], conflicts, overwrite)
                        continue
                    code = data.to_cell(class_id, mark.get('scoreIdx'))
                    if code is None:
                        blanked += 1
                        continue
                    written += put(ws, row, cl['col'], code, conflicts, overwrite)

            log.append(f'{entry}  [{written - before} cells]')

    out = Path(wb_path).with_name(Path(wb_path).stem + '_populated.xlsx')
    wb.save(out)

    print(f'wrote {written} cells into {out.name}')
    if blanked:
        print(f'{blanked} cells left alone (MARK.ONE level was N/A, which is not NYM)')
    if log:
        print('\nassignment -> columns:')
        for line in log:
            print('  ' + line)
    if conflicts:
        print(f'\nNOT WRITTEN — {len(conflicts)} cells already hold something different '
              f'(your own entry wins; pass --overwrite only if you mean to replace it):')
        for sh, co, old, new in conflicts:
            print(f'  {sh}!{co}  has {old!r}, MARK.ONE says {new!r}')
    if bad_item:
        print('\nNOT WRITTEN — could not place these assignments:')
        for cid, t, why in bad_item:
            print(f'  {cid}  "{t}"  — {why}')
        print('  Fix by adding them to overrides.json with the column letters.')
    if homeless:
        print('\nNOT WRITTEN — these classes have no sheet in this workbook:')
        for cid, t in homeless:
            print(f'  {cid}  "{t}"')
    if bad_name:
        print('\nNOT WRITTEN — in MARK.ONE but not in the gradebook:')
        for cid, n in sorted(bad_name):
            print(f'  {cid}  {n}')
    return out


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if a != '--overwrite']
    if len(args) < 2:
        print(__doc__); sys.exit(1)
    populate(*args[:3], overwrite='--overwrite' in sys.argv)
