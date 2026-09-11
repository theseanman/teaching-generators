// ELL 3 U1 — three-tier exemplars for the descriptive paragraph, plus the
// Voices Notebook organiser content and its rubric.

const EXEMPLARS = {
  topic: "Describe something you carry with you from where you are from.",
  note: "These three paragraphs answer the same prompt at three levels. Read them in order. The differences are not about how much English each writer has \u2014 all three are accurate. The differences are about how specific the detail is and how deliberately it is arranged.",
  tiers: [
    { name: "Minimally Meeting", band: "Not Yet Meeting to Minimally Meeting on the paragraph rubric",
      text: [
        "Food is very important in my family and it is something I brought with me from my country. My mother cooks traditional dishes every week and they taste very good. The smells remind me of my home and my grandmother's house. It is nice to eat together as a family and talk about our day. Even though we live in a new country now, we still keep our traditions and this is important to us. Food is a way to remember where we come from and I am happy that we still do it.",
      ],
      why: [
        "Every sentence is accurate. Nothing here is wrong.",
        "Opens by announcing the topic, so the reader is told what to think before being shown anything.",
        "No detail could be photographed: traditional dishes, very good, the smells, our traditions.",
        "Any student in the room could have written this paragraph unchanged, which is the clearest sign the detail is general.",
        "Ends by explaining the paragraph back to the reader.",
      ] },
    { name: "Meeting", band: "Meeting on the paragraph rubric",
      text: [
        "My mother has a wooden spoon with a crack running down the handle. She brought it in her suitcase, wrapped in a towel, and she has three newer spoons in the drawer that she does not use. On Sundays she makes the rice dish with the burnt bottom that everyone fights over, and she uses that spoon to scrape the pan. The kitchen fills up with the smell of it and the window goes white with steam. My brother and I know the sound of the spoon against the metal, and we come out of our rooms before she calls us.",
      ],
      why: [
        "Opens on a specific object rather than on the category it belongs to.",
        "Details can be photographed: the crack, the towel, the three unused spoons, the white window.",
        "Uses sight, smell and sound rather than sight alone.",
        "The spoon is developed as the centre; the other details support it instead of competing.",
        "Ends on an action, not on an explanation of what the paragraph meant.",
      ] },
    { name: "Fully Meeting", band: "Fully Meeting on the paragraph rubric",
      text: [
        "My mother has a wooden spoon with a crack running down the handle, and she will not let anyone else wash it. There are three newer spoons in the drawer. She brought this one in her suitcase wrapped inside a towel, which is a strange thing to make room for when you are allowed twenty-three kilograms and you are leaving a house behind.",
        "On Sundays she uses it to scrape the burnt rice off the bottom of the pan. The sound is the same sound it made in the other kitchen. My brother and I come out of our rooms before she calls us, and I do not think we have ever discussed this.",
        "She is not sentimental. She threw away my school certificates last spring. But the spoon crossed an ocean in a towel, and I have started to understand that the things people carry are not chosen the way we think they are.",
      ],
      why: [
        "The unused spoons in the drawer do the work of an explanation without being one.",
        "The twenty-three kilograms is doing two jobs: it is a concrete fact and it silently measures what the spoon cost to bring.",
        "The certificates detail is placed to complicate the reader's easy reading of the mother, not to decorate.",
        "Sentence lengths are controlled \u2014 note the short sentence before the final long one.",
        "The last sentence makes a claim about people in general that the paragraph has actually earned.",
      ] },
  ],
  comparison: [
    ["Opening", "Announces the topic", "Names one object", "Names the object and immediately complicates it"],
    ["Detail", "Category words only", "Photographable, multi-sensory", "Selected, and each one carries a second meaning"],
    ["Centre", "No detail developed further", "The spoon is the centre", "The spoon is the centre and the drawer is its counterweight"],
    ["Sentences", "Uniform length, mostly simple", "Varied, compound and complex used accurately", "Length controlled for effect, including a short sentence placed deliberately"],
    ["Ending", "Explains the paragraph", "Ends on an action", "Ends on a claim the paragraph has earned"],
  ],
};

const NOTEBOOK = {
  title: "The Voices Notebook",
  subtitle: "One entry per lesson \u00B7 four checkpoints \u00B7 40 percent of the unit",
  intro: "This runs from Lesson 2 to Lesson 12. Every lesson you add one entry. It takes about four minutes and it is worth more than the unit test, because it measures something a test cannot: whether you are getting better at noticing.",
  howItWorks: [
    "Each entry has two parts. First, one specific detail you noticed \u2014 from your own life, or from something we read in class. Second, one line explaining what makes it specific rather than general.",
    "The test for part one: could a reader photograph it, and how many other people in this room could have written the same sentence?",
    "The test for part two: you must say why, not just claim that it is specific. \u201CIt is specific because you could take a picture of the chipped edge\u201D is an answer. \u201CIt is very specific\u201D is not.",
    "Entries do not need to be about anything important. Most of the best ones are not.",
    "If you join this class partway through the unit, start at the current lesson. You are not behind \u2014 every entry stands on its own.",
  ],
  checkpoints: [
    ["Checkpoint 1", "Lesson 2", "First entry only. I check that you have understood the two-part format."],
    ["Checkpoint 2", "Lesson 6", "Entries so far, with one from the story. I comment on the kind of detail you are choosing."],
    ["Checkpoint 3", "Lesson 9", "All entries together. I comment on the pattern across them, not on individual entries."],
    ["Checkpoint 4", "Lesson 12", "The final reflection. This is the part that is marked."],
  ],
  exampleEntries: [
    ["Weak", "I saw a nice sunset on the way home. It is specific because I described it.",
     "The detail is general \u2014 anyone could have written it \u2014 and the justification only asserts that it is specific without saying why."],
    ["Better", "There was a shopping cart in the ditch by the dyke path with a traffic cone in it. It is specific because you could photograph it and nobody else on that path would have described the cone.",
     "Photographable, unusual, and the justification applies the actual test."],
    ["From a text", "Faraj waves his hand at the coins instead of saying anything. It is specific because it is a gesture rather than a statement, and it shows the kindness without either of them having to name it.",
     "A detail chosen from the story with a justification that explains what the specificity achieves."],
  ],
  finalTask: "In Lesson 12 you will read back through every entry and write half a page answering two questions: what kind of detail do you notice most easily, and what kind do you keep missing? You must quote at least three of your own entries as evidence. This reflection is what the Notebook is marked on \u2014 not the number of entries, and not how impressive the details are.",
  rubricIntro: "The Notebook is worth 40 percent of the unit. It is assessed on the Lesson 12 reflection, using the sixth criterion of the rubric (W14, W15). Completeness of entries is a condition, not a criterion: a reflection cannot be written without entries to draw on, but a full notebook with a thin reflection does not score well.",
  rubricRows: [
    ["Not Yet Meeting", "Entries are present but the reflection describes feelings rather than patterns, and refers to no specific entries."],
    ["Minimally Meeting", "Identifies a pattern in their noticing but supports it thinly, quoting one entry or none."],
    ["Meeting", "Identifies both a strength and a gap in their own noticing, quoting at least three of their own entries as evidence."],
    ["Fully Meeting", "Uses their own entries to make a claim about themselves as a noticer that they could not have made in Lesson 2."],
  ],
};

module.exports = { EXEMPLARS, NOTEBOOK };
