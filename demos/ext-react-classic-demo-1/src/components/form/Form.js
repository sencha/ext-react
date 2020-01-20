import React, {Component} from 'react';
import {
  ExtCheckboxfield,
  ExtColorfield,
  ExtCombobox,
  ExtDatefield,
  ExtFieldset,
  ExtFilefield,
  ExtForm,
  ExtNumberfield,
  ExtRadiofield,
  ExtTagfield,
  ExtTextfield,
  ExtTimefield,
  ExtTextareafield
} from '@sencha/ext-react-classic';

class Form extends Component {

  render() {
    return (
      <ExtForm
        title = "The Form"
        layout = "anchor"
        defaults = {{
          anchor: '100%',
          labelAlign: 'left',
        }}
      >
        <ExtTextfield
          fieldLabel = 'Textfield'
          afterLabelTextTpl = {[
            '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
          ]}
        />
        <ExtNumberfield
          fieldLabel = 'Numberfield'
        />
        <ExtCheckboxfield
          fieldLabel = 'Checkboxfield'
        />
        <ExtRadiofield
          fieldLabel = 'Radiofield'
        />
        <ExtTextareafield
          fieldLabel = 'TextareaField'
          grow = {true}
        />
        <ExtCombobox
          fieldLabel = 'Combobox'
          store = {{
            fields: ['value', 'text'],
            data : [
              ['dark-blue-theme', 'Dark Blue'],
              ['blue-theme', 'Blue'],
              ['light-blue-theme', 'Light Blue'],
              ['dark-grey-theme', 'Dark Gray'],
              ['medium-grey-theme', 'Medium Gray'],
              ['light-grey-theme', 'Light Gray'],
              ['green-theme', 'Green'],
              ['light-green-theme', 'Light Green'],
              ['red-theme', 'Red'],
              ['orange-theme', 'Orange'],
              ['yellow-theme', 'Yellow'],
              ['white-theme', 'White']
            ]
          }}
        />
        <ExtTagfield
          fieldLabel = 'Tagfield'
          store = {{
            fields: ['value', 'text'],
            data : [
              ['dark-blue-theme', 'Dark Blue'],
              ['blue-theme', 'Blue'],
              ['light-blue-theme', 'Light Blue'],
              ['dark-grey-theme', 'Dark Gray'],
              ['medium-grey-theme', 'Medium Gray'],
              ['light-grey-theme', 'Light Gray'],
              ['green-theme', 'Green'],
              ['light-green-theme', 'Light Green'],
              ['red-theme', 'Red'],
              ['orange-theme', 'Orange'],
              ['yellow-theme', 'Yellow'],
              ['white-theme', 'White']
            ]
          }}
        />
        <ExtFieldset
          title = 'FieldSet'
          layout = "anchor"
          padding = '0 8'
          collapsible = {true}
          defaults = {{
            anchor: '100%',
            labelAlign: 'left',
          }}
        >
          <ExtColorfield
            fieldLabel = 'Colorfield'
          />
          <ExtDatefield
            fieldLabel = 'Datefield'
          />
          <ExtTimefield
            fieldLabel = 'Timefield'
          />
          <ExtFilefield
            fieldLabel = 'Filefield'
          />
        </ExtFieldset>
      </ExtForm>
    )
  }
}
export default Form;