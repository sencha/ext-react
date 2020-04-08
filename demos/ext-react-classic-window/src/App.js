import React, { Component } from 'react';
import { ExtContainer } from '@sencha/ext-react-classic'
//import Grid from './components/grid/Grid'
import Card from './components/card/Card';

// Enable responsiveConfig app-wide. You can remove this if you don't plan to build a responsive UI.
const Ext = window['Ext']
Ext.require('Ext.plugin.Responsive');
export default class App extends Component {

  //-----------------------------------
  // State
  //-----------------------------------

  state = {
  };

  // ---------------------------------
  // Lifecycle Methods
  // ---------------------------------

  /**
   *
   */
  componentDidMount () {
  }

  //-----------------------------------
  // Handlers
  //-----------------------------------


  //-----------------------------------
  // View
  //-----------------------------------

  render() {
    //const self = this;

    return (
      <ExtContainer
        layout = 'fit'
        viewport = {true}
      >
        <Card/>
      </ExtContainer>
    )
  }
}