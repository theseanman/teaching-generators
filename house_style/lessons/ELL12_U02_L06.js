// ELL12 U2 L06 — Revising, Editing and the Good Copy. ALL content here; the renderer holds the design.
// Built Oct 23 2026 to the spec Sean approved the same day ("go"; warm-up game kept — "I can always skip it").
// Unit 2 "My School Day", lesson 6 of 6. Drafts come back with Sean's one strength and one fix (formative read 2,
// collected in L5). Students revise, edit, then write the GOOD COPY in class on the one-page Good Copy sheet and hand it
// in before the bell — the same protection Sean put on U1 L12 after the U1 good copy slipped a lesson.
// The good copy is SUMMATIVE and MARKED ON ITS OWN (Sean, Oct 23) — the draft does not count toward it.
// RUBRIC ON THE BACK of the Good Copy sheet (standing order Oct 12; criteria approved by Sean Oct 23):
//   ELL 1: W4 paragraph shape · W3 because-reasons · W5 capitals and end marks · W8 present tense
//   ELL 2: W3 intro/body/conclusion · W4 transitions · W2 connecting ideas · W7 capitals and punctuation
// The Good Copy sheet's tick boxes are those criteria in student language (rubric sheets only).
// ELL 1 W12 (ask for editing help) is carried by the "I need help with" line in ELL 1 Part B — help slips were dropped
// Oct 14 ("no one uses them") and this line replaces them.
// Countdown: "Unit test in two classes" (practice test, unit test follow).
const LV = ["Not Yet Meeting", "Minimally Meeting", "Meeting", "Fully Meeting"];
const vocab = [
  ["revise", "to make your ideas better"], ["edit", "to find and fix mistakes"],
  ["good copy", "the final neat version you hand in"], ["fix", "one thing to change"],
  ["capital", "a big letter: starts, names, I"], ["end mark", ". or ? or !"],
  ["strength", "something you did well"], ["check", "to look again carefully"]];

module.exports = {
 course: "ELL12",
 meta: { unit: 2, unitTitle: "My School Day", lesson: 6, title: "Revising, Editing and the Good Copy", subtitle: "Make it better, then make it final", month: "November" },
 banner: { obj: "Revise and edit your draft, then write and hand in your good copy.",
   std: "ELL 1: W4 paragraph · W3 because · W5 capitals · W12 ask for help  •  ELL 2: W3 · W4 transitions · W9 revise and edit", lit: ["COM", "TH", "PS"] },
 countdown: "Unit test in two classes",
 plan: {
  objective: "Students get their drafts back, use your fix, edit with the checklist, then write the good copy in class and hand it in before the bell. It is marked on its own with the rubric on the back.",
  outcomes: "ELL 1: W4 · W3 · W5 · W12. ELL 2: W3 · W4 · W9.",
  schwerpunkt: "the good copy is written AND handed in before the bell — every change from the draft is in it.",
  schwerStep: 7,
  materials: "Deck · the Lesson 5 drafts, marked with one strength and one fix · ELL 1 and ELL 2 Lesson 6 worksheets · ELL 1 and ELL 2 Good Copy sheets (rubric printed on the back) · pens",
  timing: "80 minutes",
  steps: [
   ["10", "Warm-up Parts A and B", "In exercise books, five items per level per Part, side by side. Part A · Vocabulary: editing words. Part B · Grammar: ELL 1 capitals and end marks; ELL 2 commas after transitions. Reveal one at a time, alternating levels."],
   ["5", "Error Hunt", "Warm-up game (skip it if time is short). One sentence with one error goes up. The first pair to say the fixed sentence wins the round. Five rounds. English only."],
   ["1", "Title and goals", "Read the three goals: use your fix, check your draft, write and hand in your good copy."],
   ["4", "Your draft back", "Hand back the Lesson 5 drafts. Students read your strength and underline your fix."],
   ["7", "Revise: use your fix", "Teaching. A lunch-topic draft sentence, the fix written beside it, and the sentence after the fix. Revising changes ideas; editing fixes mistakes."],
   ["6", "Edit: the checklist", "Teaching. ELL 1: capitals, end marks, because + full sentence, First / Second / Also. ELL 2 adds a detail after each reason and the s on he / she / it."],
   ["15", "Worksheet Parts A, B and C", "Part A: fix five errors. Part B: your own fix (ELL 1 ends with I need help with — answer those lines as you circulate). Part C: tick the checklist on your draft."],
   ["28", "Write your good copy", "Good Copy sheet. Every change is in; indent the first line; the tick boxes at the foot are the rubric on the back in student words. ★ Collect at the bell — no good copy goes home."],
   ["3", "Exit ticket and hand in", "Exit ticket: one change from draft to good copy. Hand in the Good Copy sheet on top of the draft and worksheet."],
   ["1", "Next class and agendas", "Next class is the practice test, marked with a partner. Unit test next class after that."] ],
  diff: "Support: ELL 1 students may copy their draft sentence by sentence and make only your one fix. Extension: ELL 2 early finishers read their good copy aloud quietly once and fix anything that sounds wrong.",
  assess: "★ SUMMATIVE: collect every Good Copy sheet (with the draft and worksheet behind it). Mark the good copy ON ITS OWN with the rubric on the back — ELL 1 W4 · W3 · W5 · W8; ELL 2 W3 · W4 · W2 · W7. The draft does not count. ELL 1 W12: the I need help with line in Part B.",
  homework: "None. The good copy is finished and handed in today. Study for the practice test.",
  watch: "Students copying the draft without making the fix. Lines skipped or the paragraph written as a list on the good copy. ELL 1 leaving the I need help with line blank — prompt them to write one real question. Anyone still writing at the bell: collect it anyway." },
 shape: [["Warm-up: words and grammar", "quick practice"], ["Error Hunt", "warm-up game"], ["Your draft back", "feedback"],
   ["Revise: use your fix", "mini-lesson"], ["Edit: the checklist", "mini-lesson"], ["Worksheet Parts", "worksheet"],
   ["Write your good copy", "independent writing"], ["Exit ticket and hand in", "hand-in"]],
 sequence: [
  { type: "drill", part: "A", kind: "Vocabulary", lvls: [
    { lvl: "ELL 1", bankLabel: "Editing words", bank: "edit · capital · end mark · good copy · fix",
      items: [["A big letter is a ____.", "capital"], ["A period is an ____.", "end mark"],
        ["To fix mistakes is to ____.", "edit"], ["The neat final one: the ____.", "good copy"], ["One thing to change: a ____.", "fix"]] },
    { lvl: "ELL 2", bankLabel: "Editing words", bank: "revise · edit · strength · good copy · check",
      items: [["Make ideas better: ____.", "revise"], ["Fix mistakes: ____.", "edit"],
        ["Something done well: a ____.", "strength"], ["Look again: ____.", "check"], ["The final version: the ____.", "good copy"]] } ] },
  { type: "drill", part: "B", kind: "Grammar", lvls: [
    { lvl: "ELL 1", bankLabel: "Capital or end mark?", bank: "I · . · Sofia · ? · Monday",
      items: [["____ think the rule is good.", "I"], ["My friend ____ needs her phone.", "Sofia"],
        ["We have gym on ____.", "Monday"], ["Do you agree____", "?"], ["I like the rule____", "."]] },
    { lvl: "ELL 2", bankLabel: "Comma after it", bank: "First, · For example, · In addition, · Finally, · For these reasons,",
      items: [["1st: ____ I focus.", "First,"], ["Detail: ____ I finish.", "For example,"],
        ["2nd: ____ it is fair.", "In addition,"], ["Last: ____ we learn.", "Finally,"], ["End: ____ I agree.", "For these reasons,"]] } ] },
  { type: "rows", label: "Error Hunt", tag: "Warm-up game", head: "Error Hunt: how to play", englishOnly: true, rows: [
    ["1", "A sentence with ONE mistake goes on the screen."], ["2", "With your partner, find it and fix it."],
    ["3", "First pair to say the fixed sentence wins the round."]] },
  { type: "rows", label: "Error Hunt: the sentences", tag: "Warm-up game", head: "Find the mistake", rows: [
    ["1", "i think lunch should be longer."], ["2", "Arman check his phone in class."], ["3", "First I listen better."],
    ["4", "We have gym on monday."], ["5", "Do you agree with the rule."]] },
  { type: "rows", label: "Error Hunt: the fixes", tag: "Warm-up game · answers", head: "The fixes", rows: [
    ["1", "I think lunch should be longer.  (capital I)"], ["2", "Arman checks his phone in class.  (s on he)"],
    ["3", "First, I listen better.  (comma)"], ["4", "We have gym on Monday.  (capital day)"], ["5", "Do you agree with the rule?  (question mark)"]] },
  { type: "title", label: "Today's lesson" },
  { type: "goals", label: "Today's goals", items: [
    "Use your fix from Mr. Reid.", "Check your draft with the checklist.", "Write and hand in your good copy."] },
  { type: "rows", label: "Your draft back", tag: "Feedback", head: "Your Lesson 5 draft is back", rows: [
    ["Read", "Your strength: something you did well. Keep it."], ["Underline", "Your fix: the one thing to change."],
    ["Today", "Your good copy has the fix in it."]] },
  { type: "rows", label: "Revise: use your fix", tag: "Teaching 1 of 2", head: "Revise: use your fix", rows: [
    ["Draft", "First, I need more time. Because the line is long."],
    ["Fix", "Join the reason with because."],
    ["After", "First, I need more time because the line is long."],
    ["Revise / edit", "Revising makes ideas better. Editing fixes mistakes."]] },
  { type: "rows", label: "Edit: the checklist", tag: "Teaching 2 of 2", head: "Edit: the checklist", rows: [
    ["Capitals", "Start of every sentence, names, days, I."], ["End marks", "Every sentence ends with . or ?"],
    ["because", "A full sentence after it: who + verb."], ["Transitions", "ELL 1: First, Second, Also.  ELL 2: a comma after each."],
    ["ELL 2 adds", "A detail after each reason. The s on he, she, it."]] },
  { type: "handout", label: "Hand out the worksheet", note: "ELL 1 and ELL 2 worksheets. Name and date first. Your Lesson 5 draft goes beside it.",
    items: [["A", "find and fix"], ["B", "my fix"], ["C", "check my draft"], ["D", "exit ticket", true]],
    foot: "The Good Copy sheet comes after Part C." },
  { type: "walk", part: "1A-A", withExample: true }, { type: "reveals", part: "1A-A" },
  { type: "walk", part: "2A-A", withExample: true }, { type: "reveals", part: "2A-A" },
  { type: "walk", part: "1A-B", withExample: true }, { type: "reveals", part: "1A-B", good: true },
  { type: "walk", part: "2A-B", withExample: true }, { type: "reveals", part: "2A-B", good: true },
  { type: "walk", part: "1A-C" }, { type: "walk", part: "2A-C" },
  { type: "rows", label: "Write your good copy", tag: "Independent writing", head: "Write your good copy", rows: [
    ["Use", "Your draft, your fix, your checklist ticks."], ["Write", "Indent the first line. One paragraph, neatly, in pen."],
    ["Every", "change is in. Read it once more before you hand it in."], ["At the bell", "Hand it in — finished or not."]] },
  { type: "rows", label: "How your good copy is marked", tag: "Independent writing · the rubric", head: "How your good copy is marked", rows: [
    ["ELL 1", "Paragraph shape · because-reasons · capitals and end marks · present tense"],
    ["ELL 2", "Introduction, body, conclusion · transitions · joining ideas · capitals and punctuation"],
    ["Where", "On the back of your Good Copy sheet: all four levels."]] },
  { type: "pages", label: "The whole sheet again" },
  { type: "exit", part: "1A-D" }, { type: "reveals", part: "1A-D", good: true },
  { type: "exit", part: "2A-D" }, { type: "reveals", part: "2A-D", good: true },
  { type: "rows", label: "Hand it in", tag: "Hand-in", head: "Hand in your good copy", rows: [
    ["On top", "Your Good Copy sheet, with your name."], ["Behind it", "Your Lesson 5 draft and this worksheet."],
    ["Now", "Everything goes in the tray before you leave."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Practice Test", noCountdown: true, items: [
    ["Unit test next class", "countdown"], ["Practice test", "test"], ["Mark it with a partner", "peer marking"], ["What to study", "review"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Countdown", "Unit test in two classes."],
    ["Next class", "Practice test, marked with a partner."],
    ["Study", "Lessons 1 to 6: how-often words, because, transitions, capitals."],
    ["Bring", "A pencil and an eraser."]] } ],
 sheets: [
  { lvl: "ELL 1", suffix: "1A", label: "ELL 1", objective: "Use your fix, check your draft, then write your good copy.",
    outcomes: "ELL 1  W4 Write a basic paragraph  •  W3 Sentences with because  •  W5 Capitals and end marks  •  W12 Ask for editing help", vocab,
    remember: "Revise: make the fix. Edit: capitals, end marks, because + a full sentence, First, Second, Also." },
  { lvl: "ELL 2", suffix: "2A", label: "ELL 2", objective: "Revise with your fix, edit with the checklist, then write your good copy.",
    outcomes: "ELL 2  W3 Introduction, body and conclusion  •  W4 Transition words  •  W9 Revise and edit", vocab,
    remember: "A comma follows every transition: First, … For example, … Each reason has its detail. He, she and it keep the s." } ],
 worksheet: { parts: [
  // ---------------- ELL 1 ----------------
  { key: "1A-A", lvl: "ELL 1", id: "A", title: "Find and fix", kind: "lines", lines: 2,
    instr: "Each sentence about lunch has ONE mistake. Write the sentence again, fixed.",
    example: { text: "i think lunch should be longer.  →", ans: "I think lunch should be longer." },
    items: [{ text: "First, I need more time to eat. Because the line is long.  →", ans: "First, I need more time to eat because the line is long." },
      { text: "second, I want to talk to my friends.  →", ans: "Second, I want to talk to my friends." },
      { text: "Also, I goes to the library because I like to read.  →", ans: "Also, I go to the library because I like to read." },
      { text: "My friend talk to me at lunch.  →", ans: "My friend talks to me at lunch." },
      { text: "That is why lunch should be longer  →", ans: "That is why lunch should be longer." }],
    how: "Read each sentence slowly. Look for a missing capital, a missing end mark, a lonely Because, or a verb that does not fit. Fix ONE thing and copy the whole sentence." },
  { key: "1A-B", lvl: "ELL 1", id: "B", title: "My fix", kind: "lines", lines: 2,
    instr: "Copy the fix Mr. Reid wrote on your draft. Then write the sentence with the fix made. Then ask one question.",
    example: { text: "My fix: join with because  →", ans: "First, I listen better because my phone is in my bag." },
    items: [{ text: "The fix Mr. Reid wrote  →", ans: "Your closing is a new reason. Say your opinion again." },
      { text: "My sentence, fixed  →", ans: "That is why phones should go away during class." },
      { text: "I need help with  →", ans: "Is my third reason different from my first reason?" }],
    how: "Copy the fix, then write the sentence again with the fix in it. On the last line, write one real question about your writing — Mr. Reid will come and answer it." },
  { key: "1A-C", lvl: "ELL 1", id: "C", title: "Check my draft", kind: "check",
    instr: "Look at your Lesson 5 draft. Tick each box when it is true.",
    checks: ["Every sentence starts with a capital.", "Every sentence has an end mark.", "Every because has who + verb after it.",
      "I used First, Second, Also.", "My opinion is first.", "My closing starts with That is why."],
    how: "Fix your draft before you tick. When every box is ticked, start your good copy." },
  { key: "1A-D", lvl: "ELL 1", id: "D", title: "Exit ticket", kind: "exit", lines: 2,
    instr: "Write one sentence. Then hand in everything.",
    items: [{ text: "One change I made from my draft to my good copy …", reveal: "I changed my closing so it says my opinion again." }],
    how: "Name one real change you made today." },
  // ---------------- ELL 2 ----------------
  { key: "2A-A", lvl: "ELL 2", id: "A", title: "Find and fix", kind: "lines", lines: 2,
    instr: "Each sentence from a lunch paragraph has ONE mistake. Write it again, fixed.",
    example: { text: "First many students do not have enough time to eat.  →", ans: "First, many students do not have enough time to eat." },
    items: [{ text: "Because the line is long.  →", ans: "Students lose time because the line is long." },
      { text: "For example, my friend have fifteen minutes.  →", ans: "For example, my friend has fifteen minutes." },
      { text: "in addition, lunch is the only time we see friends.  →", ans: "In addition, lunch is the only time we see friends." },
      { text: "Finally, clubs needs more time.  →", ans: "Finally, clubs need more time." },
      { text: "For these reasons a longer lunch helps.  →", ans: "For these reasons, a longer lunch helps." }],
    how: "Look for a missing comma after a transition, a sentence that starts with Because and stands alone, a missing capital, or a verb that does not agree. Fix ONE thing and copy the whole sentence." },
  { key: "2A-B", lvl: "ELL 2", id: "B", title: "My fix", kind: "lines", lines: 2,
    instr: "Copy the fix Mr. Reid wrote on your draft and make it. Then name one more change you will make.",
    example: { text: "My fix: the detail repeats the reason  →", ans: "For example, I finished my whole science worksheet before the bell yesterday." },
    items: [{ text: "The fix Mr. Reid wrote  →", ans: "Your closing only repeats your topic sentence. Use new words." },
      { text: "My sentence, revised  →", ans: "For these reasons, phones belong in our bags until the bell rings." },
      { text: "One more change I will make, and why  →", ans: "I will add a comma after In addition, because a transition needs one." }],
    how: "Copy the fix, then write the sentence again with it made. The last line is a change you found yourself — say why it makes the paragraph better." },
  { key: "2A-C", lvl: "ELL 2", id: "C", title: "Check my draft", kind: "check",
    instr: "Look at your Lesson 5 draft. Tick each box when it is true.",
    checks: ["My topic sentence gives my opinion.", "Each reason has a detail after it.", "A comma follows every transition.",
      "No sentence is a lonely Because.", "He, she and it keep the s.", "My closing uses new words."],
    how: "Fix your draft before you tick. When every box is ticked, start your good copy." },
  { key: "2A-D", lvl: "ELL 2", id: "D", title: "Exit ticket", kind: "exit", lines: 2,
    instr: "Write one sentence. Then hand in everything.",
    items: [{ text: "The best change I made today, and why …", reveal: "I rewrote my second detail, because it only repeated the reason before." }],
    how: "Name one change and say why it helped." } ] },
 goodCopy: [
  { lvl: "ELL 1", suffix: "1A", lines: 12, title: "My Opinion: Good Copy",
    steps: "Write your whole paragraph about the phone rule again, neatly, in pen. Use your Lesson 5 draft, your fix and your checklist. Indent the first line. Write on every line.",
    checks: ["Opinion, three reasons, closing — in order.", "Every reason has because + who + verb.", "Every sentence has a capital and an end mark.", "My verbs are present tense."],
    rubric: { title: "How your good copy is marked — ELL 1", intro: "Your good copy is marked on its own. Mr. Reid circles one level on each line.", levels: LV, criteria: [
      { code: "W4", name: "A paragraph in the right shape", d: [
        "Your sentences are a list, or the opinion or the closing is missing.",
        "You have an opinion and some reasons, but a part is missing or out of order.",
        "You have an opinion, three reasons and a closing, in order, as one paragraph.",
        "All five parts are in order in one indented paragraph, and your closing says your opinion in new words."] },
      { code: "W3", name: "Reasons with because", d: [
        "No reason uses because, or nothing full comes after because.",
        "One reason has a correct because-sentence.",
        "Three reasons use because, each with who + verb after it.",
        "Three correct because-sentences, each giving a different, clear reason."] },
      { code: "W5", name: "Capitals and end marks", d: [
        "Many sentences have no capital or no end mark.",
        "About half of your sentences start and end correctly.",
        "Almost every sentence starts with a capital and ends with an end mark.",
        "Every sentence is correct, including names, days and I."] },
      { code: "W8", name: "Present tense", d: [
        "Verbs are missing or mostly in the wrong form.",
        "Some verbs are present tense and correct.",
        "Most verbs are present tense and correct.",
        "All verbs are present tense and correct, with the s on he, she and it."] } ] } },
  { lvl: "ELL 2", suffix: "2A", lines: 15, gap: 260, title: "My Opinion: Good Copy",
    steps: "Write your whole paragraph about the phone rule again, neatly, in pen. Use your Lesson 5 draft, your fix and your checklist. Indent the first line. Write on every line.",
    checks: ["Topic sentence, three reasons with details, closing.", "A transition starts each reason and the closing.", "Ideas joined with and, but, so, because — no fragments.", "Capitals and commas are checked."],
    rubric: { title: "How your good copy is marked — ELL 2", intro: "Your good copy is marked on its own. Mr. Reid circles one level on each line.", levels: LV, criteria: [
      { code: "W3", name: "Introduction, body and conclusion", d: [
        "There is no clear topic sentence or no closing.",
        "You have a topic sentence and reasons, but the closing is missing or only repeats.",
        "A topic sentence, three reasons with details, and a closing.",
        "Every part is there, each detail supports its reason, and the closing restates your opinion in new words."] },
      { code: "W4", name: "Transition words", d: [
        "No transitions are used.",
        "One or two transitions, and some are used wrongly.",
        "Transitions start each reason and the closing.",
        "Varied transitions used correctly — First, In addition, Finally, For example, For these reasons — with commas."] },
      { code: "W2", name: "Connecting ideas", d: [
        "Ideas are not joined, or there are Because-fragments.",
        "Some ideas are joined with and, but, so or because; some fragments remain.",
        "Ideas are joined correctly with and, but, so, or and because.",
        "Joining words are used correctly and in variety, with no fragments."] },
      { code: "W7", name: "Capitals and punctuation", d: [
        "Many errors make the paragraph hard to read.",
        "Several errors, some of which confuse the reader.",
        "A few errors that do not confuse the reader.",
        "Almost no errors, including commas after transitions."] } ] } } ]
};
