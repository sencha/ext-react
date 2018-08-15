//import { fork } from 'child_process';
const fork = require('child_process').fork
const exec = require('child_process').exec


var output = '/'
//execFile('sencha', ['ant', 'watch'], { cwd: output, silent: false })

watching = fork('/Users/marcgusmano/bin/Sencha/sencha', ['ant', 'watch'], { cwd: output, silent: true })
watching.stderr.pipe(process.stderr);
watching.stdout.pipe(process.stdout);
watching.stdout.on('data', data => {
  if (data && data.toString().match(/Waiting for changes\.\.\./)) {
    //onBuildDone()
  }
})
//watching.on('exit', onBuildDone)





// fork('sencha', function(error, stdout, stderr) {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
