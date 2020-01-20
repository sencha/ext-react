import React, { Component } from 'react';
import { ExtDashboard } from "@sencha/ext-react-classic";
import '../../jsx/JsxContainer';


// import JsxPart1 from '../../jsx/JsxPart1';
// import JsxPart2 from '../../jsx/JsxPart2';
// import JsxPartDefault from '../../jsx/JsxPartDefault';

class Dashboard extends Component {

  render() {
    console.log('here')
    return (
      <ExtDashboard
        title = "The Dashboard"
        maxColumns = {2}
        parts = {{

          test1: {
            viewTemplate: {
              layout: 'fit',
              border: true,
              titleCollapse: true,
              iconCls: 'x-fa fa-tasks dark-blue',
              items: [
                {xtype: 'jsxcontainer', part: 'JsxPart1', extTitle: 'hello'},
              ]
            }
          },

          test2: {
            viewTemplate: {
              layout: 'fit',
              border: true,
              titleCollapse: true,
              iconCls: 'x-fa fa-tasks dark-blue',
              items: [
                {xtype: 'jsxcontainer', part: 'JsxPart2'},
              ]
            }
          },

          test3: {
            viewTemplate: {
              layout: 'fit',
              border: true,
              titleCollapse: true,
              iconCls: 'x-fa fa-tasks dark-blue',
              items: [
                {xtype: 'jsxcontainer'},
              ]
            }
          },

          test4: {
            viewTemplate: {
              layout: 'fit',
              border: true,
              titleCollapse: true,
              iconCls: 'x-fa fa-tasks dark-blue',
              items: [
                {xtype: 'jsxcontainer'},
              ]
            }
          }

        }}
        defaultContent = {[
          {
            title: 'Test 1',
            type: 'test1',
            columnIndex: 0,
            height: 500
          },
          {
            title: 'Test 2',
            type: 'test2',
            columnIndex: 1,
            height: 500,
          },
          {
            title: 'Test 3',
            type: 'test3',
            columnIndex: 0,
            height: 500
          },
          {
            title: 'Test 4',
            type: 'test4',
            columnIndex: 1,
            height: 500,

          }
        ]}
      >

      </ExtDashboard>
    )
  }
}
export default Dashboard;