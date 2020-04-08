import React, { Component } from 'react';
import { ExtPanel, ExtGrid } from "@sencha/ext-react-classic";
import BigDataModel from './BigData';
const Ext = window['Ext']
class App extends Component {

  
  bold(v) {
    return "<b>" + v + "</b>";
  }

  onNameFilterKeyup = () => {
    var filterField = Ext.getCmp('nameFilterField');
    var filters = this.grid.store.getFilters();
    if (filterField.value) {
        try {
          filters.remove(this.nameFilter);
        } catch(e) {}
        this.nameFilter = filters.add({
          id: 'nameFilter',
          property: 'surname',
          value: filterField.value,
          anyMatch: true,
          caseSensitive: false
        });
    }
    else if (this.nameFilter) {
        filters.remove(this.nameFilter);
        this.nameFilter = null;
    }
  }

  onBeforeRenderNoticeEditor = (editor) => {
    editor.setStore(this.grid.store.collect('noticePeriod', false, true));
  }

  renderMailto = (v) => {
    return '<a href="mailto:' + encodeURIComponent(v) + '">' +
        Ext.htmlEncode(v) + '</a>';
  }

  onGridReady = ({cmp, cmpObj}) => {
    this.grid = cmpObj['grid']
  }

  render() {
    return (
<ExtPanel viewport="true" layout="fit">
  <ExtGrid
    title="ExtReactClassic Editable Big Data Grid"
    onReady={this.onGridReady}
    extname="grid"
    columnLines={true}
    multicolumnSort
    split={true}
    viewConfig={{
      stripeRows: true
    }}
    selModel={{
      type: "checkboxmodel",
      checkOnly: true
    }}
    lockedGridConfig={{
      title: "Employees",
      header: false,
      collapsible: true,
      width: 325,
      minWidth: 290,
      forceFit: true
    }}
    store={{
      model: BigDataModel,
      autoLoad: true,
      pageSize: 0,
      groupField: 'department'
    }}
    features = {[
      {
        ftype: "groupingsummary",
        groupHeaderTpl: "{name}",
        hideGroupedHeader: false,
        enableGroupingMenu: false
      },
      {
        ftype: "summary",
        dock: "bottom"
      }
    ]}
    plugins = {{
      gridfilters: true,
      gridexporter: true,
      rowediting: {
        clicksToEdit: 1,
        clicksToMoveEditor: 1,
        autoCancel: false
      },
      rowexpander: {
        expandOnDblClick: false,
        rowBodyTpl: '<img src="{avatar}" height="100px" ' +
                    'style="float:left;margin:0 10px 5px 0"><b>{name}<br></b>{dob:date}'
      }
    }}
    columns={this.getColumns()}
  >
  </ExtGrid>
</ExtPanel>
    )
  }

  getColumns() {
    return [
      {xtype: 'rownumberer',width: 40,sortable: false,locked: true},
      {text: 'Id',sortable: true,dataIndex: 'employeeNo',groupable: false,width: 80,locked: true,editRenderer: this.bold},
      {text:'First',dataIndex:'forename',editor: {xtype: 'textfield'},locked: true},
      {
        text:'Last',
        dataIndex:'surname',
        editor: {xtype: 'textfield'},
        locked: true,
        items: {
          xtype: 'textfield',
          fieldStyle: "",
          id: 'nameFilterField',
          flex: 1,
          margin: 2,
          enableKeyEvents: true,
          listeners: {
            keyup: this.onNameFilterKeyup,
            buffer: 500
          }
        }
      },
      {text: 'Rating',width: 100,sortable: true,dataIndex: 'rating',groupable: false,xtype: 'widgetcolumn',widget: {xtype: 'sparklineline'}},
      {
        text: 'Date of birth',
        dataIndex: 'dob',
        xtype: 'datecolumn',
        groupable: false,
        width: 115,
        filter: {},
        editor: {xtype: 'datefield'},
        exportStyle: {
          alignment: {
            horizontal: 'Right'
          },
          format: 'Long Date'
        }
      },
      {
        text: 'Join date',
        dataIndex: 'joinDate',
        xtype: 'datecolumn',
        groupable: false,
        width: 120,
        filter: {},
        editor: {xtype: 'datefield'},
        exportStyle: {
          alignment: {
            horizontal: 'Right'
          },
          format: 'Long Date'
        }
      },
      {
        text: 'Notice<br>period',
        dataIndex: 'noticePeriod',
        groupable: false,
        width: 115,
        filter: {type: 'list'},
        editor: {
          xtype: 'combobox',
          listeners: {
            beforerender: this.onBeforeRenderNoticeEditor
          }
        }
      },
      {
        text: 'Email address',
        dataIndex: 'email',
        width: 200,
        groupable: false,
        renderer: this.renderMailto,
        editor: {xtype: 'textfield'}
      },
      {
        text: 'Department',
        dataIndex: 'department',
        hidden: true,
        hideable: false,
        filter: {type: 'list'}
      },
      {
        text: 'Absences',
        shrinkWrap: true,
        columns: [
          {
            text: 'Illness',
            dataIndex: 'sickDays',
            width: 100,
            groupable: false,
            summaryType: 'sum',
            summaryFormatter: 'number("0")',
            filter: {},
            align: 'right',
            editor: {xtype: 'numberfield',decimalPrecision: 0}
          },
          {
            text: 'Holidays',
            dataIndex: 'holidayDays',
            width: null, // Size column to title text
            groupable: false,
            summaryType: 'sum',
            summaryFormatter: 'number("0")',
            filter: {},
            align: 'right',
            editor: {xtype: 'numberfield',decimalPrecision: 0}
          },
          {
            text: 'Holiday Allowance',
            dataIndex: 'holidayAllowance',
            width: null, // Size column to title text
            groupable: false,
            summaryType: 'sum',
            summaryFormatter: 'number("0.00")',
            formatter: 'number("0.00")',
            filter: {},
            align: 'right',
            editor: {xtype: 'numberfield',decimalPrecision: 0}
          }
        ]
      },
      {
        text: 'Rating<br>This Year',
        dataIndex: 'ratingThisYear',
        groupable: false,
        xtype: 'widgetcolumn',
        widget: {
          xtype: 'rating',
          tip: 'Set to {tracking:plural("Star")}'
        }
      },
      {
        text: 'Salary',
        width: 155,
        sortable: true,
        dataIndex: 'salary',
        align: 'right',
        formatter: 'usMoney',
        groupable: false,
        summaryType: 'average',
        summaryFormatter: 'usMoney',
        filter: {},
        editor: {xtype: 'numberfield',decimalPrecision: 2}
      }
    ]
  }

}
export default App;