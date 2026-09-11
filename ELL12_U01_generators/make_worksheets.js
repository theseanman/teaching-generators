const fs = require("fs"), path = require("path");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, ShadingType, BorderStyle, TabStopType, Footer, LeaderType } = require("docx");
const { COURSE, LESSONS } = require("./content.js");

const NAVY = "0B2C4D", BLUE = "1565C0", PALE = "E3F0FB", PALE2 = "F3F8FD", MID = "BBDEFB", INK = "1F2933";
const ACCENTS = { teal: "00897B", mint: "43A047", amber: "F9A825", coral: "E8604C", violet: "6A4FB3" };
const FONT = "Calibri", PT = 28; // 14pt body (docx size 28) per U4+ standard
const PAGE_W = 12240, MARGIN = 1080, TEXT_W = PAGE_W - 2 * MARGIN;
const BLANK = "\u00A0".repeat(42); // ~2.0in inline blank, underlined
const SCALE = parseFloat(process.env.SCALE || "1");
const ONLY = process.env.ONLY || "";
const sc = (v) => Math.round(v * SCALE);

const TIERS = { "1A": ["support", "core", "stretch"], "2A": ["support", "core", "stretch"] };
const TIER_LABEL = { support: "Support", core: "Core", stretch: "Stretch" };

// ---- text helpers ----
function runsWithBlanks(text, o = {}) {
  // split on runs of 2+ underscores -> underlined nbsp blanks; a TRAILING blank (only punctuation after it)
  // becomes a tab leader to the right margin so it cannot wrap and vanish
  const parts = text.split(/_{2,}/);
  const out = [];
  const trailing = parts.length > 1 && parts[parts.length - 1].trim().length <= 2;
  parts.forEach((p, i) => {
    if (p) out.push(new TextRun({ text: p, font: FONT, size: o.size || PT, bold: o.bold, italics: o.italics, color: o.color || INK }));
    if (i < parts.length - 1) {
      if (trailing && i === parts.length - 2) out.push(new TextRun({ text: "\t", font: FONT, size: o.size || PT, color: "6B7280" }));
      else out.push(new TextRun({ text: BLANK, font: FONT, size: o.size || PT, underline: {}, color: INK }));
    }
  });
  return out;
}
const P = (children, o = {}) => new Paragraph({ keepNext: o.keepNext !== false, keepLines: true, spacing: { after: o.after ?? 80, before: o.before ?? 0, line: o.line || 276 }, indent: o.indent, alignment: o.align, border: o.border, tabStops: o.tabs, children });
const T = (text, o = {}) => P(runsWithBlanks(text, o), o);
const answerLine = (o = {}) => new Paragraph({ keepNext: o.keepNext !== false, spacing: { after: 0, before: sc(290), line: 240, lineRule: "auto" }, indent: { left: o.indent ?? 540 }, tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W, leader: LeaderType.UNDERSCORE }], children: [new TextRun({ text: "\t", font: FONT, size: PT, color: "6B7280" })] });
const border = { style: BorderStyle.SINGLE, size: 6, color: MID };
const allB = { top: border, bottom: border, left: border, right: border };

function box(paragraphs, fill, accent) {
  return new Table({
    width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [TEXT_W],
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: TEXT_W, type: WidthType.DXA },
      borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL }, left: { style: BorderStyle.SINGLE, size: 30, color: accent } },
      shading: { type: ShadingType.CLEAR, fill, color: "auto" }, margins: { top: 80, bottom: 80, left: 160, right: 120 }, children: paragraphs })] })]
  });
}

function vocabTable(vocab) {
  // two pairs per row: word | meaning | word | meaning
  const cols = [1500, 3540, 1500, 3540];
  const rows = [];
  for (let i = 0; i < vocab.length; i += 2) {
    const cells = [];
    for (let j = 0; j < 2; j++) {
      const v = vocab[i + j] || ["", ""];
      cells.push(new TableCell({ width: { size: cols[j * 2], type: WidthType.DXA }, borders: allB, shading: { type: ShadingType.CLEAR, fill: PALE, color: "auto" }, margins: { top: 40, bottom: 40, left: 90, right: 60 },
        children: [new Paragraph({ keepNext: true, spacing: { after: 0 }, children: [new TextRun({ text: v[0], font: FONT, size: 24, bold: true, color: NAVY })] })] }));
      cells.push(new TableCell({ width: { size: cols[j * 2 + 1], type: WidthType.DXA }, borders: allB, margins: { top: 40, bottom: 40, left: 90, right: 60 },
        children: [new Paragraph({ keepNext: true, spacing: { after: 0 }, children: [new TextRun({ text: v[1], font: FONT, size: 22, color: INK })] })] }));
    }
    rows.push(new TableRow({ cantSplit: true, children: cells }));
  }
  return new Table({ width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: cols, rows });
}

// ---- tier resolution ----
function resolvePart(part, tier) {
  if (part.onlyTiers && !part.onlyTiers.includes(tier)) return null;
  const ov = (part.tiers && part.tiers[tier]) || {};
  const p = Object.assign({}, part, ov);
  // items text per tier
  let items = (ov.items || part.items).map(it => {
    if (typeof it === "string") return { text: it };
    const key = { support: "s", core: "c", stretch: "x" }[tier];
    return { text: it[key] || it.q, subj: it.subj, lines: it.lines };
  });
  if (part.limit && part.limit[tier]) items = items.slice(0, part.limit[tier]);
  p.items = items;
  p.bankResolved = ov.bank !== undefined ? ov.bank : (part.bank !== undefined ? part.bank : (part.bankFromVocab ? "VOCAB" : null));
  if (ov.bank === false) p.bankResolved = null;
  p.firstDoneText = part.firstDone && part.firstDone[tier];
  p.exText = ov.ex !== undefined ? ov.ex : part.ex;
  return p;
}

function buildPart(p, accent, vocab) {
  const out = [];
  // Part heading
  out.push(new Paragraph({ keepNext: true, keepLines: true, spacing: { before: 200, after: 60 }, shading: { type: ShadingType.CLEAR, fill: PALE2, color: "auto" },
    children: [new TextRun({ text: `Part ${p.name}  `, font: FONT, size: 26, bold: true, color: accent }), new TextRun({ text: p.title, font: FONT, size: 26, bold: true, color: NAVY })] }));
  out.push(T(p.instr, { italics: true, after: 80 }));
  const bank = p.bankResolved === "VOCAB" ? vocab.map(v => v[0]) : p.bankResolved;
  if (bank && bank.length) {
    const bankRuns = [new TextRun({ text: "Word bank:  ", font: FONT, size: 24, bold: true, color: BLUE })];
    const onceEach = bank.length >= p.items.length;   // strike only when every bank word is used once
    bank.forEach((w, bi) => {
      const used = onceEach && p.exText && w.toLowerCase() === String(p.exText).toLowerCase();
      bankRuns.push(new TextRun({ text: w, font: FONT, size: 24, color: used ? "9CA3AF" : INK, strike: used }));
      if (bi < bank.length - 1) bankRuns.push(new TextRun({ text: "   \u2022   ", font: FONT, size: 24, color: INK }));
    });
    if (onceEach && p.exText && bank.some(w => w.toLowerCase() === String(p.exText).toLowerCase())) bankRuns.push(new TextRun({ text: "     (cross out each word when you use it)", font: FONT, size: 20, italics: true, color: "6B7280" }));
    out.push(new Paragraph({ keepNext: true, keepLines: true, spacing: { after: 100 }, shading: { type: ShadingType.CLEAR, fill: PALE, color: "auto" }, indent: { left: 120, right: 120 }, children: bankRuns }));
  }
  p.items.forEach((it, i) => {
    const last = i === p.items.length - 1;
    const num = `${i + 1}.  `;
    let text = it.text;
    const done = i === 0 && p.firstDoneText;
    const hasBlank = /_{2,}/.test(text) || p.blankFirst;
    const isOpen = /^\d+\.$/.test(text.trim()) || text.trim() === "";
    // an inline blank IS the answer space: never print an answer line under it.
    // every written response gets at least TWO lines (Sean's formula, Sep 8).
    const wanted = it.lines !== undefined ? it.lines : (p.lines || 0);
    let linesAfter = hasBlank ? 0 : (wanted > 0 || isOpen ? Math.max(2, wanted) : 0);
    let children;
    const EXR = (t) => new TextRun({ text: t, font: FONT, size: PT, bold: true, italics: true, color: accent, underline: {} });
    const EXTAG = new TextRun({ text: "   (example)", font: FONT, size: 20, italics: true, color: "6B7280" });
    if (i === 0 && p.exText && !p.checkbox) {
      // worked example replaces item 1: shows the complexity of answer required, no answer lines
      if (p.blankFirst) children = [new TextRun({ text: num, font: FONT, size: PT, bold: true, color: accent }), EXR(p.exText), new TextRun({ text: "   " + text, font: FONT, size: PT, color: INK }), EXTAG];
      else if (hasBlank) {
        const parts = text.split(/_{2,}/);
        const prefix = parts[0].trim().toLowerCase();
        // a full-sentence example that already contains the frame replaces the whole item; a word example fills the blank
        if (prefix && String(p.exText).toLowerCase().startsWith(prefix)) children = [new TextRun({ text: num, font: FONT, size: PT, bold: true, color: accent }), EXR(p.exText), EXTAG];
        else children = [new TextRun({ text: num, font: FONT, size: PT, bold: true, color: accent }), new TextRun({ text: parts[0], font: FONT, size: PT, color: INK }), EXR(p.exText), new TextRun({ text: parts.slice(1).join("____"), font: FONT, size: PT, color: INK }), EXTAG];
      }
      else if (isOpen) children = [new TextRun({ text: num, font: FONT, size: PT, bold: true, color: accent }), EXR(p.exText), EXTAG];
      else children = [new TextRun({ text: num, font: FONT, size: PT, bold: true, color: accent }), ...runsWithBlanks(text), new TextRun({ text: "  ", font: FONT, size: PT }), EXR(p.exText), EXTAG];
      out.push(P(children, { indent: { left: 540, hanging: 420 }, after: 120, line: 300, keepNext: true, tabs: [{ type: TabStopType.RIGHT, position: TEXT_W, leader: LeaderType.UNDERSCORE }] }));
      return;
    }
    if (p.checkbox) {
      if (i % 2 === 1) return;                         // consumed by the previous item (two per row)
      const nxt = p.items[i + 1];
      children = [new TextRun({ text: "\u2610  " + text, font: FONT, size: PT, color: INK })];
      if (nxt) children.push(new TextRun({ text: "\t\u2610  " + nxt.text, font: FONT, size: PT, color: INK }));
      out.push(new Paragraph({ keepNext: i + 2 < p.items.length, spacing: { before: sc(120), after: 0 }, indent: { left: 540 }, tabStops: [{ type: TabStopType.LEFT, position: 540 + Math.round(TEXT_W / 2) }], children }));
      return;
    } else if (isOpen) {
      // "1. ______________" : the number sits on the first answer line
      children = [new TextRun({ text: num.trim() + " ", font: FONT, size: PT, bold: true, color: accent }), new TextRun({ text: "\t", font: FONT, size: PT, color: "6B7280" })];
      out.push(new Paragraph({ keepNext: true, spacing: { before: sc(290), after: 0 }, indent: { left: 120 }, tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W, leader: LeaderType.UNDERSCORE }], children }));
      for (let k = 0; k < linesAfter - 1; k++) out.push(answerLine({ keepNext: k < linesAfter - 2 }));
      return;
    } else if (done) {
      children = [new TextRun({ text: num, font: FONT, size: PT, bold: true, color: accent }), new TextRun({ text: p.firstDoneText + "   ", font: FONT, size: PT, color: INK }), new TextRun({ text: "(example)", font: FONT, size: 22, italics: true, color: "6B7280" })];
    } else if (p.blankFirst) {
      children = [new TextRun({ text: num, font: FONT, size: PT, bold: true, color: accent }), new TextRun({ text: BLANK, font: FONT, size: PT, underline: {} }), new TextRun({ text: "   " + text, font: FONT, size: PT, color: INK })];
    } else if (p.boldSubject && it.subj) {
      const rest = text.slice(it.subj.length);
      children = [new TextRun({ text: num, font: FONT, size: PT, bold: true, color: accent }), new TextRun({ text: it.subj, font: FONT, size: PT, bold: true, color: INK }), new TextRun({ text: rest, font: FONT, size: PT, color: INK })];
    } else {
      children = [new TextRun({ text: num, font: FONT, size: PT, bold: true, color: accent }), ...runsWithBlanks(text)];
    }

    const glueHead = i < 2 || i === p.items.length - 2;   // heading + first two items stay together; last two stay together (no widows)
    // an item always stays with its own answer lines; a tall (writable) item never splits
    out.push(P(children, { indent: { left: 540, hanging: 420 }, after: linesAfter ? 0 : (hasBlank ? sc(120) : sc(100)), line: hasBlank && !linesAfter ? sc(400) : 276, keepNext: glueHead || linesAfter > 0, tabs: [{ type: TabStopType.RIGHT, position: TEXT_W, leader: LeaderType.UNDERSCORE }] }));
    for (let k = 0; k < linesAfter; k++) out.push(answerLine({ keepNext: k < linesAfter - 1 || (glueHead && i === 0) }));
  });
  return out;
}

function buildWorksheet(lesson, level, tier) {
  const ws = lesson.worksheets[level];
  const accent = ACCENTS[lesson.accent];
  const vocab = lesson.vocab.slice(0, ws.vocabCount);
  const kids = [];
  // header line
  kids.push(new Paragraph({ keepNext: true, spacing: { after: 40 }, tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W }],
    children: [new TextRun({ text: `${COURSE.code}  \u2022  Unit ${COURSE.unit}: ${COURSE.unitTitle}  \u2022  Lesson ${lesson.n}`, font: FONT, size: 20, color: BLUE }),
      new TextRun({ text: `\t${level} \u2022 ${TIER_LABEL[tier]}`, font: FONT, size: 20, bold: true, color: accent })] }));
  kids.push(new Paragraph({ keepNext: true, spacing: { after: 160 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: accent, space: 4 } },
    children: [new TextRun({ text: ws.title, font: FONT, size: 40, bold: true, color: NAVY })] }));
  kids.push(new Paragraph({ keepNext: true, spacing: { after: 100 }, tabStops: [{ type: TabStopType.RIGHT, position: 6300, leader: LeaderType.UNDERSCORE }, { type: TabStopType.LEFT, position: 6700 }, { type: TabStopType.RIGHT, position: TEXT_W, leader: LeaderType.UNDERSCORE }],
    children: [new TextRun({ text: "Name: ", font: FONT, size: 24, bold: true, color: NAVY }), new TextRun({ text: "\t\t", font: FONT, size: 24, color: "6B7280" }),
      new TextRun({ text: "Date: ", font: FONT, size: 24, bold: true, color: NAVY }), new TextRun({ text: "\t", font: FONT, size: 24, color: "6B7280" })] }));
  // objective + outcome line
  if (ws.objective) kids.push(new Paragraph({ keepNext: true, spacing: { after: 30 }, children: [new TextRun({ text: "TODAY  ", font: FONT, size: 18, bold: true, color: accent, characterSpacing: 40 }), new TextRun({ text: ws.objective, font: FONT, size: 22, color: NAVY })] }));
  if (ws.outcome) kids.push(new Paragraph({ keepNext: true, spacing: { after: 140 }, children: [new TextRun({ text: "OUTCOME  ", font: FONT, size: 18, bold: true, color: accent, characterSpacing: 40 }), new TextRun({ text: ws.outcome, font: FONT, size: 20, color: "4B5563" })] }));
  // vocabulary box
  kids.push(new Paragraph({ keepNext: true, spacing: { after: 60 }, children: [new TextRun({ text: "VOCABULARY", font: FONT, size: 20, bold: true, color: accent, characterSpacing: 40 })] }));
  kids.push(vocabTable(vocab));
  kids.push(new Paragraph({ keepNext: true, spacing: { after: 60 }, children: [] }));
  // remember box
  kids.push(box([new Paragraph({ keepNext: true, spacing: { after: 0 }, children: [new TextRun({ text: "REMEMBER  ", font: FONT, size: 20, bold: true, color: accent, characterSpacing: 40 }), new TextRun({ text: ws.remember, font: FONT, size: 24, color: NAVY })] })], PALE2, accent));
  // parts
  let lastLetter = "A";
  for (const part of ws.parts) {
    const p = resolvePart(part, tier);
    if (!p) continue;
    kids.push(...buildPart(p, accent, vocab));
    lastLetter = p.name;
  }
  // closing outcome checklist: every sheet, every tier
  if (ws.checks && ws.checks.length) {
    const letter = String.fromCharCode(lastLetter.charCodeAt(0) + 1);
    const chk = resolvePart({ name: letter, title: "Check your work", instr: "Tick each box when it is true. These are the learning outcomes at the top of the sheet.", checkbox: true, items: ws.checks }, tier);
    kids.push(...buildPart(chk, accent, vocab));
  }

  return new Document({
    creator: COURSE.teacher, title: `${COURSE.code} U${COURSE.unit} L${lesson.n} ${level} ${TIER_LABEL[tier]}`,
    styles: { default: { document: { run: { font: FONT, size: PT, color: INK } } } },
    sections: [{ properties: { page: { size: { width: PAGE_W, height: 15840 }, margin: { top: MARGIN, bottom: 900, left: MARGIN, right: MARGIN, footer: 400 } } },
      footers: { default: new Footer({ children: [new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 6, color: MID, space: 4 } },
        children: [new TextRun({ text: "Stuck?  ", font: FONT, size: 20, bold: true, color: accent }), new TextRun({ text: "Fill in a help slip: \u201cCan you check my \u2026?\u201d  \u201cI need help with \u2026\u201d", font: FONT, size: 20, italics: true, color: "6B7280" })] })] }) },
      children: kids }]
  });
}

async function main() {
  const outDir = process.argv[2]; if (!outDir) throw new Error("outDir required");
  fs.mkdirSync(outDir, { recursive: true });
  const manifest = [];
  for (const lesson of LESSONS) {
    if (!lesson.worksheets) continue;
    for (const level of ["1A", "2A"]) for (const tier of TIERS[level]) {
      const doc = buildWorksheet(lesson, level, tier);
      const buf = await Packer.toBuffer(doc);
      const name = `${COURSE.code}_U${String(COURSE.unit).padStart(2, "0")}_L${String(lesson.n).padStart(2, "0")}_Worksheet_${lesson.slug}_${level}_${TIER_LABEL[tier]}_v1.docx`;
      if (ONLY && !name.includes(ONLY)) continue;
      fs.writeFileSync(path.join(outDir, name), buf);
      manifest.push({ lesson: lesson.n, level, tier, file: name });
    }
  }
  if (!ONLY) fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 1));
  console.log("worksheets:", manifest.length);
}
main().catch(e => { console.error(e); process.exit(1); });
