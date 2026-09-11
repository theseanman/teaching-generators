# House Style — decks and worksheets, every course

**The rule:** one renderer, one theme, one worksheet builder. Every course (ELL 1/2, ELL 3, English 8, FLA) is built by the same code. Lessons are data files; they never contain layout. To change the look, change `theme.js` or `render_deck.js` once and every course follows.

**The benchmark:** `reference/ELL3_U01_Deck_L02_ColdStartFirstReading_v3.pptx` and `reference/ELL3_U01_Worksheet_L02_ColdStartFirstReading_v2.pdf` (approved by Sean, Sep 11 2026: "the best PowerPoint I've seen yet"). Any output that does not look like these is a defect.

---

## 1. Palette (`theme.js`)

| Name | Hex | Used for |
|---|---|---|
| NAVY | 0B2C4D | objective banner, headings, title/section slides |
| BLUE | 1565C0 | Part titles, blue card labels, revealed answers |
| TEAL | 00897B | banner strip, competency chips, number dots, slide tags |
| PALE / LINE | E3F0FB / 90B4D8 | blue card fill / outline |
| TINT / TLINE | D7ECEA / 7FC4BB | teal card fill / outline (cards alternate blue, teal) |
| AMBER / AMBERL | FFF3D6 / E0B252 | exit ticket, "Stuck?", marking boxes, warm-up instruction bar |
| INK / GREY | 1F2933 / 5F6B7A | body text / secondary text |

Font: Calibri throughout. Cards are solid tint with a visible outline — never near-white on white.

## 2. Deck

- **Canvas** 16:9, 10 × 5.625 in.
- **Banner** on every content slide: navy, 0.66 in tall, teal strip at left, "OBJECTIVE" micro-label, objective (11.5 pt bold), outcomes line (9 pt pale blue), COM / TH / PS chips at right (lit = teal, unlit = dim).
- **Under the banner:** course · unit · lesson at left, slide TAG at right (9.5 pt), heading 26 pt navy at y 0.93.
- **Footer:** every slide says what comes next — `Next → <label>` bottom right, italic teal. Computed automatically from the following slide's label.
- **Type fills the slide:** body 16–24 pt; big cards, no large blank areas, no tiny text. Story text 23 pt.
- **Icon panels:** activity slides without a worksheet image carry a relevant icon (exercise book, duotang, partners, pen, calendar).

### Order (the teaching arc)
1. Lesson plan — teacher slides, "skip when presenting": objective, outcomes, materials, TIMED steps with FULL descriptions, differentiation, assessment, homework, watch-for. Splits over as many slides as needed.
2. Shape of the day — numbered, each item with its activity type in brackets.
3. Course routines (when the lesson includes them): section heading, exercise book, duotang, help slip, filled sample slip.
4. Warm-up (students write in the exercise book).
5. Title slide → goals.
6. Hand-out reminder (lists every Part) → one slide per worksheet page.
7. Activity clusters, in lesson-plan order: teaching / activity slide → **worksheet walkthrough** (Part crop + "How to complete it") → **answer reveals**.
8. Any class text reproduced **in full**, line-numbered, followed by its word list.
9. Speaking slide with sentence frames.
10. Exit ticket — always the LAST Part of the worksheet, shown with its crop and the duotang reminder.
11. Next class → exercise-book / agenda slide (always last).

### Answer reveals
The worksheet section is shown and answers appear **in blue inside the blanks**, one answer per slide, earlier answers kept (standing in for animation). Parts with right/wrong answers get reveals; personal Parts (own strategies, exit ticket, tick-box checks) do not. Long written Parts are cut into readable sections (≤ 280 pt of page); a section's reveals keep only that section's answers.

## 3. Worksheet

- US Letter, 0.75 in side margins; **every box, table and line spans the full 10080-dxa width**.
- Header: course · unit · lesson · room (right); title block; Name/Date on underscore-leader tabs; goal box with objective + learning outcomes.
- Items 14 pt. Part titles 16 pt blue; instructions italic grey.
- **Writing lines are underscore-leader tab stops, never paragraph borders** (Word merges bordered paragraphs).
- **Inline blanks** run from the end of the sentence to the margin (~2 in) — no answer line under an item that has an inline blank.
- **Line counts:** word/phrase 1 · one sentence 2 · several sentences 5 · paragraph 8+.
- **Every Part opens with a worked example** tagged "(example)"; a bank word used by the example is crossed out.
- **Word banks are shuffled** so answers never run in bank order (checked automatically).
- **Glue:** short Parts move to the next page as a whole; long written Parts keep each question with all its lines. No question ever sits at a page foot with its lines overleaf.
- A "Check your work" tick-box Part (two columns), then the **exit ticket as the final Part** — so it is seen when sheets are collected from the duotang.

## 4. Lesson data (`lessons/<COURSE>_U##_L##.js`)

```
course            "ELL3"  → loads courses/ELL3.js
meta              { unit, unitTitle, lesson, title, subtitle, month }
banner            { obj, std, lit:[chips lit] }
plan              { objective, outcomes, materials, timing, steps:[[min, title, full description]], diff, assess, homework, watch }
shape             [[item, activity type]]
sequence          ordered slide blocks (below)
worksheet         { objective, outcomes, parts:[...] }   Part kinds: cloze | lines | open | check | exit
                  every Part has: id, title, kind, instr, how (walkthrough text); cloze/lines: example + items with ans
texts             { key: { title, lines:[...], words:[[word, meaning]] } }
```

Slide block types: `routines` · `section` · `routine` · `imagesteps` · `imagebullets` · `warmup` · `title` · `goals` · `handout` (adds the page slides) · `vocab` · `walk` {part} · `reveals` {part} · `rows` (teaching rows; optional icon + caption) · `cards` · `text` {text} · `wordlist` {text} · `speaking` · `exit` {part} · `next`.

## 5. Course file (`courses/<CODE>.js`)

Everything that differs between courses: code, room, teacher, competency chips, help-slip wording and sample, and the routine slides. New course = new course file; the renderer does not change.

## 6. Build and checks

`bash build.sh lessons/<LESSON>.js [worksheet-version] [deck-version]` runs, in order: parse check → `check_lesson.js` (plan steps complete, every Part has an example and walkthrough text, answers in bank, bank not in answer order, exit ticket last, every Part walked through, a Next-class slide) → worksheet → page crops and reveals → help slip → deck (**fails on fit warnings**: text over its character budget) → PowerPoint validation.

Outputs land in `out/<LESSON>/`. Visual check before delivery: render the deck and compare against the reference.
