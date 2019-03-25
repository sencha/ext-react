#! /usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
require('./XTemplate/js')

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

upgrade()

function findIt(framework, packageJson, o) {
  var v = ''
  var key = ''
  if (framework == 'extjs') {
    key = '@sencha/ext-webpack-plugin'
  }
  else {
    key = '@sencha/ext-' + framework + '-webpack-plugin'
  }
  var inDep = packageJson.old.dependencies.hasOwnProperty(key) 
  if (inDep) {
    v = packageJson.old.dependencies[key].slice(-5)
  }
  var inDevDep = packageJson.old.devDependencies.hasOwnProperty(key) 
  if (inDevDep) {
    v = packageJson.old.devDependencies[key].slice(-5)
  }
  if (v != '') { o.foundFramework = framework; o.foundVersion = v; }
}


function upgrade() {
  var packageJson = {}
  var webpackConfigJs = {}

  packageJson.name = 'package.json'
  webpackConfigJs.name = 'webpack.config.js'

  var rootDir = path.resolve(process.cwd())
  var backupDir = path.resolve(rootDir, 'extBackup')
  var upgradeDir = path.resolve(__dirname, 'upgradeTemplates')

  packageJson.root = path.join(rootDir, packageJson.name)
  packageJson.backup = path.join(backupDir, packageJson.name)


  webpackConfigJs.root = path.join(rootDir, webpackConfigJs.name)
  webpackConfigJs.backup = path.join(backupDir, webpackConfigJs.name)

  if (!fs.existsSync(upgradeDir)){
    console.log(`${boldRed('Error: ' + upgradeDir.replace(process.cwd(), '') + ' does not exist')}`)
    return 'end'
  }

  if (!fs.existsSync(packageJson.root)){
    console.log(`${boldRed('Error: ' + packageJson.root.replace(process.cwd(), '') + ' does not exist')}`)
    return 'end'
  }

  if (fs.existsSync(backupDir)){
    console.log(`${boldRed('Error: backup folder ' + backupDir.replace(process.cwd(), '') + ' exists')}`)
    return
  }

  packageJson.old = JSON.parse(fs.readFileSync(packageJson.root, {encoding: 'utf8'}))
  var o = {
    foundFramework: '',
    foundVersion: ''
  }
  findIt('extjs', packageJson, o)
  findIt('react', packageJson, o)
  findIt('angular', packageJson, o)
  findIt('components', packageJson, o)

  console.log('found ' + o.foundFramework + ' ' + o.foundVersion)
 
  var frameworkTemplateFolder = path.join(upgradeDir, o.foundFramework)
  packageJson.new = JSON.parse(fs.readFileSync(path.join(frameworkTemplateFolder, 'package.json'), {encoding: 'utf8'}))
  packageJson.upgrade = path.join(frameworkTemplateFolder, packageJson.name)
  webpackConfigJs.upgrade = path.join(frameworkTemplateFolder, webpackConfigJs.name)

  fs.mkdirSync(backupDir)
  console.log(`${boldGreen('Created ' + backupDir.replace(process.cwd(), ''))}`)

  fs.copySync(packageJson.root, packageJson.backup)
  console.log(`${boldGreen('Copied ' + packageJson.root.replace(process.cwd(), '') + ' to ' +  packageJson.backup.replace(process.cwd(), ''))}`)

  packageJson.old.scripts = packageJson.new.scripts
  packageJson.old.devDependencies = packageJson.new.devDependencies
  packageJson.old.dependencies = packageJson.new.dependencies
  delete packageJson.old.extDefults
//  delete json[key];
  fs.writeFileSync(packageJson.root, JSON.stringify(packageJson.old, null, 2));
  console.log(`${boldGreen('Updated ' + packageJson.root.replace(process.cwd(), ''))}`)

  fs.copySync(webpackConfigJs.root, webpackConfigJs.backup)
  console.log(`${boldGreen('Copied ' + webpackConfigJs.root.replace(process.cwd(), '') + ' to ' +  webpackConfigJs.backup.replace(process.cwd(), ''))}`)

  var values = {}
  switch (o.foundFramework) {
    case 'extjs':
      values = {
        framework: 'extjs',
        contextFolder: './',
        entryFile: './app.js',
        outputFolder: './',
        rules: `[
          { test: /.(js|jsx)$/, exclude: /node_modules/ }
        ]`,
        resolve:`{
        }`
      }
      break;
    case 'react':
      values = {
        framework: 'react',
        contextFolder: './src',
        entryFile: './index.js',
        outputFolder: 'build',
        rules: `[
          { test: /\.ext-reactrc$/, use: 'raw-loader' },
          { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
          { test: /\.(html)$/,use: { loader: 'html-loader' } },
          {
            test: /\.(css|scss)$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'sass-loader' }
            ]
          }
        ]`,
        resolve:`{
          alias: {
            'react-dom': '@hot-loader/react-dom'
          }
        }`
      }
      break;
    case 'angular':
      values = {
        framework: 'angular',
        contextFolder: './src',
        entryFile: './main.ts',
        outputFolder: 'build',
        rules: `[
          { test: /\.ext-reactrc$/, use: 'raw-loader' },
          { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
          { test: /\.(html)$/,use: { loader: 'html-loader' } },
          {
            test: /\.(css|scss)$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'sass-loader' }
            ]
          }
        ]`,
        resolve:`{
          extensions: ['.ts', '.js', '.html']
        }`
      }
      break;
    case 'components':
      break;
  }

  var file = path.join(frameworkTemplateFolder, 'webpack.config.js.tpl.default') 
  var content = fs.readFileSync(file).toString()
  var tpl = new Ext.XTemplate(content)
  var t = tpl.apply(values)
  tpl = null
  fs.writeFileSync(webpackConfigJs.root, t);
  console.log(`${boldGreen('Updated ' + webpackConfigJs.root.replace(process.cwd(), ''))}`)

  var babelNew = path.join(frameworkTemplateFolder, '.babelrc')
  var babelOld = path.join(rootDir, '.babelrc')
  fs.copySync(babelNew, babelOld)
  console.log(`${boldGreen('Copied ' + babelNew.replace(process.cwd(), '') + ' to ' +  babelOld.replace(process.cwd(), ''))}`)

  console.log('upgrade completed')
  return 'end'
}