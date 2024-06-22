"use strict";
(() => {
  // src/cst.ts
  var chaosGl = globalThis;

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

  // src/static.ts
  var CML_Static = class _CML_Static {
    static CML_Static = _CML_Static;
    CML_Static = _CML_Static;
    static errorList = {
      // For Params: %lol=haha=asd => split at each `=` => greater than 3? => error.
      eqspl3: new CowErr([
        `You can't have more than 3 Equals characters (\`=\`)!`,
        `Try to shorten it please, use \`|e\``,
        `it is the escaped version of \`=\`.`,
        ,
        `Use: "meta %name=viewport %content=width|edevice-width;"`,
        `=> \`|e\` replaced with \`=\``,
        `=> "meta %name=viewport %content=width=device-width;"`
      ]),
      scripterror: new CowErr([
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
})();
//# sourceMappingURL=cml.global.js.map