// ELL3 U2 L06 — Practice Test, PEER-MARKED in the same class (the U1 L13 routine). Taught Mon Nov 16 (G) / Tue Nov 17 (C);
// unit test Wed Nov 18 (G) / Thu Nov 19 (C). Students write the practice test (/40) in 45 minutes, swap, and mark the WHOLE
// paper together — Section F on the L05 good-copy rubric included, so they see the criteria from the inside. Nothing entered.
// Data: ELL3_U02_testdata.js (one source for the printed paper, the key and this deck).
// Build: node check_lesson.js lessons/ELL3_U02_L06.js && node render_deck.js lessons/ELL3_U02_L06.js out/ELL3_U02_L06 v1
const D = require("./ELL3_U02_testdata.js");
const T = D.practice.ELL3, PB = D.partB.practice.ELL3, LV = T.lvl;
const rubricSlides = D.rubric.criteria.map((c, k) => ({ type: "rows", label: `Section F · ${c.name}`, tag: `Section F · rubric line ${k + 1} of 4`,
  head: `${c.code} · ${c.name}`, rows: c.d.map((d, i) => [`${["NYM", "MM", "M", "FM"][i]} ${i + 1}`, d]) }));
module.exports = {
 course: "ELL3", testDeck: true,
 countdown: "Unit test next class",
 meta: { unit: 2, unitTitle: "Saying It Sideways", lesson: 6, title: "Practice Test", subtitle: "Write it, then mark a partner’s paper together", month: "November" },
 banner: { obj: "Try the practice test, then mark a partner’s paper together.",
   std: "W3 · W2 · W6 · W12 · W14  ·  reading: comparisons and evidence  —  the outcomes on the unit test", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students write the Unit 2 practice test (/40) in 45 minutes, then swap and mark a partner’s whole paper together, Section F on the good-copy rubric included. Not entered.",
  outcomes: "W3 · W2 · W6 · W12/W14 · reading: what a comparison does, with paragraph evidence",
  schwerpunkt: "students mark Section E for claim, evidence and explanation and Section F on the good-copy rubric, so they know what earns marks before the unit test.",
  schwerStep: 4,
  materials: "Deck · ELL3_U02_PracticeTest, one each plus spares · a coloured pen for every student · ELL3_U02_TestKeys for you",
  timing: "80 minutes",
  steps: [
   ["2", "How the practice test works", "Same shape as the unit test, 40 marks, nothing counts. Pencil only, work alone, no phones or translators. 45 minutes. Hand out the tests."],
   ["45", "Write the practice test", "Part A, then Part B; they read The Bus Pass twice before Section E. Finished students tick the Section F checklist, turn the paper over and read quietly. Circulate; answer questions about instructions only, and note what they ask about. Call ten and five minutes left."],
   ["2", "Swap papers", "Pencils away, coloured pens out. Swap with a partner. The marker writes “Marked by” and their name at the top, and marks beside the writer’s answers, never over them."],
   ["8", "Mark Part A together", "Sections A, B and C, one answer per slide with its mark. Section C is 2 per item: 1 for a fact a reader can picture, 1 for using no new comparison. Section totals, then Part A out of 14 with its level band."],
   ["18", "Mark Part B together", "D: the paragraph, the four fixes, minus 1 for a new error. E: The Bus Pass in full, then one model answer per question, a mark each for claim, evidence, explanation. F: what the writer had to do, one good answer, then one rubric line at a time; the marker circles a level and writes its points."],
   ["5", "Add it up, papers back, agendas", "Markers add Part A and Part B, write the total out of 40 and sign. Papers go back to their owners, who circle their two weakest sections and write them in their agenda as what to study. Unit test next class."] ],
  diff: "Support: partners may read each answer on the screen aloud together before marking it. Extension: early finishers underline the one comparison in their own Section F and check that the last sentence does not explain.",
  assess: "Formative only: nothing entered, nothing collected. Glance at the section totals as papers go back and note the sections most students lost marks on; reteach them for five minutes before the unit test.",
  homework: "Study the two sections you circled. Bring a pencil and an eraser to the unit test.",
  watch: "Markers writing over the writer’s answers. Section E marked all-or-nothing instead of claim, evidence, explanation separately — and answers with no paragraph number given the evidence mark. Section F paragraphs with three comparisons marked Meeting on W3. Friends marking generously." },
 shape: [["How the practice test works", "instructions"], ["Write the practice test", "test practice"], ["Swap papers", "partner marking"],
   ["Mark Part A together", "partner marking"], ["Mark Part B together", "partner marking"], ["Add it up and what to study", "planning"]],
 texts: { story: { title: D.BUSPASS.title, unit: "paragraph", lines: D.BUSPASS.paras } },
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "rows", label: "How it works", tag: "Practice test", head: "How the practice test works", rows: [
    ["Same shape", "Part A (language), then Part B (reading and writing)."], ["40 marks", "It does NOT count. It is practice."],
    ["Alone", "Pencil only. No phones. No translators. Try every question."], ["Time", "45 minutes today."]] },
  { type: "rows", label: "Write now", tag: "Practice test", head: "Write the practice test now", rows: [
    ["Part A", "Read each box. Look at the example first."], ["Part B", "Read The Bus Pass twice before Section E."],
    ["Finished?", "Tick the Section F checklist. Turn your paper over. Read quietly."]] },
  { type: "rows", label: "Swap papers", tag: "Swap and mark", head: "Pencils down. Swap papers.", rows: [
    ["1", "Put your pencil away. Take a coloured pen."], ["2", "Swap with a partner."],
    ["3", "At the top, write: Marked by + your name."]] },
  { type: "rows", label: "How to mark", tag: "Swap and mark", head: "How to mark", rows: [
    ["✓", "Right: tick it. +1 means one mark."], ["✗", "Wrong: cross it. Write the right answer beside it."],
    ["+2", "Two or three marks: give one mark for each part that is right."], ["Box", "Count the marks. Write the score beside the section."],
    ["Never", "Never change your partner’s writing."]] },
  ...D.markBlocks("practice", "A"),
  ...D.markBlocks("practice", "B"),
  { type: "rows", label: "Section F task", tag: `Section F · ${PB.out} marks`, head: "Section F: what the writer had to do", rows: [
    ["Task", PB.task], ...PB.musts.map((m, i) => [String(i + 1), m])] },
  { type: "markpara", label: "Section F good answer", tag: `Marking · ${LV} · Section F · one good answer`, head: "Section F — one good answer", text: PB.good },
  { type: "rows", label: "How to mark Section F", tag: "Section F · the rubric", head: "How to mark Section F", rows: [
    ["1", "Read your partner’s paragraph once, all the way through."], ["2", "We look at ONE rubric line at a time."],
    ["3", "Circle the level that fits best. Write its points: 1, 2, 3 or 4."], ["0", "Nothing written gets 0."],
    ["Cap", "More than two comparisons? W3 gets 2 at most."]] },
  ...rubricSlides,
  { type: "marktotal", label: "Section F total", lvl: LV, sec: "F", outOf: PB.out, band: null, waitNote: "Write the level beside each rubric line too: your report uses levels.",
    runTo: T.partB, runLabel: "Part B (D + E + F)" },
  { type: "rows", label: "Add it all up", tag: "Add it up", head: "Add it all up", icon: "icon-pen.png", rows: [
    ["Part A", `____ / ${T.partA}, and its level`], ["Part B", `____ / ${T.partB}`], ["Total", `____ / ${T.total}`]] },
  { type: "rows", label: "Papers back", tag: "Before you go", head: "Sign it and give it back", rows: [
    ["1", `Write the total out of ${T.total} at the top.`], ["2", "Sign it: Marked by + your name."], ["3", "Give the paper back to its owner."]] },
  { type: "rows", label: "What to study", tag: "Before you go", head: "What to study", rows: [
    ["1", "Look at your section scores."], ["2", "Circle your TWO weakest sections."], ["3", "Write them in your agenda: study these."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Unit 2 Test", noCountdown: true, items: [
    ["Unit test today", "countdown"], ["How the unit test works", "instructions"], ["Write the Unit 2 test", "test"], ["Mark Part A together", "partner marking"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Countdown", "Unit test next class."], ["Homework", "Study your two circled sections."], ["Bring", "A pencil and an eraser."]] } ]
};
