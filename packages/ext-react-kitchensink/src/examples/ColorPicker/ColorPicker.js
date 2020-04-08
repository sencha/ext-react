import React, {Component} from 'react';
import { Container, Panel } from '@sencha/ext-react-modern';
import { Colorselector } from '@sencha/ext-react-modern';

// Ext.require([
//   'Ext.ux.colorpick.*'
// ]);

export default class ColorPickerExample extends Component {
  constructor(props) {
    super(props);

    this.getTitle = this.getLabel.bind(this);
    this.onChange = this.onChange.bind(this);
    const color = '0f0';
    this.state = {
      color,
      exampleLabel: this.getLabel(color)
    };

  }

  getLabel(color) {
    return `<p style="color: #${color}">Selected Color: #${color}</p>`;
  }

  onChange(picker) {
    const color = picker.getValue();

    //mjg
    // this.setState({
    //   color,
    //   exampleLabel: this.getLabel(color)
    // });
  }

  render() {
    return (
      <Container
        platformConfig={{"!phone": {height: 450,width: 550}}}
        padding={10}>
        <Panel
          width={600}
          header={{
            hidden: Ext.platformTags.phone ? true : false,
            items: [
              {
                xtype: 'colorbutton',
                bind: '{color}',
                width: Ext.platformTags.phone ? 25 : 15,
                height: Ext.platformTags.phone ? 25 : 15,
                listeners: {
                  change: this.onChange
                }
              }
            ]
          }}
          layout={{
            type: 'vbox'
          }}
          title='Color Picker Components'
          //xtype='colorselector'
          viewModel={{
            data: {
                color: this.state.color
            }
          }}>
          <Colorselector
            bind="{color}"
            //xtype="colorselector"
          />
          <Panel
            title={this.state.exampleLabel}
            ui="light"
            //xtype="panel"
          />
        </Panel>
      </Container>
    );
  };
}
