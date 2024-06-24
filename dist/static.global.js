"use strict";(()=>{var r=class extends Error{constructor(e,t){super(Array.isArray(e)?e.join(`
`):e),this.name="CowErr"+(t?` (${t})`:"")}toss=(...e)=>console.error(this,...e);throw(){throw this}};var s=class i{static CML_Static=i;CML_Static=i;static errorList={eqspl3:new r(["You can't have 3 Equals characters (`=`)!","Try to shorten it please, use `|e`","it is the escaped version of `=`.",,'Use: "meta %name=viewport %content=width|edevice-width;"',"=> `|e` replaced with `=`",'=> "meta %name=viewport %content=width=device-width;"']),scripterror:new r(["Apparently, you made an error loading or executing your script.","Look back and take a gander.",,"Potentially:","=> Check if you loaded the right file.","=> Check if you made a typo.","=> Check if you did not add the directory to the file.","=> Check if you did every thing else right.",,"=> If all else.cry :("])};static DisplayErrors={noBeam:`
  c;
    beam;
      "Beam Failed!
      <br>
      Try to fix the simple Fetch error.
      <br>
      Shouldn't take long.";
    `};static Rexps={quoteExept:/\n(?=(?:(?:[^"]*"){2})*[^"]*$)/gm,colExept:/\n(?=(?:(?:[^:]*:){2})*[^:]*$)/gm,betweenQuote:/"([a-zA-Z\s\S]+)"/gm,betweenCol:/^:([a-zA-Z\S\s]+):/gm,script:/\{\=([a-zA-Z\S\s][^;]+)\=\}/gm,comment:/\/\/(.*)\n{0,1}/gm,lineWithComment:/[^a-zA-Z0-9:-■\n]+((?:[\t ]{0,})\/\/(?:.*)\n{0,1})/gm,formatspace1:/\n{1,}/gm,formatspace2:/\n[\t \n]{0,}\n/gm};$(e){return document.querySelector(e)}arrMatch(e,t){let n=0,a=[];for(let o=0;o<t.length;o++)e.includes(t[o])&&(n++,a.push(t[o]));return{count:n,list:a}}};})();
//# sourceMappingURL=static.global.js.map