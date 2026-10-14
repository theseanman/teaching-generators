// make_assessments.js — ENG8 U1 tests + answer keys (docx).
//
// v2 (Oct 14 2026) — rebuilt to the worksheet standing orders. What changed and why:
//   * WRITING SPACE is underscore-leader tab stops, never paragraph bottom
//     borders. v1 used borders, which Word merges across consecutive paragraphs.
//   * HANDWRITING CLEARANCE: line 340 + after 360 between rules (0.39in) and
//     before 300 under the prompt (0.35in+). v1 ran 0.04in and 0.125in.
//   * FULL WIDTH 10080 dxa on every box, table, banner and header. v1 was 8760,
//     wasting ~0.9in of the page.
//   * NAME / BLOCK / DATE header on underscore leaders, Date wide enough to
//     write a full date (v1 had no Date field at all).
//   * OBJECTIVE + RSS learning outcomes print at the top of both tests.
//   * WRITING SPACE BY TYPE: short 1, sentence 2, multi 5, paragraph 8+.
//   * PEER MARKING (Sean, Oct 14): a mark box beside every peer-marked item, a
//     marking panel at the end, and Section D of the unit test ring-fenced for
//     Mr. Reid. sec.peer in u1_assess.js decides which.
//   * PRE-HAND-IN CHECK part, tick boxes in two columns, student language.
//   * RUBRIC: full-width criterion blocks, all four levels, on its own page,
//     placed last so duplex printing lands it on the back of the sheet.
const fs = require("fs");
const path = require("path");
const D = require("docx");
const { Document, Packer, Paragraph, TextRun, BorderStyle, ShadingType, WidthType,
        Table, TableRow, TableCell, AlignmentType, TabStopType, LeaderType, PageBreak } = D;
const H = require("./docxhelp.js");
const { UNIT_TEST, PRACTICE_TEST } = require("./u1_assess.js");

const OUT = process.argv[2] || path.join(__dirname, "..", "out");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
const VERSION = process.argv[3] || "v2";
const sectionProps = { page: { size: H.LETTER.size, margin: H.MARGINS } };

// true usable width: Letter 12240 - 1080 - 1080 margins
const FULL = 10080;
const HALF = FULL / 2;

const noB = () => { const n = { style: BorderStyle.NONE }; return { top:n, bottom:n, left:n, right:n, insideHorizontal:n, insideVertical:n }; };
const box = (rows, widths) => new Table({ columnWidths: widths || [FULL], width:{ size:FULL, type:WidthType.DXA }, borders: noB(), rows });
const tab = (color) => new TextRun({ text:"\t", size:22, font:"Calibri", color: color || "9AA7B4" });

// ---- writing space: underscore-leader tab stops only ----
// Word/LibreOffice take max(after_prev, before_next), not the sum, so the pitch
// is line + that max:  line 340 + after 360 = 0.39in rule-to-rule;
// first rule before 300 = 0.35in clear of the prompt above it.
function ruledLines(n, o = {}) {
  const right = o.width || FULL;
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(new Paragraph({
    children: [tab()],
    spacing: { after: o.after ?? 360, before: i === 0 ? (o.before ?? 300) : 360, line: 340 },
    tabStops: [{ type: TabStopType.RIGHT, position: right, leader: LeaderType.UNDERSCORE }],
    indent: o.indent,
  }));
  return arr;
}
const LINES_FOR = { short:1, sentence:2, multi:5, paragraph:8 };

// ---- Name / Block / Date header (Date wide enough for a handwritten date) ----
function nameHeader() {
  const grey = { color: H.C.midGrey, size: 21 };
  const lw = Math.round(FULL * 0.46), rw = FULL - lw;
  const blockLabel = 800, blockW = 950, gap = 260;
  return new Table({ columnWidths:[lw, rw], width:{ size:FULL, type:WidthType.DXA },
    borders: { ...noB(), bottom:{ style:BorderStyle.SINGLE, size:4, color:H.C.line } },
    rows: [new TableRow({ children: [
      new TableCell({ width:{ size:lw, type:WidthType.DXA }, borders:noB(), margins:{ bottom:60 },
        children:[new Paragraph({
          tabStops:[{ type:TabStopType.RIGHT, position: lw - 160, leader:LeaderType.UNDERSCORE }],
          children:[H.run("Name: ", grey), tab()] })] }),
      new TableCell({ width:{ size:rw, type:WidthType.DXA }, borders:noB(), margins:{ bottom:60 },
        children:[new Paragraph({
          tabStops:[
            { type:TabStopType.RIGHT, position: blockLabel + blockW, leader:LeaderType.UNDERSCORE },
            { type:TabStopType.LEFT,  position: blockLabel + blockW + gap },
            { type:TabStopType.RIGHT, position: rw - 160, leader:LeaderType.UNDERSCORE },
          ],
          children:[H.run("Block: ", grey), tab(), new TextRun({ text:"\t", size:21, font:"Calibri" }),
                    H.run("Date: ", grey), tab()] })] }),
    ] })] });
}

// ---- objective + learning outcomes, top of every test ----
function objectiveBox(T) {
  const kids = [
    new Paragraph({ children:[H.run("OBJECTIVE", { bold:true, color:H.C.white, size:18, caps:true })],
      spacing:{ after:60, line:260 } }),
    new Paragraph({ children:[H.run(T.objective, { color:H.C.white, size:21 })], spacing:{ after:140, line:280 } }),
    new Paragraph({ children:[H.run("LEARNING OUTCOMES", { bold:true, color:"BFD4EA", size:18, caps:true })],
      spacing:{ after:60, line:260 } }),
    ...T.outcomes.map(o => new Paragraph({
      children:[H.run("•  ", { color:"BFD4EA", size:21 }), H.run(o, { color:H.C.white, size:21 })],
      spacing:{ after:50, line:272 }, indent:{ left:160, hanging:160 } })),
  ];
  return box([new TableRow({ cantSplit:true, children:[new TableCell({
    width:{ size:FULL, type:WidthType.DXA },
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:H.C.navy },
    margins:{ top:160, bottom:160, left:200, right:200 },
    borders:noB(), children:kids })] })]);
}

// ---- totals / who-marks band ----
function totalsBand(T) {
  const grey = { color:H.C.midGrey, size:21 };
  const kids = [new Paragraph({
    tabStops:[{ type:TabStopType.RIGHT, position: FULL - 440 }],
    children:[
      H.run(`TOTAL: ${T.total} MARKS`, { bold:true, color:H.C.navy, size:22 }),
      new TextRun({ text:"\t", size:21, font:"Calibri" }),
      H.run(T.peerNote || "", grey),
    ], spacing:{ after:60, line:280 } })];
  return box([new TableRow({ children:[new TableCell({
    width:{ size:FULL, type:WidthType.DXA },
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:H.C.paleBlue },
    margins:{ top:120, bottom:120, left:200, right:200 }, borders:noB(), children:kids })] })]);
}

function passageBox(p) {
  const cell = new TableCell({ width:{ size:FULL, type:WidthType.DXA },
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:"FCFBF6" },
    margins:{ top:180, bottom:180, left:220, right:220 },
    borders:{ top:{style:BorderStyle.SINGLE,size:8,color:H.C.navy}, bottom:{style:BorderStyle.SINGLE,size:8,color:H.C.navy},
              left:{style:BorderStyle.SINGLE,size:8,color:H.C.navy}, right:{style:BorderStyle.SINGLE,size:8,color:H.C.navy} },
    children:[ new Paragraph({ children:[H.run(p.title,{ bold:true, color:H.C.navy, size:26 })], spacing:{ after:120 } }),
               new Paragraph({ children:[H.run(p.text,{ size:22 })], spacing:{ line:340 } }) ] });
  return new Table({ columnWidths:[FULL], width:{ size:FULL, type:WidthType.DXA }, borders:noB(),
    rows:[new TableRow({ children:[cell] })] });
}

function sectionHeader(sec) {
  const right = sec.peer === false
    ? `     ·   ${sec.marks} marks   ·   marked by ${sec.markedBy || "Mr. Reid"}`
    : `     ·   ${sec.marks} marks`;
  return new Paragraph({
    children:[ H.run(`Section ${sec.id} — ${sec.title}`, { bold:true, color:H.C.white, size:24 }),
               H.run(right, { bold:true, color:H.C.white, size:22 }) ],
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:H.C.navy },
    spacing:{ before:280, after:140, line:300 }, keepNext:true,
  });
}

// ---- worked demonstration at the head of a section (practice test only) ----
// Built on a throwaway micro-text: shows the complexity required without giving
// away a test answer or costing a mark.
function howToBox(T, secId) {
  if (!T.howTo || !T.howTo[secId]) return [];
  const cell = new TableCell({ width:{ size:FULL, type:WidthType.DXA },
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:"F4F6F9" },
    margins:{ top:140, bottom:140, left:200, right:200 },
    borders:{ top:{style:BorderStyle.SINGLE,size:4,color:H.C.blue}, bottom:{style:BorderStyle.SINGLE,size:4,color:H.C.blue},
              left:{style:BorderStyle.SINGLE,size:12,color:H.C.blue}, right:{style:BorderStyle.SINGLE,size:4,color:H.C.blue} },
    children:[
      new Paragraph({ children:[H.run("HOW TO ANSWER THIS SECTION  (example — not marked)", { bold:true, color:H.C.blue, size:19, caps:true })], spacing:{ after:80, line:260 } }),
      new Paragraph({ children:[H.run(T.howTo.micro, { italics:true, color:H.C.midGrey, size:20 })], spacing:{ after:100, line:280 } }),
      new Paragraph({ children:[H.run(T.howTo[secId], { size:21 })], spacing:{ after:0, line:288 } }),
    ] });
  return [box([new TableRow({ cantSplit:true, children:[cell] })]), H.spacer(140)];
}

function matchTable(match) {
  const rows = [];
  const n = Math.max(match.presented.length, match.key.length);
  const b = { style:BorderStyle.SINGLE, size:4, color:H.C.line };
  rows.push(new TableRow({ tableHeader:true, children:[
    new TableCell({ width:{size:HALF,type:WidthType.DXA}, shading:{type:ShadingType.CLEAR,color:"auto",fill:H.C.navy}, margins:{top:80,bottom:80,left:140,right:140}, children:[new Paragraph({ children:[H.run("Term",{bold:true,color:"FFFFFF",size:21})] })] }),
    new TableCell({ width:{size:HALF,type:WidthType.DXA}, shading:{type:ShadingType.CLEAR,color:"auto",fill:H.C.navy}, margins:{top:80,bottom:80,left:140,right:140}, children:[new Paragraph({ children:[H.run("Meaning",{bold:true,color:"FFFFFF",size:21})] })] }),
  ]}));
  for (let i = 0; i < n; i++) {
    const term = match.key[i] ? `${match.key[i].termNum}. ${match.key[i].term}    ____` : "";
    const def  = match.presented[i] ? `${match.presented[i].letter}. ${match.presented[i].text}` : "";
    const fill = i % 2 ? "F4F6F9" : "FFFFFF";
    rows.push(new TableRow({ cantSplit:true, children:[
      new TableCell({ width:{size:HALF,type:WidthType.DXA}, shading:{type:ShadingType.CLEAR,color:"auto",fill}, margins:{top:140,bottom:140,left:140,right:140}, children:[new Paragraph({ children:[H.run(term,{size:22})], spacing:{line:288} })] }),
      new TableCell({ width:{size:HALF,type:WidthType.DXA}, shading:{type:ShadingType.CLEAR,color:"auto",fill}, margins:{top:140,bottom:140,left:140,right:140}, children:[new Paragraph({ children:[H.run(def,{size:22})], spacing:{line:288} })] }),
    ]}));
  }
  return new Table({ columnWidths:[HALF,HALF], width:{ size:FULL, type:WidthType.DXA },
    borders:{ top:b,bottom:b,left:b,right:b,insideHorizontal:b,insideVertical:b }, rows });
}

// ---- question line, with the peer marker's mark box on the right ----
function questionLine(idx, it, peer) {
  const kids = [ H.run(`${idx}. `, { bold:true, color:H.C.blue, size:22 }), H.run(it.q + "  ", { size:22 }),
                 H.run(`(${it.marks})`, { bold:true, color:H.C.midGrey, size:20 }) ];
  const o = { spacing:{ before:220, after:60, line:288 }, keepNext:true };
  if (peer) {
    kids.push(new TextRun({ text:"\t", size:21, font:"Calibri" }));
    kids.push(H.run(`______ / ${it.marks}`, { bold:true, color:H.C.midGrey, size:21 }));
    o.tabStops = [{ type:TabStopType.RIGHT, position: FULL - 40 }];
  }
  return new Paragraph({ children:kids, ...o });
}

function renderItem(it, idx, sec) {
  const out = [questionLine(idx, it, sec.peer !== false)];
  if (it.type === "match") { out.push(matchTable(it.match)); out.push(H.spacer(120)); return out; }
  if (it.type === "label" || it.type === "sf") {
    it.lines.forEach((s, i) => out.push(new Paragraph({
      children:[ H.run(`${String.fromCharCode(97+i)}) `, { bold:true, size:21, color:H.C.midGrey }),
                 H.run(s + (it.type === "sf" ? "    ______" : ""), { size:22 }) ],
      spacing:{ before:120, after:160, line:300 } })));
    return out;
  }
  if (it.sub) {
    it.sub.forEach((s, i) => {
      out.push(new Paragraph({ children:[ H.run(`${String.fromCharCode(97+i)}) `, { bold:true, size:21, color:H.C.midGrey }), H.run(s, { size:22 }) ],
        spacing:{ before:160, after:40, line:288 }, keepNext:true }));
      out.push(...ruledLines(LINES_FOR.sentence));   // a rewritten sentence gets 2 lines
    });
    return out;
  }
  if (it.lines) out.push(...ruledLines(it.lines));
  return out;
}

// ---- marking panel: the classmate fills this in and signs it ----
function markingPanel(T) {
  const peerSecs = T.sections.filter(s => s.peer !== false);
  const teacherSecs = T.sections.filter(s => s.peer === false);
  const peerTotal = peerSecs.reduce((a, s) => a + s.marks, 0);
  const grey = { color:H.C.midGrey, size:21 };
  const kids = [
    new Paragraph({ children:[H.run("MARKING PANEL", { bold:true, color:H.C.white, size:22, caps:true }),
      H.run("     filled in by the classmate who marks this test", { color:"BFD4EA", size:20 })],
      shading:{ type:ShadingType.CLEAR, color:"auto", fill:H.C.navy }, spacing:{ after:120, line:300 } }),
    new Paragraph({ tabStops:[{ type:TabStopType.RIGHT, position: FULL - 300, leader:LeaderType.UNDERSCORE }],
      children:[H.run("Marked by (your name): ", grey), tab()], spacing:{ after:100, line:290 } }),
  ];
  // section subtotal row
  const cells = peerSecs.map(s => new TableCell({ width:{ size: Math.floor(FULL / (peerSecs.length + teacherSecs.length + 1)), type:WidthType.DXA },
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:"FFFFFF" }, margins:{ top:100, bottom:100, left:120, right:120 },
    children:[new Paragraph({ children:[H.run(`Section ${s.id}`, { bold:true, color:H.C.navy, size:21 })], spacing:{ after:60 } }),
              new Paragraph({ children:[H.run(`______ / ${s.marks}`, { size:22 })] })] }));
  teacherSecs.forEach(s => cells.push(new TableCell({ width:{ size: Math.floor(FULL / (peerSecs.length + teacherSecs.length + 1)), type:WidthType.DXA },
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:"F4F6F9" }, margins:{ top:100, bottom:100, left:120, right:120 },
    children:[new Paragraph({ children:[H.run(`Section ${s.id}`, { bold:true, color:H.C.midGrey, size:21 })], spacing:{ after:60 } }),
              new Paragraph({ children:[H.run(`______ / ${s.marks}`, { color:H.C.midGrey, size:22 })], spacing:{ after:40 } }),
              new Paragraph({ children:[H.run(`${s.markedBy || "Mr. Reid"} marks this`, { italics:true, color:H.C.midGrey, size:18 })] })] })));
  cells.push(new TableCell({ width:{ size: Math.floor(FULL / (peerSecs.length + teacherSecs.length + 1)), type:WidthType.DXA },
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:H.C.paleBlue }, margins:{ top:100, bottom:100, left:120, right:120 },
    children:[new Paragraph({ children:[H.run("TOTAL", { bold:true, color:H.C.navy, size:21 })], spacing:{ after:60 } }),
              new Paragraph({ children:[H.run(`______ / ${T.total}`, { bold:true, size:22 })] })] }));
  const b = { style:BorderStyle.SINGLE, size:4, color:H.C.line };
  kids.push(new Table({ columnWidths: cells.map(() => Math.floor(FULL / cells.length)),
    width:{ size:FULL, type:WidthType.DXA },
    borders:{ top:b,bottom:b,left:b,right:b,insideHorizontal:b,insideVertical:b },
    rows:[new TableRow({ cantSplit:true, children:cells })] }));
  kids.push(H.spacer(60));

  // Section D proficiency + comment — only where a peer marks the writing
  const dSec = T.sections.find(s => s.id === "D");
  if (dSec && dSec.peer !== false) {
    kids.push(new Paragraph({ children:[H.run("Section D proficiency — circle one, using the rubric on the back:", { bold:true, color:H.C.navy, size:21 })], spacing:{ before:0, after:60, line:280 } }));
    kids.push(new Paragraph({ children:[H.run("Emerging          Developing          Proficient          Extending", { size:24 })], alignment:AlignmentType.CENTER, spacing:{ after:120, line:290 } }));
    kids.push(new Paragraph({ children:[H.run("Comment to the writer — write to them, not about them (“You stayed in one moment…”):", { bold:true, color:H.C.navy, size:21 })], spacing:{ after:0, line:288 }, keepNext:true }));
    kids.push(...ruledLines(6));
  } else {
    kids.push(new Paragraph({ children:[H.run("Section D is not marked here. Leave it blank — Mr. Reid marks the writing against the rubric on the back.", { italics:true, color:H.C.midGrey, size:21 })], spacing:{ after:60, line:288 } }));
  }
  // one cantSplit row: the panel can never break across a page
  return [new Table({ columnWidths:[FULL], width:{ size:FULL, type:WidthType.DXA }, borders:noB(),
    rows:[new TableRow({ cantSplit:true, children:[new TableCell({
      width:{ size:FULL, type:WidthType.DXA }, borders:noB(),
      margins:{ top:0, bottom:0, left:0, right:0 }, children:kids })] })] })];
}

// ---- pre-hand-in check, tick boxes, two columns ----
function checkPart(T) {
  const items = T.checks || [];
  const mid = Math.ceil(items.length / 2);
  const col = (list) => list.map(t => new Paragraph({
    children:[ H.run("❑  ", { size:24, color:H.C.blue }), H.run(t, { size:21 }) ],
    spacing:{ before:60, after:120, line:288 }, indent:{ left:260, hanging:260 } }));
  const b = { style:BorderStyle.SINGLE, size:4, color:H.C.line };
  const head = new Paragraph({
    children:[ H.run("Check — before you hand this in", { bold:true, color:H.C.white, size:23 }) ],
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:H.C.blue },
    spacing:{ before:200, after:120, line:300 }, keepNext:true });
  const t = new Table({ columnWidths:[HALF,HALF], width:{ size:FULL, type:WidthType.DXA },
    borders:{ ...noB(), top:b, bottom:b },
    rows:[new TableRow({ cantSplit:true, children:[
      new TableCell({ width:{size:HALF,type:WidthType.DXA}, borders:noB(), margins:{top:140,bottom:140,left:60,right:200}, children: col(items.slice(0, mid)) }),
      new TableCell({ width:{size:HALF,type:WidthType.DXA}, borders:noB(), margins:{top:140,bottom:140,left:200,right:60}, children: col(items.slice(mid)) }),
    ]})] });
  return [head, t];
}

// ---- rubric: full-width criterion blocks, all four levels, own page ----
const LEVELS = ["Emerging", "Developing", "Proficient", "Extending"];
function rubricPage(T, forKey) {
  const R = T.rubric; if (!R) return [];
  const out = [new Paragraph({ children:[new PageBreak()] })];
  out.push(new Paragraph({ children:[H.run(R.title, { bold:true, color:H.C.navy, size:32 })], spacing:{ after:80 } }));
  out.push(new Paragraph({ children:[H.run(forKey ? "Scored on the BC 4-point Proficiency Scale. The same criteria print on the student's test." : R.intro, { italics:true, color:H.C.midGrey, size:21 })], spacing:{ after:200, line:288 } }));
  const labelW = 1900, descW = FULL - labelW;
  const b = { style:BorderStyle.SINGLE, size:4, color:H.C.line };
  R.criteria.forEach((crit, ci) => {
    out.push(new Paragraph({
      children:[ H.run(`${ci + 1}.  ${crit.name}`, { bold:true, color:H.C.white, size:24 }) ],
      shading:{ type:ShadingType.CLEAR, color:"auto", fill:H.C.navy },
      spacing:{ before:200, after:0, line:290 }, keepNext:true }));
    const rows = LEVELS.map((lv, i) => new TableRow({ cantSplit:true, children:[
      new TableCell({ width:{ size:labelW, type:WidthType.DXA },
        shading:{ type:ShadingType.CLEAR, color:"auto", fill: i % 2 ? "E8F0FA" : "F4F6F9" },
        margins:{ top:110, bottom:110, left:140, right:140 },
        children:[new Paragraph({ children:[H.run(lv, { bold:true, color:H.C.navy, size:21 })], spacing:{ line:276 } })] }),
      new TableCell({ width:{ size:descW, type:WidthType.DXA },
        shading:{ type:ShadingType.CLEAR, color:"auto", fill: i % 2 ? "FBFCFE" : "FFFFFF" },
        margins:{ top:110, bottom:110, left:160, right:160 },
        children:[new Paragraph({ children:[H.run(crit.levels[lv], { size:21 })], spacing:{ line:276 } })] }),
    ]}));
    out.push(new Table({ columnWidths:[labelW, descW], width:{ size:FULL, type:WidthType.DXA },
      borders:{ top:b,bottom:b,left:b,right:b,insideHorizontal:b,insideVertical:b }, rows }));
  });
  return out;
}

function testDoc(T) {
  const c = [];
  c.push(new Paragraph({ children:[H.run(`${T.code} · Unit 1 · ${T.label}`, { size:18, color:H.C.midGrey })], spacing:{ after:40 } }));
  c.push(H.h1(T.label));
  c.push(nameHeader());
  c.push(H.spacer(120));
  c.push(totalsBand(T));
  c.push(H.spacer(140));
  c.push(objectiveBox(T));
  c.push(H.spacer(160));
  c.push(H.text(T.instructions, { italics:true, color:H.C.midGrey, size:21 }));
  if (T.passage) { c.push(H.spacer(80)); c.push(passageBox(T.passage)); c.push(H.spacer(160)); }
  T.sections.forEach(sec => {
    c.push(sectionHeader(sec));
    if (sec.intro) c.push(H.text(sec.intro, { italics:true, color:H.C.midGrey, size:21 }));
    c.push(...howToBox(T, sec.id));
    let n = 1; sec.items.forEach(it => c.push(...renderItem(it, n++, sec)));
  });
  c.push(...checkPart(T));
  c.push(H.spacer(140));
  c.push(...markingPanel(T));
  c.push(...rubricPage(T, false));
  return new Document({ numbering:H.NUMBERING, sections:[{ properties:sectionProps, children:c }] });
}

function keyDoc(T, label) {
  const c = [];
  c.push(new Paragraph({ children:[H.run(`${T.code} · Unit 1 · ${label} — ANSWER KEY`, { size:18, color:H.C.midGrey })], spacing:{ after:40 } }));
  c.push(H.h1(`${label} — Answer Key`));
  c.push(H.text(`Total: ${T.total} marks. ${T.peerNote || ""} Writing is scored on the BC 4-point Proficiency Scale (Emerging / Developing / Proficient / Extending).`, { italics:true, color:H.C.midGrey, size:21 }));
  T.sections.forEach(sec => {
    c.push(sectionHeader(sec));
    let n = 1;
    sec.items.forEach(it => {
      c.push(new Paragraph({ children:[ H.run(`${n}. `, { bold:true, color:H.C.blue, size:22 }), H.run(it.q + "  ", { size:22, italics:true, color:H.C.midGrey }), H.run(`(${it.marks})`, { bold:true, color:H.C.midGrey, size:20 }) ],
        spacing:{ before:180, after:60, line:288 }, keepNext:true }));
      if (it.type === "match") {
        const keyStr = it.match.key.map(k => `${k.termNum}–${k.letter}`).join("    ");
        c.push(new Paragraph({ children:[H.run("Key:  ", { bold:true, color:H.C.navy, size:21 }), H.run(keyStr, { size:22 })], spacing:{ after:100, line:288 } }));
      } else {
        c.push(new Paragraph({ children:[H.run("Answer:  ", { bold:true, color:H.C.navy, size:21 }), H.run(it.key || "—", { size:22 })], spacing:{ after:120, line:300 } }));
      }
      n++;
    });
  });
  c.push(...rubricPage(T, true));
  return new Document({ numbering:H.NUMBERING, sections:[{ properties:sectionProps, children:c }] });
}

(async () => {
  const jobs = [
    [testDoc(PRACTICE_TEST), `ENG8_U01_PracticeTest_${VERSION}.docx`],
    [testDoc(UNIT_TEST),     `ENG8_U01_UnitTest_${VERSION}.docx`],
    [keyDoc(UNIT_TEST, "Unit 1 Test"),              `ENG8_U01_UnitTest_AnswerKey_${VERSION}.docx`],
    [keyDoc(PRACTICE_TEST, "Unit 1 Practice Test"), `ENG8_U01_PracticeTest_AnswerKey_${VERSION}.docx`],
  ];
  for (const [doc, name] of jobs) {
    const buf = await Packer.toBuffer(doc);
    fs.writeFileSync(path.join(OUT, name), buf);
    console.log("wrote", name, buf.length);
  }
  console.log("ASSESSMENTS DONE");
})();
