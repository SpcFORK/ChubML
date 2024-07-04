import eobj from './eobj';

const chaosGl = globalThis as any;
const chaosEval = chaosGl.eval;

const NOOP = (): any => { };
const ANOOP = async (): Promise<any> => { };

// Shim for Node
let r: NodeRequire = (() => { throw void 0 }) as any
try { r = require } catch { }

const eo = new class cst {
  chaosGl = eobj(chaosGl, ['chaosGl']).default;
  chaosEval = eobj(chaosEval, ['chaosEval']).default;
  NOOP = eobj(NOOP, ['NOOP']).default;
  ANOOP = eobj(ANOOP, ['ANOOP']).default;
  R = eobj(r, ['R']).default;
}

export default eobj(eo).default;