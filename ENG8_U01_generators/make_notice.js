// make_notice.js — ENG8 U1 "One Small Thing" object-talk take-home notice (docx).
// Referenced in u1_content.js (materials/L1) but never generated until now.
// Date is left OPEN (a fill line); carries the four-criterion ENG8 speaking rubric.
const fs = require("fs");
const path = require("path");
const D = require("docx");
const { Document, Packer, Paragraph, TextRun, BorderStyle, ShadingType, WidthType,
        Table, TableRow, TableCell, AlignmentType, TabStopType, LeaderType } = D;
const H = require("./docxhelp.js");
const { UNIT } = require("./u1_content.js");

const OUT = process.argv[2] || path.join(__dirname, "..", "out");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
const sectionProps = { page: { size: H.LETTER.size, margin: H.MARGINS } };
const CONTENT_W = 8760;

function fillLine(label){
  return new Paragraph({
    children:[ H.run(label+"  ", { bold:true, color:H.C.navy, size:22 }),
               new TextRun({ text:"\t", size:22, font:"Calibri", color:"9AA7B4" }) ],
    tabStops:[{ type:TabStopType.RIGHT, position:CONTENT_W, leader:LeaderType.UNDERSCORE }],
    spacing:{ after:160, before:40, line:300 },
  });
}

// four-criterion speaking rubric, 4-point BC proficiency scale
const RUBRIC = {
  levels: ["Emerging", "Developing", "Proficient", "Extending"],
  criteria: [
    ["Focus — one small moment",
      "Talk wanders or lists many things.",
      "Mostly one moment, with some drift.",
      "Stays on one small moment throughout.",
      "One vivid moment, every detail earning its place."],
    ["Detail — showing, not telling",
      "Names feelings; few concrete details.",
      "Some details a listener can picture.",
      "Clear sensory or specific detail brings it to life.",
      "Precise, chosen detail makes the moment memorable."],
    ["Delivery — voice and pace",
      "Hard to hear or follow; very rushed or flat.",
      "Audible; pace uneven in places.",
      "Clear, steady pace the class can follow.",
      "Controlled pace and emphasis that hold attention."],
    ["Listening — as an audience member",
      "Does not attend while others speak.",
      "Attends to most talks.",
      "Attends and responds to others using the protocol.",
      "Attends closely and lifts others' talks with response."],
  ],
};

function rubricTable(){
  const widths = [2460, 1575, 1575, 1575, 1575];
  const head = ["Criterion", ...RUBRIC.levels].map(t=>({t,bold:true}));
  const rows = [head, ...RUBRIC.criteria.map(r=>r.map((c,i)=> i===0?{t:c,bold:true,color:H.C.navy}:{t:c}))];
  return H.table(rows, widths, { headerRow:true });
}

function noticeDoc(){
  const c = [];
  c.push(new Paragraph({ children:[H.run(`${UNIT.code} · Unit ${UNIT.number} · English Language Arts 8`, {size:18,color:H.C.midGrey})], spacing:{after:20} }));
  c.push(H.h1("\u201COne Small Thing\u201D \u2014 Object Talk"));
  c.push(H.subtitle("A take-home notice \u00B7 Mr. Reid \u00B7 SD38 Richmond"));

  c.push(H.h2("What your child is doing", H.C.blue));
  c.push(H.text("Our first unit is about telling true stories from our own lives. To warm up our speaking and listening, every student prepares a short \u201Cobject talk\u201D: they bring in one small object, photo, or artifact that matters to them and talk about it for one to two minutes \u2014 what it is, and the small moment or memory attached to it."));
  c.push(H.text("It is deliberately low-stakes. The point is to give every student an easy, personal way into speaking in front of others, and to gather the raw material they will later write about."));

  c.push(H.h2("What to bring", H.accentFor(2)));
  ["One object, photo, or small artifact \u2014 something that fits in a backpack and is safe to bring to school.",
   "Nothing valuable or irreplaceable, please \u2014 a photo or photocopy is perfectly fine.",
   "No preparation to buy or print anything. This should cost nothing."].forEach(x=>c.push(H.bullet(x)));

  c.push(H.h2("When", H.accentFor(3)));
  c.push(H.text("Please have it at school by the date below.", { italics:true, color:H.C.midGrey }));
  c.push(fillLine("Bring the object to class by:"));

  c.push(H.h2("How the talk is assessed", H.accentFor(4)));
  c.push(H.text("The talk is a light speaking check on the four-point BC Proficiency Scale. It is not a graded speech \u2014 it is a first look at speaking and listening. Here is what I am looking for:", { size:22 }));
  c.push(rubricTable());
  c.push(H.spacer(120));

  c.push(H.h2("If speaking to the class feels hard", H.C.blue));
  c.push(H.text("That is completely normal, and there are options: your child may deliver the talk to a small group or just to me instead of the whole class, and may rehearse with a partner first. Please let me know and we will make it work."));

  c.push(H.spacer(160));
  c.push(H.text("Thank you for your support at home. A quick chat about which object to choose is often all it takes.", { size:22 }));
  c.push(H.spacer(120));
  c.push(H.text("Sincerely,", { size:22 }));
  c.push(H.text("Mr. Reid", { size:22, bold:true, color:H.C.navy }));
  c.push(H.text("English Language Arts 8 \u00B7 sreid@sd38.bc.ca", { size:20, color:H.C.midGrey }));

  return new Document({ numbering:H.NUMBERING, sections:[{ properties:sectionProps, children:c }] });
}

(async()=>{
  const buf = await Packer.toBuffer(noticeDoc());
  const name = `${UNIT.code}_U0${UNIT.number}_ObjectTalk_TakeHomeNotice_v1.docx`;
  fs.writeFileSync(path.join(OUT, name), buf);
  console.log("wrote", name, buf.length);
})();
