// ENG8 U1 — Reading Practice 1 (front of Lesson 7, ~25 min). Standalone sheet + short deck. Built with build.sh.
module.exports = {
 course: "ENG8",
 meta: { unit: 1, unitTitle: "The Stories We Tell", lesson: "7a", title: "Reading Practice 1", subtitle: "Reading like a writer — guided", month: "October" },
 banner: {
  obj: "Apply predicting, questioning, visualizing and inferring to a short narrative, and answer questions about it with evidence.",
  std: "Comprehend & Connect: apply reading strategies to comprehend text  ·  recognize how literary elements shape meaning",
  lit: ["COM", "TH"]
 },
 plan: {
  objective: "Apply predicting, questioning, visualizing and inferring to a short narrative, and answer questions about it with evidence.",
  outcomes: "Apply reading strategies to comprehend text  •  Identify character and setting",
  materials: "Reading Practice 1 sheet (one per student, two pages: passage + questions) · this short deck (answer key on the slides) · pencils. Nothing is collected: students mark their own against the key.",
  timing: "about 25 minutes, at the front of Lesson 7",
  steps: [
   ["2", "Why we are doing this", "Say it plainly: Section A of the unit test is reading comprehension on a passage you have never seen — the same five question shapes as this sheet. Today is practice, together; nothing is graded."],
   ["5", "Read ‘The Fourth Chair’", "Students read the passage once straight through on the sheet. On the second read, with a pencil, they underline one detail they can picture and put a ? beside anything confusing. Passage is also on the slides in full."],
   ["4", "Part A, example and question 1 together", "The example (where and when) is already answered on the sheet — read it aloud and point out that it gives BOTH place and time. Do question 1 as a class: what is the narrator about to do? Take answers, then reveal."],
   ["8", "Part A, questions 2–4 on their own", "Students answer 2 (copy a detail that shows the feeling), 3 (one inference plus the words that prove it) and 4 (a prediction plus the reason from the text). Circulate. The inference frame is on the sheet: I can tell ___ because the passage says ‘___’."],
   ["4", "Reveal and self-mark", "Reveal the key one answer at a time. Students tick or fix their own answers. For question 3, any inference that carries a quoted detail counts; for 4, any prediction tied to something in the passage counts."],
   ["2", "Part B: which strategy helped most", "One or two sentences. Take two answers aloud. Then Part C tick-boxes, and straight into Lesson 7."]
  ],
  diff: "SUPPORT: read the passage aloud once before the silent read; sentence frames for questions 3 and 4 are on the sheet; a line number with key words is a full answer for question 2. EXTENSION: question 3 — give a second piece of evidence for the same inference; question 4 — write the next sentence of the story yourself.",
  assess: "Formative only — nothing is marked. Watch for: inferences with no quoted evidence; predictions with no reason; students who copy a whole sentence for question 2 instead of the detail that does the work.",
  homework: "None.",
  watch: "Students answering question 3 with a fact from the page instead of something worked out; students who say ‘visualizing’ for Part B without naming what they pictured."
 },
 shape: [
  ["Why we are doing this", "mini-lesson"],
  ["Read ‘The Fourth Chair’", "silent reading"],
  ["Part A, example and question 1", "together"],
  ["Part A, questions 2–4", "independent"],
  ["Self-mark against the key", "together"],
  ["Parts B and C", "quick write"],
  ["Then: Lesson 7", "—"]
 ],
 sequence: [
  { type: "title", label: "Reading Practice 1" },
  { type: "goals", label: "Why we are doing this", items: [
    "Section A of the unit test is reading comprehension on a passage you have never seen.",
    "It uses the same five question shapes as this sheet.",
    "Today is practice, together. Nothing is graded." ] },
  { type: "handout", label: "Hand out the sheet", note: "Name and date at the top. Read the passage first — the example question is already answered for you.", foot: "You keep this sheet. Nothing is collected today." },
  { type: "rows", label: "Read the passage", tag: "Reading", head: "Read ‘The Fourth Chair’", icon: "icon-read.png", big: "Read twice.",
    rows: [
     ["First read", "Straight through. Do not stop."],
     ["Second read", "With a pencil. Underline one detail you can picture."],
     ["?", "Put a question mark beside anything that confused you."] ] },
  { type: "text", text: "passage", label: "The passage", continues: "The passage continues" },
  { type: "walk", part: "A" },
  { type: "reveals", part: "A" },
  { type: "walk", part: "B" },
  { type: "reveals", part: "B" },
  { type: "walk", part: "C" },
  { type: "next", label: "Then", title: "Lesson 7 starts now", sub: "Setting and atmosphere. Keep this sheet in your duotang." }
 ],
 worksheet: {
  text: "passage",
  objective: "Apply predicting, questioning, visualizing and inferring to a short narrative, and answer questions about it with evidence.",
  outcomes: "Apply reading strategies to comprehend text  •  Identify character and setting and explain a choice the writer made",
  parts: [
   { id: "A", title: "On the page, and underneath it", kind: "lines", lines: 2,
     instr: "Use ‘The Fourth Chair’. Answer in full sentences. The example and questions 1–2 are on the page; questions 3–4 you work out from clues, and you must show the clue.",
     box: { title: "How questions 3 and 4 work", body: "An inference is something the passage suggests but does not say. A prediction is what you think happens next. Both need evidence: what you think, AND the words that made you think it.", frame: "Frame:  I can tell _____ because the passage says “_____”.   /   I predict _____ because _____." },
     example: { text: "Where and when does this moment take place? Give both.", ans: "At the table in the new apartment, on the first night after the move (lines 1–5)." },
     items: [
      { text: "What is the narrator about to do?", ans: "Eat the first dinner in the new apartment with Dad and his brother (lines 5–7)." },
      { text: "Find one detail that shows how the narrator is feeling, and copy it.", ans: "“I kept my hands under the table so nobody would see them pick at the skin around my thumb” (lines 11–12)." },
      { text: "Make ONE inference about the narrator’s family, and give the evidence for it.", lines: 3, ans: "I can tell someone in the family is missing, because the passage says Dad “set four places, the way he always did, and then stood looking at the fourth one for a long time” (lines 7–9)." },
      { text: "Predict what the narrator will do about the fourth chair, and explain what in the passage makes you think so.", lines: 3, ans: "I predict they will leave the chair where it is, because the passage says “nobody moved it. I don’t think any of us could have” (line 17)." }
     ],
     how: "Questions 1–2: the answer is written in the passage — find it, write it as a full sentence, and give the line. Questions 3–4: say what you think, then copy the words that made you think it. Use the frames in the box." },
   { id: "B", title: "Your reading strategies", kind: "lines", lines: 3,
     instr: "Predicting, questioning, visualizing, inferring. Answer in full sentences.",
     example: { text: "Which strategy helped you understand this passage best? Say which, and say what you did with it.", ans: "Visualizing helped me most. I pictured the four plates and the empty chair, and that is when I understood why Dad went quiet." },
     items: [
      { text: "Which strategy helped YOU most, and what did you do with it?", ans: "Inferring helped me most. The passage never says who is missing, but the fourth place and Dad staring at it told me." },
      { text: "Write one question you asked yourself while reading. Did the passage answer it?", ans: "I wondered who the fourth chair was for. The passage never answers it directly, which is the point." },
      { text: "Pick one detail you could picture. What did it make you feel about the family?", lines: 2, ans: "The plates moving when the bus went past made the apartment feel thin and new, like the family does not belong there yet." }
     ],
     how: "Name one strategy and show it; then one question you wondered; then one detail you pictured and what it made you feel. Full sentences." },
   { id: "C", title: "Check", kind: "check",
     instr: "Tick each box you can honestly tick.",
     checks: [
      "I read the whole passage before I started answering.",
      "My answers to 1–2 give the line where I found them.",
      "My inference (question 3) quotes the words that prove it.",
      "My prediction (question 4) gives a reason from the passage.",
      "I named one reading strategy and showed how I used it.",
      "I wrote in full sentences." ],
     how: "Read each line. Tick it only if it is true of the work on this sheet." }
  ]
 },
 texts: {
  passage: { title: "The Fourth Chair", lines: [
   "The apartment still smelled like the people who had lived there before us —",
   "somebody’s cooking, somebody’s dog. Dad said the smell would go in a week. The",
   "boxes were stacked against the wall with my brother’s handwriting on them, KITCHEN",
   "and BOOKS and one that just said STUFF, and we ate off paper plates because nobody",
   "could find the real ones. It was the first night. Dad made the only thing he knows",
   "how to make, which is pasta with the sauce from the jar, and he carried it to the",
   "table like it was something he had been working on all day. He had set four",
   "places, the way he always did, and then stood looking at the fourth one for a long",
   "time. The fourth chair sat there with nobody in it. My brother talked about his",
   "new school, and then about a video, and then about nothing, the way he does when a",
   "room gets too quiet. I kept my hands under the table so nobody would see them pick",
   "at the skin around my thumb. Outside, a bus went past and shook the window a",
   "little, and for a second the plates on the table moved by themselves. “It’s good,”",
   "I said about the pasta, which was not true, and Dad said, “Yeah?” like I had given",
   "him something. Then he got up to find the salt that we did not have, and my",
   "brother kept talking, and I looked at the fourth place — the plate, the fork, the",
   "chair pushed in neat — and nobody moved it. I don’t think any of us could have.",
   "Later, when the dishes were done and the paper plates were in the bag, the chair",
   "was still there. It was still there in the morning." ],
   words: [ ["pick at", "to pull at something with your fingers, often without noticing"], ["neat", "tidy; carefully in place"] ] }
 }
};
