const fs=require("fs");
const {P}=require("./plans_3_14.js");
const {DECK_KEYMAP}=require("./u1_decks.js");

function buildPlan(n){
  const spec=P[n]; const km=DECK_KEYMAP[n];
  const contentKeys=Object.keys(km).filter(k=>k!=="title"&&k!=="exit").sort((a,b)=>km[a]-km[b]);
  const order=["title",...contentKeys,"exit"];
  const activities={};
  for(const k of order){ if(k!=="title"&&k!=="exit") activities[k]={}; }
  const letters=spec.parts.map(p=>p[0]);
  const how={}, reveals={};
  for(const [letter,kind,howText,rev] of spec.parts){
    how[letter]=howText;
    if(kind==="answers"||kind==="open") reveals[letter]={kind, ...(rev||{})};
  }
  activities[spec.wsKey]={ ws:letters, reveal:true, how };
  return { handoutKey:spec.wsKey, order, activities, reveals };
}

let src=fs.readFileSync("u1_decks.js","utf8");
// Replace each stub plan n (3..14). The stubs look like:
//   N: {\n    handoutKey:"c4",\n    order:[...],\n    activities:{...},\n    reveals:{},\n  },
// We match from "\n  N: {" up to the matching "\n  },\n" that precedes the next "  M: {" or the closing of DECK_PLAN.
for(let n=3;n<=14;n++){
  const re=new RegExp(`\\n  ${n}: \\{[\\s\\S]*?\\n  \\},`,"m");
  const plan=buildPlan(n);
  const replacement=`\n  ${n}: ${JSON.stringify(plan)},`;
  if(!re.test(src)){ console.error("NO MATCH L"+n); process.exit(1); }
  src=src.replace(re,replacement);
}
fs.writeFileSync("u1_decks.js",src);
console.log("spliced L3-14");
