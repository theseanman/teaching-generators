// ENG8 U2 L05 — Revise, Edit, Good Copy. ALL content here; the renderer holds the design.
// Merges August L12–14. Students revise and edit their Lesson 4 Part C draft, then write the GOOD COPY on the Good Copy sheet,
// collected at the bell and MARKED on the August story rubric, word for word (Sean, Oct 23): Conflict (want + obstacle) ·
// Point of View · Plot Arc · Craft & Conventions, Emerging → Extending, printed on the back. A second sheet (lines only) is
// available. Models: the August three-level "locked out" story, its character renamed Owen (The Fog Line has a Theo).
// Taught Mon Nov 16 (F and H). Unit test in two classes. Accent: coral (lesson 5 in the cycle).
// Build: bash build.sh lessons/ENG8_U02_L05.js v1 v1  then  node make_goodcopy.js lessons/ENG8_U02_L05.js out/ENG8_U02_L05 v1
const OWEN = {
 "Developing": "Owen had to lock the shop. The cat ran inside and the door shut. The key was inside. He was locked out. His uncle was coming. Owen was worried. He looked in the window. Then his uncle came and let him in. Owen felt better.",
 "Proficient": "Owen had one job: lock up before his uncle got back. Then the cat bolted past him, the door swung shut, and there was the key — on the counter, behind the glass, exactly where he couldn’t reach it. Down the street, a truck engine coughed. He had maybe four minutes. He tried the back door, the window latch, the loose board he’d been meaning to tell someone about. Nothing. When his uncle’s headlights finally swung across the lot, Owen was still standing there, forehead against the cold glass, rehearsing an apology he didn’t have.",
 "Extending": "The cat made the decision for him. One grey streak past his ankles, the door’s slow sigh shut behind it, and Owen’s whole evening rearranged itself around a single object: the key, gleaming on the counter, on the wrong side of a quarter inch of glass. He counted his options the way his uncle had taught him to count change — quickly, out loud, coming up short. Back door: bolted. Window: painted shut two summers ago. The loose board he’d never mentioned. Four minutes became three. Somewhere on the road, an engine he knew by sound was getting closer, and Owen realized the worst part wasn’t the lock or the clock. It was that he’d have to watch his uncle’s face do the thing it did when Owen let him down — the small, patient disappointment that was so much worse than being yelled at. He pressed his forehead to the glass and waited for the headlights to find him."
};
const LV = ["Emerging", "Developing", "Proficient", "Extending"];
const vocab = [
  ["revise", "to change what a draft says and how it is built"],
  ["edit", "to fix spelling, punctuation and grammar"],
  ["good copy", "the final, neat version you hand in to be marked"],
  ["rubric", "the chart that shows how work is marked"],
  ["criteria", "the points a piece of writing is judged on"],
  ["point-of-view slip", "a place where the narrator changes by accident"],
  ["run-on", "two sentences joined with no punctuation"],
  ["final image", "the last detail the reader sees"]];
module.exports = {
 course: "ENG8",
 meta: { unit: 2, unitTitle: "Crafting the Short Story", lesson: 5, title: "Revise, Edit, Good Copy",
   subtitle: "Make it better, make it correct, hand it in", month: "November" },
 banner: { obj: "Revise and edit your Lesson 4 draft, then write your good copy and hand it in for marks.",
   std: "Create & Communicate: revise, edit and publish a story  ·  conflict · point of view · plot arc · conventions", lit: ["COM", "TH", "PS"] },
 countdown: "Unit test in two classes",
 plan: {
  objective: "Students revise their Lesson 4 Part C draft against the story rubric, edit it for dialogue and run-ons, then write the good copy in class and hand it in before the bell for marks.",
  outcomes: "Create & Communicate: revise, edit, publish · the four rubric criteria",
  schwerpunkt: "the good copy is written AND handed in before the bell — every change from Parts A and B in it.",
  schwerStep: 9,
  materials: "Deck · Lesson 5 worksheet · Good Copy sheet with the story rubric on the back, one each · second Good Copy sheets for students who write more · their Lesson 4 worksheet (the Part C draft) · stapler · pens",
  timing: "80 minutes",
  steps: [
   ["3", "Warm-up", "Reread the Lesson 4 draft. Underline the sentence you are proudest of. That sentence has to survive into the good copy."],
   ["1", "Goals", "Read the three goals. The good copy goes in today, before the bell. Countdown: unit test in two classes."],
   ["4", "Vocabulary — match the word", "Eight words against their meanings, revealed one at a time, then the summary slide."],
   ["5", "Teaching — how your story is marked", "The four rubric lines from the back of the Good Copy sheet, in student words: a real conflict, one point of view kept the whole way, an arc that climbs to a climax, and showing with correct dialogue and sentences. Point at the tick boxes on the front: the same four."],
   ["7", "One story, three levels", "The Owen story at Developing, Proficient and Extending. After each, ask: what moved it up? Developing names the feeling and the obstacle solves itself; Proficient climbs and shows; Extending adds the internal layer."],
   ["10", "Part A — the revision pass", "On the Lesson 4 draft, in pencil: circle the want and the obstacle, bracket the two things that get worse, star the climax, underline any point-of-view slip, wavy line under an ending that explains. Then four short answers recording what changes."],
   ["5", "Part B — the edit pass", "Read once for dialogue punctuation and once for run-ons and comma splices. Record one fix from each pass."],
   ["2", "Part C — check your work", "Six tick boxes in two columns. Tick only what is true before starting the good copy."],
   ["40", "The good copy", "Good Copy sheet: the whole story again, neatly, in pen, with a title and every change from Parts A and B. Second sheets at the front — staple behind. ★ Collect at the bell: no good copy goes home. Time called at fifteen and five minutes left."],
   ["2", "Exit ticket and hand in", "Part D: which change from draft to good copy made the biggest difference? Hand in: good copy on top, then this worksheet, then the Lesson 4 draft."],
   ["1", "Next class and agendas", "Next class is the practice test, marked with a partner. Unit test next class after that."]],
  diff: "Support: Part A questions 1 and 2 only; the good copy may be the draft with the Part A changes made. Extension: add one internal layer to the climax — a thought the character has, shown through an action.",
  assess: "★ SUMMATIVE: collect every Good Copy sheet (second sheet stapled behind, worksheet and Lesson 4 draft underneath). Mark the good copy ON ITS OWN on the story rubric on the back: conflict · point of view · plot arc · craft and conventions, Emerging → Extending.",
  homework: "None. The good copy is handed in today. Study for the practice test.",
  watch: "Good copies that copy the draft word for word without the Part A changes. Point of view drifting from I to he halfway through. A new explaining last sentence added while copying. Anyone still writing at the bell: collect it anyway." },
 shape: [["Your best sentence", "warm-up"], ["Today’s goals", "reading together"],
   ["Match the word", "vocabulary game"], ["How your story is marked", "instruction"],
   ["One story, three levels", "examples"], ["Part A — the revision pass", "worksheet, on your Lesson 4 draft"],
   ["Part B — the edit pass", "worksheet"], ["Part C — check your work", "tick boxes"],
   ["Your good copy", "independent writing, for marks"], ["Exit ticket and hand in", "quick write"]],
 sequence: [
  { type: "title", label: "Today’s lesson" },
  { type: "warmup", label: "Warm-up", head: "Warm-up — your Lesson 4 draft",
    prompts: ["Reread your Lesson 4 draft.", "Underline the sentence you are proudest of. It goes in your good copy."] },
  { type: "goals", label: "Today’s goals", items: [
    "Revise your draft against the rubric.",
    "Edit your dialogue and your sentences.",
    "Write your good copy and hand it in before the bell."] },
  { type: "match", label: "Match the word", head: "Match the word to its meaning",
    bank: ["final image", "criteria", "edit", "point-of-view slip", "good copy", "run-on", "revise", "rubric"],
    words: vocab },
  { type: "vocab", label: "Key vocabulary", head: "Key vocabulary", words: vocab },
  { type: "cards", label: "How your story is marked", tag: "Teaching", head: "How your story is marked",
    icon: "icon-read.png", big: "The back of your Good Copy sheet.", cards: [
    { title: "Conflict", body: "A clear want meets a real obstacle, and it drives the story." },
    { title: "Point of view", body: "One point of view, chosen and kept the whole way through." },
    { title: "Plot arc", body: "Setup, the problem, worse, a climax, and how it settles.", tone: "teal" },
    { title: "Craft and conventions", body: "Show more than tell. Dialogue and sentences correct.", tone: "teal" }] },
  { type: "prose", text: "dev", label: "Developing" },
  { type: "prose", text: "pro", label: "Proficient" },
  { type: "prose", text: "ext", label: "Extending" },
  { type: "rows", label: "What moved it up", tag: "Examples", head: "What moved it up", rows: [
    ["Developing", "There is a conflict, but the obstacle solves itself, and the feeling is named: “Owen was worried.”"],
    ["Proficient", "He tries things and they fail; the pressure climbs; the panic is shown: forehead on the glass."],
    ["Extending", "An inside layer too: the worst part is his uncle’s face. Every detail is chosen."]] },
  { type: "handout", label: "Two sheets", note: "Today’s worksheet and the Good Copy sheet. Take out your Lesson 4 worksheet: your draft is in Part C.",
    foot: "Everything is handed in at the end: good copy on top, then this worksheet, then your Lesson 4 draft." },
  { type: "walk", part: "A", note: "Mark your Lesson 4 draft first, in pencil. Then answer." },
  { type: "reveals", part: "A", good: true },
  { type: "walk", part: "B", note: "Two passes: dialogue first, then run-ons." },
  { type: "reveals", part: "B", good: true },
  { type: "walk", part: "C", note: "Six boxes on your sheet. Tick one only when it is true." },
  { type: "rows", label: "Your good copy", tag: "Your good copy", head: "Write your good copy", icon: "icon-pen.png", rows: [
    ["Write", "Your whole story again, neatly, in pen, with a title."],
    ["Include", "Every change from Parts A and B."],
    ["More room?", "Take a second sheet. Staple it behind."],
    ["Before the bell", "Your good copy is handed in today."]] },
  { type: "exit", label: "Exit ticket", part: "D", note: "Then hand in your good copy, this worksheet and your Lesson 4 draft." },
  { type: "rows", label: "Hand in", tag: "Before you go", head: "Hand in", icon: "icon-folder.png", rows: [
    ["On top", "Your good copy (second sheet stapled behind)."],
    ["Next", "This worksheet."],
    ["Last", "Your Lesson 4 worksheet with the draft."]] },
  { type: "nextshape", label: "Next class", head: "Next class: Practice Test", noCountdown: true, items: [
    ["Unit test next class", "countdown"], ["Practice test", "test practice"],
    ["Mark it with a partner", "peer marking"], ["What to study", "review"]] },
  { type: "rows", label: "Agendas", tag: "Before you go", head: "Take out your agenda", icon: "icon-calendar.png", rows: [
    ["Countdown", "Unit test in two classes."],
    ["Homework", "None. Study for the practice test."],
    ["Next class", "Practice test. Wednesday, November 18."]] }],
 texts: {
   dev: { lvl: "One story, three levels", title: "Developing", body: OWEN.Developing },
   pro: { lvl: "One story, three levels", title: "Proficient", body: OWEN.Proficient },
   ext: { lvl: "One story, three levels", title: "Extending", body: OWEN.Extending } },
 goodCopy: [
  { lvl: "English 8", title: "My Story: Good Copy", lines: 14, gap: 300, extraLines: 19,
    steps: "Write your whole story again, neatly, in pen, from your Lesson 4 draft with every change from Parts A and B. Give it a title. Write on every line. Need more room? Take a second sheet.",
    checks: ["A clear want meets a real obstacle.", "One point of view, the whole way through.",
      "Two things get worse before the climax.", "Dialogue punctuated; no run-ons."],
    rubric: { title: "How your story is marked", intro: "Your good copy is marked on its own. Mr. Reid circles one level on each line.", levels: LV, criteria: [
      { code: "Conflict", name: "Want + obstacle", d: [
        "No clear want or obstacle; events happen but nothing’s at stake.",
        "A want or obstacle is present but weak or resolved too easily.",
        "A clear want meets a real obstacle; the conflict drives the story.",
        "A compelling conflict, often with internal + external layers, driving every scene."] },
      { code: "Point of View", name: "One narrator, kept", d: [
        "POV is unclear or shifts by accident.",
        "POV is mostly consistent with occasional slips.",
        "A clear POV, chosen and kept consistent throughout.",
        "POV is consistent and used purposefully for effect."] },
      { code: "Plot Arc", name: "Setup to resolution", d: [
        "Little structure; hard to follow beginning to end.",
        "Some arc, but a stage is missing or the climax is unclear.",
        "A clear arc: exposition, rising action, climax, and resolution.",
        "A well-shaped arc with tension deliberately built to a strong climax."] },
      { code: "Craft & Conventions", name: "Showing, dialogue, sentences", d: [
        "Mostly telling; frequent errors disrupt reading.",
        "Some showing; dialogue or sentence errors in places.",
        "Shows more than tells; dialogue and sentences mostly correct.",
        "Vivid, controlled craft; dialogue and conventions handled skillfully."] } ] } }],
 worksheet: {
  objective: "Revise and edit your Lesson 4 draft, then write your good copy and hand it in for marks.",
  outcomes: "Create & Communicate: revise, edit and publish a story  •  conflict · point of view · plot arc · conventions",
  parts: [
   { id: "A", title: "The revision pass", kind: "lines", weight: 8, lines: 2,
     instr: "Mark your Lesson 4 Part C draft in pencil: circle the want and the obstacle, bracket the two things that get worse, star the climax, underline any point-of-view slip, and put a wavy line under an ending that explains. Then answer.",
     example: { text: "What is your character’s want, and what is the obstacle?", ans: "Owen wants to go to the party; babysitting Lia is in the way." },
     items: [
      { text: "Do two separate things get worse? If not, what will you add?", ans: "Only one did. I will add Jay posting the video." },
      { text: "What does your character DO at the climax?", ans: "He picks up his keys, looks at Lia and puts them down." },
      { text: "Did you find a point-of-view slip? Copy it and fix it.", ans: "“He looked at the clock” → “I looked at the clock.”" },
      { text: "Copy your last sentence. Is it a detail, or does it explain?", ans: "“That night I learned family comes first.” It explains, so I will cut it." }],
     how: "Do the marking on your Lesson 4 sheet first, then answer from what you marked. An honest answer that finds something to change is a good answer." },
   { id: "B", title: "The edit pass", kind: "lines", weight: 4, lines: 2,
     instr: "Read your draft once for dialogue and once for run-ons and comma splices. Record one fix from each pass.",
     example: { text: "A comma splice, fixed.", ans: "“I texted Jay, he didn’t answer.” → “I texted Jay, but he didn’t answer.”" },
     items: [
      { text: "Copy one line of dialogue you fixed. Show it before and after.", ans: "Lia said can I have pancakes → Lia said, “Can I have pancakes?”" },
      { text: "Copy one run-on or comma splice you fixed. Show it before and after.", ans: "“My phone buzzed I ignored it.” → “My phone buzzed. I ignored it.”" }],
     how: "One kind of problem per read-through. For dialogue: marks around the words, punctuation inside, a new paragraph for each new speaker. For run-ons: a period, a comma + and/but/so, or because/when." },
   { id: "C", title: "Check your work", kind: "check",
     instr: "Tick each box when it is true. Then write your good copy.",
     checks: ["I circled the want and the obstacle.",
       "Two things get worse in my story.",
       "I starred the climax.",
       "I fixed any point-of-view slip.",
       "My last sentence does not explain.",
       "I fixed my dialogue and run-ons."],
     how: "Tick a box only when it is true. Then take your Good Copy sheet." },
   { id: "D", title: "Exit ticket", kind: "exit", lines: 2,
     instr: "Answer, then hand this in with your good copy.",
     items: [
      { text: "Which change from draft to good copy made the biggest difference? Why?" }],
     how: "One change and one reason. Hand in your good copy on top, then this worksheet, then your Lesson 4 draft." }] }
};
