var reactVersion = 0
var reactVersionFull = ''
import chalk from 'chalk'
const app = `${chalk.green('ℹ ｢ext｣:')} ext-react-babel-plugin: `
import * as readline from 'readline'
var fs
try { fs = require('fs') }
catch(ex) { console.log('\n' + app + 'fs not found') }

var PATTERNS =
{
  "ext" : '@sencha\/ext',
  "ext-core" : '@sencha\/ext-core',
  "ext-modern" : '@sencha\/ext-modern',
  "ext-modern-treegrid" : '@sencha\/ext-modern-treegrid',
  "ext-classic" : '@sencha\/ext-classic',
  "ext-soap" : '@sencha\/ext-soap',
  "ext-charts" : '@sencha\/ext-charts',
  "ext-ux" : '@sencha\/ext-ux',
  "ext-exporter" : '@sencha\/ext-exporter',
  "ext-calendar" : '@sencha\/ext-calendar',
  "ext-pivot" : '@sencha\/ext-pivot',
  "ext-pivot-locale" : '@sencha\/ext-pivot-locale',
  "ext-d3" : '@sencha\/ext-d3',
  "ext-pivot-d3" : '@sencha\/ext-pivot-d3',
  "ext-react" : '@sencha\/ext-react',
  "ext-react-transition" : '@sencha\/ext-react-transition',
  "ext-react-cellrenderer" : '@sencha\/ext-react-cellrenderer',
}

module.exports = function(babel) {

  if (fs != undefined && fs != {} && typeof fs.existsSync === 'function') {
    var pkg = (fs.existsSync('package.json') && JSON.parse(fs.readFileSync('package.json', 'utf-8')) || {});
    reactVersionFull = pkg.dependencies.react
    var is16 = reactVersionFull.includes("16");
    if (is16) { reactVersion = 16 } else { reactVersion = 15 }
    readline.cursorTo(process.stdout, 0);
    try {
      process.stdout.clearLine()
    }
    catch(e) {}
    console.log(app + 'reactVersion: ' + reactVersionFull + '')
  }
  else {
    reactVersion = 16
  }


  const t = babel.types
  var prevFile = ''
  var sameFile = false
  var importWritten = false
  var shouldWrite = false

  return {
    visitor: {
      ImportDeclaration: function(path) {
        const { node } = path
        var currFile = path.hub.file.opts.sourceFileName
        if(prevFile != currFile) {
          readline.cursorTo(process.stdout, 0);
          try {
            process.stdout.clearLine()
          }
          catch(e) {}
          process.stdout.write(`${app}Processing ${currFile.replace(process.cwd(), '')}`)
          sameFile = false
          importWritten = false
          shouldWrite = false
        }
        else {
          sameFile = true
        }

        var matches = false
        if (node.source) {
          for (var id in PATTERNS) {
            if (PATTERNS.hasOwnProperty(id)) {
              if (node.source.value == PATTERNS[id]) {
                matches = true
              }
            }
          }
        }

        if (node.source && node.source.type === 'StringLiteral' && matches == true) {
          const declarations = []
          node.specifiers.forEach(spec => {
            const local = spec.local.name
            const imported = spec.imported.name
            if (local == 'reactify') {
              sameFile = false
              importWritten = false
              shouldWrite = false
            }
            if (local != 'launch' && local != 'reactify' && local != 'Template' && local != 'renderWhenReady' && local != 'render') {
              //readline.cursorTo(process.stdout, 0);console.log(`${app}generated-> const ${local} = reactify('${imported}')`)
              shouldWrite = true
              declarations.push(
                t.variableDeclaration('const', [
                  t.variableDeclarator(
                    t.identifier(local),
                    t.callExpression(
                      t.identifier('reactify'),
                      [t.stringLiteral(imported)]
                    )
                  )
                ])
              )
            }
          })

          // console.log('matches')
          // console.log(`sameFile: ${sameFile}`)
          // console.log(`importWritten: ${importWritten}`)
          // console.log(`shouldWrite: ${shouldWrite}`)

          if (shouldWrite) {
            shouldWrite = false
            if (sameFile && !importWritten) {
              //console.log('importWritten')
              importWritten = true
              //readline.cursorTo(process.stdout, 0);console.log(`${app}generated-> import { reactify } from '@sencha/ext-react-modern'`)
              path.insertBefore(t.importDeclaration([t.importSpecifier(t.identifier('reactify'), t.identifier('reactify'))],t.stringLiteral(`@sencha/ext-react`)))
            }
            path.replaceWithMultiple(declarations)
          }
        }
        prevFile = path.hub.file.opts.sourceFileName
      }
    }
  }
}

//https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md