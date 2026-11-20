// ENG8 U3 "First Peoples Voices" — the unit test, as data. ONE source for the printed paper (make_test.js), the answer key
// and the marking deck (ENG8_U03_L06). Shape approved by Sean Nov 20 2026: Part A peer-marked in class (Sections A–C, every
// item with one right answer); Part B, one paragraph, marked by Mr. Reid on a four-line rubric (1–4 points per line).
// /50 = Part A 34 · Part B 16. Sean asked for the Unit 2 shape and did not set a total; /50 keeps the write plus peer
// marking inside 60 minutes (standing order Nov 6 2026): about a 45-minute write and 12 minutes of Part A marking.
// Written Mon Dec 7 2026 (F and H). Grammar in Section C was practised in Lesson 5 Part A.
// CURRICULUM CHECK, BC ELA 8: A → unit vocabulary (story, perspective, First Peoples texts) · B → comprehension of a
// nonfiction text with evidence · C → conventions · Part B → a paragraph with evidence and explanation.
// The Section B passage "Why Orange Shirts?" is ORIGINAL, written Nov 20 2026 from checked sources: The Canadian
// Encyclopedia "Orange Shirt Day" (May 2013 Williams Lake event; symbol of remembrance, teaching and healing; June 2021
// national statutory holiday), orangeshirtday.org (St. Joseph Mission 1891–1981; "Every Child Matters"), CBC (Webstad was
// six; the day began in 2013), gov.bc.ca (BC statutory holiday law, March 9 2023). Part B's question differs from the good copy.
// Item fields: q (as printed; "___" marks a blank), a (answer), m (marks, default 1), note (marking note shown with the answer).
// Build: node make_test.js lessons/ENG8_U03_testdata.js unit|key <out> v1
const BANDS = { unit: [["Extending", "31–34"], ["Proficient", "25–30"], ["Developing", "20–24"], ["Emerging", "0–19"]] };
const WHY = {
 title: "Why Orange Shirts?",
 paras: [
  "Every year on September 30, many people across Canada wear orange shirts. The day began in Williams Lake, British Columbia.",
  "In May 2013, Survivors of St. Joseph Mission Residential School and their families gathered in Williams Lake for a commemoration project and reunion. The school had been open from 1891 to 1981.",
  "At that event, Phyllis Webstad told the story of her first day at the Mission. She was six years old. The new orange shirt her grandmother had bought her was taken away.",
  "The orange shirt became a symbol of remembrance, teaching and healing. The first Orange Shirt Day was held that fall, on September 30.",
  "The day has a message: “Every Child Matters.” It honours the children who were sent to residential schools.",
  "In June 2021, the Government of Canada made September 30 a national statutory holiday: the National Day for Truth and Reconciliation. In 2023, British Columbia made it a provincial statutory holiday too."] };
const unit = {
 "ENG8": { lvl: "English 8", partA: 34, partB: 16, total: 50, sections: [
  { sec: "A", title: "Unit words", outOf: 10, band: null, groups: [{ kind: "blank",
    bank: ["testimony", "Survivor", "perspective", "symbol", "evidence", "memoir", "assimilate", "topic sentence", "protocol", "specific", "first person", "identity"],
    instr: "Write the right word from the box on the line. Each word is used once. One word is extra.",
    ex: { q: "The place a person sees and tells something from is their ___.", a: "perspective" }, items: [
    { q: "A first-person account by someone who was there is ___.", a: "testimony" },
    { q: "A person who attended a residential school and lived through it is a ___.", a: "Survivor" },
    { q: "An object that stands for a bigger idea is a ___.", a: "symbol" },
    { q: "Facts from a text that prove your point are ___.", a: "evidence" },
    { q: "A true story a person writes about their own life is a ___.", a: "memoir" },
    { q: "To make a group give up its own culture is to ___ it.", a: "assimilate" },
    { q: "The first sentence of a paragraph, which says what it is about, is the ___.", a: "topic sentence" },
    { q: "The respectful rule for how a story is shared is a ___.", a: "protocol" },
    { q: "Naming one exact thing, not a whole group, is being ___.", a: "specific" },
    { q: "Your name, family, language and culture are part of your ___.", a: "identity" }] }] },
  { sec: "B", title: "Why Orange Shirts?", outOf: 14, band: null,
    text: { title: WHY.title, paras: WHY.paras, instr: "Read the passage twice. Then answer. 2 marks each: 1 for the answer, 1 for the right paragraph number." },
    groups: [{ kind: "rewrite", lines: 2,
    instr: "Answer in a complete sentence. Put the paragraph number in brackets at the end.",
    ex: { q: "Where did Orange Shirt Day begin?", a: "It began in Williams Lake, British Columbia (paragraph 1)." }, items: [
    { q: "When did the reunion in Williams Lake take place?", a: "It took place in May 2013 (paragraph 2).", m: 2, note: "+1 May 2013 · +1 paragraph 2" },
    { q: "How long was St. Joseph Mission open?", a: "It was open from 1891 to 1981 (paragraph 2).", m: 2, note: "+1 1891 to 1981 (90 years is also right) · +1 paragraph 2" },
    { q: "How old was Phyllis on her first day at the Mission?", a: "She was six years old (paragraph 3).", m: 2, note: "+1 six · +1 paragraph 3" },
    { q: "What was taken from her?", a: "Her new orange shirt was taken (paragraph 3).", m: 2, note: "+1 her (new) orange shirt · +1 paragraph 3" },
    { q: "What three things does the orange shirt stand for?", a: "It stands for remembrance, teaching and healing (paragraph 4).", m: 2, note: "+1 all three words · +1 paragraph 4" },
    { q: "What is the day’s message?", a: "The message is “Every Child Matters” (paragraph 5).", m: 2, note: "+1 Every Child Matters · +1 paragraph 5" },
    { q: "What did the Government of Canada do in June 2021?", a: "It made September 30 a national statutory holiday (paragraph 6).", m: 2, note: "+1 a national (statutory) holiday / the National Day for Truth and Reconciliation · +1 paragraph 6" }] }] },
  { sec: "C", title: "Ten fixes", outOf: 10, band: null,
    para: "on September 30, our school held an assembly in the gym. Every student wore orange. My friend Maya forgot her shirt, so her teacher give her a spare one. The principal spoke about residential schools then a Survivor told her story. Everyone were quiet. Because they were listening. Afterward, we walk back to class. We learned alot. Our teacher asked us to write about what we heard, and i wrote about the shirt. It's colour reminded me of the story. I will never forget there words.",
    fixed: "[On] September 30, our school held an assembly in the gym. Every student wore orange. My friend Maya forgot her shirt, so her teacher [gave] her a spare one. The principal spoke about residential [schools. Then] a Survivor told her story. Everyone [was] quiet [because] they were listening. Afterward, we [walked] back to class. We learned [a lot]. Our teacher asked us to write about what we heard, and [I] wrote about the shirt. [Its] colour reminded me of the story. I will never forget [their] words.",
    paraNote: "Ten mistakes. Careful: “so her teacher” and “and I wrote” are joined correctly with a comma.",
    groups: [{ kind: "edit", title: "The ten fixes", fix: true, inPlace: true, instr: "This paragraph has TEN mistakes. Fix each one ON the paragraph: cross it out and write the fix above it. One mark for each mistake you fix.", items: [
    { q: "on September 30", a: "On September 30", note: "capital letter" },
    { q: "her teacher give", a: "her teacher gave", note: "past tense" },
    { q: "schools then a Survivor", a: "schools. Then a Survivor", note: "run-on: a period, or a comma and and" },
    { q: "Everyone were", a: "Everyone was", note: "agreement" },
    { q: "quiet. Because they", a: "quiet because they", note: "fragment joined to the sentence before" },
    { q: "we walk back", a: "we walked back", note: "past tense" },
    { q: "alot", a: "a lot", note: "two words" },
    { q: "and i wrote", a: "and I wrote", note: "capital I" },
    { q: "It's colour", a: "Its colour", note: "its = belonging to it" },
    { q: "there words", a: "their words", note: "their = belonging to them" }] }] } ] } };

const MUSTS = ["A topic sentence that answers the question.", "Two facts from the passage, each with its paragraph number.",
  "A sentence that explains why the shirt is the symbol.", "5 to 7 complete sentences, with capitals and periods."];
const partB = { unit: { "ENG8": { title: "Writing", task: "Why do people across Canada wear orange shirts on September 30?", out: 16, lines: 18, musts: MUSTS,
  mustsLabel: "Your paragraph must have:",
  instr: "Write ONE paragraph (5 to 7 sentences). Use “Why Orange Shirts?” and give paragraph numbers.",
  good: "People across Canada wear orange shirts on September 30 to remember the children sent to residential schools. The day began after Phyllis Webstad told her story at a reunion in Williams Lake in 2013 (paragraph 2). On her first day at the Mission, when she was six, her new orange shirt was taken away (paragraph 3). The shirt is the symbol because it shows, in one small thing, everything the school took from her. Today it stands for remembrance, teaching and healing (paragraph 4), and its message is that every child matters (paragraph 5)." } } };

const LV = ["Emerging", "Developing", "Proficient", "Extending"];
const rubric = { title: "How Part B is marked", intro: "Part B is out of {out}. Mr. Reid circles one level on each line. Each level is worth the points shown.",
  levels: LV, points: ["1 point", "2 points", "3 points", "4 points"], criteria: [
  { code: "1", name: "Answer", d: [
    "There is no topic sentence, or it does not answer the question.",
    "Your topic sentence is about orange shirts but does not say why people wear them.",
    "Your topic sentence answers the question clearly.",
    "Your topic sentence answers the question and sets up the whole paragraph."] },
  { code: "2", name: "Evidence", d: [
    "No facts from the passage, or no paragraph numbers.",
    "One fact, or facts with paragraph numbers missing or wrong.",
    "Two facts from the passage, each with its paragraph number.",
    "Well-chosen facts, each with its paragraph number, that build on each other."] },
  { code: "3", name: "Explanation", d: [
    "No explanation: the paragraph only lists facts.",
    "You say the shirt is important, but not why it is the symbol.",
    "You explain why the shirt is the symbol.",
    "You explain why one small shirt can stand for so much."] },
  { code: "4", name: "Sentences and conventions", d: [
    "Errors make the paragraph hard to read.",
    "Some fragments or run-ons, and errors sometimes get in the way.",
    "Complete sentences; spelling and punctuation are mostly correct.",
    "Complete, varied sentences, almost free of errors."] } ] };

// MARKING-DECK BLOCKS (deck L06): each Part A section's answers one per slide with their marks, the Section C paragraph
// before and after, then a section total with the running Part A total.
function markBlocks() {
  const T = unit.ENG8, out = [], LV = T.lvl; let run = 0;
  T.sections.forEach((s, i) => { run += s.outOf;
    if (s.para) out.push({ type: "markpara", label: `Section ${s.sec} paragraph`, tag: `Marking · Section ${s.sec}`, head: `Section ${s.sec} — the paragraph`, text: s.para, note: s.paraNote });
    if (s.text) out.push({ type: "text", text: "why", label: s.text.title, continues: `${s.text.title} continues` },
      { type: "rows", label: `How Section ${s.sec} is marked`, tag: `Section ${s.sec} · 2 marks each`, head: `How Section ${s.sec} is marked`, rows: [
        ["Answer +1", "The right answer, in a sentence."],
        ["Paragraph +1", "The right paragraph number."]] });
    let from = 0;
    s.groups.forEach(g => { if (s.text) g.items.forEach((it, k) => out.push({ type: "markq", lvl: LV, sec: s.sec, title: `Question ${from + k + 1}`, from: from + k, items: [it] }));
      else { const its = g.items.map(it => ({ ...it, q: it.q.replace(/^___\s+/, ""), ...(g.fix ? { fix: true } : {}) }));
        for (let c = 0; c < its.length; c += 5) out.push({ type: "markq", lvl: LV, sec: s.sec, title: (g.title || s.title) + (its.length > 5 ? ` (${c + 1}–${Math.min(c + 5, its.length)})` : ""), from: from + c, items: its.slice(c, c + 5), cols: 1 }); }
      from += g.items.length; });
    if (s.fixed) out.push({ type: "markpara", fixed: true, label: `Section ${s.sec} fixed`, tag: `Marking · Section ${s.sec} · all fixed`, head: `Section ${s.sec} — all fixed`,
      text: s.fixed, note: "+1 for each mistake fixed on the paragraph. Nothing else is marked." });
    const last = i === T.sections.length - 1;
    out.push({ type: "marktotal", label: `Section ${s.sec} total`, lvl: LV, sec: s.sec, outOf: s.outOf, band: null,
      waitNote: last ? null : `The level comes from Part A out of ${T.partA}, after Section C.`,
      ...(i === 0 ? { firstNote: `Count the marks. Write the score beside Section ${s.sec}.` } : { runTo: run }) });
    if (last) out.push({ type: "marktotal", label: "Part A level", lvl: LV, sec: "A–C", head: "Part A: add it up", boxLabel: "Part A", outOf: T.partA, band: BANDS.unit,
      firstNote: "Write the Part A score and its level at the top of Part A." }); });
  return out;
}
module.exports = { course: "ENG8", levels: ["ENG8"], unitNo: "3", unitTitle: "First Peoples Voices",
  keyHead: "English 8 · Unit 3 · Test Answer Key · teacher copy",
  partALabel: "Reading and language", partBLabel: "Writing",
  intro: "Pencil only. Work alone. Read each section and look at the example first. The rubric for Part B is on the last page.",
  bands: BANDS, unit, partB, rubric, WHY, markBlocks };
