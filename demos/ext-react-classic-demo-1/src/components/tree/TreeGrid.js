import React, { Component } from 'react';
import { ExtTreepanel } from "@sencha/ext-react-classic";

class TreeGrid extends Component {

  constructor() {
    super()
    this.data = {
      "text": ".",
      "children": [
        {
          "task": "Project: Shopping",
          "duration": 13.25,
          "user": "Tommy Maintz",
          "iconCls": "x-fa fa-user",
          "expanded": true,
          "children": [
            {
              "task": "Housewares",
              "duration": 1.25,
              "user": "Tommy Maintz",
              "iconCls": "x-fa fa-user",
              "children": [
                {
                  "task": "Kitchen supplies",
                  "duration": 0.25,
                  "user": "Tommy Maintz",
                  "leaf": true,
                  "iconCls": "x-fa fa-cog"
                }, {
                  "task": "Groceries",
                  "duration": 0.4,
                  "user": "Tommy Maintz",
                  "leaf": true,
                  "iconCls": "x-fa fa-cog",
                  "done": true
                }, {
                  "task": "Cleaning supplies",
                  "duration": 0.4,
                  "user": "Tommy Maintz",
                  "leaf": true,
                  "iconCls": "x-fa fa-cog"
                }, {
                  "task": "Office supplies",
                  "duration": 0.2,
                  "user": "Tommy Maintz",
                  "leaf": true,
                  "iconCls": "x-fa fa-cog"
                }
              ]
            }, {
              "task": "Remodeling",
              "duration": 12,
              "user": "Tommy Maintz",
              "iconCls": "x-fa fa-user",
              "expanded": true,
              "children": [
                {
                  "task": "Retile kitchen",
                  "duration": 6.5,
                  "user": "Tommy Maintz",
                  "leaf": true,
                  "iconCls": "x-fa fa-cog"
                }, {
                  "task": "Paint bedroom",
                  "duration": 2.75,
                  "user": "Tommy Maintz",
                  "iconCls": "x-fa fa-user",
                  "children": [
                    {
                      "task": "Ceiling",
                      "duration": 1.25,
                      "user": "Tommy Maintz",
                      "iconCls": "x-fa fa-cog",
                      "leaf": true
                    }, {
                      "task": "Walls",
                      "duration": 1.5,
                      "user": "Tommy Maintz",
                      "iconCls": "x-fa fa-cog",
                      "leaf": true
                    }
                  ]
                }, {
                  "task": "Decorate living room",
                  "duration": 2.75,
                  "user": "Tommy Maintz",
                  "leaf": true,
                  "iconCls": "x-fa fa-cog",
                  "done": true
                }, {
                  "task": "Fix lights",
                  "duration": 0.75,
                  "user": "Tommy Maintz",
                  "leaf": true,
                  "iconCls": "x-fa fa-cog",
                  "done": true
                }, {
                  "task": "Reattach screen door",
                  "duration": 2,
                  "user": "Tommy Maintz",
                  "leaf": true,
                  "iconCls": "x-fa fa-cog"
                }
              ]
            }
          ]
        }, {
          "task": "Project: Testing",
          "duration": 2,
          "user": "Core Team",
          "iconCls": "x-fa fa-user",
          "children": [
            {
              "task": "Mac OSX",
              "duration": 0.75,
              "user": "Tommy Maintz",
              "iconCls": "x-fa fa-user",
              "children": [
                {
                  "task": "FireFox",
                  "duration": 0.25,
                  "user": "Tommy Maintz",
                  "iconCls": "x-fa fa-cog",
                  "leaf": true
                }, {
                  "task": "Safari",
                  "duration": 0.25,
                  "user": "Tommy Maintz",
                  "iconCls": "x-fa fa-cog",
                  "leaf": true
                }, {
                  "task": "Chrome",
                  "duration": 0.25,
                  "user": "Tommy Maintz",
                  "iconCls": "x-fa fa-cog",
                  "leaf": true
                }
              ]
            }, {
              "task": "Windows",
              "duration": 3.75,
              "user": "Darrell Meyer",
              "iconCls": "x-fa fa-user",
              "children": [
                {
                  "task": "FireFox",
                  "duration": 0.25,
                  "user": "Darrell Meyer",
                  "iconCls": "x-fa fa-cog",
                  "leaf": true
                }, {
                  "task": "Safari",
                  "duration": 0.25,
                  "user": "Darrell Meyer",
                  "iconCls": "x-fa fa-cog",
                  "leaf": true
                }, {
                  "task": "Chrome",
                  "duration": 0.25,
                  "user": "Darrell Meyer",
                  "iconCls": "x-fa fa-cog",
                  "leaf": true
                }, {
                  "task": "Internet Explorer",
                  "duration": 3,
                  "user": "Darrell Meyer",
                  "iconCls": "x-fa fa-cog",
                  "leaf": true
                }
              ]
            }, {
              "task": "Linux",
              "duration": 0.5,
              "user": "Aaron Conran",
              "iconCls": "x-fa fa-user",
              "children": [
                {
                  "task": "FireFox",
                  "duration": 0.25,
                  "user": "Aaron Conran",
                  "iconCls": "x-fa fa-cog",
                  "leaf": true
                }, {
                  "task": "Chrome",
                  "duration": 0.25,
                  "user": "Aaron Conran",
                  "iconCls": "x-fa fa-cog",
                  "leaf": true
                }
              ]
            }
          ]
        }
      ]
    };
  }

  render() {
    return (
      <ExtTreepanel
        title = "The TreePanel"
        store = {{
          type: 'tree',
          root: this.data
        }}
        rootVisible = {false}
        headers = {true}
        columns = {[
          {
            xtype: 'treecolumn', // this is so we know which column will show the tree
            text: 'Task',
            dataIndex: 'task',
            flex: 2,
            sortable: true
          },
          {
            text: 'Duration',
            dataIndex: 'duration',
            flex: 1,
            sortable: true,
            align: 'center',
          },
          {
            text: 'Assigned To',
            dataIndex: 'user',
            flex: 1,
            sortable: true
          },
          {
            xtype: 'checkcolumn',
            header: 'Done',
            dataIndex: 'done',
            width: 55,
            stopSelection: false,
            menuDisabled: true
          },
          {
            xtype: 'actioncolumn',
            text: 'Edit',
            width: 55,
            menuDisabled: true,
            tooltip: 'Edit task',
            align: 'center',
            iconCls: 'x-fa fa-home',
          }
        ]}
      >
      </ExtTreepanel>
    )
  }
}
export default TreeGrid;