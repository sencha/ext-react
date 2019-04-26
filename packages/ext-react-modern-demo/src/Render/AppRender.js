import React, { Component } from 'react';
import { Grid, Column, Panel, RendererCell, ExtReactRenderer } from '@sencha/ext-modern';

//Ext.require('widget.renderercell')


export default class AppRender extends Component {

  //cell = {encodeHtml:false}
  store = Ext.create('Ext.data.Store', {
      //fields: ['fName', 'lName', 'dept', 'dob'],
      data: [
          {id: 111, active: true,  "fName":"Benjamin","lName":"Banks",     "dept":"Services",     dob: new Date("1/1/1960") },
      ]
  });

  // {id: 222, active: false, "fName":"Donald",  "lName":"Rodriguez", "dept":"Marketing",    dob: new Date("1/1/1960")},
  // {id: 333, active: true,  "fName":"Tom",     "lName":"Thumb",     "dept":"Development", dob: new Date("1/1/1960")}


        // <Column
      //   text="Department"
      //   dataIndex="dept"
      //   flex={1}
      //   renderer={this.renderer}
      // >
      // </Column>

    //   <Column
    //   text="Lname"
    //   dataIndex="lName"
    //   flex={1}
    // >
    // </Column>

  render() {

    return (

      <Grid title="Grid title" store={this.store}>





      <Column
        text="Fname"
        dataIndex="fName"
        flex={1}
      >
        <RendererCell renderer={this.renderer}/>
      </Column>

  </Grid>

    )
  }

  //cell={this.cell}
  //renderer={this.renderer}
  //<RendererCell renderer={this.renderer}/>

  // <Column text="First" dataIndex="fName" flex={1} />
  // <Column text="Last" dataIndex="lName" flex={1} />

//   <Column
//   text="Department"
//   dataIndex="dept"
//   flex={1}
//   cell={this.cell}
//   renderer={ (v, r) => {
//     return(<span style={{ color: 'pink' }}>{v}</span>);
//   }}
// />





  // renderer = (v, r) => {
  //   return(<span title="hi2" style={{ color: 'pink' }}>{v}</span>);
  // }


  renderer = (v, r) => {
    return(<ExtReactRenderer><Panel title="hi2" style={{ color: 'pink' }}>{v}</Panel></ExtReactRenderer>);
  }

  // renderer2 = (v, r) => {
  //   return(<ExtReactRenderer><span title="hi2" style={{ color: 'pink' }}>{v}</span></ExtReactRenderer>);
  // }


}

// renderer={ (v, r) => {
      //   return(<ExtReact><Panel title="hi" style={{ color: 'pink' }}>{v}</Panel></ExtReact>);
      // }}

//<RendererCell renderer={this.renderer}/>