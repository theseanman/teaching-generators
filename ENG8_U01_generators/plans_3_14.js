// plans_3_14.js — hand-authored DECK_PLAN entries for ENG8 U1 Lessons 3–14.
// Each deck has a single "Your turn · Worksheet" slide (the worksheet key below);
// the handout reminder goes before it, then each Part walks through with its reveal.
// reveal "answers" = right/wrong Parts (cumulative); "open" = a single model.
// The worksheet key differs per lesson (where "Your turn" sits): given as wsKey.

const P = {};

// L3 — Preparing the Talk. c3 = "Plan it · Worksheet 3". Parts: A telling-vs-showing (answers), B plan (open), C delivery check (open, checklist -> skip reveal).
P[3] = {
  wsKey: "c3",
  parts: [
    ["A","answers",
      "Read each pair aloud and tick the version that SHOWS a moment instead of listing facts.",
      { title:"Telling vs. showing out loud — which shows?",
        answers:[
          "1. B — “My legs were shaking as they hung the medal around my neck.” (shows the moment, not the fact)",
          "2. B — “The collar still smells like him if I hold it close.” (a detail you can feel, not a description)",
        ], note:"The showing version puts us inside one moment. That's what your talk should do." }],
    ["B","open",
      "Pick the ONE moment your object is tied to — not its whole history. Plan an opening line that drops us in, then jot what you saw, heard, and felt.",
      { title:"Planning a talk — one worked example",
        example:"Object: my grandfather's watch.  Moment: the morning he taught me to wind it.  Opening: “The watch was cold and heavier than it looked.”  Saw: his hands over mine.  Heard: the tiny click.  Felt: scared I'd break it.",
        note:"One moment, an opening that isn't “This is my…”, and three senses. That's the whole plan." }],
    ["C","checklist",
      "Tick each box only when it's true. If a box isn't ticked yet, that's your next job before you speak.",
      null],
  ],
};

// L4 — Object Talks. c4 = "Listeners · Worksheet 4". A before-you-speak (checklist), B listener log (open), C notice (open), D self-reflection (open).
P[4] = {
  wsKey: "c4",
  parts: [
    ["A","checklist",
      "A quick self-check before you present: object ready, opening line known, one small moment. Tick all three.", null],
    ["B","open",
      "While each classmate speaks: eyes on the speaker, no interrupting. For each one, jot ONE thing you pictured and ONE question you'd ask.",
      { title:"Listener log — one row filled in",
        example:"Speaker: Maya.   Pictured: the cracked screen of her first phone.   Question: “What happened right after it fell?”",
        note:"You're listening for detail, not judging. One picture and one real question per speaker." }],
    ["C","open",
      "After the talks, capture what stuck: one detail that put you right there, and one move you'll steal for your own writing.",
      { title:"Notice — one example",
        example:"Put me there: “the collar still smells like him.”   I'll steal: ending on a small object instead of a big feeling.",
        note:"Naming what worked in someone else's talk is how you find moves for your own." }],
    ["D","open",
      "Reflect on your own talk: the moment you chose, and one thing you'd do differently next time.",
      { title:"Speaker self-reflection — one example",
        example:"My moment: the first time I rode without training wheels.   Next time: I'd slow down at the part where I fell, instead of rushing to the end.",
        note:"Honest and specific beats “it went fine.” Name one real change." }],
  ],
};

// L5 — Showing, Not Telling. c4 = "Together... Worksheet 5"? deck: 0 title,1 connect,2 compare,3 watch,4 build,5 together,6 exit. wsKey c5.
P[5] = {
  wsKey: "c5",
  parts: [
    ["A","answers",
      "Read each pair and circle the sentence that SHOWS — the one that gives detail and action instead of naming the feeling.",
      { title:"Telling vs. showing — which shows?",
        answers:[
          "1. B — “My hands wouldn't stay still, so I jammed them into my pockets.”",
          "2. B — “Clothes spilled off the chair and a cereal bowl had crusted over.”",
          "3. B — “My fingers went stiff and I couldn't feel the zipper.”",
        ], note:"B every time: each one shows the feeling through detail or action instead of stating it." }],
    ["B","open",
      "Turn each telling sentence into a showing one. Use the sense in the middle column — a strong verb or a sensory detail.",
      { title:"Conversion table — one model row",
        example:"Telling: “The test was hard.”   Sense: body/feeling.   Showing: “My pen hovered over question one while everyone else's pages rustled.”",
        note:"No naming the feeling. Show it with a body detail or an action." }],
    ["C","open",
      "Pick your strongest showing sentence from Part B and grow it into 3–4 sentences that put the reader right in the moment.",
      { title:"Grow one into a passage — one example",
        example:"“My pen hovered over question one. Around me, pages rustled and pencils scratched. I read the question a third time; the words still wouldn't line up. I wrote my name, just to have written something.”",
        note:"Stay in one moment. Add detail and action, not more facts." }],
  ],
};

// L6 — Character through action. deck: 0 title,1 warm compare,2 idea,3 watch,4 your turn ws6,5 turn on yourself,6 exit. wsKey c4.
P[6] = {
  wsKey: "c4",
  parts: [
    ["A","answers",
      "A trait is a claim; the action is the proof. Match each trait to the action that shows it — write the letter.",
      { title:"Claim and proof — the match",
        answers:[
          "1. Generous → B (gave away her lunch and said she wasn't hungry)",
          "2. Stubborn → A (refused to move from the bench after everyone left)",
          "3. Brave → C (stepped in front of the smaller kid without thinking)",
        ], note:"Each trait is proven by what the character DOES, not by a label." }],
    ["B","open",
      "For two characters from our text, name a trait, give the action or detail that shows it, and say why it fits.",
      { title:"Trait + evidence — one row",
        example:"Character: the narrator.   Trait: careful.   Evidence: bounced the ball three times “the way I always do.”   Why it fits: the routine shows he manages his nerves with habit.",
        note:"Claim + the exact action + why the action proves the trait. All three." }],
    ["C","open",
      "The small moment you'll write shows something about YOU. Don't state the trait — show it with the action in your moment.",
      { title:"Turn it on yourself — one example",
        example:"Trait it shows: determined.   Action that shows it: “I re-taped the handle and went back up the hill a fourth time.”  (not “I am determined”)",
        note:"Show the trait through what you did. Never write “I am ___.”" }],
  ],
};

// L7 — Setting & atmosphere. deck:0 title,1 warm,2 idea,3 watch,4 your turn ws7,5 takeaway,6 exit. wsKey c4.
P[7] = {
  wsKey: "c4",
  parts: [
    ["A","answers",
      "Two versions of the same kitchen. Name the atmosphere each creates and underline the detail that made it.",
      { title:"Name the feeling — the two moods",
        answers:[
          "Version 1 → warm / cozy (“sun warmed,” “kettle hummed,” “bread smelled sweet”)",
          "Version 2 → cold / bleak (“grey and still,” “tap dripped,” “cold, greasy water”)",
        ], note:"Same place, opposite feeling — built entirely from the sensory details chosen." }],
    ["B","open",
      "Build the setting of YOUR small moment. Choose the atmosphere first, then the see / hear / feel details that make it.",
      { title:"Build your setting — one example",
        example:"Time & place: my kitchen, late at night.   Atmosphere: uneasy.   See: one light over the stove.   Hear: the fridge humming, then a floorboard.   Feel: cold tile under bare feet.",
        note:"Pick the feeling first; then choose only the details that build it." }],
    ["C","open",
      "Take one everyday place and write it in ONE clear mood using three details.",
      { title:"Same place, new mood — one example",
        example:"A bus stop, lonely: “One flickering light. My own breath in the cold. Not a single car for ten minutes.”",
        note:"Three details, all pulling the same way — that's how mood is built." }],
  ],
};

// L8 — Subject & predicate. deck:0 title,1 warm,2 idea compare,3 watch,4 your turn ws8,5 exit. wsKey c4.
P[8] = {
  wsKey: "c4",
  parts: [
    ["A","answers",
      "Tick the complete thoughts (a subject AND a predicate). Cross out the ones missing a part.",
      { title:"Complete or not?",
        answers:[
          "✓ The old dog slept by the fire. (complete)",
          "✗ Ran all the way home. (no subject)",
          "✗ My little brother and his loud friends. (no predicate)",
          "✓ The bell finally rang. (complete)",
          "✗ Under the broken streetlight. (just a phrase)",
        ], note:"A complete sentence needs both a WHO/WHAT and what they DO or ARE." }],
    ["B","open",
      "Underline the SUBJECT once and the PREDICATE twice in each sentence.",
      { title:"Find both parts — the split",
        example:"The rusty gate | creaked in the wind.   My best friend | moved away last summer.   Three squirrels | chased each other up the tree.",
        note:"Subject before the line, predicate after. The predicate always holds the verb." }],
    ["C","answers",
      "Fill each blank with the right word from the word bank. Cross each word off as you use it.",
      { title:"Complete the sentence — the key",
        answers:[
          "1. complete   (Every complete sentence has two parts.)",
          "2. subject   (The subject tells who or what it's about.)",
          "3. predicate   (The predicate tells what the subject does or is.)",
          "4. verb   (A verb is an action word in the predicate.)",
          "5. noun   (A noun names a person, place, or thing and can be the subject.)",
        ], note:"Each bank word is used once. Cross it off as you go." }],
  ],
};

// L9 — Fragments. deck:0 title,1 warm,2 idea,3 watch,4 your turn ws9,5 exit. wsKey c4.
P[9] = {
  wsKey: "c4",
  parts: [
    ["A","answers",
      "Use the test — does it have BOTH a subject and a predicate? Write S (sentence) or F (fragment).",
      { title:"Fragment or sentence?",
        answers:[
          "1. F — “Because the rain wouldn't stop.” (starts with because; never finishes)",
          "2. S — “The team celebrated on the field.”",
          "3. F — “Running toward the finish line.” (no subject; -ing isn't a full verb here)",
          "4. S — “She waited.”",
          "5. F — “The old house at the end of the street.” (just a phrase, no predicate)",
        ], note:"If it's missing a part or leaves a thought hanging, it's a fragment." }],
    ["B","answers",
      "Each item is a fragment. Name the TYPE, then rewrite it as a complete sentence.",
      { title:"Spot & repair — model repairs",
        answers:[
          "“Ran all the way home.” → missing subject → “I ran all the way home.”",
          "“The dog in the yard.” → missing predicate → “The dog in the yard barked.”",
          "“Because I was late.” → dependent clause → “Because I was late, I ran.”",
          "“On a cold morning.” → phrase only → “On a cold morning, the bus was late.”",
        ], note:"Add the missing part, or finish the thought. Any complete repair counts." }],
    ["C","open",
      "Look back at your own object-talk notes or setting-builder. Find one fragment and fix it here.",
      { title:"Hunt your own — one example",
        example:"Found: “When the whistle blew.”   Fixed: “When the whistle blew, I dove in.”",
        note:"Any real fragment from your own writing, repaired into a complete sentence." }],
  ],
};

// L10 — Planning. deck:0 title,1 connect,2 idea,3 watch,4 your turn ws10,5 exit. wsKey c4.
P[10] = {
  wsKey: "c4",
  parts: [
    ["A","open",
      "A narrative paragraph has three parts. Plan a HOOK that drops us in (not “One day…”), the MOMENT in 3–4 showing beats, and a WHY-IT-MATTERS closing line.",
      { title:"The shape — one worked example",
        example:"Hook: “The rope burned my palms as I climbed.”   Beats: reached the branch / looked down / froze / made myself let go and drop.   Why it matters: “That's the first time I chose to be brave instead of just being told to.”",
        note:"Hook = action or image. Beats = shown, in order. Closing = why the moment stuck." }],
    ["B","open",
      "Fill your planning organizer: the hook line, each beat in order, and the closing line. This becomes your draft next class.",
      { title:"Planning organizer — one filled box",
        example:"Hook: “The rope burned my palms.”   Beat 1: I reached the branch.   Beat 2: I looked down and the ground tilted.   Beat 3: I froze.   Beat 4: I let go and dropped.   Why it matters: I chose it myself.",
        note:"Every box filled with a shown beat, in order. That's a paragraph you can write from." }],
    ["C","checklist",
      "Trade plans with a partner. Use the scope check to make sure it's ONE small moment you can picture, with a closing line that lands.", null],
  ],
};

// L11 — Drafting. deck:0 title,1 rules,2 watch,3 now you,4 nudge,5 exit. wsKey c3? "Now you · Quiet writing" is c3. Parts A before-you-draft, B draft, C reread. wsKey c3.
P[11] = {
  wsKey: "c3",
  parts: [
    ["A","open",
      "Copy your plan across so it's in front of you: your hook line and your why-it-matters line.",
      { title:"Before you draft — one example",
        example:"My hook: “The rope burned my palms as I climbed.”   Why it matters: “That's the first time I chose brave.”",
        note:"Just carry your plan over. Having the hook and closing in view keeps the draft on track." }],
    ["B","open",
      "Write your whole moment start to finish. Don't stop to fix anything — keep moving, show don't tell, stay in the one moment.",
      { title:"Draft — what a full-through draft looks like",
        example:"“The rope burned my palms as I climbed. At the top branch I looked down and the ground tilted. My legs locked. For a second I couldn't breathe. Then I made my fingers open, and I dropped — and the grass came up soft.”",
        note:"Whole moment, start to finish, no stopping to fix. Fixing comes next class." }],
    ["C","checklist",
      "Reread your draft. Underline ONE line that TELLS instead of shows (don't fix it yet), and mark one line you're proud of.", null],
  ],
};

// L12 — Revising. deck:0 title,1 idea compare,2 watch,3 your turn ws12,4 partner,5 exit. wsKey c3.
P[12] = {
  wsKey: "c3",
  parts: [
    ["A","answers",
      "Sort each action: does it belong to REVISING (meaning) or EDITING (mechanics)? Write R or E.",
      { title:"Revising vs. editing",
        answers:[
          "1. R — turning “I was scared” into a showing sentence (changes meaning)",
          "2. E — fixing a capital letter (mechanics)",
          "3. R — adding a sensory detail to the setting (changes meaning)",
          "4. E — repairing a fragment (mechanics)",
          "5. R — cutting a part that drifts off the moment (changes meaning)",
        ], note:"Revising changes what the writing SHOWS. Editing fixes how it's written. Today is revising." }],
    ["B","open",
      "Find telling lines in your own draft and rewrite at least two into showing.",
      { title:"The telling hunt — one example",
        example:"Telling: “I was really happy.”   Showing: “I couldn't stop grinning; my cheeks actually ached by the end.”",
        note:"Hunt for was/felt/very/really — then show it instead." }],
    ["C","open",
      "Sharpen one setting detail and one character-through-action detail. Then have a partner mark one spot they couldn't picture, and revise it.",
      { title:"Sharpen & partner check — one example",
        example:"Partner couldn't picture: “the room was a mess.”   Revised: “Clothes covered the floor and a plate of toast had gone hard on the desk.”",
        note:"Let a partner find the fuzzy spot — then make it something they can see." }],
  ],
};

// L13 — Editing & model annotation. deck:0 title,1 model annotation,2 name target,3 pass1,4 pass2,5 exit. Part A annotate on slide c1, B pass1 on c3, C pass2 on c4. wsKey c1 (model shown first). Use c1 handout.
P[13] = {
  wsKey: "c1",
  parts: [
    ["A","open",
      "Read the model paragraph. Underline the showing lines, box the hook, and star the why-it-matters line. Then check every sentence is complete.",
      { title:"Annotate the model — what to mark",
        example:"Hook (box): “The whistle screamed and I was off the block before I could think.”   Star (why it matters): “all those grey 6 a.m. practices finally meant something.”   Showing lines: the cold water, the burning arms, the wall coming closer.",
        note:"Seeing the target in someone else's paragraph makes it easier to hit in your own." }],
    ["B","answers",
      "Apply the fragment checklist from Lesson 9 to YOUR paragraph. List any fragments you found and how you fixed them.",
      { title:"Edit pass 1: fragments — how it looks",
        answers:[
          "Found: “When the wall came closer.” → Fixed: “When the wall came closer, I pushed harder.”",
          "Found: “Gasping for air.” → Fixed: “I ripped my goggles off, gasping for air.”",
        ], note:"One pass, one job: hunt only for fragments and repair each one." }],
    ["C","checklist",
      "Second edit pass — capitals, end punctuation, spelling, a partner peer-edit, and a clean copy ready for the showcase. Tick each.", null],
  ],
};

// L14 — Showcase & reflection. deck:0 title,1 showcase,2 protocol,3 how it runs,4 reflect ws14,5 exit. wsKey c4.
P[14] = {
  wsKey: "c4",
  parts: [
    ["A","checklist",
      "Presenter check before you share: object ready, clean-copy paragraph ready to read or tell, opening line known. Tick all three.", null],
    ["B","open",
      "For each presenter, write one appreciation (something that worked) and one clarifying question.",
      { title:"Audience notes — one row",
        example:"Presenter: Sam.   Appreciation: the ending on the empty chair really landed.   Question: “How long after did that happen?”",
        note:"Appreciate something specific, then ask a real question. That's the protocol." }],
    ["C","open",
      "Reflect on the whole unit: what changed between your out-loud version and your written one, the reader/writer you're becoming, and one goal for next unit.",
      { title:"Reflection: then & now — one example",
        example:"Changed: my talk listed facts; my paragraph stays in one moment and shows it.   Becoming: a writer who trusts small details.   Next unit: I want to get better at strong endings.",
        note:"Name a real change from Lesson 4 to now — that's the growth the unit was for." }],
  ],
};

module.exports = { P };
