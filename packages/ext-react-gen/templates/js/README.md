# <%= appName %>

<%= description %>

## Setup

If you haven't already, sign in to Sencha's NPM registry:

```
npm login --registry=http://npm.sencha.com --scope=@sencha
```

## Running

Run the following build and run this app:

    npm install
    npm start

This will start the app and open it in a browser window.  By default it tries to find
an open port starting with 8080.  You can override the default port by providing `--env.port=(port)` 
as a command line argument.

For example to use port 8081:

    npm start -- --env.port=8081

You can also run and serve a production build using:

    npm run build
    npm run prod

## Tests

This application uses jest to run unit tests.  You can run them with:

```
npm test
```

When you make changes, update test snapshots by running:

```
npm run update-snapshots
```