import React, { Component } from 'react';
import { TabPanel, Container, Toolbar, Button } from '@sencha/ext-react-modern';

export default class Closable extends Component {

    nextKey = 0;

    state = {
        tabs: [
            this.nextKey++,
            this.nextKey++,
            this.nextKey++
        ]
    }

    onCloseTab = tab => {
        const tabs = this.state.tabs.filter(t => t !== tab);
        this.setState({ tabs })
    }

    addTab = () => {
        const key = this.nextKey++;
        const tabs = [...this.state.tabs, key];
        this.setState({ tabs })
        this.tabPanel.cmp.setActiveItem(tabs.indexOf(key))
        return false;
    }

    render() {
        const { tabs } = this.state;

        return (
            <Container layout="fit" padding={10}>
                <TabPanel
                    ref={tp => this.tabPanel = tp}
                    _extreactIgnoreOrder
                    shadow
                    style={{ backgroundColor: 'white'}}
                    activeItem={0}
                    tabBar={{
                        height: 48,
                        layout: {
                            pack: 'left'
                        },
                        style: {
                            paddingRight: '52px'
                        }
                    }}
                >
                    { tabs.map(key => (
                        <Container
                            title={`Tab ${key}`}
                            tab={{ flex: 1, maxWidth: 150 }}
                            key={key}
                            layout="center"
                            closable
                            onDestroy={this.onCloseTab.bind(this, key)}
                        >
                            <Container style={{ whiteSpace: 'nowrap' }} html={`Tab ${key} Content`}></Container>
                        </Container>
                    ))}
                </TabPanel>
                <Button
                    top={18}
                    right={20}
                    iconCls="x-fa fa-plus"
                    handler={this.addTab}
                    ui="alt round"
                    tooltip="New Tab"
                />
            </Container>
        )
    }

}