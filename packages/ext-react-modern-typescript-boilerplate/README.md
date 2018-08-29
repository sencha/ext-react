# ExtReact Modern TypeScript Boilerplate

A foundation for React apps built with [ExtReact](http://docs.sencha.com/extreact/latest/index.html) components and TypeScript.

## Quick Start

ExtReact and all related packages are hosted on Sencha's private NPM registry. To gain access to this registry, [sign up for a trial of ExtReact](https://www.sencha.com/products/extreact/evaluate).

Once you have received your credentials, you can authenticate by running the following command:

```
npm login --registry=http://npm.sencha.com --scope=@sencha
```

Then, run the following to clone and build the project:

    git clone https://github.com/sencha/ext-react.git
    cd ext-react/packages/ext-react-typescript-boilerplate
    npm install
    npm start

This will start the app and open it in a browser window.  By default it tries to find
an open port starting with 1962.  You can override the default port by providing `--env.port=(port)` 
as a command line argument.

For example to use port 1963:

    npm start -- --env.port=1963

You can also run and serve a production build using:

    npm run build
    npm run prod
