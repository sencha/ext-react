import React, { Component } from 'react';
import { SearchField, TitleBar, Container, Button, Menu, MenuItem } from '@sencha/ext-react-modern';

export default class TitleBarExample extends Component {

    render() {
        return (
            <Container>
                <TitleBar title="App Title" docked="top"
                    platformConfig={{
                        phone: {
                            titleAlign: 'center'
                        }
                    }}
                >
                    <Button align="left" iconCls="x-fa fa-bars" arrow={false}>
                        {Ext.os.is.Phone && (
                            <Menu>
                                <MenuItem text="Inbox" iconCls="x-fa fa-inbox"/>
                                <MenuItem text="Profile" iconCls="x-fa fa-user"/>
                            </Menu>
                        )}
                    </Button>

                    {!Ext.os.is.Phone && (
                        <Button align="right" iconCls="x-fa fa-inbox" text="Inbox"/>
                    )}
                    {!Ext.os.is.Phone && (
                        <Button align="right" iconCls="x-fa fa-user" text="Profile"/>
                    )}
                    {!Ext.os.is.Phone && (
                        <SearchField align="right" ui="alt" placeholder="Search" margin="0 10"/>
                    )}

                    <Button align="right" iconCls="x-fa fa-ellipsis-v" arrow={false}>
                        <Menu>
                            <MenuItem text="Settings" iconCls="x-fa fa-cog"/>
                            <MenuItem text="Help" iconCls="x-fa fa-question-circle"/>
                        </Menu>
                    </Button>
                </TitleBar>

                {Ext.os.is.Phone && (
                    <SearchField ui="faded" placeholder="Search" margin="20"/>
                )}
            </Container>
        )
    }

}