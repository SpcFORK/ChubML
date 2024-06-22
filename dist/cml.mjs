import {
  chaosGl
} from "./chunk-YR42Z2ZM.mjs";
import {
  CML_Static
} from "./chunk-WQCKRAHC.mjs";
import "./chunk-AAIK3BUI.mjs";

// src/cml.ts
var ChubMLMod = class _ChubMLMod extends CML_Static {
  static ChubML = _ChubMLMod;
  ChubML = _ChubMLMod;
  static {
    chaosGl.chubstart = () => {
    };
    window.onload = () => chaosGl.chubstart?.();
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
    return sortedContents.shift();
  }
  #parseCIL(cil, v = "") {
    let [parsedCILArr, indexes] = this.#traverse(cil, 0, v);
  }
  #makeDef = () => ({
    tag: "",
    id: "",
    class: "",
    content: "",
    data: "",
    attr: "",
    indent: 0
  });
  #traverse(cil, i, v = "") {
    let cilCopy = cil.slice();
    let indentString = "  ";
    let indexes = {
      str: 0,
      tmp: 0
    };
    let r = this.#Rexps;
    let cnt = cil.c;
    let def = this.#makeDef();
    let tempDef = this.#makeDef();
    return [cilCopy, indexes];
  }
  parse(source) {
    let str = this.#initialFormat(source);
    let indList = this.#cascadeIndentList(str);
    this.#parseCIL(indList);
  }
};
try {
  module.exports = new ChubMLMod();
} catch {
}
try {
  chaosGl.window.ChubML = new ChubMLMod();
} catch {
}
export {
  ChubMLMod
};
//# sourceMappingURL=cml.mjs.map