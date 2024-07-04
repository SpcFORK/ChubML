const path = require('path');
const fs = require('fs');

const file = path.resolve('front/dist/cml.js');
const fineOut = 'cml'

const messsage = () => console.log(`
  ChubML - Chub Markup Language
  Copyright (c) ${new Date().getFullYear()} SpcFORK

  License: ISC

  https://github.com/SpcFORK/ChubML

  ${'- '.repeat(10)}

  - parse  Parse a ChubML file
  - compile  Compile a ChubML file
  - write  Write a ChubML file
  
`)

const embed = (msgr) => {
  try { process.argv.length < 3 && msgr() }
  catch { }
}

const runtime = `#!/usr/bin/env node\n{(${embed})(${messsage})}\n\n`

const ENVPath = process.env.PATH.split(':')
const ENVBin = process.env.npm_config_prefix

const binPath = ENVBin ? ENVBin : ENVPath[0]

const binDir = path.join(binPath, 'bin')
const binFile = path.join(binDir, fineOut)
const binDirExists = fs.existsSync(binDir)
if (!binDirExists) {
  fs.mkdirSync(binDir)
}

console.log('Copying file...')
fs.writeFileSync(binFile, runtime + fs.readFileSync(file, 'utf8'))
fs.chmodSync(binFile, '755')
console.log('Done!')