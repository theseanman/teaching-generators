// ELL 2 Unit 7 — worksheet generator
const path = require("path");
const H = require("./docxhelp");
const { UNIT, LESSONS } = require("./lessons");
const { WS } = require("./wsdata");
const { MODEL } = require("./extra_content");

const {
  p, t, h2, h3, small, rule, item, bullet, answerLines, box, table, row, headerRow,
  makeDoc, write, titleBlock, nameDateLine, NAVY, BLUE, PALE, PALER, GREY, BODY, SMALL, CONTENT_W,
} = H;

function wordBank(bank) {
  const cols = 4;
  const cw = Math.floor(CONTENT_W / cols);
  const widths = new Array(cols).fill(cw);
  widths[cols - 1] = CONTENT_W - cw * (cols - 1);
  const rows = [];
  for (let i = 0; i < bank.length; i += cols) {
    const slice = bank.slice(i, i + cols);
    while (slice.length < cols) slice.push("");
    rows.push(row(slice.map((w) => p([t(w, { bold: true, size: SMALL, color: NAVY })], { after: 0 })), widths, { fill: PALER }));
  }
  const out = [p([t("Word bank", { bold: true, size: SMALL, color: BLUE })], { before: 60, after: 60 })];
  out.push(table(rows, widths));
  out.push(p("", { after: 140 }));
  return out;
}

function renderPart(part, lessonNum) {
  const out = [];
  out.push(h2(part.title));
  if (part.instr) out.push(p([t(part.instr, { size: SMALL, italics: true, color: GREY })], { after: 120 }));

  if (part.kind === "cloze") {
    out.push(...wordBank(part.bank));
    part.items.forEach((it, i) => out.push(item(i + 1, it.text)));
    out.push(p("", { after: 120 }));
  }

  else if (part.kind === "label") {
    part.items.forEach((it, i) => {
      out.push(item(i + 1, it.text, { after: 40 }));
      out.push(...answerLines(1, { gap: 200, indent: { left: 360 } }));
    });
  }

  else if (part.kind === "edit" || part.kind === "combine") {
    part.items.forEach((it, i) => {
      out.push(item(i + 1, it.text, { after: 40 }));
      out.push(...answerLines(2, { gap: 220, indent: { left: 360 } }));
    });
  }

  else if (part.kind === "revise") {
    if (part.passage) {
      out.push(box("", [p([t(part.passage, { size: BODY })], { after: 0 })], { fill: PALER }));
      out.push(p("", { after: 140 }));
    }
    if (part.table) {
      const cols = part.table.length;
      const cw = Math.floor(CONTENT_W / cols);
      const widths = new Array(cols).fill(cw);
      widths[cols - 1] = CONTENT_W - cw * (cols - 1);
      const rows = [headerRow(part.table, widths)];
      const nRows = part.rows || 3;
      const labels = part.rowLabels || [];
      for (let r = 0; r < nRows; r++) {
        const cells = new Array(cols).fill("");
        cells[0] = labels[r] !== undefined ? labels[r] : "";
        rows.push(row(cells.map((c) => p(c, { after: 0, size: SMALL })), widths));
      }
      out.push(table(rows, widths));
      out.push(p("", { after: 160 }));
      if (part.footerPrompt) {
        out.push(p([t(part.footerPrompt, { bold: true, size: SMALL })], { after: 80 }));
        out.push(...answerLines(part.footerLines || 3, { gap: 240 }));
      }
    } else if (part.items) {
      part.items.forEach((it, i) => {
        out.push(item(i + 1, it.text, { after: 40 }));
        out.push(...answerLines(2, { gap: 220, indent: { left: 360 } }));
      });
    } else {
      out.push(...answerLines(part.lines || 6, { gap: 250 }));
    }
  }

  else if (part.kind === "lines") {
    out.push(...answerLines(part.lines || 6, { gap: 250 }));
  }

  else if (part.kind === "comp") {
    part.items.forEach((it, i) => {
      out.push(item(i + 1, it.q, { after: 40 }));
      out.push(...answerLines(it.lines || 2, { gap: 230, indent: { left: 360 } }));
    });
  }

  else if (part.kind === "model") {
    out.push(p([t(MODEL.title, { bold: true, size: 30, color: NAVY })], { after: 60 }));
    out.push(p([t(MODEL.note, { size: SMALL, italics: true, color: GREY })], { after: 140 }));
    MODEL.paras.forEach((par) => {
      if (typeof par === "string") {
        out.push(p([t(par, { size: BODY })], { after: 110 }));
      } else {
        out.push(p([t(par.label, { bold: true, size: SMALL, color: BLUE })], { before: 120, after: 50 }));
        out.push(p([t(par.text, { size: BODY })], { after: 100 }));
      }
    });
    out.push(p("", { after: 140 }));
  }

  return out;
}

async function buildWorksheet(lesson, ws, outDir) {
  const children = [];
  children.push(...titleBlock(UNIT, `Lesson ${lesson.n} Worksheet`, lesson.title));
  children.push(nameDateLine());
  children.push(rule({ before: 140, after: 160 }));
  children.push(box("Goal for this lesson", [p([t(lesson.goals[0] + ".", { size: SMALL })], { after: 0 })], { fill: PALE, titleSize: SMALL }));
  children.push(p("", { after: 180 }));

  ws.parts.forEach((part, i) => {
    if (i > 0) children.push(rule({ before: 140, after: 140 }));
    children.push(...renderPart(part, lesson.n));
  });

  const doc = makeDoc([children], {
    title: `${UNIT.course} U${UNIT.num} L${lesson.n} Worksheet`,
    runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 Lesson ${lesson.n} Worksheet`,
  });
  const nn = String(lesson.n).padStart(2, "0");
  const file = path.join(outDir, `${UNIT.course}_${UNIT.code}_Worksheet_L${nn}_${lesson.slug}_v1.docx`);
  await write(doc, file);
  return file;
}

(async () => {
  const outDir = process.argv[2] || "/mnt/user-data/outputs/ELL3_Unit02";
  require("fs").mkdirSync(outDir, { recursive: true });
  for (const lesson of LESSONS) {
    const ws = WS.find((w) => w.n === lesson.n);
    const f = await buildWorksheet(lesson, ws, outDir);
    console.log("worksheet:", path.basename(f));
  }
})();
