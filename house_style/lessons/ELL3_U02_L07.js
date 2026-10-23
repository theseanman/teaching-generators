// ELL3 U2 L07 — Unit 2 Test, PART A PEER-MARKED in the same class (the U1 L14 routine). Taught Wed Nov 18 (G) / Thu Nov 19 (C),
// before the Nov 20 suggested marks cut-off (MyEd Nov 26). Students write the unit test (/60) in 55 minutes, swap and mark Part A
// (/24) together. Mr. Reid marks all of Part B (D, E, F). Data: ELL3_U02_testdata.js.
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
  objective: "Students write the Unit 2 test (/60) in 55 minutes, then swap and mark Part A (/24) together: a mark per answer, section totals and Part A’s level. You mark Part B.",
  outcomes: "W3 · W2 · W6 · W12/W14 · reading: what a comparison does, with paragraph evidence",
  schwerpunkt: "every student writes the whole test under test conditions; marking Part A afterward is a bonus, never taken out of writing time.",
  schwerStep: 1,
  materials: "Deck · ELL3_U02_UnitTest, one each plus spares · pencils and erasers · a coloured pen for every student · ELL3_U02_TestKeys for you · a tray for finished tests",
  timing: "80 minutes",
  steps: [
   ["2", "How the unit test works", "60 marks, and it counts. Pencil only, work alone, no phones or translators. 55 minutes, so there is time to mark Part A. Hand out the tests."],
   ["55", "Write the Unit 2 test", "Part A, then Part B; they read The Radio in the Garage twice before Section E. Finished students tick the Section F checklist, turn the paper over and read quietly. Circulate; answer questions about instructions only. Call ten and five minutes left."],
   ["2", "Swap papers", "Pencils away, coloured pens out. Swap with a partner. The marker writes “Marked by” and their name at the top, and marks beside the writer’s answers, never over them."],
   ["14", "Mark Part A together", "Sections A, B and C, one answer per slide with its mark. Section C is 2 per item: 1 for a fact a reader can picture, 1 for using no new comparison; markers circle anything they are unsure of for you to decide. Section totals, then Part A out of 24 with its level band."],
   ["3", "Part B: Mr. Reid marks it", "Markers do NOT touch Part B. Show how Sections D, E and F will be judged; the full Section F rubric is on the last page of their test."],
   ["4", "Add Part A, hand in, agendas", "Papers go back to their owners to check the Part A adding, then every test goes in the tray. Next class slide, then agendas."] ],
  diff: "Support: none during the test beyond reading an instruction aloud. During marking, partners may read each answer on the screen aloud together before marking it. Extension: early finishers re-read Section F against its checklist.",
  assess: "Summative. Check the Part A peer marking against the key before entering, especially the circled Section C answers. Mark Part B yourself: D from the key (minus 1 for a new error), E claim / evidence / explanation, F on the four-line rubric with a level per criterion for the report.",
  homework: "None tonight. Unit 3 starts next class.",
  watch: "Students who finish early distracting others before the swap. Markers writing over answers. Section C new comparisons given the second mark. Markers writing anything on Part B." },
 shape: [["How the unit test works", "instructions"], ["Write the Unit 2 test", "test"], ["Swap papers", "partner marking"],
   ["Mark Part A together", "partner marking"], ["How Part B is marked", "rubric"], ["Add it up and hand it in", "marking"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "rows", label: "How it works", tag: "Unit 2 test", head: "How the unit test works", rows: [
    ["Two parts", "Part A (language), then Part B (reading and writing)."], ["60 marks", "This test counts."],
    ["Alone", "Pencil only. No phones. No translators. Try every question."], ["Time", "55 minutes today."]] },
  { type: "rows", label: "Write now", tag: "Unit 2 test", head: "Write the Unit 2 test now", rows: [
    ["Part A", "Read each box. Look at the example first."], ["Part B", "Read The Radio in the Garage twice before Section E."],
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
    ["D", "The eight fixes: +1 each, minus 1 for any new error."],
    ["E", "Each answer: claim +1, evidence +1, explanation +1."],
    ["F", "Your paragraph: a level on each of four rubric lines, 1 to 4 points."]] },
  { type: "rows", label: "Section F rubric", tag: "Part B · Section F", head: "How your paragraph is marked", rows:
    D.rubric.criteria.map(c => [c.code, c.name]) },
  { type: "rows", label: "Hand it in", tag: "Before you go", head: "Give it back, then hand it in", rows: [
    ["1", "Give the test back to its owner."], ["2", "Owner: check the Part A adding."],
    ["3", "Every test goes in the tray."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Unit 3", noCountdown: true, items: [
    ["Unit 3 begins", "new unit"], ["Your exercise book", "bring it"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Next class", "Unit 3 starts."], ["Homework", "None tonight."], ["Bring", "Your exercise book."]] } ]
};
