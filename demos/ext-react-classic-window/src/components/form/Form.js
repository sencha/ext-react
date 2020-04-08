import React, {Component} from 'react';
import {
  // ExtCheckboxfield,
  // ExtColorfield,
  // ExtCombobox,
  // ExtDatefield,
  // ExtFieldset,
  // ExtFilefield,
  // ExtNumberfield,
  // ExtRadiofield,
  // ExtTagfield,
  // ExtTimefield,
  // ExtTextareafield,
  // ExtPanel,
  ExtForm,
  ExtTextfield,
  ExtButton
} from '@sencha/ext-react-classic';

class Form extends Component {

  render() {
    const self = this;
    const params = self.props.params || {};

    return (
      <ExtForm
        title = "The Form"
        layout = "anchor"
        itemId = {self.props.itemId}
        defaults = {{
          anchor: '100%',
          labelAlign: 'left',
        }}
      >
        <ExtTextfield
          fieldLabel = 'Name'
          name = 'name'
          value = {params.name}
        />
        <ExtTextfield
          fieldLabel = 'Email'
          name = 'email'
          value = {params.email}
          onBlur = {() => {console.count('onBlur ExtTextfield - email')}}
          onFocus = {() => {console.count('onFocus ExtTextfield - email')}}
        />
        <ExtTextfield
          fieldLabel = 'Phone Number'
          name = 'phone'
          allowBlank = {false}
          regex = {/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im}
        />
        <ExtTextfield
          fieldLabel = '% Change'
          name = 'priceChangePct'
          value = {params.priceChangePct}
        />
        <ExtButton
          text={'close'}
          handler={self.props.onClose}
        />
      </ExtForm>
    )
  }
}
export default Form;