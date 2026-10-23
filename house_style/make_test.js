// PRINTED TEST PAPERS + ANSWER KEY from a unit's test data (written Oct 23 2026 for ELL12 U2; the U1 paper builder never
// reached the repo). Same look and rules as make_worksheet.js: Letter, full-width boxes (10080 dxa), underscore-leader
// writing lines (never paragraph borders), clearance floors, a worked example in every section, sections that flow across
// pages (Sean, Oct 16 2026) with each question glued to its own lines and each heading glued to its first question.
// Usage: node make_test.js lessons/<UNIT>_testdata.js <practice|unit> <out-dir> [version] [unitNo] [unitTitle]
//        node make_test.js lessons/<UNIT>_testdata.js key <out-dir> [version] [unitNo] [unitTitle]
const fs = require("fs"), path = require("path");
const D = require(path.resolve(process.argv[2])), WHICH = process.argv[3], out = process.argv[4] || "out", VER = process.argv[5] || "v1";
const UNO = process.argv[6] || D.unitNo || "2", UTITLE = process.argv[7] || D.unitTitle || "My School Day";
// One-level courses (ELL3, Oct 23 2026): D.levels = ["ELL3"], D.course = "ELL3". Two-level ELL12 stays the default.
const LEVELS = D.levels || ["1A", "2A"], COURSE = D.course || "ELL12", KEYHEAD = D.keyHead || `ELL 1/2 · Unit ${UNO} · Test Answer Key · teacher copy`;
const THEME = require("./theme");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  TabStopType, LeaderType, Header, Footer, AlignmentType, PageNumber } = require("docx");
const C = THEME.color || THEME, NAVY = C.NAVY || "0B2C4D", BLUE = C.BLUE || "1565C0", PALE = C.PALE || "E3F0FB", PALE2 = C.PALE2 || "EEF6FD", GREY = C.GREY || "5A6B7D";
const FONT = THEME.font || "Calibri", W = 10080, IND = 520;
const R = (text, o = {}) => new TextRun({ text, font: FONT, size: 26, ...o });
const P = (children, o = {}) => new Paragraph({ children, keepLines: true, ...o });
const edge = { style: BorderStyle.SINGLE, size: 8, color: "90B4D8" };
const box = (children, fill = PALE2) => new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ cantSplit: true,
  children: [new TableCell({ width: { size: W, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill, color: "auto" },
    margins: { top: 110, bottom: 110, left: 160, right: 160 }, borders: { top: edge, bottom: edge, left: edge, right: edge }, children })] })] });
// writing line: line 300 + after 260, first line before 200 (the Oct 9 clearance floors)
const rule = (first, keep, indent = IND) => P([R("\t")], { indent: { left: indent }, tabStops: [{ type: TabStopType.RIGHT, position: W, leader: LeaderType.UNDERSCORE }],
  spacing: { before: first ? 200 : 260, after: 0, line: 300 }, keepNext: keep });
const BLANK = " ".repeat(34);
const blankRuns = (q, ans) => { const [a, b] = q.split("___"); return [R(a), R(ans ? ` ${ans} ` : BLANK, ans ? { bold: true, color: BLUE, underline: {} } : { underline: {} }), R(b || "")]; };
const sum = s => s.groups.reduce((a, g) => a + g.items.reduce((b, i) => b + (i.m || 1), 0), 0);

function header(lvl, title, total) {
  return [
    P([R(`${lvl} · Unit ${UNO} · ${UTITLE}`, { bold: true, color: BLUE, size: 24 })], { spacing: { after: 0 } }),
    P([R(title, { bold: true, color: NAVY, size: 40 }), R(`\t/ ${total}`, { bold: true, color: NAVY, size: 32 })], { tabStops: [{ type: TabStopType.RIGHT, position: W }], spacing: { after: 100 } }),
    P([R("Name: ", { bold: true }), R("\t"), R("   Block: ", { bold: true }), R("\t"), R("   Date: ", { bold: true }), R("\t")],
      { tabStops: [{ type: TabStopType.RIGHT, position: 5200, leader: LeaderType.UNDERSCORE }, { type: TabStopType.RIGHT, position: 6600, leader: LeaderType.UNDERSCORE }, { type: TabStopType.RIGHT, position: W, leader: LeaderType.UNDERSCORE }], spacing: { before: 120, after: 120 } }),
    P([R("Marked by: ", { bold: true, color: GREY, size: 22 }), R("\t")], { tabStops: [{ type: TabStopType.RIGHT, position: 5200, leader: LeaderType.UNDERSCORE }], spacing: { after: 160 } }) ];
}
const secHead = (s, label) => P([R(`Section ${s.sec} — ${s.title}`, { bold: true, color: BLUE, size: 30 }), R(`\t____ / ${s.outOf}`, { bold: true, color: NAVY, size: 26 })],
  { tabStops: [{ type: TabStopType.RIGHT, position: W }], spacing: { before: 320, after: 40 }, keepNext: true });

function section(s, key) {
  const ps = []; let base = 0;   // numbering runs on across a section's groups
  // Part B starts at its first section (one-level papers whose Part B is sections, not one task)
  if (s.partBHead) ps.push(P([R(`Part B — ${s.partBHead}`, { bold: true, color: NAVY, size: 34 }), R(`\t____ / ${s.partBOut}`, { bold: true, color: NAVY, size: 26 })],
    { tabStops: [{ type: TabStopType.RIGHT, position: W }], spacing: { before: 360, after: 0 }, keepNext: true }));
  ps.push(secHead(s));
  // a reading text printed before the section's questions, paragraphs numbered so answers can cite "paragraph 6"
  if (s.text) { if (s.text.instr) ps.push(P([R(s.text.instr, { italics: true, color: GREY, size: 24 })], { spacing: { after: 100 }, keepNext: true }));
    ps.push(P([R(s.text.title, { bold: true, color: NAVY, size: 28 })], { spacing: { before: 60, after: 80 }, keepNext: true }));
    s.text.paras.forEach((t, i) => ps.push(P([R(String(i + 1), { bold: true, color: BLUE, size: 22 }), R("\t" + t, { size: 25 })],
      { indent: { left: IND, hanging: IND }, tabStops: [{ type: TabStopType.LEFT, position: IND }], spacing: { after: 110, line: 290 } })));
    ps.push(P([], { spacing: { after: 120 } })); }
  s.groups.forEach(g => { const off = base; base += g.items.length;
    if (g.instr) ps.push(P([R(g.instr, { italics: true, color: GREY, size: 24 })], { spacing: { after: 100 }, keepNext: true }));
    if (g.bank) ps.push(box([P([R("Word box:  ", { bold: true, color: NAVY, size: 24 }), R(g.bank.join("   ·   "), { size: 26 })])], PALE),
      P([], { spacing: { after: 60 }, keepNext: true }));
    if (s.para) { ps.push(box([P([R(s.para, { size: 26 })], { spacing: { line: 360 } })]), P([], { spacing: { after: 60 }, keepNext: true }));
      if (key) ps.push(P([R("Fixed: ", { bold: true, color: NAVY }), R(s.fixed.replace(/[\[\]]/g, ""), { color: BLUE })], { spacing: { after: 120 } }));
      else for (let i = 0; i < (g.lines || 6); i++) ps.push(rule(i === 0, i < 1, 0));
      if (key) g.items.forEach((it, k) => ps.push(P([R(`${k + 1}.\t`, { bold: true }), R(`${it.q}  →  `), R(it.a, { bold: true, color: BLUE }), ...(it.note ? [R(`   (${it.note})`, { italics: true, color: GREY, size: 22 })] : [])],
        { indent: { left: IND, hanging: IND }, tabStops: [{ type: TabStopType.LEFT, position: IND }], spacing: { after: 60 } })));
      return; }
    const ex = g.ex;
    if (ex) { const exTag = R("(example)  ", { italics: true, color: "0F7B6C", bold: true, size: 22 });
      if (g.kind === "blank") ps.push(P([R("Ex.\t", { bold: true }), exTag, ...blankRuns(ex.q, ex.a)], { indent: { left: IND, hanging: IND }, tabStops: [{ type: TabStopType.LEFT, position: IND }], spacing: { before: 160, after: 0 }, keepNext: true }));
      else ps.push(P([R("Ex.\t", { bold: true }), exTag, R(ex.q)], { indent: { left: IND, hanging: IND }, tabStops: [{ type: TabStopType.LEFT, position: IND }], spacing: { before: 160, after: 0 }, keepNext: true }),
        P([R(ex.a, { italics: true, color: BLUE })], { indent: { left: IND }, spacing: { before: 100, after: 0 }, keepNext: true })); }
    g.items.forEach((it, k) => { const n = R(`${off + k + 1}.\t`, { bold: true }), mk = (it.m || 1) > 1 ? [R(`   (${it.m} marks)`, { color: GREY, size: 22 })] : [];
      const note = key && it.note ? [R(`   (${it.note})`, { italics: true, color: GREY, size: 22 })] : [];
      if (g.kind === "blank") ps.push(P([n, ...blankRuns(it.q, key ? it.a : null), ...mk, ...note], { indent: { left: IND, hanging: IND }, tabStops: [{ type: TabStopType.LEFT, position: IND }], spacing: { before: 260, after: 0 }, keepNext: k === 0 }));
      else { ps.push(P([n, R(it.q), ...mk], { indent: { left: IND, hanging: IND }, tabStops: [{ type: TabStopType.LEFT, position: IND }], spacing: { before: 260, after: 0 }, keepNext: true }));
        if (key) ps.push(P([R(it.a, { bold: true, color: BLUE }), ...note], { indent: { left: IND }, spacing: { before: 80, after: 0 } }));
        else for (let i = 0; i < (g.lines || 1); i++) ps.push(rule(i === 0, i < (g.lines || 1) - 1 || k === 0)); } });
  });
  return ps;
}

function partB(pb, key) {
  const head = pb.sec ? P([R(`Section ${pb.sec} — ${pb.title}`, { bold: true, color: BLUE, size: 30 }), R(`\t____ / ${pb.out}`, { bold: true, color: NAVY, size: 26 })],
      { tabStops: [{ type: TabStopType.RIGHT, position: W }], spacing: { before: 320, after: 60 }, keepNext: true })
    : P([R("Part B — Writing", { bold: true, color: NAVY, size: 34 }), R(`\t____ / ${pb.out}`, { bold: true, color: NAVY, size: 26 })],
      { tabStops: [{ type: TabStopType.RIGHT, position: W }], spacing: { before: 360, after: 80 }, keepNext: true });
  const ps = [head,
    P([R(pb.task, { bold: true, color: BLUE, size: 30 })], { spacing: { after: 80 }, keepNext: true }),
    P([R(pb.instr || "Write ONE paragraph that answers the question. Choose one side.", { italics: true, color: GREY, size: 24 })], { spacing: { after: 100 }, keepNext: true }),
    box([P([R(pb.mustsLabel || "Your paragraph must have:", { bold: true, color: NAVY, size: 24 })], { spacing: { after: 40 } }),
      ...pb.musts.map(m => P([R("☐  ", { color: BLUE, size: 28 }), R(m, { size: 24 })], { indent: { left: 380, hanging: 380 }, spacing: { after: 30 } }))]) ];
  if (key) ps.push(P([R("One good answer: ", { bold: true, color: NAVY }), R(pb.good, { color: BLUE })], { spacing: { before: 200, line: 320 } }));
  else for (let i = 0; i < pb.lines; i++) ps.push(rule(i === 0, i < 2, 0));
  return ps;
}

// "Check your work" tick boxes after the paragraph (one-level papers), and the rubric printed as the paper's last page
function checkBox(checks) {
  return [P([R("Check your work", { bold: true, color: BLUE, size: 26 })], { spacing: { before: 240, after: 60 }, keepNext: true }),
    box(checks.map(c => P([R("☐  ", { color: BLUE, size: 28 }), R(c, { size: 23 })], { indent: { left: 380, hanging: 380 }, spacing: { after: 30 } })))];
}
function rubricPage(rb, pb) {
  const lvW = 2300, LVFILL = ["F6E3E3", "FBF0DA", "E3F0FB", "D7ECEA"], ps = [];
  ps.push(P([R(rb.title || "How your paragraph is marked", { bold: true, color: NAVY, size: 34 })], { pageBreakBefore: true, spacing: { after: 60 } }));
  if (rb.intro) ps.push(P([R(rb.intro.replace("{out}", pb.out), { italics: true, color: GREY, size: 22 })], { spacing: { after: 140 } }));
  rb.criteria.forEach(c => {
    ps.push(P([R(`${c.code}  \u00B7  ${c.name}`, { bold: true, color: BLUE, size: 24 })], { keepNext: true, spacing: { before: 180, after: 70 } }));
    ps.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [lvW, W - lvW],
      rows: c.d.map((desc, k) => new TableRow({ cantSplit: true, children: [
        new TableCell({ width: { size: lvW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: LVFILL[k], color: "auto" },
          margins: { top: 60, bottom: 60, left: 120, right: 100 }, borders: { top: edge, bottom: edge, left: edge, right: edge },
          children: [P([R(`${rb.levels[k]}${rb.points ? "  ·  " + rb.points[k] : ""}`, { bold: true, size: 20, color: NAVY })], { keepNext: true })] }),
        new TableCell({ width: { size: W - lvW, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 140, right: 120 },
          borders: { top: edge, bottom: edge, left: edge, right: edge },
          children: [P([R(desc, { size: 21 })], { keepNext: k < c.d.length - 1 })] }) ] })) })); });
  return ps;
}

function paper(T, pb, title, key) {
  const body = [...header(T.lvl, title, T.total),
    box([P([R(`Part A — ${D.partALabel || "Words and grammar"}  (${T.partA} marks)   ·   Part B — ${D.partBLabel || "Writing"}  (${T.partB} marks)`, { bold: true, color: NAVY, size: 24 })]),
      P([R(D.intro || "Pencil only. Work alone. Read each section and look at the example first.", { size: 22, color: GREY })])]),
    P([R(`Part A — ${D.partALabel || "Words and grammar"}`, { bold: true, color: NAVY, size: 34 }), R(`\t____ / ${T.partA}`, { bold: true, color: NAVY, size: 26 })],
      { tabStops: [{ type: TabStopType.RIGHT, position: W }], spacing: { before: 280, after: 0 }, keepNext: true }),
    ...T.sections.flatMap(s => section(s, key)), ...partB(pb, key), ...(pb.checks ? checkBox(pb.checks) : []), ...(D.rubric ? rubricPage(D.rubric, pb) : [])];
  return body;
}

function doc(body, headText) {
  return new Document({ styles: { default: { document: { run: { font: FONT, size: 26 } } } },
    sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1000, bottom: 900, left: 1080, right: 1080, header: 500, footer: 450 } } },
      headers: { default: new Header({ children: [P([R(headText, { size: 18, color: GREY })], { alignment: AlignmentType.RIGHT })] }) },
      footers: { default: new Footer({ children: [P([R("Page ", { size: 18, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GREY, font: FONT })], { alignment: AlignmentType.CENTER })] }) },
      children: body }] });
}

fs.mkdirSync(out, { recursive: true });
const NAME = { practice: "PracticeTest", unit: "UnitTest" }, TITLE = { practice: "Practice Test", unit: "Unit Test" };
// sanity: every section's printed out-of equals the marks of its items; Part A + Part B = total
for (const t of ["practice", "unit"]) for (const l of LEVELS) { const T = D[t][l];
  T.sections.forEach(s => { if (sum(s) !== s.outOf) throw new Error(`${t} ${l} Section ${s.sec}: items add to ${sum(s)}, printed /${s.outOf}`); });
  const a = T.sections.filter(s => !s.partB).reduce((x, s) => x + s.outOf, 0), b = T.sections.filter(s => s.partB).reduce((x, s) => x + s.outOf, 0) + D.partB[t][l].out;
  if (a !== T.partA || b !== T.partB || a + b !== T.total) throw new Error(`${t} ${l}: totals do not add up (A ${a}, B ${b})`); }
const jobs = [];
if (WHICH === "key") {
  const body = [];
  ["practice", "unit"].forEach((t, ti) => LEVELS.forEach((l, li) => { const T = D[t][l];
    if (ti + li > 0) body.push(P([], { pageBreakBefore: true }));
    body.push(...paper(T, D.partB[t][l], `${TITLE[t]} — Answer Key`, true)); }));
  jobs.push(Packer.toBuffer(doc(body, KEYHEAD)).then(b => { const f = `${out}/${COURSE}_U0${UNO}_TestKeys_${VER}.docx`; fs.writeFileSync(f, b); console.log("key", path.basename(f)); }));
} else {
  LEVELS.forEach(l => { const T = D[WHICH][l];
    jobs.push(Packer.toBuffer(doc(paper(T, D.partB[WHICH][l], TITLE[WHICH], false), `${T.lvl} · Unit ${UNO} · ${TITLE[WHICH]}  ·  Room 148`))
      .then(b => { const f = `${out}/${COURSE}_U0${UNO}_${NAME[WHICH]}_${VER}${LEVELS.length > 1 ? "_" + l : ""}.docx`; fs.writeFileSync(f, b); console.log("paper", path.basename(f)); })); });
}
Promise.all(jobs);
