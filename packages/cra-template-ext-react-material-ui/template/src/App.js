import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExtGridExample from'./ExtGridExample';
import ExtChartExample from'./ExtChartExample';
import ExtCalendarExample from'./ExtCalendarExample';
import ExtTreelistExample from'./ExtTreelistExample';
import ExtD3Example from'./ExtD3Example';
import ExtPivotExample from'./ExtPivotExample';

export default class App extends Component {
  // extReactDidMount = ({cmp, cmpObj}) => {
  //   for (var prop in cmpObj) {this[prop] = cmpObj[prop]}
  // }

  render() {
    return (
      <div  style={{marginTop:'77px',marginLeft:'12px',marginRight:'12px'}}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              ExtReact for Material-UI
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Typography style={{margin:'2px 2px 22px 2px'}} component="h1" variant="h3" align="center" color="textPrimary" >
            <img style={{margin:'2px 2px 2px 2px'}} alt="" src="./files/footer-logo.png"/>
            <span>ExtReact for Material-UI</span>
            <img style={{margin:'2px 2px 2px 2px'}} alt="" width="60px" src="./files/logo_raw.svg"/>
          </Typography>
        </Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <ExtGridExample/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <ExtChartExample/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={3}>
              <ExtCalendarExample/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3}>
              <ExtTreelistExample/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <ExtD3Example/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <ExtPivotExample/>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
