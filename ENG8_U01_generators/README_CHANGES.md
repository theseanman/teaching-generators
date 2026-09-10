ENG8 U01 generators — state as of this session.

WHAT IS CURRENT AND CORRECT IN THIS SET:
- u1_worksheets.js: L01 reordered — Part A Find Someone Who (row 3 = "always tells
  everyone the same story"), Part B six-word story + "write it out as a short story"
  (4 lines), Part C small-moment box (5 lines), no-date homework note, support frame
  as two rows of three long writable blanks, Part D "Check your work" tick list.
- make_worksheets.js: writing lines and blanks now use underscore-leader tab stops
  (Word-safe) instead of paragraph bottom-borders, which Word merged into one box.
  New block kind: longblanks {rows, per}. labelBox row is cantSplit.
- make_notice.js: NEW. Generates the "One Small Thing" object-talk take-home notice
  (open date line, four-criterion ENG8 speaking rubric on the 4-point scale).

WHAT IS NOT DONE (deliberately deferred this session):
- make_decks.js in this set is the OLD deck renderer (no banner / plan / shape /
  next-class / take-home slides). The delivered ENG8_U01_L01_Deck_v5.pptx was produced
  by PATCHING the newer REVIEW_v4 deck (image swap + reorder + take-home slide) in
  python-pptx, NOT by this generator. The newer deck RENDERER was lost to a container
  reset and needs rebuilding before Lessons 2–14 can be regenerated with the banner
  look. That rebuild is the next job.
- Only L01 worksheet was reworked. L02–L14 worksheets are unchanged from the pre-Sep-9
  set and still use the old renderer paths where not touched.

--- UPDATE (this pass) ---
- u1_worksheets.js L01 Part B now opens with the HEMINGWAY paragraph task: read
  "For sale: baby shoes, never worn," write a short paragraph about what might have
  happened (5 lines), share with a partner then the class — THEN students write their
  own six-word story. Part D check list updated to include it.
- make_worksheets.js: full-width fix. CONTENT_W/FULL is now 10080 (true usable width);
  every box, table, sixbox, word bank, panel, model and the name header spans FULL, and
  wsTable rescales any data-supplied column widths to sum to FULL. All worksheet elements
  are now the same, widest-feasible width.
- Delivered deck is now v6 (patched from v4/v5 in python-pptx): 3 worksheet page images
  (worksheet is 3 pages now), Part A/B/C close-ups re-cropped from the full-width sheet,
  Part B how-to panel rewritten to cover the Hemingway task, the take-home reminder slide,
  and a NEW slide showing Sean's edited object-talk notice. The deck RENDERER still needs
  rebuilding before L2–L14 regenerate — unchanged from the note above.

--- UPDATE (interleave pass) ---
- Deck is now v7: the worksheet is INTERLEAVED with the activities, not grouped at the end.
  Order: Find Someone Who -> Part A section; Six-Word Story -> Part B section -> its 2 example
  reveals; the 3 discussion slides (no worksheet section); Object talk -> Part C section ->
  its example reveal; then the full-page worksheet (divider + 3 pages) as a HAND-OUT REMINDER;
  exit, take-home reminder, notice, next class.
- STANDING ORDERS now in force for ALL ELL + ENG8 decks/worksheets: (1) identical widest-feasible
  width for every worksheet element; (2) interleave each activity with its worksheet section and
  that section's reveal, full page kept only as a hand-out reminder, non-worksheet activities
  left as-is; inline-vs-grouped reveals confirmed per assignment. NEITHER is in a deck GENERATOR
  yet — v7 was hand-assembled in python-pptx. The deck-renderer rebuild must bake both in, and
  both rules must be ported to the ELL 1/2/3 generator sets when next touched.
