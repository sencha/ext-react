import React, { Component } from 'react';
import { Panel, TreeList, Toolbar, SegmentedButton, Button } from '@sencha/ext-react-modern';
import data from './data';

export default class TreeListExample extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        rootVisible: true,
        root: data
    });

    state = {
        nav: true,
        micro: false,
        width: undefined
    };

    toggleNav = (button, nav) => {
        this.setState({ nav });
    }

    toggleMicro = (button, micro) => {
        this.setState({
            micro,
            nav: micro || this.state.nav,
            width: micro ? 56 : undefined
        });
    }

    render() {
        const { micro, nav, width } = this.state;

        return (
            <Panel
                shadow={!Ext.os.is.Phone}
                scrollable
                platformConfig={{
                    "!phone": {
                        width: 300,
                        height: 500
                    }
                }}
            >
                <Toolbar docked="top">
                    <SegmentedButton allowMultiple>
                        <Button ui="default-toolbar" text="Nav" pressed={nav} onPressedChange={this.toggleNav} disabled={micro}/>
                        <Button ui="default-toolbar" text="Micro" pressed={micro} onPressedChange={this.toggleMicro}/>
                    </SegmentedButton>
                </Toolbar>
                <TreeList
                    ref="tree"
                    width={width}
                    expanderOnly={false}
                    store={this.store}
                    micro={micro}
                    expanderFirst={!nav}
                    ui={nav ? 'nav' : null}
                />
            </Panel>
        )
    }
}