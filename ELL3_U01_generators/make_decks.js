// ELL 2 Unit 7 — deck generator. 11 slides per lesson.
const pptxgen = require("pptxgenjs");
const { UNIT, LESSONS, ACCENTS } = require("./lessons");
const { autoSize } = require("./layout");
const fs = require("fs"), pathm = require("path");
const { PLAN_DETAIL } = require("./unitdocs");
const { WS } = require("./wsdata");
const { textsFor } = require("./texts_in_deck");
let PREVIEWS = {};
try { PREVIEWS = JSON.parse(fs.readFileSync(pathm.join(__dirname, "../out3/previews/previews.json"))); } catch (e) { PREVIEWS = {}; }

function fitPt(lines, w, h, maxPt, minPt, ls = 1.25) {
  for (let pt = maxPt; pt >= minPt; pt -= 1) {
    const cpl = Math.max(1, Math.floor((w - 0.2) * 72 / (pt * 0.5)));
    const n = lines.reduce((a, l) => a + Math.max(1, Math.ceil(l.length / cpl)), 0);
    if (n * pt * ls / 72 + 0.04 <= h) return pt;
  }
  return minPt;
}
// Standing order (Sep 8 2026): slide 1 lesson plan (teacher), slide 2 shape of the day (students), then the title slide.
function planSteps(L) {
  const k = textsFor(L).reduce((a, t) => a + t.pages.length, 0);
  const S = (n) => n + (n >= 7 ? k : 0);
  if (L.writingSample) return [["5", "Settle. Header slide up: five header lines before anything else. Walk the room and check."], ["5", "Prompt slide. Read it twice aloud, key words circled. No further explanation."], ["60", "Write. Silent. Time called at 20 and 40 as a cue, not a stop."], ["7", "Read back. Checklist slide."], ["3", "Collect, count against the class list, photograph every paper tonight."]];
  return [["5", `Warm-up (slide 4): ${L.warmup[0]}`], ["5", "Goals and vocabulary (slides 5\u20136). Students record the words as they appear."], ["20", `Teaching (slides ${S(7)}\u2013${S(8)}): ${L.teach1.title}; ${L.teach2.title}. One check question after each.`], ["10", `Examples (slide ${S(9)}): judge strong or weak before you explain.`], ["15", `Guided practice (slide ${S(10)}, worksheet Parts A\u2013B): ${L.practice.instr}`], ["10", `Speaking (slide ${S(11)}): both partners speak; circulate for the target structure.`], ["12", `Independent writing (slide ${S(12)}): ${L.yourturn.instr.split(". ")[0]}.`], ["3", `Exit ticket (slide ${S(13)}): ${L.exit[0]}`]].map((st, i) => (i === 1 && k) ? [st[0], st[1] + ` Then the class text, in full, on slides 7\u2013${6 + k}.`] : st);
}
function planSlide(pres, L, accent) {
  const s = pres.addSlide(); s.background = { color: PALER };
  s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.42, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("LESSON PLAN  \u2022  TEACHER SLIDE  \u2022  SKIP WHEN PRESENTING", { x: 0.3, y: 0, w: 9.4, h: 0.42, fontSize: 10, bold: true, color: "9DC3E6", charSpacing: 3, margin: 0, valign: "middle" });
  const steps = planSteps(L); const total = steps.reduce((a, st) => a + Number(st[0]), 0);
  s.addText(`${UNIT.course} \u2014 Unit ${UNIT.num}: ${UNIT.title} \u2014 Lesson ${L.n}: ${L.title} \u2014 ${total} minutes`, { x: 0.4, y: 0.5, w: 9.2, h: 0.4, fontSize: fitPt([L.title], 9.2, 0.4, 16, 12), bold: true, color: NAVY, margin: 0, valign: "middle" });
  s.addText([{ text: "Objective  ", options: { bold: true, color: BLUE } }, { text: L.goals.join("; ") + "." }], { x: 0.4, y: 0.92, w: 9.2, h: 0.5, fontSize: 11, color: INK, margin: 0, valign: "top" });
  const step = Math.min(0.42, 3.55 / steps.length);
  const accs = ["00897B", "43A047", "F9A825", "E8604C", "6A4FB3"];
  steps.forEach(([mn, dsc], i) => {
    const y = 1.45 + i * step; const ac = accs[i % 5];
    s.addShape("roundRect", { x: 0.4, y: y + 0.04, w: 0.7, h: step - 0.1, rectRadius: 0.08, fill: { color: ac }, line: { color: ac } });
    s.addText(mn + " min", { x: 0.4, y: y + 0.04, w: 0.7, h: step - 0.1, fontSize: 9, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
    s.addText(dsc, { x: 1.2, y, w: 5.4, h: step, fontSize: fitPt([dsc], 5.4, step - 0.02, 11, 8), color: INK, margin: 0, valign: "middle" });
  });
  card(s, { x: 6.8, y: 1.45, w: 2.8, h: 3.55, fill: "FFFFFF", line: PALE });
  const per = (PLAN_DETAIL.perLesson && PLAN_DETAIL.perLesson[String(L.n)]) || {};
  s.addText("MATERIALS", { x: 6.95, y: 1.5, w: 2.5, h: 0.25, fontSize: 9, bold: true, color: BLUE, charSpacing: 2, margin: 0 });
  const mats = ["Deck and the Lesson " + L.n + " worksheet", "Voices Notebook", L.n >= 6 && L.n <= 7 ? "\u201cThe Long Way Home\u201d story document" : L.n === 11 ? "\u201cThe Second Umbrella\u201d story document" : L.writingSample ? "Lined pages, blue/black pens, camera" : "Folders"];
  s.addText(mats.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < mats.length - 1, paraSpaceAfter: 3 } })), { x: 6.95, y: 1.75, w: 2.5, h: 1.3, fontSize: 10, color: INK, margin: 2 });
  s.addText("WATCH FOR", { x: 6.95, y: 3.1, w: 2.5, h: 0.25, fontSize: 9, bold: true, color: "E8604C", charSpacing: 2, margin: 0 });
  const watch = per.watch || "";
  s.addText(watch, { x: 6.95, y: 3.35, w: 2.5, h: 1.6, fontSize: fitPt([watch], 2.5, 1.6, 10, 7), color: INK, margin: 2, valign: "top" });
  if (per.hw) s.addText("Homework: " + per.hw, { x: 0.4, y: 5.2, w: 9.2, h: 0.3, fontSize: 9, italic: true, color: GREY, margin: 0, valign: "middle" });
}
function shapeSlide(pres, L, accent) {
  const s = base(pres, accent, L, "SHAPE OF THE DAY");
  heading(s, "Today", accent);
  const items = shapeItems(L);
  const perCol = Math.ceil(items.length / 2), rowH = Math.min(0.85, 3.7 / perCol);
  items.forEach((it, i) => {
    const col = i < perCol ? 0 : 1, row = i % perCol;
    const x = 0.5 + col * 4.6, y = 1.35 + row * rowH;
    card(s, { x, y, w: 4.4, h: rowH - 0.1, fill: i % 2 ? PALER : PALE, line: PALE });
    s.addShape("ellipse", { x: x + 0.15, y: y + (rowH - 0.1) / 2 - 0.18, w: 0.36, h: 0.36, fill: { color: accent }, line: { color: accent } });
    s.addText(String(i + 1), { x: x + 0.15, y: y + (rowH - 0.1) / 2 - 0.18, w: 0.36, h: 0.36, fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
    s.addText(it, { x: x + 0.65, y, w: 3.65, h: rowH - 0.1, fontSize: fitPt([it], 3.65, rowH - 0.12, 15, 10), color: NAVY, margin: 0, valign: "middle" });
  });
}
function textSlides(pres, L, accent) {
  const texts = textsFor(L); let count = 0;
  for (const tx of texts) {
    tx.pages.forEach((paras, pi) => {
      const s = base(pres, accent, L, `${tx.label.toUpperCase()}  \u2022  ${pi + 1} / ${tx.pages.length}`);
      heading(s, pi === 0 ? tx.title : `${tx.title} (continued)`, accent);
      card(s, { x: 0.5, y: 1.3, w: 9.0, h: 3.85, fill: "FFFFFF", line: PALE });
      const pt = fitPt(paras, 8.6, 3.6, 16, 12, 1.3);
      s.addText(paras.map((p, i) => ({ text: p, options: { breakLine: i < paras.length - 1, paraSpaceAfter: 8 } })), { x: 0.7, y: 1.42, w: 8.6, h: 3.6, fontSize: pt, color: INK, margin: 0, valign: "top", lineSpacingMultiple: 1.15 });
      count++;
    });
  }
  return count;
}
function keyAnswer(it) {
  let a = it.answer || "";
  if (!a || /^(Accept|Any|Look|Reject|Marked|Grade|MyEd|Q1)/.test(a)) return null;
  a = a.split(/\s\/\s|\. Reject|\. Accept|\. One mark|\. Do not|\. No comma/)[0].trim();
  a = a.split(/(?<=[a-z\u201d)])\. (?=[A-Z])/)[0].trim();
  a = a.split(/\s+(?:Accept|Reject|Award|Also accept|Do not|Deduct|Marks?:)\b/)[0].trim();
  return a.length ? a : null;
}
function revealSlides(pres, L, part, accent, idx) {
  // one slide per answer; earlier answers stay (standing order Sep 9 2026). Open-writing parts have no key.
  if (!part.items || part.kind === "lines" || part.kind === "check") return idx;
  const items = part.items.map((it) => ({ text: it.text || it.q || "", a: keyAnswer(it) }));
  if (!items.some((it) => it.a)) return idx;
  const n = items.length; const hasEx = !!keyAnswer(part.items[0]);
  for (let k = hasEx ? 2 : 1; k <= n; k++) {
    const s = base(pres, accent, L, "ANSWERS"); heading(s, `${part.title.replace(/\s*\u2014.*$/, "")} \u2014 answers  (${k} of ${n})`, accent);
    card(s, { x: 0.5, y: 1.25, w: 9.0, h: 3.85, fill: PALER, line: PALE });
    const step = Math.min(0.72, 3.65 / n);
    items.forEach((it, i) => {
      const shown = i < k; const y = 1.35 + i * step;
      s.addText(String(i + 1) + ".", { x: 0.65, y, w: 0.4, h: step * 0.5, fontSize: 12, bold: true, color: accent, margin: 0, valign: "middle" });
      const q = /_{2,}/.test(it.text) ? it.text.replace(/_{2,}/g, "________") : it.text;
      if (!shown) { s.addText(q, { x: 1.1, y, w: 8.2, h: step * 0.5, fontSize: fitPt([q], 8.2, step * 0.5 - 0.02, 13, 8), color: GREY, margin: 0, valign: "middle" }); return; }
      if (/_{2,}/.test(it.text)) {
        const [pre, ...rest] = it.text.split(/_{2,}/);
        const plain = pre + (it.a || "?") + rest.join("____");
        s.addText([{ text: pre, options: { color: INK } }, { text: it.a || "?", options: { color: accent, bold: true } }, { text: rest.join("____"), options: { color: INK } }], { x: 1.1, y, w: 8.2, h: step * 0.5, fontSize: fitPt([plain], 8.2, step * 0.5 - 0.02, 13, 8), margin: 0, valign: "middle" });
      } else {
        s.addText(q, { x: 1.1, y, w: 8.2, h: step * 0.5, fontSize: fitPt([q], 8.2, step * 0.5 - 0.02, 13, 8), color: INK, margin: 0, valign: "middle" });
        const a = it.a || "(own answer)";
        s.addText("\u2192  " + a, { x: 1.4, y: y + step * 0.5, w: 7.9, h: step * 0.5, fontSize: fitPt([a], 7.9, step * 0.5 - 0.02, 13, 8), color: accent, bold: true, margin: 0, valign: "middle" });
      }
    });
  }
  return idx;
}
function shapeItems(L) {
  return L.writingSample ? ["Header: five lines, top right", "Read the prompt twice", "Write \u2014 on your own", "Read it back", "Hand in"]
    : ["Warm-up", "Goals and vocabulary", L.teach1.title, L.teach2.title, "Examples", "Practice together", "Talk it through", "Your turn: write", "Exit ticket"];
}
function nextClassSlide(pres, L, accent) {
  const N = LESSONS.find((x) => x.n === L.n + 1);
  const s = base(pres, accent, L, "NEXT CLASS");
  heading(s, N ? `Next class: Lesson ${N.n} \u2014 ${N.title}` : "Next class: the unit test", accent);
  const items = N ? shapeItems(N) : ["Part A: language (vocabulary, sentence control, word choice)", "Part B: writing (revise-and-self-edit, the descriptive paragraph)", "Bring your Voices Notebook and your folder"];
  const perCol = Math.ceil(items.length / 2), rowH = Math.min(0.85, 3.7 / perCol);
  items.forEach((it, i) => {
    const col = i < perCol ? 0 : 1, row = i % perCol; const x = 0.5 + col * 4.6, y = 1.35 + row * rowH;
    card(s, { x, y, w: 4.4, h: rowH - 0.1, fill: i % 2 ? PALER : PALE, line: PALE });
    s.addShape("ellipse", { x: x + 0.15, y: y + (rowH - 0.1) / 2 - 0.18, w: 0.36, h: 0.36, fill: { color: accent }, line: { color: accent } });
    s.addText(String(i + 1), { x: x + 0.15, y: y + (rowH - 0.1) / 2 - 0.18, w: 0.36, h: 0.36, fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
    s.addText(it, { x: x + 0.65, y, w: 3.65, h: rowH - 0.1, fontSize: fitPt([it], 3.65, rowH - 0.12, 15, 10), color: NAVY, margin: 0, valign: "middle" });
  });
}
function keyAnswer(it) {
  // the student-facing model answer for a worksheet item: the key\'s first sentence, marking notes stripped
  let a = it && (it.ex || it.answer) || "";
  if (!a || /^(Accept|Any|Look|Reject|Marked|Student|Grade|MyEd|September)/.test(a)) return null;
  a = a.split(/\s\/\s|\. Reject|\. Accept|\. One mark|\. Do not|\. No comma|\. Comma/)[0].trim();
  a = a.split(/(?<=[a-z\u201d)])\. (?=[A-Z])/)[0].trim();
  return a || null;
}
function revealSlides(pres, L, part, accent, idx) {
  if (!part.items || !["cloze", "label", "comp", "combine", "edit", "revise"].includes(part.kind)) return idx;
  const items = part.items.map((it) => it.text || it.q);
  const answers = part.items.map(keyAnswer);
  const n = items.length; if (!answers.some(Boolean)) return idx;
  const label = (part.title.split("\u2014")[0] || part.title).trim();
  for (let k = 2; k <= n; k++) {              // item 1 is the worked example: shown from the first slide
    const s = base(pres, accent, L, "ANSWERS");
    heading(s, `${label} \u2014 answers  (${k} of ${n})`, accent);
    card(s, { x: 0.5, y: 1.3, w: 9.0, h: 3.85, fill: PALER, line: PALE });
    const step = Math.min(0.44, 3.65 / n);
    for (let i = 0; i < n; i++) {
      const shown = i < k, text = items[i], a = answers[i]; const y = 1.4 + i * step;
      s.addText(String(i + 1) + ".", { x: 0.65, y, w: 0.4, h: step, fontSize: 12, bold: true, color: accent, margin: 0, valign: "middle" });
      let runs;
      if (/_{2,}/.test(text)) { const [pre, ...rest] = text.split(/_{2,}/); runs = shown && a ? [{ text: pre, options: { color: INK } }, { text: a, options: { color: accent, bold: true } }, { text: rest.join("____"), options: { color: INK } }] : [{ text: text.replace(/_{2,}/g, "________"), options: { color: GREY } }]; }
      else runs = shown && a ? [{ text: text + "   \u2192   ", options: { color: INK } }, { text: a, options: { color: accent, bold: true } }] : [{ text, options: { color: GREY } }];
      const flat = runs.map((r) => r.text).join("");
      s.addText(runs.map((r) => ({ text: r.text, options: r.options })), { x: 1.1, y, w: 8.2, h: step, fontSize: fitPt([flat], 8.2, step - 0.02, 14, 8), margin: 0, valign: "middle" });
    }
  }
  return idx;
}
function nextClassSlide(pres, L, accent) {
  const N = LESSONS.find((x) => x.n === L.n + 1);
  const s = base(pres, accent, L, "NEXT CLASS");
  heading(s, N ? `Next class: Lesson ${N.n} \u2014 ${N.title}` : "Next class", accent);
  const items = N ? (N.writingSample ? ["Header: five lines, top right", "Read the prompt twice", "Write \u2014 on your own", "Read it back", "Hand in"] : ["Warm-up", "Goals and vocabulary", N.teach1.title, N.teach2.title, "Examples", "Practice together", "Talk it through", "Your turn: write", "Exit ticket"]) : ["Unit test: Part A language, Part B writing", "Bring your Voices Notebook and your marked draft"];
  const perCol = Math.ceil(items.length / 2), rowH = Math.min(0.85, 3.7 / perCol);
  items.forEach((it, i) => {
    const col = i < perCol ? 0 : 1, row = i % perCol; const x = 0.5 + col * 4.6, y = 1.35 + row * rowH;
    card(s, { x, y, w: 4.4, h: rowH - 0.1, fill: i % 2 ? PALER : PALE, line: PALE });
    s.addShape("ellipse", { x: x + 0.15, y: y + (rowH - 0.1) / 2 - 0.18, w: 0.36, h: 0.36, fill: { color: accent }, line: { color: accent } });
    s.addText(String(i + 1), { x: x + 0.15, y: y + (rowH - 0.1) / 2 - 0.18, w: 0.36, h: 0.36, fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
    s.addText(it, { x: x + 0.65, y, w: 3.65, h: rowH - 0.1, fontSize: fitPt([it], 3.65, rowH - 0.12, 15, 10), color: NAVY, margin: 0, valign: "middle" });
  });
}
function placeImage(s, file, w0, h0, x, y, Wd, Hd) { const r = Math.min(Wd / w0, Hd / h0); const w = w0 * r, h = h0 * r; s.addImage({ path: file, x: x + (Wd - w) / 2, y, w, h }); }
function previewSlides(pres, L, accent) {
  const key = Object.keys(PREVIEWS).find((k) => k.includes(`_L${String(L.n).padStart(2, "0")}_`));
  if (!key) { nextClassSlide(pres, L, accent); return; }
  const pv = PREVIEWS[key];
  const full = () => { const s = base(pres, accent, L, "YOUR WORKSHEET"); heading(s, "Your worksheet", accent); const n = pv.pages.length, Wd = 9.0 / n; pv.pages.forEach((pg, i) => placeImage(s, pg, 8.5, 11, 0.5 + i * Wd, 1.3, Wd - 0.1, 3.9)); };
  full();
  for (const part of pv.parts) { const s = base(pres, accent, L, "YOUR WORKSHEET"); heading(s, `Worksheet \u2014 ${part.label}`, accent); placeImage(s, part.file, part.w, part.h, 0.5, 1.3, 9.0, 3.9); }
  full();
  // answers, Part by Part (standing order Sep 9 2026): the Part crop again, then one slide per answer
  if (!L.writingSample) {
    const ws = WS.find((w) => w.n === L.n);
    for (const part of pv.parts) {
      const letter = part.label.replace("Part ", "");
      const data = ws && ws.parts.find((p) => (p.title || "").startsWith("Part " + letter));
      if (!data || !data.items || !["cloze", "label", "comp", "combine", "edit", "revise"].includes(data.kind)) continue;
      if (!data.items.map(keyAnswer).some(Boolean)) continue;
      const s = base(pres, accent, L, "ANSWERS"); heading(s, `${part.label} \u2014 answers`, accent); placeImage(s, part.file, part.w, part.h, 0.5, 1.3, 9.0, 3.9);
      revealSlides(pres, L, data, accent, 0);
    }
  }
  nextClassSlide(pres, L, accent);
}

const NAVY = "0B2C4D";
const BLUE = "1565C0";
const PALE = "EAF1F8";
const PALER = "F5F9FD";
const INK = "16232E";
const GREY = "5A6672";
const W = 10, H = 5.625;

function base(pres, accent, lesson, label) {
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  s.addText(`${UNIT.course} · Unit ${UNIT.num} · Lesson ${lesson.n}`, {
    x: 0.5, y: 0.24, w: 5.5, h: 0.28, fontSize: 11, color: GREY, bold: true, margin: 0,
  });
  s.addText(label, {
    x: 4.0, y: 0.24, w: 5.5, h: 0.28, fontSize: 11, color: accent, bold: true, align: "right", margin: 0,
  });
  return s;
}

function heading(s, text, accent) {
  s.addText(text, {
    x: 0.5, y: 0.62, w: 9.0, h: 0.62, fontSize: 28, bold: true, color: NAVY, margin: 0, valign: "top",
  });
}

function card(s, opts) {
  s.addShape("roundRect", {
    x: opts.x, y: opts.y, w: opts.w, h: opts.h,
    fill: { color: opts.fill || PALER },
    line: { color: opts.line || PALE, width: 1 },
    rectRadius: 0.06,
    shadow: opts.shadow ? { type: "outer", angle: 90, blur: 6, offset: 1, opacity: 0.12, color: "8899AA" } : undefined,
  });
}

function buildLesson(lesson, accent, outPath) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Mr. Reid";
  pres.title = `${UNIT.course} U${UNIT.num} L${lesson.n} — ${lesson.title}`;

  planSlide(pres, lesson, accent);
  shapeSlide(pres, lesson, accent);
  // 1 — title
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    s.addText(`${UNIT.title.toUpperCase()} · ${UNIT.month.toUpperCase()}`, {
      x: 0.7, y: 1.55, w: 8.6, h: 0.3, fontSize: 13, color: "9DC3E6", bold: true, charSpacing: 2, margin: 0,
    });
    s.addText(`Lesson ${lesson.n}`, {
      x: 0.7, y: 1.92, w: 8.6, h: 0.45, fontSize: 20, color: accent, bold: true, margin: 0,
    });
    s.addText(lesson.title, {
      x: 0.7, y: 2.38, w: 8.6, h: 1.5, fontSize: 40, color: "FFFFFF", bold: true, margin: 0, valign: "top",
    });
    s.addText(UNIT.subtitle, {
      x: 0.7, y: 4.35, w: 8.6, h: 0.35, fontSize: 14, color: "B9CFE4", italic: true, margin: 0,
    });
    s.addNotes(`Lesson ${lesson.n} of 10. ${UNIT.title}: ${UNIT.subtitle}.`);
  }

  // 2 — warm-up
  {
    const s = base(pres, accent, lesson, "WARM-UP");
    heading(s, "Warm-up", accent);
    const ys = [1.45, 3.05];
    lesson.warmup.forEach((q, i) => {
      card(s, { x: 0.5, y: ys[i], w: 9.0, h: 1.4, fill: PALER, shadow: true });
      s.addShape("ellipse", { x: 0.75, y: ys[i] + 0.28, w: 0.42, h: 0.42, fill: { color: accent }, line: { color: accent, width: 0 } });
      s.addText(String(i + 1), { x: 0.75, y: ys[i] + 0.28, w: 0.42, h: 0.42, fontSize: 15, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
      s.addText(q, { x: 1.34, y: ys[i] + 0.16, w: 7.9, h: 1.1, fontSize: 15, color: INK, margin: 0, valign: "middle" });
    });
    s.addNotes("Two to three minutes. Take one answer for each before moving on.");
  }

  // 3 — goals
  {
    const s = base(pres, accent, lesson, "GOALS");
    heading(s, "By the end of this lesson you can:", accent);
    lesson.goals.forEach((g, i) => {
      const y = 1.5 + i * 0.85;
      card(s, { x: 0.5, y, w: 9.0, h: 0.68, fill: i % 2 ? "FFFFFF" : PALER });
      s.addShape("rect", { x: 0.5, y, w: 0.06, h: 0.68, fill: { color: accent }, line: { width: 0 } });
      s.addText(g, { x: 0.85, y, w: 8.5, h: 0.68, fontSize: 15, color: INK, margin: 0, valign: "middle" });
    });
    s.addNotes("Read aloud. Return to these on the exit ticket slide.");
  }

  // 4 — vocabulary, 5-column grid, two rows
  {
    const s = base(pres, accent, lesson, "VOCABULARY");
    heading(s, "Key vocabulary", accent);
    const cols = 5, cw = 1.74, gap = 0.13, x0 = 0.5;
    const rows = [1.42, 3.28];
    lesson.vocab.forEach((v, i) => {
      const r = Math.floor(i / cols), c = i % cols;
      const x = x0 + c * (cw + gap), y = rows[r];
      card(s, { x, y, w: cw, h: 1.68, fill: PALER, line: PALE });
      s.addText(v[0], { x: x + 0.08, y: y + 0.1, w: cw - 0.16, h: 0.5, fontSize: 13, bold: true, color: accent, margin: 0, valign: "top" });
      s.addText(v[1], { x: x + 0.08, y: y + 0.58, w: cw - 0.16, h: 1.0, fontSize: 10.5, color: INK, margin: 0, valign: "top" });
    });
    s.addNotes("Ten words. Say each aloud, then have students find one in the model or in their own draft.");
  }

  textSlides(pres, lesson, accent);   // class text in full, after vocabulary (standing order Sep 9 2026)
  // 5 & 6 — teaching
  [lesson.teach1, lesson.teach2].forEach((teach, ti) => {
    const s = base(pres, accent, lesson, `TEACHING ${ti + 1} OF 2`);
    heading(s, teach.title, accent);
    teach.points.forEach((pt, i) => {
      const y = 1.5 + i * 0.92;
      s.addShape("ellipse", { x: 0.55, y: y + 0.16, w: 0.3, h: 0.3, fill: { color: i % 2 ? BLUE : accent }, line: { width: 0 } });
      s.addText(String(i + 1), { x: 0.55, y: y + 0.16, w: 0.3, h: 0.3, fontSize: 11, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
      s.addText(pt, { x: 1.02, y, w: 8.4, h: 0.8, fontSize: 14.5, color: INK, margin: 0, valign: "middle" });
    });
    s.addNotes(teach.title);
  });

  // 7 — examples
  {
    const s = base(pres, accent, lesson, "EXAMPLES");
    heading(s, "Examples", accent);
    const exSize = autoSize(lesson.examples, 13.5, 10, 130);
    lesson.examples.forEach((ex, i) => {
      const y = 1.45 + i * 0.94;
      card(s, { x: 0.5, y, w: 9.0, h: 0.86, fill: i % 2 ? "FFFFFF" : PALE });
      s.addText(ex, { x: 0.78, y, w: 8.5, h: 0.86, fontSize: exSize, color: INK, margin: 0, valign: "middle", fit: "shrink" });
    });
    s.addNotes("Read each aloud. Ask which are strong and which are weak, and why.");
  }

  // 8 — practice
  {
    const s = base(pres, accent, lesson, "PRACTICE");
    heading(s, "Practice together", accent);
    s.addText(lesson.practice.instr, { x: 0.5, y: 1.28, w: 9.0, h: 0.42, fontSize: 13, color: GREY, italic: true, margin: 0 });
    const items = lesson.practice.items;
    const prSize = autoSize(items, 13, 9.5, 115);
    items.forEach((it, i) => {
      const y = 1.78 + i * 0.6;
      s.addText(`${i + 1}.`, { x: 0.55, y, w: 0.4, h: 0.56, fontSize: prSize, bold: true, color: accent, margin: 0, valign: "middle" });
      s.addText(it, { x: 0.98, y, w: 8.45, h: 0.56, fontSize: prSize, color: INK, margin: 0, valign: "middle", fit: "shrink" });
    });
    s.addNotes("Do the first one together, then release to pairs.");
  }

  // 9 — speaking
  {
    const s = base(pres, accent, lesson, "SPEAKING");
    heading(s, "Talk it through", accent);
    s.addText(lesson.speaking.instr, { x: 0.5, y: 1.3, w: 9.0, h: 0.8, fontSize: 14, color: INK, margin: 0, valign: "top" });
    card(s, { x: 0.5, y: 2.28, w: 9.0, h: 2.35, fill: PALE, line: "C9DCEC" });
    s.addText("Sentence frames", { x: 0.78, y: 2.42, w: 8.4, h: 0.3, fontSize: 12, bold: true, color: NAVY, margin: 0 });
    lesson.speaking.prompts.forEach((fr, i) => {
      s.addText(fr, { x: 0.78, y: 2.78 + i * 0.55, w: 8.4, h: 0.5, fontSize: autoSize(lesson.speaking.prompts, 14, 11, 95), color: INK, italic: true, margin: 0, valign: "middle", fit: "shrink" });
    });
    s.addNotes("Both partners speak. Circulate and listen for the target structure.");
  }

  // 10 — your turn
  {
    const s = base(pres, accent, lesson, "YOUR TURN");
    heading(s, "Your turn", accent);
    card(s, { x: 0.5, y: 1.5, w: 9.0, h: 1.75, fill: PALER, shadow: true });
    s.addText(lesson.yourturn.instr, { x: 0.85, y: 1.65, w: 8.3, h: 1.45, fontSize: 16, color: INK, margin: 0, valign: "middle" });
    s.addText(lesson.writingSample ? "Write on the lined page (worksheet Part B). Header first." : "Write this on your worksheet, Part " + (lesson.ytPart || "C") + ".", {
      x: 0.5, y: 3.45, w: 9.0, h: 0.4, fontSize: 13, color: GREY, italic: true, margin: 0,
    });
    s.addNotes("Independent writing. Give a firm time limit.");
  }

  // 11 — exit ticket
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    s.addText("EXIT TICKET", { x: 0.7, y: 0.85, w: 8.6, h: 0.35, fontSize: 13, color: accent, bold: true, charSpacing: 2, margin: 0 });
    s.addText("Before you leave", { x: 0.7, y: 1.22, w: 8.6, h: 0.6, fontSize: 32, bold: true, color: "FFFFFF", margin: 0 });
    lesson.exit.forEach((q, i) => {
      const y = 2.25 + i * 1.15;
      s.addShape("roundRect", { x: 0.7, y, w: 8.6, h: 0.95, fill: { color: "12395F" }, line: { color: "1D4E7A", width: 1 }, rectRadius: 0.06 });
      s.addText(String(i + 1), { x: 0.95, y, w: 0.4, h: 0.95, fontSize: 15, bold: true, color: accent, valign: "middle", margin: 0 });
      s.addText(q, { x: 1.42, y, w: 7.6, h: 0.95, fontSize: 15, color: "FFFFFF", valign: "middle", margin: 0 });
    });
    s.addNotes("Collect on paper or hands-up check.");
  }
  previewSlides(pres, lesson, accent);

  return pres.writeFile({ fileName: outPath });
}

(async () => {
  const path = require("path");
  const outDir = process.argv[2] || "/mnt/user-data/outputs/ELL3_Unit01";
  require("fs").mkdirSync(outDir, { recursive: true });
  for (const lesson of LESSONS) {
    const accent = ACCENTS[lesson.n - 1];
    const nn = String(lesson.n).padStart(2, "0");
    const file = path.join(outDir, `${UNIT.course}_${UNIT.code}_Deck_L${nn}_${lesson.slug}_v1.pptx`);
    await buildLesson(lesson, accent, file);
    console.log("deck:", path.basename(file));
  }
})();
