## Getting started for @sencha/ext-react-modern

last run: Wed Jan 29 2020 15:16:44 GMT-0500 (Eastern Standard Time)

Getting started with @sencha/ext-react-modern and create-react-app

### Login to the Sencha npm repo

* Note, you must be signed into the Sencha npm registry to access packages.
See [Authenticating to Sencha's npm Registry](getting_started.html#getting_started_-_authenticating_to_sencha_s_npm_registry)
for more information.

production:

```sh
npm login --registry=https://npm.sencha.com/ --scope=@sencha
```

early adopter:

```sh
npm login --registry=https://sencha.myget.org/F/early-adopter/npm/ --scope=@sencha
```

### Create a React application with create-react-app

- Run the following:

```sh
npx create-react-app --template @sencha/ext-react-modern ext-react-modern-demo
```

create-react-app will create a new application using the ext-react-modern template
(from the sencha/ext-react git repo)

- When create-react-app is completed, Run the following:

```sh
cd ext-react-modern-demo
```

- To change the theme, edit 'public/index.html' and uncomment one of the links below this line:

```sh
<link href="%PUBLIC_URL%/ext-runtime-modern/material/material-all.css" rel="stylesheet" type="text/css"></link>
```

- To start the ExtReact application, run the following in a terminal window:

```sh
npm start
```

The ExtReact application will load in a browser window!
