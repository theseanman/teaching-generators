// ELL12 U1 L14 — Unit 1 Test, PEER-MARKED in the same class (Sean, Oct 16 2026).
// Students write the unit test, swap with a same-level partner and mark Part A and Part B together; tests go to Mr. Reid,
// who enters unit-test levels in the Gradebook. Data: ELL12_U01_testdata.js. Next class is U2 L1 (its shape read from its own file).
const D = require("./ELL12_U01_testdata.js"), MK = require("../marking.js"), NEXT = require("./ELL12_U02_L01.js");
const T = D.unit;
module.exports = {
 course: "ELL12", testDeck: true,
 meta: { unit: 1, unitTitle: "Who I Am", lesson: 14, title: "Unit 1 Test", subtitle: "Show what you can do, then mark it together", month: "October" },
 banner: { obj: "Show what you learned in Unit 1, then mark a partner’s test together.",
   std: "ELL 1: W1 · W2 · W5 · W7 · W9 · W11  •  ELL 2: W1 · W2 · W3 · W7 · W9", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students write the Unit 1 test (/60), then swap with a same-level partner and mark Parts A and B together: a mark on every answer, a level per section, a running total. Tests come to you.",
  outcomes: "ELL 1: W1 · W2 · W5 · W7 · W9 · W11. ELL 2: W1 · W2 · W3 · W7 · W9.",
  materials: "Deck · ELL 1 and ELL 2 unit tests (ELL12_U01_UnitTest) · a coloured pen for every student · the answer key (ELL12_U01_TestKeys) for you",
  timing: "80 minutes",
  steps: [
   ["3", "How the test works", "60 marks; it counts. Pencil only, work alone, no phones or translators, no talking. Hand out the ELL 1 and ELL 2 papers."],
   ["45", "Write the Unit 1 test", "Part A, then Part B (Room 148). Finished students do the Check your work box, turn the paper over and read quietly. Circulate; answer questions about instructions only."],
   ["2", "Swap papers", "Pencils away, coloured pens out. Swap with a partner at the SAME level (ELL 1 with ELL 1, ELL 2 with ELL 2). The marker writes “Marked by” and their name at the top."],
   ["20", "Mark Part A together", "Section by section, ELL 1 and ELL 2 alternating. Each answer shows its mark (+1 or +2, with what earns each mark). Markers tick or cross and fill in the section box. Each total slide gives the level band and the running Part A total; ELL 1 Sections C and D give one W11 level together."],
   ["8", "Mark Part B together", "For each level: what the writer had to do and one good answer. Then one rubric line at a time, levels alternating: the marker circles the level and writes its mark. Nothing written scores 0."],
   ["2", "Add it up, hand it in", "Markers add Part A and Part B, write the total out of 60 and sign. All tests come to you."] ],
  diff: "Support: read the Part B checklist aloud to ELL 1 before they write; the word boxes stay visible. Extension: none during the test; ELL 2 early finishers check every comma before because.",
  assess: "Summative. Check the peer marking against the key (ELL12_U01_TestKeys) before entering: the section levels go in the Gradebook, and Part B rubric levels are the levels for those outcomes.",
  homework: "None. Unit 2 (My School Day) starts next class.",
  watch: "Students who finish early distracting others before the swap. Markers writing over answers (pen beside, never over). Two-mark items marked all-or-nothing. Generous Part B levels: check them yourself before entering." },
 shape: [["How the test works", "instructions"], ["Write the Unit 1 test", "test"], ["Swap papers", "partner marking"],
   ["Mark Part A together", "partner marking"], ["Mark Part B together", "partner marking"], ["Add it up", "marking"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "rows", label: "How it works", tag: "Unit 1 test", head: "How the test works", rows: [
    ["Two parts", "Part A (words and grammar), then Part B (writing)."], ["60 marks", "This test counts."],
    ["Alone", "Pencil only. No phones. No talking."], ["Time", "45 minutes."]] },
  { type: "rows", label: "Write now", tag: "Unit 1 test", head: "Write the Unit 1 test now", rows: [
    ["Part A", "Read each box. Look at the example first."], ["Part B", "Room 148: follow the checklist."],
    ["Finished?", "Do the Check your work box. Turn your paper over. Read quietly."]] },
  { type: "rows", label: "Swap papers", tag: "Swap and mark", head: "Pencils down. Swap papers.", rows: [
    ["1", "Put your pencil away. Take a coloured pen."], ["2", "Swap with a partner at YOUR level: ELL 1 with ELL 1, ELL 2 with ELL 2."],
    ["3", "At the top, write: Marked by + your name."]] },
  { type: "rows", label: "How to mark", tag: "Swap and mark", head: "How to mark", rows: [
    ["✓", "Right: tick it. +1 means one mark."], ["✗", "Wrong: cross it."],
    ["+2", "Two marks: give one mark for each part that is right."], ["Box", "Count the ticks. Write the score in the section box."],
    ["Never", "Never change your partner’s writing."]] },
  ...MK.partA(T),
  { type: "rows", label: "Mark Part B together", tag: "Part B", head: "Mark Part B together", rows: [
    ["1", "Read your partner’s writing once, all the way through."], ["2", "We look at ONE rubric line at a time."],
    ["3", "Circle the level that fits best. Write its mark beside it."], ["0", "Nothing written? The mark is 0."]] },
  ...MK.partB(T, D.partB.unit, D.RUB),
  { type: "rows", label: "Hand it in", tag: "Before you go", head: "Sign it and hand it in", rows: [
    ["1", "Write the total out of 60 at the top."], ["2", "Sign it: Marked by + your name."], ["3", "Give the test to Mr. Reid."]] },
  { type: "nextshape", label: "Next class", head: `Next class: ${NEXT.meta.title}`, items: NEXT.shape },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Next class", "Unit 2 starts: My School Day."], ["Homework", "None tonight."], ["Bring", "A pencil."]] } ]
};
