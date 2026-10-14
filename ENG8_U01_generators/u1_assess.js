// u1_assess.js — ENG8 U1 practice test (40) + unit test (60) + answer key content.
// Matching keys are seeded derangements (no fixed points), different between the two tests.
//
// v2 (Oct 14 2026) — brought up to the worksheet standing orders and set up for
// PEER MARKING in class (Sean's decision Oct 14):
//   * objective + RSS learning outcomes print at the top of both tests
//   * sec.peer decides who marks a section. Practice test: peers mark all four
//     sections (mark, proficiency on Section D, a second-person comment, their
//     name). Unit test: peers mark A/B/C; SECTION D GOES TO SEAN UNMARKED.
//   * RUBRIC authored ONCE here (single source, Sean's Oct 12 rule) and printed
//     as full-width criterion blocks on the back of both tests.
//   * `checks` = the pre-hand-in tick list, in student language, two columns.
//   * `howTo` = a worked demonstration at the head of each section of the
//     PRACTICE test only, built on a throwaway micro-text (a driver at a red
//     light) so it shows the complexity required without giving away a single
//     test answer or costing a mark. The unit test carries none.

// ---- shared reading passages (original) ----
const PASSAGE_UNIT = {
  title: "The Free Throw",
  text:
    "The gym had gone quiet in a way it never did. My shoes squeaked once as I stepped to the line, and the sound bounced off the far wall like a question nobody answered. Two shots. Tie game. I bounced the ball three times, the way I always do, and felt the pebbled leather catch on my fingertips. Somewhere behind me my little sister was yelling my name, but it came through thin and far away, like she was underwater. I looked at the rim. It seemed smaller than it had all season. I let the first one go. The ball hung, kissed the back of the rim, and dropped. I finally let out the breath I didn\u2019t know I\u2019d been holding.",
};
const PASSAGE_PRACTICE = {
  title: "The Last Row",
  text:
    "The bus smelled like rain and someone\u2019s forgotten banana. I slid into the last row and pressed my forehead to the cold window. Outside, the streetlights smeared into long yellow lines. It was the first day at a new school, and my stomach felt like it was full of wet sand. I had practised saying my name in the mirror that morning, over and over, so it wouldn\u2019t come out shaky. The brakes hissed. I stood up before I was ready, and my legs did the thing where they forget how to be legs.",
};

// ---- matching sets (definitions given in a DERANGED order) ----
// Unit: 6 terms, derangement d=[3,4,5,6,2,1] (6-cycle-ish, no fixed points)
const MATCH_UNIT = {
  terms: [
    "narrative", "character", "setting", "atmosphere", "trait", "inference",
  ],
  defsInOrder: [ // definition i belongs to term i
    "a true story from your own life, told the way a story is told",
    "a person in a story",
    "the time and place a story happens",
    "the feeling the details create",
    "a word that describes what someone is like",
    "a conclusion you reach from clues, not stated directly",
  ],
  derangement: [3,4,5,6,2,1], // presentation order of definitions (1-based); no d[i]===i
};
// Practice: 5 terms, different derangement d=[2,3,4,5,1] (5-cycle)
const MATCH_PRACTICE = {
  terms: [ "narrative", "character", "setting", "atmosphere", "inference" ],
  defsInOrder: [
    "a true story from your own life, told as a story",
    "a person in a story",
    "the time and place a story happens",
    "the feeling the details create",
    "a conclusion you reach from clues, not stated directly",
  ],
  derangement: [2,3,4,5,1],
};

// Build a matching section: returns presented defs (A,B,C..) + answer key term#->letter
function buildMatch(m){
  const n = m.terms.length;
  const letters = "ABCDEFGH".split("");
  // presented position p (0-based) shows definition number m.derangement[p]
  const presented = m.derangement.map((defNum, p)=>({ letter: letters[p], defNum, text: m.defsInOrder[defNum-1] }));
  // answer: term i (1-based) -> letter whose defNum === i
  const key = m.terms.map((t, i)=>{
    const termNum = i+1;
    const slot = presented.find(x=>x.defNum===termNum);
    return { termNum, term: t, letter: slot.letter };
  });
  return { presented, key };
}

// ---- Section D rubric (single source: this prints on the test AND feeds MARK.ONE) ----
// Written in the SECOND PERSON (Sean's Oct 11 rule): it is read by the student.
const WRITING_RUBRIC = {
  title: "How your Section D paragraph is marked",
  intro: "Your paragraph is marked on these four things. Read them before you write, and again before you hand in.",
  criteria: [
    { name: "One small moment",
      levels: {
        Emerging:   "You write about a long stretch of time — a whole day, a trip, a season — so the reader never lands anywhere.",
        Developing: "You start in one moment but drift into other events, or you summarise the moment instead of staying inside it.",
        Proficient: "You stay in one small moment from start to finish. The reader can tell how long it lasted.",
        Extending:  "You stay in one small moment and slow down at the part that matters most, so the reader feels the moment stretch.",
      } },
    { name: "Showing, not telling",
      levels: {
        Emerging:   "You name the feelings (“I was scared,” “it was fun”) and leave it there.",
        Developing: "You show in places, but you still name the feeling outright in others.",
        Proficient: "You show the feeling through action and detail instead of naming it.",
        Extending:  "You show the feeling so clearly through action and detail that naming it would weaken the writing.",
      } },
    { name: "Detail the reader can picture",
      levels: {
        Emerging:   "Your details are general — “the room,” “some people” — so there is nothing to picture.",
        Developing: "You give one or two specific details; the rest stays vague.",
        Proficient: "You choose specific details, including what you saw, heard or felt, and they build one feeling.",
        Extending:  "Every detail you choose pulls the same way, and at least one is exact enough to be only yours.",
      } },
    { name: "Complete sentences",
      levels: {
        Emerging:   "Fragments or run-ons make the paragraph hard to follow.",
        Developing: "Most sentences are complete; a few fragments or run-ons slow the reader down.",
        Proficient: "Your sentences are complete, with capitals and end punctuation in place.",
        Extending:  "Your sentences are complete and you vary their length on purpose, so the writing has a rhythm.",
      } },
  ],
};

// ---- pre-hand-in check (student language, two columns) ----
const CHECKS_COMMON = [
  "I read the passage all the way through before I started answering.",
  "I answered every question, even the ones I was unsure about.",
  "I wrote in full sentences where the question asked for them.",
  "Where a question said COPY a detail, I copied it from the passage.",
  "My paragraph stays inside ONE small moment.",
  "My paragraph shows the feeling instead of naming it.",
  "I reread my sentences and checked that none of them are fragments.",
  "My name, block and date are on the front of this test.",
];

// ---- worked demonstrations, PRACTICE TEST ONLY ----
// All four are built on the same throwaway micro-text, which appears on neither
// test, so nothing here is an answer to anything students are being marked on.
const HOWTO_PRACTICE = {
  micro: "Micro-text for these examples only:  “The light turned red again. He drummed his thumbs on the wheel and watched the crossing signal count down from twelve.”",
  A: "Question: “How does the driver feel? Copy one detail that shows it.”   Full-mark answer: “He feels impatient. The detail that shows it is that he ‘drummed his thumbs on the wheel.’”   — name the feeling in a sentence, then copy the exact words from the text.",
  B: "Question: “Name one trait of the driver and the detail that shows it.”   Full-mark answer: “The driver is impatient. He drums his thumbs on the wheel while he waits.”   — the trait is the claim; the action is the proof. Both are needed.",
  C: "Subject once, predicate twice:  “The tired driver | drummed his thumbs.”   Fragment repair:  “At every red light.” → “He drummed his thumbs at every red light.”   — add the missing part so the thought finishes.",
  D: "Telling: “The driver was annoyed.”   Showing: “He pressed the horn with the heel of his hand and held it a second too long.”   — no naming the feeling; show it with an action or a detail.",
};

// ============================ UNIT TEST (60) ============================
const UNIT_TEST = {
  code: "ENG8", label: "Unit 1 Test", total: 60, passage: PASSAGE_UNIT,
  objective: "Show what you can do on your own with everything Unit 1 taught: reading a passage closely, using the unit's terms, writing complete sentences, and showing a small moment instead of telling it.",
  outcomes: [
    "I can read a short passage and answer questions about what it says and what it suggests.",
    "I can use narrative, character, setting, atmosphere, trait and inference correctly.",
    "I can identify subjects and predicates and repair a fragment.",
    "I can write one small moment that shows a feeling instead of naming it.",
  ],
  instructions: "Read the passage, then answer all questions. Write in full sentences where asked. Marks are shown beside each question.",
  rubric: WRITING_RUBRIC,
  checks: CHECKS_COMMON,
  // Peers mark A/B/C in class; Section D comes to Mr. Reid unmarked.
  peerNote: "Sections A, B and C are marked in class by a classmate. Section D is marked by Mr. Reid.",
  sections: [
    { id:"A", title:"Reading Comprehension & Strategies", marks:15, peer:true,
      items:[
        { q:"Where and when does this moment take place? (Give both.)", marks:2, lines:2,
          key:"Setting = a basketball gym / free-throw line, during a tied game (end of a game/season). Both time and place named." },
        { q:"What is the narrator about to do?", marks:2, lines:2,
          key:"Shoot two free throws to win or tie the game." },
        { q:"Find one detail that shows the narrator is nervous, and copy it.", marks:2, lines:2,
          key:"Any showing detail, e.g. \u201Cthe breath I didn\u2019t know I\u2019d been holding,\u201D the rim seeming \u201Csmaller,\u201D his sister\u2019s voice sounding \u201Cunderwater.\u201D" },
        { q:"Make ONE inference about the narrator and give the evidence for it.", marks:3, lines:3,
          key:"Reasonable inference (e.g. he is experienced/routine-driven \u2014 \u201Cthe way I always do\u201D; or he cares a lot \u2014 held his breath). Must pair a claim with a text detail as evidence." },
        { q:"Name TWO details you can picture (visualize) from the passage.", marks:2, lines:2,
          key:"Any two concrete images: squeaking shoes, pebbled leather, ball kissing the back of the rim, streetlight/gym quiet, etc." },
        { q:"Predict what happens with the second shot, and explain what in the passage makes you think so.", marks:2, lines:3,
          key:"Any reasonable prediction WITH a reason grounded in the text (momentum of the first shot dropping, the calming breath, his steady routine)." },
        { q:"Which reading strategy helped you most with this passage \u2014 predicting, questioning, visualizing, or inferring? Why?", marks:2, lines:3,
          key:"Any named strategy with a genuine reason tied to the passage. Full marks for a clear link." },
      ]},
    { id:"B", title:"Literary Terms", marks:15, peer:true,
      items:[
        { type:"match", q:"Match each term to its meaning. Write the letter.", marks:6, match: buildMatch(MATCH_UNIT) },
        { q:"Name one trait the narrator shows, and the action or detail that shows it.", marks:3, lines:3,
          key:"A trait (e.g. calm-under-pressure, disciplined, caring) + the exact action/detail that proves it. Claim + evidence both required." },
        { q:"Identify the atmosphere (feeling) of the passage and one detail that creates it.", marks:4, lines:3,
          key:"Atmosphere (e.g. tense, suspenseful, hushed) = 2 marks; a detail that builds it (the unusual quiet, muffled sister\u2019s voice, squeak like \u201Ca question\u201D) = 2 marks." },
        { q:"In your own words, what is a \u201Csmall moment\u201D in a personal narrative?", marks:2, lines:2,
          key:"One short, specific moment (seconds/minutes) shown in detail, rather than a whole day or life." },
      ]},
    { id:"C", title:"Grammar: Subject / Predicate & Fragments", marks:15, peer:true,
      items:[
        { type:"label", q:"Underline the SUBJECT once and the PREDICATE twice in each sentence.", marks:4,
          lines:["The old gym fell silent.","My little sister yelled my name.","The ball kissed the back of the rim.","Two nervous players waited at the line."],
          key:"1) The old gym | fell silent. 2) My little sister | yelled my name. 3) The ball | kissed the back of the rim. 4) Two nervous players | waited at the line. (subject | predicate)" },
        { type:"sf", q:"Write S if the item is a complete sentence, or F if it is a fragment.", marks:5,
          lines:["Because the gym went quiet.","She bounced the ball three times.","Running to the free-throw line.","The breath I had been holding.","He shot."],
          key:"1) F  2) S  3) F  4) F  5) S" },
        { q:"Repair these three fragments so each is a complete sentence.", marks:6, lines:4,
          sub:["Waited at the line.","Because my legs were shaking.","The crowd behind me."],
          key:"Any complete-sentence repair adding the missing part, e.g. 1) \u201CI waited at the line.\u201D 2) \u201CBecause my legs were shaking, I paused.\u201D 3) \u201CThe crowd behind me went quiet.\u201D (2 marks each)" },
      ]},
    { id:"D", title:"Writing: Showing, Not Telling", marks:15, peer:false, markedBy:"Mr. Reid",
      items:[
        { type:"convert", q:"Rewrite each TELLING sentence so it SHOWS the feeling with detail or action.", marks:6,
          sub:["I was nervous.","The room was loud.","She was excited."],
          key:"Each becomes a showing sentence using sensory detail or action (2 marks each). No naming the feeling directly." },
        { type:"para", q:"Write a short personal-narrative paragraph (4\u20136 sentences) about ONE small moment. Show, don\u2019t tell. Keep it to a single moment.", marks:9, lines:9,
          key:"Scored on the 4-point Proficiency Scale mapped to /9 \u2014 Extending 8\u20139, Proficient 6\u20137, Developing 4\u20135, Emerging 1\u20133. Look for: one small moment (scope), showing over telling, and mostly complete sentences." },
      ]},
  ],
};

// ============================ PRACTICE TEST (40) ============================
const PRACTICE_TEST = {
  code: "ENG8", label: "Unit 1 Practice Test", total: 40, passage: PASSAGE_PRACTICE,
  objective: "Find out what you already have and what still needs work before the unit test \u2014 then mark a classmate's test so you can see the standard from the marker's side.",
  outcomes: [
    "I can read a short passage and answer questions about what it says and what it suggests.",
    "I can use narrative, character, setting, atmosphere and inference correctly.",
    "I can identify subjects and predicates and repair a fragment.",
    "I can write one small moment that shows a feeling instead of naming it.",
    "I can mark a classmate's work against the answers and the rubric, and say why.",
  ],
  instructions: "This practice test is the same shape as the unit test, but shorter. Use it to find what to review. Marks are shown beside each question.",
  rubric: WRITING_RUBRIC,
  checks: CHECKS_COMMON,
  howTo: HOWTO_PRACTICE,
  peerNote: "All four sections are marked in class by a classmate, who signs the marking panel at the end.",
  sections: [
    { id:"A", title:"Reading Comprehension & Strategies", marks:10, peer:true,
      items:[
        { q:"Where is the narrator, and where are they going?", marks:2, lines:2,
          key:"On a bus / in the last row, heading to a new school (first day)." },
        { q:"How is the narrator feeling? Copy one detail that shows it.", marks:2, lines:2,
          key:"Nervous/anxious. Showing detail: \u201Cstomach\u2026 full of wet sand,\u201D practising his name so it \u201Cwouldn\u2019t come out shaky,\u201D legs that \u201Cforget how to be legs.\u201D" },
        { q:"Name TWO details you can picture from the passage.", marks:2, lines:2,
          key:"Any two images: rain-and-banana smell, cold window, smeared yellow streetlights, wet sand, etc." },
        { q:"Make one inference about the narrator and give evidence.", marks:2, lines:3,
          key:"Claim (e.g. he wants to make a good impression) + a text detail (practised his name in the mirror)." },
        { q:"Which strategy helped you most here, and why?", marks:2, lines:2,
          key:"Any named strategy (predict/question/visualize/infer) with a reason tied to the passage." },
      ]},
    { id:"B", title:"Literary Terms", marks:10, peer:true,
      items:[
        { type:"match", q:"Match each term to its meaning. Write the letter.", marks:5, match: buildMatch(MATCH_PRACTICE) },
        { q:"Name one trait of the narrator and the detail that shows it.", marks:3, lines:3,
          key:"Trait (e.g. determined, anxious-but-brave) + evidence (practised his name; stood up even before ready)." },
        { q:"Identify the atmosphere of the passage.", marks:2, lines:2,
          key:"Uneasy / anxious / lonely \u2014 any reasonable feeling naming supported by the passage." },
      ]},
    { id:"C", title:"Grammar: Subject / Predicate & Fragments", marks:10, peer:true,
      items:[
        { type:"label", q:"Underline the SUBJECT once and the PREDICATE twice.", marks:3,
          lines:["The bus smelled like rain.","My legs forgot how to work.","The brakes hissed loudly."],
          key:"1) The bus | smelled like rain. 2) My legs | forgot how to work. 3) The brakes | hissed loudly." },
        { type:"sf", q:"Write S (sentence) or F (fragment).", marks:4,
          lines:["Pressed my forehead to the window.","The streetlights smeared into lines.","Because it was the first day.","I stood up."],
          key:"1) F  2) S  3) F  4) S" },
        { q:"Repair these fragments into complete sentences.", marks:3, lines:3,
          sub:["Full of wet sand.","When the brakes hissed."],
          key:"Any complete repair, e.g. 1) \u201CMy stomach was full of wet sand.\u201D 2) \u201CWhen the brakes hissed, I stood up.\u201D (about 1.5 marks each; award whole marks generously)" },
      ]},
    { id:"D", title:"Writing: Showing, Not Telling", marks:10, peer:true,
      items:[
        { type:"convert", q:"Rewrite each TELLING sentence so it SHOWS.", marks:4,
          sub:["I was scared.","The bus was crowded."],
          key:"Each becomes a showing sentence with detail/action (2 marks each)." },
        { type:"para", q:"Write a short paragraph (3\u20135 sentences) about ONE small moment. Show, don\u2019t tell.", marks:6, lines:8,
          key:"4-point scale mapped to /6 \u2014 Extending 6, Proficient 4\u20135, Developing 2\u20133, Emerging 1. One small moment; showing over telling." },
      ]},
  ],
};

module.exports = { UNIT_TEST, PRACTICE_TEST, WRITING_RUBRIC };
