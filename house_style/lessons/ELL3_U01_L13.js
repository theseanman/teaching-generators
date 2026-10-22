// ELL3 U1 L13 — Practice Test, PEER-MARKED (Sean, Oct 22 2026). Taught Mon Oct 26 / Tue Oct 27; unit test Wed Oct 28 / Thu Oct 29.
// Opens by handing back the culture writing with a reminder of the four levels (NYM / MM / M / FM).
// Students write the v2 practice test for 45 minutes (the paper says 50 — Sean's call, so there is time to mark it all),
// swap with a partner and mark the WHOLE test together, Section F on the rubric included, so they see his criteria from the inside.
// Every question, answer and mark is transcribed from ELL3_U01_PracticeTest_v2 and ELL3_U01_PracticeTest_AnswerKey_v2.
// Part A bands from the key (86 / 73 / 60 %) on 16 marks: FM 14–16 · M 12–13 · MM 10–11 · NYM 0–9.
// Build: node check_lesson.js lessons/ELL3_U01_L13.js && node render_deck.js lessons/ELL3_U01_L13.js out/ELL3_U01_L13 v1
const BAND_A = [["Fully Meeting", "14–16"], ["Meeting", "12–13"], ["Minimally Meeting", "10–11"], ["Not Yet Meeting", "0–9"]];
const LV = "ELL 3";
const RUB = [  // verbatim from the rubric printed on the back of the practice test
 ["Specific detail", [
   "Details name categories rather than things. A reader cannot picture the subject.",
   "Some details are photographable; others restate the category. Detail is mostly visual.",
   "Details are consistently specific and drawn from more than one sense. Few could appear in another student’s paragraph.",
   "Details are selected rather than gathered. One is developed as the centre of the piece and the rest support it."],
   null],
 ["Sentence control", [
   "Mostly simple sentences, with fragments or run-ons. Commas absent or misplaced.",
   "Simple and compound sentences used; complex sentences attempted with inconsistent punctuation.",
   "Simple, compound and complex sentences all used accurately, with correct commas after fronted dependent clauses.",
   "Sentence length is varied deliberately, including short sentences placed for effect."]],
 ["Word choice", [
   "Relies on good, nice, very, a lot, thing. Adverbs used in place of stronger verbs.",
   "Some stronger verbs and nouns appear alongside weak general ones.",
   "Verbs and nouns carry the description. Weak filler words are largely absent.",
   "Word choice is precise enough that removing any one word would cost the reader something."]]];
const NAMES = ["NYM", "MM", "M", "FM"];
const rubricSlides = RUB.map(([name, desc, extra], k) => ({ type: "rows", label: `Section F · ${name}`, tag: `Section F · rubric line ${k + 1} of 3`,
  head: `Section F · ${name}`, rows: desc.map((d, i) => [`${NAMES[i]} ${i + 1}`, d]) }));
const GOOD_F = "The plastic chair beside the bus shelter window had a crack down the middle, and it pinched the back of my legs. Every morning at 7:40 I sat there and watched the corner of No. 3 Road. The heater under the bench clicked and smelled like hot dust. Buses went past with the wrong numbers glowing above their windshields. My breath made a small cloud on the glass, so I wiped it away with my sleeve. When the 410 finally turned the corner, I was already standing.";
const MAILBOX = [
 "There are forty mailboxes in the lobby of our building, in five rows of eight. Ours is number 23. It has a small metal door that sticks.",
 "My brother Daniel is eleven. Every day after school he goes to the mailbox before he goes upstairs. He takes the little key off the string around his neck, opens the door, and looks inside.",
 "Most days there is nothing. Some days there is a flyer for pizza. He brings the flyer upstairs and leaves it on the table by the door, and he does not look at it again.",
 "We have been in Canada for four months. My mother says a letter from home takes six weeks, sometimes more.",
 "Yesterday it was raining hard, and I told him the mailbox could wait until tomorrow. He did not answer me. He went down anyway, in his socks, and he came back with nothing, and his socks were wet.",
 "He did not say anything at dinner. After dinner he put the key back on the string and hung it around his neck."];
module.exports = {
 course: "ELL3", testDeck: true,
 countdown: "Unit test next class",
 meta: { unit: 1, unitTitle: "The Exact Thing", lesson: 13, title: "Practice Test", subtitle: "Write it, then mark a partner’s paper together", month: "October" },
 banner: { obj: "Try the practice test, then mark a partner’s paper together.",
   std: "W1 · W2 · W4 · W5 · W11 · W12 · W13 · W14 · W15  —  the outcomes on the unit test", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students get their culture writing back with the four levels explained, write the U1 practice test (/40) in 45 minutes, then swap and mark a partner’s whole paper together. Not entered.",
  outcomes: "W1 · W2 · W4 · W5 · W11 · W12 · W13 · W14 · W15",
  schwerpunkt: "students apply your own Part B criteria (claim, evidence, explanation and the three rubric lines) to a real paper, so they know what earns marks before the unit test.",
  schwerStep: 5,
  materials: "Deck · their marked culture writing · ELL3_U01_PracticeTest_v2, one each plus spares · a coloured pen for every student · ELL3_U01_PracticeTest_AnswerKey_v2 for you",
  timing: "80 minutes",
  steps: [
   ["3", "Hand back and the four levels", "Hand back the culture writing. Show what NYM, MM, M and FM mean, and that each criterion has its own level. Students find their lowest level: that is their next step. Questions about a mark wait until after class."],
   ["2", "How the practice test works", "Same shape as the unit test, 40 marks, nothing counts. Pencil only, work alone, no phones or translators. Today it is 45 minutes, not the 50 printed on the paper. Hand out the tests."],
   ["45", "Write the practice test", "Part A, then Part B; they read The Mailbox twice before Section E. Finished students do the Check your work box, turn the paper over and read quietly. Circulate; do not help with answers, but note what they ask about. Call ten and five minutes left."],
   ["2", "Swap papers", "Pencils away, coloured pens out. Swap with a partner. The marker writes “Marked by” and their name at the top, and marks beside the writer’s answers, never over them."],
   ["9", "Mark Part A together", "Sections A, B and C, one answer per slide with its mark. Section C is 2 per item: 2 for a detail a reader could photograph, 1 for an adjective swap or a vague detail, 0 for a copy. Section totals, then Part A out of 16 with its level band."],
   ["14", "Mark Part B together", "D: six fixes, the corrected paragraph, minus 1 for a new error. E: The Mailbox in full, then one model answer per question, a mark each for claim, evidence, explanation. F: the task, one good answer, then one rubric line at a time; the marker circles a level and writes its mark."],
   ["5", "Add it up, papers back, agendas", "Markers add Part A and Part B, write the total out of 40 and sign. Papers go back to their owners, who circle their two weakest sections and write them in their agenda as what to study. Unit test next class."] ],
  diff: "Support: partners may read each answer on the screen aloud together before marking it. Extension: early finishers underline the compound sentence in their own Section F and check its comma.",
  assess: "Formative only: nothing entered, nothing collected. Glance at the section totals as papers go back and note the sections most students lost marks on; reteach them for five minutes before the unit test.",
  homework: "Study the two sections you circled. Bring a pencil and an eraser to the unit test.",
  watch: "Markers writing over the writer’s answers. Section E marked all-or-nothing instead of claim, evidence, explanation separately. An opening that announces the topic caps Specific detail at 2. Friends marking generously." },
 shape: [["Your writing is back", "the four levels"], ["How the practice test works", "instructions"], ["Write the practice test", "test practice"],
   ["Swap papers", "partner marking"], ["Mark Part A together", "partner marking"], ["Mark Part B together", "partner marking"], ["Add it up and what to study", "planning"]],
 texts: { mailbox: { title: "The Mailbox", unit: "paragraph", lines: MAILBOX } },
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "rows", label: "Your writing is back", tag: "Your writing is back", head: "What your levels mean", rows: [
    ["NYM", "Not Yet Meeting: you are not doing this yet. It is your next step."],
    ["MM", "Minimally Meeting: you are starting to do it, but not every time."],
    ["M", "Meeting: you do it well most of the time. This is the goal for ELL 3."],
    ["FM", "Fully Meeting: you do it well every time, with control."]] },
  { type: "rows", label: "How to read your levels", tag: "Your writing is back", head: "How to read your levels", icon: "icon-read.png", rows: [
    ["1", "You get one level for each criterion, not one mark for the whole piece."],
    ["2", "Find your lowest level. That is what to work on next."],
    ["3", "Questions about your levels? Ask me after class."]] },
  { type: "rows", label: "How it works", tag: "Practice test", head: "How the practice test works", rows: [
    ["Same shape", "Part A (language), then Part B (reading and writing)."], ["40 marks", "It does NOT count. It is practice."],
    ["Alone", "Pencil only. No phones. No translators. Try every question."], ["Time", "45 minutes today."]] },
  { type: "rows", label: "Write now", tag: "Practice test", head: "Write the practice test now", rows: [
    ["Part A", "Read each box. Look at the example first."], ["Part B", "Read The Mailbox twice before Section E."],
    ["Finished?", "Do the Check your work box. Turn your paper over. Read quietly."]] },
  { type: "rows", label: "Swap papers", tag: "Swap and mark", head: "Pencils down. Swap papers.", rows: [
    ["1", "Put your pencil away. Take a coloured pen."], ["2", "Swap with a partner."],
    ["3", "At the top, write: Marked by + your name."]] },
  { type: "rows", label: "How to mark", tag: "Swap and mark", head: "How to mark", rows: [
    ["✓", "Right: tick it. +1 means one mark."], ["✗", "Wrong: cross it. Write the right answer beside it."],
    ["+2", "Two or three marks: give one mark for each part that is right."], ["Box", "Count the marks. Write the score beside the section."],
    ["Never", "Never change your partner’s writing."]] },
  // ---------- Part A ----------
  { type: "markq", lvl: LV, sec: "A", title: "Vocabulary", from: 0, items: [
    { q: "specific", a: "E" },
    { q: "general", a: "A" },
    { q: "concrete", a: "F" },
    { q: "conjunction", a: "B" },
    { q: "fragment", a: "G" },
    { q: "run-on", a: "C" }] },
  { type: "marktotal", label: "Section A total", lvl: LV, sec: "A", outOf: 6, band: null, waitNote: "The level comes from Part A out of 16, after Section C.", firstNote: "Count the ticks. Write the score beside Section A." },
  { type: "markq", lvl: LV, sec: "B", title: "Sentence types", from: 0, items: [
    { q: "Because the bus pulled away, she was late.", a: "COMPLEX" },
    { q: "Running after the bus in the rain.", a: "FRAGMENT" },
    { q: "She missed it, so she walked.", a: "COMPOUND" },
    { q: "The bus pulled away she ran after it.", a: "RUN-ON" },
    { q: "She walked home.", a: "SIMPLE" },
    { q: "Although she ran, she missed it.", a: "COMPLEX" }] },
  { type: "marktotal", label: "Section B total", lvl: LV, sec: "B", outOf: 6, band: null, waitNote: "The level comes from Part A out of 16, after Section C.", runTo: 12 },
  { type: "markq", lvl: LV, sec: "C", title: "Make it specific", from: 0, items: [
    { q: "The apartment was small.", a: "My bed touched two walls, and the fridge door hit the table when it opened.", m: 2,
      note: "Any answer like this. +2 a detail you could photograph · +1 an adjective swap (“tiny”) or a vague detail · 0 a copy" },
    { q: "The party was fun.", a: "My uncle danced on a chair until it cracked, and everyone sang the wrong words to the same song.", m: 2,
      note: "Any answer like this. +2 one specific moment (who did what) · +1 a list of general things (“music and food”)" }] },
  { type: "marktotal", label: "Section C total", lvl: LV, sec: "C", outOf: 4, band: null, waitNote: "Now add Part A: A + B + C.", runTo: 16 },
  { type: "marktotal", label: "Part A level", lvl: LV, sec: "A–C", head: "Part A: add it up", boxLabel: "Part A", outOf: 16, band: BAND_A,
    firstNote: "Write the Part A score and its level at the top of Part A." },
  // ---------- Part B ----------
  { type: "markpara", label: "Section D paragraph", tag: `Marking · ${LV} · Section D`, head: "Section D — the paragraph",
    text: "On saturday my uncle drove us to beach in richmond. The water were cold, but nobody cared. My cousin find a crab under a rock and everyone screamed.",
    note: "Exactly six errors: verb forms, articles, capital letters and punctuation." },
  { type: "markq", lvl: LV, sec: "D", title: "The six fixes", from: 0, items: [
    { q: "On saturday", a: "On Saturday", fix: true }, { q: "to beach", a: "to the beach", fix: true },
    { q: "in richmond", a: "in Richmond", fix: true }, { q: "The water were", a: "The water was", fix: true },
    { q: "My cousin find", a: "My cousin found", fix: true }, { q: "a rock and everyone", a: "a rock, and everyone", fix: true }] },
  { type: "markpara", fixed: true, label: "Section D fixed", tag: `Marking · ${LV} · Section D · all fixed`, head: "Section D — all fixed",
    text: "On [Saturday] my uncle drove us to [the beach] in [Richmond]. The water [was] cold, but nobody cared. My cousin [found] a crab under a [rock, and] everyone screamed.",
    note: "+1 for each fix. Take off 1 for any NEW error (a new misspelling, a dropped word). A correct rewording is fine." },
  { type: "marktotal", label: "Section D total", lvl: LV, sec: "D", outOf: 6, band: null, waitNote: "Part B levels come from the rubric in Section F.",
    firstNote: "Count the fixes. Take off 1 for each new error. Write the score." },
  { type: "text", text: "mailbox", label: "The Mailbox", continues: "The Mailbox continues" },
  { type: "rows", label: "How Section E is marked", tag: "Section E · 3 marks each", head: "How Section E is marked", rows: [
    ["Claim +1", "You answer the question in your first sentence."],
    ["Evidence +1", "A detail or a short quotation, and its paragraph number."],
    ["Explanation +1", "A sentence that explains how the evidence shows your claim."]] },
  { type: "markq", lvl: LV, sec: "E", title: "Question 1", from: 0, items: [
    { q: "Why does Daniel check the mailbox every day, even in the rain?", m: 3,
      a: "Daniel is waiting for a letter from home. Paragraph 4 says a letter from home takes six weeks, and in paragraph 5 he goes down in the rain, in his socks. Going down even in the rain shows it is not a habit: he expects something to come.",
      note: "+1 claim · +1 evidence with its paragraph · +1 explanation" }] },
  { type: "markq", lvl: LV, sec: "E", title: "Question 2", from: 1, items: [
    { q: "What does the last paragraph tell you about Daniel?", m: 3,
      a: "Daniel is disappointed, but he has not given up. In paragraph 6 he says nothing at dinner, then puts the key back around his neck. His silence shows the disappointment, and keeping the key ready shows he is still waiting.",
      note: "+1 claim · +1 evidence with its paragraph · +1 explanation. Any reading supported from paragraph 6 is right." }] },
  { type: "marktotal", label: "Section E total", lvl: LV, sec: "E", outOf: 6, band: null, waitNote: "Part B levels come from the rubric in Section F.",
    runTo: 12, runLabel: "Part B so far (D + E)" },
  { type: "rows", label: "Section F task", tag: "Section F · 12 marks", head: "Section F: what the writer had to do", rows: [
    ["1", "Describe a place where you waited for something, in five to seven sentences."],
    ["2", "Open on a detail, not on the name of the place."], ["3", "Use at least two senses."],
    ["4", "Write at least one compound sentence."], ["5", "Do not use good, nice or very."]] },
  { type: "markpara", label: "Section F good answer", tag: `Marking · ${LV} · Section F · one good answer`, head: "Section F — one good answer", text: GOOD_F },
  { type: "rows", label: "How to mark Section F", tag: "Section F · the rubric", head: "How to mark Section F", rows: [
    ["1", "Read your partner’s writing once, all the way through."], ["2", "We look at ONE rubric line at a time."],
    ["3", "Circle the level that fits best. Write its mark: 1, 2, 3 or 4."], ["0", "Nothing written gets 0."],
    ["Cap", "Opens with “This paragraph is about…”? Specific detail gets 2 at most."]] },
  ...rubricSlides,
  { type: "marktotal", label: "Section F total", lvl: LV, sec: "F", outOf: 12, band: null, waitNote: "Write the level beside each rubric line too: your report uses levels.",
    runTo: 24, runLabel: "Part B (D + E + F)" },
  { type: "rows", label: "Add it all up", tag: "Add it up", head: "Add it all up", icon: "icon-pen.png", rows: [
    ["Part A", "____ / 16, and its level"], ["Part B", "____ / 24"], ["Total", "____ / 40"]] },
  { type: "rows", label: "Papers back", tag: "Before you go", head: "Sign it and give it back", rows: [
    ["1", "Write the total out of 40 at the top."], ["2", "Sign it: Marked by + your name."], ["3", "Give the paper back to its owner."]] },
  { type: "rows", label: "What to study", tag: "Before you go", head: "What to study", rows: [
    ["1", "Look at your section scores."], ["2", "Circle your TWO weakest sections."], ["3", "Write them in your agenda: study these."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Unit 1 Test", noCountdown: true, items: [
    ["How the unit test works", "instructions"], ["Write the Unit 1 test", "test"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Countdown", "Unit test next class."], ["Homework", "Study your two circled sections."], ["Bring", "A pencil and an eraser."]] } ]
};
