export const chaosGl = globalThis as any;
export const chaosEval = chaosGl.eval;

export const NOOP = (): any => { };
export const ANOOP = async (): Promise<any> => { };
