// Shared text-fitting maths, used by BOTH make_decks.js and fitcheck.js so the
// guard checks the same geometry the generator actually renders.
function autoSize(strings, base, min, budget) {
  const longest = Math.max(...strings.map((s) => String(s).length), 1);
  if (longest <= budget) return base;
  const scaled = base * Math.sqrt(budget / longest);
  return Math.max(min, Math.round(scaled * 2) / 2);
}
// Approximate rendered height (inches) of a string in a box of given width.
function heightNeeded(str, fontPt, boxWidthIn) {
  const charsPerLine = Math.max(8, Math.floor((boxWidthIn * 96) / (fontPt * 0.50)));
  const lines = Math.max(1, Math.ceil(String(str).length / charsPerLine));
  return (lines * fontPt * 1.22) / 72;
}
function fits(str, fontPt, boxWidthIn, boxHeightIn) {
  return heightNeeded(str, fontPt, boxWidthIn) <= boxHeightIn + 0.02;
}
module.exports = { autoSize, heightNeeded, fits };
