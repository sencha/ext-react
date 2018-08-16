import React, { Component } from 'react';
import { Container, Grid, Column, NumberField } from '@sencha/ext-modern';

Ext.require('Ext.grid.plugin.CellEditing');

export default class RelEditor extends Component {

    store = Ext.create('Ext.data.Store', {
        data: [
            { value: '1' }
        ]
    });

    render() {
        return (
            <Container layout="vbox">
                <div>This tests that fields within columns are automatically assigned as editors.</div>
                <Grid 
                    itemId="grid"
                    flex={1}
                    store={this.store}
                    plugins={{
                        gridcellediting: true
                    }}
                >
                    <Column text="Value" dataIndex="value" editable>
                        <NumberField className="editor"/>
                    </Column>
                </Grid>
            </Container>
        )
    }
    
}