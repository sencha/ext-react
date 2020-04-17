# Getting Started with ExtReact for Material-UI

## Requirements
Fetch your npm credentials and generate an application.

### Step 1: Retrieve npm Repo Access Credentials
To gain access to the Sencha npm repository:

1. [Start a free trial of ExtReact](https://www.sencha.com/products/extreact/evaluate/).
2. [Purchase ExtReact or Ext JS Enterprise](https://www.sencha.com/store/).

* **Note:** Ext JS enterprise customers already have access to ExtReact.
* **Note:** Existing customers use your support portal credentials. But switch the username, `@` character with `'..'` two periods, so the username would look something like this after it's converted: `name..gmail.com`.

Login to the npm repository
Once you have your credentials login to the npm repo.

production:

```sh
npm login --registry=https://npm.sencha.com/ --scope=@sencha
```

early adopter:

```sh
npm login --registry=https://sencha.myget.org/F/early-adopter/npm/ --scope=@sencha
```

### Step 3: Create a React starter app

To get started with ExtReact for Material-UI, first create a starter application with create-react-app.  More details on create-react-app are [available here](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)

Open up terminal (mac) or command (window) and navigate to the folder where you want to create your application

To create a generic starter app:

```
npx create-react-app my-ext-react-material-ui-app
```


To create a finished starter app:

```
npx create-react-app --template @sencha/ext-react-material-ui ext-react-material-ui-demo

```

This will take a few minutes and will generate a new atarter react app in a folder called 'my-ext-react-material-ui-app'

To run the starter app to create a generic app type the following:

```
cd my-ext-react-material-ui-app
yarn start
```


![Starter React App](starter.png)

### Step 4: Adding ExtReact for Material-UI

There are 2 ways to get the starter application using ExtReact for Material

To add ExtReact for Material-UI to this starter application, open your text editor or IDE in the 'my-ext-react-material-ui-app' folder.

If you use Visual Studio Code, stop the running application (ctrl+C) in the terminal or command window and run:

```
code .
```

The image shows Visual Studio code with the root folder and  expanded 'public' and 'src' folder.  We will make changes to these folders to enable ExtReact for Material UI.

![VSC](vsc.png)

### Step 5: Add the ExtReact and Material-UI npm packages

If you used the template starter app, continue to step 6

Add the following to the dependencies section of package,json

```
    "@material-ui/core": "~4.9.10",
    "@material-ui/icons": "~4.9.1",
    "@sencha/ext-react-material-ui": "^7.2.1",
    "@sencha/ext-react-material-ui-engine": "^7.2.1",
    "@sencha/ext-react-material-ui-theme": "^7.2.1",
```

in the command window:

```
npm install
```

Create a file named src/theme.js:

```
import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#024059',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
export default theme;
```

src/index.js:

```
import '@sencha/ext-react-material-ui-engine';
import '@sencha/ext-react-material-ui-theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import ExtReactDOM from '@sencha/ext-react-material-ui';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ExtReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
var baseColor = theme.palette.primary.main;
document.documentElement.style.setProperty("--base-color", baseColor);
serviceWorker.unregister();
```

src/App.js

```
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ExtGrid } from "@sencha/ext-react-material-ui";

export default class App extends Component {
  render() {
    return (
      <div style={{marginTop:'77px',marginLeft:'12px'}}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              ExtReact and Material UI Components in the same Application
            </Typography>
          </Toolbar>
        </AppBar>

        <Container>
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            <img alt="" src="./files/footer-logo.png"/>
            <img alt="" width="60px" src="./files/logo_raw.svg"/>

              ExtReact and Material UI
            </Typography>
        </Container>

        <ExtGrid
          width="400px"
          height="400px"
          title="The Grid"
          store={
            {
              xtype: 'store',
              data: [
                { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
                { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
                { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 }
              ]
            }
          }
          columns={[
            {text: "name", dataIndex: "name"},
            {text: "email", dataIndex: "email", flex: "1"},
            {
              text: "% Change",
              dataIndex: "priceChangePct",
              align: "right",
              producesHTML: false,
              renderer: this.renderSign
            }
          ]}
        >
        </ExtGrid>
      </div>
    )
  }
}
```

### Step 6: Run the ExtReact for Material-UI app

```
npm start
```

you will see this:

![final](final.png)