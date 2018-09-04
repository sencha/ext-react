import React, { Component } from 'react';
import { Window, TextField } from '@sencha/ext-classic';

export default class Person extends Component {
    
    save = () => {
        const { name, email } = this.refs;

        this.props.onSave({ 
            id: this.props.person.id,
            name: name.cmp.getValue(),
            email: email.cmp.getValue()
        });
    }

    render() {
        const { person, onClose } = this.props;

        return (
            <Window
                key={person.id}
                height={500} 
                width={700} 
                title="Edit Person"
                autoShow={true}
                modal={true}
                layout="anchor"
                bodyPadding={20}
                onClose={onClose}
                buttons={[{
                    text: 'Save',
                    handler: this.save
                }]}
            >
                <TextField ref="name" fieldLabel="Name" value={person.name} anchor="100%"/>
                <TextField ref="email" fieldLabel="Email" value={person.email} anchor="100%"/>
            </Window>
        )
    }

}