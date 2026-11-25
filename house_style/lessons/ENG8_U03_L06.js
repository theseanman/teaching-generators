// ENG8 U3 L06 — Unit 3 Quiz, PART A PEER-MARKED in the same class (the Unit 2 routine). Written Mon Dec 7 2026 (F and H).
// 60-minute standing order (Nov 6 2026): 45-minute write on the /50 paper; Part A is Sections A–C (/34, C fixed in place)
// marked in 12; Mr. Reid marks Part B (/16) on the rubric on the back of the writing sheet. Data: ENG8_U03_testdata.js.
// Build: node check_lesson.js lessons/ENG8_U03_L06.js && node render_deck.js lessons/ENG8_U03_L06.js out/ENG8_U03_L06 v1
const D = require("./ENG8_U03_testdata.js");
const T = D.unit.ENG8;
module.exports = {
 course: "ENG8", testDeck: true,
 meta: { unit: 3, unitTitle: "First Peoples Voices", lesson: 6, title: "Unit 3 Quiz", subtitle: "Show what you can do, then mark Part A together", month: "December" },
 banner: { obj: "Show what you learned in Unit 3, then mark a partner’s Part A together.",
   std: "Comprehend & Connect · Create & Communicate — the outcomes on the unit quiz", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students write the Unit 3 quiz (/50) in 45 minutes, swap and mark Part A (/34, Sections A–C) together, then look back at the unit in the exercise book. You mark Part B (/16).",
  outcomes: "Unit words · reading with evidence · conventions · a paragraph with evidence",
  schwerpunkt: "every student writes the whole quiz under test conditions; marking Part A afterward is a bonus, never taken out of writing time.",
  schwerStep: 2,
  materials: "Deck · ENG8_U03_UnitQuiz questions packet, answer sheet and writing sheet, one each plus spares · pencils and erasers · a coloured pen for every student · ENG8_U03_TestKeys (the quiz key) for you · exercise books · a tray for answer sheets and writing sheets.",
  timing: "80 minutes",
  steps: [
   ["2", "How the unit quiz works", "50 marks, and it counts. Pencil only, work alone, no phones. 45 minutes. Hand out three things: the questions packet, the answer sheet and the writing sheet."],
   ["45", "Write the Unit 3 quiz", "Part A, then Part B. They read “Why Orange Shirts?” twice before Section B. Section C is fixed ON the paragraph. Part B is one paragraph using the passage. Finished students tick the Part B checklist and read quietly. Call ten and five minutes left."],
   ["2", "Swap papers", "Pencils away, coloured pens out. Swap with a partner. The marker writes “Marked by” and their name at the top, and marks beside the writer’s answers, never over them."],
   ["12", "Mark Part A together", "Sections A–C, one answer per slide with its mark. Section B: +1 answer, +1 paragraph number; 90 years is also right for question 2. Section C: +1 for each of the ten spots fixed on the paragraph, nothing else marked. Circled answers are yours to decide. Part A out of 34 with its level band."],
   ["2", "Part B: Mr. Reid marks it", "Markers do NOT touch Part B. Show the four rubric lines; the full rubric is on the back of the writing sheet."],
   ["14", "Looking back at the unit", "Answer sheets back to their owners to check the Part A adding; answer sheets and writing sheets into the tray, questions packets collected separately. In the exercise book: what is one thing you understand about residential schools now that you did not in Lesson 1, and whose voice taught it to you? Not collected."],
   ["3", "Agendas", "Next class slide, then agendas."]],
  diff: "Support: none during the quiz beyond reading an instruction aloud. During marking, partners may read each answer on the screen aloud together before marking it. Extension: early finishers reread Part B against its checklist.",
  assess: "Summative. Check the Part A peer marking against the key before entering, especially circled answers. Part A bands are a proposal: Extending 31–34, Proficient 25–30, Developing 20–24, Emerging 0–19. Mark Part B yourself on the four rubric lines.",
  homework: "None tonight.",
  watch: "Students who finish early distracting others before the swap. Markers writing over answers. Markers writing anything on Part B. Time: writing and Part A marking end by minute 60." },
 shape: [["How the unit quiz works", "instructions"], ["Write the Unit 3 quiz", "quiz"], ["Swap papers", "partner marking"],
   ["Mark Part A together", "partner marking"], ["How Part B is marked", "rubric"], ["Looking back at the unit", "exercise book"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "rows", label: "How it works", tag: "Unit 3 quiz", head: "How the unit quiz works", rows: [
    ["Two parts", "Part A (reading and language), then Part B (writing)."], ["50 marks", "This quiz counts."],
    ["Alone", "Pencil only. No phones. Try every question."], ["Time", "45 minutes today."]] },
  { type: "rows", label: "Write now", tag: "Unit 3 quiz", head: "Write the Unit 3 quiz now", rows: [
    ["Part A", "Answers on your answer sheet. Section C: fix the mistakes ON the paragraph on the back."], ["Section B", "Read “Why Orange Shirts?” twice first."],
    ["Part B", "One paragraph on your writing sheet. Name at the top."],
    ["Finished?", "Tick the Part B checklist. Turn your paper over. Read quietly."]] },
  { type: "rows", label: "Swap papers", tag: "Swap and mark", head: "Pencils down. Swap papers.", rows: [
    ["1", "Put your pencil away. Take a coloured pen."], ["2", "Swap answer sheets with a partner."],
    ["3", "At the top, write: Marked by + your name."]] },
  { type: "rows", label: "How to mark", tag: "Swap and mark", head: "How to mark Part A", rows: [
    ["✓", "Right: tick it. +1 means one mark."], ["✗", "Wrong: cross it. Write the right answer beside it."],
    ["?", "Not sure? Circle it. Mr. Reid decides."],
    ["Never", "Never change your partner’s writing. Do not mark Part B."]] },
  ...D.markBlocks(),
  { type: "rows", label: "Part B", tag: `Part B · ${T.partB} marks`, head: "Part B: Mr. Reid marks it", rows:
    D.rubric.criteria.map(c => [c.code, c.name]) },
  { type: "rows", label: "Hand it in", tag: "Before you go", head: "Give it back, then hand it in", rows: [
    ["1", "Give the answer sheet back to its owner."], ["2", "Owner: check the Part A adding."],
    ["3", "Answer sheet and writing sheet go in the tray. Leave the questions on your desk."]] },
  { type: "rows", label: "Looking back", tag: "In your exercise book", head: "Looking back at the unit", rows: [
    ["1", "What do you understand about residential schools now that you did not in Lesson 1?"],
    ["2", "Whose voice taught it to you?"]] },
  { type: "nextshape", label: "Next class", head: "Next class: Unit 4", noCountdown: true, items: [
    ["Unit 4 begins", "new unit"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Done", "Unit 3 quiz written."],
    ["Next class", "Unit 4 begins."]] }],
 texts: { why: { title: D.WHY.title, lines: D.WHY.paras, unit: "paragraph" } }
};
