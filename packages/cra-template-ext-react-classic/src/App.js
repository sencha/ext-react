import React, { Component } from 'react';
import { ExtGrid, ExtButton } from "@sencha/ext-react-modern";
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

  buttonTap = ({sender, e}) => {
    console.log('buttonTap')
    //console.log(sender)
    //console.log(e)

    this.theButton.cmp.setText('later')

  }


  buttonReady = () => {
    console.log('buttonReady')
    //console.log(sender)
    //console.log(e)

    this.theButton.cmp.setText('new val')

  }



  render() {
    return (
      // <ExtButton
      //   ref={theButton => this.theButton = theButton}
      //   text="hi"
      //   onTap={ this.buttonTap }
      //   onReady={ this.buttonReady }
      // />
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
