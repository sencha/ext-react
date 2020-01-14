## @sencha/ext-react-classic

last run: Tue Jan 14 2020 09:45:19 GMT-0500 (Eastern Standard Time)

This npm package contains the needed files to add the @sencha/ext-react-classic package to a React application

## Login to the Sencha early adopter npm repo

```sh
npm login --registry=https://sencha.myget.org/F/early-adopter/npm/ --scope=@sencha

```

## Create a React application with create-react-app

- Run the following:

```sh
npx create-react-app ext-react-classic-demo --template @sencha/ext-react-classic
cd ext-react-classic-demo
npm install
npm start
```

create-react-app will create a new application using the ext-react-classic template (from the sencha/ext-react git repo)

- When create-react-app is completed, Run the following:

```sh
cd ext-react-classic-demo
```

- Optionally, open your editor (You can use any editor)

To open Visual Studio Code, type the following:

```sh
code .
```

- To change the theme, edit 'public/index.html':

uncomment one of the links below this line:

```sh
    <script src="%PUBLIC_URL%/ext-runtime-classic/themes/css.classic.material.js"></script>
```

- To start the ExtReact application, run the following in a terminal window:

```sh
npm start
```

The ExtReact application will load in a browser window!


#### The following was added to your ExtReact project

- Replaced ./src/index.js with:

```sh
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Ext = window['Ext'];
Ext.onReady(function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

- Replaced ./src/App.js with:

```sh
import React, { Component } from 'react';
import { ExtGrid } from "@sencha/ext-react-classic";
const Ext = window['Ext'];

class App extends Component {

  constructor() {
    super()
    var data=[
      { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
      { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
      { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 }
    ]
    this.store = { xtype: 'store', data: data }
  }

  render() {
    return (
      <ExtGrid
        viewport={ true }
        ref={ grid => this.grid = grid }
        title="The Grid"
        store={ this.store }
        onReady={ this.extReactDidMount }
        columns={ [
          { text: "name", dataIndex: "name" },
          { text: "email", dataIndex: "email", flex: "1" },
          { text: "% Change", dataIndex: "priceChangePct", align: "right", renderer: this.renderSign }
        ] }
      >
      </ExtGrid>
    )
  }

  componentDidMount = () => {
    console.log('componentDidMount')
    console.log(this.grid.cmp)
  }

  extReactDidMount = (detail) => {
     console.log('extReactDidMount')
  }

  renderSign = (value, context) => {
    var iValue = parseInt(value);
    var color;
    if (iValue > 0) { color = 'green'; }
    else { color = 'red'; }
    return `<span style="color:${ color };">${ value }</span>`
  }

}
export default App;

```

