"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeAsync = executeAsync;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chalk = require('chalk');

const crossSpawn = require('cross-spawn');

var prefix = ``;

if (require('os').platform() == 'darwin') {
  prefix = `ℹ ｢ext｣:`;
} else {
  prefix = `i [ext]:`;
}

const app = `${chalk.green(prefix)} ext-build:`;
const DEFAULT_SUBSTRS = ['[INF] Loading', '[LOG] Fashion build complete', '[ERR]', '[WRN]', '[INF] Processing', "[INF] Server", "[INF] Writing", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];

function executeAsync(_x, _x2, _x3, _x4, _x5) {
  return _executeAsync.apply(this, arguments);
}

function _executeAsync() {
  _executeAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(command, parms, options, compilation, cmdErrors, verbose = 'no', substrings = DEFAULT_SUBSTRS) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return new Promise((resolve, reject) => {
            if (verbose == 'yes') {
              console.log(`-v-${app} command - ${command}`);
              console.log(`-v-${app} parms - ${parms}`);
              console.log(`-v-${app} options - ${JSON.stringify(options)}`);
            }

            let child = crossSpawn(command, parms, options);
            child.on('close', (code, signal) => {
              if (code === 0) {
                resolve(0);
              } else {
                compilation.errors.push(new Error(cmdErrors.join("")));
                reject(0);
              }
            });
            child.on('error', error => {
              reject(error);
            });
            child.stdout.on('data', data => {
              var str = data.toString().replace(/\r?\n|\r/g, " ").trim();

              if (data && data.toString().match(/Waiting for changes\.\.\./)) {
                resolve(0);
              }

              if (verbose == 'yes') {
                console.log(`-v-${app}${str}`);
              } else {
                if (substrings.some(function (v) {
                  return data.indexOf(v) >= 0;
                })) {
                  str = str.replace("[INF]", "");
                  str = str.replace("[LOG]", "");
                  str = str.replace(process.cwd(), '');

                  if (str.includes("[ERR]")) {
                    cmdErrors.push(app + str.replace(/^\[ERR\] /gi, ''));
                    str = str.replace("[ERR]", `${chalk.red("[ERR]")}`);
                  }

                  console.log(`${app}${str}`);
                }
              }
            });
            child.stderr.on('data', data => {
              var str = data.toString().replace(/\r?\n|\r/g, " ").trim();
              var strJavaOpts = "Picked up _JAVA_OPTIONS";
              var includes = str.includes(strJavaOpts);

              if (!includes) {
                console.log(`${app} ${chalk.red("[ERR]")} ${str}`);
              }
            });
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _executeAsync.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGVjdXRlQXN5bmMuanMiXSwibmFtZXMiOlsiY2hhbGsiLCJyZXF1aXJlIiwiY3Jvc3NTcGF3biIsInByZWZpeCIsInBsYXRmb3JtIiwiYXBwIiwiZ3JlZW4iLCJERUZBVUxUX1NVQlNUUlMiLCJleGVjdXRlQXN5bmMiLCJjb21tYW5kIiwicGFybXMiLCJvcHRpb25zIiwiY29tcGlsYXRpb24iLCJjbWRFcnJvcnMiLCJ2ZXJib3NlIiwic3Vic3RyaW5ncyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjaGlsZCIsIm9uIiwiY29kZSIsInNpZ25hbCIsImVycm9ycyIsInB1c2giLCJFcnJvciIsImpvaW4iLCJlcnJvciIsInN0ZG91dCIsImRhdGEiLCJzdHIiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJ0cmltIiwibWF0Y2giLCJzb21lIiwidiIsImluZGV4T2YiLCJwcm9jZXNzIiwiY3dkIiwiaW5jbHVkZXMiLCJyZWQiLCJzdGRlcnIiLCJzdHJKYXZhT3B0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLE1BQU1DLFVBQVUsR0FBR0QsT0FBTyxDQUFDLGFBQUQsQ0FBMUI7O0FBQ0EsSUFBSUUsTUFBTSxHQUFJLEVBQWQ7O0FBQWdCLElBQUlGLE9BQU8sQ0FBQyxJQUFELENBQVAsQ0FBY0csUUFBZCxNQUE0QixRQUFoQyxFQUEwQztBQUFDRCxFQUFBQSxNQUFNLEdBQUksVUFBVjtBQUFvQixDQUEvRCxNQUFxRTtBQUFDQSxFQUFBQSxNQUFNLEdBQUksVUFBVjtBQUFvQjs7QUFDMUcsTUFBTUUsR0FBRyxHQUFJLEdBQUVMLEtBQUssQ0FBQ00sS0FBTixDQUFZSCxNQUFaLENBQW9CLGFBQW5DO0FBQ0EsTUFBTUksZUFBZSxHQUFHLENBQUMsZUFBRCxFQUFrQiw4QkFBbEIsRUFBa0QsT0FBbEQsRUFBMkQsT0FBM0QsRUFBb0Usa0JBQXBFLEVBQXdGLGNBQXhGLEVBQXdHLGVBQXhHLEVBQXlILHFCQUF6SCxFQUFnSixlQUFoSixFQUFpSyx1QkFBakssQ0FBeEI7O1NBRXNCQyxZOzs7Ozs7OzBCQUFmLGlCQUE2QkMsT0FBN0IsRUFBc0NDLEtBQXRDLEVBQTZDQyxPQUE3QyxFQUFzREMsV0FBdEQsRUFBbUVDLFNBQW5FLEVBQThFQyxPQUFPLEdBQUcsSUFBeEYsRUFBOEZDLFVBQVUsR0FBR1IsZUFBM0c7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUNDLElBQUlTLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDckMsZ0JBQUdKLE9BQU8sSUFBSSxLQUFkLEVBQXFCO0FBQ25CSyxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBYSxNQUFLZixHQUFJLGNBQWFJLE9BQVEsRUFBM0M7QUFDQVUsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsTUFBS2YsR0FBSSxZQUFXSyxLQUFNLEVBQXZDO0FBQ0FTLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFhLE1BQUtmLEdBQUksY0FBYWdCLElBQUksQ0FBQ0MsU0FBTCxDQUFlWCxPQUFmLENBQXdCLEVBQTNEO0FBQ0Q7O0FBQ0QsZ0JBQUlZLEtBQUssR0FBR3JCLFVBQVUsQ0FBQ08sT0FBRCxFQUFVQyxLQUFWLEVBQWlCQyxPQUFqQixDQUF0QjtBQUNBWSxZQUFBQSxLQUFLLENBQUNDLEVBQU4sQ0FBUyxPQUFULEVBQWtCLENBQUNDLElBQUQsRUFBT0MsTUFBUCxLQUFrQjtBQUNsQyxrQkFBR0QsSUFBSSxLQUFLLENBQVosRUFBZTtBQUFFUixnQkFBQUEsT0FBTyxDQUFDLENBQUQsQ0FBUDtBQUFZLGVBQTdCLE1BQ0s7QUFBRUwsZ0JBQUFBLFdBQVcsQ0FBQ2UsTUFBWixDQUFtQkMsSUFBbkIsQ0FBeUIsSUFBSUMsS0FBSixDQUFVaEIsU0FBUyxDQUFDaUIsSUFBVixDQUFlLEVBQWYsQ0FBVixDQUF6QjtBQUEwRFosZ0JBQUFBLE1BQU0sQ0FBQyxDQUFELENBQU47QUFBVztBQUM3RSxhQUhEO0FBSUFLLFlBQUFBLEtBQUssQ0FBQ0MsRUFBTixDQUFTLE9BQVQsRUFBbUJPLEtBQUQsSUFBVztBQUFFYixjQUFBQSxNQUFNLENBQUNhLEtBQUQsQ0FBTjtBQUFlLGFBQTlDO0FBQ0FSLFlBQUFBLEtBQUssQ0FBQ1MsTUFBTixDQUFhUixFQUFiLENBQWdCLE1BQWhCLEVBQXlCUyxJQUFELElBQVU7QUFDaEMsa0JBQUlDLEdBQUcsR0FBR0QsSUFBSSxDQUFDRSxRQUFMLEdBQWdCQyxPQUFoQixDQUF3QixXQUF4QixFQUFxQyxHQUFyQyxFQUEwQ0MsSUFBMUMsRUFBVjs7QUFDQSxrQkFBSUosSUFBSSxJQUFJQSxJQUFJLENBQUNFLFFBQUwsR0FBZ0JHLEtBQWhCLENBQXNCLDJCQUF0QixDQUFaLEVBQWdFO0FBQzlEckIsZ0JBQUFBLE9BQU8sQ0FBQyxDQUFELENBQVA7QUFDRDs7QUFDRCxrQkFBR0gsT0FBTyxJQUFJLEtBQWQsRUFBcUI7QUFDbkJLLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBYSxNQUFLZixHQUFJLEdBQUU2QixHQUFJLEVBQTVCO0FBQ0QsZUFGRCxNQUdLO0FBQ0gsb0JBQUluQixVQUFVLENBQUN3QixJQUFYLENBQWdCLFVBQVNDLENBQVQsRUFBWTtBQUFFLHlCQUFPUCxJQUFJLENBQUNRLE9BQUwsQ0FBYUQsQ0FBYixLQUFtQixDQUExQjtBQUE4QixpQkFBNUQsQ0FBSixFQUFtRTtBQUNqRU4sa0JBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDRSxPQUFKLENBQVksT0FBWixFQUFxQixFQUFyQixDQUFOO0FBQ0FGLGtCQUFBQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ0UsT0FBSixDQUFZLE9BQVosRUFBcUIsRUFBckIsQ0FBTjtBQUNBRixrQkFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNFLE9BQUosQ0FBWU0sT0FBTyxDQUFDQyxHQUFSLEVBQVosRUFBMkIsRUFBM0IsQ0FBTjs7QUFDQSxzQkFBSVQsR0FBRyxDQUFDVSxRQUFKLENBQWEsT0FBYixDQUFKLEVBQTJCO0FBQ3pCL0Isb0JBQUFBLFNBQVMsQ0FBQ2UsSUFBVixDQUFldkIsR0FBRyxHQUFHNkIsR0FBRyxDQUFDRSxPQUFKLENBQVksYUFBWixFQUEyQixFQUEzQixDQUFyQjtBQUNBRixvQkFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNFLE9BQUosQ0FBWSxPQUFaLEVBQXNCLEdBQUVwQyxLQUFLLENBQUM2QyxHQUFOLENBQVUsT0FBVixDQUFtQixFQUEzQyxDQUFOO0FBQ0Q7O0FBQ0QxQixrQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsR0FBRWYsR0FBSSxHQUFFNkIsR0FBSSxFQUF6QjtBQUNEO0FBQ0Y7QUFDRixhQXBCRDtBQXFCQVgsWUFBQUEsS0FBSyxDQUFDdUIsTUFBTixDQUFhdEIsRUFBYixDQUFnQixNQUFoQixFQUF5QlMsSUFBRCxJQUFVO0FBQ2hDLGtCQUFJQyxHQUFHLEdBQUdELElBQUksQ0FBQ0UsUUFBTCxHQUFnQkMsT0FBaEIsQ0FBd0IsV0FBeEIsRUFBcUMsR0FBckMsRUFBMENDLElBQTFDLEVBQVY7QUFDQSxrQkFBSVUsV0FBVyxHQUFHLHlCQUFsQjtBQUNBLGtCQUFJSCxRQUFRLEdBQUdWLEdBQUcsQ0FBQ1UsUUFBSixDQUFhRyxXQUFiLENBQWY7O0FBQ0Esa0JBQUksQ0FBQ0gsUUFBTCxFQUFlO0FBQ2J6QixnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsR0FBRWYsR0FBSSxJQUFHTCxLQUFLLENBQUM2QyxHQUFOLENBQVUsT0FBVixDQUFtQixJQUFHWCxHQUFJLEVBQWhEO0FBQ0Q7QUFDRixhQVBEO0FBUUQsV0F6Q0ssQ0FERDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjaGFsayA9IHJlcXVpcmUoJ2NoYWxrJylcbmNvbnN0IGNyb3NzU3Bhd24gPSByZXF1aXJlKCdjcm9zcy1zcGF3bicpXG52YXIgcHJlZml4ID0gYGA7aWYgKHJlcXVpcmUoJ29zJykucGxhdGZvcm0oKSA9PSAnZGFyd2luJykge3ByZWZpeCA9IGDihLkg772iZXh0772jOmB9IGVsc2Uge3ByZWZpeCA9IGBpIFtleHRdOmB9XG5jb25zdCBhcHAgPSBgJHtjaGFsay5ncmVlbihwcmVmaXgpfSBleHQtYnVpbGQ6YFxuY29uc3QgREVGQVVMVF9TVUJTVFJTID0gWydbSU5GXSBMb2FkaW5nJywgJ1tMT0ddIEZhc2hpb24gYnVpbGQgY29tcGxldGUnLCAnW0VSUl0nLCAnW1dSTl0nLCAnW0lORl0gUHJvY2Vzc2luZycsIFwiW0lORl0gU2VydmVyXCIsIFwiW0lORl0gV3JpdGluZ1wiLCBcIltJTkZdIExvYWRpbmcgQnVpbGRcIiwgXCJbSU5GXSBXYWl0aW5nXCIsIFwiW0xPR10gRmFzaGlvbiB3YWl0aW5nXCJdO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUFzeW5jIChjb21tYW5kLCBwYXJtcywgb3B0aW9ucywgY29tcGlsYXRpb24sIGNtZEVycm9ycywgdmVyYm9zZSA9ICdubycsIHN1YnN0cmluZ3MgPSBERUZBVUxUX1NVQlNUUlMgKSB7XG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZih2ZXJib3NlID09ICd5ZXMnKSB7XG4gICAgICBjb25zb2xlLmxvZyhgLXYtJHthcHB9IGNvbW1hbmQgLSAke2NvbW1hbmR9YCkgXG4gICAgICBjb25zb2xlLmxvZyhgLXYtJHthcHB9IHBhcm1zIC0gJHtwYXJtc31gKSBcbiAgICAgIGNvbnNvbGUubG9nKGAtdi0ke2FwcH0gb3B0aW9ucyAtICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCkgXG4gICAgfVxuICAgIGxldCBjaGlsZCA9IGNyb3NzU3Bhd24oY29tbWFuZCwgcGFybXMsIG9wdGlvbnMpXG4gICAgY2hpbGQub24oJ2Nsb3NlJywgKGNvZGUsIHNpZ25hbCkgPT4ge1xuICAgICAgaWYoY29kZSA9PT0gMCkgeyByZXNvbHZlKDApIH1cbiAgICAgIGVsc2UgeyBjb21waWxhdGlvbi5lcnJvcnMucHVzaCggbmV3IEVycm9yKGNtZEVycm9ycy5qb2luKFwiXCIpKSApOyByZWplY3QoMCkgfVxuICAgIH0pXG4gICAgY2hpbGQub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7IHJlamVjdChlcnJvcikgfSlcbiAgICBjaGlsZC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgdmFyIHN0ciA9IGRhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCBcIiBcIikudHJpbSgpXG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL1dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgICAgICByZXNvbHZlKDApXG4gICAgICB9XG4gICAgICBpZih2ZXJib3NlID09ICd5ZXMnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAtdi0ke2FwcH0ke3N0cn1gKSBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoc3Vic3RyaW5ncy5zb21lKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGRhdGEuaW5kZXhPZih2KSA+PSAwOyB9KSkgeyBcbiAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltJTkZdXCIsIFwiXCIpXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbTE9HXVwiLCBcIlwiKVxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHByb2Nlc3MuY3dkKCksICcnKVxuICAgICAgICAgIGlmIChzdHIuaW5jbHVkZXMoXCJbRVJSXVwiKSkge1xuICAgICAgICAgICAgY21kRXJyb3JzLnB1c2goYXBwICsgc3RyLnJlcGxhY2UoL15cXFtFUlJcXF0gL2dpLCAnJykpO1xuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoXCJbRVJSXVwiLCBgJHtjaGFsay5yZWQoXCJbRVJSXVwiKX1gKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHthcHB9JHtzdHJ9YCkgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGNoaWxkLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgIHZhciBzdHJKYXZhT3B0cyA9IFwiUGlja2VkIHVwIF9KQVZBX09QVElPTlNcIjtcbiAgICAgIHZhciBpbmNsdWRlcyA9IHN0ci5pbmNsdWRlcyhzdHJKYXZhT3B0cylcbiAgICAgIGlmICghaW5jbHVkZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7YXBwfSAke2NoYWxrLnJlZChcIltFUlJdXCIpfSAke3N0cn1gKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG4iXX0=