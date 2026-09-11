// Standing order (Sep 9 2026): every text a lesson references appears in full in that lesson's deck.
const { STORY_ONE, STORY_TWO } = require("./stories");
const WORDS_PER_SLIDE = 150;
function paginate(paras) {
  const pages = []; let cur = [], n = 0;
  const push = () => { if (cur.length) pages.push(cur); cur = []; n = 0; };
  for (const p of paras) {
    const w = p.split(/\s+/).length;
    if (w > WORDS_PER_SLIDE) {                     // split a long paragraph at sentence ends
      const sents = p.match(/[^.!?]+[.!?]+["\u201d]?\s*|[^.!?]+$/g) || [p];
      let chunk = "", cw = 0;
      for (const s of sents) { const sw = s.split(/\s+/).length; if (cw + sw > WORDS_PER_SLIDE && chunk) { if (n + cw > WORDS_PER_SLIDE) push(); cur.push(chunk.trim()); n += cw; chunk = ""; cw = 0; } chunk += s; cw += sw; }
      if (chunk) { if (n + cw > WORDS_PER_SLIDE) push(); cur.push(chunk.trim()); n += cw; }
      continue;
    }
    if (n + w > WORDS_PER_SLIDE) push();
    cur.push(p); n += w;
  }
  push();
  return pages;
}
function textsFor(lesson) {
  const out = [];
  if ([6, 7].includes(lesson.n)) out.push({ title: STORY_ONE.title, label: "Class text", pages: paginate(STORY_ONE.paras) });
  if (lesson.n === 11) out.push({ title: STORY_TWO.title, label: "Class text", pages: paginate(STORY_TWO.paras) });
  return out;
}
module.exports = { textsFor, paginate };
