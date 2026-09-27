// SHARED DECK RENDERER — the house look for every course. Holds DESIGN only; all content comes from the lesson file.
// Usage: node render_deck.js lessons/<LESSON>.js out/<DIR> [version]
// Expects out/<DIR>/ws/ (worksheet page images, sizes.json, previews.json) from previews.py,
// out/<DIR>/ws/helpslip*.png if the lesson uses routines, and assets/icon-*.png.
//
// READABILITY FLOOR (Sep 20 2026, Sean's Room 148 projector test): every student-facing
// string is >= 28 pt. Headings 36. Answers 30 bold blue. Content SPLITS across slides
// rather than shrinking. Teacher plan slides and small reference strips (banner, tag,
// "Next ->" cue) are exempt and pass { ref: true }.
// The build FAILS if any non-ref string falls below the floor.
const path = require("path"), fs = require("fs");
const pptxgen = require("pptxgenjs");
const TH = require("./theme"), C = TH.color, F = TH.font;
const L = require(path.resolve(process.argv[2])), CO = require(path.resolve(__dirname, "courses", L.course + ".js"));
const ODIR = process.argv[3], VER = process.argv[4] || "v1", WSD = path.join(ODIR, "ws") + "/", AS = path.join(__dirname, "assets") + "/";
const PV = JSON.parse(fs.readFileSync(WSD + "previews.json")), SZ = JSON.parse(fs.readFileSync(WSD + "sizes.json"));
const { NAVY, TEAL: ACC, BLUE, PALE, TINT, INK, GREY, WHITE, AMBER, AMBERL, LINE, TLINE, SOFT, SOFTT } = C;
const M = L.meta, OBJ = L.banner.obj, STD = L.banner.std, COMP = CO.comp, LIT = L.banner.lit || COMP;
const pres = new pptxgen(); pres.layout = "LAYOUT_16x9";
const WARN = [], SMALL = [];

const MIN = 28, HEAD = 36, ANS = 30;

const T = (s, text, x, y, w, h, o = {}) => {
  const { ref, where, ...opt } = o;
  if (!ref) {
    const size = opt.fontSize == null ? MIN : opt.fontSize;
    if (size < MIN) SMALL.push(`${where || "text"}: ${size} pt (floor ${MIN})`);
    opt.fontSize = Math.max(size, MIN);
    if (Array.isArray(text)) text = text.map(r => (r.options && r.options.fontSize != null && r.options.fontSize < MIN)
      ? { ...r, options: { ...r.options, fontSize: MIN } } : r);
  }
  return s.addText(text, { x, y, w, h, fontFace: F, color: INK, margin: 0, valign: "top", isTextBox: true, ...opt });
};
const imgPath = f => fs.existsSync(WSD + f) ? WSD + f : AS + f;
const sizeOf = f => { const b = fs.readFileSync(imgPath(f)); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const budget = (where, text, max) => { if ((text || "").length > max) WARN.push(`${where}: ${text.length} chars (max ${max}) \u2014 "${text.slice(0, 50)}\u2026"`); };
const tone = t => t === "teal" ? [TINT, TLINE, ACC] : t === "amber" ? [AMBER, AMBERL, "C98A10"] : [PALE, LINE, BLUE];
const chunks = (a, n) => { const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o.length ? o : [[]]; };

// ---------- building blocks ----------
function chips(s, x0, y, w, h, step, fs) { COMP.forEach((c, i) => { const x = x0 + i * step, on = LIT.includes(c);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.05, fill: { color: on ? ACC : "33506B" }, line: { color: on ? ACC : "33506B" } });
  T(s, c, x, y, w, h, { ref: true, fontSize: fs, bold: true, color: on ? WHITE : "7C93AA", align: "center", valign: "middle" }); }); }
function banner(s) {
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.66, fill: { color: NAVY }, line: { color: NAVY } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.09, h: 0.66, fill: { color: ACC }, line: { color: ACC } });
  T(s, "OBJECTIVE", 0.25, 0.07, 3, 0.15, { ref: true, fontSize: 7, bold: true, color: SOFTT, charSpacing: 3 });
  T(s, OBJ, 0.25, 0.21, 7.6, 0.22, { ref: true, fontSize: 11.5, bold: true, color: WHITE });
  T(s, STD, 0.25, 0.43, 7.6, 0.18, { ref: true, fontSize: 9, color: SOFT });
  chips(s, 8.15, 0.2, 0.52, 0.26, 0.6, 9);
}
const TOP = 1.55, BOT = 5.25;
function frame(s, tag, heading, next) {
  banner(s);
  T(s, `${CO.code} \u00B7 Unit ${M.unit} \u00B7 Lesson ${M.lesson}`, 0.4, 0.74, 4, 0.2, { ref: true, fontSize: 9.5, color: GREY });
  T(s, (tag || "").toUpperCase(), 5.6, 0.74, 4, 0.2, { ref: true, fontSize: 9.5, bold: true, color: ACC, align: "right", charSpacing: 1 });
  if (heading) { budget("heading", heading, 52); T(s, heading, 0.4, 0.95, 9.2, 0.55, { fontSize: HEAD, bold: true, color: NAVY }); }
  if (next) T(s, "Next \u2192 " + next, 5.6, 5.33, 4, 0.2, { ref: true, fontSize: 9.5, italic: true, color: ACC, align: "right" });
}
function fit(file, bx, by, bw, bh) { const [w, h] = sizeOf(file); const r = Math.min(bw / w, bh / h); const W = w * r, H = h * r;
  return { path: imgPath(file), x: bx + (bw - W) / 2, y: by + (bh - H) / 2, w: W, h: H }; }
function img(s, file, bx, by, bw, bh, border = true) { const o = fit(file, bx, by, bw, bh);
  if (border) s.addShape(pres.shapes.RECTANGLE, { x: o.x - 0.04, y: o.y - 0.04, w: o.w + 0.08, h: o.h + 0.08, fill: { color: WHITE }, line: { color: LINE, width: 1 }, shadow: { type: "outer", color: "000000", opacity: 0.18, blur: 4, offset: 2, angle: 90 } });
  s.addImage(o); return o; }
function card(s, x, y, w, h, fill = PALE, line = LINE) { s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { color: line, width: 1.25 } }); }
function numDot(s, n, x, y, d = 0.54, color = ACC) { s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color } });
  T(s, String(n), x, y, d, d, { ref: true, fontSize: d * 40, bold: true, color: WHITE, align: "center", valign: "middle" }); }
// ENGLISH ONLY yield sign — ELL only (courses/<CODE>.js sets englishOnly:false to forbid), opt-in per activity.
function englishOnly(s, x, y) {
  s.addShape(pres.shapes.TRIANGLE, { x, y, w: 1.6, h: 1.4, rotate: 180, fill: { color: "D7261E" }, line: { color: "D7261E" } });
  s.addShape(pres.shapes.TRIANGLE, { x: x + 0.13, y: y + 0.1, w: 1.34, h: 1.18, rotate: 180, fill: { color: WHITE }, line: { color: WHITE } });
  T(s, "ENGLISH\nONLY", x, y + 0.2, 1.6, 0.66, { ref: true, fontSize: 16, bold: true, color: "D7261E", align: "center", lineSpacingMultiple: 0.88 });
  T(s, "please", x, y + 0.74, 1.6, 0.3, { ref: true, fontSize: 13, italic: true, color: "D7261E", align: "center" });
}

// ---------- slide types ----------
const R = {};
R.plan = (sp, next, part, steps, first, total) => { const s = pres.addSlide(); s.background = { color: "F4F8FC" };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.34, fill: { color: NAVY }, line: { color: NAVY } });
  T(s, `LESSON PLAN ${part} OF ${total}  \u00B7  TEACHER SLIDE  \u00B7  SKIP WHEN PRESENTING`, 0.3, 0.09, 7, 0.18, { ref: true, fontSize: 8.5, bold: true, color: WHITE, charSpacing: 2 });
  chips(s, 8.2, 0.05, 0.5, 0.24, 0.58, 8);
  T(s, `${CO.code} \u2014 Unit ${M.unit}: ${M.unitTitle} \u2014 Lesson ${M.lesson}: ${M.title}`, 0.3, 0.42, 9.4, 0.25, { ref: true, fontSize: 13, bold: true, color: NAVY });
  const P = L.plan; let y = 0.75;
  if (part === 1) {
    T(s, [{ text: "Objective  ", options: { bold: true, color: ACC } }, { text: P.objective + "   " }, { text: "Outcomes  ", options: { bold: true, color: ACC } }, { text: P.outcomes }], 0.3, 0.7, 9.4, 0.36, { ref: true, fontSize: 9 });
    T(s, [{ text: "Materials  ", options: { bold: true, color: ACC } }, { text: P.materials }], 0.3, 1.07, 9.4, 0.36, { ref: true, fontSize: 9 });
    budget("plan objective+outcomes", P.objective + P.outcomes, 260); budget("plan materials", P.materials, 250); y = 1.5; }
  if (steps.length) {
    T(s, "TIMED SEQUENCE" + (part > 1 ? " (continued)" : "") + (P.timing ? "  \u00B7  " + P.timing : ""), 0.3, y, 9, 0.2, { ref: true, fontSize: 8.5, bold: true, color: GREY, charSpacing: 1 }); y += 0.24; }
  const rowH = part === 1 ? 0.52 : 0.46;
  steps.forEach((stp, i) => { const n = first + i + 1; budget(`plan step ${n}`, stp[1] + stp[2], 390);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.3, y, w: 9.4, h: rowH - 0.05, rectRadius: 0.04, fill: { color: WHITE }, line: { color: "C9DCEE", width: 0.75 } });
    numDot(s, n, 0.38, y + (rowH - 0.05 - 0.3) / 2, 0.3);
    T(s, stp[0] + " min", 0.75, y + 0.04, 0.6, 0.2, { ref: true, fontSize: 9, bold: true, color: ACC });
    T(s, [{ text: stp[1] + " \u2014 ", options: { bold: true, color: NAVY } }, { text: stp[2] }], 1.35, y + 0.03, 8.25, rowH - 0.1, { ref: true, fontSize: 8.5, valign: "middle" });
    y += rowH; });
  if (part === total) { y += 0.08;
    const boxes = [["Differentiation", P.diff], ["Assessment (formative)", P.assess], ["Homework", P.homework], ["Watch for", P.watch]];
    const bw = 4.62; boxes.forEach((b, i) => { const x = 0.3 + (i % 2) * (bw + 0.16), yy = y + Math.floor(i / 2) * 0.86; budget("plan box " + b[0], b[1], 330);
      card(s, x, yy, bw, 0.8, i === 3 ? AMBER : PALE, i === 3 ? AMBERL : LINE);
      T(s, [{ text: b[0] + "   ", options: { bold: true, color: NAVY, breakLine: true } }, { text: b[1] || "\u2014" }], x + 0.1, yy + 0.06, bw - 0.2, 0.7, { ref: true, fontSize: 8.5 }); }); } };

R.shape = (sp, next) => { const s = pres.addSlide(); frame(s, "Shape of the day", sp.cont ? "Today (continued)" : "Today", next);
  const items = sp.slice, perCol = Math.ceil(items.length / 2), step = Math.min(0.76, (BOT - TOP) / Math.max(perCol, 1));
  items.forEach((it, i) => { const col = i < perCol ? 0 : 1, row = i < perCol ? i : i - perCol, x = 0.45 + col * 4.72, y = TOP + row * step;
    budget("shape item", it[0] + it[1], 52);
    numDot(s, sp.from + i + 1, x, y + 0.06, 0.54);
    T(s, [{ text: it[0], options: { bold: true, color: NAVY } }, { text: `  (${it[1]})`, options: { color: GREY } }], x + 0.7, y, 3.85, step - 0.1, { fontSize: MIN, valign: "middle" }); }); };

R.section = (sp, next) => { const s = pres.addSlide(); s.background = { color: NAVY };
  if (sp.icon) s.addImage({ path: imgPath(sp.icon), x: 0.8, y: 1.6, w: 1.9, h: 1.9 });
  T(s, (sp.sub || "").toUpperCase(), 3.2, 1.6, 6.3, 0.3, { ref: true, fontSize: 13, bold: true, color: SOFTT, charSpacing: 3 });
  T(s, sp.title, 3.2, 1.95, 6.3, 1.2, { fontSize: 40, bold: true, color: WHITE });
  if (next) T(s, "Next \u2192 " + next, 3.2, 4.6, 6, 0.3, { ref: true, fontSize: 13, italic: true, color: SOFT }); };

R.routine = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head + (sp.cont ? " (continued)" : ""), next); const [fill, line] = tone(sp.tone);
  card(s, 0.4, TOP, 2.6, BOT - TOP, "F4F8FC", "C9DCEE"); s.addImage({ path: imgPath(sp.icon), x: 0.85, y: TOP + 0.3, w: 1.7, h: 1.7 });
  if (sp.big) T(s, sp.big, 0.5, TOP + 2.25, 2.4, 1.1, { fontSize: MIN, bold: true, color: BLUE, align: "center" });
  const items = sp.slice, h = (BOT - TOP) / items.length - 0.12;
  items.forEach((t, i) => { const y = TOP + i * (h + 0.12); budget("routine item", t, 62); card(s, 3.2, y, 6.4, h, fill, line);
    numDot(s, sp.from + i + 1, 3.38, y + (h - 0.54) / 2);
    T(s, t, 4.15, y + 0.05, 5.3, h - 0.1, { fontSize: MIN, valign: "middle" }); }); };

R.imagesteps = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head + (sp.cont ? " (continued)" : ""), next); img(s, sp.image, 0.45, TOP, 2.85, BOT - TOP);
  const items = sp.slice, h = (BOT - TOP) / items.length - 0.12;
  items.forEach((t, i) => { const y = TOP + i * (h + 0.12); budget("image step", t, 72); card(s, 3.6, y, 6.0, h);
    numDot(s, sp.from + i + 1, 3.78, y + (h - 0.54) / 2);
    T(s, t, 4.55, y + 0.05, 4.9, h - 0.1, { fontSize: MIN, valign: "middle" }); }); };

R.imagebullets = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head + (sp.cont ? " (continued)" : ""), next); img(s, sp.image, 0.45, TOP, 2.85, BOT - TOP);
  card(s, 3.6, TOP, 6.0, BOT - TOP, TINT, TLINE);
  const runs = [];
  if (!sp.cont && sp.title) runs.push({ text: sp.title, options: { bold: true, color: NAVY, fontSize: 32, breakLine: true } });
  sp.slice.forEach((b, i, a) => { budget("bullet", b, 90); runs.push({ text: b, options: { bullet: true, breakLine: i < a.length - 1 } }); });
  T(s, runs, 3.8, TOP + 0.15, 5.65, BOT - TOP - 0.3, { fontSize: MIN, paraSpaceAfter: 10 }); };

R.warmup = (sp, next) => { const s = pres.addSlide(); frame(s, "Warm-up", (sp.head || "Warm-up") + (sp.cont ? " (continued)" : ""), next); let y0 = TOP;
  if (sp.note && !sp.cont) { budget("warm-up note", sp.note, 70); card(s, 0.4, TOP, 9.2, 0.78, AMBER, AMBERL);
    T(s, sp.note, 0.68, TOP, 8.6, 0.78, { fontSize: MIN, bold: true, color: NAVY, valign: "middle" }); y0 = TOP + 0.92; }
  const items = sp.slice, h = (BOT - y0) / items.length - 0.15;
  items.forEach((q, i) => { const y = y0 + i * (h + 0.15); budget("warm-up prompt", q, 95); card(s, 0.4, y, 9.2, h);
    numDot(s, sp.from + i + 1, 0.64, y + (h - 0.54) / 2);
    T(s, q, 1.5, y + 0.06, 7.9, h - 0.12, { fontSize: MIN, valign: "middle" }); }); };

R.title = (sp, next) => { const s = pres.addSlide(); s.background = { color: NAVY };
  T(s, `${M.unitTitle.toUpperCase()} \u00B7 ${(M.month || "").toUpperCase()}`, 0.8, 1.5, 8, 0.3, { ref: true, fontSize: 14, bold: true, color: SOFT, charSpacing: 3 });
  T(s, `Lesson ${M.lesson}`, 0.8, 1.9, 8, 0.45, { fontSize: 28, bold: true, color: SOFTT });
  T(s, M.title, 0.8, 2.45, 8.5, 1.15, { fontSize: 44, bold: true, color: WHITE });
  if (M.subtitle) T(s, M.subtitle, 0.8, 3.95, 8.5, 0.5, { fontSize: MIN, italic: true, color: SOFT });
  if (next) T(s, "Next \u2192 " + next, 0.8, 4.8, 8, 0.3, { ref: true, fontSize: 12, italic: true, color: SOFT }); };

R.goals = (sp, next) => { const s = pres.addSlide(); frame(s, "Goals", "By the end of this lesson you can:" + (sp.cont ? " (cont.)" : ""), next);
  const items = sp.slice, h = (BOT - TOP) / items.length - 0.16;
  items.forEach((g, i) => { const y = TOP + i * (h + 0.16); budget("goal", g, 62); card(s, 0.4, y, 9.2, h);
    numDot(s, sp.from + i + 1, 0.64, y + (h - 0.54) / 2);
    T(s, g, 1.5, y, 7.9, h, { fontSize: MIN, valign: "middle" }); }); };

R.handout = (sp, next) => { const s = pres.addSlide(); frame(s, "Your worksheet", "Hand out the worksheet now", next);
  let y0 = TOP;
  if (sp.note) { budget("handout note", sp.note, 78); T(s, sp.note, 0.4, TOP, 9.2, 0.5, { fontSize: MIN, italic: true, color: GREY }); y0 = TOP + 0.66; }
  const parts = L.worksheet.parts, h = (BOT - y0) / parts.length - 0.1;
  parts.forEach((p, i) => { const y = y0 + i * (h + 0.1), ex = p.kind === "exit";
    card(s, 0.4, y, 9.2, h, ex ? AMBER : PALE, ex ? AMBERL : LINE);
    T(s, [{ text: `Part ${p.id}  `, options: { bold: true, color: ACC } }, { text: p.title, options: { bold: true, color: NAVY } }], 0.72, y, 8.6, h, { fontSize: MIN, valign: "middle" }); });
  if (sp.foot) T(s, sp.foot, 0.4, 5.32, 7, 0.24, { ref: true, fontSize: 11, color: GREY }); };

R.page = (sp, next, i) => { const s = pres.addSlide(); frame(s, "Your worksheet", null, next);
  T(s, "WORKSHEET", 0.4, 1.15, 2.6, 0.3, { ref: true, fontSize: 13, bold: true, color: ACC, charSpacing: 2 });
  T(s, `Page ${i + 1} of ${PV.pages.length}`, 0.4, 1.5, 2.6, 0.6, { fontSize: 32, bold: true, color: NAVY });
  img(s, PV.pages[i], 3.2, 0.9, 3.7, 4.4); };

R.vocab = (sp, next) => { const s = pres.addSlide(); frame(s, "Vocabulary", (sp.head || "Key vocabulary") + (sp.cont ? " (continued)" : ""), next);
  const items = sp.slice, rows = Math.ceil(items.length / 2), ch = (BOT - TOP) / rows - 0.12, cw = 4.6;
  items.forEach((v, i) => { const col = i % 2, row = Math.floor(i / 2), x = 0.4 + col * cw, y = TOP + row * (ch + 0.12);
    budget("vocab definition", v[1], 58);
    card(s, x, y, cw - 0.1, ch, row % 2 ? TINT : PALE, row % 2 ? TLINE : LINE);
    T(s, v[0], x + 0.2, y + 0.08, cw - 0.5, 0.5, { fontSize: 32, bold: true, color: row % 2 ? ACC : BLUE });
    T(s, v[1], x + 0.2, y + 0.64, cw - 0.5, ch - 0.72, { fontSize: MIN }); }); };

function matchBody(s, items, bank, upto) {
  const h = (BOT - TOP - 1.05) / items.length - 0.1;
  card(s, 0.4, TOP, 9.2, 0.95, TINT, TLINE);
  T(s, "WORD BANK", 0.64, TOP + 0.06, 2.2, 0.24, { ref: true, fontSize: 11, bold: true, color: ACC, charSpacing: 2 });
  T(s, bank.join("    \u00B7    "), 0.64, TOP + 0.32, 8.7, 0.56, { fontSize: MIN, bold: true, color: NAVY });
  items.forEach((v, i) => { const y = TOP + 1.05 + i * (h + 0.1), done = i < upto; budget("match definition", v[1], 62);
    card(s, 0.4, y, 9.2, h, done ? PALE : WHITE, done ? LINE : "C9DCEE");
    numDot(s, i + 1, 0.64, y + (h - 0.5) / 2, 0.5, done ? BLUE : ACC);
    T(s, v[1], 1.45, y, 5.4, h, { fontSize: MIN, valign: "middle" });
    T(s, done ? v[0] : "\u2014\u2014\u2014\u2014\u2014", 7.05, y, 2.4, h, { fontSize: done ? ANS : MIN, bold: true, color: done ? BLUE : "9DB3C7", valign: "middle" }); }); }
R.match = (sp, next) => { const s = pres.addSlide(); frame(s, "Vocabulary \u00B7 match", sp.head || "Match the word to its meaning", next);
  matchBody(s, sp.slice, sp.bank, 0); };
R.matchreveal = (sp, next, i) => { const s = pres.addSlide();
  frame(s, `Vocabulary \u00B7 ${i + 1} of ${sp.slice.length}`, sp.head || "Match the word to its meaning", next);
  matchBody(s, sp.slice, sp.bank, i + 1); };

const part = id => { const p = L.worksheet.parts.find(x => x.id === id); if (!p) throw new Error("No worksheet Part " + id); return p; };
const wsItems = p => (p.items || []).map(it => ({ q: it.text, a: it.ans != null && it.ans !== "" ? it.ans : (it.reveal || "") }));

R.walk = (sp, next) => { const p = part(sp.part), s = pres.addSlide();
  frame(s, "Worksheet walkthrough", `Part ${p.id} \u2014 ${p.title}` + (sp.cont ? " (cont.)" : ""), next);
  card(s, 6.5, TOP, 3.1, BOT - TOP, TINT, TLINE);
  T(s, "HOW TO COMPLETE IT", 6.72, TOP + 0.12, 2.8, 0.26, { ref: true, fontSize: 11, bold: true, color: ACC, charSpacing: 2 });
  if (!p.how) WARN.push(`Part ${p.id}: no 'how' text for the walkthrough`); budget(`Part ${p.id} how`, p.how, 160);
  T(s, p.how || "\u2014", 6.72, TOP + 0.5, 2.7, BOT - TOP - 0.62, { fontSize: MIN });
  const items = sp.slice; let y = TOP;
  if (!sp.cont && p.instr) { budget(`Part ${p.id} instr`, p.instr, 100); card(s, 0.4, y, 5.95, 0.9, AMBER, AMBERL);
    T(s, p.instr, 0.62, y, 5.5, 0.9, { fontSize: MIN, italic: true, color: NAVY, valign: "middle" }); y += 1.05; }
  if (!items.length) { T(s, sp.note || "Space to write on the sheet.", 0.4, y, 5.95, 1.0, { fontSize: MIN, color: GREY }); return; }
  const h = (BOT - y) / items.length - 0.1;
  items.forEach((it, i) => { const yy = y + i * (h + 0.1); budget("walk item", it.q, 92);
    card(s, 0.4, yy, 5.95, h); numDot(s, sp.from + i + 1, 0.6, yy + (h - 0.5) / 2, 0.5);
    T(s, it.q, 1.3, yy + 0.05, 4.95, h - 0.1, { fontSize: MIN, valign: "middle" }); }); };

R.reveal = (sp, next, i) => { const p = part(sp.part), items = sp.slice, s = pres.addSlide();
  frame(s, `Answers \u00B7 ${i + 1} of ${items.length}`, `Part ${p.id} answers \u2014 ${p.title}`, next);
  const h = (BOT - TOP) / items.length - 0.1;
  items.forEach((it, k) => { const y = TOP + k * (h + 0.1), done = k <= i;
    card(s, 0.4, y, 9.2, h, done ? PALE : WHITE, done ? LINE : "C9DCEE");
    numDot(s, sp.from + k + 1, 0.62, y + (h - 0.5) / 2, 0.5, done ? BLUE : "9DB3C7");
    T(s, it.q, 1.3, y + 0.04, 4.2, h - 0.08, { fontSize: MIN, valign: "middle" });
    if (done) { budget("answer", it.a, 100);
      T(s, it.a || "\u2014", 5.65, y + 0.04, 3.85, h - 0.08, { fontSize: ANS, bold: true, color: BLUE, valign: "middle" }); } }); };

R.rows = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head + (sp.cont ? " (continued)" : ""), next);
  const ic = !!sp.icon && !sp.cont, x0 = ic ? 3.1 : 0.4, w = 9.6 - x0, items = sp.slice;
  if (ic) { s.addImage({ path: imgPath(sp.icon), x: 0.65, y: TOP + 0.15, w: 1.9, h: 1.9 });
    if (sp.big) { budget("icon caption", sp.big, 34); T(s, sp.big, 0.4, TOP + 2.25, 2.5, 1.1, { fontSize: MIN, bold: true, color: BLUE, align: "center" }); } }
  const h = (BOT - TOP) / items.length - 0.12, lw = ic ? 1.5 : 2.4;
  items.forEach((r, i) => { const y = TOP + i * (h + 0.12), teal = (sp.from + i) % 2 === 1, center = r[0].length <= 2;
    budget("row text", r[1], ic ? 70 : 85);
    card(s, x0, y, w, h, teal ? TINT : PALE, teal ? TLINE : LINE);
    T(s, r[0], x0 + 0.2, y, lw, h, { fontSize: MIN, bold: true, color: teal ? ACC : BLUE, valign: "middle", align: center ? "center" : "left" });
    const tx = x0 + lw + 0.38; T(s, r[1], tx, y, x0 + w - tx - 0.18, h, { fontSize: MIN, valign: "middle" }); }); };

R.cards = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head + (sp.cont ? " (continued)" : ""), next);
  const ic = !!sp.icon && !sp.cont, x0 = ic ? 2.9 : 0.4, w = 9.6 - x0, items = sp.slice;
  if (ic) { s.addImage({ path: imgPath(sp.icon), x: 0.58, y: TOP + 0.2, w: 1.7, h: 1.7 });
    if (sp.big) T(s, sp.big, 0.4, TOP + 2.15, 2.3, 0.95, { fontSize: MIN, bold: true, color: BLUE, align: "center" }); }
  const h = (BOT - TOP) / items.length - 0.14;
  items.forEach((c, i) => { const y = TOP + i * (h + 0.14), [fill, line] = tone(c.tone); budget("card body", c.body, 95);
    card(s, x0, y, w, h, fill, line);
    T(s, c.title, x0 + 0.22, y + 0.08, w - 0.45, 0.5, { fontSize: 32, bold: true, color: NAVY });
    T(s, c.body, x0 + 0.22, y + 0.66, w - 0.45, h - 0.74, { fontSize: MIN }); }); };

R.textpage = (sp, next, i, pages) => { const tx = L.texts[sp.text], pg = pages[i], s = pres.addSlide();
  frame(s, `${tx.title} \u00B7 ${i + 1} of ${pages.length}`, null, next);
  T(s, `${tx.title}  \u00B7  lines ${pg[0] + 1}\u2013${pg[pg.length - 1] + 1}`, 0.4, 0.95, 9.2, 0.5, { fontSize: 32, bold: true, color: NAVY });
  const runs = []; pg.forEach((k, j) => { runs.push({ text: String(k + 1).padStart(2, " ") + "   ", options: { bold: true, color: ACC } });
    runs.push({ text: tx.lines[k], options: { breakLine: j < pg.length - 1 } }); });
  card(s, 0.4, TOP, 9.2, BOT - TOP, "FAFCFE", "C9DCEE");
  T(s, runs, 0.66, TOP + 0.12, 8.65, BOT - TOP - 0.24, { fontSize: MIN, paraSpaceAfter: 9, lineSpacingMultiple: 1.0 }); };

R.wordlist = (sp, next) => { const s = pres.addSlide();
  frame(s, "Support", (sp.head || "Words in this story") + (sp.cont ? " (continued)" : ""), next);
  const items = sp.slice, h = (BOT - TOP) / items.length - 0.1;
  items.forEach((w, i) => { const y = TOP + i * (h + 0.1), teal = (sp.from + i) % 2 === 1; budget("word list meaning", w[1], 58);
    card(s, 0.4, y, 9.2, h, teal ? TINT : PALE, teal ? TLINE : LINE);
    T(s, w[0], 0.68, y, 2.3, h, { fontSize: MIN, bold: true, color: teal ? ACC : BLUE, valign: "middle" });
    T(s, w[1], 3.15, y, 6.25, h, { fontSize: MIN, valign: "middle" }); }); };

R.speaking = (sp, next) => { const s = pres.addSlide(); frame(s, "Speaking", sp.head + (sp.cont ? " (continued)" : ""), next);
  const eo = sp.englishOnly && CO.englishOnly !== false;
  if (!sp.cont) { s.addImage({ path: imgPath(sp.icon || "icon-friends.png"), x: 0.6, y: TOP + 0.05, w: 1.7, h: 1.7 });
    if (sp.big) T(s, sp.big, 0.4, TOP + 1.85, 2.3, 0.9, { fontSize: MIN, bold: true, color: BLUE, align: "center" }); }
  if (eo) englishOnly(s, 0.6, BOT - 1.45);
  const x0 = 2.9, w = 6.7; let y = TOP;
  if (!sp.cont) { budget("speaking prompt", sp.prompt, 92); card(s, x0, y, w, 1.05);
    T(s, sp.prompt, x0 + 0.24, y, w - 0.48, 1.05, { fontSize: MIN, valign: "middle" }); y += 1.2; }
  card(s, x0, y, w, BOT - y, TINT, TLINE);
  T(s, "SENTENCE FRAMES", x0 + 0.24, y + 0.1, 5, 0.26, { ref: true, fontSize: 11, bold: true, color: ACC, charSpacing: 2 });
  sp.slice.forEach(f => budget("sentence frame", f, 70));
  T(s, sp.slice.map((f, i, a) => ({ text: f, options: { breakLine: i < a.length - 1 } })), x0 + 0.24, y + 0.46, w - 0.48, BOT - y - 0.6, { fontSize: MIN, italic: true, color: NAVY, paraSpaceAfter: 12 }); };

R.exit = (sp, next) => { const p = part(sp.part), s = pres.addSlide(); frame(s, "Exit ticket", `Exit ticket \u2014 Part ${p.id}`, next);
  const items = p.items.slice(0, 3), h = Math.min(1.2, (BOT - TOP - 1.35) / items.length - 0.12);
  items.forEach((q, i) => { const y = TOP + i * (h + 0.12); budget("exit prompt", q.text, 85);
    card(s, 0.4, y, 9.2, h, AMBER, AMBERL); numDot(s, i + 1, 0.64, y + (h - 0.54) / 2, 0.54, "C98A10");
    T(s, q.text, 1.5, y, 7.9, h, { fontSize: MIN, valign: "middle" }); });
  const yy = BOT - 1.2; card(s, 0.4, yy, 9.2, 1.2, TINT, TLINE);
  s.addImage({ path: imgPath("icon-folder.png"), x: 0.7, y: yy + 0.15, w: 0.9, h: 0.9 });
  if (sp.note) { budget("exit note", sp.note, 80); T(s, sp.note, 1.85, yy, 7.5, 1.2, { fontSize: MIN, bold: true, color: NAVY, valign: "middle" }); } };

R.next = (sp, next) => { const s = pres.addSlide(); frame(s, "Next class", "Next class", next);
  card(s, 0.4, TOP, 9.2, BOT - TOP, PALE);
  s.addImage({ path: imgPath(sp.icon || "icon-pen.png"), x: 0.9, y: TOP + 0.55, w: 2.0, h: 2.0 });
  T(s, sp.title, 3.3, TOP + 0.3, 6.0, 1.05, { fontSize: 44, bold: true, color: NAVY, fit: "shrink" });
  if (sp.sub) { budget("next sub", sp.sub, 72); T(s, sp.sub, 3.3, TOP + 1.45, 6.0, 0.95, { fontSize: MIN, color: BLUE }); }
  if (sp.items) sp.items.slice(0, 3).forEach((t, i) => T(s, `${i + 1}.  ${t}`, 3.3, TOP + 1.5 + i * 0.62, 6.0, 0.58, { fontSize: MIN })); };

// ---------- expand the lesson sequence into slides ----------
const slides = [];
const push = (label, draw, next) => slides.push({ label, draw, next });
const P = L.plan, st = P.steps, pages = [st.slice(0, 7)]; for (let i = 7; i < st.length; i += 6) pages.push(st.slice(i, i + 6));
if (pages.length === 1 || pages[pages.length - 1].length > 5) pages.push([]);
let first = 0; pages.forEach((pg, k) => { const f = first; push("Lesson plan", () => R.plan({}, null, k + 1, pg, f, pages.length), null); first += pg.length; });

// items per slide at the 28 pt floor
const PER = { shape: 8, goals: 3, warmup: 3, rows: 4, cards: 2, vocab: 4, routine: 3, imagesteps: 3, imagebullets: 4, wordlist: 4, speaking: 4, walk: 4, match: 4 };
const LISTOF = { goals: sp => sp.items, warmup: sp => sp.prompts, rows: sp => sp.rows, cards: sp => sp.cards,
  vocab: sp => sp.words, routine: sp => sp.items, imagesteps: sp => sp.steps, imagebullets: sp => sp.bullets,
  wordlist: sp => L.texts[sp.text].words.slice(0, 10), speaking: sp => sp.frames };

chunks(L.shape, PER.shape).forEach((sl, i, a) => push("Shape of the day",
  n => R.shape({ slice: sl, from: i * PER.shape, cont: i > 0 }, n), i < a.length - 1 ? null : undefined));

function expand(sp) {
  if (sp.type === "routines") return (CO.routines || []).forEach(expand);
  const lab = sp.label || ({ title: "Today\u2019s lesson", goals: "Today\u2019s goals", handout: "Hand out the worksheet", vocab: "Key vocabulary", match: "Match the word" }[sp.type]);
  if (sp.type === "handout") { push(lab, n => R.handout(sp, n)); PV.pages.forEach((f, i) => push("Worksheet page " + (i + 1), n => R.page(sp, n, i))); return; }
  if (sp.type === "walk") { const p = part(sp.part), its = wsItems(p);
    return chunks(its, PER.walk).forEach((sl, i, a) => push(`Part ${p.id} \u2014 ${p.title}`,
      n => R.walk({ ...sp, slice: sl, from: i * PER.walk, cont: i > 0 }, n), i < a.length - 1 ? null : undefined)); }
  if (sp.type === "reveals") { const p = part(sp.part), its = wsItems(p).filter(x => x.a !== "");
    if (!its.length) { WARN.push(`Part ${sp.part}: reveals requested but it has no answers`); return; }
    return chunks(its, PER.walk).forEach((sl, g) => sl.forEach((_, i) => push(`Part ${sp.part} answers`,
      n => R.reveal({ ...sp, slice: sl, from: g * PER.walk }, n, i), i < sl.length - 1 ? null : undefined))); }
  if (sp.type === "match") {
    return chunks(sp.words, PER.match).forEach(sl => {
      const bank = (sp.bank || sl.map(w => w[0])).filter(b => sl.some(w => w[0] === b));
      push("Match the word", n => R.match({ ...sp, slice: sl, bank }, n), null);
      sl.forEach((_, i) => push("Match the word", n => R.matchreveal({ ...sp, slice: sl, bank }, n, i),
        i < sl.length - 1 ? null : undefined)); }); }
  if (sp.type === "text") { const tx = L.texts[sp.text], BUD = sp.budget || 380, pg = []; let cur = [], len = 0;
    tx.lines.forEach((l, i) => { if (len + l.length > BUD && cur.length) { pg.push(cur); cur = []; len = 0; } cur.push(i); len += l.length + 40; }); pg.push(cur);
    return pg.forEach((x, i) => push(lab || "The text", n => R.textpage(sp, n, i, pg), i < pg.length - 1 ? (sp.continues || `${tx.title} continues`) : undefined)); }
  if (!R[sp.type]) throw new Error("Unknown slide type: " + sp.type);
  const list = LISTOF[sp.type] && LISTOF[sp.type](sp);
  if (!list) return push(lab, n => R[sp.type](sp, n));
  const per = PER[sp.type] || list.length;
  return chunks(list, per).forEach((sl, i, a) => push(lab,
    n => R[sp.type]({ ...sp, slice: sl, from: i * per, cont: i > 0 }, n), i < a.length - 1 ? null : undefined));
}
L.sequence.forEach(expand);
slides.forEach((sl, i) => { let n = sl.next;
  if (n === undefined) { const j = slides.findIndex((x, k) => k > i && x.label !== sl.label); n = j < 0 ? null : slides[j].label; }
  sl.draw(n); });
const name = TH.fileName(CO, M, "Deck", VER);
if (SMALL.length) { console.error(`READABILITY FAIL \u2014 ${SMALL.length} student-facing string(s) under ${MIN} pt:\n  ` + SMALL.slice(0, 12).join("\n  ")); process.exit(1); }
if (WARN.length) { console.error("FIT WARNINGS (text may overflow; shorten in the lesson file):\n  " + WARN.join("\n  ")); if (!process.env.ALLOW_WARN) process.exit(1); }
pres.writeFile({ fileName: path.join(ODIR, name + ".pptx") }).then(() => console.log("deck ok:", name, slides.length, "slides"));
