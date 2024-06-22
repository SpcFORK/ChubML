// @ CowSTD
import { chaosGl, NOOP, ANOOP } from './cst';
import { CowErr } from './CowErr';

// @ CML
import { CML_Static } from './static';

interface CILElement {
  c: string;
  i: number;
}

interface ChubNode {
  tag: "",
  id: "",
  class: "",
  content: "",
  data: "",
  attr: "",
  indent: 0,
}

interface SortedCILE extends CILElement {
  children: SortedCIL[]
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

    window.onload = () =>
      chaosGl.chubstart?.()
  }

  s = CML_Static

  styled = {}

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

  #makeDef = () => ({
    tag: "",
    id: "",
    class: "",
    content: "",
    data: "",
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

  #traverse(cil: SortedCILE, i: number, v = '') {
    let indentString = "  "

    let cilCopy = Object.assign({}, cil)
    let indexes = this.#makeIndexes()



    return [cilCopy, indexes]
  }

  #parseChubNode(cil: SortedCILE, i: number, v = '', opts = this.#makeIndexes()) {

  }

  #constuctFrom(cil: SortedCILE, v = '') {
    let cilCopy = Object.assign({}, cil)

    let [parsedNode, indexes] = this.#traverse(cil, 0, v);
    let res = this.#parseChubNode(parsedNode, indexes)

    // let isStr = cnt.search(reg.betweenQuote)
    // let hasOpts = strBuild.search(reg.betweenCol)
    // let isscr = strBuild.match(reg.script)

    return [res, indexes]
  }

  parse(source: string) {
    let str = this.#initialFormat(source)

    let indList = this.#cascadeIndentList(str)

    let sorted = this.#sortCILIndent(indList);

    return this.#constuctFrom(sorted[0]);
  }
}

const chubml = new ChubMLMod;

function ChubRep(doc: string, quirky = "<!DOCTYPE html>") {
  (doc as any) = chubml.parse(doc);
  document.open();
  document.write(quirky + '\n' + doc);
  document.close();
}

function injectChub(input: string) {
  // var input = `
  // div;
  //   "wow, im super simple. <br>
  //   and supper COOOL!";
  //   hr #wow $hey=lol .very .omg .neat %omg=js|is|cool;
  //   :Super .cool: "WOOO!";
  //     span .woah;
  //       "wow!";
  // `;

  var htmlCode = chubml.parse(input);

  if (chaosGl.chubDev == true) console.log(htmlCode)

  let locationB = chaosGl.chubLocation || "chub"
  let locationGot = chubml.$(locationB)
  if (!locationGot) locationB = "body"
  else locationGot.innerHTML = htmlCode;

  // On finish, run finish.
  chaosGl.chubinjected?.(locationGot);
}

// @ Globals
{

}

// @ Exporter
try { module.exports = chubml } catch { }
try { chaosGl.window.ChubML = chubml } catch { }