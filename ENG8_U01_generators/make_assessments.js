// make_assessments.js — ENG8 U1 tests + answer key (docx).
const fs = require("fs");
const path = require("path");
const D = require("docx");
const { Document, Packer, Paragraph, TextRun, BorderStyle, ShadingType, WidthType,
        Table, TableRow, TableCell, AlignmentType } = D;
const H = require("./docxhelp.js");
const { UNIT_TEST, PRACTICE_TEST } = require("./u1_assess.js");

const OUT = process.argv[2] || path.join(__dirname, "..", "out");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
const sectionProps = { page: { size: H.LETTER.size, margin: H.MARGINS } };

function ruled(n, o={}){ const a=[]; for(let i=0;i<n;i++) a.push(new Paragraph({ children:[H.run("")],
  spacing:{ after:o.after??180, before:i===0?(o.before??60):140 },
  border:{ bottom:{ style:BorderStyle.SINGLE, size:6, color:"9AA7B4" } } })); return a; }

function marksTag(n){ return H.run(`(${n})`, { bold:true, color:H.C.midGrey, size:20 }); }

function passageBox(p){
  const cell = new TableCell({ width:{size:8760,type:WidthType.DXA},
    shading:{type:ShadingType.CLEAR,color:"auto",fill:"FCFBF6"},
    margins:{top:160,bottom:160,left:200,right:200},
    borders:{ top:{style:BorderStyle.SINGLE,size:8,color:H.C.navy}, bottom:{style:BorderStyle.SINGLE,size:8,color:H.C.navy}, left:{style:BorderStyle.SINGLE,size:8,color:H.C.navy}, right:{style:BorderStyle.SINGLE,size:8,color:H.C.navy} },
    children:[ new Paragraph({ children:[H.run(p.title,{bold:true,color:H.C.navy,size:24})], spacing:{after:100} }),
               new Paragraph({ children:[H.run(p.text,{size:22})], spacing:{line:320} }) ] });
  return new Table({ columnWidths:[8760], width:{size:8760,type:WidthType.DXA},
    borders:{top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE},insideHorizontal:{style:BorderStyle.NONE},insideVertical:{style:BorderStyle.NONE}},
    rows:[ new TableRow({ children:[cell] }) ] });
}

function sectionHeader(sec){
  // "Section A — Title   ·   15 marks"  (marks parsed by check_totals.py)
  return new Paragraph({
    children:[ H.run(`Section ${sec.id} — ${sec.title}`, {bold:true, color:H.C.white, size:24}),
               H.run(`     \u00B7   ${sec.marks} marks`, {bold:true, color:H.C.white, size:22}) ],
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:H.C.navy },
    spacing:{ before:240, after:120, line:300 },
  });
}

function matchTable(match){
  // two-column: terms (numbered) | definitions (lettered)
  const rows = [];
  const n = Math.max(match.presented.length, match.key.length);
  const b={style:BorderStyle.SINGLE,size:4,color:H.C.line};
  rows.push(new TableRow({ tableHeader:true, children:[
    new TableCell({ width:{size:4380,type:WidthType.DXA}, shading:{type:ShadingType.CLEAR,color:"auto",fill:H.C.navy}, margins:{top:60,bottom:60,left:100,right:100}, children:[new Paragraph({children:[H.run("Term",{bold:true,color:"FFFFFF",size:21})]})] }),
    new TableCell({ width:{size:4380,type:WidthType.DXA}, shading:{type:ShadingType.CLEAR,color:"auto",fill:H.C.navy}, margins:{top:60,bottom:60,left:100,right:100}, children:[new Paragraph({children:[H.run("Meaning",{bold:true,color:"FFFFFF",size:21})]})] }),
  ]}));
  for(let i=0;i<n;i++){
    const term = match.key[i] ? `${match.key[i].termNum}. ${match.key[i].term}    ____` : "";
    const def  = match.presented[i] ? `${match.presented[i].letter}. ${match.presented[i].text}` : "";
    rows.push(new TableRow({ cantSplit:true, children:[
      new TableCell({ width:{size:4380,type:WidthType.DXA}, shading:{type:ShadingType.CLEAR,color:"auto",fill: i%2?"F4F6F9":"FFFFFF"}, margins:{top:100,bottom:100,left:100,right:100}, children:[new Paragraph({children:[H.run(term,{size:21})]})] }),
      new TableCell({ width:{size:4380,type:WidthType.DXA}, shading:{type:ShadingType.CLEAR,color:"auto",fill: i%2?"F4F6F9":"FFFFFF"}, margins:{top:100,bottom:100,left:100,right:100}, children:[new Paragraph({children:[H.run(def,{size:21})]})] }),
    ]}));
  }
  return new Table({ columnWidths:[4380,4380], width:{size:8760,type:WidthType.DXA},
    borders:{top:b,bottom:b,left:b,right:b,insideHorizontal:b,insideVertical:b}, rows });
}

function renderItem(it, idx){
  const out=[];
  const num = `${idx}. `;
  // question line with marks tag at end
  out.push(new Paragraph({ children:[ H.run(num,{bold:true,color:H.C.blue,size:22}), H.run(it.q+"  ",{size:22}), marksTag(it.marks) ], spacing:{ before:140, after:60, line:276 } }));
  if (it.type==="match"){ out.push(matchTable(it.match)); out.push(H.spacer(80)); return out; }
  if (it.type==="label" || it.type==="sf"){
    it.lines.forEach((s,i)=> out.push(new Paragraph({ children:[ H.run(`${String.fromCharCode(97+i)}) `,{bold:true,size:21,color:H.C.midGrey}),
      H.run(s+(it.type==="sf"?"    ______":""),{size:22}) ], spacing:{after:120,line:288} })));
    return out;
  }
  if (it.sub){ it.sub.forEach((s,i)=>{ out.push(new Paragraph({ children:[H.run(`${String.fromCharCode(97+i)}) `,{bold:true,size:21,color:H.C.midGrey}),H.run(s,{size:22})], spacing:{after:40} })); out.push(...ruled(it.type==="convert"?2:1)); }); return out; }
  if (it.lines) out.push(...ruled(it.lines));
  return out;
}

function testDoc(T){
  const c=[];
  c.push(new Paragraph({ children:[H.run(`${T.code} · Unit 1 · ${T.label}`, {size:18,color:H.C.midGrey})], spacing:{after:20} }));
  c.push(H.h1(T.label));
  // name row + total
  c.push(new Paragraph({ children:[ H.run("Name: ______________________________      Block: ______      ",{size:22,color:H.C.midGrey}),
    H.run(`TOTAL: ${T.total} MARKS`, {bold:true,color:H.C.navy,size:22}) ], spacing:{after:120},
    border:{ bottom:{style:BorderStyle.SINGLE,size:4,color:H.C.line} } }));
  c.push(H.text(T.instructions, { italics:true, color:H.C.midGrey, size:21 }));
  if (T.passage){ c.push(H.spacer(60)); c.push(passageBox(T.passage)); c.push(H.spacer(120)); }
  T.sections.forEach(sec=>{
    c.push(sectionHeader(sec));
    if (sec.intro) c.push(H.text(sec.intro,{italics:true,color:H.C.midGrey,size:21}));
    let n=1; sec.items.forEach(it=> c.push(...renderItem(it,n++)));
  });
  return new Document({ numbering:H.NUMBERING, sections:[{ properties:sectionProps, children:c }] });
}

function keyDoc(T, label){
  const c=[];
  c.push(new Paragraph({ children:[H.run(`${T.code} · Unit 1 · ${label} — ANSWER KEY`, {size:18,color:H.C.midGrey})], spacing:{after:20} }));
  c.push(H.h1(`${label} — Answer Key`));
  c.push(H.text(`Total: ${T.total} marks. Writing tasks are scored on the BC 4-point Proficiency Scale (Emerging / Developing / Proficient / Extending).`, {italics:true,color:H.C.midGrey,size:21}));
  T.sections.forEach(sec=>{
    c.push(sectionHeader(sec));
    let n=1;
    sec.items.forEach(it=>{
      c.push(new Paragraph({ children:[ H.run(`${n}. `,{bold:true,color:H.C.blue,size:22}), H.run(it.q+"  ",{size:22,italics:true,color:H.C.midGrey}), marksTag(it.marks) ], spacing:{before:120,after:40} }));
      if (it.type==="match"){
        const keyStr = it.match.key.map(k=>`${k.termNum}\u2013${k.letter}`).join("    ");
        c.push(new Paragraph({ children:[H.run("Key:  ",{bold:true,color:H.C.navy,size:21}), H.run(keyStr,{size:22})], spacing:{after:80} }));
      } else {
        c.push(new Paragraph({ children:[H.run("Answer:  ",{bold:true,color:H.C.navy,size:21}), H.run(it.key||"\u2014",{size:22})], spacing:{after:100,line:288} }));
      }
      n++;
    });
  });
  return new Document({ numbering:H.NUMBERING, sections:[{ properties:sectionProps, children:c }] });
}

(async()=>{
  const jobs = [
    [testDoc(PRACTICE_TEST), "ENG8_U01_PracticeTest_v1.docx"],
    [testDoc(UNIT_TEST),     "ENG8_U01_UnitTest_v1.docx"],
    [keyDoc(UNIT_TEST,"Unit 1 Test"),         "ENG8_U01_UnitTest_AnswerKey_v1.docx"],
    [keyDoc(PRACTICE_TEST,"Unit 1 Practice Test"), "ENG8_U01_PracticeTest_AnswerKey_v1.docx"],
  ];
  for (const [doc,name] of jobs){ const buf=await Packer.toBuffer(doc); fs.writeFileSync(path.join(OUT,name),buf); console.log("wrote",name,buf.length); }
  console.log("ASSESSMENTS DONE");
})();
