import React from 'react';
import { ExtPanel, ExtContainer, ExtButton } from "@sencha/ext-react-classic";

export default class Part1 extends React.Component {

  clickMe = ({sender, e}) => {
    console.log('click me (sender, this)')
    console.log(sender)
    console.dir(this)
  }

  render() {
    return (
      <ExtPanel title="Part 1 Panel" border layout="hbox">
        <ExtContainer html="<div>Part1</div>"/>
        <ExtButton text="clickme" onClick={ this.clickMe }></ExtButton>
        <div>Part2</div>
      </ExtPanel>
    )
  }

}
