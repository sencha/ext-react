# React + Ext JS Classic Boilerplate

A foundation for React apps that use the Ext JS modern toolkit.

## Requirements

* Ext JS 6.2+

## Quick Start

If you haven't already, download Ext JS 6.2+.

Then, run the following to clone and build the project:

    git clone https://github.com/sencha/extjs-reactor.git
    cd extjs-reactor/packages/reactor-classic-boilerplate
    npm install

Copy or link your Ext JS SDK into packages/reactor-classic-boilerplate/ext.  On Mac OS and Linux, this can be done with the following command:

```
ln -s /path/to/ext-6.x.x ext
```

Or on windows:

```
mklink /J ext c:\path\to\ext-6.5.x
```

Then run:

    npm start

This will start the app and open it in a browser window.  By default it tries to find
an open port starting with 8080.  You can override the default port by providing `--env.port=(port)` 
as a command line argument.

For example to use port 8081:

    npm start -- --env.port=8081

You can also run and serve a production build using:

    npm run build
    npm run prod

