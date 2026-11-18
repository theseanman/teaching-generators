// ELL3 U3 L07 — Unit 3 Test, PART A PEER-MARKED in the same class (the U1 L14 / U2 L07 routine).
// Taught Tue Dec 8 (C) / Wed Dec 9 (G). No practice test this unit (Sean, Nov 18 2026).
// 60-minute standing order (Nov 6 2026): 44-minute write on the /50 paper; Part A is Sections A–D (/25, D fixed in place)
// marked in 12; Mr. Reid marks E and F (/25). There is no core-competency self-reflection this time (that was for the Term 1
// report); the last block is a short look back at the unit in the exercise book. Data: ELL3_U03_testdata.js.
// Build: node check_lesson.js lessons/ELL3_U03_L07.js && node render_deck.js lessons/ELL3_U03_L07.js out/ELL3_U03_L07 v1
const D = require("./ELL3_U03_testdata.js");
const T = D.unit.ELL3, PB = D.partB.unit.ELL3, LV = T.lvl;
module.exports = {
 course: "ELL3", testDeck: true,
 meta: { unit: 3, unitTitle: "The Point of the Story", lesson: 7, title: "Unit 3 Test", subtitle: "Show what you can do, then mark Part A together", month: "December" },
 banner: { obj: "Show what you learned in Unit 3, then mark a partner’s Part A together.",
   std: "W1 · W3 · W6 · W9 · W10 · W12 · W14  —  the outcomes on the unit test", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students write the Unit 3 test (/50) in 44 minutes, swap and mark Part A (/25, Sections A–D) together, then look back at the unit in the exercise book. You mark Part B (E and F).",
  outcomes: "W1 · W3 irony · W10 · W11–W14 · W6 · W9 · reading as the prompt for writing",
  schwerpunkt: "every student writes the whole test under test conditions; marking Part A afterward is a bonus, never taken out of writing time.",
  schwerStep: 1,
  materials: "Deck · ELL3_U03_UnitTest, one each plus spares · pencils and erasers · a coloured pen for every student · ELL3_U03_TestKeys for you · exercise books · a tray for finished tests",
  timing: "80 minutes",
  steps: [
   ["2", "How the unit test works", "50 marks, and it counts. Pencil only, work alone, no phones or translators. 44 minutes. Hand out the tests."],
   ["44", "Write the Unit 3 test", "Part A, then Part B; they read The Science Poster twice before Section E. Section D is fixed ON the paragraph. Section F is a short essay in three paragraphs, on a different story from their good copy. Finished students tick the Section F checklist and read quietly. Circulate; answer questions about instructions only. Call ten and five minutes left."],
   ["2", "Swap papers", "Pencils away, coloured pens out. Swap with a partner. The marker writes “Marked by” and their name at the top, and marks beside the writer’s answers, never over them."],
   ["12", "Mark Part A together", "Sections A–D, one answer per slide with its mark. Every item has one right answer. Section C: didn’t see is also right for did not see. Section D: +1 for each of the six spots fixed on the paragraph, nothing else marked. Circled answers are yours to decide. Part A out of 25 with its level band."],
   ["2", "Part B: Mr. Reid marks it", "Markers do NOT touch Part B. Show how Sections E and F will be judged; the full Section F rubric is on the last page of their test."],
   ["15", "Looking back at the unit", "Tests back to their owners to check the Part A adding, then into the tray. In the exercise book, two questions: what can you do in your writing now that you could not do in Lesson 1, and which sentence in your good copy are you most pleased with, as well as you can remember it? Not collected."],
   ["3", "Agendas", "Next class slide, then agendas."] ],
  diff: "Support: none during the test beyond reading an instruction aloud. During marking, partners may read each answer on the screen aloud together before marking it. Extension: early finishers re-read Section F against its checklist.",
  assess: "Summative. Check the Part A peer marking against the key before entering, especially any circled answers. Mark Part B yourself: E claim / evidence (the right paragraph number with words from it) / explanation, F on the four-line rubric with a level per line.",
  homework: "None tonight.",
  watch: "Students who finish early distracting others before the swap. Markers writing over answers. Section F written about the good-copy story: mark it, and note it on the paper. Markers writing anything on Part B. Time: writing and Part A marking end by minute 60." },
 shape: [["How the unit test works", "instructions"], ["Write the Unit 3 test", "test"], ["Swap papers", "partner marking"],
   ["Mark Part A together", "partner marking"], ["How Part B is marked", "rubric"], ["Looking back at the unit", "exercise book"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "rows", label: "How it works", tag: "Unit 3 test", head: "How the unit test works", rows: [
    ["Two parts", "Part A (language), then Part B (reading and writing)."], ["50 marks", "This test counts."],
    ["Alone", "Pencil only. No phones. No translators. Try every question."], ["Time", "44 minutes today."]] },
  { type: "rows", label: "Write now", tag: "Unit 3 test", head: "Write the Unit 3 test now", rows: [
    ["Part A", "Read each box. Look at the example first. Section D: fix the mistakes ON the paragraph."], ["Part B", "Read The Science Poster twice before Section E."],
    ["Section F", "A short essay in three paragraphs. Not the same story as your good copy."],
    ["Finished?", "Tick the Section F checklist. Turn your paper over. Read quietly."]] },
  { type: "rows", label: "Swap papers", tag: "Swap and mark", head: "Pencils down. Swap papers.", rows: [
    ["1", "Put your pencil away. Take a coloured pen."], ["2", "Swap with a partner."],
    ["3", "At the top, write: Marked by + your name."]] },
  { type: "rows", label: "How to mark", tag: "Swap and mark", head: "How to mark Part A", rows: [
    ["✓", "Right: tick it. +1 means one mark."], ["✗", "Wrong: cross it. Write the right answer beside it."],
    ["?", "Not sure? Circle it. Mr. Reid decides."],
    ["Never", "Never change your partner’s writing. Do not mark Part B."]] },
  ...D.markBlocks("unit", "A"),
  { type: "rows", label: "Part B", tag: `Part B · ${T.partB} marks`, head: "Part B: Mr. Reid marks it", rows: [
    ["E", "Each answer: your answer +1, the right paragraph number with words from it +1, why +1."],
    ["F", "Your essay: a level on each of four rubric lines, 1 to 4 points."]] },
  { type: "rows", label: "Section F rubric", tag: "Part B · Section F", head: "How your essay is marked", rows:
    D.rubric.criteria.map(c => [c.code, c.name]) },
  { type: "rows", label: "Hand it in", tag: "Before you go", head: "Give it back, then hand it in", rows: [
    ["1", "Give the test back to its owner."], ["2", "Owner: check the Part A adding."],
    ["3", "Every test goes in the tray."]] },
  { type: "rows", label: "Looking back", tag: "In your exercise book", head: "Looking back at the unit", rows: [
    ["1", "What can you do in your writing now that you could not do in Lesson 1?"],
    ["2", "Which sentence in your good copy are you most pleased with? Write it as well as you remember it."]] },
  { type: "nextshape", label: "Next class", head: "Next class", noCountdown: true, items: [
    ["A new unit begins", "new unit"], ["Your exercise book", "bring it"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Next class", "A new unit begins."], ["Homework", "None tonight."], ["Bring", "Your exercise book."]] } ]
};
