// make_decks_v2.js — ENG8 deck generator.
//
// v13 (Oct 9 2026) — brought up to the Sep 20–26 standing orders:
//   * 28 pt READABILITY FLOOR on every student-facing string (Sean's Room 148
//     projector test). Headings 36. Answers 30 bold blue. Content SPLITS across
//     continuation slides instead of shrinking. Reference strips (banner, footer,
//     kicker tag, page labels) and the whole teacher plan slide are exempt.
//     The build FAILS and lists offenders if a non-ref string falls below it.
//   * Worksheet Parts are TYPED from u1_worksheets.js, not shown as cropped
//     images. Full-page images stay on the hand-out reminder slide only.
//   * NEXT-QUESTION STRIP: every answer-reveal slide, and the last slide before
//     the first answer, shows the next item unanswered.
//   * Reveal numbering no longer doubles up when an authored answer already
//     carries its own number.
//   * The L01 partHowTo fallback is GONE. A Part with no authored how-to text is
//     a hard build failure — that fallback is what silently put the Lesson 1
//     icebreaker text onto Lesson 8's walkthrough slides.
//   * Core-competency chips are lit per lesson, not all three always.
//   * Cards use a solid tint with a visible outline; no near-white on white.
//
// Reads DECKS + DECK_PLAN + DECK_KEYMAP from u1_decks.js, lesson data from
// u1_content.js, worksheet content from u1_worksheets.js, and full-page
// worksheet rasters from wsassets/.
const fs = require("fs"), path = require("path");
const pptxgen = require("pptxgenjs");
const { DECKS, DECK_PLAN, DECK_KEYMAP } = require("./u1_decks.js");
const { UNIT, LESSONS } = require("./u1_content.js");
const { WORKSHEETS } = require("./u1_worksheets.js");

const OUT = process.argv[2] || path.join(__dirname, "out");
const WSA = process.argv[3] || path.join(__dirname, "wsassets");
const VERSION = process.argv[4] || "v13";
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// ---- palette / geometry (unchanged — matched to the approved deck series) ----
const NAVY = "0B2C4D", BLUE = "1565C0", ICE = "E8F0FA", PALE = "F4F7FB",
      INK = "1A2632", GREY = "5A6B7B", WHITE = "FFFFFF", LINE = "D3DEEA",
      TINT2 = "DCE7F3";               // second card tint: a real tint, not near-white
const ACCENTS = { teal: "0E8C7F", amber: "C8860B", violet: "7A52B3", mint: "2E9E6B", coral: "D4573B" };
const CYCLE = ["teal", "amber", "violet", "mint", "coral"];
const accentFor = n => ACCENTS[CYCLE[(n - 1) % CYCLE.length]];
const HF = "Cambria", BF = "Calibri";
const W = 13.33, Hh = 7.5, MX = 0.6;
const LETTER_RATIO = 8.5 / 11;
const shadow = () => ({ type: "outer", color: "8899AA", blur: 6, offset: 2, angle: 90, opacity: 0.35 });

// ---- READABILITY FLOOR ----
const MIN = 28, HEAD = 36, ANS = 30;
const SMALL = [];                      // collected offenders; build fails if non-empty
let CURRENT = "";                      // label for error messages

// T() is the only way text reaches a slide. ref:true marks a reference strip.
function T(s, text, x, y, w, h, o = {}) {
  const { ref, ...opt } = o;
  if (!ref) {
    const size = opt.fontSize || MIN;
    if (size < MIN) SMALL.push(`${CURRENT} — ${String(Array.isArray(text) ? text[0].text : text).slice(0, 48)}: ${size} pt (floor ${MIN})`);
  }
  s.addText(text, { x, y, w, h, margin: 0, ...opt });
}

// ---- line-fitting maths (used to SPLIT, never to shrink below the floor) ----
const charsPerLine = (w, pt) => Math.max(8, Math.floor((w - 0.2) * 72 / (pt * 0.5)));
const linesFor = (txt, w, pt) => Math.max(1, Math.ceil(String(txt).length / charsPerLine(w, pt)));
const heightOf = (arr, w, pt, ls = 1.3, after = 0.14) =>
  arr.reduce((a, t) => a + linesFor(t, w, pt) * pt * ls / 72 + after, 0);

// Split an array of strings into chunks that each fit h at pt.
function chunk(arr, w, h, pt) {
  const out = []; let cur = [];
  for (const t of arr) {
    const trial = cur.concat([t]);
    if (cur.length && heightOf(trial, w, pt) > h) { out.push(cur); cur = [t]; }
    else cur = trial;
  }
  if (cur.length) out.push(cur);
  return out;
}
// Largest size from `max` down to the floor at which everything fits one box.
function ptFit(arr, w, h, max = HEAD) {
  for (let pt = max; pt >= MIN; pt -= 1) if (heightOf(arr, w, pt) <= h) return pt;
  return MIN;
}
// Teacher-plan-only shrink helper (plan slides are exempt from the floor).
function planFit(lines, w, h, maxPt, minPt, ls = 1.25) {
  for (let pt = maxPt; pt >= minPt; pt -= 1) {
    const cpl = Math.max(1, Math.floor((w - 0.2) * 72 / (pt * 0.5)));
    const n = lines.reduce((a, l) => a + Math.max(1, Math.ceil(String(l).length / cpl)), 0);
    if (n * pt * ls / 72 + 0.04 <= h) return pt;
  }
  return minPt;
}

// ---- worksheet assets + content ----
const pagePngs = (n) => {
  const tag = `L${String(n).padStart(2, "0")}-page-`;
  return fs.existsSync(WSA) ? fs.readdirSync(WSA).filter(f => f.startsWith(tag) && f.endsWith(".png"))
    .sort((a, b) => parseInt(a.match(/-(\d+)\.png/)[1]) - parseInt(b.match(/-(\d+)\.png/)[1]))
    .map(f => path.join(WSA, f)) : [];
};
const wsFor = (n) => WORKSHEETS.find(x => x.n === n);
const wsSectionsFor = (n) => {
  const w = wsFor(n);
  return w ? { title: w.title, sections: w.blocks.filter(b => b.kind === "section").map(b => b.t) } : { title: "", sections: [] };
};

// The blocks belonging to one Part — from its "section" heading to the next one.
// Support/Extension blocks are excluded: CORE TIER ONLY in any PowerPoint.
function partBlocks(n, letter) {
  const w = wsFor(n); if (!w) return [];
  const re = new RegExp(`^Part ${letter}\\b`);
  let on = false; const out = [];
  for (const b of w.blocks) {
    if (b.kind === "section") { on = re.test(b.t); continue; }
    if (!on) continue;
    if (b.kind === "support" || b.kind === "extension") continue;
    out.push(b);
  }
  return out;
}

// Turn a Part's blocks into the lines we TYPE on the walkthrough slide.
// Returns { instr:[], items:[] } so the items can carry the next-question strip.
function partContent(n, letter) {
  const instr = [], items = [];
  for (const b of partBlocks(n, letter)) {
    switch (b.kind) {
      case "instr": instr.push(b.t); break;
      case "note": instr.push("Note: " + b.t); break;
      case "checklist": (b.items || []).forEach(t => items.push("❑  " + t)); break;
      case "frames": (b.list || []).forEach(t => items.push(t)); break;
      case "cloze":
        if (b.bank && b.bank.length) instr.push("Word bank:  " + b.bank.join("   ·   "));
        (b.items || []).forEach((it, i) => items.push(`${i + 1}.  ${it.text}`));
        break;
      case "box": items.push("[ " + (b.label || "Box") + " ]"); break;
      case "table":
        (b.rows || []).forEach(r => items.push(r.filter(Boolean).join("   —   ")));
        break;
      case "fill": items.push(b.prompt || ""); break;
      case "model": if (b.text) instr.push(b.text); break;
      default: break;    // write / sixbox / longblanks are blank space, nothing to type
    }
  }
  return { instr: instr.filter(Boolean), items: items.filter(Boolean) };
}

// ---- core-competency chips, lit per lesson ----
// Explicit per-lesson overrides where Claude has checked the standards by hand.
const COMP_LIT = {
  7: ["COM", "TH"],     // setting/atmosphere: literary analysis + sharing. Not PS.
  8: ["COM"],           // language conventions only.
};
function compLitFor(L) {
  if (COMP_LIT[L.n]) return COMP_LIT[L.n];
  const s = ((L.standards || "") + " " + (L.objective || "")).toLowerCase();
  const lit = [];
  if (/communicat|present|discuss|oral|share|publish|collaborat/.test(s)) lit.push("COM");
  if (/think|analys|analyz|recogni|comprehend|metacognit|literary element|evaluat/.test(s)) lit.push("TH");
  if (/identity|personal|social|cultural|well-being|self/.test(s)) lit.push("PS");
  if (/creat|write|writing process|convention/.test(s) && !lit.includes("COM")) lit.push("COM");
  return lit.length ? lit : ["COM"];
}

// ---- BANNER (every content slide; not title/plan/shape/dark slides) ----
function banner(s, L, accent) {
  s.addShape("rect", { x: 0, y: 0, w: W, h: 0.72, fill: { color: NAVY }, line: { color: NAVY } });
  s.addShape("rect", { x: 0, y: 0, w: 0.16, h: 0.72, fill: { color: accent }, line: { color: accent } });
  T(s, "OBJECTIVE", 0.32, 0.06, 9.4, 0.2, { ref: true, fontFace: BF, fontSize: 10, bold: true, color: "9DC3E6", charSpacing: 2 });
  T(s, L.objBanner || L.objective || "— objective not set —", 0.32, 0.24, 10.1, 0.44,
    { ref: true, fontFace: BF, fontSize: 11, color: ICE, valign: "top" });
  const lit = new Set(compLitFor(L));
  ["COM", "TH", "PS"].forEach((c, i) => {
    const on = lit.has(c), x = 10.57 + i * 0.72;
    s.addShape("roundRect", { x, y: 0.21, w: 0.6, h: 0.3, rectRadius: 0.06,
      fill: { color: on ? accent : "20364A" }, line: { color: on ? accent : "33475B", width: 1 } });
    T(s, c, x, 0.21, 0.6, 0.3, { ref: true, align: "center", valign: "middle", fontFace: BF, fontSize: 11, bold: true, color: on ? WHITE : "5E7285" });
  });
}
function footer(s, L) {
  T(s, [{ text: `${UNIT.code} · Unit ${UNIT.number}`, options: { color: GREY } },
        { text: "   |   ", options: { color: LINE } },
        { text: `Lesson ${L.n}: ${L.short || L.title}`, options: { color: GREY } }],
    MX, Hh - 0.42, W - 2 * MX, 0.3, { ref: true, fontFace: BF, fontSize: 9, align: "left" });
}
// Kicker tag — a reference strip, exempt from the floor.
function kicker(s, txt, accent) {
  T(s, (txt || "").toUpperCase(), MX, 0.9, W - 2 * MX, 0.28,
    { ref: true, fontFace: BF, fontSize: 13, bold: true, color: accent, charSpacing: 2 });
}
// "Next question" strip along the bottom — 28 pt floor applies.
function nextStrip(s, label, text, accent) {
  const y = Hh - 1.28;
  s.addShape("roundRect", { x: MX, y, w: W - 2 * MX, h: 0.78, rectRadius: 0.08,
    fill: { color: ICE }, line: { color: accent, width: 1.5 } });
  T(s, (label || "NEXT QUESTION").toUpperCase(), MX + 0.22, y + 0.06, W - 2 * MX - 0.44, 0.22,
    { ref: true, fontFace: BF, fontSize: 11, bold: true, color: accent, charSpacing: 1.5 });
  T(s, text, MX + 0.22, y + 0.28, W - 2 * MX - 0.44, 0.44,
    { fontFace: BF, fontSize: MIN, bold: true, color: NAVY, valign: "middle" });
}

// ---- CONTENT SLIDE renderers ----
function contentHead(s, sd, accent) {
  kicker(s, sd.kicker, accent);
  const ttl = sd.title || "";
  T(s, ttl, MX, 1.16, W - 2 * MX, 0.9, { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY, valign: "top" });
  let y = 2.2;
  if (sd.intro) {
    const pt = ptFit([sd.intro], W - 2 * MX, 0.8, 30);
    T(s, sd.intro, MX, y, W - 2 * MX, 0.8, { fontFace: BF, fontSize: pt, italic: true, color: GREY, valign: "top" });
    y += Math.max(0.8, heightOf([sd.intro], W - 2 * MX, pt)) + 0.12;
  }
  return y;
}
// Cards: solid tint, visible outline, body at the floor. Splits across slides.
function cardSlides(p, sd, L, accent) {
  const items = sd.cards || [];
  const bodyW = W - 2 * MX - 0.6;
  // height one card needs with its body at the floor
  const need = it => (it.h ? 0.56 : 0.18) + heightOf([it.t], bodyW, MIN) + 0.26;
  const region = (Hh - 0.7) - 2.2;
  const groups = []; let cur = [], acc = 0;
  for (const it of items) {
    const hNeed = need(it) + (cur.length ? 0.24 : 0);
    if (cur.length && acc + hNeed > region) { groups.push(cur); cur = [it]; acc = need(it); }
    else { cur.push(it); acc += hNeed; }
  }
  if (cur.length) groups.push(cur);

  groups.forEach((grp, gi) => {
    const s = p.addSlide(); banner(s, L, accent);
    const sdx = gi === 0 ? sd : { ...sd, intro: null, title: (sd.title || "") + " (cont.)" };
    const y0 = contentHead(s, sdx, accent);
    const avail = (Hh - 0.7) - y0;
    const heights = grp.map(need);
    const total = heights.reduce((a, b) => a + b, 0) + (grp.length - 1) * 0.24;
    const extra = Math.max(0, (avail - total) / grp.length);     // fill open space
    let y = y0 + Math.max(0, (avail - total - extra * grp.length) / 2);
    grp.forEach((it, i) => {
      const ch = heights[i] + extra;
      s.addShape("roundRect", { x: MX, y, w: W - 2 * MX, h: ch, rectRadius: 0.08,
        fill: { color: i % 2 ? TINT2 : ICE }, line: { color: accent, width: 1.5 }, shadow: shadow() });
      if (it.h) T(s, it.h, MX + 0.3, y + 0.14, bodyW, 0.42, { fontFace: HF, fontSize: MIN + 2, bold: true, color: accent, valign: "top" });
      T(s, it.t, MX + 0.3, y + (it.h ? 0.62 : 0.2), bodyW, ch - (it.h ? 0.78 : 0.36),
        { fontFace: BF, fontSize: MIN, color: INK, valign: "top" });
      y += ch + 0.24;
    });
    footer(s, L);
  });
}
// Bullets: at the floor, split across slides.
function bulletSlides(p, sd, L, accent) {
  const bodyW = W - 2 * MX - 0.35;
  const probe = p.addSlide(); banner(probe, L, accent);
  const y0 = contentHead(probe, sd, accent);
  const region = (Hh - 0.7) - y0;
  const groups = chunk(sd.bullets, bodyW, region, MIN);
  // first group goes on the probe slide
  groups.forEach((grp, gi) => {
    const s = gi === 0 ? probe : p.addSlide();
    let yy = y0;
    if (gi > 0) {
      banner(s, L, accent);
      yy = contentHead(s, { ...sd, intro: null, title: (sd.title || "") + " (cont.)" }, accent);
    }
    T(s, grp.map(b => ({ text: b, options: { bullet: { code: "2022" }, breakLine: true, paraSpaceAfter: 14 } })),
      MX + 0.35, yy + 0.08, bodyW, (Hh - 0.7) - yy, { fontFace: BF, fontSize: MIN, color: INK, valign: "top" });
    footer(s, L);
  });
}
const R = {};
R.plain = (p, sd, L, accent) => {
  if (sd.cards) cardSlides(p, sd, L, accent);
  else if (sd.bullets) bulletSlides(p, sd, L, accent);
  else { const s = p.addSlide(); banner(s, L, accent); contentHead(s, sd, accent); footer(s, L); }
};
R.step = R.plain;
R.compare = (p, sd, L, accent) => {
  const s = p.addSlide(); banner(s, L, accent);
  kicker(s, sd.kicker, accent);
  T(s, sd.title || "", MX, 1.16, W - 2 * MX, 0.9, { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY, valign: "top" });
  const y = 2.25, colw = (W - 2 * MX - 0.4) / 2, colh = Hh - y - 0.7;
  [{ ...sd.left, c: NAVY, f: TINT2 }, { ...sd.right, c: accent, f: ICE }].forEach((pane, i) => {
    const x = MX + i * (colw + 0.4);
    s.addShape("roundRect", { x, y, w: colw, h: colh, rectRadius: 0.1,
      fill: { color: pane.f }, line: { color: accent, width: 1.5 }, shadow: shadow() });
    T(s, pane.h, x + 0.3, y + 0.22, colw - 0.6, 0.55, { fontFace: HF, fontSize: MIN + 2, bold: true, color: pane.c });
    T(s, (pane.items || []).map(t => ({ text: t, options: { bullet: { code: "2022" }, breakLine: true, paraSpaceAfter: 10 } })),
      x + 0.3, y + 0.92, colw - 0.6, colh - 1.1, { fontFace: BF, fontSize: MIN, color: INK, valign: "top" });
  });
  footer(s, L);
};
// A full text (passage, model paragraph) reproduced IN FULL, split if needed.
R.text = (p, sd, L, accent) => {
  const bodyW = W - 2 * MX - 0.5;
  const region = (Hh - 0.7) - 2.3;
  const paras = sd.body || [];
  const groups = chunk(paras, bodyW, region - 0.2, MIN);
  groups.forEach((grp, gi) => {
    const s = p.addSlide(); banner(s, L, accent);
    kicker(s, sd.kicker, accent);
    T(s, (sd.title || "") + (gi ? " (cont.)" : ""), MX, 1.16, W - 2 * MX, 0.9,
      { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY, valign: "top" });
    const need = heightOf(grp, bodyW, MIN) + 0.5;
    const h = Math.min(region, Math.max(1.4, need));
    const by = 2.25 + Math.max(0, (region - h) / 2);
    s.addShape("roundRect", { x: MX, y: by, w: W - 2 * MX, h, rectRadius: 0.1,
      fill: { color: ICE }, line: { color: accent, width: 1.5 }, shadow: shadow() });
    T(s, grp.map(t => ({ text: t, options: { breakLine: true, paraSpaceAfter: 14 } })),
      MX + 0.3, by + 0.2, bodyW, h - 0.4, { fontFace: BF, fontSize: MIN, color: INK, valign: "middle" });
    footer(s, L);
  });
};

// ---- TITLE / SECTION / EXIT (dark, no banner) ----
function titleSlide(p, sd, L, accent) {
  const s = p.addSlide(); s.background = { color: NAVY };
  T(s, `UNIT ${UNIT.number} · LESSON ${L.n}`, MX, 1.5, W - 2 * MX, 0.4,
    { ref: true, fontFace: BF, fontSize: 15, bold: true, color: accent, charSpacing: 3 });
  T(s, sd.title, MX, 2.0, W - 2 * MX, 1.8, { fontFace: HF, fontSize: 44, bold: true, color: WHITE, valign: "top" });
  T(s, sd.sub || "", MX, 4.2, W - 2 * MX, 1.4, { fontFace: BF, fontSize: MIN, italic: true, color: ICE, valign: "top" });
  T(s, [{ text: "English Language Arts 8", options: { color: ICE } }, { text: "   ·   Mr. Reid", options: { color: GREY } }],
    MX, Hh - 0.9, W - 2 * MX, 0.4, { ref: true, fontFace: BF, fontSize: 13 });
}
function darkList(p, L, accent, tag, title, items, imageRel) {
  const bodyW = W - 2 * MX - 0.35;
  const region = (Hh - 0.7) - 2.6;
  const hasImg = imageRel && fs.existsSync(path.join(__dirname, imageRel));
  const w = hasImg ? 7.0 : bodyW;
  const groups = chunk(items.length ? items : [""], w - 0.35, region, MIN);
  groups.forEach((grp, gi) => {
    const s = p.addSlide(); s.background = { color: NAVY };
    T(s, tag.toUpperCase(), MX, 0.9, W - 2 * MX, 0.4, { ref: true, fontFace: BF, fontSize: 14, bold: true, color: accent, charSpacing: 3 });
    T(s, title + (gi ? " (cont.)" : ""), MX, 1.4, W - 2 * MX, 1.0, { fontFace: HF, fontSize: HEAD, bold: true, color: WHITE, valign: "top" });
    if (grp.filter(Boolean).length)
      T(s, grp.map(t => ({ text: t, options: { bullet: { code: "2022" }, breakLine: true, paraSpaceAfter: 18, color: ICE } })),
        MX + 0.35, 2.6, w - 0.35, region, { fontFace: BF, fontSize: MIN, color: ICE, valign: "top" });
    if (hasImg && gi === 0) {
      const sizeOf = require("./imgsize.js");
      const { w: iw, h: ih } = sizeOf(path.join(__dirname, imageRel));
      const ar = ih / iw, IW = 4.7;
      s.addImage({ path: path.join(__dirname, imageRel), x: W - MX - IW, y: 2.6, w: IW, h: IW * ar });
    }
  });
}
const sectionSlide = (p, cfg, L, accent) => darkList(p, L, accent, cfg.kicker || "SECTION", cfg.title || "", cfg.items || [], cfg.image);
const exitSlide = (p, sd, L, accent) => darkList(p, L, accent, "EXIT TICKET", sd.title || "Before you go", sd.items || []);

// ---- PLAN + SHAPE (teacher-facing; exempt from the floor) ----
function timeSplit(n) {
  if (n <= 1) return [80];
  const exit = Math.max(5, Math.round(80 * 0.08)), warm = 10, mid = 80 - warm - exit, midN = n - 2;
  const per = midN > 0 ? Math.round(mid / midN) : 0;
  const arr = [warm];
  for (let i = 0; i < midN; i++) arr.push(per);
  arr.push(exit);
  let d = 80 - arr.reduce((a, x) => a + x, 0);
  arr[1] = (arr[1] || arr[0]) + d;
  return arr;
}
function planSlide(p, L, accent, plan) {
  const seq = L.sequence || [], times = timeSplit(seq.length);
  const lit = new Set(compLitFor(L));
  function header(s, part) {
    s.background = { color: PALE };
    s.addShape("rect", { x: 0, y: 0, w: W, h: 0.42, fill: { color: NAVY }, line: { color: NAVY } });
    T(s, "LESSON PLAN  ·  TEACHER SLIDE  ·  SKIP WHEN PRESENTING", 0.3, 0, W - 2.6, 0.42,
      { ref: true, fontFace: BF, fontSize: 11, bold: true, color: "9DC3E6", charSpacing: 2, valign: "middle" });
    ["COM", "TH", "PS"].forEach((c, i) => {
      const on = lit.has(c), x = W - 2.3 + i * 0.72;
      s.addShape("roundRect", { x, y: 0.06, w: 0.6, h: 0.3, rectRadius: 0.06,
        fill: { color: on ? accent : "20364A" }, line: { color: on ? accent : "33475B", width: 1 } });
      T(s, c, x, 0.06, 0.6, 0.3, { ref: true, align: "center", valign: "middle", fontFace: BF, fontSize: 11, bold: true, color: on ? WHITE : "5E7285" });
    });
    T(s, `${UNIT.code} — Unit ${UNIT.number} — Lesson ${L.n}: ${L.title} — 80 minutes${part ? `  (${part})` : ""}`,
      0.5, 0.5, W - 1, 0.36, { ref: true, fontFace: HF, fontSize: 15, bold: true, color: NAVY, valign: "middle" });
  }
  const s1 = p.addSlide(); header(s1, "1 of 2");
  T(s1, [{ text: "Objective  ", options: { bold: true, color: BLUE } }, { text: L.objective || "" }],
    0.5, 0.94, W - 1, 0.5, { ref: true, fontFace: BF, fontSize: 11.5, color: INK, valign: "top" });
  T(s1, [{ text: "Standards  ", options: { bold: true, color: BLUE } }, { text: L.standards || "" }],
    0.5, 1.42, W - 1, 0.5, { ref: true, fontFace: BF, fontSize: 10.5, color: GREY, valign: "top" });
  const top = 2.0, avail = Hh - top - 0.35, step = Math.min(0.9, avail / Math.max(seq.length, 1));
  const accs = ["00897B", "43A047", "F9A825", "E8604C", "6A4FB3"];
  seq.forEach((txt, i) => {
    const y = top + i * step, ac = accs[i % 5];
    s1.addShape("roundRect", { x: 0.5, y: y + 0.04, w: 0.78, h: step - 0.12, rectRadius: 0.06, fill: { color: ac }, line: { color: ac } });
    T(s1, `${times[i] || ""}\nmin`, 0.5, y + 0.04, 0.78, step - 0.12,
      { ref: true, align: "center", valign: "middle", fontFace: BF, fontSize: 10, bold: true, color: WHITE, lineSpacing: 11 });
    T(s1, txt, 1.45, y, W - 1.95, step,
      { ref: true, fontFace: BF, fontSize: planFit([txt], W - 1.95, step - 0.04, 11, 8), color: INK, valign: "middle" });
  });
  T(s1, "Suggested timing — adjust to your block.", 0.5, Hh - 0.32, W - 1, 0.24,
    { ref: true, fontFace: BF, fontSize: 9, italic: true, color: GREY });

  const s2 = p.addSlide(); header(s2, "2 of 2");
  let y = 1.0;
  function block(label, lines, col) {
    T(s2, label, 0.5, y, W - 1, 0.3, { ref: true, fontFace: BF, fontSize: 12, bold: true, color: col, charSpacing: 1 });
    y += 0.34;
    const arr = Array.isArray(lines) ? lines : [lines];
    T(s2, arr.map(t => ({ text: t, options: { bullet: { code: "2022" }, breakLine: true, paraSpaceAfter: 6 } })),
      0.7, y, W - 1.4, 0.3 + arr.length * 0.34, { ref: true, fontFace: BF, fontSize: 12, color: INK, valign: "top" });
    y += arr.reduce((a, t) => a + Math.max(0.34, Math.ceil(t.length / 120) * 0.3), 0) + 0.18;
  }
  block("MATERIALS", L.materials || [], accent);
  const d = L.diff || {};
  block("DIFFERENTIATION", [`Support — ${d.support || ""}`, `Extension — ${d.extension || ""}`], "43A047");
  block("ASSESSMENT", L.assessment || "—", "F9A825");
  block("HOMEWORK", L.homework || "—", "E8604C");
  if (L.teacherNotes) block("NOTES", L.teacherNotes, BLUE);
}
function shapeSlide(p, L, accent, plan) {
  const deck = DECKS.find(d => d.n === L.n);
  const typeFor = (sd, cfg, key) => {
    if (cfg.activityType) return cfg.activityType;
    if (cfg.section) return "class activity";
    const k = ((sd && (sd.kicker || "")) + " " + (sd && sd.title || "")).toLowerCase();
    if (key === "exit" || /exit/.test(k)) return "exit ticket";
    if (cfg.ws) return "worksheet";
    if (/warm|find someone|icebreaker/.test(k)) return "warm-up";
    if (/watch me|model/.test(k)) return "teacher model";
    if (/interview|partner|pair/.test(k)) return "partner work";
    if (/share|discuss|protocol|showcase/.test(k)) return "class discussion";
    if (/rehearse|practice|draft|write|plan|build|revise|edit|your turn/.test(k)) return "independent work";
    if (/compare|vs\.?/.test(k)) return "class discussion";
    return "instruction";
  };
  const agenda = plan.order.filter(k => k !== "title").map(k => {
    const idx = DECK_KEYMAP[L.n][k];
    const sd = idx != null && deck ? deck.slides[idx] : null;
    const cfg = plan.activities[k] || {};
    const name = cfg.title || (sd && (sd.title || sd.kicker)) || k;
    return `${name}  (${typeFor(sd, cfg, k)})`;
  });
  // one slide per group so the floor holds
  const region = (Hh - 1.5) - 0.4;
  const perSlide = Math.max(1, Math.floor(region / 0.78));
  for (let i = 0; i < agenda.length; i += perSlide) {
    const grp = agenda.slice(i, i + perSlide);
    const s = p.addSlide(); s.background = { color: PALE };
    s.addShape("rect", { x: 0, y: 0, w: W, h: 0.42, fill: { color: accent }, line: { color: accent } });
    T(s, "SHAPE OF THE DAY", 0.3, 0, W - 0.6, 0.42, { ref: true, fontFace: BF, fontSize: 12, bold: true, color: WHITE, charSpacing: 3, valign: "middle" });
    T(s, i === 0 ? "Today" : "Today (cont.)", MX, 0.6, W - 2 * MX, 0.7, { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY });
    const top = 1.55, step = Math.min(0.78, ((Hh - top - 0.4)) / grp.length);
    grp.forEach((lab, j) => {
      const y = top + j * step;
      s.addShape("ellipse", { x: MX, y: y + 0.04, w: 0.52, h: 0.52, fill: { color: accent }, line: { color: accent } });
      T(s, String(i + j + 1), MX, y + 0.04, 0.52, 0.52, { ref: true, align: "center", valign: "middle", fontFace: HF, fontSize: 18, bold: true, color: WHITE });
      T(s, lab, MX + 0.72, y, W - 2 * MX - 0.82, step, { fontFace: BF, fontSize: MIN, color: INK, valign: "middle" });
    });
  }
}

// ---- HAND-OUT REMINDER (divider + full pages; the ONE place images are used) ----
function handoutSlides(p, L, accent) {
  const { title, sections } = wsSectionsFor(L.n);
  darkList(p, L, accent, "YOUR WORKSHEET", title || "Let's look at it together", sections);
  const pages = pagePngs(L.n);
  pages.forEach((img, i) => {
    const s = p.addSlide();
    T(s, `WORKSHEET · PAGE ${i + 1} OF ${pages.length}`, MX, 0.4, W - 2 * MX, 0.32,
      { ref: true, fontFace: BF, fontSize: 12, bold: true, color: accent, charSpacing: 2 });
    const ih = 6.15, iw = ih * LETTER_RATIO, ix = (W - iw) / 2, iy = 0.95;
    s.addShape("roundRect", { x: ix - 0.08, y: iy - 0.08, w: iw + 0.16, h: ih + 0.16, rectRadius: 0.04,
      fill: { color: WHITE }, line: { color: LINE, width: 1 }, shadow: shadow() });
    s.addImage({ path: img, x: ix, y: iy, w: iw, h: ih });
    footer(s, L);
  });
}

// ---- WORKSHEET PART, TYPED (no crops) ----
// Returns the Part's item list so the reveal can carry the next-question strip.
function sectionWalkthrough(p, L, accent, letter, howText) {
  const { instr, items } = partContent(L.n, letter);
  const { sections } = wsSectionsFor(L.n);
  const partLabel = sections.find(t => new RegExp(`Part ${letter}\\b`).test(t)) || `Part ${letter}`;
  if (!howText) {
    SMALL.push(`${CURRENT} — Part ${letter}: no authored how-to text in DECK_PLAN (refusing to fall back)`);
    return items;
  }
  const bodyW = W - 2 * MX - 0.6;
  // how-to panel first, then the Part's own items typed out, split as needed
  const s0 = p.addSlide(); banner(s0, L, accent);
  kicker(s0, "Worksheet walkthrough", accent);
  T(s0, partLabel, MX, 1.16, W - 2 * MX, 0.9, { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY, valign: "top" });
  const hy = 2.25, hh = Math.max(1.3, heightOf([howText], bodyW, MIN) + 0.95);
  s0.addShape("roundRect", { x: MX, y: hy, w: W - 2 * MX, h: Math.min(hh, (Hh - 0.7) - hy), rectRadius: 0.1,
    fill: { color: ICE }, line: { color: accent, width: 1.5 }, shadow: shadow() });
  T(s0, "HOW TO COMPLETE IT", MX + 0.3, hy + 0.2, bodyW, 0.3,
    { ref: true, fontFace: BF, fontSize: 13, bold: true, color: accent, charSpacing: 1 });
  T(s0, howText, MX + 0.3, hy + 0.6, bodyW, Math.min(hh, (Hh - 0.7) - hy) - 0.78,
    { fontFace: BF, fontSize: MIN, color: INK, valign: "top" });
  footer(s0, L);

  if (instr.length) {
    const groups = chunk(instr, bodyW, (Hh - 0.7) - 2.3, MIN);
    groups.forEach(grp => {
      const s = p.addSlide(); banner(s, L, accent);
      kicker(s, "Worksheet walkthrough", accent);
      T(s, partLabel, MX, 1.16, W - 2 * MX, 0.9, { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY, valign: "top" });
      T(s, grp.map(t => ({ text: t, options: { breakLine: true, paraSpaceAfter: 14 } })),
        MX + 0.2, 2.3, W - 2 * MX - 0.4, (Hh - 0.7) - 2.3, { fontFace: BF, fontSize: MIN, color: INK, valign: "middle" });
      footer(s, L);
    });
  }
  if (items.length) {
    // all items shown before any answer; last of these slides carries the first-answer cue
    const groups = chunk(items, W - 2 * MX - 0.4, (Hh - 0.7) - 2.3, MIN);
    groups.forEach((grp, gi) => {
      const s = p.addSlide(); banner(s, L, accent);
      kicker(s, "Worksheet walkthrough", accent);
      T(s, partLabel + (gi ? " (cont.)" : ""), MX, 1.16, W - 2 * MX, 0.9, { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY, valign: "top" });
      T(s, grp.map(t => ({ text: t, options: { breakLine: true, paraSpaceAfter: 14 } })),
        MX + 0.2, 2.3, W - 2 * MX - 0.4, (Hh - 0.7) - 2.3, { fontFace: BF, fontSize: MIN, color: INK, valign: "middle" });
      footer(s, L);
    });
  }
  return items;
}

// ---- REVEAL slide(s) ----
const numbered = s => /^\s*\d+[.)]/.test(String(s));
const strip = s => String(s).replace(/^\s*\d+[.)]\s*/, "");
function revealSlides(p, L, accent, letter, plan, items) {
  const rc = (plan.reveals || {})[letter]; if (!rc) return;
  const bodyW = W - 2 * MX - 0.6;
  if (rc.kind === "open") {
    const s = p.addSlide(); banner(s, L, accent);
    kicker(s, "Worksheet · one good answer", accent);
    T(s, rc.title || "One example", MX, 1.16, W - 2 * MX, 0.9, { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY, valign: "top" });
    const by = 2.3, bh = Math.min(heightOf([rc.example], bodyW, MIN) + 0.95, (Hh - 0.7) - by - (rc.note ? 0.95 : 0.1));
    s.addShape("roundRect", { x: MX, y: by, w: W - 2 * MX, h: bh, rectRadius: 0.1,
      fill: { color: ICE }, line: { color: accent, width: 1.5 }, shadow: shadow() });
    T(s, "EXAMPLE", MX + 0.3, by + 0.18, bodyW, 0.3, { ref: true, fontFace: BF, fontSize: 13, bold: true, color: accent, charSpacing: 1 });
    T(s, rc.example, MX + 0.3, by + 0.58, bodyW, bh - 0.76, { fontFace: BF, fontSize: MIN, bold: true, color: BLUE, valign: "top" });
    if (rc.note) T(s, rc.note, MX, by + bh + 0.18, W - 2 * MX, 0.8, { fontFace: BF, fontSize: MIN, italic: true, color: GREY, valign: "top" });
    footer(s, L);
    return;
  }
  const ans = rc.answers || [];
  const qOf = i => (items && items[i]) ? strip(items[i]) : null;
  // the slide BEFORE the first answer must show question 1 unanswered
  if (ans.length) {
    const s = p.addSlide(); banner(s, L, accent);
    kicker(s, "Let's check", accent);
    T(s, rc.title || "Let's check", MX, 1.16, W - 2 * MX, 0.9, { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY, valign: "top" });
    T(s, "Answers coming up — last chance to finish.", MX, 2.3, W - 2 * MX, 0.8,
      { fontFace: BF, fontSize: MIN, italic: true, color: GREY, valign: "top" });
    if (qOf(0)) nextStrip(s, "First question", qOf(0), accent);
    footer(s, L);
  }
  for (let k = 1; k <= ans.length; k++) {
    const shown = ans.slice(0, k);
    const nxt = qOf(k);
    const region = (Hh - 0.7) - 2.3 - (nxt ? 1.35 : 0);
    const groups = chunk(shown.map(a => numbered(a) ? a : a), W - 2 * MX - 0.4, region, MIN);
    const grp = groups[groups.length - 1];            // keep the newest answer visible
    const base = shown.length - grp.length;
    const s = p.addSlide(); banner(s, L, accent);
    kicker(s, "Answers", accent);
    T(s, (rc.title || "Let's check") + (groups.length > 1 ? " (cont.)" : ""), MX, 1.16, W - 2 * MX, 0.9,
      { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY, valign: "top" });
    T(s, grp.map((a, i) => {
      const idx = base + i;
      const label = numbered(a) ? a : `${idx + 1}.  ${a}`;
      const isNew = idx === k - 1;
      return { text: label, options: { breakLine: true, paraSpaceAfter: 12, color: isNew ? BLUE : GREY, bold: isNew } };
    }), MX + 0.2, 2.3, W - 2 * MX - 0.4, region, { fontFace: BF, fontSize: ANS, valign: "middle" });
    if (nxt) nextStrip(s, `Next question · #${k + 1}`, nxt, accent);
    if (rc.note && k === ans.length && !nxt)
      T(s, rc.note, MX, Hh - 1.15, W - 2 * MX, 0.7, { fontFace: BF, fontSize: MIN, italic: true, color: GREY, valign: "top" });
    footer(s, L);
  }
}

// ---- CLOSERS ----
function agendaItems(lessonN) {
  const plan = DECK_PLAN[lessonN]; if (!plan) return [];
  const deck = DECKS.find(d => d.n === lessonN);
  return plan.order.filter(k => k !== "title" && k !== "exit").map(k => {
    const idx = DECK_KEYMAP[lessonN][k];
    const sd = idx != null && deck ? deck.slides[idx] : null;
    const cfg = plan.activities[k] || {};
    return cfg.title || (sd && (sd.title || sd.kicker)) || k;
  });
}
const takehomeSlide = (p, L, accent, cfg) => darkList(p, L, accent, "TAKE-HOME", cfg.title || "Take-home", cfg.items || []);
function noticeSlide(p, L, accent) {
  const img = path.join(WSA, "notice.png"); if (!fs.existsSync(img)) return;
  const s = p.addSlide();
  T(s, "TAKE-HOME NOTICE · GOES HOME TODAY", MX, 0.4, W - 2 * MX, 0.32,
    { ref: true, fontFace: BF, fontSize: 12, bold: true, color: accent, charSpacing: 2 });
  const { w: iw, h: ih } = require("./imgsize.js")(img); const ar = ih / iw;
  const H2 = 6.0, Wd = H2 / ar, ix = (W - Wd) / 2, iy = 0.95;
  s.addShape("roundRect", { x: ix - 0.08, y: iy - 0.08, w: Wd + 0.16, h: H2 + 0.16, rectRadius: 0.04,
    fill: { color: WHITE }, line: { color: LINE, width: 1 }, shadow: shadow() });
  s.addImage({ path: img, x: ix, y: iy, w: Wd, h: H2 });
  footer(s, L);
}
// NEXT CLASS — follows the TEACHING ORDER, not lesson number + 1.
// ORDER is the live teaching sequence (Sean's Oct 2 2026 reorder).
const ORDER = [1, 2, 3, 4, 5, 6, 7, 10, 11, 8, 9, 12, 13, 14];
function nextClassSlide(p, L, accent) {
  const i = ORDER.indexOf(L.n);
  const nx = i >= 0 && i + 1 < ORDER.length ? ORDER[i + 1] : null;
  if (nx == null) return;
  const items = agendaItems(nx); if (!items.length) return;
  const nl = LESSONS.find(x => x.n === nx);
  darkList(p, L, accent, "NEXT CLASS", `Lesson ${nx}: ${nl ? nl.title : ""}`, items);
}
function agendaSlide(p, L, accent) {
  const s = p.addSlide(); s.background = { color: PALE };
  s.addShape("rect", { x: 0, y: 0, w: W, h: 0.42, fill: { color: accent }, line: { color: accent } });
  T(s, "AGENDA", 0.3, 0, W - 0.6, 0.42, { ref: true, fontFace: BF, fontSize: 12, bold: true, color: WHITE, charSpacing: 3, valign: "middle" });
  T(s, "Take out your agenda", MX, 0.65, W - 2 * MX, 0.8, { fontFace: HF, fontSize: HEAD, bold: true, color: NAVY, valign: "top" });
  const items = [];
  const plan = DECK_PLAN[L.n] || {};
  if (plan.agendaExtra) items.push(...plan.agendaExtra);
  if (L.homework && !/^none/i.test(L.homework)) items.push("Homework: " + L.homework);
  if (plan.takehome) items.push("A notice goes home today — get it signed if needed.");
  items.push("Write down anything due, and any upcoming assignment or test.");
  const region = (Hh - 0.7) - 1.75;
  T(s, items.map(t => ({ text: t, options: { bullet: { code: "2022" }, breakLine: true, paraSpaceAfter: 16 } })),
    MX + 0.35, 1.75, W - 2 * MX - 0.35, region, { fontFace: BF, fontSize: MIN, color: INK, valign: "top" });
  footer(s, L);
}

// ---- BUILD ONE LESSON ----
function build(L) {
  CURRENT = `L${String(L.n).padStart(2, "0")}`;
  const p = new pptxgen();
  p.defineLayout({ name: "WIDE", width: W, height: Hh });
  p.layout = "WIDE";
  const accent = accentFor(L.n);
  const plan = DECK_PLAN[L.n];
  const deck = DECKS.find(d => d.n === L.n);
  const slideByKey = k => { const idx = DECK_KEYMAP[L.n][k]; return idx != null ? deck.slides[idx] : null; };

  planSlide(p, L, accent, plan);
  shapeSlide(p, L, accent, plan);

  for (const key of plan.order) {
    const cfg = plan.activities[key] || {};
    if (plan.handoutKey === key) handoutSlides(p, L, accent);

    if (key === "title") { titleSlide(p, slideByKey("title"), L, accent); continue; }
    if (key === "exit") { exitSlide(p, slideByKey("exit"), L, accent); continue; }
    if (cfg.section) { sectionSlide(p, cfg, L, accent); continue; }

    const sd = slideByKey(key);
    if (sd) (R[sd.kind] || R.plain)(p, sd, L, accent);

    if (cfg.ws) {
      const letters = Array.isArray(cfg.ws) ? cfg.ws : [cfg.ws];
      for (const letter of letters) {
        const howText = cfg.how ? (typeof cfg.how === "object" ? cfg.how[letter] : cfg.how) : undefined;
        const items = sectionWalkthrough(p, L, accent, letter, howText);
        if (cfg.reveal) revealSlides(p, L, accent, letter, plan, items);
      }
    }
  }

  if (plan.takehome) { takehomeSlide(p, L, accent, plan.takehome); noticeSlide(p, L, accent); }
  nextClassSlide(p, L, accent);
  agendaSlide(p, L, accent);

  const name = `${UNIT.code}_U0${UNIT.number}_L${String(L.n).padStart(2, "0")}_Deck_${VERSION}.pptx`;
  return p.writeFile({ fileName: path.join(OUT, name) }).then(() => console.log("wrote", name));
}

(async () => {
  const only = process.argv[5] ? process.argv[5].split(",").map(Number) : [1];
  for (const L of LESSONS) if (only.includes(L.n)) await build(L);
  if (SMALL.length) {
    console.error("\nREADABILITY / DATA CHECK FAILED — " + SMALL.length + " problem(s):");
    SMALL.forEach(x => console.error("  " + x));
    process.exit(1);
  }
  console.log("DECKS DONE — readability check clean (floor " + MIN + " pt)");
})();
