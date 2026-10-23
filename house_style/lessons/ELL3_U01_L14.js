// ELL3 U1 L14 — Unit 1 Test, PART A PEER-MARKED in the same class (Sean, Oct 23 2026). Taught Wed Oct 28 / Thu Oct 29.
// Students write the v2 unit test for 55 minutes (the paper prints 80 — time is kept for marking), swap with a partner and mark
// Part A together. Mr. Reid marks all of Part B (D, E, F). Every question, answer and mark is transcribed from
// ELL3_U01_UnitTest_v2 and ELL3_U01_UnitTest_AnswerKey_v2. Next class is U2 L1, its shape read from its own file.
// Part A bands from the key (86 / 73 / 60 %) on 24 marks: FM 21–24 · M 18–20 · MM 15–17 · NYM 0–14.
// Build: node check_lesson.js lessons/ELL3_U01_L14.js && node render_deck.js lessons/ELL3_U01_L14.js out/ELL3_U01_L14 v1
const NEXT = require("./ELL3_U02_L01.js");
const BAND_A = [["Fully Meeting", "21–24"], ["Meeting", "18–20"], ["Minimally Meeting", "15–17"], ["Not Yet Meeting", "0–14"]];
const LV = "ELL 3";
module.exports = {
 course: "ELL3", testDeck: true,
 meta: { unit: 1, unitTitle: "The Exact Thing", lesson: 14, title: "Unit 1 Test", subtitle: "Show what you can do, then mark Part A together", month: "October" },
 banner: { obj: "Show what you learned in Unit 1, then mark a partner’s Part A together.",
   std: "W1 · W2 · W4 · W5 · W11 · W12 · W13 · W14 · W15  —  the outcomes on the unit test", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students write the Unit 1 test (/60) in 55 minutes, then swap with a partner and mark Part A (/24) together: a mark per answer, section totals and Part A’s level. You mark Part B. Every test comes to you.",
  outcomes: "W1 · W2 · W4 · W5 · W11 · W12 · W13 · W14 · W15",
  schwerpunkt: "every student writes the whole test under test conditions; marking Part A afterward is a bonus, never taken out of writing time.",
  schwerStep: 2,
  materials: "Deck · ELL3_U01_UnitTest_v2, one each plus spares · pencils and erasers · a coloured pen for every student · ELL3_U01_UnitTest_AnswerKey_v2 for you · a tray for finished tests",
  timing: "80 minutes",
  steps: [
   ["2", "How the unit test works", "60 marks, and it counts. Pencil only, work alone, no phones or translators. Today it is 55 minutes, not the 80 printed on the paper, so there is time to mark Part A. Hand out the tests."],
   ["55", "Write the Unit 1 test", "Part A, then Part B; they read The Fourth Chair twice before Section E. Finished students do the Check your work box, turn the paper over and read quietly. Circulate; answer questions about instructions only. Call ten and five minutes left."],
   ["2", "Swap papers", "Pencils away, coloured pens out. Swap with a partner. The marker writes “Marked by” and their name at the top, and marks beside the writer’s answers, never over them."],
   ["16", "Mark Part A together", "Sections A, B and C, one answer per slide with its mark. B is 2 per item: 1 for the joining word, 1 for the punctuation, with the key’s accepted versions on screen. C accepts the key’s word or its listed alternatives; markers circle anything else for you to decide. Section totals, then Part A out of 24 with its level band."],
   ["2", "Part B: Mr. Reid marks it", "Markers do NOT touch Part B. Show the five rubric criteria so students know how Sections D, E and F will be judged; the full rubric is on the back of their test."],
   ["3", "Add Part A, hand in, agendas", "Papers go back to their owners to check the Part A adding, then every test goes in the tray. Next class slide, then agendas."] ],
  diff: "Support: none during the test beyond reading an instruction aloud. During marking, partners may read each answer on the screen aloud together before marking it. Extension: early finishers re-read Section F against its checklist.",
  assess: "Summative. Check the Part A peer marking against the key before entering, especially circled Section C words and the Section B commas. Mark Part B yourself: D from the key (minus 1 for a new error), E claim / evidence / explanation, F on the five-criterion rubric with a level per criterion for the report.",
  homework: "None tonight. Unit 2 starts next class.",
  watch: "Students who finish early distracting others before the swap. Markers writing over answers. Section B marked all-or-nothing instead of joining word and punctuation separately. A comma before “because” in item 3 loses the punctuation mark. Markers writing anything on Part B." },
 shape: [["How the unit test works", "instructions"], ["Write the Unit 1 test", "test"], ["Swap papers", "partner marking"],
   ["Mark Part A together", "partner marking"], ["How Part B is marked", "rubric"], ["Add it up and hand it in", "marking"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "rows", label: "How it works", tag: "Unit 1 test", head: "How the unit test works", rows: [
    ["Two parts", "Part A (language), then Part B (reading and writing)."], ["60 marks", "This test counts."],
    ["Alone", "Pencil only. No phones. No translators. Try every question."], ["Time", "55 minutes today."]] },
  { type: "rows", label: "Write now", tag: "Unit 1 test", head: "Write the Unit 1 test now", rows: [
    ["Part A", "Read each box. Look at the example first."], ["Part B", "Read The Fourth Chair twice before Section E."],
    ["Finished?", "Do the Check your work box. Turn your paper over. Read quietly."]] },
  { type: "rows", label: "Swap papers", tag: "Swap and mark", head: "Pencils down. Swap papers.", rows: [
    ["1", "Put your pencil away. Take a coloured pen."], ["2", "Swap with a partner."],
    ["3", "At the top, write: Marked by + your name."]] },
  { type: "rows", label: "How to mark", tag: "Swap and mark", head: "How to mark Part A", rows: [
    ["✓", "Right: tick it. +1 means one mark."], ["✗", "Wrong: cross it. Write the right answer beside it."],
    ["+2", "Two marks: give one mark for each part that is right."], ["?", "Not sure? Circle it. Mr. Reid decides."],
    ["Never", "Never change your partner’s writing. Do not mark Part B."]] },
  // ---------- Part A ----------
  { type: "markq", lvl: LV, sec: "A", title: "Vocabulary", from: 0, items: [
    { q: "1. specific", a: "C" },
    { q: "2. general", a: "F" },
    { q: "3. concrete", a: "H" },
    { q: "4. sensory", a: "A" },
    { q: "5. synonym", a: "G" },
    { q: "6. compound", a: "B" },
    { q: "7. complex", a: "E" },
    { q: "8. connotation", a: "I" }] },
  { type: "marktotal", label: "Section A total", lvl: LV, sec: "A", outOf: 8, band: null, waitNote: "The level comes from Part A out of 24, after Section C.", firstNote: "Count the ticks. Write the score beside Section A." },
  { type: "markq", lvl: LV, sec: "B", title: "Sentence control", from: 0, items: [
    { q: "(compound) The kitchen was warm. Nobody was in it.", a: "The kitchen was warm, but nobody was in it.", m: 2,
      note: "+1 but or yet · +1 the comma before it" },
    { q: "(complex, dependent clause first) She heard the key. She did not get up.", a: "Although she heard the key, she did not get up.", m: 2,
      note: "+1 Although, When or Even though first · +1 the comma after the first part" },
    { q: "(complex, using because) He left the light on. He knew she would be late.", a: "He left the light on because he knew she would be late.", m: 2,
      note: "+1 because · +1 NO comma before because" }] },
  { type: "markq", lvl: LV, sec: "B", title: "Sentence control", from: 3, items: [
    { q: "(compound, using so) The shop was closed. We walked home.", a: "The shop was closed, so we walked home.", m: 2,
      note: "+1 so · +1 the comma before it" },
    { q: "(complex, using while) My brother set the table. I stirred the pot.", a: "While my brother set the table, I stirred the pot.", m: 2,
      note: "Also right: I stirred the pot while my brother set the table. +1 while · +1 a comma only when while comes first" },
    { q: "(complex, using when) The rain stopped. Everyone went outside.", a: "When the rain stopped, everyone went outside.", m: 2,
      note: "+1 when · +1 the comma after the first part (no comma if the when part comes second)" }] },
  { type: "marktotal", label: "Section B total", lvl: LV, sec: "B", outOf: 12, band: null, waitNote: "The level comes from Part A out of 24, after Section C.", runTo: 20 },
  { type: "markq", lvl: LV, sec: "C", title: "Word choice", from: 0, items: [
    { q: "He said in a very loud voice that we should go.", a: "shouted", note: "Also right: yelled, bellowed, called" },
    { q: "She walked quickly down the hallway.", a: "hurried", note: "Also right: rushed, strode, marched, raced" },
    { q: "The old car made a loud noise.", a: "roared", note: "Also right: rattled, backfired, banged" },
    { q: "He looked at me in an angry way.", a: "glared", note: "Also right: scowled. Another strong word? Circle it for Mr. Reid." }] },
  { type: "marktotal", label: "Section C total", lvl: LV, sec: "C", outOf: 4, band: null, waitNote: "Now add Part A: A + B + C.", runTo: 24 },
  { type: "marktotal", label: "Part A level", lvl: LV, sec: "A–C", head: "Part A: add it up", boxLabel: "Part A", outOf: 24, band: BAND_A,
    firstNote: "Write the Part A score and its level at the top of Part A." },
  // ---------- Part B ----------
  { type: "rows", label: "Part B", tag: "Part B · 36 marks", head: "Part B: Mr. Reid marks it", rows: [
    ["D", "The ten fixes: +1 each, minus 1 for any new error."],
    ["E", "Each answer: claim +1, evidence +1, explanation +1."],
    ["F", "Your paragraph: a level on each of five rubric lines."]] },
  { type: "rows", label: "Section F rubric", tag: "Part B · Section F", head: "How your paragraph is marked", rows: [
    ["W2", "Specific detail"], ["Shape", "Opening and shape"], ["W4 W5 W12", "Sentence control"],
    ["W1", "Word choice"], ["W14", "Complete sentences"]] },
  { type: "rows", label: "Hand it in", tag: "Before you go", head: "Give it back, then hand it in", rows: [
    ["1", "Give the test back to its owner."], ["2", "Owner: check the Part A adding."],
    ["3", "Every test goes in the tray."]] },
  { type: "nextshape", label: "Next class", head: `Next class: ${NEXT.meta.title}`, noCountdown: true, items: NEXT.shape },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Next class", "Unit 2 starts: Saying It Sideways."], ["Homework", "None tonight."], ["Bring", "Your exercise book."]] } ]
};
