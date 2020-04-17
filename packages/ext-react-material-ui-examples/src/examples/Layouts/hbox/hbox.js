import React, { Component } from 'react';
import { Panel, Container } from '@sencha/ext-react-modern';
import colors from '../../colors';

export default class HBoxLayoutExample extends Component {

    render() {
        const panelProps = {
            height: 75,
            margin: '0 0 40 0'
        };

        return (
            <Container padding={Ext.os.is.Phone ? 20 : 30}>
                <Panel shadow ui="instructions" margin="0 0 40 0">
                    <div>An <b>hbox</b> layout positions items horizontally with optional 'pack', and 'align' configs.</div>
                </Panel>
                <Container><div style={styles.heading}>align: 'stretch'</div></Container>
                <Panel shadow layout="hbox" {...panelProps}>
                    <Container layout="center" style={colors.card.red} flex={1}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue} flex={1}>Item 2</Container>
                    <Container layout="center" style={colors.card.green} flex={1}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>align: 'top'</div></Container>
                <Panel shadow layout={{ type: 'hbox', align: 'top' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red} flex={1}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue} flex={1}>Item 2</Container>
                    <Container layout="center" style={colors.card.green} flex={1}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>align: 'bottom'</div></Container>
                <Panel shadow layout={{ type: 'hbox', align: 'bottom' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red} flex={1}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue} flex={1}>Item 2</Container>
                    <Container layout="center"style={colors.card.green} flex={1}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>pack: 'start'</div></Container>
                <Panel shadow layout={{ type: 'hbox', pack: 'start' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue}>Item 2</Container>
                    <Container layout="center" style={colors.card.green}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>pack: 'center'</div></Container>
                <Panel shadow layout={{ type: 'hbox', pack: 'center' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue}>Item 2</Container>
                    <Container layout="center" style={colors.card.green}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>pack: 'end'</div></Container>
                <Panel shadow layout={{ type: 'hbox', pack: 'end' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue}>Item 2</Container>
                    <Container layout="center" style={colors.card.green}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>pack: 'space-between'</div></Container>
                <Panel shadow layout={{ type: 'hbox', pack: 'space-between' }} {...panelProps}>
                    <Container layout="center" style={colors.card.red}>Item 1</Container>
                    <Container layout="center" style={colors.card.blue}>Item 2</Container>
                    <Container layout="center" style={colors.card.green}>Item 3</Container>
                </Panel>
                <Container><div style={styles.heading}>pack: 'space-around'</div></Container>
                <Panel shadow layout={{ type: 'hbox', pack: 'space-around' }} {...panelProps}>
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
        fontSize: '14px',
        fontFamily: 'Menlo, Courier',
        margin: '20px 0 8px 0'
    }
}
