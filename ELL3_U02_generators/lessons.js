// ELL 3 — Unit 2 (October) — "Saying It Sideways": figurative language and cultural narratives
// Lever = LITERAL -> FIGURATIVE, framed as precision rather than decoration.
// Reading: Expanding (3) "understand explicit social & cultural references, and some simple
// literary techniques such as figurative language" -> Consolidating (4) "understand implied
// meaning of some social references, cultural references".
// Writing: Expanding (3) "some descriptive, expressive & technical language; some evidence of
// personal & authentic voice" -> Consolidating (4) "some clear & varied descriptive,
// expressive, technical, & FIGURATIVE language".
// Ongoing assignment: the Comparison Log, checkpoints at L3, L6, L9, L12.

const UNIT = {
  course: "ELL3",
  code: "U02",
  num: 2,
  month: "October",
  title: "Saying It Sideways",
  subtitle: "Figurative Language and Cultural Narratives",
  composition: "Cultural narrative paragraph using controlled figurative language",
};

const ACCENTS = [
  "1565C0", "0F8A8A", "2E9E5B", "C77800", "C0504D", "6A4C93",
  "1565C0", "0F8A8A", "2E9E5B", "C77800", "C0504D", "6A4C93",
];

const LESSONS = [
  {
    n: 1, ytPart: "D",
    banner: {
      obj: "I can tell literal language from figurative.",
      std: "Writing: use a comparison to say something more exactly than a plain sentence.",
      comp: ["COM", "TH"],
    },
    title: "The Longer Way Round",
    slug: "TheLongerWayRound",
    warmup: [
      "\u201CI was tired\u201D and \u201CI was running on empty\u201D describe the same thing. Which one tells you more?",
      "Why would a writer take the longer way round instead of just saying it?",
    ],
    goals: [
      "Tell the difference between literal and figurative language",
      "Explain what a comparison adds that a plain statement cannot",
      "Recognise figurative language you already use in your first language",
    ],
    vocab: [
      ["literal", "the direct meaning; exactly what the words say"],
      ["figurative", "language that means something other than its literal words"],
      ["comparison", "putting two things side by side to show something"],
      ["image", "a picture the words make in a reader's mind"],
      ["effect", "what a piece of language does to the reader"],
      ["exact", "precise; not approximate"],
      ["ordinary", "usual; the normal way of saying something"],
      ["expression", "a set phrase people use"],
      ["translate", "to carry meaning from one language into another"],
      ["decoration", "something added for looks rather than for use"],
    ],
    teach1: {
      title: "Figurative is not decoration",
      points: [
        "Students are often taught that figurative language makes writing prettier. That is the wrong reason.",
        "\u201CI was tired\u201D covers a hundred kinds of tired. \u201CRunning on empty\u201D names one exactly.",
        "The comparison is a measuring tool. It gets closer to the truth, not further from it.",
        "If a comparison does not make the meaning more exact, cut it.",
      ],
    },
    teach2: {
      title: "You already do this",
      points: [
        "Every language has figurative expressions. Yours has hundreds.",
        "Some cross into English and some do not. Both facts are useful to a writer.",
        "An expression that does not translate tells you something real about the two languages.",
        "Today you will write one down in your first language, then try to carry it across.",
      ],
    },
    examples: [
      "Literal: The room was silent. \u2192 Figurative: The room held its breath.",
      "Literal: He was very thin. \u2192 Figurative: His watch spun loose on his wrist.",
      "Note that the second example uses no comparison words at all. It shows instead of comparing \u2014 that counts too.",
    ],
    practice: {
      instr: "For each plain sentence, decide what exactly is meant, then write a figurative version that says that exact thing.",
      items: [
        "The line at the bank was long.",
        "She was nervous before the test.",
        "The classroom was hot.",
        "He spoke very quietly.",
        "The city was crowded.",
      ],
    },
    speaking: {
      instr: "Tell a partner one expression from your first language that does not translate into English. Explain what it means and when people say it.",
      prompts: [
        "In my language we say _____.",
        "It means something like _____.",
        "People say it when _____.",
      ],
    },
    yourturn: {
      instr: "Write one expression from your first language at the top of a clean page. Underneath, write three things: what it literally says, word for word; what it actually means; and the closest English expression you can find, or a note that there is not one. Then write two or three sentences on what gets lost in the crossing. Keep this page \u2014 you will use it again in Lesson 9.",
    },
    exit: [
      "Give one example of figurative language you have heard in English this week.",
      "In your own words, why is figurative language not decoration?",
    ],
  },
  {
    n: 2, ytPart: "D",
    banner: {
      obj: "I can identify and write similes.",
      std: "Writing: use a comparison to say something more exactly.",
      comp: ["TH"],
    },
    title: "Like and As",
    slug: "LikeAndAs",
    warmup: [
      "\u201CHer hands were like her mother's.\u201D Is that figurative?",
      "What is the difference between comparing two similar things and comparing two unlike things?",
    ],
    goals: [
      "Identify and write similes",
      "Judge whether a simile earns its place",
      "Avoid similes that compare two things that are already alike",
    ],
    vocab: [
      ["simile", "a comparison using like or as"],
      ["unlike", "different in kind"],
      ["surprising", "not what the reader expected"],
      ["tired phrase", "a comparison used so often it has stopped working"],
      ["precise", "exact"],
      ["vivid", "producing a strong clear picture"],
      ["quality", "the feature two things share"],
      ["stretch", "to reach further than expected"],
      ["obvious", "easy to see; not worth saying"],
      ["earn", "to deserve a place through usefulness"],
    ],
    teach1: {
      title: "A simile compares two unlike things",
      points: [
        "\u201CHer hands were like her mother's\u201D is not a simile. Two hands are alike already.",
        "\u201CHer hands were like folded paper\u201D is. Hands and paper are unlike, and the comparison names a quality.",
        "The two things must be different in kind, but share one exact feature.",
        "The reader should be able to say what the shared feature is.",
      ],
    },
    teach2: {
      title: "The test: does it add?",
      points: [
        "\u201CAs cold as ice\u201D adds nothing. Everyone already knows cold.",
        "\u201CAs cold as the inside of a phone\u201D adds something \u2014 a particular kind of cold you can feel.",
        "Ask: after the comparison, do I know something I did not know before?",
        "If the answer is no, the plain sentence was better.",
      ],
    },
    examples: [
      "Weak: The snow was as white as paper. \u2014 tells you nothing new about snow.",
      "Better: The snow came down like ash. \u2014 changes the colour, the weight, and the mood at once.",
      "Structure: [thing] + like / as + [unlike thing]. Keep the shared quality in mind while you write it.",
    ],
    practice: {
      instr: "Mark each one EARNS or CUT. If you write CUT, replace it with a better simile.",
      items: [
        "The baby's skin was as soft as silk.",
        "The airport at 4 a.m. was like a hospital corridor.",
        "My grandmother's voice was like a grandmother's voice.",
        "The traffic moved like honey off a spoon.",
        "The exam was as hard as a rock.",
      ],
    },
    speaking: {
      instr: "Say a simile for the weather today. Your partner says what shared quality they think you meant. Swap and try again with a harder subject.",
      prompts: [
        "Today the sky is like _____.",
        "I think the quality you meant was _____.",
        "Close \u2014 what I actually meant was _____.",
      ],
    },
    yourturn: {
      instr: "Write five similes about things in this room. Rules: the two things compared must be unlike, and none of your comparisons may use ice, snow, feathers, rocks, or the sun. When you have five, read them back and cross out the two weakest. Beside each survivor, write the one shared quality in a single word. If you cannot name the quality, that simile is not working yet.",
    },
    exit: [
      "Write one simile that you know is bad, and say why it fails.",
      "What is the difference between comparing and simply describing?",
    ],
  },
  {
    n: 3, ytPart: "D",
    banner: {
      obj: "I can identify and write metaphors.",
      std: "Writing: use a comparison to say something more exactly.",
      comp: ["TH"],
    },
    title: "Saying It Is",
    slug: "SayingItIs",
    warmup: [
      "\u201CMy brother is like a wall\u201D and \u201CMy brother is a wall.\u201D What changed?",
      "Which one is stronger? Why do you think so?",
    ],
    goals: [
      "Identify and write metaphors",
      "Convert similes into metaphors and notice the difference",
      "Start the Comparison Log",
    ],
    vocab: [
      ["metaphor", "a comparison that says one thing IS another"],
      ["implied", "suggested without being stated"],
      ["direct", "stated openly"],
      ["extended", "carried on across several sentences"],
      ["mixed", "combining two comparisons that do not fit together"],
      ["source", "the thing you compare to"],
      ["subject", "the thing you are describing"],
      ["claim", "a statement that something is the case"],
      ["log", "a record kept over time"],
      ["justify", "to give the reason for something"],
    ],
    teach1: {
      title: "Metaphor drops the like",
      points: [
        "A simile says one thing is LIKE another. A metaphor says it IS another.",
        "Dropping the like removes the writer's hedge. The claim gets stronger.",
        "\u201CThe hallway was a wind tunnel\u201D commits in a way \u201Clike a wind tunnel\u201D does not.",
        "Use the simile when you want the reader to see the comparison being made. Use the metaphor when you want them inside it.",
      ],
    },
    teach2: {
      title: "Do not mix them",
      points: [
        "A mixed metaphor starts in one place and finishes in another.",
        "\u201CWe will burn that bridge when we come to it\u201D combines two expressions and means nothing.",
        "If you extend a metaphor, keep it in the same world for its whole length.",
        "Read your metaphor aloud. If you can picture it, it holds. If you cannot, it is mixed.",
      ],
    },
    examples: [
      "Simile: The new school was like a machine I did not know how to work.",
      "Metaphor: The new school was a machine I did not know how to work.",
      "Extended: \u2026 I pressed the wrong buttons for a month. By November I had found two that did what I wanted.",
    ],
    practice: {
      instr: "Rewrite each simile as a metaphor. Then say in a few words what changed.",
      items: [
        "The winter here is like a long tunnel.",
        "His silence was like a closed door.",
        "The first week felt like standing in a river.",
        "Her accent was like a passport she could not put away.",
        "The city was like a machine that never turned off.",
      ],
    },
    speaking: {
      instr: "In pairs, one of you gives a metaphor for school. The other extends it by one sentence, staying in the same world. Then swap.",
      prompts: [
        "School is _____.",
        "So the _____ is _____.",
        "That does not fit, because _____.",
      ],
    },
    yourturn: {
      instr: "Comparison Log, entry one. Each lesson you record one comparison \u2014 a simile, metaphor, idiom, or image \u2014 taken from your own life, from something you read, or from something you heard. Write it down, then one line saying what it makes exact that a plain sentence would not. Today, write one metaphor for the month of October where you live, and justify it. Checkpoint one is today.",
    },
    exit: [
      "Write one mixed metaphor on purpose, then fix it.",
      "When would you choose a simile over a metaphor?",
    ],
  },
  {
    n: 4, ytPart: "D",
    banner: {
      obj: "I can spot a cliche and replace it.",
      std: "Writing: tell when a comparison is too worn to work, and replace it.",
      comp: ["TH"],
    },
    title: "Worn Smooth",
    slug: "WornSmooth",
    warmup: [
      "\u201CHeart of gold.\u201D \u201CCrystal clear.\u201D \u201CAt the end of the day.\u201D What do these have in common?",
      "These were all good comparisons once. What happened to them?",
    ],
    goals: [
      "Recognise clichés and dead metaphors",
      "Understand why an overused comparison stops working",
      "Repair a tired phrase by making it specific",
    ],
    vocab: [
      ["cliché", "a phrase used so often it has lost its force"],
      ["dead metaphor", "a comparison so familiar nobody pictures it anymore"],
      ["overused", "used too many times"],
      ["fresh", "new; not used before"],
      ["automatic", "happening without thought"],
      ["worn", "made smooth or weak by use"],
      ["replace", "to put something new in the place of something old"],
      ["specific", "exact; about one particular thing"],
      ["habit", "something done without deciding to"],
      ["notice", "to become aware of"],
    ],
    teach1: {
      title: "Why clichés fail",
      points: [
        "A comparison works by making the reader stop and picture something.",
        "After the thousandth use, nobody pictures anything. The words go past like traffic.",
        "\u201CHeart of gold\u201D no longer produces gold, or a heart. It produces \u201Cnice person\u201D.",
        "That is fine in speech. In writing it wastes the space a real comparison could have used.",
      ],
    },
    teach2: {
      title: "Dead metaphors are everywhere",
      points: [
        "\u201CThe leg of the table.\u201D \u201CThe mouth of the river.\u201D \u201CFalling asleep.\u201D",
        "These were all comparisons once. Now they are just the words for those things.",
        "You do not need to avoid these \u2014 the language is built from them.",
        "You do need to notice when you have reached for a tired phrase instead of thinking.",
      ],
    },
    examples: [
      "Cliché: She was as busy as a bee. \u2192 Repair: She answered the phone with a pen already in her mouth.",
      "Cliché: Time flies. \u2192 Repair: My sister was nine when we packed. She is thirteen.",
      "Note that both repairs replace the comparison with a specific fact. That is often the cure.",
    ],
    practice: {
      instr: "Each of these is a cliché. Replace it with something specific that does the same job.",
      items: [
        "My first day was a rollercoaster.",
        "He has a heart of gold.",
        "The news hit me like a ton of bricks.",
        "We were like one big happy family.",
        "I was on cloud nine.",
      ],
    },
    speaking: {
      instr: "Name a cliché you hear often in English. Your partner tries to say what it originally pictured. Then find one in your first language and do the same.",
      prompts: [
        "People always say _____.",
        "I think it originally pictured _____.",
        "In my language the tired phrase for that is _____.",
      ],
    },
    yourturn: {
      instr: "Take the five similes you kept from Lesson 2 and read them again with today's question in mind: has anyone written this before? Mark each one FRESH or WORN. For any you mark WORN, write a replacement that uses a specific fact instead of a comparison. Then add today's Comparison Log entry, and make it one you are confident nobody in this room would have written.",
    },
    exit: [
      "Write one dead metaphor you used today without noticing.",
      "Why can a cliché be fine in conversation but weak in writing?",
    ],
  },
  {
    n: 5, ytPart: "D",
    banner: {
      obj: "I can work out an idiom I have never met before.",
      std: "Reading: work out an idiom from the words around it.",
      comp: ["COM", "TH"],
    },
    title: "The Meaning Is Not in the Words",
    slug: "TheMeaningIsNotInTheWords",
    warmup: [
      "\u201CIt is raining cats and dogs.\u201D If you translated that word for word into your first language, what would people think?",
      "How do you usually work out an English expression you have never heard?",
    ],
    goals: [
      "Understand what an idiom is and why it cannot be translated word for word",
      "Use context to work out an unfamiliar idiom",
      "Recognise idioms as a real barrier and a real tool",
    ],
    vocab: [
      ["idiom", "a phrase whose meaning is not in its literal words"],
      ["context", "the words and situation around a phrase"],
      ["colloquial", "informal; the way people actually speak"],
      ["slang", "very informal language, often used by one group"],
      ["register", "how formal or informal language is"],
      ["confusing", "hard to understand"],
      ["guess", "to work something out without being certain"],
      ["figurative meaning", "what a phrase means beyond its literal words"],
      ["clue", "something that helps you work out an answer"],
      ["cross over", "to move from one language into another"],
    ],
    teach1: {
      title: "Idioms are locked boxes",
      points: [
        "\u201CThe ball is in your court.\u201D No ball. No court. The words are the box, not the contents.",
        "You cannot open the box by translating. The meaning was agreed by a group of speakers over time.",
        "This is why idioms are one of the hardest parts of a new language \u2014 and the most useful signal that you are inside it.",
        "Every language does this. Yours has idioms an English speaker could never guess.",
      ],
    },
    teach2: {
      title: "How to work one out",
      points: [
        "Do not translate. Read the whole sentence and then the one after it.",
        "Ask what the speaker is trying to do: warn, complain, agree, refuse?",
        "The tone usually survives even when the words do not.",
        "Then ask outright. \u201CWhat does that mean?\u201D is a full and respectable sentence.",
      ],
    },
    examples: [
      "\u201CI'll play it by ear.\u201D \u2014 nothing to do with ears or music. It means: I will decide as I go.",
      "\u201CShe threw me under the bus.\u201D \u2014 no bus. It means: she blamed me to protect herself.",
      "\u201CIt's not my cup of tea.\u201D \u2014 no tea. It means: I do not like it. Note how mild it is \u2014 the tone is the real content.",
    ],
    practice: {
      instr: "Read each idiom in its sentence. Write what you think it means and the clue that told you.",
      items: [
        "I asked for the day off and my manager gave me the cold shoulder.",
        "We were on the same page about who would pick her up.",
        "He let the cat out of the bag about the party.",
        "After three interviews I finally got my foot in the door.",
        "That test was a piece of cake compared with the last one.",
      ],
    },
    speaking: {
      instr: "Teach your partner one idiom from your first language. They must guess the meaning before you tell them. Then reverse.",
      prompts: [
        "In my language there is an expression that literally says _____.",
        "My guess is that it means _____.",
        "Close, but it actually means _____ and you say it when _____.",
      ],
    },
    yourturn: {
      instr: "Start an idiom page at the back of your Comparison Log. Write down five English idioms you have actually heard \u2014 in class, on the bus, online, at work. For each one, record where you heard it, what you think it means, and how sure you are on a scale of one to three. You are not being marked on getting them right. Bring the page to Lesson 9. Then add today's Comparison Log entry.",
    },
    exit: [
      "Which idiom from today was hardest to work out, and why?",
      "Write one English idiom you now understand that confused you when you arrived.",
    ],
  },
  {
    n: 6, ytPart: "D",
    banner: {
      obj: "I can find figurative language in a story and say what it does.",
      std: "Reading: recognise figurative language and say what it is doing.",
      comp: ["COM", "TH"],
    },
    title: "What the Tailor Said",
    slug: "WhatTheTailorSaid",
    warmup: [
      "If someone measures you for clothes, what do they learn about you that a photograph would not?",
      "Have you ever been told you had grown, by someone who had not seen you for a while?",
    ],
    goals: [
      "Read a short story closely for figurative language",
      "Explain what each comparison in a story is doing",
      "Track a comparison that returns more than once",
    ],
    vocab: [
      ["tailor", "a person who makes and alters clothes"],
      ["alter", "to change something to make it fit"],
      ["seam", "the line where two pieces of cloth are joined"],
      ["hem", "the folded edge at the bottom of clothing"],
      ["measure", "to find the size of something"],
      ["let out", "to make clothing larger by opening a seam"],
      ["take in", "to make clothing smaller"],
      ["motif", "an image or idea that returns through a text"],
      ["recur", "to happen again"],
      ["fit", "to be the right size and shape"],
    ],
    teach1: {
      title: "Comparisons do jobs",
      points: [
        "When you meet a comparison in a story, ask what job it is doing, not whether it is pretty.",
        "Some comparisons describe. Some judge. Some tell you what a character cannot say directly.",
        "In this story the narrator compares her mother to things that hold shape. Watch for that.",
        "A comparison a character makes tells you about the character, not only about the thing.",
      ],
    },
    teach2: {
      title: "Watch for the one that comes back",
      points: [
        "When an image returns across a story, it has become a motif.",
        "A motif is not decoration \u2014 it is the story keeping a question open.",
        "Cloth, measuring, and fitting run right through this story. Note every place they appear.",
        "The last appearance of a motif usually answers the first.",
      ],
    },
    examples: [
      "\u201CMy mother stood the way a coat stands when it is still on the hanger.\u201D \u2014 describes and judges at once.",
      "First appearance: the mother is measured and says nothing. Last appearance: she does the measuring.",
      "Weak reading: \u201CThe writer uses a simile here.\u201D Strong reading: \u201CThe simile makes the mother into something waiting to be worn.\u201D",
    ],
    practice: {
      instr: "Answer with a line number for each. One or two sentences.",
      items: [
        "Find the first comparison in the story. What job is it doing?",
        "Find a comparison the narrator makes about her mother. What does it tell you about the narrator?",
        "The word \u201Cfit\u201D appears more than once. List every place it appears.",
        "Where does the cloth motif first suggest something other than clothing?",
        "Find one sentence that is completely literal. Why is it placed where it is?",
      ],
    },
    speaking: {
      instr: "In threes, choose the comparison you think is doing the most work. You must disagree with each other at least once and settle it from the text.",
      prompts: [
        "The comparison doing the most work is _____ because _____.",
        "I would argue for _____ instead, because on that line _____.",
        "We agree it is doing _____, but not that it means _____.",
      ],
    },
    yourturn: {
      instr: "Write one paragraph of six to eight sentences answering this: what does the cloth motif tell you about the mother that the story never states directly? Use at least two comparisons from the text, quoting one exactly with its line number. Do not retell the plot. Then add today's Comparison Log entry, taken from the story: one comparison the writer chose, plus what it makes exact.",
    },
    exit: [
      "Which comparison in the story stayed with you?",
      "Comparison Log checkpoint two: hand your log in open at today's entry.",
    ],
  },
  {
    n: 7, ytPart: "D",
    banner: {
      obj: "I can spot a cultural reference and say what a reader needs to know.",
      std: "Reading: identify cultural references and what they require of a reader.",
      comp: ["COM", "PS"],
    },
    title: "What Does Not Cross",
    slug: "WhatDoesNotCross",
    warmup: [
      "In the story, the mother uses a word the narrator cannot translate. Has that happened to you?",
      "Is it the word that will not cross, or the thing behind the word?",
    ],
    goals: [
      "Identify cultural references in a text",
      "Explain what a reader needs to know to understand one",
      "State a theme that a cultural narrative supports",
    ],
    vocab: [
      ["cultural reference", "something a text mentions that assumes shared knowledge"],
      ["assume", "to take as already known"],
      ["background knowledge", "what a reader brings to a text before reading"],
      ["outsider", "someone not part of a group"],
      ["insider", "someone within a group"],
      ["untranslatable", "unable to be carried into another language"],
      ["theme", "an idea about life that a story explores"],
      ["universal", "true across many people and places"],
      ["particular", "belonging to one case only"],
      ["narrative", "a story; an account of connected events"],
    ],
    teach1: {
      title: "A reference assumes you know",
      points: [
        "Every text assumes something. A cultural reference is where that assumption shows.",
        "If you know it, the reference is invisible. If you do not, it is a wall.",
        "You are all outsiders to some references in this room, and insiders to others. That is an advantage.",
        "Ask: what would a reader need to know for this to land?",
      ],
    },
    teach2: {
      title: "Particular and universal at once",
      points: [
        "A good cultural narrative is not about explaining a culture to outsiders.",
        "It is about one particular family, in enough detail that anyone can enter it.",
        "The theme is universal. The details are not. Both are needed.",
        "A story that only explains produces a pamphlet. A story that only particularises produces a private note.",
      ],
    },
    examples: [
      "Topic: clothing. Plot: the mother alters the narrator's coat every autumn. Theme: a parent may keep a child fitting into a life the child has already outgrown.",
      "Weak theme: \u201CFamily is important.\u201D Nobody disagrees, so it claims nothing.",
      "Strong theme: \u201CCare and control can look identical from the inside.\u201D You could argue with that.",
    ],
    practice: {
      instr: "Write one full sentence for each. Themes must be claims, not topics.",
      items: [
        "Find one cultural reference in the story. What must a reader know for it to land?",
        "State a theme of the story in one sentence.",
        "State a second, different theme in one sentence.",
        "Which theme has more evidence behind it? Name the evidence.",
        "Write one text-to-world connection that is not simply \u201Cimmigration is hard\u201D.",
      ],
    },
    speaking: {
      instr: "Share your theme with a partner. Their only job is to find where in the text it does not hold. Then swap.",
      prompts: [
        "My theme is _____.",
        "That does not fit the part where _____.",
        "I would revise it to _____.",
      ],
    },
    yourturn: {
      instr: "Choose your stronger theme. Write a paragraph of seven to nine sentences that states it in the first sentence and supports it with two pieces of evidence from the story, one quoted exactly. At least one piece of evidence must be a comparison rather than an event. Your last sentence should say something about people in general. Then add today's Comparison Log entry.",
    },
    exit: [
      "Rewrite this as a theme: \u201Ctradition\u201D.",
      "Name one thing in the story you understood because of your own background.",
    ],
  },
  {
    n: 8, ytPart: "D",
    banner: {
      obj: "I can identify and write personification.",
      std: "Writing: keep most sentences plain so one comparison stands out.",
      comp: ["TH"],
    },
    title: "Giving Things Hands",
    slug: "GivingThingsHands",
    warmup: [
      "\u201CThe wind pushed at the door.\u201D Did the wind push?",
      "Why does that sentence feel more alive than \u201Cthe wind was strong\u201D?",
    ],
    goals: [
      "Identify and write personification",
      "Combine sensory detail with figurative language",
      "Choose the figure that suits the feeling you want",
    ],
    vocab: [
      ["personification", "giving human qualities to something not human"],
      ["human", "belonging to people"],
      ["object", "a thing"],
      ["quality", "a feature or characteristic"],
      ["sensory", "to do with the five senses"],
      ["atmosphere", "the feeling a place or scene gives"],
      ["hostile", "unfriendly; acting against you"],
      ["indifferent", "not caring either way"],
      ["suit", "to be right for"],
      ["restraint", "holding back; not using too much"],
    ],
    teach1: {
      title: "Personification chooses a relationship",
      points: [
        "When you give a thing human qualities, you decide how it treats the character.",
        "\u201CThe door refused\u201D makes the building hostile. \u201CThe door did not notice\u201D makes it indifferent.",
        "Indifference is usually more frightening than hostility, and less often used.",
        "So the figure you choose is not a style decision. It is a claim about the world.",
      ],
    },
    teach2: {
      title: "One is enough",
      points: [
        "Three figures in one paragraph cancel each other out.",
        "The reader can only hold one comparison at a time before the picture blurs.",
        "Put your best figure where it matters most and leave the other sentences plain.",
        "Plain sentences are what make a figurative one visible.",
      ],
    },
    examples: [
      "Sensory only: The corridor smelled of bleach and wet coats.",
      "Personified: The corridor smelled of bleach and wet coats, and it did not care that I was new.",
      "Overloaded: The corridor screamed of bleach, its walls like teeth, breathing out cold. \u2014 three figures, no picture.",
    ],
    practice: {
      instr: "Rewrite each sentence using personification. In a few words, say what relationship your version sets up.",
      items: [
        "The bus was late again.",
        "The apartment was cold in the mornings.",
        "The forms were long and complicated.",
        "The city was noisy at night.",
        "My phone battery died during the call.",
      ],
    },
    speaking: {
      instr: "Describe this school building as if it were a person who has opinions about you. Sixty seconds. Your partner then says whether the building liked them or not.",
      prompts: [
        "This building _____.",
        "It treats new students as though _____.",
        "From that, I think the building _____ you.",
      ],
    },
    yourturn: {
      instr: "Write six sentences describing a place you have arrived at for the first time \u2014 an airport, a classroom, a waiting room, a new apartment. Rules: at least two senses, exactly ONE figure of speech in the whole passage, and that figure must fall in the sentence you most want the reader to remember. Underline it. Then write one line saying why you put it there and not somewhere else. Add today's Comparison Log entry.",
    },
    exit: [
      "Write one personification that makes a place indifferent rather than hostile.",
      "Why does one figure of speech work better than three?",
    ],
  },
  {
    n: 9, ytPart: "D",
    banner: {
      obj: "I can plan a cultural narrative before I draft it.",
      std: "Writing: write about one small moment instead of a whole subject.",
      comp: ["TH", "PS"],
    },
    title: "Finding Your Story",
    slug: "FindingYourStory",
    warmup: [
      "Take out your Lesson 1 page and your Lesson 5 idiom page. Read them without writing anything.",
      "Which single line on those two pages would a stranger find most interesting?",
    ],
    goals: [
      "Pre-write for a cultural narrative paragraph",
      "Select one small moment rather than a large subject",
      "Plan where figurative language will and will not go",
    ],
    vocab: [
      ["narrative", "a story; an account of connected events"],
      ["moment", "one short period of time"],
      ["scope", "how much ground a piece of writing covers"],
      ["narrow", "to make smaller and more exact"],
      ["gesture", "a movement that carries meaning"],
      ["object", "a thing you can hold"],
      ["placement", "where something is put"],
      ["restraint", "holding back deliberately"],
      ["plan", "a decision made before you start"],
      ["select", "to choose deliberately from a larger set"],
    ],
    teach1: {
      title: "Small is the only way in",
      points: [
        "\u201CWrite about your culture\u201D produces nothing, because the subject is too large to hold.",
        "One moment, under five minutes long, with two people in it, produces everything.",
        "A meal is too big. Passing a dish across a table is the right size.",
        "The culture arrives through the moment. You never have to explain it.",
      ],
    },
    teach2: {
      title: "Plan the figures, do not sprinkle them",
      points: [
        "Decide before you draft: where will my one or two figures go?",
        "Usually the strongest place is the last sentence, or the moment of change.",
        "Everywhere else, write plain and specific. That is what makes the figure land.",
        "A plan that says \u201Cfigurative language throughout\u201D is not a plan.",
      ],
    },
    examples: [
      "Prompt for this unit's composition: write about one small moment where two languages, two places, or two generations met.",
      "Too large: My family's traditions at New Year.",
      "The right size: My grandmother correcting my pronunciation of her own name, in front of my friend.",
    ],
    practice: {
      instr: "Fill the organizer. Twelve items minimum before you stop. Phrases only.",
      items: [
        "Four moments under five minutes long where two languages or two generations met.",
        "For your best moment: three objects that were physically present.",
        "Two things somebody said, as closely as you can remember them.",
        "One gesture somebody made.",
        "Two things you could hear, smell, or feel.",
        "Now circle the one moment you will write about.",
      ],
    },
    speaking: {
      instr: "Tell a partner your circled moment in sixty seconds. They may not speak. Afterwards they say only which detail they can still see.",
      prompts: [
        "The moment I am writing about is _____.",
        "The detail I can still see is _____.",
        "That surprises me, because I thought _____.",
      ],
    },
    yourturn: {
      instr: "On a clean page, write your plan: the moment in one sentence, the five specific details you will use, and \u2014 marked clearly \u2014 the one or two places where a figure of speech will go, with a note on what each one needs to do. If you cannot say what a figure is for, delete it from the plan. Everything else stays plain. This page is your plan for the next lesson. Comparison Log checkpoint three today: I will read your entries from Lessons 3 to 9 together and comment on the pattern.",
    },
    exit: [
      "Which moment did you nearly choose and reject? Why did you reject it?",
      "Where will your one figure of speech go, and what job will it do?",
    ],
  },
  {
    n: 10, ytPart: "D",
    banner: {
      obj: "I can draft a cultural narrative from my plan.",
      std: "Writing: decide before drafting where figurative language goes and why.",
      comp: ["COM", "TH"],
    },
    title: "Drafting Small",
    slug: "DraftingSmall",
    warmup: [
      "Look at your plan. Do not read it \u2014 just look at how many details are on it.",
      "Which detail will you open with, and why that one?",
    ],
    goals: [
      "Draft a cultural narrative paragraph from a plan",
      "Hold figurative language back until it is needed",
      "Let the reader arrive at the meaning without being told",
    ],
    vocab: [
      ["draft", "an early version of a piece of writing"],
      ["opening", "the first sentence"],
      ["pacing", "how fast a piece of writing moves"],
      ["withhold", "to keep back deliberately"],
      ["explain", "to make clear \u2014 often unnecessary in a narrative"],
      ["trust", "to rely on someone to do something"],
      ["momentum", "the sense of moving forward"],
      ["close", "to end"],
      ["land", "to have the intended effect"],
      ["restraint", "holding back; not using too much"],
    ],
    teach1: {
      title: "Open plain, close figurative",
      points: [
        "If your first sentence is a metaphor, the reader has nothing to stand on.",
        "Open with something concrete and small. A hand, an object, a sound.",
        "Save the figure for the point where the moment turns.",
        "This is a shape, not a rule \u2014 but it works often enough to start from.",
      ],
    },
    teach2: {
      title: "Do not explain the moment",
      points: [
        "The commonest failure in this kind of writing is a final sentence that explains what it meant.",
        "\u201CThis showed me how important my culture is\u201D undoes everything above it.",
        "Trust the details. If they are specific enough, the reader gets there without you.",
        "If you truly need a closing line, make it another detail, not a conclusion.",
      ],
    },
    examples: [
      "Weak close: That day I realised how much my grandmother had sacrificed for us.",
      "Better close: She said my name again, the way she says it, and went back to the stove.",
      "The second one says the same thing and does not say it.",
    ],
    practice: {
      instr: "Before drafting, write two possible closing sentences for your paragraph.",
      items: [
        "Closing one: end on a small physical detail.",
        "Closing two: end on something somebody said.",
        "Now write the closing you must NOT use \u2014 the one that explains it. Cross it out.",
        "Circle the one you will use.",
      ],
    },
    speaking: {
      instr: "Read only your opening sentence to a partner. They say what they expect to happen next. Do not explain or defend it.",
      prompts: [
        "My opening is: _____.",
        "After that I expect _____.",
        "That is close, but the moment is actually about _____.",
      ],
    },
    yourturn: {
      instr: "Draft the paragraph. Eight to twelve sentences, using at least four planned details, opening on something concrete and closing on the sentence you circled. Your one or two figures go exactly where your plan says. Do not stop for spelling \u2014 leave a wavy line and keep going. If you find yourself writing a sentence that explains the moment, write it, cross it out, and continue. Reaching the end in one sitting matters more than polish. Add today's Comparison Log entry before you leave.",
    },
    exit: [
      "Did your figure of speech end up where you planned it? If not, where did it go?",
      "Name one sentence you already know explains too much.",
    ],
  },
  {
    n: 11, ytPart: "D",
    banner: {
      obj: "I can read a story with much less support.",
      std: "Reading: work out what a story means but never says, and quote the evidence.",
      comp: ["TH"],
    },
    title: "The Wrong Word for Snow",
    slug: "TheWrongWordForSnow",
    warmup: [
      "Have you ever used a word correctly and still been misunderstood?",
      "What is the difference between not knowing a word and knowing the wrong one?",
    ],
    goals: [
      "Read a second story with much less support",
      "Interpret idiom and cultural reference from context alone",
      "Substantiate a reading of what a character understands",
    ],
    vocab: [
      ["misunderstand", "to take a meaning incorrectly"],
      ["interpret", "to work out what something means"],
      ["substantiate", "to support a claim with evidence"],
      ["implicit", "present but not stated directly"],
      ["register", "how formal or informal language is"],
      ["shame", "the feeling of having done something wrong"],
      ["intention", "what a person meant to do"],
      ["reception", "how something is received by others"],
      ["gap", "a space between two things"],
      ["repair", "to fix something that has broken"],
    ],
    teach1: {
      title: "The story will not help you",
      points: [
        "This one is read cold. There is no vocabulary pre-teaching and no discussion first.",
        "There are idioms in it that are not explained, and a cultural reference that is not either.",
        "That is the assessment: can you work out meaning from context on your own?",
        "Everything you have practised since Lesson 5 applies. Use it.",
      ],
    },
    teach2: {
      title: "Claim, then evidence. Always both.",
      points: [
        "Say what you think. Then say what in the text made you think it.",
        "Two readers can disagree and both be right if both can point at the page.",
        "Neither is right if neither can point at anything.",
        "Include the line number. \u201CSomewhere near the end\u201D is not evidence.",
      ],
    },
    examples: [
      "Explicit: Bilal uses the word \u201Cslush\u201D at the interview.",
      "Implicit: he has learned it from a weather report, not from a person \u2014 the story shows you where.",
      "Inference: the gap he cannot close is register, not vocabulary. Substantiated by the interviewer's pause and by what his sister says afterwards.",
    ],
    practice: {
      instr: "Every answer needs a claim, evidence, and a line number. Answers with no evidence score nothing.",
      items: [
        "What does Bilal think went wrong at the interview? Substantiate.",
        "What does the story suggest actually went wrong? Substantiate.",
        "Find one idiom in the story. What does it mean, and what in the text told you?",
        "There is a cultural reference the narrator does not explain. Find it and say what a reader needs to know.",
        "What has Bilal's sister understood that he has not?",
        "Explain the last line in your own words.",
      ],
    },
    speaking: {
      instr: "In pairs, take opposite positions on whether Bilal was treated unfairly. Quote the text at least twice each. You may change your mind.",
      prompts: [
        "I think he was treated _____ because on line _____ it says _____.",
        "The strongest evidence against my own position is _____.",
        "I am changing my position because _____.",
      ],
    },
    yourturn: {
      instr: "Write a paragraph of seven to nine sentences answering this: what does Bilal understand at the end that he did not understand at the start? The story never states it, so your answer is an inference and must be substantiated with at least two separate moments quoted from the text. Do not retell the plot. Then add today's Comparison Log entry: one comparison or idiom from this story, and what it makes exact.",
    },
    exit: [
      "Which idiom in the story did you work out without help?",
      "Compare this with Lesson 5. Are idioms easier now? Say how you know.",
    ],
  },
  {
    n: 12, ytPart: "D",
    banner: {
      obj: "I can cut my best line when it does not earn its place.",
      std: "Writing: end a piece without explaining what it meant.",
      comp: ["TH", "PS"],
    },
    title: "Cutting the Best Line",
    slug: "CuttingTheBestLine",
    warmup: [
      "Writers are told to \u201Ckill your darlings.\u201D What do you think that means?",
      "Why would your favourite sentence be the one most likely to need cutting?",
    ],
    goals: [
      "Revise the cultural narrative against fixed criteria",
      "Cut figurative language that is doing no work",
      "Complete and submit the Comparison Log",
    ],
    vocab: [
      ["revise", "to change the content and shape of a draft"],
      ["edit", "to correct spelling, punctuation, and grammar"],
      ["criteria", "the fixed points a piece is judged against"],
      ["darling", "a line a writer loves too much to judge"],
      ["earn", "to deserve a place through usefulness"],
      ["redundant", "repeating something already said"],
      ["overwritten", "using more language than the meaning needs"],
      ["clean", "free of unnecessary material"],
      ["reflect", "to look back and think about what changed"],
      ["submit", "to hand in for assessment"],
    ],
    teach1: {
      title: "Test every figure",
      points: [
        "Go through your draft and find each comparison. There should be one or two.",
        "For each, ask three questions: has anyone written this before, does it make the meaning more exact, and does it fit the world of the paragraph?",
        "A no to any of those means cut it or replace it. Loving it is not an answer.",
        "If you have more than two figures, the extras are almost certainly the weak ones.",
      ],
    },
    teach2: {
      title: "Then edit, in passes",
      points: [
        "Pass one: find and cut any sentence that explains the moment.",
        "Pass two: check the opening is concrete and the closing is not a conclusion.",
        "Pass three: sentence lengths. Mark any three long sentences in a row.",
        "Pass four: commas in compound and complex sentences.",
      ],
    },
    examples: [
      "Overwritten: The kitchen was a furnace, and the steam rose like ghosts, and the pans sang.",
      "Revised: The kitchen was a furnace. My mother did not look up from the pans.",
      "One figure survives, and the plain sentence beside it is what makes it visible.",
    ],
    practice: {
      instr: "Work through your own draft in this order. Mark the page; do not rewrite yet.",
      items: [
        "Circle every comparison. Count them.",
        "Beside each, write the one job it is doing. If you cannot, mark it CUT.",
        "Underline your opening. Is it concrete?",
        "Bracket your closing. Does it explain the moment? If yes, replace it with a detail.",
        "Now write the clean version.",
      ],
    },
    speaking: {
      instr: "Swap clean versions. Say one comparison that worked and one place where you wanted the writing plainer. Do not comment on grammar.",
      prompts: [
        "The comparison that worked was _____.",
        "I wanted it plainer at _____.",
        "One thing I am taking from yours is _____.",
      ],
    },
    yourturn: {
      instr: "Produce the final clean version and submit it with your marked draft attached, so I can see what you cut. Then close the Comparison Log: read back through every entry and write half a page answering one question \u2014 what kind of comparison do you reach for most often, and what does that habit help you see or stop you seeing? Quote at least three of your own entries as evidence. This is checkpoint four and it is the part the Log is marked on.",
    },
    exit: [
      "Which line did you cut that you did not want to cut?",
      "Name one thing you can do now that you could not do in Lesson 1.",
    ],
  },
];

module.exports = { UNIT, LESSONS, ACCENTS };
