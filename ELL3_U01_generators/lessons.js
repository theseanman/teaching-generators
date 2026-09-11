// ELL 3 — Unit 1 (September) — "The Exact Thing": diagnostic and multicultural voices
// Lever = GENERAL -> SPECIFIC, taken off the BC ELL Standards Secondary continua.
// Writing: Expanding (3) gives "general and relevant details"; Consolidating (4) gives
// "specific and appropriate details". Reading twin: Expanding makes simple inferences
// from explicit information; Consolidating substantiates from implicit information too.
// Ongoing assignment: the Voices Notebook, checkpoints at L2, L6, L9, L12.
// Sep 8 2026: writing-only course. Reading diagnostic removed; L1 = launch lesson with the place paragraph as an unmarked warm-up; L2 = General and Specific; L3 = district September Writing Sample.

const UNIT = {
  course: "ELL3",
  code: "U01",
  num: 1,
  month: "September",
  title: "The Exact Thing",
  subtitle: "The Writing Sample and Multicultural Voices",
  composition: "Personal-identity descriptive paragraph",
};

const ACCENTS = [
  "1565C0", "0F8A8A", "2E9E5B", "C77800", "C0504D", "6A4C93",
  "1565C0", "0F8A8A", "2E9E5B", "C77800", "C0504D", "6A4C93",
];

const LESSONS = [
  {
    n: 1, ytPart: "D",
    title: "Where You Are From",
    slug: "WhereYouAreFrom",
    outcomes: "W2 longer, more descriptive sentences \u2022 W14 complete sentences",
    warmup: [
      "Think of one place that feels like yours. Do not write yet \u2014 just picture it.",
      "What is one thing in that place that a stranger would not notice?",
    ],
    goals: [
      "Learn how this room works: enter, folder, Notebook, ask in words",
      "Write a paragraph about a place that matters to you \u2014 a warm-up, not for marks",
      "Keep the paragraph: Lesson 2 tests it, and the Voices Notebook starts from it",
    ],
    vocab: [
      ["routine", "the way something is done the same way every time"],
      ["warm-up", "a first piece of writing that gets you started; not for marks"],
      ["describe", "to give a picture of something in words"],
      ["detail", "one small piece of information about something"],
      ["specific", "exact; about one particular thing"],
      ["general", "broad; true of many things, not just this one"],
      ["draft", "an early version of a piece of writing"],
      ["sensory", "to do with sight, sound, smell, taste, or touch"],
      ["ordinary", "usual; not special"],
      ["notice", "to see or become aware of something"],
    ],
    teach1: {
      title: "How this room works",
      points: [
        "Enter, sit, folder out. Every sheet you get lives in that folder and the folder lives here.",
        "The Voices Notebook starts next lesson and gets one entry every lesson after that. It is worth more than the test.",
        "When you are stuck, ask in words \u2014 which word, which sentence, which idea. \u201cI don\u2019t get it\u201d is not a question yet.",
        "Today\u2019s paragraph is a warm-up. Not marked. It is the piece you will test in Lesson 2.",
      ],
    },
    teach2: {
      title: "Write it, do not perfect it",
      points: [
        "Do not stop to look up words. Leave a gap or write it in your first language.",
        "Do not erase whole sentences. Cross out once and keep going.",
        "If you finish early, add one more detail rather than fixing spelling.",
        "Twenty minutes. Everyone stops at the same time.",
      ],
    },
    examples: [
      "Prompt: Describe a place that matters to you. It can be anywhere \u2014 a room, a street, a shop, a country.",
      "You may write about a place you left, a place you visit, or a place you are in right now.",
      "One paragraph. Aim for six to ten sentences.",
    ],
    practice: {
      instr: "Before you write, list four things you can picture in that place. Words or phrases only.",
      items: [
        "One thing you can see there.",
        "One thing you can hear there.",
        "One thing you can smell or taste there.",
        "One person who is usually there, or one object that is always there.",
      ],
    },
    speaking: {
      instr: "Turn to a partner. Say your place out loud and one thing from your list. Listen to theirs. Do not correct each other today.",
      prompts: [
        "The place I am writing about is _____.",
        "One thing you would notice there is _____.",
        "I chose it because _____.",
      ],
    },
    yourturn: {
      instr: "Write your paragraph now. Twenty minutes, no dictionaries, no phones. Use your four listed details somewhere in it. If you run out of things to say, describe one of your details more closely instead of starting a new idea. When time is called, write your name and the date at the top and put it in your folder. Next lesson you will test every sentence in it.",
    },
    exit: [
      "Which was harder: choosing the place, or finding details to describe it?",
      "Write one thing you wanted to say but could not find the English for.",
    ],
  },
  {
    n: 2, ytPart: "D",
    title: "General and Specific",
    slug: "GeneralAndSpecific",
    outcomes: "W2 longer, more descriptive sentences \u2022 W1 familiar and some academic content language",
    warmup: [
      "Which tells you more: \"I ate some food\" or \"I ate cold rice standing at the sink\"?",
      "Both are true. Why does the second one give you a picture and the first one does not?",
    ],
    goals: [
      "Tell the difference between a general statement and a specific one",
      "Rewrite general sentences so a reader can picture them",
      "Start the Voices Notebook",
    ],
    vocab: [
      ["vague", "not clear or exact"],
      ["precise", "exact; leaving no doubt about what is meant"],
      ["category", "a group of things of the same kind"],
      ["example", "one particular member of a category"],
      ["concrete", "able to be seen, heard, or touched"],
      ["abstract", "an idea; not something you can point at"],
      ["narrow", "to make smaller and more exact"],
      ["picture", "the image a reader forms while reading"],
      ["justify", "to give the reason for something"],
      ["entry", "one piece of writing added to a notebook"],
    ],
    teach1: {
      title: "General means it could be anyone",
      points: [
        "\"My grandmother was a kind person.\" True, probably. But it fits a million grandmothers.",
        "\"My grandmother kept a spare pair of slippers by the door for anyone who came.\" That is one grandmother.",
        "General sentences describe the category. Specific sentences describe the thing itself.",
        "Both belong in good writing. The problem is when a paragraph is all category.",
      ],
    },
    teach2: {
      title: "The test you can apply yourself",
      points: [
        "Ask: could I take a photograph of this sentence? If no, it may be general.",
        "Ask: how many other people could write exactly this sentence? If many, narrow it.",
        "Numbers, names, objects, and actions narrow. Adjectives alone usually do not.",
        "\"A beautiful place\" is not specific. \"A place\" plus what is in it, is.",
      ],
    },
    examples: [
      "General: The food was delicious. \u2192 Specific: The soup had ginger in it and burned the roof of my mouth.",
      "General: It was very noisy. \u2192 Specific: Two radios were playing different stations at once.",
      "General: My uncle worked hard. \u2192 Specific: My uncle left before the buses ran and came back after they stopped.",
    ],
    practice: {
      instr: "Rewrite each general sentence so a reader could photograph it. Keep the same meaning.",
      items: [
        "The market was busy.",
        "My first day at this school was difficult.",
        "The weather in my hometown is nice.",
        "She is a good friend.",
        "The room was messy.",
      ],
    },
    speaking: {
      instr: "Read one of your rewrites to a partner without saying which sentence it came from. Can they guess the original general sentence?",
      prompts: [
        "My specific sentence is: _____.",
        "I think your general sentence was _____.",
        "The word that gave it away was _____.",
      ],
    },
    yourturn: {
      instr: "Voices Notebook, entry one. From now to the end of the unit you add one entry per lesson: a specific detail you noticed, plus one line saying what makes it specific rather than general. The detail can come from your own life or from anything we read. Today, take out your Lesson 1 paragraph, find its most general sentence, and rewrite it so a reader could photograph it \u2014 that rewrite is entry one, with one line saying what changed. Checkpoint one is today.",
    },
    exit: [
      "Write one general sentence about today's lesson, then rewrite it specifically.",
      "Which of your five rewrites do you think is the strongest, and why?",
    ],
  },
  {
    n: 3, ytPart: "B",
    title: "September Writing Sample",
    slug: "SeptemberWritingSample",
    outcomes: "District writing sample \u2014 W1, W12, W14 as evidence",
    writingSample: true,
    warmup: [
      "Today is the district writing sample. Read the prompt on the board twice before you pick up a pen.",
      "What is it actually asking? Say the question back to yourself in your own words.",
    ],
    goals: [
      "Write the September writing sample in 80 minutes, on your own",
      "Set up the header and the double-spacing exactly as required",
      "Use the time: plan briefly, write most of it, read it back",
    ],
    vocab: [
      ["prompt", "the question or instruction you must write about"],
      ["header", "the information block at the top of the page"],
      ["double-space", "leave an empty line between every line you write"],
      ["plan", "a few words in the margin deciding what you will say"],
      ["draft", "the version you write straight through, without stopping"],
      ["read back", "read your own writing as if you were the reader"],
      ["checkpoint", "a moment to look at the clock and decide what is next"],
      ["remember", "to keep something in your mind; not forget it"],
      ["belong", "to feel that you are part of a group or place"],
      ["support", "help that lets someone do something they could not do alone"],
    ],
    teach1: {
      title: "The rules",
      points: [
        "Black or blue pen. Not pencil.",
        "Double-space: write on every second line so there is room to fix things.",
        "Header, top right: full name, student number, grade, ELL level, date.",
        "On your own. No phones, no translators, no talking. Ask me only about the rules.",
      ],
    },
    teach2: {
      title: "The 80 minutes",
      points: [
        "5 minutes: read the prompt twice, circle the key words, plan three ideas in the margin.",
        "60 minutes: write. Keep going. A finished draft with mistakes beats a perfect first line.",
        "10 minutes: read it back for capitals, periods, and whether you answered the question asked.",
        "5 minutes: check the header, hand it in. You will see this piece again in June.",
      ],
    },
    examples: [
      "Monday, September 14: What is one way someone has helped you that you will always remember?",
      "Tuesday, September 15: How can friends help each other feel like they belong?",
      "Answer the prompt for the day your class meets. One piece of writing, as long as you can make it good.",
    ],
    practice: {
      instr: "Before you write, check the header you have set up. Tick each line as you complete it.",
      items: [
        "Full name",
        "Student number",
        "Grade",
        "ELL level (3)",
        "Today\u2019s date",
      ],
    },
    speaking: {
      instr: "No partner talk today. Before you write, answer these three in your head \u2014 silently \u2014 and then begin.",
      prompts: [
        "The prompt is asking me about _____.",
        "My three ideas are _____, _____, and _____.",
        "The specific detail I will start with is _____.",
      ],
    },
    yourturn: {
      instr: "Write the sample now. Use the lined page. Header first, then the plan in the margin, then write straight through. At the 20-minute and 40-minute marks I will say the time; that is your cue to check where you are, not to stop. Finish the piece before you polish any part of it. When time is called, read back, check the header, and hand it in.",
    },
    exit: [
      "Hand in your paper with the header complete.",
      "One line in your Notebook: which part of the prompt was hardest to answer, and why.",
    ],
  },
  {
    n: 4, ytPart: "D",
    title: "Words That Carry Weight",
    slug: "WordsThatCarryWeight",
    outcomes: "W1 familiar and some academic content language \u2022 W2 descriptive sentences",
    warmup: [
      "\"Walked\" is a fine word. Name three ways of walking that are not just walking.",
      "Which one of your three tells you most about the person doing it?",
    ],
    goals: [
      "Choose verbs and nouns that do more work",
      "Use sensory detail from more than one sense",
      "Avoid stacking adjectives to fix a weak noun",
    ],
    vocab: [
      ["verb", "a word for an action or a state"],
      ["noun", "a word for a person, place, thing, or idea"],
      ["adjective", "a word that describes a noun"],
      ["adverb", "a word that describes a verb"],
      ["synonym", "a word with a similar meaning to another"],
      ["connotation", "the feeling a word carries beyond its meaning"],
      ["texture", "how a surface feels"],
      ["aroma", "a smell, usually a pleasant one"],
      ["glare", "harsh bright light, or a hard look"],
      ["hum", "a low continuous sound"],
    ],
    teach1: {
      title: "Strong verbs beat adverbs",
      points: [
        "\"He walked quickly\" uses two words to do one job.",
        "\"He hurried\" does it in one. \"He darted\" tells you more again.",
        "When you reach for an adverb, first check whether a better verb exists.",
        "Same for nouns: \"a big old building\" is often just \"a warehouse\".",
      ],
    },
    teach2: {
      title: "Use more than your eyes",
      points: [
        "Most writers describe only what they saw. Readers are used to that and skim it.",
        "Sound, smell, and touch are underused, so they land harder.",
        "Smell in particular carries memory \u2014 it is the sense most tied to the past.",
        "You do not need all five. Two well-chosen senses beat five listed ones.",
      ],
    },
    examples: [
      "Weak: The kitchen was very hot and smelled nice. \u2192 The kitchen held the smell of frying garlic and the back of my neck was damp.",
      "Weak: He spoke in a loud angry voice. \u2192 He barked my name across the shop.",
      "Weak: It was a nice quiet morning. \u2192 Nothing moved except a bus two streets away.",
    ],
    practice: {
      instr: "Replace each underlined phrase with one stronger word, or rewrite the sentence to use a different sense.",
      items: [
        "She said loudly that we were late.",
        "The old broken-down car made a strange noise.",
        "The soup tasted very good.",
        "He walked slowly and sadly out of the room.",
        "The street was very busy and there were a lot of people.",
      ],
    },
    speaking: {
      instr: "In pairs, describe the classroom using only sounds. No visual words at all. Then swap and do it with smell or touch.",
      prompts: [
        "Without looking, I can hear _____.",
        "This room smells like _____.",
        "The desk feels _____ under my hand.",
      ],
    },
    yourturn: {
      instr: "Write four sentences about a meal you remember. Rules: at least two different senses must appear, and no sentence may use the words good, nice, or very. Then underline the single word in your four sentences that you think is doing the most work, and be ready to defend it. Add today's Voices Notebook entry: one specific detail plus your justification. Today's entry should come from something you heard, smelled, or touched \u2014 not something you saw.",
    },
    exit: [
      "Which sense was hardest to write with, and why do you think that is?",
      "Write down one weak word you used today and its stronger replacement.",
    ],
  },
  {
    n: 5, ytPart: "D",
    title: "Simple and Compound",
    slug: "SimpleAndCompound",
    outcomes: "W4 conjunctions (for, and, but, so) \u2022 W5 compound and complex sentences \u2022 W12 punctuation",
    warmup: [
      "How many sentences can you make from these words: the bus was late, I ran, my shoes were wet?",
      "Does joining them change the meaning, or only the sound?",
    ],
    goals: [
      "Identify simple and compound sentences",
      "Join simple sentences with for, and, but, or, so",
      "Vary sentence length on purpose",
    ],
    vocab: [
      ["clause", "a group of words with its own subject and verb"],
      ["subject", "who or what the sentence is about"],
      ["predicate", "the part of the sentence that says what the subject does"],
      ["simple", "having one clause"],
      ["compound", "having two clauses joined as equals"],
      ["conjunction", "a joining word such as and, but, or so"],
      ["comma", "the mark used before a joining word in a compound sentence"],
      ["fragment", "an incomplete sentence, missing a subject or a verb"],
      ["run-on", "two sentences joined with no punctuation or joining word"],
      ["rhythm", "the pattern made by long and short sentences together"],
    ],
    teach1: {
      title: "One clause, or two equals",
      points: [
        "A simple sentence has one subject and one verb: \"The kettle boiled.\"",
        "A compound sentence joins two of those, and neither one is in charge.",
        "The joining words are for, and, nor, but, or, yet, so.",
        "A comma goes before the joining word when both sides could stand alone.",
      ],
    },
    teach2: {
      title: "Short sentences are a tool, not a mistake",
      points: [
        "A page of long sentences is tiring. A page of short ones is choppy.",
        "The strongest short sentence in a paragraph is usually the last one.",
        "Use a short sentence after a long one when you want the reader to stop.",
        "Length is a choice you make, not something that happens to you.",
      ],
    },
    examples: [
      "Simple: My father repaired watches.",
      "Compound: My father repaired watches, but he never wore one.",
      "Run-on (wrong): My father repaired watches he never wore one. \u2192 fix with a comma and but, or with a full stop.",
    ],
    practice: {
      instr: "Join each pair into one compound sentence. Choose the joining word that fits the meaning.",
      items: [
        "The shop closed at six. We arrived at ten past.",
        "I could take the train. I could walk along the dyke.",
        "She spoke three languages at home. She was silent for a month at school.",
        "It rained every day that week. The garden still died.",
        "My brother packed the car. I said goodbye to the neighbours.",
      ],
    },
    speaking: {
      instr: "Partner A says a simple sentence about their morning. Partner B adds a second clause with a joining word. Swap after three.",
      prompts: [
        "I _____ this morning.",
        "_____, but _____.",
        "_____, so _____.",
      ],
    },
    yourturn: {
      instr: "Take the four sentences you wrote in Lesson 4 about a meal. Rewrite the set so that it contains at least two compound sentences and finishes on a short simple one. Do not add new content \u2014 work only with what you already wrote. Read the before and after versions to yourself under your breath and notice which one you prefer. Add today's Voices Notebook entry, and this time make the detail one you can write as a compound sentence.",
    },
    exit: [
      "Write one compound sentence about this class using but.",
      "Which is your last sentence, and why did you end there?",
    ],
  },
  {
    n: 6, ytPart: "D",
    title: "The Long Way Home",
    slug: "TheLongWayHome",
    outcomes: "W2 descriptive sentences \u2022 (reading in service of writing)",
    warmup: [
      "Have you ever taken a longer route somewhere on purpose? Why?",
      "What might a person be doing if they arrive home later than they need to?",
    ],
    goals: [
      "Read a short story closely",
      "Identify character and setting with evidence",
      "Track how a place reveals a person",
    ],
    vocab: [
      ["protagonist", "the main character of a story"],
      ["trait", "a quality of a person's character"],
      ["motive", "the reason a character does something"],
      ["setting", "where and when a story happens"],
      ["atmosphere", "the feeling a place gives"],
      ["routine", "something done regularly in the same way"],
      ["detour", "a longer route taken instead of the direct one"],
      ["reluctant", "unwilling; slow to do something"],
      ["threshold", "the doorway; the line between outside and inside"],
      ["belong", "to fit somewhere and be accepted there"],
    ],
    teach1: {
      title: "Character is shown, not announced",
      points: [
        "A story rarely says \"Arman was homesick\". It shows him doing something.",
        "Look at what a character chooses when nobody is watching. That is the real evidence.",
        "Repeated actions matter more than single ones. Notice what happens every day.",
        "What a character avoids tells you as much as what they do.",
      ],
    },
    teach2: {
      title: "Setting is not just scenery",
      points: [
        "Setting is where and when \u2014 but in a good story it is also pressure.",
        "Ask what the place allows the character to do, and what it stops them doing.",
        "A bus, a shop, a stairwell: each one puts different limits on a person.",
        "When the setting changes, watch whether the character changes with it.",
      ],
    },
    examples: [
      "Evidence of character: Arman counts the stops in Farsi. Nobody asked him to. Nobody hears him.",
      "Evidence of setting as pressure: the bakery is warm and he is not expected there, so he can stay.",
      "Weak answer: \"Arman is sad.\" Strong answer: \"Arman avoids his own front door, because he rides past his stop every day.\"",
    ],
    practice: {
      instr: "Answer with a quotation or a line reference for each. One or two sentences each.",
      items: [
        "Name one thing Arman does every day. What does the repetition suggest?",
        "Where does the story take place? Give two details that fix it in place and time.",
        "What does Arman do at the bakery that he does not do at home?",
        "Find the moment the story first hints that something is wrong. Quote it.",
        "What does Arman want? The story never states it \u2014 build the answer from evidence.",
      ],
    },
    speaking: {
      instr: "In threes, argue about the last question. One of you must disagree with the others and defend it from the text.",
      prompts: [
        "I think Arman wants _____ because the story says _____.",
        "I disagree, because on that page _____.",
        "We agree on _____ but not on _____.",
      ],
    },
    yourturn: {
      instr: "Write one paragraph, six to eight sentences, answering this: what does the long way home give Arman that the short way does not? Use at least two pieces of evidence from the text, and quote at least one of them exactly. Do not retell the story \u2014 assume your reader has read it. Then add today's Voices Notebook entry, and take it from the story this time: one specific detail the writer chose, plus what it tells you that a general statement would not have.",
    },
    exit: [
      "Which detail in the story stayed with you after you finished reading?",
      "Voices Notebook checkpoint two: hand your notebook in open at today's entry.",
    ],
  },
  {
    n: 7, ytPart: "D",
    title: "What the Story Means",
    slug: "WhatTheStoryMeans",
    outcomes: "W2 descriptive sentences \u2022 W14 complete sentences",
    warmup: [
      "If someone asked what The Long Way Home is about, what would you say in one sentence?",
      "Now say it again without naming Arman or the bus.",
    ],
    goals: [
      "Distinguish topic, plot, and theme",
      "State a theme as a full sentence, not a single word",
      "Connect a text to yourself, another text, and the world",
    ],
    vocab: [
      ["theme", "an idea about life that a story explores"],
      ["topic", "what a story is about on the surface"],
      ["summary", "a short account of what happened"],
      ["interpret", "to work out what something means"],
      ["universal", "true across many people and places"],
      ["connection", "a link between the text and something outside it"],
      ["background", "what you already know before you read"],
      ["identity", "who a person understands themselves to be"],
      ["displacement", "being moved away from where you belong"],
      ["adjust", "to change in order to fit a new situation"],
    ],
    teach1: {
      title: "Theme is a sentence, not a word",
      points: [
        "\"Belonging\" is a topic. It is not yet a theme, because it says nothing.",
        "A theme makes a claim: \"Belonging somewhere new can feel like a betrayal of home.\"",
        "You can agree or disagree with a theme. You cannot disagree with a topic.",
        "If your theme could be the title of a folder, it is still a topic.",
      ],
    },
    teach2: {
      title: "Three kinds of connection",
      points: [
        "Text to self: this reminds me of something in my own life.",
        "Text to text: this reminds me of another story, film, or song.",
        "Text to world: this connects to something happening beyond both of us.",
        "The connection is only worth making if it changes how you read the story.",
      ],
    },
    examples: [
      "Topic: the bus. Plot: Arman rides past his stop each day. Theme: delay can be a way of protecting something you are not ready to lose.",
      "Weak connection: \"I also take a bus.\" It changes nothing.",
      "Strong connection: \"I also used to arrive late on purpose, so I understand that the delay is the point, not the route.\"",
    ],
    practice: {
      instr: "For each, write one full sentence. Themes must be claims, not single words.",
      items: [
        "State a theme of The Long Way Home in one sentence.",
        "State a second, different theme in one sentence.",
        "Which theme has more evidence behind it? Name the evidence.",
        "Write one text-to-self connection that changes how you read the ending.",
        "Write one text-to-world connection that is not simply about immigration in general.",
      ],
    },
    speaking: {
      instr: "Share your first theme with a partner. Their job is to challenge it: where in the text does it not hold up?",
      prompts: [
        "My theme is _____.",
        "That does not fit the part where _____.",
        "I would change my theme to _____.",
      ],
    },
    yourturn: {
      instr: "Choose the stronger of your two themes. Write a paragraph of seven to nine sentences that states it in the first sentence and then supports it with two pieces of evidence from the story, one of them quoted exactly. Your last sentence should say something about people in general, not only about Arman. Add today's Voices Notebook entry: this time, note one specific detail from your own life that connects to your theme, and justify it.",
    },
    exit: [
      "Rewrite this as a theme: \"family\".",
      "What did your partner say that changed your reading, if anything?",
    ],
  },
  {
    n: 8, ytPart: "D",
    title: "Because, While, When",
    slug: "BecauseWhileWhen",
    outcomes: "W5 complex sentences with connecting words \u2022 W12 commas \u2022 W11 subject/verb agreement",
    warmup: [
      "\"I stayed inside. It was raining.\" Join these two so one explains the other.",
      "How many joining words could you use? Do they mean the same thing?",
    ],
    goals: [
      "Build complex sentences with because, while, when, although, since",
      "Punctuate a subordinate clause correctly",
      "Choose the joining word that carries the meaning you want",
    ],
    vocab: [
      ["complex", "having a main clause and a dependent clause"],
      ["main clause", "the part that can stand alone as a sentence"],
      ["dependent", "unable to stand alone; needing the main clause"],
      ["subordinate", "the dependent clause, introduced by because, while, when"],
      ["cause", "the reason something happens"],
      ["contrast", "a difference set against something else"],
      ["although", "a joining word showing contrast"],
      ["since", "a joining word showing cause or time"],
      ["whereas", "a joining word showing direct contrast"],
      ["emphasis", "the weight given to one part of a sentence"],
    ],
    teach1: {
      title: "Two clauses, one in charge",
      points: [
        "In a compound sentence the two halves are equals. In a complex sentence, one serves the other.",
        "\"Because the bus was late\" cannot stand alone. It needs a main clause.",
        "The dependent clause can go first or second. Both are correct.",
        "If it goes first, put a comma after it. If it goes second, usually no comma.",
      ],
    },
    teach2: {
      title: "The joining word carries the meaning",
      points: [
        "Because and since give a reason. When and while give a time.",
        "Although and whereas set up a contrast: something is true in spite of something else.",
        "Changing the joining word changes the argument, not just the grammar.",
        "\"While he waited\" and \"because he waited\" describe the same event and mean different things.",
      ],
    },
    examples: [
      "Because the bakery stayed open late, Arman had somewhere to be.",
      "Arman had somewhere to be because the bakery stayed open late.",
      "Although the bakery stayed open late, he never bought anything.",
    ],
    practice: {
      instr: "Join each pair into one complex sentence using the joining word given. Punctuate carefully.",
      items: [
        "(because) He missed his stop. He was not ready to go home.",
        "(although) She understood every word. She did not answer.",
        "(while) My mother filled out the forms. I translated the questions.",
        "(since) We moved in July. I have not seen my cousins.",
        "(when) The shop bell rang. Everyone looked up.",
      ],
    },
    speaking: {
      instr: "Partner A gives a fact about their week. Partner B must respond with a complex sentence using although. Swap and use because.",
      prompts: [
        "This week I _____.",
        "Although _____, _____.",
        "Because _____, _____.",
      ],
    },
    yourturn: {
      instr: "Return to your Lesson 7 theme paragraph. Rewrite it so that it contains at least two complex sentences, one of which begins with the dependent clause. Check the commas. Then answer this in one line at the bottom: did the complex sentences make your argument clearer, or only longer? Be honest \u2014 sometimes the answer is longer, and noticing that is the skill. Add today's Voices Notebook entry, written as a complex sentence.",
    },
    exit: [
      "Write one sentence using although about learning English.",
      "Which joining word do you overuse? Name your replacement for next time.",
    ],
  },
  {
    n: 9, ytPart: "D",
    title: "Finding Your Details",
    slug: "FindingYourDetails",
    outcomes: "W2 descriptive sentences \u2022 W1 content language",
    warmup: [
      "Look back at your Lesson 1 paragraph. Do not read it yet \u2014 just look at its length.",
      "Before you read it, predict: how many specific details do you think you will find?",
    ],
    goals: [
      "Pre-write for a descriptive paragraph on personal identity",
      "Gather specific detail before drafting, not during",
      "Test each detail against the general-versus-specific rule",
    ],
    vocab: [
      ["pre-write", "the stage before drafting, where you gather material"],
      ["brainstorm", "to list ideas quickly without judging them"],
      ["organizer", "a chart used to sort ideas before writing"],
      ["select", "to choose deliberately from a larger set"],
      ["discard", "to throw out something you have decided not to use"],
      ["anecdote", "a very short account of one real incident"],
      ["object", "a thing you can hold; often a good way into a memory"],
      ["ritual", "something done the same way each time, with meaning"],
      ["inherit", "to receive from an older generation"],
      ["evidence", "the detail that proves what you are claiming"],
    ],
    teach1: {
      title: "Gather more than you need",
      points: [
        "The paragraph you will write needs about five details. Today you will find fifteen.",
        "You cannot select well from a short list. Discarding is where quality comes from.",
        "Do not judge while you gather. Judge afterwards, in one pass.",
        "If a detail makes you slightly uncomfortable to write down, mark it. It is usually the good one.",
      ],
    },
    teach2: {
      title: "Objects are doors",
      points: [
        "Abstract prompts produce abstract writing. \"Describe your culture\" produces nothing.",
        "One object produces everything: a pot, a coat, a photograph, a set of keys.",
        "Start from a thing you could hold in your hands, then work outwards to what it means.",
        "The meaning does not need stating. If the object is specific enough, the reader gets there.",
      ],
    },
    examples: [
      "Prompt for this unit's composition: describe something you carry with you from where you are from. It may be an object, a habit, a phrase, a food, or a sound.",
      "Weak start: \"My culture is very important to me.\" \u2014 no reader can picture this.",
      "Strong start: \"There is a pot in our kitchen that my mother will not replace.\"",
    ],
    practice: {
      instr: "Fill the organizer. Fifteen items minimum before you stop. Words and phrases only, no sentences.",
      items: [
        "Five objects connected to where you are from.",
        "Five things you can hear, smell, or taste from there.",
        "Three habits or rituals your family keeps.",
        "Two phrases or words that do not translate well into English.",
        "Now circle the five that only you could have written.",
      ],
    },
    speaking: {
      instr: "Tell a partner about one circled item for sixty seconds without stopping. They may not speak until the minute is over.",
      prompts: [
        "The thing I circled is _____.",
        "It matters because _____.",
        "One thing I noticed while you were talking was _____.",
      ],
    },
    yourturn: {
      instr: "Test your five circled details against the rule from Lesson 2: could a reader photograph it, and how many people in this room could have written the same thing? Cross out any that fail. If fewer than three survive, go back to your organizer \u2014 do not soften the test to keep a detail you like. Write the survivors on a clean page; that page is your plan for next lesson. Checkpoint three today.",
    },
    exit: [
      "Which detail did you cross out that you wanted to keep?",
      "Compared with your Lesson 1 paragraph, is this plan more specific? Say how you know.",
    ],
  },
  {
    n: 10, ytPart: "D",
    title: "The First Draft",
    slug: "TheFirstDraft",
    outcomes: "W2 \u2022 W4 \u2022 W5 \u2022 W14 \u2014 the descriptive paragraph",
    warmup: [
      "What usually goes wrong for you between planning and writing?",
      "Is your first sentence normally your best one or your worst one?",
    ],
    goals: [
      "Draft a descriptive paragraph from a plan",
      "Open on a specific detail rather than a general statement",
      "Keep sentence length varied on purpose",
    ],
    vocab: [
      ["topic sentence", "the sentence that sets up what a paragraph is doing"],
      ["opening", "the first sentence, which decides whether a reader continues"],
      ["body", "the middle of the paragraph, where the detail lives"],
      ["closing", "the last sentence, which lands the point"],
      ["coherence", "the quality of holding together as one piece"],
      ["transition", "a word or phrase that moves the reader between ideas"],
      ["momentum", "the sense of a piece of writing moving forward"],
      ["revise", "to change the content and shape of a draft"],
      ["edit", "to correct the surface: spelling, punctuation, grammar"],
      ["publish", "to produce the final version for a reader"],
    ],
    teach1: {
      title: "Do not open on the category",
      points: [
        "Most weak paragraphs open by announcing the topic: \"Food is important in my culture.\"",
        "Open on one of your five details instead, and let the reader work out the topic.",
        "The reader will forgive almost anything if the first sentence gives them a picture.",
        "You can always add a summarising sentence later. You rarely need to.",
      ],
    },
    teach2: {
      title: "The shape of the middle",
      points: [
        "Order your details so each one earns the next. Do not just list them.",
        "One detail should be developed further than the others. That is your centre.",
        "Watch your sentence lengths as you go: three long ones in a row is a warning.",
        "End on something short. Do not explain the paragraph back to the reader.",
      ],
    },
    examples: [
      "Opening on a category: In my family, traditions are very important to us.",
      "Opening on a detail: There is a pot in our kitchen that my mother will not replace.",
      "Closing that explains too much: This shows that my culture means a lot to me. \u2192 cut it.",
    ],
    practice: {
      instr: "Before drafting, write three possible opening sentences using three different details from your plan.",
      items: [
        "Opening one: start with an object.",
        "Opening two: start with a sound or a smell.",
        "Opening three: start in the middle of an action.",
        "Read all three aloud under your breath. Circle the one that makes you want to keep going.",
      ],
    },
    speaking: {
      instr: "Read your circled opening to a partner. They say only what they now expect the paragraph to be about. Do not explain or defend it.",
      prompts: [
        "My opening is: _____.",
        "After hearing that, I expect the paragraph to be about _____.",
        "That is close to what I meant, but _____.",
      ],
    },
    yourturn: {
      instr: "Draft the paragraph. Eight to twelve sentences, using your circled opening and at least four of your five planned details. One detail must be developed further than the rest. Do not stop to fix spelling; leave a wavy line under anything you are unsure of and keep moving. Aim to reach the end in one sitting \u2014 a whole rough draft is more useful than half a polished one. Add today's Voices Notebook entry before you leave, even if the draft is unfinished.",
    },
    exit: [
      "Which of your details turned out to be your centre? Was it the one you expected?",
      "Name one sentence you know you will change tomorrow.",
    ],
  },
  {
    n: 11, ytPart: "D",
    title: "The Second Umbrella",
    slug: "TheSecondUmbrella",
    outcomes: "W14 complete sentences \u2022 (reading in service of writing)",
    warmup: [
      "If someone leaves the house with two umbrellas and comes home with one, what happened?",
      "How many different answers are possible? Which is most likely, and why?",
    ],
    goals: [
      "Read a second story with less support",
      "Make inferences and substantiate them from the text",
      "Notice what a writer chooses not to say",
    ],
    vocab: [
      ["infer", "to work out what is meant without being told"],
      ["imply", "to suggest something without stating it"],
      ["explicit", "stated directly in the text"],
      ["implicit", "present but not stated directly"],
      ["substantiate", "to support a claim with evidence"],
      ["omission", "something deliberately left out"],
      ["gap", "the space a reader must fill in themselves"],
      ["narrator", "the voice telling the story"],
      ["reliable", "able to be trusted; likely to be accurate"],
      ["withhold", "to keep back; to not give"],
    ],
    teach1: {
      title: "Writers leave gaps on purpose",
      points: [
        "A weak story explains itself. A strong one trusts you to work things out.",
        "The gap is where the reading happens. Being told is not the same as understanding.",
        "Ask what the narrator knows but is not saying \u2014 and why they might not say it.",
        "Priya never states what her father does. She tells you what she sees.",
      ],
    },
    teach2: {
      title: "An inference is a claim plus evidence",
      points: [
        "Guessing is not inferring. An inference can be defended from the page.",
        "Two readers can infer differently and both be right, if both can point to the text.",
        "Two readers cannot both be right if one of them cannot point to anything.",
        "Say what you think, then say what made you think it. Always both.",
      ],
    },
    examples: [
      "Explicit: Priya's father leaves the house at half past six.",
      "Implicit: he does not need to leave until seven. The text says this in a different paragraph.",
      "Inference: he is doing something on the way that he has not told his family about \u2014 substantiated by the time gap and by his wet shoulders.",
    ],
    practice: {
      instr: "Every answer needs a claim and the evidence for it. Answers without evidence score zero, even if correct.",
      items: [
        "What does Priya's father do with the second umbrella? Substantiate.",
        "Why does Priya not ask him about it directly?",
        "What has changed in the household since the family arrived? Find two signs.",
        "Find a sentence the writer could have added to explain everything. Why is the story better without it?",
        "Is Priya a reliable narrator? Defend your answer from the text.",
      ],
    },
    speaking: {
      instr: "In pairs, take opposite positions on the last question. Each of you must quote the text at least twice. You may change your mind.",
      prompts: [
        "I think Priya is reliable because _____.",
        "But she never tells us _____.",
        "The strongest evidence against my own position is _____.",
      ],
    },
    yourturn: {
      instr: "Write a paragraph of seven to nine sentences answering this: what does Priya understand by the end of the story that she did not understand at the start? The story never states it, so your answer is an inference and must be substantiated \u2014 quote at least two separate moments from the text. Do not retell the plot. Add today's Voices Notebook entry: one thing the writer chose not to say, and what you understood from the silence.",
    },
    exit: [
      "Which gap in the story did you most want filled in?",
      "Compare this with the first story. Are inference questions easier now? Say how you know.",
    ],
  },
  {
    n: 12, ytPart: "D",
    title: "Revising, and the Notebook",
    slug: "RevisingAndTheNotebook",
    outcomes: "W15 revise and self-edit \u2022 W14 complete sentences",
    warmup: [
      "What is the difference between revising a piece and editing it?",
      "Which of the two do you actually do when you say you are checking your work?",
    ],
    goals: [
      "Revise the descriptive paragraph against fixed criteria",
      "Self-edit for sentence variety and word choice",
      "Complete and submit the Voices Notebook",
    ],
    vocab: [
      ["criteria", "the fixed points a piece is judged against"],
      ["checklist", "a list used to check work in a fixed order"],
      ["cut", "to remove something that is not earning its place"],
      ["sharpen", "to make more exact"],
      ["redundant", "repeating something already said"],
      ["filler", "words that take up space without adding meaning"],
      ["consistent", "the same all the way through"],
      ["portfolio", "a kept collection of your work over time"],
      ["reflect", "to look back and think about what changed"],
      ["submit", "to hand in for assessment"],
    ],
    teach1: {
      title: "Revise before you edit",
      points: [
        "Editing a sentence you are about to delete is wasted work. Shape first, surface second.",
        "Revision questions: is the opening specific? Is one detail developed further than the rest?",
        "Cut anything that explains the paragraph rather than being part of it.",
        "If a sentence could appear in someone else's paragraph unchanged, it is general. Sharpen or cut.",
      ],
    },
    teach2: {
      title: "Then edit, in passes",
      points: [
        "Do not hunt for everything at once. One pass per problem.",
        "Pass one: sentence lengths. Mark any three long sentences in a row.",
        "Pass two: weak words. Circle good, nice, very, a lot, thing.",
        "Pass three: commas in your compound and complex sentences.",
      ],
    },
    examples: [
      "Redundant: The pot is very old. It has been in our family a long time. \u2192 keep one.",
      "Filler: There is a thing that my mother does which is that she \u2026 \u2192 My mother \u2026",
      "General sentence found in revision: Traditions are important in many families. \u2192 cut entirely.",
    ],
    practice: {
      instr: "Work through your draft in the order given. Mark the page as you go; do not rewrite yet.",
      items: [
        "Underline your opening sentence. Could a reader photograph it?",
        "Bracket the detail you developed most. Is it your strongest one?",
        "Mark any sentence that could appear unchanged in a classmate's paragraph.",
        "Circle every weak word from the list.",
        "Now write the clean version.",
      ],
    },
    speaking: {
      instr: "Swap clean versions with a partner. Say one thing that gave you a picture and one place you wanted more. Do not comment on grammar.",
      prompts: [
        "The part I could picture was _____.",
        "I wanted more at _____.",
        "One thing I am taking from yours is _____.",
      ],
    },
    yourturn: {
      instr: "Produce the final clean version of your paragraph and submit it with your marked draft attached, so I can see what you changed. Then close the Voices Notebook: read back through all your entries from Lesson 2 onwards and write a final half-page answering one question \u2014 what kind of detail do you notice most easily, and what kind do you keep missing? Use your own entries as evidence, quoting at least three of them. This is checkpoint four and it is the part the Notebook is marked on.",
    },
    exit: [
      "Name one thing you can do now that you could not do in Lesson 1.",
      "What will you look for first when you read your June paragraph next to your September one?",
    ],
  },
];

module.exports = { UNIT, LESSONS, ACCENTS };
