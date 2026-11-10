// ELL12 U3 L01 — A Night to Remember. ALL content here; the renderer holds the design.
// Built Nov 10 2026 to the spec Sean approved the same day.
// Unit 3 "A Celebration I Remember" (November/December), 7 lessons + unit test, finished before winter break (last day
// Dec 18 2026; the last two classes before the break are kept free). Lever: the NARRATIVE paragraph. Counts toward Term 2.
// ELL 1 writes an EIGHT-sentence narrative (beginning, middle, end; four events with time words; a feeling with because;
// one sentence that shows a feeling through an action; compound sentences with and / but / so). ELL 2 writes a narrative
// paragraph about one small moment (hook, time transitions, feeling shown through action and dialogue, an ending that
// says why it mattered). Dialogue punctuation is ELL 2 only, in Lesson 4.
// Class text: Hana, 14, from Osaka — her family's first New Year's Eve in Richmond. Students' own celebration must be a
// different one, EXCEPT New Year's as it is celebrated in their own country (Lunar New Year, Nowruz…) — Sean, Nov 10.
// Time-zone fact the text relies on: Osaka is 17 hours ahead of Richmond in winter, so Japan's midnight bell is 7 a.m.
// on Dec 31 in Richmond. The temple bell rings 108 times (joya no kane).
// Grammar thread for L1: was / were, both levels. Regular and irregular past are Lesson 2.
// Outcomes: ELL 1 W1 · W8; ELL 2 W1 · W5. No countdown yet: the unit test is seven classes away (starts at L4).
// Unit order: L01 this · L02 What Happened · L03 First, Then, After That · L04 How I Felt · L05 Planning · L06 Drafting
// · L07 Revising, Editing and the Good Copy · unit test
const vocab = [
  ["celebrate", "to do something special on a happy day"],
  ["tradition", "something a family or a country does every year"],
  ["midnight", "twelve o'clock at night"],
  ["countdown", "counting back to zero: ten, nine, eight…"],
  ["fireworks", "bright lights and loud bangs in the night sky"],
  ["wish", "something you hope will happen"],
  ["relatives", "people in your family, like aunts, uncles and cousins"],
  ["decorate", "to make a place beautiful for a special day"]];
const bankWords = ["wish", "fireworks", "relatives", "celebrate", "decorate", "midnight", "tradition", "countdown"];

// ---- The class text, both levels. ----
const T1 = "My name is Hana. I am from Osaka, Japan. Last year was my first New Year's Eve in Canada. At seven o'clock in the morning, my mom opened her laptop. It was already midnight in Japan. We watched the big temple bell on a livestream. My grandma called us from Osaka. I was happy, but I was sad too. In the evening, we ate soba noodles. Long noodles are for a long life. At midnight, we went outside. There were fireworks over the river. My little brother jumped and shouted. My mom smiled. It was a new year in a new home.";
const T2 = "At seven o'clock on the morning of December 31, my mother woke me up and put her laptop on the kitchen table. In Osaka, it was already midnight. On the screen, a monk was pulling a heavy rope, and the old temple bell rang slowly, one hundred and eight times. My grandmother was standing somewhere in that crowd, but I could not see her. I held my cup of tea with both hands and did not say anything. That evening, my father cooked soba, because long noodles mean a long life. We ate quietly while the rain was falling outside. Just before midnight, my little brother pulled on his coat and ran to the door. We followed him down to the river. Suddenly, the sky over Richmond exploded with colour. My brother screamed and grabbed my hand. I laughed for the first time all day. Japan rang in the new year first, but Canada gave me a new one too.";

const CHOICES = "a birthday · Lunar New Year · Halloween · Diwali · Canada Day · Christmas";

module.exports = {
 course: "ELL12",
 meta: { unit: 3, unitTitle: "A Celebration I Remember", lesson: 1, title: "A Night to Remember", subtitle: "Read Hana's story, then remember your own", month: "November" },
 banner: { obj: "Write past-tense sentences about a celebration you remember.",
   std: "ELL 1: W1 simple sentences · W8 tense awareness  •  ELL 2: W1 simple sentences · W5 tenses", lit: ["COM", "TH", "PS"] },
 plan: {
  objective: "Students read Hana's New Year's Eve story, learn eight celebration words, name the parts of a story, and write past-tense sentences with was and were about a celebration they remember.",
  outcomes: "ELL 1: W1 · W8. ELL 2: W1 · W5.",
  schwerpunkt: "true past-tense sentences about a celebration students REALLY remember, in Part D — every line has a past verb, and was / were match the subject.",
  schwerStep: 6,
  materials: "Deck · ELL 1 and ELL 2 Lesson 1 worksheets · duotangs · exercise books for the warm-up",
  timing: "80 minutes",
  steps: [
   ["12", "Warm-up Parts A and B", "In exercise books, five items per level per Part, both levels on one slide. Part A · Vocabulary: ELL 1 celebration words; ELL 2 words from today's text. Part B · Grammar: ELL 1 was or were; ELL 2 was / were and the -ed spelling rules (stopped, cried, danced). All five items of a Part show before any answer; reveal one at a time, alternating levels, cumulative."],
   ["8", "Guess the Celebration", "Warm-up game. Each clue card shows a food, a time and a thing, with the six possible answers along the bottom. Pairs agree on an answer and say it with because: I think it is a birthday because there is cake. Five cards, then the answers slide. English only. It also gets students naming celebrations before they choose their own in Lesson 5."],
   ["2", "Title and goals", "Read the three goals: learn eight celebration words, read Hana's story, write about a celebration you remember."],
   ["10", "Match the word", "Eight celebration words against their meanings from a shuffled bank, revealed one at a time, then the key-vocabulary summary slide, then a partner talk: tell your partner about one celebration you remember. English only on the partner talk."],
   ["12", "The class text: Hana's New Year's Eve", "Read the ELL 1 version in full, then the ELL 2 version in full, then the side-by-side slide. Point out the time fact once: Japan is 17 hours ahead, so Japan's midnight is seven in the morning here. Questions are about the story only today: who, where, when, what happened."],
   ["8", "What makes a story + was and were", "Teaching. The five parts of a story, each shown in Hana's text. Then was and were: I / he / she / it was; we / you / they were. Both levels; ELL 2 also notices the -ing forms in its text (was pulling, was falling), named today and taught in Lesson 2."],
   ["22", "Worksheet Parts", "Hand out both worksheets. Walk each Part with its worked example and reveal answers one at a time, alternating levels Part by Part. ELL 1 finishes Part D with three sentences using the frames; ELL 2 writes four sentences without frames."],
   ["6", "Check and exit ticket", "The tick-box Check Part, then the exit ticket: one celebration I remember, with because. Next class, then agendas."] ],
  diff: "Support: ELL 1 may copy a frame and change only the end; frames stay on screen. Students who do not celebrate anything may write about any special day (a trip, a first day in Canada). Extension: ELL 2 adds a fifth sentence showing a feeling without a feeling word.",
  assess: "NO MARKING CHECKPOINT TODAY. The unit's two formative reads are Lesson 2 Part C (past-tense sentences) and the Lesson 6 draft. Circulate during Part D and note who cannot write was / were correctly without the frame.",
  homework: "None. Anything unfinished in Part D comes back at the start of Lesson 2.",
  watch: "We was / they was. ELL 1 slipping into present tense after Unit 2. Students retelling Hana's story in Part D instead of their own." },
 shape: [["Warm-up: words and grammar", "quick practice"], ["Guess the Celebration", "warm-up game"], ["Match the word", "vocabulary game"],
   ["Tell your partner", "partner speaking"], ["Hana's New Year's Eve", "class reading"],
   ["What makes a story", "mini-lesson"], ["Worksheet Parts", "worksheet"], ["A celebration I remember", "independent writing"], ["Check and exit ticket", "quick write"]],
 sequence: [
  { type: "drill", part: "A", kind: "Vocabulary", lvls: [
    { lvl: "ELL 1", bankLabel: "Celebration words", bank: "noodles · family · midnight · cake · fireworks",
      items: [["At ____, it is twelve o'clock at night.", "midnight"], ["____ are bright lights in the sky.", "Fireworks"],
        ["We eat ____ with chopsticks.", "noodles"], ["My mom, dad and brother are my ____.", "family"], ["On my birthday, I eat ____.", "cake"]] },
    { lvl: "ELL 2", bankLabel: "Words from today's text", bank: "quietly · crowd · exploded · livestream · tradition",
      items: [["Many people in one place is a ____.", "crowd"], ["We watched the concert on a ____.", "livestream"],
        ["Something a family does every year is a ____.", "tradition"], ["The fireworks ____ over the river.", "exploded"],
        ["We ate ____, with no talking.", "quietly"]] } ] },
  { type: "drill", part: "B", kind: "Grammar", lvls: [
    { lvl: "ELL 1", bankLabel: "Was or were", bank: "was · were",
      items: [["I ____ happy.", "was"], ["We ____ at home.", "were"], ["It ____ cold.", "was"],
        ["My parents ____ in the kitchen.", "were"], ["The fireworks ____ beautiful.", "were"]] },
    { lvl: "ELL 2", bankLabel: "Was, were, and -ed", bank: "danced · was · stopped · were · cried",
      items: [["We ____ at the river at midnight.", "were"], ["The music ____, and everyone cheered.", "stopped"],
        ["The night ____ cold but beautiful.", "was"], ["My baby sister ____ when the fireworks started.", "cried"],
        ["We ____ to the music until one o'clock.", "danced"]] } ] },
  { type: "rows", label: "Guess the Celebration", tag: "Warm-up game", head: "Guess the Celebration: how to play", englishOnly: true, rows: [
    ["1", "A clue card goes on the screen: a food, a time and a thing."], ["2", "With a partner, choose the celebration."],
    ["3", "Say it with because."], ["Say", "I think it is ______ because ______."]] },
  { type: "rows", label: "Clue card 1", tag: "Guess the Celebration", head: "Clue card 1", rows: [
    ["Food", "cake"], ["Time", "once a year, on your own day"], ["Thing", "candles"], ["Is it…?", CHOICES]] },
  { type: "rows", label: "Clue card 2", tag: "Guess the Celebration", head: "Clue card 2", rows: [
    ["Food", "dumplings"], ["Time", "January or February"], ["Thing", "red envelopes with money"], ["Is it…?", CHOICES]] },
  { type: "rows", label: "Clue card 3", tag: "Guess the Celebration", head: "Clue card 3", rows: [
    ["Food", "candy"], ["Time", "October 31"], ["Thing", "costumes and pumpkins"], ["Is it…?", CHOICES]] },
  { type: "rows", label: "Clue card 4", tag: "Guess the Celebration", head: "Clue card 4", rows: [
    ["Food", "sweets"], ["Time", "October or November"], ["Thing", "small lamps and lights"], ["Is it…?", CHOICES]] },
  { type: "rows", label: "Clue card 5", tag: "Guess the Celebration", head: "Clue card 5", rows: [
    ["Food", "hot dogs at a picnic"], ["Time", "July 1"], ["Thing", "red and white flags"], ["Is it…?", CHOICES]] },
  { type: "rows", label: "Guess the Celebration: the answers", tag: "Guess the Celebration", head: "The answers", rows: [
    ["1", "a birthday"], ["2", "Lunar New Year"], ["3", "Halloween"], ["4", "Diwali"], ["5", "Canada Day"]] },
  { type: "title", label: "Today's lesson" },
  { type: "goals", label: "Today's goals", items: [
    "Learn eight words about celebrations.", "Read Hana's story about New Year's Eve.", "Write about a celebration you remember."] },
  { type: "match", label: "Match the word", head: "Match the word", bank: bankWords, words: vocab },
  { type: "vocab", label: "Key vocabulary", head: "Key vocabulary", words: vocab },
  { type: "speaking", label: "Tell your partner", head: "Tell your partner", englishOnly: true, signAll: true, icon: "icon-friends.png",
    prompt: "Tell your partner about one celebration you remember. Use four of the new words.",
    frames: ["I remember ______.", "It was in ______.", "My relatives were ______.", "We ate ______ at midnight."] },
  { type: "rows", label: "Hana's New Year's Eve", tag: "Class reading", head: "Hana's New Year's Eve", icon: "icon-read.png", rows: [
    ["Who", "Hana, 14, from Osaka, Japan"],
    ["When", "her first New Year's Eve in Canada"],
    ["Where", "at home in Richmond, then by the river"],
    ["Listen for", "What happened in the morning, the evening, and at midnight?"]] },
  { type: "prose", text: "t1", label: "Hana (ELL 1)" },
  { type: "prose", text: "t2", label: "Hana (ELL 2)" },
  { type: "text2", a: "t1", b: "t2", label: "Hana: side by side", tag: "Class text · Hana · both levels", head: "Hana: ELL 1 and ELL 2" },
  { type: "rows", label: "What makes a story", tag: "Teaching 1 of 2", head: "What makes a story", rows: [
    ["Who", "Hana and her family"], ["Where and when", "Richmond, on New Year's Eve"],
    ["What happened", "the bell in the morning, soba in the evening, fireworks at midnight"],
    ["Feeling", "sad in the morning, happy at midnight"]] },
  { type: "rows", label: "Was and were", tag: "Teaching 2 of 2", head: "Was and were", rows: [
    ["I · he · she · it", "was: It was midnight. My grandma was in Osaka."],
    ["we · you · they", "were: We were at the river. The fireworks were loud."],
    ["Not", "We was ✗   They was ✗"],
    ["ELL 2", "was pulling · was falling: we learn these in Lesson 2"]] },
  { type: "handout", label: "Hand out the worksheet", note: "ELL 1 and ELL 2 worksheets. Name and date first. Keep Hana's story on the screen — you will need it.",
    items: [["A", "celebration words"], ["B", "Hana's story"], ["C", "ELL 1: was or were · ELL 2: find the past verb"], ["D", "a celebration I remember"], ["E", "check your work"], ["F", "exit ticket", true]],
    foot: "Both levels have Parts A to D, then the check and the exit ticket." },
  { type: "walk", part: "1A-A", withExample: true }, { type: "reveals", part: "1A-A" },
  { type: "walk", part: "2A-A", withExample: true }, { type: "reveals", part: "2A-A" },
  { type: "walk", part: "1A-B", withExample: true }, { type: "reveals", part: "1A-B" },
  { type: "walk", part: "2A-B", withExample: true }, { type: "reveals", part: "2A-B" },
  { type: "walk", part: "1A-C", withExample: true }, { type: "reveals", part: "1A-C" },
  { type: "walk", part: "2A-C", withExample: true }, { type: "reveals", part: "2A-C" },
  { type: "walk", part: "1A-D", withExample: true }, { type: "reveals", part: "1A-D", good: true },
  { type: "walk", part: "2A-D", withExample: true }, { type: "reveals", part: "2A-D", good: true },
  { type: "pages", label: "The whole sheet again" },
  { type: "walk", part: "1A-E" }, { type: "walk", part: "2A-E" },
  { type: "exit", part: "1A-F" }, { type: "reveals", part: "1A-F", good: true },
  { type: "exit", part: "2A-F" }, { type: "reveals", part: "2A-F", good: true },
  { type: "nextshape", label: "Next class", head: "Next class: What Happened", items: [
    ["Warm-up: words and grammar", "quick practice"], ["Warm-up game", "game"], ["Yesterday: -ed verbs", "mini-lesson"],
    ["Went, ate, saw: verbs that change", "mini-lesson"], ["Tell your partner what happened", "partner speaking"], ["What happened worksheet", "worksheet"], ["Exit ticket", "quick write"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Next class", "What Happened: talking about the past."],
    ["Homework", "None — unless Part D is unfinished."],
    ["Remember", "Keep this sheet in your duotang. We use Hana's story all unit."],
    ["Coming up", "Unit 3 ends with a unit test before winter break."]] } ],
 sheets: [
  { lvl: "ELL 1", suffix: "1A", label: "ELL 1", objective: "Write past-tense sentences about a celebration you remember.",
    outcomes: "ELL 1  W1 Write simple sentences  •  W8 Show awareness of tense", vocab,
    remember: "Was is for I, he, she and it: It was midnight. Were is for we, you and they: We were at home." },
  { lvl: "ELL 2", suffix: "2A", label: "ELL 2", objective: "Write past-tense sentences about a celebration you remember.",
    outcomes: "ELL 2  W1 Write simple sentences  •  W5 Use tenses correctly", vocab,
    remember: "A story about the past stays in the past: the bell rang, we ate, the sky exploded. Some verbs add -ed; some change: run → ran, hold → held." } ],
 worksheet: { parts: [
  // ---------------- ELL 1 ----------------
  { key: "1A-A", lvl: "ELL 1", id: "A", title: "Celebration words", kind: "cloze",
    instr: "Write the right word from the bank on the line. Cross out each word in the bank as you use it.",
    bank: ["midnight", "wish", "tradition", "decorate", "relatives", "fireworks"], bankCols: 3, crossed: ["tradition"],
    example: { text: "Eating soba on New Year's Eve is a family", ans: "tradition", tail: "." },
    items: [{ text: "At", ans: "midnight", tail: ", it is twelve o'clock at night." },
      { text: "We watched the", ans: "fireworks", tail: "over the river." },
      { text: "My aunts, uncles and cousins are my", ans: "relatives", tail: "." },
      { text: "Before the party, we", ans: "decorate", tail: "the room with lights." },
      { text: "I made a", ans: "wish", tail: "for the new year." }],
    how: "Read the whole sentence first, then choose the word that fits. Cross the word out in the bank so you do not use it twice. One word is already crossed out — that is the example." },
  { key: "1A-B", lvl: "ELL 1", id: "B", title: "Hana's story", kind: "lines", lines: 2,
    instr: "Answer each question in a full sentence. Look at Hana's story.",
    example: { text: "Where is Hana from?  →", ans: "Hana is from Osaka, Japan." },
    items: [{ text: "When was the story?  →", ans: "The story was on New Year's Eve." },
      { text: "What did Hana's family eat in the evening?  →", ans: "Hana's family ate soba noodles." },
      { text: "Where were the fireworks?  →", ans: "The fireworks were over the river." },
      { text: "How did Hana feel in the morning?  →", ans: "Hana was happy, but she was sad too." }],
    how: "Find the answer in Hana's story first. Then write a full sentence: start with the words from the question. Where were the fireworks? → The fireworks were …" },
  { key: "1A-C", lvl: "ELL 1", id: "C", title: "Was or were", kind: "cloze",
    instr: "Write was or were on the line.",
    bank: ["was", "were"], bankCols: 2, crossed: [],
    example: { text: "It", ans: "was", tail: "my first New Year's Eve in Canada." },
    items: [{ text: "My family", ans: "was", tail: "at home in Richmond." },
      { text: "The fireworks", ans: "were", tail: "over the river." },
      { text: "My brother and I", ans: "were", tail: "very excited." },
      { text: "My grandma", ans: "was", tail: "in Osaka." },
      { text: "We", ans: "were", tail: "outside at midnight." }],
    how: "Look at who the sentence is about. One person or one thing → was. Two or more, or we, you, they → were. My brother and I is two people, so it takes were." },
  { key: "1A-D", lvl: "ELL 1", id: "D", title: "A celebration I remember", kind: "lines", lines: 2,  // v2: frames moved into the instruction (no box) so all of Part D fits on page 3
    instr: "Write three sentences about a celebration YOU remember. Use the frames: I remember ___.  ·  It was in ___.  ·  My ___ were there.",
    example: { text: "I remember  →", ans: "I remember my tenth birthday." },
    items: [{ text: "Sentence 1: the celebration  →", ans: "I remember my cousin's wedding." },
      { text: "Sentence 2: when or where  →", ans: "It was in Vancouver last summer." },
      { text: "Sentence 3: who was there  →", ans: "My relatives were there, and we were very happy." }],
    how: "Pick a frame and change the end so it is true for you. Start with a capital and finish with a period. Check every was and were: one person → was, two or more → were." },
  { key: "1A-E", lvl: "ELL 1", id: "E", title: "Check your work", kind: "check",
    instr: "Tick each box when it is true.",
    checks: ["I used the new celebration words.", "I crossed out each word in the bank.", "My answers in Part B are full sentences.",
      "I used was for one, were for two or more.", "I wrote three sentences about MY celebration.", "Every sentence has a capital and an end mark."],
    how: "Tick a box only when it is true. If you cannot tick one yet, go back and fix that thing now." },
  { key: "1A-F", lvl: "ELL 1", id: "F", title: "Exit ticket", kind: "exit", lines: 2,
    instr: "Write one sentence. Then hand this sheet in or put it in your duotang.",
    items: [{ text: "One celebration I remember is … because …", reveal: "One celebration I remember is my little sister's birthday because we were at the beach." }],
    how: "One sentence with because. Say the celebration, then why you remember it." },
  // ---------------- ELL 2 ----------------
  { key: "2A-A", lvl: "ELL 2", id: "A", title: "Words from the story", kind: "cloze",
    instr: "Write the right word from the bank on the line. Cross out each word in the bank as you use it.",
    bank: ["tradition", "livestream", "relatives", "crowd", "exploded", "quietly"], bankCols: 3, crossed: ["livestream"],
    example: { text: "Hana's family watched the temple bell on a", ans: "livestream", tail: "from Japan." },
    items: [{ text: "Hana's grandmother was somewhere in the", ans: "crowd", tail: "at the temple." },
      { text: "Eating soba on New Year's Eve is a family", ans: "tradition", tail: "." },
      { text: "The family ate", ans: "quietly", tail: "while the rain was falling." },
      { text: "Suddenly, the sky over Richmond", ans: "exploded", tail: "with colour." },
      { text: "Hana's aunts and cousins in Osaka are her", ans: "relatives", tail: "." }],
    how: "Read the whole sentence before you choose — two words can fit the start of a sentence but only one fits the end. Every sentence comes from Hana's story, so you can check it there." },
  { key: "2A-B", lvl: "ELL 2", id: "B", title: "Hana's story map", kind: "lines", lines: 2,
    instr: "Answer each question in a full sentence. Use details from the story.",
    example: { text: "Who is the story about?  →", ans: "The story is about Hana, a girl from Osaka." },
    items: [{ text: "Where and when does the story happen?  →", ans: "It happens in Richmond on New Year's Eve." },
      { text: "What happened in the morning?  →", ans: "In the morning, they watched the temple bell on a livestream." },
      { text: "What happened in the evening?  →", ans: "In the evening, they ate soba quietly." },
      { text: "What happened at midnight?  →", ans: "At midnight, they watched fireworks by the river." },
      { text: "How did Hana feel in the morning, and how do you know?  →", ans: "She felt sad, because she held her tea and said nothing." }],
    how: "Questions 2 to 4 are the middle of the story, in order. The last question is the hard one: the story never says sad. Find what Hana DID, and say what it shows." },
  { key: "2A-C", lvl: "ELL 2", id: "C", title: "Find the past verb", kind: "lines", lines: 1,
    instr: "Each sentence is from the story. Write its past verb, then the plain verb it comes from.",
    example: { text: "My mother woke me up.  →", ans: "woke — wake" },
    items: [{ text: "The old temple bell rang slowly.  →", ans: "rang — ring" },
      { text: "I held my cup of tea with both hands.  →", ans: "held — hold" },
      { text: "My father cooked soba.  →", ans: "cooked — cook" },
      { text: "My little brother ran to the door.  →", ans: "ran — run" },
      { text: "I laughed for the first time all day.  →", ans: "laughed — laugh" }],
    how: "Some past verbs end in -ed, like cooked. Others change, like ran. Write the past verb first, then a dash, then the plain verb you would find in a dictionary." },
  { key: "2A-D", lvl: "ELL 2", id: "D", title: "A celebration I remember", kind: "open", lines: 8,
    instr: "Write four sentences about a celebration YOU remember. No frames. Use the past tense. Say who was there, where and when it was, and one thing that happened.",
    example: { ans: "Two summers ago, my whole family went to my cousin's wedding in Lahore. The hall was full of lights, and my aunts were dancing in a circle." },
    how: "Write a run of sentences, not a list. Every verb is past: was, were, went, ate, danced. Your own celebration only — not Hana's." },
  { key: "2A-E", lvl: "ELL 2", id: "E", title: "Check your work", kind: "check",
    instr: "Tick each box when it is true.",
    checks: ["I used the new words and crossed them out.", "My story-map answers are full sentences.", "My last answer says how I know.",
      "I wrote the past verb AND the plain verb.", "Every verb in Part D is past tense.", "Part D is about MY celebration."],
    how: "Tick a box only when it is true. Read Part D once looking only at the verbs — is every one of them past?" },
  { key: "2A-F", lvl: "ELL 2", id: "F", title: "Exit ticket", kind: "exit", lines: 2,
    instr: "Write one sentence. Then hand this sheet in or put it in your duotang.",
    items: [{ text: "One celebration I remember is … because …", reveal: "One celebration I remember is my grandfather's seventieth birthday because the whole family was together for the first time in years." }],
    how: "One sentence, past tense, with because. Choose a celebration you could write a whole paragraph about." } ] },
 texts: {
  t1: { lvl: "ELL 1 · Hana", title: "New Year's Eve", body: T1 },
  t2: { lvl: "ELL 2 · Hana", title: "The Bell at Midnight", body: T2 } }
};
