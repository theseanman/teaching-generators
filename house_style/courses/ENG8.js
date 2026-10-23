// Course-level settings for English 8 (blocks F and H). Everything that differs between courses lives here.
module.exports = {
  code: "ENG8", display: "English 8", name: "English 8", room: "148", teacher: "Mr. Reid",
  comp: ["COM", "TH", "PS"],
  // Unit 1's look, kept for Unit 2 on (Sean, Oct 23 2026): accent rotates teal → amber → violet → mint → coral by lesson number,
  // headings in Cambria — the same palette as ENG8_U01_generators/make_decks_v2.js.
  accentCycle: ["0E8C7F", "C8860B", "7A52B3", "2E9E6B", "D4573B"], headFont: "Cambria",
  helpSlip: {
    tagline: "Stuck? Ask. Good readers and writers ask for help.",
    sample: { name: "Jordan P.", date: "Oct 14", need: "Part A, question 3",
      question: ["Is it enough to say the narrator is nervous,", "or do I have to copy a line from the passage?"],
      reply: ["Both. Say what you think, then copy the", "words that made you think it. Try line 11."] } },
  routines: []
};
