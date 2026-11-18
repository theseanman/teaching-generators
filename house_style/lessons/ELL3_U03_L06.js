// ELL3 U3 L06 — Revise, Edit, Good Copy. ALL content here; the renderer holds the design.
// Unit 3 "The Point of the Story" (narrative essay), whole-unit spec approved by Sean Nov 18 2026.
// SUMMATIVE: the good copy is collected at the bell and marked on its own, rubric printed on the back of the Good Copy
// sheet. Four lines approved by Sean Nov 18 2026, each an RSS form outcome taught in this unit:
//   W6 shape and point · W9 events in order · W10 past tenses · W12/W14 sentence control — NYM / MM / M / FM,
//   Meeting anchored to the ELL Standards Expanding descriptor (the Oct 23 re-anchoring).
// Unit 2 routine kept (Sean, Nov 18): one lined side, rubric on the back, second sheets for anyone who writes more.
// A title is optional and is never marked (Sean, Nov 12).
// CURRICULUM CHECK (standing order Nov 18 2026): W15 revise and self-edit · W11 subject-verb agreement · W12 · W14 ·
// and the three lines above. Irony and the story terms are not on the rubric; they are tested in Part A of the unit test.
// First taught Fri Dec 4 (C) and Mon Dec 7 (G). Unit test next class.
// Build: bash build.sh lessons/ELL3_U03_L06.js v1 v1  then  node make_goodcopy.js lessons/ELL3_U03_L06.js out/ELL3_U03_L06 v1
const T = require("./ELL3_U03_texts.js");
const LV = ["Not Yet Meeting", "Minimally Meeting", "Meeting", "Fully Meeting"];
const vocab = [
  ["revise", "to change what a draft says and how it is shaped"],
  ["edit", "to fix spelling, punctuation and grammar"],
  ["good copy", "the final, neat version you hand in to be marked"],
  ["criteria", "the fixed points a piece of writing is judged against"],
  ["run-on", "two sentences written as one, with nothing joining them"],
  ["fragment", "a piece of a sentence written as if it were whole"],
  ["agreement", "when the verb matches its subject: he was, they were"],
  ["submit", "to hand in for marks"]];
module.exports = {
 course: "ELL3",
 meta: { unit: 3, unitTitle: "The Point of the Story", lesson: 6, title: "Revise, Edit, Good Copy",
   subtitle: "Check each paragraph’s job, fix the sentences, hand it in", month: "December" },
 banner: { obj: "Revise and edit your Lesson 5 draft, then write your good copy and hand it in.",
   std: "Write  W15 · W6 · W9 · W10 · W12 · W14  —  self-edit · shape · transitions · tenses · sentences", lit: ["COM", "TH", "PS"] },
 countdown: "Unit test next class",
 plan: {
  objective: "Students revise and edit their Lesson 5 Part D draft, then write the good copy of their narrative essay in class and hand it in before the bell for marks.",
  outcomes: "W15 revise and self-edit · W6 · W9 · W10 · W12/W14",
  schwerpunkt: "the good copy is written AND handed in before the bell, with the changes from the revision pass in it.",
  schwerStep: 11,
  materials: "Deck · Lesson 6 worksheet · Good Copy sheet with the rubric on the back, one each · second Good Copy sheets for students who write more · their Lesson 5 worksheet (the Part D draft) · stapler · pens",
  timing: "80 minutes",
  steps: [
   ["4", "Warm-up", "In the exercise book: open your Lesson 5 draft. Find one sentence you put a dot beside for homework. What is wrong with it? No dots? Read paragraph 3 and choose the weakest sentence. Take two answers."],
   ["1", "Goals", "Read the three goals. The good copy goes in today, before the bell. Unit test next class."],
   ["5", "Vocabulary — match the word", "Eight words against their meanings from a shuffled bank, revealed one at a time, then the summary slide. Run-on, fragment and agreement are the three they will hunt for in the edit."],
   ["4", "Teaching 1 — revise first, then edit", "Revising is about the big things: does each paragraph do its job, is the decision in paragraph 3, is the point in paragraph 4 and is it about me? Editing is about the small things: verbs, capitals, periods. Revise first. Check question: is moving your decision into its own paragraph revising or editing?"],
   ["4", "Teaching 2 — how your good copy is marked", "The four lines from the back of the Good Copy sheet, in student words: shape and point; events in order; past tenses; sentence control. Point at the tick boxes on the front of the Good Copy sheet — they are the same four."],
   ["3", "Examples", "Three sentence problems and their fixes: a run-on, a fragment, and an agreement slip. Ask for the fix before you show it."],
   ["3", "Part A — vocabulary", "Hand out the worksheet and the Good Copy sheet. Six blanks from an eight-word bank, the example done, one word left over. Reveal one at a time."],
   ["6", "Part B — find it and fix it", "Five sentences, each with ONE mistake: a capital, a run-on, a past-tense form, agreement, a fragment. They write the whole sentence again, fixed. Each has one mistake to find; reveal one at a time."],
   ["9", "Part C — the revision pass", "On the Lesson 5 Part D draft, in pencil: number the four paragraphs, underline the sentence with the decision, put a box around the point, circle every transition. Then four short answers recording what they found and what changes. “Nothing to change” means the pass was not done."],
   ["5", "Part D — edit in two passes", "Pass one: verbs — every event in the simple past. Pass two: capitals, periods and complete sentences. Two short answers record one fix from each pass."],
   ["2", "Part E — check your work", "Six tick boxes in two columns. Tick only what is true before starting the good copy."],
   ["30", "The good copy", "The Envelope is on the slides as the model. Then the Good Copy sheet: the whole essay again, neatly, in pen, with every change from Parts C and D. Four paragraphs, each indented. A title is optional. Second sheets are at the front; staple one behind. ★ Collect at the bell: no good copy goes home. Announce the time at fifteen minutes and at five."],
   ["3", "Exit ticket and hand in", "Part F: one thing they changed between the draft and the good copy, and why. Hand in the Good Copy sheet on top of this worksheet and the Lesson 5 draft."],
   ["1", "Next class and agendas", "Next class is the unit test. Show what to study: the story terms, the two kinds of irony, the past tenses, and how to shape a short narrative essay."]],
  diff: "Foundation: Part C questions 1, 2 and 4; Part D question 1 only; the good copy may be the draft copied with only the Part C changes made. Bridge: add one sentence of what somebody said, in quotation marks, to paragraph 2 or 3 of the good copy.",
  assess: "★ SUMMATIVE: collect every Good Copy sheet (second sheet stapled behind, worksheet and Lesson 5 draft underneath). Mark the good copy ON ITS OWN with the rubric on the back: W6 · W9 · W10 · W12/W14, one level per line. The draft does not count; it shows what changed.",
  homework: "None. The good copy is finished and handed in today. Study for the unit test.",
  watch: "Good copies that are the draft copied word for word, slips and all — send them back to Part D. A point that turned into advice while copying. One long block with no indents. Anyone still writing at the bell: collect it anyway." },
 shape: [["The sentence with the dot", "warm-up, in your exercise book"], ["Today’s goals", "reading together"],
   ["Match the word", "vocabulary game"], ["Revise first, then edit", "instruction"],
   ["How your good copy is marked", "instruction"], ["Three fixes", "examples"],
   ["Part A — vocabulary", "worksheet"], ["Part B — find it and fix it", "worksheet"],
   ["Part C — the revision pass", "worksheet, on your Lesson 5 draft"], ["Part D — edit in two passes", "worksheet"],
   ["Part E — check your work", "tick boxes"], ["Your good copy", "independent writing, for marks"],
   ["Exit ticket and hand in", "quick write"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "warmup", label: "Warm-up", head: "Warm-up — in your exercise book",
    prompts: ["Open your Lesson 5 draft. Find one sentence you put a dot beside.",
      "What is wrong with it? Write one line."] },
  { type: "goals", label: "Today’s goals", items: [
    "Revise your Lesson 5 draft: does each paragraph do its job?",
    "Edit it: verbs, capitals, periods, complete sentences.",
    "Write your good copy and hand it in before the bell."] },
  { type: "match", label: "Match the word", head: "Match the word to its meaning",
    bank: ["fragment", "submit", "revise", "agreement", "criteria", "run-on", "good copy", "edit"],
    words: vocab },
  { type: "vocab", label: "Key vocabulary", head: "Key vocabulary", words: vocab },
  { type: "cards", label: "Revise first, then edit", tag: "Teaching 1 of 2", head: "Revise first, then edit",
    icon: "icon-pen.png", big: "Big things first. Small things second.", cards: [
    { title: "Revise", body: "Does each paragraph do its job? Introduction, problem, decision, point." },
    { title: "The decision", body: "Is it in paragraph 3? Can you underline the sentence?" },
    { title: "The point", body: "Is it in paragraph 4? Is it about you, and only you?", tone: "teal" },
    { title: "Then edit", body: "Verbs in the past. Capitals. Periods. Complete sentences.", tone: "teal" }] },
  { type: "cards", label: "How your good copy is marked", tag: "Teaching 2 of 2", head: "How your good copy is marked",
    icon: "icon-read.png", big: "The back of your Good Copy sheet.", cards: [
    { title: "W6 · Shape and point", body: "An introduction, a body and a conclusion. Your conclusion states a point about you." },
    { title: "W9 · Events in order", body: "Easy to follow, with at least three different transitions." },
    { title: "W10 · Past tenses", body: "Events in the simple past. The past continuous for the scene.", tone: "teal" },
    { title: "W12 · W14 · Sentences", body: "Complete sentences, with capitals and periods.", tone: "teal" }] },
  { type: "rows", label: "Examples", tag: "Examples", head: "Three fixes", pair: 2, rows: [
    ["Run-on", "“It started to rain we ran to the car.”"],
    ["Fixed", "“It started to rain. We ran to the car.”"],
    ["Fragment", "“Because I was afraid.”"],
    ["Fixed", "“I said nothing because I was afraid.”"],
    ["Agreement", "“We was late.”"],
    ["Fixed", "“We were late.”"]] },
  { type: "handout", label: "Hand out the worksheet", note: "Two sheets: today’s worksheet and the Good Copy sheet. Take out your Lesson 5 worksheet — your draft is in Part D.",
    foot: "Everything is handed in at the end: good copy on top, then this worksheet, then your Lesson 5 draft." },
  { type: "walk", part: "A" },
  { type: "reveals", part: "A" },
  { type: "walk", part: "B", note: "One mistake in each sentence. Write the whole sentence again, fixed." },
  { type: "reveals", part: "B" },
  { type: "walk", part: "C", note: "Mark your Lesson 5 draft first, in pencil. Then answer the four questions." },
  { type: "reveals", part: "C", good: true },
  { type: "walk", part: "D", note: "Two passes: verbs first, then capitals, periods and complete sentences." },
  { type: "reveals", part: "D", good: true },
  { type: "walk", part: "E", note: "Six boxes on your sheet. Tick one only when it is true." },
  { type: "text", text: "essay", label: "The model: The Envelope", continues: "The Envelope continues", budget: 360 },
  { type: "rows", label: "Your good copy", tag: "Your good copy", head: "Write your good copy", icon: "icon-pen.png", rows: [
    ["Write", "Your whole essay again, neatly, in pen. Four paragraphs, each indented."],
    ["Include", "Every change from Parts C and D."],
    ["More room?", "Take a second sheet. Staple it behind."],
    ["Before the bell", "Your good copy is handed in today."]] },
  { type: "exit", label: "Exit ticket", part: "F", note: "Then hand in your good copy, this worksheet and your Lesson 5 draft." },
  { type: "rows", label: "Hand in", tag: "Before you go", head: "Hand in", icon: "icon-folder.png", rows: [
    ["On top", "Your good copy (second sheet stapled behind)."],
    ["Next", "This worksheet."],
    ["Last", "Your Lesson 5 worksheet with the draft."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Unit 3 Test", noCountdown: true, items: [
    ["Unit test next class", "countdown"], ["Write the Unit 3 test", "test"],
    ["Mark Part A with a partner", "peer marking"], ["Looking back at the unit", "exercise book"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Countdown", "Unit test next class. C: Tue, Dec 8. G: Wed, Dec 9."],
    ["Study", "Story words · verbal and situational irony · past tenses · introduction, body, conclusion."],
    ["Bring", "A pencil, an eraser and a coloured pen."]] }],
 texts: { essay: { title: T.ENVELOPE.title, lines: T.ENVELOPE.paras, unit: "paragraph" } },
 goodCopy: [
  { lvl: "ELL 3", title: "A Time I Had to Decide: Good Copy", lines: 14, gap: 300, extraLines: 19,
    steps: "Write your whole essay again, neatly, in pen, from your Lesson 5 draft with every change from Parts C and D. Four paragraphs; indent each one. A title is optional. Write on every line. Need more room? Take a second sheet.",
    checks: ["Introduction, body, conclusion. My point is about me.", "Events in order, with three different transitions.",
      "Every event is in the simple past.", "Complete sentences, capitals and periods."],
    rubric: { title: "How your good copy is marked", intro: "Your good copy is marked on its own. Mr. Reid circles one level on each line.", levels: LV, criteria: [
      { code: "W6", name: "Shape and point", d: [
        "Your writing is one block, or it has no clear beginning or ending.",
        "You wrote in paragraphs, but the introduction, the body or the conclusion is missing, or there is no point.",
        "Your essay has an introduction, a body and a conclusion, and your conclusion states a point about you.",
        "Each paragraph does its own job, your decision has a paragraph of its own, and your point is one only you could have written."] },
      { code: "W9", name: "Events in order", d: [
        "The events are hard to follow, and there are no transitions.",
        "The events are mostly in order, but you used only one or two transitions, or the same one again and again.",
        "The events are easy to follow, and you used at least three different transitions to show time.",
        "The events move smoothly, and a variety of transitions shows the time and the turn toward your point."] },
      { code: "W10", name: "Past tenses", d: [
        "Most verbs are in the present, or the past forms are often wrong.",
        "You wrote in the past, but there are several slips into the present or wrong past forms.",
        "Your events are in the simple past with few slips, and you tried the past continuous.",
        "You used the simple past and the past continuous correctly, irregular verbs included, with almost no slips."] },
      { code: "W12 · W14", name: "Sentence control", d: [
        "Many sentences are incomplete or run together, and capitals and periods are often missing.",
        "Some fragments or run-ons, and mistakes with capitals or periods sometimes get in the way.",
        "Your sentences are complete, with capitals and periods, and your errors do not get in the way.",
        "Your sentences are complete and varied, some compound or complex, and almost free of errors."] } ] } }],
 worksheet: {
  objective: "Revise and edit your Lesson 5 draft, then write your good copy and hand it in.",
  outcomes: "W15 revise and self-edit  •  W6 · W9 · W10  •  W12 and W14 sentence control",
  parts: [
   { id: "A", title: "Vocabulary", kind: "cloze", weight: 6, bankCols: 4,
     instr: "Fill each blank with a word from the word bank. Each word is used once. One word is extra. Cross out each word as you use it.",
     bank: ["agreement", "edit", "run-on", "submit", "revise", "fragment", "criteria", "good copy"],
     crossed: ["revise"],
     example: { text: "To change what a draft says and how it is shaped is to", ans: "revise", tail: "" },
     items: [
      { text: "“It rained we ran.” is a", ans: "run-on", tail: "" },
      { text: "To fix spelling, punctuation and grammar is to", ans: "edit", tail: "" },
      { text: "“Because I was late.” is a", ans: "fragment", tail: "" },
      { text: "The final, neat version you hand in is the", ans: "good copy", tail: "" },
      { text: "In “they were”, the verb matches its subject. That is", ans: "agreement", tail: "" },
      { text: "The fixed points a piece of writing is judged against are the", ans: "criteria", tail: "" }],
     how: "Read the whole sentence before you choose, then cross the word out of the bank. One word is left over — that is meant to happen." },
   { id: "B", title: "Find it and fix it", kind: "lines", weight: 6, lines: 2,
     instr: "Each sentence has ONE mistake. Write the whole sentence again with the mistake fixed.",
     example: { text: "We was late for the bus.", ans: "We were late for the bus." },
     items: [
      { text: "last spring, I found an envelope.", ans: "Last spring, I found an envelope." },
      { text: "I looked inside there were three bills.", ans: "I looked inside. There were three bills." },
      { text: "I taked it to the front desk.", ans: "I took it to the front desk." },
      { text: "The shoes was too expensive.", ans: "The shoes were too expensive." },
      { text: "I gave it back. Because it was not mine.", ans: "I gave it back because it was not mine." }],
     how: "Look for one thing in each: a missing capital, two sentences run together, a wrong past form, a verb that does not match its subject, or a piece of a sentence standing alone." },
   { id: "C", title: "The revision pass", kind: "lines", weight: 8, lines: 2,
     instr: "Mark your Lesson 5 Part D draft in pencil: number the four paragraphs, underline the sentence with your decision, put a box around your point, and circle every transition. Then answer.",
     example: { text: "How many paragraphs did you number? Is each one indented?", ans: "I numbered four, but paragraph 3 is not indented. I will indent it." },
     items: [
      { text: "Copy the sentence you underlined. Which paragraph is it in?", ans: "“I walked to the front desk and gave her the envelope.” It is in paragraph 3." },
      { text: "Copy your point. Is it about you?", ans: "“I decide better when I think about the other person first.” Yes, it is about me." },
      { text: "How many transitions did you circle? Write them.", ans: "I circled four: Last spring, While, Then, However." },
      { text: "What is one thing you will change in your good copy?", ans: "I will move my decision out of paragraph 2 and give it its own paragraph." }],
     how: "Do the marking on your Lesson 5 sheet first, then answer from what you marked. An honest answer that finds something to change is a good answer. “Nothing to change” means the pass was not done." },
   { id: "D", title: "Edit in two passes", kind: "lines", weight: 4, lines: 2,
     instr: "Pass one: verbs. Pass two: capitals, periods and complete sentences. Record one fix from each pass.",
     example: { text: "A verb, fixed.", ans: "“Then I see the envelope.” → “Then I saw the envelope.”" },
     items: [
      { text: "Copy one verb from your draft that was not in the past, or had the wrong form. Then fix it.", ans: "“She give it to him.” → “She gave it to him.”" },
      { text: "Copy one run-on, fragment or missing capital from your draft. Then fix it.", ans: "“I stood there I did not move.” → “I stood there. I did not move.”" }],
     how: "Read your draft once for each pass, looking for one kind of problem only. If you find no slips in a pass, write the sentence you checked most carefully and say what you checked." },
   { id: "E", title: "Check your work", kind: "check",
     instr: "Tick each box when it is true. Then write your good copy.",
     checks: ["I numbered four paragraphs on my draft.",
       "I underlined the sentence with my decision.",
       "My point is in my last paragraph, and it is about me.",
       "I circled at least three different transitions.",
       "I checked that every event is in the simple past.",
       "I checked capitals, periods and complete sentences."],
     how: "Tick a box only when it is true. Then take your Good Copy sheet." },
   { id: "F", title: "Exit ticket", kind: "exit", lines: 2,
     instr: "Answer, then hand this in with your good copy.",
     items: [
      { text: "What is one thing you changed between your draft and your good copy? Why?" }],
     how: "One or two full sentences. Hand in your good copy on top, then this worksheet, then your Lesson 5 draft." }] }
};
