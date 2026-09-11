const { LESSONS } = require("./lessons");
const { autoSize, fits } = require("./layout");
const REGIONS = [
  ["vocab term",1.58,0.50,13,13,99,(L)=>L.vocab.map(v=>v[0])],
  ["vocab def",1.58,1.00,10.5,10.5,99,(L)=>L.vocab.map(v=>v[1])],
  ["warmup",7.90,1.10,15,15,99,(L)=>L.warmup],
  ["goal",8.50,0.68,15,15,99,(L)=>L.goals],
  ["teach point",8.40,0.80,14.5,14.5,99,(L)=>[...L.teach1.points,...L.teach2.points]],
  ["teach title",9.00,0.62,28,28,99,(L)=>[L.teach1.title,L.teach2.title]],
  ["example",8.50,0.86,13.5,10,130,(L)=>L.examples],
  ["practice instr",9.00,0.42,13,13,99,(L)=>[L.practice.instr]],
  ["practice item",8.45,0.56,13,9.5,115,(L)=>L.practice.items],
  ["speaking instr",9.00,0.80,14,14,99,(L)=>[L.speaking.instr]],
  ["speaking frame",8.40,0.50,14,11,95,(L)=>L.speaking.prompts],
  ["yourturn",8.30,1.45,16,16,99,(L)=>[L.yourturn.instr]],
  ["exit",7.60,0.95,15,15,99,(L)=>L.exit],
  ["lesson title",8.60,1.50,40,40,99,(L)=>[L.title]],
];
let fails=0,checked=0,shrunk=[];
for(const L of LESSONS){
  for(const [region,w,h,base,min,budget,get] of REGIONS){
    const strings=get(L).map(String);
    const size=autoSize(strings,base,min,budget);
    if(size<base) shrunk.push(`L${String(L.n).padStart(2,"0")} ${region} ${base}\u2192${size}pt`);
    for(const s of strings){checked++;
      if(!fits(s,size,w,h)){fails++;console.log(`  OVERFLOW L${String(L.n).padStart(2,"0")} ${region.padEnd(15)} ${size}pt "${s.slice(0,55)}\u2026"`);}}
  }
}
if(shrunk.length) console.log("  auto-shrunk: "+shrunk.join(", "));
console.log(`fitcheck: ${checked} strings across ${LESSONS.length} lessons, ${fails} overflow`);
process.exit(fails?1:0);
