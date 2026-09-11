const fs = require("fs"), path = require("path");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, ShadingType, BorderStyle, TabStopType, PageBreak } = require("docx");
const { COURSE, CLASS_TEXT, TEXT_SENTENCES } = require("./content.js");
const NAVY = "0B2C4D", BLUE = "1565C0", PALE = "E3F0FB", PALE2 = "F3F8FD", MID = "BBDEFB", INK = "1F2933", FONT = "Calibri";
const PAGE_W = 12240, MARGIN = 1080, TEXT_W = PAGE_W - 2 * MARGIN;
const outDir = process.argv[2]; fs.mkdirSync(outDir, { recursive: true });
const sect = (children) => ({ properties: { page: { size: { width: PAGE_W, height: 15840 }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } }, children });
const hdr = (right) => new Paragraph({ spacing: { after: 40 }, tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W }], children: [new TextRun({ text: `${COURSE.code}  \u2022  Unit ${COURSE.unit}: ${COURSE.unitTitle}`, font: FONT, size: 20, color: BLUE }), new TextRun({ text: "\t" + right, font: FONT, size: 20, bold: true, color: BLUE })] });
const title = (t) => new Paragraph({ spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BLUE, space: 4 } }, children: [new TextRun({ text: t, font: FONT, size: 44, bold: true, color: NAVY })] });

async function classText(level) {
  const ct = CLASS_TEXT[level];
  const kids = [hdr(`Class text \u2022 ${level}`), title(ct.title)];
  kids.push(new Paragraph({ spacing: { after: 240 }, children: [new TextRun({ text: level === "1A" ? "Read it three times: once to yourself, once out loud, once to a partner." : "Read it twice. The second time, notice what you can see, hear, smell and taste.", font: FONT, size: 22, italics: true, color: "6B7280" })] }));
  for (const p of ct.paras) kids.push(new Paragraph({ spacing: { after: 240, line: level === "1A" ? 480 : 400 }, children: [new TextRun({ text: p, font: FONT, size: level === "1A" ? 32 : 28, color: INK })] }));
  if (level === "2A") {
    kids.push(new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: "The same text, one sentence per line", font: FONT, size: 24, bold: true, color: BLUE })] }));
    TEXT_SENTENCES.forEach((s, i) => kids.push(new Paragraph({ spacing: { after: 80, line: 300 }, indent: { left: 540, hanging: 420 }, children: [new TextRun({ text: `${i + 1}.  `, font: FONT, size: 24, bold: true, color: BLUE }), new TextRun({ text: s, font: FONT, size: 24, color: INK })] })));
  } else {
    kids.push(new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: "Words to know", font: FONT, size: 24, bold: true, color: BLUE })] }));
    [["kitchen", "the room where a family cooks"], ["grandmother", "your mother\u2019s or father\u2019s mother"], ["smells good", "your nose likes it"], ["loud", "not quiet; a big sound"], ["happy", "you feel good"]].forEach(([w, m]) =>
      kids.push(new Paragraph({ spacing: { after: 60 }, indent: { left: 540 }, children: [new TextRun({ text: w + "  ", font: FONT, size: 24, bold: true, color: NAVY }), new TextRun({ text: m, font: FONT, size: 24, color: INK })] })));
  }
  const doc = new Document({ creator: COURSE.teacher, styles: { default: { document: { run: { font: FONT, size: 24, color: INK } } } }, sections: [sect(kids)] });
  const name = `${COURSE.code}_U01_ClassText_${ct.title.replace(/[^A-Za-z]/g, "")}_${level}_v1.docx`;
  fs.writeFileSync(path.join(outDir, name), await Packer.toBuffer(doc)); console.log("wrote", name);
}

async function linedPage() {
  const kids = [];
  // header box, right-aligned table
  const labels = ["Full name", "Student number", "Grade", "ELL level", "Date"];
  const boxW = 4600;
  const rows = labels.map(l => new TableRow({ cantSplit: true, children: [
    new TableCell({ width: { size: 1800, type: WidthType.DXA }, borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } }, margins: { top: 60, bottom: 60, left: 100 }, children: [new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: l + ":", font: FONT, size: 22, bold: true, color: NAVY })] })] }),
    new TableCell({ width: { size: boxW - 1800, type: WidthType.DXA }, borders: { top: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.SINGLE, size: 6, color: "6B7280" } }, margins: { top: 60, bottom: 20 }, children: [new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: " ", font: FONT, size: 22 })] })] })
  ] }));
  kids.push(new Table({ alignment: AlignmentType.RIGHT, width: { size: boxW, type: WidthType.DXA }, columnWidths: [1800, boxW - 1800], rows }));
  kids.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "September Writing Sample", font: FONT, size: 28, bold: true, color: NAVY })] }));
  kids.push(new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Blue or black pen. Write on the white lines only \u2014 leave every shaded line empty (double-spacing).", font: FONT, size: 20, italics: true, color: "6B7280" })] }));
  const lineTable = (n) => new Table({ width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [TEXT_W], rows: Array.from({ length: n }, (_, i) => new TableRow({ height: { value: 400, rule: "exact" }, cantSplit: true, children: [new TableCell({ width: { size: TEXT_W, type: WidthType.DXA }, shading: i % 2 === 1 ? { type: ShadingType.CLEAR, fill: PALE2, color: "auto" } : undefined, borders: { top: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.SINGLE, size: 4, color: "9CA3AF" } }, margins: { top: 0, bottom: 0 }, children: [new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: " ", font: FONT, size: 20 })] })] })] })) });
  kids.push(lineTable(24));
  kids.push(new Paragraph({ children: [new PageBreak()] }));
  kids.push(new Paragraph({ spacing: { after: 160 }, tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W }], children: [new TextRun({ text: "September Writing Sample \u2014 page 2", font: FONT, size: 20, color: BLUE }), new TextRun({ text: "\tName: ______________________", font: FONT, size: 20, color: BLUE })] }));
  kids.push(lineTable(30));
  const doc = new Document({ creator: COURSE.teacher, sections: [sect(kids)] });
  const name = `${COURSE.code}_U01_L03_WritingSample_LinedPage_v1.docx`;
  fs.writeFileSync(path.join(outDir, name), await Packer.toBuffer(doc)); console.log("wrote", name);
}
(async () => { await classText("2A"); await classText("1A"); await linedPage(); })();
