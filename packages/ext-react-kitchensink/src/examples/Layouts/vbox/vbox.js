import React, { Component } from 'react';
import { Container, Panel, Spacer } from '@sencha/ext-react-modern';
import colors from '../../colors';

export default class VBoxLayoutExample extends Component {

    render() {

        const panelProps = {
            height: 175,
            margin: '0 0 40 0'
        };

        return (
            <Container padding={Ext.os.is.Phone ? 20 : 30}>
                <Panel shadow ui="instructions" margin="0 0 40 0">
                    <div>A <b>vbox</b> layout positions items vertically with optional 'pack', and 'align' configs.</div>
                </Panel>
                <Container><div style={styles.heading}>align: 'stretch'</div></Container>
                <Panel shadow layout="vbox" {...panelProps}>
                    <Container layout="center" style={colors.card.red} flex={1}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue} flex={1}>Item 2</Container>
                    <Container layout="center" style={colors.card.green} flex={1}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>align: 'left'</div></Container>
                <Panel shadow layout={{ type: 'vbox', align: 'left' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red} flex={1}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue} flex={1}>Item 2</Container>
                    <Container layout="center" style={colors.card.green} flex={1}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>align: 'right'</div></Container>
                <Panel shadow layout={{ type: 'vbox', align: 'right' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red} flex={1}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue} flex={1}>Item 2</Container>
                    <Container layout="center" style={colors.card.green} flex={1}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>pack: 'start'</div></Container>
                <Panel shadow layout={{ type: 'vbox', pack: 'start' }} {...panelProps}>
                    <Container layout="center"style={colors.card.red}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue}>Item 2</Container>
                    <Container layout="center" style={colors.card.green}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>pack: 'center'</div></Container>
                <Panel shadow layout={{ type: 'vbox', pack: 'center' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue}>Item 2</Container>
                    <Container layout="center" style={colors.card.green}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>pack: 'end'</div></Container>
                <Panel shadow layout={{ type: 'vbox', pack: 'end' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue}>Item 2</Container>
                    <Container layout="center" style={colors.card.green}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>pack: 'space-between'</div></Container>
                <Panel shadow layout={{ type: 'vbox', pack: 'space-between' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue}>Item 2</Container>
                    <Container layout="center" style={colors.card.green}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>pack: 'space-around'</div></Container>
                <Panel shadow layout={{ type: 'vbox', pack: 'space-around' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue}>Item 2</Container>
                    <Container layout="center" style={colors.card.green}>Item 3</Container>
                </Panel>
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
