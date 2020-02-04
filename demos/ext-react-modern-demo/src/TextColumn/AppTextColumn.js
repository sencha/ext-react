import React, { Component } from 'react';
import { Grid, Column, TextColumn, ExtReactRenderer } from '@sencha/ext-modern';

export default class AppTextColumn extends Component {

    store = {
        autoLoad: true,
        fields: ['name', 'email', 'phone'],
        data: [
            { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
            { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
            { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
            { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
        ]
    }

    beforeComplete = (editor, newVal, oldVal) => {
        console.log('beforeComplete')
    }

    render() {
        const cols = ['name','email','phone'];
        return (
            <Grid store={this.store} title="Grid Cell Editing" plugins={{"gridcellediting": "true"}}>
                { Object.keys(cols).map((col, i) => (
                <Column
                    key={i}
                    editable={true} 
                    text={cols[col]}
                    dataIndex={cols[col]}
                />
                ))}
                <TextColumn
                    ref={this.textColumn}
                    text={'name'}
                    dataIndex={'name'}
                    editable={true} 
                    editor={{
                        xtype:'celleditor',
                        field:'textfield',
                        listeners:{ beforecomplete: this.beforeComplete}
                    }}
                    renderer={ (v, r) => {
                        let colour = "red"; 
                        return(<ExtReactRenderer><span style={{ color: colour }}>{v}</span></ExtReactRenderer>);
                    }}
                />
            </Grid>
        )
    }
}