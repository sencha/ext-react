import React, { Component } from 'react';
import { FormPanel, Panel, Button, Sheet, Container, SegmentedButton, Label, TitleBar } from '@sencha/ext-react-modern';

export default class MenuExample extends Component {

    state = {
        direct: 'left',
        modal: true,
        reveal: false,
        displayed: false
    };

    toggleMenu = () => {
        this.setState({
            displayed: !this.state.displayed
        })
    }

    render() {
        const { displayed, direct, modal, reveal } = this.state;

        const formFieldDefaults = {
            margin: '0 0 10 0'
        };

        const menuItemDefaults = {
            width: direct === 'left' || direct === 'right' ? 250 : undefined
        };

        return (
            <Container padding={10} maxWidth="500">
                <Sheet
                    side={direct}
                    modal={modal}
                    reveal={reveal}
                    displayed={displayed} onHide={() => this.setState({ displayed: false })}
                    layout="vbox"
                    padding="15 0"
                >
                    <Button text="Settings" iconCls="x-fa fa-gear" handler={this.toggleMenu} {...menuItemDefaults}/>
                    <Button text="New Item" iconCls="x-fa fa-pencil" handler={this.toggleMenu} {...menuItemDefaults}/>
                    <Button text="Star" iconCls="x-fa fa-star" handler={this.toggleMenu} {...menuItemDefaults}/>
                </Sheet>

                <Panel shadow ui="instructions">
                    <div><b>Sheet</b> is a component which allows you to easily display sliding menus from any side of the screen. You can show the menu by clicking the "Show Menu" button below or by swiping from the edge of the screen.</div>
                </Panel>

                <Panel layout={{type: 'vbox', align: 'left'}} shadow margin="20 0 0 0" padding="15" shadow>
                    <Button
                        ui="action"
                        enableToggle={true}
                        pressed={displayed}
                        text={displayed ? 'Hide Menu' : 'Show Menu'}
                        handler={this.toggleMenu}
                        {...formFieldDefaults}
                    />

                    <div>side</div>
                    <SegmentedButton {...formFieldDefaults}>
                        <Button text="left" handler={() => this.setState({ direct: 'left' })} pressed={this.state.direct === 'left'}/>
                        <Button text="right" handler={() => this.setState({ direct: 'right' })} pressed={this.state.direct === 'right'}/>
                        <Button text="top" handler={() => this.setState({ direct: 'top' })} pressed={this.state.direct === 'top'}/>
                        <Button text="bottom" handler={() => this.setState({ direct: 'bottom' })} pressed={this.state.direct === 'bottom'}/>
                    </SegmentedButton>

                    <div>reveal</div>
                    <SegmentedButton {...formFieldDefaults}>
                        <Button text="true" pressed={this.state.reveal} handler={() => this.setState({ reveal: true })}/>
                        <Button text="false" pressed={!this.state.reveal} handler={() => this.setState({ reveal: false })}/>
                    </SegmentedButton>

                    <div>modal</div>
                    <SegmentedButton disabled={reveal}>
                        <Button text="true" pressed={this.state.modal} handler={() => this.setState({ modal: true })}/>
                        <Button text="false" pressed={!this.state.modal} handler={() => this.setState({ modal: false })}/>
                    </SegmentedButton>
                </Panel>
            </Container>
        )
    }
}
