// make_docs.js — ENG8 U1 Pass 1: Teacher Overview, Student Intro, Lesson Plans.
const fs = require("fs");
const path = require("path");
const D = require("docx");
const { Document, Packer, Paragraph } = D;
const H = require("./docxhelp.js");
const { UNIT, TEACHER, STUDENT, LESSONS } = require("./u1_content.js");

const OUT = process.argv[2] || path.join(__dirname, "..", "out");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const CODE = UNIT.code, U = "U0" + UNIT.number;
const sectionProps = { page: { size: H.LETTER.size, margin: H.MARGINS } };

function titleBlock(kicker, big) {
  return [
    new Paragraph({ children:[H.run(kicker, { size: 20, bold:true, color: H.C.blue, caps:true })], spacing:{ after: 40 } }),
    H.h1(big),
  ];
}
function docHeader(docLabel) {
  return [
    new Paragraph({
      children: [ H.run(`${UNIT.code} · Unit ${UNIT.number} (${UNIT.month})`, { size: 18, color: H.C.midGrey }) ],
      spacing: { after: 20 },
    }),
    ...titleBlock(docLabel, UNIT.title),
    H.subtitle(`Mr. Reid · SD38 Richmond · English Language Arts 8`),
  ];
}

// ---------------- Teacher Unit Overview ----------------
function teacherDoc() {
  const c = [];
  c.push(...docHeader("Teacher-Facing Unit Overview"));

  c.push(H.h2("Unit Summary", H.C.blue));
  c.push(H.text(TEACHER.summary));

  c.push(H.h2("Big Ideas", H.accentFor(1)));
  TEACHER.bigIdeas.forEach(b => c.push(H.bullet(b)));

  c.push(H.h2("Essential Questions", H.accentFor(2)));
  TEACHER.essentialQuestions.forEach(q => c.push(H.bullet(q)));

  c.push(H.h2("BC Curricular Competencies", H.accentFor(3)));
  Object.entries(TEACHER.competencies).forEach(([mode, items]) => {
    c.push(H.h3(mode));
    items.forEach(i => c.push(H.bullet(i)));
  });

  c.push(H.h2("Content Standards", H.accentFor(4)));
  TEACHER.content.forEach(i => c.push(H.bullet(i)));

  c.push(H.h2("The Lever (Load-Bearing Skill)", H.accentFor(5)));
  c.push(H.text(UNIT.lever));

  c.push(H.h2("Unit Goals", H.C.blue));
  TEACHER.goals.forEach(g => c.push(H.numbered(g, { instance: 100 })));

  c.push(H.h2("Vocabulary & Grammar Focus", H.accentFor(1)));
  c.push(H.h3("Key Vocabulary"));
  c.push(H.text(TEACHER.vocab.join(" · ")));
  c.push(H.h3("Grammar / Conventions"));
  TEACHER.grammar.forEach(g => c.push(H.bullet(g)));

  c.push(H.h2("Reading / Writing / Speaking / Listening Outcomes", H.accentFor(2)));
  c.push(H.table([
    ["Domain", "Outcome"].map(t=>({t,bold:true})),
    ["Reading", TEACHER.outcomes.Reading],
    ["Writing", TEACHER.outcomes.Writing],
    ["Speaking", TEACHER.outcomes.Speaking],
    ["Listening", TEACHER.outcomes.Listening],
  ], [1800, 7560], { headerRow: true }));

  c.push(H.h2("Assessment Plan", H.accentFor(3)));
  c.push(H.h3("Formative"));
  TEACHER.assessmentPlan.formative.forEach(a => c.push(H.bullet(a)));
  c.push(H.h3("Summative"));
  TEACHER.assessmentPlan.summative.forEach(a => c.push(H.bullet(a)));
  c.push(H.h3("Design note (September stakes)"));
  c.push(H.text(TEACHER.assessmentPlan.note, { italics:true, color: H.C.midGrey }));

  c.push(H.h2("Pacing Guide", H.accentFor(4)));
  c.push(H.text(TEACHER.pacing));

  c.push(H.h2("Materials", H.accentFor(5)));
  TEACHER.materials.forEach(m => c.push(H.bullet(m)));

  c.push(H.h2("Differentiation", H.C.blue));
  c.push(H.h3("Support scaffolds"));
  TEACHER.differentiation.support.forEach(s => c.push(H.bullet(s)));
  c.push(H.h3("Extension tasks"));
  TEACHER.differentiation.extension.forEach(s => c.push(H.bullet(s)));

  c.push(H.h2("ELL Scaffolding Notes", H.accentFor(1)));
  TEACHER.ellNotes.forEach(n => c.push(H.bullet(n)));

  c.push(H.h2("Cross-Curricular Connections", H.accentFor(2)));
  TEACHER.crossCurricular.forEach(x => c.push(H.bullet(x)));

  return new Document({ numbering: H.NUMBERING, sections: [{ properties: sectionProps, children: c }] });
}

// ---------------- Student Unit Introduction ----------------
function studentDoc() {
  const c = [];
  c.push(...docHeader("Welcome to Unit 1 — Student Guide"));

  c.push(H.h2("What We Will Learn", H.C.blue));
  STUDENT.whatWeLearn.forEach(i => c.push(H.bullet(i)));

  c.push(H.h2("Why It Matters", H.accentFor(2)));
  c.push(H.text(STUDENT.whyItMatters));

  c.push(H.h2("Key Vocabulary", H.accentFor(1)));
  // vocab grid 4 cols
  const vg = [];
  for (let i=0;i<STUDENT.keyVocab.length;i+=4){
    vg.push(STUDENT.keyVocab.slice(i,i+4).map(w=>({t:w})));
  }
  while (vg.length && vg[vg.length-1].length<4) vg[vg.length-1].push({t:""});
  c.push(H.table(vg, [1770,1770,1770,1770]));

  c.push(H.h2("Key Skills You'll Practise", H.accentFor(3)));
  STUDENT.keySkills.forEach(s => c.push(H.numbered(s, { instance: 101 })));

  c.push(H.h2("What I Expect From You", H.accentFor(4)));
  STUDENT.expectations.forEach(e => c.push(H.bullet(e)));

  c.push(H.spacer(160));
  c.push(H.text("Let's tell some good stories. — Mr. Reid", { italics:true, color: H.C.navy, bold:true }));

  return new Document({ numbering: H.NUMBERING, sections: [{ properties: sectionProps, children: c }] });
}

// ---------------- Lesson Plans (all 14) ----------------
function lessonPlansDoc() {
  const c = [];
  c.push(...docHeader("Lesson Plans (Lessons 1–14)"));
  c.push(H.text(`The Lever: ${UNIT.lever}`, { italics:true, color: H.C.midGrey }));

  // at-a-glance map
  c.push(H.h2("Unit at a Glance", H.C.navy));
  const mapRows = [ ["#", "Lesson", "Focus"].map(t=>({t,bold:true})) ];
  LESSONS.forEach(L => mapRows.push([ String(L.n), L.title, L.vocab.join(", ") || "—" ]));
  c.push(H.table(mapRows, [560, 5400, 3400], { headerRow: true }));

  LESSONS.forEach(L => {
    const acc = H.accentFor(L.n);
    c.push(new Paragraph({ children:[H.run("")], spacing:{ after: 80, before: 240 },
      pageBreakBefore: L.n>1 && (L.n-1)%2===0 ? false : false }));
    c.push(H.h2(`Lesson ${L.n} — ${L.title}`, acc));
    c.push(H.labelLine("Objective:", L.objective, { color: acc }));
    c.push(H.labelLine("Standards:", L.standards, { color: acc }));
    c.push(H.labelLine("Vocabulary:", L.vocab.join(", ") || "—", { color: acc }));
    c.push(H.labelLine("Materials:", L.materials.join("; "), { color: acc }));
    c.push(H.h3("Lesson Sequence", acc));
    L.sequence.forEach(s => c.push(H.numbered(s, { instance: L.n })));
    c.push(H.labelLine("Assessment:", L.assessment, { color: acc, after: 100 }));
    c.push(H.h3("Differentiation", acc));
    c.push(H.labelLine("Support:", L.diff.support, { color: acc }));
    c.push(H.labelLine("Extension:", L.diff.extension, { color: acc }));
    c.push(H.labelLine("Homework:", L.homework, { color: acc, after: 100 }));
  });

  return new Document({ numbering: H.NUMBERING, sections: [{ properties: sectionProps, children: c }] });
}

async function write(doc, name) {
  const buf = await Packer.toBuffer(doc);
  const p = path.join(OUT, name);
  fs.writeFileSync(p, buf);
  console.log("wrote", name, buf.length, "bytes");
}

(async () => {
  await write(teacherDoc(),      `${CODE}_${U}_UnitOverview_Teacher_v1.docx`);
  await write(studentDoc(),      `${CODE}_${U}_StudentIntro_v1.docx`);
  await write(lessonPlansDoc(),  `${CODE}_${U}_LessonPlans_v2.docx`);
  console.log("DONE");
})();
