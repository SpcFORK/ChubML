import {
  CustomEventHandle
} from "./chunk-MNUPYKPY.mjs";
import {
  chaosEval,
  chaosGl
} from "./chunk-P4A2X2EY.mjs";
import "./chunk-TGZ7WOTJ.mjs";
import {
  CML_Static
} from "./chunk-BJUEP7UN.mjs";
import {
  CowErr
} from "./chunk-AAIK3BUI.mjs";

// src/cml.ts
var checkEnvironment = () => {
  let isImportSupported = false;
  try {
    chaosEval("import.meta");
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
var ChubMLMod = class _ChubMLMod extends CML_Static {
  static ChubML = _ChubMLMod;
  ChubML = _ChubMLMod;
  static #ChubStarted = new CustomEventHandle("chubstart");
  static #ChubInjected = new CustomEventHandle("chubinjected");
  static {
    chaosGl.lastChub ||= "";
    chaosGl.cbMode ||= "";
    chaosGl.chubLocation ||= "";
    window.onload = () => {
      this.#ChubStarted.detail = this;
      this.#ChubStarted.activate();
    };
  }
  s = CML_Static;
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
      const currentContent = { c: content.c, i: currentIndent, children: [] };
      while (parentStack.length > 0 && currentIndent <= parentStack[parentStack.length - 1].i)
        parentStack.pop();
      if (parentStack.length > 0) {
        const parent = parentStack[parentStack.length - 1];
        parent.children.push(currentContent);
      } else {
        sortedContents.push(currentContent);
      }
      parentStack.push(Object.assign(currentContent));
    }
    ;
    return sortedContents;
  }
  #makeDef = () => ({
    tag: "",
    id: "",
    class: "",
    content: "",
    data: "",
    style: "",
    attr: "",
    indent: 0
  });
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
  #handleScript(scrmatch) {
    const r = this.#Rexps;
    let issrc = scrmatch[1].includes("src=");
    let execafter = scrmatch[1].includes('"execafter";\n');
    var dostill = true;
    const fetchScript = async (src) => fetch(src).then((js) => {
      return js.text();
    }).then((text) => {
      try {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.text = text;
        document.body.appendChild(script);
      } catch (error) {
        console.log(error, this.s.errorList.scripterror);
      }
    });
    if (issrc && scrmatch) {
      let srcis = scrmatch[1].match(/src="(.*)"/);
      if (srcis) {
        fetchScript(srcis[1]);
        dostill = false;
      }
    }
    if (scrmatch !== null && dostill) {
      try {
        chaosEval(scrmatch[1]);
      } catch (error) {
        console.error(error, this.s.errorList.scripterror);
      }
    }
  }
  async #handleAtFetch(param, tempC) {
    param = param.slice(8);
    if (window?.location?.origin) {
      param = `${param}`.includes("{{ORIG}}") ? param.replace("{{ORIG}}", window.location.origin) : param;
    }
    tempC.tag = tempC.tag ? tempC.tag : "fetcherBlock";
    tempC.data = `${tempC.data ? tempC.data + " " : ""}data-fetchw="${param}" data-instance="${(/* @__PURE__ */ new Date()).getTime()}"`;
    let fw = await fetch(await this.findFile([param])) || {
      text: () => {
        return param;
      }
    };
    let fwtext = await fw.text();
    tempC.content = `${fwtext ? fwtext : ""}`;
    if (window?.location?.origin) {
      let el = this.$(`[${tempC.data.split(" ").join("][")}]`);
      if (el)
        el.innerHTML = tempC.content.replace(/\n/g, "\n</br>\n");
    }
    return param;
  }
  #handleAtCode(tempC, param) {
    console.log("using @", `${param}`.slice(8), `${param}`.split(/[|:>=\-\)!~]/gm)[1].slice(1));
    if (param.includes("fetchw"))
      this.#handleAtFetch(param, tempC);
    return param;
  }
  #handleClass(tempC, param) {
    let p = param.slice(1);
    tempC.class = `${tempC.class ? tempC.class + " " : ""}${p}`;
  }
  #handleID(tempC, param) {
    let p = param.slice(1);
    tempC.id = `${tempC.id ? tempC.id + " " : ""}${p}`;
  }
  #handleData(tempC, param) {
    let dataParam = this.attrSyn(param);
    if (!dataParam) return;
    let dataB = `data-${dataParam[0].slice(1) + '="' + dataParam[1] + '"'}`;
    tempC.data = `${tempC.data ? tempC.data + " " : ""}${dataB}`;
  }
  #handlePercAttr(tempC, param) {
    let attrParam = this.attrSyn(param);
    if (!attrParam) return;
    let attrB = `${attrParam[0].slice(1) + '="' + attrParam[1] + '"'}`;
    tempC.attr = `${tempC.attr ? tempC.attr + " " : ""}${attrB}`;
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
        tempC.tag = `${tempC.tag ? tempC.tag + " " : ""}${param}`;
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
    let def = this.#makeDef();
    let tempC = this.#makeDef();
    if (isscr !== null) {
      this.#handleScript(r().script.exec(str));
    }
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
    if (cil.children) {
      cil.children.forEach((child) => this.#traverse(child, i + 1, indexes, v));
    }
    return [cil, indexes];
  }
  // @ Templates
  #parseTemplates(cil, opts = this.#makeIndexes()) {
    const { o } = cil;
    let isTemplate = false;
    if (!o) throw new CowErr(`No CIL object found!`);
    switch (o.tag) {
    }
    return { isTemplate };
  }
  #handleSHead(html) {
    for (let stydm in this.styled) if (this.styled[stydm] === true && this.styled.styles[stydm]) {
      html = html.replace("<head>", "<head>\n" + this.styled.styles[stydm]);
      this.styled[stydm] = "has";
    }
    return html;
  }
  #handleSpecialTag(html) {
    if (html.includes("head")) {
      html = this.#handleSHead(html);
    }
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
  #buildHeadTag(html, cil, o, isSpecial, shorter) {
    html = `
${cil.i}<${o.tag}`;
    html = this.#handleCNAttr(html, o);
    if (isSpecial > 0)
      shorter = true;
    html += shorter ? " />\n" : ">\n";
    return { html, shorter };
  }
  #buildChildren(cil, html, opts) {
    for (const child of cil.children)
      switch (child.c[0]) {
        case '"':
          html += child.i + child.c.slice(1, child.c.length - 1);
          break;
        default:
          html += child.i + this.#parseChubNode(child, opts);
      }
    return html;
  }
  #buildFootTag(html, shorter, cil, o) {
    html += !shorter ? `
${cil.i}</${o.tag}>
` : "\n";
    if (html.search("<>"))
      html = html.replace("<>", "").replace("</>", "");
    return html;
  }
  #parseChubNode(cil, opts = this.#makeIndexes()) {
    const o = cil.o;
    if (!o) throw new CowErr(`No CIL object found!`);
    let shorter = false;
    let specialfind = this.arrMatch(o.tag, this.#specialTags);
    let isSpecial = specialfind.count;
    let inList = specialfind.list;
    let html = "";
    let { isTemplate } = this.#parseTemplates(cil, opts);
    ({ html, shorter } = this.#buildHeadTag(html, cil, o, isSpecial, shorter));
    html = this.#buildChildren(cil, html, opts);
    html = this.#buildFootTag(html, shorter, cil, o);
    html = this.#handleSpecialTag(html);
    return html;
  }
  #constuctFrom(cil, v = "") {
    let indexes = this.#makeIndexes();
    let travRes = this.#traverse(cil, 0, indexes, v);
    {
      [cil, indexes] = travRes;
    }
    let res = this.#parseChubNode(cil, indexes);
    return res;
  }
  parse(source) {
    let str = this.#initialFormat(source);
    let indList = this.#cascadeIndentList(str);
    let sorted = this.#sortCILIndent(indList);
    return this.#constuctFrom(sorted[0]);
  }
  async findFile(fileLocations) {
    for (const location of fileLocations) {
      try {
        const response = await fetch(location);
        if (response.ok) {
          return location;
        }
      } catch (error) {
        console.error(`Error fetching file from '${location}':`, error);
      }
    }
    return null;
  }
  ChubRep(doc, quirky = "<!DOCTYPE html>") {
    doc = this.parse(doc);
    document.open();
    document.write(quirky + "\n" + doc);
    document.close();
  }
  injectChub(input) {
    var htmlCode = this.parse(input);
    if (chaosGl.chubDev == true) console.log(htmlCode);
    let locationB = chaosGl.chubLocation || "chub";
    let locationGot = this.$(locationB);
    if (!locationGot) locationB = "body";
    else locationGot.innerHTML = htmlCode;
    _ChubMLMod.#ChubInjected.detail = locationGot;
    _ChubMLMod.#ChubInjected.activate();
  }
  Router = class Router {
    __env__ = checkEnvironment();
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
    modtxt = modtxt.replaceAll("=", "|e").replaceAll(";", "|col").replaceAll('"', "|qw").replaceAll(sep, "|");
    return modtxt;
  }
  attrSyn(tex) {
    if (`${tex}`.match(/=/gm)?.length > 1) throw this.s.errorList.eqspl3;
    let attrParam = tex.replace("=", " spcfork.Equals.Token ").replace("\\|", " spcfork.Pipe.Token ").replace(/\|e/gm, "=").replace(/\|col/gm, ";").replace(/\|qw/gm, '"').replace(/\|/gm, " ").replace(" spcfork.Pipe.Token ", "|").split(" spcfork.Equals.Token ");
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
      let d = dupe.split(";");
      d[0] += ` #${this.DupeCollection[dupe]}`;
      editedDupe = d.join("");
    } else {
      editedDupe = dupe + ";";
    }
    return {
      editedDupe,
      D: this.DupeCollection,
      s: () => JSON.stringify(this.DupeCollection),
      c: () => JSON.parse(JSON.stringify(this.DupeCollection))
    };
  }
  CHUBstrprep(str) {
    return str.replace(/[.*+?^${}()|[\]\\"';:]/g, "\\$&").replace(/[;]/g, "|col");
  }
  CHUBunmess(str) {
    const escapedStr = str.replace(/\\\"/g, '"');
    const unescapedStr = escapedStr.replace(/\\\|col/g, ",");
    return [
      unescapedStr,
      JSON.parse(unescapedStr)
    ];
  }
  MLTextToNodes(str, type = "text/html") {
    return new DOMParser().parseFromString(str, type);
  }
  Chubify(str) {
    let parsedHTML = this.parse(str);
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
    "beam.cma",
    "beam.chub",
    "bm.cma",
    "bm.chub",
    "index.cma",
    "index.chub",
    "i.cma",
    "i.chub"
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
      let [f] = await this.#checkFile(loc, { signal: abortController.signal });
      if (f) abortController.abort();
      resolve([loc, f]);
    };
    for (const loc of fileLocations) pArr.push(this.#batchFile(handleFile, loc));
    let resses = await Promise.all(pArr.map((p) => p.catch((e) => [null, false])));
    for (const [res, ok] of resses)
      if (ok) return res;
    return null;
  }
  async #fileOrFallback(loc, slowly = false) {
    let [ok, okRes] = await this.#checkFile(loc);
    if (ok) return loc;
    return slowly ? await this.#findFileOfCases(this.aliasIndexes) : await this.#batchFileOfCases(this.aliasIndexes);
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
    let fileName = await this.#fileOrFallback(location, slowly);
    if (!fileName) throw new Error(`File not found!`);
    let { req } = await this.#getFileSafely(fileName);
    chaosGl.lastChub = req;
    let text = await req.text();
    let doc = this.parse(text);
    if (chaosGl.chubDev == true)
      console.log(doc);
    let entrypoint = DOM || chaosGl.chubLocation || "chub";
    let locationGot = this.$(entrypoint);
    if (!locationGot) locationGot = document.body;
    locationGot.innerHTML = doc;
    _ChubMLMod.#ChubInjected.detail = locationGot;
    _ChubMLMod.#ChubInjected.activate();
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
var chubml = new ChubMLMod();
try {
  module.exports = chubml;
} catch {
}
try {
  chaosGl.window.ChubML = chubml;
} catch {
}
export {
  ChubMLMod
};
//# sourceMappingURL=cml.mjs.map