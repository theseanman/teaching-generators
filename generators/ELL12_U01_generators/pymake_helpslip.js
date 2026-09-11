const fs = require("fs"), path = require("path");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, TabStopType, LeaderType } = require("docx");
const { COURSE } = require("./content.js");
const NAVY = "0B2C4D", BLUE = "1565C0", PALE = "E3F0FB", PALE2 = "F3F8FD", MID = "BBDEFB", INK = "1F2933", FONT = "Calibri", TEAL = "00897B";
const PAGE_W = 12240, PAGE_H = 15840, MARGIN = 720, TEXT_W = PAGE_W - 2 * MARGIN;
const outDir = process.argv[2]; fs.mkdirSync(outDir, { recursive: true });
const cut = { style: BorderStyle.DASHED, size: 6, color: "9CA3AF" };
const nil = { style: BorderStyle.NIL };
const W = 4680; // usable slip width in dxa
const line = (label, n = 1, w = 30) => new Paragraph({ spacing: { before: 380, after: 0 }, tabStops: [{ type: TabStopType.RIGHT, position: W, leader: LeaderType.UNDERSCORE }], children: [new TextRun({ text: label, font: FONT, size: 22, bold: true, color: NAVY }), new TextRun({ text: "\t", font: FONT, size: 22 })] });
const ruled = () => new Paragraph({ spacing: { before: 330, after: 0 }, indent: { left: 240 }, tabStops: [{ type: TabStopType.RIGHT, position: W, leader: LeaderType.UNDERSCORE }], children: [new TextRun({ text: "\t", font: FONT, size: 22 })] });
function slip() {
  const kids = [];
  kids.push(new Paragraph({ spacing: { after: 60 }, tabStops: [{ type: TabStopType.RIGHT, position: 5100 }], children: [
    new TextRun({ text: "HELP SLIP", font: FONT, size: 26, bold: true, color: TEAL, characterSpacing: 40 }),
    new TextRun({ text: "\t" + COURSE.code + " \u2022 Room " + COURSE.room, font: FONT, size: 18, color: BLUE })] }));
  kids.push(new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Stuck? Ask. Asking for help with editing is a skill.", font: FONT, size: 20, italics: true, color: "6B7280" })] }));
  kids.push(new Paragraph({ spacing: { after: 0 }, tabStops: [{ type: TabStopType.RIGHT, position: 2900, leader: LeaderType.UNDERSCORE }, { type: TabStopType.LEFT, position: 3100 }, { type: TabStopType.RIGHT, position: W, leader: LeaderType.UNDERSCORE }], children: [
    new TextRun({ text: "Name ", font: FONT, size: 22, bold: true, color: NAVY }), new TextRun({ text: "\t\t", font: FONT, size: 22 }),
    new TextRun({ text: "Date ", font: FONT, size: 22, bold: true, color: NAVY }), new TextRun({ text: "\t", font: FONT, size: 22 })] }));
  kids.push(new Paragraph({ spacing: { before: 300, after: 80 }, children: [new TextRun({ text: "Can you check my \u2026", font: FONT, size: 22, bold: true, color: NAVY })] }));
  kids.push(new Paragraph({ spacing: { after: 0 }, indent: { left: 240 }, children: ["spelling", "sentence", "word", "idea"].map(t => new TextRun({ text: "\u2610 " + t + "     ", font: FONT, size: 22, color: INK })) }));
  kids.push(line("I need help with ", 1, 26));
  kids.push(new Paragraph({ spacing: { before: 300, after: 0 }, children: [new TextRun({ text: "My question:", font: FONT, size: 22, bold: true, color: NAVY })] }));
  kids.push(ruled()); kids.push(ruled());
  // teacher box
  kids.push(new Paragraph({ spacing: { before: 200, after: 0 }, children: [] }));
  kids.push(new Table({ width: { size: 5100, type: WidthType.DXA }, columnWidths: [5100], rows: [new TableRow({ height: { value: 1800, rule: "atLeast" }, children: [new TableCell({ width: { size: 5100, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: PALE2, color: "auto" }, borders: { top: { style: BorderStyle.SINGLE, size: 6, color: MID }, bottom: { style: BorderStyle.SINGLE, size: 6, color: MID }, left: { style: BorderStyle.SINGLE, size: 24, color: TEAL }, right: { style: BorderStyle.SINGLE, size: 6, color: MID } }, margins: { top: 60, bottom: 60, left: 120, right: 80 },
    children: [new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: "MR. REID SAYS", font: FONT, size: 16, bold: true, color: TEAL, characterSpacing: 40 })] })] })] })] }));
  return kids;
}
function cell(content, bordersSpec) {
  return new TableCell({ width: { size: TEXT_W / 2, type: WidthType.DXA }, borders: bordersSpec, margins: { top: 160, bottom: 120, left: 220, right: 220 }, children: content });
}
const half = TEXT_W / 2;
const rows = [
  new TableRow({ height: { value: 6900, rule: "exact" }, cantSplit: true, children: [
    cell(slip(), { top: nil, left: nil, bottom: cut, right: cut }), cell(slip(), { top: nil, left: nil, bottom: cut, right: nil })] }),
  new TableRow({ height: { value: 6900, rule: "exact" }, cantSplit: true, children: [
    cell(slip(), { top: nil, left: nil, bottom: nil, right: cut }), cell(slip(), { top: nil, left: nil, bottom: nil, right: nil })] })
];
const doc = new Document({ creator: COURSE.teacher, styles: { default: { document: { run: { font: FONT, size: 22, color: INK } } } },
  sections: [{ properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
    children: [new Table({ width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [half, half], rows }),
      new Paragraph({ spacing: { before: 0, after: 0, line: 20, lineRule: "exact" }, children: [new TextRun({ text: "", size: 2 })] })] }] });
Packer.toBuffer(doc).then(buf => { const name = `${COURSE.code}_U01_HelpSlip_4perPage_v1.docx`; fs.writeFileSync(path.join(outDir, name), buf); console.log("wrote", name); });
