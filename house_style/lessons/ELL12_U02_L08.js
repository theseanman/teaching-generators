// ELL12 U2 L08 — Unit 2 Test, PEER-MARKED in the same class (Sean's test routine, Oct 16 2026).
// Students write the unit test, swap with a same-level partner and mark Part A and Part B together.
// Data: ELL12_U02_testdata.js (one source for the printed papers, the key and this deck). Built Oct 23 2026.
// Part B is marked with the good-copy rubric lines from L06 (Sean approved them Oct 23).
const D = require("./ELL12_U02_testdata.js"), MK = require("../marking.js");
const T = D.unit;
module.exports = {
 course: "ELL12", testDeck: true,
 meta: { unit: 2, unitTitle: "My School Day", lesson: 8, title: "Unit 2 Test", subtitle: "Show what you can do, then mark it together", month: "November" },
 banner: { obj: "Show what you learned in Unit 2, then mark a partner's test together.",
   std: "ELL 1: W4 paragraph · W3 because · W5 capitals · W8 present tense  •  ELL 2: W3 · W4 transitions · W2 connecting · W7 punctuation", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students write the Unit 2 test (/60, it counts), then swap with a same-level partner and mark Parts A and B together. Tests come to you.",
  outcomes: "ELL 1: W4 · W3 · W5 · W8. ELL 2: W3 · W4 · W2 · W7.",
  schwerpunkt: "the opinion paragraph written alone under test conditions: opinion, three because-reasons, closing (ELL 2: with details and transitions).",
  schwerStep: 1,
  materials: "Deck · ELL 1 and ELL 2 unit tests (ELL12_U02_UnitTest) · a coloured pen for every student · the answer key (ELL12_U02_TestKeys) for you",
  timing: "80 minutes",
  steps: [
   ["3", "How the test works", "60 marks; it counts. Pencil only, work alone, no phones or translators, no talking. Hand out the ELL 1 and ELL 2 papers."],
   ["45", "Write the unit test", "Part A, then Part B (Should students have homework every day?). Finished students tick the Part B checklist, turn the paper over and read quietly. Circulate; answer questions about instructions only."],
   ["2", "Swap papers", "Pencils away, coloured pens out. Swap with a partner at the SAME level (ELL 1 with ELL 1, ELL 2 with ELL 2). The marker writes Marked by and their name at the top."],
   ["20", "Mark Part A together", "Section by section, ELL 1 and ELL 2 alternating. Each answer shows its mark; because items are 2 marks (+1 because, +1 a full sentence after it). Each total slide gives the level band and the running Part A total."],
   ["8", "Mark Part B together", "For each level: what the writer had to do and one good answer. Then one rubric line at a time, levels alternating: the marker circles the level and writes its mark. Nothing written scores 0."],
   ["2", "Add it up, hand it in", "Markers add Part A and Part B, write the total out of 60 and sign. All tests come to you."] ],
  diff: "Support: read the Part B checklist aloud to ELL 1 before they write. Extension: none during the test; ELL 2 early finishers check every comma after a transition.",
  assess: "Summative. Check the peer marking against the key (ELL12_U02_TestKeys) before entering: the section levels go in the Gradebook, and the Part B rubric levels are the levels for those outcomes. The Nov 26 MyEd deadline follows.",
  homework: "None. Unit 3 starts next class.",
  watch: "Markers writing over answers (pen beside, never over). Two-mark because items marked all-or-nothing. Generous Part B levels: check them yourself before entering." },
 shape: [["How the test works", "instructions"], ["Write the unit test", "test"], ["Swap papers", "partner marking"],
   ["Mark Part A together", "partner marking"], ["Mark Part B together", "partner marking"], ["Add it up", "marking"]],
 sequence: [
  { type: "title", label: "Today's lesson" },
  { type: "rows", label: "How it works", tag: "Unit 2 test", head: "How the test works", rows: [
    ["Two parts", "Part A (words and grammar), then Part B (writing)."], ["60 marks", "This test counts."],
    ["Alone", "Pencil only. No phones. No talking."], ["Time", "45 minutes."]] },
  { type: "rows", label: "Write now", tag: "Unit 2 test", head: "Write the unit test now", rows: [
    ["Part A", "Read each section. Look at the example first."], ["Part B", "Should students have homework every day? Follow the checklist."],
    ["Finished?", "Tick the checklist. Turn your paper over. Read quietly."]] },
  { type: "rows", label: "Swap papers", tag: "Swap and mark", head: "Pencils down. Swap papers.", rows: [
    ["1", "Put your pencil away. Take a coloured pen."], ["2", "Swap with a partner at YOUR level: ELL 1 with ELL 1, ELL 2 with ELL 2."],
    ["3", "At the top, write: Marked by + your name."]] },
  { type: "rows", label: "How to mark", tag: "Swap and mark", head: "How to mark", rows: [
    ["✓", "Right: tick it. +1 means one mark."], ["✗", "Wrong: cross it."],
    ["+2", "Two marks: give one mark for each part that is right."], ["Box", "Count the ticks. Write the score in the section box."],
    ["Never", "Never change your partner's writing."]] },
  ...MK.partA(T),
  { type: "rows", label: "Mark Part B together", tag: "Part B", head: "Mark Part B together", rows: [
    ["1", "Read your partner's paragraph once, all the way through."], ["2", "We look at ONE rubric line at a time."],
    ["3", "Circle the level that fits best. Write its mark beside it."], ["0", "Nothing written? The mark is 0."]] },
  ...MK.partB(T, D.partB.unit, D.RUB),
  { type: "rows", label: "Hand it in", tag: "Before you go", head: "Sign it and hand it in", rows: [
    ["1", "Write the total out of 60 at the top."], ["2", "Sign it: Marked by + your name."], ["3", "Give the test to Mr. Reid."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Unit 3", noCountdown: true, items: [["Unit 3 starts: A Celebration I Remember", "new unit"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [["Next class", "Unit 3 starts: A Celebration I Remember."], ["Homework", "None tonight."], ["Bring", "A pencil."]] } ]
};
