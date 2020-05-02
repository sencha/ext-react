import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class Template extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {

  }

  onButtonClick = (event, title) => {
    console.log(title)
  }

  render() {
    //const { selectedIndex } = this.state;
    const { title } = this.props;

    return (
      <Button onClick={(event) => this.onButtonClick(event, title)}>{title}</Button>
    )
  }

}