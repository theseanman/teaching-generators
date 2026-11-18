// ELL3 U3 "The Point of the Story" — the unit test, as data. ONE source for the printed paper (make_test.js),
// the answer key, and the marking deck (L07). No practice test this unit (Sean, Nov 18 2026).
// Shape approved by Sean Nov 18 2026: the Unit 2 shape. Part A language, peer-marked in class (Sections A–D, every item
// with one right answer); Part B reading and writing, marked by Mr. Reid (E on claim / evidence / explanation, F on the
// Lesson 6 good-copy rubric, one level per line worth 1–4 points). /50 = Part A 25 · Part B 25.
// 60-MINUTE STANDING ORDER (Nov 6 2026): a 44-minute write plus 12 minutes of Part A marking.
// CURRICULUM CHECK (standing order Nov 18 2026): A → W1 academic language (story and essay terms) · B → W3 irony ·
// C → W10 tenses · D → W10, W11, W12, W14, W15 (self-edit) · E → reading used as the prompt for writing (Oct 14 rule) ·
// F → W6, W9, W10, W12/W14.
// The test story, The Science Poster, is new, written for this test. Section D is an everyday scene so that it cannot be
// copied into Section F. Section F's topic differs from the good copy's (a time I had to decide something).
// Item fields: q (as printed; "___" marks a blank), a (answer), m (marks, default 1), note (marking note shown with the answer).
// Build: node make_test.js lessons/ELL3_U03_testdata.js unit|key <out> v1
const L6 = require("./ELL3_U03_L06.js");
const BAND = (fm, m, mm, nym) => [["Fully Meeting", fm], ["Meeting", m], ["Minimally Meeting", mm], ["Not Yet Meeting", nym]];
const BANDS = { unit: BAND("22–25", "19–21", "15–18", "0–14") };
const CEE2 = n => `+1 claim · +1 evidence: paragraph ${n} with words from it · +1 explanation`;
const NAMEBANK = ["VERBAL", "SITUATIONAL", "NOT IRONY"];
const POSTER = {
 title: "The Science Poster",
 paras: [
  "On Thursday night, the four of us were supposed to finish our science poster at the Brighouse library. I arrived at seven with the markers. Nobody else came.",
  "Daniel texted that he was sick. Priya had a volleyball game. Marcus did not answer at all. The poster was due at 8:30 the next morning.",
  "I spread the blank poster on a library table. I could do all of it myself. I had done that before, in Grade 7, and I had been angry for a month.",
  "Instead, I took a photo of the empty poster and sent it to the group. “I will do the title and the first box,” I wrote. “The other three boxes are yours. Bring them at eight.”",
  "I finished my part in forty minutes and went home.",
  "At eight the next morning, Priya was already at the classroom door with her box. Daniel, still coughing, had sent his with his sister. We glued them on in the hallway.",
  "Marcus arrived at 8:29 with nothing in his hands. He was the one who had told us in September, “Just don’t leave everything to the last minute.”"] };

const unit = {
 "ELL3": { lvl: "ELL 3", partA: 25, partB: 25, total: 50, sections: [
  { sec: "A", title: "Vocabulary", outOf: 8, band: null, groups: [{ kind: "blank", bank: ["conflict", "transition", "setting", "point", "outline", "climax", "conclusion", "point of view", "introduction", "resolution"],
    instr: "Write the right word from the box on the line. Each word is used once. One word is extra.", ex: { q: "A plan that shows the paragraphs in order is an ___.", a: "outline" }, items: [
    { q: "Where and when a story happens is the ___.", a: "setting" },
    { q: "The problem a character must face is the ___.", a: "conflict" },
    { q: "The moment a character decides what to do is the ___.", a: "climax" },
    { q: "How the problem ends is the ___.", a: "resolution" },
    { q: "Who is telling the story is the ___.", a: "point of view" },
    { q: "The first paragraph of an essay is the ___.", a: "introduction" },
    { q: "The last paragraph of an essay is the ___.", a: "conclusion" },
    { q: "“Then” and “A few minutes later” are each a ___.", a: "transition" }] }] },
  { sec: "B", title: "Name it", outOf: 5, band: null, newPage: true, groups: [{ kind: "blank", bank: NAMEBANK,
    instr: "Write VERBAL, SITUATIONAL or NOT IRONY on the line.", ex: { q: "___  The fire station burned down.", a: "SITUATIONAL" }, items: [
    { q: "___  “What a beautiful day,” said my aunt, closing her broken umbrella in the storm.", a: "VERBAL" },
    { q: "___  The driving teacher failed his own driving test.", a: "SITUATIONAL" },
    { q: "___  I forgot my lunch at home.", a: "NOT IRONY" },
    { q: "___  “I love waiting,” said my brother, after two hours in line.", a: "VERBAL" },
    { q: "___  The man who wrote a book about saving money had none.", a: "SITUATIONAL" }] }] },
  { sec: "C", title: "The right form", outOf: 6, band: null, groups: [{ kind: "blank",
    instr: "Write the correct past form of the verb in brackets. Use the simple past or the past continuous.", ex: { q: "Last night I (go) ___ to the library.", a: "went" }, items: [
    { q: "Yesterday I (lose) ___ my keys.", a: "lost" },
    { q: "While we (walk) ___ home, it started to snow.", a: "were walking" },
    { q: "She (give) ___ me her umbrella.", a: "gave" },
    { q: "I (not see) ___ the bus.", a: "did not see", note: "didn’t see is also right" },
    { q: "He (think) ___ about it for a minute.", a: "thought" },
    { q: "I (read) ___ a book when the phone rang.", a: "was reading" }] }] },
  { sec: "D", title: "Six fixes", outOf: 6, band: null,
    para: "Last Saturday, my family went to the night market. it was very crowded. My sister wanted bubble tea, so we waited in a long line. While we were waiting, my father buy some grilled corn. The corn were too hot to eat. I holded it in a napkin. Then it started to rain we ran to the car. Nobody was upset. Because the corn was still warm.",
    fixed: "Last Saturday, my family went to the night market. [It] was very crowded. My sister wanted bubble tea, so we waited in a long line. While we were waiting, my father [bought] some grilled corn. The corn [was] too hot to eat. I [held] it in a napkin. Then it started to [rain. We] ran to the car. Nobody was [upset because] the corn was still warm.",
    paraNote: "Six mistakes. Careful: “My sister wanted bubble tea, so we waited in a long line.” and “While we were waiting,” are already right.",
    groups: [{ kind: "edit", title: "The six fixes", fix: true, inPlace: true, instr: "This paragraph has SIX mistakes. Fix each one ON the paragraph: cross it out and write the fix above it. One mark for each mistake you fix.", items: [
    { q: "it was very crowded", a: "It was very crowded", note: "capital letter" },
    { q: "my father buy", a: "my father bought", note: "past tense" },
    { q: "The corn were", a: "The corn was", note: "was with the corn" },
    { q: "I holded", a: "I held", note: "irregular past" },
    { q: "rain we ran", a: "rain. We ran", note: "run-on: a period, or a comma and and/so" },
    { q: "upset. Because the", a: "upset because the", note: "fragment joined to the sentence before" }] }] },
  { sec: "E", title: "The Science Poster", outOf: 9, band: null, partB: true, partBHead: "Reading and writing", partBOut: 25,
    text: { title: POSTER.title, paras: POSTER.paras, instr: "Read the story twice. Then answer. Find the paragraph yourself: the paragraph number is part of the mark." },
    groups: [{ kind: "rewrite", lines: 3,
    instr: "Answer in complete sentences. 1 mark: your answer. 1 mark: the right paragraph number with words from it. 1 mark: why. (3 marks each)",
    ex: { q: "What is the setting at the start of the story?", a: "The setting is the Brighouse library on a Thursday night. Paragraph 1 says they were supposed to finish “at the Brighouse library,” and the narrator arrives at seven." }, items: [
    { q: "What is the conflict in the story?", a: "The conflict is that the narrator is alone with a poster that is due the next morning. In paragraph 2, nobody else can come and the poster is “due at 8:30 the next morning,” so the narrator has a problem to solve.", m: 3,
      note: CEE2("2 (or 1)") + ". Also right: nobody else came (1); the narrator must choose between doing it all alone and getting the others to do their parts (3), as long as the paragraph matches." },
    { q: "What is the climax? What does the narrator decide?", a: "The climax is when the narrator decides to do only one part and give the other boxes back to the group. In paragraph 4, the narrator writes, “The other three boxes are yours,” which is a decision and not just an event.", m: 3,
      note: CEE2(4) + ". The decision must be named: do only my own part / make the others do theirs. Paragraph 3 (“I could do all of it myself”) is the thinking before the decision, not the climax: give the claim mark only if the decision is right." },
    { q: "Where is the irony in the story, and which kind is it?", a: "It is situational irony. In paragraph 7, Marcus arrives “with nothing in his hands,” but he was the one who told the group not to leave everything to the last minute, so the opposite of what we expect happens.", m: 3,
      note: "+1 situational · +1 paragraph 7 with words from it · +1 what we expected and what happened (the one who warned the others is the one who does nothing / comes at the last minute)." }] }] } ] } };

// Section F — a short narrative essay, marked on the L06 good-copy rubric (one level per line, 1–4 points)
const MUSTS = ["An introduction that says when, where and who.", "A body with the events in order, and the moment you decided.",
  "A conclusion with your point: what it taught you about yourself.", "At least three different transitions.",
  "Events in the simple past, in complete sentences with capitals and periods."];
const partB = {
 unit: { "ELL3": { sec: "F", title: "Your narrative essay", task: "Write about a time you helped someone, or a time you said no.", out: 16, lines: 16, musts: MUSTS,
   mustsLabel: "Your essay must have:",
   instr: "Choose ONE. Write a short narrative essay in three paragraphs: an introduction (2 or 3 sentences), a body (4 to 6 sentences) and a conclusion (1 or 2 sentences). Indent each paragraph. Do not write about the same story as your good copy.",
   good: "Last winter, I helped a stranger on the Canada Line. It was a cold Monday morning, and I was already late for school.\n\nWhile I was standing by the doors, an old woman dropped her bag. Oranges rolled across the floor of the train. First, I looked at the clock above the door. Then I looked at the oranges. Nobody else was moving. I put my backpack down and picked them up, one by one. A few minutes later, the train reached my station, and I missed my stop.\n\nI was fifteen minutes late for math. However, I learned that I would rather be late than be a person who only watches." } } };

const RB = L6.goodCopy[0].rubric;
const rubric = { title: "How Section F is marked", intro: "Section F is marked out of {out}: Mr. Reid circles one level on each line. Each level is worth the points shown.",
  levels: RB.levels, points: ["1 point", "2 points", "3 points", "4 points"], criteria: RB.criteria };

// MARKING-DECK BLOCKS (deck L07): each Part A section's answers one per slide with their marks, the Section D paragraph
// before and after, then a section total with the running Part A total. parts: "A" (Sections A–D) or "B" (Section E).
function markBlocks(which, parts) {
  const T = unit.ELL3, out = [], LV = T.lvl;
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
      text: s.fixed, note: "+1 for each mistake fixed on the paragraph. Nothing else is marked." });
    const last = i === secs.length - 1;
    out.push({ type: "marktotal", label: `Section ${s.sec} total`, lvl: LV, sec: s.sec, outOf: s.outOf, band: null,
      waitNote: parts === "A" ? (last ? null : `The level comes from Part A out of ${T.partA}, after the last Part A section.`) : "Part B levels come from the rubric in Section F.",
      ...(i === 0 ? { firstNote: `Count the marks. Write the score beside Section ${s.sec}.` } : { runTo: run }) });
    if (parts === "A" && last) out.push({ type: "marktotal", label: "Part A level", lvl: LV, sec: "A–D", head: "Part A: add it up", boxLabel: "Part A", outOf: T.partA, band: BANDS[which],
      firstNote: "Write the Part A score and its level at the top of Part A." }); });
  return out;
}
module.exports = { course: "ELL3", levels: ["ELL3"], unitNo: "3", unitTitle: "The Point of the Story",
  keyHead: "ELL 3 · Unit 3 · Test Answer Key · teacher copy",
  partALabel: "Language", partBLabel: "Reading and writing",
  intro: "Pencil only. Work alone. Read each section and look at the example first. The rubric for Section F is on the last page.",
  bands: BANDS, unit, partB, rubric, POSTER, markBlocks };
