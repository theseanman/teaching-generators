// check_matching.js — matching keys must be derangements (no fixed points) and differ between tests.
const { UNIT_TEST, PRACTICE_TEST } = require("./u1_assess.js");
let fails = 0;

function matchOf(T){
  for (const s of T.sections) for (const it of s.items) if (it.type==="match") return it.match;
  return null;
}
function derangementOK(m, label){
  // presented[p].defNum must never equal p+1 (definition not shown in its own term's row)
  m.presented.forEach((slot, p)=>{
    if (slot.defNum === p+1){ fails++; console.log(`FAIL ${label}: fixed point at row ${p+1} (def ${slot.defNum})`); }
  });
}
const u = matchOf(UNIT_TEST), p = matchOf(PRACTICE_TEST);
derangementOK(u, "unit");
derangementOK(p, "practice");

// keys must differ (different ordering pattern)
const uKey = u.key.map(k=>k.letter).join("");
const pKey = p.key.map(k=>k.letter).join("");
if (uKey === pKey){ fails++; console.log(`FAIL: unit and practice matching keys are identical (${uKey})`); }

console.log(`\nUnit key:     ${u.key.map(k=>k.termNum+'-'+k.letter).join('  ')}`);
console.log(`Practice key: ${p.key.map(k=>k.termNum+'-'+k.letter).join('  ')}`);
console.log(`Derangement + differ check — failures: ${fails}`);
process.exit(fails?1:0);
