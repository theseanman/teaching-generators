const fs = require("fs");
const path = require("path");
const LESSON = require(path.resolve(process.argv[2])), COURSE = require(path.resolve(__dirname, "courses", LESSON.course + ".js"));
const THEME = require("./theme");
const M = LESSON.meta, D = Object.assign({ course: COURSE.code, unit: M.unit, lesson: M.lesson, month: M.month, unitTitle: M.unitTitle, title: M.title }, LESSON.worksheet);
const VER = process.argv[4] || "v1";
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  TabStopType, LeaderType, Header, Footer, AlignmentType, PageNumber } = require("docx");
const { NAVY, BLUE, TEAL, PALE, PALE2, GREY, INK, FONT } = THEME.color ? Object.assign({ FONT: THEME.font }, THEME.color) : THEME;
const W = 10080, IND = 440, SZ = 28; // 14pt
const out = process.argv[3] || "out"; fs.mkdirSync(out, { recursive: true });
const manifest = []; // every underscore leader in document order: {part, slot, kind}
const R = (text, o = {}) => new TextRun({ text, font: FONT, size: SZ, color: INK, ...o });
const P = (children, o = {}) => new Paragraph({ children, keepLines: true, ...o });
const lead = (pos) => [{ type: TabStopType.RIGHT, position: pos, leader: LeaderType.UNDERSCORE }];
const LINE_GAP = 300; // twips before each writing line: real handwriting height
const box = (children, fill = PALE2, color = "90B4D8") => new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: [W],
  rows: [new TableRow({ cantSplit: true, children: [new TableCell({ width: { size: W, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill, color: "auto" },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    borders: { top: { style: BorderStyle.SINGLE, size: 8, color }, bottom: { style: BorderStyle.SINGLE, size: 8, color },
      left: { style: BorderStyle.SINGLE, size: 8, color }, right: { style: BorderStyle.SINGLE, size: 8, color } },
    children })] })] });

const body = [];
body.push(P([R(`${D.course} \u00B7 Unit ${D.unit} \u00B7 ${D.month}`, { bold: true, color: BLUE, size: 24 })], { spacing: { after: 0 } }));
body.push(P([R(`${D.unitTitle}: Lesson ${D.lesson} Worksheet`, { bold: true, color: NAVY, size: 40 })], { spacing: { after: 0 } }));
body.push(P([R(D.title, { italics: true, color: GREY, size: 24 })], { spacing: { after: 120 } }));
body.push(P([R("Name: ", { bold: true }), R("\t"), R("   Date: ", { bold: true }), R("\t")],
  { tabStops: [{ type: TabStopType.RIGHT, position: 6500, leader: LeaderType.UNDERSCORE }, { type: TabStopType.RIGHT, position: W, leader: LeaderType.UNDERSCORE }],
    spacing: { before: 120, after: 240 } }));
manifest.push({ part: "_", slot: "name" }, { part: "_", slot: "date" });
body.push(box([
  P([R("Goal for this lesson", { bold: true, color: NAVY, size: 24 })], { spacing: { after: 40 } }),
  P([R(D.objective, { size: 24 })], { spacing: { after: 80 } }),
  P([R("Learning outcomes:  ", { bold: true, color: NAVY, size: 22 }), R(D.outcomes, { size: 22 })]) ]));

function heading(part) {
  return [
    P([R(`Part ${part.id} \u2014 ${part.title}`, { bold: true, color: BLUE, size: 32 })], { spacing: { before: 280, after: 20 }, keepNext: true }),
    P([R(part.instr, { italics: true, color: GREY, size: 24 })], { spacing: { after: 140 }, keepNext: true }) ];
}
const numRun = (n) => R(n, { bold: true });
const hang = { left: IND, hanging: IND };
function writingLines(n, partId, slot, keepLast, gap = LINE_GAP, glueFirst = Infinity, indent = IND) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    const keep = i < glueFirst && !(keepLast === false && i === n - 1);
    arr.push(P([R("\t")], { indent: { left: indent }, tabStops: lead(W), spacing: { before: gap, after: 0 }, keepNext: keep }));
    manifest.push({ part: partId, slot, line: i });
  }
  return arr;
}
let blocks = [];
for (const part of D.parts) {
  const ps = [...heading(part)];
  if (part.bank) {
    const cols = 3, cw = W / cols, rows = [];
    for (let r = 0; r < part.bank.length / cols; r++) rows.push(new TableRow({ cantSplit: true, children: part.bank.slice(r * cols, r * cols + cols).map(w => new TableCell({
      width: { size: cw, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: PALE, color: "auto" },
      margins: { top: 90, bottom: 90, left: 140, right: 140 },
      borders: { top: { style: BorderStyle.SINGLE, size: 6, color: "90B4D8" }, bottom: { style: BorderStyle.SINGLE, size: 6, color: "90B4D8" }, left: { style: BorderStyle.SINGLE, size: 6, color: "90B4D8" }, right: { style: BorderStyle.SINGLE, size: 6, color: "90B4D8" } },
      children: [P([R(w, { bold: true, strike: part.crossed.includes(w), color: part.crossed.includes(w) ? GREY : NAVY })], { alignment: AlignmentType.CENTER, keepNext: true })] })) }));
    ps.push(P([R("Word bank", { bold: true, color: BLUE, size: 24 })], { keepNext: true, spacing: { after: 60 } }));
    ps.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: Array(cols).fill(cw), rows }));
  }
  if (part.box) {
    ps.push(box([ P([R(part.box.title, { bold: true, color: NAVY, size: 24 })], { spacing: { after: 40 } }),
      P([R(part.box.body, { size: 24 })], { spacing: { after: 60 } }), P([R(part.box.frame, { italics: true, size: 24, color: NAVY })]) ], "FFF6E0", "E0B252"));
    ps.push(P([], { spacing: { after: 80 }, keepNext: true }));
  }
  const exTag = R("(example)  ", { italics: true, color: TEAL, size: 24, bold: true });
  if (part.kind === "cloze") {
    const tabs = lead(9900);
    const ex = part.example;
    ps.push(P([numRun("Ex.\t"), exTag, R(ex.text + " "), R(" " + ex.ans + " ", { color: BLUE, italics: true, bold: true, underline: {} }), R("\t"), R(ex.tail)],
      { indent: hang, tabStops: [{ type: TabStopType.LEFT, position: IND }, ...tabs], spacing: { before: 180, after: 0 }, keepNext: true }));
    manifest.push({ part: part.id, slot: "ex" });
    part.items.forEach((it, i) => {
      ps.push(P([numRun(`${i + 1}.\t`), R(it.text + " "), R("\t"), R(it.tail)],
        { indent: hang, tabStops: [{ type: TabStopType.LEFT, position: IND }, ...tabs], spacing: { before: 230, after: 0 }, keepNext: i < part.items.length - 1 }));
      manifest.push({ part: part.id, slot: i });
    });
  } else if (part.kind === "lines" || part.kind === "exit") {
    const perItemGlue = part.kind === "lines"; // long written Parts glue per question; short Parts move as a whole
    const all = part.example ? [{ ex: true, ...part.example }, ...part.items] : part.items;
    all.forEach((it, i) => {
      const last = i === all.length - 1;
      const label = it.ex ? "Ex.\t" : `${part.example ? i : i + 1}.\t`;
      ps.push(P([numRun(label), ...(it.ex ? [exTag] : []), R(it.text)], { indent: hang, tabStops: [{ type: TabStopType.LEFT, position: IND }], spacing: { before: 260, after: 0 }, keepNext: true }));
      if (it.ex) {
        ps.push(P([R(it.ans, { color: BLUE, italics: true })], { indent: { left: IND }, spacing: { before: 120, after: 0 }, keepNext: !last }));
      } else {
        ps.push(...writingLines(it.lines || part.lines, part.id, part.example ? i - 1 : i, perItemGlue ? false : !last ? undefined : false));
      }
    });
  } else if (part.kind === "open") {
    if (part.example) ps.push(P([numRun("Ex.\t"), exTag, R(part.example.ans, { color: BLUE, italics: true })], { indent: hang, tabStops: [{ type: TabStopType.LEFT, position: IND }], spacing: { before: 200, after: 0 }, keepNext: true }));
    // long writing spaces (e.g. a full composition) flow across pages: only the heading and first lines are glued
    const long = part.lines > 14;
    ps.push(...writingLines(part.lines, part.id, "open", false, part.gap || LINE_GAP, long ? 3 : Infinity, part.example ? IND : 0));
  } else if (part.kind === "check") {
    const cw = W / 2, rows = [];
    for (let r = 0; r < part.checks.length / 2; r++) rows.push(new TableRow({ cantSplit: true, children: [0, 1].map(c => {
      const t = part.checks[r * 2 + c] || "";
      return new TableCell({ width: { size: cw, type: WidthType.DXA }, margins: { top: 110, bottom: 110, left: 120, right: 120 },
        borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
        children: [P(t ? [R("\u2610  ", { size: 32, color: BLUE }), R(t, { size: 24 })] : [], { keepNext: true, indent: { left: 400, hanging: 400 } })] }); }) }));
    ps.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [cw, cw], rows }));
  }
  blocks.push(...ps);
}
body.push(...blocks);
body.push(P([], { spacing: { after: 0 } }));
const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: SZ } } } },
  sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1000, bottom: 900, left: 1080, right: 1080, header: 500, footer: 450 } } },
    headers: { default: new Header({ children: [P([R(`${D.course} \u00B7 Unit ${D.unit} \u00B7 Lesson ${D.lesson} Worksheet  \u00B7  Room ${COURSE.room}`, { size: 18, color: GREY })], { alignment: AlignmentType.RIGHT })] }) },
    footers: { default: new Footer({ children: [P([R("Page ", { size: 18, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GREY, font: FONT })], { alignment: AlignmentType.CENTER })] }) },
    children: body }] });
Packer.toBuffer(doc).then(b => { fs.writeFileSync(`${out}/${THEME.fileName(COURSE, M, "Worksheet", VER)}.docx`, b);
  fs.writeFileSync(`${out}/manifest.json`, JSON.stringify(manifest)); console.log("ok", manifest.length); });
