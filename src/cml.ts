// @ CowSTD
import { chaosGl, NOOP, ANOOP } from './cst';
import { CowErr } from './CowErr';

import './global'

var checkEnvironment = () => {
  let isImportSupported = false;
  try {
    eval('import.meta')
    isImportSupported = true;
  }
  catch { }

  if (isImportSupported) {
    // ES Module environment
    return 'ES Module';
  }

  else if (typeof module
    !== 'undefined'
    && module?.exports
    && typeof window
    === 'undefined') {
    // Node.js environment
    return 'Node';
  }

  else if (typeof window
    !== 'undefined'
    && typeof window?.document
    !== 'undefined') {
    // Browser environment
    return 'Browser';
  }

  else {
    // Unknown environment
    return 'Unknown';
  }
}

// @ CML
import { CML_Static } from './static';

interface CILElement {
  c: string;
  i: string | number;
}

interface ChubNode {
  tag: string,
  id: string,
  class: string,
  content: string,
  data: string,
  style: string,
  attr: string,
  indent: number,
}

interface SortedCILE extends CILElement {
  children: SortedCILE[]
  o?: ChubNode
}

type CILEList = CILElement[];
type SortedCIL = SortedCILE[];

/**
 * A ChubML instance.
 * 
 * =-=-=-=--=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=--=-=-=-=-
 *
 * 2024
 * SpcFORK - ChubML
 * Copyright (c) SpcFORK
 * 
 * =-=-=-=--=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=--=-=-=-=-
 *
 * ```go
 *       ,""""""""""""""""",^,"""""""""""",
 *     .l ?]]]]]]]]]]]]]]]].~.????????????.I
 *     ",!l]IIIIIIIIIIIIIIII,< ]]]]]]]]]]]] l
 *     l ]]]lllllllllllllIII:> ]]]]]]]]]]]] l
 *     l:iii>>>>>>>>>>>>>]]] ~ ]]]]]]]]]]]] l
 *     l`++++++++++++++++---.~ ]]]]]]]]]]]] l
 *     lIIIIIIIIIIIIIIIIIIII;~.??????----?? l
 *     lIlllllllllllllllllll:iI"""""",;:;''l;".
 *     l;lllllllllllllllllll:l    '^,,Iii??]-i;".
 *     `I,I:::::::::I,,,,,,,:`   ,;ii??]]]]]]]-i",
 *      ,:iiiiiiiii:,          :IIii!!!!!!!?]]]I:"
 *      l ]]]]]]]]] l           ^`````````l.]]]] i
 *      l ]]]]]]]]] l                   .`l.]]]]?.I
 *      l.?]]]]]]]] l         ,""""""""";!!?]]]]] l
 *      `i ]]]]]]]] l        I.?????????-]]]]]]]I";
 *       ;:I]]]]]]]l;""""""",! ]]]]]]]]]]]]]]]?!^;
 *        I,i-]]]]]]-???????.~ ]]]]]]]]]]]]]?!,,^
 *         ^IIi?-]]]]]]]]]]] ~ ]]]]]]]]]]??!,,^
 *           ^I"I!!!!!!!!!!!">:!!!!!!!!!!,",^
 *              ^```````````^ ^``````````^
 * ```
 * 
 * =-=-=-=--=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=--=-=-=-=-
 * 
 * TODO:
 * - Make code cleaner/compact.
 * - Make ECSS.
 * - Create CHUBECSS Parser.
 * 
 * =-=-=-=--=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=--=-=-=-=-
 * 
 * TOUR:
 *   *Q-Sel:
 *   $()
 *   *Array matcher
 *       arrMatch
 *   *Parser:
 *     parse()
 *       -> sortInd()
 *       -> stringi()
 *
 * =-=-=-=--=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=--=-=-=-=-
*/
export class ChubMLMod extends CML_Static {
  static ChubML = ChubMLMod
  ChubML = ChubMLMod

  // @ Options
  static {
    chaosGl.chubinjected = NOOP
    chaosGl.chubstart = NOOP

    chaosGl.lastChub ||= ""
    chaosGl.cbMode ||= ""

    window.onload = () =>
      chaosGl.chubstart?.()
  }

  s = CML_Static

  styled = {} as Record<string, any>

  #Rexps = () => this.s.Rexps
  #initialFormat(str: string) {
    let r = this.#Rexps
    return str
      .replace(r().lineWithComment, "")
      .replace(r().formatspace2, "\n")
      .replace(r().formatspace1, "\n")
  }

  #cascadeIndentList(str: string) {
    let strLines = str.split(/;/);

    let col = [] as CILEList

    for (const line of strLines) col.push({
      c: line.trim(),
      i: line.search(/\S/)
    });

    return col;
  }

  #sortCILIndent(contents: CILEList) {
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
    };

    return sortedContents
  }

  #makeDef = (): ChubNode => ({
    tag: "",
    id: "",
    class: "",
    content: "",
    data: "",
    style: "",
    attr: "",
    indent: 0,
  })

  #makeIndexes = () => ({
    str: 0,
    tmp: 0,
  })

  #specialTags = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ]

  #handleScript(scrmatch: string[] | null) {
    const r = this.#Rexps;

    let issrc = scrmatch![1].includes("src=");
    let execafter = scrmatch![1].includes("\"execafter\";\n");

    var dostill = true;

    const fetchScript = async (src: string) => fetch(src)
      .then((js) => {
        return js.text();
      })
      .then((text) => {
        // Append a script tag to the body
        try {
          let script = document.createElement("script");
          script.type = "text/javascript";
          script.text = text;
          document.body.appendChild(script);
        }
        catch (error) { console.log(error, this.s.errorList.scripterror); }
      });

    // Source Check
    if (issrc && scrmatch) {
      let srcis = scrmatch![1].match(/src="(.*)"/);
      if (srcis) {
        fetchScript(srcis[1]);

        dostill = false;
      }
    }

    // Eval content (not SRC).
    if (scrmatch !== null && dostill) {
      try { eval(scrmatch[1]) }
      catch (error) { console.error(error, this.s.errorList.scripterror) }
    }
  }

  #traverse(cil: SortedCILE, i: number, indexes: { str: any; tmp: number; }, v = ''): [SortedCILE, { str: number, tmp: number }] {
    const r = this.#Rexps

    let indentString = "  "

    let str = cil.c
    let isStr = str.search(r().betweenQuote)
    let hasOpts = str.search(r().betweenCol)
    let isscr = str.match(r().script)

    let def = this.#makeDef()
    let tempC = this.#makeDef()

    // Script Operation
    if (isscr !== null) {
      this.#handleScript(r().script.exec(str));
    }

    if (isStr !== -1) {
      let tempLines = str.split(r().betweenCol)
      let content = str.split(r().betweenQuote)[1]

      if (hasOpts == null) {
        tempC = def
      } else {
        var inner = tempLines[1] || ""
        this.#checkAttr(tempC, inner.split(" "))
      }

      indexes.str++
      tempC.content = content
    } else {
      this.#checkAttr(tempC, str.split(" "))
    }

    var indc = indentString.repeat(i)

    cil.o = tempC
    cil.i = indc

    if (cil.children) {
      cil.children.forEach(child => this.#traverse(child, i + 1, indexes, v));
    }

    return [cil, indexes]
  }

  #checkAttr = (tempC: ChubNode, arr: any[]) => arr.forEach((param, pind) => {
    // ATTR's
    switch (param[0]) {
      case "#":
        this.#handleID(tempC, param);
        break;

      case ".":
        this.#handleClass(tempC, param);
        break;

      case "$":
        let dataParam = this.attrSyn(param);
        if (!dataParam) return;

        let dataB = `data-${dataParam[0].slice(1) + "=\"" + dataParam[1] + "\""}`;
        tempC.data = `${tempC.data ? tempC.data + " " : ""}${dataB}`;
        break;

      case "%":
        let attrParam = this.attrSyn(param);
        if (!attrParam) return;

        let attrB = `${attrParam[0].slice(1) + "=\"" + attrParam[1] + "\""}`;
        // console.log(attrB)
        tempC.attr = `${tempC.attr ? tempC.attr + " " : ""}${attrB}`;

        break;

      case "@":
        /*
          We need to:
 
          Extract the @val from the param.
          If as params, get params.
 
          E.G.
          @fetchw=https://www.google.com
        */
        param = this.#handleAtCode(param, tempC);
        break;

      default:
        tempC.tag = `${tempC.tag ? tempC.tag + " " : ""}${param}`;
    }
  })

  #handleClass(tempC: ChubNode, param: any) {
    tempC.class = `${tempC.class ? tempC.class + " " : ""}${param.replace(".", " ")}`;
  }

  #handleID(tempC: ChubNode, param: any) {
    tempC.id = `${tempC.id ? tempC.id + " " : ""}${param.replace("#", " ")}`;
  }

  #handleAtCode(param: any, tempC: ChubNode) {
    console.log("using @", `${param}`.slice(8), `${param}`.split(/[|:>=\-\)!~]/gm)[1].slice(1));

    if (param.includes("fetchw")) (async () => {
      param = param.slice(8);

      if (window?.location?.origin) {
        param = `${param}`.includes("{{ORIG}}")
          ? param.replace("{{ORIG}}", window.location.origin)
          : param;
      }

      tempC.tag = tempC.tag
        ? tempC.tag
        : 'fetcherBlock';

      tempC.data = (
        `${tempC.data ? tempC.data + " " : ""}data-fetchw="${param}"`
        + ` data-instance="${new Date().getTime()}"`
      );

      let fw = await fetch(await this.findFile([param])) || {
        text: () => { return param; },
      };

      let fwtext = await fw.text();
      tempC.content = `${fwtext ? fwtext : ""}`;

      // If window is loaded before script end, replace content.
      if (window?.location?.origin) {
        let el = this.$(`[${tempC.data.split(' ').join('][')}]`)
        if (el)
          el.innerHTML = tempC.content.replace(/\n/g, '\n</br>\n');
      }
    })();
    return param;
  }

  #parseChubNode(cil: SortedCILE, opts = this.#makeIndexes()) {
    const o = cil.o!
    if (!o) throw new CowErr(`No CIL object found!`)

    let isTemplate = false
    let shorter = false

    let specialfind = this.arrMatch(o.tag, this.#specialTags)
    let isSpecial = specialfind.count
    let inList = specialfind.list

    let html = ''

    this.#parseTemplates(cil, opts);

    html = `\n${cil.i}<${o.tag}`;

    const is = (v: any) => !!v
    const addTo = (v: any) => html += v

    switch (true) {
      // case !!o().class: html += ` class="${o().class.slice(1)}"`
      case is(o.class): addTo(` class="${o.class
        }"`)
      case is(o.id): addTo(` id="${o.id}"`)
      case is(o.style): addTo(` style="${o.style}"`)
      case is(o.data): addTo(` ${o.data}`)
      case is(o.attr): addTo(` ${o.attr}`)
    }

    if (isSpecial > 0) shorter = true

    html += shorter
      ? " />\n"
      : ">\n";

    // This is enough for certain tags.
    for (const child of cil.children) switch (child.c[0]) {
      case "\"":
        html += child.i + child.c.slice(1, child.c.length - 1);
        break;

      default:
        html += child.i + this.#parseChubNode(child, opts);
    }

    html += !shorter
      ? `\n${cil.i}</${o.tag}>\n`
      : "\n"

    // ¯\_(ツ)_/¯ Quickest fix.
    if (html.search("<>")) html = html
      .replace("<>", "")
      .replace("</>", "")

    if (html.includes("head")) {

      for (let stydm in this.styled) {
        if (this.styled[stydm] === true && this.styled.styles[stydm]) {
          html = html.replace("<head>", "<head>\n" + this.styled.styles[stydm])

          // Set to "has" since we check earlier if the value is false to define it
          // Also, might use later, need to exist, not be true.
          this.styled[stydm] = "has"
        }
      }

    }

    return html
  }

  #parseTemplates(cil: SortedCILE, opts = this.#makeIndexes()) {
    const { o } = cil
    if (!o) throw new CowErr(`No CIL object found!`)
    switch (o.tag) {

    }
  }

  #constuctFrom(cil: SortedCILE, v = '') {
    let indexes = this.#makeIndexes()

    let travRes = this.#traverse(cil, 0, indexes, v);

    // @Crossover
    { [cil, indexes] = travRes }

    let res = this.#parseChubNode(cil, indexes)

    return res
  }

  parse(source: string) {
    let str = this.#initialFormat(source)

    let indList = this.#cascadeIndentList(str)

    let sorted = this.#sortCILIndent(indList);

    return this.#constuctFrom(sorted[0]);
  }

  async findFile(fileLocations: any) {
    for (const location of fileLocations) {
      try {
        const response = await fetch(location);

        // Check if the response was successful (status code in the range of 200-299)
        if (response.ok) {
          return location; // Return the valid file location
        }
      } catch (error) {
        // Handle any errors that occur during the fetch request
        console.error(`Error fetching file from '${location}':`, error);
      }
    }

    // Return null if no valid file location was found
    return null;
  }

  ChubRep(doc: string, quirky = "<!DOCTYPE html>") {
    (doc as any) = this.parse(doc);
    document.open();
    document.write(quirky + '\n' + doc);
    document.close();
  }

  injectChub(input: string) {
    // var input = `
    // div;
    //   "wow, im super simple. <br>
    //   and supper COOOL!";
    //   hr #wow $hey=lol .very .omg .neat %omg=js|is|cool;
    //   :Super .cool: "WOOO!";
    //     span .woah;
    //       "wow!";
    // `;

    var htmlCode = this.parse(input);

    if (chaosGl.chubDev == true) console.log(htmlCode)

    let locationB = chaosGl.chubLocation || "chub"
    let locationGot = this.$(locationB)
    if (!locationGot) locationB = "body"
    else locationGot.innerHTML = htmlCode;

    // On finish, run finish.
    chaosGl.chubinjected?.(locationGot);
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

  }

  // Reformat Attributes to prevent conflicts and such.
  CHUBfax(tex: string, sep = " ") {
    let modtxt = tex || "";
    modtxt = modtxt
      .replace("=", "|e")
      .replace(";", "|col")
      .replace("\"", "|qw")
      .replace(sep, "|")

    return modtxt
  }

  attrSyn(tex: string) {
    try {
      if (`${tex}`.match(/=/gm)!?.length > 1) throw this.s.errorList.eqspl3

      let attrParam = tex
        // Tokenize
        .replace("=", " spcfork.Equals.Token ")
        .replace("\\|", " spcfork.Pipe.Token ")

        .replace(/\|e/gm, "=")
        .replace(/\|col/gm, ";")
        .replace(/\|qw/gm, "\"")
        .replace(/\|/gm, " ")

        .replace(" spcfork.Pipe.Token ", "|")

        // Split at Token to prevent multiple splits.
        .split(" spcfork.Equals.Token ")

      // console.log(attrParam.length, attrParam)
      return attrParam
    } catch { }
  }

  /**
   * Fetch a web page and convert it to CHUB
   * @param {string} url The URL of the web page to fetch
   * @returns The CHUB representation of the web page
   */
  async CHUBWFetch(url: string | URL | Request): Promise<string> {
    const response = await fetch(url);
    if (!response?.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);
    const html = await response.text();
    console.log(this.htmlToChub(html));
    return this.htmlToChub(html);
  }

  getURLbit() {
    var url = window.location.href;
    var parts = url.split('/');
    var lastPart = parts[parts.length - 1];

    return lastPart;
  }

  CHUBsanitize(input: string) {
    var element = document.createElement('div');
    element.innerText = input;
    var sanitizedInput = element.innerHTML;
    return sanitizedInput;
  }

  DupeCollection = {} as Record<string, any>
  /**
   * @param {string} dupe - The dupe to be added to the collection.
   * @returns {object} - The edited dupe, the dupe collection, and the stringified and parsed collection.
   */
  CHUBduper(dupe: string = "p;"): object {
    if (!this.DupeCollection) {
      this.DupeCollection = {};
    }

    if (this.DupeCollection[dupe] !== undefined) {
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
      s: (() => JSON.stringify(this.DupeCollection)),
      c: (() => JSON.parse(JSON.stringify(this.DupeCollection))),
    };
  }

  CHUBstrprep(str: string) {
    return str
      .replace(/[.*+?^${}()|[\]\\"';:]/g, '\\$&')
      .replace(/[;]/g, '|col')
  }

  CHUBunmess(str: string) {
    const escapedStr = str.replace(/\\\"/g, '"');
    const unescapedStr = escapedStr.replace(/\\\|col/g, ',');

    return [
      unescapedStr,
      JSON.parse(unescapedStr),
    ]
  }

  // ARARARAR
  htmlToChub = (html: string, delim = "") => {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    return this.#getChubML(doc.documentElement, '', delim)
  }

  #getChubML = (node: Element, indent = '', delim = '') => {
    let chubML = '';

    // Process node name
    chubML += `${indent}${node.nodeName.toLowerCase()}`;

    // Process attributes

    if (node.attributes.length > 0) {
      const attrs = Array.from(node.attributes);
      chubML = this.#handleAttr(attrs, chubML);
    }

    // Process child nodes
    if (node.childNodes.length > 0)
      chubML = this.#handleChildren(chubML, node, indent, delim);
    else
      chubML += ';\n';

    return chubML;
  }

  #handleChildTextNode(child: Element, indent: string) {
    if (!child.textContent) return '';
    let t = child.textContent.trim();
    if (t != "") return `${indent}  "${t}";\n`;
  }

  #handleChildren(chubML: string, node: Element, indent: string, delim: string) {
    chubML += ';\n';
    const childNodes = Array.from(node.childNodes);
    for (const child of childNodes) switch (child.nodeType) {
      case Node.TEXT_NODE:
        chubML += this.#handleChildTextNode(child as Element, indent);
        break;
      case Node.ELEMENT_NODE:
        chubML += this.#getChubML(child as Element, indent + '  ', delim);
        break;
    }
    chubML += `${indent}${delim}\n`;
    return chubML;
  }

  #handleAttr(attrs: Attr[], chubML: string) {
    const cfv = (attr: Attr) => this.CHUBfax(attr.value)
    for (const attr of attrs) switch (attr.name.toLowerCase()) {
      case 'class':
        chubML += ` .${cfv(attr)}`;
        break;
      case 'id':
        chubML += ` #${cfv(attr)}`;

      default: chubML += ` %${attr.name}=${cfv(attr)}`;
    }
    return chubML;
  }

  constructor() {
    super()

    try { this.#elevateToWindow() } catch { }
  }

  #elevateToWindow() {
    
  }
}

const chubml = new ChubMLMod;

// @ Exporter
try { module.exports = chubml } catch { }
try { chaosGl.window.ChubML = chubml } catch { }