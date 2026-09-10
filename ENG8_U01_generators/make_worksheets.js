// make_worksheets.js — ENG8 U1 worksheets (docx). Reuses docxhelp foundation.
const fs = require("fs");
const path = require("path");
const D = require("docx");
const { Document, Packer, Paragraph, TextRun, BorderStyle, ShadingType, WidthType,
        Table, TableRow, TableCell, AlignmentType, TabStopType, LeaderType } = D;
const CONTENT_W = 10080; // true usable width (Letter 12240 - 1080 - 1080 margins)
const FULL = CONTENT_W;
const H = require("./docxhelp.js");
const { WORKSHEETS } = require("./u1_worksheets.js");
const { UNIT } = require("./u1_content.js");

const OUT = process.argv[2] || path.join(__dirname, "..", "out");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
const sectionProps = { page: { size: H.LETTER.size, margin: H.MARGINS } };

// ---- small local helpers ----
// Writing lines via an underscore-leader RIGHT tab, NOT paragraph bottom-borders.
// Word merges consecutive identically-bordered paragraphs into one box and draws
// a single rule; the tab-leader method renders as distinct lines in Word,
// LibreOffice and Pages alike.
function ruledLines(n, o={}){
  const arr=[];
  const right = o.width || CONTENT_W;
  for(let i=0;i<n;i++) arr.push(new Paragraph({
    children:[ new TextRun({ text:"\t", size:22, font:"Calibri", color:"9AA7B4" }) ],
    spacing:{ after: o.after ?? 200, before: i===0?(o.before??60):140, line:240 },
    tabStops:[{ type:TabStopType.RIGHT, position:right, leader:LeaderType.UNDERSCORE }],
    indent:o.indent,
  }));
  return arr;
}
// A row of `count` fixed-width writable blanks (for fill-frames like "___ ___ ___").
// Each blank is an underscore-leader tab; blanks share one line, then wrap rows.
function blankRow(count, o={}){
  const total = o.width || CONTENT_W;
  const per = Math.floor(total / count);
  const stops = [];
  for(let i=1;i<=count;i++) stops.push({ type:TabStopType.RIGHT, position:per*i, leader:LeaderType.UNDERSCORE });
  const kids = [];
  for(let i=0;i<count;i++) kids.push(new TextRun({ text:"\t", size:22, font:"Calibri", color:"9AA7B4" }));
  return new Paragraph({ children:kids, tabStops:stops, spacing:{ before:o.before??120, after:o.after??160, line:300 } });
}
function labelBox(label, lines, accent){
  const cell = new TableCell({
    width:{ size:FULL, type:WidthType.DXA },
    shading:{ type:ShadingType.CLEAR, color:"auto", fill:"FBFCFE" },
    margins:{ top:120, bottom:160, left:160, right:160 },
    borders:{ top:{style:BorderStyle.SINGLE,size:4,color:accent}, bottom:{style:BorderStyle.SINGLE,size:4,color:accent},
              left:{style:BorderStyle.SINGLE,size:4,color:accent}, right:{style:BorderStyle.SINGLE,size:4,color:accent} },
    children:[ new Paragraph({ children:[H.run(label, {bold:true, color:accent, size:21})], spacing:{after:60} }),
               ...ruledLines(lines) ],
  });
  return new Table({ columnWidths:[FULL], width:{size:FULL,type:WidthType.DXA},
    borders:{ top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE},insideHorizontal:{style:BorderStyle.NONE},insideVertical:{style:BorderStyle.NONE} },
    rows:[ new TableRow({ cantSplit:true, children:[cell] }) ] });
}
function sixBox(){
  const cells=[];
  const CW6=Math.floor(FULL/6); const last6=FULL-CW6*5;
  for(let i=0;i<6;i++) cells.push(new TableCell({
    width:{size: i<5?CW6:last6,type:WidthType.DXA}, margins:{top:220,bottom:220,left:80,right:80},
    children:[ new Paragraph({ children:[H.run("")], alignment:AlignmentType.CENTER }) ],
  }));
  const b={style:BorderStyle.SINGLE,size:6,color:"7A8B99"};
  return new Table({ columnWidths:[CW6,CW6,CW6,CW6,CW6,last6], width:{size:FULL,type:WidthType.DXA},
    borders:{top:b,bottom:b,left:b,right:b,insideHorizontal:b,insideVertical:b},
    rows:[ new TableRow({ children:cells }) ] });
}
function checklist(items){
  return items.map(it => new Paragraph({
    children:[ H.run("\u2751  ", { size:24, color:"5A6B7B" }), H.run(it, { size:22 }) ],
    spacing:{ after:120, line:264 },
  }));
}
function frames(list){
  const out=[];
  list.forEach(q=>{ out.push(new Paragraph({ children:[H.run(q,{bold:true,color:H.C.navy,size:21})], spacing:{after:40,before:80} }));
    out.push(...ruledLines(1)); });
  return out;
}
function inlineFill(prompt){
  return new Paragraph({
    children:[ H.run(prompt+": ", {bold:true, color:H.C.navy, size:22}),
               H.run("\u00A0".repeat(1), {}) ],
    spacing:{ after:40, before:80 },
    border:{ bottom:{ style:BorderStyle.SINGLE, size:6, color:"9AA7B4" } },
  });
}

// split item text on runs of 2+ underscores → text runs with underlined nbsp blanks between
function runsWithBlanks(text){
  const parts = text.split(/_{2,}/);
  const out = [];
  parts.forEach((seg, i)=>{
    if (seg) out.push(H.run(seg, { size:22 }));
    if (i < parts.length-1) out.push(new TextRun({ text:"\u00A0".repeat(24), underline:{ type:"single" }, size:22, font:"Calibri" }));
  });
  return out;
}
function clozeBlock(bank, items){
  const out = [];
  // word bank box
  const cell = new TableCell({ width:{size:FULL,type:WidthType.DXA},
    shading:{type:ShadingType.CLEAR,color:"auto",fill:"EEF3F9"},
    margins:{top:100,bottom:100,left:160,right:160},
    borders:{ top:{style:BorderStyle.SINGLE,size:6,color:H.C.blue}, bottom:{style:BorderStyle.SINGLE,size:6,color:H.C.blue}, left:{style:BorderStyle.SINGLE,size:6,color:H.C.blue}, right:{style:BorderStyle.SINGLE,size:6,color:H.C.blue} },
    children:[ new Paragraph({ children:[ H.run("WORD BANK:  ", {bold:true, color:H.C.blue, size:20}),
      H.run(bank.join("      "), {size:22}) ] }) ] });
  out.push(new Table({ columnWidths:[FULL], width:{size:FULL,type:WidthType.DXA},
    borders:{top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE},insideHorizontal:{style:BorderStyle.NONE},insideVertical:{style:BorderStyle.NONE}},
    rows:[ new TableRow({ children:[cell] }) ] }));
  out.push(H.spacer(120));
  items.forEach((it,i)=>{
    out.push(new Paragraph({ children:[ H.run((i+1)+".  ", {bold:true,color:H.C.blue,size:22}), ...runsWithBlanks(it.text) ],
      spacing:{ after:180, line:300 } }));
  });
  return out;
}

function wsTable(head, rows, widths, tall){
  // Rescale whatever proportions the data gives so the table always spans FULL.
  const sum = widths.reduce((a,x)=>a+x,0) || FULL;
  widths = widths.map(w=>Math.round(w*FULL/sum));
  widths[widths.length-1] = FULL - widths.slice(0,-1).reduce((a,x)=>a+x,0);
  const rr = [ new TableRow({ tableHeader:true, children: head.map(h=> new TableCell({
      width:{size:widths[head.indexOf(h)],type:WidthType.DXA},
      shading:{type:ShadingType.CLEAR,color:"auto",fill:H.C.navy}, margins:{top:60,bottom:60,left:100,right:100},
      children:[ new Paragraph({ children:[H.run(h,{bold:true,color:"FFFFFF",size:21})] }) ],
  })) }) ];
  rows.forEach((r,ri)=> rr.push(new TableRow({ cantSplit:true, children: r.map((c,ci)=> new TableCell({
      width:{size:widths[ci],type:WidthType.DXA},
      shading:{type:ShadingType.CLEAR,color:"auto",fill: ri%2?"F4F6F9":"FFFFFF"},
      margins:{top: tall?160:80, bottom: tall?160:80, left:100, right:100},
      children:[ new Paragraph({ children:[H.run(c,{size:21})] }) ],
  })) })));
  const b={style:BorderStyle.SINGLE,size:4,color:H.C.line};
  return new Table({ columnWidths:widths, width:{size:FULL,type:WidthType.DXA},
    borders:{top:b,bottom:b,left:b,right:b,insideHorizontal:b,insideVertical:b}, rows:rr });
}

function panel(title, children, accent){
  // support/extension callout as a bordered tinted block
  const inner=[ new Paragraph({ children:[H.run(title, {bold:true, color:accent, size:20, caps:true})], spacing:{after:80} }), ...children ];
  const cell = new TableCell({ width:{size:FULL,type:WidthType.DXA},
    shading:{type:ShadingType.CLEAR,color:"auto",fill: accent===H.C.accents.mint?"EAF6EF":"F3EFFA"},
    margins:{top:140,bottom:140,left:180,right:180},
    borders:{ top:{style:BorderStyle.SINGLE,size:6,color:accent}, bottom:{style:BorderStyle.SINGLE,size:6,color:accent}, left:{style:BorderStyle.SINGLE,size:6,color:accent}, right:{style:BorderStyle.SINGLE,size:6,color:accent} },
    children: inner });
  return new Table({ columnWidths:[FULL], width:{size:FULL,type:WidthType.DXA},
    borders:{top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE},insideHorizontal:{style:BorderStyle.NONE},insideVertical:{style:BorderStyle.NONE}},
    rows:[ new TableRow({ children:[cell] }) ] });
}

function renderBlocks(blocks){
  const out=[];
  blocks.forEach(b=>{
    const acc = b.accentStep ? H.accentFor(b.accentStep) : H.C.blue;
    switch(b.kind){
      case "section": out.push(H.h2(b.t, acc)); break;
      case "instr":   out.push(H.text(b.t, { size:22 })); break;
      case "note":    out.push(new Paragraph({ children:[H.run("\u270E  "+b.t,{italics:true,color:H.C.midGrey,size:21})], spacing:{before:120,after:80} })); break;
      case "write":   out.push(...ruledLines(b.lines)); break;
      case "longblanks": { const rows=b.rows||1, per=b.per||3; for(let r=0;r<rows;r++) out.push(blankRow(per)); out.push(H.spacer(80)); break; }
      case "box":     out.push(labelBox(b.label, b.lines, H.C.blue)); out.push(H.spacer(80)); break;
      case "sixbox":  out.push(sixBox()); out.push(H.spacer(80)); break;
      case "frames":  out.push(...frames(b.list)); break;
      case "checklist": out.push(...checklist(b.items)); break;
      case "table":   out.push(wsTable(b.head,b.rows,b.widths,b.tall)); out.push(H.spacer(100)); break;
      case "fill":    out.push(inlineFill(b.prompt)); break;
      case "cloze":   out.push(...clozeBlock(b.bank, b.items)); break;
      case "model": {
        const cell = new TableCell({ width:{size:FULL,type:WidthType.DXA},
          shading:{type:ShadingType.CLEAR,color:"auto",fill:"FCFBF6"},
          margins:{top:160,bottom:160,left:200,right:200},
          borders:{ top:{style:BorderStyle.SINGLE,size:8,color:H.C.navy}, bottom:{style:BorderStyle.SINGLE,size:8,color:H.C.navy}, left:{style:BorderStyle.SINGLE,size:8,color:H.C.navy}, right:{style:BorderStyle.SINGLE,size:8,color:H.C.navy} },
          children:[ new Paragraph({ children:[H.run("MODEL PARAGRAPH",{bold:true,color:H.C.navy,size:18,caps:true})], spacing:{after:80} }),
                     new Paragraph({ children:[H.run(b.t,{size:23})], spacing:{line:340} }) ] });
        out.push(new Table({ columnWidths:[FULL], width:{size:FULL,type:WidthType.DXA},
          borders:{top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE},insideHorizontal:{style:BorderStyle.NONE},insideVertical:{style:BorderStyle.NONE}},
          rows:[ new TableRow({ children:[cell] }) ] }));
        out.push(H.spacer(120));
        break;
      }
      case "support": out.push(H.spacer(60)); out.push(panel("Need a hand? (Support)", renderBlocks(b.blocks), H.C.accents.mint)); out.push(H.spacer(80)); break;
      case "extension": out.push(panel("Ready for more? (Extension)", renderBlocks(b.blocks), H.C.accents.violet)); break;
    }
  });
  return out;
}

function nameHeader(W){
  return new Table({ columnWidths:[Math.round(FULL*0.66),FULL-Math.round(FULL*0.66)], width:{size:FULL,type:WidthType.DXA},
    borders:{top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.SINGLE,size:4,color:H.C.line},left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE},insideHorizontal:{style:BorderStyle.NONE},insideVertical:{style:BorderStyle.NONE}},
    rows:[ new TableRow({ children:[
      new TableCell({ width:{size:Math.round(FULL*0.66),type:WidthType.DXA}, borders:blank(), margins:{bottom:60}, children:[ new Paragraph({ children:[H.run("Name: ",{color:H.C.midGrey,size:21})] }) ] }),
      new TableCell({ width:{size:FULL-Math.round(FULL*0.66),type:WidthType.DXA}, borders:blank(), margins:{bottom:60}, children:[ new Paragraph({ alignment:AlignmentType.RIGHT, children:[H.run("Block: ____   Date: ____",{color:H.C.midGrey,size:21})] }) ] }),
    ]}) ] });
}
function blank(){ const n={style:BorderStyle.NONE}; return {top:n,bottom:n,left:n,right:n}; }

function build(W){
  const c=[];
  c.push(new Paragraph({ children:[H.run(`${UNIT.code} · Unit ${UNIT.number} · Lesson ${W.n} — Worksheet`, {size:18,color:H.C.midGrey})], spacing:{after:20} }));
  c.push(H.h1(W.title));
  if (W.subtitle) c.push(H.subtitle(W.subtitle));
  c.push(nameHeader(W));
  c.push(H.spacer(120));
  c.push(...renderBlocks(W.blocks));
  return new Document({ numbering:H.NUMBERING, sections:[{ properties:sectionProps, children:c }] });
}

(async()=>{
  const only = process.argv[3] ? process.argv[3].split(",").map(Number) : null;
  for (const W of WORKSHEETS){
    if (only && !only.includes(W.n)) continue;
    const buf = await Packer.toBuffer(build(W));
    const name = `${UNIT.code}_U0${UNIT.number}_L${String(W.n).padStart(2,"0")}_Worksheet_v1.docx`;
    fs.writeFileSync(path.join(OUT,name), buf);
    console.log("wrote", name, buf.length);
  }
  console.log("WORKSHEETS DONE");
})();
