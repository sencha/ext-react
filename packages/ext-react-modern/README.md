## @sencha/ext-react-modern

last run: Tue Jan 14 2020 13:08:23 GMT-0500 (Eastern Standard Time)

This npm package contains the needed files to add the @sencha/ext-react-modern package to a React application

## Login to the Sencha npm repo

production:

```sh
npm login --registry=https://npm.sencha.com/ --scope=@sencha
```

early adopter:

```sh
npm login --registry=https://sencha.myget.org/F/early-adopter/npm/ --scope=@sencha
```

## Create a React application with create-react-app

- Run the following:

```sh
npx create-react-app ext-react-modern-demo --template @sencha/ext-react-modern
```

create-react-app will create a new application using the ext-react-modern template
(from the sencha/ext-react git repo)

- When create-react-app is completed, Run the following:

```sh
cd ext-react-modern-demo
```

- Optionally, open your editor (You can use any editor)

To open Visual Studio Code, type the following:

```sh
code .
```

- To change the theme, edit 'public/index.html' and uncomment one of the links below this line:

```sh
<script src="%PUBLIC_URL%/ext-runtime-modern/themes/css.modern.material.js"></script>
```

- To start the ExtReact application, run the following in a terminal window:

```sh
npm start
```

The ExtReact application will load in a browser window!

<hr>

#### The following was added to your ExtReact project

- Replaced ./src/index.js with:

```sh
import React from 'react';
//import ReactDOM from 'react-dom';
import ExtReactDOM from '@sencha/ext-react-modern';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ExtReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

- Replaced ./src/index.css with:

```sh
:root {
  --base-color: #A24059;
  --base-foreground-color: white;
  --background-color: white;
  --color: black;
}
```

- Replaced ./src/App.js with:

```sh
import React, { Component } from 'react';
import { ExtGrid } from "@sencha/ext-react-modern";
import { ExtColumn } from "@sencha/ext-react-modern";
const Ext = window['Ext'];

class App extends Component {

  constructor() {
    super()
    var data=[
      { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
      { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
      { name: 'Andy', email: 'andy@gmail.com',priceChangePct: .45 }
    ]
    this.store = Ext.create('Ext.data.Store', {data: data})
    //this.store = {xtype: 'store',data: data}
  }

  render() {
    return (
      <ExtGrid
        viewport={ true }
        ref={ grid => this.grid = grid }
        title="The Grid"
        store={ this.store }
        onReady={ this.extReactDidMount }
        // columns={ [ {text: "name", dataIndex: "name"} ] }
      >
        <ExtColumn text="name" dataIndex="name"></ExtColumn>
        <ExtColumn text="email" dataIndex="email" width="150"></ExtColumn>
        <ExtColumn
          text="% Change"
          dataIndex="priceChangePct"
          align="right"
          renderer={ this.renderSign.bind(this, '0.00') }
        />
      </ExtGrid>
    )
  }

  componentDidMount = () => {
    console.log('componentDidMount')
    //console.log(this.grid.cmp)
  }

  extReactDidMount = detail => {
    console.log('extReactDidMount')
    //this.grid.cmp.setStore(this.store);
  }

  renderSign = (format, value) => (
    <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
        {Ext.util.Format.number(value, format)}
    </span>
  )

}
export default App;
```
