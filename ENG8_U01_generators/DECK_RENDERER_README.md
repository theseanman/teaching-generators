ENG8 DECK RENDERER v2 (make_decks_v2.js) — Sep 9 2026
=====================================================
This renderer BAKES IN the seven Sep-9 deck standing orders. Given the tagged
DECK_PLAN in u1_decks.js plus pre-rasterized worksheet assets, it reproduces the
hand-approved L01 deck (v9) automatically.

PROVEN: ENG8 U01 L01 — `node make_decks_v2.js out wsassets v10 1` produces
ENG8_U01_L01_Deck_v10.pptx, which matches the approved v9 structure slide for slide
(plan, shape, hand-out reminder before first sheet use, interleaved activity→section
→reveal, title after the icebreaker, SHARE section slide with illustration, discussion
slides, exit).

HOW IT WORKS:
- DECK_PLAN[lesson] gives: order (activity-key sequence), handoutKey (first sheet
  use → full-page reminder goes before it), per-activity tags {ws, reveal, section,
  image, title, items}, and reveals{Part→{kind:"open"|"answers",...}}.
- DECK_KEYMAP[lesson] maps each key to its slide index in DECKS.
- Worksheet assets are pre-made: wsassets/L{NN}-page-*.png (full pages) and
  L{NN}-part{A..}.png (Part crops). Regenerate them from the built worksheet PDF
  (see the crop script used this session) before running the deck.

THE SEVEN RULES, as implemented:
 1 every slide previews what follows; hand-out reminder before first worksheet use
 2 title/hook not forced to front (placed by DECK_PLAN.order)
 3 section/heading slides (activities with section:true)
 4 interleave activity→section→reveal (driven by ws + reveal tags)
 5 reveal "open"=one example; "answers"=cumulative one-at-a-time slides
 6 fill open space: cards/type/boxes scale up; images enlarged where sensible;
   image-filled slides not over-scaled
 7 non-worksheet activities get their own slide; any relevant image (image: field)

STILL TO DO before this is a full unit generator:
- L02–L14 need a DECK_PLAN + DECK_KEYMAP entry each (tag each lesson's activities).
  Only L01 is tagged so far.
- partHowTo{} in make_decks_v2.js holds L01 how-to text; per-lesson how-to needs
  supplying (or moving into u1_worksheets.js data).
- The take-home reminder + notice-image + next-class closers from v9 are not yet
  re-added to the renderer (L01 v9 had them; v10 stops at exit). Add plan.takehome +
  a notice-image closer + a next-class slide to match v9's tail before shipping decks.
- SCOPE: port this renderer into the ELL 1/2 and ELL 3 generator sets too (same rules).
