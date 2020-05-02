import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class Center extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
  }

  onClick = (index, name) => {
    this.setState({selectedIndex: index});
    this.props.onMenuClick(index, name)
  }

  render() {
    //const { selectedIndex } = this.state;
    const { importtext, text, reactname } = this.props;
    return (
      <React.Fragment>
        <div style={{height: '50px',border: '1px solid green'}}>
          <Typography variant="h3">
            {reactname}
          </Typography>
        </div>
        <div style={{flex: '1', display: 'flex', flexDirection: 'column', overflow: 'auto', border: '1px solid red'}}>
          <Typography variant="h5">
            {importtext}
          </Typography>
          <Typography variant="h5">
            <pre>
            {text}
            </pre>
          </Typography>
        </div>
    </React.Fragment>
    )
  }

}