# ExtReact Classic Demo

A demo for React apps that use the Ext JS classic toolkit.

## Requirements

* Ext JS 6.6+

## Quick Start

Run the following to clone and build the project:

    git clone https://github.com/sencha/ext-react.git
    cd ext-react/packages/ext-react-classic-demo
    npm install

Then run:

    npm start

This will start the app and open it in a browser window.  By default it tries to find
an open port starting with 1962.  You can override the default port by providing `--env.port=(port)` 
as a command line argument.

For example to use port 1963:

    npm start -- --env.port=1963

You can also run and serve a production build using:

    npm run build
    npm run prod

