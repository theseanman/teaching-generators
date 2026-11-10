// ELL12 U3 L03 — First, Then, After That. ALL content here; the renderer holds the design.
// Built Nov 10 2026 to the spec Sean approved the same day.
// Skill: events in order. Both levels: a time word at the start of a sentence, with a comma. ELL 1 also joins two events
// with and / but / so (Sean left the placement to Claude: here, because joining events is part of telling them in order,
// and Lesson 6 is too late to meet new grammar). ELL 2: transitions that move time and pace, and the comma after them —
// Part B uses ONLY transitions that clearly take a comma (no Later / Then) so every item has one right answer.
// Warm-up game Story Scramble needs NO cards (Sean): the five events are lettered on one slide; pairs write the order.
// Start of class: anyone not reached in the Lesson 2 call-up comes up during the warm-up.
// Outcomes: ELL 1 W2 · W8; ELL 2 W4 · W7. No countdown yet (the unit test is five classes away).
// Unit order: L01 A Night to Remember · L02 What Happened · L03 this · L04 How I Felt · L05 Planning · L06 Drafting
// · L07 Revising, Editing and the Good Copy · unit test
const vocab = [
  ["first", "at the very beginning"], ["finally", "at the very end"], ["later", "some time after"],
  ["suddenly", "very quickly, with no warning"], ["meanwhile", "at the same time, somewhere else"],
  ["that evening", "in the evening of the same day"], ["before", "earlier than"], ["during", "all through a time"]];
const bankWords = ["during", "suddenly", "first", "that evening", "before", "finally", "meanwhile", "later"];

// The class text again, both levels (from Lesson 1 — reproduced in full, per the texts-in-full rule).
const T1 = "My name is Hana. I am from Osaka, Japan. Last year was my first New Year's Eve in Canada. At seven o'clock in the morning, my mom opened her laptop. It was already midnight in Japan. We watched the big temple bell on a livestream. My grandma called us from Osaka. I was happy, but I was sad too. In the evening, we ate soba noodles. Long noodles are for a long life. At midnight, we went outside. There were fireworks over the river. My little brother jumped and shouted. My mom smiled. It was a new year in a new home.";
const T2 = "At seven o'clock on the morning of December 31, my mother woke me up and put her laptop on the kitchen table. In Osaka, it was already midnight. On the screen, a monk was pulling a heavy rope, and the old temple bell rang slowly, one hundred and eight times. My grandmother was standing somewhere in that crowd, but I could not see her. I held my cup of tea with both hands and did not say anything. That evening, my father cooked soba, because long noodles mean a long life. We ate quietly while the rain was falling outside. Just before midnight, my little brother pulled on his coat and ran to the door. We followed him down to the river. Suddenly, the sky over Richmond exploded with colour. My brother screamed and grabbed my hand. I laughed for the first time all day. Japan rang in the new year first, but Canada gave me a new one too.";

module.exports = {
 course: "ELL12",
 meta: { unit: 3, unitTitle: "A Celebration I Remember", lesson: 3, title: "First, Then, After That", subtitle: "Tell it in order", month: "November" },
 banner: { obj: "Tell the events of a celebration in order, with time words.",
   std: "ELL 1: W2 compound sentences · W8 tense awareness  •  ELL 2: W4 transition words · W7 capitals and punctuation", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students put a celebration's events in order with time words. ELL 1 joins two events with and, but or so; ELL 2 uses transitions that move time and pace, with a comma after each.",
  outcomes: "ELL 1: W2 · W8. ELL 2: W4 · W7.",
  schwerpunkt: "the last writing Part — your own celebration's events in order, every sentence after the first opening with a time word.",
  schwerStep: 6,
  materials: "Deck · ELL 1 and ELL 2 Lesson 3 worksheets · exercise books for the warm-up and Story Scramble · your Lesson 2 call-up list",
  timing: "80 minutes",
  steps: [
   ["12", "Warm-up Parts A and B", "In exercise books, five items per level per Part, both levels on one slide. Part A · Vocabulary: the verbs that change. Part B · Grammar: ELL 1 was / were and verbs that change; ELL 2 was ___ing when. ★ While they write, call up anyone you did not reach in Lesson 2's formative read."],
   ["8", "Story Scramble", "Warm-up game. Five events from Hana's night are lettered A to E on one slide, out of order. Pairs write the right order in their exercise books (for example C, A, E, B, D) and put their hands up. First correct pair wins. Then the answer slide. No cards."],
   ["2", "Title and goals", "Read the three goals: learn time words, join events, write your celebration in order."],
   ["10", "Match the word", "Eight time words against their meanings from a shuffled bank, revealed one at a time, then the summary slide, then a partner talk: three things from your celebration, in order. English only."],
   ["10", "Hana's time words", "Read both versions of Hana's story again in full, then the side-by-side slide. Students find the time words: ELL 1 At seven o'clock · In the evening · At midnight; ELL 2 That evening · Just before midnight · Suddenly. Each starts a sentence and takes a comma."],
   ["10", "Time words, and / but / so, pace", "Teaching. Time words at the start of a sentence, with a comma (both levels). ELL 1: and (one more thing), but (something different), so (what happened because of it), with a comma before. ELL 2: transitions that skip time, speed up or slow down a moment."],
   ["22", "Worksheet Parts", "Walk each Part with its worked example and reveal answers, alternating levels. ELL 1 finishes with four sentences using First / Then / After that / Finally; ELL 2 writes five or six sentences with at least three transitions."],
   ["6", "Check and exit ticket", "The tick-box Check Part, then the exit ticket. Next class, then agendas."] ],
  diff: "Support: ELL 1 keep the and / but / so slide on the screen during Part C. Extension: ELL 2 early finishers add one sentence that slows a moment down with For a second.",
  assess: "No marking checkpoint today. Formative read 1 (Lesson 2) finishes during the warm-up: call up anyone you did not reach. Formative read 2 is the Lesson 6 draft.",
  homework: "None. Anything unfinished comes back at the start of Lesson 4.",
  watch: "Then and After that with no comma, or a comma after Then mid-sentence. ELL 1 joining with and when so is meant. ELL 2 using Suddenly for something that was not sudden." },
 shape: [["Warm-up: words and grammar", "quick practice"], ["Story Scramble", "warm-up game"], ["Match the word", "vocabulary game"],
   ["Tell it in order", "partner speaking"], ["Hana's time words", "class reading"], ["Time words and joining words", "mini-lesson"],
   ["Worksheet Parts", "worksheet"], ["My celebration in order", "independent writing"], ["Check and exit ticket", "quick write"]],
 sequence: [
  { type: "drill", part: "A", kind: "Vocabulary", lvls: [
    { lvl: "ELL 1", bankLabel: "Verbs that change", bank: "gave · went · came · saw · ate",
      items: [["Yesterday I ____ to the park.", "went"], ["We ____ pizza for dinner.", "ate"], ["I ____ a movie last night.", "saw"],
        ["My aunt ____ me a gift.", "gave"], ["My cousins ____ to my house.", "came"]] },
    { lvl: "ELL 2", bankLabel: "Verbs that change", bank: "told · held · felt · rang · took",
      items: [["The phone ____ at midnight.", "rang"], ["I ____ my sister's hand.", "held"], ["We ____ a photo by the river.", "took"],
        ["I ____ tired after the party.", "felt"], ["My dad ____ a funny story.", "told"]] } ] },
  { type: "drill", part: "B", kind: "Grammar", lvls: [
    { lvl: "ELL 1", bankLabel: "Was, were and verbs that change", bank: "made · was · got · were · had",
      items: [["We ____ a big dinner.", "had"], ["It ____ very cold.", "was"], ["My parents ____ happy.", "were"],
        ["I ____ a new jacket.", "got"], ["My mom ____ a cake.", "made"]] },
    { lvl: "ELL 2", bankLabel: "Was ___ing when", bank: "started · were eating · was raining · rang · was sleeping",
      items: [["My brother ____ when the bell rang.", "was sleeping"], ["We ____ when the fireworks started.", "were eating"],
        ["It ____ when we left the house.", "was raining"], ["We were walking when my phone ____.", "rang"],
        ["I was reading when the music ____.", "started"]] } ] },
  { type: "rows", label: "Story Scramble", tag: "Warm-up game", head: "Story Scramble: how to play", rows: [
    ["1", "Five things from Hana's night are on the next slide, out of order."], ["2", "With a partner, put them in order."],
    ["3", "Write the letters in your exercise book: C, A, E …"], ["4", "Hands up when you are done. First right pair wins."]] },
  { type: "rows", label: "Story Scramble: the events", tag: "Story Scramble", head: "Put Hana's night in order", rows: [
    ["A", "Hana's family ate soba noodles."], ["B", "The family watched the temple bell on a laptop."],
    ["C", "They went outside at midnight."], ["D", "Hana's brother jumped and shouted."],
    ["E", "Hana's mom opened her laptop at seven o'clock."]] },
  { type: "rows", label: "Story Scramble: the answer", tag: "Story Scramble", head: "The right order: E, B, A, C, D", rows: [
    ["1  E", "Hana's mom opened her laptop at seven o'clock."], ["2  B", "The family watched the temple bell on a laptop."],
    ["3  A", "Hana's family ate soba noodles."], ["4  C", "They went outside at midnight."], ["5  D", "Hana's brother jumped and shouted."]] },
  { type: "title", label: "Today's lesson" },
  { type: "goals", label: "Today's goals", items: [
    "Learn words that tell time order.", "Join two events in one sentence.", "Write your celebration in order."] },
  { type: "match", label: "Match the word", head: "Match the word", bank: bankWords, words: vocab },
  { type: "vocab", label: "Key vocabulary", head: "Time words", words: vocab },
  { type: "speaking", label: "Tell it in order", head: "Tell it in order", englishOnly: true, signAll: true, icon: "icon-friends.png",
    prompt: "Tell your partner three things from your celebration, in order. Start each one with a time word.",
    frames: ["First, we ______.", "Then ______.", "Later, ______.", "Finally, ______."] },
  { type: "rows", label: "Hana's time words", tag: "Class reading", head: "Find Hana's time words", icon: "icon-read.png", rows: [
    ["Read", "Hana's story again, both versions."], ["Find", "Every word or phrase that tells WHEN."],
    ["Look", "Where does it go in the sentence? What comes after it?"], ["Then", "We check them together."]] },
  { type: "prose", text: "t1", label: "Hana (ELL 1)" },
  { type: "prose", text: "t2", label: "Hana (ELL 2)" },
  { type: "text2", a: "t1", b: "t2", label: "Hana: side by side", tag: "Class text · Hana · both levels", head: "Hana: ELL 1 and ELL 2" },
  { type: "rows", label: "The time words in Hana's story", tag: "Class reading", head: "The time words in Hana's story", rows: [
    ["ELL 1", "At seven o'clock · In the evening · At midnight"], ["ELL 2", "At seven o'clock on the morning of December 31 · That evening · Just before midnight · Suddenly"],
    ["Where", "At the START of the sentence."], ["After it", "A comma: That evening, my father cooked soba."]] },
  { type: "rows", label: "Time words", tag: "Teaching 1 of 3", head: "Time words start the sentence", rows: [
    ["Beginning", "First, · At seven o'clock, · That morning,"], ["Middle", "Then · Next, · After that, · Later,"],
    ["End", "Finally, · At the end of the night,"], ["Comma", "After the time word: After that, we went home."]] },
  { type: "rows", label: "ELL 1: and, but, so", tag: "Teaching 2 of 3", head: "ELL 1: join two events", rows: [
    ["and = one more thing", "We ate soba, and we watched the fireworks."], ["but = something different", "I was happy, but I missed my grandma."],
    ["so = what happened because of it", "It was cold, so we wore our coats."], ["Comma", "Put a comma BEFORE and, but, so."]] },
  { type: "rows", label: "ELL 2: time and pace", tag: "Teaching 3 of 3", head: "ELL 2: transitions move time and pace", rows: [
    ["Skip time", "That evening, · Later, · By noon,"], ["Speed up", "Suddenly, the sky exploded with colour."],
    ["Slow down", "For a second, nobody moved."], ["End", "By the end of the night, everyone was dancing."]] },
  { type: "handout", label: "Hand out the worksheet", note: "ELL 1 and ELL 2 worksheets. Name and date first.",
    items: [["A", "ELL 1: time words · ELL 2: transitions"], ["B", "ELL 1: and, but, so · ELL 2: add the comma"], ["C", "my celebration in order"], ["D", "check your work"], ["E", "exit ticket", true]],
    foot: "Both levels have Parts A, B, C, then the check and the exit ticket." },
  { type: "walk", part: "1A-A", withExample: true }, { type: "reveals", part: "1A-A" },
  { type: "walk", part: "2A-A", withExample: true }, { type: "reveals", part: "2A-A" },
  { type: "walk", part: "1A-B", withExample: true }, { type: "reveals", part: "1A-B" },
  { type: "walk", part: "2A-B", withExample: true }, { type: "reveals", part: "2A-B" },
  { type: "walk", part: "1A-C", withExample: true }, { type: "reveals", part: "1A-C", good: true },
  { type: "walk", part: "2A-C", withExample: true }, { type: "reveals", part: "2A-C", good: true },
  { type: "pages", label: "The whole sheet again" },
  { type: "walk", part: "1A-D" }, { type: "walk", part: "2A-D" },
  { type: "exit", part: "1A-E" }, { type: "reveals", part: "1A-E", good: true },
  { type: "exit", part: "2A-E" }, { type: "reveals", part: "2A-E", good: true },
  { type: "nextshape", label: "Next class", head: "Next class: How I Felt", items: [
    ["Warm-up: words and grammar", "quick practice"], ["Warm-up game", "game"], ["Feeling words", "vocabulary game"],
    ["Show it, don't just say it", "mini-lesson"], ["ELL 2: dialogue", "mini-lesson"], ["How I felt worksheet", "worksheet"], ["Exit ticket", "quick write"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Next class", "How I Felt: feelings in a story."],
    ["Homework", "None — unless Part C is unfinished."],
    ["Learn", "ELL 1: and, but, so. ELL 2: the comma after a transition."],
    ["Coming up", "Unit 3 ends with a unit test before winter break."]] } ],
 sheets: [
  { lvl: "ELL 1", suffix: "1A", label: "ELL 1", objective: "Tell the events of a celebration in order, with time words.",
    outcomes: "ELL 1  W2 Compound sentences with and, but, so  •  W8 Show awareness of tense", vocab,
    remember: "A time word starts the sentence and takes a comma: After that, we went home. Join two events with a comma and and, but or so." },
  { lvl: "ELL 2", suffix: "2A", label: "ELL 2", objective: "Tell the events of a celebration in order, with transitions and commas.",
    outcomes: "ELL 2  W4 Use transition words  •  W7 Use capitalization and punctuation correctly", vocab,
    remember: "A transition at the start of a sentence takes a comma: Suddenly, the lights went out. Choose it for its job: skip time, speed up, slow down, or end." } ],
 worksheet: { parts: [
  // ---------------- ELL 1 ----------------
  { key: "1A-A", lvl: "ELL 1", id: "A", title: "Time words", kind: "cloze",
    instr: "Write the right time word from the bank on the line. Cross out each word in the bank as you use it.",
    bank: ["Suddenly", "First", "At midnight", "Finally", "In the evening"], bankCols: 3, crossed: ["First"],
    example: { text: "", ans: "First", tail: ", I woke up at eight o'clock." },
    items: [{ text: "", ans: "In the evening", tail: ", we ate a big dinner with my relatives." },
      { text: "", ans: "At midnight", tail: ", the clock said twelve and the fireworks started." },
      { text: "", ans: "Suddenly", tail: ", a loud bang made my little brother cry." },
      { text: "", ans: "Finally", tail: ", we went to bed at one o'clock in the morning." }],
    how: "The sentences go in order, from the start of the day to the end. Look for a clue in each one: dinner happens in the evening, a loud bang is sudden, and going to bed is the end." },
  { key: "1A-B", lvl: "ELL 1", id: "B", title: "And, but or so", kind: "cloze",
    instr: "Write and, but or so on the line. You can use each word more than once.",
    bank: ["and", "but", "so"], bankCols: 3, crossed: [],
    example: { text: "It was cold,", ans: "so", tail: "we wore our coats." },
    items: [{ text: "I was happy,", ans: "but", tail: "I missed my grandma." },
      { text: "We ate noodles,", ans: "and", tail: "we watched the bell on TV." },
      { text: "The music was loud,", ans: "so", tail: "we turned it down." },
      { text: "My brother wanted cake,", ans: "but", tail: "there was no cake left." },
      { text: "My aunt sang,", ans: "and", tail: "my uncle played the guitar." }],
    how: "And adds one more thing. But shows something different. So shows what happened because of the first part. Read the whole sentence before you choose." },
  { key: "1A-C", lvl: "ELL 1", id: "C", title: "My celebration in order", kind: "lines", lines: 2,
    instr: "Write four sentences about YOUR celebration, in order. Start with the time words: First,  ·  Then  ·  After that,  ·  Finally,",
    example: { text: "First,  →", ans: "First, we drove to my aunt's house." },
    items: [{ text: "First,  →", ans: "First, my family went to my grandma's house." },
      { text: "Then  →", ans: "Then we ate dumplings, and my uncle told stories." },
      { text: "After that,  →", ans: "After that, my grandma gave me a red envelope." },
      { text: "Finally,  →", ans: "Finally, we watched the fireworks, so we went home late." }],
    how: "Your own celebration, in the order it happened. Use past verbs. Try to join two events in one sentence with and, but or so." },
  { key: "1A-D", lvl: "ELL 1", id: "D", title: "Check your work", kind: "check",
    instr: "Tick each box when it is true.",
    checks: ["I put the time words in order.", "I chose and, but or so for its meaning.", "My sentences in Part C are in order.",
      "There is a comma after First, After that and Finally.", "Every verb is past.", "Every sentence has a capital and an end mark."],
    how: "Tick a box only when it is true. Check the comma after each time word one more time." },
  { key: "1A-E", lvl: "ELL 1", id: "E", title: "Exit ticket", kind: "exit", lines: 2,
    instr: "Write one sentence. Then hand this sheet in or put it in your duotang.",
    items: [{ text: "Two things from my celebration, joined with and, but or so …", reveal: "We danced for an hour, so my feet were tired." }],
    how: "One sentence with a comma and and, but or so." },
  // ---------------- ELL 2 ----------------
  { key: "2A-A", lvl: "ELL 2", id: "A", title: "Transitions", kind: "cloze",
    instr: "This is one story about a cousin's wedding, in order. Write the right transition from the bank on each line. Cross out each one as you use it.",
    bank: ["Suddenly", "By the end of the night", "That morning", "For a second", "By noon", "That evening"], bankCols: 3, crossed: ["That morning"],
    example: { text: "", ans: "That morning", tail: ", my mother woke me up at six to get ready." },
    items: [{ text: "", ans: "By noon", tail: ", the hall was already full of guests for lunch." },
      { text: "", ans: "That evening", tail: ", we sat down to a big dinner." },
      { text: "", ans: "Suddenly", tail: ", the lights went out, and someone screamed." },
      { text: "", ans: "For a second", tail: ", nobody moved or said anything." },
      { text: "", ans: "By the end of the night", tail: ", the lights were back on and everyone was dancing." }],
    how: "The sentences tell one story in order. Each transition has a job: skip time, speed up, slow down, or end. Find the clue in each sentence — lunch, dinner, the lights going out — and choose the transition that does that job." },
  { key: "2A-B", lvl: "ELL 2", id: "B", title: "Add the comma", kind: "lines", lines: 1,
    instr: "Copy each sentence and add the missing comma after the transition.",
    example: { text: "That evening my father cooked soba.  →", ans: "That evening, my father cooked soba." },
    items: [{ text: "Suddenly the sky exploded with colour.  →", ans: "Suddenly, the sky exploded with colour." },
      { text: "Just before midnight my brother ran to the door.  →", ans: "Just before midnight, my brother ran to the door." },
      { text: "After that we walked home in the rain.  →", ans: "After that, we walked home in the rain." },
      { text: "By the end of the night everyone was tired.  →", ans: "By the end of the night, everyone was tired." },
      { text: "That morning I woke up at seven.  →", ans: "That morning, I woke up at seven." }],
    how: "The comma goes right after the transition, before the rest of the sentence. Copy every word exactly, then add the one comma." },
  { key: "2A-C", lvl: "ELL 2", id: "C", title: "My celebration in order", kind: "open", lines: 10,
    instr: "Write five or six sentences about YOUR celebration, in order. Use at least three transitions, with a comma after each one.",
    example: { ans: "That afternoon, my whole family drove to my uncle's house for Diwali. By the time we arrived, every window was full of small lamps. Suddenly, my cousin lit a firework right beside the car." },
    how: "Choose transitions for their job, not just to fill a space. Underline your three transitions and check the comma after each one." },
  { key: "2A-D", lvl: "ELL 2", id: "D", title: "Check your work", kind: "check",
    instr: "Tick each box when it is true.",
    checks: ["I chose each transition for its job.", "I crossed out each one in the bank.", "I added the comma in every Part B sentence.",
      "I used three transitions in Part C.", "Each transition has a comma after it.", "My Part C sentences are in order and in the past."],
    how: "Tick a box only when it is true. The comma after the transition is the thing to check last." },
  { key: "2A-E", lvl: "ELL 2", id: "E", title: "Exit ticket", kind: "exit", lines: 2,
    instr: "Write one sentence. Then hand this sheet in or put it in your duotang.",
    items: [{ text: "One moment from my celebration, starting with Suddenly, …", reveal: "Suddenly, the music stopped, and everyone turned to look at the door." }],
    how: "One sentence that starts with Suddenly and a comma." } ] },
 texts: {
  t1: { lvl: "ELL 1 · Hana", title: "New Year's Eve", body: T1 },
  t2: { lvl: "ELL 2 · Hana", title: "The Bell at Midnight", body: T2 } }
};
