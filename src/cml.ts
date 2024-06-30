// @ CowSTD
import cst from './cst';
const { chaosGl, chaosEval, NOOP, ANOOP } = cst;

import CowErr from './CowErr';

// Global
import type * as gl from '../global';

// @ CML
import type { CILEList, ChubNode, SortedCILE } from './CILEList';

import CML_Static from './static';
import CustomEventHandle from './CustomEventHandle';
import checkEnvironment from './checkEnvironment';
import eobj from './eobj';

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

 * - Implement CowStack !!

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
class ChubMLMod extends CML_Static {
  static ChubML = ChubMLMod
  ChubML = ChubMLMod

  static #ChubStarted = new CustomEventHandle('chubstart');
  static #ChubInjected = new CustomEventHandle('chubinjected');

  // @ Options
  static {
    chaosGl.lastChub ||= ""
    chaosGl.cbMode ||= ""
    chaosGl.chubLocation ||= ""
    chaosGl.chubDev ||= false

    chaosGl.__lastQD = null
    chaosGl.__lastQM = null

    chaosGl.onload && (window.onload = () => {
      this.#ChubStarted.detail = this
      this.#ChubStarted.activate();
    })
  }

  #makeDef = (_?: SortedCILE): ChubNode => ({
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
  })

  static #_(scope: { [key: string]: any, [Symbol.unscopables]: any }): Record<string, any> {
    return Reflect.get(scope, Symbol.unscopables)
  }
  #un = ChubMLMod.#_

  static #_b(scope: { [key: string]: any, [Symbol.unscopables]: any }): string[] {
    return this.#_(scope).atBucket
  }
  #ab = ChubMLMod.#_b

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

  static #getQM() {
    return chaosGl.__lastQM
  }
  static get __lastQM() {
    return this.#getQM()
  }

  static #setQM(val: string) {
    chaosGl.__lastQM = val
  }
  static set __lastQM(val) {
    this.#setQM(val)
  }

  get __lastQM() {
    return ChubMLMod.__lastQM
  }
  set __lastQM(val) {
    ChubMLMod.__lastQM = val
  }

  static #getQD() {
    return chaosGl.__lastQD
  }
  static get __lastQD() {
    return this.#getQD()
  }

  static #setQD(val: string) {
    chaosGl.__lastQD = val
  }
  static set __lastQD(val) {
    this.#setQD(val)
  }

  get __lastQD() {
    return ChubMLMod.__lastQD
  }
  set __lastQD(val) {
    ChubMLMod.__lastQD = val
  }

  get doc() {
    return document
  }

  #setOrAppend(val: string | Element, p: Element) {
    if (typeof val === 'string') this.body.innerHTML = val
    else this.body.appendChild(val)
  }

  get body() {
    return document.body
  }
  set body(val) {
    this.#setOrAppend(val, this.body)
  }

  get head() {
    return document.head
  }
  set head(val) {
    this.#setOrAppend(val, this.head)
  }

  get html() {
    return document.documentElement
  }
  get title() {
    return document.title
  }
  set title(val) {
    document.title = val
  }

  get chubLocation(): string {
    return chaosGl.chubLocation
  }
  set chubLocation(val) {
    chaosGl.chubLocation = val
  }

  get chubDev(): boolean {
    return chaosGl.chubDev
  }
  set chubDev(val) {
    chaosGl.chubDev = val
  }

  #orStr(str: string, def = '') {
    return str ? str : def
  }

  #prepSpcIf(str: string) {
    return str ? str + ' ' : ''
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
    };

    return sortedContents
  }

  #handleScript(scrmatch: string[] | null) {
    const r = this.#Rexps;

    let src = scrmatch![1]
    let issrc = src.includes("src=");
    let execafter = src.includes("\"execafter\";\n");

    var dostill = true;

    const fetchScript = async (src: string) => {
      let pt = await fetch(src)
      let t = await pt.text()

      // Append a script tag to the body
      try {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.text = t;
        document.body.appendChild(script);
      }
      catch (error) { console.log(error, this.s.errorList.scripterror); }
    };

    // Source Check
    if (issrc && scrmatch) {
      let srcis = src.match(/src="(.*)"/);
      if (srcis) {
        fetchScript(srcis[1]);
        dostill = false;
      }
    }

    // Eval content (not SRC).
    if (scrmatch !== null && dostill) {
      try { chaosEval(src) }
      catch (error) { console.error(error, this.s.errorList.scripterror) }
    }
  }

  #parseParam(param: string) {
    let p = this.attrSyn(param).join('');
    let r = this.#orStr(p);
    return r;
  }

  async #handleAtFetch(tempC: ChubNode, param: string) {
    // param = param.slice(8); // @fetchw=

    window?.location?.origin && (
      param = `${param}`.includes("{{ORIG}}")
        ? param.replace("{{ORIG}}", window.location.origin)
        : param
    );

    tempC.tag = tempC.tag
      ? tempC.tag
      : 'fetcherBlock';

    tempC.data = (
      `${this.#prepSpcIf(tempC.data)}data-fetchw="${param}"`
      + ` data-instance="${new Date().getTime()}"`
    );

    let fw = await fetch(await this.findFile([param])) || {
      text: () => { return param; },
    };

    let fwtext = await fw.text();
    tempC.content = `${fwtext ? fwtext : ""}`;

    // If window is loaded before script end, replace content.
    if (window?.location?.origin) {
      let el = this.$(`[${tempC.data.split(' ').join('][')}]`);
      el && (
        el.innerHTML = tempC.content.replace(/\n/g, '\n</br>\n')
      )
    }
    return param;
  }

  #stealProp<T>(tempC: T, prop: keyof T) {
    let v = tempC[prop];
    (tempC[prop] as any) = '';
    return v
  }

  #defEval(er: string | number | { _: SortedCILE | null; atBucket: string[]; }): any {
    return er ? chaosEval(er) : {};
  }

  #stealAndTryToEval(tempC: ChubNode, prop: keyof ChubNode) {
    if (!tempC[prop]) return {};
    try { var r = this.#defEval(this.#stealProp(tempC, prop)) } catch { }
    return r!
  }

  #handleAtEval(tempC: ChubNode, ev: string) {
    let r = this.attrSyn(ev).join(';');
    let er = this.#stealAndTryToEval(tempC, 'id')

    try { var scriptRes = new Function(r).bind(tempC)(er, tempC) }
    catch (error) { return console.error(error, this.s.errorList.scripterror) }

    this.chubDev && console.log("AtEval: ", scriptRes);
    scriptRes && this.#handleAtPutCont(tempC, scriptRes);
  }

  #handleAtRet(tempC: ChubNode, ev: string) {
    this.#handleAtEval(tempC, 'return ' + ev);
    this.chubDev && console.log("AtRet: ", ev);
  }

  #handleAtPutCont(tempC: ChubNode, param: string) {
    let r = this.#parseParam(param)
    tempC.content += r
    this.chubDev && console.log("AtPutCont: ", param);
  }

  #handleAtCall(tempC: ChubNode, globalRef: string) {
    let r = this.#parseParam(globalRef)
    let res = chaosEval(r)

    if (!res) throw new CowErr("CowErr", "No Call: " + r)
    if (typeof res !== 'function') throw new CowErr("CowErr", "Not a function: " + r)

    let er = this.#stealAndTryToEval(tempC, 'id')
    let cr = res.bind(tempC)(tempC, er)
    cr && this.#handleAtPutCont(tempC, cr)

    this.chubDev && console.log("Call: ", cr);
  }

  #handleAtFrom(tempC: ChubNode, param: string) {
    let r = this.#parseParam(param)
    let template = this.$(r)
    if (!template) throw new CowErr("CowErr", "No Template: " + r)
    let res = template.innerHTML
    tempC.content += res
    this.chubDev && console.log("AtFrom: ", res)
  }

  #handleAtImport(tempC: ChubNode, pv: string) {
    let res = this.beamMake(pv, true);
    res.then(({ doc }) => tempC.content += this.parse(doc))
  }

  #handleAtGlobalize(tempC: ChubNode, param: string) {
    let r = this.#parseParam(param)
    Object.defineProperty(chaosGl, r, {
      get: () => tempC
    })
    this.chubDev && console.log("AtGlobalize: ", param);
  }

  #definePropertyWithHelper(target: any, property: string, value: any, helper: any) {
    target[property] = value;
    Reflect.defineProperty(chaosGl, helper, {
      get: () => target[property],
      configurable: true,
      enumerable: true
    });
  }

  #dfi(res: any, fp: string, v: any) {
    this.#definePropertyWithHelper(res, fp, v, '__lastQD');
  }

  #dfp(res: any, fp: string, v: any) {
    this.#definePropertyWithHelper(res, fp, v, '__lastQM');
  }

  #handleAtMkPrp(tempC: ChubNode, p: string) {
    let [gobj, ...propNames] = p.split('.');
    let fp = propNames.pop();
    let g = chaosGl[gobj];

    if (!fp)
      throw new CowErr("CowErr", "No property name: " + p);
    if (!g)
      throw new CowErr("CowErr", "No Global Object: " + gobj);

    let res = g;
    for (const propName of propNames) {
      res = res[propName];
      if (!res)
        throw new CowErr("CowErr", "No Property: " + propName);
    }

    // var er = this.#stealProp(tempC, 'id');
    this.#dfp(res, fp, this.#stealAndTryToEval(tempC, 'id'));

    this.chubDev && console.log("MkPrp: ", p, fp, g, res, res[fp]);
  }

  #handleAtDef(tempC: ChubNode, param: string) {
    let er = this.#stealProp(tempC, 'id');
    this.#dfi(chaosGl, param, this.#defEval(er!));

    this.chubDev && console.log("AtDef: ", param);
  }

  #handleAtAsg(tempC: ChubNode, param: string) {
    let propName = this.attrSyn(param)
    let er = this.#stealProp(tempC, 'id') as string
    let res = propName.join(';')

    if (er) {
      Reflect.set(chaosGl, er, res)
      tempC.content += er
    } else new CowErr('CowErr', 'No Property: ' + res).throw()

    this.chubDev && console.log("AtAsg: ", tempC, res, er);
  }

  // #watchVar(tempC: ChubNode, param: string) {
  //   let v: unknown;
  // }

  /** @@ - At Codes */
  #handleAtCode(tempC: ChubNode, param: any) {
    if (typeof param !== "string") return;
    /*
      We need to:

      Extract the @val from the param.
      If as params, get params.

      E.G.
      tag @fetchw=https://www.google.com
    */
    if (this.chubDev)
      console.log("using @: ", `${param}`.slice(1).split(/[=]/));

    const S_name = param.slice(1)
    function prune(len: number): string {
      let p = S_name.slice(len + 1);
      ChubMLMod.#_b(tempC).push(p);
      return p
    }
    function starts(str: string): boolean {
      return S_name.startsWith(str);
    }

    switch (true) {

      // @@ Std 1

      case starts('fetchw'):
        this.#handleAtFetch(tempC, prune(6));
        break;

      case starts('eval'):
        this.#handleAtEval(tempC, prune(4));
        break;

      case starts('ret'):
        this.#handleAtRet(tempC, prune(3));
        break;

      case starts(':'):
        this.#handleAtPutCont(tempC, prune(0));
        break;

      case starts('call'):
        this.#handleAtCall(tempC, prune(4));
        break;

      case starts('from'):
        this.#handleAtFrom(tempC, prune(4));
        break;

      case starts('import'):
        this.#handleAtImport(tempC, prune(6));
        break;

      case starts('gl'):
        this.#handleAtGlobalize(tempC, prune(2));
        break;

      case starts('mkprp'):
        this.#handleAtMkPrp(tempC, prune(5));
        break;

      case starts('def'):
        this.#handleAtDef(tempC, prune(3));
        break;

      case starts('asg'):
        this.#handleAtAsg(tempC, prune(3));
        break;

      case starts('%'):
        this.#handleAtCode(tempC, prune(1));
        break;

      // ---

      default: console.log("no valid @ found...?", param);
    }

    return param;
  }

  #appendAttr(tempC: ChubNode, nodeName: keyof ChubNode, newAttr: string, expectedPrefixLen = 1) {
    let pv = (newAttr as string).slice(expectedPrefixLen);
    (tempC[nodeName] as any) = this.#prepSpcIf(tempC[nodeName].toString()) + pv;
  }

  #handleClass(tempC: ChubNode, param: any) {
    this.#appendAttr(tempC, 'class', param);
  }

  #handleID(tempC: ChubNode, param: any) {
    this.#appendAttr(tempC, 'id', param);
  }

  #handleData(tempC: ChubNode, param: any) {
    this.#addAttribute(tempC, param, 'data', true);
  }

  #handlePercAttr(tempC: ChubNode, param: any) {
    this.#addAttribute(tempC, param, 'attr', false);
  }

  #addAttribute(tempC: ChubNode, param: any, type: 'data' | 'attr', isData: boolean) {
    let attrParam = this.attrSyn(param);
    if (!attrParam) return;

    let name = attrParam[0].slice(1)
    let value = attrParam[1];

    let attrB = `${name}="${value}"`;
    isData && (attrB = `data-${attrB}`)

    tempC[type] = this.#prepSpcIf(tempC[type]) + attrB;
  }

  #handleChubAttr(param: any, tempC: ChubNode, paramI: number) {
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

      default: tempC.tag = this.#prepSpcIf(tempC.tag) + param;
    }
    return param;
  }

  #checkAttr = (tempC: ChubNode, arr: any[]) => arr.forEach((param, paramI) => {
    param = this.#handleChubAttr(param, tempC, paramI);
  })

  #traverse(cil: SortedCILE, i: number, indexes: { str: any; tmp: number; }, v = ''): [SortedCILE, { str: number, tmp: number }] {
    const r = this.#Rexps

    let indentString = "  "

    let str = cil.c
    let isStr = str.search(r().betweenQuote)
    let hasOpts = str.search(r().betweenCol)
    let isscr = str.match(r().script)

    let def = this.#makeDef(cil)
    let tempC = this.#makeDef(cil)

    // Script Operation
    isscr !== null &&
      this.#handleScript(r().script.exec(str));

    // Text Operation
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

    cil.o = tempC
    cil.i = indentString.repeat(i)

    cil.children &&
      cil.children.forEach(child => this.#traverse(child, i + 1, indexes, v));

    return [cil, indexes]
  }

  // @ Templates
  #parseTemplates(cil: SortedCILE, opts = this.#makeIndexes()) {
    const { o } = cil

    let isTemplate = false

    if (!o) throw new CowErr(`No CIL object found!`)
    switch (o.tag) {

    }

    return { isTemplate }
  }

  #handleSHead(html: string, lessNl: any): string {
    for (let stydm in this.styled) if (this.styled[stydm] === true && this.styled.styles[stydm]) {
      let p = lessNl ? '' : '\n'
      html = html.replace("<head>", "<head>" + p + this.styled.styles[stydm]);

      // Set to "has" since we check earlier if the value is false to define it
      // Also, might use later, need to exist, not be true.
      this.styled[stydm] = "has";
    }
    return html;
  }

  #handleSpecialTag(html: string, lessNl: any): string {
    html.includes("head") &&
      (html = this.#handleSHead(html, lessNl))
    return html;
  }

  #handleCNAttr(html: string, o: ChubNode) {
    const is = (v: any) => !!v;
    const addTo = (v: any) => html += v;

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

  #buildHeadTag(html: string, cil: SortedCILE, o: ChubNode, isSpecial: number, shorter: boolean, lessNl: boolean) {
    let p = lessNl ? "" : "\n"
    html = p + `${lessNl ? '' : cil.i}<${o.tag}`;

    html = this.#handleCNAttr(html, o);

    if (isSpecial > 0)
      shorter = true;

    let end = ">" + p

    if (shorter) html += " /"
    html += end

    return { html, shorter };
  }

  #handleBuildChild(child: SortedCILE, html: string, opts: { str: number; tmp: number; }, lessNl: boolean | undefined) {
    let p = lessNl ? "" : child.i
    switch (child.c[0]) {
      case "\"":
        html += p + child.c.slice(1, child.c.length - 1);
        break;

      default:
        html += p + this.#parseChubNode(child, opts, lessNl);
    }
    return html;
  }

  #buildChildren(cil: SortedCILE, html: string, opts: { str: number; tmp: number; }, lessNl: boolean | undefined) {
    for (const child of cil.children)
      html = this.#handleBuildChild(child, html, opts, lessNl);
    return html;
  }

  #buildFootTag(html: string, shorter: boolean, cil: SortedCILE, o: ChubNode, lessNl: boolean) {
    let p = lessNl ? "" : "\n"

    html += p
    if (!shorter) html += `${lessNl ? '' : cil.i}</${o.tag}>${p}`

    // ¯\_(ツ)_/¯ Quickest fix.
    if (html.includes('<>')) html = html
      .replace("<>", "")
      .replace("</>", "")

    return html;
  }

  #buildContent(cil: SortedCILE, html: string, lessNl: boolean) {
    let p = lessNl ? "" : cil.i + '  '
    if (cil.o?.content)
      html += p + cil.o.content;
    return html;
  }

  #parseChubNode(cil: SortedCILE, opts = this.#makeIndexes(), lessNl = false) {
    const o = cil.o!
    if (!o) throw new CowErr(`No CIL object found!`)

    let shorter = false

    let specialfind = this.arrMatch(o.tag, this.#specialTags)
    let isSpecial = specialfind.count
    let inList = specialfind.list

    let html = ''

    let { isTemplate } = this.#parseTemplates(cil, opts);

    // This is enough for certain tags.
    ({ html, shorter } = this.#buildHeadTag(html, cil, o, isSpecial, shorter, lessNl));

    html = this.#buildContent(cil, html, lessNl);

    html = this.#buildChildren(cil, html, opts, lessNl);

    html = this.#buildFootTag(html, shorter, cil, o, lessNl);

    html = this.#handleSpecialTag(html, lessNl);

    return html
  }

  #constuctFrom(cil: SortedCILE, lessNl: boolean | undefined, v = '') {
    let indexes = this.#makeIndexes()

    let travRes = this.#traverse(cil, 0, indexes, v);

    // @Crossover
    { [cil, indexes] = travRes }

    let res = this.#parseChubNode(cil, indexes, lessNl)

    return res
  }

  parse(source: string, lessNl?: boolean | undefined) {
    let str = this.#initialFormat(source)

    let indList = this.#cascadeIndentList(str)

    let sorted = this.#sortCILIndent(indList);

    return this.#constuctFrom(sorted[0], lessNl);
  }

  async findFile(fileLocations: any) {
    for (const location of fileLocations) {
      try { var res = await fetch(location) }
      catch (error) {
        console.error(`Error fetching file from '${location}':`, error);
      }
      if (res!?.ok)
        return location;
    }

    // Return null if no valid file location was found
    return null;
  }

  ChubRep(doc: string, quirky = "<!DOCTYPE html>") {
    (doc as any) = this.parse(doc, true);
    document.open();
    document.write(quirky + '\n' + doc);
    document.close();
  }

  injectChub(input: string) {
    // var input = `
    // div;
    //   "wow, im super simple. <br>
    //   and supper COOOL!";
    //   hr #wow $hey=lol .very .omg .neat %omg=js|is|c|l;
    //   :Super .cool: "WOOO!";
    //     span .woah;
    //       "wow!";
    // `;

    var htmlCode = this.parse(input, true);

    if (this.chubDev == true) console.log(htmlCode)

    let locationB = this.chubLocation || "chub"
    let locationGot = this.$(locationB)
    if (!locationGot) locationB = "body"
    else locationGot.innerHTML = htmlCode;

    // On finish, run finish.
    // chaosGl.chubinjected?.(locationGot);
    ChubMLMod.#ChubInjected.detail = locationGot;
    ChubMLMod.#ChubInjected.activate();
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
      .replaceAll("=", "|e|")
      .replaceAll(";", "|c|")
      .replaceAll("\"", "|q|")
      .replaceAll(sep, "|")

    return modtxt
  }

  attrSyn(tex: string) {
    if (`${tex}`.match(/=/gm)!?.length > 1) throw this.s.errorList.eqspl3

    let eqTok = ' spcfork.Equals.Token '
    let piTok = ' spcfork.Pipe.Token '

    let attrParam = tex
      // Tokenize
      .replaceAll("=", eqTok)
      .replaceAll("\\|", piTok)

      .replaceAll('|e|', "=")
      .replaceAll('|c|', ";")
      .replaceAll('|q|', "\"")
      .replaceAll('|', " ")

      .replaceAll(piTok, "|")

      // Split at Token to prevent multiple splits.
      .split(eqTok)

    // console.log(attrParam.length, attrParam)
    return attrParam
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
    return this.HTMLToChub(html);
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

    let d = {
      editedDupe,
      D: this.DupeCollection,
      s: (() => JSON.stringify(this.DupeCollection)),
      c: (() => JSON.parse(d.s())),
    };

    return d
  }

  CHUBstrprep(str: string) {
    return str
      .replace(/[.*+?^${}()|[\]\\"';:]/g, '\\$&')
      .replace(/[;]/g, '|c|')
  }

  CHUBunmess(str: string) {
    const escapedStr = str.replace(/\\\"/g, '"');
    const unescapedStr = escapedStr.replace(/\\\|c|/g, ',');

    return [
      unescapedStr,
      JSON.parse(unescapedStr),
    ]
  }

  MLTextToNodes(str: string, type: DOMParserSupportedType = 'text/html') {
    return new DOMParser().parseFromString(str, type);
  }

  Chubify(str: string) {
    let parsedHTML = this.parse(str, true)
    let parsedDOM = this.MLTextToNodes(parsedHTML, 'text/html')
    return parsedDOM
  }

  // ARARARAR
  HTMLToChub = (html: string | Element, delim = "") => {
    if (html instanceof Element) html = html.outerHTML;

    const doc = this.MLTextToNodes(html, 'text/html');
    return this.getChubML(doc.documentElement, '', delim)
  }

  getChubML = (node: Element, indent = '', delim = '') => {
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
    return '';
  }

  #handleChildren(chubML: string, node: Element, indent: string, delim: string) {
    chubML += ';\n';
    const childNodes = Array.from(node.childNodes);
    for (const child of childNodes) switch (child.nodeType) {
      case Node.TEXT_NODE:
        chubML += this.#handleChildTextNode(child as Element, indent);
        break;
      case Node.ELEMENT_NODE:
        chubML += this.getChubML(child as Element, indent + '  ', delim);
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

  aliasIndexes = [
    "beam.lmc",
    "beam.chub",

    "index.lmc",
    "index.chub",
  ]

  async #checkFile(loc: string | URL | Request, opts = {}) {
    let req = await fetch(loc, { method: "HEAD", ...opts })
    return [req.ok, req] as [boolean, Response]
  }

  async #getFileSafely(loc: string | URL | Request) {
    let [ok, okRes] = await this.#checkFile(loc)
    if (!ok) throw new Error(`File not found!`)
    let req = await fetch(loc)
    return { req, okRes }
  }

  async #findFileOfCases(fileLocations: string[]) {
    for (const loc of fileLocations) {
      let [ok, okRes] = await this.#checkFile(loc)
      if (ok) return loc
    }
    return null
  }

  #batchFile = (
    handleFile: Function,
    loc: string
  ): Promise<[string, boolean]> => new Promise(async (resolve, reject) => {
    try {
      await handleFile(loc, resolve);
    } catch (error) {
      reject(error);
    }
  });

  async #batchFileOfCases(fileLocations: string[]) {
    let pArr = [] as Promise<[string, boolean]>[];
    let abortController = new AbortController();

    const handleFile = async (loc: string, resolve: Function) => {
      if (abortController.signal.aborted) throw new Error("Aborted");
      let [f] = await this.#checkFile(loc, { signal: abortController.signal });
      if (f) abortController.abort();
      resolve([loc, f]);
    }

    for (const loc of fileLocations)
      pArr.push(this.#batchFile(handleFile, loc));

    let resses = await Promise.all(
      pArr.map(p => p.catch(e => ['', false] as ['', boolean]))
    );

    // Find first valid res
    for (const [res, ok] of resses)
      if (ok) return res;

    return null;
  }

  async #fileOrFallback(loc: string | URL | Request, slowly = false) {
    let [ok, okRes] = await this.#checkFile(loc)
    if (ok) return loc
    let choice = slowly
      ? this.#findFileOfCases
      : this.#batchFileOfCases
    return await choice(this.aliasIndexes)
  }

  async beamPrep(location: string | URL | Request, slowly: boolean) {
    let fileName = await this.#fileOrFallback(location, slowly);
    if (!fileName)
      throw new Error(`File not found!`);
    let req = await this.#getFileSafely(fileName);
    chaosGl.lastChub = req;
    return { ...req, location };
  }

  async beamParse(req: Response, location: any = '') {
    let text = await req.text();
    let doc = this.parse(text, true);
    return { text, doc, location }
  }

  async beamMake(location: string | URL | Request, slowly: boolean) {
    let { req } = await this.beamPrep(location, slowly);
    return await this.beamParse(req, location);
  }

  async beamDo(req: Response, DOM: any) {
    let { text, doc, location } = await this.beamParse(req);
    this.beamRender(doc, DOM, { location, text });
  }

  beamRender(doc: string, DOM: any, optionalDetails = {}) {
    this.chubDev && console.log(doc);

    let entrypoint = DOM || this.chubLocation || 'chub';

    let locationGot = typeof entrypoint == 'string'
      ? this.$(entrypoint) || document.body
      : entrypoint;

    locationGot.innerHTML = doc;

    // On finish, run finish.
    // chaosGl.chubinjected?.(locationGot);
    ChubMLMod.#ChubInjected.detail = {
      nodes: locationGot,
      text: doc,
      ...optionalDetails
    };
    ChubMLMod.#ChubInjected.activate();
  }

  async beamSync(location: string | URL | Request, DOM: any, slowly = false) {
    // Creates a factory which does prep, then returns a function which does the actual work.
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
  async beamChub(location: string | URL | Request, DOM: any, slowly = false) {
    return await (await this.beamSync(location, DOM, slowly))();
  }

  constructor() {
    super()

    try { this.#elevateToWindow() } catch { }
  }

  #elevateToWindow() {

  }
}

var __ChubI = new ChubMLMod
export default eobj(__ChubI, ['ChubML', 'ChubMLMod']).default;