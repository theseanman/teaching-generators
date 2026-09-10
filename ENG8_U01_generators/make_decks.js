// make_decks.js — ENG8 deck generator. pptxgenjs. LAYOUT_WIDE.
// Blue-anchored palette; Cambria headers / Calibri body; numbered-circle motif; no stripes.
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const { DECKS } = require("./u1_decks.js");
const { UNIT } = require("./u1_content.js");
const { WORKSHEETS } = require("./u1_worksheets.js");
const LETTER_RATIO = 8.5/11; // portrait worksheet page w:h

const OUT = process.argv[2] || path.join(__dirname, "..", "out");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// worksheet-preview support: PNG dir + section extraction
const WSPNG = process.env.WSPNG_DIR || path.join(OUT, "wspng");
function wsPagesFor(n){
  if (!fs.existsSync(WSPNG)) return [];
  const tag = "L" + String(n).padStart(2,"0") + "-";
  return fs.readdirSync(WSPNG).filter(f=>f.startsWith(tag) && f.endsWith(".png"))
    .sort((a,b)=> parseInt(a.match(/-(\d+)\.png/)[1]) - parseInt(b.match(/-(\d+)\.png/)[1]))
    .map(f=>path.join(WSPNG,f));
}
function wsSectionsFor(n){
  const w = WORKSHEETS.find(x=>x.n===n); if(!w) return { title:"", sections:[] };
  return { title:w.title, sections:w.blocks.filter(b=>b.kind==="section").map(b=>b.t) };
}

const NAVY="0B2C4D", BLUE="1565C0", ICE="E8F0FA", PALE="F4F7FB", INK="1A2632",
      GREY="5A6B7B", WHITE="FFFFFF", LINE="D3DEEA";
const ACCENTS = { teal:"0E8C7F", amber:"C8860B", violet:"7A52B3", mint:"2E9E6B", coral:"D4573B" };
const CYCLE = ["teal","amber","violet","mint","coral"];
const accentFor = n => ACCENTS[CYCLE[(n-1)%CYCLE.length]];

const HF="Cambria", BF="Calibri"; // header / body fonts
const W=13.33, Hh=7.5, MX=0.6;

function shadow(){ return { type:"outer", color:"8899AA", blur:6, offset:2, angle:90, opacity:0.35 }; }

function numberedCircle(slide, x, y, n, fill){
  slide.addShape("ellipse", { x, y, w:0.62, h:0.62, fill:{color:fill}, line:{color:fill}, shadow:shadow() });
  slide.addText(String(n), { x, y, w:0.62, h:0.62, align:"center", valign:"middle",
    fontFace:HF, fontSize:24, bold:true, color:WHITE, margin:0 });
}

function footer(slide, L){
  slide.addText([
    { text:`${UNIT.code} · Unit ${UNIT.number}`, options:{ color:GREY } },
    { text:"   |   ", options:{ color:LINE } },
    { text:`Lesson ${L.n}: ${L.short}`, options:{ color:GREY } },
  ], { x:MX, y:Hh-0.42, w:W-2*MX, h:0.3, fontFace:BF, fontSize:9, align:"left", margin:0 });
}

function kicker(slide, text, accent){
  slide.addText(text.toUpperCase(), { x:MX, y:0.42, w:W-2*MX, h:0.32, fontFace:BF, fontSize:12,
    bold:true, color:accent, charSpacing:2, align:"left", margin:0 });
}
function title(slide, text, y=0.72){
  slide.addText(text, { x:MX, y, w:W-2*MX, h:0.9, fontFace:HF, fontSize:32, bold:true,
    color:NAVY, align:"left", margin:0, valign:"top" });
}

// ---- slide renderers keyed by kind ----
const R = {};

R.title = (s, sd, L, accent) => {
  s.background = { color: NAVY };
  s.addText(`UNIT ${UNIT.number} · LESSON ${L.n}`, { x:MX, y:1.5, w:W-2*MX, h:0.4,
    fontFace:BF, fontSize:15, bold:true, color:accent, charSpacing:3, margin:0 });
  s.addText(sd.title, { x:MX, y:2.0, w:W-2*MX, h:1.8, fontFace:HF, fontSize:44, bold:true,
    color:WHITE, margin:0, valign:"top" });
  s.addText(sd.sub || "", { x:MX, y:4.2, w:W-2*MX, h:1.4, fontFace:BF, fontSize:18,
    italic:true, color:ICE, margin:0, valign:"top" });
  s.addText([
    { text:"English Language Arts 8", options:{ color:ICE } },
    { text:"   ·   Mr. Reid", options:{ color:GREY } },
  ], { x:MX, y:Hh-0.9, w:W-2*MX, h:0.4, fontFace:BF, fontSize:13, margin:0 });
};


// card list: array of {h, t} rendered as tinted rounded cards stacked
function stackH(n, ch, gap){ return n*ch + (n-1)*gap; }
function cards(s, items, x, y, w, accent, opt={}){
  const gap=opt.gap ?? 0.22, ch=opt.h || 0.95;
  let y0 = y;
  if (opt.centerIn){ const region = opt.centerIn - y; const sh = stackH(items.length, ch, gap); y0 = y + Math.max(0,(region - sh)/2); }
  items.forEach((it,i)=>{
    const cy=y0+i*(ch+gap);
    s.addShape("roundRect", { x, y:cy, w, h:ch, rectRadius:0.08, fill:{color:opt.fill||PALE},
      line:{color:LINE, width:1}, shadow:shadow() });
    if (it.h) s.addText(it.h, { x:x+0.25, y:cy+0.14, w:w-0.5, h:0.32, fontFace:HF, fontSize:16,
      bold:true, color:accent, margin:0, valign:"top" });
    s.addText(it.t, { x:x+0.25, y:cy+(it.h?0.5:0.16), w:w-0.5, h:ch-(it.h?0.62:0.32),
      fontFace:BF, fontSize:15, color:INK, margin:0, valign:"top" });
  });
}

R.plain = (s, sd, L, accent) => { // heading + intro + bullets/cards
  kicker(s, sd.kicker||"", accent);
  s.addText(sd.title, { x:MX, y:0.68, w:W-2*MX, h:0.9, fontFace:HF, fontSize:30, bold:true, color:NAVY, margin:0, valign:"top" });
  let y=1.7;
  if (sd.intro){ s.addText(sd.intro, { x:MX, y, w:W-2*MX, h:0.7, fontFace:BF, fontSize:16, color:GREY, margin:0, italic:true, valign:"top" }); y+=0.8; }
  if (sd.cards){ cards(s, sd.cards, MX, y, W-2*MX, accent, { h: sd.cardH||0.95, centerIn: Hh-0.6 }); }
  else if (sd.bullets){
    const bh = sd.bullets.length*0.55, top=y, region=(Hh-0.6)-top, by=top+Math.max(0,(region-bh)/2);
    s.addText(sd.bullets.map((b)=>({ text:b, options:{ bullet:{code:"2022"}, breakLine:true, paraSpaceAfter:12 } })),
      { x:MX+0.3, y:by, w:W-2*MX-0.3, h:bh, fontFace:BF, fontSize:18, color:INK, margin:0, valign:"top" });
  }
};

R.step = (s, sd, L, accent) => { // numbered-circle heading + two-col or cards
  kicker(s, sd.kicker||"", accent);
  numberedCircle(s, MX, 0.62, sd.step, accent);
  s.addText(sd.title, { x:MX+0.82, y:0.6, w:W-2*MX-0.82, h:0.9, fontFace:HF, fontSize:28, bold:true, color:NAVY, margin:0, valign:"middle" });
  let y=1.7;
  if (sd.intro){ s.addText(sd.intro, { x:MX, y, w:W-2*MX, h:0.6, fontFace:BF, fontSize:16, color:GREY, italic:true, margin:0, valign:"top" }); y+=0.7; }
  if (sd.cards) cards(s, sd.cards, MX, y, W-2*MX, accent, { h: sd.cardH||0.9, centerIn: Hh-0.6 });
  else if (sd.bullets){
    const bh = sd.bullets.length*0.55, top=y, region=(Hh-0.6)-top, by=top+Math.max(0,(region-bh)/2);
    s.addText(sd.bullets.map(b=>({ text:b, options:{ bullet:{code:"2022"}, breakLine:true, paraSpaceAfter:12 } })),
      { x:MX+0.3, y:by, w:W-2*MX-0.3, h:bh, fontFace:BF, fontSize:18, color:INK, margin:0, valign:"top" });
  }
};

R.compare = (s, sd, L, accent) => { // two-panel compare (e.g., telling vs showing)
  kicker(s, sd.kicker||"", accent);
  s.addText(sd.title, { x:MX, y:0.68, w:W-2*MX, h:0.9, fontFace:HF, fontSize:30, bold:true, color:NAVY, margin:0, valign:"top" });
  const y=1.85, colw=(W-2*MX-0.4)/2;
  const panels=[ { ...sd.left, c:GREY, f:"F1F3F6" }, { ...sd.right, c:accent, f:ICE } ];
  panels.forEach((p,i)=>{
    const x=MX+i*(colw+0.4);
    s.addShape("roundRect", { x, y, w:colw, h:Hh-y-0.65, rectRadius:0.1, fill:{color:p.f}, line:{color:LINE,width:1}, shadow:shadow() });
    s.addText(p.h, { x:x+0.3, y:y+0.22, w:colw-0.6, h:0.5, fontFace:HF, fontSize:20, bold:true, color:p.c, margin:0 });
    s.addText(p.items.map(t=>({ text:t, options:{ bullet:{code:"2022"}, breakLine:true, paraSpaceAfter:8 } })),
      { x:x+0.3, y:y+0.85, w:colw-0.6, h:Hh-y-1.7, fontFace:BF, fontSize:15, color:INK, margin:0, valign:"top" });
  });
};

R.exit = (s, sd, L, accent) => {
  s.background = { color: NAVY };
  s.addText("EXIT TICKET", { x:MX, y:0.9, w:W-2*MX, h:0.4, fontFace:BF, fontSize:14, bold:true, color:accent, charSpacing:3, margin:0 });
  s.addText(sd.title || "Before you go", { x:MX, y:1.35, w:W-2*MX, h:0.9, fontFace:HF, fontSize:32, bold:true, color:WHITE, margin:0, valign:"top" });
  const items = sd.items || [];
  const bh = items.length*0.7, top=2.5, region=(Hh-0.7)-top, by=top+Math.max(0,(region-bh)/2);
  s.addText(items.map((t)=>({ text:t, options:{ bullet:{code:"2022"}, breakLine:true, paraSpaceAfter:16, color:ICE } })),
    { x:MX+0.3, y:by, w:W-2*MX-0.3, h:bh, fontFace:BF, fontSize:20, color:ICE, margin:0, valign:"top" });
};

function wsDivider(p, L, accent){
  const s = p.addSlide();
  s.background = { color: NAVY };
  const { title, sections } = wsSectionsFor(L.n);
  s.addText("YOUR WORKSHEET", { x:MX, y:0.85, w:W-2*MX, h:0.4, fontFace:BF, fontSize:14, bold:true, color:accent, charSpacing:3, margin:0 });
  s.addText(title || "Let's look at it together", { x:MX, y:1.3, w:W-2*MX, h:1.0, fontFace:HF, fontSize:32, bold:true, color:WHITE, margin:0, valign:"top" });
  s.addText("We'll walk through it together before you get your copy. Here's what's on it:",
    { x:MX, y:2.35, w:W-2*MX, h:0.5, fontFace:BF, fontSize:16, italic:true, color:ICE, margin:0, valign:"top" });
  if (sections.length){
    const bh = sections.length*0.55, top=3.05, region=(Hh-0.7)-top, by=top+Math.max(0,(region-bh)/2);
    s.addText(sections.map(t=>({ text:t, options:{ bullet:{code:"2022"}, breakLine:true, paraSpaceAfter:10, color:ICE } })),
      { x:MX+0.3, y:by, w:W-2*MX-0.3, h:bh, fontFace:BF, fontSize:18, color:ICE, margin:0, valign:"top" });
  }
  return s;
}
function wsPageSlide(p, L, accent, imgPath, idx, total){
  const s = p.addSlide();
  s.addText(`WORKSHEET · PAGE ${idx} OF ${total}`, { x:MX, y:0.4, w:W-2*MX, h:0.32, fontFace:BF, fontSize:12, bold:true, color:accent, charSpacing:2, margin:0 });
  // centered portrait page with a soft frame
  const ih = 6.15, iw = ih*LETTER_RATIO;
  const ix = (W - iw)/2, iy = 0.95;
  s.addShape("roundRect", { x:ix-0.08, y:iy-0.08, w:iw+0.16, h:ih+0.16, rectRadius:0.04, fill:{color:WHITE}, line:{color:LINE,width:1}, shadow:shadow() });
  s.addImage({ path: imgPath, x:ix, y:iy, w:iw, h:ih });
  footer(s, L);
  return s;
}

async function build(L){
  const p = new pptxgen();
  p.defineLayout({ name:"WIDE", width:W, height:Hh });
  p.layout = "WIDE";
  const accent = accentFor(L.n);
  L.slides.forEach(sd=>{
    const s = p.addSlide();
    (R[sd.kind] || R.plain)(s, sd, L, accent);
    if (sd.kind!=="title" && sd.kind!=="exit") footer(s, L);
  });
  // worksheet-preview slides (standing rule)
  const pages = wsPagesFor(L.n);
  if (pages.length){
    wsDivider(p, L, accent);
    pages.forEach((img,i)=> wsPageSlide(p, L, accent, img, i+1, pages.length));
  }
  const name = `${UNIT.code}_U0${UNIT.number}_L${String(L.n).padStart(2,"0")}_Deck_v1.pptx`;
  await p.writeFile({ fileName: path.join(OUT, name) });
  console.log("wrote", name);
}

(async()=>{
  const only = process.argv[3] ? process.argv[3].split(",").map(Number) : null;
  for (const L of DECKS){ if(!only || only.includes(L.n)) await build(L); }
  console.log("DECKS DONE");
})();
