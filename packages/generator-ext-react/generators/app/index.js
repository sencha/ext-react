'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { kebabCase, pick } = require('lodash')

const CODE = {
    EXAMPLE: 'Include some example code', 
    BARE_BONES: 'Generate an empty app'
};

const LANGUAGE = {
    TYPESCRIPT: 'TypeScript',
    JAVASCRIPT: 'JavaScript'
};

const REACTVERSION = {
    REACT15: '15',
    REACT16: '16'
};

const BOILERPLATE = {
    [LANGUAGE.JAVASCRIPT + REACTVERSION.REACT15]: path.dirname(require.resolve('@extjs/reactor-boilerplate' + REACTVERSION.REACT15)),
    [LANGUAGE.JAVASCRIPT + REACTVERSION.REACT16]: path.dirname(require.resolve('@extjs/reactor-boilerplate' + REACTVERSION.REACT16)),
    [LANGUAGE.TYPESCRIPT + REACTVERSION.REACT15]: path.dirname(require.resolve('@extjs/reactor-typescript-boilerplate' + REACTVERSION.REACT15)),
    [LANGUAGE.TYPESCRIPT + REACTVERSION.REACT16]: path.dirname(require.resolve('@extjs/reactor-typescript-boilerplate' + REACTVERSION.REACT16))
};

module.exports = class extends Generator {

    prompting_name() {
        this.log(
            '\n' + chalk.bold.underline('Welcome to the ExtReact app generator') +            
            '\n' +
            `\nWe're going to create a new ${chalk.bold('React')} app that uses ${chalk.bold('Sencha ExtReact')} components.` +
            '\n'
        );

        return this.prompt([{
            type: 'input',
            name: 'appName',
            message: 'What would you like to name your app?',
            default: 'My ExtReact App'
        }]).then(props => Object.assign(this, props));
    }

    prompting_choices() {
        const prompts = [{
            type: 'input',
            name: 'packageName',
            message: 'What would you like to name the npm package?',
            default: kebabCase(this.appName)
        }, {
            type: 'list',
            name: 'baseTheme',
            message: 'What theme would you like to use?',
            choices: ['material', 'triton', 'ios']
        }, {
            type: 'list',
            name: 'code',
            message: 'Do you want to include example code (layout, navigation, routing, etc...), or just generate an empty app?',
            choices: [CODE.BARE_BONES, CODE.EXAMPLE]
        }, {
            type: 'list',
            message: 'Which react version you use?',
            name: 'reactVersion',
            default: REACTVERSION.REACT16,
            choices: [REACTVERSION.REACT15, REACTVERSION.REACT16]
        }, {
            type: 'list',
            message: 'Which language would you like to use?',
            name: 'language',
            choices: [LANGUAGE.JAVASCRIPT, LANGUAGE.TYPESCRIPT]
        }, {
            type: 'input',
            message: 'version:',
            name: 'version',
            default: '1.0.0',
        }, {
            type: 'input',
            message: 'description:',
            name: 'description'
        }, {
            type: 'input',
            message: 'git repository:',
            name: 'gitRepository'
        }, {
            type: 'input',
            message: 'keywords:',
            name: 'keywords'
        }, {
            type: 'input',
            message: 'author:',
            name: 'author'
        }, {
            type: 'input',
            message: 'license',
            name: 'license',
            default: 'ISC'
        }, {
            type: 'confirm',
            name: 'createDirectory',
            message: 'Would you like to create a new directory for your project?',
            default: true
        }];

        return this.prompt(prompts).then(props => Object.assign(this, props));
    }

    writing() {
        if (this.createDirectory) {
            this.destinationRoot(this.packageName);
        }

        const boilerplate = BOILERPLATE[this.language + this.reactVersion];

        // copy in files from boilerplate
        glob.sync('**/*', { cwd: boilerplate, ignore: ['build/**', 'node_modules/**', 'index.js'], dot: true })
            .forEach(file => new Promise((resolve, reject) => {
                if (this.code === CODE.BARE_BONES && file.match(/src/) && !file.match(/index/)) {
                    return;
                }
                if (this.code === CODE.BARE_BONES && file.match(/__tests__/)) {
                    return;
                }
                this.fs.copy(path.join(boilerplate, file), file);
            }))

        // set base theme

        this.baseTheme = `theme-${this.baseTheme}`;
        const theme = path.join('ext-react', 'packages', 'custom-ext-react-theme', 'package.json');
        const themePackageJson = this.fs.read(theme).replace('theme-material', this.baseTheme);
        this.fs.write(theme, themePackageJson);

        // update package.json

        const packageInfo = {};

        Object.assign(packageInfo, {
            name: this.packageName
        });
        if (this.version) packageInfo.version = this.version;
        if (this.description) packageInfo.description = this.description;
        if (this.gitRepository) {
            packageInfo.repository = {
                type: 'git',
                url: this.gitRepository
            }
        }
        if (this.keywords) packageInfo.keywords = this.keywords;
        if (this.author) packageInfo.author = this.author;
        if (this.license) packageInfo.license = this.license;

        Object.assign(packageInfo, pick(this.fs.readJSON('package.json'), 'main', 'scripts', 'dependencies', 'devDependencies', 'jest'));

        if (this.baseTheme !== 'theme-material') {
            packageInfo.dependencies[`@extjs/ext-react-${this.baseTheme}`] = packageInfo.dependencies['@extjs/ext-react'];
        }

        this.fs.writeJSON('package.json', packageInfo, null, '  ');

        // update index.html

        const indexHtml = path.join('src', 'index.html');
        this.fs.write(indexHtml, this.fs.read(indexHtml).replace('ExtReact Boilerplate', this.appName));

        // README.md

        this.fs.copyTpl(
            this.templatePath(this.language === LANGUAGE.TYPESCRIPT ? 'ts/README.md' : 'js/README.md'),
            this.destinationPath('README.md'),
            this
        )

        // swap out minimal App.js if the user chose not to include examples

        if (this.code === CODE.BARE_BONES) {
            this.fs.copyTpl(
                this.templatePath(this.language === LANGUAGE.TYPESCRIPT ? 'ts/App.minimal.tsx' : 'js/App.minimal.js'),
                this.destinationPath(this.language === LANGUAGE.TYPESCRIPT ? 'src/App.tsx' : 'src/App.js'),
                this
            )

            if (this.language === LANGUAGE.JAVASCRIPT) {
                this.fs.copyTpl(
                    this.templatePath('js/App.test.js'),
                    this.destinationPath('__tests__/App.test.js')
                )
            }
        } else {
            // update Layout.js
            const layout = path.join('src', `Layout.${this.language === LANGUAGE.TYPESCRIPT ? 'tsx' : 'js'}`);
            this.fs.write(layout, this.fs.read(layout).replace('ExtReact Boilerplate', this.appName));
        }
    }

    install() {
        this.npmInstall();
    }

    end() {
		const chdir = this.createDirectory ? '"cd ' + this.packageName + '" then ' : '';
		
        this.log(
			'\n' + chalk.green.underline('Your new ExtReact app is ready!') +
			'\n' +
			'\nType ' + chdir + '"npm start" to run the development build and open your new app in a web browser.' +
			'\n'
		);
	}

};
