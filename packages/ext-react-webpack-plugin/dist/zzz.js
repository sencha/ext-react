"use strict";

//import { fork } from 'child_process';
const fork = require('child_process').fork;

const exec = require('child_process').exec;

var output = '/'; //execFile('sencha', ['ant', 'watch'], { cwd: output, silent: false })

watching = fork('/Users/marcgusmano/bin/Sencha/sencha', ['ant', 'watch'], {
  cwd: output,
  silent: true
});
watching.stderr.pipe(process.stderr);
watching.stdout.pipe(process.stdout);
watching.stdout.on('data', data => {
  if (data && data.toString().match(/Waiting for changes\.\.\./)) {//onBuildDone()
  }
}); //watching.on('exit', onBuildDone)
// fork('sencha', function(error, stdout, stderr) {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy96enouanMiXSwibmFtZXMiOlsiZm9yayIsInJlcXVpcmUiLCJleGVjIiwib3V0cHV0Iiwid2F0Y2hpbmciLCJjd2QiLCJzaWxlbnQiLCJzdGRlcnIiLCJwaXBlIiwicHJvY2VzcyIsInN0ZG91dCIsIm9uIiwiZGF0YSIsInRvU3RyaW5nIiwibWF0Y2giXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxNQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxlQUFELENBQVAsQ0FBeUJELElBQXRDOztBQUNBLE1BQU1FLElBQUksR0FBR0QsT0FBTyxDQUFDLGVBQUQsQ0FBUCxDQUF5QkMsSUFBdEM7O0FBR0EsSUFBSUMsTUFBTSxHQUFHLEdBQWIsQyxDQUNBOztBQUVBQyxRQUFRLEdBQUdKLElBQUksQ0FBQyxzQ0FBRCxFQUF5QyxDQUFDLEtBQUQsRUFBUSxPQUFSLENBQXpDLEVBQTJEO0FBQUVLLEVBQUFBLEdBQUcsRUFBRUYsTUFBUDtBQUFlRyxFQUFBQSxNQUFNLEVBQUU7QUFBdkIsQ0FBM0QsQ0FBZjtBQUNBRixRQUFRLENBQUNHLE1BQVQsQ0FBZ0JDLElBQWhCLENBQXFCQyxPQUFPLENBQUNGLE1BQTdCO0FBQ0FILFFBQVEsQ0FBQ00sTUFBVCxDQUFnQkYsSUFBaEIsQ0FBcUJDLE9BQU8sQ0FBQ0MsTUFBN0I7QUFDQU4sUUFBUSxDQUFDTSxNQUFULENBQWdCQyxFQUFoQixDQUFtQixNQUFuQixFQUEyQkMsSUFBSSxJQUFJO0FBQ2pDLE1BQUlBLElBQUksSUFBSUEsSUFBSSxDQUFDQyxRQUFMLEdBQWdCQyxLQUFoQixDQUFzQiwyQkFBdEIsQ0FBWixFQUFnRSxDQUM5RDtBQUNEO0FBQ0YsQ0FKRCxFLENBS0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbXBvcnQgeyBmb3JrIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5jb25zdCBmb3JrID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmZvcmtcbmNvbnN0IGV4ZWMgPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJykuZXhlY1xuXG5cbnZhciBvdXRwdXQgPSAnLydcbi8vZXhlY0ZpbGUoJ3NlbmNoYScsIFsnYW50JywgJ3dhdGNoJ10sIHsgY3dkOiBvdXRwdXQsIHNpbGVudDogZmFsc2UgfSlcblxud2F0Y2hpbmcgPSBmb3JrKCcvVXNlcnMvbWFyY2d1c21hbm8vYmluL1NlbmNoYS9zZW5jaGEnLCBbJ2FudCcsICd3YXRjaCddLCB7IGN3ZDogb3V0cHV0LCBzaWxlbnQ6IHRydWUgfSlcbndhdGNoaW5nLnN0ZGVyci5waXBlKHByb2Nlc3Muc3RkZXJyKTtcbndhdGNoaW5nLnN0ZG91dC5waXBlKHByb2Nlc3Muc3Rkb3V0KTtcbndhdGNoaW5nLnN0ZG91dC5vbignZGF0YScsIGRhdGEgPT4ge1xuICBpZiAoZGF0YSAmJiBkYXRhLnRvU3RyaW5nKCkubWF0Y2goL1dhaXRpbmcgZm9yIGNoYW5nZXNcXC5cXC5cXC4vKSkge1xuICAgIC8vb25CdWlsZERvbmUoKVxuICB9XG59KVxuLy93YXRjaGluZy5vbignZXhpdCcsIG9uQnVpbGREb25lKVxuXG5cblxuXG5cbi8vIGZvcmsoJ3NlbmNoYScsIGZ1bmN0aW9uKGVycm9yLCBzdGRvdXQsIHN0ZGVycikge1xuLy8gICBpZiAoZXJyb3IpIHtcbi8vICAgICBjb25zb2xlLmVycm9yKGBleGVjIGVycm9yOiAke2Vycm9yfWApO1xuLy8gICAgIHJldHVybjtcbi8vICAgfVxuLy8gICBjb25zb2xlLmxvZyhgc3Rkb3V0OiAke3N0ZG91dH1gKTtcbi8vICAgY29uc29sZS5sb2coYHN0ZGVycjogJHtzdGRlcnJ9YCk7XG4vLyB9KTtcbiJdfQ==