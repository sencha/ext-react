import React from 'react';
import { Container, Panel, FormPanel, TextField } from '@sencha/ext-react-modern';


export default function FormLayoutExample() {
    return (
        <Container padding={Ext.os.is.Phone ? 20 : 30}>
            <Panel shadow ui="instructions" margin="0 0 30 0">
                <div>
                    A <b>form</b> layout renders a single column of form fields, all with the same label width.
                    The default behavior is to size all labels to the width of the label with the longest
                    text, but the width of the labels can also be configured.
                </div>
            </Panel>
            <Container><div style={styles.heading}>labelTextAlign="left" (default)</div></Container>
            <FormPanel layout="form" shadow margin="0 0 30 0" defaults={{labelAlign: 'left'}}>
                <TextField label="First Name" labelTextAlign="left"/>
                <TextField label="Last Name" labelTextAlign="left"/>
                <TextField label="Bank Account Number" labelTextAlign="left"/>
            </FormPanel>
            <Container><div style={styles.heading}>labelTextAlign="right"</div></Container>
            <FormPanel layout="form" shadow defaults={{labelAlign: 'left'}}>
                <TextField label="First Name" labelTextAlign="right"/>
                <TextField label="Last Name" labelTextAlign="right"/>
                <TextField label="Title" labelTextAlign="right"/>
            </FormPanel>
        </Container>
    )
}

const styles = {
  heading: {
      fontSize: '14px',
      fontFamily: 'Menlo, Courier',
      margin: '10px 0 10px 0'
  }
}