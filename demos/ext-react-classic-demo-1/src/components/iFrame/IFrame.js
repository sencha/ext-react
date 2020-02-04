import React, {Component} from 'react';
import {
  ExtPanel, ExtUxiframe
} from '@sencha/ext-react-classic';

class IFrame extends Component {

  extReactDidMount = detail => {
    console.log(' ExtUxiframe extReactDidMount')
    detail.cmp.load('https://www.youtube.com/embed/hoY19ZFRbeE')
  }


  render() {
    return (
      <ExtPanel
        title = "The iFrame"
        layout = 'fit'
      >
        <ExtUxiframe
          boxReady = { this.extReactDidMount }
        />
      </ExtPanel>
    )
  }
}
export default IFrame;