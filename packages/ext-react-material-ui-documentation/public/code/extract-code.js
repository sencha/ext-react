const fs = require('fs')
const path = require('path')
const examples = path.join(__dirname)
//const mkdirp = require('mkdirp').sync
let result = {}

function extractAll(dir) {
  //console.log('a')
  const files = fs.readdirSync(dir)
  //console.log(files)
  const parts = dir.split(path.sep)
  //console.log(parts.toString())

  var s1 = parts.toString().replace(/,/g, '/')
  //console.log(s)
  var thePath = path.join(__dirname)
  //console.log(thePath)
  var s2 = s1.toString().replace(thePath, '')
  var s3 = s2.slice(1)

  console.log(s3)


  const example = parts[parts.length - 1]

  for (let file of files) {
    const fullPath = path.join(dir, file)
    //console.log(fullPath)

    if (fs.lstatSync(fullPath).isDirectory()) {
      extractAll(fullPath);
    }
    else
    {
      //if (file === `${example}.js`) {
        try {
          extractFrom(example, file, fullPath, s3)
        } catch (e) {
          console.log(`Error extracting code from ${file}`, e)
        }
      //}
    }
  }
}

function extractFrom(example, file, fullPath, s3) {
  //console.log(fullPath)
  //console.log(fs.existsSync(fullPath))
  if (!fs.existsSync(fullPath)) return
  const content = fs.readFileSync(path.join(fullPath), 'utf8')


  //console.log(result[example])

  //if (result[example] == undefined) {
  //  result[example] = {}
  //}
  //result[example][file] = content

  result[s3 + '/' + file] = content

  //console.log(content)
  //(result[example] = result[example] || {})[file] = content

  // const importRegex = /import[^'"]+['"]([^'"]+)['"];/gi
  // let match
  // (result[example] = result[example] || {})[file] = content
  // while (match = importRegex.exec(content)) {
  //   file = `${match[1]}.js`
  //   if (file.startsWith('.')) {
  //     extractFrom(example, path.basename(file), path.join(path.dirname(fullPath), file))
  //   }
  // }
}

function run() {
  var outputDir = path.join(__dirname)
  //console.log(examples)
  extractAll(examples)


  //result['root'] = {}
  //result['index.html'] =  fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
  //result['app.js'] =  fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8')
  //result['db.json'] =  fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')



  //console.log(result)
  //mkdirp(outputDir)
  fs.writeFileSync(path.join(outputDir, 'code.js'), `window._code = ${JSON.stringify(result, null, '\t')}`, 'utf8')

  //var chalk = require('chalk')
  var prefix = ``
  var platform = require('os').platform()
  if (platform == 'darwin') { prefix = `ℹ ｢ext｣:` }
  else { prefix = `i [ext]:` }
  //var val = `${chalk.green(prefix)} `
  var val = ''
  outputDir = outputDir.replace(process.cwd(), '').trim()
  console.log(val + 'Writing code.js to ' + outputDir)
}

run()