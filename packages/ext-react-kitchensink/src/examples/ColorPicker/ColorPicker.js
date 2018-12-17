import React, {Component} from 'react';
import { Panel } from '@sencha/ext-modern';
import { ColorSelector } from '@sencha/ext-ux';

Ext.require([
  'Ext.ux.colorpick.*'
]);

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

    this.setState({
      color,
      exampleLabel: this.getLabel(color)
    });
  }

  render() {
    return (
      <Panel
        autoSize
        header={{
          hidden: Ext.platformTags.phone ? true : false,
          items: [{
            xtype: 'colorbutton',
            bind: '{color}',
            width: Ext.platformTags.phone ? 25 : 15,
            height: Ext.platformTags.phone ? 25 : 15,
            listeners: {
              change: this.onChange
            }
          }]
        }}
        layout={{
          type: 'vbox',
          align: 'stretch'
        }}
        resizable
        title='Color Picker Components'
        viewModel={{
          data: {
              color: this.state.color
          }
        }}
        width={Ext.platformTags.phone ? '100%' : 600}
        xtype='color-selector'
      >
        <ColorSelector
          bind="{color}"
          xtype="colorselector"
        />
        <Panel
          title={this.state.exampleLabel}
          ui="light"
          xtype="panel"
        />
      </Panel>
    );
  };
}
