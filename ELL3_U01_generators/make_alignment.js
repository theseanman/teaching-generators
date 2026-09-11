const path = require("path");
const fs = require("fs");
const H = require("./docxhelp");
const { UNIT, LESSONS } = require("./lessons");
const { ALIGNMENT, ORAL_RECORD, SOURCE_NOTE, ORAL_RECORD_DISABLED } = require("./alignment");

const { p, t, h2, h3, rule, pageBreak, bullet, box, table, row, headerRow, answerLines,
        makeDoc, write, titleBlock, NAVY, BLUE, PALE, PALER, GREY, BODY, SMALL, CONTENT_W } = H;

function widths(fr) {
  const w = fr.map((f) => Math.round(CONTENT_W * f));
  w[w.length - 1] = CONTENT_W - w.slice(0, -1).reduce((a, b) => a + b, 0);
  return w;
}

let OUT = "";
const fname = (s) => path.join(OUT, `${UNIT.course}_${UNIT.code}_${s}_v1.docx`);

async function alignment() {
  const c = [];
  c.push(...titleBlock(UNIT, "Can-Do Alignment", `${ALIGNMENT.level} \u00B7 derived from the BC ELL Standards 2017`));
  c.push(box("Read this before using these statements", [
    p([t(SOURCE_NOTE, { size: SMALL })], { after: 0 }),
  ], { fill: PALE }));
  c.push(p("", { after: 160 }));
  c.push(p([t("Unit lever: ", { size: SMALL, bold: true, color: NAVY }), t(ALIGNMENT.lever, { size: SMALL })], { after: 200 }));

  ALIGNMENT.domains.forEach((d, i) => {
    if (i > 0) c.push(pageBreak());
    c.push(h2(d.name));
    c.push(p([t(d.pages, { size: SMALL, italics: true, color: GREY })], { after: 140 }));
    const w = widths([0.36, 0.44, 0.20]);
    c.push(table([
      headerRow(["Derived statement", "Source descriptor", "Lessons"], w),
      ...d.rows.map((r) => row([
        p([t(r.can, { size: SMALL, bold: true, color: NAVY })], { after: 0 }),
        p([t(r.src, { size: SMALL })], { after: 0 }),
        p([t(r.lessons, { size: SMALL })], { after: 0 }),
      ], w)),
    ], w));
  });

  c.push(pageBreak());
  c.push(h2("Two limits"));
  c.push(p([t(ALIGNMENT.caution, { size: BODY })], { after: 180 }));
  c.push(box("For the lesson plan alignment box", [
    p([t("Each lesson's alignment box should carry only the statements whose Lessons column names that lesson \u2014 typically two or three, from the writing table. Do not list every outcome on every plan; an alignment box that never changes stops being read.", { size: SMALL })], { after: 0 }),
  ], { fill: PALER }));

  const doc = makeDoc([c], { title: `${UNIT.course} ${UNIT.code} Can-Do Alignment`, runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 Can-Do Alignment (derived)` });
  const f = fname("CanDoAlignment"); await write(doc, f); return f;
}

async function oralRecord() {
  const R = ORAL_RECORD;
  const c = [];
  c.push(...titleBlock(UNIT, R.title, R.subtitle));
  c.push(box("Why this exists", [p([t(R.intro, { size: SMALL })], { after: 0 })], { fill: PALE }));
  c.push(p("", { after: 180 }));

  c.push(h2("How to use it"));
  R.howToUse.forEach((x) => c.push(bullet(x, { size: BODY })));

  c.push(p("", { after: 160 }));
  c.push(h2("What the three columns mean"));
  const cw = widths([0.26, 0.74]);
  c.push(table([
    headerRow(["Column", "What you are looking for"], cw),
    ...R.columns.map((r) => row([
      p([t(r[0], { bold: true, size: SMALL, color: NAVY })], { after: 0 }),
      p([t(r[1], { size: SMALL })], { after: 0 }),
    ], cw)),
  ], cw));

  c.push(pageBreak());
  c.push(h2("The speaking task in each lesson"));
  const tw = widths([0.10, 0.90]);
  c.push(table([
    headerRow(["", "Task"], tw),
    ...R.lessonTasks.map((r) => row([
      p([t(r[0], { bold: true, size: SMALL, color: BLUE })], { after: 0 }),
      p([t(r[1], { size: SMALL })], { after: 0 }),
    ], tw)),
  ], tw));

  c.push(pageBreak());
  c.push(h2("Record"));
  c.push(p([t("One page per pass through the class. Five or six students a lesson; rotate.", { size: SMALL, italics: true, color: GREY })], { after: 160 }));
  const rw = widths([0.22, 0.10, 0.23, 0.23, 0.22]);
  const blankRows = [];
  for (let i = 0; i < 14; i++) {
    blankRows.push(row([
      p("", { after: 0, size: SMALL }),
      p("", { after: 0, size: SMALL }),
      p("", { after: 0, size: SMALL }),
      p("", { after: 0, size: SMALL }),
      p("", { after: 0, size: SMALL }),
    ], rw));
  }
  c.push(table([
    headerRow(["Student", "Lesson", "Opinion with a reason", "Sustaining", "Listening"], rw),
    ...blankRows,
  ], rw));

  const doc = makeDoc([c], { title: `${UNIT.course} ${UNIT.code} Oral Language Record`, runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 Oral Language Evidence` });
  const f = fname("OralLanguage_EvidenceRecord"); await write(doc, f); return f;
}

(async () => {
  OUT = process.argv[2] || "/mnt/user-data/outputs/ELL3_Unit01";
  fs.mkdirSync(OUT, { recursive: true });
  for (const fn of (ORAL_RECORD_DISABLED ? [alignment] : [alignment, oralRecord])) {
    console.log("built:", path.basename(await fn()));
  }
})();
