// ELL 2 Unit 7 — worksheet generator
const path = require("path");
const { Paragraph, TextRun, TabStopType } = require("docx");
const H = require("./docxhelp");
const { UNIT, LESSONS } = require("./lessons");
const { WS } = require("./wsdata");
const { MODEL } = require("./extra_content");

const {
  p, t, h2, h3, small, rule, item, bullet, answerLines, box, table, row, headerRow, exampleItem, sc,
  makeDoc, write, titleBlock, nameDateLine, NAVY, BLUE, PALE, PALER, GREY, BODY, SMALL, CONTENT_W,
} = H;

function wordBank(bank, exWord) {
  const cols = 4;
  const cw = Math.floor(CONTENT_W / cols);
  const widths = new Array(cols).fill(cw);
  widths[cols - 1] = CONTENT_W - cw * (cols - 1);
  const rows = [];
  for (let i = 0; i < bank.length; i += cols) {
    const slice = bank.slice(i, i + cols);
    while (slice.length < cols) slice.push("");
    rows.push(row(slice.map((w) => p([t(w, { bold: true, size: SMALL, color: (exWord && w.toLowerCase() === String(exWord).toLowerCase()) ? "9CA3AF" : NAVY, strike: !!(exWord && w.toLowerCase() === String(exWord).toLowerCase()) })], { after: 0 })), widths, { fill: PALER }));
  }
  const out = [p([t("Word bank", { bold: true, size: SMALL, color: BLUE }), t(exWord ? "   (cross out each word when you use it)" : "", { size: SMALL, italics: true, color: GREY })], { before: 60, after: 60, keepNext: true })];
  out.push(table(rows, widths));
  out.push(p("", { after: 140 }));
  return out;
}

function exFrom(it) {
  if (!it) return null;
  if (it.ex) return it.ex;
  let a = it.answer || "";
  if (!a || /^(Accept|Any|Look|Reject|Marked|Student|Grade|MyEd|September|Q1)/.test(a)) return null;
  a = a.split(/\s\/\s|\. Reject|\. Accept|\. One mark|\. Do not|\. No comma/)[0].trim();
  a = a.split(/(?<=[a-z\u201d)])\. (?=[A-Z])/)[0].trim();   // first sentence only: marking notes never reach the student
  if (a.split(/\s+/).length > 28) return null;
  return a.replace(/\.$/, "").length ? (a.endsWith(".") || a.length < 12 ? a : a + ".") : null;
}
function renderPart(part, lessonNum) {
  const out = [];
  out.push(h2(part.title));
  if (part.instr) out.push(p([t(part.instr, { size: SMALL, italics: true, color: GREY })], { after: 120, keepNext: true }));

  if (part.kind === "cloze") {
    const ex0 = exFrom(part.items[0]);
    out.push(...wordBank(part.bank, ex0));
    part.items.forEach((it, i) => out.push(i === 0 && ex0 ? exampleItem(1, it.text, ex0) : item(i + 1, it.text, { keepNext: i < 2 || i === part.items.length - 2 })));
    out.push(p("", { after: 120 }));
  }

  else if (part.kind === "label") {
    part.items.forEach((it, i) => {
      const ex = i === 0 ? exFrom(it) : null;
      if (ex) { out.push(exampleItem(1, it.text, ex)); return; }
      out.push(item(i + 1, it.text, { after: 40, keepNext: true }));
      out.push(...answerLines(1, { gap: 200, indent: { left: 360 }, keepNext: i === part.items.length - 2 }));
    });
  }

  else if (part.kind === "edit" || part.kind === "combine") {
    part.items.forEach((it, i) => {
      const ex = i === 0 ? exFrom(it) : null;
      if (ex) { out.push(exampleItem(1, it.text, ex)); return; }
      out.push(item(i + 1, it.text, { after: 40, keepNext: true }));
      out.push(...answerLines(2, { gap: 220, indent: { left: 360 }, keepNext: i === part.items.length - 2 }));
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
        const ex = i === 0 ? exFrom(it) : null;
        if (ex) { out.push(exampleItem(1, it.text, ex)); return; }
        out.push(item(i + 1, it.text, { after: 40, keepNext: true }));
        out.push(...answerLines(2, { gap: 220, indent: { left: 360 }, keepNext: i === part.items.length - 2 }));
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
      const ex = i === 0 ? exFrom(it) : null;
      if (ex) { out.push(exampleItem(1, it.q, ex)); return; }
      out.push(item(i + 1, it.q, { after: 40, keepNext: true }));
      out.push(...answerLines(Math.max(it.lines || 2, it.lines === 1 ? 1 : 2), { gap: 230, indent: { left: 360 }, keepNext: i === part.items.length - 2 }));
    });
  }
  else if (part.kind === "check") {
    for (let i = 0; i < part.items.length; i += 2) {
      const a = part.items[i], b = part.items[i + 1];
      const runs = [t("\u2610  " + a)]; if (b) runs.push(new TextRun({ text: "\t\u2610  " + b, font: "Calibri", size: BODY }));
      out.push(new Paragraph({ children: runs, keepNext: i + 2 < part.items.length, spacing: { before: sc(120), after: 0 }, indent: { left: 360 }, tabStops: [{ type: TabStopType.LEFT, position: 360 + Math.round(CONTENT_W / 2) }] }));
    }
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

const CHECK_MAP = { W1: "I used at least two words from the vocabulary box.", W2: "My sentences give details a reader could picture.", W4: "I used and, but, or so to join two ideas.", W5: "I used because, while, when or since in a complex sentence.", W11: "Every verb agrees with its subject.", W12: "Every sentence starts with a capital letter and ends with a period.", W13: "My articles (a, an, the) and prepositions are correct.", W14: "Every sentence is complete: no fragments, no run-ons.", W15: "I read my work back and fixed at least one thing." };
function checksFor(outcomes) {
  const ws = (outcomes.match(/W\d+/g) || []);
  const out = ws.map((w) => CHECK_MAP[w]).filter(Boolean);
  if (!ws.includes("W12")) out.push(CHECK_MAP.W12);
  if (!ws.includes("W14")) out.push(CHECK_MAP.W14);
  return out;
}
async function buildWorksheet(lesson, ws, outDir) {
  const children = [];
  children.push(...titleBlock(UNIT, `Lesson ${lesson.n} Worksheet`, lesson.title, { rule: false }));
  children.push(nameDateLine());
  children.push(p("", { after: 120 }));
  children.push(box("Goal for this lesson", [p([t(lesson.goals[0] + ".", { size: SMALL })], { after: 0 }), p([t("Outcome: ", { bold: true, size: SMALL, color: BLUE }), t(lesson.outcomes || "", { size: SMALL, color: GREY })], { before: 40, after: 0 })], { fill: PALE, titleSize: SMALL }));
  children.push(p("", { after: 180 }));

  const parts = ws.parts.slice();
  if (!lesson.writingSample) {
    const nextLetter = String.fromCharCode("A".charCodeAt(0) + parts.length);
    parts.push({ kind: "check", title: `Part ${nextLetter} \u2014 Check your work`, instr: "Tick each box when it is true. These are the learning outcomes at the top of the sheet.", items: checksFor(lesson.outcomes || "") });
  }
  parts.forEach((part, i) => {
    if (i > 0) children.push(p("", { after: 160 }));
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
  const outDir = process.argv[2] || "/mnt/user-data/outputs/ELL3_Unit01";
  require("fs").mkdirSync(outDir, { recursive: true });
  for (const lesson of LESSONS) {
    const ws = WS.find((w) => w.n === lesson.n);
    if (process.env.ONLY && !process.env.ONLY.includes(`L${String(lesson.n).padStart(2, "0")}_${lesson.slug}`)) continue;
    const f = await buildWorksheet(lesson, ws, outDir);
    console.log("worksheet:", path.basename(f));
  }
})();
