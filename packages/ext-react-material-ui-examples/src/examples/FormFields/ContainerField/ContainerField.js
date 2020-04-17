import React, { Component } from 'react';
import { ContainerField, FormPanel, RadioField, Container, Panel, CheckBoxField, TextField } from '@sencha/ext-react-modern';

export default class ContainerFieldExample extends Component {

    render() {
        return (
            <Container layout="vbox" padding="10" maxWidth="660">
                <Panel ui="instructions" margin="0 0 20 0" shadow>
                    <div><b>ContainerField</b> allows you to apply a single label to multiple fields. This is especially useful for groups of checkboxes, radio buttons, and other compound fields.</div>
                </Panel>
                <FormPanel layout="form" shadow defaults={{labelAlign: 'left', labelTextAlign: 'right'}}>
                    <ContainerField label="Name" layout={Ext.os.is.Phone ? 'vbox' : 'hbox'} defaults={{labelAlign: 'bottom'}}>
                        <TextField label="First"/>
                        <TextField label="Middle"/>
                        <TextField label="Last"/>
                    </ContainerField>
                    <ContainerField label="Vehicle Class" layout={{type: 'vbox', align: 'left'}} defaults={{ margin: '0' }}>
                        <RadioField boxLabel="Compact" name="priority"/>
                        <RadioField boxLabel="Mid-size" name="priority"/>
                        <RadioField boxLabel="SUV" name="priority"/>
                    </ContainerField>
                    <ContainerField label="Options" layout={{type: 'vbox', align: 'left'}}>
                        <CheckBoxField boxLabel="A/C"/>
                        <CheckBoxField boxLabel="Leather"/>
                        <CheckBoxField boxLabel="Nav"/>
                    </ContainerField>
                </FormPanel>
            </Container>
        )
    }

}