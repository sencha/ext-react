import React, { Component } from 'react';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { ExtFroalaeditor, ExtFormpanel, ExtToolbar, ExtButton } from '@sencha/ext-react-modern';

export default class DefaultGaugeExample extends Component {

  formPanelOkBtnClick = () => {
    Ext.Msg.alert('getValue()', Ext.JSON.encode(this.refs.froalaeditor.cmp.getValue()));
  }

  onChange = ({sender, the}) => {
    //console.log(the)
    Ext.toast({ message: 'Change!' });
  }

  render() {
    return (
      <ExtFormpanel
        layout="fit"
        height="100%"
        width="100%"
        title="ExtFroalaeditor insde a form panel"
      >
        <ExtToolbar docked="top">
          <ExtButton
            text="Show Value"
            onTap={this.formPanelOkBtnClick}
          />
        </ExtToolbar>
        <ExtFroalaeditor
          ref="froalaeditor"
          height="100%"
          width="100%"
          name="html"
          margin="16"
          onChange={this.onChange}
          editor={{
            autofocus: true,
            fontSize: [10, 12, 16, 24]
          }}
        >
        </ExtFroalaeditor>
      </ExtFormpanel>
    )
  }
}
