var chubLocation = "html"

var chubDev = true

// You don't really need this if you use beamChub()
var input = `html;
  // HEADER
  head;
    // New templating feature!
    // cmlsty.blackbg;
    
    meta %charset=utf-8;
    meta %name=viewport %content=width|edevice-width;
    meta %name=msapplication-TileColor %content=#ff8800;
    meta %name=theme-color %content=#ff8800;
    
    title;
      "Chub Syntax! | Home";
    
    link %href=tempPage/style.css %rel=stylesheet %type=text/css;
    
    link %sizes=180x180 %rel=apple-touch-icon %href=tempPage/apple-touch-icon.png;
    link %sizes=32x32 %rel=icon %type=image/png %href=tempPage/favicon-32x32.png;
    link %sizes=16x16 %rel=icon %type=image/png %href=tempPage/favicon-16x16.png;
    link %href=tempPage/site.webmanifest %rel=manifest;
    link %href=tempPage/safari-pinned-tab.svg %rel=mask-icon %color=#ff8800;
  //
  
  // BODY
  body;
    nav;
      div .navHold;
        div .navTitle;
          h2;
            "CHUBML - CML";
        span .pipeDiv;
          "|";
        div .navCont;
          a .link-url %href=template.js;
            "Template File";
          
          span .pipeDiv;
            "|";
            
          a .link-url %href=style.css;
            "Template Style";

          span .pipeDiv;
            "|";
            
          a .link-url %href=cml.js;
            "SRC Code";
          
          span .pipeDiv;
            "|";
            
          a .link-url %href=README.md;
            "README.md";

    article .descArticle;
    
    // Sick!
    // So comments work!
    
      h3;
        "Welcome to the";
        span;
          "CHUB WEBSITE!";
      // 
      
      small;
        "Log by SpectCOW | v.0.0.3";
      // 
      br;
      br;
      hr;
      
      br;

      p #venge @fetchw|./README.md;

      p;
        "The newest and best Markdown Language simplifier!";
        
        br;
        "As of '9:30 AM, 2023-05-15', ChubML can build most website features.";
        br;
        
        "It can create";
        chub.coolspan;
          "COOL STUFF really quickly!";
        
        br;
        br;

        "It really is better than normal HTML!";

        br;
        
        "Due to its quick syntax, you can form tags";
        span .coolStuffspan;
          "within minutes,";
        
        br;
        
        "allowing you to create websites rapidly and efficently!";
        br;
        br;
        span .coolStuffspan;
          "And so much more!";
        
        
        // *br;
        //   "asd";

        // Soon will allow paramaters to be passed into tags.
        // And maybe add CML syntax highlighting!
      
      
      br;
      br;

      hr;
    
      
    div .descArticle;
      article;
        h3;
          "Articles";
        small;
          "The Docs, Refs, And more. | Feel free add more, just contact me!";

    
      div #docsNav;
        div #docsLayout;
          div #docsMiniCol;
            
            a %href=about .wlink-url;
              chub.prefboxBorder .coolerfbox;
                p .docp;
                  "About";
                  
            a %href=docs .wlink-url;
              chub.prefboxBorder .coolerfbox;
                p .docp;
                  "Getting Stated";
                  
            a %href=functions .wlink-url;
              chub.prefboxBorder .coolerfbox;
                p .docp;
                  "Functions";
          
          div #docsCol;
            
            a %href=content .wlink-url .tooltip %style=display:flex|col|margin-right:2px;
              chub.prefboxBorder .coolerHfbox;
                p .docp;
                  "Content";
            
            a %href=templates .wlink-url %style=display:flex|col|margin-right:2px;
              chub.prefboxBorder .coolerHfbox;
                p .docp;
                  "Templates";
            
            a %href=more .wlink-url %style=display:flex;
              chub.prefboxBorder .coolerHfbox;
                p .docp;
                  "More...";

      
      // Layout ENDS HERE
      
    // Docs Nav ENDS HERE

    // Footer
    footer;
      div .footer;
      
        div .footer-left;
          div .footer-left-title;
            h3;
              span .footer-title;
              "CHUB WEBSITE";
              
          div .footer-left-desc;
            p;
              "The newest and best Markdown Language simplifier!";
              br;

        div .footer-right;
          div .footer-right-title;
            h3;
              // Create info List items

              ul;
                li;
                  a %href=about .footer-link;
                    "About";
                li;
                  a %href=docs .footer-link;
                    "Docs";
                li;
                  a %href=functions .footer-link;
                    "Functions";
                li;
                  a %href=more .footer-link;
                    "More...";
                li;
                  a %href=contact .footer-link;
                    "Contact";
                li;
                  a %href=privacy .footer-link;
                    "Privacy";
                li;
                  a %href=terms .footer-link;
                    "Terms";
                li;
                
    // FOOTER ENDS HERE
  // BODY ENDS HERE
// DOCS ENDS HERE

  {=
    src="temp/test.js"
  =}
`;

/* 
  On document load after Chub is done loading.
  Done to prevent load issues like P5.JS just in case.
*/

var chubstart = () => {
  // Use this to inject into an element in the HTML.
  // injectChub(input)
  
  // Use this to rewrite the HTML and Document ENTIRELY.
  // ChubRep(input)

  /* 
  "Beam" a chub file into a location
  will use chub location if param 2 is undefined 
  */
  beamChub("beam.chub" /* Leave blank to auto. */, "html" /* PARAM 2 */ )
}

// On injectChub finished.
var chubinjected = async (locationGot) => {
  // console.log(locationGot, "lol"
//   $(`newb`).innerText = CHUBparse(`
// div #super-id .very-classy;
//   p $supremeData=wow %style=background-color:red|col;
//     "I’m such a cool text body"
//   `);
}