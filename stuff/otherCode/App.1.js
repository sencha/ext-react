import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Panel, Container, Div, Button } from '@sencha/ext-modern';
const REACT_VERSION = require('react').version

// export default function App() {
//   return (
//     <Panel title={`React v${REACT_VERSION}`} layout="vbox">
//       <Button text="two" flex={2}/>
//       <Button text="one" flex={1}/>
//     </Panel>
//   )
// }

export default class App extends Component {

  constructor() {
      super();

      this.state = {
          name: 'marc',
          toggle: true,
          style: 'padding:50px;fontSize:24px;height:200px;'
      };
  }

  handleClick() {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
    console.log('The link was clicked.');
  }

  //<Div style={style}>hello</Div>
//   <Container html={toggle}/>
//   <Container html={`
// <div>
//   <div style={{fontSize:'24px'}}>{toggle.toString()}</div>
//   <div>z${name}</div>
// </div>
// `}> </Container>

  render() {
    const { name, toggle, style } = this.state;
    return (
      <Panel title={name} layout="vbox">
        <Button text="click" onTap={this.handleClick.bind(this)}/>
        <div>hello</div>
      </Panel>
    )
  }

}

// <Div style={style} html={`<div>hi</div> ${name} - toggle is ${toggle}`}></Div>
// <Button text="Change Toggle" ontap={this.handleClick.bind(this)}></Button>


      
// <div>hello</div>
// <div className="app-event-name">
// mjg - {name} - <div>hi</div>

// </div>




// <div>
// <div className="app-event-name">mjg</div>
// <div className="app-event-name">mjg</div>
// </div>