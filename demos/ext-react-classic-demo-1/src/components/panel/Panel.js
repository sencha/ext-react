import React, { Component } from 'react';
import {ExtPanel, ExtButton, ExtToolbar, ExtMenu, ExtMenuitem} from '@sencha/ext-react-classic';

class Panel extends Component {

  render() {
    return (
      <ExtPanel
        title = "The Panel"
        layout = "border"
      >
        <ExtToolbar
          region = 'north'
        >
          <ExtButton
            text = 'Button'
          >
            <ExtMenu>
              <ExtMenuitem text = 'HOLA'/>
            </ExtMenu>
          </ExtButton>
          <ExtButton
            text = 'Menu Panel'
          >
            <ExtMenu>
              <ExtPanel
                title = 'Ext Menu Tile'
              >
                <ExtButton text = 'Hola'/>
              </ExtPanel>
            </ExtMenu>
          </ExtButton>

        </ExtToolbar>
        <ExtPanel
          title = 'Center'
          region = 'center'
          border = {true}
          layout = 'accordion'
        >
          <ExtPanel title = 'Accordion 1' />
          <ExtPanel title = 'Accordion 2' />
          <ExtPanel title = 'Accordion 3' />
          <ExtPanel title = 'Accordion 4' />
        </ExtPanel>
        <ExtPanel
          title = 'East'
          region = 'east'
          width = '200'
          split = {true}
          collapsible = {true}
          tools = {[
            {
              iconCls: 'x-fa fa-home'
            }
          ]}
          bbar = {{
            xtype: 'toolbar',
            items: [
              {
                text: 'Button'
              }
            ]
          }}
        >
        </ExtPanel>
        <ExtPanel
          title = 'West'
          region = 'west'
          width = '200'
          split = {true}
          collapsible = {true}
        >
          <ExtToolbar
            dock = 'bottom'
          >
            <ExtButton
              text = 'Button'
              menu = {{
                items: [
                  {
                    xtype: 'button',
                    text: 'hola'
                  }
                ]
              }}
            >
            </ExtButton>
          </ExtToolbar>
        </ExtPanel>
      </ExtPanel>
    )
  }
}
export default Panel;