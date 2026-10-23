// ELL 2 Unit 7 — shared docx helpers
// Standards carried forward from U4-U6: 14pt body (size 28), 22-nbsp underlined
// inline blanks, paragraph-bottom-border answer lines, cantSplit tables, US Letter.

const d = require("docx");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, PageBreak, Header, Footer,
  PageNumber, VerticalAlign,
} = d;

const NAVY = "0B2C4D";
const BLUE = "1565C0";
const PALE = "E8F0F8";
const PALER = "F4F8FC";
const GREY = "5A6672";
const RULE = "C9D6E4";

const BODY = 28;   // 14pt
const SMALL = 24;  // 12pt
const H1 = 40;     // 20pt
const H2 = 32;     // 16pt
const H3 = 28;     // 14pt bold

const NB = "\u00A0";
const BLANK = NB.repeat(22);

const PAGE = {
  size: { width: 12240, height: 15840 },
  margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
};
const CONTENT_W = 12240 - 2160; // 10080 dxa usable

// ---------- text ----------

function t(text, o = {}) {
  return new TextRun({
    text: String(text),
    size: o.size || BODY,
    bold: !!o.bold,
    italics: !!o.italics,
    underline: o.underline ? {} : undefined,
    color: o.color || "000000",
    font: o.font || "Calibri",
  });
}

function p(text, o = {}) {
  const runs = Array.isArray(text) ? text : [t(text, o)];
  return new Paragraph({
    children: runs,
    alignment: o.align || AlignmentType.LEFT,
    spacing: { before: o.before === undefined ? 0 : o.before, after: o.after === undefined ? 120 : o.after, line: o.line || 276 },
    indent: o.indent,
    shading: o.shade ? { type: ShadingType.CLEAR, fill: o.shade, color: "auto" } : undefined,
    border: o.border,
    keepNext: !!o.keepNext,
    pageBreakBefore: !!o.pageBreakBefore,
  });
}

function h1(text) {
  return p([t(text, { size: H1, bold: true, color: NAVY })], { after: 80, keepNext: true });
}
function h2(text, color) {
  return p([t(text, { size: H2, bold: true, color: color || BLUE })], { before: 220, after: 90, keepNext: true });
}
function h3(text) {
  return p([t(text, { size: H3, bold: true, color: NAVY })], { before: 160, after: 70, keepNext: true });
}
function small(text, o = {}) {
  return p([t(text, { size: SMALL, color: o.color || GREY, italics: o.italics !== false })], { after: o.after === undefined ? 100 : o.after });
}

function rule(o = {}) {
  return new Paragraph({
    children: [t("")],
    spacing: { before: o.before || 60, after: o.after || 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: o.color || RULE, space: 1 } },
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ---------- the blanks helper ----------
// Splits item text on runs of 2+ underscores and replaces each with a
// 22-nbsp underlined run. Everything else passes through as normal text.
function runsWithBlanks(text, o = {}) {
  const parts = String(text).split(/(_{2,})/g);
  const out = [];
  for (const part of parts) {
    if (!part) continue;
    if (/^_{2,}$/.test(part)) {
      out.push(new TextRun({ text: BLANK, size: o.size || BODY, underline: {}, font: "Calibri" }));
    } else {
      out.push(t(part, o));
    }
  }
  if (!out.length) out.push(t("", o));
  return out;
}

// numbered item, blanks expanded
function item(n, text, o = {}) {
  const runs = [t(`${n}.${NB}${NB}`, { bold: true, size: o.size || BODY })].concat(runsWithBlanks(text, o));
  return new Paragraph({
    children: runs,
    spacing: { before: o.before === undefined ? 90 : o.before, after: o.after === undefined ? 60 : o.after, line: 276 },
    indent: { left: 360, hanging: 360 },
  });
}

function bullet(text, o = {}) {
  return new Paragraph({
    children: [t("\u2022" + NB + NB, { size: o.size || BODY })].concat(runsWithBlanks(text, o)),
    spacing: { before: 50, after: 50, line: 276 },
    indent: { left: 500, hanging: 280 },
  });
}

// ---------- answer lines: paragraph bottom borders, full width ----------
function answerLines(count, o = {}) {
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(new Paragraph({
      children: [t("")],
      spacing: { before: 0, after: o.gap === undefined ? 260 : o.gap, line: 276 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: o.color || "8FA5BC", space: 1 } },
      indent: o.indent,
    }));
  }
  return out;
}

// ---------- tables ----------
function cell(children, o = {}) {
  return new TableCell({
    children: Array.isArray(children) ? children : [children],
    width: { size: o.w, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined,
    margins: { top: 90, bottom: 90, left: 130, right: 130 },
    verticalAlign: o.valign || VerticalAlign.TOP,
    columnSpan: o.span,
    borders: o.borders,
  });
}

function table(rows, widths, o = {}) {
  return new Table({
    rows,
    columnWidths: widths,
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    borders: o.borders,
  });
}

function headerRow(labels, widths, fill) {
  return new TableRow({
    cantSplit: true,
    tableHeader: true,
    children: labels.map((lab, i) =>
      cell(p([t(lab, { bold: true, color: "FFFFFF", size: SMALL })], { after: 0 }), { w: widths[i], fill: fill || NAVY })),
  });
}

function row(cells, widths, o = {}) {
  return new TableRow({
    cantSplit: true,
    children: cells.map((c, i) => {
      let content;
      if (Array.isArray(c)) content = c;
      else if (typeof c === "string" || typeof c === "number") {
        content = p(String(c), { after: 0, size: o.size || BODY });
      } else if (c && typeof c === "object") {
        content = c; // already a Paragraph / Table
      } else {
        content = p("", { after: 0 });
      }
      return cell(content, { w: widths[i], fill: o.fill });
    }),
  });
}

// a shaded callout box that will not split across a page
function box(title, children, o = {}) {
  const inner = [];
  if (title) inner.push(p([t(title, { bold: true, color: o.titleColor || NAVY, size: o.titleSize || H3 })], { after: 80 }));
  for (const c of (Array.isArray(children) ? children : [children])) inner.push(c);
  return table(
    [new TableRow({
      cantSplit: true,
      children: [cell(inner, { w: CONTENT_W, fill: o.fill || PALER })],
    })],
    [CONTENT_W],
    { borders: o.borders }
  );
}

// ---------- document assembly ----------
function makeDoc(sections, o = {}) {
  return new Document({
    creator: "Mr. Reid — SD38 Richmond",
    title: o.title || "",
    description: o.description || "",
    styles: {
      default: {
        document: { run: { font: "Calibri", size: BODY }, paragraph: { spacing: { line: 276 } } },
      },
    },
    sections: sections.map((s) => ({
      properties: { page: PAGE },
      headers: o.noHeader ? undefined : {
        default: new Header({
          children: [
            new Paragraph({
              children: [t(o.runningHead || "", { size: 20, color: GREY })],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 40 },
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [t("Page ", { size: 18, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GREY })],
            }),
          ],
        }),
      },
      children: s,
    })),
  });
}

async function write(doc, path) {
  const fs = require("fs");
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path, buf);
  return path;
}

// title block used at the top of every student-facing file
function titleBlock(unit, docType, subtitle) {
  const out = [];
  out.push(p([t(`${unit.course} \u00B7 Unit ${unit.num} \u00B7 ${unit.month}`, { size: SMALL, bold: true, color: BLUE })], { after: 40 }));
  out.push(p([t(`${unit.title}: ${docType}`, { size: H1, bold: true, color: NAVY })], { after: 40 }));
  if (subtitle) out.push(p([t(subtitle, { size: SMALL, color: GREY, italics: true })], { after: 60 }));
  out.push(rule({ before: 30, after: 160 }));
  return out;
}

function nameDateLine() {
  const w = [Math.round(CONTENT_W * 0.62), CONTENT_W - Math.round(CONTENT_W * 0.62)];
  return table([
    new TableRow({
      cantSplit: true,
      children: [
        cell(p([t("Name: ", { bold: true }), t("_".repeat(30), { color: "8FA5BC" })], { after: 0 }), { w: w[0] }),
        cell(p([t("Date: ", { bold: true }), t("_".repeat(16), { color: "8FA5BC" })], { after: 0 }), { w: w[1] }),
      ],
    }),
  ], w, {
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
    },
  });
}

module.exports = {
  d, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType,
  NAVY, BLUE, PALE, PALER, GREY, RULE, BODY, SMALL, H1, H2, H3, NB, BLANK, CONTENT_W,
  t, p, h1, h2, h3, small, rule, pageBreak, runsWithBlanks, item, bullet, answerLines,
  cell, table, headerRow, row, box, makeDoc, write, titleBlock, nameDateLine,
};
