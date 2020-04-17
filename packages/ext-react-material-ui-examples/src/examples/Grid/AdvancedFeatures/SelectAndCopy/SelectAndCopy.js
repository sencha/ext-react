import React, { Component } from 'react';
import { Grid, Column, Container, Panel, Toolbar, Button, Menu, MenuItem, MenuCheckItem } from '@sencha/ext-react-modern';
import createStore from './createStore';

Ext.require([
    'Ext.grid.plugin.Clipboard'
])

export default class FlexibleSelection extends Component {

    store = createStore();

    state = {
        selectable: {
            rows: true,
            cells: true,
            columns: true,
            drag: true,
            checkbox: true
        },
        extensible: 'both',
        message: 'No Selection'
    }

    render() {
        const { selectable, extensible, message } = this.state;

        return (
            <Container layout="fit" padding={10}>
                <Toolbar docked="top" ui="app-transparent-toolbar" defaults={{ margin: '0 5 0 0' }} padding="0 10" shadow={false}>
                    <Button text="Selectable" ui="action">
                        <Menu>
                            <MenuCheckItem text="rows" checked={selectable.rows} handler={this.toggleSelectable.bind(this, 'rows')}/>
                            <MenuCheckItem text="cells" checked={selectable.cells} handler={this.toggleSelectable.bind(this, 'cells')}/>
                            <MenuCheckItem text="columns" checked={selectable.columns} handler={this.toggleSelectable.bind(this, 'columns')}/>
                            <MenuCheckItem text="drag" checked={selectable.drag} handler={this.toggleSelectable.bind(this, 'drag')}/>
                            <MenuCheckItem text="checkbox" checked={selectable.checkbox} handler={this.toggleSelectable.bind(this, 'checkbox')}/>
                        </Menu>
                    </Button>
                    <Button text="Extensible" ui="action">
                        <Menu>
                            <MenuItem text="x" iconCls={extensible === 'x' && 'x-font-icon md-icon-check'} handler={this.setExtensible.bind(this, 'x')}/>
                            <MenuItem text="y" iconCls={extensible === 'y' && 'x-font-icon md-icon-check'} handler={this.setExtensible.bind(this, 'y')}/>
                            <MenuItem text="both" iconCls={extensible === 'both' && 'x-font-icon md-icon-check'} handler={this.setExtensible.bind(this, 'both')}/>
                        </Menu>
                    </Button>
                </Toolbar>
                <Grid
                    store={this.store}
                    plugins={{
                        selectionreplicator: true,
                        clipboard: true
                    }}
                    onSelectionChange={this.onSelectionChange}
                    selectable={{
                        extensible,
                        ...selectable
                    }}
                    shadow
                    rowNumbers
                    columnLines>
                    <Column text="Year" dataIndex="year" flex={1} minWidth={75}/>
                    <Column text="Jan" dataIndex="jan" width={75}/>
                    <Column text="Feb" dataIndex="feb" width={75}/>
                    <Column text="Mar" dataIndex="mar" width={75}/>
                    <Column text="Apr" dataIndex="apr" width={75}/>
                    <Column text="May" dataIndex="may" width={75}/>
                    <Column text="Jun" dataIndex="jun" width={75}/>
                    <Column text="Jul" dataIndex="jul" width={75}/>
                    <Column text="Aug" dataIndex="aug" width={75}/>
                    <Column text="Sep" dataIndex="sep" width={75}/>
                    <Column text="Oct" dataIndex="oct" width={75}/>
                    <Column text="Nov" dataIndex="nov" width={75}/>
                    <Column text="Dev" dataIndex="dec" width={75}/>
                    <Panel docked="bottom" bodyPadding={5}>
                      <Container style={{ fontSize: '14px', fontWeight: 'normal' }} html={message}></Container>
                    </Panel>
                </Grid>
            </Container>
        )
    }

    toggleSelectable = field => {
        this.setState({
            selectable: { ...this.state.selectable, [field]: !this.state.selectable[field] }
        });
    }

    setExtensible = extensible => {
        this.setState({ extensible })
    }

    onSelectionChange = (grid, records, selecting, selection) => {
        let message = '??',
            firstRowIndex,
            firstColumnIndex,
            lastRowIndex,
            lastColumnIndex;

        if (!selection) {
            message = 'No selection';
        }

        else if (selection.isCells) {
            firstRowIndex = selection.getFirstRowIndex();
            firstColumnIndex = selection.getFirstColumnIndex();
            lastRowIndex = selection.getLastRowIndex();
            lastColumnIndex = selection.getLastColumnIndex();

            message = 'Selected cells: ' + (lastColumnIndex - firstColumnIndex + 1) + 'x' + (lastRowIndex - firstRowIndex + 1) +
                ' at (' + firstColumnIndex + ',' + firstRowIndex + ')';
        }
        else if (selection.isRows) {
            message = 'Selected rows: ' + selection.getCount();
        }
        else if (selection.isColumns) {
            message = 'Selected columns: ' + selection.getCount();
        }

        this.setState({ message });
    }

}


// columns={[
//   {text:'Year',dataIndex:'year',minWidth:75,flex:1},
//   {text:'Jan',dataIndex:'jan',width:75},
//   {text:'Feb',dataIndex:'feb',width:75},
//   {text:'Mar',dataIndex:'mar',width:75},
//   {text:'Apr',dataIndex:'apr',width:75},
//   {text:'May',dataIndex:'may',width:75},
//   {text:'Jun',dataIndex:'jun',width:75},
//   {text:'Jul',dataIndex:'jul',width:75},
//   {text:'Aug',dataIndex:'aug',width:75},
//   {text:'Sep',dataIndex:'sep',width:75},
//   {text:'Oct',dataIndex:'oct',width:75},
//   {text:'Nov',dataIndex:'nov',width:75},
//   {text:'Dec',dataIndex:'dec',width:75}
// ]}
// >




