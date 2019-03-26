const path = require('path');
const fs = require('fs')

function boldGreen (s) {
  var boldgreencolor = `\x1b[32m\x1b[1m`
  var endMarker = `\x1b[0m`
  return (`${boldgreencolor}${s}${endMarker}`)
}

var nodeDir = path.resolve(__dirname)
var pkg = (fs.existsSync(nodeDir + '/package.json') && JSON.parse(fs.readFileSync(nodeDir + '/package.json', 'utf-8')) || {});
version = pkg.version

console.log (`Welcome to ${boldGreen('Sencha ExtUpgrade')} v${version} - The ExtReact Upgrade Tool

This tool upgrades applications generated with ext-react-gen

It must be run in an existine ExtReact project folder

${boldGreen('Quick Start:')} 
ext-upgrade
`)