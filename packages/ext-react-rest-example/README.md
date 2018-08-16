# ExtReact REST Example

This application shows you how to use [Redux](http://redux.js.org/) and ExtReact's [Grid](http://docs.sencha.com/extreact/6.5.0/modern/Ext.grid.Grid.html) component to build a multi-faceted search interface. Here we use ExtReact's Ext.data.Store with a REST proxy and implement server-side sorting, filtering, and paging using 
node.js and SQLLite.

## Running

ExtReact and all related packages are hosted on Sencha's private NPM registry. To gain access to this registry, [sign up for a trial of ExtReact](https://www.sencha.com/products/extreact/evaluate).

Once you have received your credentials, you can authenticate by running the following command:

```
npm login --registry=http://npm.sencha.com --scope=@extjs
```

Then, run the following to build and launch the app:

```
git clone https://github.com/sencha/extjs-reactor.git
cd packages/reactor-rest-example
npm install
npm start
```

You can view the app by pointing your browser to [http://localhost:8082](http://localhost:8082)
