import eobj from './eobj';

const chaosGl = globalThis as any;
const chaosEval = chaosGl.eval;

const NOOP = (): any => { };
const ANOOP = async (): Promise<any> => { };

const eo = new class cst {
  chaosGl = eobj(chaosGl, ['chaosGl']).default;
  chaosEval = eobj(chaosEval, ['chaosEval']).default;
  NOOP = eobj(NOOP, ['NOOP']).default;
  ANOOP = eobj(ANOOP, ['ANOOP']).default;
}

export default eobj(eo).default;