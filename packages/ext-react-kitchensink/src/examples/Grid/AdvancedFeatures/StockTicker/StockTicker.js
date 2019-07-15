import React, { Component } from 'react';
import { Grid, Toolbar, Label, SliderField, CheckBoxField, Column, WidgetCell, SparkLine , Container, SPark } from '@sencha/ext-modern';
import model from '../../CompanyModel';
import './Ticker.css';

export default class StockTickerGridExample extends Component {
    componentDidMount() {
      const pctChangeColumn = this.refs.pctChangeColumn.cmp;
      pctChangeColumn.setRenderer(this.renderSign.bind(this, '0.00%'));
  
      const changeColumn = this.refs.changeColumn.cmp;
      changeColumn.setRenderer(this.renderSign.bind(this, '0.00'));
    }

    state = {
        tickDelay: 200,
        flashBackground: false
    }

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        pageSize: null,
        proxy: {
            type: 'ajax',
            url: 'resources/data/CompanyData.json',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    });

    init = () => {
        if (this.store.isLoaded() && this.store.getCount()) {
            this.onStoreLoad();
        } else {
            this.store.on('load', 'onStoreLoad', this);
        }
    }

    onStoreLoad = (store) => {
        store.removeAt(15, 70);

        let count = store.getCount(),
            i, j, rec;

        for (i = 0; i < count; i++) {
            rec = store.getAt(i);
            rec.beginEdit();
            for (j = 0; j < 10; j++) {
                rec.addPriceTick();
            }
            rec.endEdit(true);
        }

        this.startTicker();
    }

    startTicker = () => {
        const { store } = this;

        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            for (let i=0; i<10; i++) {
                const rec = store.getAt(Ext.Number.randomInt(0, store.getCount() - 1));
                rec.addPriceTick();
            }
        }, this.state.tickDelay);
    }

    destroy = () => {
        clearInterval(this.timer);
    }

    toggleFlashBackground = (checkbox) => {
        this.setState({ flashBackground: !this.state.flashBackground })
    }

    onTickDelayChange = (slider, value, oldValue) => {
        this.setState({ tickDelay: value });
        this.startTicker();
    }

    render() {
        const { tickDelay } = this.state;

        return (
            <Grid 
                title='Ticker Grid'
                store={this.store}
                itemConfig = {{
                    viewModel : {
                    },
                    body: {
                        tpl: this.rowBodyTpl
                    }
                }}
                onInitialize={this.init}
                shadow
            >
                <Column text="Company" dataIndex="name" width="150" sortable/>
                <Column align="right" text="Price" width="85" dataIndex="price" formatter='usMoney' sortable/>
                <Column text="Trend" width="200" dataIndex="trend" sortable={false} 
                        cell= {{
                            bind: '{record.trend}',
                            xtype: 'widgetcell',
                            forceWidth: true,
                            widget: {
                                xtype: 'sparklineline',
                                tipTpl: 'Price: {y:number("0.00")}'
                            }
                         }}
                 >
                </Column>
                <Column ref="changeColumn" align="right" text="Change" width="90" dataIndex="change" 
                        cell={{ bodyStyle: { padding: 0 } }} sortable/>
                <Column ref="pctChangeColumn" align="right" text="% Change" dataIndex="pctChange" 
                        cell={{ bodyStyle: { padding: 0 } }} sortable/>
                <Toolbar docked="bottom" defaults={{ margin: '0 20 0 0' }}>
                    <Label html="Tick Delay"/>
                    <SliderField
                        padding="0 5"
                        minValue={25}
                        maxValue={2000}
                        increment={10}
                        onChange={this.onTickDelayChange}
                        value={tickDelay}
                        flex={1}
                    />
                    <Container><div>{tickDelay}ms</div></Container>
                    <CheckBoxField 
                        margin="0"
                        boxLabel="Flash background color on change"
                        onChange={this.toggleFlashBackground}
                    />
                </Toolbar>
            </Grid>
        )
    }

    renderSparkline = (value) => {
        return (
            <SparkLineLine 
                values={value} 
                height={16} 
                tipTpl='Price: {y:number("0.00")}'
            />
        )
    }

    renderSign = (format, value,record, dI, cell) => {
        let color = 'black';

        if (value > 0) {
          color = 'green'
        } else if (value < 0) {
          color = 'red'
        }
     
        let className=this.state.flashBackground && (value > 0 ? 'ticker-cell-gain' : value < 0 ? 'ticker-cell-loss' : '')
        cell.setStyle({ color, padding: '10px' });
        cell.setCls(className);
        return Ext.util.Format.number(value, format);
    }
}