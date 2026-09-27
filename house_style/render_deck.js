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

let MIN = 28, ANS = 30; const HEAD = 36, BASE = 28;
const MATCHMIN = 20, LOWMIN = 15; // LOWMIN: last resort for a warm-up list that must stay on one slide (Sean: one slide wins, Sep 22 2026) // bank-activity exception floor (match-the-word + warm-up drills) (Sean, Sep 22 2026): all definitions + bank on ONE slide, largest size that fits, never below 20

const T = (s, text, x, y, w, h, o = {}) => {
  const { ref, where, floor, ...opt } = o;
  if (!ref) {
    // floor: the ONE approved exception (Sep 22 2026) — match-the-word slides may drop to MATCHMIN so all prompts show at once
    const fl = floor != null ? Math.max(floor, LOWMIN) : MIN;
    const size = opt.fontSize == null ? fl : opt.fontSize;
    if (size < fl) SMALL.push(`${where || "text"}: ${size} pt (floor ${fl})`);
    opt.fontSize = Math.max(size, fl);
    if (Array.isArray(text)) text = text.map(r => (r.options && r.options.fontSize != null && r.options.fontSize < fl)
      ? { ...r, options: { ...r.options, fontSize: fl } } : r);
  }
  return s.addText(text, { x, y, w, h, fontFace: F, color: INK, margin: 0, valign: "top", isTextBox: true, ...opt });
};
const imgPath = f => fs.existsSync(WSD + f) ? WSD + f : AS + f;
const sizeOf = f => { const b = fs.readFileSync(imgPath(f)); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const budget = (where, text, max) => { if ((text || "").length > max) WARN.push(`${where}: ${text.length} chars (max ${max}) \u2014 "${text.slice(0, 50)}\u2026"`); };
const tone = t => t === "teal" ? [TINT, TLINE, ACC] : t === "amber" ? [AMBER, AMBERL, "C98A10"] : [PALE, LINE, BLUE];
const balanced = (a, n) => { const g = Math.ceil(a.length / n) || 1, base = Math.floor(a.length / g), extra = a.length % g, o = []; let i = 0;
  for (let k = 0; k < g; k++) { const size = base + (k < extra ? 1 : 0); o.push(a.slice(i, i + size)); i += size; } return o.length ? o : [[]]; };
// Estimated rendered height (inches) of `text` in a box `w` inches wide at `size` pt.
// ~1.85 characters per pt of width at this face; line height 1.22.
// average glyph width for this face measures ~0.46 x the point size; 0.50 leaves a safety margin
const GF = CO.glyph || 0.50; // courses may set a measured glyph factor
// line count from measured Calibri widths with word wrapping (+5% margin); CAL/CALB are defined further down and read at call time
const textH = (text, w, size) => { const lines = String(text || "").split("\n").reduce((a, l) => a + wrapLines(l, w, size), 0);
  return lines * (size / 72) * 1.22; };
function wrapLines(t, w, S) { let n = 1, cur = 0; for (const wd of String(t).split(" ")) {
  const x = [...(wd + " ")].reduce((a, c) => a + (CAL[c] ?? 0.55), 0) * 1.05 * S / 72;
  if (cur + x > w && cur > 0) { n++; cur = x; } else cur += x; } return n; }
const fits = (where, text, w, h, size = MIN) => { const need = textH(text, w, size);
  if (need > h + 0.02) WARN.push(`${where}: needs ${need.toFixed(2)}in in a ${h.toFixed(2)}in box \u2014 "${String(text).slice(0, 44)}\u2026"`); };
// Lay items out down the band, each given the height its own text needs.
const CAPH = 1.55; // a list row never grows taller than this
const stack = (needs, top, bottom, gap = 0.12, cap = CAPH) => { gap *= MIN / BASE;
  const n = needs.length, room = bottom - top, inner = room - gap * (n - 1);
  const base = needs.reduce((a, b) => a + b, 0);
  let h = needs.map(v => v * (inner / base));            // fill the band
  h = h.map((v, i) => Math.min(Math.max(v, needs[i]), Math.max(needs[i], cap))); // never below need, never a giant row
  let used = h.reduce((a, b) => a + b, 0) + gap * (n - 1);
  if (used > room) { const sc = (room - gap * (n - 1)) / (used - gap * (n - 1)); h = h.map(v => v * sc); used = room; }
  let y = top + (used < room ? (room - used) / 2 : 0);   // short stacks sit centred, not top-heavy
  const out = []; h.forEach(v => { out.push({ y, h: v }); y += v + gap; });
  return out; };
// Greedy pack: fill a slide until the next item will not fit, then start another.
const pack = (list, needOf, room, gap = 0.12, g = 1) => { gap *= MIN / BASE;
  const units = []; for (let i = 0; i < list.length; i += g) units.push(list.slice(i, i + g));
  const out = []; let cur = [], used = 0;
  units.forEach(u => { const n = u.reduce((a, it) => a + Math.min(needOf(it), room), 0) + gap * (u.length - 1);
    if (cur.length && used + gap + n > room) { out.push(cur); cur = []; used = 0; }
    cur = cur.concat(u); used += (used ? gap : 0) + n; });
  if (cur.length) out.push(cur);
  if (CO.levels && g === 1 && out.length > 1) { // even out the split (3+2, not 4+1) when every even group still fits
    const bal = balanced(list, Math.ceil(list.length / out.length));
    if (bal.length === out.length && bal.every(grp => grp.reduce((a, it) => a + Math.min(needOf(it), room), 0) + gap * (grp.length - 1) <= room)) return bal; }
  return out.length ? out : [[]]; };
const pack2 = (list, needOf, room1, room2, gap = 0.12) => {
  const out = []; let cur = [], used = 0, room = room1;
  list.forEach(it => { const n = Math.min(needOf(it), room);
    if (cur.length && used + gap + n > room) { out.push(cur); cur = []; used = 0; room = room2; }
    cur.push(it); used += (cur.length > 1 ? gap : 0) + Math.min(needOf(it), room); });
  if (cur.length) out.push(cur);
  return out.length ? out : [[]]; };
// grid pack: `cols` per row, measured by the tallest card in each row
const packGrid = (list, cols, needOf, room, gap) => { gap *= MIN / BASE;
  const rows = []; for (let i = 0; i < list.length; i += cols) rows.push(list.slice(i, i + cols));
  const out = []; let cur = [], used = 0;
  rows.forEach(r => { const n = Math.max(...r.map(needOf));
    if (cur.length && used + gap + n > room) { out.push(cur); cur = []; used = 0; }
    cur = cur.concat(r); used += (used ? gap : 0) + n; });
  if (cur.length) out.push(cur);
  return out.length ? out : [[]]; };
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
let TOP = 1.55, HEADLESS = false; const BOT = 5.25, TOP0 = 1.55;
function frame(s, tag, heading, next) {
  if (HEADLESS) { if (heading) tag = `${tag || ""} \u00B7 ${heading}`; heading = null; }   // heading dropped so a whole set fits one slide (Sean, Sep 22 2026); its words move into the tag
  banner(s);
  T(s, `${CO.display || CO.code} \u00B7 Unit ${M.unit} \u00B7 Lesson ${M.lesson}`, 0.4, 0.74, 4, 0.2, { ref: true, fontSize: 9.5, color: GREY });
  T(s, (tag || "").toUpperCase(), 4.5, 0.74, 5.1, 0.2, { ref: true, fontSize: 9.5, bold: true, color: ACC, align: "right", charSpacing: 1 });
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
  T(s, String(n), x, y, d, d, { ref: true, fontSize: String(n).length > 1 ? d * 30 : d * 40, bold: true, color: WHITE, align: "center", valign: "middle" }); }
// ENGLISH ONLY yield sign — ELL only (courses/<CODE>.js sets englishOnly:false to forbid), opt-in per activity.
function englishOnly(s, x, y) {
  s.addShape(pres.shapes.ISOSCELES_TRIANGLE, { x, y, w: 1.6, h: 1.4, rotate: 180, fill: { color: "D7261E" }, line: { color: "D7261E" } });
  s.addShape(pres.shapes.ISOSCELES_TRIANGLE, { x: x + 0.13, y: y + 0.1, w: 1.34, h: 1.18, rotate: 180, fill: { color: WHITE }, line: { color: WHITE } });
  T(s, "ENGLISH\nONLY", x, y + 0.2, 1.6, 0.66, { ref: true, fontSize: 16, bold: true, color: "D7261E", align: "center", lineSpacingMultiple: 0.88 });
  T(s, "please", x, y + 0.74, 1.6, 0.3, { ref: true, fontSize: 13, italic: true, color: "D7261E", align: "center" });
}

// ---------- slide types ----------
const PAD = 0.18, ROWMIN = 0.58;
const needText = (t, w, size = MIN) => Math.max(ROWMIN * size / BASE, textH(t, w, size) + PAD * size / BASE);
const needShape = it => needText(`${it[0]}  (${it[1]})`, 8.3);
const needReveal = it => needText(it.q, 8.0) + textH(it.a, 8.0 / 1.08, ANS) + 0.14 * MIN / BASE;
// NEXT-QUESTION STRIP (Sean, Sep 21 2026): the next question must be readable BEFORE its answer is exposed.
// On an answer slide the next question is highlighted in place when it is already there unanswered;
// otherwise it sits in this strip at the foot of the slide. The last slide before the first answer shows it too.
const SW = 8.7, SGAP = 0.12;
const stripH = q => textH(q, SW, MIN) + 0.46;
// ONE-SLIDE RULE (Sean, Sep 22 2026): a Part's questions, a vocabulary list or a set of answers never runs across slides.
// Everything sized from MIN is measured and drawn at the largest S (28 down to MATCHMIN) at which the whole set fits one slide.
const withSize = (S, fn) => { const m = MIN, a = ANS, t = TOP, h = HEADLESS; const head = S > 0; S = Math.abs(S);
  MIN = S; ANS = S + 2; if (!head) { TOP = 0.95; HEADLESS = true; } try { return fn(); } finally { MIN = m; ANS = a; TOP = t; HEADLESS = h; } };
const ONESIZES = [];
function oneSizeQuiet(fitsAt) { for (let S = BASE; S >= LOWMIN; S--) for (const sign of [1, -1]) if (withSize(sign * S, fitsAt)) return sign * S; return null; }
// returns S (heading kept) or -S (heading dropped); withSize understands both
function oneSize(what, fitsAt) { for (let S = BASE; S >= LOWMIN; S--) for (const sign of [1, -1]) if (withSize(sign * S, fitsAt)) {
    if (S < BASE || sign < 0) ONESIZES.push(`${what}: ${S}${sign < 0 ? " (heading dropped)" : ""}`); return sign * S; }
  SMALL.push(`${what}: does not fit one slide even at ${LOWMIN} pt`); return null; }
const stripRoom = qs => qs.length ? Math.max(...qs.map(stripH)) + SGAP : 0;
function strip(s, st) { if (!st) return; const h = stripH(st.q), y = BOT - h;
  card(s, 0.4, y, 9.2, h, AMBER, AMBERL);
  T(s, st.label.toUpperCase(), 0.65, y + 0.07, 8.7, 0.24, { ref: true, fontSize: 11, bold: true, color: "B07A00", charSpacing: 2 });
  T(s, st.q, 0.65, y + 0.34, SW, h - 0.38, { fontSize: MIN, bold: true, color: NAVY }); }
const R = {};
R.plan = (sp, next, part, steps, first, total) => { const s = pres.addSlide(); s.background = { color: "F4F8FC" };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.34, fill: { color: NAVY }, line: { color: NAVY } });
  T(s, `LESSON PLAN ${part} OF ${total}  \u00B7  TEACHER SLIDE  \u00B7  SKIP WHEN PRESENTING`, 0.3, 0.09, 7, 0.18, { ref: true, fontSize: 8.5, bold: true, color: WHITE, charSpacing: 2 });
  chips(s, 8.2, 0.05, 0.5, 0.24, 0.58, 8);
  T(s, `${CO.display || CO.code} \u2014 Unit ${M.unit}: ${M.unitTitle} \u2014 Lesson ${M.lesson}: ${M.title}`, 0.3, 0.42, 9.4, 0.25, { ref: true, fontSize: 13, bold: true, color: NAVY });
  const P = L.plan; let y = 0.75;
  if (part === 1) {
    T(s, [{ text: "Objective  ", options: { bold: true, color: ACC } }, { text: P.objective + "   " }, { text: "Outcomes  ", options: { bold: true, color: ACC } }, { text: P.outcomes }], 0.3, 0.7, 9.4, 0.36, { ref: true, fontSize: 9 });
    T(s, [{ text: "Materials  ", options: { bold: true, color: ACC } }, { text: P.materials }], 0.3, 1.07, 9.4, 0.36, { ref: true, fontSize: 9 });
    budget("plan objective+outcomes", P.objective + P.outcomes, 260); budget("plan materials", P.materials, 250); y = 1.5; }
  if (steps.length) {
    T(s, "TIMED SEQUENCE" + (part > 1 ? " (continued)" : "") + (P.timing ? "  \u00B7  " + P.timing : ""), 0.3, y, 9, 0.2, { ref: true, fontSize: 8.5, bold: true, color: GREY, charSpacing: 1 }); y += 0.24; }
  const rowH = part === 1 ? 0.56 : 0.50;
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

R.shape = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag || "Shape of the day", (sp.head || "Today") + (sp.cont ? " (continued)" : ""), next);
  const items = sp.slice, box = stack(items.map(it => needShape(it)), TOP, BOT);
  items.forEach((it, i) => { const { y, h } = box[i];
    numDot(s, sp.from + i + 1, 0.45, y + (h - 0.54) / 2, 0.54);
    T(s, [{ text: it[0], options: { bold: true, color: NAVY } }, { text: `  (${it[1]})`, options: { color: GREY } }], 1.2, y, 8.3, h, { fontSize: MIN, valign: "middle" }); }); };

R.section = (sp, next) => { const s = pres.addSlide(); s.background = { color: NAVY };
  if (sp.icon) s.addImage({ path: imgPath(sp.icon), x: 0.8, y: 1.6, w: 1.9, h: 1.9 });
  T(s, (sp.sub || "").toUpperCase(), 3.2, 1.6, 6.3, 0.3, { ref: true, fontSize: 13, bold: true, color: SOFTT, charSpacing: 3 });
  T(s, sp.title, 3.2, 1.95, 6.3, 1.2, { fontSize: 40, bold: true, color: WHITE });
  if (next) T(s, "Next \u2192 " + next, 3.2, 4.6, 6, 0.3, { ref: true, fontSize: 13, italic: true, color: SOFT }); };

R.routine = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag + (sp.cont ? " \u00B7 cont." : ""), sp.head, next); const [fill, line] = tone(sp.tone);
  card(s, 0.4, TOP, 2.6, BOT - TOP, "F4F8FC", "C9DCEE"); s.addImage({ path: imgPath(sp.icon), x: 0.85, y: TOP + 0.3, w: 1.7, h: 1.7 });
  if (sp.big) T(s, sp.big, 0.5, TOP + 2.25, 2.4, 1.1, { fontSize: MIN, bold: true, color: BLUE, align: "center" });
  const items = sp.slice, h = (BOT - TOP) / items.length - 0.12;
  items.forEach((t, i) => { const y = TOP + i * (h + 0.12); fits("routine item", t, 5.3, h - 0.1); card(s, 3.2, y, 6.4, h, fill, line);
    numDot(s, sp.from + i + 1, 3.38, y + (h - 0.54) / 2);
    T(s, t, 4.15, y + 0.05, 5.3, h - 0.1, { fontSize: MIN, valign: "middle" }); }); };

R.imagesteps = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag + (sp.cont ? " \u00B7 cont." : ""), sp.head, next); img(s, sp.image, 0.45, TOP, 2.85, BOT - TOP);
  const items = sp.slice, h = (BOT - TOP) / items.length - 0.12;
  items.forEach((t, i) => { const y = TOP + i * (h + 0.12); fits("image step", t, 4.9, h - 0.1); card(s, 3.6, y, 6.0, h);
    numDot(s, sp.from + i + 1, 3.78, y + (h - 0.54) / 2);
    T(s, t, 4.55, y + 0.05, 4.9, h - 0.1, { fontSize: MIN, valign: "middle" }); }); };

R.imagebullets = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag + (sp.cont ? " \u00B7 cont." : ""), sp.head, next); img(s, sp.image, 0.45, TOP, 2.85, BOT - TOP);
  card(s, 3.6, TOP, 6.0, BOT - TOP, TINT, TLINE);
  const runs = [];
  if (!sp.cont && sp.title) runs.push({ text: sp.title, options: { bold: true, color: NAVY, fontSize: 32, breakLine: true } });
  sp.slice.forEach((b, i, a) => { budget("bullet", b, 90); runs.push({ text: b, options: { bullet: true, breakLine: i < a.length - 1 } }); });
  T(s, runs, 3.8, TOP + 0.15, 5.65, BOT - TOP - 0.3, { fontSize: MIN, paraSpaceAfter: 10 }); };

R.warmup = (sp, next) => { const s = pres.addSlide(); frame(s, "Warm-up" + (sp.cont ? " \u00B7 cont." : ""), sp.head || "Warm-up", next); let y0 = TOP;
  if (sp.note && !sp.cont) { const nh = textH(sp.note, 8.6, MIN) + 0.26; card(s, 0.4, TOP, 9.2, nh, AMBER, AMBERL);
    T(s, sp.note, 0.68, TOP + 0.13, 8.6, nh - 0.26, { fontSize: MIN, bold: true, color: NAVY }); y0 = TOP + nh + 0.14; }
  const items = sp.slice, box = stack(items.map(q => textH(q, 7.9, MIN) + 0.3), y0, BOT, 0.15);
  items.forEach((q, i) => { const { y, h } = box[i]; card(s, 0.4, y, 9.2, h);
    numDot(s, sp.from + i + 1, 0.64, y + (h - 0.54) / 2);
    T(s, q, 1.5, y + 0.06, 7.9, h - 0.12, { fontSize: MIN, valign: "middle" }); }); };

R.title = (sp, next) => { const s = pres.addSlide(); s.background = { color: NAVY };
  T(s, `${M.unitTitle.toUpperCase()} \u00B7 ${(M.month || "").toUpperCase()}`, 0.8, 1.5, 8, 0.3, { ref: true, fontSize: 14, bold: true, color: SOFT, charSpacing: 3 });
  T(s, `Lesson ${M.lesson}`, 0.8, 1.9, 8, 0.45, { fontSize: 28, bold: true, color: SOFTT });
  T(s, M.title, 0.8, 2.45, 8.5, 1.15, { fontSize: 44, bold: true, color: WHITE });
  if (M.subtitle) T(s, M.subtitle, 0.8, 3.95, 8.5, 0.5, { fontSize: MIN, italic: true, color: SOFT });
  if (next) T(s, "Next \u2192 " + next, 0.8, 4.8, 8, 0.3, { ref: true, fontSize: 12, italic: true, color: SOFT }); };

R.goals = (sp, next) => { const s = pres.addSlide(); frame(s, "Goals" + (sp.cont ? " \u00B7 cont." : ""), "By the end of this lesson you can:", next);
  const items = sp.slice, box = stack(items.map(g => needText(g, 7.9)), TOP, BOT, 0.16);
  items.forEach((g, i) => { const { y, h } = box[i]; card(s, 0.4, y, 9.2, h);
    numDot(s, sp.from + i + 1, 0.64, y + (h - 0.54) / 2);
    T(s, g, 1.5, y, 7.9, h, { fontSize: MIN, valign: "middle" }); }); };

R.handout = (sp, next) => { const s = pres.addSlide(); frame(s, "Your worksheet", "Hand out the worksheet now", next);
  let y0 = TOP;
  if (sp.note) { const nh = textH(sp.note, 9.2, MIN); T(s, sp.note, 0.4, TOP, 9.2, nh, { fontSize: MIN, italic: true, color: GREY }); y0 = TOP + nh + 0.16; }
  const parts = sp.items ? sp.items.map(([id, title, ex]) => ({ id, title, kind: ex ? "exit" : "" })) : L.worksheet.parts, box = stack(parts.map(p => textH(`Part ${p.id}  ${p.title}`, 8.6, MIN) + 0.06), y0, BOT, 0.05);
  parts.forEach((p, i) => { const { y, h } = box[i], ex = p.kind === "exit";
    card(s, 0.4, y, 9.2, h, ex ? AMBER : PALE, ex ? AMBERL : LINE);
    T(s, [{ text: `Part ${p.id}  `, options: { bold: true, color: ACC } }, { text: p.title, options: { bold: true, color: NAVY } }], 0.72, y, 8.6, h, { fontSize: MIN, valign: "middle" }); });
  if (sp.foot) T(s, sp.foot, 0.4, 5.32, 7, 0.24, { ref: true, fontSize: 11, color: GREY }); };

R.page = (sp, next, i, pg) => { pg = pg || { file: PV.pages[i], n: i + 1, of: PV.pages.length }; const s = pres.addSlide(); frame(s, "Your worksheet" + (pg.lvl ? " \u00B7 " + pg.lvl : ""), null, next);
  T(s, pg.lvl ? pg.lvl.toUpperCase() + " SHEET" : "WORKSHEET", 0.4, 1.15, 2.6, 0.3, { ref: true, fontSize: 13, bold: true, color: ACC, charSpacing: 2 });
  T(s, `Page ${pg.n} of ${pg.of}`, 0.4, 1.5, 2.6, 0.6, { fontSize: 32, bold: true, color: NAVY });
  img(s, pg.file, 3.2, 0.9, 3.7, 4.4); };

const VL = { tw: 2.3 }, needVocabRow = v => Math.max(textH(v[0], VL.tw - 0.2, MIN + 2), textH(v[1], 9.2 - VL.tw - 0.35, MIN)) + 0.1 * MIN / BASE;
R.vocablist = (sp, next) => { const s = pres.addSlide(); frame(s, "Vocabulary", sp.head || "Key vocabulary", next);
  const items = sp.slice, box = stack(items.map(needVocabRow), TOP, BOT, 0.05);
  items.forEach((v, i) => { const { y, h } = box[i]; card(s, 0.4, y, 9.2, h, i % 2 ? TINT : PALE, i % 2 ? TLINE : LINE);
    T(s, v[0], 0.55, y, VL.tw - 0.2, h, { fontSize: MIN + 2, bold: true, color: i % 2 ? ACC : BLUE, valign: "middle" });
    T(s, v[1], 0.4 + VL.tw, y, 9.2 - VL.tw - 0.35, h, { fontSize: MIN, valign: "middle" }); }); };
R.vocab = (sp, next) => { const s = pres.addSlide(); frame(s, "Vocabulary" + (sp.cont ? " \u00B7 cont." : ""), sp.head || "Key vocabulary", next);
  const items = sp.slice, rows = Math.ceil(items.length / 2), cw = 4.6;
  const k = MIN / BASE, th = 0.5 * k, rowNeed = []; // term line and gaps scale with the fitted size
  for (let r = 0; r < rows; r++) rowNeed.push(Math.max(...[0, 1].map(c => items[r * 2 + c] ? textH(items[r * 2 + c][1], cw - 0.5, MIN) + th + 0.3 * k : 0)));
  const box = stack(rowNeed, TOP, BOT, 0.12);
  items.forEach((v, i) => { const col = i % 2, row = Math.floor(i / 2), x = 0.4 + col * cw, y = box[row].y, ch = box[row].h;
    card(s, x, y, cw - 0.1, ch, row % 2 ? TINT : PALE, row % 2 ? TLINE : LINE);
    T(s, v[0], x + 0.2, y + 0.06 * k, cw - 0.5, th, { fontSize: Math.round(32 * k), bold: true, color: row % 2 ? ACC : BLUE });
    T(s, v[1], x + 0.2, y + 0.06 * k + th, cw - 0.5, ch - th - 0.1 * k, { fontSize: MIN, valign: "top" }); }); };

// MATCH THE WORD (Sep 22 2026): every definition and the whole bank on ONE slide, so students can eliminate.
// Sized to the largest point size that fits (floor MATCHMIN); reveals add one answer per slide, cumulative,
// with the next definition highlighted in amber before its answer shows.
const MX = { dot: 0.64, defX: 1.0, defW: 6.85, ansX: 7.95, ansW: 1.6, gap: 0.03, pad: 0.05 };
const matchBankTxt = bank => bank.join("  \u00B7  ");
// Calibri advance widths in ems (measured from Carlito, metric-compatible with Calibri) — regular and bold
var CAL = {" ": 0.226, "!": 0.326, "\"": 0.401, "#": 0.498, "$": 0.507, "%": 0.715, "&": 0.682, "'": 0.221, "(": 0.303, ")": 0.303, "*": 0.498, "+": 0.498, ",": 0.25, "-": 0.306, ".": 0.252, "/": 0.386, "0": 0.507, "1": 0.507, "2": 0.507, "3": 0.507, "4": 0.507, "5": 0.507, "6": 0.507, "7": 0.507, "8": 0.507, "9": 0.507, ":": 0.268, ";": 0.268, "<": 0.498, "=": 0.498, ">": 0.498, "?": 0.463, "@": 0.894, "A": 0.579, "B": 0.544, "C": 0.533, "D": 0.615, "E": 0.488, "F": 0.459, "G": 0.631, "H": 0.623, "I": 0.252, "J": 0.319, "K": 0.52, "L": 0.42, "M": 0.855, "N": 0.646, "O": 0.662, "P": 0.517, "Q": 0.673, "R": 0.543, "S": 0.459, "T": 0.487, "U": 0.642, "V": 0.567, "W": 0.89, "X": 0.519, "Y": 0.487, "Z": 0.468, "[": 0.307, "\\": 0.386, "]": 0.307, "^": 0.498, "_": 0.498, "`": 0.291, "a": 0.479, "b": 0.525, "c": 0.423, "d": 0.525, "e": 0.498, "f": 0.305, "g": 0.471, "h": 0.525, "i": 0.23, "j": 0.239, "k": 0.455, "l": 0.23, "m": 0.799, "n": 0.525, "o": 0.527, "p": 0.525, "q": 0.525, "r": 0.349, "s": 0.391, "t": 0.335, "u": 0.525, "v": 0.452, "w": 0.715, "x": 0.433, "y": 0.453, "z": 0.395, "{": 0.314, "|": 0.46, "}": 0.314, "~": 0.498, "·": 0.252, "’": 0.25, "‘": 0.25, "“": 0.418, "”": 0.418, "—": 0.905, "–": 0.498, "é": 0.498, "è": 0.498, "á": 0.479, "à": 0.479, "ñ": 0.525, "ü": 0.525, "ö": 0.527, "→": 0.905};
var CALB = {" ": 0.226, "!": 0.326, "\"": 0.438, "#": 0.498, "$": 0.507, "%": 0.729, "&": 0.705, "'": 0.233, "(": 0.312, ")": 0.312, "*": 0.498, "+": 0.498, ",": 0.258, "-": 0.306, ".": 0.267, "/": 0.43, "0": 0.507, "1": 0.507, "2": 0.507, "3": 0.507, "4": 0.507, "5": 0.507, "6": 0.507, "7": 0.507, "8": 0.507, "9": 0.507, ":": 0.276, ";": 0.276, "<": 0.498, "=": 0.498, ">": 0.498, "?": 0.463, "@": 0.898, "A": 0.606, "B": 0.561, "C": 0.529, "D": 0.63, "E": 0.488, "F": 0.459, "G": 0.637, "H": 0.631, "I": 0.267, "J": 0.331, "K": 0.547, "L": 0.423, "M": 0.874, "N": 0.659, "O": 0.676, "P": 0.532, "Q": 0.686, "R": 0.563, "S": 0.473, "T": 0.495, "U": 0.653, "V": 0.591, "W": 0.906, "X": 0.551, "Y": 0.52, "Z": 0.478, "[": 0.325, "\\": 0.43, "]": 0.325, "^": 0.498, "_": 0.498, "`": 0.3, "a": 0.494, "b": 0.537, "c": 0.418, "d": 0.537, "e": 0.503, "f": 0.316, "g": 0.474, "h": 0.537, "i": 0.246, "j": 0.255, "k": 0.48, "l": 0.246, "m": 0.813, "n": 0.537, "o": 0.538, "p": 0.537, "q": 0.537, "r": 0.355, "s": 0.399, "t": 0.347, "u": 0.537, "v": 0.473, "w": 0.745, "x": 0.459, "y": 0.474, "z": 0.397, "{": 0.344, "|": 0.475, "}": 0.344, "~": 0.498, "·": 0.268, "’": 0.258, "‘": 0.258, "“": 0.435, "”": 0.435, "—": 0.905, "–": 0.498, "é": 0.503, "è": 0.503, "á": 0.494, "à": 0.494, "ñ": 0.537, "ü": 0.537, "ö": 0.538, "→": 0.905};
// (old note) Calibri widths in ems, measured (space 0.226, letters ~0.45 with margin) — tighter than textH's generic estimate
const emOf = (t, bold) => [...String(t)].reduce((a, c) => a + ((bold ? CALB : CAL)[c] ?? 0.5), 0) * 1.03; // 3% margin
const mLines = (t, w, S, bold) => { let n = 1, cur = 0; for (const wd of String(t).split(" ")) { const x = emOf(wd + " ", bold) * S / 72;
  if (cur + x > w && cur > 0) { n++; cur = x; } else cur += x; } return n; };
// Heading kept when the slide fits with it; dropped (Sean, Sep 22 2026) only where it is needed to fit.
function matchLayout(words, bank) {
  for (let S = MIN; S >= LOWMIN; S--) {
    for (const head of [true, false]) {    // bigger text beats keeping the heading
      const top0 = head ? TOP : 0.95;
      const ln = S / 72 * 1.2, bh = mLines(matchBankTxt(bank), 8.7, S) * ln + 0.28, top = top0 + bh + 0.06;
      // answer column sized to the longest answer (bold, S+2); the definition column takes the rest
      const ansW = Math.max(1.4, Math.max(...words.map(v => emOf(v[0]))) * (S + 2) / 72 * 1.1 + 0.1), defW = 9.45 - MX.defX - ansW - 0.1;
      const pad = words.length > 8 ? 0.025 : MX.pad, gap = words.length > 8 ? 0.02 : MX.gap; // long lists: tighter rows so all stay on one slide
      const needs = words.map(v => mLines(v[1], defW, S) * ln + pad);
      const used = needs.reduce((x, y) => x + y, 0) + gap * (needs.length - 1);
      if (top + used <= BOT && defW >= 4) {
        const spare = (BOT - top - used) / needs.length, rows = []; let y = top;
        needs.forEach(h => { rows.push({ y, h: h + spare }); y += h + spare + gap; });
        return { S, bh, rows, head, top0, ansW, defW };
      }
    }
  }
  return null;
}
function matchBody(s, words, bank, upto, hi, tag, headTxt, next) {
  const lay = matchLayout(words, bank);
  frame(s, tag, lay && lay.head ? headTxt : null, next);
  if (!lay) { SMALL.push(`match: ${words.length} definitions do not fit on one slide at ${LOWMIN} pt`); return; }
  const { S, bh, rows, top0, ansW, defW } = lay, fl = { floor: S }, ansX = 9.45 - ansW;
  card(s, 0.4, top0, 9.2, bh, TINT, TLINE);
  T(s, "WORD BANK", 0.64, top0 + 0.03, 2.2, 0.18, { ref: true, fontSize: 9.5, bold: true, color: ACC, charSpacing: 2 });
  T(s, matchBankTxt(bank), 0.64, top0 + 0.21, 8.7, bh - 0.24, { ...fl, fontSize: S, bold: true, color: NAVY });
  words.forEach((v, i) => { const { y, h } = rows[i], done = i < upto, nx = i === hi, d = Math.min(0.4, h - 0.06);
    card(s, 0.4, y, 9.2, h, done ? TINT : nx ? AMBER : PALE, done ? TLINE : nx ? AMBERL : LINE);
    numDot(s, i + 1, MX.dot - 0.12, y + (h - d) / 2, d, done ? BLUE : nx ? "C98A10" : ACC);
    T(s, v[1], MX.defX, y, defW, h, { ...fl, fontSize: S, valign: "middle", bold: nx, color: nx ? NAVY : INK });
    T(s, done ? v[0] : "\u2014\u2014\u2014", ansX, y, ansW, h, { ...fl, fontSize: done ? S + 2 : S, bold: true, color: done ? BLUE : "9DB3C7", valign: "middle" }); });
  return S + (lay.head ? "" : " (heading dropped)");
}
const MATCHSIZES = [];
R.match = (sp, next) => { const s = pres.addSlide();
  MATCHSIZES.push(matchBody(s, sp.words, sp.bank, 0, 0, "Vocabulary \u00B7 match the word", sp.head || "Match the word to its meaning", next)); };
R.matchreveal = (sp, next, i) => { const s = pres.addSlide();
  matchBody(s, sp.words, sp.bank, i + 1, i + 1 < sp.words.length ? i + 1 : -1, `Match the word \u00B7 ${i + 1} of ${sp.words.length}`, sp.head || "Match the word to its meaning", next); };

const part = id => { const p = L.worksheet.parts.find(x => (x.key || x.id) === id); if (!p) throw new Error("No worksheet Part " + id); return p; };
const lv = p => p.lvl ? " \u00B7 " + p.lvl : "";
const wsItems = p => (p.items || []).map(it => ({ q: it.text, a: it.ans != null && it.ans !== "" ? it.ans : (it.reveal || "") }));

R.howto = (sp, next) => { const p = part(sp.part), s = pres.addSlide();
  frame(s, "Worksheet walkthrough" + lv(p), `Part ${p.id} \u2014 ${p.title}`, next);
  if (!p.how) WARN.push(`Part ${p.id}: no 'how' text for the walkthrough`);
  const showI = p.instr && sp.only !== "how", showH = sp.only !== "instr";
  const needs = [];
  if (showI) needs.push(needText(p.instr, 8.7) + 0.1);
  if (showH) needs.push(needText(p.how, 8.7) + 0.6);
  const box = stack(needs, TOP, BOT, 0.18, 3.2);
  let k = 0;
  if (showI) { const b = box[k++]; card(s, 0.4, b.y, 9.2, b.h, AMBER, AMBERL);
    T(s, p.instr, 0.65, b.y, 8.7, b.h, { fontSize: MIN, italic: true, color: NAVY, valign: "middle" }); }
  if (!showH) return;
  const b = box[k]; card(s, 0.4, b.y, 9.2, b.h, TINT, TLINE);
  T(s, "HOW TO COMPLETE IT", 0.65, b.y + 0.1, 4, 0.26, { ref: true, fontSize: 11, bold: true, color: ACC, charSpacing: 2 });
  T(s, p.how || "\u2014", 0.65, b.y + 0.48, 8.7, b.h - 0.58, { fontSize: MIN }); };

R.walk = (sp, next) => { const p = part(sp.part), s = pres.addSlide();
  frame(s, "Worksheet walkthrough" + lv(p) + (sp.cont ? " \u00B7 cont." : ""), `Part ${p.id} \u2014 ${p.title}`, next);
  const iw = 9.2, items = sp.slice; let y = TOP;
  if (!items.length) { T(s, sp.note || "Space to write on the sheet.", 0.4, y, iw, 1.0, { fontSize: MIN, color: GREY }); return; }
  const tw = iw - 1.05, SZ = sp.size || MIN, fl = sp.size ? { floor: SZ } : {};
  const box = sp.size ? stack(items.map(it => needText(it.q, tw, SZ)), y, BOT, 0.06) : stack(items.map(it => needText(it.q, tw, SZ) + 0.1), y, BOT, 0.1);
  items.forEach((it, i) => { const { y: yy, h } = box[i], d = Math.min(0.5, h - 0.08);
    card(s, 0.4, yy, iw, h); numDot(s, it.n || sp.from + i + 1, 0.6, yy + (h - d) / 2, d);
    T(s, it.q, 1.3, yy + 0.05, tw, h - 0.1, { ...fl, fontSize: SZ, valign: "middle" }); }); };

R.reveal = (sp, next, i) => { const p = part(sp.part), items = sp.slice, s = pres.addSlide(), hi = sp.hi == null ? -1 : sp.hi, bot = sp.strip ? BOT - stripH(sp.strip.q) - SGAP : BOT;
  frame(s, (i < 0 ? "The questions" : sp.good ? "One good answer" : `Answers \u00B7 ${i + 1} of ${items.length}`) + lv(p),
    (i < 0 ? `Part ${p.id} \u2014 ${p.title}` : sp.good ? `Part ${p.id} \u2014 one good answer` : `Part ${p.id} answers \u2014 ${p.title}`), next);
  const box = stack(items.map(it => needReveal(it)), TOP, bot, 0.06);
  if (CO.levels && p.kind === "cloze") { const SZ = sp.size || MIN, fl = sp.size ? { floor: SZ } : {};
    const bx = stack(items.map(it => needText(it.q + "  " + it.a, 8.0, SZ)), TOP, bot, sp.size ? 0.06 : 0.1);
    items.forEach((it, k) => { const { y, h } = bx[k], done = k <= i, nx = k === hi, d = Math.min(0.5, h - 0.08);
      card(s, 0.4, y, 9.2, h, done ? TINT : nx ? AMBER : PALE, done ? TLINE : nx ? AMBERL : LINE);
      numDot(s, sp.from + k + 1, 0.62, y + (h - d) / 2, d, done ? BLUE : "9DB3C7");
      T(s, [{ text: it.q + "  " }, { text: done ? it.a : "________", options: done ? { bold: true, color: BLUE, fontSize: sp.size ? SZ + 2 : ANS } : { color: "9DB3C7" } }], 1.3, y, 8.0, h, { ...fl, fontSize: SZ, valign: "middle" }); });
    strip(s, sp.strip); return; }
  items.forEach((it, k) => { const { y, h } = box[k], done = k <= i, nx = k === hi, qh = needText(it.q, 8.0) - PAD;
    card(s, 0.4, y, 9.2, h, done ? TINT : nx ? AMBER : PALE, done ? TLINE : nx ? AMBERL : LINE);
    numDot(s, sp.from + k + 1, 0.62, y + (h - 0.5) / 2, 0.5, done ? BLUE : "9DB3C7");
    const kk = MIN / BASE; T(s, it.q, 1.3, y + 0.1 * kk, 8.0, qh, { fontSize: MIN });
    if (done) T(s, it.a || "\u2014", 1.3, y + 0.14 * kk + qh, 8.0, h - qh - 0.22 * kk, { fontSize: ANS, bold: true, color: BLUE }); });
  strip(s, sp.strip); };

// One good answer, two columns — used when the whole set will not fit one slide in a single column (one-slide rule)
const GW = 4.2;
const needGood = it => textH(it.q, GW - 0.35, MIN) + textH(it.a, (GW - 0.35) / 1.08, ANS) + 0.25 * MIN / BASE; // text boxes are GW - 0.32 wide; answers are bold
R.goodgrid = (sp, next, upto = Infinity, hi = -1) => { const p = part(sp.part), items = sp.slice, s = pres.addSlide(), grid = upto !== Infinity;
  frame(s, (grid ? (upto < 0 ? "The questions" : `Answers \u00B7 ${upto + 1} of ${items.length}`) : "One good answer") + lv(p),
    grid ? (upto < 0 ? `Part ${p.id} \u2014 ${p.title}` : `Part ${p.id} answers \u2014 ${p.title}`) : `Part ${p.id} \u2014 one good answer`, next);
  const rows = []; for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
  const box = stack(rows.map(r => Math.max(...r.map(needGood))), TOP, BOT, 0.1);
  rows.forEach((r, ri) => r.forEach((it, c) => { const k = ri * 2 + c, { y, h } = box[ri], x = 0.4 + c * 4.66, qh = textH(it.q, GW, MIN), d = Math.min(0.42, h - 0.08);
    const done = k <= upto, nx = k === hi;
    card(s, x, y, 4.54, h, done ? TINT : nx ? AMBER : PALE, done ? TLINE : nx ? AMBERL : LINE); numDot(s, k + 1, x + 0.08, y + 0.08, d, done ? BLUE : nx ? "C98A10" : "9DB3C7");
    T(s, it.q, x + 0.26 + d, y + 0.05, GW - d + 0.1, qh + 0.05, { fontSize: MIN, bold: nx });
    if (done) T(s, it.a || "\u2014", x + 0.26 + d, y + 0.08 + qh, GW - d + 0.1, h - qh - 0.12, { fontSize: ANS, bold: true, color: BLUE }); })); };
R.rows = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag + (sp.cont ? " \u00B7 cont." : ""), sp.head, next);
  const eo = sp.englishOnly && CO.englishOnly !== false, ic = (!!sp.icon && !sp.cont) || eo, x0 = ic ? 3.1 : 0.4, w = 9.6 - x0, items = sp.slice;
  if (eo) { englishOnly(s, 0.85, TOP + 0.35); if (sp.big) T(s, sp.big, 0.4, TOP + 2.0, 2.5, 1.4, { fontSize: MIN, bold: true, color: BLUE, align: "center" }); }
  if (ic && !eo) { s.addImage({ path: imgPath(sp.icon), x: 0.65, y: TOP + 0.15, w: 1.9, h: 1.9 });
    if (sp.big) T(s, sp.big, 0.4, TOP + 2.25, 2.5, Math.min(textH(sp.big, 2.5, MIN) + 0.1, BOT - TOP - 2.3), { fontSize: MIN, bold: true, color: BLUE, align: "center" }); }
  const lwNeed = Math.max(...items.map(r => textH(r[0], 99, MIN) && String(r[0]).length * (MIN / 72) * 0.52)) + 0.3;
  const lw = Math.min(Math.max(lwNeed, ic || CO.levels ? 1.5 : 2.0), w * 0.42), tw = w - lw - 0.56;
  const box = stack(items.map(r => needText(r[1], tw)), TOP, BOT, CO.levels ? 0.08 : 0.12);
  items.forEach((r, i) => { const { y, h } = box[i], teal = (sp.from + i) % 2 === 1, center = r[0].length <= 2;
    card(s, x0, y, w, h, teal ? TINT : PALE, teal ? TLINE : LINE);
    T(s, r[0], x0 + 0.2, y, lw, h, { fontSize: MIN, bold: true, color: teal ? ACC : BLUE, valign: "middle", align: center ? "center" : "left" });
    const tx = x0 + lw + 0.38; T(s, r[1], tx, y, x0 + w - tx - 0.18, h, { fontSize: MIN, valign: "middle" }); }); };

// Teaching cards in a 2 x 2 grid — used when the stacked layout would not fit one slide at 20 pt (one-slide rule).
// The decorative icon is left out; the "big" line becomes a bold strip along the bottom.
const CGW = 4.54, needCardG = c => textH(c.title, CGW - 0.4, Math.round(32 * MIN / BASE)) + textH(c.body, CGW - 0.4, MIN) + 0.3 * MIN / BASE;
const cardGridFits = sp => { const rows = []; for (let i = 0; i < sp.cards.length; i += 2) rows.push(Math.max(...sp.cards.slice(i, i + 2).map(needCardG)));
  const bigH = sp.big ? textH(sp.big, 8.8, MIN) + 0.14 : 0; return rows.reduce((a, b) => a + b, 0) + 0.12 * (rows.length - 1) + (bigH ? bigH + 0.1 : 0) <= BOT - TOP; };
R.cardgrid = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag, sp.head, next);
  const k = MIN / BASE, bigH = sp.big ? textH(sp.big, 8.8, MIN) + 0.14 : 0, rows = [];
  for (let i = 0; i < sp.cards.length; i += 2) rows.push(sp.cards.slice(i, i + 2));
  const box = stack(rows.map(r => Math.max(...r.map(needCardG))), TOP, BOT - (bigH ? bigH + 0.1 : 0), 0.12);
  rows.forEach((r, ri) => r.forEach((c, ci) => { const { y, h } = box[ri], x = 0.4 + ci * (CGW + 0.12), [fill, line] = tone(c.tone), th = textH(c.title, CGW - 0.4, Math.round(32 * k));
    card(s, x, y, CGW, h, fill, line);
    T(s, c.title, x + 0.2, y + 0.08 * k, CGW - 0.4, th, { fontSize: Math.round(32 * k), bold: true, color: NAVY });
    T(s, c.body, x + 0.2, y + 0.12 * k + th, CGW - 0.4, h - th - 0.16 * k, { fontSize: MIN }); }));
  if (bigH) { const y = BOT - bigH; card(s, 0.4, y, 9.2, bigH, TINT, TLINE); T(s, sp.big, 0.6, y, 8.8, bigH, { fontSize: MIN, bold: true, color: BLUE, valign: "middle", align: "center" }); } };
R.cards = (sp, next) => { const s = pres.addSlide(); frame(s, sp.tag + (sp.cont ? " \u00B7 cont." : ""), sp.head, next);
  const ic = !!sp.icon && !sp.cont, x0 = ic ? 2.9 : 0.4, w = 9.6 - x0, items = sp.slice;
  if (ic) { s.addImage({ path: imgPath(sp.icon), x: 0.58, y: TOP + 0.2, w: 1.7, h: 1.7 });
    if (sp.big) T(s, sp.big, 0.4, TOP + 2.15, 2.3, 0.95, { fontSize: MIN, bold: true, color: BLUE, align: "center" }); }
  const h = (BOT - TOP) / items.length - 0.14;
  items.forEach((c, i) => { const y = TOP + i * (h + 0.14), [fill, line] = tone(c.tone); budget("card body", c.body, 95);
    card(s, x0, y, w, h, fill, line);
    const k = MIN / BASE;
    T(s, c.title, x0 + 0.22, y + 0.08 * k, w - 0.45, 0.5 * k, { fontSize: Math.round(32 * k), bold: true, color: NAVY });
    T(s, c.body, x0 + 0.22, y + 0.66 * k, w - 0.45, h - 0.74 * k, { fontSize: MIN }); }); };

R.textpage = (sp, next, i, pages) => { const tx = L.texts[sp.text], pg = pages[i], s = pres.addSlide();
  frame(s, `${tx.title} \u00B7 ${i + 1} of ${pages.length}`, null, next);
  T(s, `${tx.title}  \u00B7  lines ${pg[0] + 1}\u2013${pg[pg.length - 1] + 1}`, 0.4, 0.95, 9.2, 0.5, { fontSize: 32, bold: true, color: NAVY });
  const runs = []; pg.forEach((k, j) => { runs.push({ text: String(k + 1).padStart(2, " ") + "   ", options: { bold: true, color: ACC } });
    runs.push({ text: tx.lines[k], options: { breakLine: j < pg.length - 1 } }); });
  card(s, 0.4, TOP, 9.2, BOT - TOP, "FAFCFE", "C9DCEE");
  T(s, runs, 0.66, TOP + 0.12, 8.65, BOT - TOP - 0.24, { fontSize: MIN, paraSpaceAfter: 9, lineSpacingMultiple: 1.0 }); };

R.wordlist = (sp, next) => { const s = pres.addSlide();
  frame(s, "Support", sp.head || "Words in this story", next);
  const items = sp.slice, box = stack(items.map(w => needText(w[1], 6.25)), TOP, BOT, 0.1);
  items.forEach((w, i) => { const { y, h } = box[i], teal = (sp.from + i) % 2 === 1;
    card(s, 0.4, y, 9.2, h, teal ? TINT : PALE, teal ? TLINE : LINE);
    T(s, w[0], 0.68, y, 2.3, h, { fontSize: MIN, bold: true, color: teal ? ACC : BLUE, valign: "middle" });
    T(s, w[1], 3.15, y, 6.25, h, { fontSize: MIN, valign: "middle" }); }); };

R.speaking = (sp, next) => { const s = pres.addSlide(); frame(s, "Speaking", sp.head, next);
  const eo = sp.englishOnly && CO.englishOnly !== false;
  if (!sp.cont) { s.addImage({ path: imgPath(sp.icon || "icon-friends.png"), x: 0.6, y: TOP + 0.05, w: 1.7, h: 1.7 });
    if (sp.big && !eo) T(s, sp.big, 0.4, TOP + 1.85, 2.3, 0.9, { fontSize: MIN, bold: true, color: BLUE, align: "center" }); }
  if (eo && (!sp.cont || sp.signAll)) englishOnly(s, 0.65, sp.cont ? TOP + 0.3 : TOP + 1.9);
  const x0 = 2.9, w = 6.7; let y = TOP;
  if (!sp.cont) { const ph = textH(sp.prompt, w - 0.48, MIN) + 0.26; card(s, x0, y, w, ph);
    T(s, sp.prompt, x0 + 0.24, y + 0.13, w - 0.48, ph - 0.26, { fontSize: MIN }); y += ph + 0.15; }
  card(s, x0, y, w, BOT - y, TINT, TLINE);
  T(s, "SENTENCE FRAMES", x0 + 0.24, y + 0.1, 5, 0.26, { ref: true, fontSize: 11, bold: true, color: ACC, charSpacing: 2 });
  sp.slice.forEach(f => budget("sentence frame", f, 70));
  T(s, sp.slice.map((f, i, a) => ({ text: f, options: { breakLine: i < a.length - 1 } })), x0 + 0.24, y + 0.46, w - 0.48, BOT - y - 0.56, { fontSize: MIN, italic: true, color: NAVY, paraSpaceAfter: 8 }); };

R.exit = (sp, next) => { const p = part(sp.part), s = pres.addSlide(); frame(s, "Exit ticket" + lv(p), `Exit ticket \u2014 Part ${p.id}`, next);
  const items = p.items.slice(0, 3), h = Math.min(1.2, (BOT - TOP - 1.35) / items.length - 0.12);
  items.forEach((q, i) => { const y = TOP + i * (h + 0.12); fits("exit prompt", q.text, 7.9, h);
    card(s, 0.4, y, 9.2, h, AMBER, AMBERL); numDot(s, i + 1, 0.64, y + (h - 0.54) / 2, 0.54, "C98A10");
    T(s, q.text, 1.5, y, 7.9, h, { fontSize: MIN, valign: "middle" }); });
  const yy = BOT - 1.2; card(s, 0.4, yy, 9.2, 1.2, TINT, TLINE);
  s.addImage({ path: imgPath("icon-folder.png"), x: 0.7, y: yy + 0.15, w: 0.9, h: 0.9 });
  if (sp.note) { budget("exit note", sp.note, 80); T(s, sp.note, 1.85, yy, 7.5, 1.2, { fontSize: MIN, bold: true, color: NAVY, valign: "middle" }); } };

R.next = (sp, next) => { const s = pres.addSlide(); frame(s, "Next class", "Next class", next);
  card(s, 0.4, TOP, 9.2, BOT - TOP, PALE);
  s.addImage({ path: imgPath(sp.icon || "icon-pen.png"), x: 0.9, y: TOP + 0.55, w: 2.0, h: 2.0 });
  T(s, sp.title, 3.3, TOP + 0.3, 6.0, Math.max(1.05, textH(sp.title, 6.0, 44)), { fontSize: 44, bold: true, color: NAVY });
  if (sp.sub) T(s, sp.sub, 3.3, TOP + 1.45, 6.0, Math.min(textH(sp.sub, 6.0, MIN) + 0.1, BOT - TOP - 1.5), { fontSize: MIN, color: BLUE });
  if (sp.items) sp.items.slice(0, 3).forEach((t, i) => T(s, `${i + 1}.  ${t}`, 3.3, TOP + 1.5 + i * 0.62, 6.0, 0.58, { fontSize: MIN })); };


// ---------- two-level additions (ELL 1/2): warm-up drills, full texts, split-screen texts ----------
// drill row: question with its blank, or the blank filled in blue once revealed
const fillRuns = (q, a, done) => { const m = q.split(/_{3,}/);
  if (m.length < 2) return done ? [{ text: q + "  " }, { text: a, options: { bold: true, color: BLUE } }] : [{ text: q }];
  return done ? [{ text: m[0] }, { text: a, options: { bold: true, color: BLUE, underline: { style: "sng" } } }, { text: m.slice(1).join("") }] : [{ text: q.replace(/_{3,}/, "________") }]; };
function drillBody(s, lvl, items, from, upto, hi = -1, bottom = BOT, noBank = false) {
  let y0 = TOP;
  if (lvl.bank && !noBank) { const bh = textH(lvl.bank, 8.7, MIN) + 0.44; card(s, 0.4, TOP, 9.2, bh, TINT, TLINE);
    T(s, (lvl.bankLabel || "Word bank").toUpperCase(), 0.64, TOP + 0.06, 8, 0.24, { ref: true, fontSize: 11, bold: true, color: ACC, charSpacing: 2 });
    T(s, lvl.bank, 0.64, TOP + 0.3, 8.7, bh - 0.36, { fontSize: MIN, bold: true, color: NAVY }); y0 = TOP + bh + 0.12; }
  const box = stack(items.map(it => needText(it[0].replace(/_{3,}/, it[1] + "xx"), 8.0)), y0, bottom, 0.08);
  items.forEach((it, k) => { const { y, h } = box[k], n = from + k, done = n <= upto, nx = n === hi;
    card(s, 0.4, y, 9.2, h, done ? TINT : nx ? AMBER : PALE, done ? TLINE : nx ? AMBERL : LINE);
    numDot(s, n + 1, 0.6, y + (h - 0.46) / 2, 0.46, done ? BLUE : ACC);
    T(s, fillRuns(it[0], it[1], done), 1.3, y, 8.1, h, { fontSize: MIN, valign: "middle" }); }); }
R.drill = (sp, next, lvl, items, from, upto, k, of, hi = -1, st = null) => { const s = pres.addSlide();
  frame(s, k === 0 ? `Warm-up answers \u00B7 Part ${sp.part} \u00B7 first question` : upto < 0 ? `Warm-up \u00B7 Part ${sp.part} \u00B7 ${sp.kind}` : `Warm-up answers \u00B7 Part ${sp.part} \u00B7 ${k} of ${of}`,
    `Part ${sp.part} \u00B7 ${sp.kind} \u00B7 ${lvl.lvl}`, next);
  drillBody(s, lvl, items, from, upto, hi, st ? BOT - stripH(st.q) - SGAP : BOT, k != null); strip(s, st); }; // answer slides drop the bank: students have already done all ten
// WARM-UP DRILL, ALL TEN ON ONE SLIDE (Sean, Sep 22 2026): a level's whole list shows at once so students can eliminate from the bank.
// Two columns; heading kept only if it fits; largest size that fits, never below MATCHMIN. Answer slides drop the bank and carry the
// next-question strip (levels alternate, so the next question is on the other level's list) at the same fitted size.
const DC = { gap: 0.03, pad: 0.06, colGap: 0.12, blank: "______", wide: 1.0 };
function drillLayout(lvl, strips) {
  const cols = 2, per = Math.ceil(lvl.items.length / cols), colW = (9.2 - DC.colGap) / cols, txtW = colW - 0.50;
  const qOf = it => it[0].replace(/_{3,}/, DC.blank), aOf = it => it[0].replace(/_{3,}/, it[1]);
  for (let S = MIN; S >= LOWMIN; S--) {
    for (const head of [true, false]) {    // bigger text beats keeping the heading
      const top0 = head ? TOP : 0.95;
      const ln = S / 72 * 1.2;
      const rowH = lvl.items.map(it => Math.max(mLines(qOf(it), txtW / DC.wide, S), mLines(aOf(it), txtW / DC.wide, S)) * ln + DC.pad);
      const colH = [0, 1].map(c => rowH.slice(c * per, c * per + per).reduce((a, b) => a + b, 0) + DC.gap * (per - 1));
      const listH = Math.max(...colH);
      const bh = lvl.bank ? mLines(lvl.bank, 8.7, S) * ln + 0.28 : 0;
      const sh = strips.length ? Math.max(...strips.map(q => mLines(q, 8.7, S))) * ln + 0.3 : 0;
      const qFits = top0 + (bh ? bh + 0.06 : 0) + listH <= BOT, aFits = top0 + listH + (sh ? sh + 0.06 : 0) <= BOT;
      if (qFits && aFits) return { S, ln, head, top0, bh, sh, per, colW, txtW, rowH };
    }
  }
  return null;
}
// SIDE-BY-SIDE DRILL (Sean, Sep 26 2026, trial on L08): both levels on ONE slide, ELL 1 left, ELL 2 right, each with its own bank
// and its five items in one column. Answers reveal on the same slide, alternating levels; the next question is always highlighted in
// place (it is on this slide), so no strip is needed. Largest size that fits both panels, heading dropped only if needed.
const DS = { gap: 0.05, pad: 0.08, colGap: 0.2, head: 0.34 };
function drillSideLayout(sp) {
  const colW = (9.2 - DS.colGap) / 2, txtW = colW - 0.5;
  const qOf = it => it[0].replace(/_{3,}/, DC.blank), aOf = it => it[0].replace(/_{3,}/, it[1]);
  const fitPanel = (lv, top0, S) => { const ln = S / 72 * 1.2, bh = lv.bank ? mLines(lv.bank, colW - 0.3, S) * ln + 0.3 : 0;
    const rowH = lv.items.map(it => Math.max(mLines(qOf(it), txtW / DC.wide, S), mLines(aOf(it), txtW / DC.wide, S)) * ln + DS.pad);
    const need = DS.head + (bh ? bh + 0.06 : 0) + rowH.reduce((a, b) => a + b, 0) + DS.gap * (rowH.length - 1);
    return top0 + need <= BOT ? { S, bh, rowH } : null; };
  // each panel gets its own largest size (a long ELL 2 list no longer shrinks ELL 1); the heading stays only if BOTH fit with it
  for (const head of [true, false]) { const top0 = head ? TOP : 0.95, per = [];
    for (const lv of sp.lvls) { let got = null; for (let S = MIN; S >= LOWMIN && !got; S--) got = fitPanel(lv, top0, S); per.push(got); }
    if (per.every(Boolean) && (head ? per.every(p => p.S >= Math.min(MIN, 20)) : true)) return { head, top0, colW, txtW, per, S: Math.min(...per.map(p => p.S)) };
  }
  return null;
}
function drillSide(s, sp, lay, answered, hi, tag, next) {
  frame(s, lay && !lay.head ? `${tag}` : tag, lay && lay.head ? `Part ${sp.part} \u00B7 ${sp.kind}` : null, next);
  if (!lay) { SMALL.push(`side-by-side drill Part ${sp.part}: does not fit one slide at ${LOWMIN} pt`); return; }
  const { top0, colW, txtW, per } = lay;
  sp.lvls.forEach((lv, li) => { const x = 0.4 + li * (colW + DS.colGap), P = per[li], S = P.S, fl = { floor: S };
    card(s, x, top0, colW, DS.head - 0.04, li ? ACC : BLUE, li ? ACC : BLUE);
    T(s, lv.lvl, x + 0.15, top0, colW - 0.3, DS.head - 0.04, { ref: true, fontSize: 14, bold: true, color: WHITE, valign: "middle" });
    let y = top0 + DS.head;
    if (lv.bank) { card(s, x, y, colW, P.bh, TINT, TLINE);
      T(s, (lv.bankLabel || "Word bank").toUpperCase(), x + 0.15, y + 0.03, colW - 0.3, 0.18, { ref: true, fontSize: 8.5, bold: true, color: ACC, charSpacing: 1 });
      T(s, lv.bank, x + 0.15, y + 0.21, colW - 0.3, P.bh - 0.24, { ...fl, fontSize: S, bold: true, color: NAVY }); y += P.bh + 0.06; }
    const need = P.rowH.reduce((a, b) => a + b, 0) + DS.gap * (P.rowH.length - 1), spare = Math.max(0, (BOT - y - need) / P.rowH.length);
    lv.items.forEach((it, k) => { const h = P.rowH[k] + spare, done = k < answered[li], nx = hi && hi[0] === li && hi[1] === k, d = Math.min(0.4, h - 0.06);
      card(s, x, y, colW, h, done ? TINT : nx ? AMBER : PALE, done ? TLINE : nx ? AMBERL : LINE);
      numDot(s, k + 1, x + 0.07, y + (h - d) / 2, d, done ? BLUE : nx ? "C98A10" : ACC);
      const [a, b] = it[0].split(/_{3,}/);
      T(s, [{ text: a }, { text: done ? it[1] : DC.blank, options: done ? { bold: true, color: BLUE } : { color: "7F97AD" } }, { text: b || "" }],
        x + 0.5, y, txtW, h, { ...fl, fontSize: S, valign: "middle", bold: nx && !done });
      y += h + DS.gap; }); });
  return `${per.map((p, i) => sp.lvls[i].lvl + " " + p.S).join(", ")}${lay.head ? "" : " (heading dropped)"}`;
}
function drillAll(s, sp, lvl, lay, answered, hi, st, withBank, tag, next) {
  frame(s, lay && !lay.head ? `${tag} \u00B7 ${lvl.lvl}` : tag, lay && lay.head ? `Part ${sp.part} \u00B7 ${sp.kind} \u00B7 ${lvl.lvl}` : null, next);
  if (!lay) { SMALL.push(`drill Part ${sp.part} ${lvl.lvl}: ten items do not fit on one slide at ${LOWMIN} pt`); return; }
  const { S, ln, top0, bh, sh, per, colW, txtW, rowH } = lay, fl = { floor: S };
  let y0 = top0;
  if (withBank && lvl.bank) { card(s, 0.4, top0, 9.2, bh, TINT, TLINE);
    T(s, (lvl.bankLabel || "Word bank").toUpperCase(), 0.64, top0 + 0.03, 8, 0.18, { ref: true, fontSize: 9.5, bold: true, color: ACC, charSpacing: 2 });
    T(s, lvl.bank, 0.64, top0 + 0.21, 8.7, bh - 0.24, { ...fl, fontSize: S, bold: true, color: NAVY }); y0 = top0 + bh + 0.06; }
  const bottom = st ? BOT - sh - 0.06 : BOT;
  [0, 1].forEach(c => { const idx = [...Array(per).keys()].map(k => c * per + k).filter(k => k < lvl.items.length);
    const need = idx.reduce((a, k) => a + rowH[k], 0) + DC.gap * (idx.length - 1), spare = Math.max(0, (bottom - y0 - need) / Math.max(1, idx.length));
    let y = y0; const x = 0.4 + c * (colW + DC.colGap);
    idx.forEach(k => { const it = lvl.items[k], h = rowH[k] + spare, done = k < answered, nx = k === hi, d = Math.min(0.4, h - 0.06);
      card(s, x, y, colW, h, done ? TINT : nx ? AMBER : PALE, done ? TLINE : nx ? AMBERL : LINE);
      numDot(s, k + 1, x + 0.07, y + (h - d) / 2, d, done ? BLUE : nx ? "C98A10" : ACC);
      const [a, b] = it[0].split(/_{3,}/);
      T(s, [{ text: a }, { text: done ? it[1] : DC.blank, options: done ? { bold: true, color: BLUE } : { color: "7F97AD" } }, { text: b || "" }],
        x + 0.5, y, txtW, h, { ...fl, fontSize: S, valign: "middle", bold: nx && !done });
      y += h + DC.gap; }); });
  if (st) { const y = BOT - sh; card(s, 0.4, y, 9.2, sh, AMBER, AMBERL);
    T(s, st.label.toUpperCase(), 0.65, y + 0.04, 8.7, 0.2, { ref: true, fontSize: 9.5, bold: true, color: "B07A00", charSpacing: 2 });
    T(s, st.q, 0.65, y + 0.24, 8.7, sh - 0.26, { ...fl, fontSize: S, bold: true, color: NAVY }); }
  return S + (lay.head ? "" : " (heading dropped)");
}
// largest size (MIN down to MATCHMIN) at which every row fits one slide; null if even MATCHMIN will not
function oneSlideSize(needsAt, room, gap, tight = gap) { for (let S = MIN; S >= MATCHMIN; S--) { const n = needsAt(S), g = S === MIN ? gap : tight;
  if (n.reduce((a, b) => a + b, 0) + g * (n.length - 1) <= room) return S; }
  WARN.push("a word-bank Part does not fit one slide even at " + MATCHMIN + " pt: " + JSON.stringify(needsAt(MATCHMIN).map(x => +x.toFixed(2)))); return null; }
const DRILLSIZES = [];
// full text across as many slides as it needs, at the floor
const splitWords = (text, w, room) => { // break at sentence ends; fall back to words only for a sentence longer than a slide
  const sents = text.match(/[^.!?]+[.!?]+[\u2019\u201D"]?\s*/g) || [text], pgs = []; let cur = "";
  for (const se of sents.map(x => x.trim())) { const t = cur ? cur + " " + se : se;
    if (textH(t, w, MIN) <= room) { cur = t; continue; }
    if (cur) pgs.push(cur);
    if (textH(se, w, MIN) <= room) { cur = se; continue; }
    cur = ""; for (const wd of se.split(/\s+/)) { const u = cur ? cur + " " + wd : wd; if (textH(u, w, MIN) > room && cur) { pgs.push(cur); cur = wd; } else cur = u; } }
  if (cur) pgs.push(cur); return pgs; };
const splitWordsOld = (text, w, room) => { const pgs = []; let cur = "";
  text.split(/\s+/).forEach(wd => { const t = cur ? cur + " " + wd : wd; if (textH(t, w, MIN) > room && cur) { pgs.push(cur); cur = wd; } else cur = t; });
  if (cur) pgs.push(cur); return pgs; };
R.prose = (sp, next, chunk, k, of) => { const s = pres.addSlide(); const tx = L.texts[sp.text];
  frame(s, `Class text \u00B7 ${tx.lvl}` + (of > 1 ? ` \u00B7 ${k} of ${of}` : ""), tx.title, next);
  card(s, 0.4, TOP, 9.2, BOT - TOP, "FFFFFF", LINE);
  T(s, chunk, 0.65, TOP + 0.15, 8.7, BOT - TOP - 0.3, { fontSize: MIN, lineSpacingMultiple: 1.0 }); };
R.text2 = (sp, next, ca, cb, k, of) => { const s = pres.addSlide(); const A = L.texts[sp.a], B = L.texts[sp.b];
  frame(s, "Class text \u00B7 both versions" + (of > 1 ? ` \u00B7 ${k} of ${of}` : ""), "Side by side", next);
  [[A, ca, 0.4, PALE, LINE, BLUE], [B, cb, 5.05, TINT, TLINE, ACC]].forEach(([tx, c, x, f, l, col]) => {
    card(s, x, TOP, 4.55, BOT - TOP, f, l);
    T(s, `${tx.lvl} \u00B7 ${tx.title}`.toUpperCase(), x + 0.18, TOP + 0.08, 4.2, 0.24, { ref: true, fontSize: 11, bold: true, color: col, charSpacing: 1 });
    if (c) T(s, c, x + 0.18, TOP + 0.38, 4.2, BOT - TOP - 0.46, { fontSize: MIN }); }); };

const pageList = () => PV.sheets ? PV.sheets.flatMap(sh => sh.pages.map((f, i) => ({ file: f, n: i + 1, of: sh.pages.length, lvl: sh.lvl })))
  : PV.pages.map((f, i) => ({ file: f, n: i + 1, of: PV.pages.length }));
// ---------- expand the lesson sequence into slides ----------
const slides = [];
const push = (label, draw, next) => slides.push({ label, draw, next });
// SIDE-BY-SIDE WARM-UP IS THE DEFAULT for two-level courses (Sean, Sep 26 2026). If either level's panel cannot reach 20 pt,
// that Part falls back to separate slides per level, and the fallback is noted on the teacher plan slide ("Watch for" box).
{ const notes = [];
  L.sequence.forEach(sp => { if (sp.type !== "drill" || !sp.lvls || sp.lvls.length !== 2 || sp.side === false || !CO.levels) return;
    const lay = drillSideLayout(sp), ok = lay && lay.per.every(p => p.S >= 20);
    sp.side = !!ok;
    if (!ok) notes.push(`Warm-up Part ${sp.part} is on separate slides per level: ` + (lay ? lay.per.map((p, i) => `${sp.lvls[i].lvl} ${p.S} pt`).join(", ") + " side by side" : "too long to share a slide") + " (floor 20).");
  });
  if (notes.length) { L.plan.watch = "SLIDE NOTE: " + notes.join(" ") + " " + (L.plan.watch || ""); console.log("  side-by-side fallback: " + notes.join(" ")); } }
const P = L.plan, st = P.steps, pages = [st.slice(0, 7)]; for (let i = 7; i < st.length; i += 6) pages.push(st.slice(i, i + 6));
if (pages.length === 1 || pages[pages.length - 1].length > 5) pages.push([]);
let first = 0; pages.forEach((pg, k) => { const f = first; push("Lesson plan", () => R.plan({}, null, k + 1, pg, f, pages.length), null); first += pg.length; });

// items per slide at the 28 pt floor
const PER = { shape: 6, goals: 3, warmup: 3, rows: 4, cards: 2, vocab: 4, routine: 3, imagesteps: 3, imagebullets: 4, wordlist: 4, speaking: 3, walk: 4, match: 3 };
const NEEDOF = { goals: () => (g => needText(g, 7.9)), warmup: () => (q => textH(q, 7.9, MIN) + 0.3),
  rows: sp => { const side = sp.icon || sp.englishOnly, w = 9.6 - (side ? 3.1 : 0.4);
    if (!CO.levels) return r => needText(r[1], w - (side ? 1.5 : 2.4) - 0.56);
    const lw = Math.min(Math.max(Math.max(...sp.rows.map(r => String(r[0]).length * (MIN / 72) * 0.52)) + 0.3, 1.5), w * 0.42);
    return r => needText(r[1], w - lw - 0.56); },
  cards: sp => (c => needText(c.body, (9.6 - (sp.icon ? 2.9 : 0.4)) - 0.45) + 0.74 * MIN / BASE),
  vocab: () => (v => needText(v[1], 4.1) + 0.72), wordlist: () => (w => needText(w[1], 6.25)), speaking: () => (f => textH(f, 6.22, MIN) + (CO.levels ? 0.1 : 0.14)) };
const BAND = { warmup: sp => (BOT - TOP) - (sp.note ? textH(sp.note, 8.6, MIN) + 0.4 : 0), speaking: sp => BOT - TOP - (textH(sp.prompt, 6.22, MIN) + 0.41) - 0.58 + (CO.levels ? 0.1 : 0) };
const LISTOF = { goals: sp => sp.items, warmup: sp => sp.prompts, rows: sp => sp.rows, cards: sp => sp.cards,
  vocab: sp => sp.words, routine: sp => sp.items, imagesteps: sp => sp.steps, imagebullets: sp => sp.bullets,
  wordlist: sp => L.texts[sp.text].words.slice(0, 10), speaking: sp => sp.frames };

{ let at = 0; pack(L.shape, needShape, BOT - TOP).forEach((sl, i, a) => { const from = at; at += sl.length;
  push("Shape of the day", n => R.shape({ slice: sl, from, cont: i > 0 }, n), i < a.length - 1 ? null : undefined); }); }

function expand(sp) {
  if (sp.type === "routines") return (CO.routines || []).forEach(expand);
  const lab = sp.label || ({ title: "Today\u2019s lesson", goals: "Today\u2019s goals", handout: "Hand out the worksheet", vocab: "Key vocabulary", match: "Match the word" }[sp.type]);
  if (sp.type === "handout") { push(lab, n => R.handout(sp, n)); pageList().forEach((pg, i) => push(`${pg.lvl ? pg.lvl + " w" : "W"}orksheet page ${pg.n}`, n => R.page(sp, n, i, pg))); return; }
  if (sp.type === "pages") { pageList().forEach((pg, i) => push(`${pg.lvl ? pg.lvl + " w" : "W"}orksheet page ${pg.n}`, n => R.page(sp, n, i, pg))); return; }

  if (sp.type === "drill" && sp.side && sp.lvls.length === 2) {
    const lab = `Warm-up Part ${sp.part}`, lay = drillSideLayout(sp), of = sp.lvls.reduce((a, l) => a + l.items.length, 0);
    const total = Math.max(...sp.lvls.map(l => l.items.length)), order = [];
    for (let q = 0; q < total; q++) sp.lvls.forEach((lv0, li) => { if (q < lv0.items.length) order.push([li, q]); });
    // 1. both lists with their banks, the first question highlighted; 2. one answer per slide, alternating levels, next one highlighted
    push(lab, n => DRILLSIZES.push(`Part ${sp.part} side by side: ` + drillSide(pres.addSlide(), sp, lay, [0, 0], order[0], `Warm-up \u00B7 Part ${sp.part} \u00B7 ${sp.kind}`, n)), null);
    const done = [0, 0];
    order.forEach(([li, q], idx) => { done[li] = q + 1; const snap = done.slice(), kk = idx + 1, nx = order[idx + 1] || null;
      push(`Part ${sp.part} answers`, n => drillSide(pres.addSlide(), sp, lay, snap, nx, `Warm-up answers \u00B7 Part ${sp.part} \u00B7 ${kk} of ${of}`, n), kk < of ? null : undefined); });
    return; }
  if (sp.type === "drill") {
    const qtext = it => it[0].replace(/_{3,}/, DC.blank), lab = `Warm-up Part ${sp.part}`;
    const others = li => sp.lvls.filter((_, j) => j !== li).flatMap(l => l.items.map(qtext));
    const lays = sp.lvls.map((lv0, li) => drillLayout(lv0, sp.lvls.length > 1 ? others(li) : lv0.items.map(qtext)));
    // 1. each level's full list with its bank, no answers
    sp.lvls.forEach((lv0, li) => push(lab, n => DRILLSIZES.push(`Part ${sp.part} ${lv0.lvl}: ` + drillAll(pres.addSlide(), sp, lv0, lays[li], 0, -1, null, true, `Warm-up \u00B7 Part ${sp.part} \u00B7 ${sp.kind}`, n)), null));
    const total = Math.max(...sp.lvls.map(l => l.items.length)), of = sp.lvls.reduce((a, l) => a + l.items.length, 0);
    const order = []; for (let q = 0; q < total; q++) sp.lvls.forEach((lv0, li) => { if (q < lv0.items.length) order.push([li, q]); });
    // 2. the first question highlighted, before any answer shows
    { const [li0, q0] = order[0];
      push(`Part ${sp.part} answers`, n => drillAll(pres.addSlide(), sp, sp.lvls[li0], lays[li0], 0, q0, null, false, `Warm-up answers \u00B7 Part ${sp.part} \u00B7 first question`, n), null); }
    // 3. one answer per slide, alternating levels; the next question highlighted in place if on this list, otherwise in the strip
    const done = sp.lvls.map(() => 0);
    order.forEach(([li, q], idx) => { done[li] = q + 1; const upto = done[li], kk = idx + 1, nx = order[idx + 1];
      let hi = -1, st = null;
      if (nx) { const [nl, nq] = nx; if (nl === li) hi = nq; else st = { label: `Next question \u00B7 ${sp.lvls[nl].lvl} \u00B7 #${nq + 1}`, q: qtext(sp.lvls[nl].items[nq]) }; }
      push(`Part ${sp.part} answers`, n => drillAll(pres.addSlide(), sp, sp.lvls[li], lays[li], upto, hi, st, false, `Warm-up answers \u00B7 Part ${sp.part} \u00B7 ${kk} of ${of}`, n), kk < of ? null : undefined); });
    return; }
  if (sp.type === "prose") { const tx = L.texts[sp.text], ch = splitWords(tx.body, 8.7, BOT - TOP - 0.34);
    return ch.forEach((c, i) => push(sp.label || tx.title, n => R.prose(sp, n, c, i + 1, ch.length), i < ch.length - 1 ? null : undefined)); }
  if (sp.type === "text2") { const room = BOT - TOP - 0.5, a = splitWords(L.texts[sp.a].body, 4.2, room), b = splitWords(L.texts[sp.b].body, 4.2, room), m = Math.max(a.length, b.length);
    for (let i = 0; i < m; i++) push("Side by side", n => R.text2(sp, n, a[i], b[i], i + 1, m), i < m - 1 ? null : undefined); return; }
  if (sp.type === "nextshape") { let at = 0; return pack(sp.items, needShape, BOT - TOP).forEach((sl, i, a) => { const from = at; at += sl.length;
      push(sp.label || "Next class", n => R.shape({ slice: sl, from, cont: i > 0, tag: "Next class", head: sp.head }, n), i < a.length - 1 ? null : undefined); }); }
  if (sp.type === "walk") { const p = part(sp.part), NEW = !!CO.levels, blank = NEW && p.kind === "cloze" ? "  ________" : "";
    const its = !NEW ? wsItems(p) : p.kind === "check" ? p.checks.map((c, k) => ({ q: c, n: "\u2713" }))
      : [...(p.example && sp.withExample ? [{ q: `(example)  ${p.example.text}${p.kind === "cloze" ? "  " + p.example.ans : (/\u2192\s*$/.test(p.example.text) ? "  " : "  \u2192  ") + p.example.ans}`, n: "Ex" }] : []),
         ...wsItems(p).map((it, k) => ({ ...it, q: it.q + blank, n: k + 1 }))];
    { const ni = p.instr ? needText(p.instr, 8.7, MIN) + 0.1 : 0, nh = needText(p.how, 8.7, MIN) + 0.6;
      if (p.instr && ni + nh + 0.18 > BOT - TOP) {
        push(`Part ${p.id} \u2014 ${p.title}`, n => R.howto({ ...sp, only: "instr" }, n), null);
        push(`Part ${p.id} \u2014 ${p.title}`, n => R.howto({ ...sp, only: "how" }, n), its.length ? null : undefined);
      } else push(`Part ${p.id} \u2014 ${p.title}`, n => R.howto(sp, n), its.length ? null : undefined); }
    let at = 0;
    // a Part with a word bank keeps all its items on ONE slide so students can eliminate (Sep 22 2026): shrink toward MATCHMIN if needed
    const S1 = oneSize(`walkthrough Part ${p.id}${lv(p)}`, () => pack(its, it => needText(it.q, 8.15) + 0.1 * MIN / BASE, BOT - TOP, 0.1).length <= 1) || BASE;
    return [its].forEach((sl, i, a) => { const from = at; at += sl.length;
      push(`Part ${p.id} \u2014 ${p.title}`, n => withSize(S1, () => R.walk({ ...sp, slice: sl, from, cont: false }, n)), undefined); }); }
  if (sp.type === "reveals") { const p = part(sp.part), its = wsItems(p).filter(x => x.a !== "");
    if (sp.good) { const lab2 = `Part ${p.id}${lv(p)} \u2014 one good answer`;
      const one = oneSizeQuiet(() => pack(its, needReveal, BOT - TOP, 0.06).length === 1);
      const rowsNeed = () => { const r = []; for (let i = 0; i < its.length; i += 2) r.push(Math.max(...its.slice(i, i + 2).map(needGood))); return r; };
      const two = oneSizeQuiet(() => { const r = rowsNeed(); return r.reduce((a, b) => a + b, 0) + 0.1 * MIN / BASE * (r.length - 1) <= BOT - TOP; });
      if (one && !(two && Math.abs(two) > Math.abs(one) && Math.abs(one) < MATCHMIN)) return push(lab2, n => withSize(one, () => R.reveal({ ...sp, slice: its, from: 0 }, n, its.length - 1)));
      const Sg = oneSize(`good answers Part ${p.id}${lv(p)} (two columns)`, () => { const r = rowsNeed(); return r.reduce((a, b) => a + b, 0) + 0.1 * MIN / BASE * (r.length - 1) <= BOT - TOP; }) || BASE;
      return push(lab2, n => withSize(Sg, () => R.goodgrid({ ...sp, slice: its }, n))); }
    if (!its.length) { WARN.push(`Part ${sp.part}: reveals requested but it has no answers`); return; }
    let at = 0; const nr = CO.levels && p.kind === "cloze" ? (it => needText(it.q + "  " + it.a, 8.0)) : needReveal;
    const Sr1 = oneSizeQuiet(() => pack(its, nr, BOT - TOP, 0.06).length === 1);
    const rowsNeed = () => { const r = []; for (let i = 0; i < its.length; i += 2) r.push(Math.max(...its.slice(i, i + 2).map(needGood))); return r; };
    const Sg1 = oneSizeQuiet(() => { const r = rowsNeed(); return r.reduce((a, b) => a + b, 0) + 0.1 * MIN / BASE * (r.length - 1) <= BOT - TOP; });
    if (!Sr1 || (Math.abs(Sr1) < MATCHMIN && Sg1 && Math.abs(Sg1) > Math.abs(Sr1))) { // two columns only when they give bigger text
      const Sg = oneSize(`answers Part ${p.id}${lv(p)} (two columns)`, () => { const r = rowsNeed(); return r.reduce((a, b) => a + b, 0) + 0.1 * MIN / BASE * (r.length - 1) <= BOT - TOP; }) || BASE;
      push(`Part ${sp.part} answers`, n => withSize(Sg, () => R.goodgrid({ ...sp, slice: its }, n, -1, 0)), null);
      its.forEach((_, i) => push(`Part ${sp.part} answers`, n => withSize(Sg, () => R.goodgrid({ ...sp, slice: its }, n, i, i + 1 < its.length ? i + 1 : -1)), i < its.length - 1 ? null : undefined));
      return; }
    const Sr = oneSize(`answers Part ${p.id}${lv(p)}`, () => pack(its, nr, BOT - TOP, 0.06).length === 1) || BASE;
    const gs = [its];
    return gs.forEach((sl, gi) => { const from = at, last = gi === gs.length - 1; at += sl.length;
      push(`Part ${sp.part} answers`, n => withSize(Sr, () => R.reveal({ ...sp, slice: sl, from, hi: 0 }, n, -1)), null);
      sl.forEach((_, i) => push(`Part ${sp.part} answers`, n => withSize(Sr, () => R.reveal({ ...sp, slice: sl, from, hi: i + 1 < sl.length ? i + 1 : -1 }, n, i)),
        i < sl.length - 1 || !last ? null : undefined)); }); }
  if (sp.type === "match") { const bank = sp.bank || sp.words.map(w => w[0]), m = { ...sp, bank };
    // question slide (first definition highlighted), then one reveal per word; only the last carries the Next cue
    push("Match the word", n => R.match(m, n), null);
    sp.words.forEach((_, i) => push("Match the word", n => R.matchreveal(m, n, i), i < sp.words.length - 1 ? null : undefined)); return; }
  if (sp.type === "text") { const tx = L.texts[sp.text], BUD = sp.budget || 380, pg = []; let cur = [], len = 0;
    tx.lines.forEach((l, i) => { if (len + l.length > BUD && cur.length) { pg.push(cur); cur = []; len = 0; } cur.push(i); len += l.length + 40; }); pg.push(cur);
    return pg.forEach((x, i) => push(lab || "The text", n => R.textpage(sp, n, i, pg), i < pg.length - 1 ? (sp.continues || `${tx.title} continues`) : undefined)); }
  if (!R[sp.type]) throw new Error("Unknown slide type: " + sp.type);
  const list = LISTOF[sp.type] && LISTOF[sp.type](sp);
  if (!list) return push(lab, n => R[sp.type](sp, n));
  const grp = () => sp.type === "vocab" ? packGrid(list, 2, v => textH(v[1], 4.1, MIN) + 0.8 * MIN / BASE, BOT - TOP, 0.12)
    : NEEDOF[sp.type] ? pack(list, NEEDOF[sp.type](sp), BAND[sp.type] ? BAND[sp.type](sp) : BOT - TOP, CO.levels && sp.type === "rows" ? 0.08 : CO.levels && sp.type === "speaking" ? 0 : 0.12, sp.pair || 1)
    : balanced(list, PER[sp.type] || list.length);
  if (sp.type === "vocab" && grp().length > 1 && !oneSizeQuiet(() => grp().length === 1)) { // grid will not fit: term/definition rows instead
    const Sv = oneSize(`vocab list "${lab || "Key vocabulary"}"`, () => list.reduce((a, v) => a + needVocabRow(v), 0) + 0.05 * MIN / BASE * (list.length - 1) <= BOT - TOP) || BASE;
    return push(lab, n => withSize(Sv, () => R.vocablist({ ...sp, slice: list }, n))); }
  if (sp.type === "cards" && grp().length > 1) { const q = oneSizeQuiet(() => grp().length === 1);
    if (!q || Math.abs(q) < MATCHMIN) { const Sc = oneSize(`cards "${lab}" (2 x 2 grid)`, () => cardGridFits(sp)) || BASE;
      return push(lab, n => withSize(Sc, () => R.cardgrid(sp, n))); } }
  const Sl = grp().length > 1 ? (oneSize(`${sp.type} "${lab || sp.type}"`, () => grp().length === 1) || BASE) : BASE;
  const groups = withSize(Sl, grp);
  let at = 0;
  return groups.forEach((sl, i, a) => { const from = at; at += sl.length;
    push(lab, n => withSize(Sl, () => R[sp.type]({ ...sp, slice: sl, from, cont: i > 0 }, n)), i < a.length - 1 ? null : undefined); });
}
L.sequence.forEach(expand);
slides.forEach((sl, i) => { let n = sl.next;
  if (n === undefined) { const j = slides.findIndex((x, k) => k > i && x.label !== sl.label); n = j < 0 ? null : slides[j].label; }
  sl.draw(n); });
const name = TH.fileName(CO, M, "Deck", VER);
if (SMALL.length) { console.error(`READABILITY FAIL \u2014 ${SMALL.length} student-facing string(s) under ${MIN} pt:\n  ` + SMALL.slice(0, 12).join("\n  ")); process.exit(1); }
if (WARN.length) { console.error("FIT WARNINGS (text may overflow; shorten in the lesson file):\n  " + WARN.join("\n  ")); if (!process.env.ALLOW_WARN) process.exit(1); }
pres.writeFile({ fileName: path.join(ODIR, name + ".pptx") }).then(() => console.log("deck ok:", name, slides.length, "slides" + (MATCHSIZES.length ? "; match slide at " + MATCHSIZES.join(", ") + " pt" : "") + (DRILLSIZES.length ? "; drills: " + DRILLSIZES.join(" / ") + " pt" : "") + (ONESIZES.length ? "\n  shrunk to one slide: " + ONESIZES.join(" pt, ") + " pt" : "")));
