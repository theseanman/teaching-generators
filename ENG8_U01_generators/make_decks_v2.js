// make_decks_v2.js — ENG8 deck generator with the Sep-9 standing orders baked in.
// Reads DECKS + DECK_PLAN + DECK_KEYMAP from u1_decks.js, banner data from
// u1_content.js, and pre-rasterized worksheet assets from wsassets/.
// Produces the v9 structure automatically:
//   plan · shape · [hand-out reminder before first sheet use] · interleaved
//   activity→section→reveal · section/heading slides · fill-open-space sizing.
const fs=require("fs"), path=require("path");
const pptxgen=require("pptxgenjs");
const { DECKS, DECK_PLAN, DECK_KEYMAP } = require("./u1_decks.js");
const { UNIT, LESSONS } = require("./u1_content.js");
const { WORKSHEETS } = require("./u1_worksheets.js");

const OUT = process.argv[2] || path.join(__dirname,"out");
const WSA = process.argv[3] || path.join(__dirname,"wsassets");
const VERSION = process.argv[4] || "v10";
if(!fs.existsSync(OUT)) fs.mkdirSync(OUT,{recursive:true});

// ---- palette / geometry (matched to the approved v9 deck) ----
const NAVY="0B2C4D",BLUE="1565C0",ICE="E8F0FA",PALE="F4F7FB",INK="1A2632",
      GREY="5A6B7B",WHITE="FFFFFF",LINE="D3DEEA";
const ACCENTS={teal:"0E8C7F",amber:"C8860B",violet:"7A52B3",mint:"2E9E6B",coral:"D4573B"};
const CYCLE=["teal","amber","violet","mint","coral"];
const accentFor=n=>ACCENTS[CYCLE[(n-1)%CYCLE.length]];
const HF="Cambria", BF="Calibri";
const W=13.33, Hh=7.5, MX=0.6;
const LETTER_RATIO=8.5/11;
const shadow=()=>({type:"outer",color:"8899AA",blur:6,offset:2,angle:90,opacity:0.35});

// ---- worksheet assets ----
const pagePngs=(n)=>{const tag=`L${String(n).padStart(2,"0")}-page-`;
  return fs.existsSync(WSA)?fs.readdirSync(WSA).filter(f=>f.startsWith(tag)&&f.endsWith(".png"))
    .sort((a,b)=>parseInt(a.match(/-(\d+)\.png/)[1])-parseInt(b.match(/-(\d+)\.png/)[1]))
    .map(f=>path.join(WSA,f)):[];};
const partPng=(n,letter)=>{const p=path.join(WSA,`L${String(n).padStart(2,"0")}-part${letter}.png`);
  return fs.existsSync(p)?p:null;};
const wsSectionsFor=(n)=>{const w=WORKSHEETS.find(x=>x.n===n);
  return w?{title:w.title,sections:w.blocks.filter(b=>b.kind==="section").map(b=>b.t)}:{title:"",sections:[]};};
const partHowTo={ // one-line "how to complete it" per Part (L01); extend per lesson as needed
  A:"Get up and move. Ask classmates the questions; when someone matches a square, write their name. A different name in every square — you'll have to talk to a lot of people. This is the icebreaker, so make it loud and friendly.",
  B:"First, read the baby-shoes six-word story and write a short paragraph about what might have happened — then share it. After that, write your OWN six-word story: one word per box, every word earning its place.",
  C:"Pick ONE small moment — seconds or minutes, not a whole day. In the box, jot what you could see, hear, and feel. Don't write the story yet; just capture the moment you might tell.",
};

// ---- text autofit ----
function fitPt(lines,w,h,maxPt,minPt,ls=1.25){
  for(let pt=maxPt;pt>=minPt;pt-=1){
    const cpl=Math.max(1,Math.floor((w-0.2)*72/(pt*0.5)));
    const n=lines.reduce((a,l)=>a+Math.max(1,Math.ceil(String(l).length/cpl)),0);
    if(n*pt*ls/72+0.04<=h) return pt;
  }
  return minPt;
}

// ---- BANNER (rule: every content slide; not title/plan/shape/reveal-dark) ----
function banner(s,L,accent){
  s.addShape("rect",{x:0,y:0,w:W,h:0.72,fill:{color:NAVY},line:{color:NAVY}});
  s.addShape("rect",{x:0,y:0,w:0.16,h:0.72,fill:{color:accent},line:{color:accent}});
  s.addText("OBJECTIVE",{x:0.32,y:0.06,w:9.4,h:0.2,fontFace:BF,fontSize:10,bold:true,color:"9DC3E6",charSpacing:2,margin:0});
  s.addText(L.objBanner||L.objective||"— objective not set —",
    {x:0.32,y:0.24,w:10.1,h:0.44,fontFace:BF,fontSize:11,color:ICE,margin:0,valign:"top"});
  // competency chips
  const comps=L.comp||["COM","TH","PS"];
  const lit=new Set(L.compLit||["COM","TH","PS"]);
  ["COM","TH","PS"].forEach((c,i)=>{
    const on=lit.has(c);
    const x=10.57+i*0.72;
    s.addShape("roundRect",{x,y:0.21,w:0.6,h:0.3,rectRadius:0.06,
      fill:{color:on?accent:"20364A"},line:{color:on?accent:"33475B",width:1}});
    s.addText(c,{x,y:0.21,w:0.6,h:0.3,align:"center",valign:"middle",fontFace:BF,fontSize:11,bold:true,
      color:on?WHITE:"5E7285",margin:0});
  });
}
function footer(s,L){
  s.addText([{text:`${UNIT.code} · Unit ${UNIT.number}`,options:{color:GREY}},
    {text:"   |   ",options:{color:LINE}},
    {text:`Lesson ${L.n}: ${L.short||L.title}`,options:{color:GREY}}],
    {x:MX,y:Hh-0.42,w:W-2*MX,h:0.3,fontFace:BF,fontSize:9,align:"left",margin:0});
}

// ---- CONTENT SLIDE renderers (banner + heading + cards/bullets/compare) ----
// rule 6: fill open space — cards/type scale up when few; centered vertical region.
function contentHead(s,sd,accent){
  s.addText((sd.kicker||"").toUpperCase(),{x:MX,y:0.9,w:W-2*MX,h:0.28,fontFace:BF,fontSize:13,bold:true,color:accent,charSpacing:2,margin:0});
  s.addText(sd.title||"",{x:MX,y:1.16,w:W-2*MX,h:0.8,fontFace:HF,fontSize:30,bold:true,color:NAVY,margin:0,valign:"top"});
  let y=2.15;
  if(sd.intro){s.addText(sd.intro,{x:MX,y,w:W-2*MX,h:0.7,fontFace:BF,fontSize:16,italic:true,color:GREY,margin:0,valign:"top"});y+=0.85;}
  return y;
}
function cards(s,items,y,accent,opt={}){
  const n=items.length, gap=0.24;
  // fill space: card height grows to use the region between y and footer
  const region=(Hh-0.7)-y;
  let ch=opt.h||Math.min(1.45,Math.max(0.95,(region-(n-1)*gap)/n));
  const stackH=n*ch+(n-1)*gap;
  let y0=y+Math.max(0,(region-stackH)/2);
  items.forEach((it,i)=>{
    const cy=y0+i*(ch+gap);
    s.addShape("roundRect",{x:MX,y:cy,w:W-2*MX,h:ch,rectRadius:0.08,fill:{color:ICE},line:{color:LINE,width:1},shadow:shadow()});
    if(it.h) s.addText(it.h,{x:MX+0.3,y:cy+0.14,w:W-2*MX-0.6,h:0.34,fontFace:HF,fontSize:16,bold:true,color:accent,margin:0,valign:"top"});
    s.addText(it.t,{x:MX+0.3,y:cy+(it.h?0.5:0.16),w:W-2*MX-0.6,h:ch-(it.h?0.62:0.32),
      fontFace:BF,fontSize:fitPt([it.t],W-2*MX-0.6,ch-(it.h?0.62:0.32),17,13),color:INK,margin:0,valign:"top"});
  });
}
const R={};
R.plain=(s,sd,L,accent)=>{banner(s,L,accent);const y=contentHead(s,sd,accent);
  if(sd.cards)cards(s,sd.cards,y,accent);
  else if(sd.bullets){const region=(Hh-0.7)-y;const fs=fitPt(sd.bullets,W-2*MX-0.3,region,22,15);
    s.addText(sd.bullets.map(b=>({text:b,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:14}})),
      {x:MX+0.3,y:y+0.1,w:W-2*MX-0.3,h:region,fontFace:BF,fontSize:fs,color:INK,margin:0,valign:"top"});}
  footer(s,L);};
R.step=R.plain;
R.compare=(s,sd,L,accent)=>{banner(s,L,accent);
  s.addText((sd.kicker||"").toUpperCase(),{x:MX,y:0.9,w:W-2*MX,h:0.28,fontFace:BF,fontSize:13,bold:true,color:accent,charSpacing:2,margin:0});
  s.addText(sd.title||"",{x:MX,y:1.16,w:W-2*MX,h:0.8,fontFace:HF,fontSize:30,bold:true,color:NAVY,margin:0,valign:"top"});
  const y=2.2,colw=(W-2*MX-0.4)/2;
  [{...sd.left,c:GREY,f:"F1F3F6"},{...sd.right,c:accent,f:ICE}].forEach((p,i)=>{
    const x=MX+i*(colw+0.4);
    s.addShape("roundRect",{x,y,w:colw,h:Hh-y-0.7,rectRadius:0.1,fill:{color:p.f},line:{color:LINE,width:1},shadow:shadow()});
    s.addText(p.h,{x:x+0.3,y:y+0.22,w:colw-0.6,h:0.5,fontFace:HF,fontSize:22,bold:true,color:p.c,margin:0});
    s.addText(p.items.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:10}})),
      {x:x+0.3,y:y+0.9,w:colw-0.6,h:Hh-y-1.8,fontFace:BF,fontSize:16,color:INK,margin:0,valign:"top"});});
  footer(s,L);};

// ---- TITLE / HOOK (dark, no banner) ----
function titleSlide(p,sd,L,accent){
  const s=p.addSlide();s.background={color:NAVY};
  s.addText(`UNIT ${UNIT.number} · LESSON ${L.n}`,{x:MX,y:1.5,w:W-2*MX,h:0.4,fontFace:BF,fontSize:15,bold:true,color:accent,charSpacing:3,margin:0});
  s.addText(sd.title,{x:MX,y:2.0,w:W-2*MX,h:1.8,fontFace:HF,fontSize:44,bold:true,color:WHITE,margin:0,valign:"top"});
  s.addText(sd.sub||"",{x:MX,y:4.2,w:W-2*MX,h:1.4,fontFace:BF,fontSize:18,italic:true,color:ICE,margin:0,valign:"top"});
  s.addText([{text:"English Language Arts 8",options:{color:ICE}},{text:"   ·   Mr. Reid",options:{color:GREY}}],
    {x:MX,y:Hh-0.9,w:W-2*MX,h:0.4,fontFace:BF,fontSize:13,margin:0});
}

// ---- SECTION / HEADING slide (dark; optional image; rule 3 + rule 7) ----
function sectionSlide(p,cfg,L,accent){
  const s=p.addSlide();s.background={color:NAVY};
  s.addText((cfg.kicker||"SECTION").toUpperCase(),{x:MX,y:0.9,w:W-2*MX,h:0.4,fontFace:BF,fontSize:14,bold:true,color:accent,charSpacing:3,margin:0});
  s.addText(cfg.title||"",{x:MX,y:1.35,w:W-2*MX,h:0.9,fontFace:HF,fontSize:32,bold:true,color:WHITE,margin:0,valign:"top"});
  const hasImg=cfg.image&&fs.existsSync(path.join(__dirname,cfg.image));
  const bodyW=hasImg?7.0:(W-2*MX-0.3);
  const items=cfg.items||[];
  const region=(Hh-0.7)-2.5;
  const fsz=fitPt(items,bodyW-0.3,region,22,16);
  s.addText(items.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:18,color:ICE}})),
    {x:MX+0.3,y:2.5,w:bodyW-0.3,h:region,fontFace:BF,fontSize:fsz,color:ICE,margin:0,valign:"top"});
  if(hasImg){
    const sizeOf=require("./imgsize.js");
    const {w:iw,h:ih}=sizeOf(path.join(__dirname,cfg.image));
    const ar=ih/iw, IW=4.7, IH=IW*ar;
    s.addImage({path:path.join(__dirname,cfg.image),x:W-MX-IW,y:2.5,w:IW,h:IH});
  }
}

// ---- EXIT (dark) ----
function exitSlide(p,sd,L,accent){
  const s=p.addSlide();s.background={color:NAVY};
  s.addText("EXIT TICKET",{x:MX,y:0.9,w:W-2*MX,h:0.4,fontFace:BF,fontSize:14,bold:true,color:accent,charSpacing:3,margin:0});
  s.addText(sd.title||"Before you go",{x:MX,y:1.35,w:W-2*MX,h:0.9,fontFace:HF,fontSize:32,bold:true,color:WHITE,margin:0,valign:"top"});
  const items=sd.items||[];const region=(Hh-0.7)-2.5;
  s.addText(items.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:18,color:ICE}})),
    {x:MX+0.3,y:2.5,w:W-2*MX-0.3,h:region,fontFace:BF,fontSize:fitPt(items,W-2*MX-0.3,region,22,16),color:ICE,margin:0,valign:"top"});
}

// ---- PLAN + SHAPE (teacher + student agenda) ----
// Suggested 80-min split across N teaching steps (first=warm-up, last=exit are shorter).
function timeSplit(n){
  if(n<=1) return [80];
  const exit=Math.max(5,Math.round(80*0.08));
  const warm=10;
  const mid=80-warm-exit;
  const midN=n-2;
  const per=midN>0?Math.round(mid/midN):0;
  const arr=[warm];
  for(let i=0;i<midN;i++) arr.push(per);
  arr.push(exit);
  // fix rounding drift to sum 80
  let d=80-arr.reduce((a,x)=>a+x,0);
  arr[1]=(arr[1]||arr[0])+d;
  return arr;
}
function planSlide(p,L,accent,plan){
  const seq=L.sequence||[];
  const times=timeSplit(seq.length);
  const comp=L.comp||["COM","TH","PS"], lit=new Set(L.compLit||["COM","TH","PS"]);
  // header helper reused on both plan slides
  function header(s,part){
    s.background={color:PALE};
    s.addShape("rect",{x:0,y:0,w:W,h:0.42,fill:{color:NAVY},line:{color:NAVY}});
    s.addText("LESSON PLAN  ·  TEACHER SLIDE  ·  SKIP WHEN PRESENTING",{x:0.3,y:0,w:W-2.6,h:0.42,fontFace:BF,fontSize:11,bold:true,color:"9DC3E6",charSpacing:2,margin:0,valign:"middle"});
    // competency chips top-right
    ["COM","TH","PS"].forEach((c,i)=>{const on=lit.has(c);const x=W-2.3+i*0.72;
      s.addShape("roundRect",{x,y:0.06,w:0.6,h:0.3,rectRadius:0.06,fill:{color:on?accent:"20364A"},line:{color:on?accent:"33475B",width:1}});
      s.addText(c,{x,y:0.06,w:0.6,h:0.3,align:"center",valign:"middle",fontFace:BF,fontSize:11,bold:true,color:on?WHITE:"5E7285",margin:0});});
    s.addText(`${UNIT.code} — Unit ${UNIT.number} — Lesson ${L.n}: ${L.title} — 80 minutes${part?`  (${part})`:""}`,
      {x:0.5,y:0.5,w:W-1,h:0.36,fontFace:HF,fontSize:15,bold:true,color:NAVY,margin:0,valign:"middle"});
  }
  // ---- PLAN SLIDE 1: objective + standards + timed sequence ----
  const s1=p.addSlide(); header(s1,"1 of 2");
  s1.addText([{text:"Objective  ",options:{bold:true,color:BLUE}},{text:L.objective||""}],
    {x:0.5,y:0.94,w:W-1,h:0.5,fontFace:BF,fontSize:11.5,color:INK,margin:0,valign:"top"});
  s1.addText([{text:"Standards  ",options:{bold:true,color:BLUE}},{text:L.standards||""}],
    {x:0.5,y:1.42,w:W-1,h:0.5,fontFace:BF,fontSize:10.5,color:GREY,margin:0,valign:"top"});
  const top=2.0, avail=Hh-top-0.35, step=Math.min(0.9,avail/Math.max(seq.length,1));
  const accs=["00897B","43A047","F9A825","E8604C","6A4FB3"];
  seq.forEach((txt,i)=>{
    const y=top+i*step, ac=accs[i%5];
    s1.addShape("roundRect",{x:0.5,y:y+0.04,w:0.78,h:step-0.12,rectRadius:0.06,fill:{color:ac},line:{color:ac}});
    s1.addText(`${times[i]||""}\nmin`,{x:0.5,y:y+0.04,w:0.78,h:step-0.12,align:"center",valign:"middle",fontFace:BF,fontSize:10,bold:true,color:WHITE,margin:0,lineSpacing:11});
    s1.addText(txt,{x:1.45,y,w:W-1.95,h:step,fontFace:BF,fontSize:fitPt([txt],W-1.95,step-0.04,11,8),color:INK,margin:0,valign:"middle"});
  });
  s1.addText("Suggested timing — adjust to your block.",{x:0.5,y:Hh-0.32,w:W-1,h:0.24,fontFace:BF,fontSize:9,italic:true,color:GREY,margin:0});
  // ---- PLAN SLIDE 2: materials, differentiation, assessment, homework ----
  const s2=p.addSlide(); header(s2,"2 of 2");
  let y=1.0;
  function block(label,lines,col){
    s2.addText(label,{x:0.5,y,w:W-1,h:0.3,fontFace:BF,fontSize:12,bold:true,color:col,charSpacing:1,margin:0});
    y+=0.34;
    const arr=Array.isArray(lines)?lines:[lines];
    s2.addText(arr.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:6}})),
      {x:0.7,y,w:W-1.4,h:0.3+arr.length*0.34,fontFace:BF,fontSize:12,color:INK,margin:0,valign:"top"});
    y+=arr.reduce((a,t)=>a+Math.max(0.34,Math.ceil(t.length/120)*0.3),0)+0.18;
  }
  block("MATERIALS",L.materials||[],accent);
  const d=L.diff||{};
  block("DIFFERENTIATION",[`Support — ${d.support||""}`,`Extension — ${d.extension||""}`],"43A047");
  block("ASSESSMENT",L.assessment||"—","F9A825");
  block("HOMEWORK",L.homework||"—","E8604C");
}
function shapeSlide(p,L,accent,plan){
  const s=p.addSlide();s.background={color:PALE};
  s.addShape("rect",{x:0,y:0,w:W,h:0.42,fill:{color:accent},line:{color:accent}});
  s.addText("SHAPE OF THE DAY",{x:0.3,y:0,w:W-0.6,h:0.42,fontFace:BF,fontSize:12,bold:true,color:WHITE,charSpacing:3,margin:0,valign:"middle"});
  s.addText("Today",{x:MX,y:0.6,w:W-2*MX,h:0.6,fontFace:HF,fontSize:30,bold:true,color:NAVY,margin:0});
  // student agenda = the non-plan-only activities in order, with bracketed activity types
  const deck=DECKS.find(d=>d.n===L.n);
  const typeFor=(sd,cfg,key)=>{
    if(cfg.section) return "class activity";
    const k=((sd&&(sd.kicker||""))+" "+(sd&&sd.title||"")).toLowerCase();
    if(key==="exit"||/exit/.test(k)) return "exit ticket";
    if(cfg.ws) return "worksheet";
    if(/warm|find someone|icebreaker/.test(k)) return "warm-up";
    if(/watch me|model/.test(k)) return "teacher model";
    if(/interview|partner|pair/.test(k)) return "partner work";
    if(/share|discuss|protocol|showcase/.test(k)) return "class discussion";
    if(/rehearse|practice|draft|write|plan|build|revise|edit|your turn/.test(k)) return "independent work";
    if(/compare|vs\.?/.test(k)) return "class discussion";
    return "instruction";
  };
  const agenda=plan.order.filter(k=>k!=="title").map(k=>{
    const idx=DECK_KEYMAP[L.n][k];
    const sd=idx!=null&&deck?deck.slides[idx]:null;
    const cfg=plan.activities[k]||{};
    const name=cfg.title||(sd&&(sd.title||sd.kicker))||k;
    return `${name}  (${typeFor(sd,cfg,k)})`;
  });
  const top=1.5, avail=Hh-top-0.4, step=Math.min(0.62,avail/agenda.length);
  agenda.forEach((lab,i)=>{
    const y=top+i*step, half=i<Math.ceil(agenda.length/2);
    s.addShape("ellipse",{x:MX,y:y+0.02,w:0.5,h:0.5,fill:{color:accent},line:{color:accent}});
    s.addText(String(i+1),{x:MX,y:y+0.02,w:0.5,h:0.5,align:"center",valign:"middle",fontFace:HF,fontSize:18,bold:true,color:WHITE,margin:0});
    s.addText(lab,{x:MX+0.7,y,w:W-2*MX-0.8,h:step,fontFace:BF,fontSize:fitPt([lab],W-2*MX-0.8,step-0.02,18,13),color:INK,margin:0,valign:"middle"});
  });
}

// ---- HAND-OUT REMINDER (divider + full pages) ----
function handoutSlides(p,L,accent){
  const {title,sections}=wsSectionsFor(L.n);
  const d=p.addSlide();d.background={color:NAVY};
  d.addText("YOUR WORKSHEET",{x:MX,y:0.85,w:W-2*MX,h:0.4,fontFace:BF,fontSize:14,bold:true,color:accent,charSpacing:3,margin:0});
  d.addText(title||"Let's look at it together",{x:MX,y:1.3,w:W-2*MX,h:1.0,fontFace:HF,fontSize:32,bold:true,color:WHITE,margin:0,valign:"top"});
  d.addText("Hand this out now. We'll fill each part as we go.",{x:MX,y:2.35,w:W-2*MX,h:0.5,fontFace:BF,fontSize:16,italic:true,color:ICE,margin:0});
  if(sections.length){const region=(Hh-0.7)-3.05;
    d.addText(sections.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:10,color:ICE}})),
      {x:MX+0.3,y:3.05,w:W-2*MX-0.3,h:region,fontFace:BF,fontSize:fitPt(sections,W-2*MX-0.3,region,18,13),color:ICE,margin:0,valign:"top"});}
  const pages=pagePngs(L.n);
  pages.forEach((img,i)=>{
    const s=p.addSlide();
    s.addText(`WORKSHEET · PAGE ${i+1} OF ${pages.length}`,{x:MX,y:0.4,w:W-2*MX,h:0.32,fontFace:BF,fontSize:12,bold:true,color:accent,charSpacing:2,margin:0});
    const ih=6.15, iw=ih*LETTER_RATIO, ix=(W-iw)/2, iy=0.95;
    s.addShape("roundRect",{x:ix-0.08,y:iy-0.08,w:iw+0.16,h:ih+0.16,rectRadius:0.04,fill:{color:WHITE},line:{color:LINE,width:1},shadow:shadow()});
    s.addImage({path:img,x:ix,y:iy,w:iw,h:ih});
    footer(s,L);
  });
}

// ---- WORKSHEET SECTION close-up (banner + image + how-to) ----
function sectionWalkthrough(p,L,accent,letter,howText){
  const img=partPng(L.n,letter); if(!img) return;
  const s=p.addSlide(); banner(s,L,accent);
  const {sections}=wsSectionsFor(L.n);
  const partLabel=sections.find(t=>new RegExp(`Part ${letter}\\b`).test(t))||`Part ${letter}`;
  s.addText("WORKSHEET WALKTHROUGH",{x:MX,y:0.9,w:W-2*MX,h:0.28,fontFace:BF,fontSize:13,bold:true,color:accent,charSpacing:2,margin:0});
  s.addText(partLabel,{x:MX,y:1.16,w:W-2*MX,h:0.7,fontFace:HF,fontSize:28,bold:true,color:NAVY,margin:0,valign:"top"});
  // image left, how-to right (rule 6: enlarge image to fill height if it makes sense)
  const sizeOf=require("./imgsize.js");const {w:iw,h:ih}=sizeOf(img);const ar=ih/iw;
  let IH=Math.min(4.6, (Hh-0.7)-2.0); let IW=IH/ar;
  if(IW>6.2){IW=6.2;IH=IW*ar;}
  const ix=MX, iy=2.0;
  s.addShape("roundRect",{x:ix-0.08,y:iy-0.08,w:IW+0.16,h:IH+0.16,rectRadius:0.04,fill:{color:WHITE},line:{color:LINE,width:1},shadow:shadow()});
  s.addImage({path:img,x:ix,y:iy,w:IW,h:IH});
  const hx=ix+IW+0.5, hw=W-MX-hx;
  s.addShape("roundRect",{x:hx,y:iy,w:hw,h:IH,rectRadius:0.1,fill:{color:ICE},line:{color:accent,width:1.5},shadow:shadow()});
  s.addText("HOW TO COMPLETE IT",{x:hx+0.3,y:iy+0.25,w:hw-0.6,h:0.3,fontFace:BF,fontSize:13,bold:true,color:accent,charSpacing:1,margin:0});
  const how=howText||partHowTo[letter]||"";
  s.addText(how,{x:hx+0.3,y:iy+0.7,w:hw-0.6,h:IH-1.0,fontFace:BF,fontSize:fitPt([how],hw-0.6,IH-1.0,18,13),color:INK,margin:0,valign:"top"});
  footer(s,L);
}

// ---- REVEAL slide(s) ----
function revealSlides(p,L,accent,letter,plan){
  const rc=(plan.reveals||{})[letter]; if(!rc) return;
  if(rc.kind==="open"){
    const s=p.addSlide(); banner(s,L,accent);
    s.addText("WORKSHEET · EXAMPLE",{x:MX,y:0.9,w:W-2*MX,h:0.28,fontFace:BF,fontSize:13,bold:true,color:accent,charSpacing:2,margin:0});
    s.addText(rc.title||"One example",{x:MX,y:1.16,w:W-2*MX,h:0.7,fontFace:HF,fontSize:26,bold:true,color:NAVY,margin:0,valign:"top"});
    // big example box (fill space)
    const by=2.4, bh=Math.min(2.4,(Hh-0.7)-by-1.0);
    s.addShape("roundRect",{x:MX,y:by,w:W-2*MX,h:bh,rectRadius:0.1,fill:{color:ICE},line:{color:accent,width:1.5},shadow:shadow()});
    s.addText([{text:"Example   ",options:{bold:true,color:accent}},{text:rc.example,options:{color:INK}}],
      {x:MX+0.3,y:by+0.2,w:W-2*MX-0.6,h:bh-0.4,fontFace:BF,fontSize:fitPt([rc.example],W-2*MX-0.6,bh-0.4,22,15),margin:0,valign:"middle"});
    if(rc.note) s.addText(rc.note,{x:MX,y:by+bh+0.2,w:W-2*MX,h:0.7,fontFace:BF,fontSize:15,italic:true,color:GREY,margin:0,valign:"top"});
    footer(s,L);
  } else if(rc.kind==="answers"){
    // cumulative one-at-a-time reveals (rule 5)
    const ans=rc.answers||[];
    for(let k=1;k<=ans.length;k++){
      const s=p.addSlide(); banner(s,L,accent);
      s.addText("ANSWERS",{x:MX,y:0.9,w:W-2*MX,h:0.28,fontFace:BF,fontSize:13,bold:true,color:accent,charSpacing:2,margin:0});
      s.addText(rc.title||"Let's check",{x:MX,y:1.16,w:W-2*MX,h:0.7,fontFace:HF,fontSize:26,bold:true,color:NAVY,margin:0,valign:"top"});
      const shown=ans.slice(0,k);const region=(Hh-0.7)-2.3;
      s.addText(shown.map((a,i)=>({text:`${i+1}.  ${a}`,options:{breakLine:true,paraSpaceAfter:12,
        color: i===k-1?INK:GREY, bold:i===k-1}})),
        {x:MX+0.2,y:2.3,w:W-2*MX-0.4,h:region,fontFace:BF,fontSize:fitPt(shown,W-2*MX-0.4,region,22,14),margin:0,valign:"top"});
      footer(s,L);
    }
  }
}

// ---- TAKE-HOME reminder + NEXT CLASS (kept from v9 pattern, simplified) ----
function takehomeSlide(p,L,accent,cfg){
  const s=p.addSlide();s.background={color:NAVY};
  s.addText("TAKE-HOME",{x:MX,y:0.9,w:W-2*MX,h:0.4,fontFace:BF,fontSize:14,bold:true,color:accent,charSpacing:3,margin:0});
  s.addText(cfg.title||"Take-home",{x:MX,y:1.35,w:W-2*MX,h:0.9,fontFace:HF,fontSize:32,bold:true,color:WHITE,margin:0,valign:"top"});
  const items=cfg.items||[];const region=(Hh-0.7)-2.5;
  s.addText(items.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:18,color:ICE}})),
    {x:MX+0.3,y:2.5,w:W-2*MX-0.3,h:region,fontFace:BF,fontSize:fitPt(items,W-2*MX-0.3,region,22,16),color:ICE,margin:0,valign:"top"});
}

// ---- CLOSERS: notice image, next class, agenda (rule 1 tail + agenda standing order) ----
// Agenda-from-plan, reusable for both "today" and "next class".
function agendaItems(lessonN){
  const plan=DECK_PLAN[lessonN]; if(!plan) return [];
  const deck=DECKS.find(d=>d.n===lessonN);
  return plan.order.filter(k=>k!=="title"&&k!=="exit").map(k=>{
    const idx=DECK_KEYMAP[lessonN][k];
    const sd=idx!=null&&deck?deck.slides[idx]:null;
    const cfg=plan.activities[k]||{};
    return cfg.title||(sd&&(sd.title||sd.kicker))||k;
  });
}
// Full-page image of the take-home notice (goes home today). Uses wsassets/notice.png if present.
function noticeSlide(p,L,accent){
  const img=path.join(WSA,"notice.png"); if(!fs.existsSync(img)) return;
  const s=p.addSlide();
  s.addText("TAKE-HOME NOTICE · GOES HOME TODAY",{x:MX,y:0.4,w:W-2*MX,h:0.32,fontFace:BF,fontSize:12,bold:true,color:accent,charSpacing:2,margin:0});
  const {w:iw,h:ih}=require("./imgsize.js")(img); const ar=ih/iw;
  const H2=6.0, Wd=H2/ar; const ix=(W-Wd)/2, iy=0.95;
  s.addShape("roundRect",{x:ix-0.08,y:iy-0.08,w:Wd+0.16,h:H2+0.16,rectRadius:0.04,fill:{color:WHITE},line:{color:LINE,width:1},shadow:shadow()});
  s.addImage({path:img,x:ix,y:iy,w:Wd,h:H2});
  footer(s,L);
}
// Next-class overview: next lesson's shape of the day.
function nextClassSlide(p,L,accent){
  const nx=L.n+1; const items=agendaItems(nx); if(!items.length) return; // last lesson
  const {LESSONS}=require("./u1_content.js");
  const nl=LESSONS.find(x=>x.n===nx);
  const s=p.addSlide();s.background={color:NAVY};
  s.addText("NEXT CLASS",{x:MX,y:0.7,w:W-2*MX,h:0.4,fontFace:BF,fontSize:14,bold:true,color:accent,charSpacing:3,margin:0});
  s.addText(`Lesson ${nx}: ${nl?nl.title:""}`,{x:MX,y:1.15,w:W-2*MX,h:0.8,fontFace:HF,fontSize:30,bold:true,color:WHITE,margin:0,valign:"top"});
  const top=2.2, avail=Hh-top-0.5, step=Math.min(0.6,avail/items.length);
  items.forEach((lab,i)=>{
    const y=top+i*step;
    s.addShape("ellipse",{x:MX,y:y+0.02,w:0.46,h:0.46,fill:{color:accent},line:{color:accent}});
    s.addText(String(i+1),{x:MX,y:y+0.02,w:0.46,h:0.46,align:"center",valign:"middle",fontFace:HF,fontSize:16,bold:true,color:WHITE,margin:0});
    s.addText(lab,{x:MX+0.66,y,w:W-2*MX-0.76,h:step,fontFace:BF,fontSize:fitPt([lab],W-2*MX-0.76,step-0.02,18,13),color:ICE,margin:0,valign:"middle"});
  });
  footer(s,L);
}
// Agenda / planner slide — very last. Pulls homework + upcoming items from lesson data.
function agendaSlide(p,L,accent){
  const s=p.addSlide();s.background={color:PALE};
  s.addShape("rect",{x:0,y:0,w:W,h:0.42,fill:{color:accent},line:{color:accent}});
  s.addText("AGENDA",{x:0.3,y:0,w:W-0.6,h:0.42,fontFace:BF,fontSize:12,bold:true,color:WHITE,charSpacing:3,margin:0,valign:"middle"});
  s.addText("Take out your agenda",{x:MX,y:0.7,w:W-2*MX,h:0.7,fontFace:HF,fontSize:32,bold:true,color:NAVY,margin:0,valign:"top"});
  const items=[];
  if(L.homework) items.push("Homework: "+L.homework);
  const plan=DECK_PLAN[L.n];
  if(plan&&plan.takehome) items.push("A notice goes home today — get it signed if needed.");
  items.push("Write down anything due, and any upcoming assignment or test.");
  const region=(Hh-0.7)-1.7;
  s.addText(items.map(t=>({text:t,options:{bullet:{code:"2022"},breakLine:true,paraSpaceAfter:16}})),
    {x:MX+0.3,y:1.7,w:W-2*MX-0.3,h:region,fontFace:BF,fontSize:fitPt(items,W-2*MX-0.3,region,22,15),color:INK,margin:0,valign:"top"});
  footer(s,L);
}

// ---- BUILD ONE LESSON ----
function build(L){
  const p=new pptxgen();
  p.defineLayout({name:"WIDE",width:W,height:Hh});
  p.layout="WIDE";
  const accent=accentFor(L.n);
  const plan=DECK_PLAN[L.n];
  const deck=DECKS.find(d=>d.n===L.n);
  const slideByKey=(k)=>{const idx=DECK_KEYMAP[L.n][k];return idx!=null?deck.slides[idx]:null;};

  planSlide(p,L,accent,plan);
  shapeSlide(p,L,accent,plan);

  for(const key of plan.order){
    const cfg=plan.activities[key]||{};
    // hand-out reminder BEFORE the first sheet-using activity
    if(plan.handoutKey===key) handoutSlides(p,L,accent);

    if(key==="title"){ titleSlide(p,slideByKey("title"),L,accent); continue; }
    if(key==="exit"){ exitSlide(p,slideByKey("exit"),L,accent); continue; }
    if(cfg.section){ sectionSlide(p,cfg,L,accent); continue; }

    // ordinary content slide (banner + cards/bullets/compare)
    const sd=slideByKey(key);
    if(sd){ const s=p.addSlide(); (R[sd.kind]||R.plain)(s,sd,L,accent); }

    // interleave: worksheet section(s) + reveal(s), tight to the activity
    if(cfg.ws){
      const letters=Array.isArray(cfg.ws)?cfg.ws:[cfg.ws];
      for(const letter of letters){
        const howText = cfg.how ? (typeof cfg.how==="object"?cfg.how[letter]:cfg.how) : undefined;
        sectionWalkthrough(p,L,accent,letter,howText);
        if(cfg.reveal) revealSlides(p,L,accent,letter,plan);
      }
    }
  }

  // closers (approved L01 order): take-home reminder -> notice image -> next class -> agenda
  if(plan.takehome){ takehomeSlide(p,L,accent,plan.takehome); noticeSlide(p,L,accent); }
  nextClassSlide(p,L,accent);
  agendaSlide(p,L,accent);

  const name=`${UNIT.code}_U0${UNIT.number}_L${String(L.n).padStart(2,"0")}_Deck_${VERSION}.pptx`;
  return p.writeFile({fileName:path.join(OUT,name)}).then(()=>{console.log("wrote",name);});
}

(async()=>{
  const only=process.argv[5]?process.argv[5].split(",").map(Number):[1];
  for(const L of LESSONS){ if(only.includes(L.n)) await build(L); }
  console.log("DECKS DONE");
})();
