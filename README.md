# ext-react 7.1.x

This repo is for ExtReact 7.1, which supports React 16 and above

The @sencha/ext-react package makes it easy to use [Ext JS](https://www.sencha.com/products/extjs) components in your [React](https://facebook.github.io/react) app.

[![Join the chat at https://gitter.im/sencha/ext-react](https://badges.gitter.im/gitterHQ/gitterHQ.github.io.svg)](https://gitter.im/sencha/ext-react?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Requirements

* React 16.12.x
* Ext JS 7.1+

## To Use this repo 'as-is' (to run the demos on your local machine)

* this repo manages several packages at once using Lerna, so follow these instructions:
* go to the root of your cloned local repo
* run 'npm install' - this will do an 'npm install' for every project in the packages folder
* DO NOT run npm install in the individual folders


## Getting Started with ExtReact

To create a new ExtReact app, we recommend using the [ExtReact Generator](https://github.com/sencha/ext-react/tree/master/packages/ext-react-gen):

```
npm install -g @sencha/ext-react-gen

ext-react-gen app CoolExtReactApp

```

The application it creates uses react, react-router, webpack, and babel (ES2015+) and is based off of the [ExtReact Modern Boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-modern-boilerplate).


## Getting Started with Ext JS and React

If you're starting from scratch with Ext JS and React, we recommend cloning one of the boilerplates and following the instructions there:

* [React + Ext JS Classic Boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-classic-boilerplate)
* [React + Ext JS Modern Boilerplate](https://github.com/sencha/ext-react/tree/master/packages/ext-react-modern-boilerplate)


# Contributing

## Contributor License Agreement

We'd love to accept patches and new boilerplates.  Before we can take them, we need you to sign [this CLA](Sencha-CLA.pdf).

Once we receive it, we'll be able to accept your pull requests.

## Contributing a Patch
1. Submit an issue describing your proposed change.
2. The repo owner will respond to your issue promptly.
3. If your proposed change is accepted, fork the repo, develop and test your code changes.
4. Submit a pull request.
