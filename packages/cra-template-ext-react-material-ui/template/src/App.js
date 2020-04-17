import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { ExtGrid } from "@sencha/ext-react-material-ui";
import { ExtChart } from '@sencha/ext-react-material-ui';
import { ExtTreelist } from '@sencha/ext-react-material-ui';
import { ExtCalendar } from "@sencha/ext-react-material-ui";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import createData from './createData';
import "./data";
import treeData from './treeData';
const Ext = window['Ext'];

export default class App extends Component {

  theme = 'default'
  chartstore = Ext.create('Ext.data.Store', {
    fields: ['month','high','low',
      {
          name: 'highF',
          calculate: function (data) {
              return data.high * 1.8 + 32;
          }
      },
      {
          name: 'lowF',
          calculate: function (data) {
              return data.low * 1.8 + 32;
          }
      }
    ]
  });

  calstore = Ext.create("Ext.calendar.store.Calendars", {
    autoLoad: true,
    proxy: {
        type: "ajax",
        url: "/ExtReactMaterialUIExamples/CalendarFull",
    },
  });

  treestore = Ext.create('Ext.data.TreeStore', {
    rootVisible: true,
    root: treeData
  });

  extReactDidMount = ({cmp, cmpObj}) => {
    for (var prop in cmpObj) {this[prop] = cmpObj[prop]}
  }

  renderSign = (format, value) => (
    <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
      {Ext.util.Format.number(value, format)}
    </span>
  )

  render() {
    this.chartstore.loadData(createData());
    return (
      <div  style={{marginTop:'77px',marginLeft:'12px',marginRight:'12px'}}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              ExtReact for Material UI
            </Typography>
          </Toolbar>
        </AppBar>

        <Container>
          <Typography style={{margin:'2px 2px 22px 2px'}} component="h1" variant="h3" align="center" color="textPrimary" >
            <img style={{margin:'2px 2px 2px 2px'}} alt="" src="./files/footer-logo.png"/>
            <span>ExtReact for Material UI</span>
            <img style={{margin:'2px 2px 2px 2px'}} alt="" width="60px" src="./files/logo_raw.svg"/>
          </Typography>
        </Container>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <ExtGrid
                fitToParent
                xwidth="400px"
                height="300px"
                title="ExtReact Grid"
                store={
                  {
                    xtype: 'store',
                    data: [
                      { name: 'Marc',email: 'marc@gmail.com',priceChangePct: -.25 },
                      { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
                      { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 }
                    ]
                  }
                }
                columns={[
                  {
                    text: "name",
                    dataIndex: "name",
                    cell: { encodeHtml: false, xtype: 'reactcell' },
                    renderer: v => <strong>{v}</strong>
                  },
                  {text: "email", dataIndex: "email", flex: "1"},
                  {
                    text: "% Change",
                    dataIndex: "priceChangePct",
                    align: "right",
                    cell: { encodeHtml: false, xtype: 'reactcell' },
                    renderer: this.renderSign.bind(this, '0.00')
                  }
                ]}
              >
              </ExtGrid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <ExtChart
                height="300px"
                downloadServerUrl='http://svg.sencha.io'
                store={this.chartstore}
                theme={this.theme}
                axes={[{
                    type: 'numeric',
                    position: 'left',
                    minimum: 30,
                    title: 'Temperature in °F'
                }, {
                    type: 'category',
                    position: 'bottom'
                }]}
                series={[{
                    type: 'bar',
                    xField: 'month',
                    yField: 'highF'
                }]}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={3}>
              <ExtCalendar
                  height="400px"
                  views={{
                      day: {
                          startTime: 6,
                          endTime: 22,
                      },
                      workweek: {
                          xtype: "calendar-week",
                          controlStoreRange: false,
                          titleTpl: this.titleTpl,
                          label: "Work Week",
                          weight: 15,
                          dayHeaderFormat: "D d",
                          firstDayOfWeek: 1,
                          visibleDays: 5,
                      },
                  }}
                  timezoneOffset={0}
                  store={this.calstore}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper elevation={3}>
              <ExtTreelist
                ref="tree"
                width="100%"
                height="300px"
                expanderOnly={false}
                store={this.treestore}
                micro={false}
                expanderFirst={true}
                ui={'nav'}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              D3
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              PivotGrid
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }

}
