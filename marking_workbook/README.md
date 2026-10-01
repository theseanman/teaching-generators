# marking_workbook — MARK.ONE marks into the Term 1 Marking Workbook

Writes marks out of `mark-one-data.json` into the gradebook tabs of
`Term1_Marking_Workbook_v4.x.xlsx`. Built and verified Oct 1 2026.

## How Sean uses it

He presses **Save to file** in MARK.ONE, which downloads
`mark-one-data-NN.json` to `~/Downloads` (Safari numbers them — the highest
number is the current one). He uploads that file to a Claude session. Claude
runs:

    python3 populate_workbook.py mark-one-data-NN.json workbook.xlsx overrides.json

and sends back `workbook_populated.xlsx`. Sean does not run this himself —
node is not installed on his district Mac and he has no admin rights.

## Facts verified against the real files, so they need not be re-derived

**Scales.** MARK.ONE marks carry `scoreIdx` against the class scale.
ELL 1/2 and ELL 3 use the District Learning Outcomes five
(`N/A, Developing, Minimally Meeting, Meeting, Fully Meeting`); English 8 and
FLA use the BC Proficiency four (`Emerging, Developing, Proficient, Extending`).
The workbook's gradebook dropdowns are `NYM, MM, M, FM` and `EM, DV, PR, EX`.
So English 8 maps one-to-one, and ELL maps Developing→NYM, MM→MM, M→M, FM→FM.
`N/A` writes **nothing** — it means not assessed, which is not the same as
Not Yet Meeting.

**Absence.** `abs` (absent) and `ns` (not submitted) were added to the level
dropdowns on Oct 1 2026 at Sean's request. The Results helper band is
`IFERROR(MATCH(cell,{"NYM","MM","M","FM"},0),"")`, so either word drops out of
the evidence count and the median — a student marked `abs` gets a blank
suggested proficiency, which is correct.

**Interim conversion** (Sean, Oct 1 2026, for the Oct 22 interim only):
NYM→Emerging, MM→Developing, M→Developing, FM→Proficient. **Extending is
deliberately unused for ELL.** This lives in the `Interim proficiency` column
of each Results tab, reading from Reported proficiency so his override wins.
English 8 passes its own value straight through.

**One level per item, not per outcome.** Sean chose this on Oct 1 2026 after
being told the cost: the Good copy feeds nine columns and they will all show
the same level, so the Results median and the derived can-do statements are
coarser than the workbook can represent. His call, not an oversight.

**Finding the right column.** Assignment title → gradebook item label, where
columns sharing a label prefix, week and lesson are one group (the nine
`Good copy ·` columns at W4/L11). A repeated label (`Duotang sweep` at five
different weeks) is resolved by the mark's own date against the Calendar tab's
week ranges. If the title matches no label, the Schedule tabs are tried as a
bridge — Sean's titles tend to follow the Schedule's wording, not the
gradebook's (`"One Small Thing" — Object Talk` vs
`Object talk (speaking descriptor)`). Anything unresolved is reported, never
guessed, and can be pinned in `overrides.json`.

**Never overwrite.** Some items are recorded ONLY in the workbook — sweeps,
collected books and worksheets — so a non-empty cell is Sean's own judgement
and outranks MARK.ONE. The script reports the conflict and leaves the cell
alone unless `--overwrite` is passed.

**Terminology.** "clean copy" was renamed to "good copy" throughout the
workbook on Oct 1 2026 (26 cells). Name MARK.ONE assignments to match.

## Open at the end of the Oct 1 session

- `Parent Signatures on Class Outline` has 59 ticks in MARK.ONE and no column
  anywhere in the workbook.
- ELL 3 `unit 1 lesson 6 paragraph`: L6 in the ELL 3 Schedule is a tick-only
  exercise-book checkpoint, so there is no level column for it.
- ELL 3 `Lesson 4 Part C describing with Senses`: the schedule starts at L5,
  so no L4 column exists.
- FLA Term 1 has marks but no tabs in the workbook; a Gradebook and Results
  pair was specced and awaiting Sean's go.
