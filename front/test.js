let cml = globalThis.ChubML

var chubLocation = "html"
var chubDev = true

/* 
  On document load after Chub is done loading.
  Done to prevent load issues like P5.JS just in case.
*/

let pageSrc = 'beam.lmc'
let page = cml.beamMake(pageSrc)

cml.body = 'Loading...'
page.then(({ doc }) => {
  cml.beamRender(doc, chubLocation)
})

// On injectChub finished.
var chubinjected = (locationGot) => {
  console.log(locationGot, "lol", cml)
}