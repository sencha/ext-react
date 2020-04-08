const fs = require("fs-extra");
var productName
var xtype
var xtypeFileName

function doXtype() {
  fs.copySync(`../ext-web-components-${xtype}/ext-runtime/${xtypeFileName}`,`../../../${copyFolder}ext-runtime/${xtypeFileName}`);
  console.log(`${prefix} ${xtypeFileName} copied to ./${copyFolder}ext-runtime`);
}

var packageNameThis = './package.json';
var packageThis = fs.readFileSync(packageNameThis, 'utf8');
const packageJsonThis = JSON.parse(packageThis);
function boldGreen (s) {
  var boldgreencolor = `\x1b[32m\x1b[1m`
  var endMarker = `\x1b[0m`
  return (`${boldgreencolor}${s}${endMarker}`)
}
var prefix =(`${boldGreen(packageJsonThis.name + ':')}`)

var dashCount = (packageJsonThis.name.match(/-/g) || []).length;
if (dashCount == 2) {
  var last = packageJsonThis.name.lastIndexOf('-');
  productName  = packageJsonThis.name.substring(0,last);
  xtype = packageJsonThis.name.substring(productName.length+1);
  xtypeFileName = `ext.${xtype}.js`;
}
else {
  productName  = packageJsonThis.name;
  xtype = '';
  xtypeFileName = ``;
}

var copyFolder = '';
switch(productName) {
  case '@sencha/ext-react':
    copyFolder = 'public/';
    if (!fs.existsSync(`../../../${copyFolder}index.html`)) {
      console.log(`${prefix} ./${copyFolder}index.html does not exist, not creating ext-runtime folder`);
      return
    }
    break;
  case '@sencha/ext-angular':
    copyFolder = '';
    if (!fs.existsSync('../../../angular.json')) {
      console.log(`${prefix} ./angular.json does not exist, not creating ext-runtime folder`);
      return
    }
    break;
  default:
    copyFolder = '';
}

if (fs.existsSync(`../../../${copyFolder}ext-runtime`)) {
  console.log(`${prefix} ./${copyFolder}ext-runtime exists`);
  if (xtype != '') {doXtype()}
  console.log('');
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
      var themes = ['material', 'neptune'];
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
    fs.copySync(`../ext-runtime-base/theme/${theme}`,`../../../${copyFolder}ext-runtime/theme/${theme}`);
    console.log(`${prefix} created ./${copyFolder}ext-runtime/theme/${theme} folder`);
    fs.copySync('../ext-runtime-base/engine.js',`../../../${copyFolder}ext-runtime/engine.js`);
    console.log(`${prefix} created ./${copyFolder}ext-runtime/engine.js`);

    switch(productName) {
      case '@sencha/ext-react':
        var indexHtml = fs.readFileSync(`../../../${copyFolder}index.html`, 'utf8');
        //var position = indexHtml.indexOf('<title>');
        var position = indexHtml.indexOf('</head>');
        var styles = `
    <!--https://www.rapidtables.com/web/color/-->
    <style>
      :root {
        --base-color: #024059;
        --base-foreground-color: white;
        --background-color: white;
        --color: black;
      }
    </style>
        `
        var b =
        `
    <link
      href="%PUBLIC_URL%/ext-runtime/theme/${theme}/${theme}-all.css"
      rel="stylesheet" type="text/css"
    >
    <script src="%PUBLIC_URL%/ext-runtime/engine.js"></script>
${styles}
        `
        fs.copySync(`../../../${copyFolder}index.html`,`../../../${copyFolder}indexBack.html`);
        var indexHtmlNew = indexHtml.substring(0, position) + b + indexHtml.substring(position);
        fs.writeFileSync(`../../../${copyFolder}index.html`, indexHtmlNew);
        console.log(`${prefix} updated ./${copyFolder}index.html`);
        console.log(`${prefix} backup in ./${copyFolder}indexBack.html`);
        break;
      case '@sencha/ext-angular':
        var angularName = '../../../angular.json';
        var angular = fs.readFileSync(angularName, 'utf8');
        const angularJson = JSON.parse(angular);
        var style = `ext-runtime/theme/${theme}/${theme}-all.css`;
        var script = "ext-runtime/engine.js";
        angularJson.projects[packageJsonApp.name].architect.build.options.styles.push(style);
        angularJson.projects[packageJsonApp.name].architect.build.options.scripts.push(script);
        const angularString = JSON.stringify(angularJson, null, 2);
        fs.writeFileSync(angularName, angularString);
        console.log(`${prefix} added ${style} to styles array in ./angular.json`);
        console.log(`${prefix} added ${script} to scripts array in ./angular.json`);
        break;
      default:
    }
    if (xtype != '') {doXtype()}
}
catch(e) {console.log(e);}
