var reactVersion = 0 
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
  "ext-soap" : '@sencha\/ext-soap',
  "ext-charts" : '@sencha\/ext-charts',
  "ext-ux" : '@sencha\/ext-ux',
  "ext-exporter" : '@sencha\/ext-exporter',
  "ext-calendar" : '@sencha\/ext-calendar',
  "ext-pivot" : '@sencha\/ext-pivot',
  "ext-pivot-locale" : '@sencha\/ext-pivot-locale',
  "ext-d3" : '@sencha\/ext-d3',
  "ext-pivot-d3" : '@sencha\/ext-pivot-d3'
}

module.exports = function(babel) {
  if (fs != undefined && fs != {} && typeof fs.existsSync === 'function') {
    var pkg = (fs.existsSync('package.json') && JSON.parse(fs.readFileSync('package.json', 'utf-8')) || {});
    var reactEntry = pkg.dependencies.react
    var is16 = reactEntry.includes("16");
    if (is16) { reactVersion = 16 } else { reactVersion = 15 }
    readline.cursorTo(process.stdout, 0);console.log('\n' + app + 'reactVersion: ' + reactVersion + '')
  }
  else {
    reactVersion = 16
  }

  const t = babel.types
  var prevFile = ''
  var sameFile = false
  var importWritten = false
  return {
    visitor: {
      ImportDeclaration: function(path) {
        const { node } = path;
        if(prevFile != path.hub.file.opts.sourceFileName) {
          //console.log(`\ndifferent ${path.hub.file.opts.sourceFileName}`)
          sameFile = false
          importWritten = false
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
          const declarations = [];
          node.specifiers.forEach(spec => {
            const local = spec.local.name
            const imported = spec.imported.name
            if (local == 'launch') {
              //readline.cursorTo(process.stdout, 0);console.log(`${app}generated-> import { ${local} } from '@sencha/ext-react${reactVersion}'`)
              declarations.push(t.importDeclaration([t.importSpecifier(t.identifier(`${local}`), t.identifier(`${local}`))],t.stringLiteral(`@sencha/ext-react${reactVersion}`)))
            }
            else {
              //readline.cursorTo(process.stdout, 0);console.log(`${app}generated-> const ${local} = reactify('${imported}')`)
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
          if (declarations.length) {
            if (sameFile && !importWritten) {
              //console.log('importWritten')
              importWritten = true
              //readline.cursorTo(process.stdout, 0);console.log(`${app}generated-> import { reactify } from '@sencha/ext-react${reactVersion}'`)
              path.insertBefore(t.importDeclaration([t.importSpecifier(t.identifier('reactify'), t.identifier('reactify'))],t.stringLiteral(`@sencha/ext-react${reactVersion}`)))
            }
            path.replaceWithMultiple(declarations)
          }
        }
        prevFile = path.hub.file.opts.sourceFileName
      }






//       ImportDeclaration2: function(path) {
//         //console.log("path: " + path)

//         console.log("in: " + path.hub.file.opts.sourceFileName)
//         const { node } = path
//         //if (node.source) {console.log(node.source.value)}
//         if (node.source && node.source.type === 'StringLiteral') {
//           for (var id in PATTERNS) {
//             if (PATTERNS.hasOwnProperty(id)) {
//               if (node.source.value == PATTERNS[id]) {
//                 //console.log("found: " + node.source.value)
//                 const local = node.specifiers[0].local.name;
//                 if(local === 'launch' || local === 'reactify'|| local === 'Template') {
//                   readline.cursorTo(process.stdout, 0);console.log(`${app}generated-> import ${local} from '@sencha/ext-react${reactVersion}'`)
//                   path.replaceWith(t.importDeclaration([t.importSpecifier(t.identifier(local), t.identifier(local))],t.stringLiteral(`@sencha/ext-react${reactVersion}`)))
//                 }
//                 else {
//                   const declarations = [];
//                   node.specifiers.forEach(spec => {
//                     const imported = spec.imported.name
//                     const local = spec.local.name
//                     readline.cursorTo(process.stdout, 0);console.log(`${app}generated-> const ${local} from reactify('${imported}')`)
//                     declarations.push(t.variableDeclaration('const',[t.variableDeclarator(t.identifier(local),t.callExpression(t.identifier('reactify'),[t.stringLiteral(imported)]))]))
//                     if (declarations.length) {
//                       if(prevFile != path.hub.file.opts.sourceFileName) {
//                         readline.cursorTo(process.stdout, 0);console.log(`${app}generated-> import reactify from '@sencha/ext-react${reactVersion}'`)
//                         path.insertBefore(t.importDeclaration([t.importSpecifier(t.identifier('reactify'), t.identifier('reactify'))],t.stringLiteral(`@sencha/ext-react${reactVersion}`)))
//                       }
// //                      prevFile = path.hub.file.opts.sourceFileName
//                       //path.replaceWithMultiple(declarations)
//                     }
//                   })
//                 }
//               }
//             }
//           }
//         }
//         prevFile = path.hub.file.opts.sourceFileName

//       }  //ImportDeclaration
    }
  }
}

//https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md