// ELL12 Unit 1 — Who I Am — content for decks and worksheets
// Tiers: 1A support / core / stretch ; 2A support / core / stretch

const COURSE = { code: "ELL12", unit: 1, unitTitle: "Who I Am", teacher: "Mr. Reid", room: "148" };

const CLASS_TEXT = {
  "2A": {
    title: "The Sunday Kitchen",
    paras: [
      "If you want to know who I am, come to my kitchen on a Sunday morning. My name is Lina, and I am fifteen years old. I moved to Richmond from Manila two years ago, but the kitchen still smells like home. Garlic rice crackles in the pan, and the rice cooker clicks and steams in the corner. My grandmother\u2019s radio plays old songs while she hums along, a little off-key. I stand beside her with a wooden spoon, and I taste everything before anyone else because I am the official taster. The window is cloudy with steam, and outside the rain taps on the glass. My little brother asks a hundred questions, and I answer every one. I want to be a nurse one day, so I like taking care of people, and this kitchen is where I learned how. When the plates are empty and the radio is still playing, I know exactly who I am."
    ]
  },
  "1A": {
    title: "My Kitchen",
    paras: [
      "My name is Lina. I am fifteen years old. I am from Manila, but now I live in Richmond. On Sunday, I am in the kitchen with my grandmother. The rice smells good, and the radio is loud. I am happy in my kitchen."
    ]
  }
};

// 2A text as numbered sentences (for subject/verb work)
const TEXT_SENTENCES = [
  "If you want to know who I am, come to my kitchen on a Sunday morning.",
  "My name is Lina, and I am fifteen years old.",
  "I moved to Richmond from Manila two years ago, but the kitchen still smells like home.",
  "Garlic rice crackles in the pan, and the rice cooker clicks and steams in the corner.",
  "My grandmother\u2019s radio plays old songs while she hums along, a little off-key.",
  "I stand beside her with a wooden spoon, and I taste everything before anyone else because I am the official taster.",
  "The window is cloudy with steam, and outside the rain taps on the glass.",
  "My little brother asks a hundred questions, and I answer every one.",
  "I want to be a nurse one day, so I like taking care of people, and this kitchen is where I learned how.",
  "When the plates are empty and the radio is still playing, I know exactly who I am."
];

// ---------------------------------------------------------------------
// LESSONS
// Each lesson: banner (obj/std/comp), deck fields, and worksheets per level.
// Worksheet part item fields: q (common text). Optional tier variants: s, c, x.
// Part options: bank (array), lines (answer lines per item), limit: {support:n}
// ---------------------------------------------------------------------
const LESSONS = [
  // ================================================================ L1
  {
    n: 1, slug: "Welcome", title: "Welcome: This Is Me", accent: "teal", texts: ["1A", "2A"],
    banner: { obj: "Meet the class, learn our routines, and read about Lina.", std: "1A: Use familiar words and phrases  \u2022  2A: Write simple sentences", comp: ["COM", "PS"] },
    warmup: { title: "Find someone who\u2026", lines: ["\u2026 speaks more than two languages.", "\u2026 has a brother or sister.", "\u2026 likes to cook.", "\u2026 was born in a different country than you."], note: "Stand up. Ask three people. Write one name beside each line in your notebook." },
    goals: ["Learn three class routines: enter, folder, help slip.", "Read about Lina and find out who she is.", "1A: write sentences about you with My name is\u2026 / I am\u2026", "2A: write five sentences about you using and and but."],
    vocab: [
      ["kitchen", "the room where a family cooks"], ["smell", "what your nose notices"], ["sound", "what your ears hear"], ["taste", "to try food to know its flavour"],
      ["radio", "a machine that plays music and news"], ["steam", "hot water in the air"], ["grandmother", "your mother\u2019s or father\u2019s mother"], ["brother", "a boy in your family"],
      ["nurse", "a person who cares for sick people"], ["exactly", "completely, with no doubt"]
    ],
    teach1: { title: "Three routines, every day", items: [["Enter", "Say hello, sit in your seat, take out your folder."], ["Folder", "Every worksheet goes in your folder. Your folder stays in the room."], ["Help slip", "When you are stuck, fill in a help slip. You never have to wait in silence."]] },
    teach2: { title: "The help slip", items: [["Can you check my \u2026?", "spelling / sentence / word"], ["I need help with \u2026", "the question / this word / my idea"], ["Is this right?", "Point to the sentence you mean."]], note: "Asking for help with editing is a skill on your report card. Use it." },
    examples: { "1A": ["My name is Lina.", "I am fifteen years old.", "I am from Manila."], "2A": ["My name is Lina, and I am fifteen years old.", "I moved from Manila, but the kitchen still smells like home."] },
    practice: { title: "Read about Lina. Find\u2026", items: ["her name", "her age", "the city she is from", "the city she lives in now", "one smell in the kitchen", "one sound in the kitchen"] },
    speaking: { title: "Three things about me", frames: ["My name is \u2026", "I am from \u2026", "I like \u2026"], note: "Say your three sentences. Your partner says them back to you. Then swap." },
    yourturn: { "1A": "Worksheet Parts A\u2013C. Part C is about YOU. Ask for help with the help slip.", "2A": "Worksheet Parts A\u2013C. Part C: five sentences about you. Use and once and but once." },
    exit: { prompt: "On the card: one sentence about you. Start with a capital. End with a period.", frame: "My name is \u2026, and I \u2026" },
    plan: { objective: "Set the three routines, meet Lina through the class text, and get every student writing sentences about themselves at their level.",
      materials: ["Class text, both versions (2A full, 1A simplified)", "Worksheets in six tiers, sorted by name", "Help slips cut and in the box", "Folders, one per student"],
      steps: [["8", "Warm-up: speed intro in pairs \u2014 name, country, one like. Sixty seconds each way."], ["12", "Routines: enter / folder / help slip. Show the slip, model one request out loud."], ["15", "Class text: read 1A version aloud together, then 2A reads the full text while 1A re-reads with a partner. Vocabulary box."], ["10", "Examples and practice: find the six Lina facts. Whole class, hands up."], ["10", "Pair speaking: three things about me. Partner repeats them back."], ["20", "Worksheet: split phase. 2A Parts A\u2013D; 1A Parts A\u2013C with support at the frames. Circulate with the help-slip box."], ["5", "Exit card: one sentence. Collect with the worksheets."]],
      watch: "Students who copy Lina\u2019s facts into Part C instead of their own \u2014 the example is a model, not an answer. Note who cannot produce a capital and period unprompted." },
    shape: ["Speed intro with a partner", "How this room works: enter, folder, help slip", "Read about Lina (1A text, then 2A text)", "Find the six facts", "Tell a partner three things about you", "Worksheet: about YOU", "Exit card"],
    worksheets: {
      "1A": {
        title: "Welcome: This Is Me", remember: "A sentence starts with a capital letter and ends with a period.",
        objective: "Read about Lina and write sentences about you.", outcome: "ELL 1 W1 Write simple sentences \u2022 W7 Use familiar words and phrases",
        checks: ["Every sentence starts with a capital letter.", "Every sentence ends with a period.", "I used words from the vocabulary box.", "I wrote about ME, not about Lina."],
        vocabCount: 8,
        parts: [
          { name: "A", title: "Vocabulary", instr: "Write the word beside its meaning.", bankFromVocab: true, tiers: { stretch: { bank: false } },
            items: ["the room where a family cooks", "what your nose notices", "what your ears hear", "to try food to know its flavour", "a machine that plays music", "hot water in the air", "your mother\u2019s or father\u2019s mother", "a boy in your family"], blankFirst: true, ex: "kitchen" },
          { name: "B", title: "Read \u201cMy Kitchen\u201d", instr: "Read the text on the class sheet. Answer the questions.", lines: 1, ex: "Her name is Lina.",
            items: [
              { q: "What is her name?", s: "Her name is ____.", c: "Her name ____." },
              { q: "How old is she?", s: "She is ____ years old.", c: "She ____ years old." },
              { q: "Where is she from?", s: "She is from ____.", c: "She ____ from ____." },
              { q: "Where does she live now?", s: "Now she lives in ____.", c: "Now she ____ in ____." },
              { q: "Who is in the kitchen with her?", s: "Her ____ is in the kitchen.", c: "Her ____ is in the ____." },
              { q: "Is she happy in her kitchen?", s: "Yes, she ____.", c: "Yes, ____." }
            ] },
          { name: "C", title: "About me", instr: "Finish the sentences about YOU.", lines: 1, ex: "My name is Lina.",
            items: [
              { q: "My name is ____.", x: "Write your name." },
              { q: "I am ____ years old.", x: "Write your age." },
              { q: "I am from ____.", x: "Write your country." },
              { q: "Now I live in ____.", x: "Write your city." },
              { q: "My family is ____.", s: "My family is ____. (big / small)", x: "Write about your family." },
              { q: "Today I am ____.", s: "Today I am ____. (happy / tired / excited)", x: "Write how you feel today." }
            ], tiers: { stretch: { instr: "Write six sentences about YOU. Use the ideas below. No frames \u2014 your own sentences.", lines: 1 } } },
          { name: "D", title: "Two more", instr: "Write two more sentences about you. One about a smell or a sound you like.", lines: 2, onlyTiers: ["stretch"], items: ["", ""], ex: "I like the smell of rice in the morning." }
        ]
      },
      "2A": {
        title: "Welcome: Who I Am", remember: "Every sentence needs a subject, a verb, and a complete idea. Start with a capital, end with a period.",
        objective: "Read \u201cThe Sunday Kitchen\u201d and write five sentences about you using and and but.", outcome: "ELL 2 W1 Write simple sentences \u2022 W2 Connect ideas using and, but, so, or, because",
        checks: ["Every sentence starts with a capital letter.", "Every sentence ends with a period.", "I used and in one sentence.", "I used but in one sentence.", "My Part B answers are full sentences.", "I answered about ME in Part C."],
        vocabCount: 10,
        parts: [
          { name: "A", title: "Vocabulary", instr: "Write the word beside its meaning.", bankFromVocab: true, tiers: { stretch: { bank: false, instr: "Write the word beside its meaning. No word bank \u2014 use the class sheet." } },
            items: ["the room where a family cooks", "what your nose notices", "what your ears hear", "to try food to know its flavour", "a machine that plays music and news", "hot water in the air", "your mother\u2019s or father\u2019s mother", "a boy in your family", "a person who cares for sick people", "completely, with no doubt"], blankFirst: true, ex: "kitchen" },
          { name: "B", title: "Read \u201cThe Sunday Kitchen\u201d", instr: "Answer in full sentences.", lines: 2, ex: "We should go to Lina\u2019s kitchen on a Sunday morning, because that is where she feels most like herself.",
            items: [
              { q: "Where should we go if we want to know who Lina is?", s: "We should go to ____.", lines: 1 },
              { q: "Name three things Lina can smell or hear in the kitchen.", s: "She can smell ____ and hear ____ and ____." },
              { q: "Why is Lina \u201cthe official taster\u201d?", s: "She is the official taster because ____." },
              { q: "What does Lina want to be? Copy the sentence that tells you.", s: "She wants to be ____. The sentence is: ____" },
              { q: "Which sentence shows that Lina is patient with her brother?", lines: 1 },
              { q: "What is the whole paragraph about? Answer in one sentence.", x: "What is the whole paragraph about, and which ONE sentence tells the reader that? Copy it." }
            ] },
          { name: "C", title: "Sentences about me", instr: "Write five sentences about you. Use and in one sentence and but in one sentence.", lines: 1,
            ex: "My name is Lina, and I am fifteen years old.", bank: ["and", "but"], tiers: { stretch: { bank: false, instr: "Write five sentences about you. Use and once and but once. One sentence must let the reader hear or smell something." } },
            items: [
              { q: "1.", s: "My name is ____, and I am ____." },
              { q: "2.", s: "I am from ____, but now I live in ____." },
              { q: "3.", s: "My family is ____, and ____." },
              { q: "4.", s: "I like ____, but I don\u2019t like ____." },
              { q: "5.", s: "On Sundays I ____." }
            ] },
          { name: "D", title: "Make it real", instr: "Choose one sentence from Part C. Rewrite it so the reader can hear, smell, or taste something.", lines: 2, onlyTiers: ["stretch"], items: ["Original:", "Rewritten:"], ex: "I like music.  \u2192  I like the sound of my grandmother\u2019s radio in the morning." }
        ]
      }
    }
  },
  // ================================================================ L2
  {
    n: 2, slug: "AmIsAre", title: "I Am, You Are, She Is / The Simple Sentence", accent: "mint", texts: ["1A", "2A"],
    banner: { obj: "1A: use am, is, are to give personal information. 2A: build a complete simple sentence.", std: "1A: Show awareness of subject/verb agreement  \u2022  2A: Write simple sentences", comp: ["COM", "TH"] },
    warmup: { title: "True or false about Lina?", lines: ["Lina is fourteen.", "Lina is from Manila.", "Lina\u2019s grandmother is in the kitchen.", "Lina wants to be a doctor."], note: "Show thumbs up or thumbs down. Then say the true sentence." },
    goals: ["1A: choose am, is or are for I, you, he, she, it, we, they.", "1A: write five true sentences about you with am, is, are.", "2A: find the subject and the verb in a sentence.", "2A: turn a fragment into a complete sentence."],
    vocab: [
      ["student", "a person who is learning at school"], ["teacher", "a person who helps students learn"], ["classmate", "a student in the same class as you"], ["country", "a nation, like Canada or the Philippines"],
      ["city", "a big town, like Richmond"], ["age", "how old you are"], ["subject", "who or what the sentence is about"], ["verb", "the action or being word"],
      ["fragment", "a piece of a sentence that is not complete"], ["complete", "whole, with nothing missing"]
    ],
    teach1: { title: "1A \u2014 am, is, are", items: [["I", "am  \u2192  I am a student."], ["he / she / it", "is  \u2192  She is fifteen."], ["you / we / they", "are  \u2192  They are in the kitchen."]], note: "One subject, one form of be. Lina is. Her brothers are." },
    teach2: { title: "2A \u2014 a simple sentence has three parts", items: [["Subject", "who or what: My grandmother"], ["Verb", "the action or being: hums"], ["Complete idea", "it makes sense alone: My grandmother hums."]], note: "Missing one part? It is a fragment: \u201cGarlic rice in the pan.\u201d No verb, no sentence." },
    examples: { "1A": ["I am a student at Richmond Secondary.", "My teacher is Mr. Reid.", "My friends are in Room 148."], "2A": ["The rain taps on the glass.  (subject: the rain / verb: taps)", "My little brother asks a hundred questions.", "Fragment: Old songs on the radio.  \u2192  Old songs play on the radio."] },
    practice: { title: "Fix it", items: ["1A: Lina ___ fifteen.  (am / is / are)", "1A: We ___ in Room 148.", "1A: My friends ___ from many countries.", "2A: Fragment or sentence? \u201cThe rice cooker in the corner.\u201d", "2A: Fragment or sentence? \u201cSteam covers the window.\u201d", "2A: Fix it: \u201cA hundred questions from my brother.\u201d"] },
    speaking: { title: "Who am I? Who are you?", frames: ["I am \u2026 (age / from / a student)", "You are \u2026", "We are both \u2026"], note: "Find three things that are true for BOTH of you. Say them with we are." },
    yourturn: { "1A": "Worksheet Parts A\u2013C. Part A: choose am, is, are. Part C: five true sentences about you.", "2A": "Worksheet Parts A\u2013D. Underline subjects, circle verbs, then fix the fragments." },
    exit: { prompt: "1A: one sentence with is about your teacher. 2A: one fragment and its fix.", frame: "1A: My teacher is \u2026   2A: Fragment \u2192 sentence" },
    plan: { objective: "1A chooses am/is/are correctly for every subject; 2A can name the subject and verb of a sentence and repair a fragment.",
      materials: ["Class text (2A numbered-sentence version)", "Worksheets in six tiers", "Grammar sheet G1 am/is/are for 1A early finishers", "Help slips"],
      steps: [["8", "Warm-up: true or false about Lina, thumbs. Say the true sentence."], ["15", "Teach: am/is/are chart for everyone (2A needs it too), then the three parts of a simple sentence. Fragments on the board."], ["10", "Examples: read both columns. Ask 2A to find the subject in each 1A example."], ["10", "Practice: six items, whole class, cold-call gently."], ["10", "Pair speaking: three things true for both of you, with we are."], ["22", "Worksheet: split. 1A Part A first, then C; 2A A\u2013D. 1A finishers take grammar sheet G1."], ["5", "Exit: 1A a sentence with is; 2A a fragment and its fix."]],
      watch: "1A students writing \u2018I is\u2019 \u2014 correct the chart on the board, not the student. 2A students calling a prepositional phrase the subject (\u2018in the corner\u2019). Next class is the district writing sample: remind them, pens not pencils." },
    shape: ["True or false about Lina", "am / is / are \u2022 subject + verb", "Examples", "Practice together", "Talk: what is true for both of us?", "Worksheet", "Exit ticket"],
    worksheets: {
      "1A": {
        title: "I Am, You Are, She Is", remember: "I am  \u2022  he / she / it is  \u2022  you / we / they are", vocabCount: 8,
        objective: "Use am, is and are to give personal information.", outcome: "ELL 1 W9 Show awareness of subject/verb agreement \u2022 W1 Write simple sentences",
        checks: ["I used am with I.", "I used is with he, she, it.", "I used are with you, we, they.", "Every sentence starts with a capital letter.", "Every sentence ends with a period.", "My Part C sentences are true about ME."],
        parts: [
          { name: "A", title: "Choose am, is or are", instr: "Write am, is or are in the blank.", bank: ["am", "is", "are"], limit: { support: 8 }, ex: "am",
            items: ["I ____ a student.", "Lina ____ fifteen years old.", "We ____ in Room 148.", "My friends ____ from many countries.", "Mr. Reid ____ our teacher.", "You ____ in ELL.", "Lina\u2019s grandmother ____ in the kitchen.", "The rice ____ hot.", "My brother and I ____ at home on Sunday.", "It ____ Wednesday today.", "They ____ classmates.", "I ____ from ____ ."] },
          { name: "B", title: "Pronoun + be", instr: "Write the pronoun and the correct form of be.", lines: 1, ex: "She is", tiers: { support: { bank: ["He is", "She is", "It is", "We are", "They are", "You are"] } },
            items: [{ q: "Lina  \u2192", c: "Lina  \u2192  ____ is" }, { q: "my brother  \u2192" }, { q: "my friends  \u2192" }, { q: "you and I  \u2192" }, { q: "the radio  \u2192" }, { q: "Lina and her grandmother  \u2192" }] },
          { name: "C", title: "Five true sentences about me", instr: "Finish each sentence so it is true for you.", lines: 1, ex: "a student at Richmond Secondary",
            items: [
              { q: "I am ____.", s: "I am ____. (a student / happy / fifteen)" },
              { q: "My teacher is ____.", s: "My teacher is ____. (Mr. Reid)" },
              { q: "My family is ____.", s: "My family is ____. (big / small / kind)" },
              { q: "My friends are ____.", s: "My friends are ____. (funny / from ____)" },
              { q: "My favourite food is ____." }
            ], tiers: { stretch: { instr: "Write five true sentences about you with am, is or are. Do not copy the ideas above \u2014 use your own." } } },
          { name: "D", title: "A classmate", instr: "Write three sentences about a classmate with is or are.", lines: 1, onlyTiers: ["stretch"], items: ["1.", "2.", "3."], ex: "Ana is my classmate, and she is from Brazil." }
        ]
      },
      "2A": {
        title: "The Simple Sentence", remember: "Simple sentence = subject + verb + a complete idea. A fragment is missing one of the three.", vocabCount: 10,
        objective: "Find the subject and verb, and turn fragments into complete sentences.", outcome: "ELL 2 W1 Write simple sentences \u2022 W7 Use capitalization and punctuation correctly",
        checks: ["Every sentence has a subject.", "Every sentence has a verb.", "Every sentence is a complete idea.", "Every sentence starts with a capital letter.", "Every sentence ends with a period.", "No fragments are left in Part C or D."],
        parts: [
          { name: "A", title: "Subject and verb", instr: "Underline the subject once and circle the verb in each sentence from \u201cThe Sunday Kitchen\u201d.", ex: "subject = The rain, verb = taps", tiers: { support: { instr: "The subject is in bold. Circle the verb.", boldSubject: true } },
            items: [
              { q: "The rain taps on the glass.", subj: "The rain" }, { q: "My grandmother hums along.", subj: "My grandmother" }, { q: "Garlic rice crackles in the pan.", subj: "Garlic rice" }, { q: "The rice cooker clicks in the corner.", subj: "The rice cooker" },
              { q: "My little brother asks a hundred questions.", subj: "My little brother" }, { q: "I taste everything first.", subj: "I" }, { q: "The window is cloudy with steam.", subj: "The window" }, { q: "The plates are empty.", subj: "The plates" }
            ] },
          { name: "B", title: "Sentence or fragment?", instr: "Write S for a complete sentence or F for a fragment.", limit: { support: 8 }, ex: "F",
            items: ["Garlic rice in the pan.", "My grandmother hums.", "Steam covers the window.", "Old songs on the radio.", "A hundred questions from my brother.", "I answer every one.", "Because I am the official taster.", "The plates are empty.", "When the radio is still playing.", "Lina wants to be a nurse."], blankFirst: true },
          { name: "C", title: "Fix the fragments", instr: "Rewrite each fragment as a complete sentence.", lines: 1, ex: "Garlic rice crackles in the pan.", tiers: { support: { instr: "Rewrite each fragment as a complete sentence. The missing part is in brackets." } },
            items: [
              { q: "Garlic rice in the pan.", s: "Garlic rice in the pan.  (add a verb: crackles / cooks)" },
              { q: "Old songs on the radio.", s: "Old songs on the radio.  (add a verb: play)" },
              { q: "A hundred questions from my brother.", s: "A hundred questions from my brother.  (add a subject and verb: My brother asks)" },
              { q: "Because I am the official taster.", s: "Because I am the official taster.  (add the main idea: I taste everything first)" },
              { q: "The steam on the window.", s: "The steam on the window.  (add a verb: makes the glass cloudy)" }
            ] },
          { name: "D", title: "My room at home", instr: "Write four simple sentences about your kitchen or another room at home. Each one needs a subject, a verb and a complete idea.", lines: 1, ex: "My kitchen is small, but it is always warm.",
            items: ["1.", "2.", "3.", "4."], tiers: { stretch: { instr: "Write four simple sentences about a room at home, then combine two of them with and or but to make one longer sentence.", items: ["1.", "2.", "3.", "4.", "Combined:"] } } }
        ]
      }
    }
  },
  // ================================================================ L3 (administration only)
  {
    n: 3, slug: "WritingSample", title: "September Writing Sample", accent: "amber", admin: true,
    banner: { obj: "Write the September writing sample.", std: "District writing sample \u2014 ELL Levels 1\u20133", comp: ["COM", "TH", "PS"] },
    prompts: [
      { day: "Monday, September 14", text: "What is one way someone has helped you that you will always remember?" },
      { day: "Tuesday, September 15", text: "How can friends help each other feel like they belong?" }
    ],
    header: ["Full name", "Student number", "Grade", "ELL level", "Date"],
    rules: ["Black or blue pen only.", "Double-space: write on every second line.", "Header in the top right corner: full name, student number, grade, ELL level, date.", "Write as much as you can. Finished early? Read it again and fix what you can."],
    timing: [["5 min", "Read the prompt. Think. Make a small plan in the margin."], ["60 min", "Write. Keep going. A finished draft beats a perfect first line."], ["10 min", "Read it back. Check capitals, periods, your name."], ["5 min", "Hand in. Thank you."]],
    plan: { objective: "Administer the district September writing sample to the required format; every paper leaves with a complete header.",
      materials: ["Lined pages, one per student plus spares", "Blue or black pens, a box of spares", "The day\u2019s prompt on the board", "Camera or phone to photograph every paper before submission"],
      steps: [["5", "Settle. Header slide up. Every student writes the five header lines before anything else \u2014 walk the room and check."], ["5", "Prompt slide. Read it twice aloud. Key words circled on the board. No further explanation."], ["60", "Write. Silent. Time called at 20 and 40 minutes as a cue, not a stop. 1A students may sit with the prompt for a while; that is allowed."], ["7", "Read back. Checklist slide."], ["3", "Collect. Count papers against the class list. Photograph all of them tonight \u2014 the originals go to Ed Fac on the 21st."]],
      watch: "Header omissions \u2014 the single most common reason a sample is returned. A 1A student who writes nothing after ten minutes: quietly point at the first key word and say \u2018start with this.\u2019" },
    shape: ["Header: five lines, top right", "Read the prompt twice", "Write \u2014 on your own", "Read it back", "Hand in"],
  }
];

module.exports = { COURSE, CLASS_TEXT, TEXT_SENTENCES, LESSONS };
