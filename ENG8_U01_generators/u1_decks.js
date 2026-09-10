// u1_decks.js — ENG8 U1 deck content, Lessons 1–4 (Pass 2a).
// Slide kinds: title | plain | step | compare | exit

// ===================================================================
// DECK PLAN (Sep 9 2026) — per-lesson structure tags the new renderer reads.
// order: sequence of activity keys. Each activity references a slide in DECKS
// by its 'key'. Tags: ws (worksheet Part letter), reveal ("open"|"answers"),
// handoutBefore (full-page reminder before this slide), image, section.
// ===================================================================
const DECK_PLAN = {
  1: {
    handoutKey: "findsomeone",          // full worksheet reminder goes before this activity
    order: [
      "findsomeone",                     // Part A activity (first sheet use)
      "title",                           // hook/title lands after the icebreaker
      "sixword",                         // Part B activity
      "share",                           // NEW section slide, non-worksheet, image
      "whyworks", "whatpn", "scope",     // discussion, no worksheet
      "object",                          // Part C activity
      "exit",
    ],
    activities: {
      findsomeone: { ws:"A" },                       // mingle: no reveal
      title:       {},
      sixword:     { ws:"B", reveal:"open" },
      share:       { section:true, image:"share.png",
                     kicker:"SHARE", title:"Share your six-word stories",
                     items:[
                       "Read your baby-shoes paragraph to a partner.",
                       "Then we\u2019ll hear a few with the whole class.",
                       "There is no single right answer \u2014 listen for what each writer imagined.",
                     ] },
      whyworks:    {},
      whatpn:      {},
      scope:       {},
      object:      { ws:"C", reveal:"open" },
      exit:        {},
    },
    // reveal content per Part (open = one example card)
    reveals: {
      B: { kind:"open", title:"Three six-word stories \u2014 an example set",
           example:"Funny: Wore two left shoes all day.   \u2022   Sad: Her side of the closet, empty.   \u2022   Surprising: The dog answered.",
           note:"The surprising one works best: it makes the reader do a double-take, then re-read." },
      C: { kind:"open", title:"A small moment \u2014 one example",
           example:"The ten seconds on the high dive before I jumped \u2014 the cold rail under my feet, the pool a long way down, everyone gone quiet.",
           note:"Notice: seconds, not a whole day. One place, one action, details you can picture." },
    },
  },
};


// which DECKS[lesson] slide index corresponds to each plan key (L01)
const DECK_KEYMAP = {
  1: { title:0, sixword:1, whyworks:2, findsomeone:3, whatpn:4, scope:5, object:6, exit:7 },
};

const DECKS = [
// ============================= LESSON 1 =============================
{ n:1, short:"What Makes a Story?", slides:[
  { kind:"title", title:"What Makes a Story?", sub:"Getting to know each other — and the small moments worth telling." },

  { kind:"step", step:1, kicker:"Warm-up · Six-Word Story",
    title:"A whole story in six words",
    intro:"Legend says Hemingway wrote a complete story in just six words.",
    cards:[
      { h:"The famous one", t:"\u201CFor sale: baby shoes, never worn.\u201D  Six words — and a whole story appears in your head." },
      { h:"Your turn", t:"Write a six-word story, OR a six-word \u201Cabout me.\u201D Every word has to earn its place." },
    ], cardH:1.15 },

  { kind:"plain", kicker:"Why it works",
    title:"Small space, big story",
    intro:"You didn't need a hundred words. You needed the right few.",
    cards:[
      { h:"Every word carries weight", t:"When you only have six words, each one matters. That's true of good writing at any length." },
      { h:"A story can live in a small moment", t:"You don't have to tell your whole life. One small moment can hold a whole story." },
    ], cardH:1.05 },

  { kind:"step", step:2, kicker:"Get moving · Find Someone Who\u2026",
    title:"Find Someone Who\u2026",
    intro:"Up and moving. Find a different classmate for each square and write their name.",
    bullets:[
      "\u2026 has read a book more than once",
      "\u2026 cried (or almost) at a movie",
      "\u2026 tells the same story at every family dinner",
      "\u2026 would rather listen to a story than read one",
      "One rule: a different name in every square.",
    ] },

  { kind:"plain", kicker:"Today's big idea",
    title:"What is a personal narrative?",
    cards:[
      { h:"A personal narrative", t:"A true story from your own life, told the way a story is told — with a moment, not just a list of facts." },
      { h:"The key move this unit", t:"Take ONE small moment and make a reader see it and feel it." },
    ], cardH:1.1 },

  { kind:"compare", kicker:"Scope · The one move that changes everything",
    title:"Whole life  vs.  one small moment",
    left:{ h:"Too big", items:[
      "\u201CMy summer.\u201D",
      "\u201CMy trip to see my grandparents.\u201D",
      "A whole day, start to finish.",
      "So much happens that nothing lands.",
    ]},
    right:{ h:"Just right", items:[
      "\u201CThe ten seconds before I jumped off the dock.\u201D",
      "The moment my grandfather handed me the bowl.",
      "One moment, slowed down.",
      "Small enough to show every detail.",
    ]} },

  { kind:"step", step:3, kicker:"Coming up · One Small Thing",
    title:"Your first project: the object talk",
    intro:"In a few days, you'll bring one object and talk about it for 1\u20132 minutes.",
    cards:[
      { h:"Bring one thing", t:"An object, a photo, or a small artifact that connects to a moment or to who you are." },
      { h:"Tell ONE moment", t:"Not a list of facts about the object \u2014 the one small moment it's tied to." },
      { h:"Take-home notice", t:"Details are on the sheet going home today. Start thinking about what you'll bring." },
    ], cardH:0.95 },

  { kind:"exit", title:"Your small moment",
    items:[
      "Write down ONE small moment from your life you might tell a story about.",
      "It should be small \u2014 minutes, not days.",
      "Keep it. You may use it later this unit.",
    ] },
]},

// ============================= LESSON 2 =============================
{ n:2, short:"Reading Like a Writer", slides:[
  { kind:"title", title:"Reading Like a Writer", sub:"Four strategies good readers use \u2014 and what kind of reader you are." },

  { kind:"step", step:1, kicker:"Warm-up · Partner Interview",
    title:"Who are you as a reader?",
    intro:"Interview your partner, then introduce them to the group.",
    bullets:[
      "What's a book (or story, or comic) you actually liked?",
      "A book you started and gave up on \u2014 why?",
      "Where and when do you read best?",
      "Is there a story you've read or watched more than once?",
    ] },

  { kind:"plain", kicker:"Today's goal",
    title:"Read like a writer, not just a reader",
    intro:"Good readers don't just move their eyes across the page. They do these four things.",
    cards:[
      { h:"Predict", t:"Guess what's coming, using clues from the title and what you've read so far." },
      { h:"Question", t:"Ask the text things as you go: Why did she do that? What's about to happen?" },
    ], cardH:1.0 },

  { kind:"plain", kicker:"\u2026and two more",
    title:"The other two moves",
    cards:[
      { h:"Visualize", t:"Turn the words into a picture in your head. If you can't picture it, slow down and reread." },
      { h:"Infer", t:"Read between the lines \u2014 figure out what the writer shows but doesn't say straight out." },
    ], cardH:1.1 },

  { kind:"step", step:2, kicker:"Watch me · Modelling",
    title:"I'll show you first",
    intro:"Watch how I use all four on the opening of our story.",
    cards:[
      { h:"Predict", t:"From the title, I think this will be about\u2026" },
      { h:"Question", t:"Wait \u2014 why did the writer start here?" },
      { h:"Visualize", t:"I can picture the room: the light, the sound\u2026" },
      { h:"Infer", t:"She never says she's scared, but I can tell, because\u2026" },
    ], cardH:0.82 },

  { kind:"step", step:3, kicker:"Together, then on your own",
    title:"Your strategy log",
    intro:"On Worksheet 2, log one of each as we read.",
    bullets:[
      "One prediction (\u201CI predict\u2026\u201D)",
      "One question (\u201CI wonder\u2026\u201D)",
      "One thing you pictured (\u201CI picture\u2026\u201D)",
      "One inference (\u201CI can tell\u2026 because\u2026\u201D)",
    ] },

  { kind:"plain", kicker:"Share out",
    title:"Which strategy helped most?",
    intro:"There's no single right answer \u2014 different readers lean on different moves.",
    cards:[
      { h:"Turn and talk", t:"Tell a partner which of the four helped you understand the story best, and why." },
      { h:"Notice", t:"The move that helps you most is a clue to the kind of reader you are." },
    ], cardH:1.05 },

  { kind:"exit", title:"The reader I am",
    items:[
      "Finish this sentence: \u201CThe kind of reader I am is\u2026\u201D",
      "Then name the strategy you want to practise more.",
    ] },
]},

// ============================= LESSON 3 =============================
{ n:3, short:"Preparing the Talk", slides:[
  { kind:"title", title:"Preparing Your Talk", sub:"Telling one small story out loud \u2014 before you write it down." },

  { kind:"step", step:1, kicker:"Watch me · The hook",
    title:"One object, one moment",
    intro:"Watch my 60-second talk about one real object.",
    cards:[
      { h:"Notice what I DON'T do", t:"I don't list facts about the object (where I got it, what it's made of)." },
      { h:"Notice what I DO", t:"I tell one small moment \u2014 and let you feel why it matters." },
    ], cardH:1.05 },

  { kind:"compare", kicker:"The move · Same as good writing",
    title:"A \u201Ctelling\u201D talk  vs.  a \u201Cshowing\u201D talk",
    left:{ h:"Telling (a r\u00e9sum\u00e9)", items:[
      "\u201CThis is my grandma's ring. It's gold. She gave it to me two years ago.\u201D",
      "True \u2014 but flat. It's a list.",
      "The listener learns facts, feels nothing.",
    ]},
    right:{ h:"Showing (a moment)", items:[
      "\u201CMy hands were shaking when Grandma pressed the ring into my palm and folded my fingers over it.\u201D",
      "One moment, slowed down.",
      "The listener is there with you.",
    ]} },

  { kind:"step", step:2, kicker:"Plan it · Worksheet 3",
    title:"Choose your ONE moment",
    intro:"Your object connects to many things. Pick the single moment.",
    cards:[
      { h:"Opening line", t:"Drop us straight into the moment. Start with an action or an image, not \u201CThis is my\u2026\u201D" },
      { h:"The moment", t:"3\u20134 things you saw, heard, or felt \u2014 in order." },
      { h:"Why it matters", t:"One line: what this moment means to you." },
    ], cardH:0.95 },

  { kind:"step", step:3, kicker:"Say it well",
    title:"Simple delivery",
    bullets:[
      "Pace \u2014 slow down at the important part.",
      "Volume \u2014 loud enough for the back of the room.",
      "One pause \u2014 right before the line that matters most.",
      "Eyes up when you can \u2014 notes are fine.",
    ] },

  { kind:"plain", kicker:"Rehearse",
    title:"Try it once with a partner",
    cards:[
      { h:"Speaker", t:"Give your talk once, all the way through. Don't stop to fix it \u2014 just get through the moment." },
      { h:"Listener", t:"Tell your partner: one thing you could picture, and one thing you'd like to hear more about." },
    ], cardH:1.1 },

  { kind:"plain", kicker:"Next class · The listening deal",
    title:"When it's someone else's turn",
    intro:"A talk only works if the room listens. Here's the deal for next class.",
    bullets:[
      "Eyes on the speaker.",
      "One clarifying question ready.",
      "No interrupting \u2014 questions come after.",
    ] },

  { kind:"exit", title:"Ready check",
    items:[
      "Is your talk about ONE small moment (not a list of facts)? Yes / Not yet.",
      "Rehearse once tonight. Bring your object next class.",
    ] },
]},

// ============================= LESSON 4 =============================
{ n:4, short:"Object Talks", slides:[
  { kind:"title", title:"\u201COne Small Thing\u201D", sub:"Object talks \u2014 your moment, out loud." },

  { kind:"plain", kicker:"The deal",
    title:"Two jobs today",
    cards:[
      { h:"Speakers", t:"Give your 1\u20132 minute talk about one small moment. This is a light check, not a hard grade \u2014 just do your best." },
      { h:"Listeners", t:"Eyes on the speaker. One clarifying question ready. No interrupting." },
    ], cardH:1.1 },

  { kind:"plain", kicker:"What I'm listening for",
    title:"The speaking descriptor",
    intro:"You're being coached on these \u2014 not judged harshly. September is for finding your feet.",
    cards:[
      { h:"One clear moment", t:"You told a single small moment, not a list of facts." },
      { h:"Some showing", t:"You gave at least one detail we could see, hear, or feel." },
      { h:"You could be heard", t:"Volume and pace let the room follow you." },
    ], cardH:0.9 },

  { kind:"step", step:1, kicker:"How it runs",
    title:"The rotation",
    bullets:[
      "One speaker at a time.",
      "After each talk: ONE clarifying question from a listener.",
      "Listeners jot on Worksheet 4: one thing you pictured, one question.",
      "Quick reset between speakers \u2014 then we go again.",
    ] },

  { kind:"plain", kicker:"Listeners · Worksheet 4",
    title:"Your job while others talk",
    cards:[
      { h:"Picture it", t:"Write down one thing you could see, hear, or feel from their moment." },
      { h:"Wonder it", t:"Write one question you'd ask them about the moment." },
    ], cardH:1.05 },

  { kind:"plain", kicker:"After each round · Notice",
    title:"What made a talk vivid?",
    intro:"Quick share \u2014 no names needed.",
    bullets:[
      "Which detail put you right there in the moment?",
      "Where did a speaker slow down \u2014 and did it help?",
      "What's one thing you'll steal for your own writing?",
    ] },

  { kind:"plain", kicker:"Bridge to writing",
    title:"You just did the whole unit \u2014 out loud",
    cards:[
      { h:"Today", t:"You showed one small moment with your voice." },
      { h:"Next class", t:"You'll do the exact same thing \u2014 on the page." },
    ], cardH:1.1 },

  { kind:"exit", title:"One thing I'd change",
    items:[
      "The moment I chose was\u2026",
      "One thing I'd do differently next time is\u2026",
      "Reset \u2014 next class we start writing.",
    ] },
]},

// ============================= LESSON 5 =============================
{ n:5, short:"Showing, Not Telling", slides:[
  { kind:"title", title:"Showing, Not Telling", sub:"The one move that turns a fact into a moment." },

  { kind:"plain", kicker:"Connect · From last class",
    title:"You already did this \u2014 out loud",
    cards:[
      { h:"The talks that landed", t:"They didn't announce a feeling. They showed a moment, and we felt it." },
      { h:"Today", t:"We learn to do the exact same thing on the page. This is the heart of the whole unit." },
    ], cardH:1.1 },

  { kind:"compare", kicker:"The move",
    title:"Telling  vs.  Showing",
    left:{ h:"Telling", items:[
      "States a fact or a feeling, flat.",
      "\u201CI was nervous.\u201D",
      "The reader is told what to think.",
      "Fast \u2014 but you feel nothing.",
    ]},
    right:{ h:"Showing", items:[
      "Gives detail and action; the reader figures out the feeling.",
      "\u201CMy hands wouldn\u2019t stay still, so I jammed them into my pockets.\u201D",
      "The reader is IN the moment.",
      "Slower \u2014 and you\u2019re there.",
    ]} },

  { kind:"step", step:1, kicker:"Watch me · Modelling",
    title:"Three conversions",
    intro:"Watch me turn telling into showing \u2014 across different senses.",
    cards:[
      { h:"Sight", t:"\u201CThe room was messy\u201D \u2192 \u201CClothes spilled off the chair and a cereal bowl had crusted over on the desk.\u201D" },
      { h:"Sound", t:"\u201CIt was loud\u201D \u2192 \u201CI had to lean in and shout just to be heard over the whistles and drums.\u201D" },
      { h:"Body", t:"\u201CI was cold\u201D \u2192 \u201CMy fingers went stiff and I couldn\u2019t feel the zipper.\u201D" },
    ], cardH:0.9 },

  { kind:"plain", kicker:"Build it together",
    title:"The class \u201Cshowing bank\u201D",
    intro:"As we go, we collect the words that make showing work.",
    cards:[
      { h:"Strong verbs", t:"jammed, spilled, crusted, leaned, shoved \u2014 verbs that show action, not just \u201Cwas.\u201D" },
      { h:"Sensory words", t:"words for what you see, hear, smell, taste, and feel in your body." },
    ], cardH:1.05 },

  { kind:"step", step:2, kicker:"Together, then on your own · Worksheet 5",
    title:"Convert telling into showing",
    bullets:[
      "First we convert three together, using the table.",
      "Then you convert four more on your own.",
      "Then take ONE and grow it into a 3\u20134 sentence showing passage.",
      "Reach for the showing bank when you\u2019re stuck.",
    ] },

  { kind:"exit", title:"One last conversion",
    items:[
      "Turn this telling sentence into showing:  \u201CThe test was hard.\u201D",
      "Use at least one strong verb or sensory detail.",
      "Add your best word to the showing bank on your way out.",
    ] },
]},

// ============================= LESSON 6 =============================
{ n:6, short:"Character Through Action", slides:[
  { kind:"title", title:"Character on the Page", sub:"We learn who people are by what they do." },

  { kind:"compare", kicker:"Warm-up · Same move as last class",
    title:"Telling a trait  vs.  showing it",
    left:{ h:"Telling", items:[
      "\u201CShe was kind.\u201D",
      "You just have to take the writer\u2019s word for it.",
    ]},
    right:{ h:"Showing", items:[
      "\u201CShe gave away her lunch and said she wasn\u2019t hungry.\u201D",
      "You SEE the kindness \u2014 and believe it.",
    ]} },

  { kind:"plain", kicker:"Today\u2019s idea",
    title:"A trait is a claim. The action is the proof.",
    cards:[
      { h:"Trait", t:"A word that describes what someone is like: brave, stubborn, generous, shy." },
      { h:"Evidence", t:"The action or detail in the text that PROVES the trait. No evidence = just an opinion." },
    ], cardH:1.1 },

  { kind:"step", step:1, kicker:"Watch me · Modelling",
    title:"Name it, then prove it",
    intro:"Watch how I pull a trait from the text and point to the exact evidence.",
    cards:[
      { h:"I claim", t:"\u201CThis character is stubborn.\u201D" },
      { h:"I prove", t:"\u201CBecause even after everyone left, he refused to move from the bench.\u201D" },
      { h:"The test", t:"If I can\u2019t point to a line that shows it, it\u2019s not proven yet." },
    ], cardH:0.9 },

  { kind:"step", step:2, kicker:"Your turn · Worksheet 6",
    title:"Trait + evidence table",
    intro:"For two characters, fill in: the trait, the evidence, and why it fits.",
    bullets:[
      "Trait \u2014 one word.",
      "Evidence \u2014 the exact action or detail from the text.",
      "Why it fits \u2014 one sentence linking them.",
    ] },

  { kind:"plain", kicker:"Turn it on yourself",
    title:"What does YOUR moment show?",
    cards:[
      { h:"Think ahead", t:"The small moment you\u2019ll write about shows something about YOU \u2014 a trait." },
      { h:"Don\u2019t state it", t:"Show it through what you did in the moment, the way these characters do." },
    ], cardH:1.05 },

  { kind:"exit", title:"One trait, one proof",
    items:[
      "Name one trait \u2014 of a character OR of yourself.",
      "Give one piece of showing evidence that proves it.",
    ] },
]},

// ============================= LESSON 7 =============================
{ n:7, short:"Setting & Atmosphere", slides:[
  { kind:"title", title:"Setting & Atmosphere", sub:"Where a story happens \u2014 and how it makes you feel." },

  { kind:"step", step:1, kicker:"Warm-up · Two moods, one place",
    title:"Same place, different feeling",
    intro:"I\u2019ll read two versions of the SAME place. Listen for the feeling.",
    cards:[
      { h:"Version 1", t:"Sun warmed the kitchen; the kettle hummed and bread smelled sweet in the oven." },
      { h:"Version 2", t:"The kitchen was grey and still; a tap dripped into a sink of cold, greasy water." },
      { h:"Same room", t:"Two feelings. What changed? Only the details the writer chose." },
    ], cardH:0.9 },

  { kind:"plain", kicker:"Today\u2019s idea",
    title:"Setting vs. atmosphere",
    cards:[
      { h:"Setting", t:"The time and place a story happens: when + where." },
      { h:"Atmosphere", t:"The FEELING those details create: cozy, tense, lonely, hopeful. The writer chooses details on purpose." },
    ], cardH:1.1 },

  { kind:"step", step:2, kicker:"Watch me · Modelling",
    title:"One hallway, two ways",
    intro:"I\u2019ll write a plain school hallway two ways \u2014 changing only the details.",
    cards:[
      { h:"Welcoming", t:"Lockers painted bright, laughter echoing, a poster peeling at one warm corner." },
      { h:"Lonely", t:"One flickering light, my footsteps too loud, every locker shut and silent." },
    ], cardH:1.0 },

  { kind:"step", step:3, kicker:"Your turn · Worksheet 7",
    title:"Build YOUR moment\u2019s setting",
    intro:"Where does your small moment happen \u2014 and how should it feel?",
    bullets:[
      "Name the time and place (your setting).",
      "Choose the atmosphere you want (the feeling).",
      "List the sensory details that create that feeling.",
    ] },

  { kind:"plain", kicker:"The big takeaway",
    title:"Details are choices",
    cards:[
      { h:"Nothing is random", t:"A skilled writer picks each detail to build ONE feeling." },
      { h:"Your job", t:"Choose details for your moment on purpose \u2014 not just whatever was there." },
    ], cardH:1.05 },

  { kind:"exit", title:"Set the mood",
    items:[
      "Name the atmosphere of your small moment in one word.",
      "List three sensory details that create it.",
    ] },
]},

// ============================= LESSON 8 =============================
{ n:8, short:"Subject & Predicate", slides:[
  { kind:"title", title:"Building Blocks", sub:"Every complete sentence has two jobs to do." },

  { kind:"step", step:1, kicker:"Warm-up · Complete or not?",
    title:"Is this a complete thought?",
    intro:"Read each one. Thumbs up if it\u2019s a complete thought, thumbs down if it\u2019s not finished.",
    bullets:[
      "The old dog slept by the fire.",
      "Ran all the way home.",
      "My little brother and his loud friends.",
      "The bell finally rang.",
    ] },

  { kind:"compare", kicker:"Today\u2019s idea",
    title:"Subject  +  Predicate",
    left:{ h:"Subject", items:[
      "WHO or WHAT the sentence is about.",
      "Usually a noun.",
      "\u201CThe old dog\u2026\u201D",
    ]},
    right:{ h:"Predicate", items:[
      "What the subject DOES, or what is said about it.",
      "Contains the verb.",
      "\u201C\u2026slept by the fire.\u201D",
    ]} },

  { kind:"step", step:2, kicker:"Watch me · Modelling",
    title:"Label it, then build it",
    intro:"I\u2019ll mark the subject once and the predicate twice \u2014 then build a sentence from half a start.",
    cards:[
      { h:"Label", t:"The bell  |  finally rang.   (subject | predicate)" },
      { h:"Build from a subject", t:"\u201CMy noisy neighbour ___\u201D \u2192 add a predicate." },
      { h:"Build from a predicate", t:"\u201C___ crashed through the fence\u201D \u2192 add a subject." },
    ], cardH:0.9 },

  { kind:"step", step:3, kicker:"Your turn · Worksheet 8",
    title:"Find both parts",
    bullets:[
      "Underline the subject once, the predicate twice.",
      "Then complete the cloze sentences using the word bank.",
      "Check two sentences from your own setting-builder \u2014 do they have both parts?",
    ] },

  { kind:"exit", title:"Both parts",
    items:[
      "Write ONE complete sentence about your small moment.",
      "Underline the subject once, the predicate twice.",
    ] },
]},

// ============================= LESSON 9 =============================
{ n:9, short:"Fragments", slides:[
  { kind:"title", title:"Fragments", sub:"Spotting the pieces that aren\u2019t whole sentences \u2014 and fixing them." },

  { kind:"step", step:1, kicker:"Warm-up · Fragment or sentence?",
    title:"Quick sort",
    intro:"Use the test from last class: does it have BOTH a subject and a predicate?",
    bullets:[
      "Because the rain wouldn\u2019t stop.",
      "The team celebrated on the field.",
      "Running toward the finish line.",
      "She waited.",
    ] },

  { kind:"plain", kicker:"Today\u2019s idea",
    title:"Four common fragments",
    cards:[
      { h:"Missing subject", t:"\u201CRan all the way home.\u201D  \u2192 Who ran? Add a subject." },
      { h:"Missing verb", t:"\u201CThe dog in the yard.\u201D  \u2192 Did what? Add a predicate." },
      { h:"Clause left alone", t:"\u201CBecause I was late.\u201D  \u2192 Finish the thought." },
      { h:"Phrase left alone", t:"\u201COn a cold morning.\u201D  \u2192 Attach it to a sentence." },
    ], cardH:0.82 },

  { kind:"step", step:2, kicker:"Watch me · Modelling",
    title:"Name what\u2019s missing, then fix it",
    intro:"For each fragment I\u2019ll name the TYPE, then repair it.",
    cards:[
      { h:"Fragment", t:"\u201CBecause the rain wouldn\u2019t stop.\u201D" },
      { h:"Type", t:"Subordinate clause left alone." },
      { h:"Fix", t:"\u201CBecause the rain wouldn\u2019t stop, we stayed inside.\u201D" },
    ], cardH:0.9 },

  { kind:"step", step:3, kicker:"Your turn · Worksheet 9",
    title:"Spot and repair",
    bullets:[
      "Find the fragments in the passage.",
      "Name the type of each.",
      "Repair each using the fragment-repair checklist.",
      "Then hunt your OWN notes for a fragment and fix it.",
    ] },

  { kind:"exit", title:"Fix two",
    items:[
      "Repair these two fragments and name each type:",
      "1) \u201CWhen the lights went out.\u201D",
      "2) \u201CThe cat on the windowsill.\u201D",
    ] },
]},

// ============================= LESSON 10 =============================
{ n:10, short:"Planning the Narrative", slides:[
  { kind:"title", title:"Choosing the Moment", sub:"You have all the tools. Now we plan the paragraph." },

  { kind:"plain", kicker:"Connect · Everything you\u2019ve built",
    title:"You\u2019re ready to plan",
    cards:[
      { h:"You have\u2026", t:"a moment (your object), a way to make it vivid (showing), character and setting tools, and complete sentences." },
      { h:"Now", t:"we put them together into a plan for ONE paragraph." },
    ], cardH:1.1 },

  { kind:"step", step:1, kicker:"Today\u2019s idea",
    title:"The shape of a personal narrative",
    cards:[
      { h:"Hook", t:"Drop us straight into the moment \u2014 an action or an image, not \u201COne day\u2026\u201D" },
      { h:"The moment, beat by beat", t:"3\u20134 showing beats, in order, slowed down." },
      { h:"Why it matters", t:"A closing line that lands what the moment meant." },
    ], cardH:0.9 },

  { kind:"step", step:2, kicker:"Watch me · Modelling",
    title:"Plan it \u2014 and cut it",
    intro:"I\u2019ll plan my own moment on the organizer, thinking aloud about what to keep and cut.",
    cards:[
      { h:"Keep", t:"The three beats that ARE the moment." },
      { h:"Cut", t:"Everything that drifts into a whole day. Scope: ONE moment." },
    ], cardH:1.0 },

  { kind:"step", step:3, kicker:"Your turn · Worksheet 10",
    title:"Plan your moment",
    bullets:[
      "Write your hook idea.",
      "List 3\u20134 showing beats, in order.",
      "Write your \u2018why it matters\u2019 line.",
      "Partner check: is this ONE moment, or is it drifting?",
    ] },

  { kind:"exit", title:"Your hook",
    items:[
      "Write your one-sentence hook \u2014 the line that drops us into the moment.",
      "Bring your organizer to the drafting lesson.",
    ] },
]},

// ============================= LESSON 11 =============================
{ n:11, short:"Drafting", slides:[
  { kind:"title", title:"Drafting Your Narrative", sub:"Write the whole moment through \u2014 don\u2019t stop to fix." },

  { kind:"plain", kicker:"Today\u2019s rules",
    title:"Three rules for drafting",
    cards:[
      { h:"Write it all the way through", t:"Don\u2019t stop to fix spelling or wording. Get the whole moment down." },
      { h:"Show, don\u2019t tell", t:"Reach for the showing bank. Turn feelings into detail and action." },
      { h:"Stay in the moment", t:"One moment, slowed down. If it drifts into a whole day, pull it back." },
    ], cardH:0.95 },

  { kind:"step", step:1, kicker:"Watch me · Modelling",
    title:"I\u2019ll draft the first two beats",
    intro:"Watch me draft from my organizer \u2014 messy is fine, moving is the point.",
    cards:[
      { h:"From the plan", t:"Hook \u2192 Beat 1 \u2192 Beat 2, straight from the organizer." },
      { h:"Notice", t:"I keep going even when a sentence isn\u2019t perfect. Fixing comes later." },
    ], cardH:1.05 },

  { kind:"plain", kicker:"Now you · Quiet writing",
    title:"Draft from your organizer",
    intro:"Head down, whole moment, start to finish. I\u2019ll come around to conference.",
    bullets:[
      "Start at your hook.",
      "Write each beat as a showing moment.",
      "End on your \u2018why it matters\u2019 line.",
      "Don\u2019t erase \u2014 cross out and keep moving.",
    ] },

  { kind:"plain", kicker:"Mid-point nudge",
    title:"Reread \u2014 and flag, don\u2019t fix",
    cards:[
      { h:"Find one telling spot", t:"Reread what you have. Find ONE line that tells instead of shows." },
      { h:"Flag it", t:"Underline it and leave it. You\u2019ll fix it in the revision lesson \u2014 not now." },
    ], cardH:1.1 },

  { kind:"exit", title:"Two marks before you go",
    items:[
      "Mark ONE line you\u2019re proud of.",
      "Mark ONE line you\u2019ll come back to.",
      "Finish the moment tonight if class time ran short.",
    ] },
]},

// ============================= LESSON 12 =============================
{ n:12, short:"Revising", slides:[
  { kind:"title", title:"Revising for Showing", sub:"Change what the writing shows \u2014 not the spelling. That comes later." },

  { kind:"compare", kicker:"Today\u2019s idea",
    title:"Revising  vs.  Editing",
    left:{ h:"Revising (today)", items:[
      "Changes WHAT the writing says and shows.",
      "Turns telling into showing.",
      "Adds detail; cuts drift.",
      "About meaning.",
    ]},
    right:{ h:"Editing (next class)", items:[
      "Fixes HOW it\u2019s written.",
      "Spelling, punctuation, fragments.",
      "Doesn\u2019t change the story.",
      "About mechanics.",
    ]} },

  { kind:"step", step:1, kicker:"Watch me · Modelling",
    title:"Telling \u2192 showing, live",
    intro:"I\u2019ll take a telling line from my draft and revise it, using the class showing bank.",
    cards:[
      { h:"Before", t:"\u201CI was really happy.\u201D" },
      { h:"After", t:"\u201CI couldn\u2019t stop grinning; my cheeks actually ached by the end.\u201D" },
    ], cardH:1.05 },

  { kind:"step", step:2, kicker:"Your turn · Worksheet 12",
    title:"The telling hunt",
    bullets:[
      "Find every telling line in your draft.",
      "Revise at least TWO into showing.",
      "Add or sharpen one setting detail and one character-through-action detail.",
    ] },

  { kind:"plain", kicker:"Partner revision",
    title:"Read for each other",
    cards:[
      { h:"Reader", t:"Read your partner\u2019s paragraph. Mark ONE place you couldn\u2019t picture." },
      { h:"Writer", t:"You revise that spot \u2014 for the reader, not just for yourself." },
    ], cardH:1.1 },

  { kind:"exit", title:"Your best line",
    items:[
      "Copy out the strongest SHOWING line in your paragraph.",
      "Bring your revised draft to the editing lesson.",
    ] },
]},

// ============================= LESSON 13 =============================
{ n:13, short:"Editing & Model", slides:[
  { kind:"title", title:"Editing & Model Annotation", sub:"See the target \u2014 then make your sentences complete." },

  { kind:"step", step:1, kicker:"Model annotation · See the target",
    title:"Mark up a strong paragraph",
    intro:"Before you edit yours, we\u2019ll annotate a model that already works.",
    cards:[
      { h:"Underline", t:"the showing lines \u2014 where the writer makes you picture it." },
      { h:"Box", t:"the hook \u2014 the line that drops you in." },
      { h:"Flag", t:"the \u2018why it matters\u2019 line at the end." },
      { h:"Check", t:"every sentence is complete \u2014 no fragments." },
    ], cardH:0.82 },

  { kind:"plain", kicker:"Name the target",
    title:"What makes it proficient?",
    intro:"From the model, we name what \u2018good\u2019 looks like \u2014 so you know what you\u2019re aiming for.",
    cards:[
      { h:"It shows", t:"Feelings come through detail and action, not flat statements." },
      { h:"It\u2019s focused", t:"One small moment, start to finish, nothing drifting." },
      { h:"It\u2019s clean", t:"Complete sentences; the reader is never tripped up." },
    ], cardH:0.9 },

  { kind:"step", step:2, kicker:"Edit · Pass 1",
    title:"Hunt your fragments",
    intro:"Apply the fragment checklist from Lesson 9 to your OWN paragraph.",
    bullets:[
      "Read each sentence: subject AND predicate?",
      "Repair every fragment you find.",
      "Watch for because/when/if clauses left alone.",
    ] },

  { kind:"step", step:3, kicker:"Edit · Pass 2",
    title:"Conventions & clean copy",
    bullets:[
      "Capital letters and end punctuation.",
      "Obvious spelling.",
      "Swap and peer-edit against the checklist.",
      "Write your clean copy for the showcase.",
    ] },

  { kind:"exit", title:"Ready to publish",
    items:[
      "Is every sentence complete? Yes / Fix one more.",
      "Finalize your clean copy for the \u2018This Is Me\u2019 showcase.",
    ] },
]},

// ============================= LESSON 14 =============================
{ n:14, short:"This Is Me Showcase", slides:[
  { kind:"title", title:"\u201CThis Is Me\u201D Showcase", sub:"Your moment \u2014 out loud and on the page, side by side." },

  { kind:"plain", kicker:"The showcase",
    title:"Two versions of one moment",
    cards:[
      { h:"Your object", t:"Present the object from your \u2018One Small Thing\u2019 talk." },
      { h:"Your narrative", t:"Read (or tell) the small-moment paragraph you wrote about it." },
    ], cardH:1.1 },

  { kind:"plain", kicker:"The discussion protocol",
    title:"When it\u2019s someone else\u2019s turn",
    intro:"After each presentation, the audience gives two things.",
    cards:[
      { h:"One appreciation", t:"Name one thing that worked \u2014 a detail, a line, a moment you could picture." },
      { h:"One question", t:"Ask one clarifying question about the moment." },
    ], cardH:1.1 },

  { kind:"step", step:1, kicker:"How it runs",
    title:"Presentations",
    bullets:[
      "Present in a rotation \u2014 groups or whole class.",
      "You\u2019re assessed on the presentation rubric (4-point).",
      "Then your paragraph goes into your writing record \u2014 this is your kept Term 1 piece.",
    ] },

  { kind:"plain", kicker:"Reflect · Worksheet 14",
    title:"Look how far you came",
    cards:[
      { h:"Then and now", t:"What changed between your out-loud version (Lesson 4) and your written version?" },
      { h:"Who you\u2019re becoming", t:"What kind of reader and writer are you becoming this year?" },
    ], cardH:1.1 },

  { kind:"exit", title:"That\u2019s a wrap on Unit 1",
    items:[
      "You told one small moment \u2014 out loud and on the page.",
      "Keep your paragraph. We\u2019ll look back at it in June.",
      "Next unit: coming up.",
    ] },
]},
];

module.exports = { DECKS, DECK_PLAN, DECK_KEYMAP };
