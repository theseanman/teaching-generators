const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, TabStopType, LeaderType, HeightRule } = require("docx");
const NAVY = "0B2C4D", BLUE = "1565C0", TEAL = "00897B", PALE = "E3F0FB", INK = "1F2933", GREY = "5F6B7A", FONT = "Calibri";
const M = 720, TW = 12240 - 2 * M, CW = TW / 2, RH = 6950;
const path = require("path"); const COURSE = require(path.resolve(__dirname, "courses", process.argv[2] + ".js"));
const out = process.argv[3]; fs.mkdirSync(out, { recursive: true });
const R = (t, o = {}) => new TextRun({ text: t, font: FONT, size: 22, color: INK, ...o });
const IW = CW - 2 * 260;
const lineP = (label, before = 300) => new Paragraph({ spacing: { before, after: 0 }, tabStops: [{ type: TabStopType.RIGHT, position: IW, leader: LeaderType.UNDERSCORE }], children: [R(label, { bold: true, color: NAVY }), R("\t")] });
const cut = { style: BorderStyle.DASHED, size: 8, color: "8A97A8" };
function slip() {
  const reply = new Table({ width: { size: IW, type: WidthType.DXA }, columnWidths: [IW], rows: [new TableRow({ height: { value: 1500, rule: HeightRule.ATLEAST }, children: [new TableCell({
    width: { size: IW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: PALE, color: "auto" }, margins: { top: 80, left: 120, right: 120, bottom: 80 },
    borders: { top: { style: BorderStyle.SINGLE, size: 8, color: BLUE }, bottom: { style: BorderStyle.SINGLE, size: 8, color: BLUE }, left: { style: BorderStyle.SINGLE, size: 8, color: BLUE }, right: { style: BorderStyle.SINGLE, size: 8, color: BLUE } },
    children: [new Paragraph({ children: [R(`${COURSE.teacher} says:`, { bold: true, color: BLUE })] })] })] })] });
  return [
    new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: IW }], spacing: { after: 40 }, children: [R("HELP SLIP", { bold: true, color: TEAL, size: 30, characterSpacing: 40 }), R(`\t${COURSE.code} \u00B7 Room ${COURSE.room}`, { color: BLUE, size: 20 })] }),
    new Paragraph({ spacing: { after: 60 }, children: [R(COURSE.helpSlip.tagline, { italics: true, color: GREY, size: 20 })] }),
    new Paragraph({ spacing: { before: 200 }, tabStops: [{ type: TabStopType.RIGHT, position: 2900, leader: LeaderType.UNDERSCORE }, { type: TabStopType.RIGHT, position: IW, leader: LeaderType.UNDERSCORE }],
      children: [R("Name ", { bold: true, color: NAVY }), R("\t"), R("  Date ", { bold: true, color: NAVY }), R("\t")] }),
    new Paragraph({ spacing: { before: 280, after: 60 }, children: [R("Can you check my \u2026", { bold: true, color: NAVY })] }),
    new Paragraph({ spacing: { after: 0 }, children: [R("\u2610 spelling    \u2610 sentence    \u2610 word    \u2610 idea", { size: 24 })] }),
    lineP("I need help with ", 340),
    new Paragraph({ spacing: { before: 280, after: 0 }, children: [R("My question:", { bold: true, color: NAVY })] }),
    lineP("", 330), lineP("", 330),
    new Paragraph({ spacing: { before: 220, after: 0 }, children: [] }),
    reply ];
}
const cell = () => new TableCell({ width: { size: CW, type: WidthType.DXA }, margins: { top: 240, bottom: 120, left: 260, right: 260 },
  borders: { top: cut, bottom: cut, left: cut, right: cut }, children: slip() });
const t = new Table({ width: { size: TW, type: WidthType.DXA }, columnWidths: [CW, CW],
  rows: [0, 1].map(() => new TableRow({ cantSplit: true, height: { value: RH, rule: HeightRule.EXACT }, children: [cell(), cell()] })) });
const doc = new Document({ sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: M, bottom: 400, left: M, right: M } } }, children: [t] }] });
Packer.toBuffer(doc).then(b => { fs.writeFileSync(`${out}/${COURSE.code}_HelpSlip_4perPage_v1.docx`, b); console.log("ok"); });
