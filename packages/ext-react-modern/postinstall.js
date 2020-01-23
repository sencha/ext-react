const fs = require("fs-extra");
//var productName
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

//console.log(packageJsonThis.name)
//console.log(dashCount)
if (dashCount == 3) {
  var res = packageJsonThis.name.split('-');
  //console.log(res)
  framework = res[1];
  toolkit = res[2];
  xtype = res[3];
  //productName  = packageJsonThis.name;

  //var last = packageJsonThis.name.lastIndexOf('-');
  //productName  = packageJsonThis.name.substring(0,last);
  //xtype = packageJsonThis.name.substring(productName.length+1);
  xtypeFileName = `ext.${xtype}.js`;

}
else {
  var res = packageJsonThis.name.split('-');
  //console.log(res)
  framework = res[1];
  toolkit = res[2];
  //productName  = packageJsonThis.name;
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
  //if (xtype != '') {doXtype()}
  //console.log('');
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

    // fs.copySync(`${from}/themes/`,`../../../${copyFolder}ext-runtime-${toolkit}/themes/`);
    // //fs.copySync(`../ext-runtime-${toolkit}-base/theme/${theme}`,`../../../${copyFolder}ext-runtime-${toolkit}/theme/${theme}`);
    // console.log(`${prefix} created ./${copyFolder}ext-runtime-${toolkit}/themes folder`);

    // fs.copySync(`${from}/engine.js`,`../../../${copyFolder}ext-runtime-${toolkit}/engine.js`);
    // console.log(`${prefix} created ./${copyFolder}ext-runtime-${toolkit}/engine.js`);

    // fs.copySync(`${from}/boot.js`,`../../../${copyFolder}ext-runtime-${toolkit}/boot.js`);
    // console.log(`${prefix} created ./${copyFolder}ext-runtime-${toolkit}/boot.js`);


    //fs.copySync(`${from}/${toolkit}.${theme}.js`,`../../../${copyFolder}ext-runtime-${toolkit}/${toolkit}.${theme}.js`);
    fs.copySync(`${from}/`,`../../../${copyFolder}ext-runtime-${toolkit}/`);
    //console.log(`${prefix} created ./${copyFolder}ext-runtime-${toolkit}/${toolkit}.${theme}.js`);
    console.log(`${prefix} created ./${copyFolder}ext-runtime-${toolkit}/`);







    // fs.copySync(`${from}/css.prod.js`,`../../../${copyFolder}ext-runtime-${toolkit}/css.prod.js`);
    // console.log(`${prefix} created ./${copyFolder}ext-runtime-${toolkit}/css.prod.js`);

    switch(framework) {
      case 'react':
        var indexHtml = fs.readFileSync(`../../../${copyFolder}index.html`, 'utf8');
        var position = indexHtml.indexOf('</head>');

    //     var styles = `
    // <!--https://www.rapidtables.com/web/color/-->
    // <style>
    //   :root {
    //     --base-color: #024059;
    //     --base-foreground-color: white;
    //     --background-color: white;
    //     --color: black;
    //   }
    // </style>
    //     `

        var b = ''
        if (toolkit == 'modern') {
          b =
          `
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/${toolkit}.${theme}.js"></script>

<!--
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/boot.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/engine.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/themes/css.${toolkit}.material.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/themes/css.${toolkit}.material.js"></script>
-->
          `
        }
        else {
          b =
          `
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/${toolkit}.${theme}.js"></script>
<!--
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/${toolkit}.crisp.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/${toolkit}.graphite.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/${toolkit}.material.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/${toolkit}.neptune.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/${toolkit}.triton.js"></script>



      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/boot.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/engine.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/themes/css.${toolkit}.material.js"></script>

      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/themes/css.${toolkit}.crisp.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/themes/css.${toolkit}.graphite.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/themes/css.${toolkit}.material.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/themes/css.${toolkit}.neptune.js"></script>
      <script src="%PUBLIC_URL%/ext-runtime-${toolkit}/themes/css.${toolkit}.triton.js"></script>
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

        //var style = `ext-runtime-${toolkit}/theme/${theme}/${theme}-all.css`;
        var scriptBoot = `ext-runtime-${toolkit}/boot.js`;
        var scriptEngine = `ext-runtime-${toolkit}/engine.js`;
        var cssjs = `ext-runtime-${toolkit}/themes/css.${toolkit}.material.js`;
        //angularJson.projects[packageJsonApp.name].architect.build.options.styles.push(style);
        angularJson.projects[packageJsonApp.name].architect.build.options.scripts.push(scriptBoot);
        angularJson.projects[packageJsonApp.name].architect.build.options.scripts.push(scriptEngine);
        angularJson.projects[packageJsonApp.name].architect.build.options.scripts.push(cssjs);

        const angularString = JSON.stringify(angularJson, null, 2);
        fs.writeFileSync(angularName, angularString);
        //console.log(`${prefix} added ${style} to styles array in ./angular.json`);
        console.log(`${prefix} added ${scriptBoot} to scripts array in ./angular.json`);
        console.log(`${prefix} added ${scriptEngine} to scripts array in ./angular.json`);
        console.log(`${prefix} added ${cssjs} to scripts array in ./angular.json`);
        break;
      default:
    }
    console.log('')
    //if (xtype != '') {doXtype()}
}
catch(e) {console.log(e);}
