// check_cloze.js — every cloze answer must appear in its own word bank.
const { WORKSHEETS } = require("./u1_worksheets.js");
let fails = 0, checked = 0;
for (const w of WORKSHEETS){
  for (const b of w.blocks){
    if (b.kind !== "cloze") continue;
    const bank = b.bank.map(x=>x.toLowerCase().trim());
    b.items.forEach((it, i)=>{
      (it.answers||[]).forEach(ans=>{
        checked++;
        if (!bank.includes(ans.toLowerCase().trim())){
          fails++;
          console.log(`FAIL  L${w.n} cloze item ${i+1}: answer "${ans}" not in word bank [${b.bank.join(", ")}]`);
        }
      });
    });
  }
}
console.log(`\nCloze answers checked: ${checked}  |  failures: ${fails}`);
process.exit(fails ? 1 : 0);
