// ELL 3 U2 — three-tier exemplars for the cultural narrative paragraph, plus the
// Comparison Log content and its rubric.

const EXEMPLARS = {
  topic: "Write about one small moment where two languages, two places, or two generations met.",
  note: "These three paragraphs answer the same prompt at three levels. All three are grammatically accurate \u2014 the differences are about the size of the moment chosen, and about how much figurative language is used and where. Notice that the strongest paragraph uses the fewest comparisons.",
  tiers: [
    { name: "Developing", band: "Emerging to Developing on the paragraph rubric",
      text: [
        "Language is like a bridge between two worlds and it is very important in my family. My parents speak our language at home and I speak English at school, so I am like a person standing with one foot on each side. Sometimes it is hard as a rock to explain things to them and I feel like I am drowning. But family is the most important thing and we always find a way. This experience taught me that language is a gift and I should be proud of both of my languages.",
      ],
      why: [
        "The subject is language itself, which is far too large to hold. There is no moment in this paragraph \u2014 nothing happens at a particular time in a particular room.",
        "Five comparisons in six sentences: bridge, one foot on each side, hard as a rock, drowning, gift. Each one cancels the last and none is fresh.",
        "Three of the five are clichés. \u201CHard as a rock\u201D also mixes two senses of hard.",
        "Opens by announcing the topic and closes by stating the lesson learned.",
        "Nothing here could be photographed, and any student in the class could have written it unchanged.",
      ] },
    { name: "Proficient", band: "Proficient on the paragraph rubric",
      text: [
        "My father was filling in the school form at the kitchen table and he stopped at the line for our street. He asked me how to spell it. I spelled it out slowly and he wrote each letter the way you write a word you do not trust, checking back after every one. We have lived on that street for two years. He walks up it every morning at six. When he finished he read the whole line back to himself under his breath, and then he turned the form around so I could check it, which he has never done with anything in our own language.",
      ],
      why: [
        "One moment, under two minutes long, with two people in it. The larger subject arrives without being named.",
        "Exactly one figure \u2014 \u201Cthe way you write a word you do not trust\u201D \u2014 and it sits at the moment that matters.",
        "The plain sentences around it are what make it visible. \u201CHe walks up it every morning at six\u201D carries more weight than any comparison could.",
        "Opens on a concrete action, not on a topic.",
        "Closes on a detail rather than a conclusion, and the detail does the interpreting for the reader.",
      ] },
    { name: "Extending", band: "Extending on the paragraph rubric",
      text: [
        "My father was filling in the school form and he stopped at the line for our street and asked me how to spell it.",
        "I spelled it. He wrote it the way you write a word you do not trust, checking back after every letter, and then he read the line to himself under his breath and turned the form around so I could look.",
        "He has never done that before. Not with anything. In our own language he used to fill in other people's forms at the shop, standing up, without a table, and hand them back finished.",
        "I said it was right. It was right.",
        "He took the form back and squared the edges against the table twice, which is what he does with paper when there is nothing left to do to it, and I went and stood at the window until he had gone out.",
      ],
      why: [
        "The same moment as the Proficient paragraph, but the writer has found what the moment is standing next to \u2014 the shop, the standing up, the other people's forms.",
        "Still only one figure of speech in the whole piece. The restraint is now clearly a decision rather than a limitation.",
        "\u201CI said it was right. It was right.\u201D Two short sentences placed where the paragraph needs to stop. Sentence length is being used as a tool.",
        "The squaring of the paper is an observed habit, not a symbol. It means something because it is exact, not because it is significant.",
        "The last clause tells you what the narrator felt without naming any feeling, and the reader is trusted completely.",
      ] },
  ],
  comparison: [
    ["Scope", "A subject: language itself", "One moment, two minutes long", "The same moment, plus what it stands next to"],
    ["Figures", "Five, three of them clichés", "Exactly one, at the moment of change", "Exactly one, and the restraint reads as choice"],
    ["Detail", "Nothing photographable", "Concrete and specific throughout", "Specific, and each detail carries a second meaning"],
    ["Sentences", "Uniform length, mostly compound", "Varied, accurate", "Length controlled for effect, including two very short ones"],
    ["Closing", "States the lesson learned", "Ends on a detail", "Ends on an action that names no feeling"],
  ],
};

const NOTEBOOK = {
  title: "The Comparison Log",
  subtitle: "One entry per lesson \u00B7 four checkpoints \u00B7 40 percent of the unit",
  intro: "This runs from Lesson 3 to Lesson 12. Every lesson you add one entry. It takes about four minutes and it is worth more than the unit test, because it measures something a test cannot: whether comparisons are becoming a tool you reach for on purpose.",
  howItWorks: [
    "Each entry has two parts. First, one comparison \u2014 a simile, a metaphor, a piece of personification, an idiom, or an image. Second, one line saying what it makes exact that a plain sentence would not.",
    "The comparison can be yours, or one you read, or one you overheard on the bus. Say which.",
    "The test for part two: name the quality being carried across. \u201CIt sounds better\u201D is not an answer. \u201CIt makes the waiting feel deliberate rather than accidental\u201D is.",
    "A comparison you decide is bad still counts, as long as you can say why it fails. Some of the most useful entries are failures.",
    "At the back of the log, keep the idiom page you start in Lesson 5: English idioms you have actually heard, where you heard them, and what you think they mean.",
    "If you join this class partway through the unit, start at the current lesson. You are not behind \u2014 every entry stands on its own.",
  ],
  checkpoints: [
    ["Checkpoint 1", "Lesson 3", "First entry only. I check that you have understood the two-part format."],
    ["Checkpoint 2", "Lesson 6", "Entries so far, including one from the story. I comment on the kind of comparison you are choosing."],
    ["Checkpoint 3", "Lesson 9", "All entries together, plus the idiom page. I comment on the pattern across them."],
    ["Checkpoint 4", "Lesson 12", "The final reflection. This is the part that is marked."],
  ],
  exampleEntries: [
    ["Weak", "\u201CThe sunset was as beautiful as a painting.\u201D It is specific because it uses a simile.",
     "The comparison is a clich\u00e9 and compares a beautiful thing to a beautiful thing, so nothing is carried across. The justification only names the technique instead of saying what it achieves."],
    ["Better", "Overheard on the 407: \u201CThat meeting was a hostage situation.\u201D It makes exact that nobody could leave and nobody was in charge of when it would end \u2014 \u201Clong meeting\u201D says none of that.",
     "Fresh, sourced, and the justification names the two qualities being carried across."],
    ["A useful failure", "I wrote \u201Cthe hallway was like a hospital\u201D and then realised I only meant it was quiet. \u201CThe hallway was quiet\u201D is better, because the hospital brings illness with it and I did not want that.",
     "A rejected comparison with a clear account of why it failed. This entry shows more control than a successful one would."],
  ],
  finalTask: "In Lesson 12 you will read back through every entry and write half a page answering two questions: what kind of comparison do you reach for most often, and what does that habit help you see or stop you seeing? You must quote at least three of your own entries as evidence. This reflection is what the Log is marked on \u2014 not the number of entries, and not how clever the comparisons are.",
  rubricIntro: "The Comparison Log is worth 40 percent of the unit. It is assessed on the Lesson 12 reflection, using the sixth criterion of the paragraph rubric. Completeness of entries is a condition, not a criterion: a reflection cannot be written without entries to draw on, but a full log with a thin reflection does not score well.",
  rubricRows: [
    ["Emerging", "Entries are present but the reflection describes feelings rather than patterns, and refers to no specific entries."],
    ["Developing", "Identifies a pattern in the comparisons chosen but supports it thinly, quoting one entry or none."],
    ["Proficient", "Names the kind of comparison they reach for most often, quoting at least three of their own entries as evidence."],
    ["Extending", "Says what that habit helps them see and what it stops them seeing \u2014 a claim about themselves as a writer that they could not have made in Lesson 3."],
  ],
};

module.exports = { EXEMPLARS, NOTEBOOK };
