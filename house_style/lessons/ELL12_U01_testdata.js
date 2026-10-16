// ELL12 U1 — practice test and unit test, as data for the peer-marking decks (L13 practice, L14 unit test).
// Transcribed Oct 16 2026 from ELL12_U01_PracticeTest_v1 / UnitTest_v1 (1A + 2A) and ELL12_U01_TestKeys_v1;
// check_testdata.py checks every question against the printed tests and every answer against the key.
// Item fields: q (as printed; "( ? )" or "___" marks the blank), a (the answer), m (marks), note (marking note shown with the answer).
// Marking rulings from Sean, Oct 16 2026: any opening from the list + comma is right on every "start it differently" item;
// a comma after an opening is right either way on the capitals items; levels shown on every section-total slide.
const OPEN = "+1 an opening (when, in, outside, first, after, soon) · +1 the comma after it";
const CAPS = "A comma after the opening is right too.";
const BAND = (fm, m, mm, nym) => [["Fully Meeting", fm], ["Meeting", m], ["Minimally Meeting", mm], ["Not Yet Meeting", nym]];

const practice = {
 "1A": { lvl: "ELL 1", partA: 28, partB: 12, total: 40, sections: [
  { sec: "A", title: "Vocabulary", outOf: 6, band: BAND("6", "5", "4", "0–3"), groups: [{ items: [
    { q: "what your nose notices is a ___", a: "smell" },
    { q: "to notice something with your eyes is to ___", a: "see" },
    { q: "to try food to know its flavour is to ___", a: "taste" },
    { q: "what your ears hear is a ___", a: "sound" },
    { q: "to say what something is like is to ___", a: "describe" },
    { q: "the name for a describing word like soft or bright: ___", a: "adjective" }] }] },
  { sec: "B", title: "am, is or are", outOf: 5, band: BAND("5", "4", "3", "0–2"), groups: [{ items: [
    { q: "My sister ___ in Grade 9.", a: "is" }, { q: "We ___ from Manila.", a: "are" }, { q: "I ___ in Room 148.", a: "am" },
    { q: "The soup ___ hot.", a: "is" }, { q: "My parents ___ at work.", a: "are" }] }] },
  { sec: "C", title: "a, an or the", outOf: 4, band: BAND("4", "3", "—", "0–2"), groups: [{ items: [
    { q: "I have ___ apple.", a: "an" }, { q: "___ radio in the kitchen is old.", a: "The" },
    { q: "She reads ___ book.", a: "a" }, { q: "There is ___ egg in the pan.", a: "an" }] }] },
  { sec: "D", title: "Place words", outOf: 4, band: BAND("4", "3", "—", "0–2"), groups: [{ items: [
    { q: "The picture is ___ the wall.", a: "on" }, { q: "My shoes are ___ the bed.", a: "under" },
    { q: "The fish swim ___ the water.", a: "in" }, { q: "Lina stands ___ her grandmother.", a: "beside", note: "next to is right too." }] }] },
  { sec: "E", title: "and, but or so", outOf: 4, band: BAND("4", "3", "—", "0–2"), groups: [{ items: [
    { q: "I was cold, ( ? ) I closed the window.", a: "so" }, { q: "I like tea, ( ? ) I do not like coffee.", a: "but" },
    { q: "Lina sings, ( ? ) her grandmother cooks.", a: "and" }, { q: "The bus was late, ( ? ) I walked.", a: "so" }] }] },
  { sec: "F", title: "Capitals and end marks", outOf: 5, band: BAND("5", "4", "3", "0–2"), groups: [{ items: [
    { q: "we live in canada", a: "We live in Canada." }, { q: "is the soup hot", a: "Is the soup hot?" },
    { q: "i eat rice on friday", a: "I eat rice on Friday." }, { q: "my friend maria is kind", a: "My friend Maria is kind." },
    { q: "what is your name", a: "What is your name?" }] }] } ] },
 "2A": { lvl: "ELL 2", partA: 24, partB: 16, total: 40, sections: [
  { sec: "A", title: "Sentence or fragment?", outOf: 6, band: BAND("6", "5", "4", "0–3"), groups: [
   { title: "Sentence or fragment?", items: [
    { q: "Lina hums a song.", a: "S" }, { q: "When the bus comes.", a: "F" },
    { q: "My brother reads a book.", a: "S" }, { q: "The cold window in the morning.", a: "F" }] },
   { title: "Fix the fragments", items: [
    { q: "When the bus comes.", a: "I get on when the bus comes.", note: "Any complete sentence is right." },
    { q: "The cold window in the morning.", a: "The window is cold in the morning.", note: "Any complete sentence is right." }] }] },
  { sec: "B", title: "Joining ideas", outOf: 6, band: BAND("6", "5", "4", "0–3"), groups: [
   { title: "Joining ideas", items: [
    { q: "I stay home ( ? ) I am sick.", a: "because" }, { q: "It was cold, ( ? ) I wore a coat.", a: "so" },
    { q: "The soup is hot, ( ? ) it is not spicy.", a: "but" }, { q: "Lina reads, ( ? ) her brother plays.", a: "and" }] },
   { title: "Join the pair", items: [
    { q: "The kitchen smells good. Grandmother is cooking.", a: "The kitchen smells good because Grandmother is cooking.", m: 2, note: "+1 because · +1 no comma before because" }] }] },
  { sec: "C", title: "Capitals and openings", outOf: 6, band: BAND("6", "5", "4", "0–3"), groups: [
   { title: "Capitals", items: [
    { q: "my family lives in burnaby.", a: "My family lives in Burnaby." },
    { q: "on friday i go to the library.", a: "On Friday I go to the library.", note: CAPS }] },
   { title: "Start it differently", items: [
    { q: "The bus comes at eight.", a: "In the morning, the bus comes at eight.", m: 2, note: OPEN },
    { q: "I do my homework after dinner.", a: "After dinner, I do my homework.", m: 2, note: OPEN }] }] },
  { sec: "D", title: "Edit the paragraph", outOf: 6, band: BAND("6", "5", "4", "0–3"),
    para: "on Saturday, Lina goes to the market with her grandmother. The market is busy but it is fun. Grandmother buy an onion and some fish. Because they need dinner. Lina carry the bags",
    fixed: "[On] Saturday, Lina goes to the market with her grandmother. The market is [busy, but] it is fun. Grandmother [buys] an onion and some fish [because they need dinner.] Lina [carries] the [bags.]",
    paraNote: "Six mistakes. Careful: “an onion” is already right.",
    groups: [{ title: "The six fixes", fix: true, items: [
    { q: "on Saturday", a: "On Saturday" }, { q: "busy but it", a: "busy, but it" }, { q: "Grandmother buy", a: "Grandmother buys" },
    { q: "fish. Because they need dinner.", a: "fish because they need dinner." }, { q: "Lina carry", a: "Lina carries" },
    { q: "the bags", a: "the bags.", note: "the end mark" }] }] } ] } };

const unit = {
 "1A": { lvl: "ELL 1", partA: 40, partB: 20, total: 60, sections: [
  { sec: "A", title: "Vocabulary", outOf: 8, band: BAND("7–8", "6", "5", "0–4"), groups: [{ items: [
    { q: "a machine that plays music is a ___", a: "radio" }, { q: "hot water in the air is ___", a: "steam" },
    { q: "your mother’s or father’s mother is your ___", a: "grandmother" }, { q: "a boy in your family is your ___", a: "brother" },
    { q: "the name for a describing word like warm or loud: ___", a: "adjective" }, { q: "to feel something with your skin is to ___", a: "touch" },
    { q: "to notice a sound with your ears is to ___", a: "hear" }, { q: "a small, exact thing you notice is a ___", a: "detail" }] }] },
  { sec: "B", title: "am, is or are", outOf: 8, band: BAND("7–8", "6", "5", "0–4"), groups: [
   { title: "am, is or are", items: [
    { q: "Lina ___ from Manila.", a: "is" }, { q: "My grandmother and I ___ in the kitchen.", a: "are" }, { q: "I ___ happy on Sunday.", a: "am" },
    { q: "The radio ___ on the shelf.", a: "is" }, { q: "My friends ___ in Room 148.", a: "are" }, { q: "It ___ cold today.", a: "is" }] },
   { title: "Pronoun + am, is or are", items: [
    { q: "my brother → ___", a: "He is" }, { q: "my friends and I → ___", a: "We are" }] }] },
  { sec: "C", title: "a, an or the", outOf: 6, band: null, w11: "after", groups: [{ items: [
    { q: "There is ___ orange in the bag.", a: "an" }, { q: "___ sun is hot today.", a: "The" }, { q: "There is ___ cup on the table.", a: "a" },
    { q: "It is ___ old umbrella.", a: "an" }, { q: "___ rice in the pan is ready.", a: "The" }, { q: "I have ___ sister.", a: "a" }] }] },
  { sec: "D", title: "Place words", outOf: 6, w11: BAND("11–12", "9–10", "8", "0–7"), groups: [{ items: [
    { q: "The clock is ___ the wall.", a: "on" }, { q: "The cat hides ___ the bed. I cannot see it.", a: "under" },
    { q: "I sit ___ my friend in class.", a: "next to", note: "beside is right too." }, { q: "The milk is ___ the fridge.", a: "in" },
    { q: "The window is ___ the door.", a: "next to", note: "beside is right too." }, { q: "My books are ___ my bag.", a: "in" }] }] },
  { sec: "E", title: "and, but or so", outOf: 6, band: BAND("6", "5", "4", "0–3"), groups: [{ items: [
    { q: "It was raining, ( ? ) I took an umbrella.", a: "so" }, { q: "My room is small, ( ? ) it is bright.", a: "but" },
    { q: "Lina cooks rice, ( ? ) her brother sets the table.", a: "and" }, { q: "I was tired, ( ? ) I went to bed early.", a: "so" },
    { q: "I like math, ( ? ) I do not like science.", a: "but" }, { q: "The radio is old ( ? ) loud.", a: "and" }] }] },
  { sec: "F", title: "Capitals and end marks", outOf: 6, band: BAND("6", "5", "4", "0–3"), groups: [{ items: [
    { q: "lina lives in richmond", a: "Lina lives in Richmond." }, { q: "is it sunday today", a: "Is it Sunday today?" },
    { q: "my brother and i cook", a: "My brother and I cook." }, { q: "where is the radio", a: "Where is the radio?" },
    { q: "we go to school on monday", a: "We go to school on Monday." }, { q: "wow, the soup is hot", a: "Wow, the soup is hot!", note: "A full stop ( . ) is right too." }] }] } ] },
 "2A": { lvl: "ELL 2", partA: 36, partB: 24, total: 60, sections: [
  { sec: "A", title: "Sentence or fragment?", outOf: 8, band: BAND("7–8", "6", "5", "0–4"), groups: [
   { title: "Sentence or fragment?", items: [
    { q: "Lina stirs the rice.", a: "S" }, { q: "Because the radio is loud.", a: "F" }, { q: "The plates on the table.", a: "F" },
    { q: "My grandmother hums a song.", a: "S" }, { q: "When the rice is ready.", a: "F" }, { q: "Her brother asks questions.", a: "S" }] },
   { title: "Fix the fragments", items: [
    { q: "The plates on the table.", a: "The plates are on the table.", note: "Any complete sentence is right." },
    { q: "Because the radio is loud.", a: "I cannot hear Lina because the radio is loud.", note: "Any complete sentence is right." }] }] },
  { sec: "B", title: "Joining ideas", outOf: 10, band: BAND("9–10", "8", "6–7", "0–5"), groups: [
   { title: "Joining ideas", items: [
    { q: "Lina is happy ( ? ) it is Sunday.", a: "because" }, { q: "The radio is old, ( ? ) it still works.", a: "but" },
    { q: "It was late, ( ? ) we ate dinner quickly.", a: "so" }, { q: "Grandmother cooks the rice, ( ? ) Lina sets the table.", a: "and" }] },
   { title: "Join the pair", items: [
    { q: "I love Sundays. My family eats together.", a: "I love Sundays because my family eats together.", m: 2, note: "+1 because · +1 no comma before because" },
    { q: "The rice was ready. We sat down.", a: "The rice was ready, so we sat down.", m: 2, note: "+1 so · +1 the comma before so" },
    { q: "The kitchen is small. Everyone fits.", a: "The kitchen is small, but everyone fits.", m: 2, note: "+1 but · +1 the comma before but" }] }] },
  { sec: "C", title: "Capitals and openings", outOf: 8, band: BAND("7–8", "6", "5", "0–4"), groups: [
   { title: "Capitals", items: [
    { q: "on sunday we visit vancouver.", a: "On Sunday we visit Vancouver.", note: CAPS },
    { q: "i think maria likes canada.", a: "I think Maria likes Canada." },
    { q: "her brother goes to richmond secondary.", a: "Her brother goes to Richmond Secondary." },
    { q: "we speak tagalog and english at home.", a: "We speak Tagalog and English at home." }] },
   { title: "Start it differently", items: [
    { q: "Lina tastes the rice.", a: "First, Lina tastes the rice.", m: 2, note: OPEN },
    { q: "The kitchen is quiet after dinner.", a: "After dinner, the kitchen is quiet.", m: 2, note: OPEN }] }] },
  { sec: "D", title: "Edit Lina’s paragraph", outOf: 10, band: BAND("9–10", "8", "6–7", "0–5"),
    para: "every Sunday, Lina cooks with her grandmother in their kitchen in richmond. The kitchen is small but it is warm. Lina’s brother ask a hundred questions. Because he is curious. Grandmother puts an bowl of rice on the table. After dinner the family listen to the radio. Lina is happy, because this is her favourite day",
    fixed: "[Every] Sunday, Lina cooks with her grandmother in their kitchen in [Richmond]. The kitchen is [small, but] it is warm. Lina’s brother [asks] a hundred [questions because he is curious.] Grandmother puts [a bowl] of rice on the table. [After dinner, the] family [listens] to the radio. Lina is [happy because] this is her favourite [day.]",
    paraNote: "Ten mistakes. A new mistake costs 1 mark.",
    groups: [{ title: "The ten fixes", fix: true, items: [
    { q: "every Sunday", a: "Every Sunday" }, { q: "in richmond", a: "in Richmond" }, { q: "small but it", a: "small, but it" },
    { q: "brother ask", a: "brother asks" }, { q: "questions. Because he is curious.", a: "questions because he is curious." },
    { q: "an bowl", a: "a bowl" }, { q: "After dinner the", a: "After dinner, the" }, { q: "the family listen", a: "the family listens" },
    { q: "happy, because", a: "happy because" }, { q: "favourite day", a: "favourite day.", note: "the end mark" }] }] } ] } };

// Part B — rubric lines as printed on ELL12_U01_CompositionRubric_v1 (levels Not Yet -> Fully), marks per test.
const RUB = {
 W1a: ["W1 · Simple sentences", ["Few complete sentences; mostly words or phrases.", "Some complete sentences; a subject or a verb is often missing.", "Most sentences are complete, with a subject and a verb.", "Every sentence is complete and clear."]],
 W2a: ["W2 · Joining with and, but, so", ["No joined sentences.", "Tries to join ideas; the joining word often does not fit.", "Joins ideas correctly with and, but or so at least twice.", "Joins ideas with and, but and so, choosing the word that fits the meaning each time."]],
 W5a: ["W5 · Capitals and end marks", ["Capitals and end marks are mostly missing.", "Some sentences start with a capital and end with an end mark.", "Most sentences start with a capital and end with . ? or !; names and I have capitals.", "All capitals and end marks are correct, including names, places, days and I."]],
 W7a: ["W7 · Describing words", ["Very few words; the same words repeat.", "Some unit words; flat words such as nice or good.", "Uses unit words and adjectives to describe things.", "Uses a range of unit words and exact adjectives or sense words."]],
 W3b: ["W3 · Beginning, middle, end", ["No clear beginning or end; ideas are a list.", "Has a beginning or an end, but not both; the middle is thin.", "The first sentence names the place, the middle gives details, the last sentence closes.", "A clear opening, well-ordered details, and an ending that says why the place matters."]],
 W1b: ["W1 · Complete sentences", ["Many fragments.", "Several fragments.", "One or two fragments at most.", "No fragments; every sentence is complete."]],
 W2b: ["W2 · Connecting ideas", ["Ideas are not joined.", "Joins with and only, or the joining words do not fit.", "Uses and, but, so and because correctly, with a comma before but and so.", "Joins ideas with a variety of joining words; every comma is correct, never before because."]],
 W7b: ["W7 · Capitals and punctuation", ["Frequent capital and punctuation errors.", "Capitals start sentences, but proper nouns or end marks are often missing.", "Proper nouns have capitals, end marks are correct, and there is a comma after an opening.", "All capitals and punctuation are correct, including commas after openings."]] };
const partB = {
 practice: {
  "1A": { task: "My bedroom", out: 12, crit: ["W1a", "W2a", "W5a", "W7a"], marks: [0, 1, 2, 3],
    musts: ["Use a place word in every sentence.", "Join two ideas with and, but or so in ONE sentence.", "Use an adjective in every sentence.", "Capital letter at the start, end mark at the end."],
    good: "My small bed is next to the window. A soft rug is on the floor, and it is warm. My old desk is beside the door." },
  "2A": { task: "My bedroom", out: 16, crit: ["W3b", "W1b", "W2b", "W7b"], marks: [1, 2, 3, 4],
    musts: ["Beginning: name the room and say one thing about it.", "Middle: three details — where things are and a sense detail.", "End: say what the room is like for you.", "Use because once and but or so once. No fragments."],
    good: "My bedroom is small, but it is my favourite room. My bed is under the window, so I wake up with the sun. A blue rug is on the floor beside my desk. At night, I hear the rain on the glass. My room feels calm because it is only mine." } },
 unit: {
  "1A": { task: "Room 148", out: 20, crit: ["W1a", "W2a", "W5a", "W7a"], marks: [2, 3, 4, 5], zero: true,
    musts: ["Use a place word (in, on, under, next to, beside) in every sentence.", "Join two ideas with and, but or so in at least TWO sentences.", "Use at least TWO adjectives (describing words).", "Start every sentence with a capital letter. End it with . ? or !"],
    good: "Room 148 is in our school, and it is a bright room. The white board is on the front wall. My desk is next to the window. A small clock is beside the door, but it is slow. Our books are on the tall shelf, so we can read in class." },
  "2A": { task: "Room 148", out: 24, crit: ["W3b", "W1b", "W2b", "W7b"], marks: [3, 4, 5, 6], zero: true,
    musts: ["Beginning: your first sentence names the room and says one thing about it.", "Middle: at least FOUR details — where things are and what you see, hear or feel.", "End: your last sentence says what the room is like for you.", "Use because once, and but or so once. Start one sentence with an opening and a comma.", "No fragments. Check every capital and end mark."],
    good: "Room 148 is a small classroom, but thirty students fit in it. The teacher’s desk is at the front, next to the big white board. Long windows are on the left wall, so the room is bright. In the afternoon, I can hear the clock tick above the door. My chair is hard and cold, and it makes a loud sound on the floor. Room 148 is a good place for me because I learn new words here every day." } } };

module.exports = { practice, unit, RUB, partB };
