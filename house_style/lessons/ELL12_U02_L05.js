// ELL12 U2 L05 — Drafting. ALL content here; the renderer holds the design.
// Built Oct 23 2026 to the spec read back the same day; Sean said "next lesson please" without answering the four
// open questions, so the stated defaults were taken: drafts COLLECTED at the end and returned in L6 with one
// strength and one fix (the Oct 14 unit design); draft written on widely spaced lines so L6 revisions fit above
// each line; warm-up game Fix It Fast; no rubric on this sheet (the rubric belongs on the L6 Good Copy sheet).
// Unit 2 "My School Day", lesson 5 of 6. Students write the draft paragraph from their Lesson 4 Part C plan.
// ELL 1: five sentences (opinion, three reasons with because, closing). ELL 2: the same with a detail per reason.
// FORMATIVE READ 2 = the Part C draft. Outcomes: ELL 1 W4 basic paragraph · W3 because; ELL 2 W3 · W4.
// The lunch model from L4 is referenced again, so it is shown in full at both levels and side by side.
// Countdown: "Unit test in three classes" (L6, practice test, unit test follow).
const L4 = require("./ELL12_U02_L04.js");
const vocab = [
  ["draft", "your first full try at a piece of writing"], ["paragraph", "sentences about one idea, one after another"],
  ["plan", "what you will write, in order, as a list"], ["indent", "start the first line a little to the right"],
  ["opinion", "what you think"], ["reason", "why you think it"],
  ["transition", "a word that moves the reader: First, Also"], ["closing", "the last sentence: your opinion again"]];

module.exports = {
 course: "ELL12",
 meta: { unit: 2, unitTitle: "My School Day", lesson: 5, title: "Drafting", subtitle: "From plan to paragraph", month: "November" },
 banner: { obj: "Turn your Lesson 4 plan into a draft paragraph about the phone rule.",
   std: "ELL 1: W4 basic paragraph · W3 because  •  ELL 2: W3 intro, body, conclusion · W4 transition words", lit: ["COM", "TH", "PS"] },
 countdown: "Unit test in three classes",
 plan: {
  objective: "Students turn their Lesson 4 Part C plan into a draft paragraph on the phone rule. ELL 1 writes five sentences; ELL 2 adds a detail after each reason.",
  outcomes: "ELL 1: W4 · W3. ELL 2: W3 · W4.",
  schwerpunkt: "the draft is the plan written as ONE paragraph — sentences running on, not a list.",
  schwerStep: 5,
  materials: "Deck · ELL 1 and ELL 2 Lesson 5 worksheets · duotangs with the Lesson 4 sheet (Part C plan) · exercise books for the warm-up",
  timing: "80 minutes",
  steps: [
   ["12", "Warm-up Parts A and B", "In exercise books, five items per level per Part, side by side. Part A · Vocabulary: Lesson 4's paragraph words. Part B · Grammar: transitions at both levels. All five show before any answer; reveal one at a time, alternating levels."],
   ["6", "Fix It Fast", "Warm-up game. A broken sentence goes up. The first pair to say the whole fixed sentence wins the round. Five rounds, then the answer slide. English only."],
   ["2", "Title and goals", "Read the three goals: see how a plan becomes a paragraph, write your draft, hand it in for feedback."],
   ["10", "From plan to paragraph", "The Lesson 4 lunch plan as a list, then the lunch paragraph in full at ELL 1 and ELL 2 and side by side. Show the change: indent the first line, sentences run on, no new line for each sentence."],
   ["10", "Worksheet Parts A and B", "Part A: plan or paragraph? Part B: rewrite two plan lines as running sentences. Walk each with its example and reveal, alternating levels."],
   ["30", "Write your draft", "Part C. Lesson 4 Part C plans open beside the sheet. Write on the lines; the space above each line is for changes next class. ★ FORMATIVE READ 2: these drafts are collected at the end of class."],
   ["5", "Check and exit ticket", "The tick-box Check Part, then the exit ticket: one thing you will fix before your good copy."],
   ["5", "Hand in, next class, agendas", "★ COLLECT THE DRAFTS: whole sheet, name on it. Return them at the start of Lesson 6 with one strength and one fix each. Then next class and agendas."] ],
  diff: "Support: ELL 1 students copy their Lesson 4 Part C plan line by line into the draft and only join the lines. Extension: ELL 2 early finishers add a second detail to their strongest reason.",
  assess: "★ MARKING TODAY — FORMATIVE READ 2: the Part C draft, both levels. COLLECT every sheet at the end. Before Lesson 6, write ONE strength and ONE fix on each draft (ELL 1 W4 basic paragraph · ELL 2 W3 intro, body, conclusion). Return them at the start of Lesson 6.",
  homework: "None. The drafts are collected today and come back in Lesson 6.",
  watch: "Drafts written as a list, one sentence per line. No indent. Because-fragments back again. ELL 2 details that only repeat the reason. A closing that is a new reason." },
 shape: [["Warm-up: words and grammar", "quick practice"], ["Fix It Fast", "warm-up game"], ["From plan to paragraph", "mini-lesson"],
   ["Worksheet Parts A and B", "worksheet"], ["Write your draft", "independent writing"], ["Check and exit ticket", "quick write"], ["Hand in your draft", "hand-in"]],
 sequence: [
  { type: "drill", part: "A", kind: "Vocabulary", lvls: [
    { lvl: "ELL 1", bankLabel: "Lesson 4 words", bank: "opinion · reason · closing · plan · First",
      items: [["The last sentence is the ____.", "closing"], ["Why you think it: a ____.", "reason"],
        ["____, I need sleep.", "First"], ["A list in order: a ____.", "plan"], ["What you think: your ____.", "opinion"]] },
    { lvl: "ELL 2", bankLabel: "Lesson 4 words", bank: "topic sentence · detail · closing · reason · transition",
      items: [["The first one: the ____.", "topic sentence"], ["For example starts a ____.", "detail"],
        ["The last one: the ____.", "closing"], ["Why you think it: a ____.", "reason"], ["First is a ____ word.", "transition"]] } ] },
  { type: "drill", part: "B", kind: "Grammar", lvls: [
    { lvl: "ELL 1", bankLabel: "Transitions", bank: "First · Second · Also · That is why · because",
      items: [["Reason 1: ____, I listen.", "First"], ["Reason 2: ____, I learn.", "Second"],
        ["Reason 3: ____, it is fair.", "Also"], ["End: ____ I like it.", "That is why"], ["I like it ____ it helps.", "because"]] },
    { lvl: "ELL 2", bankLabel: "Transitions", bank: "In my opinion · For example · In addition · Finally · For these reasons",
      items: [["Start: ____, it is short.", "In my opinion"], ["Detail: ____, I rush.", "For example"],
        ["2nd: ____, I see friends.", "In addition"], ["Last: ____, clubs.", "Finally"], ["End: ____, add time.", "For these reasons"]] } ] },
  { type: "rows", label: "Fix It Fast", tag: "Warm-up game", head: "Fix It Fast: how to play", englishOnly: true, rows: [
    ["1", "A broken sentence goes on the screen."], ["2", "With your partner, fix it."],
    ["3", "First pair to say the WHOLE fixed sentence wins the round."], ["Remember", "Every sentence needs a who and a verb."]] },
  { type: "rows", label: "Fix It Fast: the sentences", tag: "Warm-up game", head: "Fix these sentences", rows: [
    ["1", "Because the line is long."], ["2", "Phones in class."], ["3", "First, because I listen better."],
    ["4", "That is why."], ["5", "Sofia, her phone translates words."]] },
  { type: "rows", label: "Fix It Fast: one way to fix them", tag: "Warm-up game · answers", head: "One way to fix them", rows: [
    ["1", "I need more time because the line is long."], ["2", "Phones go away in class."],
    ["3", "First, I listen better because my phone is away."], ["4", "That is why the rule is good."],
    ["5", "Sofia's phone translates words."]] },
  { type: "title", label: "Today's lesson" },
  { type: "goals", label: "Today's goals", items: [
    "See how a plan becomes a paragraph.", "Write your draft about the phone rule.", "Hand it in for feedback."] },
  { type: "rows", label: "The lunch plan", tag: "Teaching 1 of 2", head: "Lesson 4: the lunch plan (a list)", rows: [
    ["Opinion", "I think lunch should be longer."], ["Reason 1", "First, I need more time to eat because the line is long."],
    ["Reason 2", "Second, I want to talk to my friends because I do not see them in class."],
    ["Reason 3", "Also, I can go to the library because I like to read."], ["Closing", "That is why lunch should be longer."]] },
  { type: "prose", text: "m1", label: "The paragraph (ELL 1)" },
  { type: "prose", text: "m2", label: "The paragraph (ELL 2)" },
  { type: "text2", a: "m1", b: "m2", label: "The paragraph: side by side", tag: "Model paragraph · both levels", head: "Lunch should be longer: ELL 1 and ELL 2" },
  { type: "rows", label: "Plan to paragraph", tag: "Teaching 2 of 2", head: "From plan to paragraph", rows: [
    ["A plan", "A list. Each sentence on its own line."],
    ["A paragraph", "Indent the first line. The sentences run on, one after another."],
    ["Keep", "Your opinion, your three reasons, your transitions, your closing."],
    ["ELL 2", "A detail right after each reason: For example, …"]] },
  { type: "handout", label: "Hand out the worksheet", note: "ELL 1 and ELL 2 worksheets. Name and date first. Open your Lesson 4 Part C plan beside it.",
    items: [["A", "plan or paragraph?"], ["B", "join the lines"], ["C", "my draft"], ["D", "check your work"], ["E", "exit ticket", true]],
    foot: "Both levels have Parts A to E. The whole sheet is handed in today." },
  { type: "walk", part: "1A-A", withExample: true }, { type: "reveals", part: "1A-A" },
  { type: "walk", part: "2A-A", withExample: true }, { type: "reveals", part: "2A-A" },
  { type: "walk", part: "1A-B", withExample: true }, { type: "reveals", part: "1A-B", good: true },
  { type: "walk", part: "2A-B", withExample: true }, { type: "reveals", part: "2A-B", good: true },
  { type: "walk", part: "1A-C", withExample: true }, { type: "walk", part: "2A-C", withExample: true },
  { type: "rows", label: "Write your draft", tag: "Independent writing", head: "Write your draft", rows: [
    ["Open", "Your Lesson 4 Part C plan."], ["Write", "One paragraph. Indent the first line."],
    ["Skip", "Write on the lines. The space above is for changes next class."],
    ["Today", "Mr. Reid collects your draft at the end of class."]] },
  { type: "pages", label: "The whole sheet again" },
  { type: "walk", part: "1A-D" }, { type: "walk", part: "2A-D" },
  { type: "exit", part: "1A-E" }, { type: "reveals", part: "1A-E", good: true },
  { type: "exit", part: "2A-E" }, { type: "reveals", part: "2A-E", good: true },
  { type: "rows", label: "Hand in your draft", tag: "Hand-in", head: "Hand in your draft", rows: [
    ["Check", "Your name is on the sheet."], ["Hand in", "The WHOLE sheet, now."],
    ["Next class", "You get it back with one strength and one fix."]] },
  { type: "nextshape", label: "Next class", head: "Next class: The Good Copy", noCountdown: true, items: [
    ["Unit test in two classes", "countdown"], ["Warm-up: words and grammar", "quick practice"], ["Your draft back", "feedback"],
    ["Revise and edit", "mini-lesson"], ["Write your good copy", "independent writing"], ["Hand in your good copy", "hand-in"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Countdown", "Unit test in three classes."],
    ["Next class", "Your good copy: written and handed in in class."],
    ["Homework", "None. Your draft is with Mr. Reid."],
    ["Bring", "A pen for your good copy."]] } ],
 sheets: [
  { lvl: "ELL 1", suffix: "1A", label: "ELL 1", objective: "Write your five-sentence paragraph about the phone rule from your Lesson 4 plan.",
    outcomes: "ELL 1  W4 Write a basic paragraph  •  W3 Write sentences with because", vocab,
    remember: "A paragraph is not a list. Indent the first line, then write the sentences one after another." },
  { lvl: "ELL 2", suffix: "2A", label: "ELL 2", objective: "Draft your opinion paragraph from your Lesson 4 plan, with a detail after each reason.",
    outcomes: "ELL 2  W3 Write a composition with an introduction, body and conclusion  •  W4 Use transition words", vocab,
    remember: "Topic sentence, then each reason followed by its detail, then the closing — one paragraph, sentences running on." } ],
 worksheet: { parts: [
  // ---------------- ELL 1 ----------------
  { key: "1A-A", lvl: "ELL 1", id: "A", title: "Plan or paragraph?", kind: "cloze",
    instr: "Is it a plan or a paragraph? Write plan or paragraph on the line.",
    bank: ["plan", "paragraph"], bankCols: 2, crossed: [],
    example: { text: "It is a list, one sentence on each line.  →  It is a", ans: "plan", tail: "." },
    items: [{ text: "The first line is indented.  →  It is a", ans: "paragraph", tail: "." },
      { text: "You write it first, before the draft.  →  It is a", ans: "plan", tail: "." },
      { text: "The sentences run on, one after another.  →  It is a", ans: "paragraph", tail: "." },
      { text: "You hand it in as your good copy.  →  It is a", ans: "paragraph", tail: "." },
      { text: "It can be short notes in order.  →  It is a", ans: "plan", tail: "." }],
    how: "A plan is a list you write first. A paragraph has an indent and sentences that run on. Each word is used more than once, so do not cross them out." },
  { key: "1A-B", lvl: "ELL 1", id: "B", title: "Join the lines", kind: "lines", lines: 3,
    instr: "These two plan lines are about school starting at 9:30. Write them as the start of a paragraph: indent, and run the sentences on.",
    example: { text: "I think school should start at 9:30. / First, I can sleep more because I am tired.  →", ans: "    I think school should start at 9:30. First, I can sleep more because I am tired." },
    items: [{ text: "First, I can sleep more because I am tired. / Second, I can eat breakfast because I have more time.  →", ans: "First, I can sleep more because I am tired. Second, I can eat breakfast because I have more time." },
      { text: "Also, I am not late because the bus is not busy. / That is why school should start at 9:30.  →", ans: "Also, I am not late because the bus is not busy. That is why school should start at 9:30." }],
    how: "Copy the two sentences on the same lines, one after the other. Do not start a new line for the second sentence. Keep the capitals and periods." },
  { key: "1A-C", lvl: "ELL 1", id: "C", title: "My draft", kind: "open", lines: 10, gap: 560,
    instr: "Write your paragraph about the phone rule from your Lesson 4 Part C plan: opinion, three reasons with because, closing. Indent the first line. Write on the lines and leave the space above each line for changes.",
    example: { ans: "    I think students need their phones in class. First, phones help me because they translate new words. …" },
    how: "Open your Lesson 4 Part C plan. Indent the first line. Write your opinion, then First, Second and Also with your reasons, then That is why. The space above each line is for your changes next class." },
  { key: "1A-D", lvl: "ELL 1", id: "D", title: "Check your work", kind: "check",
    instr: "Tick each box when it is true.",
    checks: ["I indented the first line.", "My sentences run on, not a list.", "I wrote my opinion first.",
      "I have three reasons with because.", "I used First, Second, Also.", "My closing starts with That is why."],
    how: "Tick a box only when it is true. Fix anything you can before you hand it in." },
  { key: "1A-E", lvl: "ELL 1", id: "E", title: "Exit ticket", kind: "exit", lines: 2,
    instr: "Write one sentence. Then hand in the whole sheet.",
    items: [{ text: "One thing I will fix before my good copy …", reveal: "I will check that every reason has because and a full sentence after it." }],
    how: "Look at your draft and choose one thing to make better next class." },
  // ---------------- ELL 2 ----------------
  { key: "2A-A", lvl: "ELL 2", id: "A", title: "Plan or paragraph?", kind: "cloze",
    instr: "Is it true of a plan or of a paragraph? Write plan or paragraph on the line.",
    bank: ["plan", "paragraph"], bankCols: 2, crossed: [],
    example: { text: "Each reason sits on its own line.  →  This is true of a", ans: "plan", tail: "." },
    items: [{ text: "Each detail follows its reason.  →  This is true of a", ans: "paragraph", tail: "." },
      { text: "It is written before the draft.  →  This is true of a", ans: "plan", tail: "." },
      { text: "The first line is indented.  →  This is true of a", ans: "paragraph", tail: "." },
      { text: "A reader reads it from start to end.  →  This is true of a", ans: "paragraph", tail: "." },
      { text: "It may use short notes.  →  This is true of a", ans: "plan", tail: "." }],
    how: "A plan is the list you made in Lesson 4. A paragraph is what a reader reads: indented, with sentences running on. Each word is used more than once." },
  { key: "2A-B", lvl: "ELL 2", id: "B", title: "Join the lines", kind: "lines", lines: 3,
    instr: "These plan lines argue that school should start at 9:30. Write each pair as running sentences, the way they will sit in a paragraph.",
    example: { text: "In my opinion, school should start at 9:30. / First, teenagers need more sleep.  →", ans: "    In my opinion, school should start at 9:30. First, teenagers need more sleep." },
    items: [{ text: "First, teenagers need more sleep. / For example, I often feel tired in first period.  →", ans: "First, teenagers need more sleep. For example, I often feel tired in first period." },
      { text: "Finally, the buses would be less crowded. / For these reasons, a later start would help students learn.  →", ans: "Finally, the buses would be less crowded. For these reasons, a later start would help students learn." }],
    how: "Write the second sentence straight after the first, on the same line. A detail always follows the reason it supports." },
  { key: "2A-C", lvl: "ELL 2", id: "C", title: "My draft", kind: "open", lines: 13, gap: 560,
    instr: "Write your opinion paragraph from your Lesson 4 Part C plan: topic sentence, three reasons each with a detail, closing sentence. Indent the first line. Write on the lines and leave the space above each line for changes.",
    example: { ans: "    In my opinion, students should be able to use their phones for learning in class. First, a phone translates a hard word in two seconds. For example, … " },
    how: "Open your Lesson 4 Part C plan. Indent the first line. Each reason starts with a transition and is followed by its detail. The closing says your opinion again in new words. The space above each line is for changes next class." },
  { key: "2A-D", lvl: "ELL 2", id: "D", title: "Check your work", kind: "check",
    instr: "Tick each box when it is true.",
    checks: ["I indented the first line.", "My sentences run on, not a list.", "My topic sentence gives my opinion.",
      "Each reason has a detail after it.", "I used transitions.", "My closing uses new words."],
    how: "Tick a box only when it is true. Fix what you can before you hand it in." },
  { key: "2A-E", lvl: "ELL 2", id: "E", title: "Exit ticket", kind: "exit", lines: 2,
    instr: "Write one sentence. Then hand in the whole sheet.",
    items: [{ text: "One thing I will fix before my good copy, and why …", reveal: "I will make my second detail more specific, because right now it only repeats the reason." }],
    how: "Choose one real thing in your draft to improve, and say why." } ] },
 texts: { m1: L4.texts.m1, m2: L4.texts.m2 }
};
