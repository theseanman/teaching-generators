// ELL12 U2 "My School Day" — practice test and unit test, as data. ONE source for the printed papers (make_test.js),
// the answer key, and the peer-marking decks (L07 practice, L08 unit test).
// Decisions (Sean, Oct 23 2026): ELL 1 writes the FIVE-sentence paragraph in Part B; practice-test prompt = school uniforms,
// unit-test prompt = homework every day; Part A sections as read back; marks mirror U1 (practice /40, unit /60) but
// "content over quantity"; Part B marked with the good-copy rubric lines from L06.
// Item fields: q (as printed; "___" marks a blank), a (answer), m (marks, default 1), note (marking note shown with the answer).
// Group fields: title, instr (printed), ex { q, a } (printed worked example), kind: "blank" | "rewrite" (rewrite items get writing lines).
const L6 = require("./ELL12_U02_L06.js");
const BAND = (fm, m, mm, nym) => [["Fully Meeting", fm], ["Meeting", m], ["Minimally Meeting", mm], ["Not Yet Meeting", nym]];
const B5 = BAND("5", "4", "3", "0–2"), B6 = BAND("6", "5", "4", "0–3"), B8 = BAND("7–8", "6", "5", "0–4"), B10 = BAND("9–10", "8", "6–7", "0–5");
const BEC = "+1 because · +1 a full sentence after it (who + verb)";
// Nov 6 2026: a because-first answer is also right — "Because it is Friday, I am happy." Accept it (comma needed).
const BEC2 = BEC + " · also right: Because … , …";

const practice = {
 "1A": { lvl: "ELL 1", partA: 28, partB: 12, total: 40, sections: [
  { sec: "A", title: "School words", outOf: 6, band: B6, groups: [{ kind: "blank", bank: ["reason", "homework", "rule", "schedule", "late", "opinion", "break"],
    instr: "Write the right word from the box on the line.", ex: { q: "A short rest between classes is a ___.", a: "break" }, items: [
    { q: "School work you do at home is ___.", a: "homework" }, { q: "What you think is your ___.", a: "opinion" },
    { q: "After the usual time is ___.", a: "late" }, { q: "Why you think something is a ___.", a: "reason" },
    { q: "Something you must do or must not do is a ___.", a: "rule" }, { q: "The list of your classes is your ___.", a: "schedule" }] }] },
  { sec: "B", title: "The right verb", outOf: 5, band: B5, groups: [{ kind: "blank", bank: ["am", "is", "are", "go", "eat"],
    instr: "Write the right verb on the line. Use the box. You may use a word more than once.", ex: { q: "I ___ a student.", a: "am" }, items: [
    { q: "School ___ open at 8:00.", a: "is" }, { q: "My friends ___ in Grade 9.", a: "are" }, { q: "We ___ to class at 8:30.", a: "go" },
    { q: "I ___ lunch at 12:49.", a: "eat" }, { q: "I ___ fifteen.", a: "am" }] }] },
  { sec: "C", title: "How often", outOf: 5, band: B5, groups: [{ kind: "rewrite", lines: 1,
    instr: "Write the sentence again. Put the word in ( ) in the right place.", ex: { q: "(always) I walk to school.", a: "I always walk to school." }, items: [
    { q: "(usually) I eat lunch with my friends.", a: "I usually eat lunch with my friends." },
    { q: "(never) I am late for class.", a: "I am never late for class." },
    { q: "(sometimes) We have a quiz on Friday.", a: "We sometimes have a quiz on Friday." },
    { q: "(often) My brother takes the bus.", a: "My brother often takes the bus." },
    { q: "(always) The hallway is busy.", a: "The hallway is always busy." }] }] },
  { sec: "D", title: "Join with because", outOf: 6, band: B6, groups: [{ kind: "rewrite", lines: 2,
    instr: "Join the two sentences with because. Write ONE sentence. (2 marks each)", ex: { q: "I like gym. It is fun.", a: "I like gym because it is fun." }, items: [
    { q: "I am tired. I wake up early.", a: "I am tired because I wake up early.", m: 2, note: BEC },
    { q: "I like the library. It is quiet.", a: "I like the library because it is quiet.", m: 2, note: BEC },
    { q: "We wear coats. It is cold.", a: "We wear coats because it is cold.", m: 2, note: BEC }] }] },
  { sec: "E", title: "Capitals and end marks", outOf: 6, band: B6, groups: [{ kind: "rewrite", lines: 1,
    instr: "Write the sentence again with capitals and an end mark.", ex: { q: "i like my school", a: "I like my school." }, items: [
    { q: "we have gym on monday", a: "We have gym on Monday." }, { q: "do you agree with the rule", a: "Do you agree with the rule?" },
    { q: "my friend sofia is from mexico", a: "My friend Sofia is from Mexico." }, { q: "i think lunch is too short", a: "I think lunch is too short." },
    { q: "is the library open", a: "Is the library open?" }, { q: "arman lives in richmond", a: "Arman lives in Richmond." }] }] } ] },
 "2A": { lvl: "ELL 2", partA: 24, partB: 16, total: 40, sections: [
  { sec: "A", title: "Words and transitions", outOf: 6, band: B6, groups: [{ kind: "blank", bank: ["opinion", "detail", "First", "For example", "In addition", "For these reasons", "closing"],
    instr: "Write the right word or transition from the box on the line.", ex: { q: "My ___ is what I think about something.", a: "opinion" }, items: [
    { q: "___, students would feel equal.", a: "First", note: "the first reason" },
    { q: "___, nobody would laugh at old clothes.", a: "For example", note: "a detail" },
    { q: "___, getting ready would be faster.", a: "In addition", note: "another reason" },
    { q: "___, I believe uniforms are a good idea.", a: "For these reasons", note: "the closing" },
    { q: "An example that supports a reason is a ___.", a: "detail" },
    { q: "The last sentence of a paragraph is the ___ sentence.", a: "closing" }] }] },
  { sec: "B", title: "The right form", outOf: 6, band: B6, groups: [{ kind: "blank",
    instr: "Write the verb in ( ) in the right form. Watch the s on he, she and it, and the plain verb after does not.", ex: { q: "Arman ___ his work early. (finish)", a: "finishes" }, items: [
    { q: "Sofia ___ new words in her notebook. (write)", a: "writes" }, { q: "We ___ gym on Monday. (have)", a: "have" },
    { q: "My brother does not ___ the bus. (take)", a: "take" }, { q: "The bell ___ at 8:30. (ring)", a: "rings" },
    { q: "She ___ her phone at lunch. (check)", a: "checks" }, { q: "The teacher does not ___ phones in class. (allow)", a: "allow" }] }] },
  { sec: "C", title: "How often", outOf: 6, band: B6, groups: [{ kind: "rewrite", lines: 1,
    instr: "Write the sentence again with the word or phrase in ( ) in the right place.", ex: { q: "(usually) Sofia walks to school.", a: "Sofia usually walks to school." }, items: [
    { q: "(hardly ever) I am late.", a: "I am hardly ever late." },
    { q: "(twice a week) We have gym.", a: "We have gym twice a week." },
    { q: "(rarely) He forgets his homework.", a: "He rarely forgets his homework." },
    { q: "(usually) I don't eat in the cafeteria.", a: "I don't usually eat in the cafeteria." },
    { q: "(every Monday) Our class has a quiz.", a: "Our class has a quiz every Monday." },
    { q: "(always) The library is quiet.", a: "The library is always quiet." }] }] },
  { sec: "D", title: "Edit the paragraph", outOf: 6, band: B6,
    para: "In my opinion students should wear uniforms. First, uniforms makes every student feel equal. Because nobody can see who has expensive clothes. In addition getting ready in the morning is faster. for these reasons, I believe uniforms help students",
    fixed: "In my [opinion, students] should wear uniforms. First, uniforms [make] every student feel [equal because] nobody can see who has expensive clothes. [In addition, getting] ready in the morning is faster. [For] these reasons, I believe uniforms help [students.]",
    paraNote: "Six mistakes. Careful: “First,” is already right.",
    groups: [{ kind: "edit", title: "The six fixes", fix: true, lines: 6, instr: "This paragraph has SIX mistakes. Write it again with all six fixed.", items: [
    { q: "opinion students", a: "opinion, students", note: "comma after the transition" }, { q: "uniforms makes", a: "uniforms make" },
    { q: "equal. Because nobody", a: "equal because nobody" }, { q: "In addition getting", a: "In addition, getting", note: "comma after the transition" },
    { q: "for these reasons", a: "For these reasons" }, { q: "help students", a: "help students.", note: "the end mark" }] }] } ] } };
const unit = {
 // Nov 6 2026 — 60-MINUTE STANDING ORDER, option (c): whole-section answer slides for peer-marking, plus light trims so
  // writing (40 min) + marking A and B fit 60: ELL 1 C and E 8 → 6, ELL 2 C 10 → 8.
 // Nov 10 2026 — Sean: the ELL 1 unit test "looks a little easy". A gets an extra word; B uses names and two-part subjects;
 // C uses longer subjects; D puts the reason first in two items; E becomes an EIGHT-mistake paragraph fixed in place (Sean chose 8 over 10).
 // Third-person s stays OUT of ELL 1 — the U2 lessons teach it to ELL 2 only.
 "1A": { lvl: "ELL 1", partA: 38, partB: 20, total: 58, sections: [
  { sec: "A", title: "School words", outOf: 8, band: B8, groups: [{ kind: "blank", bank: ["homework", "opinion", "schedule", "reason", "quiz", "early", "notebook", "closing", "bell", "agree"],
    instr: "Write the right word from the box on the line. One word in the box is not used.", ex: { q: "School work you do at home is ___.", a: "homework" }, items: [
    { q: "A short, small test is a ___.", a: "quiz" }, { q: "Before the usual time is ___.", a: "early" },
    { q: "The last sentence is the ___.", a: "closing" }, { q: "Why you think something is a ___.", a: "reason" },
    { q: "A book you write notes in is a ___.", a: "notebook" }, { q: "To think the same as another person is to ___.", a: "agree" },
    { q: "What you think is your ___.", a: "opinion" }, { q: "The sound that starts and ends a class is the ___.", a: "bell" }] }] },
  // B: no word box — find the wrong verb (5 wrong, 3 right, mixed). C: put the words in order, always/never only (one right
  // place), one mark per sentence that is fully right incl. capital and end mark. D: no hint, three of four reason-first.
  { sec: "B", title: "Find the wrong verb", outOf: 8, band: B8, newPage: true, groups: [{ kind: "blank",
    instr: "Some sentences have the wrong verb. If the verb is right, write ✓ on the line. If it is wrong, write the right verb on the line.", ex: { q: "___   We is in Grade 9.", a: "are" }, items: [
    { q: "___   Arman and Sofia is my friends.", a: "are" }, { q: "___   My notebook is in my bag.", a: "✓" },
    { q: "___   Sofia and I am in math class.", a: "are" }, { q: "___   My classes are in Room 148.", a: "✓" },
    { q: "___   I am go home on the bus.", a: "go", note: "no am before go" }, { q: "___   My friends eat with chopsticks.", a: "✓" },
    { q: "___   The hallway are busy at lunch.", a: "is" }, { q: "___   I is in ELL 1.", a: "am" }] }] },
  { sec: "C", title: "Put the words in order", outOf: 6, band: B6, groups: [{ kind: "rewrite", lines: 1,
    instr: "Put the words in order. Write the sentence with a capital and an end mark. One mark for each sentence that is all right.", ex: { q: "walk  /  always  /  to school  /  I", a: "I always walk to school." }, items: [
    { q: "my homework  /  I  /  always  /  do", a: "I always do my homework." },
    { q: "late  /  am  /  never  /  I", a: "I am never late." },
    { q: "are  /  always  /  my friends  /  at the library", a: "My friends are always at the library." },
    { q: "never  /  eat  /  my brother and I  /  breakfast", a: "My brother and I never eat breakfast." },
    { q: "the hallway  /  busy  /  is  /  always", a: "The hallway is always busy." },
    { q: "on time  /  the bus  /  never  /  is", a: "The bus is never on time." }] }] },
  { sec: "D", title: "Join with because", outOf: 8, band: B8, groups: [{ kind: "rewrite", lines: 2,
    instr: "Join the two sentences with because. Write ONE sentence. You may need to change the order of the two sentences. (2 marks each)", ex: { q: "I like art. It is fun.", a: "I like art because it is fun." }, items: [
    { q: "It is Friday. I am happy.", a: "I am happy because it is Friday.", m: 2, note: BEC2 + " · the reason comes first here: it is Friday" },
    { q: "I go to the library. It is quiet.", a: "I go to the library because it is quiet.", m: 2, note: BEC2 },
    { q: "I do not eat breakfast. I am hungry.", a: "I am hungry because I do not eat breakfast.", m: 2, note: BEC2 + " · the reason comes first here: I do not eat breakfast" },
    { q: "It is cold. We wear coats.", a: "We wear coats because it is cold.", m: 2, note: BEC2 + " · the reason comes first here: it is cold" }] }] },
  { sec: "E", title: "Edit the paragraph", outOf: 8, band: B8,
    para: "my name is Sofia, and I am in Grade 9. I usually take the bus to school. My first class are math. I never am late for class. I like math because it is fun. On friday, we have a quiz. At lunch, I eat with my friend arman. We go always to the library. I like the library. Because it is quiet. Do you like your school",
    fixed: "[My] name is Sofia, and I am in Grade 9. I usually take the bus to school. My first class [is] math. I [am never] late for class. I like math because it is fun. On [Friday], we have a quiz. At lunch, I eat with my friend [Arman]. We [always go] to the library. I like the [library because] it is quiet. Do you like your [school?]",
    paraNote: "Eight mistakes. Careful: “I usually take the bus” and “because it is fun” are already right.",
    groups: [{ kind: "edit", title: "The eight fixes", fix: true, inPlace: true, instr: "This paragraph has EIGHT mistakes: capitals, end marks, verbs, how-often words and because. Fix each one ON the paragraph: cross it out and write the fix above it. One mark for each mistake you fix. Example: i go to school → cross out i and write I above it.", items: [
    { q: "my name", a: "My name", note: "the capital" }, { q: "My first class are", a: "My first class is" },
    { q: "I never am late", a: "I am never late", note: "after am / is / are" }, { q: "On friday", a: "On Friday", note: "the capital" },
    { q: "my friend arman", a: "my friend Arman", note: "the capital" }, { q: "We go always", a: "We always go", note: "before the main verb" },
    { q: "library. Because it", a: "library because it", note: "one sentence with because" }, { q: "your school", a: "your school?", note: "the end mark — it is a question" }] }] } ] },
 // Nov 10 2026 — Sean: same format changes as ELL 1. A gets an unused word; B = find the wrong verb (5 wrong, 3 right) on its own
 // page; C = put the words in order, one-place words only, one mark per fully right sentence; D keeps ten mistakes with a second
 // already-right sentence (a correct because-sentence) as a trap.
 "2A": { lvl: "ELL 2", partA: 34, partB: 24, total: 58, sections: [
  // Nov 10 2026 (Sean: Part A was unclear): the five transitions are printed as ONE paragraph about homework with an opinion
  // sentence given first; transitions and words get separate boxes; the worked example moves to the words. Against side, so the
  // order of the paragraph — not the side — is what students must read. Paragraph order still allows only one answer per blank.
  { sec: "A", title: "Words and transitions", outOf: 8, band: B8, groups: [{ kind: "parablank", title: "The paragraph", bank: ["First", "For example", "In addition", "Finally", "For these reasons"],
    instr: "Read this paragraph about homework. Write a transition from the box in each blank. Use each transition once.",
    lead: "I think students should not have homework every day.", items: [
    { q: "___, students need time to rest after school.", a: "First", note: "the first reason" },
    { q: "___, I often feel tired when I get home at four.", a: "For example", note: "a detail" },
    { q: "___, many students help their families at night.", a: "In addition", note: "another reason" },
    { q: "___, students can practise in class with the teacher.", a: "Finally", note: "the last reason" },
    { q: "___, I believe homework every day is too much.", a: "For these reasons", note: "the closing" }] },
   { kind: "blank", title: "Words", bank: ["topic sentence", "believe", "detail", "reason", "closing"],
    instr: "Write the right word from the box on the line. One word is not used.", ex: { q: "The first sentence, which gives your opinion, is the ___.", a: "topic sentence" }, items: [
    { q: "I ___ that homework helps most students.", a: "believe" },
    { q: "An example that supports a reason is a ___.", a: "detail" },
    { q: "Why you think something is a ___.", a: "reason" }] }] },
  { sec: "B", title: "Find the wrong verb", outOf: 8, band: B8, newPage: true, groups: [{ kind: "blank",
    instr: "Some sentences have the wrong verb. If the verb is right, write ✓ on the line. If it is wrong, write the right form on the line. Watch the s on he, she and it, and the plain verb after does not.", ex: { q: "___   Sofia do her homework at the library.", a: "does" }, items: [
    { q: "___   My sister finish her homework after dinner.", a: "finishes" }, { q: "___   We have math homework every day.", a: "✓" },
    { q: "___   He does not brings his notebook to class.", a: "bring", note: "plain verb after does not" }, { q: "___   The teacher check our homework on Monday.", a: "checks" },
    { q: "___   Arman keeps his phone in his bag.", a: "✓" }, { q: "___   She do not know the answer.", a: "does", note: "she does not" },
    { q: "___   My friends studies together after school.", a: "study" }, { q: "___   It takes me one hour.", a: "✓" }] }] },
  { sec: "C", title: "Put the words in order", outOf: 8, band: B8, groups: [{ kind: "rewrite", lines: 1, title: "Put the words in order",
    instr: "Put the words in order. Write the sentence with a capital and an end mark. One mark for each sentence that is all right.", ex: { q: "early  /  always  /  Arman  /  finishes", a: "Arman always finishes early." }, items: [
    { q: "absent  /  she  /  hardly ever  /  is", a: "She is hardly ever absent." },
    { q: "his homework  /  rarely  /  he  /  forgets", a: "He rarely forgets his homework." },
    { q: "is  /  on time  /  the teacher  /  always", a: "The teacher is always on time." },
    { q: "never  /  late for gym  /  we  /  are", a: "We are never late for gym." },
    { q: "homework on Friday  /  our teacher  /  rarely  /  gives", a: "Our teacher rarely gives homework on Friday." }] },
   { kind: "rewrite", lines: 1, title: "Words in order (continued)", items: [
    { q: "checks  /  her phone in class  /  never  /  Sofia", a: "Sofia never checks her phone in class." },
    { q: "my brother  /  the bus  /  hardly ever  /  takes", a: "My brother hardly ever takes the bus." },
    { q: "his notes in English  /  always  /  writes  /  Arman", a: "Arman always writes his notes in English." }] }] },
  { sec: "D", title: "Edit the paragraph", outOf: 10, band: B10,
    para: "In my opinion students should have homework every day. First homework help students remember the lesson. for example, my math gets better when I practise at home. I usually do it after dinner because I am busy after school. In addition, homework teach us to plan our time. Because we must finish it before class. finally, families can see what we are learning. They knows when we need help. For these reasons I believe daily homework is useful",
    fixed: "In my [opinion, students] should have homework every day. [First, homework helps] students remember the lesson. [For example,] my math gets better when I practise at home. I usually do it after dinner because I am busy after school. In addition, homework [teaches] us to plan our [time because] we must finish it before class. [Finally,] families can see what we are learning. They [know] when we need help. [For these reasons, I] believe daily homework is [useful.]",
    paraNote: "Ten mistakes. Careful: “In addition,” and “I usually do it after dinner because I am busy after school.” are already right.",
    groups: [{ kind: "edit", title: "The ten fixes", fix: true, inPlace: true, instr: "This paragraph has TEN mistakes. Fix each one ON the paragraph: cross it out and write the fix above it. One mark for each mistake you fix.", items: [
    { q: "opinion students", a: "opinion, students", note: "comma after the transition" }, { q: "First homework", a: "First, homework", note: "comma after the transition" },
    { q: "homework help", a: "homework helps" }, { q: "for example,", a: "For example,", note: "the capital" },
    { q: "homework teach", a: "homework teaches" }, { q: "time. Because we", a: "time because we" },
    { q: "finally,", a: "Finally,", note: "the capital" }, { q: "They knows", a: "They know" },
    { q: "For these reasons I", a: "For these reasons, I", note: "comma after the transition" }, { q: "useful", a: "useful.", note: "the end mark" }] }] } ] } };
// Part B — the good-copy rubric lines from L06 (Sean approved them Oct 23), marks per test.
const R1 = L6.goodCopy[0].rubric.criteria, R2 = L6.goodCopy[1].rubric.criteria;
const RUB = {};
R1.forEach(c => RUB[c.code + "a"] = [`${c.code} · ${c.name}`, c.d]);
R2.forEach(c => RUB[c.code + "b"] = [`${c.code} · ${c.name}`, c.d]);
const M1 = ["Your opinion first: I think …", "Three reasons. Start them with First, Second, Also.", "Every reason has because + who + verb.", "Close with That is why …", "Capitals at the start, end marks at the end."];
const M2 = ["A topic sentence that gives your opinion.", "Three reasons, each followed by a detail (For example, …).", "Transitions with a comma: First, In addition, Finally.", "A closing in new words: For these reasons, …", "No fragments. Check capitals, commas and the s on he, she, it."];
const partB = {
 practice: {
  "1A": { task: "Should students wear school uniforms?", short: "Uniforms", out: 12, crit: ["W4a", "W3a", "W5a", "W8a"], marks: [0, 1, 2, 3], lines: 12, musts: M1,
    good: "I think students should wear school uniforms. First, uniforms are easy because I do not choose my clothes. Second, students feel equal because everyone looks the same. Also, the school looks good because the uniforms are neat. That is why students should wear uniforms." },
  "2A": { task: "Should students wear school uniforms?", short: "Uniforms", out: 16, crit: ["W3b", "W4b", "W2b", "W7b"], marks: [1, 2, 3, 4], lines: 14, musts: M2,
    good: "In my opinion, students should not have to wear school uniforms. First, clothes are a way for students to show who they are. For example, my friend wears her grandmother's bracelet every day. In addition, uniforms cost money, and many families already pay for school supplies. Finally, students feel more comfortable in their own clothes, so they can focus on learning. For these reasons, I believe students should choose what they wear." } },
 unit: {
  // Nov 10 2026 (Sean): Part B moved from homework to school uniforms on BOTH levels — the ELL 2 Section A paragraph is about
  // homework and students could copy it. Uniforms was the practice-test prompt, which was cut, so no student has written on it.
  "1A": { task: "Should students wear school uniforms?", short: "Uniforms", out: 20, newPage: true, crit: ["W4a", "W3a", "W5a", "W8a"], marks: [2, 3, 4, 5], zero: true, lines: 12, musts: M1,
    good: "I think students should wear school uniforms. First, uniforms are easy because I do not choose my clothes. Second, students feel equal because everyone looks the same. Also, the school looks good because the uniforms are neat. That is why students should wear uniforms." },
  "2A": { task: "Should students wear school uniforms?", short: "Uniforms", out: 24, newPage: true, crit: ["W3b", "W4b", "W2b", "W7b"], marks: [3, 4, 5, 6], zero: true, lines: 14, musts: M2,
    good: "In my opinion, students should not have to wear school uniforms. First, clothes are a way for students to show who they are. For example, my friend wears her grandmother's bracelet every day. In addition, uniforms cost money, and many families already pay for school supplies. Finally, students feel more comfortable in their own clothes, so they can focus on learning. For these reasons, I believe students should choose what they wear." } } };

module.exports = { practice, unit, RUB, partB };
