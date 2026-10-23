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
// Vertical step for a stack of n rows starting at y0, each rowH tall, that must
// finish above limitY. Returns the preferred step when the stack already fits,
// otherwise the largest step that does fit, floored so rows never overlap badly.
// Both make_decks.js and fitcheck.js call this, so a unit with more items than
// the reference unit tightens the spacing instead of running into the footer.
function stackStep(n, y0, rowH, preferred, limitY, minStep) {
  if (n <= 1) return preferred;
  const available = limitY - y0 - rowH;
  const needed = available / (n - 1);
  return Math.max(minStep === undefined ? 0.50 : minStep, Math.min(preferred, needed));
}
function stackBottom(n, y0, step, rowH) {
  return n <= 0 ? y0 : y0 + (n - 1) * step + rowH;
}
module.exports = { autoSize, heightNeeded, fits, stackStep, stackBottom };
