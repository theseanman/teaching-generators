// ENG8 U3 L02 — In Her Own Words. ALL content here; the renderer holds the design.
// Unit 3 "First Peoples Voices" — REPLANNED Nov 20 2026: no class set of My Name Is Seepeetza exists (the August bookroom
// screenshot was a catalogue list only). Sean approved: Phyllis Webstad's first-person account ("Phyllis' story, in her own
// words", orangeshirtday.org/phyllis-story/) paired with the Lesson 1 background reading, for a three-paragraph response.
// Unit shape (Sean's go "let's build it", Nov 20): L1 background (taught Nov 20) · L2 this · L3 how she tells it ·
// L4 plan the response · L5 good copy · unit test. Dates are Claude's rotation count, not a calendar: L2 Wed Nov 25,
// L3 Fri Nov 27, L4 Tue Dec 1, L5 Thu Dec 3, unit test Mon Dec 7. So this lesson is four classes from the test.
// COPYRIGHT: the Orange Shirt Society page is "All Rights Reserved". Her story is NOT reprinted on slides or the worksheet
// (exception to the texts-in-full order, told to Sean Nov 19). It is read from the website, projected. The deck shows only
// the first three words of each paragraph as a paragraph guide.
// Content facts about her story were read from the page Nov 20 2026. Paragraph 4 mentions she had her son at 13, in Grade 8;
// paragraph 5 mentions a treatment centre. Both are on the plan slide so Sean is not surprised in front of the class.
// CURRICULUM CHECK, BC ELA 8: Comprehend & Connect — the role of story in expressing First Peoples perspectives; perspectives
// and contexts in texts; protocols and ownership (she chose to share her story). Uses Lesson 1's reading as a second source.
// Build: bash build.sh lessons/ENG8_U03_L02.js v1 v1
const BG = [
  "For more than a hundred years, Canada sent First Nations, Inuit and Métis children away from their families to live at schools called residential schools. About 150,000 children attended them.",
  "The Government of Canada paid for the schools, and churches ran them. The federal system was built from the 1880s, and the last school closed in 1997.",
  "The goal was to assimilate the children: to make them give up their own languages, beliefs and ways of life. Children were forbidden to speak their own languages, even in letters to their parents.",
  "Many children did not see their families for years. Parents who kept their children at home could be fined or sent to prison. Brothers and sisters were often separated, because boys and girls were kept apart.",
  "The food was poor, and there was not enough of it. Sickness spread quickly. Punishment was often harsh, and many children were abused. Thousands of children died at the schools.",
  "In 2008, Prime Minister Stephen Harper apologized for the schools. In 2015, the Truth and Reconciliation Commission published its final report.",
  "The records kept by the government and the churches tell the side of the people who ran the schools. The children’s side comes from Survivors: people who attended the schools and lived to tell what happened there. Their first-person accounts are called testimony."];
const BG_WORDS = [["federal", "belonging to the government of the whole country"],
  ["forbidden", "not allowed"], ["separated", "kept apart"], ["apologized", "said sorry for something wrong"],
  ["commission", "a group given the job of finding out the truth about something"]];
const vocab = [
  ["reserve", "land set aside by the government for a First Nation"],
  ["mission", "here, a residential school run by a church"],
  ["outfit", "a set of clothes worn together"],
  ["stripped", "had your clothes taken off you"],
  ["worthless", "feeling you have no value"],
  ["insignificance", "the feeling that you do not matter"],
  ["ingrained", "fixed deep inside you, hard to remove"],
  ["treatment centre", "a place where people go to get help and heal"],
  ["healing", "getting better in body, mind or spirit"],
  ["honoured", "proud and thankful to be able to do something"]];
const GUIDE = [["1", "“I went to…”"], ["2", "“When I got to…”"], ["3", "“The color orange…”"],
  ["4", "“I was 13…”"], ["5", "“I went to a…”"], ["6", "“I am honored…”"]];
module.exports = {
 course: "ENG8",
 meta: { unit: 3, unitTitle: "First Peoples Voices", lesson: 2, title: "In Her Own Words",
   subtitle: "Phyllis Webstad’s story, and the shirt that carries it", month: "November" },
 banner: { obj: "Say what happened to Phyllis Webstad, and explain how one detail carries her whole story.",
   std: "Comprehend & Connect: First Peoples story  ·  perspectives  ·  two sources", lit: ["COM", "TH", "PS"] },
 countdown: "Unit test in four classes",
 plan: {
  objective: "Students read Phyllis Webstad’s own account, say what happened to her with paragraph numbers, and explain how the orange shirt carries her story, linking it to the Lesson 1 reading.",
  outcomes: "Comprehend & Connect: First Peoples story · perspectives in texts · two sources",
  schwerpunkt: "one small detail can carry a whole story: the shirt is her granny’s love, what the school took, and how it made her feel. Won in Part C.",
  schwerStep: 10,
  materials: "Projector with orangeshirtday.org/phyllis-story/ open (not reprinted: rights reserved) · worksheet, one each · Lesson 1 sheets. Her story mentions having a son at 13 (para 4) and a treatment centre (para 5): read them plainly, no discussion needed.",
  timing: "80 minutes",
  steps: [
   ["8", "Warm-up — your Lesson 1 exit ticket", "Students reread their Lesson 1 exit ticket answer: why does it matter who tells a story? Take three answers. Then: what is testimony? Land on: a first-person account by someone who was there. Today we read one."],
   ["2", "Goals", "Read the three goals. Say the unit test is in four classes and the next four lessons build to it."],
   ["8", "Vocabulary — match the word", "Ten words from today’s story against their meanings, revealed one at a time, then the summary slide. Lock in: stripped, worthless, ingrained."],
   ["3", "Meet Phyllis", "She is a Survivor, from the Dog Creek reserve. Her orange shirt is why Orange Shirt Day happens every September 30. She chose to share her story so that others could learn."],
   ["2", "Before we read and the paragraph guide", "Same note as Lesson 1: talk to me any time. Then the guide: her story has six paragraphs; the slide shows how each one starts so students can give paragraph numbers."],
   ["12", "Read “Phyllis’ story, in her own words”", "Project the website. Read it aloud once while students listen. Read it a second time while students follow and find where each paragraph starts (the starters are also printed in Part B). Leave the page on the screen for Parts A and B."],
   ["6", "Part A — vocabulary", "Six blanks from a nine-word bank, example done, two extra words. Reveal one at a time."],
   ["11", "Part B — what happened?", "Five answers in complete sentences with Phyllis’s paragraph number. Each has one right answer. Keep her page on the screen. Reveal one at a time."],
   ["5", "Teaching — one detail carries the story", "The shirt is new, bright and chosen by her granny; it is taken on the first day; today orange means she did not matter. One object holds home, loss and feeling. Then Orange Shirt Day."],
   ["12", "Part C — two sources", "★ Schwerpunkt. Two answers linking Phyllis to the Lesson 1 reading, each with both paragraph numbers. Personal answers: show one good example only. This is the thinking the three-paragraph response will need."],
   ["5", "Partner talk — why the shirt?", "Partners use the frames: why does she tell it through a shirt and not a list of facts?"],
   ["2", "Part D — check your work", "Six tick boxes. Insist on paragraph numbers in Parts B and C."],
   ["4", "Exit ticket, next class and agendas", "Part F: one detail you will remember, and why. Next class: how she tells it. Agendas: unit test in four classes; bring both worksheets."]],
  diff: "Support: Part B with a partner, the paragraph to look in said aloud (1, 1, 2, 3, 4, 6 for the example and questions). Extension: in Part C, add a third link — what does the number 150,000 hide that her story shows?",
  assess: "Formative only. Listen for Part C: can students connect a fact from the reading to a moment in her story without retelling?",
  homework: "None. Bring both Unit 3 worksheets next class.",
  watch: "Students who laugh at paragraph 4: move on calmly; it is part of her testimony. Answers in Part B with no paragraph number. In Part C, retelling instead of linking. Anyone who goes quiet or upset: check in privately." },
 shape: [["Your Lesson 1 exit ticket", "warm-up"], ["Today’s goals", "reading together"],
   ["Match the word", "vocabulary game"], ["Meet Phyllis Webstad", "instruction"],
   ["Phyllis’ story, in her own words", "reading together"], ["Part A — vocabulary", "worksheet"],
   ["Part B — what happened?", "worksheet"], ["One detail carries the story", "instruction"],
   ["Part C — two sources", "worksheet"], ["Why the shirt?", "partner talk"],
   ["Part D — check your work", "tick boxes"], ["Exit ticket", "quick write"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "warmup", label: "Warm-up", head: "Warm-up — your Lesson 1 exit ticket",
    prompts: ["Reread your Lesson 1 exit ticket: why does it matter who tells a story?",
      "Be ready to read your answer aloud.",
      "Then: what is testimony?"] },
  { type: "goals", label: "Today’s goals", items: [
    "Say what happened to Phyllis Webstad.",
    "Explain how one detail carries her story.",
    "Link her story to the Lesson 1 reading."] },
  { type: "match", label: "Match the word", head: "Match the word to its meaning",
    bank: ["healing", "worthless", "outfit", "honoured", "reserve", "ingrained", "mission", "treatment centre", "stripped", "insignificance"],
    words: vocab },
  { type: "vocab", label: "Key vocabulary", head: "Key vocabulary", words: vocab },
  { type: "rows", label: "Meet Phyllis Webstad", tag: "Today’s author", head: "Meet Phyllis Webstad", icon: "icon-book.png", rows: [
    ["Who", "A Survivor. She grew up with her grandmother on the Dog Creek reserve, in BC."],
    ["When", "She went to residential school at six, for one year."],
    ["Why we know", "She chose to tell her story so that others can learn from it."],
    ["September 30", "Her orange shirt is why we have Orange Shirt Day."]] },
  { type: "handout", label: "Your worksheet", note: "The Lesson 1 reading is on page 1 again. Phyllis’s story stays on the screen: it is not printed.",
    foot: "Keep your Lesson 1 worksheet too." },
  { type: "rows", label: "Before we read", tag: "Before we read", head: "Before we read", icon: "icon-hand.png", rows: [
    ["Her story", "Phyllis tells about her first day at residential school and what happened after."],
    ["Talk to me", "If it brings something up for you, talk to me after class, any day."],
    ["Any time", "Kids Help Phone: 1-800-668-6868, or text CONNECT to 686868."]] },
  { type: "rows", label: "Paragraph guide", tag: "Paragraph guide", head: "Her story has six paragraphs", rows: GUIDE },
  { type: "rows", label: "Read it", tag: "Reading together", head: "Read it twice", icon: "icon-read.png", rows: [
    ["Where", "orangeshirtday.org/phyllis-story/"],
    ["First time", "Listen. Pencils down."],
    ["Second time", "Follow along. Find where each of the six paragraphs starts."]] },
  { type: "walk", part: "A" },
  { type: "reveals", part: "A" },
  { type: "walk", part: "B", note: "One complete sentence each, with Phyllis’s paragraph number." },
  { type: "reveals", part: "B" },
  { type: "cards", label: "One detail carries the story", tag: "Teaching", head: "One detail carries the story",
    icon: "icon-read.png", big: "Why a shirt?", cards: [
    { title: "Before", body: "New, bright, and chosen by her granny: love and home." },
    { title: "First day", body: "Taken from her, and never given back." },
    { title: "Today", body: "Orange reminds her that she did not matter.", tone: "teal" },
    { title: "Every year", body: "September 30: Orange Shirt Day.", tone: "teal" }] },
  { type: "walk", part: "C", note: "Use both sources. Give both paragraph numbers." },
  { type: "reveals", part: "C", good: true },
  { type: "speaking", label: "Why the shirt?", head: "Why the shirt?",
    icon: "icon-friends.png", big: "Talk it through.",
    prompt: "With a partner: why does Phyllis tell her story through one shirt, and not through a list of facts?",
    frames: ["She tells it through the shirt because ______.",
      "A list of facts could not show ______.",
      "I agree / I see it differently, because ______."] },
  { type: "walk", part: "D", note: "Six boxes on your sheet. Tick one only when it is true." },
  { type: "exit", label: "Exit ticket", part: "E", note: "Keep both Unit 3 worksheets. Bring them next class." },
  { type: "nextshape", label: "Next class", head: "Next class: How She Tells It", noCountdown: true, items: [
    ["Unit test in three classes", "countdown"], ["Back to Phyllis’s story", "warm-up"],
    ["How she tells it", "instruction"], ["Her voice", "worksheet"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Countdown", "Unit test in four classes."],
    ["Bring", "Both Unit 3 worksheets."],
    ["Next class", "How she tells it. Friday, November 27."]] }],
 texts: { bg: { title: "What Were Residential Schools? (from Lesson 1)", lines: BG, words: BG_WORDS, unit: "paragraph" } },
 worksheet: {
  objective: "Say what happened to Phyllis Webstad, and explain how one detail carries her whole story.",
  outcomes: "Comprehend & Connect: the role of story in First Peoples perspectives  •  perspectives in texts  •  using two sources",
  text: "bg",
  parts: [
   { id: "A", title: "Vocabulary", kind: "cloze", weight: 6, bankCols: 3,
     instr: "Fill each blank with a word from the word bank. Each word is used once. Two words are extra. Cross out each word as you use it.",
     bank: ["healing", "worthless", "outfit", "reserve", "ingrained", "mission", "stripped", "honoured", "insignificance"],
     crossed: ["outfit"],
     example: { text: "Her granny bought her a new school", ans: "outfit", tail: "" },
     items: [
      { text: "Land set aside for a First Nation is a", ans: "reserve", tail: "" },
      { text: "At the school, her clothes were taken: she was", ans: "stripped", tail: "" },
      { text: "Feeling you have no value is feeling", ans: "worthless", tail: "" },
      { text: "A feeling fixed deep inside you is", ans: "ingrained", tail: "" },
      { text: "Getting better in body, mind or spirit is", ans: "healing", tail: "" },
      { text: "A residential school run by a church is a", ans: "mission", tail: "" }],
     how: "Read the whole sentence before you choose, then cross the word out of the bank. Two words are left over — that is meant to happen." },
   { id: "B", title: "What happened?", kind: "lines", weight: 11, lines: 2,
     instr: "Answer in one complete sentence. Give Phyllis’s paragraph number. Her paragraphs start: 1 “I went to” · 2 “When I got to” · 3 “The color orange” · 4 “I was 13” · 5 “I went to a” · 6 “I am honored”.",
     example: { text: "How old was Phyllis when she went to the Mission?", ans: "She was six years old (Phyllis, paragraph 1)." },
     items: [
      { text: "Who bought Phyllis the orange shirt?", ans: "Her granny bought it for her (Phyllis, paragraph 1)." },
      { text: "What happened to the shirt at the Mission?", ans: "It was taken, and she never wore it again (Phyllis, paragraph 2)." },
      { text: "What does the colour orange remind her of?", ans: "It reminds her that her feelings did not matter (Phyllis, paragraph 3)." },
      { text: "Why did she have no example of how to raise a child?", ans: "Her mother and granny went to residential school for ten years (Phyllis, paragraph 4)." },
      { text: "Why does she tell her story?", ans: "She tells it so that others can learn from it (Phyllis, paragraph 6)." }],
     how: "Find the paragraph on the screen first, then answer in your own words. Put “(Phyllis, paragraph _)” at the end." },
   { id: "C", title: "Two sources", kind: "lines", weight: 12, lines: 3,
     instr: "Link Phyllis’s story to the Lesson 1 reading on page 1. Answer in one or two sentences. Give both paragraph numbers.",
     example: { text: "The reading says the schools tried to make children give up their ways of life. What happened to Phyllis that shows this?", ans: "On her first day, they took the clothes her granny gave her (Phyllis, paragraph 2; reading, paragraph 3)." },
     items: [
      { text: "The reading says children were kept from their families. How does Phyllis show that the harm lasted for years?", ans: "Her mother and granny also went, so she grew up with no example of parenting (Phyllis, paragraph 4; reading, paragraph 4)." },
      { text: "The reading says about 150,000 children attended. What does Phyllis’s story show that a number cannot?", ans: "It shows how one child felt: that she did not matter (Phyllis, paragraph 3; reading, paragraph 1)." },
      { text: "Phyllis chose to share her story. Which idea in the reading does that match?", ans: "It matches the reading’s idea that Survivors tell the children’s side: her story is testimony (Phyllis, paragraph 6; reading, paragraph 7)." }],
     how: "Say the fact from the reading, then the moment from Phyllis that matches it. Do not just retell: show the link." },
   { id: "D", title: "Check your work", kind: "check",
     instr: "Read your answers back. Tick each box when it is true.",
     checks: ["I crossed out each word I used in Part A.",
       "Every Part B answer is one complete sentence.",
       "Every Part B answer has Phyllis’s paragraph number.",
       "Every Part C answer uses both sources.",
       "Every Part C answer has both paragraph numbers.",
       "I can say what the orange shirt stands for."],
     how: "Tick a box only when it is true. Fix anything you cannot tick before the exit ticket." },
   { id: "E", title: "Exit ticket", kind: "exit", lines: 2,
     instr: "Answer in one sentence.",
     items: [
      { text: "Which one detail from Phyllis’s story will you remember? Why?" }],
     how: "One sentence with “because.” Keep both worksheets and bring them next class." }] }
};
