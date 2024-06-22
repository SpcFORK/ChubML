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

// src/CowErr.ts
var CowErr_exports = {};
__export(CowErr_exports, {
  CowErr: () => CowErr
});
module.exports = __toCommonJS(CowErr_exports);
var CowErr = class extends Error {
  constructor(message, ext) {
    super(Array.isArray(message) ? message.join("\n") : message);
    this.name = "CowErr" + (ext ? ` (${ext})` : "");
  }
  toss = (...params) => console.error(this, ...params);
  throw() {
    throw this;
  }
};
//# sourceMappingURL=CowErr.js.map