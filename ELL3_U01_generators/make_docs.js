// ELL 2 Unit 7 — lesson plans, practice test, unit test, answer key
const path = require("path");
const H = require("./docxhelp");
const { UNIT, LESSONS } = require("./lessons");
const { WS } = require("./wsdata");
const { PRACTICE, UNITTEST, SCALE, PLAN_DETAIL } = require("./unitdocs");
const { textsFor } = require("./texts_in_deck");
const { MODEL } = require("./extra_content");
const { TEST_LETTER } = require("./unitdocs");

const {
  p, t, h1, h2, h3, small, rule, pageBreak, item, bullet, answerLines, box, table, row, headerRow,
  makeDoc, write, titleBlock, nameDateLine, NAVY, BLUE, PALE, PALER, GREY, BODY, SMALL, H3, CONTENT_W,
} = H;

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const sumMarks = (t) => t.sections.reduce((a, s) => a + s.marks, 0);

// Deterministic derangement: stable across rebuilds, and guaranteed to leave no
// term matched to the definition in its own position (which would make the
// matching section answerable without reading it).
function permute(n, seed) {
  const idx = [...Array(n).keys()];
  let s = seed >>> 0;
  const rnd = () => {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    return s / 4294967296;
  };
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  for (let i = 0; i < n; i++) {
    if (idx[i] === i) {
      const j = (i + 1) % n;
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
  }
  if (idx.some((v, i) => v === i)) throw new Error("derangement failed");
  return idx;
}

// ---------------------------------------------------------------- lesson plans
async function buildPlans(outDir) {
  const children = [];
  children.push(...titleBlock(UNIT, "Lesson Plans", `${UNIT.subtitle} \u00B7 ten lessons \u00B7 Advanced tier`));
  children.push(box("Unit at a glance", [
    p([t("Composition: ", { bold: true, size: SMALL }), t(UNIT.composition, { size: SMALL })], { after: 40 }),
    p([t("Model essay: ", { bold: true, size: SMALL }), t(MODEL.title, { size: SMALL })], { after: 40 }),
    p([t("Assessment: ", { bold: true, size: SMALL }), t(`Practice test (${PRACTICE.total} marks) after Lesson 8; unit test (${UNITTEST.total} marks) after Lesson 10.`, { size: SMALL })], { after: 40 }),
    p([t("Scale: ", { bold: true, size: SMALL }), t(SCALE.note, { size: SMALL })], { after: 0 }),
  ], { fill: PALE }));
  children.push(p("", { after: 160 }));

  children.push(h2("Differentiation across the unit"));
  children.push(p([t(PLAN_DETAIL.common.differentiation, { size: SMALL })], { after: 120 }));

  LESSONS.forEach((L) => {
    const det = PLAN_DETAIL.perLesson[L.n];
    children.push(pageBreak());
    children.push(p([t(`Lesson ${L.n}`, { size: SMALL, bold: true, color: BLUE })], { after: 30 }));
    children.push(p([t(L.title, { size: 34, bold: true, color: NAVY })], { after: 60 }));
    children.push(rule({ before: 20, after: 140 }));

    const w = [Math.round(CONTENT_W * 0.24), CONTENT_W - Math.round(CONTENT_W * 0.24)];
    const rows = [
      row([p([t("Duration", { bold: true, size: SMALL })], { after: 0 }), p([t(PLAN_DETAIL.duration, { size: SMALL })], { after: 0 })], w),
      row([p([t("Materials", { bold: true, size: SMALL })], { after: 0 }), p([t(PLAN_DETAIL.common.materials, { size: SMALL })], { after: 0 })], w),
      row([p([t("Homework", { bold: true, size: SMALL })], { after: 0 }), p([t(det.hw, { size: SMALL })], { after: 0 })], w),
    ];
    children.push(table(rows, w));
    children.push(p("", { after: 160 }));

    children.push(h3("Learning goals"));
    L.goals.forEach((g) => children.push(bullet(g, { size: SMALL })));

    children.push(h3("Sequence"));
    const kText = textsFor(L).reduce((a, t) => a + t.pages.length, 0);
    const S = (n) => n + (n >= 7 ? kText : 0);
    const seq = [
      ["5 min", "Warm-up", `Slide 4. ${L.warmup[0]}`],
      ["5 min", "Goals and vocabulary", "Slides 5 and 6. Read the goals, then the ten words. Students record the words on the worksheet as they appear." + (kText ? ` The class text follows in full on slides 7\u2013${6 + kText}.` : "")],
      ["20 min", "Teaching", `Slides ${S(7)} and ${S(8)}: ${L.teach1.title}; ${L.teach2.title}. Stop after each for one check question.`],
      ["10 min", "Examples", `Slide ${S(9)}. Read each aloud and ask students to judge strong or weak before you explain.`],
      ["15 min", "Guided practice", `Slide ${S(10)} and worksheet Parts A and B. ${L.practice.instr}`],
      ["10 min", "Speaking", `Slide ${S(11)}. Both partners must speak. Circulate for the target structure.`],
      ["12 min", "Independent writing", `Slide ${S(12)}. ${L.yourturn.instr}`],
      ["3 min", "Exit ticket", `Slide ${S(13)}. ${L.exit[0]}`],
    ];
    const sw = [Math.round(CONTENT_W * 0.11), Math.round(CONTENT_W * 0.22), 0];
    sw[2] = CONTENT_W - sw[0] - sw[1];
    const srows = [headerRow(["Time", "Stage", "What happens"], sw)];
    seq.forEach((s) => srows.push(row([
      p([t(s[0], { size: SMALL, bold: true })], { after: 0 }),
      p([t(s[1], { size: SMALL, bold: true, color: NAVY })], { after: 0 }),
      p([t(s[2], { size: SMALL })], { after: 0 }),
    ], sw)));
    children.push(table(srows, sw));
    children.push(p("", { after: 160 }));

    children.push(h3("Watch for"));
    children.push(p([t(det.watch, { size: SMALL })], { after: 100 }));

    children.push(h3("Assessment evidence"));
    const wsL = WS.find((x) => x.n === L.n);
    children.push(p([t(`Worksheet parts: ${wsL.parts.map((x) => x.title.replace(/ —.*/, "")).join(", ")}. Exit ticket questions on slide 11.`, { size: SMALL })], { after: 100 }));
  });

  const doc = makeDoc([children], { title: `${UNIT.course} U${UNIT.num} Lesson Plans`, runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 Lesson Plans` });
  const f = path.join(outDir, `${UNIT.course}_${UNIT.code}_Plan_LessonPlans_v1.docx`);
  await write(doc, f);
  return f;
}

// ---------------------------------------------------------------- tests
function renderTestSection(sec, forKey, seedBase) {
  const out = [];
  out.push(h2(`Section ${sec.id} \u2014 ${sec.title}`, NAVY));
  out.push(p([t(`(${sec.marks} marks)`, { size: SMALL, bold: true, color: BLUE })], { after: 60 }));
  out.push(p([t(sec.instr, { size: SMALL, italics: true, color: GREY })], { after: 140 }));

  if (sec.kind === "match") {
    const w = [Math.round(CONTENT_W * 0.08), Math.round(CONTENT_W * 0.34), Math.round(CONTENT_W * 0.08), 0];
    w[3] = CONTENT_W - w[0] - w[1] - w[2];
    const shuffled = permute(sec.terms.length, (seedBase || 1) * 7919 + sec.id.charCodeAt(0) * 131)
      .map((i) => ({ def: sec.terms[i][1], i }));
    const rows = [headerRow(["", "Word", "", "Definition"], w)];
    sec.terms.forEach((term, i) => {
      const dEntry = shuffled[i];
      rows.push(row([
        p([t("____", { size: SMALL })], { after: 0 }),
        p([t(`${i + 1}. ${term[0]}`, { size: SMALL, bold: true })], { after: 0 }),
        p([t(LETTERS[i] + ".", { size: SMALL, bold: true })], { after: 0 }),
        p([t(dEntry.def, { size: SMALL })], { after: 0 }),
      ], w));
    });
    out.push(table(rows, w));
    out.push(p("", { after: 160 }));
    if (forKey) {
      const map = sec.terms.map((term, i) => {
        const li = shuffled.findIndex((s) => s.i === i);
        return `${i + 1} = ${LETTERS[li]}`;
      });
      out.push(p([t("Key: " + map.join(", "), { size: SMALL, bold: true, color: BLUE })], { after: 120 }));
    }
  }

  else if (sec.kind === "short") {
    sec.items.forEach((it, i) => {
      out.push(item(i + 1, it.q, { after: 40 }));
      if (forKey) out.push(p([t("\u2192 " + it.a, { size: SMALL, color: BLUE })], { after: 120, indent: { left: 360 } }));
      else out.push(...answerLines(it.lines || 2, { gap: 230, indent: { left: 360 } }));
    });
  }

  else if (sec.kind === "fill") {
    sec.items.forEach((it, i) => {
      out.push(item(i + 1, it.q, { after: 40 }));
      if (forKey) out.push(p([t("\u2192 " + it.a, { size: SMALL, color: BLUE })], { after: 110, indent: { left: 360 } }));
      else out.push(...answerLines(1, { gap: 210, indent: { left: 360 } }));
    });
  }

  else if (sec.kind === "write" || sec.kind === "compose") {
    if (sec.passage) {
      out.push(box("", [p([t(sec.passage, { size: BODY })], { after: 0 })], { fill: PALER }));
      out.push(p("", { after: 140 }));
    }
    if (forKey) out.push(p([t("\u2192 " + sec.a, { size: SMALL, color: BLUE })], { after: 140 }));
    else out.push(...answerLines(sec.lines || 12, { gap: 250 }));
  }

  return out;
}

async function buildTest(spec, label, filename, outDir) {
  const children = [];
  const total = sumMarks(spec);
  children.push(...titleBlock(UNIT, label, UNIT.subtitle));
  children.push(nameDateLine());
  children.push(p("", { after: 120 }));

  const w = [Math.round(CONTENT_W / 3), Math.round(CONTENT_W / 3), 0];
  w[2] = CONTENT_W - w[0] - w[1];
  children.push(table([
    row([
      p([t("Total marks: ", { bold: true, size: SMALL }), t(String(total), { bold: true, size: SMALL, color: BLUE })], { after: 0 }),
      p([t("Time: ", { bold: true, size: SMALL }), t(spec.time, { size: SMALL })], { after: 0 }),
      p([t("Sections: ", { bold: true, size: SMALL }), t(spec.sections.map((s) => `${s.id} (${s.marks})`).join(", "), { size: SMALL })], { after: 0 }),
    ], w, { fill: PALE }),
  ], w));
  children.push(p("", { after: 180 }));

  spec.sections.forEach((sec, i) => {
    if (sec.useTestLetter) {
      children.push(pageBreak());
      children.push(p([t(TEST_LETTER.title, { bold: true, size: 30, color: NAVY })], { after: 40 }));
      children.push(p([t(TEST_LETTER.author, { size: SMALL, italics: true, color: GREY })], { after: 140 }));
      TEST_LETTER.paras.forEach((par) => children.push(p([t(par, { size: BODY })], { after: 110 })));
      children.push(pageBreak());
    } else if (i > 0) {
      children.push(rule({ before: 170, after: 160 }));
    }
    children.push(...renderTestSection(sec, false, spec.seed));
  });

  const doc = makeDoc([children], { title: `${UNIT.course} U${UNIT.num} ${label}`, runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 ${label} \u00B7 ${total} marks` });
  const f = path.join(outDir, filename);
  await write(doc, f);
  return { file: f, total };
}

// ---------------------------------------------------------------- answer key
async function buildKey(outDir) {
  const children = [];
  children.push(...titleBlock(UNIT, "Answer Key", "Teacher copy \u2014 worksheets, practice test, unit test, assessment scale"));

  children.push(h2("Assessment scale"));
  children.push(p([t(SCALE.note, { size: SMALL, italics: true, color: GREY })], { after: 100 }));
  {
    const w = [Math.round(CONTENT_W * 0.26), 0];
    w[1] = CONTENT_W - w[0];
    const rows = [headerRow(["Level", "Descriptor"], w)];
    SCALE.levels.forEach((l) => rows.push(row([
      p([t(l[0], { bold: true, size: SMALL, color: NAVY })], { after: 0 }),
      p([t(l[1], { size: SMALL })], { after: 0 }),
    ], w)));
    children.push(table(rows, w));
  }
  children.push(p("", { after: 180 }));

  // worksheets
  LESSONS.forEach((L) => {
    const ws = WS.find((x) => x.n === L.n);
    children.push(pageBreak());
    children.push(p([t(`Worksheet \u2014 Lesson ${L.n}`, { size: SMALL, bold: true, color: BLUE })], { after: 30 }));
    children.push(p([t(L.title, { size: 32, bold: true, color: NAVY })], { after: 60 }));
    children.push(rule({ before: 20, after: 140 }));

    ws.parts.forEach((part) => {
      if (part.kind === "model") return;
      children.push(h3(part.title));
      if (part.kind === "cloze") {
        part.items.forEach((it, i) => children.push(p([t(`${i + 1}. `, { bold: true, size: SMALL }), t(it.answer, { size: SMALL, color: BLUE, bold: true })], { after: 50, indent: { left: 300 } })));
        const extras = part.bank.filter((b) => !part.items.some((it) => it.answer.toLowerCase() === b.toLowerCase()));
        if (extras.length) children.push(p([t("Extra words not used: " + extras.join(", "), { size: SMALL, italics: true, color: GREY })], { after: 100, indent: { left: 300 } }));
      } else if (part.items) {
        part.items.forEach((it, i) => children.push(p([
          t(`${i + 1}. `, { bold: true, size: SMALL }),
          t((it.text ? it.text + " \u2192 " : (it.q ? it.q + " \u2192 " : "")), { size: SMALL }),
          t(it.answer || "", { size: SMALL, color: BLUE, bold: true }),
        ], { after: 60, indent: { left: 300 } })));
        if (part.answer) children.push(p([t(part.answer, { size: SMALL, italics: true, color: GREY })], { after: 100, indent: { left: 300 } }));
      } else if (part.answer) {
        children.push(p([t(part.answer, { size: SMALL, color: BLUE })], { after: 100, indent: { left: 300 } }));
      }
    });
  });

  // tests
  [[PRACTICE, "Practice Test"], [UNITTEST, "Unit Test"]].forEach(([spec, label]) => {
    children.push(pageBreak());
    children.push(p([t("Assessment", { size: SMALL, bold: true, color: BLUE })], { after: 30 }));
    children.push(p([t(`${label} \u2014 ${sumMarks(spec)} marks`, { size: 32, bold: true, color: NAVY })], { after: 60 }));
    children.push(rule({ before: 20, after: 140 }));
    spec.sections.forEach((sec) => children.push(...renderTestSection(sec, true, spec.seed)));
  });

  const doc = makeDoc([children], { title: `${UNIT.course} U${UNIT.num} Answer Key`, runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 Answer Key` });
  const f = path.join(outDir, `${UNIT.course}_${UNIT.code}_AnswerKey_v1.docx`);
  await write(doc, f);
  return f;
}

(async () => {
  const outDir = process.argv[2] || "/mnt/user-data/outputs/ELL3_Unit01";
  require("fs").mkdirSync(outDir, { recursive: true });
  console.log("plans:", path.basename(await buildPlans(outDir)));
  const pt = await buildTest(PRACTICE, "Practice Test", `${UNIT.course}_${UNIT.code}_PracticeTest_v1.docx`, outDir);
  console.log("practice test:", path.basename(pt.file), "total", pt.total);
  const ut = await buildTest(UNITTEST, "Unit Test", `${UNIT.course}_${UNIT.code}_UnitTest_v1.docx`, outDir);
  console.log("unit test:", path.basename(ut.file), "total", ut.total);
  console.log("answer key:", path.basename(await buildKey(outDir)));
})();
