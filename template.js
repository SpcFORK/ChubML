var chubLocation = "html"

var chubDev = false
// var chubDev = true

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

  using @fetchw={{url}}; will also provide the same result.

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