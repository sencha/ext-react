import React, { Component } from 'react';
import { ExtWindow, ExtTextfield, ExtButton } from '@sencha/ext-react-classic';

export default class Person extends Component {

  save = () => {
    console.log('save')
    //const { name, email } = this.refs;
    //console.log(name)
    //console.log(this.name.cmp)
    this.props.onSave({
      id: this.props.person.id,
      name: this.name.cmp.getValue(),
      email: this.email.cmp.getValue()
    });
  }

  render() {
    const { person, onClose } = this.props;
    return (
      <ExtWindow
        key={person.id}
        height={500}
        width={700}
        title="Edit Person"
        autoShow={true}
        modal={true}
        layout="anchor"
        bodyPadding={20}
        onClose={onClose}
      >
        <ExtTextfield ref={name => this.name = name} fieldLabel="Name" value={person.name} anchor="100%"/>
        <ExtTextfield ref={email => this.email = email} fieldLabel="Email" value={person.email} anchor="100%"/>
        <ExtButton onClick={this.save} text="save"></ExtButton>
      </ExtWindow>
    )
  }

}