// One-page GOOD COPY sheet per level (Sean's term: "good copy", never "clean copy").
// Usage: node make_goodcopy.js lessons/<LESSON>.js out/<DIR> [version]
// Reads LESSON.goodCopy = [{ lvl, suffix, lines, steps, checks[] }]. Same look as make_worksheet.js:
// Letter, full-width boxes (10080 dxa), underscore-leader writing lines (never paragraph borders).
const fs = require("fs"), path = require("path");
const LESSON = require(path.resolve(process.argv[2])), COURSE = require(path.resolve(__dirname, "courses", LESSON.course + ".js"));
const THEME = require("./theme");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  TabStopType, LeaderType, Header, AlignmentType } = require("docx");
const { NAVY, BLUE, PALE2, GREY, INK, FONT } = THEME.color ? Object.assign({ FONT: THEME.font }, THEME.color) : THEME;
const M = LESSON.meta, out = process.argv[3] || "out", VER = process.argv[4] || "v1", W = 10080;
const R = (text, o = {}) => new TextRun({ text, font: FONT, size: 28, color: INK, ...o });
const P = (children, o = {}) => new Paragraph({ children, keepLines: true, ...o });
const edge = { style: BorderStyle.SINGLE, size: 8, color: "90B4D8" }, nil = { style: BorderStyle.NIL };
const box = children => new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W],
  rows: [new TableRow({ cantSplit: true, children: [new TableCell({ width: { size: W, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: PALE2, color: "auto" }, margins: { top: 110, bottom: 110, left: 160, right: 160 },
    borders: { top: edge, bottom: edge, left: edge, right: edge }, children })] })] });
const line = (before) => P([R("\t")], { tabStops: [{ type: TabStopType.RIGHT, position: W, leader: LeaderType.UNDERSCORE }], spacing: { before, after: 0 } });

fs.mkdirSync(out, { recursive: true });
const base = THEME.fileName(COURSE, M, "GoodCopy", VER);
Promise.all(LESSON.goodCopy.map(g => {
  const body = [
    P([R(`${g.lvl} · Unit ${M.unit} · ${M.unitTitle}`, { bold: true, color: BLUE, size: 24 })], { spacing: { after: 0 } }),
    P([R("My Place: Good Copy", { bold: true, color: NAVY, size: 40 })], { spacing: { after: 100 } }),
    P([R("Name: ", { bold: true }), R("\t"), R("   Date: ", { bold: true }), R("\t")],
      { tabStops: [{ type: TabStopType.RIGHT, position: 6500, leader: LeaderType.UNDERSCORE }, { type: TabStopType.RIGHT, position: W, leader: LeaderType.UNDERSCORE }], spacing: { before: 80, after: 200 } }),
    box([P([R("How to write it:  ", { bold: true, color: NAVY, size: 24 }), R(g.steps, { size: 24 })])]),
    P([R("Title: ", { bold: true }), R("\t")], { tabStops: [{ type: TabStopType.RIGHT, position: W, leader: LeaderType.UNDERSCORE }], spacing: { before: 300, after: 0 } }),
    ...Array.from({ length: g.lines }, () => line(g.gap || 330)) ];
  const cw = W / 2, rows = [];
  for (let r = 0; r < g.checks.length / 2; r++) rows.push(new TableRow({ cantSplit: true, children: [0, 1].map(c => {
    const t = g.checks[r * 2 + c] || "";
    return new TableCell({ width: { size: cw, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
      borders: { top: nil, bottom: nil, left: nil, right: nil },
      children: [P(t ? [R("☐  ", { size: 30, color: BLUE }), R(t, { size: 22 })] : [], { indent: { left: 380, hanging: 380 } })] }); }) }));
  body.push(P([R("Before you hand it in", { bold: true, color: BLUE, size: 26 })], { spacing: { before: 260, after: 40 }, keepNext: true }));
  body.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [cw, cw], rows }));
  const doc = new Document({ styles: { default: { document: { run: { font: FONT, size: 28 } } } },
    sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 900, bottom: 700, left: 1080, right: 1080, header: 450, footer: 400 } } },
      headers: { default: new Header({ children: [P([R(`${g.lvl} · Unit ${M.unit} · Lesson ${M.lesson} Good Copy  ·  Room ${COURSE.room}`, { size: 18, color: GREY })], { alignment: AlignmentType.RIGHT })] }) },
      children: body }] });
  return Packer.toBuffer(doc).then(b => { const f = `${out}/${base}_${g.suffix}.docx`; fs.writeFileSync(f, b); console.log("good copy", path.basename(f)); });
}));
