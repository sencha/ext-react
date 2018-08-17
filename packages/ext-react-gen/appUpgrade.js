const json = require('comment-json');
const fs = require('fs-extra');
const toSemVer = require('tosemver');
const path = require('path');
const os = require('os')
const npmScope = '@sencha';

var packageFolder = 'packages';
var generatedFilesFolder = 'generatedFiles';
var backupFolder = 'backup';
var backupextension = '.original';
var nodeDirectory = path.resolve(__dirname);
var classicProfile = "classic";
var modernProfile = "modern";
var appJson = 'app.json';
var packageJson = 'package.json';
var workspaceJson = 'workspace.json';
var webpackConfig = 'webpack.config.js';
var gitIgnore = '.gitIgnore';
var gitIgnoreAppend = '/generatedFiles ' + os.EOL + '/cordova ' + os.EOL + '/node_modules' + os.EOL;
var gitIgnoreData = '/build ' + os.EOL + gitIgnoreAppend;
var extFrameworkPath = 'node_modules/@sencha/ext';
var classic = false;
var modern = false;
var classicTheme;
var modernTheme;
var values;
var appJsonObject;

function doesBackupExist(fileName) {
	return doesFileExist(backupFolder + '/' + fileName);
}

function doesFileExist(fileName) {
	return fs.existsSync(fileName);
}

function createFolderIfItDoesnotExist(folderName) {
	if (!fs.existsSync(folderName)) {
		fs.mkdirSync(folderName);
	}
}

function createBackup(fileName) {
	createFolderIfItDoesnotExist(backupFolder);
	copyFile(fileName, backupFolder + '/' + fileName);
}

function restoreBackup(fileName) {
	copyFile(backupFolder + '/' + fileName, fileName);
}

function copyFile(sourceFile, targetFile) {
	fs.copySync(sourceFile, targetFile);
}

function doUpgrade(fileName) {
	if (doesBackupExist(fileName)) {
		console.log("The upgrade is already done. If need to upgrade again Please move files from  " + backupFolder + "/" + fileName +
			" to " + fileName);
		return;
	}
	createBackup(fileName);
	if (!upgradeFile(fileName)) {
		console.log("The upgrade has failed for " + fileName);
		restoreBackup(fileName);
	}
}


function upgradeFile(fileName) {
	switch (fileName) {
		case appJson:
			handleAppJsonUpgrade();
			return true;
		case workspaceJson:
			return handleWorkspaceJsonUpgrade();
		default:
	}
}

function handleAppJsonUpgrade() {
	if (appJsonObject.hasOwnProperty('modern')) {
		removeDebugJsPath(appJsonObject.modern.js);
	}
	if (appJsonObject.hasOwnProperty('classic')) {
		removeDebugJsPath(appJsonObject.classic.js);
	}
	if (appJsonObject.hasOwnProperty('js')) {
		removeDebugJsPath(appJsonObject.js);
	}
	createFileFromJson(appJson, appJsonObject);
}

function removeDebugJsPath(jsonLocation) {
	positionFound = -1;
	for (i in jsonLocation) {
		for (variable in jsonLocation[i]) {
			if (variable == 'path' && jsonLocation[i][variable].indexOf('${framework.dir}') > -1) {
				positionFound = i;
			}
		}
	}
	if (positionFound > -1) {
		jsonLocation.splice(positionFound, 1);
	}
}

function handleWorkspaceJsonUpgrade() {
	var workspaceJsonObject = getJson(workspaceJson);
	workspaceJsonObject.frameworks.ext = extFrameworkPath;
	createFileFromJson(workspaceJson, workspaceJsonObject);
	return true;
}

function createFileFromJson(fileName, jsonObject) {
	fs.writeFile(fileName, json.stringify(jsonObject, null, 2));
}

function getJson(filename) {
	return json.parse(fs.readFileSync(filename).toString());
}

//upgradeApp();

exports.upgradeApp = function upgradeApp() {
	appJsonObject = getJson(appJson);
	populateValues();
	createPackageJson();
	createWebPackConfig();
	doUpgrade(appJson);
	doUpgrade(workspaceJson);
	createEmptyFolders();
	moveUnncessaryFiles();
	createGitIgnore();
}

function createGitIgnore() {
	if (doesBackupExist(gitIgnore)) {
		console.log("The upgrade is already done. If need to upgrade again Please move files from  " + backupFolder + "/" + gitIgnore +
			" to " + gitIgnore);
		return;
	}
	if (doesFileExist(gitIgnore)) {
		createBackup(gitIgnore);
		fs.appendFileSync(gitIgnore, gitIgnoreAppend);
	}
	else {
		fs.writeFile(gitIgnore, gitIgnoreData);
	}
}

function createEmptyFolders() {
	createFolderIfItDoesnotExist(generatedFilesFolder);
	createFolderIfItDoesnotExist(packageFolder);
}

function moveUnncessaryFiles() {
	moveFileIfExist('classic.json');
	moveFileIfExist('classic.jsonp');
	moveFileIfExist('modern.json');
	moveFileIfExist('modern.jsonp');
	moveFileIfExist('bootstrap.js');
	moveFileIfExist('bootstrap.css');
}

function moveFileIfExist(fileName) {
	if (doesFileExist(fileName)) {
		fs.rename(fileName, backupFolder + '/' + fileName);
	}
}

function createPackageJson() {
	if (doesFileExist(packageJson)) {
		console.log(packageJson + ' already exists so skipping this step');
		return;
	}
	var file = nodeDirectory + '/templates/' + packageJson + '.tpl.default';
	var content = fs.readFileSync(file).toString();
	var tpl = new Ext.XTemplate(content);
	var t = tpl.apply(values);
	tpl = null;
	fs.writeFileSync('package.json', t);
}

function createWebPackConfig() {
	if (doesFileExist(webpackConfig)) {
		console.log(webpackConfig + ' already exists so skipping this step');
		return;
	}
	var file = nodeDirectory + '/templates/webpack.config.js.tpl.default';
	var content = fs.readFileSync(file).toString();
	var tpl = new Ext.XTemplate(content);
	var t = tpl.apply(values);
	tpl = null;
	fs.writeFileSync(webpackConfig, t);
}

function populateValues() {
	//var data = fs.readFileSync(nodeDirectory + '/config.json');
	//var config = JSON.parse(data);
	buildToolKitAndThemeDetails();
	values = {
		npmScope: npmScope,
		classic: classic,
		modern: modern,
		classicTheme: classicTheme,
		modernTheme: modernTheme,
		appName: appJsonObject.name,
		packageName: appJsonObject.name,
		version: toSemVer(appJsonObject.version)
	}
}

function buildToolKitAndThemeDetails() {
	if (appJsonObject.hasOwnProperty('toolkit')) {
		if (appJsonObject.toolkit == classicProfile) {
			classic = true;
			classicTheme = appJsonObject.theme;
		}
		else {
			modern = true;
			modernTheme = appJsonObject.theme;
		}
	}
	else {
		for (profile in appJsonObject.builds) {
			if (profile === classicProfile) {
				classic = true;
				classicTheme = appJsonObject.builds[profile].theme;
			}
			if (profile == modernProfile) {
				modern = true;
				modernTheme = appJsonObject.builds[profile].theme;
			}
		}
	}
}
