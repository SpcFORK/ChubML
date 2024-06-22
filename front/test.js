var chubLocation = "html"
var chubDev = true

/* 
  On document load after Chub is done loading.
  Done to prevent load issues like P5.JS just in case.
*/

var chubstart = () => {
  beamChub("beam.cml", "html")
}

// On injectChub finished.
var chubinjected = (locationGot) => {
  // console.log(locationGot, "lol")
}