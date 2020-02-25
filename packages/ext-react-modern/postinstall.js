const fs = require("fs-extra");
var xtype
var xtypeFileName
var framework;
var toolkit;

function boldGreen (s) {
  var boldgreencolor = `\x1b[32m\x1b[1m`
  var endMarker = `\x1b[0m`
  return (`${boldgreencolor}${s}${endMarker}`)
}
function doXtype() {
  fs.copySync(`../ext-web-components-${xtype}/ext-runtime/${xtypeFileName}`,`../../../${copyFolder}ext-runtime/${xtypeFileName}`);
  console.log(`${prefix} ${xtypeFileName} copied to ./${copyFolder}ext-runtime`);
}

var packageNameThis = './package.json';
var packageThis = fs.readFileSync(packageNameThis, 'utf8');
const packageJsonThis = JSON.parse(packageThis);
var prefix =(`${boldGreen(packageJsonThis.name + ':')}`)
var dashCount = (packageJsonThis.name.match(/-/g) || []).length;

if (dashCount == 3) {
  var res = packageJsonThis.name.split('-');
  framework = res[1];
  toolkit = res[2];
  xtype = res[3];
  xtypeFileName = `ext.${xtype}.js`;
}
else {
  var res = packageJsonThis.name.split('-');
  framework = res[1];
  toolkit = res[2];
  xtype = '';
  xtypeFileName = ``;
}

var copyFolder = '';
switch(framework) {
  case 'react':
    copyFolder = 'public/';
    if (!fs.existsSync(`../../../${copyFolder}index.html`)) {
      console.log(`${prefix} ./${copyFolder}index.html does not exist, not creating ext-runtime folder`);
      return
    }
    break;
  case 'angular':
    copyFolder = '';
    if (!fs.existsSync('../../../angular.json')) {
      console.log(`${prefix} ./angular.json does not exist, not creating ext-runtime folder`);
      return
    }
    break;
  default:
    copyFolder = '';
}

if (fs.existsSync(`../../../${copyFolder}ext-runtime-${toolkit}`)) {
  console.log(`${prefix} ./${copyFolder}ext-runtime-${toolkit} exists`);
  return
}

const packageJsonApp = JSON.parse(fs.readFileSync(`../../../package.json`, 'utf8'));

if (packageJsonApp.dependencies != undefined) {
    var dependencies = packageJsonApp.dependencies['@sencha/ext-webpack-plugin'];
    if (dependencies != undefined) {
        console.log(`${prefix} @sencha/ext-webpack-plugin is defined, not creating ext-runtime folder`);
        return
    }
}

if (packageJsonApp.devDependencies != undefined) {
    var devDependencies = packageJsonApp.devDependencies['@sencha/ext-webpack-plugin'];
    if (devDependencies != undefined) {
        console.log(`${prefix} @sencha/ext-webpack-plugin is defined, not creating ext-runtime folder`);
        return
    }
}

if (fs.existsSync('../../../webpack.config.js')) {
    console.log(`${prefix} ./webpack.config.js exists, not creating ext-runtime folder`);
    return
}

try {
    var theme;
    if(packageJsonApp.extTheme != undefined) {
      var themes = [
        'crisp',
        'graphite',
        'material',
        'neptune',
        'triton'
      ];
      if(themes.includes(packageJsonApp.extTheme)) {
        theme = packageJsonApp.extTheme;
        console.log(`${prefix} "extTheme": ${theme} found in ./package.json`);
      }
      else {
        theme = 'material';
      }
    }
    else {
      theme = 'material';
    }
    var from = `../ext-web-components-${toolkit}/ext-runtime-${toolkit}`;
    fs.copySync(`${from}/`,`../../../${copyFolder}ext-runtime-${toolkit}/`);
    console.log(`${prefix} created ./${copyFolder}ext-runtime-${toolkit}/`);

    switch(framework) {
      case 'react':
        var indexHtml = fs.readFileSync(`../../../${copyFolder}index.html`, 'utf8');
        var position = indexHtml.indexOf('</head>');

        var b = ''
       if (toolkit == 'modern') {
          b =
          `
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/${toolkit}.engine.enterprise.js"></script>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/${theme}/${theme}-all.css" rel="stylesheet" type="text/css"></link>
      <!--
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/ios/ios-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/material/material-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/neptune/neptune-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/triton/triton-all.css" rel="stylesheet" type="text/css"></link>
      -->
          `
        }
        else {
          b =
          `
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/${toolkit}.engine.enterprise.js"></script>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/${theme}/${theme}-all.css" rel="stylesheet" type="text/css"></link>
      <!--
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/aria/aria-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/crisp/crisp-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/crisp-touch/crisp-touch-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/graphite/graphite-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/gray/gray-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/material/material-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/neptune/neptune-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/neptune-touch/neptune-touch-all.css" rel="stylesheet" type="text/css"></link>
      <link href="%PUBLIC_URL%/ext-runtime-${toolkit}/triton/triton-all.css" rel="stylesheet" type="text/css"></link>
      -->
          `
        }

        fs.copySync(`../../../${copyFolder}index.html`,`../../../${copyFolder}indexBack.html`);
        var indexHtmlNew = indexHtml.substring(0, position) + b + indexHtml.substring(position);
        fs.writeFileSync(`../../../${copyFolder}index.html`, indexHtmlNew);
        console.log(`${prefix} updated ./${copyFolder}index.html`);
        console.log(`${prefix} backup in ./${copyFolder}indexBack.html`);
        break;
      case 'angular':
        var angularName = `../../../angular.json`;
        var angular = fs.readFileSync(angularName, 'utf8');
        const angularJson = JSON.parse(angular);

        var scriptEngine = `ext-runtime-${toolkit}/${toolkit}.engine.enterprise.js`;
        var cssFile = `ext-runtime-${toolkit}/${theme}/${theme}-all.css`;
        var options = angularJson.projects[packageJsonApp.name].architect.build.options;
        angularJson.projects[packageJsonApp.name].architect.build.options.scripts.push(scriptEngine);
        //angularJson.projects[packageJsonApp.name].architect.build.options.styles.push(cssFile);
        options.styles.push(cssFile);
        //options.styles.push(`//ext-runtime-${toolkit}/ios/ios-all.css`);
        //options.styles.push(`//ext-runtime-${toolkit}/material/material-all.css`);
        //options.styles.push(`//ext-runtime-${toolkit}/neptune/neptune-all.css`);
        //options.styles.push(`//ext-runtime-${toolkit}/triton/triton-all.css`);

        const angularString = JSON.stringify(angularJson, null, 2);
        fs.writeFileSync(angularName, angularString);
        console.log(`${prefix} added ${scriptEngine} to scripts array in ./angular.json`);
        console.log(`${prefix} added ${cssFile} to styles array in ./angular.json`);
        break;
      default:
    }
    console.log('')
}
catch(e) {console.log(e);}
