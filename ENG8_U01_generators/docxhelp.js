// docxhelp.js — shared docx helpers for ENG8 unit packages
// Blue-anchored palette (navy/blue + pale tints), US Letter, cantSplit tables,
// bottom-border answer lines. Forkable across units.
const D = require("docx");
const {
  Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, PageOrientation, LevelFormat, TabStopType,
} = D;

// ---- Palette ----
const C = {
  navy:   "0B2C4D",
  blue:   "1565C0",
  paleBlue: "E8F0FA",
  paleGrey: "F4F6F9",
  ink:    "1A1A1A",
  midGrey:"5A6B7B",
  line:   "C9D6E3",
  white:  "FFFFFF",
  // rotating per-lesson accents
  accents: {
    teal:   "0E8C7F",
    mint:   "2E9E6B",
    amber:  "C8860B",
    coral:  "D4573B",
    violet: "7A52B3",
  },
};
// deterministic accent for a lesson number
const ACCENT_CYCLE = ["teal","amber","violet","mint","coral"];
function accentFor(n){ return C.accents[ACCENT_CYCLE[(n-1) % ACCENT_CYCLE.length]]; }

// ---- US Letter page ----
const LETTER = { size: { width: 12240, height: 15840 } };
const MARGINS = { top: 1080, bottom: 1080, left: 1080, right: 1080 };

// ---- text runs ----
function run(text, o={}) {
  return new TextRun({
    text, font: o.font || "Calibri",
    size: o.size || 22, // half-points; 22 = 11pt body
    bold: !!o.bold, italics: !!o.italics,
    color: o.color || C.ink,
    allCaps: !!o.caps,
  });
}
function P(children, o={}) {
  return new Paragraph({
    children: Array.isArray(children) ? children : [children],
    spacing: { after: o.after ?? 120, before: o.before ?? 0, line: o.line ?? 276 },
    alignment: o.align, keepNext: o.keepNext, keepLines: o.keepLines,
    indent: o.indent,
    border: o.rule ? { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.line } } : undefined,
  });
}
function text(str, o={}) { return P([run(str, o)], o); }

// ---- headings ----
function h1(str){
  return new Paragraph({
    children: [run(str, { size: 40, bold: true, color: C.navy })],
    spacing: { after: 80, before: 0 },
  });
}
function h2(str, accent){
  return new Paragraph({
    children: [run(str, { size: 26, bold: true, color: C.white })],
    shading: { type: ShadingType.CLEAR, color: "auto", fill: accent || C.blue },
    spacing: { after: 120, before: 240, line: 300 },
    border: { top:{style:BorderStyle.NONE}, bottom:{style:BorderStyle.NONE} },
  });
}
function h3(str, accent){
  return new Paragraph({
    children: [run(str, { size: 23, bold: true, color: accent || C.navy })],
    spacing: { after: 60, before: 160 },
    keepNext: true,
  });
}
function subtitle(str){
  return new Paragraph({
    children: [run(str, { size: 22, italics: true, color: C.midGrey })],
    spacing: { after: 200 },
  });
}

// ---- bullets ----
function bullet(str, o={}) {
  const runs = Array.isArray(str) ? str : [run(str, o)];
  return new Paragraph({
    children: runs, bullet: { level: o.level || 0 },
    spacing: { after: o.after ?? 60, line: 264 },
  });
}
// label + value bullet: "Label — value" with label bold
function kv(label, value, o={}) {
  return new Paragraph({
    children: [ run(label + " — ", { bold: true, color: o.color || C.navy }), run(value) ],
    bullet: { level: 0 }, spacing: { after: o.after ?? 60, line: 264 },
  });
}

// ---- tables ----
// rows: array of arrays of cell-specs. A cell-spec is a string OR {t, bold, fill, color, align, width, children}
function table(rows, colWidths, o={}) {
  const total = colWidths.reduce((a,b)=>a+b,0);
  const border = { style: BorderStyle.SINGLE, size: 4, color: C.line };
  const borders = { top:border, bottom:border, left:border, right:border,
                    insideHorizontal:border, insideVertical:border };
  const trs = rows.map((cells, ri) =>
    new TableRow({
      cantSplit: true,
      tableHeader: o.headerRow && ri === 0,
      children: cells.map((cell, ci) => {
        const spec = (typeof cell === "string") ? { t: cell } : cell;
        const isHead = o.headerRow && ri === 0;
        const kids = spec.children || [ new Paragraph({
          children: [ run(spec.t ?? "", {
            bold: spec.bold ?? isHead,
            color: spec.color || (isHead ? C.white : C.ink),
            size: spec.size || 21,
          }) ],
          alignment: spec.align, spacing: { after: 40, before: 40, line: 252 },
        }) ];
        return new TableCell({
          width: { size: spec.width || colWidths[ci], type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, color:"auto",
                     fill: spec.fill || (isHead ? C.navy : (ri%2 ? C.paleGrey : C.white)) },
          margins: { top: 60, bottom: 60, left: 100, right: 100 },
          verticalAlign: D.VerticalAlign.CENTER,
          children: kids,
        });
      }),
    })
  );
  return new Table({
    columnWidths: colWidths, width: { size: total, type: WidthType.DXA },
    borders, rows: trs,
  });
}

// ---- answer line (bottom border paragraph, full width) ----
function answerLine(o={}) {
  return new Paragraph({
    children: [ run("", {}) ],
    spacing: { after: o.after ?? 160, before: o.before ?? 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.midGrey } },
  });
}

// numbering config for ordered lists
const NUMBERING = {
  config: [{
    reference: "num", levels: [{
      level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.START,
      style: { run: { bold:true, color: C.blue }, paragraph: { indent: { left: 420, hanging: 260 } } },
    }],
  }],
};
function numbered(str, o={}) {
  const num = { reference: "num", level: 0 };
  if (o.instance != null) num.instance = o.instance; // separate counter → restarts at 1
  return new Paragraph({
    children: Array.isArray(str) ? str : [run(str, o)],
    numbering: num,
    spacing: { after: o.after ?? 60, line: 264 },
  });
}

// labelled line (no bullet): "Label  value" with bold coloured label — for meta fields
function labelLine(label, value, o={}) {
  return new Paragraph({
    children: [ run(label + "  ", { bold: true, color: o.color || C.navy, size: o.size||22 }), run(value, { size:o.size||22 }) ],
    spacing: { after: o.after ?? 60, line: 264 },
  });
}
function spacer(h=120){ return new Paragraph({ children:[run("")], spacing:{ after:h } }); }

module.exports = {
  D, C, accentFor, LETTER, MARGINS, NUMBERING,
  run, P, text, h1, h2, h3, subtitle, bullet, kv, labelLine, table, answerLine, numbered, spacer,
};
