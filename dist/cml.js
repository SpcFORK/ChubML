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

// src/cml.ts
var cml_exports = {};
__export(cml_exports, {
  default: () => cml_default
});
module.exports = __toCommonJS(cml_exports);

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

// src/CustomEventHandle.ts
var { chaosGl: chaosGl3 } = cst_default;
var CustomEventHandle = class {
  constructor(event) {
    this.event = event;
    this.#e = new this.#_E(event);
    this.#init();
  }
  #globalBus = [];
  #setHandle = (e) => {
    this.#globalBus.push(e);
  };
  #removeHandler = (e) => this.#globalBus.splice(this.#globalBus.indexOf(e), 1);
  #clearHandler = () => this.#globalBus = [];
  #addHandler = (e) => this.#globalBus.push(e);
  private = false;
  #getHandle = () => ({
    event: this.event,
    globals: this.#globalBus,
    remove: this.#removeHandler,
    clear: this.#clearHandler,
    add: this.#addHandler,
    _: () => !this.private ? this : null,
    [Symbol.toStringTag]: "CustomEventHandle"
  });
  #makeHandle = (name) => ({
    set: this.#setHandle,
    get: this.#getHandle
  });
  #activateGlobalSets = () => Object.defineProperty(chaosGl3, this.event, this.#makeHandle(this.event));
  #init() {
    this.#activateGlobalSets();
  }
  get detail() {
    return Reflect.has(this.#e, "detail") ? this.#e.detail : null;
  }
  set detail(value) {
    this.makeEvent(this.event, value);
  }
  #e;
  #_E = globalThis.CustomEvent ? CustomEvent : Event;
  makeEvent(name, detail = {}) {
    return this.#e = new this.#_E(name, { detail });
  }
  activate() {
    for (const cb of this.#globalBus) cb(this.#e);
    dispatchEvent(this.#e);
  }
};
var CustomEventHandle_default = eobj_default(CustomEventHandle).default;

// src/checkEnvironment.ts
var { chaosEval: chaosEval2 } = cst_default;
var checkEnvironment = () => {
  let isImportSupported = false;
  try {
    chaosEval2("import.meta");
    isImportSupported = true;
  } catch {
  }
  if (isImportSupported) {
    return "ES Module";
  } else if (typeof module !== "undefined" && module?.exports && typeof window === "undefined") {
    return "Node";
  } else if (typeof window !== "undefined" && typeof window?.document !== "undefined") {
    return "Browser";
  } else {
    return "Unknown";
  }
};
var checkEnvironment_default = eobj_default(checkEnvironment, ["checkEnvironment"]).default;

// src/cml.ts
var { chaosGl: chaosGl4, chaosEval: chaosEval3, NOOP: NOOP3, ANOOP: ANOOP3 } = cst_default;
var ChubMLMod = class _ChubMLMod extends static_default {
  static ChubML = _ChubMLMod;
  ChubML = _ChubMLMod;
  static #ChubStarted = new CustomEventHandle_default("chubstart");
  static #ChubInjected = new CustomEventHandle_default("chubinjected");
  static {
    chaosGl4.lastChub ||= "";
    chaosGl4.cbMode ||= "";
    chaosGl4.chubLocation ||= "";
    chaosGl4.chubDev ||= false;
    chaosGl4.__lastQD = null;
    chaosGl4.__lastQM = null;
    chaosGl4.onload && (window.onload = () => {
      this.#ChubStarted.detail = this;
      this.#ChubStarted.activate();
    });
  }
  #makeDef = (_) => ({
    tag: "",
    id: "",
    class: "",
    content: "",
    data: "",
    style: "",
    attr: "",
    indent: 0,
    [Symbol.unscopables]: {
      _: _ || null,
      atBucket: []
    }
  });
  static #_(scope) {
    return Reflect.get(scope, Symbol.unscopables);
  }
  #un = _ChubMLMod.#_;
  static #_b(scope) {
    return this.#_(scope).atBucket;
  }
  #ab = _ChubMLMod.#_b;
  #makeIndexes = () => ({
    str: 0,
    tmp: 0
  });
  #specialTags = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ];
  static #getQM() {
    return chaosGl4.__lastQM;
  }
  static get __lastQM() {
    return this.#getQM();
  }
  static #setQM(val) {
    chaosGl4.__lastQM = val;
  }
  static set __lastQM(val) {
    this.#setQM(val);
  }
  get __lastQM() {
    return _ChubMLMod.__lastQM;
  }
  set __lastQM(val) {
    _ChubMLMod.__lastQM = val;
  }
  static #getQD() {
    return chaosGl4.__lastQD;
  }
  static get __lastQD() {
    return this.#getQD();
  }
  static #setQD(val) {
    chaosGl4.__lastQD = val;
  }
  static set __lastQD(val) {
    this.#setQD(val);
  }
  get __lastQD() {
    return _ChubMLMod.__lastQD;
  }
  set __lastQD(val) {
    _ChubMLMod.__lastQD = val;
  }
  get doc() {
    return document;
  }
  #setOrAppend(val, p) {
    if (typeof val === "string") this.body.innerHTML = val;
    else this.body.appendChild(val);
  }
  get body() {
    return document.body;
  }
  set body(val) {
    this.#setOrAppend(val, this.body);
  }
  get head() {
    return document.head;
  }
  set head(val) {
    this.#setOrAppend(val, this.head);
  }
  get html() {
    return document.documentElement;
  }
  get title() {
    return document.title;
  }
  set title(val) {
    document.title = val;
  }
  get chubLocation() {
    return chaosGl4.chubLocation;
  }
  set chubLocation(val) {
    chaosGl4.chubLocation = val;
  }
  get chubDev() {
    return chaosGl4.chubDev;
  }
  set chubDev(val) {
    chaosGl4.chubDev = val;
  }
  #orStr(str, def = "") {
    return str ? str : def;
  }
  #prepSpcIf(str) {
    return str ? str + " " : "";
  }
  s = static_default;
  styled = {};
  #Rexps = () => this.s.Rexps;
  #initialFormat(str) {
    let r = this.#Rexps;
    return str.replace(r().lineWithComment, "").replace(r().formatspace2, "\n").replace(r().formatspace1, "\n");
  }
  #cascadeIndentList(str) {
    let strLines = str.split(/;/);
    let col = [];
    for (const line of strLines) col.push({
      c: line.trim(),
      i: line.search(/\S/)
    });
    return col;
  }
  #sortCILIndent(contents) {
    const sortedContents = [];
    let parentStack = [];
    for (const content of contents) {
      const currentIndent = content.i;
      const currentContent = { c: content.c, i: currentIndent, children: [], parent: null };
      while (parentStack.length > 0 && currentIndent <= parentStack[parentStack.length - 1].i)
        parentStack.pop();
      if (parentStack.length > 0) {
        const parent = parentStack[parentStack.length - 1];
        currentContent.parent = parent;
        parent.children.push(currentContent);
      } else {
        sortedContents.push(currentContent);
      }
      parentStack.push(Object.assign(currentContent));
    }
    ;
    return sortedContents;
  }
  #handleScript(scrmatch) {
    const r = this.#Rexps;
    let src = scrmatch[1];
    let issrc = src.includes("src=");
    let execafter = src.includes('"execafter";\n');
    var dostill = true;
    const fetchScript = async (src2) => {
      let pt = await fetch(src2);
      let t = await pt.text();
      try {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.text = t;
        document.body.appendChild(script);
      } catch (error) {
        console.log(error, this.s.errorList.scripterror);
      }
    };
    if (issrc && scrmatch) {
      let srcis = src.match(/src="(.*)"/);
      if (srcis) {
        fetchScript(srcis[1]);
        dostill = false;
      }
    }
    if (scrmatch !== null && dostill) {
      try {
        chaosEval3(src);
      } catch (error) {
        console.error(error, this.s.errorList.scripterror);
      }
    }
  }
  #parseParam(param) {
    let p = this.attrSyn(param).join("");
    let r = this.#orStr(p);
    return r;
  }
  async #handleAtFetch(tempC, param) {
    window?.location?.origin && (param = `${param}`.includes("{{ORIG}}") ? param.replace("{{ORIG}}", window.location.origin) : param);
    tempC.tag = tempC.tag ? tempC.tag : "fetcherBlock";
    tempC.data = `${this.#prepSpcIf(tempC.data)}data-fetchw="${param}" data-instance="${(/* @__PURE__ */ new Date()).getTime()}"`;
    let fw = await fetch(await this.findFile([param])) || {
      text: () => {
        return param;
      }
    };
    let fwtext = await fw.text();
    tempC.content = `${fwtext ? fwtext : ""}`;
    if (window?.location?.origin) {
      let el = this.$(`[${tempC.data.split(" ").join("][")}]`);
      el && (el.innerHTML = tempC.content.replace(/\n/g, "\n</br>\n"));
    }
    return param;
  }
  #stealProp(tempC, prop) {
    let v = tempC[prop];
    tempC[prop] = "";
    return v;
  }
  #defEval(er) {
    return er ? chaosEval3(er) : {};
  }
  #stealAndTryToEval(tempC, prop) {
    if (!tempC[prop]) return {};
    try {
      var r = this.#defEval(this.#stealProp(tempC, prop));
    } catch {
    }
    return r;
  }
  #handleAtEval(tempC, ev) {
    let r = this.attrSyn(ev).join(";");
    let er = this.#stealAndTryToEval(tempC, "id");
    try {
      var scriptRes = new Function(r).bind(tempC)(er, tempC);
    } catch (error) {
      return console.error(error, this.s.errorList.scripterror);
    }
    this.chubDev && console.log("AtEval: ", scriptRes);
    scriptRes && this.#handleAtPutCont(tempC, scriptRes);
  }
  #handleAtRet(tempC, ev) {
    this.#handleAtEval(tempC, "return " + ev);
    this.chubDev && console.log("AtRet: ", ev);
  }
  #handleAtPutCont(tempC, param) {
    let r = this.#parseParam(param);
    tempC.content += r;
    this.chubDev && console.log("AtPutCont: ", param);
  }
  #handleAtCall(tempC, globalRef) {
    let r = this.#parseParam(globalRef);
    let res = chaosEval3(r);
    if (!res) throw new CowErr_default("CowErr", "No Call: " + r);
    if (typeof res !== "function") throw new CowErr_default("CowErr", "Not a function: " + r);
    let er = this.#stealAndTryToEval(tempC, "id");
    let cr = res.bind(tempC)(tempC, er);
    cr && this.#handleAtPutCont(tempC, cr);
    this.chubDev && console.log("Call: ", cr);
  }
  #handleAtFrom(tempC, param) {
    let r = this.#parseParam(param);
    let template = this.$(r);
    if (!template) throw new CowErr_default("CowErr", "No Template: " + r);
    let res = template.innerHTML;
    tempC.content += res;
    this.chubDev && console.log("AtFrom: ", res);
  }
  #handleAtImport(tempC, pv) {
    let res = this.beamMake(pv, true);
    res.then(({ doc }) => tempC.content += this.parse(doc));
  }
  #handleAtGlobalize(tempC, param) {
    let r = this.#parseParam(param);
    Object.defineProperty(chaosGl4, r, {
      get: () => tempC
    });
    this.chubDev && console.log("AtGlobalize: ", param);
  }
  #definePropertyWithHelper(target, property, value, helper) {
    target[property] = value;
    Reflect.defineProperty(chaosGl4, helper, {
      get: () => target[property],
      configurable: true,
      enumerable: true
    });
  }
  #dfi(res, fp, v) {
    this.#definePropertyWithHelper(res, fp, v, "__lastQD");
  }
  #dfp(res, fp, v) {
    this.#definePropertyWithHelper(res, fp, v, "__lastQM");
  }
  #handleAtMkPrp(tempC, p) {
    let [gobj, ...propNames] = p.split(".");
    let fp = propNames.pop();
    let g = chaosGl4[gobj];
    if (!fp)
      throw new CowErr_default("CowErr", "No property name: " + p);
    if (!g)
      throw new CowErr_default("CowErr", "No Global Object: " + gobj);
    let res = g;
    for (const propName of propNames) {
      res = res[propName];
      if (!res)
        throw new CowErr_default("CowErr", "No Property: " + propName);
    }
    this.#dfp(res, fp, this.#stealAndTryToEval(tempC, "id"));
    this.chubDev && console.log("MkPrp: ", p, fp, g, res, res[fp]);
  }
  #handleAtDef(tempC, param) {
    let er = this.#stealProp(tempC, "id");
    this.#dfi(chaosGl4, param, this.#defEval(er));
    this.chubDev && console.log("AtDef: ", param);
  }
  #handleAtAsg(tempC, param) {
    let propName = this.attrSyn(param);
    let er = this.#stealProp(tempC, "id");
    let res = propName.join(";");
    if (er) {
      Reflect.set(chaosGl4, er, res);
      tempC.content += er;
    } else new CowErr_default("CowErr", "No Property: " + res).throw();
    this.chubDev && console.log("AtAsg: ", tempC, res, er);
  }
  // #watchVar(tempC: ChubNode, param: string) {
  //   let v: unknown;
  // }
  /** @@ - At Codes */
  #handleAtCode(tempC, param) {
    if (typeof param !== "string") return;
    if (this.chubDev)
      console.log("using @: ", `${param}`.slice(1).split(/[=]/));
    const S_name = param.slice(1);
    function prune(len) {
      let p = S_name.slice(len + 1);
      _ChubMLMod.#_b(tempC).push(p);
      return p;
    }
    function starts(str) {
      return S_name.startsWith(str);
    }
    switch (true) {
      case starts("fetchw"):
        this.#handleAtFetch(tempC, prune(6));
        break;
      case starts("eval"):
        this.#handleAtEval(tempC, prune(4));
        break;
      case starts("ret"):
        this.#handleAtRet(tempC, prune(3));
        break;
      case starts(":"):
        this.#handleAtPutCont(tempC, prune(0));
        break;
      case starts("call"):
        this.#handleAtCall(tempC, prune(4));
        break;
      case starts("from"):
        this.#handleAtFrom(tempC, prune(4));
        break;
      case starts("import"):
        this.#handleAtImport(tempC, prune(6));
        break;
      case starts("gl"):
        this.#handleAtGlobalize(tempC, prune(2));
        break;
      case starts("mkprp"):
        this.#handleAtMkPrp(tempC, prune(5));
        break;
      case starts("def"):
        this.#handleAtDef(tempC, prune(3));
        break;
      case starts("asg"):
        this.#handleAtAsg(tempC, prune(3));
        break;
      case starts("%"):
        this.#handleAtCode(tempC, prune(1));
        break;
      default:
        console.log("no valid @ found...?", param);
    }
    return param;
  }
  #appendAttr(tempC, nodeName, newAttr, expectedPrefixLen = 1) {
    let pv = newAttr.slice(expectedPrefixLen);
    tempC[nodeName] = this.#prepSpcIf(tempC[nodeName].toString()) + pv;
  }
  #handleClass(tempC, param) {
    this.#appendAttr(tempC, "class", param);
  }
  #handleID(tempC, param) {
    this.#appendAttr(tempC, "id", param);
  }
  #handleData(tempC, param) {
    this.#addAttribute(tempC, param, "data", true);
  }
  #handlePercAttr(tempC, param) {
    this.#addAttribute(tempC, param, "attr", false);
  }
  #addAttribute(tempC, param, type, isData) {
    let attrParam = this.attrSyn(param);
    if (!attrParam) return;
    let name = attrParam[0].slice(1);
    let value = attrParam[1];
    let attrB = `${name}="${value}"`;
    isData && (attrB = `data-${attrB}`);
    tempC[type] = this.#prepSpcIf(tempC[type]) + attrB;
  }
  #handleChubAttr(param, tempC, paramI) {
    switch (param[0]) {
      case "#":
        this.#handleID(tempC, param);
        break;
      case ".":
        this.#handleClass(tempC, param);
        break;
      case "$":
        this.#handleData(tempC, param);
        break;
      case "%":
        this.#handlePercAttr(tempC, param);
        break;
      case "@":
        param = this.#handleAtCode(tempC, param);
        break;
      default:
        tempC.tag = this.#prepSpcIf(tempC.tag) + param;
    }
    return param;
  }
  #checkAttr = (tempC, arr) => arr.forEach((param, paramI) => {
    param = this.#handleChubAttr(param, tempC, paramI);
  });
  #traverse(cil, i, indexes, v = "") {
    const r = this.#Rexps;
    let indentString = "  ";
    let str = cil.c;
    let isStr = str.search(r().betweenQuote);
    let hasOpts = str.search(r().betweenCol);
    let isscr = str.match(r().script);
    let def = this.#makeDef(cil);
    let tempC = this.#makeDef(cil);
    isscr !== null && this.#handleScript(r().script.exec(str));
    if (isStr !== -1) {
      let tempLines = str.split(r().betweenCol);
      let content = str.split(r().betweenQuote)[1];
      if (hasOpts == null) {
        tempC = def;
      } else {
        var inner = tempLines[1] || "";
        this.#checkAttr(tempC, inner.split(" "));
      }
      indexes.str++;
      tempC.content = content;
    } else {
      this.#checkAttr(tempC, str.split(" "));
    }
    cil.o = tempC;
    cil.i = indentString.repeat(i);
    cil.children && cil.children.forEach((child) => this.#traverse(child, i + 1, indexes, v));
    return [cil, indexes];
  }
  // @ Templates
  #parseTemplates(cil, opts = this.#makeIndexes()) {
    const { o } = cil;
    let isTemplate = false;
    if (!o) throw new CowErr_default(`No CIL object found!`);
    switch (o.tag) {
    }
    return { isTemplate };
  }
  #handleSHead(html, lessNl) {
    for (let stydm in this.styled) if (this.styled[stydm] === true && this.styled.styles[stydm]) {
      let p = lessNl ? "" : "\n";
      html = html.replace("<head>", "<head>" + p + this.styled.styles[stydm]);
      this.styled[stydm] = "has";
    }
    return html;
  }
  #handleSpecialTag(html, lessNl) {
    html.includes("head") && (html = this.#handleSHead(html, lessNl));
    return html;
  }
  #handleCNAttr(html, o) {
    const is = (v) => !!v;
    const addTo = (v) => html += v;
    if (is(o.class))
      addTo(` class="${o.class}"`);
    if (is(o.id))
      addTo(` id="${o.id}"`);
    if (is(o.style))
      addTo(` style="${o.style}"`);
    if (is(o.data))
      addTo(` ${o.data}`);
    if (is(o.attr))
      addTo(` ${o.attr}`);
    return html;
  }
  #buildHeadTag(html, cil, o, isSpecial, shorter, lessNl) {
    let p = lessNl ? "" : "\n";
    html = p + `${lessNl ? "" : cil.i}<${o.tag}`;
    html = this.#handleCNAttr(html, o);
    if (isSpecial > 0)
      shorter = true;
    let end = ">" + p;
    if (shorter) html += " /";
    html += end;
    return { html, shorter };
  }
  #handleBuildChild(child, html, opts, lessNl) {
    let p = lessNl ? "" : child.i;
    switch (child.c[0]) {
      case '"':
        html += p + child.c.slice(1, child.c.length - 1);
        break;
      default:
        html += p + this.#parseChubNode(child, opts, lessNl);
    }
    return html;
  }
  #buildChildren(cil, html, opts, lessNl) {
    for (const child of cil.children)
      html = this.#handleBuildChild(child, html, opts, lessNl);
    return html;
  }
  #buildFootTag(html, shorter, cil, o, lessNl) {
    let p = lessNl ? "" : "\n";
    html += p;
    if (!shorter) html += `${lessNl ? "" : cil.i}</${o.tag}>${p}`;
    if (html.includes("<>")) html = html.replace("<>", "").replace("</>", "");
    return html;
  }
  #buildContent(cil, html, lessNl) {
    let p = lessNl ? "" : cil.i + "  ";
    if (cil.o?.content)
      html += p + cil.o.content;
    return html;
  }
  #parseChubNode(cil, opts = this.#makeIndexes(), lessNl = false) {
    const o = cil.o;
    if (!o) throw new CowErr_default(`No CIL object found!`);
    let shorter = false;
    let specialfind = this.arrMatch(o.tag, this.#specialTags);
    let isSpecial = specialfind.count;
    let inList = specialfind.list;
    let html = "";
    let { isTemplate } = this.#parseTemplates(cil, opts);
    ({ html, shorter } = this.#buildHeadTag(html, cil, o, isSpecial, shorter, lessNl));
    html = this.#buildContent(cil, html, lessNl);
    html = this.#buildChildren(cil, html, opts, lessNl);
    html = this.#buildFootTag(html, shorter, cil, o, lessNl);
    html = this.#handleSpecialTag(html, lessNl);
    return html;
  }
  #constuctFrom(cil, lessNl, v = "") {
    let indexes = this.#makeIndexes();
    let travRes = this.#traverse(cil, 0, indexes, v);
    {
      [cil, indexes] = travRes;
    }
    let res = this.#parseChubNode(cil, indexes, lessNl);
    return res;
  }
  parse(source, lessNl) {
    let str = this.#initialFormat(source);
    let indList = this.#cascadeIndentList(str);
    let sorted = this.#sortCILIndent(indList);
    return this.#constuctFrom(sorted[0], lessNl);
  }
  async findFile(fileLocations) {
    for (const location of fileLocations) {
      try {
        var res = await fetch(location);
      } catch (error) {
        console.error(`Error fetching file from '${location}':`, error);
      }
      if (res?.ok)
        return location;
    }
    return null;
  }
  ChubRep(doc, quirky = "<!DOCTYPE html>") {
    doc = this.parse(doc, true);
    document.open();
    document.write(quirky + "\n" + doc);
    document.close();
  }
  injectChub(input) {
    var htmlCode = this.parse(input, true);
    if (this.chubDev == true) console.log(htmlCode);
    let locationB = this.chubLocation || "chub";
    let locationGot = this.$(locationB);
    if (!locationGot) locationB = "body";
    else locationGot.innerHTML = htmlCode;
    _ChubMLMod.#ChubInjected.detail = locationGot;
    _ChubMLMod.#ChubInjected.activate();
  }
  Router = class Router {
    __env__ = checkEnvironment_default();
    constructor() {
      switch (this.__env__) {
        case "Node":
          break;
        case "Browser":
          break;
      }
    }
  };
  // Reformat Attributes to prevent conflicts and such.
  CHUBfax(tex, sep = " ") {
    let modtxt = tex || "";
    modtxt = modtxt.replaceAll("=", "|e|").replaceAll(";", "|c|").replaceAll('"', "|q|").replaceAll(sep, "|");
    return modtxt;
  }
  attrSyn(tex) {
    if (`${tex}`.match(/=/gm)?.length > 1) throw this.s.errorList.eqspl3;
    let eqTok = " spcfork.Equals.Token ";
    let piTok = " spcfork.Pipe.Token ";
    let attrParam = tex.replaceAll("=", eqTok).replaceAll("\\|", piTok).replaceAll("|e|", "=").replaceAll("|c|", ";").replaceAll("|q|", '"').replaceAll("|", " ").replaceAll(piTok, "|").split(eqTok);
    return attrParam;
  }
  /**
   * Fetch a web page and convert it to CHUB
   * @param {string} url The URL of the web page to fetch
   * @returns The CHUB representation of the web page
   */
  async CHUBWFetch(url) {
    const response = await fetch(url);
    if (!response?.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);
    const html = await response.text();
    return this.HTMLToChub(html);
  }
  getURLbit() {
    var url = window.location.href;
    var parts = url.split("/");
    var lastPart = parts[parts.length - 1];
    return lastPart;
  }
  CHUBsanitize(input) {
    var element = document.createElement("div");
    element.innerText = input;
    var sanitizedInput = element.innerHTML;
    return sanitizedInput;
  }
  DupeCollection = {};
  /**
   * @param {string} dupe - The dupe to be added to the collection.
   * @returns {object} - The edited dupe, the dupe collection, and the stringified and parsed collection.
   */
  CHUBduper(dupe = "p;") {
    if (!this.DupeCollection) {
      this.DupeCollection = {};
    }
    if (this.DupeCollection[dupe] !== void 0) {
      this.DupeCollection[dupe] += 1;
    } else {
      this.DupeCollection[dupe] = 0;
    }
    let editedDupe;
    if (dupe.includes(";")) {
      let d2 = dupe.split(";");
      d2[0] += ` #${this.DupeCollection[dupe]}`;
      editedDupe = d2.join("");
    } else {
      editedDupe = dupe + ";";
    }
    let d = {
      editedDupe,
      D: this.DupeCollection,
      s: () => JSON.stringify(this.DupeCollection),
      c: () => JSON.parse(d.s())
    };
    return d;
  }
  CHUBstrprep(str) {
    return str.replace(/[.*+?^${}()|[\]\\"';:]/g, "\\$&").replace(/[;]/g, "|c|");
  }
  CHUBunmess(str) {
    const escapedStr = str.replace(/\\\"/g, '"');
    const unescapedStr = escapedStr.replace(/\\\|c|/g, ",");
    return [
      unescapedStr,
      JSON.parse(unescapedStr)
    ];
  }
  MLTextToNodes(str, type = "text/html") {
    return new DOMParser().parseFromString(str, type);
  }
  Chubify(str) {
    let parsedHTML = this.parse(str, true);
    let parsedDOM = this.MLTextToNodes(parsedHTML, "text/html");
    return parsedDOM;
  }
  // ARARARAR
  HTMLToChub = (html, delim = "") => {
    if (html instanceof Element) html = html.outerHTML;
    const doc = this.MLTextToNodes(html, "text/html");
    return this.getChubML(doc.documentElement, "", delim);
  };
  getChubML = (node, indent = "", delim = "") => {
    let chubML = "";
    chubML += `${indent}${node.nodeName.toLowerCase()}`;
    if (node.attributes.length > 0) {
      const attrs = Array.from(node.attributes);
      chubML = this.#handleAttr(attrs, chubML);
    }
    if (node.childNodes.length > 0)
      chubML = this.#handleChildren(chubML, node, indent, delim);
    else
      chubML += ";\n";
    return chubML;
  };
  #handleChildTextNode(child, indent) {
    if (!child.textContent) return "";
    let t = child.textContent.trim();
    if (t != "") return `${indent}  "${t}";
`;
    return "";
  }
  #handleChildren(chubML, node, indent, delim) {
    chubML += ";\n";
    const childNodes = Array.from(node.childNodes);
    for (const child of childNodes) switch (child.nodeType) {
      case Node.TEXT_NODE:
        chubML += this.#handleChildTextNode(child, indent);
        break;
      case Node.ELEMENT_NODE:
        chubML += this.getChubML(child, indent + "  ", delim);
        break;
    }
    chubML += `${indent}${delim}
`;
    return chubML;
  }
  #handleAttr(attrs, chubML) {
    const cfv = (attr) => this.CHUBfax(attr.value);
    for (const attr of attrs) switch (attr.name.toLowerCase()) {
      case "class":
        chubML += ` .${cfv(attr)}`;
        break;
      case "id":
        chubML += ` #${cfv(attr)}`;
      default:
        chubML += ` %${attr.name}=${cfv(attr)}`;
    }
    return chubML;
  }
  aliasIndexes = [
    "beam.lmc",
    "beam.chub",
    "index.lmc",
    "index.chub"
  ];
  async #checkFile(loc, opts = {}) {
    let req = await fetch(loc, { method: "HEAD", ...opts });
    return [req.ok, req];
  }
  async #getFileSafely(loc) {
    let [ok, okRes] = await this.#checkFile(loc);
    if (!ok) throw new Error(`File not found!`);
    let req = await fetch(loc);
    return { req, okRes };
  }
  async #findFileOfCases(fileLocations) {
    for (const loc of fileLocations) {
      let [ok, okRes] = await this.#checkFile(loc);
      if (ok) return loc;
    }
    return null;
  }
  #batchFile = (handleFile, loc) => new Promise(async (resolve, reject) => {
    try {
      await handleFile(loc, resolve);
    } catch (error) {
      reject(error);
    }
  });
  async #batchFileOfCases(fileLocations) {
    let pArr = [];
    let abortController = new AbortController();
    const handleFile = async (loc, resolve) => {
      if (abortController.signal.aborted) throw new Error("Aborted");
      let [f] = await this.#checkFile(loc, { signal: abortController.signal });
      if (f) abortController.abort();
      resolve([loc, f]);
    };
    for (const loc of fileLocations)
      pArr.push(this.#batchFile(handleFile, loc));
    let resses = await Promise.all(
      pArr.map((p) => p.catch((e) => ["", false]))
    );
    for (const [res, ok] of resses)
      if (ok) return res;
    return null;
  }
  async #fileOrFallback(loc, slowly = false) {
    let [ok, okRes] = await this.#checkFile(loc);
    if (ok) return loc;
    let choice = slowly ? this.#findFileOfCases : this.#batchFileOfCases;
    return await choice(this.aliasIndexes);
  }
  async beamPrep(location, slowly) {
    let fileName = await this.#fileOrFallback(location, slowly);
    if (!fileName)
      throw new Error(`File not found!`);
    let req = await this.#getFileSafely(fileName);
    chaosGl4.lastChub = req;
    return { ...req, location };
  }
  async beamParse(req, location = "") {
    let text = await req.text();
    let doc = this.parse(text, true);
    return { text, doc, location };
  }
  async beamMake(location, slowly) {
    let { req } = await this.beamPrep(location, slowly);
    return await this.beamParse(req, location);
  }
  async beamDo(req, DOM) {
    let { text, doc, location } = await this.beamParse(req);
    this.beamRender(doc, DOM, { location, text });
  }
  beamRender(doc, DOM, optionalDetails = {}) {
    this.chubDev && console.log(doc);
    let entrypoint = DOM || this.chubLocation || "chub";
    let locationGot = typeof entrypoint == "string" ? this.$(entrypoint) || document.body : entrypoint;
    locationGot.innerHTML = doc;
    _ChubMLMod.#ChubInjected.detail = {
      nodes: locationGot,
      text: doc,
      ...optionalDetails
    };
    _ChubMLMod.#ChubInjected.activate();
  }
  async beamSync(location, DOM, slowly = false) {
    let { req } = await this.beamPrep(location, slowly);
    return async () => await this.beamDo(req, DOM);
  }
  /**
   * Example usage:
   * 
   * ```typescript
   * const cml = new ChubMLMod();
   * cml.beamChub('/path/to/chub/file', document.getElementById('app'), true);
   * ```
   * 
   * @param slowly - If true, errors are ignored and execution using a quicker Promise.all, this is better for users, worse for servers.
   */
  async beamChub(location, DOM, slowly = false) {
    return await (await this.beamSync(location, DOM, slowly))();
  }
  constructor() {
    super();
    try {
      this.#elevateToWindow();
    } catch {
    }
  }
  #elevateToWindow() {
  }
};
var __ChubI = new ChubMLMod();
var cml_default = eobj_default(__ChubI, ["ChubML", "ChubMLMod"]).default;
//# sourceMappingURL=cml.js.map