// ENG8 U3 L05 — Your Good Copy. ALL content here; the renderer holds the design.
// Unit 3 "First Peoples Voices" (replanned Nov 20 2026). Taught Thu Dec 3 (F and H). Unit test next class (Mon Dec 7).
// SUMMATIVE: the three-paragraph response is written in class on the Good Copy sheet and handed in before the bell; Sean
// marks it with the rubric printed on the back. Four lines (plan approved by Sean Nov 20): what happened, with evidence ·
// the detail · why her telling matters · paragraphs and conventions. Levels Emerging / Developing / Proficient / Extending.
// Sean, Nov 20: the conventions line is marked by the printed DESCRIPTORS (not counted errors, as on the Unit 2 good copy),
// with a cap: no overall above Developing when paragraphs and conventions is Emerging. The cap is on the teacher plan only.
// There is no separate drafting lesson: students write from their Lesson 4 outline (Part C) and Lesson 3 Part D paragraph.
// CURRICULUM CHECK, BC ELA 8: Create & Communicate — multi-paragraph compositions with unity, development and coherence;
// conventions. Comprehend & Connect — First Peoples perspectives; perspectives in texts; using two sources.
// Build: bash build.sh lessons/ENG8_U03_L05.js v1 v1  then  node make_goodcopy.js lessons/ENG8_U03_L05.js out/ENG8_U03_L05 v1
const LV = ["Emerging", "Developing", "Proficient", "Extending"];
const MODEL = require("./ENG8_U03_L04.js").texts.model;
module.exports = {
 course: "ENG8",
 meta: { unit: 3, unitTitle: "First Peoples Voices", lesson: 5, title: "Your Good Copy",
   subtitle: "Write your three-paragraph response and hand it in", month: "December" },
 banner: { obj: "Write your three-paragraph response about Phyllis Webstad’s story, then hand it in.",
   std: "Create & Communicate: multi-paragraph composition · evidence · conventions", lit: ["COM", "TH", "PS"] },
 countdown: "Unit test next class",
 plan: {
  objective: "Students write the good copy of their three-paragraph response from their Lesson 4 outline and Lesson 3 Part D paragraph, check it, and hand it in for marks.",
  outcomes: "Create & Communicate: multi-paragraph composition · evidence · conventions",
  schwerpunkt: "the good copy is written AND handed in before the bell, three paragraphs, each with its own job.",
  schwerStep: 7,
  materials: "Deck · Lesson 5 worksheet · Good Copy sheet with the rubric on the back, one each · second sheets · Lesson 3 and 4 worksheets · her page, projected or printed · stapler.",
  timing: "80 minutes",
  steps: [
   ["4", "Warm-up — your Lesson 4 outline", "Students reread their Lesson 4 Part C outline and their Lesson 3 Part D paragraph. Each underlines the three topic sentences."],
   ["1", "Goals", "Read the three goals. The good copy goes in today. Unit test next class."],
   ["6", "How your good copy is marked", "The four rubric lines from the back of the Good Copy sheet, in student words. Point at the tick boxes on the front."],
   ["3", "Three fixes", "A run-on, a fragment and a missing paragraph number, each with its fix. Ask for the fix before you show it."],
   ["8", "Part A — find it and fix it", "Five sentences with one mistake each. Students write each sentence again, fixed. Reveal one at a time. This is also practice for Section C of the test."],
   ["3", "The model again", "Show the Kai and Arjun model from Lesson 4 as a reminder of the shape. Remind them not to copy its sentences."],
   ["45", "Write your good copy", "★ Schwerpunkt. In pen, on the Good Copy sheet: three paragraphs, each indented, from the outline and the Lesson 3 paragraph. Every fact with a source and paragraph number. A title is optional. Second sheets at the front. Call 15 and 5 minutes left."],
   ["5", "Part B — check before you hand in", "Six tick boxes against the rubric. Fix anything they cannot tick."],
   ["4", "Exit ticket and hand in", "Part C: the paragraph they are proudest of, and why. Hand in the Good Copy sheet on top, then this worksheet, then the Lesson 4 outline."],
   ["1", "Next class and agendas", "Next class is the unit test. Study: the unit words, the Lesson 1 reading, fixing sentences, and writing a paragraph with evidence."]],
  diff: "Support: students may write paragraphs 1 and 2 only, plus one sentence for paragraph 3, and say so on the sheet. Extension: add a short quotation from her story, with its paragraph number, in paragraph 2 or 3.",
  assess: "★ SUMMATIVE: collect every Good Copy sheet. Mark it on its own with the rubric on the back, one level per line, by the printed descriptors. Cap (Sean, Nov 20): no overall above Developing when Paragraphs and conventions is Emerging. Overall = the level that comes up most often; on a tie, the middle level.",
  homework: "None. The good copy is handed in today. Study for the unit test.",
  watch: "Good copies that retell her story with no evidence. Paragraph 3 that only says “it is sad.” Sentences copied from the Kai and Arjun model. One block with no indents. Anyone still writing at the bell: collect it anyway." },
 shape: [["Your Lesson 4 outline", "warm-up"], ["Today’s goals", "reading together"],
   ["How your good copy is marked", "instruction"], ["Three fixes", "examples"],
   ["Part A — find it and fix it", "worksheet"], ["The model again", "reading together"],
   ["Write your good copy", "independent writing, for marks"], ["Part B — check before you hand in", "tick boxes"],
   ["Exit ticket and hand in", "quick write"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "warmup", label: "Warm-up", head: "Warm-up — your Lesson 4 outline",
    prompts: ["Reread your Lesson 4 outline (Part C) and your Lesson 3 Part D paragraph.",
      "Underline your three topic sentences."] },
  { type: "goals", label: "Today’s goals", items: [
    "Know how your good copy is marked.",
    "Write three paragraphs, each with its own job.",
    "Hand in your good copy before the bell."] },
  { type: "cards", label: "How your good copy is marked", tag: "Teaching", head: "How your good copy is marked",
    icon: "icon-read.png", big: "The back of your Good Copy sheet.", cards: [
    { title: "What happened", body: "Facts from both sources, each with a paragraph number." },
    { title: "The detail", body: "What the orange shirt stands for." },
    { title: "Why her telling matters", body: "What only Phyllis can tell us.", tone: "teal" },
    { title: "Paragraphs and conventions", body: "Three paragraphs, topic sentences, correct sentences.", tone: "teal" }] },
  { type: "rows", label: "Examples", tag: "Examples", head: "Three fixes", pair: 2, rows: [
    ["Run-on", "“Her shirt was taken she never saw it again.”"],
    ["Fixed", "“Her shirt was taken. She never saw it again.”"],
    ["Fragment", "“Because she was only six.”"],
    ["Fixed", "“It hurt because she was only six.”"],
    ["No source", "“The schools were far from home.”"],
    ["Fixed", "“The schools were far from home (reading, paragraph 4).”"]] },
  { type: "handout", label: "Hand out the worksheet", note: "Two sheets: today’s worksheet and the Good Copy sheet. Take out your Lesson 3 and Lesson 4 worksheets.",
    foot: "Everything is handed in at the end: good copy on top." },
  { type: "walk", part: "A", note: "One mistake in each sentence. Write the whole sentence again, fixed." },
  { type: "reveals", part: "A" },
  { type: "text", text: "model", label: "The model again", continues: "The model continues", budget: 320 },
  { type: "rows", label: "Your good copy", tag: "Your good copy", head: "Write your good copy", icon: "icon-pen.png", rows: [
    ["Write", "Three paragraphs, in pen, each indented."],
    ["Use", "Your Lesson 4 outline and your Lesson 3 Part D paragraph."],
    ["Every fact", "(reading, paragraph _) or (Phyllis, paragraph _)."],
    ["More room?", "Take a second sheet. Staple it behind."]] },
  { type: "walk", part: "B", note: "Six boxes on your sheet. Tick one only when it is true." },
  { type: "exit", label: "Exit ticket", part: "C", note: "Then hand in your good copy on top, this worksheet, then your Lesson 4 outline." },
  { type: "rows", label: "Hand in", tag: "Before you go", head: "Hand in", icon: "icon-folder.png", rows: [
    ["On top", "Your good copy (second sheet stapled behind)."],
    ["Next", "This worksheet."],
    ["Last", "Your Lesson 4 worksheet with the outline."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Unit 3 Test", noCountdown: true, items: [
    ["Unit test next class", "countdown"], ["Write the Unit 3 test", "test"], ["Mark Part A together", "peer marking"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Countdown", "Unit test next class: Monday, December 7."],
    ["Study", "The unit words · the Lesson 1 reading · fixing sentences · a paragraph with evidence."],
    ["Bring", "A pencil, an eraser and a coloured pen."]] }],
 texts: { model: MODEL },
 goodCopy: [
  { lvl: "English 8", title: "Phyllis Webstad’s Story: Good Copy", lines: 13, gap: 300, extraLines: 19,
    steps: "Answer the question: What does Phyllis Webstad’s story show about residential schools, and why does it matter that she tells it herself? Three paragraphs, in pen, each indented. Give a source and paragraph number for every fact. A title is optional. Need more room? Take a second sheet.",
    checks: ["Paragraph 1: what happened, with facts from both sources.", "Paragraph 2: what the orange shirt stands for.",
      "Paragraph 3: why it matters that she tells it herself.", "Every fact has a paragraph number. Complete sentences."],
    rubric: { title: "How your good copy is marked", intro: "Your good copy is marked on its own. Mr. Reid circles one level on each line.", levels: LV, criteria: [
      { code: "1", name: "What happened, with evidence", d: [
        "Few or no facts, or facts with no source or paragraph number.",
        "Some facts, but from one source only, or with paragraph numbers missing or wrong.",
        "Facts from both sources, each with its source and paragraph number.",
        "Well-chosen facts from both sources, linked to each other, all cited correctly."] },
      { code: "2", name: "The detail", d: [
        "The orange shirt is missing, or only mentioned.",
        "You retell what happened to the shirt but do not say what it stands for.",
        "You explain what the shirt stands for, with its paragraph number.",
        "You explain the shirt as a symbol and show how it carries her whole story."] },
      { code: "3", name: "Why her telling matters", d: [
        "Paragraph 3 is missing, or only says the story is sad.",
        "You say her story matters, but not why it matters that she tells it herself.",
        "You explain what only Phyllis can tell us, with a moment from her story.",
        "You explain her account as testimony, and what records or numbers cannot show."] },
      { code: "4", name: "Paragraphs and conventions", d: [
        "One block of writing, or errors make it hard to read.",
        "Paragraphs are there, but topic sentences are weak or missing, and errors sometimes get in the way.",
        "Three paragraphs, each with a topic sentence; sentences, spelling and punctuation are mostly correct.",
        "Three clear paragraphs with smooth transitions, and almost no errors."] } ] } }],
 worksheet: {
  objective: "Write your three-paragraph response about Phyllis Webstad’s story, then hand it in.",
  outcomes: "Create & Communicate: multi-paragraph composition  •  using evidence  •  conventions",
  parts: [
   { id: "A", title: "Find it and fix it", kind: "lines", weight: 8, lines: 2,
     instr: "Each sentence has ONE mistake. Write the whole sentence again with the mistake fixed.",
     example: { text: "phyllis went to the Mission when she was six.", ans: "Phyllis went to the Mission when she was six." },
     items: [
      { text: "Her granny bought the shirt it was bright orange.", ans: "Her granny bought the shirt. It was bright orange." },
      { text: "The children was crying.", ans: "The children were crying." },
      { text: "She never wore it again. Because it was taken.", ans: "She never wore it again because it was taken." },
      { text: "She tells her story so other’s can learn.", ans: "She tells her story so others can learn." },
      { text: "Every year, people wear orange on there shirts.", ans: "Every year, people wear orange on their shirts." }],
     how: "Look for one thing in each: a missing capital, two sentences run together, a verb that does not match, a piece of a sentence standing alone, or a wrong word." },
   { id: "B", title: "Check before you hand in", kind: "check",
     instr: "Read your good copy back. Tick each box when it is true.",
     checks: ["I wrote three paragraphs, each indented.",
       "Paragraph 1 has facts from both sources.",
       "Paragraph 2 says what the orange shirt stands for.",
       "Paragraph 3 says why it matters that she tells it herself.",
       "Every fact has a source and a paragraph number.",
       "I checked capitals, periods and complete sentences."],
     how: "Tick a box only when it is true. Fix anything you cannot tick before you hand it in." },
   { id: "C", title: "Exit ticket", kind: "exit", lines: 2,
     instr: "Answer, then hand this in with your good copy.",
     items: [
      { text: "Which of your three paragraphs are you proudest of? Why?" }],
     how: "One or two sentences. Hand in your good copy on top, then this worksheet, then your Lesson 4 outline." }] }
};
