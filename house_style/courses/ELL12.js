// Course-level settings for the integrated ELL 1/2 course (1A + 2A in one room).
// Filenames use code ELL12 and 1A/2A; everything students SEE says ELL 1 / ELL 2 (Sean, Sep 20 2026).
module.exports = {
  code: "ELL12", display: "ELL 1/2", name: "ELL 1/2", room: "148", teacher: "Mr. Reid",
  levels: true, glyph: 0.47,                 // two worksheets per lesson; typed walkthroughs with the worked example; tick-box checks listed
  comp: ["COM", "TH", "PS"],
  englishOnly: true,            // the yield sign is allowed; each speaking activity opts in
  routines: []
};
