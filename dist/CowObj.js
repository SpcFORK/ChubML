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

// src/CowObj.ts
var CowObj_exports = {};
__export(CowObj_exports, {
  default: () => CowObj_default
});
module.exports = __toCommonJS(CowObj_exports);

// src/eobj.ts
function eobj(obj, names = []) {
  if (!obj) throw new Error(`No object provided to eobj.`);
  if (obj?.name)
    names.push(obj.name);
  names.push("default");
  let eo = {};
  for (const name of names) {
    eo[name] = obj;
    try {
      window[name] = obj;
    } catch {
    }
  }
  try {
    module.exports = eo;
  } catch {
  }
  return eo;
}
var eobj_default = eobj(eobj).default;

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
//# sourceMappingURL=CowObj.js.map