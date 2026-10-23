// ELL 3 Unit 2 — deck generator. 11 slides per lesson.
// BANNER BUILD (Sep 2026): every slide except the title carries a top banner
// holding the lesson objective, the learning standard, and the three core
// competency chips. Banner data comes from lesson.banner:
//   banner: { obj: "I can …", std: "…", comp: ["COM","PS"] }
const pptxgen = require("pptxgenjs");
const { UNIT, LESSONS, ACCENTS } = require("./lessons");
const { autoSize, stackStep } = require("./layout");

const NAVY = "0B2C4D";
const BLUE = "1565C0";
const PALE = "EAF1F8";
const PALER = "F5F9FD";
const INK = "16232E";
const GREY = "5A6672";
const W = 10, H = 5.625;

// Output filename version tag. Override per run: node make_decks.js <outDir> v3
const VERSION = process.argv[3] || "v2";

// ---- BANNER GEOMETRY ----
// 0.66in on a 5.625in slide = the same 12% proportion as the approved mockup.
const BAN_H = 0.66;
const BAN_DARK = "12395F";     // banner fill on navy slides, so it stays visible
const BAN_LABEL = "85B7EB";    // "OBJECTIVE" micro-label
const BAN_STD = "B5D4F4";      // standard line
const CHIP_D = 0.30;
const CHIP_Y = 0.18;
const CHIP_X = [8.42, 8.86, 9.30];

// Core competencies. Lit colour per competency; dimmed is one flat treatment.
const COMPS = [
  { key: "COM", lit: "1565C0" },
  { key: "TH",  lit: "C77800" },
  { key: "PS",  lit: "1D9E75" },
];
const CHIP_DIM_FILL = "12395F";
const CHIP_DIM_TEXT = "6C90B0";

// Placeholder when a lesson has no banner data yet. Deliberately visible:
// a missing objective must show on the slide, not fail silently to blank.
const NO_OBJ = "\u2014 objective not set \u2014";
const NO_STD = "\u2014 standard not set \u2014";

function bannerData(lesson) {
  const b = lesson.banner || {};
  return {
    obj: b.obj || NO_OBJ,
    std: b.std || NO_STD,
    comp: Array.isArray(b.comp) ? b.comp : [],
  };
}

// Draws the banner across the top of a slide.
// onDark = true for the navy full-bleed slides (exit ticket).
function banner(s, lesson, accent, onDark) {
  const d = bannerData(lesson);
  s.addShape("rect", {
    x: 0, y: 0, w: W, h: BAN_H,
    fill: { color: onDark ? BAN_DARK : NAVY }, line: { width: 0 },
  });
  s.addShape("rect", {
    x: 0, y: 0, w: 0.09, h: BAN_H,
    fill: { color: accent }, line: { width: 0 },
  });
  s.addText("OBJECTIVE", {
    x: 0.32, y: 0.05, w: 3.0, h: 0.16,
    fontSize: 7.5, bold: true, color: BAN_LABEL, charSpacing: 1.5, margin: 0, valign: "middle",
  });
  s.addText(d.obj, {
    x: 0.32, y: 0.20, w: 7.9, h: 0.24,
    fontSize: 12, bold: true, color: "FFFFFF", margin: 0, valign: "middle", fit: "shrink",
  });
  s.addText(d.std, {
    x: 0.32, y: 0.44, w: 7.9, h: 0.18,
    fontSize: 8.5, color: BAN_STD, margin: 0, valign: "middle", fit: "shrink",
  });
  COMPS.forEach((c, i) => {
    const on = d.comp.includes(c.key);
    s.addShape("ellipse", {
      x: CHIP_X[i], y: CHIP_Y, w: CHIP_D, h: CHIP_D,
      fill: { color: on ? c.lit : CHIP_DIM_FILL },
      line: on ? { color: c.lit, width: 0 } : { color: "2C5A85", width: 0.75 },
    });
    s.addText(c.key, {
      x: CHIP_X[i], y: CHIP_Y, w: CHIP_D, h: CHIP_D,
      fontSize: 7.5, bold: true, color: on ? "FFFFFF" : CHIP_DIM_TEXT,
      align: "center", valign: "middle", margin: 0,
    });
  });
}

// Footer carries what used to sit at the top of the slide.
function footer(s, lesson, label) {
  s.addText(`${UNIT.course} \u00b7 Unit ${UNIT.num} \u00b7 Lesson ${lesson.n}`, {
    x: 0.5, y: 5.20, w: 5.0, h: 0.22, fontSize: 9, color: GREY, margin: 0, valign: "middle",
  });
  s.addText(label, {
    x: 4.5, y: 5.20, w: 5.0, h: 0.22, fontSize: 9, color: GREY, bold: true,
    align: "right", margin: 0, valign: "middle",
  });
}

function base(pres, accent, lesson, label) {
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  banner(s, lesson, accent, false);
  footer(s, lesson, label);
  return s;
}

function heading(s, text, accent) {
  s.addText(text, {
    x: 0.5, y: 0.72, w: 9.0, h: 0.56, fontSize: 24, bold: true, color: NAVY, margin: 0, valign: "top",
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

  // 1 — title (no banner by design)
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
    const prStep = stackStep(items.length, 1.78, 0.56, 0.60, 5.10);
    items.forEach((it, i) => {
      const y = 1.78 + i * prStep;
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
    s.addText("Write this on your worksheet, Part " + (lesson.ytPart || "C") + ".", {
      x: 0.5, y: 3.45, w: 9.0, h: 0.4, fontSize: 13, color: GREY, italic: true, margin: 0,
    });
    s.addNotes("Independent writing. Give a firm time limit.");
  }

  // 11 — exit ticket (navy full-bleed; banner in dark variant, no footer)
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    banner(s, lesson, accent, true);
    s.addText("EXIT TICKET", { x: 0.7, y: 0.88, w: 8.6, h: 0.32, fontSize: 13, color: accent, bold: true, charSpacing: 2, margin: 0 });
    s.addText("Before you leave", { x: 0.7, y: 1.24, w: 8.6, h: 0.6, fontSize: 32, bold: true, color: "FFFFFF", margin: 0 });
    lesson.exit.forEach((q, i) => {
      const y = 2.25 + i * 1.15;
      s.addShape("roundRect", { x: 0.7, y, w: 8.6, h: 0.95, fill: { color: "12395F" }, line: { color: "1D4E7A", width: 1 }, rectRadius: 0.06 });
      s.addText(String(i + 1), { x: 0.95, y, w: 0.4, h: 0.95, fontSize: 15, bold: true, color: accent, valign: "middle", margin: 0 });
      s.addText(q, { x: 1.42, y, w: 7.6, h: 0.95, fontSize: 15, color: "FFFFFF", valign: "middle", margin: 0 });
    });
    s.addNotes("Collect on paper or hands-up check.");
  }

  return pres.writeFile({ fileName: outPath });
}

(async () => {
  const path = require("path");
  const outDir = process.argv[2] || "/mnt/user-data/outputs/ELL3_Unit02";
  require("fs").mkdirSync(outDir, { recursive: true });
  const missing = LESSONS.filter((L) => !L.banner).map((L) => L.n);
  if (missing.length) {
    console.log(`WARNING: no banner data for lesson(s) ${missing.join(", ")} — placeholder text will print on those decks.`);
  }
  for (const lesson of LESSONS) {
    const accent = ACCENTS[lesson.n - 1];
    const nn = String(lesson.n).padStart(2, "0");
    const file = path.join(outDir, `${UNIT.course}_${UNIT.code}_Deck_L${nn}_${lesson.slug}_${VERSION}.pptx`);
    await buildLesson(lesson, accent, file);
    console.log("deck:", path.basename(file));
  }
})();
