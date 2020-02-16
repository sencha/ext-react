import React, { Component } from 'react';
import {
  ExtPanel,
  ExtButton,
  ExtToolbar,
  ExtGrid,
  ExtForm,
  ExtTextfield
} from '@sencha/ext-react-classic';

class LatestIssues extends Component {

  constructor() {
    super()
    var data=[
      { name: 'Marc', v: true, email: 'marc@gmail.com',priceChangePct: .25 },
      { name: 'Nick', v: true, email: 'nick@gmail.com',priceChangePct: .35 },
      { name: 'Andy', v: true, email: 'andy@gmail.com',priceChangePct: 1.45 }
    ]
    this.store = { xtype: 'store', data: data }
  }

  renderSign = (value, context) => {
    var iValue = parseInt(value);
    var color;
    if (iValue > 0) { color = 'green'; }
    else { color = 'red'; }
    return `<span data-qtip = "Hola" style="color:${color};">
    ${value}
    <i class="fa fa-camera-retro fa-lg"></i>
    </span>`
  }

  btnHandler = () => {
    alert('testing');
  };

  render() {
    return (
      <ExtPanel
        title = "Latest Issues"
        layout = {'border'}
        dockedItems = {[
          {
            xtype: 'toolbar',
            dock: 'top',
            items: {
              text: 'Button with no handler',
            }
          },
          {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
              {
                text: 'Button with handler, handler not working  and with webpack, the toolbar is not rendering',
                handler: this.btnHandler // FIXME - handler not working  and with webpack, the toolbar is not rendering
              }
            ]
          }
        ]}
      >
        <ExtGrid
          title = 'Grid -> Testing locks (Its working, I take it back)'
          region = 'center'
          store = { this.store }
          enableLocking = {true}
          columns={[
            {text: "name", dataIndex: "name", locked: true,},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "email", dataIndex: "email", width: 200},
            {text: "% Change", dataIndex: "priceChangePct", align: "right", producesHTML: false, renderer: this.renderSign}
          ]}
        >

        </ExtGrid>
        <ExtForm
          title = 'Form -> Testing Defaults (Its working, I take it back)'
          region = 'west'
          layout = 'anchor'
          width = {400}
          collapsible = {true}
          defaults = {{
            anchor: '100%',
            allowBlank: false,
            afterLabelTextTpl: [
              '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ]
          }}
        >
          <ExtTextfield
            fieldLabel = 'Textfield'
            triggers = {{
              clean: {
                cls: 'x-fa fa-times',
                handler: (comp) => {
                  alert('executed') // FIXME trigger handler not working
                }
              }
            }}
          />
          <ExtTextfield
            fieldLabel = 'Textfield 1'
          />
          <ExtTextfield
            fieldLabel = 'Textfield 2'
          />
          <ExtTextfield
            fieldLabel = 'Textfield 3'
          />
        </ExtForm>
        <ExtPanel
          title = 'Panel -> DIV inside panel (Div not rendering)'
          region = 'east'
          layout = 'fit'
          width = {400}
          collapsible = {true}
        >
          <div>This is a pure HTML inside a panel</div> // FIXME - html not rendering
        </ExtPanel>
        <ExtToolbar
          dock = 'bottom'
          region = 'south'
        >
          <ExtButton
            text = 'Button inside toolbar declared as React - working'
            handler = {this.btnHandler}
          />
        </ExtToolbar>
      </ExtPanel>
    )
  }
}
export default LatestIssues;