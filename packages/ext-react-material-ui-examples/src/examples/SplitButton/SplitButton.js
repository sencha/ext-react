import React, { Component } from 'react';
import { Spacer, ToggleField, Container, Panel, Button, Menu, MenuItem, MenuRadioItem, SplitButton } from '@sencha/ext-react-modern';

export default class SplitButtonExample extends Component {

    state = {
        style: '',
        type: 'text',
        round: false
    };

    onStyleChange = (item) => this.setState({ style: item.value })
    onTypeChange = (item) => this.setState({ type: item.value })
    toggleRound = () => this.setState({ round: !this.state.round });

    render() {
        const { style, type, round } = this.state;
        const iconCls = type.indexOf('icon') !== -1 ? 'x-fa fa-heart' : null;
        const text = type.indexOf('text') !== -1;

        let menu, ui;

        if (style === 'menu') {
            menu = (
                <Menu indented={false}>
                    <MenuItem text="Item 1"/>
                    <MenuItem text="Item 2"/>
                    <MenuItem text="Item 3"/>
                </Menu>
            );
        } else {
            ui = style.toLowerCase();
        }

        if (round) {
            ui += ' round';
        }

        return (
            <Container padding="10">
                <Container
                    layout={{ type: 'hbox', pack: Ext.os.is.Phone ? 'center' : 'left'}}
                    margin="0 0 10 0"
                    defaults={{ margin: "0 10 0 0" }}
                    width={Ext.isIE && 550}
                >
                    <Button ui="action raised" text="Style">
                        <Menu defaults={{ handler: this.onStyleChange, group: 'buttonstyle' }}>
                            <MenuItem text="None" value="" iconCls={style === '' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Action" value="action" iconCls={style === 'action' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Decline" value="decline" iconCls={style === 'decline' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Confirm" value="confirm" iconCls={style === 'confirm' && 'x-font-icon md-icon-check'}/>
                        </Menu>
                    </Button>
                    <Button ui="action raised" text="Type">
                        <Menu defaults={{ handler: this.onTypeChange, group: 'buttontype' }}>
                            <MenuItem text="Text" value="text" iconCls={type === 'text' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Icon" value="icon" iconCls={type === 'icon' && 'x-font-icon md-icon-check'}/>
                            <MenuItem text="Text & Icon" value="texticon" iconCls={type === 'texticon' && 'x-font-icon md-icon-check'}/>
                        </Menu>
                    </Button>
                    <Button ui="action raised" iconCls={round ? 'x-fa fa-check' : null} enableToggle text="Round" handler={this.toggleRound}/>
                </Container>

                <Panel { ...layoutProps }>
                    <Container layout="hbox">
                        <div flex={1} {...groupLabelProps}>Default</div>
                        <Container flex={3} className="button-group" {...buttonGroupProps}>
                            <SplitButton text={ text && "Normal" } ui={ui} iconCls={iconCls} {...menuProps} arrowAlign={'bottom'}></SplitButton>
                            <SplitButton text={ text && "Disabled" } ui={ui} iconCls={iconCls} disabled {...menuProps}></SplitButton>
                        </Container>
                    </Container>
                    <Container layout="hbox">
                        <div flex={1} {...groupLabelProps}>Alt</div>
                        <Container flex={3} className="button-group button-group-alt" {...buttonGroupProps}>
                            <SplitButton text={ text && "Normal" } ui={ui + ' alt'} iconCls={iconCls} {...menuProps}></SplitButton>
                            <SplitButton text={ text && "Disabled" } ui={ui + ' alt'} iconCls={iconCls} disabled {...menuProps}></SplitButton>
                        </Container>
                    </Container>
                    <Container layout="hbox">
                        <div flex={1} {...groupLabelProps}>Raised </div>
                        <Container flex={3} className="button-group" {...buttonGroupProps}>
                            <SplitButton text={ text && "Normal" } ui={ui + ' raised'} iconCls={iconCls} {...menuProps}></SplitButton>
                            <SplitButton text={ text && "Disabled" } ui={ui + ' raised'} iconCls={iconCls} disabled {...menuProps}></SplitButton>
                        </Container>
                    </Container>
                    <Container layout="hbox">
                        <div flex={1} {...groupLabelProps}>Alt Raised</div>
                        <Container flex={3} className="button-group button-group-alt" {...buttonGroupProps}>
                            <SplitButton text={ text && "Normal" } ui={ui + ' alt raised'} iconCls={iconCls} {...menuProps}></SplitButton>
                            <SplitButton text={ text && "Disabled" } ui={ui + ' alt raised'} iconCls={iconCls} disabled {...menuProps} ></SplitButton>
                        </Container>
                    </Container>
                </Panel>
            </Container>
        )
    }
}

const menuProps ={
    menu: [{
        text: 'Menu Item 1'
    }, {
        text: 'Menu Item 2'
    }, {
        text: 'Menu Item 3'
    }]
}

const layoutProps = Ext.os.is.Phone ? {
    height: '100%',
    width: '100%',
    className: 'demo-buttons',
    defaults: {
        margin: '20'
    }
} : {
    padding: 10,
    shadow: true,
    defaults: {
        layout: 'hbox',
        flex: 1,
        margin: '10',
        width: '100%'
    }
}

const buttonGroupProps = Ext.os.is.Phone ? {
    padding: '20 0 0 20',
    defaults: {
        margin: '0 20 20 0',
    }
} : {
    padding: '17 0 17 20',
    layout: { type: 'hbox', align: 'middle', pack: 'space-around' },
    flex: 1,
    margin: '0 20 0 0',
    width: 400,
    defaults: {
        margin: '0 20 0 0'
    }
}

const groupLabelProps = Ext.os.is.Phone ? {
    style: {
        margin: '0 0 5px 0'
    }
} : {
    style: {
        width: '70px',
        textAlign: 'right',
        margin: '24px 20px 0 0'
    }
};
