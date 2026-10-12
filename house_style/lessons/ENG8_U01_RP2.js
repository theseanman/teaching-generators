// ENG8 U1 — Reading Practice 2 (front of Lesson 10, ~25 min). Standalone sheet + short deck. Built with build.sh.
module.exports = {
 course: "ENG8",
 meta: { unit: 1, unitTitle: "The Stories We Tell", lesson: "10a", title: "Reading Practice 2", subtitle: "Reading like a writer — on your own", month: "October" },
 banner: {
  obj: "Apply predicting, questioning, visualizing and inferring to a short narrative, and answer questions about it with evidence.",
  std: "Comprehend & Connect: apply reading strategies to comprehend text  ·  recognize how literary elements shape meaning",
  lit: ["COM", "TH"]
 },
 plan: {
  objective: "Apply predicting, questioning, visualizing and inferring to a short narrative, and answer questions about it with evidence.",
  outcomes: "Apply reading strategies to comprehend text  •  Identify character and setting",
  materials: "Reading Practice 2 sheet (one per student, two pages: passage + questions) · this short deck (answer key on the slides) · pencils. Nothing is collected: students mark their own against the key.",
  timing: "about 25 minutes, at the front of Lesson 10",
  steps: [
   ["2", "Why we are doing this", "Second practice, same five question shapes as Section A of the unit test. Last time we did it together; this time it is on your own, the way the test will be. Still not graded."],
   ["5", "Read ‘Lane Six’", "Students read the passage once straight through on the sheet, then a second time with a pencil: underline one detail they can picture, ? beside anything confusing. Passage is on the slides in full."],
   ["12", "Part A on their own", "The example (where and when) is answered on the sheet. Students answer 1–4 alone: what the narrator is about to do; a copied detail showing the feeling; one inference with the words that prove it; a prediction with a reason from the text. Circulate; no hints on the answers, only on the frames."],
   ["4", "Reveal and self-mark", "Reveal the key one answer at a time. Students tick or fix their own. For question 3 any inference that carries a quoted detail counts; for 4 any prediction tied to the passage counts."],
   ["2", "Part B and Part C", "Three short strategy answers, then the tick-box check. Take one Part B answer aloud, then straight into Lesson 10."]
  ],
  diff: "SUPPORT: read the passage aloud once before the silent read; sentence frames for questions 3 and 4 are on the sheet; a line number with key words is a full answer for question 2. EXTENSION: question 3 — give a second piece of evidence for the same inference; question 4 — write the next sentence of the story yourself.",
  assess: "Formative only — nothing is marked. Watch for: inferences with no quoted evidence; predictions with no reason; students who copy a whole sentence for question 2 instead of the detail that does the work.",
  homework: "None.",
  watch: "Students answering question 3 with a fact from the page instead of something worked out; students who predict a win with no evidence — the passage never says who won."
 },
 shape: [
  ["Why we are doing this", "mini-lesson"],
  ["Read ‘Lane Six’", "silent reading"],
  ["Part A, questions 1–4", "independent"],
  ["Self-mark against the key", "together"],
  ["Parts B and C", "quick write"],
  ["Then: Lesson 10", "—"]
 ],
 sequence: [
  { type: "title", label: "Reading Practice 2" },
  { type: "goals", label: "Why we are doing this", items: [
    "Same five question shapes as Section A of the unit test.",
    "Last time we did it together. This time it is on your own, like the test.",
    "Still practice. Nothing is graded." ] },
  { type: "handout", label: "Hand out the sheet", note: "Name and date at the top. Read the passage first — the example question is already answered for you.", foot: "You keep this sheet. Nothing is collected today." },
  { type: "rows", label: "Read the passage", tag: "Reading", head: "Read ‘Lane Six’", icon: "icon-read.png", big: "Read twice.",
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
  { type: "next", label: "Then", title: "Lesson 10 starts now", sub: "Planning your narrative. Keep this sheet in your duotang." }
 ],
 worksheet: {
  text: "passage",
  objective: "Apply predicting, questioning, visualizing and inferring to a short narrative, and answer questions about it with evidence.",
  outcomes: "Apply reading strategies to comprehend text  •  Identify character and setting and explain a choice the writer made",
  parts: [
   { id: "A", title: "On the page, and underneath it", kind: "lines", lines: 2,
     instr: "Use ‘Lane Six’. Answer in full sentences. The example and questions 1–2 are on the page; questions 3–4 you work out from clues, and you must show the clue.",
     box: { title: "How questions 3 and 4 work", body: "An inference is something the passage suggests but does not say. A prediction is what you think happens next. Both need evidence: what you think, AND the words that made you think it.", frame: "Frame:  I can tell _____ because the passage says “_____”.   /   I predict _____ because _____." },
     example: { text: "Where and when does this moment take place? Give both.", ans: "At a swimming pool, in lane six, just before and during a race (lines 1–3)." },
     items: [
      { text: "What is the narrator about to do?", ans: "Swim a race, starting from the block in lane six (lines 3–4)." },
      { text: "Find one detail that shows how the narrator is feeling, and copy it.", ans: "“I could see my own hands shaking against the white paint” (lines 4–5)." },
      { text: "Make ONE inference about how the race went for the narrator, and give the evidence for it.", lines: 3, ans: "I can tell the narrator did better than expected, because the passage says the sister “was saying my name like it was a question” (lines 18–19) — surprised, not disappointed." },
      { text: "Predict what the narrator will see on the board, and explain what in the passage makes you think so.", lines: 3, ans: "I predict a time faster than last season, maybe not first, because the green cap “was ahead” (line 14) but the narrator kept counting and “slapped it with my whole hand” (line 16)." }
     ],
     how: "Questions 1–2: the answer is written in the passage — find it, write it as a full sentence, and give the line. Questions 3–4: say what you think, then copy the words that made you think it. Use the frames in the box." },
   { id: "B", title: "Your reading strategies", kind: "lines", lines: 3,
     instr: "Predicting, questioning, visualizing, inferring. Answer in full sentences.",
     example: { text: "Which strategy helped you understand this passage best? Say which, and say what you did with it.", ans: "Visualizing helped me most. I pictured the goggles half full of water and the black line, and that is when I felt how hard the race was." },
     items: [
      { text: "Which strategy helped YOU most, and what did you do with it?", ans: "Questioning helped me most. I kept asking whether the narrator would catch the green cap, and that kept me reading closely." },
      { text: "Write one question you asked yourself while reading. Did the passage answer it?", ans: "I wondered why the narrator would not look at the board. The passage does not say, but the sister’s voice gives a clue." },
      { text: "Pick one detail you could picture. What did it make you feel about the narrator?", lines: 2, ans: "The pool going quiet under water made me feel the narrator is calmest when nobody is watching." }
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
  passage: { title: "Lane Six", lines: [
   "Lane six is the one by the wall, where the water slaps back off the tiles and you",
   "can hear every splash twice. That is where they put me, because my time from last",
   "season was the slowest in the heat. The starter said “Take your marks,” and I bent",
   "over the block the way Coach had drilled us, fingers on the edge, and I could see",
   "my own hands shaking against the white paint. In lane five a girl in a green cap",
   "was staring at the water like it had said something rude to her. My sister was",
   "somewhere in the stands. I could not find her, and I stopped looking, because the",
   "horn was coming and if you flinch early you are out. The horn went. I hit the",
   "water hard enough that my goggles filled on the left side, and for the first",
   "length I swam half blind, following the black line on the bottom and counting",
   "strokes the way I count them in practice, eleven to the wall, breathe on three. At",
   "the turn I pushed off and the whole pool went quiet the way it does under water,",
   "and for a second I was not racing anyone. Then I came up and the noise fell on me",
   "again. The green cap was ahead. I could see her feet. I did not look at them. I",
   "looked at the black line and counted, eleven, breathe, eleven, breathe, and the",
   "wall came up faster than I thought it would and I slapped it with my whole hand. I",
   "hung there with my elbows on the deck, breathing, and did not turn around to look",
   "at the board. I could hear my sister before I saw her. She was saying my name like",
   "it was a question." ],
   words: [ ["heat", "one race in a swimming competition; the fastest swimmers from each heat go on"], ["flinch", "to make a small, sudden movement because you are startled"] ] }
 }
};
