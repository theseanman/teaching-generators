// ELL12 U3 L05 — Planning. ALL content here; the renderer holds the design.
// Built Nov 10 2026 to the spec Sean approved the same day.
// Students choose their celebration and plan it. Rule (Sean, Nov 10): any celebration EXCEPT New Year's in Canada (Hana's);
// New Year's as their own country celebrates it is allowed. ELL 2 narrows it to ONE small moment.
// The model is a celebration students will not copy — "My Grandfather's Eightieth Birthday" — in full at both levels,
// the same move as U2 L4's "Lunch should be longer".
// ELL 1 plans the EIGHT-sentence narrative (beginning · four events with time words · feeling with because · an action
// that shows a feeling · ending). ELL 2 plans one moment (hook · events with transitions · shown feeling · one line of
// dialogue · an ending that shows why it mattered). Plans stay in the duotang for Lesson 6; not collected or marked.
// Countdown: "Unit test in three classes".
// Outcomes: ELL 1 W4 · W3; ELL 2 W3 · W4.
const vocab = [
  ["hook", "the first sentence that makes the reader want more"], ["event", "one thing that happens in a story"],
  ["moment", "a short time, only a few minutes"], ["detail", "a small fact that helps the reader see"],
  ["ending", "the last part of a story"], ["plan", "notes you write before the story"],
  ["title", "the name of a story"], ["dialogue", "the words people say in a story"]];
const bankWords = ["detail", "title", "hook", "ending", "dialogue", "event", "plan", "moment"];

// ---- The model, both levels. Not a celebration students will copy. ----
const M1 = "Last summer, my family went to my grandfather's eightieth birthday in Surrey. First, we decorated his backyard with lights and flags. Then my aunts made a huge dinner, and we ate outside. After that, my cousins played music, so everyone danced. Finally, my grandfather blew out eighty candles. I was happy because the whole family was together. My grandfather laughed and hugged me. It was the best night of the summer.";
const M2 = "The candles were already burning when my aunt carried the cake out to the backyard. Eighty small flames shook in the wind, and everyone started to sing. Halfway through the song, my grandfather stopped smiling. He put his hand on the table and looked at the empty chair beside him, where my grandmother used to sit. For a second, nobody knew what to do. Then my little cousin climbed into the chair and said, “I'll sit here, Grandpa.” He laughed so hard that he had to wipe his eyes. He blew out all eighty candles in one breath, and that night I understood why he never misses a family birthday.";

module.exports = {
 course: "ELL12",
 countdown: "Unit test in three classes",
 meta: { unit: 3, unitTitle: "A Celebration I Remember", lesson: 5, title: "Planning", subtitle: "Choose it, then map it", month: "November" },
 banner: { obj: "Choose your celebration and plan your story, part by part.",
   std: "ELL 1: W4 a basic paragraph · W3 sentences with because  •  ELL 2: W3 beginning, middle and end · W4 transition words", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students choose their celebration (not New Year's in Canada), read a model story at their level, name its parts, and write a plan, part by part, that they keep for Lesson 6.",
  outcomes: "ELL 1: W4 · W3. ELL 2: W3 · W4.",
  schwerpunkt: "a COMPLETE plan in Parts B and C — every box filled with a sentence, not a single word — so Lesson 6 is writing, not thinking.",
  schwerStep: 6,
  materials: "Deck · ELL 1 and ELL 2 Lesson 5 planning sheets · duotangs (the plan stays in them for Lesson 6) · exercise books for the warm-up",
  timing: "80 minutes",
  steps: [
   ["12", "Warm-up Parts A and B", "In exercise books, five items per level per Part, both levels on one slide. Part A · Vocabulary: feeling words. Part B · Grammar: ELL 1 because and past verbs; ELL 2 the end mark inside the quotation marks. Reveal one at a time, alternating levels."],
   ["8", "Hot Seat", "Warm-up game. One partner names a celebration they remember. The other asks who, where, when and what happened, as fast as they can; the answerer has 20 seconds per question. Swap. English only. It gets each story out loud before anyone plans it."],
   ["2", "Title and goals", "Read the three goals: choose your celebration, see a model, make your plan."],
   ["10", "Match the word", "Eight story words against their meanings from a shuffled bank, revealed one at a time, then the summary slide."],
   ["10", "The model: My Grandfather's Eightieth Birthday", "Read the ELL 1 model in full, then the ELL 2 model in full, then the side by side. Why this one: so students see how a story is built — and nobody copies it."],
   ["6", "Choose your celebration", "Teaching. The rule: any celebration EXCEPT New Year's in Canada. New Year's as your own country celebrates it is fine. ELL 2: one moment, a few minutes in one place. Then the two plan maps."],
   ["22", "Worksheet: name the parts, then plan", "Part A: name the parts of the model, one at a time, alternating levels. Parts B and C: the plan, every box a sentence. Circulate: a box with one word is not finished."],
   ["10", "Plan it with a partner, then exit ticket", "Partners tell each other their plan; the listener asks one question about a gap. Then the check, the exit ticket (your title), next class, and agendas."] ],
  diff: "Support: ELL 1 may copy the shape of each model sentence and change the words. Students who cannot choose a celebration may write about any special day — a trip, a family dinner, a first day in Canada. Extension: ELL 2 write two possible hooks and choose the stronger one.",
  assess: "No marking checkpoint today. The plan is not collected — it stays in the duotang for Lesson 6. Formative read 2 is the Lesson 6 draft.",
  homework: "Finish the plan if it is not complete — every box needs a sentence before Lesson 6.",
  watch: "Students choosing Hana's New Year's Eve, or retelling the grandfather model. ELL 2 choosing a whole day instead of one moment. Boxes with single words or notes instead of sentences." },
 shape: [["Warm-up: words and grammar", "quick practice"], ["Hot Seat", "warm-up game"], ["Match the word", "vocabulary game"],
   ["The model story", "class reading"], ["Choose your celebration", "mini-lesson"], ["Name the parts", "worksheet"],
   ["My plan", "planning"], ["Plan it with a partner", "partner speaking"], ["Check and exit ticket", "quick write"]],
 sequence: [
  { type: "drill", part: "A", kind: "Vocabulary", lvls: [
    { lvl: "ELL 1", bankLabel: "Feeling words", bank: "relieved · lonely · excited · nervous · proud",
      items: [["I had a big test, so I was ____.", "nervous"], ["I won the race, and I was ____.", "proud"], ["My trip is tomorrow! I am ____.", "excited"],
        ["Everyone left, and I was ____.", "lonely"], ["The test was easy, so I was ____.", "relieved"]] },
    { lvl: "ELL 2", bankLabel: "Feeling words", bank: "lonely · surprised · grateful · relieved · embarrassed",
      items: [["Thankful for something someone did: ____", "grateful"], ["Feeling silly in front of other people: ____", "embarrassed"],
        ["Feeling something you did not expect: ____", "surprised"], ["Happy because a worry is over: ____", "relieved"],
        ["Sad because you are alone: ____", "lonely"]] } ] },
  { type: "drill", part: "B", kind: "Grammar", lvls: [
    { lvl: "ELL 1", bankLabel: "Because and past verbs", bank: "were · smiled · because · went · was",
      items: [["I was happy ____ my cousins came.", "because"], ["We ____ to the beach.", "went"], ["My grandpa ____ all night.", "smiled"],
        ["The cake ____ big.", "was"], ["My cousins ____ there.", "were"]] },
    { lvl: "ELL 2", bankLabel: "Inside the quotation marks", bank: ",  ·  ?  ·  !",
      items: [["“Can I have some cake__” my cousin asked.", "?"], ["“Watch out__” my uncle yelled.", "!"], ["“I'm tired__” my sister said.", ","],
        ["“Where is Grandpa__” I asked.", "?"], ["“Look at the candles__” she shouted.", "!"]] } ] },
  { type: "rows", label: "Hot Seat", tag: "Warm-up game", head: "Hot Seat: how to play", englishOnly: true, rows: [
    ["1", "Partner A names a celebration they remember."], ["2", "Partner B asks the questions on the next slide, fast."],
    ["3", "Partner A has 20 seconds for each answer."], ["4", "Swap."]] },
  { type: "speaking", label: "Hot Seat: the questions", head: "Hot Seat: the questions", englishOnly: true, signAll: true, icon: "icon-friends.png",
    prompt: "Answer in full sentences, in the past: It was in … / My … was there. / First, we …",
    frames: ["Who was there?", "Where was it?", "When was it?", "What happened first? What happened next?"] },
  { type: "title", label: "Today's lesson" },
  { type: "goals", label: "Today's goals", items: [
    "Choose your celebration.", "Read a model story and name its parts.", "Write your plan, part by part."] },
  { type: "match", label: "Match the word", head: "Match the word", bank: bankWords, words: vocab },
  { type: "vocab", label: "Key vocabulary", head: "Story words", words: vocab },
  { type: "rows", label: "Today's model", tag: "Class reading", head: "Today's model story", icon: "icon-read.png", rows: [
    ["The story", "My Grandfather's Eightieth Birthday"], ["Why this one?", "So you see how a story is built — and nobody copies it."],
    ["ELL 1", "eight sentences: beginning, four events, a feeling, an action, an ending"], ["ELL 2", "one moment: the candles"]] },
  { type: "prose", text: "m1", label: "Model (ELL 1)" },
  { type: "prose", text: "m2", label: "Model (ELL 2)" },
  { type: "text2", a: "m1", b: "m2", label: "Model: side by side", tag: "Model · both levels", head: "The model: ELL 1 and ELL 2" },
  { type: "rows", label: "Choose your celebration", tag: "Teaching 1 of 3", head: "Choose your celebration", rows: [
    ["Yes", "Any celebration you really remember: a birthday, a wedding, Eid, Diwali, Lunar New Year …"],
    ["No", "New Year's in Canada — that is Hana's story."], ["New Year's?", "Yes, if you tell how YOUR country celebrates it."],
    ["ELL 2", "Choose ONE moment: a few minutes, in one place."]] },
  { type: "rows", label: "ELL 1: the eight-sentence plan", tag: "Teaching 2 of 3", head: "ELL 1: the eight-sentence plan", rows: [
    ["1", "Beginning: when, where, who."], ["2–5", "Four events: First, · Then · After that, · Finally,"],
    ["6–7", "A feeling with because, then an action that shows a feeling."], ["8", "An ending."]] },
  { type: "rows", label: "ELL 2: the moment plan", tag: "Teaching 3 of 3", head: "ELL 2: the moment plan", rows: [
    ["Hook", "Start inside the moment: The candles were already burning …"], ["Events", "Three or four, with transitions."],
    ["Show", "One feeling, shown with no feeling word, and one line of dialogue."], ["Ending", "Why the moment mattered."]] },
  { type: "handout", label: "Hand out the planning sheet", note: "ELL 1 and ELL 2 planning sheets. Name and date first. This sheet stays in your duotang for Lesson 6.",
    items: [["A", "name the parts of the model"], ["B", "my plan: the start"], ["C", "my plan: the feeling and the end"], ["D", "check your plan"], ["E", "exit ticket: my title", true]],
    foot: "Both levels have Parts A, B and C, then the check and the exit ticket." },
  { type: "walk", part: "1A-A", withExample: true }, { type: "reveals", part: "1A-A" },
  { type: "walk", part: "2A-A", withExample: true }, { type: "reveals", part: "2A-A" },
  { type: "walk", part: "1A-B", withExample: true }, { type: "reveals", part: "1A-B", good: true },
  { type: "walk", part: "2A-B", withExample: true }, { type: "reveals", part: "2A-B", good: true },
  { type: "walk", part: "1A-C", withExample: true }, { type: "reveals", part: "1A-C", good: true },
  { type: "walk", part: "2A-C", withExample: true }, { type: "reveals", part: "2A-C", good: true },
  { type: "speaking", label: "Plan it with a partner", head: "Plan it with a partner", englishOnly: true, signAll: true, icon: "icon-friends.png",
    prompt: "Tell your partner your plan, box by box. The listener asks ONE question about something that is missing.",
    frames: ["My celebration is ______.", "First, ______. Then ______.", "What did you see / hear / eat?", "How did you feel when ______?"] },
  { type: "pages", label: "The whole sheet again" },
  { type: "walk", part: "1A-D" }, { type: "walk", part: "2A-D" },
  { type: "exit", part: "1A-E" }, { type: "reveals", part: "1A-E", good: true },
  { type: "exit", part: "2A-E" }, { type: "reveals", part: "2A-E", good: true },
  { type: "nextshape", label: "Next class", head: "Next class: Drafting", noCountdown: true, items: [
    ["Unit test in two classes", "countdown"], ["Warm-up: words and grammar", "quick practice"], ["Warm-up game", "game"],
    ["From plan to paragraph", "mini-lesson"], ["Write your draft", "independent writing"], ["Mr. Reid reads your draft", "formative read"], ["Exit ticket", "quick write"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Countdown", "Unit test in three classes."],
    ["Homework", "Finish your plan: every box needs a sentence."],
    ["Bring", "Your plan, in your duotang, next class."],
    ["Next class", "Drafting: you write your story."]] } ],
 sheets: [
  { lvl: "ELL 1", suffix: "1A", label: "ELL 1", objective: "Choose your celebration and plan your eight-sentence story.",
    outcomes: "ELL 1  W4 Write a basic paragraph  •  W3 Write sentences with because", vocab,
    remember: "Eight sentences: a beginning, four events with time words, a feeling with because, an action that shows a feeling, and an ending." },
  { lvl: "ELL 2", suffix: "2A", label: "ELL 2", objective: "Choose your celebration and plan one moment, part by part.",
    outcomes: "ELL 2  W3 Write a composition with a beginning, middle and end  •  W4 Use transition words", vocab,
    remember: "One moment: a hook, three or four events with transitions, a feeling shown with no feeling word, one line of dialogue, and an ending that shows why it mattered." } ],
 worksheet: { parts: [
  // ---------------- ELL 1 ----------------
  { key: "1A-A", lvl: "ELL 1", id: "A", title: "Name the parts", kind: "cloze",
    instr: "Each sentence is from the model story. Write its part from the bank on the line. Cross out each part as you use it.",
    bank: ["Action", "Ending", "Beginning", "Feeling", "Event"], bankCols: 3, crossed: ["Beginning"],
    example: { text: "", ans: "Beginning", tail: "  Last summer, my family went to my grandfather's eightieth birthday in Surrey." },
    items: [{ text: "", ans: "Event", tail: "  Then my aunts made a huge dinner, and we ate outside." },
      { text: "", ans: "Feeling", tail: "  I was happy because the whole family was together." },
      { text: "", ans: "Action", tail: "  My grandfather laughed and hugged me." },
      { text: "", ans: "Ending", tail: "  It was the best night of the summer." }],
    how: "Beginning says when, where and who. An event is one thing that happened. Feeling uses because. Action shows a feeling with no feeling word. Ending finishes the story." },
  { key: "1A-B", lvl: "ELL 1", id: "B", title: "My plan: the beginning and the events", kind: "lines", lines: 2,
    instr: "Plan sentences 1 to 5 of YOUR story. Write each one as a sentence, not one word. Not New Year's in Canada.",
    example: { text: "My celebration  →", ans: "My cousin's wedding in Vancouver last summer." },
    items: [{ text: "1  Beginning: when, where, who  →", ans: "Last summer, my family went to my cousin's wedding in Vancouver." },
      { text: "2  First,  →", ans: "First, we put on new clothes and took photos." },
      { text: "3  Then  →", ans: "Then we watched my cousin walk into the hall." },
      { text: "4  After that,  →", ans: "After that, we ate a big dinner, and my uncle gave a speech." },
      { text: "5  Finally,  →", ans: "Finally, everyone danced until midnight." }],
    how: "Use the model as a shape, but write about YOUR celebration. Every line needs a past verb. You will copy these into your draft next class, so make them sentences now." },
  { key: "1A-C", lvl: "ELL 1", id: "C", title: "My plan: the feeling and the ending", kind: "lines", lines: 2,
    instr: "Plan sentences 6, 7 and 8 of YOUR story.",
    example: { text: "A feeling with because  →", ans: "I was proud because I sang in front of everyone." },
    items: [{ text: "6  A feeling with because  →", ans: "I was excited because it was my first wedding." },
      { text: "7  An action that shows a feeling  →", ans: "My little sister fell asleep on two chairs." },
      { text: "8  Ending  →", ans: "It was a night I will always remember." }],
    how: "Sentence 6 has because + who + verb. Sentence 7 has NO feeling word — show it. Sentence 8 finishes the story." },
  { key: "1A-D", lvl: "ELL 1", id: "D", title: "Check your plan", kind: "check",
    instr: "Tick each box when it is true.",
    checks: ["My celebration is not New Year's in Canada.", "I named the five parts in Part A.", "All eight boxes have a sentence.",
      "Sentences 2 to 5 start with time words.", "Sentence 6 has because.", "Sentence 7 has no feeling word."],
    how: "Tick a box only when it is true. Any empty box is homework." },
  { key: "1A-E", lvl: "ELL 1", id: "E", title: "Exit ticket", kind: "exit", lines: 2,
    instr: "Write your story's title. Then put this sheet in your duotang.",
    items: [{ text: "The title of my story is …", reveal: "The title of my story is My Cousin's Wedding." }],
    how: "A short title. Capital letters on the important words." },
  // ---------------- ELL 2 ----------------
  { key: "2A-A", lvl: "ELL 2", id: "A", title: "Name the parts", kind: "cloze",
    instr: "Each sentence is from the model story. Write its part from the bank on the line. Cross out each part as you use it.",
    bank: ["Dialogue", "Ending", "Hook", "Shown feeling", "Transition"], bankCols: 3, crossed: ["Hook"],
    example: { text: "", ans: "Hook", tail: "  The candles were already burning when my aunt carried the cake out to the backyard." },
    items: [{ text: "", ans: "Shown feeling", tail: "  He put his hand on the table and looked at the empty chair beside him." },
      { text: "", ans: "Transition", tail: "  For a second, nobody knew what to do." },
      { text: "", ans: "Dialogue", tail: "  Then my little cousin climbed into the chair and said, “I'll sit here, Grandpa.”" },
      { text: "", ans: "Ending", tail: "  … that night I understood why he never misses a family birthday." }],
    how: "The hook starts inside the moment. A transition sentence moves time or pace. A shown feeling has no feeling word. Dialogue has quotation marks. The ending shows why the moment mattered." },
  { key: "2A-B", lvl: "ELL 2", id: "B", title: "My moment plan: the hook and the events", kind: "lines", lines: 2,
    instr: "Plan the start of YOUR moment. Write each box as a sentence. Not New Year's in Canada.",
    example: { text: "My celebration and my ONE moment  →", ans: "My cousin's wedding — the moment the lights went out during the first dance." },
    items: [{ text: "Hook: start inside the moment  →", ans: "The music had just started when every light in the hall went out." },
      { text: "Event 1, with a transition  →", ans: "For a second, nobody moved, and then someone screamed." },
      { text: "Event 2, with a transition  →", ans: "Suddenly, a hundred phone lights came on at once." },
      { text: "Event 3, with a transition  →", ans: "By the time the power came back, my cousin was dancing in a circle of lights." }],
    how: "One moment only. Use the model as a shape, not as words to copy. Every box is a sentence you can put straight into your draft next class." },
  { key: "2A-C", lvl: "ELL 2", id: "C", title: "My moment plan: show it and end it", kind: "lines", lines: 2,
    instr: "Plan the feeling, the dialogue and the ending of YOUR moment.",
    example: { text: "The feeling, shown  →", ans: "My grandfather looked at the empty chair beside him." },
    items: [{ text: "The feeling, shown (no feeling word)  →", ans: "My aunt pressed her hands over her mouth and shook her head." },
      { text: "One line of dialogue  →", ans: "“This is better than the real lights,” my cousin laughed." },
      { text: "Ending: why it mattered  →", ans: "That was the night I learned that the best moments are usually the ones nobody planned." }],
    how: "No feeling word in the first box. Punctuate the dialogue: quotation marks, the comma inside, then said or laughed. The ending says why the moment mattered, not what happened next." },
  { key: "2A-D", lvl: "ELL 2", id: "D", title: "Check your plan", kind: "check",
    instr: "Tick each box when it is true.",
    checks: ["My celebration is not New Year's in Canada.", "My plan is ONE moment.", "My hook starts inside the moment.",
      "Each event has a transition.", "My shown feeling has no feeling word.", "My dialogue is punctuated."],
    how: "Tick a box only when it is true. If your plan covers a whole day, cut it down to one moment now." },
  { key: "2A-E", lvl: "ELL 2", id: "E", title: "Exit ticket", kind: "exit", lines: 2,
    instr: "Write your story's title. Then put this sheet in your duotang.",
    items: [{ text: "The title of my story is …", reveal: "The title of my story is When the Lights Went Out." }],
    how: "A title that hints at your moment without giving away the ending." } ] },
 texts: {
  m1: { lvl: "ELL 1 · Model", title: "My Grandfather's Eightieth Birthday", body: M1 },
  m2: { lvl: "ELL 2 · Model", title: "Eighty Candles", body: M2 } }
};
