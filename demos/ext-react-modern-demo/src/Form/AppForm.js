import React, { Component } from 'react';
import { 
  FieldSet,
  FormPanel, 
  UrlField, 
  TextField, 
  EmailField, 
  RadioField, 
  TextAreaField, 
  ToggleField, 
  SliderField, 
  DatePickerField, 
  PasswordField,
  SpinnerField,
  CheckBoxField,
  Button,
  SelectField,
  Container,
  Label,
  Toolbar
} from '@sencha/ext-modern';
import { ColorField } from '@sencha/ext-ux'
Ext.require([
  'Ext.field.InputMask', // need to require this specifically for inputMask props to work
  'Ext.ux.colorpick.*'
]);

export default class AppForm extends Component {

  constructor() {
    super();

    const color = '#00ff00';

    this.state = {
        color,
        disabled: false
    };
}

toggleDisabled() {
    this.setState({ disabled: !this.state.disabled });
}
  
  render() {
    const { disabled } = this.state;
    return (
      <Container 
      platformConfig={{
          phone: {
              layout: 'fit'
          },
          "!phone": {
              layout: 'center',
              padding: 10
          }
      }}
  >
      <FormPanel 
          shadow 
          padding="20"
          platformConfig={{
              "!phone": {
                  maxHeight: 500,
                  width: 350
              }
          }}
      >
          <FieldSet title="Personal Info" defaults={{labelAlign: "placeholder"}}>
              <TextField fieldLabel='First Name' required placeholder="This field is required" disabled={disabled}/>
              <PasswordField label="Password" required revealable disabled={disabled}/>
              <EmailField label="Email" placeholder="me@sencha.com" disabled={disabled}/>
              <TextField label="Phone Number" inputMask="(999) 999-9999" inputType="tel" disabled={disabled}/>
              <UrlField label="URL" placeholder="http://sencha.com" disabled={disabled}/>
              <SpinnerField label="Spinner" minValue={0} maxValue={1000} stepValue={1} cycle margin="15 0 0 0" labelAlign="top" disabled={disabled}/>
              <DatePickerField label="Start Date" disabled={disabled}/>
              <SelectField label="Rank"
                  disabled={disabled}
                  options={[
                      { text: 'Master', value: 'master' },
                      { text: 'Journeyman', value: 'journeyman' },
                      { text: 'Apprentice', value: 'apprentice' }
                  ]}
              />
              <TextField label="With Error" errorMessage="This field is invalid" errorTarget="under" disabled={disabled}/>
              <SliderField label="Slider" disabled={disabled}/>
              <ToggleField label="Toggle" disabled={disabled}/>
              <TextAreaField label="Bio" maxRows={5} disabled={disabled}/>
          </FieldSet>
          <FieldSet title="Roles" layout={{type: 'vbox', align: 'left'}} margin="15 0" defaults={{labelAlign: "placeholder"}}>
              <CheckBoxField disabled={disabled} boxLabel="Admin"/>
              <CheckBoxField disabled={disabled} boxLabel="Power User"/>
          </FieldSet>
          <FieldSet                      
              title="Favorite Color" 
              layout={{ type: 'vbox', align: 'left' }} 
              defaults={{
                  labelAlign: "placeholder",
                  name: 'color',
                  labelAlign: 'right',
                  labelWidth: 'auto',
                  padding: 0
              }}
          >
              <RadioField name="color" disabled={disabled} boxLabel="Red" value="red"/>
              <RadioField name="color" disabled={disabled} boxLabel="Blue" value="blue"/>
              <RadioField name="color" disabled={disabled} boxLabel="Green" value="green"/>
              <RadioField name="color" disabled={disabled} boxLabel="Purple" value="purple"/>
          </FieldSet>
          <FieldSet
              title="Second Favorite Color"
              layout={{ type: 'vbox', align: 'left'}}
              viewModel={{
                  data: {
                      color: this.state.color
                  }
              }}
          >
              <ColorField bind="{color}" xtype="colorfield" disabled={disabled} />
          </FieldSet>
          <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
              <Button text={disabled ? 'Enable All' : 'Disable All'} margin="0 10 0 0" handler={this.toggleDisabled.bind(this)}/>

          </Toolbar>
      </FormPanel>
  </Container>
    )
  }


}