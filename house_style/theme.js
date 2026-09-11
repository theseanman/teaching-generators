// THE HOUSE STYLE. Every colour, font and shared size used by the deck renderer and the worksheet builder.
// Change the look here, once, and every course follows. See DESIGN.md.
const pad = n => String(n).padStart(2, "0");
module.exports = {
  font: "Calibri",
  color: {
    NAVY: "0B2C4D",   // banner, headings, title slide
    BLUE: "1565C0",   // Part titles, primary card labels, revealed answers
    TEAL: "00897B",   // accent: banner strip, chips, number dots, tags
    PALE: "E3F0FB",   // blue card fill / word-bank fill
    PALE2: "EEF6FD",  // worksheet goal box
    TINT: "D7ECEA",   // teal card fill (alternates with PALE)
    LINE: "90B4D8",   // blue card outline
    TLINE: "7FC4BB",  // teal card outline
    AMBER: "FFF3D6", AMBERL: "E0B252", // exit ticket / warnings / 'Stuck?' cards
    INK: "1F2933", GREY: "5F6B7A", WHITE: "FFFFFF",
    SOFT: "A9CBEF", SOFTT: "7FD1C7"      // light text on navy
  },
  fileName: (course, m, type, ver) =>
    `${course.code}_U${pad(m.unit)}_${type}_L${pad(m.lesson)}_${m.title.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join("")}_${ver}`
};
