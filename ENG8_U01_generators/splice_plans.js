const fs=require("fs");
const {P}=require("./plans_3_14.js");
const {DECK_KEYMAP,DECKS}=require("./u1_decks.js");

// Build a plan object for a lesson from authored data.
function buildPlan(n){
  const spec=P[n]; const km=DECK_KEYMAP[n];
  const contentKeys=Object.keys(km).filter(k=>k!=="title"&&k!=="exit")
    .sort((a,b)=>km[a]-km[b]); // c1..cN in slide order
  const order=["title",...contentKeys,"exit"];
  const activities={};
  for(const k of order){ if(k!=="title"&&k!=="exit") activities[k]={}; }
  // attach worksheet parts to the wsKey slide, in Part order
  const letters=spec.parts.map(p=>p[0]);
  activities[spec.wsKey]={ ws:letters, // array → multiple parts on/after this slide
    reveal:true };
  // how-to + reveals keyed by letter
  const how={}, reveals={};
  for(const [letter,kind,howText,rev] of spec.parts){
    how[letter]=howText;
    if(kind==="answers"||kind==="open") reveals[letter]={kind, ...(rev||{})};
    // checklist → no reveal
  }
  activities[spec.wsKey].how=how;
  return { handoutKey:spec.wsKey, order, activities, reveals, _multi:true };
}

// Emit JS source for a plan entry (compact but readable).
function emit(n){
  const p=buildPlan(n);
  return `  ${n}: ${JSON.stringify(p,null,0)},`;
}

let out="// AUTO-SPLICED L3-14 plans\n";
for(let n=3;n<=14;n++) out+=emit(n)+"\n";
fs.writeFileSync("/tmp/plans_out.txt", out);
console.log("emitted", 12, "plans");
// sanity print L3 and L13
console.log(JSON.stringify(buildPlan(3),null,1).slice(0,600));
