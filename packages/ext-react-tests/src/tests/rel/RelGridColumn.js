import React, { Component } from 'react';
import { Container, Grid, Column, WidgetCell, SparkLineLine } from '@sencha/ext-modern';

export default class RelGridColumn extends Component {

    store = Ext.create('Ext.data.Store', {
        data: [
            { first: 'Mark', last: 'Brocato', trend: [1,2,3,4,3,2,1] }
        ]
    });

    render() {
        return (
            <Container layout="vbox">
                <div>This tests that grid columns, cells, and widgets can be defined using children.  The test should pass if both columns show up and the sparkline is rendered.</div>
                <Grid 
                    itemId="grid"
                    flex={1}
                    store={this.store}
                    itemConfig={{
                        viewModel: {

                        }
                    }}
                >
                    <Column text="Name">
                        <Column text="First" dataIndex="first"/>
                        <Column text="Last" dataIndex="last"/>
                    </Column>
                    <Column text="Trend" dataIndex="trend">
                        <WidgetCell forceWidth>
                            <SparkLineLine itemId="sparkLine"/>
                        </WidgetCell>
                    </Column>
                </Grid>
            </Container>
        )
    }
    
}