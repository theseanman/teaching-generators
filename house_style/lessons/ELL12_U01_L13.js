// ELL12 U1 L13 — Practice Test, PEER-MARKED (Sean, Oct 16 2026; replaces the Sep 26 self-marking version, which is in git history).
// Students write the practice test, swap with a same-level partner and mark Part A and Part B together in the same class:
// every answer shows its mark, every section ends on a total slide with its level band and the running Part A total.
// All questions, answers and marks come from ELL12_U01_testdata.js (checked against the printed tests and the key).
// Sean's rulings, Oct 16 2026: partners mark Part B as a class; any opening from the list + comma is right; a comma after an
// opening is right either way on the capitals items; levels show on every section-total slide; slides say "good copy".
const D = require("./ELL12_U01_testdata.js"), MK = require("../marking.js");
const T = D.practice;
module.exports = {
 course: "ELL12", testDeck: true,
 meta: { unit: 1, unitTitle: "Who I Am", lesson: 13, title: "Practice Test", subtitle: "Write it, then mark a partner’s paper together", month: "October" },
 banner: { obj: "Try the practice test, then mark a partner’s paper together.",
   std: "ELL 1: W1 · W2 · W5 · W7 · W9 · W11  •  ELL 2: W1 · W2 · W3 · W7 · W9", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students write the Unit 1 practice test (/40), then swap with a same-level partner and mark Parts A and B together: a mark on every answer, a level per section, a running total. Not entered.",
  outcomes: "ELL 1: W1 · W2 · W5 · W7 · W9 · W11. ELL 2: W1 · W2 · W3 · W7 · W9.",
  materials: "Deck · ELL 1 and ELL 2 practice tests (ELL12_U01_PracticeTest) · a coloured pen for every student · the answer key (ELL12_U01_TestKeys) for you",
  timing: "80 minutes",
  steps: [
   ["3", "How the practice test works", "Same shape as the unit test, 40 marks, nothing counts. Pencil only, work alone, no phones or translators. Hand out the ELL 1 and ELL 2 papers."],
   ["38", "Write the practice test", "Part A, then Part B (my bedroom). Finished students do the Check your work box, turn the paper over and read quietly. Circulate; do not help with answers, but note what students ask about."],
   ["2", "Swap papers", "Pencils away, coloured pens out. Swap with a partner at the SAME level (ELL 1 with ELL 1, ELL 2 with ELL 2). The marker writes “Marked by” and their name at the top."],
   ["22", "Mark Part A together", "Section by section, ELL 1 and ELL 2 alternating. Each answer shows its mark (+1 or +2, with what earns each mark). Markers tick or cross, write the right answer beside each cross, and fill in the section box. Each total slide gives the level band and the running Part A total."],
   ["9", "Mark Part B together", "For each level: what the writer had to do and one good answer. Then one rubric line at a time, levels alternating: the marker circles the level that fits and writes its mark."],
   ["3", "Add it up, papers back", "Markers add Part A and Part B, write the total out of 40 and sign. Papers go back to their owners."],
   ["3", "What to study, agendas", "Owners circle their two weakest sections and write them in their agenda as what to study. The unit test is next class."] ],
  diff: "Support: ELL 1 pairs may point to each answer on the screen together before marking it. Extension: ELL 2 early finishers add a sixth sentence to Part B with an opening and a comma.",
  assess: "Formative only: nothing entered, nothing collected. Glance at the section totals as papers go back and note the sections most students lost marks on; reteach them for five minutes before the unit test.",
  homework: "Study the two sections you circled. Bring a pencil and an eraser to the unit test.",
  watch: "Markers writing over the writer’s answers (pen beside, never over). Two-mark items marked all-or-nothing. ELL 1 Part B: the task asks for ONE joined sentence, but rubric line W2 Meeting says “at least twice” — tell markers how you want it read." },
 shape: [["How the practice test works", "instructions"], ["Write the practice test", "test practice"], ["Swap papers", "partner marking"],
   ["Mark Part A together", "partner marking"], ["Mark Part B together", "partner marking"], ["Add it up and what to study", "planning"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "rows", label: "How it works", tag: "Practice test", head: "How the practice test works", rows: [
    ["Same shape", "Part A (words and grammar), then Part B (writing)."], ["40 marks", "It does NOT count. It is practice."],
    ["Alone", "Pencil only. No phones. Try every question."], ["Time", "38 minutes."]] },
  { type: "rows", label: "Write now", tag: "Practice test", head: "Write the practice test now", rows: [
    ["Part A", "Read each box. Look at the example first."], ["Part B", "My bedroom: follow the checklist."],
    ["Finished?", "Do the Check your work box. Turn your paper over. Read quietly."]] },
  { type: "rows", label: "Swap papers", tag: "Swap and mark", head: "Pencils down. Swap papers.", rows: [
    ["1", "Put your pencil away. Take a coloured pen."], ["2", "Swap with a partner at YOUR level: ELL 1 with ELL 1, ELL 2 with ELL 2."],
    ["3", "At the top, write: Marked by + your name."]] },
  { type: "rows", label: "How to mark", tag: "Swap and mark", head: "How to mark", rows: [
    ["✓", "Right: tick it. +1 means one mark."], ["✗", "Wrong: cross it. Write the right answer beside it."],
    ["+2", "Two marks: give one mark for each part that is right."], ["Box", "Count the ticks. Write the score in the section box."],
    ["Never", "Never change your partner’s writing."]] },
  ...MK.partA(T),
  { type: "rows", label: "Mark Part B together", tag: "Part B", head: "Mark Part B together", rows: [
    ["1", "Read your partner’s writing once, all the way through."], ["2", "We look at ONE rubric line at a time."],
    ["3", "Circle the level that fits best. Write its mark beside it."]] },
  ...MK.partB(T, D.partB.practice, D.RUB),
  { type: "rows", label: "Papers back", tag: "Before you go", head: "Sign it and give it back", rows: [
    ["1", "Write the total out of 40 at the top."], ["2", "Sign it: Marked by + your name."], ["3", "Give the paper back to its owner."]] },
  { type: "rows", label: "What to study", tag: "Before you go", head: "What to study", rows: [
    ["1", "Look at your section boxes."], ["2", "Circle your TWO weakest sections."], ["3", "Write them in your agenda: study these."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Unit 1 Test", items: [
    ["How the test works", "instructions"], ["Write the Unit 1 test", "test"], ["Swap papers", "partner marking"],
    ["Mark Part A together", "partner marking"], ["Mark Part B together", "partner marking"], ["Add it up", "marking"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Next class", "The Unit 1 test."], ["Homework", "Study your two circled sections."], ["Bring", "A pencil and an eraser."]] } ]
};
