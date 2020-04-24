import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
  }


  render() {

    return (
      <Container>
      <Typography style={{margin:'2px 2px 22px 2px'}} component="h3" variant="h3" align="center" color="textPrimary" >
        <img style={{margin:'2px 2px 2px 2px'}} alt="" src="./files/footer-logo.png"/>
        <span>ExtReact for Material UI Documentation</span>
        <img style={{margin:'2px 2px 2px 2px'}} alt="" width="60px" src="./files/logo_raw.svg"/>
      </Typography>
    </Container>
    )
  }

}