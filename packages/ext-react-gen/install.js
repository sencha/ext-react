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

console.log (`Welcome to ${boldGreen('Sencha ExtGen')} v${version} - The Ext JS code generator

${boldGreen('Quick Start:')} 
ext-gen app MyAppName
ext-gen app -i
 
${boldGreen('Examples:')} 
ext-gen app --template universalclassicmodern --classictheme theme-graphite --moderntheme theme-material --name CoolUniversalApp
ext-gen app --template classicdesktop --classictheme theme-graphite --name CoolDesktopApp 
ext-gen app --interactive
ext-gen app --classictheme theme-graphite -n ClassicApp
ext-gen app -t moderndesktop -n ModernApp

Run ${boldGreen('ext-gen --help')} to see all options
`)