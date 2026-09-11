// SHARED DECK RENDERER — the house look for every course. Holds DESIGN only; all content comes from the lesson file.
// Usage: node render_deck.js lessons/<LESSON>.js out/<DIR> [version]
// Expects out/<DIR>/ws/ (worksheet pages, Part crops, reveals, sizes.json, previews.json) from previews.py,
// out/<DIR>/ws/helpslip*.png if the lesson uses routines, and assets/icon-*.png.
const path = require("path"), fs = require("fs");
const pptxgen = require("pptxgenjs");
const TH = require("./theme"), C = TH.color, F = TH.font;
const L = require(path.resolve(process.argv[2])), CO = require(path.resolve(__dirname, "courses", L.course + ".js"));
const ODIR = process.argv[3], VER = process.argv[4] || "v1", WSD = path.join(ODIR, "ws") + "/", AS = path.join(__dirname, "assets") + "/";
const PV = JSON.parse(fs.readFileSync(WSD + "previews.json")), SZ = JSON.parse(fs.readFileSync(WSD + "sizes.json"));
const { NAVY, TEAL: ACC, BLUE, PALE, TINT, INK, GREY, WHITE, AMBER, AMBERL, LINE, TLINE, SOFT, SOFTT } = C;
const M = L.meta, OBJ = L.banner.obj, STD = L.banner.std, COMP = CO.comp, LIT = L.banner.lit || COMP;
const pres = new pptxgen(); pres.layout = "LAYOUT_16x9";
const WARN = [];
const T = (s, text, x, y, w, h, o = {}) => s.addText(text, { x, y, w, h, fontFace: F, color: INK, margin: 0, valign: "top", isTextBox: true, ...o });
const imgPath = f => fs.existsSync(WSD + f) ? WSD + f : AS + f;
const sizeOf = f => { const b = fs.readFileSync(imgPath(f)); return [b.readUInt32BE(16), b.readUInt32BE(20)]; }; // PNG header
const budget = (where, text, max) => { if ((text || "").length > max) WARN.push(`${where}: ${text.length} chars (max ${max}) \u2014 "${text.slice(0, 50)}\u2026"`); };
const tone = t => t === "teal" ? [TINT, TLINE, ACC] : t === "amber" ? [AMBER, AMBERL, "C98A10"] : [PALE, LINE, BLUE];

// ---------- building blocks ----------
function chips(s, x0, y, w, h, step, fs) { COMP.forEach((c, i) => { const x = x0 + i * step, on = LIT.includes(c);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.05, fill: { color: on ? ACC : "33506B" }, line: { color: on ? ACC : "33506B" } });
  T(s, c, x, y, w, h, { fontSize: fs, bold: true, color: on ? WHITE : "7C93AA", align: "center", valign: "middle" }); }); }
function banner(s) {
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.66, fill: { color: NAVY }, line: { color: NAVY } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.09, h: 0.66, fill: { color: ACC }, line: { color: ACC } });
  T(s, "OBJECTIVE", 0.25, 0.07, 3, 0.15, { fontSize: 7, bold: true, color: SOFTT, charSpacing: 3 });
  T(s, OBJ, 0.25, 0.21, 7.6, 0.22, { fontSize: 11.5, bold: true, color: WHITE });
  T(s, STD, 0.25, 0.43, 7.6, 0.18, { fontSize: 9, color: SOFT });
  chips(s, 8.15, 0.2, 0.52, 0.26, 0.6, 9);
}
function frame(s, tag, heading, next) {
  banner(s);
  T(s, `${CO.code} \u00B7 Unit ${M.unit} \u00B7 Lesson ${M.lesson}`, 0.4, 0.74, 4, 0.2, { fontSize: 9.5, color: GREY });
  T(s, (tag || "").toUpperCase(), 5.6, 0.74, 4, 0.2, { fontSize: 9.5, bold: true, color: ACC, align: "right", charSpacing: 1 });
  if (heading) { budget("heading", heading, 60); T(s, heading, 0.4, 0.93, 9.2, 0.5, { fontSize: 26, bold: true, color: NAVY }); }
  if (next) T(s, "Next \u2192 " + next, 5.6, 5.3, 4, 0.2, { fontSize: 9.5, italic: true, color: ACC, align: "right" });
}
function fit(file, bx, by, bw, bh) { const [w, h] = sizeOf(file); const r = Math.min(bw / w, bh / h); const W = w * r, H = h * r;
  return { path: imgPath(file), x: bx + (bw - W) / 2, y: by + (bh - H) / 2, w: W, h: H }; }
function img(s, file, bx, by, bw, bh, border = true) { const o = fit(file, bx, by, bw, bh);
  if (border) s.addShape(pres.shapes.RECTANGLE, { x: o.x - 0.04, y: o.y - 0.04, w: o.w + 0.08, h: o.h + 0.08, fill: { color: WHITE }, line: { color: LINE, width: 1 }, shadow: { type: "outer", color: "000000", opacity: 0.18, blur: 4, offset: 2, angle: 90 } });
  s.addImage(o); return o; }
function card(s, x, y, w, h, fill = PALE, line = LINE) { s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { color: line, width: 1.25 } }); }
function numDot(s, n, x, y, d = 0.42, color = ACC) { s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color } });
  T(s, String(n), x, y, d, d, { fontSize: d * 36, bold: true, color: WHITE, align: "center", valign: "middle" }); }
function iconPanel(s, icon, big, x = 0.4, w = 2.6, iconSize = 1.7) {
  if (icon) s.addImage({ path: imgPath(icon), x: x + (w - iconSize) / 2 - 0.05, y: 1.75, w: iconSize, h: iconSize });
  if (big) { budget("icon caption", big, 45); T(s, big, x, 3.6, w - 0.1, 1.2, { fontSize: 17, bold: true, color: BLUE, align: "center" }); } }

// ---------- slide types (each: (spec, next) => draws one slide) ----------
const R = {};
R.plan = (sp, next, part, steps, first, total) => { const s = pres.addSlide(); s.background = { color: "F4F8FC" };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.34, fill: { color: NAVY }, line: { color: NAVY } });
  T(s, `LESSON PLAN ${part} OF ${total}  \u00B7  TEACHER SLIDE  \u00B7  SKIP WHEN PRESENTING`, 0.3, 0.09, 7, 0.18, { fontSize: 8.5, bold: true, color: WHITE, charSpacing: 2 });
  chips(s, 8.2, 0.05, 0.5, 0.24, 0.58, 8);
  T(s, `${CO.code} \u2014 Unit ${M.unit}: ${M.unitTitle} \u2014 Lesson ${M.lesson}: ${M.title}`, 0.3, 0.42, 9.4, 0.25, { fontSize: 13, bold: true, color: NAVY });
  const P = L.plan; let y = 0.75;
  if (part === 1) {
    T(s, [{ text: "Objective  ", options: { bold: true, color: ACC } }, { text: P.objective + "   " }, { text: "Outcomes  ", options: { bold: true, color: ACC } }, { text: P.outcomes }], 0.3, 0.7, 9.4, 0.36, { fontSize: 9 });
    T(s, [{ text: "Materials  ", options: { bold: true, color: ACC } }, { text: P.materials }], 0.3, 1.07, 9.4, 0.36, { fontSize: 9 });
    budget("plan objective+outcomes", P.objective + P.outcomes, 260); budget("plan materials", P.materials, 250); y = 1.5; }
  if (steps.length) {
    T(s, "TIMED SEQUENCE" + (part > 1 ? " (continued)" : "") + (P.timing ? "  \u00B7  " + P.timing : ""), 0.3, y, 9, 0.2, { fontSize: 8.5, bold: true, color: GREY, charSpacing: 1 }); y += 0.24; }
  const rowH = part === 1 ? 0.52 : 0.46;
  steps.forEach((st, i) => { const n = first + i + 1; budget(`plan step ${n}`, st[1] + st[2], 390);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.3, y, w: 9.4, h: rowH - 0.05, rectRadius: 0.04, fill: { color: WHITE }, line: { color: "C9DCEE", width: 0.75 } });
    numDot(s, n, 0.38, y + (rowH - 0.05 - 0.3) / 2, 0.3);
    T(s, st[0] + " min", 0.75, y + 0.04, 0.6, 0.2, { fontSize: 9, bold: true, color: ACC });
    T(s, [{ text: st[1] + " \u2014 ", options: { bold: true, color: NAVY } }, { text: st[2] }], 1.35, y + 0.03, 8.25, rowH - 0.1, { fontSize: 8.5, valign: "middle" });
    y += rowH; });
  if (part === total) { y += 0.08;
    const boxes = [["Differentiation", P.diff], ["Assessment (formative)", P.assess], ["Homework", P.homework], ["Watch for", P.watch]];
    const bw = 4.62; boxes.forEach((b, i) => { const x = 0.3 + (i % 2) * (bw + 0.16), yy = y + Math.floor(i / 2) * 0.86; budget("plan box " + b[0], b[1], 330);
      card(s, x, yy, bw, 0.8, i === 3 ? AMBER : PALE, i === 3 ? AMBERL : LINE);
      T(s, [{ text: b[0] + "   ", options: { bold: true, color: NAVY, breakLine: true } }, { text: b[1] || "\u2014" }], x + 0.1, yy + 0.06, bw - 0.2, 0.7, { fontSize: 8.5 }); }); } };
R.shape = (sp, next) => { const s = pres.addSlide(); frame(s, "Shape of the day", "Today", next);
  const n = L.shape.length, perCol = Math.ceil(n / 2), step = Math.min(0.6, 3.6 / perCol);
  L.shape.forEach((it, i) => { const col = i < perCol ? 0 : 1, row = i < perCol ? i : i - perCol, x = 0.45 + col * 4.7, y = 1.55 + row * step; budget("shape item", it[0] + it[1], 60);
    numDot(s, i + 1, x, y, 0.44); T(s, [{ text: it[0], options: { bold: true, color: NAVY } }, { text: `  (${it[1]})`, options: { color: GREY } }], x + 0.58, y, 4.0, 0.44, { fontSize: 16, valign: "middle" }); }); };
R.section = (sp, next) => { const s = pres.addSlide(); s.background = { color: NAVY };
  if (sp.icon) s.addImage({ path: imgPath(sp.icon), x: 0.8, y: 1.6, w: 1.9, h: 1.9 });
  T(s, (sp.sub || "").toUpperCase(), 3.2, 1.6, 6.3, 0.3, { fontSize: 13, bold: true, color: SOFTT, charSpacing: 3 });
  T(s, sp.title, 3.2, 1.95, 6.3, 1.2, { fontSize: 40, bold: true, color: WHITE });
  if (next) T(s, "Next \u2192 " + next, 3.2, 4.6, 6, 0.3, { fontSize: 13, italic: true, color: SOFT }); };
R.routine = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head, next); const [fill, line] = tone(sp.tone);
  card(s, 0.4, 1.55, 2.6, 3.55, "F4F8FC", "C9DCEE"); s.addImage({ path: imgPath(sp.icon), x: 0.85, y: 2.0, w: 1.7, h: 1.7 });
  T(s, sp.big, 0.5, 3.85, 2.4, 1.1, { fontSize: 17, bold: true, color: BLUE, align: "center" });
  sp.items.slice(0, 4).forEach((t, i) => { const y = 1.55 + i * 0.9; budget("routine item", t, 70); card(s, 3.2, y, 6.4, 0.8, fill, line); numDot(s, i + 1, 3.35, y + 0.17, 0.46);
    T(s, t, 4.0, y + 0.05, 5.5, 0.7, { fontSize: 18, valign: "middle" }); }); };
R.imagesteps = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head, next); img(s, sp.image, 0.45, 1.5, 3.0, 3.65);
  sp.steps.slice(0, 4).forEach((t, i) => { const y = 1.5 + i * 0.93; budget("image step", t, 90); card(s, 3.75, y, 5.85, 0.83); numDot(s, i + 1, 3.9, y + 0.18, 0.46); T(s, t, 4.55, y + 0.05, 4.95, 0.73, { fontSize: 17, valign: "middle" }); }); };
R.imagebullets = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head, next); img(s, sp.image, 0.45, 1.5, 3.0, 3.65);
  card(s, 3.75, 1.5, 5.85, 3.65, TINT, TLINE);
  T(s, [{ text: sp.title, options: { bold: true, color: NAVY, fontSize: 20, breakLine: true } }, { text: " ", options: { fontSize: 8, breakLine: true } },
    ...sp.bullets.map((b, i) => ({ text: b, options: { bullet: true, breakLine: i < sp.bullets.length - 1 } }))], 3.95, 1.65, 5.5, 3.4, { fontSize: 17, paraSpaceAfter: 8 }); };
R.warmup = (sp, next) => { const s = pres.addSlide(); frame(s, "Warm-up", sp.head || "Warm-up", next); let y0 = 1.5;
  if (sp.note) { card(s, 0.4, 1.5, 9.2, 0.55, AMBER, AMBERL); T(s, sp.note, 0.6, 1.5, 8.9, 0.55, { fontSize: 17, bold: true, color: NAVY, valign: "middle" }); y0 = 2.25; }
  const n = sp.prompts.length, h = Math.min(1.3, (5.15 - y0) / n - 0.15);
  sp.prompts.forEach((q, i) => { const y = y0 + i * (h + 0.15); budget("warm-up prompt", q, 110); card(s, 0.4, y, 9.2, h); numDot(s, i + 1, 0.6, y + (h - 0.52) / 2, 0.52); T(s, q, 1.35, y + 0.08, 8.1, h - 0.16, { fontSize: 22, valign: "middle" }); }); };
R.title = (sp, next) => { const s = pres.addSlide(); s.background = { color: NAVY };
  T(s, `${M.unitTitle.toUpperCase()} \u00B7 ${(M.month || "").toUpperCase()}`, 0.8, 1.55, 8, 0.3, { fontSize: 13, bold: true, color: SOFT, charSpacing: 3 });
  T(s, `Lesson ${M.lesson}`, 0.8, 1.95, 8, 0.4, { fontSize: 20, bold: true, color: SOFTT });
  T(s, M.title, 0.8, 2.4, 8.5, 0.9, { fontSize: 44, bold: true, color: WHITE });
  if (M.subtitle) T(s, M.subtitle, 0.8, 3.9, 8, 0.4, { fontSize: 16, italic: true, color: SOFT });
  if (next) T(s, "Next \u2192 " + next, 0.8, 4.7, 8, 0.3, { fontSize: 12, italic: true, color: SOFT }); };
R.goals = (sp, next) => { const s = pres.addSlide(); frame(s, "Goals", "By the end of this lesson you can:", next);
  sp.items.forEach((g, i) => { const y = 1.6 + i * 1.15; budget("goal", g, 70); card(s, 0.4, y, 9.2, 1.0); numDot(s, i + 1, 0.6, y + 0.24, 0.52); T(s, g, 1.35, y, 8.1, 1.0, { fontSize: 24, valign: "middle" }); }); };
R.handout = (sp, next) => { const s = pres.addSlide(); frame(s, "Your worksheet", "Hand out the worksheet now", next);
  if (sp.note) T(s, sp.note, 0.4, 1.45, 9.2, 0.35, { fontSize: 17, italic: true, color: GREY });
  const parts = L.worksheet.parts, perCol = Math.ceil(parts.length / 2), step = Math.min(0.8, 3.2 / perCol);
  parts.forEach((p, i) => { const col = i < perCol ? 0 : 1, row = i % perCol, x = 0.4 + col * 4.7, y = 1.95 + row * step, ex = p.kind === "exit";
    card(s, x, y, 4.5, step - 0.12, ex ? AMBER : PALE, ex ? AMBERL : LINE);
    T(s, [{ text: `Part ${p.id}  `, options: { bold: true, color: ACC } }, { text: p.title, options: { bold: true, color: NAVY } }], x + 0.2, y, 4.2, step - 0.12, { fontSize: 18, valign: "middle" }); });
  if (sp.foot) T(s, sp.foot, 0.4, 5.2, 7, 0.25, { fontSize: 11, color: GREY }); };
R.page = (sp, next, i) => { const s = pres.addSlide(); frame(s, "Your worksheet", null, next);
  T(s, "WORKSHEET", 0.4, 1.3, 2.6, 0.3, { fontSize: 13, bold: true, color: ACC, charSpacing: 2 });
  T(s, `Page ${i + 1} of ${PV.pages.length}`, 0.4, 1.6, 2.6, 0.5, { fontSize: 26, bold: true, color: NAVY });
  img(s, PV.pages[i], 3.2, 0.95, 3.6, 4.25); };
R.vocab = (sp, next) => { const s = pres.addSlide(); frame(s, "Vocabulary", sp.head || "Key vocabulary", next);
  const n = sp.words.length, cols = Math.min(5, Math.ceil(n / 2)), rows = Math.ceil(n / cols), cw = 9.2 / cols, ch = Math.min(1.9, 3.8 / rows);
  sp.words.forEach((v, i) => { const col = i % cols, row = Math.floor(i / cols), x = 0.4 + col * cw, y = 1.5 + row * ch; budget("vocab definition", v[1], 60);
    card(s, x, y, cw - 0.1, ch - 0.12, row % 2 ? TINT : PALE, row % 2 ? TLINE : LINE);
    T(s, v[0], x + 0.1, y + 0.1, cw - 0.3, 0.4, { fontSize: 18, bold: true, color: row % 2 ? ACC : BLUE });
    T(s, v[1], x + 0.1, y + 0.55, cw - 0.3, ch - 0.75, { fontSize: 14 }); }); };
const part = id => { const p = L.worksheet.parts.find(x => x.id === id); if (!p) throw new Error("No worksheet Part " + id); return p; };
R.walk = (sp, next) => { const p = part(sp.part), s = pres.addSlide(); frame(s, "Worksheet walkthrough", `Part ${p.id} \u2014 ${p.title}`, next);
  img(s, PV.parts[p.id].chunks[sp.chunk || 0], 0.45, 1.55, 6.15, 3.6);
  card(s, 6.85, 1.55, 2.75, 3.6, TINT, TLINE);
  T(s, "HOW TO COMPLETE IT", 7.0, 1.7, 2.5, 0.3, { fontSize: 11, bold: true, color: ACC, charSpacing: 2 });
  if (!p.how) WARN.push(`Part ${p.id}: no 'how' text for the walkthrough`); budget(`Part ${p.id} how`, p.how, 190);
  T(s, p.how || "\u2014", 7.0, 2.05, 2.5, 3.0, { fontSize: 15 }); };
R.reveal = (sp, next, i) => { const p = part(sp.part), Rv = PV.parts[p.id].reveals, r = Rv[i], s = pres.addSlide();
  frame(s, `Answers \u00B7 ${r.n} of ${Rv.length}`, `Part ${p.id} answers \u2014 ${p.title}`, next);
  img(s, r.file, 0.45, 1.5, 9.1, 3.72); };
R.rows = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head, next); const ic = !!sp.icon, n = sp.rows.length;
  const wide = ic && sp.big && sp.big.length > 20, x0 = ic ? (wide ? 3.1 : 2.6) : 0.4, w = 9.6 - x0;
  if (ic) { s.addImage({ path: imgPath(sp.icon), x: wide ? 0.7 : 0.6, y: 1.7, w: wide ? 1.9 : 1.5, h: wide ? 1.9 : 1.5 });
    if (sp.big) T(s, sp.big, 0.4, wide ? 3.8 : 3.35, wide ? 2.5 : 1.9, 1.0, { fontSize: wide ? 17 : 20, bold: true, color: BLUE, align: "center" }); }
  const h = ic ? (n <= 3 ? 1.05 : 0.8) : 0.83, stp = ic ? (n <= 3 ? 1.2 : 0.9) : 0.93, lw = ic ? 1.8 : 2.9, y0 = ic ? (n <= 3 ? 1.55 : 1.5) : 1.5;
  const fl = ic ? (n <= 3 ? 19 : 18) : 19, ft = ic ? (n <= 3 ? 18 : 17) : 19;
  if (y0 + n * stp > 5.3) WARN.push(`rows slide "${sp.head}": ${n} rows do not fit`);
  sp.rows.forEach((r, i) => { const y = y0 + i * stp, teal = i % 2 === 1, center = r[0].length <= 2; budget("row text", r[1], ic ? 80 : 95);
    card(s, x0, y, w, h, teal ? TINT : PALE, teal ? TLINE : LINE);
    T(s, r[0], x0 + (ic ? 0.18 : 0.2), y, lw, h, { fontSize: fl, bold: true, color: teal ? ACC : BLUE, valign: "middle", align: center ? "center" : "left" });
    const tx = ic ? x0 + 1.95 : 3.55; T(s, r[1], tx, y, x0 + w - tx - 0.15, h, { fontSize: ft, valign: "middle" }); }); };
R.cards = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head, next);
  if (sp.icon) s.addImage({ path: imgPath(sp.icon), x: 0.7, y: 1.75, w: 1.5, h: 1.5 });
  if (sp.big) T(s, sp.big, 0.4, 3.4, 2.1, 0.5, { fontSize: 19, bold: true, color: BLUE, align: "center" });
  const n = sp.cards.length, h = Math.min(1.1, 3.6 / n - 0.12);
  sp.cards.forEach((c, i) => { const y = 1.5 + i * (h + 0.12), [fill, line] = tone(c.tone); budget("card body", c.body, 90);
    card(s, 2.7, y, 6.9, h, fill, line); T(s, c.title, 2.9, y + 0.08, 6.5, 0.4, { fontSize: 18, bold: true, color: NAVY }); T(s, c.body, 2.9, y + 0.48, 6.5, h - 0.5, { fontSize: 16 }); }); };
R.textpage = (sp, next, i, pages) => { const tx = L.texts[sp.text], pg = pages[i], s = pres.addSlide();
  frame(s, `${tx.title} \u00B7 ${i + 1} of ${pages.length}`, null, next);
  T(s, `${tx.title}  \u00B7  lines ${pg[0] + 1}\u2013${pg[pg.length - 1] + 1}`, 0.4, 0.93, 9.2, 0.4, { fontSize: 18, bold: true, color: NAVY });
  const runs = []; pg.forEach((k, j) => { runs.push({ text: String(k + 1).padStart(2, " ") + "   ", options: { bold: true, color: ACC } });
    runs.push({ text: tx.lines[k], options: { breakLine: j < pg.length - 1 } }); });
  card(s, 0.4, 1.4, 9.2, 3.8, "FAFCFE", "C9DCEE");
  T(s, runs, 0.6, 1.5, 8.85, 3.6, { fontSize: 23, paraSpaceAfter: 9, lineSpacingMultiple: 1.0 }); };
R.wordlist = (sp, next) => { const tx = L.texts[sp.text], s = pres.addSlide(); frame(s, "Support", sp.head || "Words in this story", next);
  if (sp.note) T(s, sp.note, 0.4, 1.4, 9.2, 0.3, { fontSize: 14, italic: true, color: GREY });
  tx.words.slice(0, 10).forEach((w, i) => { const col = i % 2, row = Math.floor(i / 2), x = 0.4 + col * 4.65, y = 1.8 + row * 0.68; budget("word list meaning", w[1], 55);
    card(s, x, y, 4.55, 0.6, col ? TINT : PALE, col ? TLINE : LINE);
    T(s, w[0], x + 0.15, y, 1.45, 0.6, { fontSize: 16, bold: true, color: col ? ACC : BLUE, valign: "middle" }); T(s, w[1], x + 1.6, y, 2.85, 0.6, { fontSize: 13.5, valign: "middle" }); }); };
R.speaking = (sp, next) => { const s = pres.addSlide(); frame(s, "Speaking", sp.head, next);
  s.addImage({ path: imgPath(sp.icon || "icon-friends.png"), x: 0.65, y: 1.6, w: 1.7, h: 1.7 });
  if (sp.big) T(s, sp.big, 0.4, 3.45, 2.2, 1.0, { fontSize: 16, bold: true, color: BLUE, align: "center" });
  card(s, 2.8, 1.5, 6.8, 0.8); T(s, sp.prompt, 3.0, 1.5, 6.5, 0.8, { fontSize: 16, valign: "middle" }); budget("speaking prompt", sp.prompt, 110);
  card(s, 2.8, 2.45, 6.8, 2.7, TINT, TLINE); T(s, "SENTENCE FRAMES", 3.0, 2.55, 6, 0.3, { fontSize: 12, bold: true, color: ACC, charSpacing: 2 });
  T(s, sp.frames.slice(0, 4).map((f, i, a) => ({ text: f, options: { breakLine: i < a.length - 1 } })), 3.0, 2.9, 6.5, 2.2, { fontSize: 18, italic: true, color: NAVY, paraSpaceAfter: 10 }); };
R.exit = (sp, next) => { const p = part(sp.part), s = pres.addSlide(); frame(s, "Exit ticket", `Exit ticket \u2014 Part ${p.id}`, next);
  p.items.slice(0, 2).forEach((q, i) => { const y = 1.5 + i * 1.12; budget("exit prompt", q.text, 85);
    card(s, 0.4, y, 4.7, 1.0, AMBER, AMBERL); numDot(s, i + 1, 0.55, y + 0.25, 0.5, "C98A10"); T(s, q.text, 1.2, y, 3.8, 1.0, { fontSize: 17, valign: "middle" }); });
  card(s, 0.4, 3.85, 4.7, 1.3, TINT, TLINE); s.addImage({ path: imgPath("icon-folder.png"), x: 0.6, y: 4.05, w: 0.9, h: 0.9 });
  T(s, sp.note, 1.7, 3.85, 3.3, 1.3, { fontSize: 17, bold: true, color: NAVY, valign: "middle" });
  img(s, PV.parts[p.id].chunks[0], 5.35, 1.45, 4.3, 3.75); };
R.next = (sp, next) => { const s = pres.addSlide(); frame(s, "Next class", "Next class", next);
  card(s, 0.4, 1.55, 9.2, 3.55, PALE); s.addImage({ path: imgPath(sp.icon || "icon-pen.png"), x: 1.0, y: 2.25, w: 2.0, h: 2.0 });
  T(s, sp.title, 3.5, 2.3, 5.8, 1.0, { fontSize: 48, bold: true, color: NAVY, fit: "shrink" });
  if (sp.sub) T(s, sp.sub, 3.5, 3.35, 5.8, 0.9, { fontSize: 22, color: BLUE });
  if (sp.items) sp.items.forEach((t, i) => T(s, `${i + 1}.  ${t}`, 3.5, 3.4 + i * 0.36, 5.8, 0.34, { fontSize: 16 })); };

// ---------- expand the lesson sequence into slides ----------
const slides = []; // {label, next (undefined = auto, null = none), draw(next)}
const push = (label, draw, next) => slides.push({ label, draw, next });
const P = L.plan, st = P.steps, pages = [st.slice(0, 7)]; for (let i = 7; i < st.length; i += 6) pages.push(st.slice(i, i + 6));
if (pages.length === 1 || pages[pages.length - 1].length > 5) pages.push([]); // the four plan boxes never fit on slide 1
let first = 0; pages.forEach((pg, k) => { const f = first; push("Lesson plan", () => R.plan({}, null, k + 1, pg, f, pages.length), null); first += pg.length; });
push("Shape of the day", n => R.shape({}, n));
function expand(sp) {
  if (sp.type === "routines") return (CO.routines || []).forEach(expand);
  const lab = sp.label || ({ title: "Today\u2019s lesson", goals: "Today\u2019s goals", handout: "Hand out the worksheet", vocab: "Key vocabulary" }[sp.type]);
  if (sp.type === "handout") { push(lab, n => R.handout(sp, n)); PV.pages.forEach((f, i) => push("Worksheet page " + (i + 1), n => R.page(sp, n, i))); return; }
  if (sp.type === "walk") { const p = part(sp.part); return push(`Part ${p.id} \u2014 ${p.title}`, n => R.walk(sp, n)); }
  if (sp.type === "reveals") { const Rv = PV.parts[sp.part].reveals; if (!Rv.length) WARN.push(`Part ${sp.part}: reveals requested but it has no answers`);
    return Rv.forEach((r, i) => push(`Part ${sp.part} answers`, n => R.reveal(sp, n, i), i < Rv.length - 1 ? null : undefined)); }
  if (sp.type === "text") { const tx = L.texts[sp.text], BUD = sp.budget || 540, pg = []; let cur = [], len = 0;
    tx.lines.forEach((l, i) => { if (len + l.length > BUD && cur.length) { pg.push(cur); cur = []; len = 0; } cur.push(i); len += l.length + 40; }); pg.push(cur);
    return pg.forEach((x, i) => push(lab || "The text", n => R.textpage(sp, n, i, pg), i < pg.length - 1 ? (sp.continues || `${tx.title} continues`) : undefined)); }
  if (!R[sp.type]) throw new Error("Unknown slide type: " + sp.type);
  push(lab, n => R[sp.type](sp, n));
}
L.sequence.forEach(expand);
slides.forEach((sl, i) => { let n = sl.next;
  if (n === undefined) { const j = slides.findIndex((x, k) => k > i && x.label !== sl.label); n = j < 0 ? null : slides[j].label; }
  sl.draw(n); });
const name = TH.fileName(CO, M, "Deck", VER);
if (WARN.length) { console.error("FIT WARNINGS (text may overflow; shorten in the lesson file):\n  " + WARN.join("\n  ")); if (!process.env.ALLOW_WARN) process.exit(1); }
pres.writeFile({ fileName: path.join(ODIR, name + ".pptx") }).then(() => console.log("deck ok:", name, slides.length, "slides"));
