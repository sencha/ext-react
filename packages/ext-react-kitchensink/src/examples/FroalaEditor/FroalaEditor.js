import React, { Component } from 'react';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { FroalaEditorField, FormPanel } from '@sencha/ext-react-modern';

export default class DefaultGaugeExample extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    formPanelOkBtnClick = () => {
      Ext.Msg.alert('getValues()', Ext.JSON.encode(this.refs.parentFormPanelCmp.cmp.getValues()));
    }

    froalaTextChange = (ele, the) => {
      this.setState({ value: the });
      Ext.toast({ message: 'Change!' });
    }

    render() {
        const { value } = this.state;

        return (
            <FormPanel
              layout="fit"
              height="90%"
              width="95%"
              title="Ext.froala.EditorField insde a form panel"
              ref="parentFormPanelCmp"
              buttons={{
                ok: {
                    text: 'getValues()',
                    handler: this.formPanelOkBtnClick
                  }
              }}
            >
              <FroalaEditorField
                name="html"
                margin="16"
                value={this.state.value}
                listeners = {{
                  change: this.froalaTextChange,
                  'froala.click': (froalaComponent) => { Ext.toast({ message: 'Click!' }); }
                }}
                editor={{
                  autofocus: true,
                  fontSize: [10, 12, 16, 24]
                }}
              >
              </FroalaEditorField>
            </FormPanel>
        )
    }
}
