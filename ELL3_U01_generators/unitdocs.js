// ELL 3 Unit 1 — unit documents: intro, parent letter, scale, rubrics, plan detail,
// practice test (40, formative) and unit test (60: reading 25 / writing 35).
// TEST_LETTER holds the unseen reading passage embedded in the unit test.

const INTRO = {
  title: "Unit 1: The Exact Thing",
  sections: [
    { h: "What we will learn",
      p: "This unit is about the difference between saying something and saying the exact thing. \u201CThe food was good\u201D is true, and it tells a reader almost nothing. \u201CThe soup had ginger in it and burned the roof of my mouth\u201D is one particular meal, in one particular mouth. Across twelve lessons you will learn to find that kind of detail in your own life, to notice it in what you read, and to build sentences that can carry it." },
    { h: "The two cold starts",
      p: "This is a writing course. You will read and talk in every lesson, but what is evaluated is what you write. Lesson 1 gets you writing straight away with an unmarked paragraph. Lesson 2 starts the Voices Notebook. Lesson 3 is the district September writing sample, written in class on your own; you will see it again in June beside what you can do by then, so write honestly rather than carefully." },
    { h: "What we will read",
      p: "Two short stories written for this course. The first, The Long Way Home, is about a boy who rides two stops past his own every afternoon. We read it closely, together. The second, The Second Umbrella, is about a girl who works out what her father does with the forty minutes he cannot account for. You read that one with much less help from me, because by then you will not need it." },
    { h: "What you will write",
      p: "One descriptive paragraph about something you carry with you from where you are from \u2014 an object, a habit, a phrase, a food, a sound. You will gather far more material than you need, throw most of it away, draft, and revise. The final version is handed in with your marked-up draft attached, so I can see what you changed." },
    { h: "The Voices Notebook",
      p: "Every lesson you add one entry: a specific detail you noticed, and one line explaining what makes it specific rather than general. The details can come from your own life or from what we read. There are four checkpoints, and the Notebook is worth 40 percent of the unit \u2014 more than any single test. It is marked on the final reflection you write in Lesson 12, where you use your own entries as evidence about the kind of noticer you are." },
    { h: "How this unit is assessed",
      p: "The Voices Notebook carries 40 and the unit test carries 60, split between reading (25) and writing (35). The practice test is not marked \u2014 it exists so you know what the real one asks before you sit it. If you join this class after the unit has started, the Notebook is designed so you can begin at any point: every entry stands on its own." },
  ],
};

const PARENT_LETTER = {
  greeting: "Dear Parent or Guardian,",
  intro: "In September our ELL 3 class begins Unit 1, The Exact Thing. The unit teaches students to move from general description toward specific description \u2014 the difference between writing that a place was beautiful and writing what was actually in it. This is the single clearest step between the level most students arrive at and the level they are working toward, and it applies to both their writing and their reading.",
  bullets: [
    ["The September writing sample in the first week", "In the third class your child writes the district September writing sample: one piece of writing, in class, without help. It is marked and submitted to the district, and a copy is kept so that in June your child can see concretely what has changed. Everything evaluated in this course is writing; reading and speaking happen in every lesson to feed it."],
    ["Two short stories", "The class reads two short stories written for this course, both about young people in families that have recently moved. Students learn to support what they think with evidence from the page rather than with opinion."],
    ["A descriptive paragraph", "Students write about something they carry with them from where they are from. They may choose an object, a habit, a phrase, a food, or a sound. Nobody is required to write about anything they would rather not share."],
    ["The Voices Notebook", "Each lesson your child records one specific detail they noticed and explains what makes it specific. This runs across the whole unit and is worth 40 percent of the unit mark \u2014 more than the test. It rewards steady attention rather than performance on a single day, and a student who joins the class late can begin it at any point."],
  ],
  close: "If your child has recently arrived and is finding the first weeks difficult, please let me know. The design of this unit assumes that some students will be new, and there is room in it for that.",
  sign: "Mr. Reid",
};

const SCALE = {
  title: "District Learning Outcomes scale \u2014 ELL 3 (Expanding)",
  note: "ELL 3 is reported on the District Learning Outcomes scale across three domains: Speaking and Listening, Reading, and Writing. Unit 1 gathers evidence in all three. The unit test assesses reading and writing; speaking and listening evidence comes from the paired and small-group work in every lesson, and is recorded but not separately marked in this unit.",
  levels: [
    ["N/A", "Not enough evidence has been gathered yet. Common and expected for a student who arrives partway through the unit."],
    ["Emerging", "Beginning to show the outcome with substantial support. Details remain general; inferences are made but not yet supported from the text."],
    ["Developing", "Shows the outcome inconsistently. Some specific detail appears, usually visual; evidence is offered but does not always support the claim made."],
    ["Proficient", "Shows the outcome consistently and independently. Details are specific and chosen; inferences are stated as claims and substantiated from the text."],
    ["Extending", "Shows the outcome with control and range. Detail is selected for effect rather than accumulated; reading identifies what a writer has deliberately left unsaid."],
  ],
};

const RUBRIC = {
  intro: "Two rubrics apply in this unit. The first assesses the descriptive paragraph, which sits inside the writing portion of the unit test. The second assesses the Voices Notebook, which is worth 40 percent of the unit and is judged on the Lesson 12 reflection rather than on the number of entries.",
  levels: ["Emerging", "Developing", "Proficient", "Extending"],
  criteria: [
    { name: "Specific detail",
      rows: [
        "Details name categories rather than things. A reader cannot picture the subject.",
        "Some details are photographable; others restate the category. Detail is mostly visual.",
        "Details are consistently specific and drawn from more than one sense. Few could appear in another student's paragraph.",
        "Details are selected rather than gathered. One is developed as the centre of the piece and the rest support it.",
      ] },
    { name: "Opening and shape",
      rows: [
        "Opens by announcing the topic. Sentences are listed in the order they were thought of.",
        "Opens on a detail some of the time. Some ordering is apparent but details are given equal weight.",
        "Opens on a specific detail. One detail is developed further than the others and the paragraph closes without explaining itself.",
        "The opening earns the reader's attention on its own terms and the closing lands without restating anything.",
      ] },
    { name: "Sentence control",
      rows: [
        "Mostly simple sentences, with fragments or run-ons. Commas absent or misplaced.",
        "Simple and compound sentences used; complex sentences attempted with inconsistent punctuation.",
        "Simple, compound and complex sentences all used accurately, with correct commas after fronted dependent clauses.",
        "Sentence length is varied deliberately, including short sentences placed for effect.",
      ] },
    { name: "Word choice",
      rows: [
        "Relies on good, nice, very, a lot, thing. Adverbs used in place of stronger verbs.",
        "Some stronger verbs and nouns appear alongside weak general ones.",
        "Verbs and nouns carry the description. Weak filler words are largely absent.",
        "Word choice is precise enough that removing any one word would cost the reader something.",
      ] },
    { name: "Reading: inference and evidence",
      rows: [
        "States what happened. Inferences are offered as opinion with no reference to the text.",
        "Makes inferences and points to the text, but the evidence does not always support the claim.",
        "States a claim and substantiates it with evidence that genuinely supports it, including quotation.",
        "Identifies what the writer has deliberately left unsaid and builds a defensible reading from the omission.",
      ] },
    { name: "Voices Notebook reflection",
      rows: [
        "Entries are present but the reflection describes feelings rather than patterns, with no reference to specific entries.",
        "Identifies a pattern but supports it thinly, quoting one entry or none.",
        "Identifies both a strength and a gap in their own noticing, quoting at least three of their own entries as evidence.",
        "Uses their own entries to make a claim about themselves as a noticer that they could not have made in Lesson 2.",
      ] },
  ],
};

const PLAN_DETAIL = {
  duration: "One 80-minute block",
  common: {
    materials: "Lesson deck, lesson worksheet, the two story documents (Lessons 6, 7 and 11), the Voices Notebook, the pre-writing organizer (Lesson 9), and the folder holding the Lesson 1 warm-up paragraph and a copy of the Lesson 3 writing sample.",
    differentiation: "Advanced tier as written. For the Foundation and Bridge tiers, reduce the cloze bank to six words with no extras, cut the inference questions from five to three, and allow the Voices Notebook justification to be a phrase rather than a sentence. Students who arrive mid-unit begin the Notebook at the current lesson; do not backfill.",
    assessment: "Formative throughout. The only summative pieces are the Voices Notebook reflection (Lesson 12) and the unit test. The Lesson 1 paragraph is never marked; the Lesson 3 writing sample is marked for the district and kept as the September baseline.",
  },
  perLesson: {
    1: { hw: "None. Do not set homework in the first lesson of September.",
         watch: "Students who freeze because they think it is being marked. Say again that it is not. Students who write three lines and stop are giving you real information \u2014 do not push them to fill the page." },
    2: { hw: "None.",
         watch: "Students who leave the inference questions blank rather than guess. Blank tells you nothing; a wrong attempt tells you a great deal. Circulate and say so individually rather than announcing it." },
    3: { hw: "First Voices Notebook entry if not finished in class.",
         watch: "Students who rewrite \u201Cthe market was busy\u201D as \u201Cthe market was very busy\u201D. The adjective swap is the commonest failure and needs naming aloud the first time it appears." },
    4: { hw: "Finish the four meal sentences.",
         watch: "Four visual sentences with one smell word bolted onto the last one. Ask which sense the sentence is actually built from, not which words appear in it." },
    5: { hw: "Rewrite the Lesson 4 sentences with two compound sentences and a short closing one.",
         watch: "Comma splices appearing as students gain confidence with compound sentences. This is progress, not regression \u2014 mark it as a punctuation fix, not a sentence-type error." },
    6: { hw: "Finish the evidence paragraph if not completed. Voices Notebook entry from the story.",
         watch: "Students reading the mother as neglectful. Push back from the text \u2014 she asks twice and the second time she is looking at him. Also watch for students who are quietly recognising their own household; do not draw attention to them." },
    7: { hw: "Finish the theme paragraph.",
         watch: "Themes that are still topics with a verb attached (\u201CBelonging is important\u201D). The test to repeat: could anyone disagree with this sentence?" },
    8: { hw: "None. The rewrite is done in class.",
         watch: "Students who add complex sentences everywhere and lose clarity. The honest answer to the final question is sometimes \u201Conly longer\u201D, and a student who sees that has learned more than one who does not." },
    9: { hw: "Complete the organizer to fifteen items if short.",
         watch: "Students who stop at eight items and want to move on. Hold the line \u2014 the whole selection step depends on having surplus. Also watch for students choosing a detail that is too raw to write about publicly; offer them a second option privately." },
    10: { hw: "Finish the draft to the end. A complete rough draft, not a polished half.",
         watch: "Students who stop to fix spelling and never reach the end. Remind them the wavy line exists. Openings that announce the topic despite Part C \u2014 catch these in the first five minutes of drafting, not after." },
    11: { hw: "Finish the inference paragraph.",
         watch: "Students who find the forty-minute gap immediately and then stop reading. Push them to the August paragraph \u2014 the arithmetic is the entry point, not the answer." },
    12: { hw: "None. The unit ends here.",
         watch: "Students who report \u201Cnothing to change\u201D in the revision pass. That means the pass was not done. Sit with them and do the first two steps together." },
  },
};

// Unseen passage embedded in the unit test reading section.
const TEST_LETTER = {
  title: "The Fourth Chair",
  author: "an unseen story, written for this test",
  paras: [
    "There are four chairs at our kitchen table and there are three of us.",
    "My mother bought the set from a woman on Cambie Street who was moving to Calgary. The woman wanted forty dollars for the table and the four chairs, and my mother paid her, and my uncle drove them home in the back of his van in two trips because the table would not go in with the chairs.",
    "That was in March.",
    "In April my mother started putting a plate at the fourth chair on Sundays. Not every day. Sunday.",
    "She does not say anything about it. She sets four plates, and we eat, and afterwards she washes all four, including the clean one, and puts them away.",
    "My sister thinks it is for our father, who is still in Manila waiting on his papers, and she said so once at the table, and my mother said the plate was not for anybody, it was just a plate.",
    "But on the first Sunday in June my mother put out four plates and then took one away again, and my sister and I looked at each other, and neither of us said anything.",
    "That week my father's papers came through.",
    "He arrives in September. My mother has already bought a fifth chair, a different colour, from a different woman, and it does not match, and she has put it in the corner of the kitchen where nobody sits.",
    "She says it is for when my grandmother comes.",
    "My grandmother is eighty-one and has never been on a plane and says on the telephone every week that she is too old to start now. My mother agrees with her, every week, and then says nothing about the chair.",
    "I have started to think that my mother is not counting the people who are here.",
  ],
};

const PRACTICE = {
  seed: 3301,
  total: 40,
  time: "50 minutes",
  note: "This practice test is not marked. It exists so you know the shape of the real one.",
  sections: [
    { id: "A", title: "Vocabulary", marks: 8, kind: "match",
      instr: "Write the letter of the correct definition beside each word. (1 mark each)",
      terms: [
        ["specific", "exact; about one particular thing"],
        ["general", "broad; true of many things, not just this one"],
        ["inference", "something a text suggests but does not state"],
        ["evidence", "the words in a text that support your answer"],
        ["compound", "joining two clauses as equals"],
        ["complex", "having a main clause and a dependent clause"],
        ["theme", "an idea about life that a story explores"],
        ["implicit", "present in a text but not stated directly"],
      ] },
    { id: "B", title: "General or specific", marks: 6, kind: "fill",
      instr: "Write GENERAL or SPECIFIC beside each sentence. (1 mark each)",
      items: [
        { q: "The journey was long.", a: "GENERAL" },
        { q: "We changed buses twice in Guangzhou.", a: "SPECIFIC" },
        { q: "My aunt is generous.", a: "GENERAL" },
        { q: "My aunt sends money on the fifteenth of every month.", a: "SPECIFIC" },
        { q: "School here is different.", a: "GENERAL" },
        { q: "Nobody stands up when the teacher comes in.", a: "SPECIFIC" },
      ] },
    { id: "C", title: "Sentence types", marks: 8, kind: "fill",
      instr: "Write SIMPLE, COMPOUND, COMPLEX, FRAGMENT, or RUN-ON beside each. (1 mark each)",
      items: [
        { q: "The bus pulled away.", a: "SIMPLE" },
        { q: "The bus pulled away, and she ran after it.", a: "COMPOUND" },
        { q: "Because the bus pulled away, she was late.", a: "COMPLEX" },
        { q: "Running after the bus in the rain.", a: "FRAGMENT" },
        { q: "The bus pulled away she ran after it.", a: "RUN-ON" },
        { q: "Although she ran, she missed it.", a: "COMPLEX" },
        { q: "She missed it, so she walked.", a: "COMPOUND" },
        { q: "She walked.", a: "SIMPLE" },
      ] },
    { id: "D", title: "Make it specific", marks: 8, kind: "fill",
      instr: "Rewrite each general sentence so a reader could photograph it. (2 marks each)",
      items: [
        { q: "The apartment was small.", a: "Any version naming what fits or does not fit: \u201cMy bed touched two walls.\u201d Reject adjective swaps." },
        { q: "My mother works very hard.", a: "Needs a fact: hours, shifts, what she does before anyone is awake." },
        { q: "The party was fun.", a: "Needs one moment: who did what, what was playing, what was eaten." },
        { q: "It was cold that winter.", a: "Needs a consequence: what froze, what people wore, what stopped working." },
      ] },
    { id: "E", title: "Inference", marks: 6, kind: "write", lines: 8,
      instr: "A story tells you that a boy checks the same empty mailbox every day after school, and that his family has been in the country for four months. What can you infer, and what in those two facts makes you think it? (6 marks)",
      a: "Claim (3): he is waiting for something specific \u2014 papers, a letter, news of someone left behind. Evidence (3): the repetition shows expectation rather than habit, and the four months places the family in the period when documents and news would be expected. Full marks require both a claim and evidence that supports it; a claim alone takes half." },
    { id: "F", title: "Short writing", marks: 4, kind: "write", lines: 10,
      instr: "Write four sentences about a room you know well. At least two senses must appear, at least one sentence must be compound, and you may not use good, nice, or very. (4 marks)",
      a: "One mark each: two senses present, one accurate compound sentence, no banned words, and at least two details that could be photographed." },
  ],
};

const UNITTEST = {
  seed: 6644,
  total: 60,
  time: "80 minutes",
  note: "Reading is worth 25 marks and writing is worth 35.",
  sections: [
    { id: "A", title: "Vocabulary", marks: 8, kind: "match",
      instr: "Write the letter of the correct definition beside each word. (1 mark each)",
      terms: [
        ["protagonist", "the main character of a story"],
        ["setting", "where and when a story happens"],
        ["theme", "an idea about life that a story explores"],
        ["explicit", "stated directly in the text"],
        ["implicit", "present but not stated directly"],
        ["substantiate", "to support a claim with evidence"],
        ["omission", "something deliberately left out"],
        ["concrete", "able to be seen, heard, or touched"],
      ] },
    { id: "B", title: "Reading \u2014 on the page", marks: 6, kind: "fill", useTestLetter: true,
      instr: "Read The Fourth Chair, printed before this section. These answers are all written in the story. (1 mark each)",
      items: [
        { q: "How many chairs are at the table, and how many people live in the house?", a: "Four chairs, three people." },
        { q: "Where did the mother buy the table and chairs?", a: "From a woman on Cambie Street who was moving to Calgary." },
        { q: "On which day does the mother set the fourth plate?", a: "Sunday." },
        { q: "Where is the narrator's father at the start of the story?", a: "In Manila, waiting on his papers." },
        { q: "What happens on the first Sunday in June?", a: "The mother puts out four plates and then takes one away." },
        { q: "How old is the grandmother, and what does she say every week?", a: "Eighty-one; that she is too old to start flying now." },
      ] },
    { id: "C", title: "Reading \u2014 underneath the page", marks: 11, kind: "write", lines: 16,
      instr: "Each answer needs a claim and the evidence for it. An answer with no evidence scores nothing, even when it is right. (Q1 and Q2: 3 marks each. Q3: 5 marks.)\n\n1. Why does the mother take the plate away on the first Sunday in June?\n2. Why has the mother bought a fifth chair that nobody will sit in?\n3. Explain the last line: \u201cI have started to think that my mother is not counting the people who are here.\u201d What has the narrator understood?",
      a: "Q1 (3): The papers came through that week \u2014 the story places the two events together deliberately. The plate was holding a place for the father, and it is no longer needed once he is actually coming. Claim 2, evidence 1.\n\nQ2 (3): She is doing the same thing again with the grandmother \u2014 setting a place for someone who is not coming. Evidence: the chair does not match, nobody sits there, and the grandmother says every week that she will not fly. Accept readings that frame it as hope, as refusal to accept the loss, or as a way of keeping the person present.\n\nQ3 (5): The narrator has understood that the plates and chairs are not really about the people arriving \u2014 they are how the mother keeps the absent present, and she will keep doing it. Full marks require a claim about the mother's pattern (2), evidence from at least two separate moments (2), and recognition that the narrator did not understand this at the start (1). Do not require the exact reading above; require that it be defensible from the text.",
    },
    { id: "D", title: "Sentence control", marks: 10, kind: "fill",
      instr: "Rewrite each pair as one sentence of the type named. Punctuate it correctly. (2 marks each)",
      items: [
        { q: "(compound) The kitchen was warm. Nobody was in it.", a: "The kitchen was warm, but nobody was in it. One mark for the joining word carrying contrast, one for the comma." },
        { q: "(complex, dependent clause first) She heard the key. She did not get up.", a: "Although she heard the key, she did not get up. One mark for a fronted dependent clause, one for the comma after it." },
        { q: "(complex, using because) He left the light on. He knew she would be late.", a: "He left the light on because he knew she would be late. No comma required when the clause comes second." },
        { q: "(compound, using so) The shop was closed. We walked to the river.", a: "The shop was closed, so we walked to the river." },
        { q: "(complex, using while) My brother slept. I finished the forms.", a: "While my brother slept, I finished the forms." },
      ] },
    { id: "E", title: "Word choice", marks: 5, kind: "fill",
      instr: "Replace the weak phrase in each sentence with one stronger word. (1 mark each)",
      items: [
        { q: "He said in a very loud voice that we should go.", a: "shouted / bellowed / called" },
        { q: "She walked quickly down the hallway.", a: "hurried / strode / marched" },
        { q: "The soup was very good.", a: "Needs a concrete replacement, not a synonym for good \u2014 e.g. \u201cThe soup was salted almost past bearing.\u201d" },
        { q: "The old car made a loud noise.", a: "roared / rattled / backfired" },
        { q: "He looked at me in an angry way.", a: "glared / scowled" },
      ] },
    { id: "F", title: "Writing \u2014 the descriptive paragraph", marks: 20, kind: "write", lines: 26,
      instr: "Describe something you carry with you from where you are from. It may be an object, a habit, a phrase, a food, or a sound. Eight to twelve sentences. (20 marks)\n\nYour paragraph must: open on a specific detail rather than announcing the topic; develop one detail further than the others; use at least two senses; include at least one compound and one complex sentence; and avoid good, nice, and very.",
      a: "Marked on the paragraph rubric, twenty marks distributed across four criteria at five marks each: specific detail, opening and shape, sentence control, and word choice. A paragraph that meets every listed requirement but whose details could have been written by anyone in the room sits at Developing on the first criterion regardless of technical accuracy \u2014 that is the criterion the unit exists to move.",
    },
  ],
};


// =====================================================================
// SEP 8 2026 — WRITING-ONLY CONVERSION (Sean's instruction: ELL 3 is evaluated
// on writing only, against the WRITING section of the RSS "ELL3 (Expanding)
// Learning Outcomes" form). Everything below overrides the definitions above.
// Form outcomes are numbered W1–W15 top to bottom as printed on the form.
// =====================================================================
const FORM_W = {
  W1: "Use familiar and some academic content language",
  W2: "Write longer and more descriptive sentences",
  W3: "Attempt to use figurative language such as simile, metaphor and irony",
  W4: "Use conjunctions to connect ideas and sentences (for, and, but, so)",
  W5: "Understand how to write complex and compound sentences by using connecting words (because, while, when, since, before, after)",
  W6: "Write a composition with a proper format, including an introduction, a body, and a conclusion",
  W7: "Attempt to incorporate a well developed thesis statement in the introduction paragraph",
  W8: "Recognize and identify different styles of essay writing such as expository, descriptive, process, and narrative",
  W9: "Use a variety of transition words (firstly, moreover, in contrast)",
  W10: "Use a variety of verb tenses including modals and conditionals (present, past, and future)",
  W11: "Use appropriate subject/verb agreement",
  W12: "Use capitalization and punctuation correctly",
  W13: "Use articles and prepositions properly",
  W14: "Write complete sentences with very few errors",
  W15: "Attempt to revise and self-edit writing",
};

SCALE.title = "RSS ELL3 (Expanding) Learning Outcomes \u2014 Writing";
SCALE.note = "ELL 3 is formally evaluated on writing only. Every rubric criterion and every test section names the writing outcome on the RSS form it reports to (W1\u2013W15). Reading and speaking happen in every lesson as input and rehearsal for the writing and are never scored or reported by this course. Part A of each test is marked numerically and converted to a level by the bands below; Part B is marked on the rubric, level by level, with no total.";
SCALE.levels = [
  ["N/A", "Material not yet taught. The form\u2019s own footnote. Never used for an outcome that has been taught but not shown."],
  ["Not Yet Meeting", "The outcome is not yet visible in the work, or appears only with heavy support (copied model, teacher-supplied sentences). Replaces the form\u2019s Developing column. Part A: below 60%."],
  ["Minimally Meeting", "The outcome appears but inconsistently; errors change the meaning in places; the student needs prompting to apply it. Part A: 60\u201372%."],
  ["Meeting", "The outcome is applied consistently in the piece with occasional errors that do not change the meaning. Part A: 73\u201385%."],
  ["Fully Meeting", "The outcome is applied accurately and independently, and the student can explain it when asked. Part A: 86% and above."],
];

RUBRIC.intro = "Two rubrics apply in this unit, both on the four levels of the RSS form. The first assesses the descriptive paragraph, which is Part B of the unit test: five criteria, each labelled with the form outcome it reports to (or marked as a task criterion that is not carried to the report). The second assesses the Voices Notebook, which is worth 40 percent of the unit and is judged on the Lesson 12 reflection with the marked draft attached, reporting to W14 and W15.";
RUBRIC.levels = ["Not Yet Meeting", "Minimally Meeting", "Meeting", "Fully Meeting"];
RUBRIC.criteria = [
  { name: "Specific detail  (W2 \u2014 longer, more descriptive sentences)", rows: RUBRIC.criteria[0].rows },
  { name: "Opening and shape  (task criterion \u2014 not carried to the form)", rows: RUBRIC.criteria[1].rows },
  { name: "Sentence control  (W4, W5, W12 \u2014 conjunctions, connecting words, punctuation)", rows: RUBRIC.criteria[2].rows },
  { name: "Word choice  (W1 \u2014 familiar and some academic content language)", rows: RUBRIC.criteria[3].rows },
  { name: "Complete sentences  (W14 \u2014 complete sentences with very few errors)", rows: [
      "Fragments or run-ons in most sentences; the reader has to repair the sentence to follow it.",
      "Most sentences are complete; fragments or run-ons appear where a sentence gets long or joins two ideas.",
      "Sentences are complete throughout, with very few errors and none that change the meaning.",
      "Sentences are complete, varied in length, and error-free apart from slips the student could catch on a re-read." ] },
  { name: "Voices Notebook reflection  (W14, W15 \u2014 with the marked draft attached)", rows: RUBRIC.criteria[5].rows },
];

UNITTEST.total = 60;
UNITTEST.time = "80 minutes";
UNITTEST.note = "Part A (Language, 25 marks: sections A\u2013C) is converted to a level by the bands on the scale. Part B (Writing, 35 marks: sections D\u2013E) is marked on the rubric. There is no reading section: this course evaluates writing.";
UNITTEST.sections = [
  { id: "A", title: "Vocabulary  (Part A \u2014 W1)", marks: 8, kind: "match",
    instr: "Write the letter of the correct definition beside each word. (1 mark each)",
    terms: [["specific", "exact; about one particular thing"], ["general", "broad; true of many things, not just this one"], ["concrete", "able to be seen, heard, or touched"], ["sensory", "to do with sight, sound, smell, taste, or touch"],
            ["precise", "exact; leaving no doubt about what is meant"], ["compound", "two complete ideas joined with and, but, so, or or"], ["complex", "a complete idea joined to a dependent one with because, while, when, since"], ["connotation", "the feeling a word carries beyond its meaning"]] },
  { id: "B", title: "Sentence control  (Part A \u2014 W4, W5, W12)", marks: 12, kind: "fill",
    instr: "Rewrite each pair as one sentence of the type named. Punctuate it correctly. (2 marks each)",
    items: [
      { q: "(compound) The kitchen was warm. Nobody was in it.", a: "The kitchen was warm, but nobody was in it. One mark for the joining word carrying contrast, one for the comma." },
      { q: "(complex, dependent clause first) She heard the key. She did not get up.", a: "Although she heard the key, she did not get up. One mark for a fronted dependent clause, one for the comma after it." },
      { q: "(complex, using because) He left the light on. He knew she would be late.", a: "He left the light on because he knew she would be late. No comma before because. One mark for because, one for no comma." },
      { q: "(compound, using so) The bus was late. We walked.", a: "The bus was late, so we walked. One mark for so, one for the comma." },
      { q: "(complex, using while) My brother set the table. I stirred the pot.", a: "While my brother set the table, I stirred the pot. / I stirred the pot while my brother set the table. One mark for while, one for correct comma use (comma only when the clause comes first)." },
      { q: "(complex, using when) The rain stopped. Everyone went outside.", a: "When the rain stopped, everyone went outside. One mark for when, one for the comma after the fronted clause." } ] },
  { id: "C", title: "Word choice  (Part A \u2014 W1, W2)", marks: 5, kind: "fill",
    instr: "Replace the weak phrase in each sentence with one stronger word. (1 mark each)",
    items: [
      { q: "He said in a very loud voice that we should go.", a: "shouted / bellowed / called" },
      { q: "She walked quickly down the hallway.", a: "hurried / strode / marched" },
      { q: "The soup was very good.", a: "Needs a concrete replacement, not a synonym for good \u2014 e.g. \u201cThe soup was salted almost past bearing.\u201d" },
      { q: "The old car made a loud noise.", a: "roared / rattled / backfired" },
      { q: "He looked at me in an angry way.", a: "glared / scowled" } ] },
  { id: "D", title: "Revise and self-edit  (Part B \u2014 W11, W12, W13, W15)", marks: 10, kind: "write", lines: 14,
    instr: "The paragraph below has ten errors: subject\u2013verb agreement, articles, prepositions, capitalization and punctuation. Rewrite it correctly on the lines. (1 mark for each error fixed; an error you introduce costs 1.)\n\nmy grandmother kitchen is the warmest room in a house. Every sunday she cook rice at six in the morning, and the smell reach my room before I am awake. There is two radios on the shelf and both of them plays different station. My little brother sit on floor with his homework, but he never finish it. When I walk in she hand me a spoon and say, \u201ctaste this\u201d",
    a: "Corrected: My grandmother\u2019s kitchen is the warmest room in the house. Every Sunday she cooks rice at six in the morning, and the smell reaches my room before I am awake. There are two radios on the shelf and both of them play different stations. My little brother sits on the floor with his homework, but he never finishes it. When I walk in, she hands me a spoon and says, \u201cTaste this.\u201d  The ten: (1) My (capital) (2) grandmother\u2019s (3) the house (4) Sunday (5) cooks (6) reaches (7) There are (8) play (9) sits / the floor (10) finishes / hands / says / comma after \u201cwalk in\u201d / period inside the quotation. Accept any ten distinct corrections from this set; do not penalise a correct rewrite that fixes more than ten." },
  { id: "E", title: "Writing \u2014 the descriptive paragraph  (Part B \u2014 rubric)", marks: 25, kind: "write", lines: 26,
    instr: "Describe something you carry with you from where you are from. It may be an object, a habit, a phrase, a food, or a sound. Eight to twelve sentences. (25 marks)\n\nYour paragraph must: open on a specific detail rather than announcing the topic; develop one detail further than the others; use at least two senses; include at least one compound and one complex sentence; and avoid good, nice, and very.",
    a: "Marked on the paragraph rubric: five criteria at five marks each \u2014 specific detail (W2), opening and shape (task), sentence control (W4, W5, W12), word choice (W1), complete sentences (W14). Each criterion is also recorded as a level (Not Yet / Minimally / Meeting / Fully) for the report. A paragraph that opens by announcing its topic caps at Minimally Meeting on opening and shape however strong the rest." },
];

PRACTICE.total = 40;
PRACTICE.note = "This practice test is not marked. It has the same shape as the real one: Part A is language (sections A\u2013C), Part B is writing (sections D\u2013E). There is no reading section.";
PRACTICE.sections = [
  { id: "A", title: "Vocabulary  (Part A)", marks: 6, kind: "match",
    instr: "Write the letter of the correct definition beside each word. (1 mark each)",
    terms: [["specific", "exact; about one particular thing"], ["general", "broad; true of many things"], ["concrete", "able to be seen, heard, or touched"], ["precise", "exact; leaving no doubt"], ["fragment", "a piece of a sentence that is not complete"], ["run-on", "two complete sentences pushed together with no joining word or punctuation"]] },
  PRACTICE.sections[2],   // Sentence types, 8
  PRACTICE.sections[3],   // Make it specific, 8
  { id: "D", title: "Revise and self-edit  (Part B)", marks: 6, kind: "write", lines: 10,
    instr: "The paragraph below has six errors. Rewrite it correctly. (1 mark each)\n\nOn saturday my uncle drive us to the beach in richmond. The water were cold, but nobody care. My cousin find a crab under a rock and everyone scream.",
    a: "On Saturday my uncle drives (or drove) us to the beach in Richmond. The water was cold, but nobody cared. My cousin found a crab under a rock, and everyone screamed. Six: Saturday, drives/drove, Richmond, was, cared, found/screamed (accept consistent tense either way)." },
  { id: "E", title: "Short writing  (Part B)", marks: 12, kind: "write", lines: 16,
    instr: "Describe one room you know well in five to seven sentences. Open on a detail, not on the name of the room. Use at least two senses and at least one compound sentence. (12 marks: marked on the paragraph rubric, simplified \u2014 detail, sentence control, word choice at four marks each)",
    a: "Look for a photographable opening, two senses, one correctly punctuated compound sentence, and no good/nice/very." },
];
PRACTICE.sections[1] = Object.assign({}, PRACTICE.sections[1], { id: "B", title: "Sentence types  (Part A)" });
PRACTICE.sections[2] = Object.assign({}, PRACTICE.sections[2], { id: "C", title: "Make it specific  (Part A)" });
INTRO.sections.forEach((s) => { s.p = s.p.replace("split between reading (25) and writing (35)", "split between Part A language (25) and Part B writing (35)"); });
PARENT_LETTER.intro = PARENT_LETTER.intro.replace("and it applies to both their writing and their reading.", "and it is what every piece of their writing this month is measured against.");

// Re-point the prose documents.
INTRO.sections.forEach((s) => {
  s.p = s.p.replace(/reading and writing/gi, "writing").replace(/The unit test assesses reading and writing;?/g, "The unit test assesses writing;");
});
PLAN_DETAIL.assessment = "Formative throughout. Everything evaluated in this course is writing. The only summative pieces are the Voices Notebook reflection (Lesson 12, with the marked draft attached) and the unit test (Part A language, Part B writing). Reading and speaking tasks in every lesson are input and rehearsal for the writing and are not scored. The Lesson 1 paragraph is never marked; the Lesson 3 writing sample is marked for the district and kept as the September baseline.";

module.exports = { PRACTICE, UNITTEST, SCALE, RUBRIC, PLAN_DETAIL, INTRO, PARENT_LETTER, TEST_LETTER, FORM_W };
