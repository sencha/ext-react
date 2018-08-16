import React, { Component } from 'react';
import { Container, Button, Grid, Column, RendererCell } from '@sencha/ext-modern';

Ext.require('Ext.grid.plugin.SummaryRow');

class Cell extends Component {

    componentWillUnmount() {
        document.getElementById('message').innerHTML = 'unmounted';
    }

    render() {
        const { firstName, lastName, itemId } = this.props;

        return (
            <Container layout="hbox">
                { firstName ? (
                    <Button text="Button" itemId={itemId} text={`${firstName} ${lastName}`}/>
                ) : (
                    <Button text="Button" itemId={itemId} text="Summary"/>
                )}
            </Container>
        )
    }

}

export default class RendererCellTest extends Component {

    state = {
        showGrid: true
    }

    store = Ext.create('Ext.data.Store', {
        data: [
            { first: 'Mark', last: 'Brocato' }
        ]
    });

    renderComponentCell = (itemId, value, record) => <Cell firstName={record.get('first')} lastName={record.get('last')} itemId={itemId}/>

    renderStringCell = (value, record) => record.get('first') ? `${record.get('first')} ${record.get('last')}` : 'summary';

    destroyGrid = () => this.setState({ showGrid: false })

    render() {
        return (
            <Container layout="vbox">
                <Container docked="top" layout="hbox">
                    <Button text="Destroy Grid" itemId="button" handler={this.destroyGrid}/>
                    <div id="message"/>
                </Container>
                
                { this.state.showGrid && (
                    <Grid 
                        store={this.store} 
                        flex={1}
                        plugins={{
                            summaryrow: true
                        }}
                    >
                        <Column text="RendererCell" flex={1}>
                            <RendererCell 
                                renderer={this.renderComponentCell.bind(this, 'rendererCellButton')}
                                summaryRenderer={this.renderComponentCell.bind(this, 'rendererCellSummaryButton')}
                            />
                        </Column>
                        <Column 
                            text="renderer prop" 
                            flex={1} 
                            renderer={this.renderComponentCell.bind(this, 'rendererButton')}
                            summaryRenderer={this.renderComponentCell.bind(this, 'rendererSummaryButton')}
                        />
                        <Column text="string" flex={1} renderer={this.renderStringCell} cell={{ cls: 'string-cell' }}/>
                    </Grid>
                )}
            </Container>
        )
    }
    
}