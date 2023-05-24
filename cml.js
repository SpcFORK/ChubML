/**
  =-=-=-=--=-=-=-=-=
  TODO:
  - Make code cleaner/compact.
  - Make ECSS.
    - Create CHUBECSS Parser.
  
  =-=-=-=--=-=-=-=-=
  TOUR:
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
  Very important
  GLOBAL VARS
  =-=-=-=--=-=-=-=-=
*/

var styled = {}

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

var DOMerr = {
  noBeam: `
c;
  beam;
    "Beam Failed!
    <br>
    Try to fix the simple Fetch error.
    <br>
    Shouldn't take long.";
  `,
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

/** 
  Does string contain any matches V2?
*/
var arrMatch = (str, arr) => {
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
  var stringi = (contentObj, vor) => {
    let result = "";
    const indentString = "  "; // two spaces for each indent level
    let indexes = {
      str: 0,
      tmp: 0,
    }

    // let tree = {}
    var traverse = (obj, level, nv = "") => {

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
            .replace(/\|col/gm, ";")
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

      obj.o = tempC
      obj.i = indc

      if (obj.children) {
        obj.children.forEach(child => traverse(child, level + 1));
      }
    }
    
    // @pj
    var pubj = (chubml) => {

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

      let isTemplate = false

      // console.log(chubml.o.tag)
      
      // Check for ChubTemplates or Special Sets.
      console.log(chubml.o)

      // @templates
      switch (chubml.o.tag) {
        case "chub.lol":
          console.log("lol, test, lol\nCHUB tag Check functional!")
          break
        
        case "chub.fbox":
          /* Create a box, rounded.
            .------.
            | ACDD |\
            |  ABE ||
            \------'|
             ```````

            Struct:
              div;
                div;
                  {{INSERT}};
            
          */

          fboxStyle = `style="
          background-color: #f80f;
          border-radius: 10px;
          box-shadow: 6px 6px 0px 0px #000;
          display: flex;
          padding: 15px;
          
          width: min-content;
          "`
          
          chubml.o = {
            tag: "div",
            
            id: chubml.o.id 
              ? chubml.o.id + ` ${indexes.tmp}fbox`
              : " fbox",
            
            class: chubml.o.class 
              ? chubml.o.class + " fbox"
              : " fbox",
            
            content: chubml.o.content 
              ? chubml.o.content
              : "",
            
            data: chubml.o.data 
              ? chubml.o.data
              : "",
            
            attr: chubml.o.attr 
              ? chubml.o.attr + " " + fboxStyle
              : fboxStyle,
            
            indent: chubml.o.i,
          }

          // Debating weither I should make a global var and preload all styles,
          // or if I should insert styles between the head like so:
          /* 

            if (html.includes("head")) {
              
              if (styled["fbox"] === true) {
                html = html.replace("<head>", "<head>" + fboxStyle)

                // Set to "has" since we check earlier if the value is false to define it
                styled["fbox"] = "has"
              }
              
              ...
            }
          
          */

          
          // if (!styled["fboxes"]) styled["fboxes"] = true
          
          indexes.tmp++
          isTemplate = true
          break
          
        case "chub.fboxu":
          /* Create a box, rounded.
            .------.
            | ACDD |
            |  ABE |
            \------/
             ``````

            Struct:
              div;
                div;
                  {{INSERT}};
            
          */

          fboxStyle = `style="
          background-color: #f80f;
          border-radius: 10px;
          box-shadow: 0px 6px 0px 0px #000;
          display: flex;
          padding: 15px;
          
          width: min-content;
          "`
          
          chubml.o = {
            tag: "div",
            
            id: chubml.o.id 
              ? chubml.o.id + ` ${indexes.tmp}fbox`
              : " fbox",
            
            class: chubml.o.class 
              ? chubml.o.class + " fbox"
              : " fbox",
            
            content: chubml.o.content 
              ? chubml.o.content
              : "",
            
            data: chubml.o.data 
              ? chubml.o.data
              : "",
            
            attr: chubml.o.attr 
              ? chubml.o.attr + " " + fboxStyle
              : fboxStyle,
            
            indent: chubml.o.i,
          }
          
          indexes.tmp++
          isTemplate = true
          break
          
        case "chub.fboxBorder":
          /* Create a box, rounded.
            .------.
            | ACDD |\
            |  ABE ||
            \------'|
             ```````

            Struct:
              div;
                div;
                  {{INSERT}};
            
          */

          fboxStyle = `style="
          background-color: #f80f;
          border: 3px solid #000;
          border-radius: 10px;
          box-shadow: 6px 6px 0px 0px #000;
          display: flex;
          padding: 15px;
          
          width: min-content;
          "`
          
          chubml.o = {
            tag: "div",
            
            id: chubml.o.id 
              ? chubml.o.id + ` ${indexes.tmp}fbox`
              : " fbox",
            
            class: chubml.o.class 
              ? chubml.o.class + " fbox"
              : " fbox",
            
            content: chubml.o.content 
              ? chubml.o.content
              : "",
            
            data: chubml.o.data 
              ? chubml.o.data
              : "",
            
            attr: chubml.o.attr 
              ? chubml.o.attr + " " + fboxStyle
              : fboxStyle,
            
            indent: chubml.o.i,
          }

          indexes.tmp++
          isTemplate = true
          break
          
        case "chub.fboxuBorder":
          /* Create a box, rounded.
            .------.
            | ACDD |
            |  ABE |
            \------/
             ``````

            Struct:
              div;
                div;
                  {{INSERT}};
            
          */

          fboxStyle = `style="
          background-color: #f80f;
          border: 3px solid #000;
          border-radius: 10px;
          box-shadow: 0px 6px 0px 0px #000;
          display: flex;
          padding: 15px;
          
          width: min-content;
          "`
          
          chubml.o = {
            tag: "div",
            
            id: chubml.o.id 
              ? chubml.o.id + ` ${indexes.tmp}fbox`
              : " fbox",
            
            class: chubml.o.class 
              ? chubml.o.class + " fbox"
              : " fbox",
            
            content: chubml.o.content 
              ? chubml.o.content
              : "",
            
            data: chubml.o.data 
              ? chubml.o.data
              : "",
            
            attr: chubml.o.attr 
              ? chubml.o.attr + " " + fboxStyle
              : fboxStyle,
            
            indent: chubml.o.i,
          }
          
          indexes.tmp++
          isTemplate = true
          break
          
        case "chub.prefbox":
          /* Create a box, rounded.
            .------.
            | ACDD |
            |  ABE |
            '------'
             

            Struct:
              div;
                div;
                  {{INSERT}};
            
          */

          fboxStyle = `style="
          background-color: #f80f;
          border-radius: 10px;
          display: flex;
          padding: 15px;
          "`
          
          chubml.o = {
            tag: "div",
            
            id: chubml.o.id 
              ? chubml.o.id + ` ${indexes.tmp}fbox`
              : " fbox",
            
            class: chubml.o.class 
              ? chubml.o.class + " fbox"
              : " fbox",
            
            content: chubml.o.content 
              ? chubml.o.content
              : "",
            
            data: chubml.o.data 
              ? chubml.o.data
              : "",
            
            attr: chubml.o.attr 
              ? chubml.o.attr + " " + fboxStyle
              : fboxStyle,
            
            indent: chubml.o.i,
          }

          // Debating weither I should make a global var and preload all styles,
          // or if I should insert styles between the head like so:
          /* 

            if (html.includes("head")) {
              
              if (styled["fbox"] === true) {
                html = html.replace("<head>", "<head>" + fboxStyle)

                // Set to "has" since we check earlier if the value is false to define it
                styled["fbox"] = "has"
              }
              
              ...
            }
          
          */

          
          // if (!styled["fboxes"]) styled["fboxes"] = true
          
          indexes.tmp++
          isTemplate = true
          break
          
        case "chub.prefboxBorder":
          /* Create a box, rounded.
            .------.
            | ACDD |
            |  ABE |
            '------'

            Struct:
              div;
                div;
                  {{INSERT}};
            
          */

          fboxStyle = `style="
          background-color: #f80f;
          border: 3px solid #000;
          border-radius: 10px;
          display: flex;
          padding: 15px;
          "`
          
          chubml.o = {
            tag: "div",
            
            id: chubml.o.id 
              ? chubml.o.id + ` ${indexes.tmp}fbox`
              : " fbox",
            
            class: chubml.o.class 
              ? chubml.o.class + " fbox"
              : " fbox",
            
            content: chubml.o.content 
              ? chubml.o.content
              : "",
            
            data: chubml.o.data 
              ? chubml.o.data
              : "",
            
            attr: chubml.o.attr 
              ? chubml.o.attr + " " + fboxStyle
              : fboxStyle,
            
            indent: chubml.o.i,
          }

          indexes.tmp++
          isTemplate = true
          break
          
        default:
          break
      }
      
      html = `\n${chubml.i}<${chubml.o.tag}`;

      if (chubml.o.class) {
        html += ` class="${chubml.o.class.slice(1)}"`;
      }

      if (chubml.o.id) {
        html += ` id="${chubml.o.id.slice(1)}"`;
      }
      
      if (chubml.o.style) {
        html += ` style="${chubml.o.id.slice(1)}"`;
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

  var sorted = sortInd(col);
  var constructed = stringi(sorted, a);
  
  return constructed;
}

/*
  -=-=-=-=-=-=-=-=-=-=-=-=
  CHUB ECSS will go here.
  -=-=-=-=-=-=-=-=-=-=-=-=
*/
var CHUBECSS;

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

// -=-=-=-= ChubECSS =-=-=-=-
// Ze better syntax for SS'
// + Chub Indent-ator.

// Chub ECSS use functions will go here.

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

async function beamChub(input, DOM) {

  var okfetch = false
  
  if (!input) throw new Error("Input is undefined.")

  var aliasIndexes = [
    "beam.chub",
    "beam.cml",
    
    "bm.chub",
    "bm.cml",
    
    "index.chub",
    "index.cml",
    
    "i.chub",
    "i.cml",
  ]

  // Do this so that nobody could possibly mess up
  // lol.
  
  var checkFile = async (loc, resloc = false, respo = false) => {
    var bing
    
    try {
      await fetch(loc, { method: "HEAD" })
        .then(async (resp) => {
          
          if (resp.ok && resp.status !== 404) {
            console.log(resp)
            resloc = true
            respo = resp
            okfetch
            bing = await fetch(loc)

            return bing
          } else if (response.status === 404) {
            return Promise.reject('error 404')
          
          } else {
            return Promise.reject('some other error: ' + response.status)
          
          }
          
        })
      }
      
    catch (err) {
      respo = err
    }

    while(bing) {
      return bing
      break
    }
    
  }
  
  async function findFile(fileLocations) {
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
  
  await findFile(aliasIndexes)
    
    .then(async (foundr) => {
      if (foundr) {
        await fetch(foundr)
          
          .then(async (outp) => {
            input = await outp.text()
          })
          
          .then(async (gotten) => {
            
            console.log(input)
            var htmlCode = CHUBparse(input);
          
            if (window.chubDev && window.chubDev == true) console.log(htmlCode)
          
            let locationB = DOM || window.chubLocation || "chub"
            let locationGot = $(locationB)
            if (!locationGot) locationB = "body"
          
            locationGot.innerHTML = htmlCode;
          
            // On finish, run finish.
            if (window.chubinjected && typeof window.chubinjected == "function") {
              // console.log(locationGot)
              chubinjected(locationGot);
            }
            
          })
        
      } else {
        console.log('No valid file location found.');
      }
      
    })
}


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
