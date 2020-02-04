import React, { Component } from 'react';
import { FormPanel, Container, FieldSet, TextField, CheckBoxField, RadioField, Button, CheckboxGroup, Component as CMP } from '@sencha/ext-react-modern';
import './CheckBoxGroup.scss';

export default class CheckBocGroupExample extends Component {
  onSaveFormClick = () => {
        if (this.form.cmp.isValid()) {
            Ext.Msg.alert(
                'Form completed',
                'Form values will be sent to the server'
            );
        }
        else {
            Ext.Msg.alert(
                'Form incomplete',
                'You must fill out the form with valid values'
            );
        }
  }
    render() {
        const isPhone = Ext.os.is.Phone;
        return (
            <FormPanel
              title="Checkbox Group Example"
              bodyPadding="20"
              scrollable={isPhone ? 'y' : false}
              maxHeight={1400}
              width={isPhone ? undefined: 750}
              autoSize={true}
              ref={form => this.form = form}
            >
              <Container
                layout={{type: 'box', vertical: 'false'}}
                responsiveConfig={{
                  "width < 565": {
                    "height": 500,
                    "layout": {
                      vertical: true
                    }
                  },
                  "width >= 565": {
                    "height": 200,
                    "layout": {
                      vertical: false
                    }
                  }
                }}
              >
                <FieldSet
                  title="Individual Checkboxes"
                  defaultType="checkbox"
                  layout="form"
                  padding="0"
                  flex="1"
                  height={isPhone ? 220 : 190}
                >
                <CheckBoxField
                  boxLabel="Dog"
                  checked={true}
                  label="Favorite Animals"
                  name="fav-animal-dog"
                  inputValue="dog"
                >
                </CheckBoxField>
                <CheckBoxField
                  boxLabel="Cat"
                  checked={true}
                  disabled={true}
                  name="fav-animal-cat"
                  inputValue="cat"
                >
                </CheckBoxField>
                <CheckBoxField
                  boxLabel="Monkey"
                  name="fav-animal-monkey"
                  inputValue="monkey"
                >
                </CheckBoxField>
                </FieldSet>
                <CMP width={10}></CMP>
                <FieldSet
                  title="Individual Radios"
                  defaultType="radio"
                  layout="form"
                  padding="0"
                  flex="1"
                >
                <RadioField
                  boxLabel="Red"
                  checked={true}
                  label="Favorite Color"
                  name="fav-color"
                  inputValue="red"
                >
                </RadioField>
                <RadioField
                  boxLabel="Blue"
                  checked={true}
                  disabled={true}
                  name="fav-color"
                  inputValue="blue"
                >
                </RadioField>
                <RadioField
                  boxLabel="Green"
                  name="fav-color"
                  inputValue="green"
                >
                </RadioField>
                </FieldSet>
              </Container>
              <FieldSet
                title="Checkbox Groups"
              >
                <CheckboxGroup
                  label="Auto Layout:"
                  cls="x-check-group-alt"
                  labelAlign="left"
                  labelWidth={120}
                  margin="10"
                  items={[
                    { label: 'Item 1', name: 'cb-auto-1' },
                    { label: 'Item 2', name: 'cb-auto-2' },
                    { label: 'Item 3', name: 'cb-auto-3' },
                    { label: 'Item 4', name: 'cb-auto-4' }
                  ]}
                >
                </CheckboxGroup>
                <CheckboxGroup
                  label="Single Column:"
                  width={250}
                  labelAlign="left"
                  labelWidth={120}
                  margin="10"
                  items={[
                    { label: 'Item 1', name: 'cb-auto-1' },
                    { label: 'Item 2', name: 'cb-auto-2' },
                    { label: 'Item 3', name: 'cb-auto-3' }
                  ]}
                >
                </CheckboxGroup>
                <CheckboxGroup
                  label="Multi-Column<br />(horizontal):"
                  cls="x-check-group-alt"
                  labelAlign="left"
                  labelWidth={120}
                  margin="10"
                  responsiveConfig={{
                    "width < 565": {
                      width: "100%"
                    },
                    "width >= 565": {
                      width: "490"
                    }
                  }}
                  items={[
                    { label: 'Item 1', name: 'cb-horiz-1' },
                    { label: 'Item 2', name: 'cb-horiz-2' },
                    { label: 'Item 3', name: 'cb-horiz-3' },
                    { label: 'Item 4', name: 'cb-horiz-4' },
                    { label: 'Item 5', name: 'cb-horiz-5' },
                    { label: 'Item 6', name: 'cb-horiz-6' }
                  ]}
                  hidden={isPhone}
                >
                </CheckboxGroup>
                <CheckboxGroup
                  label="Multi-Column<br />(vertical):"
                  vertical={true}
                  height={90}
                  labelAlign="left"
                  labelWidth={120}
                  margin="10"
                  responsiveConfig={{
                    "width < 565": {
                      vertical: false,
                      height: "auto"
                    },
                    "width >= 565": {
                      vertical: true,
                      height: 90
                    }
                  }}
                  items={[
                    { label: 'Item 1', name: 'cb-vert-1' },
                    { label: 'Item 2', name: 'cb-vert-2' },
                    { label: 'Item 3', name: 'cb-vert-3' },
                    { label: 'Item 4', name: 'cb-vert-4' },
                    { label: 'Item 5', name: 'cb-vert-5' },
                    { label: 'Item 6', name: 'cb-vert-6' }
                  ]}
                  hidden={isPhone}
                >
                </CheckboxGroup>
                <CheckboxGroup
                  label="Multi-Column<br />(custom widths):"
                  cls="x-check-group-alt"
                  labelAlign="left"
                  labelWidth={120}
                  margin="10"
                  responsiveConfig={{
                    "width < 565": {
                      vertical: false,
                      height: "auto"
                    },
                    "width >= 565": {
                      vertical: true,
                      height: 110
                    }
                  }}
                  items={[
                    { label: 'Item 1', name: 'cb-custwidth', inputValue: 1 },
                    { label: 'Item 2', name: 'cb-custwidth', inputValue: 2 },
                    { label: 'Item 3', name: 'cb-custwidth', inputValue: 3 },
                    { label: 'Item 4', name: 'cb-custwidth', inputValue: 4, width: 100 },
                    { label: 'Item 5', name: 'cb-custwidth', inputValue: 5, width: 100 }
                  ]}
                  hidden={isPhone}
                >
                </CheckboxGroup>
                <CheckboxGroup
                  label="Multi-Column<br />(custom widths):"
                  cls="multi-column-checkbox-group"
                  vertical={true}
                  errorTarget="side"
                  required={true}
                  height={120}
                  hidden={isPhone}
                  margin="10"
                  labelAlign="left"
                  labelWidth={120}
                >
                  <Container
                    width={140}
                    height={120}
                  >
                    <CMP html="Heading 1" padding="0 2"></CMP>
                    <CheckBoxField labelAlign="right" label="Item 1" name="cb-cust-1"></CheckBoxField>
                    <CheckBoxField labelAlign="right" label="Item 2" name="cb-cust-2"></CheckBoxField>
                  </Container>
                  <Container
                    width={180}
                    height={120}
                  >
                    <CMP html="Heading 2" padding="0 2"></CMP>
                    <CheckBoxField labelAlign="right" label="A long item just for fun" name="cb-cust-3"></CheckBoxField>
                  </Container>
                  <Container
                    width={140}
                    height={120}
                  >
                    <CMP html="Heading 3" padding="0 2"></CMP>
                    <CheckBoxField labelAlign="right" label="Item 4" name="cb-cust-4"></CheckBoxField>
                    <CheckBoxField labelAlign="right" label="Item 5" name="cb-cust-5"></CheckBoxField>
                  </Container>
                </CheckboxGroup>
              </FieldSet>
              <Container>
                <Button text="Save" onTap={this.onSaveFormClick.bind(this)}>
                </Button>
                <Button text="Reset" handler={() => this.form.cmp.reset()}>
                </Button>
              </Container>
          </FormPanel>
        )
    }
}
