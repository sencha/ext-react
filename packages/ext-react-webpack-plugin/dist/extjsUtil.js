"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultOptions = getDefaultOptions;
exports.getDefaultVars = getDefaultVars;
exports._afterCompile = _afterCompile;
exports._prepareForBuild = _prepareForBuild;

function getDefaultOptions() {
  return {
    port: 1962,
    emit: true,
    profile: 'desktop',
    environment: 'development',
    verbose: 'no'
  };
}

function getDefaultVars() {
  return {
    firstTime: true,
    browserCount: 0,
    cwd: process.cwd(),
    extPath: '.',
    pluginErrors: [],
    lastNumFiles: 0,
    lastMilliseconds: 0,
    lastMillisecondsAppJson: 0,
    files: ['./app.json'],
    dirs: ['./app', './packages']
  };
}

function _afterCompile(compilation, vars, options) {
  const logv = require('./pluginUtil').logv;

  logv(options, 'FUNCTION ext-after-compile');

  const path = require('path');

  let {
    files,
    dirs
  } = vars;
  const {
    cwd
  } = vars;
  files = typeof files === 'string' ? [files] : files;
  dirs = typeof dirs === 'string' ? [dirs] : dirs;

  const {
    fileDependencies,
    contextDependencies
  } = _getFileAndContextDeps(compilation, files, dirs, cwd);

  if (files.length > 0) {
    fileDependencies.forEach(file => {
      compilation.fileDependencies.add(path.resolve(file));
    });
  }

  if (dirs.length > 0) {
    contextDependencies.forEach(context => {
      compilation.contextDependencies.add(context);
    });
  }
}

function _getFileAndContextDeps(compilation, files, dirs, cwd) {
  //const log = require('./pluginUtil').log
  const uniq = require('lodash.uniq');

  const isGlob = require('is-glob');

  const {
    fileDependencies,
    contextDependencies
  } = compilation;
  const isWebpack4 = compilation.hooks;
  let fds = isWebpack4 ? [...fileDependencies] : fileDependencies;
  let cds = isWebpack4 ? [...contextDependencies] : contextDependencies;

  if (files.length > 0) {
    files.forEach(pattern => {
      let f = pattern;

      if (isGlob(pattern)) {
        f = glob.sync(pattern, {
          cwd,
          dot: true,
          absolute: true
        });
      }

      fds = fds.concat(f);
    });
    fds = uniq(fds);
  }

  if (dirs.length > 0) {
    cds = uniq(cds.concat(dirs));
  }

  return {
    fileDependencies: fds,
    contextDependencies: cds
  };
}

function _prepareForBuild(app, vars, options, output, compilation) {
  const log = require('./pluginUtil').log;

  const logv = require('./pluginUtil').logv;

  logv(options, '_prepareForBuild');

  const fs = require('fs');

  const recursiveReadSync = require('recursive-readdir-sync');

  var watchedFiles = [];

  try {
    watchedFiles = recursiveReadSync('./app').concat(recursiveReadSync('./packages'));
  } catch (err) {
    if (err.errno === 34) {
      console.log('Path does not exist');
    } else {
      throw err;
    }
  }

  var currentNumFiles = watchedFiles.length;
  logv(options, 'watchedFiles: ' + currentNumFiles);
  var doBuild = false;

  for (var file in watchedFiles) {
    if (vars.lastMilliseconds < fs.statSync(watchedFiles[file]).mtimeMs) {
      if (watchedFiles[file].indexOf("scss") != -1) {
        doBuild = true;
        break;
      }
    }
  }

  if (vars.lastMilliseconds < fs.statSync('./app.json').mtimeMs) {
    doBuild = true;
  }

  logv(options, 'doBuild: ' + doBuild);
  vars.lastMilliseconds = new Date().getTime();
  var filesource = 'this file enables client reload';
  compilation.assets[currentNumFiles + 'FilesUnderAppFolder.md'] = {
    source: function () {
      return filesource;
    },
    size: function () {
      return filesource.length;
    } //if(options.verbose == 'yes') {log('-v-' + app + 'currentNumFiles: ' + currentNumFiles)}
    //if(options.verbose == 'yes') {log('-v-' + app + 'vars.lastNumFiles: ' + vars.lastNumFiles)}
    //if(options.verbose == 'yes') {log('-v-' + app + 'doBuild: ' + doBuild)}

  };

  if (currentNumFiles != vars.lastNumFiles || doBuild) {
    vars.rebuild = true;
    log(app + 'building Ext bundle at: ' + output.replace(process.cwd(), ''));
  } else {
    vars.rebuild = false;
  }

  vars.lastNumFiles = currentNumFiles;
} // function toXtype(str) {
//   return str.toLowerCase().replace(/_/g, '-')
// }
// export function extractFromSource(js) {
//   const log = require('./pluginUtil').log
//   var generate = require("@babel/generator").default
//   var parse = require("babylon").parse
//   var traverse = require("ast-traverse")
//   const statements = []
//   const ast = parse(js, {
//     plugins: [
//       'jsx',
//       'flow',
//       'doExpressions',
//       'objectRestSpread',
//       'classProperties',
//       'exportExtensions',
//       'asyncGenerators',
//       'functionBind',
//       'functionSent',
//       'dynamicImport'
//     ],
//     sourceType: 'module'
//   })
//   function addType(argNode) {
//     var type
//     if (argNode.type === 'StringLiteral') {
//       var xtype = toXtype(argNode.value)
//       if (xtype != 'extreact') {
//         type = { xtype: toXtype(argNode.value) }
//       }
//     } else {
//       type = { xclass: js.slice(argNode.start, argNode.end) }
//     }
//     if (type != undefined) {
//       let config = JSON.stringify(type)
//       statements.push(`Ext.create(${config})`)
//     }
//   }
//   traverse(ast, {
//     pre: function(node) {
//       if (node.type === 'CallExpression'
//           && node.callee
//           && node.callee.object
//           && node.callee.object.name === 'Ext'
//       ) {
//         statements.push(generate(node).code)
//       }
//       if (node.type == 'VariableDeclarator' 
//           && node.init 
//           && node.init.type === 'CallExpression' 
//           && node.init.callee 
//       ) {
//         if (node.init.callee.name == 'reactify') {
//           for (let i = 0; i < node.init.arguments.length; i++) {
//             const valueNode = node.init.arguments[i];
//             if (!valueNode) continue;
//             addType(valueNode)
//           }
//          }
//       }
//       // // Convert React.createElement(...) calls to the equivalent Ext.create(...) calls to put in the manifest.
//       // if (node.type === 'CallExpressionx' 
//       //     && node.callee.object 
//       //     && node.callee.object.name === 'React' 
//       //     && node.callee.property.name === 'createElement') {
//       //   const [props] = node.arguments
//       //   let config
//       //   if (Array.isArray(props.properties)) {
//       //     config = generate(props).code
//       //     for (let key in type) {
//       //       config = `{\n  ${key}: '${type[key]}',${config.slice(1)}`
//       //     }
//       //   } else {
//       //     config = JSON.stringify(type)
//       //   }
//       // }
//     }
//   })
//   return statements
// }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHRqc1V0aWwuanMiXSwibmFtZXMiOlsiZ2V0RGVmYXVsdE9wdGlvbnMiLCJwb3J0IiwiZW1pdCIsInByb2ZpbGUiLCJlbnZpcm9ubWVudCIsInZlcmJvc2UiLCJnZXREZWZhdWx0VmFycyIsImZpcnN0VGltZSIsImJyb3dzZXJDb3VudCIsImN3ZCIsInByb2Nlc3MiLCJleHRQYXRoIiwicGx1Z2luRXJyb3JzIiwibGFzdE51bUZpbGVzIiwibGFzdE1pbGxpc2Vjb25kcyIsImxhc3RNaWxsaXNlY29uZHNBcHBKc29uIiwiZmlsZXMiLCJkaXJzIiwiX2FmdGVyQ29tcGlsZSIsImNvbXBpbGF0aW9uIiwidmFycyIsIm9wdGlvbnMiLCJsb2d2IiwicmVxdWlyZSIsInBhdGgiLCJmaWxlRGVwZW5kZW5jaWVzIiwiY29udGV4dERlcGVuZGVuY2llcyIsIl9nZXRGaWxlQW5kQ29udGV4dERlcHMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiZmlsZSIsImFkZCIsInJlc29sdmUiLCJjb250ZXh0IiwidW5pcSIsImlzR2xvYiIsImlzV2VicGFjazQiLCJob29rcyIsImZkcyIsImNkcyIsInBhdHRlcm4iLCJmIiwiZ2xvYiIsInN5bmMiLCJkb3QiLCJhYnNvbHV0ZSIsImNvbmNhdCIsIl9wcmVwYXJlRm9yQnVpbGQiLCJhcHAiLCJvdXRwdXQiLCJsb2ciLCJmcyIsInJlY3Vyc2l2ZVJlYWRTeW5jIiwid2F0Y2hlZEZpbGVzIiwiZXJyIiwiZXJybm8iLCJjb25zb2xlIiwiY3VycmVudE51bUZpbGVzIiwiZG9CdWlsZCIsInN0YXRTeW5jIiwibXRpbWVNcyIsImluZGV4T2YiLCJEYXRlIiwiZ2V0VGltZSIsImZpbGVzb3VyY2UiLCJhc3NldHMiLCJzb3VyY2UiLCJzaXplIiwicmVidWlsZCIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRU8sU0FBU0EsaUJBQVQsR0FBNkI7QUFDbEMsU0FBTztBQUNMQyxJQUFBQSxJQUFJLEVBQUUsSUFE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Q0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgcmV0dXJuIHtcbiAgICBwb3J0OiAxOTYyLFxuICAgIGVtaXQ6IHRydWUsXG4gICAgcHJvZmlsZTogJ2Rlc2t0b3AnLCBcbiAgICBlbnZpcm9ubWVudDogJ2RldmVsb3BtZW50JywgXG4gICAgdmVyYm9zZTogJ25vJ1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0VmFycygpIHtcbiAgcmV0dXJuIHtcbiAgICBmaXJzdFRpbWUgOiB0cnVlLFxuICAgIGJyb3dzZXJDb3VudCA6IDAsXG4gICAgY3dkOiBwcm9jZXNzLmN3ZCgpLFxuICAgIGV4dFBhdGg6ICcuJyxcbiAgICBwbHVnaW5FcnJvcnM6IFtdLFxuICAgIGxhc3ROdW1GaWxlczogMCxcbiAgICBsYXN0TWlsbGlzZWNvbmRzOiAwLFxuICAgIGxhc3RNaWxsaXNlY29uZHNBcHBKc29uOiAwLFxuICAgIGZpbGVzOiBbJy4vYXBwLmpzb24nXSxcbiAgICBkaXJzOiBbJy4vYXBwJywnLi9wYWNrYWdlcyddXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9hZnRlckNvbXBpbGUoY29tcGlsYXRpb24sIHZhcnMsIG9wdGlvbnMpIHtcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdGVU5DVElPTiBleHQtYWZ0ZXItY29tcGlsZScpXG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgbGV0IHsgZmlsZXMsIGRpcnMgfSA9IHZhcnNcbiAgY29uc3QgeyBjd2QgfSA9IHZhcnNcbiAgZmlsZXMgPSB0eXBlb2YgZmlsZXMgPT09ICdzdHJpbmcnID8gW2ZpbGVzXSA6IGZpbGVzXG4gIGRpcnMgPSB0eXBlb2YgZGlycyA9PT0gJ3N0cmluZycgPyBbZGlyc10gOiBkaXJzXG4gIGNvbnN0IHtcbiAgICBmaWxlRGVwZW5kZW5jaWVzLFxuICAgIGNvbnRleHREZXBlbmRlbmNpZXMsXG4gIH0gPSBfZ2V0RmlsZUFuZENvbnRleHREZXBzKGNvbXBpbGF0aW9uLCBmaWxlcywgZGlycywgY3dkKTtcbiAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICBmaWxlRGVwZW5kZW5jaWVzLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgIGNvbXBpbGF0aW9uLmZpbGVEZXBlbmRlbmNpZXMuYWRkKHBhdGgucmVzb2x2ZShmaWxlKSk7XG4gICAgfSlcbiAgfVxuICBpZiAoZGlycy5sZW5ndGggPiAwKSB7XG4gICAgY29udGV4dERlcGVuZGVuY2llcy5mb3JFYWNoKChjb250ZXh0KSA9PiB7XG4gICAgICBjb21waWxhdGlvbi5jb250ZXh0RGVwZW5kZW5jaWVzLmFkZChjb250ZXh0KTtcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRGaWxlQW5kQ29udGV4dERlcHMoY29tcGlsYXRpb24sIGZpbGVzLCBkaXJzLCBjd2QpIHtcbiAgLy9jb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgY29uc3QgdW5pcSA9IHJlcXVpcmUoJ2xvZGFzaC51bmlxJylcbiAgY29uc3QgaXNHbG9iID0gcmVxdWlyZSgnaXMtZ2xvYicpXG5cbiAgY29uc3QgeyBmaWxlRGVwZW5kZW5jaWVzLCBjb250ZXh0RGVwZW5kZW5jaWVzIH0gPSBjb21waWxhdGlvbjtcbiAgY29uc3QgaXNXZWJwYWNrNCA9IGNvbXBpbGF0aW9uLmhvb2tzO1xuICBsZXQgZmRzID0gaXNXZWJwYWNrNCA/IFsuLi5maWxlRGVwZW5kZW5jaWVzXSA6IGZpbGVEZXBlbmRlbmNpZXM7XG4gIGxldCBjZHMgPSBpc1dlYnBhY2s0ID8gWy4uLmNvbnRleHREZXBlbmRlbmNpZXNdIDogY29udGV4dERlcGVuZGVuY2llcztcbiAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICBmaWxlcy5mb3JFYWNoKChwYXR0ZXJuKSA9PiB7XG4gICAgICBsZXQgZiA9IHBhdHRlcm5cbiAgICAgIGlmIChpc0dsb2IocGF0dGVybikpIHtcbiAgICAgICAgZiA9IGdsb2Iuc3luYyhwYXR0ZXJuLCB7IGN3ZCwgZG90OiB0cnVlLCBhYnNvbHV0ZTogdHJ1ZSB9KVxuICAgICAgfVxuICAgICAgZmRzID0gZmRzLmNvbmNhdChmKVxuICAgIH0pXG4gICAgZmRzID0gdW5pcShmZHMpXG4gIH1cbiAgaWYgKGRpcnMubGVuZ3RoID4gMCkge1xuICAgIGNkcyA9IHVuaXEoY2RzLmNvbmNhdChkaXJzKSlcbiAgfVxuICByZXR1cm4geyBmaWxlRGVwZW5kZW5jaWVzOiBmZHMsIGNvbnRleHREZXBlbmRlbmNpZXM6IGNkcyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfcHJlcGFyZUZvckJ1aWxkKGFwcCwgdmFycywgb3B0aW9ucywgb3V0cHV0LCBjb21waWxhdGlvbikge1xuICBjb25zdCBsb2cgPSByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2dcbiAgY29uc3QgbG9ndiA9IHJlcXVpcmUoJy4vcGx1Z2luVXRpbCcpLmxvZ3ZcbiAgbG9ndihvcHRpb25zLCdfcHJlcGFyZUZvckJ1aWxkJylcbiAgY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG4gIGNvbnN0IHJlY3Vyc2l2ZVJlYWRTeW5jID0gcmVxdWlyZSgncmVjdXJzaXZlLXJlYWRkaXItc3luYycpXG4gIHZhciB3YXRjaGVkRmlsZXM9W11cbiAgdHJ5IHt3YXRjaGVkRmlsZXMgPSByZWN1cnNpdmVSZWFkU3luYygnLi9hcHAnKS5jb25jYXQocmVjdXJzaXZlUmVhZFN5bmMoJy4vcGFja2FnZXMnKSl9XG4gIGNhdGNoKGVycikge2lmKGVyci5lcnJubyA9PT0gMzQpe2NvbnNvbGUubG9nKCdQYXRoIGRvZXMgbm90IGV4aXN0Jyk7fSBlbHNlIHt0aHJvdyBlcnI7fX1cbiAgdmFyIGN1cnJlbnROdW1GaWxlcyA9IHdhdGNoZWRGaWxlcy5sZW5ndGhcbiAgbG9ndihvcHRpb25zLCd3YXRjaGVkRmlsZXM6ICcgKyBjdXJyZW50TnVtRmlsZXMpXG4gIHZhciBkb0J1aWxkID0gZmFsc2VcbiAgZm9yICh2YXIgZmlsZSBpbiB3YXRjaGVkRmlsZXMpIHtcbiAgICBpZiAodmFycy5sYXN0TWlsbGlzZWNvbmRzIDwgZnMuc3RhdFN5bmMod2F0Y2hlZEZpbGVzW2ZpbGVdKS5tdGltZU1zKSB7XG4gICAgICBpZiAod2F0Y2hlZEZpbGVzW2ZpbGVdLmluZGV4T2YoXCJzY3NzXCIpICE9IC0xKSB7ZG9CdWlsZD10cnVlO2JyZWFrO31cbiAgICB9XG4gIH1cbiAgaWYgKHZhcnMubGFzdE1pbGxpc2Vjb25kcyA8IGZzLnN0YXRTeW5jKCcuL2FwcC5qc29uJykubXRpbWVNcykge1xuICAgIGRvQnVpbGQ9dHJ1ZVxuICB9XG4gIGxvZ3Yob3B0aW9ucywnZG9CdWlsZDogJyArIGRvQnVpbGQpXG5cbiAgdmFycy5sYXN0TWlsbGlzZWNvbmRzID0gKG5ldyBEYXRlKS5nZXRUaW1lKClcbiAgdmFyIGZpbGVzb3VyY2UgPSAndGhpcyBmaWxlIGVuYWJsZXMgY2xpZW50IHJlbG9hZCdcbiAgY29tcGlsYXRpb24uYXNzZXRzW2N1cnJlbnROdW1GaWxlcyArICdGaWxlc1VuZGVyQXBwRm9sZGVyLm1kJ10gPSB7XG4gICAgc291cmNlOiBmdW5jdGlvbigpIHtyZXR1cm4gZmlsZXNvdXJjZX0sXG4gICAgc2l6ZTogZnVuY3Rpb24oKSB7cmV0dXJuIGZpbGVzb3VyY2UubGVuZ3RofVxuICB9XG5cbiAgLy9pZihvcHRpb25zLnZlcmJvc2UgPT0gJ3llcycpIHtsb2coJy12LScgKyBhcHAgKyAnY3VycmVudE51bUZpbGVzOiAnICsgY3VycmVudE51bUZpbGVzKX1cbiAgLy9pZihvcHRpb25zLnZlcmJvc2UgPT0gJ3llcycpIHtsb2coJy12LScgKyBhcHAgKyAndmFycy5sYXN0TnVtRmlsZXM6ICcgKyB2YXJzLmxhc3ROdW1GaWxlcyl9XG4gIC8vaWYob3B0aW9ucy52ZXJib3NlID09ICd5ZXMnKSB7bG9nKCctdi0nICsgYXBwICsgJ2RvQnVpbGQ6ICcgKyBkb0J1aWxkKX1cblxuICBpZiAoY3VycmVudE51bUZpbGVzICE9IHZhcnMubGFzdE51bUZpbGVzIHx8IGRvQnVpbGQpIHtcbiAgICB2YXJzLnJlYnVpbGQgPSB0cnVlXG4gICAgbG9nKGFwcCArICdidWlsZGluZyBFeHQgYnVuZGxlIGF0OiAnICsgb3V0cHV0LnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpKVxuICB9XG4gIGVsc2Uge1xuICAgIHZhcnMucmVidWlsZCA9IGZhbHNlXG4gIH1cbiAgdmFycy5sYXN0TnVtRmlsZXMgPSBjdXJyZW50TnVtRmlsZXNcbn1cblxuLy8gZnVuY3Rpb24gdG9YdHlwZShzdHIpIHtcbi8vICAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL18vZywgJy0nKVxuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gZXh0cmFjdEZyb21Tb3VyY2UoanMpIHtcbi8vICAgY29uc3QgbG9nID0gcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nXG4vLyAgIHZhciBnZW5lcmF0ZSA9IHJlcXVpcmUoXCJAYmFiZWwvZ2VuZXJhdG9yXCIpLmRlZmF1bHRcbi8vICAgdmFyIHBhcnNlID0gcmVxdWlyZShcImJhYnlsb25cIikucGFyc2Vcbi8vICAgdmFyIHRyYXZlcnNlID0gcmVxdWlyZShcImFzdC10cmF2ZXJzZVwiKVxuLy8gICBjb25zdCBzdGF0ZW1lbnRzID0gW11cbiAgXG4vLyAgIGNvbnN0IGFzdCA9IHBhcnNlKGpzLCB7XG4vLyAgICAgcGx1Z2luczogW1xuLy8gICAgICAgJ2pzeCcsXG4vLyAgICAgICAnZmxvdycsXG4vLyAgICAgICAnZG9FeHByZXNzaW9ucycsXG4vLyAgICAgICAnb2JqZWN0UmVzdFNwcmVhZCcsXG4vLyAgICAgICAnY2xhc3NQcm9wZXJ0aWVzJyxcbi8vICAgICAgICdleHBvcnRFeHRlbnNpb25zJyxcbi8vICAgICAgICdhc3luY0dlbmVyYXRvcnMnLFxuLy8gICAgICAgJ2Z1bmN0aW9uQmluZCcsXG4vLyAgICAgICAnZnVuY3Rpb25TZW50Jyxcbi8vICAgICAgICdkeW5hbWljSW1wb3J0J1xuLy8gICAgIF0sXG4vLyAgICAgc291cmNlVHlwZTogJ21vZHVsZSdcbi8vICAgfSlcblxuLy8gICBmdW5jdGlvbiBhZGRUeXBlKGFyZ05vZGUpIHtcbi8vICAgICB2YXIgdHlwZVxuLy8gICAgIGlmIChhcmdOb2RlLnR5cGUgPT09ICdTdHJpbmdMaXRlcmFsJykge1xuLy8gICAgICAgdmFyIHh0eXBlID0gdG9YdHlwZShhcmdOb2RlLnZhbHVlKVxuLy8gICAgICAgaWYgKHh0eXBlICE9ICdleHRyZWFjdCcpIHtcbi8vICAgICAgICAgdHlwZSA9IHsgeHR5cGU6IHRvWHR5cGUoYXJnTm9kZS52YWx1ZSkgfVxuLy8gICAgICAgfVxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICB0eXBlID0geyB4Y2xhc3M6IGpzLnNsaWNlKGFyZ05vZGUuc3RhcnQsIGFyZ05vZGUuZW5kKSB9XG4vLyAgICAgfVxuLy8gICAgIGlmICh0eXBlICE9IHVuZGVmaW5lZCkge1xuLy8gICAgICAgbGV0IGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHR5cGUpXG4vLyAgICAgICBzdGF0ZW1lbnRzLnB1c2goYEV4dC5jcmVhdGUoJHtjb25maWd9KWApXG4vLyAgICAgfVxuLy8gICB9XG5cbi8vICAgdHJhdmVyc2UoYXN0LCB7XG4vLyAgICAgcHJlOiBmdW5jdGlvbihub2RlKSB7XG4vLyAgICAgICBpZiAobm9kZS50eXBlID09PSAnQ2FsbEV4cHJlc3Npb24nXG4vLyAgICAgICAgICAgJiYgbm9kZS5jYWxsZWVcbi8vICAgICAgICAgICAmJiBub2RlLmNhbGxlZS5vYmplY3Rcbi8vICAgICAgICAgICAmJiBub2RlLmNhbGxlZS5vYmplY3QubmFtZSA9PT0gJ0V4dCdcbi8vICAgICAgICkge1xuLy8gICAgICAgICBzdGF0ZW1lbnRzLnB1c2goZ2VuZXJhdGUobm9kZSkuY29kZSlcbi8vICAgICAgIH1cbi8vICAgICAgIGlmIChub2RlLnR5cGUgPT0gJ1ZhcmlhYmxlRGVjbGFyYXRvcicgXG4vLyAgICAgICAgICAgJiYgbm9kZS5pbml0IFxuLy8gICAgICAgICAgICYmIG5vZGUuaW5pdC50eXBlID09PSAnQ2FsbEV4cHJlc3Npb24nIFxuLy8gICAgICAgICAgICYmIG5vZGUuaW5pdC5jYWxsZWUgXG4vLyAgICAgICApIHtcbi8vICAgICAgICAgaWYgKG5vZGUuaW5pdC5jYWxsZWUubmFtZSA9PSAncmVhY3RpZnknKSB7XG4vLyAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmluaXQuYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgICAgICAgICBjb25zdCB2YWx1ZU5vZGUgPSBub2RlLmluaXQuYXJndW1lbnRzW2ldO1xuLy8gICAgICAgICAgICAgaWYgKCF2YWx1ZU5vZGUpIGNvbnRpbnVlO1xuLy8gICAgICAgICAgICAgYWRkVHlwZSh2YWx1ZU5vZGUpXG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgfVxuLy8gICAgICAgfVxuXG4vLyAgICAgICAvLyAvLyBDb252ZXJ0IFJlYWN0LmNyZWF0ZUVsZW1lbnQoLi4uKSBjYWxscyB0byB0aGUgZXF1aXZhbGVudCBFeHQuY3JlYXRlKC4uLikgY2FsbHMgdG8gcHV0IGluIHRoZSBtYW5pZmVzdC5cbi8vICAgICAgIC8vIGlmIChub2RlLnR5cGUgPT09ICdDYWxsRXhwcmVzc2lvbngnIFxuLy8gICAgICAgLy8gICAgICYmIG5vZGUuY2FsbGVlLm9iamVjdCBcbi8vICAgICAgIC8vICAgICAmJiBub2RlLmNhbGxlZS5vYmplY3QubmFtZSA9PT0gJ1JlYWN0JyBcbi8vICAgICAgIC8vICAgICAmJiBub2RlLmNhbGxlZS5wcm9wZXJ0eS5uYW1lID09PSAnY3JlYXRlRWxlbWVudCcpIHtcbi8vICAgICAgIC8vICAgY29uc3QgW3Byb3BzXSA9IG5vZGUuYXJndW1lbnRzXG4vLyAgICAgICAvLyAgIGxldCBjb25maWdcbi8vICAgICAgIC8vICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMucHJvcGVydGllcykpIHtcbi8vICAgICAgIC8vICAgICBjb25maWcgPSBnZW5lcmF0ZShwcm9wcykuY29kZVxuLy8gICAgICAgLy8gICAgIGZvciAobGV0IGtleSBpbiB0eXBlKSB7XG4vLyAgICAgICAvLyAgICAgICBjb25maWcgPSBge1xcbiAgJHtrZXl9OiAnJHt0eXBlW2tleV19Jywke2NvbmZpZy5zbGljZSgxKX1gXG4vLyAgICAgICAvLyAgICAgfVxuLy8gICAgICAgLy8gICB9IGVsc2Uge1xuLy8gICAgICAgLy8gICAgIGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHR5cGUpXG4vLyAgICAgICAvLyAgIH1cbi8vICAgICAgIC8vIH1cbi8vICAgICB9XG4vLyAgIH0pXG4vLyAgIHJldHVybiBzdGF0ZW1lbnRzXG4vLyB9XG4iXX0=