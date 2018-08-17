#! /usr/bin/env node
const npmScope = '@sencha'
const path = require('path');
const fs = require('fs-extra');

const { kebabCase, pick } = require('lodash')
const util = require('./util.js')
const appUpgrade = require('./appUpgrade.js')
require('./XTemplate/js')
const commandLineArgs = require('command-line-args')
var List = require('prompt-list')
var Input = require('prompt-input')
var Confirm = require('prompt-confirm')
const glob = require('glob')

const LANGUAGE = {
  TYPESCRIPT: 'TypeScript',
  JAVASCRIPT: 'JavaScript'
}

const CODE = {
  EXAMPLE: 'Include some example code', 
  BARE_BONES: 'Generate an empty app'
}

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

var app =(`${boldGreen(getPrefix())} ext-react-gen:`)

var answers = {
  'seeDefaults': null,
  'useDefaults': null,
  'appName': null,
  'classic': null,
  'modern': null,
  'universal': null,
  'classicTheme': null,
  'modernTheme': null,
  'templateType': null,
  'template': null,
  'templateFolderName': null,
  'packageName': null,
  'version': null,
  'description': null,
  'repositoryURL': null,
  'keywords': null,
  'authorName': null,
  'license': null,
  'bugsURL': null,
  'homepageURL': null,
  'createNow': null,
}

const optionDefinitions = [
  { name: 'command', defaultOption: true },
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'interactive', alias: 'i', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'defaults', alias: 'd', type: Boolean },
  { name: 'auto', alias: 'a', type: Boolean },
  { name: 'name', alias: 'n', type: String },
  { name: 'template', alias: 't', type: String },
  { name: 'moderntheme', alias: 'm', type: String },
  { name: 'classictheme', alias: 'c', type: String },
]

var version = ''
var config = {}
var cmdLine = {}
stepStart()

function stepStart() {
  var nodeDir = path.resolve(__dirname)
  var pkg = (fs.existsSync(nodeDir + '/package.json') && JSON.parse(fs.readFileSync(nodeDir + '/package.json', 'utf-8')) || {});
  version = pkg.version
  var data = fs.readFileSync(nodeDir + '/config.json')
  config = JSON.parse(data)

  console.log(boldGreen(`\ext-react-gen - Sencha ExtReact Code Generator v${version}`))
  console.log('')
  
  let mainDefinitions = [{ name: 'command', defaultOption: true }]
  const mainCommandArgs = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true })
//  console.log('')
//  console.log(`mainCommandArgs: ${JSON.stringify(mainCommandArgs)}`)
  var mainCommand = mainCommandArgs.command
//  console.log(`mainCommand: ${JSON.stringify(mainCommand)}`)
  switch(mainCommand) {
    case undefined:
      let argv = mainCommandArgs._unknown || []
      if (argv.length == 0 ){
//        console.log(`cmdLine: ${JSON.stringify(cmdLine)}`)
//        console.log(`\n\nShortHelp`)
        stepShortHelp()
        break;
      }
      if (argv.length > 1) {
        console.log(`${app} ${boldRed('[ERR]')} too many switches: ${argv.toString()}`)
      }
      else {
        cmdLine = commandLineArgs(optionDefinitions, { argv: argv, stopAtFirstUnknown: true })
//        console.log(`cmdLine: ${JSON.stringify(cmdLine)}`)
//        console.log(`\n\nstep00`)
        step00()
      }
      break;
    case 'app':
      cmdLine.command = mainCommand
      let appArgs = mainCommandArgs._unknown || []
//      console.log(`appArgs: ${JSON.stringify(appArgs)}`)
      let appDefinitions = [{ name: 'appName', defaultOption: true }]
      const appCommandArgs = commandLineArgs(appDefinitions, { argv: appArgs, stopAtFirstUnknown: true })
//      console.log(`appCommandArgs: ${JSON.stringify(appCommandArgs)}`)
      var appName = appCommandArgs.appName
//      console.log(`appName: ${JSON.stringify(appName)}`)
      if (appName != undefined) {
        cmdLine.name = appName
      }
      let appSubArgs = appCommandArgs._unknown || []
//      console.log(`appSubArgs: ${JSON.stringify(appSubArgs)}`)
      if (appSubArgs.length == 0) {
//        console.log(`cmdLine: ${JSON.stringify(cmdLine)}`)
//        console.log(`\n\nstep00`)
        step00()
      }
      else {
        var command = cmdLine.command
        var name = ''
        if (cmdLine.name != undefined) {
          name = cmdLine.name
        }
        try{
          cmdLine = commandLineArgs(optionDefinitions, { argv: appSubArgs, stopAtFirstUnknown: false })
        }
        catch (e) {
          console.log(`${app} ${boldRed('[ERR]')} ${JSON.stringify(e)}`)
          return
        }
        cmdLine.command = command
        if (name != '') {
          cmdLine.name = name
        }
//        console.log(`cmdLine: ${JSON.stringify(cmdLine)}`)
//        console.log(`\n\nstep00`)
        step00()
      }
      break;
    case 'upgrade':
        upgrade();
        break;
    default:
      console.log(`${app} ${boldRed('[ERR]')} command not available: '${mainCommand}'`)
  }
}

async function upgrade()
{
 console.log('Upgrade started'); 
  await appUpgrade.upgradeApp();
  console.log('Upgrade done . Please run npm install and then npm run all');
}

function step00() {
//  console.log('step00')
//  console.log(`cmdLine: ${JSON.stringify(cmdLine)}, length: ${Object.keys(cmdLine).length}, process.argv.length: ${process.argv.length}`)

  setDefaults()
  if (cmdLine.verbose == true) {
    process.env.EXTGEN_VERBOSE = 'true'
  }
  else {
    process.env.EXTGEN_VERBOSE = 'false'
  }
  if (cmdLine.help == true) {
    stepHelpGeneral() 
  }
  else if (cmdLine.command == undefined) {
    console.log(`${app} ${boldRed('[ERR]')} no command specified (app, view)`)
  }
  else if (cmdLine.command == 'app' && Object.keys(cmdLine).length == 1) {
    console.log(`${app} ${boldRed('[ERR]')} at least 1 parameter is needed`)
    return
  }
  else if (cmdLine.defaults == true) {
    displayDefaults()
  }
  else if (cmdLine.command != 'app') {
    console.log(`${app} ${boldRed('[ERR]')} unknown command '${cmdLine.command}'`)
  }
  else if (cmdLine.interactive == true && cmdLine.command == 'app') {
    step00a()
  }
  else if (process.argv.length == 2) {
    stepShortHelp()
  }

  else if (cmdLine.auto == true) {
    step99()
  }
  else if (cmdLine.name != undefined) {
    cmdLine.auto = true
    step99()
  }
  else {
    stepHelpGeneral()
  }
}

function step00a() {
  new Confirm({
    message: 
    `would you like to see the defaults for package.json?`,
    default: config.seeDefaults
  }).run().then(answer => {
    answers['seeDefaults'] = answer
    if(answers['seeDefaults'] == true) {
      displayDefaults()
      step01()
    }
    else {
      step01()
    }
  })
}

function step01() {
  new Confirm({
    message: 'Would you like to create a package.json file with defaults?',
    default: config.useDefaults
  }).run().then(answer => {
    answers['useDefaults'] = answer
    if(answers['useDefaults'] == true) {
      setDefaults()
      step02()
    }
    else {
      step02()
    }
  })
}

function step02() {
  new Input({
    message: 'What would you like to name your React app?',
    default:  config.appName
  }).run().then(answer => {
    answers['appName'] = answer
    answers['packageName'] = kebabCase(answers['appName'])
    step03a()
  })
}

function step03a() {
  new List({
    message: 'What theme would you like to use?',
    choices: ['material', 'triton', 'ios'],
    default: 'material'
  }).run().then(answer => {
    answers['baseTheme'] = answer
    step03b()
  })
}


function step03b() {
  new List({
    message: 'Do you want to include example code (layout, navigation, routing, etc...), or just generate an empty app?',
    choices:  [CODE.BARE_BONES, CODE.EXAMPLE],
    default: CODE.EXAMPLE
  }).run().then(answer => {
    answers['code'] = answer
    step03c()
  })
}


function step03() {
  new List({
    message: 'What type of Ext JS template do you want?',
    choices: ['make a selection from a list','type a folder name'],
    default: 'make a selection from a list'
  }).run().then(answer => {
    answers['templateType'] = answer
    if(answers['templateType'] == 'make a selection from a list') {
      step04()
    }
    else {
      step05()
    }
  })
}

function step04() {
  new List({
    message: 'What Ext JS template would you like to use?',
    choices: ['classicdesktop', 'moderndesktop', 'universalclassicmodern', 'universalmodern'],
    default: 'classicdesktop'
  }).run().then(answer => {
    answers['classic'] = false
    answers['modern'] = false
    answers['universal'] = false
    if (answer.includes("classic")) {
      answers['classic'] = true
    }
    if (answer.includes("modern")) {
      answers['modern'] = true
    }
    if (answer.includes("universal")) {
      answers['universal'] = true
    }
    answers['template'] = answer
    if(answers['useDefaults'] == true) {
      step99()
    }
    else {
      step06()
    }
  })
}

function step05() {
  new Input({
    message: 'What is the Template folder name?',
    default:  config.templateFolderName
  }).run().then(answer => { 
    answers['templateFolderName'] = answer
    if(answers['useDefaults'] == true) {
      step99()
    }
    else {
      step06()
    }
  })
}

function step06() {
  new Input({
    message: 'What would you like to name the npm Package?',
    default:  kebabCase(answers['appName'])
  }).run().then(answer => { 
    answers['packageName'] = answer
    step07()
  })
}

function step07() {
  new Input({
    message: 'What version is your Ext JS application?',
    default: config.version
  }).run().then(answer => { 
    answers['version'] = answer
    step08()
  })
}

function step08() {
  new Input({
    message: 'What is the description?',
    default: config.description
  }).run().then(answer => { 
    answers['description'] = answer
    step09()
  })
}

function step09() {
  new Input({
    message: 'What is the GIT repository URL?',
    default: config.repositoryURL
  }).run().then(answer => { 
    answers['repositoryURL'] = answer
    step10()
  })
}

function step10() {
  new Input({
    message: 'What are the npm keywords?',
    default: config.keywords
  }).run().then(answer => { 
    answers['keywords'] = answer
    step11()
  })
}

function step11() {
  new Input({
    message: `What is the Author's Name?`,
    default: config.authorName
  }).run().then(answer => { 
    answers['authorName'] = answer
    step12()
  })
}

function step12() {
  new Input({
    message: 'What type of License does this project need?',
    default: config.license
  }).run().then(answer => { 
    answers['license'] = answer
    step13()
  })
}

function step13() {
  new Input({
    message: 'What is the URL to submit bugs?',
    default: config.bugsURL
  }).run().then(answer => { 
    answers['bugsURL'] = answer
    step14()
  })
}

function step14() {
  new Input({
    message: 'What is the Home Page URL?',
    default: config.homepageURL
  }).run().then(answer => { 
    answers['homepageURL'] = answer
    step99()
  })
}

function step99() {

  displayDefaults()

  if (answers['template'] == null) {
    if (!fs.existsSync(answers['templateFolderName'])) {
      answers['template'] = 'folder'
      console.log('Error, Template folder does not exist - ' + answers['templateFolderName'])
      return
    }
  }

  if (cmdLine.auto == true) {
    stepCreate()
    return
  }

  var message
  if (cmdLine.defaults == true) {
    message = 'Generate the Ext JS npm project?'
    displayDefaults()
  }
  else {
    message = 'Would you like to generate the Ext JS npm project with above config now?'
  }

  new Confirm({
    message: message,
    default: config.createNow
  }).run().then(answer => {
    answers['createNow'] = answer
    if (answers['createNow'] == true) {
      stepCreate()
    }
    else {
      console.log(`\n${boldRed('Create has been cancelled')}\n`)
      return
    }
  })
}

async function stepCreate() {
  var nodeDir = path.resolve(__dirname)
  var currDir = process.cwd()
  var destDir = currDir + '/' + answers['packageName']
  var templatesDir = nodeDir + '/templates/'

  if (fs.existsSync(destDir)){
    console.log(`${boldRed('Error: folder ' + destDir + ' exists')}`)
    //fs.removeSync(destDir) //danger!  if you want to enable this, warn the user
    return
  }
  fs.mkdirSync(destDir)
  process.chdir(destDir)
  console.log(`${app} ${destDir} created`)
  var values = {
    npmScope: npmScope,
    classic: answers['classic'],
    modern: answers['modern'],
    universal: answers['universal'],
    classicTheme: answers['classicTheme'],
    modernTheme: answers['modernTheme'],
    appName: answers['appName'],
    packageName: answers['packageName'],
    version: answers['version'],
    repositoryURL: answers['repositoryURL'],
    keywords: answers['keywords'],
    authorName: answers['authorName'],
    license: answers['license'],
    bugsURL: answers['bugsURL'],
    homepageURL: answers['homepageURL'],
    description: answers['description'],
  }
  // var file = nodeDir + '/templates/package.json.tpl.default'
  // var content = fs.readFileSync(file).toString()
  // var tpl = new Ext.XTemplate(content)
  // var t = tpl.apply(values)
  // tpl = null
  // fs.writeFileSync(destDir + '/package.json', t);
  // console.log(`${app} package.json created for ${answers['packageName']}`)

  const boilerplate = path.dirname(require.resolve('@sencha/ext-react-boilerplate'))
  console.log(boilerplate)
  //console.log(answers['code'])
  answers['baseTheme'] = 'ios'
  //answers['packageName'] = 'ios'


  // copy in files from boilerplate
  glob.sync('**/*', { cwd: boilerplate, ignore: ['build/**', 'node_modules/**', 'index.js'], dot: true })
      .forEach(file => new Promise((resolve, reject) => {
          if (answers['code'] === CODE.BARE_BONES && file.match(/src/) && !file.match(/index/)) {
              return;
          }
          if (answers['code'] === CODE.BARE_BONES && file.match(/__tests__/)) {
              return;
          }
          fs.copySync(path.join(boilerplate, file), file)
      }))

      // set base theme

      answers['baseTheme'] = `theme-${answers['baseTheme']}`;
 

        const theme = path.join('ext-react', 'packages', 'custom-ext-react-theme', 'package.json');
        const themePackageJson = fs.readFileSync(theme, 'utf8').replace('theme-material', answers['baseTheme'])
        fs.writeFileSync(theme, themePackageJson, 'utf8');

        // update package.json

        const packageInfo = {};

        Object.assign(packageInfo, {
            name: answers['packageName']
        });
        if (answers['version']) packageInfo.version = answers['version']
        if (answers['description']) packageInfo.description = answers['description']
        if (answers['gitRepository']) {
            packageInfo.repository = {
                type: 'git',
                url: answers['gitRepository']
            }
        }
        if (answers['keywords']) packageInfo.keywords = answers['keywords']
        if (answers['author']) packageInfo.author = answers['author']
        if (answers['license']) packageInfo.license = answers['license']

//        console.log(fs.readJsonSync('package.json'))

        Object.assign(packageInfo, pick(fs.readJsonSync('package.json'), 'main', 'scripts', 'dependencies', 'devDependencies', 'jest'));
        if (answers['baseTheme'] !== 'theme-material') {
            packageInfo.dependencies[`@sencha/ext-modern-${answers['baseTheme']}`] = packageInfo.dependencies['@sencha/ext-modern-theme-material'];
        }

        //fs.writeJSON('package.json', packageInfo, null, '  ');
        let data = JSON.stringify(packageInfo,null,2)
        fs.writeFileSync('package.json', data)  


        // update index.html

        const indexHtml = path.join('src', 'index.html');
        fs.writeFileSync(indexHtml, fs.readFileSync(indexHtml, 'utf8').replace('ExtReact Boilerplate', answers['appName']), 'utf8');
        //fs.writeFileSync(theme, themePackageJson, 'utf8');
        //const themePackageJson = fs.readFileSync(theme, 'utf8').replace('theme-material', this.baseTheme)


        // README.md

        // fs.copyTpl(
        //     this.templatePath(answers['language'] === LANGUAGE.TYPESCRIPT ? 'ts/README.md' : 'js/README.md'),
        //     this.destinationPath('README.md'),
        //     this
        // )


        fs.copyFileSync(
          path.join(templatesDir, answers['language'] === LANGUAGE.TYPESCRIPT ? 'ts/README.md' : 'js/README.md'),
          path.join(destDir, 'README.md')
      )

        // swap out minimal App.js if the user chose not to include examples

 

        if (answers['code'] === CODE.BARE_BONES) {
            // fs.copyTpl(
            //     this.templatePath(answers['language'] === LANGUAGE.TYPESCRIPT ? 'ts/App.minimal.tsx' : 'js/App.minimal.js'),
            //     this.destinationPath(answers['language'] === LANGUAGE.TYPESCRIPT ? 'src/App.tsx' : 'src/App.js'),
            //     this
            // )

            fs.copyTpl(
              path.join(templatesDir, answers['language'] === LANGUAGE.TYPESCRIPT ? 'ts/App.minimal.tsx' : 'js/App.minimal.js'),
              path.join(destDir, answers['language'] === LANGUAGE.TYPESCRIPT ? 'src/App.tsx' : 'src/App.js'),
              this
            )

            // if (answers['language'] === LANGUAGE.JAVASCRIPT) {
            //     fs.copyTpl(
            //         this.templatePath('js/App.test.js'),
            //         this.destinationPath('__tests__/App.test.js')
            //     )
            // }

            if (answers['language'] === LANGUAGE.JAVASCRIPT) {
              fs.copyTpl(
                path.join(e, 'js/App.test.js'),
                path.join(destDir, '__tests__/App.test.js')
              )
          }


        } else {
            // update Layout.js
            const layout = path.join('src', `Layout.${answers['language'] === LANGUAGE.TYPESCRIPT ? 'tsx' : 'js'}`);
            //fs.write(layout, fs.read(layout).replace('ExtReact Boilerplate', answers['appName']));

            fs.writeFileSync(layout, fs.readFileSync(layout, 'utf8').replace('ExtReact Boilerplate', answers['appName']), 'utf8');


        }


  // var file = nodeDir + '/templates/webpack.config.js.tpl.default'
  // var content = fs.readFileSync(file).toString()
  // var tpl = new Ext.XTemplate(content)
  // var t = tpl.apply(values)
  // tpl = null
  // fs.writeFileSync(destDir + '/webpack.config.js', t);
  // console.log(`${app} webpack.config.js created for ${answers['packageName']}`)



  try {
    const substrings = ['[ERR]', '[WRN]', '[INF] Processing', "[INF] Server", "[INF] Writing content", "[INF] Loading Build", "[INF] Waiting", "[LOG] Fashion waiting"];
    var command = `npm${/^win/.test(require('os').platform()) ? ".cmd" : ""}`
    var args = []
    if (process.env.EXTGEN_VERBOSE == 'true') {
      args = ['install']
    }
    else {
      if (require('os').platform() == 'win32') {
        //args = ['install','-s','>','NUL']
        args = ['install','-s']
      }
      else {
        //args = ['install','-s','>','/dev/null']
        args = ['install','-s']
      }
    }
    let options = {stdio: 'inherit', encoding: 'utf-8'}
    console.log(`${app} npm ${args.toString().replace(/,/g, " ")} started for ${answers['packageName']}`)
    await util.spawnPromise(command, args, options, substrings);
    console.log(`${app} npm ${args.toString().replace(/,/g, " ")} completed for ${answers['packageName']}`)
  } catch(err) {
    console.log(boldRed('Error in npm install: ' + err));
  }

  // var frameworkPath = path.join(destDir, 'node_modules', npmScope, 'ext', 'package.json');
  // var cmdPath = path.join(destDir, 'node_modules', npmScope, 'cmd', 'package.json');
  // var frameworkPkg = require(frameworkPath);
  // var cmdPkg = require(cmdPath);
  // var cmdVersion = cmdPkg.version_full
  // var frameworkVersion = frameworkPkg.sencha.version

  // var generateApp = require(`${npmScope}/ext-build-generate-app/generateApp.js`)
  // var options = { 
  //   parms: [ 'generate', 'app', answers['appName'], './' ],
  //   sdk: `node_modules/${npmScope}/ext`,
  //   template: answers['template'],
  //   classicTheme: answers['classicTheme'],
  //   modernTheme: answers['modernTheme'],
  //   templateFull: answers['templateFolderName'],
  //   cmdVersion: cmdVersion,
  //   frameworkVersion: frameworkVersion,
  //   force: false
  // }
  // new generateApp(options)


  console.log(`${app} Your Ext React project is ready`)
  console.log(boldGreen(`\ntype "cd ${answers['packageName']}" then "npm start" to run the development build and open your new application in a web browser\n`))
 }

 function setDefaults() {
  answers['language'] = LANGUAGE.JAVASCRIPT

  if (cmdLine.name != undefined) {
    answers['appName'] = cmdLine.name
    answers['packageName'] = kebabCase(answers['appName'])
    answers['description'] = `${answers['packageName']} description for Ext JS app ${answers['appName']}`
  }
  else {
    answers['appName'] = config.appName
    answers['packageName'] = config.packageName
    answers['description'] = config.description
  }
  if (cmdLine.template != undefined) {
    answers['template'] = cmdLine.template
    answers['templateType'] = "make a selection from a list"
  }
  else {
    answers['template'] = config.template
    answers['templateType'] = config.templateType
  }
  if (cmdLine.classictheme != undefined) {
    answers['classicTheme'] = cmdLine.classictheme
  }
  else {
    answers['classicTheme'] = config.classicTheme
  }
  if (cmdLine.moderntheme != undefined) {
    answers['modernTheme'] = cmdLine.moderntheme
  }
  else {
    answers['modernTheme'] = config.modernTheme
  }

  answers['code'] = 'Include some example code'
  answers['classic'] = false
  answers['modern'] = false
  if (answers['template'].includes("classic")) {
    answers['classic'] = true
  }
  if (answers['template'].includes("modern")) {
    answers['modern'] = true
  }

  answers['version'] = config.version
  answers['repositoryURL'] = config.repositoryURL
  answers['keywords'] = config.keywords
  answers['authorName'] = config.authorName
  answers['license'] = config.license
  answers['bugsURL'] = config.bugsURL
  answers['homepageURL'] = config.homepageURL
}

function displayDefaults() {
  //console.log(`For controlling ext-gen:`)
  //console.log(`seeDefaults:\t${config.seeDefaults}`)
  //console.log(`useDefaults:\t${config.useDefaults}`)
  //console.log(`createNow:\t${config.createNow}`)
  //console.log(`For template selection:`)
  //console.log(`templateType:\t${config.templateType}`)
  //console.log(`templateFolderName:\t${config.templateFolderName}`)
  //console.log(`classic:\t${answers['classic']}`)
  //console.log(`modern:\t\t${answers['modern']}`)

  console.log(boldGreen(`Defaults for Ext JS app:`))
  console.log(`appName:\t${answers['appName']}`)
  console.log(`template:\t${answers['template']}`)
  if(answers['classic'] == true) {
    console.log(`classicTheme:\t${answers['classicTheme']}`)
  }
  if(answers['modern'] == true) {
    console.log(`modernTheme:\t${answers['modernTheme']}`)
  }
  console.log('')
  console.log(boldGreen(`Defaults for package.json:`))
  console.log(`packageName:\t${answers['packageName']}`)
  console.log(`version:\t${answers['version']}`)
  console.log(`description:\t${answers['description']}`)
  console.log(`repositoryURL:\t${answers['repositoryURL']}`)
  console.log(`keywords:\t${answers['keywords']}`)
  console.log(`authorName:\t${answers['authorName']}`)
  console.log(`license:\t${answers['license']}`)
  console.log(`bugsURL:\t${answers['bugsURL']}`)
  console.log(`homepageURL:\t${answers['homepageURL']}`)
  console.log('')
}

function stepHelpGeneral() {
  stepHelpApp()
}

function stepHelpApp() {

  var message = `${boldGreen('Quick Start:')} ext-gen -a

ext-gen app (-h) (-d) (-i) (-t 'template') (-m 'moderntheme') (-c 'classictheme') (-n 'name') (-f 'folder')

-h --help          show help (no parameters also shows help)
-d --defaults      show defaults for package.json
-i --interactive   run in interactive mode (question prompts will display)
-t --template      name for Ext JS template used for generate
-c --classictheme  theme name for Ext JS classic toolkit
-m --moderntheme   theme name for Ext JS modern toolkit
-n --name          name for Ext JS generated app
-f --folder        folder name for Ext JS application (not implemented yet)
-v --verbose       verbose npm messages (for problems only)

${boldGreen('Examples:')} 
ext-gen app --template universalclassicmodern --classictheme theme-graphite --moderntheme theme-material --name CoolUniversalApp
ext-gen app--template classicdesktop --classictheme theme-graphite --name CoolDesktopApp 
ext-gen app --interactive
ext-gen app -a --classictheme theme-graphite -n ClassicApp
ext-gen app -a -t moderndesktop -n ModernApp

${boldGreen('Templates:')}
You can select from 4 Ext JS templates provided by Sencha ExtGen
  
${boldGreen('classicdesktop (default)')}
This template is the default template in ext-gen. It contains 1 profile, configured to use the classic toolkit of Ext JS for a desktop application
 
${boldGreen('moderndesktop')}
This template is similar to the classicdesktop template. It contains 1 profile, configured to use the modern toolkit of Ext JS for a desktop application 
   
${boldGreen('universalclassicmodern')}
This template contains 2 profiles, 1 for desktop (using the classic toolkit), and 1 for mobile (using the modern toolkit)
   
${boldGreen('universalmodern')}
This template contains 2 profiles, 1 for desktop and 1 for mobile. Both profiles use the modern toolkit.

${boldGreen('Theme Names:')}
${boldGreen('classic themes:')} theme-classic, theme-neptune, theme-neptune-touch, theme-crisp, theme-crisp-touch  theme-triton, theme-graphite
${boldGreen('modern themes:')}  theme-material, theme-ios, theme-neptune, theme-triton
`
  console.log(message)
}

function stepShortHelp() {
  var message = `${boldGreen('Quick Start:')} 
ext-react-gen app CoolExtReactApp
ext-react-gen app -i
 
${boldGreen('Examples:')} 
ext-react-gen app --language javascript --theme graphite --name CoolExtReactApp
ext-react-gen app -l javascript -t graphite -n CoolExtReactApp

Run ${boldGreen('ext-react-gen --help')} to see all options
`
  console.log(message)
}
