import React from 'react';
import { ExtButton } from "@sencha/ext-react-classic";

export default class JsxPart4 extends React.Component {

  // clickMe = () => {
  //   console.log('click me')
  // }

  clickMe({sender, e}) {
    console.log('click me')
    console.log('sender')
    console.log(sender)
    console.log('this')
    console.dir(this)
  }

  render() {
    return (
      <div>
        <div>JsxPart4</div>
        <ExtButton text="clickme" shadow onClick={ this.clickMe.bind(this) }></ExtButton>
        <div>JsxPart4</div>
      </div>
    )
  }
}
