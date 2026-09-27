#!/bin/bash
# Two-level (ELL 1/2) build:  bash build_ell12.sh lessons/ELL12_U01_L06.js [worksheet-version] [deck-version]
set -e
cd "$(dirname "$0")"
LESSON=$1; WSV=${2:-v1}; DV=${3:-v1}
ID=$(basename "$LESSON" .js); OUT=out/$ID; SOFF=/root/.claude/skills/synced/f31fe2fb-812f-4c33-954d-65d47eaac3c9_06ba07ab-6e97-43e9-a823-650b9ff9836f/docx/scripts/office/soffice.py
rm -rf "$OUT"; mkdir -p "$OUT"
node -e "require('./$LESSON')"
node check_lesson.js "$LESSON"
N=$(node -e "console.log(require('./$LESSON').sheets.length)")
for ((i=0;i<N;i++)); do node make_worksheet.js "$LESSON" "$OUT" "$WSV" "$i"; done
(cd "$OUT" && python3 "$SOFF" --headless --convert-to pdf *_Worksheet_*.docx >/dev/null 2>&1)
if [ "$(node -e "console.log(!!require('./$LESSON').goodCopy)")" = "true" ]; then
  node make_goodcopy.js "$LESSON" "$OUT" "$WSV"
  (cd "$OUT" && python3 "$SOFF" --headless --convert-to pdf *_GoodCopy_*.docx >/dev/null 2>&1)
  for f in "$OUT"/*_GoodCopy_*.pdf; do python3 -c "import pymupdf,sys; print('  '+sys.argv[1].split('/')[-1], len(pymupdf.open(sys.argv[1])), 'page(s)')" "$f"; done
fi
python3 pages_two.py "$LESSON" "$OUT"
node render_deck.js "$LESSON" "$OUT" "$DV"
python3 /root/.claude/skills/synced/f31fe2fb-812f-4c33-954d-65d47eaac3c9_06ba07ab-6e97-43e9-a823-650b9ff9836f/pptx/scripts/office/validate.py "$OUT"/*_Deck_*.pptx | tail -1
