import React, { Component } from 'react';
//import { reactify } from '@sencha/ext-react-modern';
import './CompanyData';
//import ActionsCell from './ActionsCell';
// var Grid = reactify('Grid');
// var Column = reactify('Column');
// var ExtReactRenderer = reactify('ExtReactRenderer');
// var Button = reactify('Button');
import { Grid } from '@sencha/ext-react-modern'
import { Column } from '@sencha/ext-react-modern'
import { ExtReactRenderer } from '@sencha/ext-react-modern'
import { Button } from '@sencha/ext-react-modern'
const Ext = window.Ext;

export default class App extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Companys'
        }
    });

    render() {
        return (
            <Grid store={this.store}>
                <Column text="Company" dataIndex="name" width="150"/>
                <Column text="Change" width="100" dataIndex="priceChange" renderer={this.renderNumberCell.bind(this, '0.00')}/>
                <Column text="% Change" dataIndex="priceChangePct" renderer={this.renderNumberCell.bind(this, '0.00%')}/>
                <Column text="Actions" minWidth={300} renderer={this.renderActionsCell.bind(this)}/>
            </Grid>
        );
    }
    renderActionsCell = (value, record) => {
        return (
            <ExtReactRenderer>
                <Button text="Buy" handler={this.buyHandler.bind(this, record)}/>
                <Button text="Sell" handler={this.sellHandler.bind(this, record)}/>
                <Button text="Watch" handler={this.watchHandler.bind(this, record)}/>
            </ExtReactRenderer>
        )
    }

    // renderActionsCellComponent = (value, record) => {
    //     return (
    //         <ActionsCell
    //             buyHandler={this.buyHandler.bind(this, record)}
    //             sellHandler={this.sellHandler.bind(this, record)}
    //             watchHandler={this.watchHandler.bind(this, record)}
    //         />
    //     )
    // }

    renderNumberCell(format, value) {
        return (
            <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
                {Ext.util.Format.number(value, format)}
            </span>
        )
    }

    buyHandler = (record) => {
        console.log(record)
        Ext.toast(`Buy ${record.data.name}`)
    }
    sellHandler = (record) => {
        Ext.toast(`Sell ${record.data.name}`)
    }
    watchHandler = (record) => {
        Ext.toast(`Watch ${record.data.name}`)
    }

}
