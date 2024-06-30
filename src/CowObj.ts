import eobj from './eobj';

class CowObj {
  SJSON() {
    return JSON.stringify(this);
  }

  toJSON() {
    return {
      ...this,
      __methods: this.extractMethods(),
    };
  }

  private extractMethods() {
    const methods: Record<string, string> = {};
    for (const key in this)
      if (typeof this[key] === 'function')
        methods[key] = String(this[key]);
    return methods;
  }
}

export default eobj(CowObj).default;

export type CowObject<Object = {}> = Object & Partial<{
  __methods: Record<string, string>;
}>