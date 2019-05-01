import React, { Component } from 'react';
import { Button, Container } from '@sencha/ext-modern';

export default class AppButton extends Component {

  state = { message: null }

  
  render() {
    return (
      <Container padding="10">

        <Button
            text="Say Hello"
            handler={this.sayHello}
            ui="action raised"
        />
        <Button
            text="Say Goodbye"
            handler={this.sayGoodbye}
        />
        <Container padding="10" html={ this.state.message }></Container>
      </Container>
    )
  }

  sayHello = () => {
    this.setState({ message: MESSAGE });
    //this.setState({ message: 'Hello world!' });

  }

  sayGoodbye = () => {
    this.setState({ message: 'Goodbye cruel world.' });
  }

}


// //*********************************************************
// //** Copyright: Merchant AI, All Rights Reserved
// //** Date: 7-Jul-2018
// //** 6.7.0 TextColumn encapsulation for Marc with 2 issues:
// //** 1) Property interface inside typescript
// //** 2) Renderer still has problem returning span. 
// //*********************************************************
// import * as React from 'react';
// import {TextColumn, TextColumnProps, ExtReactRenderer} from '@sencha/ext-modern';
// declare var Ext:any;

// interface SxColProps extends TextColumnProps {
//     text: string, dataIndex: string, flex?: number, resizable?: boolean, //TextColumnProps 
//     fgColor?: string, onEdited?: Function }

// export default class SxCol extends React.Component<SxColProps, any> {
//   //** CONSTANTS

//   //** VARIABLES
//   textColumn: React.RefObject<TextColumn>  = React.createRef();

//   //** CONSTRUCTOR OR STATE

//   //** RENDERER
//   render() {
//     const {dataIndex, fgColor, onEdited} = this.props;
//     return ( <TextColumn {...this.props} flex={1}
//                            ref={this.textColumn}
//                            editable={true} 
//                            editor={{ xtype:'celleditor', field:'textfield',
//                                      listeners:{ beforecomplete: this.beforeComplete}}}
//                            renderer={ (v, r) => {
//                              let colour = "red"; // undefined;
//                              //if(colour==undefined) return v;
//                              return(<ExtReactRenderer><span style={{ color: colour }}>{v}</span></ExtReactRenderer>); }}
//                            /> );
//   }

//   //** Event Handling
//   beforeComplete = (editor, newVal, oldVal) => {
//     // loc. cell, column, columnIndex, record, recordIndex, row
//     const loc = editor.getLocation();
//     const row = loc.record.data;
//     const col = loc.column.getText();
//     this.props.onEdited(row, col, newVal, oldVal);
//   }
  
//   //** Methods
//   getTC() { return this.textColumn.current.cmp; }
  
// };
