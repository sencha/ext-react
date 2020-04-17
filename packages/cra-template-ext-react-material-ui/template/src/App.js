import React, { Component } from 'react';
import { ExtGrid } from "@sencha/ext-react-material-ui";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
const Ext = window['Ext'];

export default class App extends Component {

  extReactDidMount = ({cmp, cmpObj}) => {
    for (var prop in cmpObj) {this[prop] = cmpObj[prop]}
  }

  renderSign = (format, value) => (
    <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
      {Ext.util.Format.number(value, format)}
    </span>
  )

  render() {
    return (
      <div style={{marginTop:'77px',marginLeft:'12px'}}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              ExtReact and Material UI Components in the same Application
            </Typography>
          </Toolbar>
        </AppBar>

        <Container>
          <Typography component="h1" variant="h3" align="center" color="textPrimary" >
            <img style={{margin:'20px'}} alt="" src="./files/footer-logo.png"/>
            ExtReact and Material UI
            <img style={{margin:'20px'}} alt="" width="60px" src="./files/logo_raw.svg"/>
          </Typography>
        </Container>

        <ExtGrid
          width="400px"
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
      </div>
    )
  }

}
