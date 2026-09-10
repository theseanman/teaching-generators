// u1_worksheets.js — ENG8 U1 worksheet content, Lessons 1–4.
// Block kinds: instr | write(lines) | box(label,lines) | frames(list) | table(head,rows,widths)
//   | grid(items) | checklist(items) | support(blocks) | extension(blocks) | fill(prompt,lines)
const WORKSHEETS = [
// ------------------------------- L1 -------------------------------
{ n:1, title:"Getting to Know Each Other", subtitle:"Six-word stories, a class hunt, and your first small moment.",
  blocks:[
    { kind:"section", t:"Part A — Your Six-Word Story", accentStep:1 },
    { kind:"instr", t:"A whole story can fit in six words. Write ONE six-word story, or a six-word \u201Cabout me.\u201D Make every word count. Boxes = one word each." },
    { kind:"sixbox" },
    { kind:"instr", t:"Bonus: what does your six-word story make a reader picture or feel?" },
    { kind:"write", lines:2 },

    { kind:"section", t:"Part B — Find Someone Who\u2026", accentStep:2 },
    { kind:"instr", t:"Get up and find a DIFFERENT classmate for each row. Write their name." },
    { kind:"table", head:["Find someone who\u2026","Name"], widths:[6600,2160], rows:[
      ["\u2026 has read a book more than once",""],
      ["\u2026 cried (or almost) at a movie",""],
      ["\u2026 tells the same story at every family dinner",""],
      ["\u2026 would rather listen to a story than read one",""],
      ["\u2026 has a favourite word",""],
    ]},

    { kind:"section", t:"Part C — Your First Small Moment", accentStep:3 },
    { kind:"instr", t:"A personal narrative tells ONE small moment, not a whole day. Write down a small moment from your life you might tell a story about. Keep it \u2014 you may use it later." },
    { kind:"box", label:"My small moment", lines:3 },
    { kind:"instr", t:"Circle one: How long did this moment last?     A few seconds     A few minutes     Longer than that" },
    { kind:"note", t:"Homework: choose an object, photo, or small artifact for your \u201COne Small Thing\u201D talk. Bring it by Lesson 4." },

    { kind:"support", blocks:[
      { kind:"instr", t:"Six-word frame \u2014 fill the blanks, then tighten:  ____ ____ ____ , ____ ____ ____ ." },
      { kind:"instr", t:"Word bank for \u201Cabout me\u201D: always, never, secretly, still, again, finally, almost, once." },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Write THREE six-word stories \u2014 one funny, one sad, one surprising. Which works best, and why?" },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L2 -------------------------------
{ n:2, title:"Reading Like a Writer", subtitle:"Four reading strategies \u2014 and the kind of reader you are.",
  blocks:[
    { kind:"section", t:"Part A — Reading-Identity Interview", accentStep:1 },
    { kind:"instr", t:"Interview your partner. Write their answers, then introduce them to your group." },
    { kind:"frames", list:[
      "A book, story, or comic you actually liked:",
      "A book you started and gave up on \u2014 and why:",
      "Where and when you read best:",
      "A story you\u2019ve read or watched more than once:",
    ]},

    { kind:"section", t:"Part B — Strategy Log", accentStep:2 },
    { kind:"instr", t:"As we read, log ONE of each. Use the sentence starters." },
    { kind:"table", head:["Strategy","Your example"], widths:[2400,6360], rows:[
      ["Predict  (\u201CI predict\u2026\u201D)",""],
      ["Question  (\u201CI wonder\u2026\u201D)",""],
      ["Visualize  (\u201CI picture\u2026\u201D)",""],
      ["Infer  (\u201CI can tell\u2026 because\u2026\u201D)",""],
    ], tall:true},

    { kind:"section", t:"Part C — Which Strategy Helped Most?", accentStep:3 },
    { kind:"fill", prompt:"The strategy that helped me understand this story best was", lines:0, inline:true },
    { kind:"instr", t:"\u2026 because:" },
    { kind:"write", lines:2 },
    { kind:"fill", prompt:"The kind of reader I am is", lines:0, inline:true },
    { kind:"write", lines:2 },

    { kind:"support", blocks:[
      { kind:"instr", t:"Sentence starters: \u201CI predict\u2026 because the title says\u2026\u201D  \u2022  \u201CI wonder why\u2026\u201D  \u2022  \u201CI picture\u2026 (colour, sound, size)\u201D  \u2022  \u201CI can tell ___ feels ___ because\u2026\u201D" },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Add a connection: this story reminds me of ___ (a book / my life / the world) because ___." },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L3 -------------------------------
{ n:3, title:"Preparing Your \u201COne Small Thing\u201D Talk", subtitle:"Plan one small moment \u2014 to say out loud.",
  blocks:[
    { kind:"section", t:"Part A — Telling vs. Showing (Out Loud)", accentStep:1 },
    { kind:"instr", t:"Read each pair. Tick the one that SHOWS a moment instead of listing facts." },
    { kind:"table", head:["A","B","Which one shows?"], widths:[3400,3400,1960], rows:[
      ["\u201CThis is my medal. I won it in 2023.\u201D","\u201CMy legs were shaking as they hung the medal around my neck.\u201D","A  /  B"],
      ["\u201CThis is my dog\u2019s collar. He was brown.\u201D","\u201CThe collar still smells like him if I hold it close.\u201D","A  /  B"],
    ], tall:true},

    { kind:"section", t:"Part B — Plan Your Talk", accentStep:2 },
    { kind:"instr", t:"Your object connects to many things. Pick the ONE moment. Then plan it." },
    { kind:"box", label:"My object", lines:1 },
    { kind:"box", label:"The ONE moment it\u2019s tied to", lines:2 },
    { kind:"box", label:"Opening line (drop us into the moment \u2014 not \u201CThis is my\u2026\u201D)", lines:2 },
    { kind:"frames", list:[
      "Something I saw:",
      "Something I heard:",
      "Something I felt (in my body or heart):",
    ]},
    { kind:"box", label:"Why it matters (one line)", lines:2 },

    { kind:"section", t:"Part C — Delivery Check", accentStep:3 },
    { kind:"checklist", items:[
      "My talk is about ONE small moment, not a list of facts.",
      "I have an opening line that drops us in.",
      "I know where I\u2019ll slow down and pause.",
      "I rehearsed it once out loud.",
    ]},

    { kind:"support", blocks:[
      { kind:"instr", t:"Opening-line options: \u201CIt was the day that\u2026\u201D  \u2022  \u201CI\u2019ll never forget the sound of\u2026\u201D  \u2022  \u201CMy hands were\u2026 when\u2026\u201D" },
      { kind:"instr", t:"You may deliver your talk to a small group or just to Mr. Reid." },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Try an in-media-res opening \u2014 start in the middle of the action: \u201CIt was already too late when\u2026\u201D" },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L4 -------------------------------
{ n:4, title:"\u201COne Small Thing\u201D — Speaker & Listener Sheet", subtitle:"Your moment out loud \u2014 and your job while others share.",
  blocks:[
    { kind:"section", t:"Part A — Before You Speak", accentStep:1 },
    { kind:"checklist", items:[
      "I have my object (or a photo).",
      "I know my opening line.",
      "My talk is one small moment.",
    ]},

    { kind:"section", t:"Part B — Listener Log", accentStep:2 },
    { kind:"instr", t:"While each classmate talks: eyes on the speaker, no interrupting. For each speaker, jot one thing you PICTURED and one QUESTION you\u2019d ask." },
    { kind:"table", head:["Speaker","One thing I pictured","A question I\u2019d ask"], widths:[2000,3400,3360], rows:[
      ["","",""],["","",""],["","",""],["","",""],["","",""],
    ], tall:true},

    { kind:"section", t:"Part C — Notice", accentStep:3 },
    { kind:"fill", prompt:"One detail that put me right there in someone\u2019s moment", lines:0, inline:true },
    { kind:"write", lines:1 },
    { kind:"fill", prompt:"One thing I\u2019ll steal for my own writing", lines:0, inline:true },
    { kind:"write", lines:1 },

    { kind:"section", t:"Part D — Speaker Self-Reflection", accentStep:4 },
    { kind:"fill", prompt:"The moment I chose was", lines:0, inline:true },
    { kind:"write", lines:1 },
    { kind:"fill", prompt:"One thing I\u2019d do differently next time is", lines:0, inline:true },
    { kind:"write", lines:2 },

    { kind:"support", blocks:[
      { kind:"instr", t:"Question stems: \u201CWhat did ___ look like?\u201D  \u2022  \u201CHow did you feel when\u2026?\u201D  \u2022  \u201CWhat happened right after?\u201D" },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Discussion-leader role: ask each speaker in your group one follow-up question that gets them to add a detail." },
    ]},
  ]},

// ------------------------------- L5 -------------------------------
{ n:5, title:"Showing, Not Telling", subtitle:"Turn a flat fact into a moment a reader can see.",
  blocks:[
    { kind:"section", t:"Part A — Telling vs. Showing", accentStep:1 },
    { kind:"instr", t:"TELLING states a fact or feeling. SHOWING gives detail and action so the reader figures the feeling out. Read each pair; circle the one that SHOWS." },
    { kind:"table", head:["A — telling","B — showing","Shows?"], widths:[3200,4160,1400], rows:[
      ["\u201CI was nervous.\u201D","\u201CMy hands wouldn\u2019t stay still, so I jammed them into my pockets.\u201D","A / B"],
      ["\u201CThe room was messy.\u201D","\u201CClothes spilled off the chair and a cereal bowl had crusted over.\u201D","A / B"],
      ["\u201CIt was cold.\u201D","\u201CMy fingers went stiff and I couldn\u2019t feel the zipper.\u201D","A / B"],
    ], tall:true },

    { kind:"section", t:"Part B — Conversion Table", accentStep:2 },
    { kind:"instr", t:"Turn each TELLING sentence into SHOWING. Use a strong verb or a sensory detail. The sense column is there to help \u2014 use it." },
    { kind:"table", head:["Telling sentence","Sense to use","Your showing version"], widths:[2600,1600,4560], rows:[
      ["The test was hard.","Body / feeling",""],
      ["She was happy.","Sight / action",""],
      ["The dog was excited.","Sound / motion",""],
      ["Lunch was disgusting.","Taste / smell",""],
    ], tall:true },

    { kind:"section", t:"Part C — Grow One Into a Passage", accentStep:3 },
    { kind:"instr", t:"Pick your strongest showing sentence from Part B. Grow it into 3\u20134 sentences that put the reader right in the moment." },
    { kind:"write", lines:5 },

    { kind:"support", blocks:[
      { kind:"instr", t:"Sensory word bank \u2014  SEE: flickered, crowded, bright, cracked  \u2022  HEAR: buzzed, echoed, silence, whistled  \u2022  FEEL: stiff, damp, warm, tight  \u2022  SMELL/TASTE: sweet, sour, smoky, stale." },
      { kind:"instr", t:"Strong-verb starters: jammed, spilled, shoved, leaned, crusted, rattled, gripped." },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Convert a sentence WITHOUT the sense hint \u2014 then add one line that shows a feeling CHANGING (e.g. nervous \u2192 calm)." },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L6 -------------------------------
{ n:6, title:"Character Through Action", subtitle:"A trait is a claim. The action is the proof.",
  blocks:[
    { kind:"section", t:"Part A — Claim and Proof", accentStep:1 },
    { kind:"instr", t:"A trait is a word for what someone is like. Evidence is the action that proves it. Match each trait to the action that shows it \u2014 write the letter." },
    { kind:"table", head:["Trait","","Action (write the letter)"], widths:[2600,600,5560], rows:[
      ["1. Generous","","___   A. Refused to move from the bench after everyone left."],
      ["2. Stubborn","","___   B. Gave away her lunch and said she wasn\u2019t hungry."],
      ["3. Brave","","___   C. Stepped in front of the smaller kid without thinking."],
    ], tall:true },

    { kind:"section", t:"Part B — Trait + Evidence Table", accentStep:2 },
    { kind:"instr", t:"For TWO characters from our text, name a trait, quote or describe the evidence, and explain why it fits." },
    { kind:"table", head:["Character","Trait","Evidence (action/detail)","Why it fits"], widths:[1700,1500,3060,2500], rows:[
      ["","","",""],
      ["","","",""],
    ], tall:true },

    { kind:"section", t:"Part C — Turn It On Yourself", accentStep:3 },
    { kind:"instr", t:"The small moment you\u2019ll write about shows something about YOU. Don\u2019t state it \u2014 show it." },
    { kind:"box", label:"A trait my moment shows about me", lines:1 },
    { kind:"box", label:"The action in my moment that shows it (not \u201CI am ___\u201D)", lines:2 },

    { kind:"support", blocks:[
      { kind:"instr", t:"Trait word bank: kind, stubborn, brave, shy, careful, funny, loyal, curious, proud, gentle." },
      { kind:"instr", t:"Sentence frame: \u201C___ is ___ because they ___ (action from the text).\u201D" },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Find a trait a character SHOWS but would probably deny having. Point to the evidence." },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L7 -------------------------------
{ n:7, title:"Setting & Atmosphere", subtitle:"Where it happens \u2014 and how it makes you feel.",
  blocks:[
    { kind:"section", t:"Part A — Name the Feeling", accentStep:1 },
    { kind:"instr", t:"Two versions of the same place. Read each, then name the atmosphere and underline the detail that created it." },
    { kind:"frames", list:[
      "Version 1 \u2014 \u201CSun warmed the kitchen; the kettle hummed and bread smelled sweet.\u201D  Atmosphere:",
      "Version 2 \u2014 \u201CThe kitchen was grey and still; a tap dripped into cold, greasy water.\u201D  Atmosphere:",
    ]},

    { kind:"section", t:"Part B — Build Your Moment\u2019s Setting", accentStep:2 },
    { kind:"instr", t:"Now build the setting of YOUR small moment. Choose the atmosphere first, then the details that make it." },
    { kind:"box", label:"Setting \u2014 time and place (when + where)", lines:1 },
    { kind:"box", label:"Atmosphere \u2014 the feeling I want (one word)", lines:1 },
    { kind:"instr", t:"Sensory details that build that feeling:" },
    { kind:"frames", list:[
      "I see:",
      "I hear:",
      "I feel / smell:",
    ]},

    { kind:"section", t:"Part C — Same Place, New Mood", accentStep:3 },
    { kind:"instr", t:"Take one everyday place (a bus stop, a gym, your kitchen) and write it in ONE clear mood using three details." },
    { kind:"write", lines:4 },

    { kind:"support", blocks:[
      { kind:"instr", t:"Atmosphere word bank: cozy, tense, lonely, hopeful, peaceful, uneasy, joyful, gloomy." },
      { kind:"instr", t:"Two-mood model to copy: WELCOMING = warm light, laughter, bright colour. LONELY = one flickering light, echoing steps, silence." },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Write your place a THIRD way in a mixed mood \u2014 e.g. bittersweet (happy and sad at once)." },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L8 -------------------------------
{ n:8, title:"Subject & Predicate", subtitle:"Every complete sentence needs both parts.",
  blocks:[
    { kind:"section", t:"Part A — Complete or Not?", accentStep:1 },
    { kind:"instr", t:"Tick the ones that are COMPLETE thoughts (both a subject and a predicate). Cross out the ones that aren\u2019t." },
    { kind:"checklist", items:[
      "The old dog slept by the fire.",
      "Ran all the way home.",
      "My little brother and his loud friends.",
      "The bell finally rang.",
      "Under the broken streetlight.",
    ]},

    { kind:"section", t:"Part B — Find Both Parts", accentStep:2 },
    { kind:"instr", t:"Underline the SUBJECT once and the PREDICATE twice." },
    { kind:"frames", list:[
      "The rusty gate creaked in the wind.",
      "My best friend moved away last summer.",
      "Three squirrels chased each other up the tree.",
    ]},

    { kind:"section", t:"Part C — Complete the Sentence (Word Bank)", accentStep:3 },
    { kind:"instr", t:"Fill each blank with the correct word from the word bank." },
    { kind:"cloze",
      bank:["subject","predicate","verb","noun","complete"],
      items:[
        { text:"Every ____ sentence has two parts.", answers:["complete"] },
        { text:"The ____ tells who or what the sentence is about.", answers:["subject"] },
        { text:"The ____ tells what the subject does or is.", answers:["predicate"] },
        { text:"A ____ is an action word found in the predicate.", answers:["verb"] },
        { text:"A ____ names a person, place, or thing and can be the subject.", answers:["noun"] },
      ]},

    { kind:"support", blocks:[
      { kind:"instr", t:"Colour code as you go: subject = blue, predicate = green. Ask: WHO/WHAT is it about? WHAT do they do?" },
      { kind:"instr", t:"Cloze hint \u2014 first letters: c___, s___, p___, v___, n___." },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Write two sentences \u2014 one with a compound subject (two subjects) and one with a compound predicate (two actions). Label both parts." },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L9 -------------------------------
{ n:9, title:"Fragments — Spot & Fix", subtitle:"Find the pieces that aren\u2019t whole sentences \u2014 and repair them.",
  blocks:[
    { kind:"section", t:"Part A — Fragment or Sentence?", accentStep:1 },
    { kind:"instr", t:"Use the test: does it have BOTH a subject and a predicate? Write S (sentence) or F (fragment)." },
    { kind:"table", head:["Item","S / F"], widths:[6960,1800], rows:[
      ["Because the rain wouldn\u2019t stop.",""],
      ["The team celebrated on the field.",""],
      ["Running toward the finish line.",""],
      ["She waited.",""],
      ["The old house at the end of the street.",""],
    ], tall:true },

    { kind:"section", t:"Part B — Spot & Repair", accentStep:2 },
    { kind:"instr", t:"Each item is a fragment. Name the TYPE, then rewrite it as a complete sentence." },
    { kind:"table", head:["Fragment","Type","Your repair"], widths:[2700,1900,4160], rows:[
      ["Ran all the way home.","",""],
      ["The dog in the yard.","",""],
      ["Because I was late.","",""],
      ["On a cold morning.","",""],
    ], tall:true },

    { kind:"section", t:"Part C — Hunt Your Own", accentStep:3 },
    { kind:"instr", t:"Look back at your object-talk notes or setting-builder. Find one fragment and fix it here." },
    { kind:"box", label:"My fragment \u2192 my repair", lines:2 },

    { kind:"support", blocks:[
      { kind:"instr", t:"Fragment-repair checklist \u2014  Missing subject? Add WHO/WHAT.  \u2022  Missing verb? Add the action.  \u2022  Starts with because/when/if/although? Finish the thought.  \u2022  Just a phrase? Attach it to a full sentence." },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Writers sometimes use a fragment ON PURPOSE for effect. Write one, then explain when that\u2019s allowed \u2014 and when it isn\u2019t." },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L10 -------------------------------
{ n:10, title:"Planning Your Narrative", subtitle:"One small moment \u2014 hook, beats, and why it matters.",
  blocks:[
    { kind:"section", t:"Part A — The Shape", accentStep:1 },
    { kind:"instr", t:"A personal-narrative paragraph has three parts. You\u2019ll plan each one below." },
    { kind:"frames", list:[
      "HOOK \u2014 drops us into the moment (an action or image, not \u201COne day\u2026\u201D):",
      "THE MOMENT \u2014 3\u20134 showing beats, in order:",
      "WHY IT MATTERS \u2014 the closing line:",
    ]},

    { kind:"section", t:"Part B — Your Planning Organizer", accentStep:2 },
    { kind:"box", label:"Hook (one sentence that drops us in)", lines:2 },
    { kind:"box", label:"Beat 1 (what happens first \u2014 shown)", lines:1 },
    { kind:"box", label:"Beat 2", lines:1 },
    { kind:"box", label:"Beat 3", lines:1 },
    { kind:"box", label:"Beat 4 (optional)", lines:1 },
    { kind:"box", label:"Why it matters (closing line)", lines:2 },

    { kind:"section", t:"Part C — Scope Check", accentStep:3 },
    { kind:"instr", t:"Trade with a partner. Read their plan and answer:" },
    { kind:"checklist", items:[
      "Is this ONE small moment (minutes, not a whole day)?",
      "Can I picture each beat, or are some just \u2018telling\u2019?",
      "Does the closing line land why it matters?",
    ]},

    { kind:"support", blocks:[
      { kind:"instr", t:"Hook starters: \u201CThe moment I\u2026\u201D  \u2022  \u201CI\u2019ll never forget the sound of\u2026\u201D  \u2022  \u201CIt was already too late when\u2026\u201D" },
      { kind:"instr", t:"If your plan covers more than a few minutes, zoom in: pick the single most important minute and plan only that." },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Plan a SECOND, different opening for the same moment. Which is stronger, and why?" },
      { kind:"write", lines:3 },
    ]},
  ]},

// ------------------------------- L11 -------------------------------
{ n:11, title:"Drafting Your Narrative", subtitle:"Write the whole moment through \u2014 fixing comes later.",
  blocks:[
    { kind:"section", t:"Part A — Before You Draft", accentStep:1 },
    { kind:"instr", t:"Copy your plan across so it\u2019s in front of you as you write." },
    { kind:"frames", list:[
      "My hook:",
      "My \u2018why it matters\u2019 line:",
    ]},

    { kind:"section", t:"Part B — Draft", accentStep:2 },
    { kind:"instr", t:"Write your whole moment, start to finish. Don\u2019t stop to fix \u2014 keep moving. Show, don\u2019t tell. Stay in the one moment." },
    { kind:"write", lines:12 },

    { kind:"section", t:"Part C — Reread & Flag", accentStep:3 },
    { kind:"instr", t:"Reread your draft. Underline ONE line that TELLS instead of shows \u2014 don\u2019t fix it yet. Then mark one line you\u2019re proud of." },
    { kind:"checklist", items:[
      "I wrote the whole moment, start to finish.",
      "I underlined one \u2018telling\u2019 line to revise later.",
      "I marked one line I\u2019m proud of.",
    ]},

    { kind:"support", blocks:[
      { kind:"instr", t:"Stuck? Start a sentence with: \u201CFirst\u2026\u201D  \u2022  \u201CThen\u2026\u201D  \u2022  \u201CRight when\u2026\u201D  \u2022  \u201CI remember\u2026\u201D  and just keep the moment moving." },
      { kind:"instr", t:"Reach for the class showing bank whenever you catch yourself naming a feeling." },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Draft a second, different ENDING for your moment. Keep both \u2014 you\u2019ll choose in revision." },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L12 -------------------------------
{ n:12, title:"Revising for Showing", subtitle:"Change what the writing shows \u2014 not the spelling.",
  blocks:[
    { kind:"section", t:"Part A — Revising vs. Editing", accentStep:1 },
    { kind:"instr", t:"Sort each action: does it belong to REVISING (meaning) or EDITING (mechanics)? Write R or E." },
    { kind:"table", head:["Action","R / E"], widths:[6960,1800], rows:[
      ["Turn \u2018I was scared\u2019 into a showing sentence.",""],
      ["Fix a capital letter.",""],
      ["Add a sensory detail to the setting.",""],
      ["Repair a sentence fragment.",""],
      ["Cut a part that drifts off the moment.",""],
    ], tall:true },

    { kind:"section", t:"Part B — The Telling Hunt", accentStep:2 },
    { kind:"instr", t:"Find telling lines in your draft. Rewrite at least TWO into showing." },
    { kind:"table", head:["Telling line (from my draft)","My showing revision"], widths:[3960,4800], rows:[
      ["",""],
      ["",""],
    ], tall:true },

    { kind:"section", t:"Part C — Sharpen & Partner Check", accentStep:3 },
    { kind:"box", label:"One setting/atmosphere detail I added or sharpened", lines:1 },
    { kind:"box", label:"One character-through-action detail I added", lines:1 },
    { kind:"instr", t:"Partner: read your paragraph and mark ONE place they couldn\u2019t picture. Note it here, then revise it." },
    { kind:"box", label:"The spot my partner couldn\u2019t picture \u2192 my revision", lines:2 },

    { kind:"support", blocks:[
      { kind:"instr", t:"Telling words to hunt for: was, felt, is, really, very, so, a lot. When you see one, ask: how could I SHOW this instead?" },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Revise for rhythm: place one short, punchy sentence right next to a longer one for effect. Mark where you did it." },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L13 (model annotation — NO cloze) -------------------------------
{ n:13, title:"Editing & Model Annotation", subtitle:"See the target, then make your sentences complete.",
  blocks:[
    { kind:"section", t:"Part A — Annotate the Model", accentStep:1 },
    { kind:"instr", t:"Read the model paragraph below. UNDERLINE the showing lines, BOX the hook, and put a star \u2605 next to the \u2018why it matters\u2019 line. Then check: is every sentence complete?" },
    { kind:"model", t:"The whistle screamed and I was off the block before I could think. Cold water slammed my chest and the noise of the crowd vanished into a muffled roar. My arms burned by the third length, but I could see the wall coming, close, closer. I slapped it and ripped my goggles off, gasping. My time flashed on the board \u2014 a personal best. In that one breath, all those grey 6 a.m. practices finally meant something." },
    { kind:"instr", t:"What makes this paragraph work? Write two things:" },
    { kind:"write", lines:2 },

    { kind:"section", t:"Part B — Edit Pass 1: Fragments", accentStep:2 },
    { kind:"instr", t:"Apply the fragment checklist from Lesson 9 to YOUR paragraph. List any fragments you found and how you fixed them." },
    { kind:"table", head:["Fragment I found","My repair"], widths:[3960,4800], rows:[
      ["",""],
      ["",""],
    ], tall:true },

    { kind:"section", t:"Part C — Edit Pass 2: Conventions & Clean Copy", accentStep:3 },
    { kind:"checklist", items:[
      "Every sentence starts with a capital and ends with punctuation.",
      "No fragments left.",
      "I checked obvious spelling.",
      "A partner peer-edited my paragraph.",
      "My clean copy is ready for the showcase.",
    ]},

    { kind:"support", blocks:[
      { kind:"instr", t:"Edit ONE thing at a time \u2014 read once just for fragments, again just for capitals and periods, again just for spelling. One pass, one job." },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Edit this error-seeded line, then find the same kind of slip in your own work:  \u201Cwhen the bell rang we all ran outside because it was the last day\u201D" },
      { kind:"write", lines:2 },
    ]},
  ]},

// ------------------------------- L14 -------------------------------
{ n:14, title:"\u201CThis Is Me\u201D Showcase & Reflection", subtitle:"Your moment out loud and on the page \u2014 and how far you\u2019ve come.",
  blocks:[
    { kind:"section", t:"Part A — Presenter Checklist", accentStep:1 },
    { kind:"checklist", items:[
      "I have my object (or a photo).",
      "My clean-copy paragraph is ready to read or tell.",
      "I know my opening line.",
    ]},

    { kind:"section", t:"Part B — Audience Notes", accentStep:2 },
    { kind:"instr", t:"For each presenter: one appreciation (something that worked) and one clarifying question." },
    { kind:"table", head:["Presenter","One appreciation","A question"], widths:[2000,3400,3360], rows:[
      ["","",""],["","",""],["","",""],["","",""],
    ], tall:true },

    { kind:"section", t:"Part C — Reflection: Then & Now", accentStep:3 },
    { kind:"fill", prompt:"Between my out-loud version (Lesson 4) and my written version, what changed was", lines:0, inline:true },
    { kind:"write", lines:3 },
    { kind:"fill", prompt:"The kind of reader and writer I\u2019m becoming is", lines:0, inline:true },
    { kind:"write", lines:2 },
    { kind:"fill", prompt:"One thing I want to get better at next unit is", lines:0, inline:true },
    { kind:"write", lines:2 },

    { kind:"support", blocks:[
      { kind:"instr", t:"Reflection frames: \u201CAt first my moment was\u2026 now it\u2019s\u2026\u201D  \u2022  \u201CI used to\u2026 but now I can\u2026\u201D  \u2022  \u201CI\u2019m proudest of\u2026\u201D" },
    ]},
    { kind:"extension", blocks:[
      { kind:"instr", t:"Write a short paragraph comparing one craft choice you made out loud vs. on the page. Which worked better, and why?" },
      { kind:"write", lines:3 },
    ]},
  ]},
];

module.exports = { WORKSHEETS };
