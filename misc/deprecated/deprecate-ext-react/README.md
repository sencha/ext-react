## @sencha/ext-react

last run: Fri Nov 22 2019 17:21:30 GMT-0500 (Eastern Standard Time)

This npm package contains the files that are needed to add the @sencha/ext-react package to a React application

## Login to the Sencha early adopter npm repo

```sh
npm login --registry=https://sencha.myget.org/F/early-adopter/npm/ --scope=@sencha

```

## Create a React application with create-react-app

-   Run the following:

```sh
npx create-react-app ext-react-demo
```

-   Add ExtReact to your application by running the following:

```sh
cd ext-react-demo
npm install @sencha/ext-react --save
```

-   Open your editor

To open Visual Studio Code, type the following:

```sh
code .
```

(You can use any editor)

#### Add ExtReact to your project

-   Replace ./src/App.js with:

```sh
import React, { Component } from 'react';
import { ExtPanel, ExtToolbar, ExtButton, ExtGrid, ExtGridcolumn } from '@sencha/ext-react-modern';

class App extends Component {

  render() {
    return (
      <ExtPanel
        title="Panel"
        layout="fit"
        shadow="true"
        viewport="true"
        padding="10"
      >
        <ExtToolbar docked="top">
          <ExtButton text="button1"></ExtButton>
          <div>div with text</div>
          <ExtButton text="button2"></ExtButton>
        </ExtToolbar>
        <ExtGrid title="The Grid" shadow="true" onReady={ this.readyGrid }>
          <ExtGridcolumn text="name" dataIndex="name"></ExtGridcolumn>
          <ExtGridcolumn text="email" dataIndex="email" flex="1"></ExtGridcolumn>
        </ExtGrid>
      </ExtPanel>
    )
  }

  readyGrid = event => {
    var grid = event.detail.cmp;
    var data=[
      {name: 'Marc', email: 'marc@gmail.com'},
      {name: 'Nick', email: 'nick@gmail.com'},
      {name: 'Andy', email: 'andy@gmail.com'}
    ]
    grid.setData(data);
  }

}
export default App;

```

-   Type the following in a command/terminal window:

```sh
npm start
```

The ExtReact application will load in a browser window
