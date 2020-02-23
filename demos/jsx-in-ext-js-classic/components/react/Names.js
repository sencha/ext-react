import React from 'react';
import {ExtPanel, ExtGrid, ExtWindow, ExtForm, ExtTextfield} from '@sencha/ext-react-classic';

export default class Names extends React.Component {

  state = {
    currentRecord: undefined
  };

  constructor() {
    super();
    var data = [
      { id: 1, name: 'Marc', v: true, email: 'marc@gmail.com',priceChangePct: .25 },
      { id: 2, name: 'Nick', v: true, email: 'nick@gmail.com',priceChangePct: .35 },
      { id: 3, name: 'Andy', v: true, email: 'andy@gmail.com',priceChangePct: 1.45 }
    ];
    this.store = { xtype: 'store', data: data };
  }

  onOpenWindow = (view, rowIndex, colIndex, item, e, record) => {
    console.log('onOpenWindow')
    this.setState({currentRecord: record.getData()});
  };

  onBoxready = () => {
    console.log('onBoxready')
  };

  onCloseWindow = () => {
    console.log('onCloseWindow')
    this.setState({currentRecord: undefined});
  };

  renderSign = (value, context) => {
    let iValue = parseInt(value);
    let color = 'red';

    console.count(`Method renderSign has been called`);

    if (iValue > 0) { color = 'green'; }
    return `<span style="color:${color};">${value}<i class="fa fa-camera-retro fa-lg"></i></span>`
  };

  render() {
    const self = this;
    const {currentRecord} = self.state;

    console.count(`Render Grid has been called`);
    return (
      <ExtPanel
        layout = 'fit'
        itemId = {self.props.itemId}
      >

   {typeof currentRecord !== 'undefined' &&
   <ExtWindow
   extname="window"
   ref={windowref => this.windowref = windowref}
   onBoxready = {self.onBoxready}
   onBeforedestroy = {this.onCloseWindow}
   closeAction='destroy'
   title = 'Current record'
   modal = {true}
   draggable = {true}
   resizable = {false}
   maximizable = {false}
   scrollable = 'y'
   layout = {{
     type: 'vbox',
     align: 'stretch'
   }}
   height = {300}
   width = {350}
   autoShow = {true}
   >
    <ExtForm
      trackResetOnLoad = {true}
      flex = {1}
      layout = 'anchor'
      bodyPadding = '6'
      defaults = {{
        anchor: '100%'
      }}
    >
      <ExtTextfield
        fieldLabel = 'Name'
        name = 'name'
        value = {currentRecord.name}
      />
    </ExtForm>
  </ExtWindow>
  }

        <ExtGrid
          title = "The Grid2"
          region = 'center'
          store = { this.store }
          plugins = {'gridfilters'}
          onRowdblclick = {self.props.onRowDblClick}
          viewConfig = {{
            markDirty: false,
            enableTextSelection: true,
            emptyText: 'No records to display'
          }}
          columns={[
            {text: "name", dataIndex: "name"},
            {text: "email", dataIndex: "email", width: 200},
            //{text: "Email 2", dataIndex: "email", width: 200},
            {
              xtype: 'actioncolumn',
              menuDisabled: true,
              width: 40,
              iconCls: 'x-fa fa-envelope',
              handler: self.onOpenWindow
            },
            {text: "% Change", dataIndex: "priceChangePct", align: "right", producesHTML: false, renderer: self.renderSign}
          ]}
        >
          {/*<ExtToolbar
            dock = 'top'
          >
            <ExtButton
              text = 'test'
            />
          </ExtToolbar>*/}
        </ExtGrid>
        <ExtPanel
          title = 'Panel with split'
          region = 'west'
          split = {true}
          collapsible = {true}
          width = {300}
        ></ExtPanel>
      </ExtPanel>
    );
  }

}
