if (globalThis.window) globalThis.module ||= { exports: {} }
import {
  eobj_default
} from "./chunk-HSOLDJ7R.mjs";

// src/CowObj.ts
var CowObj = class {
  SJSON() {
    return JSON.stringify(this);
  }
  toJSON() {
    return {
      ...this,
      __methods: this.extractMethods()
    };
  }
  extractMethods() {
    const methods = {};
    for (const key in this)
      if (typeof this[key] === "function")
        methods[key] = String(this[key]);
    return methods;
  }
};
var CowObj_default = eobj_default(CowObj).default;
export {
  CowObj_default as default
};
//# sourceMappingURL=CowObj.mjs.map