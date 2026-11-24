// ENG8 U3 L02 — the Part C sheet: printed on its own, collected and photo-marked (one face), rubric on the back.
// All content lives in ENG8_U03_L02.js; this file only selects Part C and its rubric. Nov 24 2026, Sean's go.
// Build: node make_worksheet.js lessons/ENG8_U03_L02_PartC.js out/ENG8_U03_L02 v2  (then convert to PDF)
const L = require("./ENG8_U03_L02.js");
const C = L.worksheet.parts.find(p => p.id === "C");
module.exports = Object.assign({}, L, {
  meta: Object.assign({}, L.meta, { title: "In Her Own Words Part C", subtitle: "Two sources (marked)" }),
  worksheet: { objective: L.worksheet.objective, outcomes: L.worksheet.outcomes,
    parts: [Object.assign({}, C, { ownSheet: false })], rubric: L.worksheet.rubricC } });
