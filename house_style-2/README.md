# house_style — the one builder for every course's decks and worksheets
Read DESIGN.md first. Build a lesson:  bash build.sh lessons/ELL3_U01_L02.js v2 v3
Files: theme.js (look) · render_deck.js (deck design) · make_worksheet.js · previews.py + locate.py (crops, answer reveals)
       make_helpslip.js + helpslip_img.py · check_lesson.js · icons.js (regenerates assets/) · courses/ · lessons/ · reference/
Runs in Claude's container (node + LibreOffice), not on the district Mac.
