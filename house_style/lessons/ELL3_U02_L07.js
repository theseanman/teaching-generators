// ELL3 U2 L07 — Unit 2 Test, PART A PEER-MARKED in the same class (the U1 L14 routine). Taught Tue Nov 17 (C) / Wed Nov 18 (G)
// (practice test cut Nov 3; L06 is not taught), before the Nov 20 suggested marks cut-off (MyEd Nov 26).
// Nov 6 2026 (marking-time rule): 50-minute write; Part A is now Sections A–D (/32, D fixed in place); Mr. Reid marks E and F
// (/28); the core-competency self-reflection is written in the same period, after the marking. Data: ELL3_U02_testdata.js.
// Next class starts Unit 3 (Sean, Oct 23: G's Fri Nov 20 class begins the next unit); its shape goes here once Unit 3 is built.
// Build: node check_lesson.js lessons/ELL3_U02_L07.js && node render_deck.js lessons/ELL3_U02_L07.js out/ELL3_U02_L07 v1
const D = require("./ELL3_U02_testdata.js");
const T = D.unit.ELL3, PB = D.partB.unit.ELL3, LV = T.lvl;
module.exports = {
 course: "ELL3", testDeck: true,
 meta: { unit: 2, unitTitle: "Saying It Sideways", lesson: 7, title: "Unit 2 Test", subtitle: "Show what you can do, then mark Part A together", month: "November" },
 banner: { obj: "Show what you learned in Unit 2, then mark a partner’s Part A together.",
   std: "W3 · W2 · W6 · W12 · W14  ·  reading: comparisons and evidence  —  the outcomes on the unit test", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students write the Unit 2 test (/60) in 50 minutes, swap and mark Part A (/32, Sections A–D) together, then write the core-competency self-reflection. You mark Part B (E and F).",
  outcomes: "W3 · W2 · W6 · W12/W14 · reading: what a comparison does, with paragraph evidence",
  schwerpunkt: "every student writes the whole test under test conditions; marking Part A afterward is a bonus, never taken out of writing time.",
  schwerStep: 1,
  materials: "Deck · ELL3_U02_UnitTest, one each plus spares · pencils and erasers · a coloured pen for every student · ELL3_U02_TestKeys for you · core-competency self-reflection sheets (district template), one each · a tray for finished tests",
  timing: "80 minutes",
  steps: [
   ["2", "How the unit test works", "60 marks, and it counts. Pencil only, work alone, no phones or translators. 50 minutes. Hand out the tests."],
   ["50", "Write the Unit 2 test", "Part A, then Part B; they read The Radio in the Garage twice before Section E. Section D is fixed ON the paragraph. Finished students tick the Section F checklist, turn the paper over and read quietly. Circulate; answer questions about instructions only. Call ten and five minutes left."],
   ["2", "Swap papers", "Pencils away, coloured pens out. Swap with a partner. The marker writes “Marked by” and their name at the top, and marks beside the writer’s answers, never over them."],
   ["14", "Mark Part A together", "Sections A–D, one answer per slide with its mark. Section C is 2 per item, two checks: no like / as … as / feeling word, and something the writer did or their body did. Section D: +1 for each of the eight spots fixed on the paragraph, nothing else marked. Circled answers are yours to decide. Part A out of 32 with its level band."],
   ["2", "Part B: Mr. Reid marks it", "Markers do NOT touch Part B. Show how Sections E and F will be judged; the full Section F rubric is on the last page of their test."],
   ["8", "Core-competency self-reflection", "Tests back to their owners to check the Part A adding, then into the tray. Hand out the self-reflection sheets; students complete them alone. Collect them to copy."],
   ["2", "Agendas", "Next class slide, then agendas."] ],
  diff: "Support: none during the test beyond reading an instruction aloud. During marking, partners may read each answer on the screen aloud together before marking it. Extension: early finishers re-read Section F against its checklist.",
  assess: "Summative. Check the Part A peer marking against the key before entering, especially the circled Section C answers. Mark Part B yourself: E claim / evidence (the right paragraph number with words from it) / explanation, F on the four-line rubric with a level per criterion for the report.",
  homework: "None tonight. Unit 3 starts next class.",
  watch: "Students who finish early distracting others before the swap. Markers writing over answers. Section C answers with like or a feeling word given the first mark. Markers writing anything on Part B. Time: start the self-reflection by minute 70." },
 shape: [["How the unit test works", "instructions"], ["Write the Unit 2 test", "test"], ["Swap papers", "partner marking"],
   ["Mark Part A together", "partner marking"], ["How Part B is marked", "rubric"], ["Self-reflection", "independent writing"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "rows", label: "How it works", tag: "Unit 2 test", head: "How the unit test works", rows: [
    ["Two parts", "Part A (language), then Part B (reading and writing)."], ["60 marks", "This test counts."],
    ["Alone", "Pencil only. No phones. No translators. Try every question."], ["Time", "50 minutes today."]] },
  { type: "rows", label: "Write now", tag: "Unit 2 test", head: "Write the Unit 2 test now", rows: [
    ["Part A", "Read each box. Look at the example first. Section D: fix the mistakes ON the paragraph."], ["Part B", "Read The Radio in the Garage twice before Section E."],
    ["Finished?", "Tick the Section F checklist. Turn your paper over. Read quietly."]] },
  { type: "rows", label: "Swap papers", tag: "Swap and mark", head: "Pencils down. Swap papers.", rows: [
    ["1", "Put your pencil away. Take a coloured pen."], ["2", "Swap with a partner."],
    ["3", "At the top, write: Marked by + your name."]] },
  { type: "rows", label: "How to mark", tag: "Swap and mark", head: "How to mark Part A", rows: [
    ["✓", "Right: tick it. +1 means one mark."], ["✗", "Wrong: cross it. Write the right answer beside it."],
    ["+2", "Two marks: give one mark for each part that is right."], ["?", "Not sure? Circle it. Mr. Reid decides."],
    ["Never", "Never change your partner’s writing. Do not mark Part B."]] },
  ...D.markBlocks("unit", "A"),
  { type: "rows", label: "Part B", tag: `Part B · ${T.partB} marks`, head: "Part B: Mr. Reid marks it", rows: [
    ["E", "Each answer: your answer +1, the right paragraph number with words from it +1, why +1."],
    ["F", "Your paragraph: a level on each of four rubric lines, 1 to 4 points."]] },
  { type: "rows", label: "Section F rubric", tag: "Part B · Section F", head: "How your paragraph is marked", rows:
    D.rubric.criteria.map(c => [c.code, c.name]) },
  { type: "rows", label: "Hand it in", tag: "Before you go", head: "Give it back, then hand it in", rows: [
    ["1", "Give the test back to its owner."], ["2", "Owner: check the Part A adding."],
    ["3", "Every test goes in the tray."]] },
  { type: "rows", label: "Self-reflection", tag: "Core competencies", head: "Your self-reflection", rows: [
    ["1", "Take one sheet. Work alone."], ["2", "Answer every part in full sentences."],
    ["3", "Hand it to Mr. Reid when you finish."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Unit 3", noCountdown: true, items: [
    ["Unit 3 begins", "new unit"], ["Your exercise book", "bring it"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Next class", "Unit 3 starts."], ["Homework", "None tonight."], ["Bring", "Your exercise book."]] } ]
};
