const fs = require("fs"), path = require("path");
const pptxgen = require("pptxgenjs");
const { COURSE, CLASS_TEXT, LESSONS } = require("./content.js");

const NAVY = "0B2C4D", BLUE = "1565C0", PALE = "E3F0FB", PALE2 = "F3F8FD", MID = "BBDEFB", INK = "1F2933", GREY = "6B7280", WHITE = "FFFFFF", DIM = "1E4A73", DIMTXT = "7EA5C9", PALEBLUE = "9EC5F0";
const ACCENTS = { teal: "00897B", mint: "43A047", amber: "F9A825", coral: "E8604C", violet: "6A4FB3" };
const TINTS = { teal: "E0F2F1", mint: "E8F5E9", amber: "FFF8E1", coral: "FBE9E7", violet: "EDE7F6" };
const FONT = "Calibri", HFONT = "Calibri";
const VERSION = process.argv[3] || "v1";
const outDir = process.argv[2]; if (!outDir) throw new Error("outDir required");
fs.mkdirSync(outDir, { recursive: true });
const previews = JSON.parse(fs.readFileSync(path.join(__dirname, "out/previews/previews.json")));
const overflows = [];

// ---- fit guard ----
function fitPt(lines, w, h, maxPt, minPt, ls = 1.25) {
  for (let pt = maxPt; pt >= minPt; pt -= 1) {
    const cpl = Math.max(1, Math.floor((w - 0.2) * 72 / (pt * 0.5)));
    const n = lines.reduce((a, l) => a + Math.max(1, Math.ceil(l.length / cpl)), 0);
    if (n * pt * ls / 72 + 0.04 <= h) return pt;
  }
  return null;
}
function fitted(lines, w, h, maxPt, minPt, tag) {
  const pt = fitPt(lines, w, h, maxPt, minPt);
  if (pt === null) { overflows.push(tag + ": " + lines.join(" | ").slice(0, 60)); return minPt; }
  return pt;
}

// ---- chrome ----
function banner(slide, L, accent) {
  slide.addShape("rect", { x: 0, y: 0, w: 10, h: 0.66, fill: { color: NAVY }, line: { color: NAVY } });
  slide.addShape("rect", { x: 0, y: 0, w: 0.14, h: 0.66, fill: { color: accent }, line: { color: accent } });
  slide.addText("OBJECTIVE", { x: 0.28, y: 0.03, w: 3, h: 0.16, fontFace: FONT, fontSize: 7.5, bold: true, color: PALEBLUE, charSpacing: 2, margin: 0, isTextBox: true });
  const opt = fitted([L.banner.obj], 7.3, 0.24, 11.5, 8.5, `L${L.n} banner obj`);
  slide.addText(L.banner.obj, { x: 0.28, y: 0.17, w: 7.4, h: 0.24, fontFace: FONT, fontSize: opt, bold: true, color: WHITE, margin: 0, isTextBox: true, valign: "middle" });
  const spt = fitted([L.banner.std], 7.3, 0.22, 9, 7, `L${L.n} banner std`);
  slide.addText(L.banner.std, { x: 0.28, y: 0.41, w: 7.4, h: 0.22, fontFace: FONT, fontSize: spt, color: PALEBLUE, margin: 0, isTextBox: true, valign: "middle" });
  ["COM", "TH", "PS"].forEach((c, i) => {
    const lit = L.banner.comp.includes(c);
    slide.addShape("roundRect", { x: 7.95 + i * 0.68, y: 0.19, w: 0.58, h: 0.28, rectRadius: 0.08, fill: { color: lit ? accent : DIM }, line: { color: lit ? accent : DIM } });
    slide.addText(c, { x: 7.95 + i * 0.68, y: 0.19, w: 0.58, h: 0.28, fontFace: FONT, fontSize: 9, bold: true, color: lit ? WHITE : DIMTXT, align: "center", valign: "middle", margin: 0, isTextBox: true });
  });
}
function footer(slide, L, idx) {
  slide.addText(`${COURSE.code}  \u2022  Unit ${COURSE.unit}: ${COURSE.unitTitle}  \u2022  Lesson ${L.n}: ${L.title}`, { x: 0.4, y: 5.2, w: 8, h: 0.3, fontFace: FONT, fontSize: 9, color: GREY, margin: 0, isTextBox: true, valign: "middle" });
  slide.addText(String(idx), { x: 8.6, y: 5.2, w: 1, h: 0.3, fontFace: FONT, fontSize: 9, color: GREY, align: "right", margin: 0, isTextBox: true, valign: "middle" });
}
function heading(slide, text, accent) {
  const pt = fitted([text], 9.2, 0.45, 24, 18, "heading " + text);
  slide.addText(text, { x: 0.4, y: 0.72, w: 9.2, h: 0.45, fontFace: HFONT, fontSize: pt, bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
}
function card(slide, x, y, w, h, fill, line) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: line || fill, width: 0.75 } });
}
function numCircle(slide, x, y, n, accent, d = 0.42) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color: accent }, line: { color: accent } });
  slide.addText(String(n), { x, y, w: d, h: d, fontFace: FONT, fontSize: d > 0.4 ? 14 : 11, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0, isTextBox: true });
}
function text(slide, str, x, y, w, h, o = {}) {
  const lines = Array.isArray(str) ? str : [str];
  const pt = o.fixed || fitted(lines.map(l => typeof l === "string" ? l : l.text), w, h, o.max || 16, o.min || 10, o.tag || str);
  slide.addText(lines.map((l, i) => typeof l === "string" ? { text: l, options: { breakLine: i < lines.length - 1, bullet: o.bullet ? true : undefined, paraSpaceAfter: o.gap ?? 4 } } : Object.assign({ options: { breakLine: i < lines.length - 1, paraSpaceAfter: o.gap ?? 4 } }, l)),
    { x, y, w, h, fontFace: FONT, fontSize: pt, color: o.color || INK, bold: o.bold, italic: o.italic, align: o.align || "left", valign: o.valign || "top", margin: o.margin ?? 4, isTextBox: true });
}
// Standing order (Sep 9 2026): every text a lesson references appears in full in the deck, in every level's version.
function paginate(paras, limit = 150) {
  const pages = []; let cur = [], n = 0;
  for (const p of paras) { const w = p.split(/\s+/).length; if (n + w > limit && cur.length) { pages.push(cur); cur = []; n = 0; }
    if (w > limit) { const sents = p.match(/[^.!?]+[.!?]+["\u201d]?\s*|[^.!?]+$/g) || [p]; let chunk = "", cw = 0; for (const s of sents) { const sw = s.split(/\s+/).length; if (cw + sw > limit && chunk) { cur.push(chunk.trim()); pages.push(cur); cur = []; n = 0; chunk = ""; cw = 0; } chunk += s; cw += sw; } if (chunk) { cur.push(chunk.trim()); n += cw; } continue; }
    cur.push(p); n += w; }
  if (cur.length) pages.push(cur);
  return pages;
}
function textSlides(pres, L, accent, tint, idx) {
  if (!L.texts) return idx;
  for (const key of L.texts) {
    const ct = CLASS_TEXT[key]; const pages = paginate(ct.paras);
    pages.forEach((paras, pi) => {
      const s = pres.addSlide(); banner(s, L, accent); heading(s, (pi === 0 ? ct.title : ct.title + " (continued)") + `  \u2014  ${key}`, accent); footer(s, L, idx++);
      s.addShape("roundRect", { x: 0.4, y: 1.25, w: 0.12, h: 3.8, rectRadius: 0.05, fill: { color: key === "1A" ? BLUE : accent }, line: { color: key === "1A" ? BLUE : accent } });
      card(s, 0.65, 1.25, 8.95, 3.8, key === "1A" ? PALE : tint);
      const pt = fitted(paras, 8.5, 3.5, key === "1A" ? 22 : 17, 12, "class text " + key);
      s.addText(paras.map((p, i) => ({ text: p, options: { breakLine: i < paras.length - 1, paraSpaceAfter: 8 } })), { x: 0.85, y: 1.4, w: 8.55, h: 3.5, fontFace: FONT, fontSize: pt, color: INK, margin: 0, isTextBox: true, valign: "top", lineSpacingMultiple: 1.2 });
      s.addText(`Class text \u2022 ${key} version \u2022 ${pi + 1} / ${pages.length}`, { x: 0.65, y: 5.05, w: 8.9, h: 0.2, fontFace: FONT, fontSize: 9, italic: true, color: GREY, margin: 0, isTextBox: true });
    });
  }
  // split-screen slide(s): 1A left, 2A right (standing order Sep 9 2026)
  if (L.texts.includes("1A") && L.texts.includes("2A")) {
    const a = CLASS_TEXT["1A"], b = CLASS_TEXT["2A"];
    const pa = paginate(a.paras, 190), pb = paginate(b.paras, 190);
    const n = Math.max(pa.length, pb.length);
    for (let pi = 0; pi < n; pi++) {
      const s = pres.addSlide(); banner(s, L, accent); heading(s, `Both texts side by side${n > 1 ? `  (${pi + 1} of ${n})` : ""}`, accent); footer(s, L, idx++);
      [["1A", a, pa, PALE, BLUE, 0.4], ["2A", b, pb, tint, accent, 5.1]].forEach(([lv, ct, pages, fill, chip, x]) => {
        card(s, x, 1.25, 4.5, 3.8, fill);
        s.addShape("roundRect", { x: x + 0.15, y: 1.35, w: 0.6, h: 0.3, rectRadius: 0.08, fill: { color: chip }, line: { color: chip } });
        s.addText(lv, { x: x + 0.15, y: 1.35, w: 0.6, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0, isTextBox: true });
        s.addText(ct.title, { x: x + 0.85, y: 1.35, w: 3.5, h: 0.3, fontFace: HFONT, fontSize: 13, bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
        const paras = pages[Math.min(pi, pages.length - 1)];
        const pt = fitted(paras, 4.1, 3.2, lv === "1A" ? 18 : 14, 9, "split " + lv);
        s.addText(paras.map((p, i) => ({ text: p, options: { breakLine: i < paras.length - 1, paraSpaceAfter: 6 } })), { x: x + 0.2, y: 1.75, w: 4.15, h: 3.2, fontFace: FONT, fontSize: pt, color: INK, margin: 0, isTextBox: true, valign: "top", lineSpacingMultiple: 1.15 });
        if (pages.length > 1) s.addText(`${Math.min(pi, pages.length - 1) + 1} / ${pages.length}`, { x: x + 3.6, y: 4.8, w: 0.8, h: 0.2, fontFace: FONT, fontSize: 8, color: GREY, align: "right", margin: 0, isTextBox: true });
      });
    }
  }
  return idx;
}
function newDeck() { const p = new pptxgen(); p.layout = "LAYOUT_16x9"; p.author = COURSE.teacher; return p; }

function planSlide(pres, L, accent) {
  const s = pres.addSlide(); s.background = { color: PALE2 };
  s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.42, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("LESSON PLAN  \u2022  TEACHER SLIDE  \u2022  SKIP WHEN PRESENTING", { x: 0.3, y: 0, w: 9.4, h: 0.42, fontFace: FONT, fontSize: 10, bold: true, color: PALEBLUE, charSpacing: 3, margin: 0, isTextBox: true, valign: "middle" });
  const total = L.plan.steps.reduce((a, st) => a + Number(st[0]), 0);
  s.addText(`${COURSE.code} \u2014 Unit ${COURSE.unit}: ${COURSE.unitTitle} \u2014 Lesson ${L.n}: ${L.title} \u2014 ${total} minutes`, { x: 0.4, y: 0.5, w: 9.2, h: 0.4, fontFace: FONT, fontSize: fitted([L.title], 9.2, 0.4, 16, 12, "plan title"), bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
  s.addText([{ text: "Objective  ", options: { bold: true, color: BLUE } }, { text: L.plan.objective }], { x: 0.4, y: 0.92, w: 9.2, h: 0.5, fontFace: FONT, fontSize: 11, color: INK, margin: 0, isTextBox: true, valign: "top" });
  const step = Math.min(0.42, 3.55 / L.plan.steps.length);
  L.plan.steps.forEach(([m, dsc], i) => {
    const y = 1.45 + i * step; const ac = [TEAL, MINT, AMBER, CORAL, VIOLET][i % 5];
    s.addShape("roundRect", { x: 0.4, y: y + 0.04, w: 0.7, h: step - 0.1, rectRadius: 0.08, fill: { color: ac }, line: { color: ac } });
    s.addText(m + " min", { x: 0.4, y: y + 0.04, w: 0.7, h: step - 0.1, fontFace: FONT, fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText(dsc, { x: 1.2, y, w: 5.4, h: step, fontFace: FONT, fontSize: fitted([dsc], 5.4, step - 0.02, 11, 8, "plan step " + i), color: INK, margin: 0, isTextBox: true, valign: "middle" });
  });
  card(s, 6.8, 1.45, 2.8, 3.55, WHITE, MID);
  s.addText("MATERIALS", { x: 6.95, y: 1.5, w: 2.5, h: 0.25, fontFace: FONT, fontSize: 9, bold: true, color: BLUE, charSpacing: 2, margin: 0, isTextBox: true });
  text(s, L.plan.materials, 6.95, 1.75, 2.5, 1.35, { max: 10, min: 8, gap: 3, bullet: true, tag: "plan materials" });
  s.addText("WATCH FOR", { x: 6.95, y: 3.12, w: 2.5, h: 0.25, fontFace: FONT, fontSize: 9, bold: true, color: CORAL, charSpacing: 2, margin: 0, isTextBox: true });
  text(s, L.plan.watch, 6.95, 3.37, 2.5, 1.58, { max: 10, min: 8, tag: "plan watch" });
  s.addText("Next: Shape of the Day (students see it), then the title slide.", { x: 0.4, y: 5.2, w: 9.2, h: 0.3, fontFace: FONT, fontSize: 9, italic: true, color: GREY, margin: 0, isTextBox: true, valign: "middle" });
}
const TEAL = "00897B", MINT = "43A047", AMBER = "F9A825", CORAL = "E8604C", VIOLET = "6A4FB3";
function shapeSlide(pres, L, accent, tint) {
  const s = pres.addSlide();
  s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.42, fill: { color: NAVY }, line: { color: NAVY } });
  s.addShape("rect", { x: 0, y: 0, w: 0.14, h: 0.42, fill: { color: accent }, line: { color: accent } });
  s.addText("SHAPE OF THE DAY", { x: 0.3, y: 0, w: 9, h: 0.42, fontFace: FONT, fontSize: 10, bold: true, color: PALEBLUE, charSpacing: 3, margin: 0, isTextBox: true, valign: "middle" });
  s.addText("Today", { x: 0.4, y: 0.55, w: 9.2, h: 0.6, fontFace: HFONT, fontSize: 28, bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
  const n = L.shape.length, perCol = Math.ceil(n / 2), rowH = Math.min(0.92, 3.7 / perCol);
  L.shape.forEach((it, i) => {
    const col = i < perCol ? 0 : 1, row = i % perCol;
    const x = 0.4 + col * 4.7, y = 1.3 + row * rowH;
    card(s, x, y, 4.5, rowH - 0.12, i % 2 ? tint : PALE);
    numCircle(s, x + 0.15, y + (rowH - 0.12) / 2 - 0.2, i + 1, accent, 0.4);
    s.addText(it, { x: x + 0.7, y, w: 3.7, h: rowH - 0.12, fontFace: FONT, fontSize: fitted([it], 3.7, rowH - 0.14, 16, 11, "shape " + i), color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
  });
  s.addText(`${COURSE.code}  \u2022  Unit ${COURSE.unit}: ${COURSE.unitTitle}  \u2022  Lesson ${L.n}  \u2022  ${COURSE.teacher}, Room ${COURSE.room}`, { x: 0.4, y: 5.05, w: 9.2, h: 0.3, fontFace: FONT, fontSize: 10, color: GREY, margin: 0, isTextBox: true, valign: "middle" });
}

// ---- opening slides (standing order: plan -> shape of the day -> title) ----
function planSlide(pres, L, accent) {
  const s = pres.addSlide(); s.background = { color: PALE2 };
  s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.42, fill: { color: NAVY }, line: { color: NAVY } });
  s.addText("LESSON PLAN  \u2022  TEACHER SLIDE  \u2022  SKIP WHEN PRESENTING", { x: 0.3, y: 0, w: 9.4, h: 0.42, fontFace: FONT, fontSize: 10, bold: true, color: PALEBLUE, charSpacing: 3, margin: 0, isTextBox: true, valign: "middle" });
  s.addText(`${COURSE.code} \u2014 Unit ${COURSE.unit}: ${COURSE.unitTitle} \u2014 Lesson ${L.n}: ${L.title} \u2014 80 minutes`, { x: 0.4, y: 0.5, w: 9.2, h: 0.4, fontFace: FONT, fontSize: fitted([`Lesson ${L.n}: ${L.title} 80 minutes ${COURSE.unitTitle}`], 9.2, 0.4, 16, 11, "plan head"), bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
  s.addText([{ text: "Objective  ", options: { bold: true, color: BLUE } }, { text: L.plan.objective }], { x: 0.4, y: 0.92, w: 9.2, h: 0.5, fontFace: FONT, fontSize: 11, color: INK, margin: 0, isTextBox: true, valign: "top" });
  const n = L.plan.steps.length, step = Math.min(0.5, 3.55 / n);
  L.plan.steps.forEach(([m, d], i) => {
    const y = 1.45 + i * step;
    s.addShape("roundRect", { x: 0.4, y: y + 0.04, w: 0.7, h: step - 0.1, rectRadius: 0.08, fill: { color: [accent, BLUE, "43A047", "F9A825", "E8604C", "6A4FB3", "00897B"][i % 7] }, line: { color: NAVY, width: 0 } });
    s.addText(m + " min", { x: 0.4, y: y + 0.04, w: 0.7, h: step - 0.1, fontFace: FONT, fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s.addText(d, { x: 1.2, y, w: 5.4, h: step - 0.02, fontFace: FONT, fontSize: fitted([d], 5.4, step - 0.04, 11, 7.5, "plan step " + i), color: INK, margin: 0, isTextBox: true, valign: "middle" });
  });
  card(s, 6.8, 1.45, 2.8, 3.55, WHITE, MID);
  s.addText("MATERIALS", { x: 6.95, y: 1.5, w: 2.5, h: 0.25, fontFace: FONT, fontSize: 9, bold: true, color: BLUE, charSpacing: 2, margin: 0, isTextBox: true });
  text(s, L.plan.materials, 6.95, 1.75, 2.5, 1.35, { max: 10, min: 7.5, gap: 3, bullet: true, tag: "plan materials" });
  s.addText("WATCH FOR", { x: 6.95, y: 3.15, w: 2.5, h: 0.25, fontFace: FONT, fontSize: 9, bold: true, color: "E8604C", charSpacing: 2, margin: 0, isTextBox: true });
  text(s, L.plan.watch, 6.95, 3.4, 2.5, 1.55, { max: 10, min: 7.5, tag: "plan watch" });
  s.addText("Next: Shape of the Day (students see it), then the title slide.", { x: 0.4, y: 5.2, w: 9.2, h: 0.3, fontFace: FONT, fontSize: 9, italic: true, color: GREY, margin: 0, isTextBox: true, valign: "middle" });
}
function shapeSlide(pres, L, accent, tint) {
  const s = pres.addSlide();
  s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.42, fill: { color: NAVY }, line: { color: NAVY } });
  s.addShape("rect", { x: 0, y: 0, w: 0.14, h: 0.42, fill: { color: accent }, line: { color: accent } });
  s.addText("SHAPE OF THE DAY", { x: 0.3, y: 0, w: 9, h: 0.42, fontFace: FONT, fontSize: 10, bold: true, color: PALEBLUE, charSpacing: 3, margin: 0, isTextBox: true, valign: "middle" });
  s.addText("Today", { x: 0.4, y: 0.55, w: 9.2, h: 0.6, fontFace: HFONT, fontSize: 28, bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
  const items = L.shape, rows = Math.ceil(items.length / 2), rh = Math.min(0.92, 3.7 / rows);
  items.forEach((it, i) => {
    const col = i < rows ? 0 : 1, row = i % rows;
    const x = 0.4 + col * 4.7, y = 1.3 + row * rh;
    card(s, x, y, 4.5, rh - 0.12, i % 2 ? tint : PALE);
    numCircle(s, x + 0.15, y + (rh - 0.12) / 2 - 0.2, i + 1, accent, 0.4);
    s.addText(it, { x: x + 0.7, y, w: 3.7, h: rh - 0.12, fontFace: FONT, fontSize: fitted([it], 3.7, rh - 0.14, 16, 10, "shape " + i), color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
  });
  s.addText(`${COURSE.code}  \u2022  Unit ${COURSE.unit}: ${COURSE.unitTitle}  \u2022  Lesson ${L.n}  \u2022  Mr. Reid, Room ${COURSE.room}`, { x: 0.4, y: 5.05, w: 9.2, h: 0.3, fontFace: FONT, fontSize: 10, color: GREY, margin: 0, isTextBox: true, valign: "middle" });
}

// ---- content slides ----
function titleSlide(pres, L, accent) {
  const s = pres.addSlide(); s.background = { color: NAVY };
  s.addShape("ellipse", { x: 6.6, y: -1.4, w: 5.2, h: 5.2, fill: { color: accent }, line: { color: accent } });
  s.addShape("ellipse", { x: 7.9, y: 3.2, w: 3.4, h: 3.4, fill: { color: BLUE }, line: { color: BLUE } });
  s.addText(`UNIT ${COURSE.unit}  \u2022  ${COURSE.unitTitle.toUpperCase()}`, { x: 0.6, y: 1.05, w: 6, h: 0.35, fontFace: FONT, fontSize: 12, bold: true, color: PALEBLUE, charSpacing: 3, margin: 0, isTextBox: true });
  s.addText(`Lesson ${L.n}`, { x: 0.6, y: 1.4, w: 6, h: 0.5, fontFace: FONT, fontSize: 20, color: WHITE, margin: 0, isTextBox: true });
  const pt = fitted([L.title], 6.2, 1.4, 40, 26, "title");
  s.addText(L.title, { x: 0.6, y: 1.9, w: 6.3, h: 1.5, fontFace: HFONT, fontSize: pt, bold: true, color: WHITE, margin: 0, isTextBox: true, valign: "top" });
  s.addText(`${COURSE.teacher}  \u2022  Room ${COURSE.room}  \u2022  ELL 1A and 2A`, { x: 0.6, y: 4.6, w: 6, h: 0.35, fontFace: FONT, fontSize: 12, color: PALEBLUE, margin: 0, isTextBox: true });
}
function warmupSlide(pres, L, accent, tint, idx) {
  const s = pres.addSlide(); banner(s, L, accent); heading(s, "Warm-up: " + L.warmup.title, accent); footer(s, L, idx);
  card(s, 0.4, 1.3, 5.9, 3.6, tint);
  text(s, L.warmup.lines, 0.6, 1.45, 5.5, 3.3, { max: 20, min: 14, gap: 10, tag: "warmup lines" });
  card(s, 6.6, 1.3, 3.0, 3.6, NAVY);
  s.addText("HOW", { x: 6.85, y: 1.45, w: 2.5, h: 0.3, fontFace: FONT, fontSize: 9, bold: true, color: PALEBLUE, charSpacing: 3, margin: 0, isTextBox: true });
  text(s, L.warmup.note, 6.85, 1.8, 2.55, 2.9, { max: 15, min: 11, color: WHITE, tag: "warmup note" });
}
function goalsSlide(pres, L, accent, tint, idx) {
  const s = pres.addSlide(); banner(s, L, accent); heading(s, "Today we will\u2026", accent); footer(s, L, idx);
  L.goals.forEach((g, i) => {
    const x = 0.4 + (i % 2) * 4.7, y = 1.3 + Math.floor(i / 2) * 1.85;
    card(s, x, y, 4.5, 1.65, i % 2 ? tint : PALE);
    numCircle(s, x + 0.18, y + 0.2, i + 1, accent);
    text(s, g, x + 0.75, y + 0.15, 3.6, 1.4, { max: 18, min: 12, tag: "goal " + i });
  });
}
function vocabSlide(pres, L, accent, tint, idx) {
  const s = pres.addSlide(); banner(s, L, accent); heading(s, "Vocabulary", accent); footer(s, L, idx);
  L.vocab.forEach((v, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x = 0.4 + col * 1.86, y = 1.3 + row * 1.85;
    card(s, x, y, 1.76, 1.7, row === 0 ? PALE : tint);
    s.addText(v[0], { x: x + 0.1, y: y + 0.12, w: 1.56, h: 0.5, fontFace: HFONT, fontSize: fitted([v[0]], 1.5, 0.5, 16, 12, "vocab word"), bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
    s.addText(v[1], { x: x + 0.1, y: y + 0.62, w: 1.56, h: 1.0, fontFace: FONT, fontSize: fitted([v[1]], 1.5, 1.0, 11, 9, "vocab def " + v[0]), color: INK, margin: 0, isTextBox: true, valign: "top" });
  });
  s.addText("1A: the first eight words   \u2022   2A: all ten", { x: 0.4, y: 4.95, w: 9.2, h: 0.25, fontFace: FONT, fontSize: 10, italic: true, color: GREY, margin: 0, isTextBox: true });
}
function teachSlide(pres, L, T, accent, tint, idx, variant) {
  const s = pres.addSlide(); banner(s, L, accent); heading(s, T.title, accent); footer(s, L, idx);
  if (variant === "rows") {
    T.items.forEach(([label, desc], i) => {
      const y = 1.3 + i * 0.95;
      card(s, 0.4, y, 9.2, 0.85, i % 2 ? PALE2 : tint);
      numCircle(s, 0.55, y + 0.21, i + 1, accent);
      s.addText(label, { x: 1.15, y: y + 0.08, w: 2.6, h: 0.7, fontFace: HFONT, fontSize: fitted([label], 2.5, 0.7, 16, 12, "teach label"), bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
      s.addText(desc, { x: 3.85, y: y + 0.08, w: 5.6, h: 0.7, fontFace: FONT, fontSize: fitted([desc], 5.5, 0.7, 15, 11, "teach desc"), color: INK, margin: 0, isTextBox: true, valign: "middle" });
    });
    if (T.note) { card(s, 0.4, 4.2, 9.2, 0.75, NAVY); text(s, T.note, 0.6, 4.25, 8.8, 0.65, { max: 14, min: 10, color: WHITE, valign: "middle", tag: "teach note" }); }
  } else {
    T.items.forEach(([label, desc], i) => {
      const x = 0.4 + i * 3.1;
      card(s, x, 1.3, 2.95, 2.75, i === 1 ? tint : PALE);
      s.addShape("rect", { x: x, y: 1.3, w: 2.95, h: 0.62, fill: { color: accent }, line: { color: accent } });
      s.addText(label, { x: x + 0.15, y: 1.3, w: 2.65, h: 0.62, fontFace: HFONT, fontSize: fitted([label], 2.5, 0.6, 17, 12, "teach col label"), bold: true, color: WHITE, margin: 0, isTextBox: true, valign: "middle" });
      text(s, desc, x + 0.15, 2.05, 2.65, 1.9, { max: 16, min: 11, tag: "teach col desc" });
    });
    if (T.note) { card(s, 0.4, 4.2, 9.2, 0.75, NAVY); text(s, T.note, 0.6, 4.25, 8.8, 0.65, { max: 14, min: 10, color: WHITE, valign: "middle", tag: "teach note" }); }
  }
}
function examplesSlide(pres, L, accent, tint, idx) {
  const s = pres.addSlide(); banner(s, L, accent); heading(s, "Examples", accent); footer(s, L, idx);
  [["1A", PALE, BLUE], ["2A", tint, accent]].forEach(([lv, fill, chip], i) => {
    const x = 0.4 + i * 4.7;
    card(s, x, 1.3, 4.5, 3.65, fill);
    s.addShape("roundRect", { x: x + 0.2, y: 1.45, w: 0.7, h: 0.34, rectRadius: 0.1, fill: { color: chip }, line: { color: chip } });
    s.addText(lv, { x: x + 0.2, y: 1.45, w: 0.7, h: 0.34, fontFace: FONT, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0, isTextBox: true });
    text(s, L.examples[lv], x + 0.2, 1.9, 4.1, 2.95, { max: 20, min: 12, gap: 10, tag: "examples " + lv });
  });
}
function practiceSlide(pres, L, accent, tint, idx) {
  const s = pres.addSlide(); banner(s, L, accent); heading(s, "Practice: " + L.practice.title, accent); footer(s, L, idx);
  const n = L.practice.items.length;
  const step = Math.min(0.6, 3.7 / n);       // stackStep: preferred 0.60in, tighten only when it must
  L.practice.items.forEach((it, i) => {
    const y = 1.3 + i * step;
    numCircle(s, 0.45, y + 0.06, i + 1, accent, 0.36);
    s.addText(it, { x: 0.95, y, w: 8.6, h: step - 0.04, fontFace: FONT, fontSize: fitted([it], 8.5, step - 0.06, 16, 11, "practice " + i), color: INK, margin: 0, isTextBox: true, valign: "middle" });
  });
}
function speakingSlide(pres, L, accent, tint, idx) {
  const s = pres.addSlide(); banner(s, L, accent); heading(s, "Pair speaking: " + L.speaking.title, accent); footer(s, L, idx);
  L.speaking.frames.forEach((f, i) => {
    const y = 1.3 + i * 0.85;
    s.addShape("roundRect", { x: 0.4 + (i % 2) * 0.6, y, w: 5.6, h: 0.7, rectRadius: 0.3, fill: { color: i % 2 ? tint : PALE }, line: { color: i % 2 ? accent : BLUE, width: 1 } });
    s.addText(f, { x: 0.7 + (i % 2) * 0.6, y, w: 5.1, h: 0.7, fontFace: FONT, fontSize: fitted([f], 5, 0.65, 18, 12, "frame"), color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
  });
  card(s, 6.9, 1.3, 2.7, 3.65, NAVY);
  s.addText("HOW", { x: 7.1, y: 1.45, w: 2.3, h: 0.3, fontFace: FONT, fontSize: 9, bold: true, color: PALEBLUE, charSpacing: 3, margin: 0, isTextBox: true });
  text(s, L.speaking.note, 7.1, 1.8, 2.35, 3.0, { max: 15, min: 11, color: WHITE, tag: "speaking note" });
}
function yourTurnSlide(pres, L, accent, tint, idx) {
  const s = pres.addSlide(); banner(s, L, accent); heading(s, "Your turn", accent); footer(s, L, idx);
  [["1A", PALE, BLUE], ["2A", tint, accent]].forEach(([lv, fill, chip], i) => {
    const x = 0.4 + i * 4.7;
    card(s, x, 1.3, 4.5, 3.0, fill);
    s.addShape("roundRect", { x: x + 0.2, y: 1.45, w: 0.7, h: 0.34, rectRadius: 0.1, fill: { color: chip }, line: { color: chip } });
    s.addText(lv, { x: x + 0.2, y: 1.45, w: 0.7, h: 0.34, fontFace: FONT, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0, isTextBox: true });
    text(s, L.yourturn[lv], x + 0.2, 1.9, 4.1, 2.3, { max: 20, min: 12, tag: "yourturn " + lv });
  });
  s.addText("Three versions of every worksheet: Support  \u2022  Core  \u2022  Stretch. Take the one with your name on it.", { x: 0.4, y: 4.45, w: 9.2, h: 0.5, fontFace: FONT, fontSize: 12, italic: true, color: GREY, margin: 0, isTextBox: true, valign: "middle" });
}
function exitSlide(pres, L, accent, tint, idx) {
  const s = pres.addSlide(); banner(s, L, accent); heading(s, "Exit ticket", accent); footer(s, L, idx);
  card(s, 0.4, 1.3, 9.2, 2.1, NAVY);
  text(s, L.exit.prompt, 0.7, 1.45, 8.6, 1.8, { max: 22, min: 14, color: WHITE, valign: "middle", tag: "exit prompt" });
  card(s, 0.4, 3.6, 9.2, 1.35, tint);
  s.addText("FRAME", { x: 0.7, y: 3.7, w: 2, h: 0.25, fontFace: FONT, fontSize: 9, bold: true, color: accent, charSpacing: 3, margin: 0, isTextBox: true });
  text(s, L.exit.frame, 0.7, 3.95, 8.6, 0.9, { max: 18, min: 12, color: NAVY, valign: "middle", tag: "exit frame" });
}

// ---- preview slides ----
function placeImage(s, file, w0, h0, x, y, W, H) {
  const r = Math.min(W / w0, H / h0); const w = w0 * r, h = h0 * r;
  s.addImage({ path: file, x: x + (W - w) / 2, y, w, h });
}
function previewSlides(pres, L, accent, tint, idxStart) {
  let idx = idxStart;
  const s0 = pres.addSlide(); banner(s0, L, accent); heading(s0, "Your worksheet", accent); footer(s0, L, idx++);
  const partsList = {};
  for (const level of ["1A", "2A"]) {
    const ws = L.worksheets[level];
    partsList[level] = ws.parts.filter(p => !p.onlyTiers || p.onlyTiers.includes("core")).map(p => `Part ${p.name}  ${p.title}`);
  }
  [["1A", PALE, BLUE], ["2A", tint, accent]].forEach(([lv, fill, chip], i) => {
    const x = 0.4 + i * 4.7; card(s0, x, 1.3, 4.5, 3.65, fill);
    s0.addShape("roundRect", { x: x + 0.2, y: 1.45, w: 0.7, h: 0.34, rectRadius: 0.1, fill: { color: chip }, line: { color: chip } });
    s0.addText(lv, { x: x + 0.2, y: 1.45, w: 0.7, h: 0.34, fontFace: FONT, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0, isTextBox: true });
    s0.addText(L.worksheets[lv].title, { x: x + 1.0, y: 1.45, w: 3.3, h: 0.34, fontFace: HFONT, fontSize: 13, bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
    text(s0, partsList[lv], x + 0.2, 1.95, 4.1, 2.9, { max: 15, min: 11, gap: 8, tag: "parts list" });
  });
  const tiers = ["Support", "Core", "Stretch"];
  for (const level of ["1A", "2A"]) for (const tier of tiers) {
    const key = Object.keys(previews).find(k => k.includes(`_L${String(L.n).padStart(2, "0")}_`) && k.includes(`_${level}_${tier}_`));
    if (!key) continue;
    const pv = previews[key];
    const tag = `${level} \u2022 ${tier}`;
    const full = () => {
      const s = pres.addSlide(); banner(s, L, accent); heading(s, `Worksheet \u2014 ${tag}`, accent); footer(s, L, idx++);
      const n = pv.pages.length, W = 9.2 / n;
      pv.pages.forEach((pg, i) => { placeImage(s, pg, 8.5, 11, 0.4 + i * W, 1.22, W - 0.1, 3.9); });
    };
    full();
    for (const part of pv.parts) {
      const s = pres.addSlide(); banner(s, L, accent); heading(s, `${tag}  \u2014  ${part.label}`, accent); footer(s, L, idx++);
      placeImage(s, part.file, part.w, part.h, 0.4, 1.22, 9.2, 3.9);
    }
    full();
  }
  return idx;
}

// ---- L3 admin deck ----
function adminDeck(L, accent, tint) {
  const pres = newDeck();
  planSlide(pres, L, accent); shapeSlide(pres, L, accent, tint);
  titleSlide(pres, L, accent);
  let idx = 4;
  let s = pres.addSlide(); banner(s, L, accent); heading(s, "Why today matters", accent); footer(s, L, idx++);
  [["It is a snapshot", "Your writing today shows the district where you are starting from. Nobody expects it to be perfect."],
   ["It is yours", "Your own words, your own ideas. No phones, no translators, no copying."],
   ["It comes back", "In June you will read it again and see how far you have come."]].forEach(([a, b], i) => {
    const y = 1.3 + i * 1.2; card(s, 0.4, y, 9.2, 1.05, i % 2 ? tint : PALE); numCircle(s, 0.6, y + 0.3, i + 1, accent);
    s.addText(a, { x: 1.2, y: y + 0.1, w: 2.6, h: 0.85, fontFace: HFONT, fontSize: 17, bold: true, color: NAVY, margin: 0, isTextBox: true, valign: "middle" });
    text(s, b, 3.9, y + 0.1, 5.5, 0.85, { max: 15, min: 11, valign: "middle" });
  });
  // header block model
  s = pres.addSlide(); banner(s, L, accent); heading(s, "Your header \u2014 top right corner", accent); footer(s, L, idx++);
  s.addShape("rect", { x: 0.5, y: 1.3, w: 5.2, h: 3.7, fill: { color: WHITE }, line: { color: GREY, width: 1 } });
  for (let i = 0; i < 9; i++) s.addShape("line", { x: 0.7, y: 1.75 + i * 0.36, w: 4.8, h: 0, line: { color: MID, width: 0.75 } });
  s.addShape("roundRect", { x: 3.3, y: 1.4, w: 2.3, h: 1.85, rectRadius: 0.06, fill: { color: PALE }, line: { color: BLUE, width: 1 } });
  s.addText(["Full name", "Student number", "Grade", "ELL level (1A / 2A)", "Date"].map((t, i) => ({ text: t, options: { breakLine: i < 4, paraSpaceAfter: 2 } })), { x: 3.4, y: 1.45, w: 2.1, h: 1.75, fontFace: FONT, fontSize: 11, color: NAVY, margin: 0, isTextBox: true });
  card(s, 6.1, 1.3, 3.5, 3.7, NAVY);
  text(s, ["Write these five lines before you write anything else.", "Skip a line between every line of writing (double-space).", "Use black or blue pen. No pencil."], 6.35, 1.5, 3.05, 3.3, { max: 15, min: 11, color: WHITE, gap: 10, bullet: true });
  // rules
  s = pres.addSlide(); banner(s, L, accent); heading(s, "The rules", accent); footer(s, L, idx++);
  L.rules.forEach((r, i) => { const y = 1.3 + i * 0.92; card(s, 0.4, y, 9.2, 0.8, i % 2 ? tint : PALE); numCircle(s, 0.6, y + 0.19, i + 1, accent); text(s, r, 1.2, y + 0.05, 8.2, 0.7, { max: 17, min: 12, valign: "middle" }); });
  // prompts
  L.prompts.forEach(p => {
    s = pres.addSlide(); banner(s, L, accent); heading(s, "Today\u2019s prompt", accent); footer(s, L, idx++);
    s.addText(p.day.toUpperCase(), { x: 0.4, y: 1.3, w: 9.2, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: accent, charSpacing: 3, margin: 0, isTextBox: true });
    card(s, 0.4, 1.7, 9.2, 2.4, NAVY);
    text(s, p.text, 0.8, 1.85, 8.4, 2.1, { max: 30, min: 18, color: WHITE, valign: "middle", bold: true });
    card(s, 0.4, 4.25, 9.2, 0.75, tint);
    text(s, "Read it twice. Circle the key words. Then plan three ideas in the margin before you start.", 0.7, 4.3, 8.6, 0.65, { max: 14, min: 11, color: NAVY, valign: "middle" });
  });
  // timing
  s = pres.addSlide(); banner(s, L, accent); heading(s, "The 80 minutes", accent); footer(s, L, idx++);
  L.timing.forEach(([t, d], i) => { const y = 1.3 + i * 0.92; card(s, 0.4, y, 9.2, 0.8, i % 2 ? tint : PALE);
    s.addShape("roundRect", { x: 0.55, y: y + 0.15, w: 1.3, h: 0.5, rectRadius: 0.1, fill: { color: accent }, line: { color: accent } });
    s.addText(t, { x: 0.55, y: y + 0.15, w: 1.3, h: 0.5, fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0, isTextBox: true });
    text(s, d, 2.05, y + 0.05, 7.4, 0.7, { max: 16, min: 11, valign: "middle" }); });
  // finish checklist
  s = pres.addSlide(); banner(s, L, accent); heading(s, "Finished early?", accent); footer(s, L, idx++);
  card(s, 0.4, 1.3, 9.2, 3.65, PALE);
  text(s, ["Is my header complete \u2014 all five lines?", "Does every sentence start with a capital letter?", "Does every sentence end with a period or question mark?", "Did I answer the question that was asked?", "Can I add one more example or one more sentence?"], 0.7, 1.45, 8.6, 3.4, { max: 18, min: 13, gap: 10, bullet: true, color: NAVY });
  // lined page preview
  const lp = path.join(__dirname, "out/previews/lined_page-1.png");
  if (fs.existsSync(lp)) { s = pres.addSlide(); banner(s, L, accent); heading(s, "Your lined page", accent); footer(s, L, idx++); placeImage(s, lp, 8.5, 11, 0.4, 1.22, 9.2, 3.9); }
  s = pres.addSlide(); s.background = { color: NAVY };
  s.addShape("ellipse", { x: -1.5, y: 3.2, w: 4.5, h: 4.5, fill: { color: accent }, line: { color: accent } });
  s.addText("Pens down. Hand it in.", { x: 0.6, y: 1.6, w: 8.8, h: 1.2, fontFace: HFONT, fontSize: 36, bold: true, color: WHITE, margin: 0, isTextBox: true });
  s.addText("Thank you. You will see this piece again in June.", { x: 0.6, y: 2.8, w: 8.8, h: 0.6, fontFace: FONT, fontSize: 18, color: PALEBLUE, margin: 0, isTextBox: true });
  return pres;
}

// ---- main ----
(async () => {
  for (const L of LESSONS) {
    const accent = ACCENTS[L.accent], tint = TINTS[L.accent];
    let pres;
    if (L.admin) pres = adminDeck(L, accent, tint);
    else {
      pres = newDeck();
      planSlide(pres, L, accent); shapeSlide(pres, L, accent, tint);
      titleSlide(pres, L, accent);
      warmupSlide(pres, L, accent, tint, 4);
      goalsSlide(pres, L, accent, tint, 5);
      vocabSlide(pres, L, accent, tint, 6);
      let k = textSlides(pres, L, accent, tint, 7);
      teachSlide(pres, L, L.teach1, accent, tint, k++, "rows");
      teachSlide(pres, L, L.teach2, accent, tint, k++, "cols");
      const hs = path.join(__dirname, "out/previews/help_slip_one.png");
      if (L.n === 1 && fs.existsSync(hs)) {
        const s = pres.addSlide(); banner(s, L, accent); heading(s, "The help slip \u2014 what it looks like", accent); footer(s, L, k++);
        { const im = require("fs").statSync(hs); placeImage(s, hs, 43, 44, 0.4, 1.22, 5.2, 3.9); }
        card(s, 5.9, 1.3, 3.7, 3.65, NAVY);
        text(s, ["Tick what you want checked.", "Write what you need help with.", "Ask your question in words.", "Hand it to me. It comes back with an answer in the box."], 6.1, 1.5, 3.3, 3.3, { max: 15, min: 11, color: WHITE, gap: 10, bullet: true });
      }
      examplesSlide(pres, L, accent, tint, k++);
      practiceSlide(pres, L, accent, tint, k++);
      speakingSlide(pres, L, accent, tint, k++);
      yourTurnSlide(pres, L, accent, tint, k++);
      exitSlide(pres, L, accent, tint, k++);
      previewSlides(pres, L, accent, tint, k);
    }
    const name = `${COURSE.code}_U${String(COURSE.unit).padStart(2, "0")}_L${String(L.n).padStart(2, "0")}_Deck_${L.slug}_${VERSION}.pptx`;
    await pres.writeFile({ fileName: path.join(outDir, name) });
    console.log("wrote", name);
  }
  if (overflows.length) { console.log("FIT WARNINGS:"); overflows.forEach(o => console.log("  " + o)); process.exitCode = 2; }
  else console.log("fit: clean");
})();
