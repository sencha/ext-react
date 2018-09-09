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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGVjdXRlQXN5bmMuanMiXSwibmFtZXMiOlsiY2hhbGsiLCJyZXF1aXJlIiwiY3Jvc3NTcGF3biIsInByZWZpeCIsInBsYXRmb3JtIiwiYXBwIiwiZ3JlZW4iLCJERUZBVUxUX1NVQlNUUlMiLCJleGVjdXRlQXN5bmMiLCJjb21tYW5kIiwicGFybXMiLCJvcHRpb25zIiwiY29tcGlsYXRpb24iLCJjbWRFcnJvcnMiLCJ2ZXJib3NlIiwic3Vic3RyaW5ncyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hpbGQiLCJvbiIsImNvZGUiLCJzaWduYWwiLCJlcnJvcnMiLCJwdXNoIiwiRXJyb3IiLCJqb2luIiwiZXJyb3IiLCJzdGRvdXQiLCJkYXRhIiwic3RyIiwidG9TdHJpbmciLCJyZXBsYWNlIiwidHJpbSIsIm1hdGNoIiwiY29uc29sZSIsImxvZyIsInNvbWUiLCJ2IiwiaW5kZXhPZiIsInByb2Nlc3MiLCJjd2QiLCJpbmNsdWRlcyIsInJlZCIsInN0ZGVyciIsInN0ckphdmFPcHRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLElBQUlBLEtBQUssR0FBR0MsT0FBTyxDQUFDLE9BQUQsQ0FBbkI7O0FBQ0EsTUFBTUMsVUFBVSxHQUFHRCxPQUFPLENBQUMsYUFBRCxDQUExQjs7QUFDQSxJQUFJRSxNQUFNLEdBQUksRUFBZDs7QUFBZ0IsSUFBSUYsT0FBTyxDQUFDLElBQUQsQ0FBUCxDQUFjRyxRQUFkLE1BQTRCLFFBQWhDLEVBQTBDO0FBQUNELEVBQUFBLE1BQU0sR0FBSSxVQUFWO0FBQW9CLENBQS9ELE1BQXFFO0FBQUNBLEVBQUFBLE1BQU0sR0FBSSxVQUFWO0FBQW9COztBQUMxRyxNQUFNRSxHQUFHLEdBQUksR0FBRUwsS0FBSyxDQUFDTSxLQUFOLENBQVlILE1BQVosQ0FBb0IsYUFBbkM7QUFDQSxNQUFNSSxlQUFlLEdBQUcsQ0FBQyxlQUFELEVBQWtCLDhCQUFsQixFQUFrRCxPQUFsRCxFQUEyRCxPQUEzRCxFQUFv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LEdBQUksR0FBRXlCLEdBQUksRUFBekI7QUFDRDtBQUNGO0FBQ0YsYUFwQkQ7QUFxQkFYLFlBQUFBLEtBQUssQ0FBQ3lCLE1BQU4sQ0FBYXhCLEVBQWIsQ0FBZ0IsTUFBaEIsRUFBeUJTLElBQUQsSUFBVTtBQUNoQyxrQkFBSUMsR0FBRyxHQUFHRCxJQUFJLENBQUNFLFFBQUwsR0FBZ0JDLE9BQWhCLENBQXdCLFdBQXhCLEVBQXFDLEdBQXJDLEVBQTBDQyxJQUExQyxFQUFWO0FBQ0Esa0JBQUlZLFdBQVcsR0FBRyx5QkFBbEI7QUFDQSxrQkFBSUgsUUFBUSxHQUFHWixHQUFHLENBQUNZLFFBQUosQ0FBYUcsV0FBYixDQUFmOztBQUNBLGtCQUFJLENBQUNILFFBQUwsRUFBZTtBQUNiUCxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsR0FBRS9CLEdBQUksSUFBR0wsS0FBSyxDQUFDMkMsR0FBTixDQUFVLE9BQVYsQ0FBbUIsSUFBR2IsR0FBSSxFQUFoRDtBQUNEO0FBQ0YsYUFQRDtBQVFELFdBcENLLENBREQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXG5jb25zdCBjcm9zc1NwYXduID0gcmVxdWlyZSgnY3Jvc3Mtc3Bhd24nKVxudmFyIHByZWZpeCA9IGBgO2lmIChyZXF1aXJlKCdvcycpLnBsYXRmb3JtKCkgPT0gJ2RhcndpbicpIHtwcmVmaXggPSBg4oS5IO+9omV4dO+9ozpgfSBlbHNlIHtwcmVmaXggPSBgaSBbZXh0XTpgfVxuY29uc3QgYXBwID0gYCR7Y2hhbGsuZ3JlZW4ocHJlZml4KX0gZXh0LWJ1aWxkOmBcbmNvbnN0IERFRkFVTFRfU1VCU1RSUyA9IFsnW0lORl0gTG9hZGluZycsICdbTE9HXSBGYXNoaW9uIGJ1aWxkIGNvbXBsZXRlJywgJ1tFUlJdJywgJ1tXUk5dJywgJ1tJTkZdIFByb2Nlc3NpbmcnLCBcIltJTkZdIFNlcnZlclwiLCBcIltJTkZdIFdyaXRpbmdcIiwgXCJbSU5GXSBMb2FkaW5nIEJ1aWxkXCIsIFwiW0lORl0gV2FpdGluZ1wiLCBcIltMT0ddIEZhc2hpb24gd2FpdGluZ1wiXTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVBc3luYyAoY29tbWFuZCwgcGFybXMsIG9wdGlvbnMsIGNvbXBpbGF0aW9uLCBjbWRFcnJvcnMsIHZlcmJvc2UgPSAnbm8nLCBzdWJzdHJpbmdzID0gREVGQVVMVF9TVUJTVFJTICkge1xuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IGNoaWxkID0gY3Jvc3NTcGF3bihjb21tYW5kLCBwYXJtcywgb3B0aW9ucylcbiAgICBjaGlsZC5vbignY2xvc2UnLCAoY29kZSwgc2lnbmFsKSA9PiB7XG4gICAgICBpZihjb2RlID09PSAwKSB7IHJlc29sdmUoMCkgfVxuICAgICAgZWxzZSB7IGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCBuZXcgRXJyb3IoY21kRXJyb3JzLmpvaW4oXCJcIikpICk7IHJlamVjdCgwKSB9XG4gICAgfSlcbiAgICBjaGlsZC5vbignZXJyb3InLCAoZXJyb3IpID0+IHsgcmVqZWN0KGVycm9yKSB9KVxuICAgIGNoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICB2YXIgc3RyID0gZGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csIFwiIFwiKS50cmltKClcbiAgICAgIGlmIChkYXRhICYmIGRhdGEudG9TdHJpbmcoKS5tYXRjaCgvV2FpdGluZyBmb3IgY2hhbmdlc1xcLlxcLlxcLi8pKSB7XG4gICAgICAgIHJlc29sdmUoMClcbiAgICAgIH1cbiAgICAgIGlmKHZlcmJvc2UgPT0gJ3llcycpIHtcbiAgICAgICAgY29uc29sZS5sb2coYC12LSR7YXBwfSR7c3RyfWApIFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChzdWJzdHJpbmdzLnNvbWUoZnVuY3Rpb24odikgeyByZXR1cm4gZGF0YS5pbmRleE9mKHYpID49IDA7IH0pKSB7IFxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKFwiW0lORl1cIiwgXCJcIilcbiAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltMT0ddXCIsIFwiXCIpXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UocHJvY2Vzcy5jd2QoKSwgJycpXG4gICAgICAgICAgaWYgKHN0ci5pbmNsdWRlcyhcIltFUlJdXCIpKSB7XG4gICAgICAgICAgICBjbWRFcnJvcnMucHVzaChhcHAgKyBzdHIucmVwbGFjZSgvXlxcW0VSUlxcXSAvZ2ksICcnKSk7XG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShcIltFUlJdXCIsIGAke2NoYWxrLnJlZChcIltFUlJdXCIpfWApXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2FwcH0ke3N0cn1gKSBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgY2hpbGQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgIHZhciBzdHIgPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgXCIgXCIpLnRyaW0oKVxuICAgICAgdmFyIHN0ckphdmFPcHRzID0gXCJQaWNrZWQgdXAgX0pBVkFfT1BUSU9OU1wiO1xuICAgICAgdmFyIGluY2x1ZGVzID0gc3RyLmluY2x1ZGVzKHN0ckphdmFPcHRzKVxuICAgICAgaWYgKCFpbmNsdWRlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHthcHB9ICR7Y2hhbGsucmVkKFwiW0VSUl1cIil9ICR7c3RyfWApXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cbiJdfQ==