const { LESSONS } = require("./lessons");
const { autoSize, fits, stackStep, stackBottom } = require("./layout");
// heading dropped 28pt -> 24pt and box 0.62 -> 0.56 to clear the top banner.
// Two banner regions added; both are hard-capped single lines.
const REGIONS = [
  ["banner objective",7.90,0.24,12,12,99,(L)=>[(L.banner&&L.banner.obj)||""]],
  ["banner standard",7.90,0.18,8.5,8.5,99,(L)=>[(L.banner&&L.banner.std)||""]],
  ["vocab term",1.58,0.50,13,13,99,(L)=>L.vocab.map(v=>v[0])],
  ["vocab def",1.58,1.00,10.5,10.5,99,(L)=>L.vocab.map(v=>v[1])],
  ["warmup",7.90,1.10,15,15,99,(L)=>L.warmup],
  ["goal",8.50,0.68,15,15,99,(L)=>L.goals],
  ["teach point",8.40,0.80,14.5,14.5,99,(L)=>[...L.teach1.points,...L.teach2.points]],
  ["teach title",9.00,0.56,24,24,99,(L)=>[L.teach1.title,L.teach2.title]],
  ["example",8.50,0.86,13.5,10,130,(L)=>L.examples],
  ["practice instr",9.00,0.42,13,13,99,(L)=>[L.practice.instr]],
  ["practice item",8.45,0.56,13,9.5,115,(L)=>L.practice.items],
  ["speaking instr",9.00,0.80,14,14,99,(L)=>[L.speaking.instr]],
  ["speaking frame",8.40,0.50,14,11,95,(L)=>L.speaking.prompts],
  ["yourturn",8.30,1.45,16,16,99,(L)=>[L.yourturn.instr]],
  ["exit",7.60,0.95,15,15,99,(L)=>L.exit],
  ["lesson title",8.60,1.50,40,40,99,(L)=>[L.title]],
];
// Content bottom edges must clear the footer strip at y=5.20.
const FOOTER_Y = 5.20;
const STACKS = [
  ["goals",1.50,0.85,0.68,(L)=>L.goals.length],
  ["teach points",1.50,0.92,0.80,(L)=>Math.max(L.teach1.points.length,L.teach2.points.length)],
  ["examples",1.45,0.94,0.86,(L)=>L.examples.length],
  ["practice items",1.78,0.60,0.56,(L)=>L.practice.items.length],
  ["speaking frames",2.78,0.55,0.50,(L)=>L.speaking.prompts.length],
];
let fails=0,checked=0,shrunk=[],noBanner=[];
for(const L of LESSONS){
  if(!L.banner) noBanner.push(L.n);
  for(const [region,w,h,base,min,budget,get] of REGIONS){
    const strings=get(L).map(String).filter(s=>s.length);
    if(!strings.length) continue;
    const size=autoSize(strings,base,min,budget);
    if(size<base) shrunk.push(`L${String(L.n).padStart(2,"0")} ${region} ${base}\u2192${size}pt`);
    for(const s of strings){checked++;
      if(!fits(s,size,w,h)){fails++;console.log(`  OVERFLOW L${String(L.n).padStart(2,"0")} ${region.padEnd(17)} ${size}pt "${s.slice(0,55)}\u2026"`);}}
  }
  for(const [name,y0,step,h,count] of STACKS){
    const n=count(L); if(!n) continue;
    const s2=(name==="practice items")?stackStep(n,y0,h,step,5.10):step;
    const bottom=stackBottom(n,y0,s2,h);
    if(bottom>FOOTER_Y){fails++;console.log(`  FOOTER CLASH L${String(L.n).padStart(2,"0")} ${name.padEnd(17)} ${n} items, bottom ${bottom.toFixed(2)}in > ${FOOTER_Y}in`);}
  }
}
if(noBanner.length) console.log("  MISSING BANNER DATA: lesson(s) "+noBanner.join(", "));
if(shrunk.length) console.log("  auto-shrunk: "+shrunk.join(", "));
console.log(`fitcheck: ${checked} strings across ${LESSONS.length} lessons, ${fails} overflow`);
process.exit(fails||noBanner.length?1:0);
