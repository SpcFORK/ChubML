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
  CowObj: () => CowObj
});
module.exports = __toCommonJS(CowObj_exports);
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
//# sourceMappingURL=CowObj.js.map