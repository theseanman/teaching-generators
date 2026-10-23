// ELL3 U2 "Saying It Sideways" — practice test and unit test, as data. ONE source for the printed papers (make_test.js),
// the answer key, and the marking decks (L06 practice, L07 unit test).
// Decisions (Sean, Oct 23 2026): same shape as the U1 v2 tests — Part A language (peer-marked), Part B reading and writing,
// rubric printed on the back. Practice /40 (A 14 · B 26), unit /60 (A 24 · B 36). Unit test reads "The Radio in the Garage"
// (July set); the practice test reads a new passage, "The Bus Pass". Section F prompts: practice = a moment you were proud;
// unit = a moment you felt relieved, or a moment you were surprised. Section F is marked on the L05 good-copy rubric,
// one level per criterion worth 1–4 points (/16).
// Item fields: q (as printed; "___" marks a blank), a (answer), m (marks, default 1), note (marking note shown with the answer).
// Build: node make_test.js lessons/ELL3_U02_testdata.js practice|unit|key <out> v1
const L5 = require("./ELL3_U02_L05.js");
const RADIO = require("../../ELL3_U02_generators/unitdocs.js").TEST_LETTER;
const BAND = (fm, m, mm, nym) => [["Fully Meeting", fm], ["Meeting", m], ["Minimally Meeting", mm], ["Not Yet Meeting", nym]];
const FACT = "+1 a specific fact a reader can picture · +1 no new comparison";
const CEE = "+1 claim · +1 evidence (paragraph number and words) · +1 explanation";
const NAMEBANK = ["LITERAL", "SIMILE", "METAPHOR"];
const BUSPASS = {
 title: "The Bus Pass",
 paras: [
  "My brother Tomas is nine, and on Monday he took the 403 bus to school by himself for the first time.",
  "My mother had practised with him all weekend. They rode to the school and back twice on Saturday and once on Sunday, and each time she made him press the yellow strip for the stop.",
  "On Monday morning she stood at the kitchen window with her coffee and did not drink it.",
  "Tomas had his bus pass on a red string around his neck. He touched it every few seconds, the way you check a pocket for keys.",
  "The bus came around the corner like a big animal that had been called by name.",
  "He did not look back at us. He climbed the steps, showed the driver his pass, and sat down by a window on the far side, so we could only see the top of his hat.",
  "My mother put her coffee down on the counter. Her hand was not steady.",
  "“He’ll be fine,” I said.",
  "“I know,” she said. She kept watching the corner after the bus had gone, as if it might come back and tell her something.",
  "At 3:40 the phone rang. It was Tomas, from the school office, asking if he could take the bus home with his friend Leo instead.",
  "My mother said yes. Then she laughed, and then she sat down at the kitchen table with her coat still on."] };

const practice = {
 "ELL3": { lvl: "ELL 3", partA: 14, partB: 26, total: 40, sections: [
  { sec: "A", title: "Vocabulary", outOf: 5, band: null, groups: [{ kind: "blank", bank: ["cliché", "literal", "comparison", "motif", "figurative", "simile", "metaphor"],
    instr: "Write the right word from the box on the line. Each word is used once. One word is extra.", ex: { q: "Showing how one thing is like another is a ___.", a: "comparison" }, items: [
    { q: "A comparison that uses like or as is a ___.", a: "simile" },
    { q: "A comparison that says one thing is another is a ___.", a: "metaphor" },
    { q: "A phrase used so often it has lost its force is a ___.", a: "cliché" },
    { q: "Words that mean exactly what they say are ___.", a: "literal" },
    { q: "An image that comes back again and again in a story is a ___.", a: "motif" }] }] },
  { sec: "B", title: "Name it", outOf: 5, band: null, groups: [{ kind: "blank", bank: NAMEBANK,
    instr: "Write LITERAL, SIMILE or METAPHOR on the line.", ex: { q: "___  My heart was a drum.", a: "METAPHOR" }, items: [
    { q: "___  My hands were as cold as glass.", a: "SIMILE" },
    { q: "___  I waited outside the gym for ten minutes.", a: "LITERAL" },
    { q: "___  The hallway was a tunnel with no end.", a: "METAPHOR" },
    { q: "___  Her laugh went off like a car alarm.", a: "SIMILE" },
    { q: "___  I put my hand up and answered.", a: "LITERAL" }] }] },
  { sec: "C", title: "Fix the cliché", outOf: 4, band: null, groups: [{ kind: "rewrite", lines: 2,
    instr: "Replace each cliché with a specific fact: what you did, or what your body did. Do not use a new comparison. (2 marks each)",
    ex: { q: "I was on cloud nine.", a: "I ran the whole way home and forgot my bus pass on the bench." }, items: [
    { q: "I was walking on air.", a: "I said hello to the bus driver, which I never do.", m: 2, note: FACT },
    { q: "I was shaking like a leaf.", a: "I had to hold my test with both hands.", m: 2, note: FACT }] }] },
  { sec: "D", title: "Four fixes", outOf: 4, band: null, partB: true, partBHead: "Reading and writing", partBOut: 26,
    para: "After the bus left my mother sat down. She drinks her coffee slowly. The kitchen was quiet I could hear the clock. Because nobody was talking.",
    fixed: "After the bus [left, my] mother sat down. She [drank] her coffee slowly. The kitchen was [quiet. I] could hear the [clock because] nobody was talking.",
    paraNote: "Four mistakes: commas, past tense, a run-on and a fragment.",
    groups: [{ kind: "edit", title: "The four fixes", fix: true, lines: 4, instr: "This paragraph has FOUR mistakes. Write it again with all four fixed.", items: [
    { q: "left my mother", a: "left, my mother", note: "comma after the opening clause" },
    { q: "She drinks", a: "She drank", note: "past tense" },
    { q: "quiet I could", a: "quiet. I could", note: "run-on: a period, or a comma and so" },
    { q: "clock. Because nobody", a: "clock because nobody", note: "fragment joined to the sentence before" }] }] },
  { sec: "E", title: "The Bus Pass", outOf: 6, band: null, partB: true,
    text: { title: BUSPASS.title, paras: BUSPASS.paras, instr: "Read the story twice. Then answer. Give a paragraph number in every answer." },
    groups: [{ kind: "rewrite", lines: 3,
    instr: "Answer in complete sentences: your answer, the paragraph number with the words, and why. (3 marks each)",
    ex: { q: "In paragraph 3, the mother does not drink her coffee. What does that show?", a: "It shows she is worried. In paragraph 3, she holds the coffee and does not drink it, because she is watching for Tomas." }, items: [
    { q: "In paragraph 4, Tomas touches his pass “the way you check a pocket for keys.” What does this comparison show about him?", a: "It shows Tomas is nervous. In paragraph 4, he touches the pass every few seconds, the way you check for keys, because he is afraid of losing it.", m: 3, note: CEE },
    { q: "In paragraph 7, the writer says “Her hand was not steady.” Why does the writer not just say the mother is worried?", a: "The writer shows the worry instead of explaining it. In paragraph 7, her hand is not steady, so the reader understands the feeling without being told.", m: 3, note: CEE }] }] } ] } };

const unit = {
 "ELL3": { lvl: "ELL 3", partA: 24, partB: 36, total: 60, sections: [
  { sec: "A", title: "Vocabulary", outOf: 8, band: null, groups: [{ kind: "blank", bank: ["motif", "earn", "comparison", "literal", "decoration", "metaphor", "cliché", "simile", "mixed", "figurative"],
    instr: "Write the right word from the box on the line. Each word is used once. One word is extra.", ex: { q: "Showing how one thing is like another is a ___.", a: "comparison" }, items: [
    { q: "Words that mean exactly what they say are ___.", a: "literal" },
    { q: "A comparison that uses like or as is a ___.", a: "simile" },
    { q: "A phrase used so often it has lost its force is a ___.", a: "cliché" },
    { q: "A comparison that says one thing is another is a ___.", a: "metaphor" },
    { q: "An image that comes back again and again in a story is a ___.", a: "motif" },
    { q: "Words that say one thing to mean something else are ___.", a: "figurative" },
    { q: "Two comparisons that do not fit together are ___.", a: "mixed" },
    { q: "A good comparison must ___ its place by doing a job.", a: "earn" }] }] },
  { sec: "B", title: "Name it", outOf: 8, band: null, groups: [{ kind: "blank", bank: NAMEBANK,
    instr: "Write LITERAL, SIMILE or METAPHOR on the line.", ex: { q: "___  My stomach was a bag of rocks.", a: "METAPHOR" }, items: [
    { q: "___  My voice shook like a cup on a train table.", a: "SIMILE" },
    { q: "___  I opened the letter and read it twice.", a: "LITERAL" },
    { q: "___  The waiting room was a fridge.", a: "METAPHOR" },
    { q: "___  My cheeks were as hot as a pan of rice.", a: "SIMILE" },
    { q: "___  My friend was a wall between me and the crowd.", a: "METAPHOR" },
    { q: "___  I sat down and put my bag under the chair.", a: "LITERAL" },
    { q: "___  The relief went through me like warm water.", a: "SIMILE" },
    { q: "___  My worry was a shadow that stayed after dark.", a: "METAPHOR" }] }] },
  { sec: "C", title: "Fix the cliché", outOf: 8, band: null, groups: [{ kind: "rewrite", lines: 2,
    instr: "Replace each cliché with a specific fact: what you did, or what your body did. Do not use a new comparison. (2 marks each)",
    ex: { q: "I was on cloud nine.", a: "I ran the whole way home and forgot my bus pass on the bench." }, items: [
    { q: "I was scared stiff.", a: "My fingers would not let go of the door handle.", m: 2, note: FACT },
    { q: "My heart skipped a beat.", a: "I stopped halfway up the stairs and held the rail.", m: 2, note: FACT },
    { q: "I was over the moon.", a: "I read the message out loud to everyone at the table.", m: 2, note: FACT },
    { q: "I went as white as a ghost.", a: "My friend asked if I needed to sit down.", m: 2, note: FACT }] }] },
  { sec: "D", title: "Eight fixes", outOf: 8, band: null, partB: true, partBHead: "Reading and writing", partBOut: 36,
    para: "When I opened the envelope my hands were shaking. I read the first line twice. Because the words did not make sense. Then I see my name at the top of the list I could not believe it. My sister runs into the room. She asks what happened I showed her the paper. After she read it she screamed. We jumped up and down in the kitchen.",
    fixed: "When I opened the [envelope, my] hands were shaking. I read the first line [twice because] the words did not make sense. Then I [saw] my name at the top of the [list. I] could not believe it. My sister [ran] into the room. She [asked] what [happened. I] showed her the paper. After she read [it, she] screamed. We jumped up and down in the kitchen.",
    paraNote: "Eight mistakes. Careful: “I read the first line twice” and the last sentence are already right.",
    groups: [{ kind: "edit", title: "The eight fixes", fix: true, lines: 8, instr: "This paragraph has EIGHT mistakes. Write it again with all eight fixed.", items: [
    { q: "envelope my hands", a: "envelope, my hands", note: "comma after the opening clause" },
    { q: "twice. Because the words", a: "twice because the words", note: "fragment joined to the sentence before" },
    { q: "I see", a: "I saw", note: "past tense" },
    { q: "list I could", a: "list. I could", note: "run-on: a period, or a comma and and" },
    { q: "My sister runs", a: "My sister ran", note: "past tense" },
    { q: "She asks", a: "She asked", note: "past tense" },
    { q: "happened I showed", a: "happened. I showed", note: "run-on: a period, or a comma and so" },
    { q: "read it she", a: "read it, she", note: "comma after the opening clause" }] }] },
  { sec: "E", title: "The Radio in the Garage", outOf: 12, band: null, partB: true,
    text: { title: RADIO.title, paras: RADIO.paras, instr: "Read the story twice. Then answer. Give a paragraph number in every answer." },
    groups: [{ kind: "rewrite", lines: 3,
    instr: "Answer in complete sentences: your answer, the paragraph number with the words, and why. (3 marks each)",
    ex: { q: "In paragraph 2, why does the narrator tell us the family is not Portuguese?", a: "It makes the radio strange. In paragraph 2, nobody in the family speaks Portuguese, so the reader wonders why the father plays it." }, items: [
    { q: "In paragraph 3, the Portuguese goes on above the father “like weather.” What job is this comparison doing?", a: "It describes the sound. In paragraph 3, the radio is like weather because it is always there in the background and the father does not have to listen to it.", m: 3, note: CEE },
    { q: "In paragraph 10, the radio fills the room “like people.” Why does the narrator say in paragraph 11 that it is not company?", a: "The radio is the sound of a street, not a friend. In paragraph 11, the narrator says it is “the sound of a street,” like the busy street where the father worked for twenty-two years in paragraph 7.", m: 3, note: CEE },
    { q: "In paragraph 13, the father turns the radio off when his sister speaks Portuguese. Why?", a: "The radio only works when he does not understand it. In paragraph 13, he turns it off because the language has become a joke from home, not the sound of a street.", m: 3, note: CEE },
    { q: "What does the last sentence, in paragraph 16, tell you about the father?", a: "The radio is private. In paragraph 16, he never turns it up when the family walks in, because it belongs to the life he misses, not to them.", m: 3, note: CEE }] }] } ] } };

// Section F — the paragraph, marked on the L05 good-copy rubric (one level per criterion, 1–4 points)
const MUSTS = ["One small moment: under five minutes, in one place.", "An opening detail a reader can picture.",
  "One fresh comparison, where the feeling is strongest.", "A last sentence that is a detail, not an explanation.",
  "Complete sentences in the past tense, commas checked."];
const partB = {
 practice: { "ELL3": { sec: "F", title: "Your paragraph", task: "Write about a moment you were proud.", out: 16, lines: 15, musts: MUSTS,
   instr: "Write ONE paragraph of 6 to 10 sentences about one small moment. Open on a detail, use one comparison, and end without explaining.",
   good: "The scoreboard still said 4–4 when the coach called my number. I stepped onto the ice and my skates felt too tight. The puck came to me off the boards, and I did not think. I shot it low, between the goalie’s pads. For a second the rink went quiet, like a television with the sound turned off. Then my teammates hit my helmet so hard my ears rang. On the bench, the coach did not say anything. He just moved me to the front of the line." } },
 unit: { "ELL3": { sec: "F", title: "Your paragraph", task: "Write about a moment you felt relieved, or a moment you were surprised.", out: 16, lines: 15, musts: MUSTS,
   instr: "Choose ONE. Write one paragraph of 6 to 10 sentences about one small moment. Open on a detail, use one comparison, and end without explaining.",
   good: "The nurse closed the door behind my grandfather, and the waiting room clock clicked to 2:15. My mother held her phone face down on her knee. Every time the door moved, she sat up straight. I counted the fish in the tank by the window, then counted them again. At 3:40 the door opened, and my grandfather came out holding his hat. He was smiling the way he smiles at a good card game. My mother stood up so fast her phone fell on the floor. Nobody picked it up." } } };

const RB = L5.goodCopy[0].rubric;
const rubric = { title: "How Section F is marked", intro: "Section F is marked out of {out}: Mr. Reid circles one level on each line. Each level is worth the points shown.",
  levels: RB.levels, points: ["1 point", "2 points", "3 points", "4 points"], criteria: RB.criteria };

// MARKING-DECK BLOCKS for one-level ELL3 papers (decks L06 practice, L07 unit): each section's answers one per slide with
// their marks, the Section D paragraph before and after, then a section total with the running Part A or Part B total.
// parts: "A" (Sections A–C) or "B" (Sections D–E). Section F is built in the deck file from partB + rubric.
function markBlocks(which, parts, bands) {
  const T = practice.ELL3 && which === "practice" ? practice.ELL3 : unit.ELL3, out = [], LV = T.lvl;
  const secs = T.sections.filter(s => parts === "A" ? !s.partB : s.partB); let run = 0;
  secs.forEach((s, i) => { run += s.outOf;
    if (s.para) out.push({ type: "markpara", label: `Section ${s.sec} paragraph`, tag: `Marking · ${LV} · Section ${s.sec}`, head: `Section ${s.sec} — the paragraph`, text: s.para, note: s.paraNote });
    if (s.text) out.push({ type: "text", text: "story", label: s.text.title, continues: `${s.text.title} continues` },
      { type: "rows", label: `How Section ${s.sec} is marked`, tag: `Section ${s.sec} · 3 marks each`, head: `How Section ${s.sec} is marked`, rows: [
        ["Claim +1", "You answer the question in your first sentence."],
        ["Evidence +1", "The paragraph number and the words from the story."],
        ["Explanation +1", "A sentence that explains how the evidence shows your answer."]] });
    let from = 0;
    s.groups.forEach(g => { if (s.text) g.items.forEach((it, k) => out.push({ type: "markq", lvl: LV, sec: s.sec, title: `Question ${from + k + 1}`, from: from + k, items: [it] }));
      else out.push({ type: "markq", lvl: LV, sec: s.sec, title: g.title || s.title, from, items: g.items.map(it => ({ ...it, q: it.q.replace(/^___\s+/, ""), ...(g.fix ? { fix: true } : {}) })), cols: g.fix && g.items.length > 5 ? 2 : 1 });
      from += g.items.length; });
    if (s.fixed) out.push({ type: "markpara", fixed: true, label: `Section ${s.sec} fixed`, tag: `Marking · ${LV} · Section ${s.sec} · all fixed`, head: `Section ${s.sec} — all fixed`,
      text: s.fixed, note: "+1 for each fix. Take off 1 for any NEW error. A correct rewording is fine." });
    const last = i === secs.length - 1;
    out.push({ type: "marktotal", label: `Section ${s.sec} total`, lvl: LV, sec: s.sec, outOf: s.outOf, band: null,
      waitNote: parts === "A" ? (last ? null : `The level comes from Part A out of ${T.partA}, after Section C.`) : "Part B levels come from the rubric in Section F.",
      ...(i === 0 ? { firstNote: `Count the marks. Write the score beside Section ${s.sec}.` } : { runTo: run, ...(parts === "B" ? { runLabel: "Part B so far (D + E)" } : {}) }) });
    if (parts === "A" && last) out.push({ type: "marktotal", label: "Part A level", lvl: LV, sec: "A–C", head: "Part A: add it up", boxLabel: "Part A", outOf: T.partA, band: bands[which],
      firstNote: "Write the Part A score and its level at the top of Part A." }); });
  return out;
}
module.exports = { course: "ELL3", levels: ["ELL3"], unitNo: "2", unitTitle: "Saying It Sideways",
  keyHead: "ELL 3 · Unit 2 · Test Answer Key · teacher copy",
  partALabel: "Language", partBLabel: "Reading and writing",
  intro: "Pencil only. Work alone. Read each section and look at the example first. The rubric for Section F is on the last page.",
  bands: { practice: BAND("13–14", "11–12", "9–10", "0–8"), unit: BAND("21–24", "18–20", "15–17", "0–14") },
  practice, unit, partB, rubric, BUSPASS, RADIO,
  markBlocks: (which, parts) => markBlocks(which, parts, { practice: BAND("13–14", "11–12", "9–10", "0–8"), unit: BAND("21–24", "18–20", "15–17", "0–14") }) };
