import React, { Component } from 'react';
import { ExtContainer, ExtPanel, ExtButton } from '@sencha/ext-react-modern';

class JsxPart1 extends Component {

  render() {
    console.log('render')
    return (
      <div>hi</div>
      // <ExtContainer layout="fit" padding="10" fitToParent="true">
      //   <ExtPanel
      //     title={this.props.theTitle}
      //     border="true"
      //     layout="vbox"
      //   >
      //     <ExtButton text="button 1"/>
      //     <ExtButton text="button 2"/>
      //   </ExtPanel>
      // </ExtContainer>
    )
  }

}
export default JsxPart1;