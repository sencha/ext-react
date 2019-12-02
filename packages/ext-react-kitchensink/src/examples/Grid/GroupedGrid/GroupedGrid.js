import React, { Component } from 'react';
import { Container, Grid, Toolbar, SegmentedButton, Button, Column } from '@sencha/ext-react-modern';
import '../RestaurantData';

Ext.require([
    'Ext.grid.cell.Number',
    'Ext.grid.cell.Widget',
    'Ext.grid.SummaryRow',
    'Ext.ux.rating.Picker',
    'Ext.grid.filters.Plugin'
]);

export default class GroupedGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Restaurants'
        },
        sorters: ['cuisine', 'name'],
        groupField: 'cuisine'
    });

    state = {
        grouped: true,
        stateful: true,
        stateId: "grouped-grid"
    };

    onToggleGrouping = on => { this.setState({ grouped: on })}

    render() {
        const { grouped } = this.state;

        return (
            <Container layout="vbox" padding="10">
                <Toolbar margin="0 0 20 0" shadow>
                    <Container key="1" style={{ marginRight: '10px' }} html='Grouping:'></Container>
                    <SegmentedButton key="2" label="Grouping" >
                        <Button key="1" ui="toolbar-default" pressed={grouped} text="ON" handler={this.onToggleGrouping.bind(this, true)}/>
                        <Button key="2" ui="toolbar-default" pressed={!grouped} text="OFF" handler={this.onToggleGrouping.bind(this, false)}/>
                    </SegmentedButton>
                </Toolbar>

                <Grid
                    flex={1}
                    title="Restaurants"
                    shadow
                    store={this.store}
                    grouped={grouped}
                    stateful={this.state.stateful}
                    stateId={this.state.stateId}
                    groupFooter={{
                        xtype: 'gridsummaryrow'
                    }}
                    plugins={
                        {
                            gridfilters: "true"
                        }
                    }
                >
                    <Column
                        text="Name"
                        dataIndex="name"
                        flex={1}
                        groupHeaderTpl='{columnName}: {value:htmlEncode}'
                    />
                    <Column
                        text="Cuisine"
                        dataIndex="cuisine"
                        flex={1}
                    />
                    <Column
                        text="Rating"
                        dataIndex="rating"
                        summaryCell="numbercell"
                        groupHeaderTpl='{value:repeat("★")} ({value:plural("Star")})'
                        cell={{
                            xtype: 'widgetcell',
                            widget: {
                                xtype: 'rating',
                                tip: 'Set to {tracking:plural("Star")}'
                            }
                        }}
                    />
                </Grid>
            </Container>
        )
    }
}
