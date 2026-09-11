// ELL3 U1 L03 — September Writing Sample (the class write). ALL content here; the renderer holds the design.
// Unit order (decided Sep 11 2026): L1 Where You Are From · L2 Cold Start: First Reading · L3 this · L4 General and Specific · …
// Build: bash build.sh lessons/ELL3_U01_L03.js v2 v2
module.exports = {
 course: "ELL3",
 meta: { unit: 1, unitTitle: "The Exact Thing", lesson: 3, title: "September Writing Sample", subtitle: "Class write", month: "September" },
 banner: { obj: "Write the September class write on your own, in 80 minutes.",
   std: "Evidence  W1 \u00B7 W12 \u00B7 W14  \u2014  a baseline sample, not marked in this unit", lit: ["COM", "TH"] },
 plan: {
  objective: "Students write the district September writing sample on their own, in one 80-minute block, with the required header and double spacing.",
  outcomes: "Evidence for W1, W12 and W14. Baseline only \u2014 not marked in this unit.",
  materials: "Deck \u00B7 Lesson 3 worksheet (header + double-spaced writing pages), one per student plus spares \u00B7 blue/black pens, spares on hand \u00B7 a clock students can see \u00B7 class list \u00B7 phone/camera to photograph papers",
  timing: "80 minutes \u2014 the writing time is fixed",
  steps: [
   ["5", "Settle and header", "Phones away before anything else. Warm-up slide up (silent \u2014 no exercise-book writing today). Hand out the worksheet; students fill in Part A, the five-line header. Walk the room and check every header and that everyone has a pen, not a pencil."],
   ["5", "Rules, prompt and plan", "Rules slide and the 80-minutes slide, briefly. Prompt slide: read the day\u2019s prompt aloud twice, key words circled. Prompt-words slide for the three words students may not know. Planning slide: students answer the three frames silently and note three ideas in the margin. No further explanation."],
   ["60", "Write", "Silent, on your own. Call the time at 20 and 40 minutes \u2014 a cue to check progress, not a stop. Answer questions about the rules only, never about words or ideas."],
   ["7", "Read back", "Students read their writing back once and tick Part C, the checklist. Capitals, periods, header, and whether they answered the question asked."],
   ["3", "Exit and collect", "Exit ticket, Part D, on the sheet. Collect every paper; count against the class list. Photograph every paper tonight."] ],
  diff: "None to the writing itself: this is a baseline and must be unaided. Allowed: the prompt read aloud twice and its key words defined before writing starts; any accommodations a student already has in place. A student absent today writes it in the next block they attend.",
  assess: "Not marked in this unit. It is the September baseline for W1, W12 and W14; the same kind of prompt returns in June for comparison. Photograph every paper tonight and file the originals.",
  homework: "None.",
  watch: "Pencil or single-spaced writing \u2014 fix before minute 5, not at the end. Students who stop after one paragraph at the 20-minute call: remind them the time call is a checkpoint. Any phone out after the prompt goes up." },
 shape: [["Header: five lines, top right", "set-up"], ["The rules", "instructions"], ["Read the prompt twice", "silent reading"], ["Plan in the margin", "silent planning"],
   ["Write \u2014 on your own", "independent writing"], ["Read it back", "self-check"], ["Exit ticket \u2014 Part D", "quick write"], ["Next class", "exercise book"]],
 sequence: [
  { type: "warmup", label: "Warm-up", head: "Warm-up \u2014 silent today", note: "No writing in your exercise book today. Just think.",
    prompts: ["Today is the class write. Read the prompt on the screen twice before you pick up a pen.", "What is it actually asking? Say the question back to yourself in your own words."] },
  { type: "title", label: "Today\u2019s lesson" },
  { type: "goals", label: "Today\u2019s goals", items: ["Write the class write in 80 minutes, on your own.", "Set up the header and the double spacing exactly as required.", "Use the time: plan briefly, write most of it, read it back."] },
  { type: "handout", label: "Hand out the worksheet", note: "Header first. Then we go through the rules before you write.", foot: "The exit ticket is the last Part. The whole sheet comes to me at the end." },
  { type: "walk", part: "A" },
  { type: "rows", label: "The rules", tag: "Instructions", head: "The rules", rows: [
    ["Pen", "Black or blue pen. Not pencil."], ["Spacing", "Write on every line of your worksheet. The spacing is already double."],
    ["Header", "Top of Part A: full name, student number, grade, ELL level, date."], ["On your own", "No phones, no translators, no talking. Ask me only about the rules."]] },
  { type: "rows", label: "The 80 minutes", tag: "Instructions", head: "The 80 minutes", rows: [
    ["First 10 min", "Header. Read the prompt twice, circle the key words, plan three ideas in the margin."], ["60 min", "Write. Keep going. A finished draft with mistakes beats a perfect first line."],
    ["Last 10 min", "Read it back: capitals, periods, and did you answer the question asked? Check the header."], ["Hand in", "Your paper comes to me. You will see this piece again in June."]] },
  { type: "rows", label: "The prompt", tag: "The prompt", head: "Today\u2019s prompt", icon: "icon-pen.png", big: "Read it twice.", rows: [
    ["Mon Sept 14", "What is one way someone has helped you that you will always remember?"], ["Tue Sept 15", "How can friends help each other feel like they belong?"],
    ["Your job", "Answer your class day\u2019s prompt. One piece, as good as you can make it."]] },
  { type: "vocab", label: "Words in the prompts", head: "Words in the prompts", words: [
    ["remember", "to keep something in your mind; not forget it"], ["belong", "to feel that you are part of a group or place"], ["support", "help that lets someone do something they could not do alone"],
    ["prompt", "the question or instruction you must write about"], ["plan", "a few words in the margin deciding what you will say"], ["read back", "read your own writing as if you were the reader"]] },
  { type: "rows", label: "Plan in your head", tag: "Planning", head: "Plan in your head, then begin", icon: "icon-read.png", big: "Silent.", rows: [
    ["1", "The prompt is asking me about _____."], ["2", "My three ideas are _____, _____, and _____."], ["3", "The specific detail I will start with is _____."]] },
  { type: "walk", part: "B" },
  { type: "rows", label: "Write", tag: "Your turn", head: "Write \u2014 on your own", icon: "icon-pen.png", big: "60 minutes. Keep going.", rows: [
    ["Plan", "Three ideas in the margin, then start writing."], ["20 and 40", "I will call the time. Check where you are \u2014 do not stop."],
    ["Finish", "Finish the whole piece before you polish any part of it."]] },
  { type: "walk", part: "C" },
  { type: "exit", label: "Exit ticket", part: "D", note: "Finished? Hand me your whole worksheet." },
  { type: "next", label: "Next class", title: "General and Specific", sub: "Bring your exercise book. Your Voices Notebook starts next class." },
  { type: "rows", label: "Exercise books", tag: "Before you go", head: "Take out your exercise book", icon: "icon-calendar.png", big: "Write it down before you leave.", rows: [
    ["Next class:", "General and Specific \u2014 your Voices Notebook starts."], ["Homework:", "None."], ["Remember:", "Your Lesson 1 paragraph stays in your duotang. We use it next class."]] } ],
 worksheet: {
  objective: "Write the September class write on your own, in 80 minutes.",
  outcomes: "Evidence for W1, W12 and W14  \u2022  a baseline sample, not marked in this unit",
  parts: [
   { id: "A", title: "Your header", kind: "cloze", instr: "Complete every line before you write. The example line is already done for you.",
     example: { text: "ELL level:", ans: "3", tail: "" },
     items: [ { text: "Full name:", ans: "", tail: "" }, { text: "Student number:", ans: "", tail: "" }, { text: "Grade:", ans: "", tail: "" }, { text: "Date:", ans: "", tail: "" } ],
     how: "Fill in all four lines in pen before you start writing. ELL level is already done: you are all level 3. Your date is today\u2019s date." },
   { id: "B", title: "Your writing", kind: "open", lines: 31, gap: 480,
     instr: "Black or blue pen. Write on every line \u2014 the spacing is already double. Continue on the back if you need more room.",
     how: "Write straight through, on every line. The lines are already double-spaced, so there is room to fix things. Keep going when I call the time." },
   { id: "C", title: "Check your work", kind: "check", instr: "Read your writing back once. Tick each box when it is true.",
     checks: ["My header has all five lines.", "I answered the question in the prompt.", "Every sentence starts with a capital letter.", "Every sentence ends with a period or other end mark.", "I wrote in pen, on the lines.", "I read it back once, all the way through."],
     how: "Read your whole piece once, slowly, as if you were the reader. Tick a box only when it is true. Fix small things neatly." },
   { id: "D", title: "Exit ticket", kind: "exit", lines: 5, instr: "Answer, then hand me your whole worksheet.",
     items: [ { text: "Which part of the prompt was hardest to answer, and why?" } ],
     how: "Answer in two or three sentences. Then hand me your whole worksheet." } ] },
 texts: {}
};
