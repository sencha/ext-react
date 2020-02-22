import React, { Component } from 'react';
import {
  ExtWindow,
  ExtButton,
  ExtForm,
  ExtTbfill,
  ExtTextfield,
  ExtToolbar
} from '@sencha/ext-react-classic';
import PropTypes from 'prop-types';

class Window extends Component {

  onSave = () => {
    this.props.onClose();
  };

  render() {
    const self = this;
    let currentRecord = this.props.currentRecord || {};
    console.count(`Render Window has been called`);

    // if (this.windowref2 !== undefined) {
    //   this.windowref2.cmp.show()
    // }

    return (
      <ExtWindow
        onBeforedestroy = {this.props.onClose}
        onBoxready = {() => {console.log('onBoxready')}}
        autoShow = {true}
        closeAction='destroy'
        title = 'Current record'
        ref={windowref2 => this.windowref2 = windowref2}
        modal = {true}
        draggable = {true}
        resizable = {false}
        maximizable = {false}
        scrollable = 'y'
        layout = {{
          type: 'vbox',
          align: 'stretch'
        }}
        height = {300}
        width = {350}
      >
        <ExtForm
          trackResetOnLoad = {true}
          flex = {1}
          layout = 'anchor'
          bodyPadding = '6'
          defaults = {{
            anchor: '100%'
          }}
        >
          <ExtTextfield
            fieldLabel = 'Name'
            name = 'name'
            value = {currentRecord.name}
          />
          <ExtTextfield
            fieldLabel = 'Email'
            name = 'email'
            value = {currentRecord.email}
          />
          <ExtTextfield
            fieldLabel = '% Change'
            name = 'priceChangePct'
            value = {currentRecord.priceChangePct}
          />
        </ExtForm>
        <ExtToolbar
          ui = 'footer'
        >
          <ExtTbfill/>
          <ExtButton
            text = 'Save'
            handler = {self.onSave}
          />
        </ExtToolbar>
      </ExtWindow>
    )
  }
}
export default Window;

// -------------------------------------
// props type validations
// -------------------------------------

Window.propTypes = {
	currentRecord: PropTypes.object,
	onClose: PropTypes.func.isRequired,
};
