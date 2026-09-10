ENG8 U01 generators — v12 (Sep 10 2026)

Build order:
  node make_worksheets.js out                 # 14 worksheets .docx
  (convert worksheets to PDF, then:)
  python3 crop_parts.py                        # wsassets/L##-part{A..}.png  (per-Part crops)
  pdftoppm full pages -> wsassets/L##-page-#.png
  node make_notice.js out                      # object-talk take-home notice
  (rasterize notice -> wsassets/notice.png)
  node make_decks_v2.js out wsassets v12 1,2,..,14   # all 14 decks

make_decks_v2.js bakes in the 7 deck standing orders + the dense TWO-slide lesson plan
(objective, standards, timed sequence with FULL step text, materials, differentiation,
assessment, homework; COM/TH/PS chips) and bracketed activity types on Shape of the Day.
Per-lesson deck plans (activity->Part mapping, reveals, how-to) live in u1_decks.js
DECK_PLAN (L01 hand-authored) + plans_3_14.js (L03-14, spliced by apply_plans.js).

TIMINGS: plan slide uses an EVEN suggested split (labelled "adjust to your block")
because the lesson data carries no per-step minutes. L01's original 10/20/20/20/10 was
hand-weighted. Encode a weighting rule if a non-even split is wanted.
