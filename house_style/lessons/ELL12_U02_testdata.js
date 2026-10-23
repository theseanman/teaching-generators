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
 "1A": { lvl: "ELL 1", partA: 40, partB: 20, total: 60, sections: [
  { sec: "A", title: "School words", outOf: 8, band: B8, groups: [{ kind: "blank", bank: ["homework", "opinion", "reason", "quiz", "early", "notebook", "closing", "bell", "agree"],
    instr: "Write the right word from the box on the line.", ex: { q: "School work you do at home is ___.", a: "homework" }, items: [
    { q: "A short, small test is a ___.", a: "quiz" }, { q: "Before the usual time is ___.", a: "early" },
    { q: "The last sentence is the ___.", a: "closing" }, { q: "Why you think something is a ___.", a: "reason" },
    { q: "A book you write notes in is a ___.", a: "notebook" }, { q: "To think the same as another person is to ___.", a: "agree" },
    { q: "What you think is your ___.", a: "opinion" }, { q: "The sound that starts and ends a class is the ___.", a: "bell" }] }] },
  { sec: "B", title: "The right verb", outOf: 8, band: B8, groups: [{ kind: "blank", bank: ["am", "is", "are", "go", "have", "eat"],
    instr: "Write the right verb on the line. Use the box. You may use a word more than once.", ex: { q: "We ___ in Grade 9.", a: "are" }, items: [
    { q: "I ___ a new student.", a: "am" }, { q: "The library ___ quiet.", a: "is" }, { q: "We ___ math in first period.", a: "have" },
    { q: "My classes ___ in Room 148.", a: "are" }, { q: "I ___ home at three.", a: "go" }, { q: "They ___ lunch in the cafeteria.", a: "eat" },
    { q: "It ___ cold today.", a: "is" }, { q: "You ___ my friend.", a: "are" }] }] },
  { sec: "C", title: "How often", outOf: 8, band: B8, groups: [{ kind: "rewrite", lines: 1,
    instr: "Write the sentence again. Put the word in ( ) in the right place.", ex: { q: "(usually) I take the bus.", a: "I usually take the bus." }, items: [
    { q: "(always) I do my homework.", a: "I always do my homework." }, { q: "(never) I am late.", a: "I am never late." },
    { q: "(often) We talk in the hallway.", a: "We often talk in the hallway." }, { q: "(sometimes) I forget my notebook.", a: "I sometimes forget my notebook." },
    { q: "(usually) My friends are at the library.", a: "My friends are usually at the library." }, { q: "(always) I eat breakfast.", a: "I always eat breakfast." },
    { q: "(never) The bell is late.", a: "The bell is never late." }, { q: "(sometimes) We have a quiz.", a: "We sometimes have a quiz." }] }] },
  { sec: "D", title: "Join with because", outOf: 8, band: B8, groups: [{ kind: "rewrite", lines: 2,
    instr: "Join the two sentences with because. Write ONE sentence. (2 marks each)", ex: { q: "I like art. It is fun.", a: "I like art because it is fun." }, items: [
    { q: "I am happy. It is Friday.", a: "I am happy because it is Friday.", m: 2, note: BEC },
    { q: "I go to the library. It is quiet.", a: "I go to the library because it is quiet.", m: 2, note: BEC },
    { q: "I am hungry. I do not eat breakfast.", a: "I am hungry because I do not eat breakfast.", m: 2, note: BEC },
    { q: "We wear coats. It is cold.", a: "We wear coats because it is cold.", m: 2, note: BEC }] }] },
  { sec: "E", title: "Capitals and end marks", outOf: 8, band: B8, groups: [{ kind: "rewrite", lines: 1,
    instr: "Write the sentence again with capitals and an end mark.", ex: { q: "i have math today", a: "I have math today." }, items: [
    { q: "we have a quiz on friday", a: "We have a quiz on Friday." }, { q: "do you like your school", a: "Do you like your school?" },
    { q: "my teacher is mr. reid", a: "My teacher is Mr. Reid." }, { q: "i think homework is good", a: "I think homework is good." },
    { q: "is the bus late", a: "Is the bus late?" }, { q: "sofia lives in canada", a: "Sofia lives in Canada." },
    { q: "we go to school on tuesday", a: "We go to school on Tuesday." }, { q: "what is your opinion", a: "What is your opinion?" }] }] } ] },
 "2A": { lvl: "ELL 2", partA: 36, partB: 24, total: 60, sections: [
  { sec: "A", title: "Words and transitions", outOf: 8, band: B8, groups: [{ kind: "blank", bank: ["topic sentence", "detail", "First", "For example", "In addition", "Finally", "For these reasons", "believe", "reason"],
    instr: "Write the right word or transition from the box on the line.", ex: { q: "The first sentence, which gives your opinion, is the ___.", a: "topic sentence" }, items: [
    { q: "___, homework helps students practise.", a: "First", note: "the first reason" },
    { q: "___, I finish my math faster after practice at home.", a: "For example", note: "a detail" },
    { q: "___, homework teaches students to plan their time.", a: "In addition", note: "another reason" },
    { q: "___, families can see what students are learning.", a: "Finally", note: "the last reason" },
    { q: "___, I think homework every day is a good idea.", a: "For these reasons", note: "the closing" }] },
   { kind: "blank", title: "Words", items: [
    { q: "I ___ that homework helps most students.", a: "believe" },
    { q: "An example that supports a reason is a ___.", a: "detail" },
    { q: "Why you think something is a ___.", a: "reason" }] }] },
  { sec: "B", title: "The right form", outOf: 8, band: B8, groups: [{ kind: "blank",
    instr: "Write the verb in ( ) in the right form. Watch the s on he, she and it, and the plain verb after does not.", ex: { q: "Sofia ___ her homework at the library. (do)", a: "does" }, items: [
    { q: "My sister ___ her homework after dinner. (finish)", a: "finishes" }, { q: "We ___ math homework every day. (have)", a: "have" },
    { q: "He does not ___ his notebook to class. (bring)", a: "bring" }, { q: "The teacher ___ our homework on Monday. (check)", a: "checks" },
    { q: "Arman ___ his phone in his bag. (keep)", a: "keeps" }, { q: "She does not ___ the answer. (know)", a: "know" },
    { q: "My friends ___ together after school. (study)", a: "study" }, { q: "It ___ me one hour. (take)", a: "takes" }] }] },
  { sec: "C", title: "How often", outOf: 10, band: B10, groups: [{ kind: "rewrite", lines: 1,
    instr: "Write the sentence again with the word or phrase in ( ) in the right place.", ex: { q: "(often) Arman finishes early.", a: "Arman often finishes early." }, items: [
    { q: "(hardly ever) She is absent.", a: "She is hardly ever absent." }, { q: "(once a week) We have a spelling quiz.", a: "We have a spelling quiz once a week." },
    { q: "(rarely) He forgets his homework.", a: "He rarely forgets his homework." }, { q: "(usually) I don't study on Friday.", a: "I don't usually study on Friday." },
    { q: "(every day) Sofia reads in English.", a: "Sofia reads in English every day." }] },
   { kind: "rewrite", lines: 1, title: "How often (continued)", items: [
    { q: "(always) The teacher is on time.", a: "The teacher is always on time." },
    { q: "(sometimes) My brother helps me.", a: "My brother sometimes helps me." }, { q: "(twice a day) I check my schedule.", a: "I check my schedule twice a day." },
    { q: "(never) We are late for gym.", a: "We are never late for gym." }, { q: "(usually) She doesn't take the bus.", a: "She doesn't usually take the bus." }] }] },
  { sec: "D", title: "Edit the paragraph", outOf: 10, band: B10,
    para: "In my opinion students should have homework every day. First homework help students remember the lesson. for example, my math gets better when I practise at home. In addition, homework teach us to plan our time. Because we must finish it before class. finally, families can see what we are learning. They knows when we need help. For these reasons I believe daily homework is useful",
    fixed: "In my [opinion, students] should have homework every day. [First, homework helps] students remember the lesson. [For example,] my math gets better when I practise at home. In addition, homework [teaches] us to plan our [time because] we must finish it before class. [Finally,] families can see what we are learning. They [know] when we need help. [For these reasons, I] believe daily homework is [useful.]",
    paraNote: "Ten mistakes. Careful: “In addition,” is already right.",
    groups: [{ kind: "edit", title: "The ten fixes", fix: true, lines: 9, instr: "This paragraph has TEN mistakes. Write it again with all ten fixed.", items: [
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
  "1A": { task: "Should students have homework every day?", short: "Homework", out: 20, crit: ["W4a", "W3a", "W5a", "W8a"], marks: [2, 3, 4, 5], zero: true, lines: 12, musts: M1,
    good: "I think students should have homework every day. First, homework helps me because I practise the lesson again. Second, I remember new words because I use them at home. Also, my parents see my work because I show them my notebook. That is why students should have homework every day." },
  "2A": { task: "Should students have homework every day?", short: "Homework", out: 24, crit: ["W3b", "W4b", "W2b", "W7b"], marks: [3, 4, 5, 6], zero: true, lines: 14, musts: M2,
    good: "In my opinion, students should not have homework every day. First, students need time to rest after a long school day. For example, I often feel tired by the time I get home at four. In addition, many students have jobs or help their families, so they cannot finish homework every night. Finally, practice in class with a teacher is more useful, because the teacher can answer questions. For these reasons, I believe homework should be given a few times a week, not every day." } } };

module.exports = { practice, unit, RUB, partB };
