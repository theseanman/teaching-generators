// PEER-MARKING SEQUENCE BUILDER (Sean, Oct 16 2026). Turns a unit's test data into deck blocks for render_deck.js:
// Part A section by section, the two levels interleaved (ELL 1 A, ELL 2 A, ELL 1 B ...), each group's questions then one
// answer per slide with its mark, then a section total with the level band and the running Part A total.
// Part B is marked together: what the writer had to do, one good answer, then one rubric line at a time, levels alternating.
const LV = ["1A", "2A"];
function partA(test) {
  const out = [], run = { "1A": 0, "2A": 0 };
  const letters = [...new Set(LV.flatMap(l => test[l].sections.map(s => s.sec)))].sort();
  letters.forEach(L => LV.forEach(l => { const T = test[l], s = T.sections.find(x => x.sec === L); if (!s) return;
    const first = run[l] === 0; run[l] += s.outOf;
    if (s.para) out.push({ type: "markpara", label: `${T.lvl} Section ${s.sec} paragraph`, tag: `Marking · ${T.lvl} · the paragraph`,
      head: `${T.lvl} · Section ${s.sec} — the paragraph`, text: s.para, note: s.paraNote });
    let from = 0;
    s.groups.forEach(g => { out.push({ type: "markq", lvl: T.lvl, sec: s.sec, title: g.title || s.title, items: g.items.map(it => g.fix ? { ...it, fix: true } : it), from,
      cols: g.fix && g.items.length > 5 ? 2 : 1 }); from += g.items.length; });
    if (s.fixed) out.push({ type: "markpara", fixed: true, label: `${T.lvl} Section ${s.sec} fixed`, tag: `Marking · ${T.lvl} · every fix`,
      head: `${T.lvl} · Section ${s.sec} — all fixed`, text: s.fixed });
    out.push({ type: "marktotal", label: `${T.lvl} Section ${s.sec} total`, lvl: T.lvl, sec: s.sec, outOf: s.outOf,
      band: s.w11 && s.w11 !== "after" ? s.w11 : s.band, bandLabel: s.w11 && s.w11 !== "after" ? "Level — C + D together, out of 12" : null,
      combo: s.w11 && s.w11 !== "after" ? 12 : null, waitNote: s.w11 === "after" ? "Level: after Section D. Add C and D together." : null,
      runTo: first ? null : run[l] }); }));
  return out;
}
function partB(test, pb, RUB, opts = {}) {
  const out = [], names = ["Not Yet", "Minimally", "Meeting", "Fully"];
  LV.forEach(l => { const T = test[l], P = pb[l];
    out.push({ type: "rows", label: `${T.lvl} Part B task`, tag: `Part B · ${T.lvl}`, head: `${T.lvl} · Part B: what the writer had to do`,
      rows: P.musts.map((m, i) => [String(i + 1), m]) });
    out.push({ type: "markpara", label: `${T.lvl} Part B good answer`, tag: `Part B · ${T.lvl} · one good answer`,
      head: `${T.lvl} · ${P.task}: one good answer`, text: P.good }); });
  const n = Math.max(...LV.map(l => pb[l].crit.length));
  for (let k = 0; k < n; k++) LV.forEach(l => { const T = test[l], P = pb[l], key = P.crit[k]; if (!key) return; const [name, desc] = RUB[key];
    out.push({ type: "rows", label: `${T.lvl} Part B ${name}`, tag: `Part B · ${T.lvl} · line ${k + 1} of ${P.crit.length}`,
      head: `${T.lvl} · ${name}`, rows: desc.map((d, i) => [String(P.marks[i]), `${names[i]}: ${d}`]) }); });
  LV.forEach(l => { const T = test[l], P = pb[l];
    out.push({ type: "rows", label: `${T.lvl} add it up`, tag: `Add it up · ${T.lvl}`, head: `${T.lvl} · add it all up`, icon: "icon-pen.png",
      big: T.lvl, rows: [["Part A", `____ / ${T.partA}`], ["Part B", `____ / ${T.partB}  (the four rubric marks)`], ["Total", `____ / ${T.total}`]] }); });
  return out;
}
module.exports = { partA, partB };
