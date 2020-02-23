import React, { Component } from 'react';
import { Container, Button } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from './ChartToolbar';
import createData from './createData';
const Ext = window['Ext']

Ext.require([
  'Ext.chart.series.Area',
  'Ext.chart.axis.Numeric',
  'Ext.chart.axis.Category'
]);

export default class App extends Component {

  constructor() {
    super();
    this.refresh();
}

store = Ext.create('Ext.data.Store', {
    fields: ['id', 'g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name'],
});

state = {
    theme: 'purple'
};

test = () => {
    console.log('test')
}


refresh = () => {
    this.store.loadData(createData(25));
}

//changeTheme = theme => this.setState({ theme })

changeTheme = (theme) => {
  this.setState({ theme })
//      this.thetheme = theme
  //this.refs.charttoolbar.cmp.setTheme(theme)
}



render() {
    var { theme } = this.state
    console.log(theme)

    //<Button text={theme}></Button>

    return (
        <Container viewport="true" layout="fit">
            <ChartToolbar
              //ref="charttoolbar"
                onTestClick={this.test}
                onThemeChange={this.changeTheme}
                onRefreshClick={this.refresh}
                theme={theme}
            />


            <Cartesian

            
                store={this.store}
                theme={theme}
                series={[
                  {
                    type: 'area',
                    xField: 'name',
                    yField: ['g1', 'g2', 'g3', 'g4', 'g5'],
                    title: ['G1', 'G2', 'G3', 'G4', 'G5'],
                  }
                ]}
                axes={[
                  {
                    type: 'numeric',
                    position: 'left',
                    fields: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
                },
                {
                    type: 'category',
                    position: 'bottom',
                    fields: 'name',
                }
              ]}
            ></Cartesian>
        </Container>
    )
  }
}