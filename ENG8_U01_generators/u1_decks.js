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
    reveals: {
      B: { kind:"open", title:"Three six-word stories \u2014 an example set",
           example:"Funny: Wore two left shoes all day.   \u2022   Sad: Her side of the closet, empty.   \u2022   Surprising: The dog answered.",
           note:"The surprising one works best: it makes the reader do a double-take, then re-read." },
      C: { kind:"open", title:"A small moment \u2014 one example",
           example:"The ten seconds on the high dive before I jumped \u2014 the cold rail under my feet, the pool a long way down, everyone gone quiet.",
           note:"Notice: seconds, not a whole day. One place, one action, details you can picture." },
    },
  },
  2: {
    // c1 warm-up interview = Part A (first sheet use) → handout before it.
    // c4 modelling has no worksheet part. c5 strategy log = Part B. c6 reflection = Part C.
    handoutKey:"c1",
    order:["title","c1","c2","c3","c4","c5","c6","exit"],
    activities:{
      c1:{ ws:"A", reveal:"open",
           how:"Interview your partner: their answers go on the lines, not yours. Ask each question, write what they say, then be ready to introduce your partner to the group in one sentence." },
      c2:{},                            // Today's goal
      c3:{},                            // the other two moves
      c4:{},                            // modelling — no worksheet part
      c5:{ ws:"B", reveal:"answers",
           how:"As we read, log ONE of each move. Use the sentence starter in each row \u2014 'I predict\u2026', 'I wonder\u2026', 'I picture\u2026', 'I can tell\u2026 because\u2026'. One good example per row is enough." },
      c6:{ ws:"C", reveal:"open",
           how:"Name the single strategy that helped you most, then give a real reason tied to the story. Finish with one honest line about the kind of reader you are." },
    },
    reveals:{
      A:{ kind:"open", title:"A reading-identity interview \u2014 one example",
          example:"Liked: the graphic novel of \u201CThe Odyssey.\u201D   \u2022   Gave up on: a fantasy book \u2014 too many names too fast.   \u2022   Reads best: on the bus with headphones.   \u2022   Reread: \u201CHoles.\u201D",
          note:"You're not judged on your answers \u2014 just be honest, then introduce your partner in a sentence." },
      B:{ kind:"answers", title:"Strategy log \u2014 four moves, one example each",
          answers:[
            "Predict: \u201CI predict the narrator will freeze up, because the title says \u2018The Last Row.\u2019\u201D",
            "Question: \u201CI wonder why the banana smell matters \u2014 is it a memory?\u201D",
            "Visualize: \u201CI picture the streetlights smeared into long yellow lines on a wet window.\u201D",
            "Infer: \u201CI can tell the narrator is nervous, because their legs \u2018forget how to be legs.\u2019\u201D",
          ],
          note:"Each move gets a sentence starter. Any reasonable example that uses the move earns it." },
      C:{ kind:"open", title:"Which strategy helped most \u2014 one example",
          example:"\u201CVisualizing helped most, because once I could picture the bus and the window I understood how alone the narrator felt.\u201D",
          note:"There's no single right answer \u2014 name a strategy and give a real reason tied to the story." },
    },
  },
  3: {"handoutKey":"c3","order":["title","c1","c2","c3","c4","c5","c6","exit"],"activities":{"c1":{},"c2":{},"c3":{"ws":["A","B","C"],"reveal":true,"how":{"A":"Read each pair aloud and tick the version that SHOWS a moment instead of listing facts.","B":"Pick the ONE moment your object is tied to — not its whole history. Plan an opening line that drops us in, then jot what you saw, heard, and felt.","C":"Tick each box only when it's true. If a box isn't ticked yet, that's your next job before you speak."}},"c4":{},"c5":{},"c6":{}},"reveals":{"A":{"kind":"answers","title":"Telling vs. showing out loud — which shows?","answers":["1. B — “My legs were shaking as they hung the medal around my neck.” (shows the moment, not the fact)","2. B — “The collar still smells like him if I hold it close.” (a detail you can feel, not a description)"],"note":"The showing version puts us inside one moment. That's what your talk should do."},"B":{"kind":"open","title":"Planning a talk — one worked example","example":"Object: my grandfather's watch.  Moment: the morning he taught me to wind it.  Opening: “The watch was cold and heavier than it looked.”  Saw: his hands over mine.  Heard: the tiny click.  Felt: scared I'd break it.","note":"One moment, an opening that isn't “This is my…”, and three senses. That's the whole plan."}}},
  4: {"handoutKey":"c4","order":["title","c1","c2","c3","c4","c5","c6","exit"],"activities":{"c1":{},"c2":{},"c3":{},"c4":{"ws":["A","B","C","D"],"reveal":true,"how":{"A":"A quick self-check before you present: object ready, opening line known, one small moment. Tick all three.","B":"While each classmate speaks: eyes on the speaker, no interrupting. For each one, jot ONE thing you pictured and ONE question you'd ask.","C":"After the talks, capture what stuck: one detail that put you right there, and one move you'll steal for your own writing.","D":"Reflect on your own talk: the moment you chose, and one thing you'd do differently next time."}},"c5":{},"c6":{}},"reveals":{"B":{"kind":"open","title":"Listener log — one row filled in","example":"Speaker: Maya.   Pictured: the cracked screen of her first phone.   Question: “What happened right after it fell?”","note":"You're listening for detail, not judging. One picture and one real question per speaker."},"C":{"kind":"open","title":"Notice — one example","example":"Put me there: “the collar still smells like him.”   I'll steal: ending on a small object instead of a big feeling.","note":"Naming what worked in someone else's talk is how you find moves for your own."},"D":{"kind":"open","title":"Speaker self-reflection — one example","example":"My moment: the first time I rode without training wheels.   Next time: I'd slow down at the part where I fell, instead of rushing to the end.","note":"Honest and specific beats “it went fine.” Name one real change."}}},
  5: {"handoutKey":"c5","order":["title","c1","c2","c3","c4","c5","exit"],"activities":{"c1":{},"c2":{},"c3":{},"c4":{},"c5":{"ws":["A","B","C"],"reveal":true,"how":{"A":"Read each pair and circle the sentence that SHOWS — the one that gives detail and action instead of naming the feeling.","B":"Turn each telling sentence into a showing one. Use the sense in the middle column — a strong verb or a sensory detail.","C":"Pick your strongest showing sentence from Part B and grow it into 3–4 sentences that put the reader right in the moment."}}},"reveals":{"A":{"kind":"answers","title":"Telling vs. showing — which shows?","answers":["1. B — “My hands wouldn't stay still, so I jammed them into my pockets.”","2. B — “Clothes spilled off the chair and a cereal bowl had crusted over.”","3. B — “My fingers went stiff and I couldn't feel the zipper.”"],"note":"B every time: each one shows the feeling through detail or action instead of stating it."},"B":{"kind":"open","title":"Conversion table — one model row","example":"Telling: “The test was hard.”   Sense: body/feeling.   Showing: “My pen hovered over question one while everyone else's pages rustled.”","note":"No naming the feeling. Show it with a body detail or an action."},"C":{"kind":"open","title":"Grow one into a passage — one example","example":"“My pen hovered over question one. Around me, pages rustled and pencils scratched. I read the question a third time; the words still wouldn't line up. I wrote my name, just to have written something.”","note":"Stay in one moment. Add detail and action, not more facts."}}},
  6: {"handoutKey":"c4","order":["title","c1","c2","c3","c4","c5","exit"],"activities":{"c1":{},"c2":{},"c3":{},"c4":{"ws":["A","B","C"],"reveal":true,"how":{"A":"A trait is a claim; the action is the proof. Match each trait to the action that shows it — write the letter.","B":"For two characters from our text, name a trait, give the action or detail that shows it, and say why it fits.","C":"The small moment you'll write shows something about YOU. Don't state the trait — show it with the action in your moment."}},"c5":{}},"reveals":{"A":{"kind":"answers","title":"Claim and proof — the match","answers":["1. Generous → B (gave away her lunch and said she wasn't hungry)","2. Stubborn → A (refused to move from the bench after everyone left)","3. Brave → C (stepped in front of the smaller kid without thinking)"],"note":"Each trait is proven by what the character DOES, not by a label."},"B":{"kind":"open","title":"Trait + evidence — one row","example":"Character: the narrator.   Trait: careful.   Evidence: bounced the ball three times “the way I always do.”   Why it fits: the routine shows he manages his nerves with habit.","note":"Claim + the exact action + why the action proves the trait. All three."},"C":{"kind":"open","title":"Turn it on yourself — one example","example":"Trait it shows: determined.   Action that shows it: “I re-taped the handle and went back up the hill a fourth time.”  (not “I am determined”)","note":"Show the trait through what you did. Never write “I am ___.”"}}},
  7: {"handoutKey":"c4","order":["title","c1","c2","c3","c4","c5","exit"],"activities":{"c1":{},"c2":{},"c3":{},"c4":{"ws":["A","B","C"],"reveal":true,"how":{"A":"Two versions of the same kitchen. Name the atmosphere each creates and underline the detail that made it.","B":"Build the setting of YOUR small moment. Choose the atmosphere first, then the see / hear / feel details that make it.","C":"Take one everyday place and write it in ONE clear mood using three details."}},"c5":{}},"reveals":{"A":{"kind":"answers","title":"Name the feeling — the two moods","answers":["Version 1 → warm / cozy (“sun warmed,” “kettle hummed,” “bread smelled sweet”)","Version 2 → cold / bleak (“grey and still,” “tap dripped,” “cold, greasy water”)"],"note":"Same place, opposite feeling — built entirely from the sensory details chosen."},"B":{"kind":"open","title":"Build your setting — one example","example":"Time & place: my kitchen, late at night.   Atmosphere: uneasy.   See: one light over the stove.   Hear: the fridge humming, then a floorboard.   Feel: cold tile under bare feet.","note":"Pick the feeling first; then choose only the details that build it."},"C":{"kind":"open","title":"Same place, new mood — one example","example":"A bus stop, lonely: “One flickering light. My own breath in the cold. Not a single car for ten minutes.”","note":"Three details, all pulling the same way — that's how mood is built."}}},
  8: {"handoutKey":"c4","order":["title","c1","c2","c3","c4","exit"],"activities":{"c1":{},"c2":{},"c3":{},"c4":{"ws":["A","B","C"],"reveal":true,"how":{"A":"Tick the complete thoughts (a subject AND a predicate). Cross out the ones missing a part.","B":"Underline the SUBJECT once and the PREDICATE twice in each sentence.","C":"Fill each blank with the right word from the word bank. Cross each word off as you use it."}}},"reveals":{"A":{"kind":"answers","title":"Complete or not?","answers":["✓ The old dog slept by the fire. (complete)","✗ Ran all the way home. (no subject)","✗ My little brother and his loud friends. (no predicate)","✓ The bell finally rang. (complete)","✗ Under the broken streetlight. (just a phrase)"],"note":"A complete sentence needs both a WHO/WHAT and what they DO or ARE."},"B":{"kind":"open","title":"Find both parts — the split","example":"The rusty gate | creaked in the wind.   My best friend | moved away last summer.   Three squirrels | chased each other up the tree.","note":"Subject before the line, predicate after. The predicate always holds the verb."},"C":{"kind":"answers","title":"Complete the sentence — the key","answers":["1. complete   (Every complete sentence has two parts.)","2. subject   (The subject tells who or what it's about.)","3. predicate   (The predicate tells what the subject does or is.)","4. verb   (A verb is an action word in the predicate.)","5. noun   (A noun names a person, place, or thing and can be the subject.)"],"note":"Each bank word is used once. Cross it off as you go."}}},
  9: {"handoutKey":"c4","order":["title","c1","c2","c3","c4","exit"],"activities":{"c1":{},"c2":{},"c3":{},"c4":{"ws":["A","B","C"],"reveal":true,"how":{"A":"Use the test — does it have BOTH a subject and a predicate? Write S (sentence) or F (fragment).","B":"Each item is a fragment. Name the TYPE, then rewrite it as a complete sentence.","C":"Look back at your own object-talk notes or setting-builder. Find one fragment and fix it here."}}},"reveals":{"A":{"kind":"answers","title":"Fragment or sentence?","answers":["1. F — “Because the rain wouldn't stop.” (starts with because; never finishes)","2. S — “The team celebrated on the field.”","3. F — “Running toward the finish line.” (no subject; -ing isn't a full verb here)","4. S — “She waited.”","5. F — “The old house at the end of the street.” (just a phrase, no predicate)"],"note":"If it's missing a part or leaves a thought hanging, it's a fragment."},"B":{"kind":"answers","title":"Spot & repair — model repairs","answers":["“Ran all the way home.” → missing subject → “I ran all the way home.”","“The dog in the yard.” → missing predicate → “The dog in the yard barked.”","“Because I was late.” → dependent clause → “Because I was late, I ran.”","“On a cold morning.” → phrase only → “On a cold morning, the bus was late.”"],"note":"Add the missing part, or finish the thought. Any complete repair counts."},"C":{"kind":"open","title":"Hunt your own — one example","example":"Found: “When the whistle blew.”   Fixed: “When the whistle blew, I dove in.”","note":"Any real fragment from your own writing, repaired into a complete sentence."}}},
  10: {"handoutKey":"c4","order":["title","c1","c2","c3","c4","exit"],"activities":{"c1":{},"c2":{},"c3":{},"c4":{"ws":["A","B","C"],"reveal":true,"how":{"A":"A narrative paragraph has three parts. Plan a HOOK that drops us in (not “One day…”), the MOMENT in 3–4 showing beats, and a WHY-IT-MATTERS closing line.","B":"Fill your planning organizer: the hook line, each beat in order, and the closing line. This becomes your draft next class.","C":"Trade plans with a partner. Use the scope check to make sure it's ONE small moment you can picture, with a closing line that lands."}}},"reveals":{"A":{"kind":"open","title":"The shape — one worked example","example":"Hook: “The rope burned my palms as I climbed.”   Beats: reached the branch / looked down / froze / made myself let go and drop.   Why it matters: “That's the first time I chose to be brave instead of just being told to.”","note":"Hook = action or image. Beats = shown, in order. Closing = why the moment stuck."},"B":{"kind":"open","title":"Planning organizer — one filled box","example":"Hook: “The rope burned my palms.”   Beat 1: I reached the branch.   Beat 2: I looked down and the ground tilted.   Beat 3: I froze.   Beat 4: I let go and dropped.   Why it matters: I chose it myself.","note":"Every box filled with a shown beat, in order. That's a paragraph you can write from."}}},
  11: {"handoutKey":"c3","order":["title","c1","c2","c3","c4","exit"],"activities":{"c1":{},"c2":{},"c3":{"ws":["A","B","C"],"reveal":true,"how":{"A":"Copy your plan across so it's in front of you: your hook line and your why-it-matters line.","B":"Write your whole moment start to finish. Don't stop to fix anything — keep moving, show don't tell, stay in the one moment.","C":"Reread your draft. Underline ONE line that TELLS instead of shows (don't fix it yet), and mark one line you're proud of."}},"c4":{}},"reveals":{"A":{"kind":"open","title":"Before you draft — one example","example":"My hook: “The rope burned my palms as I climbed.”   Why it matters: “That's the first time I chose brave.”","note":"Just carry your plan over. Having the hook and closing in view keeps the draft on track."},"B":{"kind":"open","title":"Draft — what a full-through draft looks like","example":"“The rope burned my palms as I climbed. At the top branch I looked down and the ground tilted. My legs locked. For a second I couldn't breathe. Then I made my fingers open, and I dropped — and the grass came up soft.”","note":"Whole moment, start to finish, no stopping to fix. Fixing comes next class."}}},
  12: {"handoutKey":"c3","order":["title","c1","c2","c3","c4","exit"],"activities":{"c1":{},"c2":{},"c3":{"ws":["A","B","C"],"reveal":true,"how":{"A":"Sort each action: does it belong to REVISING (meaning) or EDITING (mechanics)? Write R or E.","B":"Find telling lines in your own draft and rewrite at least two into showing.","C":"Sharpen one setting detail and one character-through-action detail. Then have a partner mark one spot they couldn't picture, and revise it."}},"c4":{}},"reveals":{"A":{"kind":"answers","title":"Revising vs. editing","answers":["1. R — turning “I was scared” into a showing sentence (changes meaning)","2. E — fixing a capital letter (mechanics)","3. R — adding a sensory detail to the setting (changes meaning)","4. E — repairing a fragment (mechanics)","5. R — cutting a part that drifts off the moment (changes meaning)"],"note":"Revising changes what the writing SHOWS. Editing fixes how it's written. Today is revising."},"B":{"kind":"open","title":"The telling hunt — one example","example":"Telling: “I was really happy.”   Showing: “I couldn't stop grinning; my cheeks actually ached by the end.”","note":"Hunt for was/felt/very/really — then show it instead."},"C":{"kind":"open","title":"Sharpen & partner check — one example","example":"Partner couldn't picture: “the room was a mess.”   Revised: “Clothes covered the floor and a plate of toast had gone hard on the desk.”","note":"Let a partner find the fuzzy spot — then make it something they can see."}}},
  13: {"handoutKey":"c1","order":["title","c1","c2","c3","c4","exit"],"activities":{"c1":{"ws":["A","B","C"],"reveal":true,"how":{"A":"Read the model paragraph. Underline the showing lines, box the hook, and star the why-it-matters line. Then check every sentence is complete.","B":"Apply the fragment checklist from Lesson 9 to YOUR paragraph. List any fragments you found and how you fixed them.","C":"Second edit pass — capitals, end punctuation, spelling, a partner peer-edit, and a clean copy ready for the showcase. Tick each."}},"c2":{},"c3":{},"c4":{}},"reveals":{"A":{"kind":"open","title":"Annotate the model — what to mark","example":"Hook (box): “The whistle screamed and I was off the block before I could think.”   Star (why it matters): “all those grey 6 a.m. practices finally meant something.”   Showing lines: the cold water, the burning arms, the wall coming closer.","note":"Seeing the target in someone else's paragraph makes it easier to hit in your own."},"B":{"kind":"answers","title":"Edit pass 1: fragments — how it looks","answers":["Found: “When the wall came closer.” → Fixed: “When the wall came closer, I pushed harder.”","Found: “Gasping for air.” → Fixed: “I ripped my goggles off, gasping for air.”"],"note":"One pass, one job: hunt only for fragments and repair each one."}}},
  14: {"handoutKey":"c4","order":["title","c1","c2","c3","c4","exit"],"activities":{"c1":{},"c2":{},"c3":{},"c4":{"ws":["A","B","C"],"reveal":true,"how":{"A":"Presenter check before you share: object ready, clean-copy paragraph ready to read or tell, opening line known. Tick all three.","B":"For each presenter, write one appreciation (something that worked) and one clarifying question.","C":"Reflect on the whole unit: what changed between your out-loud version and your written one, the reader/writer you're becoming, and one goal for next unit."}}},"reveals":{"B":{"kind":"open","title":"Audience notes — one row","example":"Presenter: Sam.   Appreciation: the ending on the empty chair really landed.   Question: “How long after did that happen?”","note":"Appreciate something specific, then ask a real question. That's the protocol."},"C":{"kind":"open","title":"Reflection: then & now — one example","example":"Changed: my talk listed facts; my paragraph stays in one moment and shows it.   Becoming: a writer who trusts small details.   Next unit: I want to get better at strong endings.","note":"Name a real change from Lesson 4 to now — that's the growth the unit was for."}}},
};


// which DECKS[lesson] slide index corresponds to each plan key (L01)
const DECK_KEYMAP = {
  1: { title:0, sixword:1, whyworks:2, findsomeone:3, whatpn:4, scope:5, object:6, exit:7 },
  2: { title:0, exit:7, c1:1, c2:2, c3:3, c4:4, c5:5, c6:6 },
  3: { title:0, exit:7, c1:1, c2:2, c3:3, c4:4, c5:5, c6:6 },
  4: { title:0, exit:7, c1:1, c2:2, c3:3, c4:4, c5:5, c6:6 },
  5: { title:0, exit:6, c1:1, c2:2, c3:3, c4:4, c5:5 },
  6: { title:0, exit:6, c1:1, c2:2, c3:3, c4:4, c5:5 },
  7: { title:0, exit:6, c1:1, c2:2, c3:3, c4:4, c5:5 },
  8: { title:0, exit:5, c1:1, c2:2, c3:3, c4:4 },
  9: { title:0, exit:5, c1:1, c2:2, c3:3, c4:4 },
  10: { title:0, exit:5, c1:1, c2:2, c3:3, c4:4 },
  11: { title:0, exit:5, c1:1, c2:2, c3:3, c4:4 },
  12: { title:0, exit:5, c1:1, c2:2, c3:3, c4:4 },
  13: { title:0, exit:5, c1:1, c2:2, c3:3, c4:4 },
  14: { title:0, exit:5, c1:1, c2:2, c3:3, c4:4 },
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
