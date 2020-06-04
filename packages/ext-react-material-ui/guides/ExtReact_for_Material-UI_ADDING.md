## Adding @sencha/ext-react-material-ui components to an existing Material-UI project created with create-react-app

## Requirements
Fetch your npm credentials and generate an application.

### Step 1: Retrieve npm Repositorary Access Credentials
To gain access to the Sencha npm repository:

1. [Start a free trial of ExtReact](https://www.sencha.com/products/extreact/evaluate/).
2. [Purchase ExtReact](https://www.sencha.com/store/).

### Step 2: Login to the npm repository
Once you have your credentials login to the npm repo.


Trial

```
npm login --registry https://sencha.myget.org/F/trial/npm/ --scope=@sencha
```

Production:

```
npm login --registry=https://npm.sencha.com --scope=@sencha
```

Early Adopter

```
npm login --registry=https://sencha.myget.org/F/early-adopter/npm/ --scope=@sencha
```

### Step 3: install @sencha/ext-react-material-ui

To add @sencha/ext-react-material-ui to an existing Material-UI application created with create-react-app, run the following in the root folder of the React app:

```
npm install @sencha/ext-react-material-ui
npm install @sencha/ext-react-material-ui-engine
npm install @sencha/ext-react-material-ui-theme
```

### Step 4: update src/index.js

- make the following changes to src/index.js

add these lines...

```sh
import ExtReactDOM from '@sencha/ext-react-material-ui';
import '@sencha/ext-react-material-ui-engine';
import '@sencha/ext-react-material-ui-theme';
```

...change this line:

```sh
//ReactDOM.render(<App />, document.getElementById('root'));
ExtReactDOM.render(<App />, document.getElementById('root'));
```

### Step 5: update a component to use @sencha/ext-react-material-ui

- add the import(s) to the top of the component js file:

```sh
import { ExtCalendar } from '@sencha/ext-react-material-ui';
```

- modify 'render' method to use component(s):

```sh
  render() {
    return (
      <ExtCalendar></ExtCalendar>
    )
  }
```
