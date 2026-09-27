// Builds lessons/ELL12_U01_L13.js (Practice Test + go over the answers) from the test content file.
// Usage: node make_review_data.js ../test/content.js lessons/ELL12_U01_L13.js
const fs = require("fs"), path = require("path");
const C = require(path.resolve(process.argv[2]));
const blank = q => q.replace(/\s*___\s*$/, "").replace(/___/g, "( ? )").replace(/\s+/g, " ").trim();
const parts = [], walks = [];
function addLevel(P, key) {
  P.partA.sections.forEach(sec => sec.groups.forEach((g, gi) => {
    const id = sec.id + (sec.groups.length > 1 ? String(gi + 1) : "");
    const k = `${key}-${id}`;
    if (g.para) { // 2A edit-the-paragraph: each fix is one reveal
      const fixes = g.key.filter(x => !x.startsWith("("));
      parts.push({ key: k, lvl: P.level, id, title: sec.title, kind: "cloze", instr: g.instr,
        example: { text: "an onion", ans: "correct: no change", tail: "" },
        items: fixes.map(f => { const [a, b] = f.split(" → "); return { text: a, ans: b, tail: "" }; }),
        how: "Six mistakes: a capital, a comma, two verbs, a fragment and an end mark. The example shows a trap: an onion is already correct.", para: g.para });
      return; }
    const rewrite = g.items.some(it => it.type === "rewrite");
    const it2 = g.items.map(it => ({ text: rewrite ? it.q + "  →" : blank(it.q), ans: it.a, tail: "" }));
    const ex = g.example ? (rewrite ? { text: g.example.q + "  →", ans: g.example.a } : { text: blank(g.example.q), ans: g.example.a, tail: "" }) : null;
    parts.push({ key: k, lvl: P.level, id, title: sec.title, kind: rewrite ? "lines" : "cloze", lines: 2, instr: g.instr,
      ...(g.bank ? { bankNote: g.bank.join(" · ") } : {}), example: ex, items: it2,
      how: (g.bank ? `Word box: ${g.bank.join(" · ")}. ` : "") + `Outcome ${sec.outcome}. ${rewrite ? "Write the whole sentence again, fixed." : "Check each answer as it appears."}` });
  }));
}
addLevel(C.P1A, "1A"); addLevel(C.P2A, "2A");
// interleave walks by section letter: ELL 1 A, ELL 2 A, ELL 1 B, ...
const letters = [...new Set(parts.map(p => p.id[0]))].sort();
letters.forEach(L => ["1A", "2A"].forEach(lv => parts.filter(p => p.key.startsWith(lv) && p.id[0] === L).forEach(p => {
  if (p.para) walks.push({ type: "prose", text: "para", label: "Part D paragraph (ELL 2)" });
  const good = p.items.some(i => /^Any /.test(i.ans));
  walks.push({ type: "walk", part: p.key, withExample: true }, { type: "reveals", part: p.key });
})));
parts.forEach(p => { delete p.para; });
const pb = (P) => ({ musts: P.partB.musts, task: P.partB.task, note: P.partB.rubricNote });
const out = { parts, walks, pb1: pb(C.P1A), pb2: pb(C.P2A), para: C.P2A.partA.sections.find(s => s.groups.some(g => g.para)).groups.find(g => g.para).para };
fs.writeFileSync(process.argv[3] + ".json", JSON.stringify(out, null, 1));
console.log("parts", parts.length, "walk blocks", walks.length);
