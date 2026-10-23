// ELL 3 U2 — spec section 16 (Can-Do Statement Alignment) and the Oral Language
// evidence record.
//
// BC does not publish "Can-Do statements". Every "I can..." below is DERIVED by
// paraphrasing a BC ELL Standards 2017 Secondary (8-12) matrix descriptor into
// student-facing language, and is printed beside its source so the derivation is
// auditable. Do not let a derived statement reach report-card language without
// that label.

const SOURCE_NOTE = "These statements are not official Ministry text. BC publishes matrices and quick scales, not Can-Do statements. Each line below is a plain-language paraphrase of a Secondary (8-12) descriptor from the ELL Standards 2017, printed beside its source so the wording can be checked against the original.";

const ALIGNMENT = {
  level: "Expanding (3), working toward Consolidating (4)",
  lever: "Literal \u2192 figurative, treated as precision rather than decoration; and explicit cultural reference \u2192 implied cultural meaning.",
  domains: [
    {
      name: "Writing",
      pages: "ELL Standards 2017, Secondary (8-12) Writing matrix",
      rows: [
        { can: "I can use a comparison to say something more exactly than a plain sentence would.",
          src: "Moving from Expanding \u201Csome descriptive, expressive & technical language\u201D toward Consolidating \u201Csome clear & varied descriptive, expressive, technical, & FIGURATIVE language\u201D.",
          lessons: "L1, L2, L3, L8" },
        { can: "I can tell when a comparison has been used too often to work, and replace it.",
          src: "Expanding, Style: use vocabulary more purposefully. Conventions: edit and revise text for word choice.",
          lessons: "L4, L12" },
        { can: "I can write about one small moment instead of a whole subject.",
          src: "Expanding, Meaning: express a focused idea with some elaboration. Form: produce brief examples of personal and imaginative genres including recounts and narratives.",
          lessons: "L9, L10" },
        { can: "I can decide before I draft where my figurative language will go and what it is for.",
          src: "Expanding, Meaning/Strategies: use pre-writing plans, frameworks and models to produce and revise text.",
          lessons: "L9, L10" },
        { can: "I can leave most of my sentences plain so that one comparison stands out.",
          src: "Consolidating, Style: use some clear and varied figurative language; a growing sense of voice and tone appropriate to purpose and audience.",
          lessons: "L8, L10, L12" },
        { can: "I can end a piece of writing without explaining what it meant.",
          src: "Expanding, Form: provide an effective introduction and conclusion. Conventions: edit and revise narrative text for word choice.",
          lessons: "L10, L12" },
      ],
    },
    {
      name: "Reading",
      pages: "ELL Standards 2017, Secondary (8-12) Reading matrix",
      rows: [
        { can: "I can recognise figurative language in a text and say what it is doing, not just name it.",
          src: "Expanding, Comprehension: understand explicit social and cultural references, and some simple literary techniques such as figurative language.",
          lessons: "L6, L7" },
        { can: "I can follow an image that comes back again and again through a whole story.",
          src: "Consolidating, Comprehension: describe and analyze main events or ideas with some insight; understand ideas in extended text connected by a range of cohesive devices.",
          lessons: "L6" },
        { can: "I can work out an idiom I have never met from the words around it.",
          src: "Expanding, Strategies: use predicting, inferencing, contextual clues and word analysis to read unfamiliar text.",
          lessons: "L5, L11" },
        { can: "I can spot a cultural reference and say what a reader would need to know for it to make sense.",
          src: "Moving from Expanding \u201Cunderstand explicit social & cultural references\u201D toward Consolidating \u201Cunderstand implied meaning of some social references, cultural references\u201D.",
          lessons: "L7, L11" },
        { can: "I can say what a story claims about life, and point to the words that support it.",
          src: "Expanding, Response & Analysis: express opinions with some rationale; make logical connections to self or other texts supported by reasons.",
          lessons: "L7" },
        { can: "I can work out something a story means but never says, and quote the evidence.",
          src: "Consolidating, Comprehension: make and substantiate basic inferences from explicit and some implicit information.",
          lessons: "L11" },
      ],
    },
    {
      name: "Oral Language",
      pages: "ELL Standards 2017, Secondary (8-12) Oral Language matrix",
      rows: [
        { can: "I can keep talking when I do not have the exact word, by describing it another way.",
          src: "Expanding, Use (expressive): use strategies including circumlocution to initiate and sustain a range of communicative tasks.",
          lessons: "L1, L4, L5" },
        { can: "I can explain an expression from my first language to someone who does not speak it.",
          src: "Expanding, Use (expressive): use language to comment, clarify, describe, and explain. Meaning: express and connect ideas and some supporting details.",
          lessons: "L1, L4, L5" },
        { can: "I can recognise when English is being used informally rather than formally.",
          src: "Expanding, Use (receptive): understand some common social expressions, slang, humour and common idioms, and recognize differences in register and intonation in various contexts.",
          lessons: "L5, L11" },
        { can: "I can disagree with a partner and keep the conversation going.",
          src: "Expanding, Use (expressive): express agreement and disagreement; use active listening and clarifying questions to sustain communicative tasks.",
          lessons: "L6, L7, L11" },
        { can: "I can describe something out loud for a minute without stopping.",
          src: "Expanding, Meaning (expressive): express and connect ideas and some supporting details using conjunctions, prepositional phrases, and time and sequence markers.",
          lessons: "L8, L9" },
        { can: "I can ask what an expression means instead of guessing and moving on.",
          src: "Expanding, Use (expressive): seek clarification by asking questions.",
          lessons: "all lessons" },
      ],
    },
  ],
  caution: "Two limits worth stating plainly. First, one unit does not move a student between proficiency levels \u2014 the ELL Standards are a year-scale instrument. Second, the statements above describe what this unit gives students the chance to demonstrate; whether an individual student demonstrates most of the descriptors in a level column is a separate determination made across the term, from more evidence than one unit can supply.",
};

const ORAL_RECORD = {
  title: "Oral Language Evidence Record",
  subtitle: "Unit 2 \u00B7 observational \u00B7 not marked",
  intro: "Speaking and listening is a reported domain and it is the one most easily lost in a writing-heavy unit. Every lesson in Unit 2 has a paired or small-group task; this sheet is where that evidence gets recorded so it exists by the time a term judgement is due. Nothing here is marked and nothing here goes to students.",
  howToUse: [
    "Aim for five or six students per lesson, not the whole class. Rotate.",
    "Record what you observed, not a level. Levels are decided later, across accumulated evidence.",
    "A blank is information. A student who has produced no oral evidence by Lesson 8 is telling you something.",
    "Unit 2 adds a fourth column: several tasks specifically ask students to explain or work around language, which is the Expanding circumlocution descriptor in action.",
  ],
  columns: [
    ["Opinion with a reason", "Gave a view and said why. L6, L7 and L11 all set up genuine disagreement."],
    ["Sustaining", "Disagreed, asked a clarifying question, or changed position on evidence rather than stopping."],
    ["Working around", "Explained a first-language expression, or described something they did not have the word for, rather than abandoning the turn."],
    ["Listening", "Responded to what a partner actually said. The Lesson 9 sixty-second task is the clearest place to see this."],
  ],
  lessonTasks: [
    ["L1", "Explain an expression from your first language that does not translate."],
    ["L2", "Say a simile for the weather; partner names the shared quality."],
    ["L3", "Give a metaphor for school; partner extends it in the same world."],
    ["L4", "Name a clich\u00e9; partner works out what it originally pictured."],
    ["L5", "Teach a first-language idiom; partner must guess before being told."],
    ["L6", "Threes: which comparison does the most work? Disagree at least once."],
    ["L7", "Share a theme; partner finds where it does not hold."],
    ["L8", "Sixty seconds: describe the building as a person with opinions about you."],
    ["L9", "Sixty seconds on your circled moment. Partner may not speak."],
    ["L10", "Read only your opening; partner says what they expect next."],
    ["L11", "Opposite positions on whether Bilal was treated unfairly. Quote twice."],
    ["L12", "Swap drafts. One comparison that worked, one place you wanted it plainer."],
  ],
};

module.exports = { ALIGNMENT, ORAL_RECORD, SOURCE_NOTE };
