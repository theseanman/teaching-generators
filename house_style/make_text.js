// PRINTED TEXT HANDOUT: a class text as a paper copy, one per student, paragraphs numbered so students can cite
// "paragraph 6" as evidence. Opt-in: LESSON.printText = "<key in LESSON.texts>".
// Same look as make_worksheet.js: Letter, Calibri, full-width box (10080 dxa), navy title, blue numbers.
// Usage: node make_text.js lessons/<LESSON>.js out/<DIR> [version]      (exits quietly if the lesson has no printText)
const fs = require("fs"), path = require("path");
const LESSON = require(path.resolve(process.argv[2]));
if (!LESSON.printText) process.exit(0);
const COURSE = require(path.resolve(__dirname, "courses", LESSON.course + ".js"));
const THEME = require("./theme");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  Header, Footer, AlignmentType, PageNumber } = require("docx");
const { NAVY, BLUE, PALE2, PALE, GREY, INK } = THEME.color, FONT = THEME.font;
const M = LESSON.meta, TX = LESSON.texts[LESSON.printText], out = process.argv[3] || "out", VER = process.argv[4] || "v1", W = 10080;
const unit = TX.unit || "paragraph";
const R = (text, o = {}) => new TextRun({ text, font: FONT, size: 26, color: INK, ...o });
const P = (children, o = {}) => new Paragraph({ children, ...o });
const edge = { style: BorderStyle.SINGLE, size: 8, color: "90B4D8" };
const cell = (children, w, fill) => new TableCell({ width: { size: w, type: WidthType.DXA }, children,
  shading: fill ? { type: ShadingType.CLEAR, fill, color: "auto" } : undefined,
  margins: { top: 90, bottom: 90, left: 140, right: 140 }, borders: { top: edge, bottom: edge, left: edge, right: edge } });

const body = [
  P([R(`${COURSE.name} · Unit ${M.unit} · ${M.unitTitle} · Lesson ${M.lesson}`, { bold: true, color: BLUE, size: 24 })], { spacing: { after: 0 } }),
  P([R(TX.title, { bold: true, color: NAVY, size: 44 })], { spacing: { after: 160 } }),
  new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ cantSplit: true, children: [cell([
    P([R("Before you read", { bold: true, color: NAVY, size: 24 })], { spacing: { after: 40 } }),
    P([R(TX.before || `Read the whole story once without stopping. Then read it again with a pencil and star every comparison you find. The numbers down the left are ${unit} numbers: “${unit} 6” is a complete answer to “where?”`, { size: 24 })])
  ], W, PALE2)] })] }),
  P([], { spacing: { after: 120 } }),
  ...TX.lines.map((l, i) => P([R(String(i + 1), { bold: true, color: BLUE, size: 22 }), R("\t" + l)],
    { indent: { left: 560, hanging: 560 }, tabStops: [{ type: "left", position: 560 }], spacing: { after: 150, line: 300 }, keepLines: true }))];
if (TX.words && TX.words.length) {
  const a = 2600, b = W - a;
  body.push(P([R("Words in this story", { bold: true, color: BLUE, size: 28 })], { spacing: { before: 280, after: 80 }, keepNext: true }));
  body.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [a, b], rows: TX.words.map(w => new TableRow({ cantSplit: true, children: [
    cell([P([R(w[0], { bold: true, color: NAVY, size: 24 })])], a, PALE), cell([P([R(w[1], { size: 24 })])], b)] })) }));
}
const doc = new Document({ sections: [{
  properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1000, bottom: 900, left: 1080, right: 1080 } } },
  headers: { default: new Header({ children: [P([R(`${COURSE.code} · Unit ${M.unit} · Lesson ${M.lesson} Story · Room ${COURSE.room}`, { size: 16, color: GREY })], { alignment: AlignmentType.RIGHT })] }) },
  footers: { default: new Footer({ children: [P([R("Page ", { size: 16, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: GREY })], { alignment: AlignmentType.CENTER })] }) },
  children: body }] });
fs.mkdirSync(out, { recursive: true });
const file = path.join(out, THEME.fileName(COURSE, M, "Story", VER) + ".docx");
Packer.toBuffer(doc).then(b => { fs.writeFileSync(file, b); console.log("story handout: " + path.basename(file)); });
