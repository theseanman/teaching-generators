// ELL 3 U1 — spec section 16 (Can-Do Statement Alignment) and the Oral Language
// evidence record.
//
// IMPORTANT: BC does not publish "Can-Do statements". Every "I can..." below is
// DERIVED by paraphrasing the BC ELL Standards 2017 Secondary (8-12) matrix
// descriptors into student-facing language. The source descriptor is carried
// alongside each one so the derivation is auditable, and the documents say so
// on their face. Do not let a derived statement travel into report-card
// language without that label.

const SOURCE_NOTE = "The W-numbered outcomes are the RSS ELL3 (Expanding) Learning Outcomes form, Writing section, quoted as printed. The bracketed descriptors are not official Ministry text. BC publishes matrices and quick scales, not Can-Do statements. Each line below is a plain-language paraphrase of a Secondary (8-12) descriptor from the ELL Standards 2017, printed beside its source so the wording can be checked against the original.";

const ALIGNMENT = {
  level: "Expanding (3), working toward Consolidating (4)",
  lever: "General detail \u2192 specific detail, and inference from explicit information \u2192 inference substantiated from implicit information.",
  domains: [
    {
      name: "Writing",
      pages: "ELL Standards 2017, Secondary (8-12) Writing matrix",
      rows: [
        { can: "I can write a paragraph about one focused idea, and a reader can follow it.",
          src: "Expanding, Meaning: express a focused idea with some elaboration; meaning is generally comprehensible.",
          lessons: "L1, L10, L12" },
        { can: "I can choose details a reader could picture, instead of details that could describe anybody.",
          src: "Moving from Expanding \u201Csome general & relevant details\u201D toward Consolidating \u201Csome specific & appropriate details to enhance meaning\u201D.",
          lessons: "L2, L4, L9, L10, L12" },
        { can: "I can gather material before I write, and throw most of it away.",
          src: "Expanding, Meaning/Strategies: use pre-writing plans, multiple sources, frameworks and models to produce and revise text.",
          lessons: "L9, L10" },
        { can: "I can write compound and complex sentences and punctuate them correctly.",
          src: "Expanding, Style: use a variety of compound and complex sentences. Conventions: capitalization and commas.",
          lessons: "L5, L8, L12" },
        { can: "I can choose a stronger verb or noun instead of adding more adjectives.",
          src: "Expanding, Style: use vocabulary more purposefully, including descriptive and academic words.",
          lessons: "L4, L12" },
        { can: "I can revise for what the writing says before I edit for how it is spelled.",
          src: "Expanding, Conventions: edit and revise expository and narrative text for word choice, punctuation, spelling, basic grammatical structures, and some fragments and run-ons.",
          lessons: "L12" },
      ],
    },
    {
      name: "Reading",
      pages: "ELL Standards 2017, Secondary (8-12) Reading matrix",
      rows: [
        { can: "I can work out an unfamiliar word from the words around it instead of stopping.",
          src: "Expanding, Strategies: use predicting, inferencing, contextual clues and word analysis to read unfamiliar text.",
          lessons: "L6, L11" },
        { can: "I can say what happens in a story and explain how the events connect.",
          src: "Expanding, Comprehension: describe main events or ideas and explain the relationship between them.",
          lessons: "L6, L7" },
        { can: "I can work out something the story suggests but does not say, and point to the words that made me think it.",
          src: "Moving from Expanding \u201Cmake simple inferences based on explicit information\u201D toward Consolidating \u201Cmake and substantiate basic inferences from explicit and some implicit information\u201D.",
          lessons: "L6, L11" },
        { can: "I can tell the difference between what a text states and what it implies.",
          src: "Consolidating, Comprehension: understand implied meaning of some social and cultural references; understand hypothetical and inferential passages.",
          lessons: "L11" },
        { can: "I can name what a story is saying about life, not just what it is about.",
          src: "Expanding, Comprehension: understand explicit social and cultural references and some simple literary techniques. Response: express opinions with some rationale.",
          lessons: "L7" },
        { can: "I can connect a story to my own life or to another text and give my reasons.",
          src: "Expanding, Response & Analysis: make logical connections to self or other texts supported by reasons; support key ideas with background knowledge.",
          lessons: "L7, L11" },
      ],
    },
    {
      name: "Oral Language",
      pages: "ELL Standards 2017, Secondary (8-12) Oral Language matrix",
      rows: [
        { can: "I can give an opinion in class and say why I think it.",
          src: "Expanding, Use (expressive): use language to comment, give opinions, clarify, express agreement or disagreement. Quick Scale: express simple opinions and reasons to participate in classroom conversations.",
          lessons: "L2, L6, L7, L11" },
        { can: "I can disagree with a partner without the conversation stopping.",
          src: "Expanding, Use (expressive): express agreement and disagreement; use strategies including active listening and clarifying questions to sustain a range of communicative tasks.",
          lessons: "L7, L11" },
        { can: "I can describe something out loud with enough detail that my partner can picture it.",
          src: "Expanding, Meaning (expressive): express and connect ideas and some supporting details using conjunctions, prepositional phrases, and time and sequence markers.",
          lessons: "L1, L4, L9" },
        { can: "I can keep talking when I do not know the exact word, by describing it another way.",
          src: "Expanding, Use (expressive): use strategies including circumlocution to initiate and sustain communicative tasks.",
          lessons: "L4, L9" },
        { can: "I can listen to a partner for a full minute without interrupting.",
          src: "Expanding, Use (expressive): active listening. Receptive: understand main ideas and examples linked by cohesive devices in straightforward discourse.",
          lessons: "L9, L10" },
        { can: "I can ask a question when I have not understood something.",
          src: "Expanding, Use (expressive): seek clarification by asking questions.",
          lessons: "all lessons" },
      ],
    },
  ],
  caution: "Two limits worth stating plainly. First, one unit does not move a student between proficiency levels \u2014 the ELL Standards are a year-scale instrument, and a September unit gathers a first sample, not a judgement. Second, the statements above describe what this unit gives students the chance to demonstrate. Whether an individual student demonstrates most of the descriptors in a level column is a separate determination made across the term, from more evidence than one unit can supply.",
};

const ORAL_RECORD = {
  title: "Oral Language Evidence Record",
  subtitle: "Unit 1 \u00B7 observational \u00B7 not marked",
  intro: "Speaking and listening is a reported domain, and it is the one most easily lost in a writing-heavy unit. Every lesson in Unit 1 has a paired or small-group task; this sheet is where that evidence gets recorded so it exists by the time a term judgement is due. Nothing here is marked and nothing here goes to students.",
  howToUse: [
    "Aim for five or six students per lesson, not the whole class. Rotate.",
    "Record what you observed, not a level. Levels are decided later, across accumulated evidence.",
    "A blank is information. A student who has produced no oral evidence by Lesson 8 is telling you something.",
    "The three columns below map to the Expanding descriptors the unit's speaking tasks actually give students a chance to show.",
  ],
  columns: [
    ["Opinion with a reason", "Gave a view and said why \u2014 not just agreement. L2, L6, L7 and L11 all set this up."],
    ["Sustaining", "Disagreed, asked a clarifying question, or worked around a word they did not have (circumlocution) rather than stopping."],
    ["Listening", "Responded to what a partner actually said. The Lesson 9 sixty-second task is the clearest place to see this."],
  ],
  lessonTasks: [
    ["L1", "Name your place and one detail to a partner. No correcting."],
    ["L2", "Read a rewrite; partner guesses the original general sentence."],
    ["L3", "No partner talk: district writing sample. Silent self-check only."],
    ["L4", "Describe the room using only sound, then smell or touch."],
    ["L5", "Partner A gives a simple sentence; B adds a clause."],
    ["L6", "Threes: argue about what Arman wants. One must disagree and defend it."],
    ["L7", "Share a theme; partner challenges it from the text."],
    ["L8", "Respond to a fact with a complex sentence using although, then because."],
    ["L9", "Sixty seconds on one circled detail. Partner may not speak."],
    ["L10", "Read your opening; partner says only what they now expect."],
    ["L11", "Take opposite positions on whether Priya is reliable. Quote twice."],
    ["L12", "Swap clean drafts. One picture, one place you wanted more. No grammar."],
  ],
};


// =====================================================================
// SEP 8 2026 — WRITING-ONLY. The alignment now maps each lesson to the WRITING
// outcomes of the RSS ELL3 (Expanding) Learning Outcomes form (W1–W15), with the
// ELL Standards descriptor kept beside it for the audit trail. Reading and oral
// rows are dropped from the document; those tasks remain in the lessons as
// unassessed input. The Oral Language Evidence Record is no longer generated.
// =====================================================================
ALIGNMENT.level = "Expanding (3) \u2014 RSS ELL3 Learning Outcomes, Writing section";
ALIGNMENT.lever = "General detail \u2192 specific detail. Everything evaluated in this unit is writing; the form outcomes below are the ones Unit 1 teaches and can report.";
ALIGNMENT.domains = [
  { name: "Writing \u2014 RSS form outcomes taught and evidenced in Unit 1", pages: "RSS ELL3 (Expanding) Learning Outcomes 2023, Writing; ELL Standards 2017 Secondary Writing matrix in brackets",
    rows: [
      { can: "W1 \u2014 Use familiar and some academic content language", src: "[Expanding: some descriptive, expressive and technical language]", lessons: "L2, L4, L10, L12 \u2014 evidence: test A and C, paragraph rubric (word choice)" },
      { can: "W2 \u2014 Write longer and more descriptive sentences", src: "[Expanding \u2192 Consolidating: general \u2192 specific details]", lessons: "L1, L2, L4, L9, L10, L12 \u2014 evidence: paragraph rubric (specific detail), test C" },
      { can: "W4 \u2014 Use conjunctions to connect ideas and sentences (for, and, but, so)", src: "[Expanding: simple and compound sentences]", lessons: "L5 \u2014 evidence: test B, paragraph rubric (sentence control)" },
      { can: "W5 \u2014 Complex and compound sentences using connecting words (because, while, when, since, before, after)", src: "[Expanding: subordinate conjunctions; commas after fronted clauses]", lessons: "L5, L8 \u2014 evidence: test B, paragraph rubric (sentence control)" },
      { can: "W11 \u2014 Use appropriate subject/verb agreement", src: "[Expanding: consistent tense and agreement in simple text]", lessons: "L8, L12 \u2014 evidence: test D (self-edit)" },
      { can: "W12 \u2014 Use capitalization and punctuation correctly", src: "[Expanding: commas and quotation marks]", lessons: "L5, L8, L12 \u2014 evidence: test B and D, paragraph rubric (sentence control)" },
      { can: "W13 \u2014 Use articles and prepositions properly", src: "[Expanding: prepositional phrases; articles]", lessons: "L12 \u2014 evidence: test D (self-edit)" },
      { can: "W14 \u2014 Write complete sentences with very few errors", src: "[Expanding: meaning generally comprehensible; edit and revise paragraphs]", lessons: "L5, L10, L12 \u2014 evidence: paragraph rubric (complete sentences), Notebook reflection" },
      { can: "W15 \u2014 Attempt to revise and self-edit writing", src: "[Expanding: use models and frameworks to produce and revise text]", lessons: "L12 \u2014 evidence: clean draft with marked draft attached; test D" },
    ] },
  { name: "Not evidenced in Unit 1 (N/A on the Term 1 form unless a later unit supplies it)", pages: "RSS form",
    rows: [
      { can: "W3 figurative language \u2014 taught in Unit 2", src: "", lessons: "U2" },
      { can: "W6 composition with introduction, body, conclusion; W7 thesis; W8 essay styles; W9 transitions", src: "", lessons: "U4\u2013U8" },
      { can: "W10 variety of tenses including modals and conditionals", src: "", lessons: "U6\u2013U7" },
    ] },
  { name: "Reading and oral language \u2014 taught in every lesson, never scored", pages: "",
    rows: [
      { can: "The two stories (L6\u20137, L11) and every paired-talk task are input and rehearsal for the writing. They appear in the lesson plans as unassessed activities and are not reported by this course.", src: "", lessons: "L1\u2013L12" },
    ] },
];
ALIGNMENT.caution = "The W-numbers are the writing outcomes on the RSS ELL3 (Expanding) Learning Outcomes form, numbered top to bottom as printed. A lesson\u2019s alignment box carries only the outcomes that lesson teaches. N/A on the report means not yet taught, exactly as the form\u2019s footnote says \u2014 it is never used for an outcome that was taught but not shown.";
const ORAL_RECORD_DISABLED = true;

module.exports = { ALIGNMENT, ORAL_RECORD, SOURCE_NOTE, ORAL_RECORD_DISABLED };
