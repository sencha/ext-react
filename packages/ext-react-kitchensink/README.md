# Ext React KitchenSink

This project demonstrates the use of all [ExtReact](http://docs.sencha.com/extreact/latest/index.html) components.

## Running

ExtReact and all related packages are hosted on Sencha's private NPM registry. To gain access to this registry, [sign up for a trial of ExtReact](https://www.sencha.com/products/extreact/evaluate).

Once you have received your credentials, you can authenticate by running the following command:

```
npm login --registry=http://npm.sencha.com --scope=@sencha
```

Then, run the following to build and launch the app:

```
git clone https://github.com/sencha/ext-react.git
cd packages/ext-react-kitchensink
npm install
npm start
```

You can view the app by pointing your browser to [http://localhost:1962](http://localhost:1962)

# Running against a local copy of the SDK repo

1. `git clone git@github.com:sencha/ext-react.git`
2. `npm install`
3. `cd packages/ext-react-kitchensink`
4. `ln -s /path/to/ExtJS ext` - or, for Windows: `mklink ext /path/to/ExtJS` 
5. `npm run local`
