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

// src/static.ts
var static_exports = {};
__export(static_exports, {
  default: () => static_default
});
module.exports = __toCommonJS(static_exports);

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

// src/CowErr.ts
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
var CowErr_default = eobj_default(CowErr).default;

// src/static.ts
var { chaosGl: chaosGl2, ANOOP: ANOOP2, NOOP: NOOP2 } = cst_default;
var CML_Static = class _CML_Static {
  static CML_Static = _CML_Static;
  CML_Static = _CML_Static;
  static errorList = {
    // For Params: %lol=haha=asd => split at each `=` => greater than 3? => error.
    eqspl3: new CowErr_default([
      `You can't have 3 Equals characters (\`=\`)!`,
      `Try to shorten it please, use \`|e\``,
      `it is the escaped version of \`=\`.`,
      ,
      `Use: "meta %name=viewport %content=width|edevice-width;"`,
      `=> \`|e\` replaced with \`=\``,
      `=> "meta %name=viewport %content=width=device-width;"`
    ]),
    scripterror: new CowErr_default([
      `Apparently, you made an error loading or executing your script.`,
      `Look back and take a gander.`,
      ,
      `Potentially:`,
      `=> Check if you loaded the right file.`,
      `=> Check if you made a typo.`,
      `=> Check if you did not add the directory to the file.`,
      `=> Check if you did every thing else right.`,
      ,
      `=> If all else.cry :(`
    ])
  };
  static DisplayErrors = {
    noBeam: `
  c;
    beam;
      "Beam Failed!
      <br>
      Try to fix the simple Fetch error.
      <br>
      Shouldn't take long.";
    `
  };
  static Rexps = {
    quoteExept: /\n(?=(?:(?:[^"]*"){2})*[^"]*$)/gm,
    colExept: /\n(?=(?:(?:[^:]*:){2})*[^:]*$)/gm,
    betweenQuote: /"([a-zA-Z\s\S]+)"/gm,
    betweenCol: /^:([a-zA-Z\S\s]+):/gm,
    script: /\{\=([a-zA-Z\S\s][^;]+)\=\}/gm,
    comment: /\/\/(.*)\n{0,1}/gm,
    lineWithComment: /[^a-zA-Z0-9:-■\n]+((?:[\t ]{0,})\/\/(?:.*)\n{0,1})/gm,
    formatspace1: /\n{1,}/gm,
    formatspace2: /\n[\t \n]{0,}\n/gm
  };
  $(a) {
    return document.querySelector(a);
  }
  arrMatch(str, arr) {
    let count = 0;
    let list = [];
    for (let i = 0; i < arr.length; i++) if (str.includes(arr[i])) {
      count++;
      list.push(arr[i]);
    }
    return { count, list };
  }
};
var static_default = eobj_default(CML_Static).default;
//# sourceMappingURL=static.js.map