// apply_plans.js — splices the hand-authored plans in plans_3_14.js into the
// DECK_PLAN table in u1_decks.js for Lessons 3–14.
//
// v13 (Oct 9 2026): carries three new authored fields through, so a lesson can
// open on something other than a deck slide and can add its own agenda lines:
//   spec.order        — explicit slide/activity order (overrides the keymap order)
//   spec.sections     — { key: {kicker,title,items,activityType} } activity slides
//                       that have no entry in DECK_KEYMAP (hand-backs, section
//                       headings, non-worksheet activities)
//   spec.agendaExtra  — extra lines for the closing agenda slide
const fs = require("fs");
const { P } = require("./plans_3_14.js");
const { DECK_KEYMAP } = require("./u1_decks.js");

function buildPlan(n) {
  const spec = P[n], km = DECK_KEYMAP[n];
  const contentKeys = Object.keys(km).filter(k => k !== "title" && k !== "exit").sort((a, b) => km[a] - km[b]);
  const order = spec.order || ["title", ...contentKeys, "exit"];

  const activities = {};
  for (const k of order) if (k !== "title" && k !== "exit") activities[k] = {};
  // section/activity slides that carry their own content
  for (const [k, cfg] of Object.entries(spec.sections || {})) {
    if (!order.includes(k)) throw new Error(`L${n}: section "${k}" is not in order`);
    activities[k] = { section: true, ...cfg };
  }

  const letters = spec.parts.map(p => p[0]);
  const how = {}, reveals = {};
  for (const [letter, kind, howText, rev] of spec.parts) {
    how[letter] = howText;
    if (kind === "answers" || kind === "open") reveals[letter] = { kind, ...(rev || {}) };
  }
  if (!activities[spec.wsKey]) throw new Error(`L${n}: wsKey "${spec.wsKey}" is not in order`);
  activities[spec.wsKey] = { ...activities[spec.wsKey], ws: letters, reveal: true, how };

  const plan = { handoutKey: spec.wsKey, order, activities, reveals };
  if (spec.agendaExtra) plan.agendaExtra = spec.agendaExtra;
  if (spec.takehome) plan.takehome = spec.takehome;
  return plan;
}

// Replace entry `  N: { ... },` by counting braces, so it works whether the
// existing entry is a multi-line stub or a single line of spliced JSON.
function replaceEntry(src, n, text) {
  const head = `\n  ${n}: {`;
  const i = src.indexOf(head);
  if (i < 0) return null;
  let depth = 0, j = i + head.length - 1;
  for (; j < src.length; j++) {
    if (src[j] === "{") depth++;
    else if (src[j] === "}") { depth--; if (depth === 0) break; }
  }
  if (depth !== 0) return null;
  let end = j + 1;
  if (src[end] === ",") end++;
  return src.slice(0, i) + text + src.slice(end);
}

let src = fs.readFileSync("u1_decks.js", "utf8");
for (let n = 3; n <= 14; n++) {
  const plan = buildPlan(n);
  const next = replaceEntry(src, n, `\n  ${n}: ${JSON.stringify(plan)},`);
  if (next === null) { console.error("NO MATCH L" + n); process.exit(1); }
  src = next;
}
fs.writeFileSync("u1_decks.js", src);
console.log("spliced L3-14");
