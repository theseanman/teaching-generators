const path = require("path");
const fs = require("fs");
const H = require("./docxhelp");
const { UNIT } = require("./lessons");
const { EXEMPLARS, NOTEBOOK } = require("./content");
const { INTRO, PARENT_LETTER, SCALE, RUBRIC } = require("./unitdocs");

const { p, t, h2, h3, rule, pageBreak, bullet, box, table, row, headerRow, answerLines,
        makeDoc, write, titleBlock, NAVY, BLUE, PALE, PALER, GREY, BODY, SMALL, CONTENT_W } = H;

function widths(fr) {
  const w = fr.map((f) => Math.round(CONTENT_W * f));
  w[w.length - 1] = CONTENT_W - w.slice(0, -1).reduce((a, b) => a + b, 0);
  return w;
}

let OUT = "";
const fname = (s) => path.join(OUT, `${UNIT.course}_${UNIT.code}_${s}_v1.docx`);

async function exemplars() {
  const c = [];
  c.push(...titleBlock(UNIT, "Three-Tier Exemplars", EXEMPLARS.topic));
  c.push(box("How to read these", [p([t(EXEMPLARS.note, { size: SMALL })], { after: 0 })], { fill: PALE }));
  c.push(p("", { after: 180 }));
  EXEMPLARS.tiers.forEach((tier, i) => {
    if (i > 0) c.push(pageBreak());
    c.push(p([t(tier.name.toUpperCase(), { size: SMALL, bold: true, color: BLUE })], { after: 30 }));
    c.push(p([t(tier.name + " paragraph", { size: 32, bold: true, color: NAVY })], { after: 40 }));
    c.push(p([t(tier.band, { size: SMALL, italics: true, color: GREY })], { after: 60 }));
    c.push(rule({ before: 20, after: 160 }));
    tier.text.forEach((par) => c.push(p([t(par, { size: BODY })], { after: 120 })));
    c.push(p("", { after: 60 }));
    c.push(box("Why this sits at this level", tier.why.map((x) => bullet(x, { size: SMALL })), { fill: PALER }));
  });
  c.push(pageBreak());
  c.push(h2("What changes between the tiers"));
  const w = widths([0.16, 0.28, 0.28, 0.28]);
  c.push(table([
    headerRow(["", "Minimally Meeting", "Meeting", "Fully Meeting"], w),
    ...EXEMPLARS.comparison.map((r) => row([
      p([t(r[0], { bold: true, size: SMALL, color: NAVY })], { after: 0 }),
      p([t(r[1], { size: SMALL })], { after: 0 }),
      p([t(r[2], { size: SMALL })], { after: 0 }),
      p([t(r[3], { size: SMALL })], { after: 0 }),
    ], w)),
  ], w));
  const doc = makeDoc([c], { title: `${UNIT.course} ${UNIT.code} Exemplars`, runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 Exemplars` });
  const f = fname("Exemplars_ThreeTier"); await write(doc, f); return f;
}

async function notebook() {
  const N = NOTEBOOK;
  const c = [];
  c.push(...titleBlock(UNIT, N.title, N.subtitle));
  c.push(box("What this is", [p([t(N.intro, { size: SMALL })], { after: 0 })], { fill: PALE }));
  c.push(p("", { after: 180 }));

  c.push(h2("How it works"));
  N.howItWorks.forEach((x) => c.push(bullet(x, { size: BODY })));

  c.push(p("", { after: 160 }));
  c.push(h2("Checkpoints"));
  const cw = widths([0.22, 0.16, 0.62]);
  c.push(table([
    headerRow(["", "When", "What I look at"], cw),
    ...N.checkpoints.map((r) => row([
      p([t(r[0], { bold: true, size: SMALL, color: NAVY })], { after: 0 }),
      p([t(r[1], { size: SMALL })], { after: 0 }),
      p([t(r[2], { size: SMALL })], { after: 0 }),
    ], cw)),
  ], cw));

  c.push(pageBreak());
  c.push(h2("Three example entries"));
  N.exampleEntries.forEach((e) => {
    c.push(p([t(e[0].toUpperCase(), { size: SMALL, bold: true, color: BLUE })], { before: 140, after: 40 }));
    c.push(p([t(e[1], { size: BODY, italics: true })], { after: 60, indent: { left: 300 } }));
    c.push(p([t(e[2], { size: SMALL, color: GREY })], { after: 80, indent: { left: 300 } }));
  });

  c.push(p("", { after: 160 }));
  c.push(box("The final task", [p([t(N.finalTask, { size: SMALL })], { after: 0 })], { fill: PALER }));

  c.push(pageBreak());
  c.push(h2("Entry pages"));
  c.push(p([t("Ten entries, Lesson 3 to Lesson 12. If you join partway through, start where the class is.", { size: SMALL, italics: true, color: GREY })], { after: 160 }));
  for (let i = 3; i <= 12; i++) {
    c.push(p([t(`Lesson ${i}`, { size: SMALL, bold: true, color: BLUE })], { before: i === 3 ? 0 : 140, after: 50 }));
    c.push(p([t("The detail I noticed:", { size: SMALL, bold: true })], { after: 40 }));
    c.push(...answerLines(2, { gap: 240 }));
    c.push(p([t("What makes it specific rather than general:", { size: SMALL, bold: true })], { after: 40 }));
    c.push(...answerLines(2, { gap: 240 }));
    if (i === 7) c.push(pageBreak());
  }
  const doc = makeDoc([c], { title: `${UNIT.course} ${UNIT.code} Voices Notebook`, runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 Voices Notebook` });
  const f = fname("Project_VoicesNotebook"); await write(doc, f); return f;
}

async function rubrics() {
  const N = NOTEBOOK;
  const c = [];
  c.push(...titleBlock(UNIT, "Rubrics", "The Voices Notebook (40) and the descriptive paragraph (inside the unit test)"));
  c.push(box("How the Notebook is marked", [p([t(N.rubricIntro, { size: SMALL })], { after: 0 })], { fill: PALE }));
  c.push(p("", { after: 180 }));
  const w = widths([0.22, 0.78]);
  c.push(table([
    headerRow(["Level", "What the reflection does"], w),
    ...N.rubricRows.map((r) => row([
      p([t(r[0], { bold: true, size: SMALL, color: NAVY })], { after: 0 }),
      p([t(r[1], { size: SMALL })], { after: 0 }),
    ], w)),
  ], w));

  c.push(pageBreak());
  c.push(h2("The paragraph rubric"));
  c.push(p([t(RUBRIC.intro, { size: SMALL, italics: true, color: GREY })], { after: 140 }));
  const rw = widths([0.16, 0.21, 0.21, 0.21, 0.21]);
  c.push(table([
    headerRow(["Criterion", ...RUBRIC.levels], rw),
    ...RUBRIC.criteria.map((cr) => row([
      p([t(cr.name, { bold: true, size: SMALL, color: NAVY })], { after: 0 }),
      ...cr.rows.map((x) => p([t(x, { size: SMALL })], { after: 0 })),
    ], rw)),
  ], rw));
  const doc = makeDoc([c], { title: `${UNIT.course} ${UNIT.code} Rubrics`, runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 Rubrics` });
  const f = fname("Project_Rubrics"); await write(doc, f); return f;
}

async function intro() {
  const c = [];
  c.push(...titleBlock(UNIT, "Student Introduction", INTRO.title));
  INTRO.sections.forEach((s) => {
    c.push(h3(s.h));
    c.push(p([t(s.p, { size: BODY })], { after: 140 }));
  });
  c.push(p("", { after: 100 }));
  c.push(box("How you are reported on", [
    p([t(SCALE.note, { size: SMALL })], { after: 80 }),
    ...SCALE.levels.map((l) => p([t(l[0] + " \u2014 ", { size: SMALL, bold: true, color: NAVY }), t(l[1], { size: SMALL })], { after: 40 })),
  ], { fill: PALE }));
  const doc = makeDoc([c], { title: `${UNIT.course} ${UNIT.code} Student Intro`, runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 Introduction` });
  const f = fname("StudentIntro"); await write(doc, f); return f;
}

async function parent() {
  const L = PARENT_LETTER;
  const c = [];
  c.push(p([t(`${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 ${UNIT.month}`, { size: SMALL, bold: true, color: BLUE })], { after: 40 }));
  c.push(p([t(`${UNIT.title}: ${UNIT.subtitle}`, { size: 34, bold: true, color: NAVY })], { after: 40 }));
  c.push(rule({ before: 30, after: 200 }));
  c.push(p([t(L.greeting, { size: BODY })], { after: 160 }));
  c.push(p([t(L.intro, { size: BODY })], { after: 200 }));
  L.bullets.forEach((b, i) => {
    c.push(p([t(`${i + 1}. ${b[0]}`, { size: BODY, bold: true })], { before: 100, after: 50 }));
    c.push(p([t(b[1], { size: BODY })], { after: 100, indent: { left: 300 } }));
  });
  c.push(p("", { after: 180 }));
  c.push(p([t(L.close, { size: BODY })], { after: 200 }));
  c.push(p([t("Sincerely,", { size: BODY })], { after: 200 }));
  c.push(p([t(L.sign, { size: BODY, bold: true })], { after: 20 }));
  c.push(p([t("ELL 3 \u00B7 Language Strategies", { size: SMALL, color: GREY })], { after: 0 }));
  const doc = makeDoc([c], { title: `${UNIT.course} ${UNIT.code} Parent Letter`, noHeader: true });
  const f = fname("ParentLetter"); await write(doc, f); return f;
}

(async () => {
  OUT = process.argv[2] || "/mnt/user-data/outputs/ELL3_Unit01";
  fs.mkdirSync(OUT, { recursive: true });
  for (const fn of [exemplars, notebook, rubrics, intro, parent]) {
    console.log("built:", path.basename(await fn()));
  }
})();
