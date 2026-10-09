// make_worksheets.js — ENG8 U1 worksheets (docx).
//
// v13 (Oct 9 2026) — brought up to the worksheet standing orders:
//   * The OBJECTIVE prints at the top of every sheet.
//   * The FIRST ITEM OF EVERY PART is a completed worked "(example)" showing the
//     complexity required — authored as `example:` on the Part's section block.
//   * A word used in an example is CROSSED OUT in that Part's word bank, with a
//     note to cross each word off as it is used.
//   * Every sheet ENDS with a tick-box "Check" Part restating that sheet's
//     outcomes in student language, in two columns.
//   * Support and Stretch come OUT of the core sheet and print as their own
//     companion sheets (core tier only in any PowerPoint).
//   * Every box, table, banner, word bank and the Name/Date header spans the
//     full usable width (10080 dxa). Writing space uses underscore-leader tab
//     stops, never paragraph borders.
const fs = require("fs");
const path = require("path");
const D = require("docx");
const { Document, Packer, Paragraph, TextRun, BorderStyle, ShadingType, WidthType,
        Table, TableRow, TableCell, AlignmentType, TabStopType, LeaderType } = D;
const CONTENT_W = 10080; // true usable width (Letter 12240 - 1080 - 1080 margins)
const FULL = CONTENT_W;
const H = require("./docxhelp.js");
const { WORKSHEETS } = require("./u1_worksheets.js");
const { UNIT, LESSONS } = require("./u1_content.js");

const OUT = process.argv[2] || path.join(__dirname, "..", "out");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
const sectionProps = { page: { size: H.LETTER.size, margin: H.MARGINS } };

const noB = () => { const n = { style: BorderStyle.NONE }; return { top: n, bottom: n, left: n, right: n, insideHorizontal: n, insideVertical: n }; };
const box = (rows, widths) => new Table({ columnWidths: widths || [FULL], width: { size: FULL, type: WidthType.DXA }, borders: noB(), rows });

// ---- writing space: underscore-leader tab stops only ----
function ruledLines(n, o = {}) {
  const arr = [];
  const right = o.width || CONTENT_W;
  for (let i = 0; i < n; i++) arr.push(new Paragraph({
    children: [new TextRun({ text: "\t", size: 22, font: "Calibri", color: "9AA7B4" })],
    spacing: { after: o.after ?? 200, before: i === 0 ? (o.before ?? 60) : 140, line: 240 },
    tabStops: [{ type: TabStopType.RIGHT, position: right, leader: LeaderType.UNDERSCORE }],
    indent: o.indent,
  }));
  return arr;
}
function blankRow(count, o = {}) {
  const total = o.width || CONTENT_W;
  const per = Math.floor(total / count);
  const stops = [], kids = [];
  for (let i = 1; i <= count; i++) stops.push({ type: TabStopType.RIGHT, position: per * i, leader: LeaderType.UNDERSCORE });
  for (let i = 0; i < count; i++) kids.push(new TextRun({ text: "\t", size: 22, font: "Calibri", color: "9AA7B4" }));
  return new Paragraph({ children: kids, tabStops: stops, spacing: { before: o.before ?? 120, after: o.after ?? 160, line: 300 } });
}
// Answer lines by response type (Sean's writing-space formula).
const LINES_FOR = { short: 1, sentence: 2, multi: 5, paragraph: 8 };
const linesForType = t => LINES_FOR[t] || 2;

function labelBox(label, lines, accent) {
  const cell = new TableCell({
    width: { size: FULL, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, color: "auto", fill: "FBFCFE" },
    margins: { top: 120, bottom: 160, left: 160, right: 160 },
    borders: { top: { style: BorderStyle.SINGLE, size: 4, color: accent }, bottom: { style: BorderStyle.SINGLE, size: 4, color: accent },
               left: { style: BorderStyle.SINGLE, size: 4, color: accent }, right: { style: BorderStyle.SINGLE, size: 4, color: accent } },
    children: [new Paragraph({ children: [H.run(label, { bold: true, color: accent, size: 21 })], spacing: { after: 60 } }),
               ...ruledLines(lines)],
  });
  return box([new TableRow({ cantSplit: true, children: [cell] })]);
}
function sixBox() {
  const cells = [], CW6 = Math.floor(FULL / 6), last6 = FULL - CW6 * 5;
  for (let i = 0; i < 6; i++) cells.push(new TableCell({
    width: { size: i < 5 ? CW6 : last6, type: WidthType.DXA }, margins: { top: 220, bottom: 220, left: 80, right: 80 },
    children: [new Paragraph({ children: [H.run("")], alignment: AlignmentType.CENTER })],
  }));
  const b = { style: BorderStyle.SINGLE, size: 6, color: "7A8B99" };
  return new Table({ columnWidths: [CW6, CW6, CW6, CW6, CW6, last6], width: { size: FULL, type: WidthType.DXA },
    borders: { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b },
    rows: [new TableRow({ children: cells })] });
}
const checklist = items => items.map(it => new Paragraph({
  children: [H.run("❑  ", { size: 24, color: "5A6B7B" }), H.run(it, { size: 22 })],
  spacing: { after: 120, line: 264 },
}));
function frames(list, type) {
  const out = [];
  list.forEach(q => {
    out.push(new Paragraph({ children: [H.run(q, { bold: true, color: H.C.navy, size: 21 })], spacing: { after: 40, before: 80 }, keepNext: true }));
    out.push(...ruledLines(linesForType(type || "sentence")));
  });
  return out;
}
const inlineFill = prompt => new Paragraph({
  children: [H.run(prompt + ": ", { bold: true, color: H.C.navy, size: 22 }),
             new TextRun({ text: " ".repeat(31), underline: { type: "single" }, size: 22, font: "Calibri" })],
  spacing: { after: 140, before: 80 },
});
// inline blanks ~1.5in (31 nbsp), underlined; an item with a blank gets no line under it
function runsWithBlanks(text) {
  const parts = text.split(/_{2,}/), out = [];
  parts.forEach((seg, i) => {
    if (seg) out.push(H.run(seg, { size: 22 }));
    if (i < parts.length - 1) out.push(new TextRun({ text: " ".repeat(31), underline: { type: "single" }, size: 22, font: "Calibri" }));
  });
  return out;
}
// Word bank: words consumed by the worked example are struck out.
function clozeBlock(bank, items, used = []) {
  const out = [];
  const usedSet = new Set(used.map(w => String(w).toLowerCase()));
  const kids = [H.run("WORD BANK:  ", { bold: true, color: H.C.blue, size: 20 })];
  bank.forEach((w, i) => {
    const isUsed = usedSet.has(String(w).toLowerCase());
    kids.push(new TextRun({ text: w, size: 22, font: "Calibri", color: isUsed ? "9AA7B4" : H.C.ink, strike: isUsed }));
    if (i < bank.length - 1) kids.push(H.run("      ", { size: 22 }));
  });
  const note = new Paragraph({ children: [H.run("Cross each word off the bank as you use it. Each word is used once.", { italics: true, color: H.C.midGrey, size: 20 })], spacing: { before: 60 } });
  const cell = new TableCell({ width: { size: FULL, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, color: "auto", fill: "EEF3F9" },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    borders: { top: { style: BorderStyle.SINGLE, size: 6, color: H.C.blue }, bottom: { style: BorderStyle.SINGLE, size: 6, color: H.C.blue },
               left: { style: BorderStyle.SINGLE, size: 6, color: H.C.blue }, right: { style: BorderStyle.SINGLE, size: 6, color: H.C.blue } },
    children: [new Paragraph({ children: kids }), note] });
  out.push(box([new TableRow({ children: [cell] })]));
  out.push(H.spacer(120));
  items.forEach((it, i) => {
    out.push(new Paragraph({ children: [H.run((i + 1) + ".  ", { bold: true, color: H.C.blue, size: 22 }), ...runsWithBlanks(it.text)],
      spacing: { after: 180, line: 300 }, keepNext: i >= items.length - 2 }));
  });
  return out;
}
function wsTable(head, rows, widths, tall) {
  const sum = widths.reduce((a, x) => a + x, 0) || FULL;
  widths = widths.map(w => Math.round(w * FULL / sum));
  widths[widths.length - 1] = FULL - widths.slice(0, -1).reduce((a, x) => a + x, 0);
  const rr = [new TableRow({ tableHeader: true, children: head.map((h, hi) => new TableCell({
    width: { size: widths[hi], type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, color: "auto", fill: H.C.navy }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ children: [H.run(h, { bold: true, color: "FFFFFF", size: 21 })] })],
  })) })];
  rows.forEach((r, ri) => rr.push(new TableRow({ cantSplit: true, children: r.map((c, ci) => new TableCell({
    width: { size: widths[ci], type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, color: "auto", fill: ri % 2 ? "F4F6F9" : "FFFFFF" },
    margins: { top: tall ? 160 : 80, bottom: tall ? 160 : 80, left: 100, right: 100 },
    children: [new Paragraph({ children: [H.run(c, { size: 21 })] })],
  })) })));
  const b = { style: BorderStyle.SINGLE, size: 4, color: H.C.line };
  return new Table({ columnWidths: widths, width: { size: FULL, type: WidthType.DXA },
    borders: { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b }, rows: rr });
}
function panel(title, children, accent, fill) {
  const inner = [new Paragraph({ children: [H.run(title, { bold: true, color: accent, size: 20, caps: true })], spacing: { after: 80 } }), ...children];
  const cell = new TableCell({ width: { size: FULL, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, color: "auto", fill: fill || "EAF6EF" },
    margins: { top: 140, bottom: 140, left: 180, right: 180 },
    borders: { top: { style: BorderStyle.SINGLE, size: 6, color: accent }, bottom: { style: BorderStyle.SINGLE, size: 6, color: accent },
               left: { style: BorderStyle.SINGLE, size: 6, color: accent }, right: { style: BorderStyle.SINGLE, size: 6, color: accent } },
    children: inner });
  return box([new TableRow({ children: [cell] })]);
}
// The worked "(example)" first item of a Part.
function exampleLine(text, accent) {
  return new Paragraph({
    children: [new TextRun({ text: "(example)  ", italics: true, bold: true, color: accent, size: 21, font: "Calibri" }),
               H.run(text, { size: 22, color: H.C.ink })],
    spacing: { before: 60, after: 160, line: 280 }, keepNext: true,
  });
}
// Tick-box "Check" Part — two columns, outcomes in student language.
function checkPart(items, accent) {
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];
  const cw = Math.floor(FULL / 2);
  const cells = cols.map((col, i) => new TableCell({
    width: { size: i === 0 ? cw : FULL - cw, type: WidthType.DXA }, borders: noB(),
    margins: { top: 60, bottom: 60, left: i ? 160 : 0, right: 120 },
    children: col.length ? col.map(t => new Paragraph({
      children: [H.run("❑  ", { size: 24, color: accent }), H.run(t, { size: 21 })],
      spacing: { after: 110, line: 260 },
    })) : [new Paragraph({ children: [H.run("")] })],
  }));
  return [H.h2("Check — before you hand this in", accent),
          H.text("Tick each box only when it is true for your work.", { size: 21, italics: true }),
          new Table({ columnWidths: [cw, FULL - cw], width: { size: FULL, type: WidthType.DXA }, borders: noB(),
            rows: [new TableRow({ cantSplit: true, children: cells })] })];
}

// ---- block renderer. tier: "core" | "support" | "stretch" ----
function renderBlocks(blocks, tier = "core") {
  const out = [];
  let partAccent = H.C.blue, pendingExample = null, bankUsed = [];
  blocks.forEach(b => {
    const acc = b.accentStep ? H.accentFor(b.accentStep) : H.C.blue;
    switch (b.kind) {
      case "section":
        partAccent = acc;
        out.push(H.h2(b.t, acc));
        pendingExample = b.example || null;       // rendered after the Part's instruction
        bankUsed = b.exampleUses || [];
        break;
      case "instr":
        out.push(H.text(b.t, { size: 22 }));
        if (pendingExample) { out.push(exampleLine(pendingExample, partAccent)); pendingExample = null; }
        break;
      case "note": out.push(new Paragraph({ children: [H.run("✎  " + b.t, { italics: true, color: H.C.midGrey, size: 21 })], spacing: { before: 120, after: 80 } })); break;
      case "write": out.push(...ruledLines(b.lines || linesForType(b.type))); break;
      case "longblanks": { const rows = b.rows || 1, per = b.per || 3; for (let r = 0; r < rows; r++) out.push(blankRow(per)); out.push(H.spacer(80)); break; }
      case "box": out.push(labelBox(b.label, b.lines, H.C.blue)); out.push(H.spacer(80)); break;
      case "sixbox": out.push(sixBox()); out.push(H.spacer(80)); break;
      case "frames": out.push(...frames(b.list, b.type)); break;
      case "checklist": out.push(...checklist(b.items)); break;
      case "table": out.push(wsTable(b.head, b.rows, b.widths, b.tall)); out.push(H.spacer(100)); break;
      case "fill": out.push(inlineFill(b.prompt)); break;
      case "cloze": out.push(...clozeBlock(b.bank, b.items, bankUsed)); break;
      case "model": {
        const cell = new TableCell({ width: { size: FULL, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, color: "auto", fill: "FCFBF6" },
          margins: { top: 160, bottom: 160, left: 200, right: 200 },
          borders: { top: { style: BorderStyle.SINGLE, size: 8, color: H.C.navy }, bottom: { style: BorderStyle.SINGLE, size: 8, color: H.C.navy },
                     left: { style: BorderStyle.SINGLE, size: 8, color: H.C.navy }, right: { style: BorderStyle.SINGLE, size: 8, color: H.C.navy } },
          children: [new Paragraph({ children: [H.run("MODEL PARAGRAPH", { bold: true, color: H.C.navy, size: 18, caps: true })], spacing: { after: 80 } }),
                     new Paragraph({ children: [H.run(b.t, { size: 23 })], spacing: { line: 340 } })] });
        out.push(box([new TableRow({ children: [cell] })]));
        out.push(H.spacer(120));
        break;
      }
      // Tiers never print on the core sheet — they are their own companion sheets.
      case "support": case "extension": break;
    }
  });
  return out;
}
const tierBlocks = (W, kind) => {
  const b = W.blocks.find(x => x.kind === kind);
  return b ? b.blocks : [];
};

function sheetHead(W, L, label) {
  const c = [];
  c.push(new Paragraph({ children: [H.run(`${UNIT.code} · Unit ${UNIT.number} · Lesson ${W.n} — Worksheet${label ? " · " + label : ""}`, { size: 18, color: H.C.midGrey })], spacing: { after: 20 } }));
  c.push(H.h1(W.title + (label ? ` — ${label}` : "")));
  if (W.subtitle) c.push(H.subtitle(W.subtitle));
  // OBJECTIVE prints at the top of every sheet
  if (L && L.objective) {
    const cell = new TableCell({ width: { size: FULL, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: "auto", fill: "EEF3F9" },
      margins: { top: 100, bottom: 100, left: 160, right: 160 },
      borders: { top: { style: BorderStyle.SINGLE, size: 6, color: H.C.blue }, bottom: { style: BorderStyle.SINGLE, size: 6, color: H.C.blue },
                 left: { style: BorderStyle.SINGLE, size: 6, color: H.C.blue }, right: { style: BorderStyle.SINGLE, size: 6, color: H.C.blue } },
      children: [new Paragraph({ children: [H.run("OBJECTIVE:  ", { bold: true, color: H.C.blue, size: 20 }), H.run(L.objective, { size: 21 })] })] });
    c.push(box([new TableRow({ children: [cell] })]));
    c.push(H.spacer(100));
  }
  c.push(nameHeader());
  c.push(H.spacer(120));
  return c;
}
function nameHeader() {
  const lw = Math.round(FULL * 0.66);
  return new Table({ columnWidths: [lw, FULL - lw], width: { size: FULL, type: WidthType.DXA },
    borders: { ...noB(), bottom: { style: BorderStyle.SINGLE, size: 4, color: H.C.line } },
    rows: [new TableRow({ children: [
      new TableCell({ width: { size: lw, type: WidthType.DXA }, borders: noB(), margins: { bottom: 60 },
        children: [new Paragraph({ children: [H.run("Name: ", { color: H.C.midGrey, size: 21 }),
          new TextRun({ text: " ".repeat(44), underline: { type: "single" }, size: 21, font: "Calibri" })] })] }),
      new TableCell({ width: { size: FULL - lw, type: WidthType.DXA }, borders: noB(), margins: { bottom: 60 },
        children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [H.run("Block: ____   Date: ____", { color: H.C.midGrey, size: 21 })] })] }),
    ] })] });
}

function build(W, tier = "core") {
  const L = LESSONS.find(x => x.n === W.n);
  const label = tier === "support" ? "Support" : tier === "stretch" ? "Stretch" : "";
  const c = sheetHead(W, L, label);
  if (tier === "core") {
    c.push(...renderBlocks(W.blocks, "core"));
  } else if (tier === "support") {
    c.push(H.text("Use this sheet beside your worksheet. It gives you the words, the hints and a model to copy the shape of.", { size: 22, italics: true }));
    c.push(H.spacer(120));
    c.push(...renderBlocks(tierBlocks(W, "support"), "support"));
  } else {
    c.push(H.text("Finished the worksheet and checked it? Take this further.", { size: 22, italics: true }));
    c.push(H.spacer(120));
    c.push(...renderBlocks(tierBlocks(W, "extension"), "stretch"));
  }
  // Every sheet ENDS with the tick-box Check Part
  const checks = tier === "core" ? W.check : (tier === "support" ? (W.checkSupport || W.check) : (W.checkStretch || W.check));
  if (checks && checks.length) { c.push(H.spacer(160)); c.push(...checkPart(checks, H.C.blue)); }
  return new Document({ numbering: H.NUMBERING, sections: [{ properties: sectionProps, children: c }] });
}

(async () => {
  const only = process.argv[3] ? process.argv[3].split(",").map(Number) : null;
  const missing = [];
  for (const W of WORKSHEETS) {
    if (only && !only.includes(W.n)) continue;
    const tag = `${UNIT.code}_U0${UNIT.number}_L${String(W.n).padStart(2, "0")}_Worksheet`;
    // core
    fs.writeFileSync(path.join(OUT, `${tag}_v1.docx`), await Packer.toBuffer(build(W, "core")));
    console.log("wrote", `${tag}_v1.docx`);
    if (tierBlocks(W, "support").length) {
      fs.writeFileSync(path.join(OUT, `${tag}_Support_v1.docx`), await Packer.toBuffer(build(W, "support")));
      console.log("wrote", `${tag}_Support_v1.docx`);
    }
    if (tierBlocks(W, "extension").length) {
      fs.writeFileSync(path.join(OUT, `${tag}_Stretch_v1.docx`), await Packer.toBuffer(build(W, "stretch")));
      console.log("wrote", `${tag}_Stretch_v1.docx`);
    }
    // standing-order checks
    const sections = W.blocks.filter(b => b.kind === "section");
    sections.forEach(s => { if (!s.example) missing.push(`L${W.n} ${s.t}: no worked (example)`); });
    if (!W.check || !W.check.length) missing.push(`L${W.n}: no Check Part`);
  }
  if (missing.length) {
    console.error("\nWORKSHEET STANDING-ORDER GAPS — " + missing.length + ":");
    missing.forEach(m => console.error("  " + m));
    process.exit(1);
  }
  console.log("WORKSHEETS DONE — standing-order check clean");
})();
