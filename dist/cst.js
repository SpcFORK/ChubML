if (globalThis.window) globalThis.module ||= { exports: {} }
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/cst.ts
var cst_exports = {};
__export(cst_exports, {
  default: () => cst_default
});
module.exports = __toCommonJS(cst_exports);

// src/eobj.ts
function eobj(obj, names = []) {
  if (!obj) throw new Error(`No object provided to eobj.`);
  if (obj?.name)
    names.push(obj.name);
  names.push("default");
  let eo2 = {};
  for (const name of names) {
    eo2[name] = obj;
    try {
      window[name] = obj;
    } catch {
    }
  }
  try {
    module.exports = eo2;
  } catch {
  }
  return eo2;
}
var eobj_default = eobj(eobj).default;

// src/cst.ts
var chaosGl = globalThis;
var chaosEval = chaosGl.eval;
var NOOP = () => {
};
var ANOOP = async () => {
};
var eo = new class cst {
  chaosGl = eobj_default(chaosGl, ["chaosGl"]).default;
  chaosEval = eobj_default(chaosEval, ["chaosEval"]).default;
  NOOP = eobj_default(NOOP, ["NOOP"]).default;
  ANOOP = eobj_default(ANOOP, ["ANOOP"]).default;
}();
var cst_default = eobj_default(eo).default;
//# sourceMappingURL=cst.js.map