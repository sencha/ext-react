import React, { Component } from 'react';
import { Container, Grid, Column, Toolbar, Button } from '@sencha/ext-modern';

export default class RelArrayDelete extends Component {

    store = Ext.create('Ext.data.Store', {
        data: [
            { first: 'Mark', last: 'Brocato' }
        ]
    });

    state = {
        showLastName: true
    }

    toggleLastName = () => {
        this.setState({ showLastName: !this.state.showLastName });
    }

    render() {
        const { showLastName } = this.state;

        return (
            <Container layout="vbox">
                <Container> 
                 <div>This tests that children which are mapped to array configs can be added and removed</div>
                </Container>
                <Toolbar docked="top">
                    <Button handler={this.toggleLastName} text="Toggle Last Name"/>
                </Toolbar>
                <Grid 
                    itemId="grid"
                    flex={1}
                    store={this.store}
                    itemConfig={{
                        viewModel: {

                        }
                    }}
                >
                    <Column text="First" dataIndex="first"/>
                    { showLastName && <Column itemId="lastName" text="Last" dataIndex="last"/>
                }
                { showLastName && <Column itemId="lastName1" text="Last" dataIndex="last"/>
                }
                </Grid>
            </Container>
        )
    }
    
}