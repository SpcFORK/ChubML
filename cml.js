/**
  =-=-=-=--=-=-=-=-=
  GUIDE

  Order of USE:
    START
      *Q-Sel:
      $()

      *Array matcher
      arrMatch
  
      *Parser:
      parse()
        -> sortInd()
          -> stringi()    
    END
  =-=-=-=--=-=-=-=-=

  TEMPLATE:
  
  html;
    // HEADER
    head;
      meta %charset=utf-8;
      meta %name=viewport %content=width|edevice-width;
      
      title;
        "ChubBuild";
      
      link %href=style.css %rel=stylesheet %type=text/css;
    //
    
    // BODY
    body;
      article .descArticle;
      
      // Sick!
      // So comments work!
      
        h3;
          "Welcome to the";
          span;
            "CHUB WEBSITE!";
        // 
        
        p;
          "The newest and best Markdown Language simplifier!";
          br;
          "As of '9:30 AM, 2023-05-15', ChubML can build most website features.";
          br;
          
          "It can create";
          span .coolStuffspan;
            "COOL STUFF really quickly!";
          
          br;
          br;
  
          "It really is better than normal HTML!";
  
          br;
          
          "Due to its quick syntax, you can form tags";
          span .coolStuffspan;
            "within minutes, allowing you to create websites rapidly and efficently!";
        br;
      
      // 
  
    {=
      src="test.js"
    =}
  
  
  =-=-=-=--=-=-=-=-=
*/

/* 
  =-=-=-=--=-=-=-=-=
  ERRORS
  =-=-=-=--=-=-=-=-=
*/

var errlist = {
  // For Params: %lol=haha=asd => split at each `=` => greater than 3? => error.
  eqspl3: new Error(`
You can't have more than 3 Equals characters (\`=\`)!
Try to shorten it please, use \`|e\`
it is the escaped version of \`=\`.

Use: "meta %name=viewport %content=width|edevice-width;"
  => \`|e\` replaced with \`=\`
  => "meta %name=viewport %content=width=device-width;"
`),

  scripterror: new Error(`
Apparently, you made an error loading or executing your script.
Look back and take a gander.

Potentially:
=> Check if you loaded the right file.
=> Check if you made a typo.
=> Check if you did not add the directory to the file.
=> Check if you did every thing else right.

=> If all else. cry :(
`),
}

/*
  =-=-=-=--=-=-=-=-=
  USEFUL FUNCTIONS.
  =-=-=-=--=-=-=-=-=
*/

/** Quicker query selector.
  
function $(a) {
* @param {string} a - The selector for document.querySelector to look for.
  ...
  @returns {HTMLElement}
} */
var $ = (a) => {
  return document.querySelector(a)
}

// /** 
//   Does string contain any matches?
// */
// function arrMatch(str, arr) {
//   let count = 0;
//   for (let i = 0; i < arr.length; i++) {
//     if (str.includes(arr[i])) {
//       count++;
//     }
//   }
//   return count;
// }

/** 
  Does string contain any matches V2?
*/
function arrMatch(str, arr) {
  let count = 0;
  let list = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (str.includes(arr[i])) {
      count++;
      list.push(arr[i])
    }
  }
  return { count, list };
}

/** Handles the string to be parsed into sortInd().
  
function parse(a) {
* @param {string} a - The ChubML syntax string to be parsed into a HTML string.
  ...
  @returns {string} 
} */
var CHUBparse = (a) => {
  var reg = {
    quoteExept: /\n(?=(?:(?:[^"]*"){2})*[^"]*$)/gm,
    colExept: /\n(?=(?:(?:[^:]*:){2})*[^:]*$)/gm,
    
    betweenQuote: /"([a-zA-Z\s\S]+)"/gm,
    betweenCol: /^:([a-zA-Z\S\s]+):/gm,
    
    script: /\{\=([a-zA-Z\S\s][^;]+)\=\}/gm,
    comment: /\/\/(.*)\n{0,1}/gm,
    lineWithComment: /[^a-zA-Z0-9:-■\n]+((?:[\t ]{0,})\/\/(?:.*)\n{0,1})/gm,

    formatspace1: /\n{1,}/gm,
    formatspace2: /\n[\t \n]{0,}\n/gm,
  }

  // PRE-FORMAT:
  a = a
    .replace(reg.lineWithComment, "") 
    .replace(reg.formatspace2, "\n")
    .replace(reg.formatspace1, "\n")
  // 
  
  var splitn = a.split(/;/)

  var col = []
  splitn.forEach((o, r) => {
    var indentn = o.search(/\S/)

    if (!col[r]) col[r] = {}

    var trimmed = o.trim()
    col[r].c = trimmed
    col[r].i = indentn

    // // console.log(col)

  })

  /** Parses an object into ChubML.
    
  function stringi(contentObj, vor) {
  * @param {object} contentObj - The object Tree.
  * @param {string} vor - TODO: add implement for vor.
    ...
    @returns 
  } */
  function stringi(contentObj, vor) {
    let result = "";
    const indentString = "  "; // two spaces for each indent level
    let indexes = {
      str: 0
    }

    let templates = {
      "test": {
        tag: "",
        id: "",
        class: "",
        content: "",
        data: "",
        attr: "",
        indent: 0,
      }
    }

    // let tree = {}
    function traverse(obj, level, nv = "") {

      var strBuild = obj.c
      var isStr = strBuild.search(reg.betweenQuote)
      var hasOpts = strBuild.search(reg.betweenCol)
      var isscr = strBuild.match(reg.script)
      // console.log(isscr, "lol")

      let def = {
        tag: "",
        id: "",
        class: "",
        content: "",
        data: "",
        attr: "",
        indent: 0,
      }

      let tempC = {
        tag: "",
        id: "",
        class: "",
        content: "",
        data: "",
        attr: "",
        indent: 0
      }

      // Script Operation
      if (isscr !== null) {
        var scrmatch = reg.script.exec(obj.c)
        let issrc = scrmatch[1].includes("src=");

        var dostill = true
        // console.log(scrmatch)
        // console.log(issrc)

        // Source Check
        if (issrc && scrmatch) {
          let srcis = scrmatch[1].match(/src="(.*)"/)[1]
          // console.log(srcis)

          fetch(srcis)
            .then((js) => {
              // console.log(js)
              return js.text()
            })
            .then((text) => {
              // console.log(text)
              try { eval(text) }
              catch (error) { console.log(error, errlist.scripterror) }
            })
          
          dostill = false
          // console.log(dostill, "still")
        }

        // Eval content (not SRC).
        if (scrmatch !== null && dostill) {
          try { eval(scrmatch[1]) }
          catch (error) { console.log(error, errlist.scripterror) }
        }
      }

      // Check if any Attr?
      var checkAttr = (arr) => {

        // Reformat Attributes to prevent conflicts and such.
        var attrSyn = (tex) => {
          if (tex.match(/=/gm).length > 1) throw errlist.eqspl3
          
          let attrParam = tex
            // Tokenize
            .replace("=", " spcfork.Equals.Token ")
            .replace(/\|e/gm, "=")
            .replace(/\|/gm, " ")
            // Split at Token to prevent multiple splits.
            .split(" spcfork.Equals.Token ")

          // console.log(attrParam.length, attrParam)
          return attrParam
        }
        
        arr.forEach((param, pind) => {

          // ATTR's
          switch (param[0]) {
            case "#":
              tempC.id = `${tempC.id ? tempC.id + " " : ""}${param.replace("#", " ")}`

              break

            case ".":
              tempC.class = `${tempC.class ? tempC.class + " " : ""}${param.replace(".", " ")}`

              break

            case "$":
              let dataParam = attrSyn(param)

              let dataB = `data-${dataParam[0].slice(1) + "=\"" + dataParam[1] + "\""}`
              tempC.data = `${tempC.data ? tempC.data + " " : ""}${dataB}`

              break

            case "%":
              let attrParam = attrSyn(param)

              let attrB = `${attrParam[0].slice(1) + "=\"" + attrParam[1] + "\""}`
              // console.log(attrB)
              tempC.attr = `${tempC.attr ? tempC.attr + " " : ""}${attrB}`

              break

            case "*":
              if (param.slice(0, 2) == "*>") {
                tempC = templates[param.slice(2)];
              } else break

              break

            default:
              tempC.tag = `${tempC.tag ? tempC.tag + " " : ""}${param}`

              break

          }

          // // console.log(tempC)
        })

      }

      if (isStr !== -1) {
        let tempLines = obj.c.split(reg.betweenCol)
        let content = obj.c.split(reg.betweenQuote)[1]

        if (hasOpts !== null) {
          var inner = tempLines[1] || ""

          // var cont = inner.split(reg.betweenQuote)
          // console.log(inner)
          inner = inner.split(" ")

          checkAttr(inner)

        } else {
          tempC = def
        }

        indexes.str++
        // strBuild = strBuild.replace(/"/gm, "")
        tempC.content = content

      } else {
        inner = strBuild.split(" ")

        checkAttr(inner)
      }

      var indc = indentString.repeat(level)

      // var classes = tempC.classes 
      //   ? ` class="${tempC.classes}"`
      //   : ``

      // var ids = tempC.id 
      //   ? ` id="${tempC.id}"`
      //   : ``

      // var tag = tempC.tag 
      //   ? `${tempC.tag}`
      //   : `div`

      // var buildn = `
      // <${tag}${classes}${ids}>
      //   ${tempC.content}
      // </${tag}>`


      // var bdec = [
      //   `<${tag}${classes}${ids}>`,
      //   indc + `${tempC.content}`,
      //   `</${tag}>`
      // ]

      // if (!tree[obj.i]) {
      //   tree[obj.i] = []
      // }

      // var bi = indc + buildn + "\n"
      // tree[obj.i].push(bi)

      // obj.f = bdec
      // // console.log(tree)
      obj.o = tempC
      obj.i = indc

      if (obj.children) {
        obj.children.forEach(child => traverse(child, level + 1));
      }
    }

    function pubj(chubml) {

      // Special Tags which usually are self Closing.
      let tagcheck = [
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
      
      let shorter = false
      
      var specialfind = arrMatch(chubml.o.tag, tagcheck)
      var isSpecial = specialfind.count
      var inList = specialfind.list
      let html = ''
      
      // ¯\_(ツ)_/¯ Didn't need lol, page load css still works? But not JS of course :\ .

      // if (inList.includes("link")) {
      //   console.log(chubml.o)
      //   if (document.createStyleSheet) {
      //     setTimeout(() => {
      //       document.createStyleSheet('attr')
      //     }, 5000)
      //   }
      //   // else {
      //   //   var styles = "@import url('http://example.com/big.css');";
      //   //   var newSS = document.createElement('link');
          
      //   //   newSS.rel = 'stylesheet';
      //   //   newSS.href = 'data:text/css,'+escape(styles);
          
      //   //   document.getElementsByTagName("head")[0]
      //   //     .appendChild(newSS);
      //   // }
        
      //   return html
      // }
      
      html = `\n${chubml.i}<${chubml.o.tag}`;

      if (chubml.o.class) {
        html += ` class="${chubml.o.class.slice(1)}"`;
      }

      if (chubml.o.id) {
        html += ` id="${chubml.o.id.slice(1)}"`;
      }

      if (chubml.o.data) {
        html += ` ${chubml.o.data}`;
      }

      if (chubml.o.attr) {
        html += ` ${chubml.o.attr}`;
      }

      
      if (isSpecial > 0) shorter = true
      
      var ending = shorter 
        ? " />\n"
        : ">\n"

      html += ending;

      // This is enough for certain tags.
      if (!shorter) {

        if (chubml.children) {
          for (const child of chubml.children) {
            if (child.c[0] == "\"") {
              // console.log(child.o.content)
              html += child.i + child.c.slice(1, child.c.length - 1);
            } else {
              html += child.i + pubj(child);
            }
          }
        }

        html += `\n${chubml.i}</${chubml.o.tag}>\n`;
      }

      // ¯\_(ツ)_/¯ Quickest fix.
      if (html.search("<>")) html = html
        .replace("<>", "")
        .replace("</>", "")

      return html;
    }

    traverse(contentObj, 0, vor);
    // // console.log(contentObj);

    var a = pubj(contentObj);
    // console.log(a);
    return a;
  }

  /** Get a tree based off indent nesting.
    
  function sortInd(contents) {
  * @param {string} contents - collapses a string into an object by indentation syntax.
    ...
    @returns {object}
  } */
  function sortInd(contents) {
    const sortedContents = [];
    let parentStack = [];

    contents.forEach(content => {
      const currentIndent = content.i;
      const currentContent = { c: content.c };

      while (parentStack.length > 0 && currentIndent <= parentStack[parentStack.length - 1].i) {
        parentStack.pop();
      }

      if (parentStack.length > 0) {
        const parent = parentStack[parentStack.length - 1];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(currentContent);
      } else {
        sortedContents.push(currentContent);
      }

      parentStack.push(Object.assign(currentContent, { i: currentIndent }));
    });

    return sortedContents[0];
  }

  var sorted = sortInd(col);
  var constructed = stringi(sorted, a);
  
  return constructed;
}

// -=-=-=-= START A SCRIPT: Like p5.js =-=-=-=-

window.chubstart = window.chubstart || false

var ChubRep = (doc, quirky = "<!DOCTYPE html>") => {
  doc = CHUBparse(doc);
  document.open();
  document.write(quirky + '\n' + doc);
  document.close();
}

window.onload = function() {
  if (window.chubstart && typeof window.chubstart == "function") {
    chubstart();
  }
};

function injectChub(input) {
  // var input = `
  // div;
  //   "wow, im super simple. <br>
  //   and supper COOOL!";
  //   hr #wow $hey=lol .very .omg .neat %omg=js|is|cool;
  //   :Super .cool: "WOOO!";
  //     span .woah;
  //       "wow!";
  // `;

  var htmlCode = CHUBparse(input);

  if (window.chubDev && window.chubDev == true) console.log(htmlCode)

  let locationB = window.chubLocation || "chub"
  let locationGot = $(locationB)
  if (!locationGot) locationB = "body"

  locationGot.innerHTML = htmlCode;

  // On finish, run finish.
  if (window.chubinjected && typeof window.chubinjected == "function") {
    chubinjected(locationGot);
  }
  
}
