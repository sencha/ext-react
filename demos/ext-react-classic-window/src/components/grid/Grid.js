import React, { Component } from 'react';
import {ExtPanel, ExtGrid, ExtWindow, ExtForm, ExtTextfield} from '@sencha/ext-react-classic';
import Window from '../window/Window';
//import Dialog from '../dialog/Dialog';

class Grid extends Component {

  //-----------------------------------
  // State
  //-----------------------------------

  state = {
    currentRecord: undefined
  };

  //-----------------------------------
  // React Life Cycle
  //-----------------------------------

  /**
   *
   */
  constructor() {
    super();
    var data = [
      { id: 1, name: 'Marc', v: true, email: 'marc@gmail.com',priceChangePct: .25 },
      { id: 2, name: 'Nick', v: true, email: 'nick@gmail.com',priceChangePct: .35 },
      { id: 3, name: 'Andy', v: true, email: 'andy@gmail.com',priceChangePct: 1.45 }
    ];
    this.store = { xtype: 'store', data: data };
  }

  /**
   *
   */
  componentDidMount = () => {
    console.log('componentDidMount');
  };

  //-----------------------------------
  // Methods
  //-----------------------------------

  /**
   *
   */
  renderSign = (value, context) => {
    let iValue = parseInt(value);
    let color = 'red';

    console.count(`Method renderSign has been called ${value}`);

    if (iValue > 0) { color = 'green'; }
    return `<span style="color:${color};">${value}<i class="fa fa-camera-retro fa-lg"></i></span>`
  };

  /**
   *
   */
  onOpenWindow = (view, rowIndex, colIndex, item, e, record) => {
    console.log('onOpenWindow')
    this.setState({currentRecord: record.getData()});
    this.setState({currentRecord2: record.getData()});

    //this['windowref'].cmp.show()
  };

  /**
   *
   */
  onCloseWindow = () => {
    console.log('onCloseWindow')
    this.setState({currentRecord: undefined});
    this.setState({currentRecord2: undefined});
    this.setState({currentRecord3: undefined});
  };

  //-----------------------------------
  // View
  //-----------------------------------

  /**
   *
   */

//   {typeof currentRecord !== 'undefined' && <Window
//   currentRecord = {currentRecord}
//   onClose = {self.onCloseWindow}
// />}

onBoxready = () => {
  console.log('onBoxready')

};

// readyPage = ({cmp, cmpObj}) => {
//   console.log('readyPage')
//   this['window'] = cmpObj['window']
//   console.log(this['window'])
// };
//        onReady={self.readyPage}


  render() {
    const self = this;
    const {currentRecord} = self.state;
    const {currentRecord3} = self.state;

    console.count(`Render Grid has been called`);
    return (



      <ExtPanel
        layout = 'border'
        itemId = {self.props.itemId}
      >

{typeof currentRecord !== 'undefined' &&
    <Window
      currentRecord = {currentRecord}
      onClose = {self.onCloseWindow}
    />
}

   {typeof currentRecord3 !== 'undefined' &&
   <ExtWindow
   extname="window"
   ref={windowref => this.windowref = windowref}
   onBoxready = {self.onBoxready}
   closeAction='method-hide'
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
export default Grid;