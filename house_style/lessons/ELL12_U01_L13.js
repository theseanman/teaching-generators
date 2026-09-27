// ELL12 U1 L13 — Practice Test, then go over the answers as a class (Sean, Sep 26 2026). The unit test follows next class.
// Question/answer Parts come from the practice-test content (ELL12_U01_PracticeTest_v1) via make_review_data.js -> ELL12_U01_L13.json,
// so the deck and the printed practice test cannot drift. Part B (writing) gets one good answer per level, not a key.
// This lesson prints NO worksheet of its own: students write on the practice test papers.
const D = require("./ELL12_U01_L13.json");
const retitle = { "2A-A2": "Fix the fragments", "2A-B2": "Join the pair", "2A-C2": "Start it differently" };
D.parts.forEach(p => { if (retitle[p.key]) p.title = retitle[p.key]; });
const G1 = "My small bed is next to the window. A soft rug is on the floor, and it is warm. My old desk is beside the door.";
const G2 = "My bedroom is small, but it is my favourite room. My bed is under the window, so I wake up with the sun. A blue rug is on the floor beside my desk. At night, I hear the rain on the glass. My room feels calm because it is only mine.";
const helpLine = "Stuck? Fill in a help slip: “Can you check my …?”  “I need help with …”";

module.exports = {
 course: "ELL12",
 meta: { unit: 1, unitTitle: "Who I Am", lesson: 13, title: "Practice Test", subtitle: "Try it, then check it together", month: "October" },
 banner: { obj: "Try the practice test, then check every answer together.",
   std: "ELL 1: W1 · W2 · W5 · W7 · W9 · W11  •  ELL 2: W1 · W2 · W3 · W7 · W9", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students write the Unit 1 practice test (/40) in the same shape as the unit test, then mark their own paper as the class goes over every answer. Nothing is entered.",
  outcomes: "ELL 1: W1 · W2 · W5 · W7 · W9 · W11. ELL 2: W1 · W2 · W3 · W7 · W9.",
  materials: "Deck · ELL 1 and ELL 2 practice tests (ELL12_U01_PracticeTest_v1) · a coloured pen for self-marking · help slips",
  timing: "80 minutes",
  steps: [
   ["3", "How the practice test works", "Same shape as the unit test, 40 marks, nothing counts. Pencil, work alone, try every question. Hand out the papers."],
   ["40", "Write the practice test", "Part A then Part B (my bedroom). Circulate; do not help with answers, but note what students ask about."],
   ["2", "Coloured pens out", "Students swap pencil for a coloured pen and mark their own paper."],
   ["25", "Go over the answers", "Part A section by section, alternating ELL 1 and ELL 2, answers one at a time. Then Part B: the checklist and one good answer for each level."],
   ["7", "What to study", "Students circle their two weakest sections and write them in their agenda as what to study for the unit test."],
   ["3", "Next class and agendas", "The unit test is next class. Agendas out."] ],
  diff: "Support: ELL 1 may read the Part B checklist aloud with you before writing; allow the word boxes to stay visible. Extension: ELL 2 early finishers add a sixth sentence to Part B with an opening and a comma.",
  assess: "Formative only: nothing entered. Students self-mark in colour. Watch which sections most students miss and reteach them for five minutes at the start of the unit test lesson.",
  homework: "Study the two sections you circled. Bring a pencil and an eraser to the unit test.",
  watch: "Students copying answers during the review instead of marking. ELL 2 commas before because. ELL 1 missing capitals on names. Part B paragraphs with no ending." },
 shape: [["How the practice test works", "instructions"], ["Write the practice test", "test practice"], ["Go over the answers", "class review"],
   ["Part B: one good answer", "reading"], ["What to study", "planning"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "rows", label: "How it works", tag: "Practice test", head: "How the practice test works", icon: "icon-pen.png", rows: [
    ["Same shape", "Part A (words and grammar), then Part B (writing)."], ["40 marks", "It does NOT count. It is practice."],
    ["Work alone", "Pencil only. Try every question."], ["Time", "40 minutes."]] },
  { type: "rows", label: "Write now", tag: "Practice test", head: "Write the practice test now", icon: "icon-pen.png", rows: [
    ["Part A", "Read each box. Do the example first."], ["Part B", "My bedroom: follow the checklist."], ["Finished?", "Check every answer again."]] },
  { type: "rows", label: "Coloured pens out", tag: "Go over the answers", head: "Pens down. Coloured pens out.", icon: "icon-folder.png", rows: [
    ["1", "Put your pencil away."], ["2", "Take a coloured pen."], ["3", "Tick each right answer. Fix each wrong one."]] },
  ...D.walks,
  { type: "rows", label: "Part B checklist (ELL 1)", tag: "Part B · ELL 1", head: "Part B: my bedroom (ELL 1)", rows: D.pb1.musts.map((m, i) => [String(i + 1), m]) },
  { type: "prose", text: "g1", label: "Part B good answer (ELL 1)" },
  { type: "rows", label: "Part B checklist (ELL 2)", tag: "Part B · ELL 2", head: "Part B: my bedroom (ELL 2)", rows: D.pb2.musts.map((m, i) => [String(i + 1), m]) },
  { type: "prose", text: "g2", label: "Part B good answer (ELL 2)" },
  { type: "text2", a: "g1", b: "g2", label: "Both good answers", tag: "Part B · both levels", head: "Two good answers" },
  { type: "rows", label: "What to study", tag: "Before you go", head: "What to study", icon: "icon-book.png", rows: [
    ["1", "Count your ticks in each section."], ["2", "Circle your TWO weakest sections."], ["3", "Write them in your agenda: study these."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Unit 1 Test", items: [
    ["Quick review", "class review"], ["Unit 1 test", "test"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Next class", "The Unit 1 test."], ["Homework", "Study your two circled sections."], ["Bring", "A pencil and an eraser."]] } ],
 sheets: [
  { lvl: "ELL 1", suffix: "1A", label: "ELL 1", objective: "Practice test review.", outcomes: "ELL 1 (review only; the practice test is the paper)", helpLine },
  { lvl: "ELL 2", suffix: "2A", label: "ELL 2", objective: "Practice test review.", outcomes: "ELL 2 (review only; the practice test is the paper)", helpLine } ],
 worksheet: { parts: D.parts },
 texts: {
  para: { lvl: "ELL 2 · Part D", title: "Edit the paragraph", body: D.para },
  g1: { lvl: "ELL 1 · Part B", title: "My Bedroom (one good answer)", body: G1 },
  g2: { lvl: "ELL 2 · Part B", title: "My Bedroom (one good answer)", body: G2 } }
};
