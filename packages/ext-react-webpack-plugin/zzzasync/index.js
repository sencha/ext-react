var chalk = require('chalk');
const crossSpawn = require('cross-spawn')

var command = 'sencha'
//var parms = ['ant', 'build']
var parms = ['which']

var output = '/users/marcgusmano/aaPlayground/appChart'
var options = { cwd: output, silent: true, stdio: 'pipe', encoding: 'utf-8'}
executeAsync(command, parms, options).then(function() {
  console.log('done')
  //cb()
}, function(reason){
  console.log('error: ' + reason.code + ' ' + reason.signal)
  //cb()
})

function executeAsync(command, parms, options) {
  return new Promise(async function(resolve, reject) {
    try { 
      await senchaCmdAsync(command, parms, options).then(function(){ resolve(0) },function(err){ reject(err) }) 
    } 
    catch(err) { reject({code: err}) }
  })
}

async function senchaCmdAsync (command, parms, options) {
  let child
  let promise = new Promise((resolve, reject) => {
    child = crossSpawn(command, parms, options)
    child.on('close', (code, signal) => {
      if(code === 0) { resolve({code, signal}) }
      else { reject({code, signal}) }
    })
    child.on('error', (error) => { reject(error) })
    child.stdout.on('data', (data) => {
      var str = data.toString().replace(/\r?\n|\r/g, " ").trim()
      if (str != '') { console.log(`zz-${str}`) }
    })
    child.stderr.on('data', (data) => {
      var str = data.toString().replace(/\r?\n|\r/g, " ").trim()
      if (str != '') { console.log(`ee-${str}`) }
    })
  })
  return promise
}