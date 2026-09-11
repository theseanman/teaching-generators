// ELL 3 U1 does not use the "model" worksheet part kind (that was the U10 model-letter
// annotation task). Stubbed so make_worksheets.js loads; wire to real content if a
// future unit reintroduces a model-annotation part.
const MODEL = { title: "", note: "", paras: [] };
const EXEMPLARS = null;
module.exports = { MODEL, EXEMPLARS };
