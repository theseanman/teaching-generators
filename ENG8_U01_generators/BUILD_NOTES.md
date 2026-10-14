ENG8 U01 generators — v13 (Oct 9 2026)

Build order:
  node make_worksheets.js out 7              # core + Support + Stretch for L7
  (convert the CORE sheet to PDF, then:)
  pdftoppm -r 130 -png out/..._Worksheet_v1.pdf wsassets/L07-page
  node make_decks_v2.js out wsassets v13 7   # the deck

Per-Part crops are no longer needed: worksheet Parts are TYPED on the slides.
crop_parts.py is kept only for the full-page rasters of older units.

WHAT CHANGED IN v13 (the Sep 20–26 standing orders, previously missing)

make_decks_v2.js
  * 28 pt readability floor on every student-facing string; headings 36,
    answers 30 bold blue. Content SPLITS across continuation slides rather than
    shrinking. Reference strips (banner objective, footer, kicker tag, page
    labels) and the whole teacher plan slide are exempt via T(..., {ref:true}).
    The build exits non-zero and lists offenders if anything breaks the floor.
  * Worksheet Parts are typed from u1_worksheets.js. Full-page images survive
    only on the hand-out reminder slide. Support/Extension never reach a deck.
  * NEXT-QUESTION STRIP on every answer-reveal slide and on the slide before
    the first answer.
  * Reveal numbering no longer doubles when an authored answer already carries
    its own number.
  * REMOVED the module-level partHowTo fallback. It held Lesson 1's icebreaker
    and six-word-story text, and any lesson whose DECK_PLAN had no authored
    how-to silently inherited it — that is what put the wrong instructions on
    the L08 v10 deck. A missing how-to is now a hard build failure.
  * COM/TH/PS chips are lit per lesson (COMP_LIT overrides, else derived from
    the standards text). L7 and L8 are hand-checked; the rest are derived.
  * Cards use a solid tint with a visible outline; no near-white on white.
  * NEXT CLASS follows ORDER, the live teaching sequence, not lesson number + 1.
    ORDER = 1,2,3,4,5,6,7,10,11,8,9,12,13,14 (Sean's Oct 2 2026 reorder).
    ** Update ORDER if the teaching sequence changes again. **

make_worksheets.js
  * The OBJECTIVE prints at the top of every sheet.
  * The first item of every Part is a worked "(example)" — authored as
    `example:` on the Part's section block. A word the example consumes is
    struck out in that Part's word bank (`exampleUses: [...]`).
  * Every sheet ends with a tick-box "Check" Part in two columns, from
    `check: [...]` on the worksheet.
  * Support and Extension come OUT of the core sheet and print as their own
    companion sheets: _Worksheet_Support_v1.docx and _Worksheet_Stretch_v1.docx.
  * Answer-line counts follow the response type: `type: short|sentence|multi|
    paragraph` on a write/frames block (1 / 2 / 5 / 8 lines).
  * The build FAILS listing any Part with no worked example and any sheet with
    no Check Part.

apply_plans.js
  * Carries three new authored fields from plans_3_14.js: `order` (explicit
    activity order), `sections` (activity slides with no DECK_KEYMAP entry —
    hand-backs, section headings), `agendaExtra` (extra closing-agenda lines).
  * Entry replacement now counts braces, so it works on an already-spliced file.

STATUS BY LESSON
  L07, L10, L11 — rebuilt to the standing orders and verified (floor clean).
  L01–L06 — taught. Not rebuilt.
  L08, L09, L12, L13, L14 — the generators are compliant, but the lesson DATA needs
    the same pass L07 got: worked examples and a Check Part per worksheet, and
    past-tense referents. make_worksheets.js will fail loudly on each until the
    data is authored. Known content debt:
      * L08 + L09 are to be MERGED into one lesson (Sean, Oct 2 2026).
      * L10's "Connect" step claims students already have complete sentences —
        untrue now that grammar follows drafting.
      * L13 says "clean copy" three times; the standing term is GOOD COPY.
      * L13 points at "the L9 checklist", which will not exist after the merge.
      * L12/L13/L14 still speak about the writing as though it is upcoming.
      * L14's worksheet Part A also says "clean-copy paragraph".

DECIDED Oct 9 2026 (Sean)
  * The narrative is a NEW moment, NOT the Lesson 5 one. L07 is therefore
    PRACTICE on a known moment; L10 states the new-moment rule up front and
    the Check Part ticks it.
  * A narrative rubric is to be written (nothing in the set produces one).
  * The unit test gets its own day after the showcase.

TIMINGS: the plan slide uses an EVEN suggested split (labelled "adjust to your
block") because the lesson data carries no per-step minutes. Encode a weighting
rule if a non-even split is wanted.

## Oct 14 2026 — tests rebuilt to the standing orders + peer-marking decks (L15/L16)

**make_assessments.js → v2.** The four Unit 1 test documents were built before the
worksheet standing orders and broke four of them. Fixed in the generator, not per sheet:

* writing space was paragraph bottom borders → now underscore-leader tab stops
  (Word merges consecutive bordered paragraphs, which is why that rule exists);
* clearance ran 0.04in prompt-to-rule and 0.125in rule-to-rule → now line 340 +
  after 360 (0.39in) and before 300 under the prompt (0.35in+);
* every box/table/header was 8760 dxa → now 10080, the full usable width;
* the Name row had no Date field at all → Name / Block / Date on leaders, Date ~2in.

Also added: objective + RSS learning outcomes at the top; writing space by response
type (paragraph 8 lines, sentence 2); a pre-hand-in tick-box Check Part in two
columns; and the Section D rubric as full-width criterion blocks, all four levels,
on its own page at the end so duplex lands it on the back.

**Peer marking (Sean, Oct 14 2026).** `sec.peer` in u1_assess.js decides who marks a
section. Practice test: a classmate marks all four, gives Section D a proficiency
level and writes a second-person comment, and signs the marking panel. Unit test:
a classmate marks A/B/C; Section D is ring-fenced for Mr. Reid and the panel says so.
A mark box sits beside every peer-marked question.

**Worked examples on a test.** The "(example) as the first item of every Part" rule
would hand students an answer, so on the practice test it is a `HOW TO ANSWER THIS
SECTION` panel built on a throwaway micro-text (a driver at a red light) that appears
on neither test. The unit test carries none.

**make_decks_v2.js** gained three additive things (L01–L14 output is byte-identical,
verified against L12/L13):

* `plan.handout` — hand out something that is not a worksheet (here, the test);
* `cfg.marking` + `markWalkthrough()` — a marking walkthrough whose questions are
  authored in DECK_PLAN instead of pulled from WORKSHEETS, so the deck, the printed
  test and the answer key all come off u1_assess.js and cannot drift;
* `plan.fitOneSlide` — the Sep 22 one-slide rule (a section's questions and its
  cumulative answer set never run across slides; shrink to 20 pt, 16 as a last
  resort). Opt-in per lesson, so taught lessons keep the behaviour they were built with.

ORDER now ends `… 12, 13, 14, 15, 16`.

**Still open:** Sean's Oct 14 teaching order was given as 10 → 11 → 8 → 9 → practice
test → unit test, which does not say where 12 (revise), 13 (edit) and 14 (showcase)
now sit. L15/L16 are at the end of ORDER, so their next-class slides are right either
way, but L09's next-class slide still points at L12.

Separately: `make_worksheets.js` reports 45 standing-order gaps across the U1
worksheets (no worked `(example)` on most Parts, several sheets with no Check Part).
Pre-existing, in the taught sheets, not touched here.
