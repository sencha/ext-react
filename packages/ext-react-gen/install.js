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

console.log (`Welcome to ${boldGreen('Sencha ExtReactGen')} v${version} - The ExtReact code generator

${boldGreen('Quick Start:')} 
ext-react-gen app CoolExtReactApp
ext-react-gen app -i
 
${boldGreen('Examples:')} 
ext-react-gen app --language javascript --theme graphite --name CoolExtReactApp
ext-react-gen app -l javascript -t graphite -n CoolExtReactApp

Run ${boldGreen('ext-react-gen --help')} to see all options
`)