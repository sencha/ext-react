import React, { Component } from 'react';
import { Panel, Container, Button, Searchfield, Titlebar } from '@sencha/ext-react-modern'

export default class SearchFieldExample extends Component {

    render() {
        return (
            <Container width="600" layout="vbox" padding={20}
                platformConfig={{
                    phone: {
                        width: '100%'
                    }
                }}
            >
                <Container style={styles.heading}>alt</Container>
                <Titlebar title="TitleBar" maxWidth="600" margin="0 0 30 0">
                    <Searchfield
                        align="right"
                        ui="alt"
                        width="200"
                        placeholder="Search"
                    />
                </Titlebar>

                <Container style={styles.heading}>faded</Container>
                <Container layout="vbox" padding="20 20" style={{backgroundColor: 'white'}} margin="0 0 30 0" shadow>
                    <Searchfield
                        ui="faded"
                        placeholder="Search"
                    />
                </Container>

                <Container style={styles.heading}>solo</Container>
                <Container layout="hbox" padding="20 20" style={{backgroundColor: '#F0F0F0'}} shadow>
                    {/*
                        @include textfield-ui(
                            $ui: 'ks-search-right-trigger',
                            $input-padding: 10px 10px 10px 15px,
                            $input-padding-big: 7px 7px 7px 15px
                        );
                    */}
                    <Searchfield
                        ui="solo ks-search-right-trigger"
                        shadow
                        placeholder="Search"
                        margin="0 10 0 0"
                        triggerAlign="right"
                        triggers={{
                            search: {
                                type: 'search',
                                side: 'right'
                            }
                        }}
                        flex={1}
                    />
                    <Button
                        iconCls="x-fa fa-arrow-right"
                        ui="action round raised"
                        height={36}
                        width={36}
                        platformConfig={{
                            phone: {
                                height: 40,
                                width: 40
                            }
                        }}
                    />
                </Container>
            </Container>
        )
    }

}

const styles = {
    heading: {
        fontSize: '13px',
        fontFamily: 'Menlo, Courier',
        margin: '0 0 8px 0'
    }
}
