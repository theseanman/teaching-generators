const path = require("path");
const fs = require("fs");
const H = require("./docxhelp");
const { UNIT } = require("./lessons");
const { STORIES } = require("./stories");

const { p, t, h2, h3, rule, pageBreak, bullet, box, table, row, headerRow, answerLines,
        makeDoc, write, titleBlock, nameDateLine, NAVY, BLUE, PALE, PALER, GREY, BODY, SMALL, CONTENT_W } = H;

function widths(fr) {
  const w = fr.map((f) => Math.round(CONTENT_W * f));
  w[w.length - 1] = CONTENT_W - w.slice(0, -1).reduce((a, b) => a + b, 0);
  return w;
}

// Line-numbered story body. Paragraphs are numbered so students can cite
// "line 4" in an inference answer; numbering every paragraph is simplest to
// reference aloud and avoids the fragility of counting rendered text lines.
function storyBody(s) {
  const c = [];
  s.paras.forEach((par, i) => {
    c.push(p([
      t(String(i + 1).padStart(2, " ") + "  ", { size: SMALL, color: BLUE, bold: true }),
      t(par, { size: BODY }),
    ], { after: 130, indent: { left: 220, hanging: 220 } }));
  });
  return c;
}

async function studentCopy(s, outDir) {
  const c = [];
  c.push(...titleBlock(UNIT, s.title, s.blurb));
  c.push(box("Before you read", [
    p([t("Read the whole story once without stopping. Do not look anything up on the first reading.", { size: SMALL })], { after: 60 }),
    p([t("Then read it again with a pencil: underline words you are unsure of, star anything that made you picture something, and put a question mark beside anything confusing.", { size: SMALL })], { after: 60 }),
    p([t("The numbers down the left are there so you can point to your evidence. \u201cLine 12\u201d is a complete answer to \u201cwhere?\u201d", { size: SMALL })], { after: 0 }),
  ], { fill: PALE }));
  c.push(p("", { after: 200 }));
  c.push(...storyBody(s));

  // vocabulary
  c.push(pageBreak());
  c.push(h2("Words in this story"));
  c.push(p([t("These are the words most likely to slow you down. Everything else you can work out from around it.", { size: SMALL, italics: true, color: GREY })], { after: 140 }));
  const vw = widths([0.28, 0.72]);
  c.push(table([
    headerRow(["Word", "Meaning in this story"], vw),
    ...s.vocab.map((v) => row([
      p([t(v[0], { bold: true, size: SMALL, color: NAVY })], { after: 0 }),
      p([t(v[1], { size: SMALL })], { after: 0 }),
    ], vw)),
  ], vw));

  // questions
  c.push(pageBreak());
  c.push(nameDateLine());
  c.push(h2("Part A \u2014 On the page"));
  c.push(p([t("The answer to every question below is written somewhere in the story. Give the line number.", { size: SMALL, italics: true, color: GREY })], { after: 140 }));
  s.questions.literal.forEach((q, i) => {
    c.push(p([t(`${i + 1}. ${q}`, { size: BODY })], { after: 60 }));
    c.push(...answerLines(2));
  });

  c.push(pageBreak());
  c.push(h2("Part B \u2014 Underneath the page"));
  c.push(box("How Part B is marked", [
    p([t("Every answer needs two things: what you think, and what made you think it. An answer with no evidence scores nothing, even when it is right. An answer that quotes the text but makes no claim scores nothing either.", { size: SMALL })], { after: 60 }),
    p([t("Use the sentence frame if it helps: I think _____ because the story says _____ (line __).", { size: SMALL, italics: true })], { after: 0 }),
  ], { fill: PALER }));
  c.push(p("", { after: 160 }));
  s.questions.inference.forEach((q, i) => {
    c.push(p([t(`${i + 1}. ${q}`, { size: BODY })], { after: 60 }));
    c.push(...answerLines(4));
  });

  const doc = makeDoc([c], {
    title: `${UNIT.course} ${UNIT.code} ${s.title}`,
    runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 ${s.title}`,
  });
  const f = path.join(outDir, `${UNIT.course}_${UNIT.code}_Story_${s.slug}_v1.docx`);
  await write(doc, f);
  return f;
}

async function teacherCopy(s, outDir) {
  const n = s.teacherNotes;
  const c = [];
  c.push(...titleBlock(UNIT, n.heading, `Teaching copy \u00B7 ${s.lesson} \u00B7 not for students`));
  c.push(box("Read this first", [p([t(n.intro, { size: SMALL })], { after: 0 })], { fill: PALE }));
  c.push(p("", { after: 180 }));

  c.push(h2("What the story is doing"));
  n.points.forEach((pt) => {
    c.push(p([t(pt[0], { size: BODY, bold: true, color: NAVY })], { before: 110, after: 40 }));
    c.push(p([t(pt[1], { size: BODY })], { after: 90, indent: { left: 300 } }));
  });

  c.push(pageBreak());
  c.push(h2("Defensible themes"));
  c.push(p([t("Any of these can be argued from the text. Students do not need to arrive at these exact statements \u2014 they need a claim of this kind, not a topic word.", { size: SMALL, italics: true, color: GREY })], { after: 140 }));
  n.themes.forEach((th) => c.push(bullet(th, { size: BODY })));

  c.push(p("", { after: 200 }));
  c.push(box("Before you teach this", [p([t(n.caution, { size: SMALL })], { after: 0 })], { fill: PALER }));

  c.push(pageBreak());
  c.push(h2("Answer guidance"));
  c.push(h3("Part A \u2014 on the page"));
  c.push(p([t("Single marks. Accept any phrasing that lands on the right information; require the line number.", { size: SMALL, italics: true, color: GREY })], { after: 120 }));
  s.questions.literal.forEach((q, i) => c.push(p([t(`${i + 1}. ${q}`, { size: SMALL })], { after: 50 })));
  c.push(p("", { after: 140 }));
  c.push(h3("Part B \u2014 underneath the page"));
  c.push(p([t("Two marks each: one for a defensible claim, one for evidence that actually supports it. A confident claim with no evidence takes the first mark only. Do not mark down a reading that differs from the notes above if the student can point to the text \u2014 that is the skill.", { size: SMALL, italics: true, color: GREY })], { after: 120 }));
  s.questions.inference.forEach((q, i) => c.push(p([t(`${i + 1}. ${q}`, { size: SMALL })], { after: 50 })));

  const doc = makeDoc([c], {
    title: `${UNIT.course} ${UNIT.code} ${s.title} teacher notes`,
    runningHead: `${UNIT.course} \u00B7 Unit ${UNIT.num} \u00B7 Teacher notes`,
  });
  const f = path.join(outDir, `${UNIT.course}_${UNIT.code}_StoryNotes_${s.slug}_v1.docx`);
  await write(doc, f);
  return f;
}

(async () => {
  const outDir = process.argv[2] || "/mnt/user-data/outputs/ELL3_Unit01";
  fs.mkdirSync(outDir, { recursive: true });
  for (const s of STORIES) {
    console.log("built:", path.basename(await studentCopy(s, outDir)));
    console.log("built:", path.basename(await teacherCopy(s, outDir)));
  }
})();
