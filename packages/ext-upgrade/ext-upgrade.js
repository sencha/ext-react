#! /usr/bin/env node
const path = require('path')
const fs = require('fs-extra')

function boldGreen (s) {
  var boldgreencolor = `\x1b[32m\x1b[1m`
  var endMarker = `\x1b[0m`
  return (`${boldgreencolor}${s}${endMarker}`)
}
function boldRed (s) {
  var boldredcolor = `\x1b[31m\x1b[1m`
  var endMarker = `\x1b[0m`
  return (`${boldredcolor}${s}${endMarker}`)
}
function getPrefix () {
  var prefix
  if (require('os').platform() == 'darwin') {
    prefix = `ℹ ｢ext｣:`
  }
  else {
    prefix = `i [ext]:`
  }
  return prefix
}

//var app =(`${boldGreen(getPrefix())} ext-upgrade:`)



// var version = ''
// var config = {}
// var cmdLine = {}


upgrade()

function upgrade() {
  // if (process.argv[2] != 'upgrade') {
  //   return 'continue';
  // }
  var packageJson = {}
  var webpackConfigJs = {}

  packageJson.name = 'package.json'
  webpackConfigJs.name = 'webpack.config.js'

  var rootDir = path.resolve(process.cwd())
  var backupDir = path.resolve(rootDir, 'extBackup')
  var upgradeDir = path.resolve(__dirname, 'extUpgrade')

  packageJson.root = path.join(rootDir, packageJson.name)
  packageJson.backup = path.join(backupDir, packageJson.name)
  packageJson.upgrade = path.join(upgradeDir, packageJson.name)

  if (!fs.existsSync(upgradeDir)){
    console.log(`${boldRed('Error: ' + upgradeDir + ' does not exist')}`)
    return 'end'
  }

  if (!fs.existsSync(packageJson.root)){
    console.log(`${boldRed('Error: ' + packageJson.root + ' does not exist')}`)
    return 'end'
  }

  packageJson.old = JSON.parse(fs.readFileSync(packageJson.root, {encoding: 'utf8'}))
  packageJson.new = JSON.parse(fs.readFileSync(packageJson.upgrade, {encoding: 'utf8'}))

  console.log(packageJson.old.name)
  return


  if (fs.existsSync(backupDir)){
    console.log(`${boldRed('Error: backup folder ' + backupDir + ' exists')}`)
    return 'end'
  }

  console.log(rootDir)
  console.log(backupDir)
  console.log(upgradeDir)


  fs.mkdirSync(backupDir)
  console.log(`${boldGreen('Created ' + backupDir)}`)
  fs.copySync(packageJson.root, packageJson.backup)
  console.log(`${boldGreen('Copied ' +packageJson.root + ' to ' +  packageJson.backup)}`)
  packageJson.old.scripts = packageJson.new.scripts
  packageJson.old.devDependencies = packageJson.new.devDependencies
  packageJson.old.dependencies = packageJson.old.dependencies
  packageJson.old.extDefults = null
  fs.writeFileSync(packageJson.root, JSON.stringify(packageJson.old, null, 2));

  console.log('upgrade completed')
  return 'end'
}
