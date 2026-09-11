// Content checks run before anything is built. Exits non-zero on any failure.
const path = require("path"), L = require(path.resolve(process.argv[2]));
const CO = require(path.resolve(__dirname, "courses", L.course + ".js"));
const err = [], KINDS = ["cloze", "lines", "open", "check", "exit"];
const need = (c, m) => { if (!c) err.push(m); };
need(L.meta && L.meta.title && L.meta.unit && L.meta.lesson, "meta: title/unit/lesson missing");
need(L.banner && L.banner.obj && L.banner.std, "banner: obj and std are required");
need(L.plan && L.plan.steps && L.plan.steps.length, "plan: steps missing");
(L.plan.steps || []).forEach((s, i) => need(s.length === 3 && s[2].length > 20, `plan step ${i + 1}: needs [minutes, title, full description]`));
["materials", "diff", "assess", "homework", "watch"].forEach(k => need(L.plan[k], `plan.${k} missing`));
need(L.shape && L.shape.length, "shape of the day missing");
const parts = L.worksheet.parts; need(parts.length, "worksheet has no Parts");
parts.forEach((p, i) => {
  need(KINDS.includes(p.kind), `Part ${p.id}: unknown kind ${p.kind}`);
  need(p.how, `Part ${p.id}: 'how' (walkthrough text) missing`);
  if (p.kind === "exit") need(i === parts.length - 1, `Part ${p.id}: the exit ticket must be the LAST Part`);
  if (["cloze", "lines"].includes(p.kind)) need(p.example, `Part ${p.id}: worked example missing`);
  if (p.bank) {
    p.items.forEach(it => need(p.bank.includes(it.ans), `Part ${p.id}: answer "${it.ans}" is not in the word bank`));
    const pos = p.items.map(it => p.bank.indexOf(it.ans));
    need(!pos.every((v, k) => k === 0 || v > pos[k - 1]), `Part ${p.id}: answers are in word-bank order \u2014 shuffle the bank`);
    (p.crossed || []).forEach(w => need(p.bank.includes(w), `Part ${p.id}: crossed word "${w}" not in bank`));
  }
});
const ids = parts.map(p => p.id);
L.sequence.forEach(s => { if (["walk", "reveals", "exit"].includes(s.type)) need(ids.includes(s.part), `sequence: ${s.type} refers to missing Part ${s.part}`);
  if (["text", "wordlist"].includes(s.type)) need(L.texts && L.texts[s.text], `sequence: text "${s.text}" missing`); });
ids.forEach(id => need(L.sequence.some(s => s.type === "walk" && s.part === id) || L.sequence.some(s => s.type === "exit" && s.part === id), `Part ${id} is never walked through in the deck`));
need(L.sequence.some(s => s.type === "next"), "deck has no Next-class slide");
if (L.sequence.some(s => s.type === "routines")) need(CO.routines && CO.routines.length, "lesson asks for routines but the course file has none");
if (err.length) { console.error("LESSON CHECK FAILED:\n  " + err.join("\n  ")); process.exit(1); }
console.log("lesson check ok:", parts.length, "Parts,", L.sequence.length, "sequence blocks");
