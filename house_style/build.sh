#!/bin/bash
# One command builds everything for a lesson:  bash build.sh lessons/ELL3_U01_L02.js [worksheet-version] [deck-version]
set -e
cd "$(dirname "$0")"
LESSON=$1; WSV=${2:-v1}; DV=${3:-v1}
ID=$(basename "$LESSON" .js); OUT=out/$ID; SOFF=/mnt/skills/public/docx/scripts/office/soffice.py
mkdir -p "$OUT"
node -e "require('./$LESSON')"                       # 1 parse check (stray newlines in strings)
node check_lesson.js "$LESSON"                        # 2 content checks
node make_worksheet.js "$LESSON" "$OUT" "$WSV"        # 3 worksheet .docx + blank manifest
(cd "$OUT" && python "$SOFF" --headless --convert-to pdf *_Worksheet_*.docx >/dev/null 2>&1)
python3 previews.py "$LESSON" "$OUT"                  # 4 page images, Part crops, cumulative answer reveals
COURSE=$(node -e "console.log(require('./$LESSON').course)")
node make_helpslip.js "$COURSE" "$OUT" >/dev/null     # 5 help slip printable + slide images
(cd "$OUT" && python "$SOFF" --headless --convert-to pdf *_HelpSlip_*.docx >/dev/null 2>&1)
python3 helpslip_img.py "$COURSE" "$OUT"
node render_deck.js "$LESSON" "$OUT" "$DV"            # 6 the deck (fails on fit warnings)
python /mnt/skills/public/pptx/scripts/office/validate.py "$OUT"/*_Deck_*.pptx | tail -1
