# ext-react-gen
A code generator for ExtReact applications.

## Installation

Install [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g @sencha/ext-react-gen
```

## Creating a new ext-react-gen App

If you haven't already, log into Sencha's private registry using the credentials you received in your ExtReact trial or subscription activation email. If you don't have credentials, you can get them by [signing up for a trial of ExtReact](https://www.sencha.com/products/extreact/evaluate/).

```bash
npm login --registry=http://npm.sencha.com --scope=@sencha
```

Then, to create a new ext-react-gen app, run:

```bash
ext-react-gen MyCoolExtReactApp
```

## Development

To make changes to the generator, run:

```bash
git clone git@github.com:sencha/ext-react.git
cd ext-react
npm install
cd packages/ext-react-gen
npm link
```

Now `ext-react-gen` will use your local copy of the generator.

## License

MIT © [Sencha, Inc.](https://www.sencha.com/)
