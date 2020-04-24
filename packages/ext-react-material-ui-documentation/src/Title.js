import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class Title extends Component {

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
    const { reactname, importtext } = this.props;
    return (
      <React.Fragment>
        <div style={{fontSize:'24px',margin:'10px 10px 10px 10px'}}>{reactname} Component -></div>
        <div style={{fontSize:'24px',margin:'10px 10px 10px 15px'}}>{importtext}</div>
    </React.Fragment>
    )
  }

}

{/* <React.Fragment>
<div style={{height: '50px',border: '1px solid green'}}>
  <Typography variant="h3">
    {reactname}                 <div style={{fontSize:'18px',margin:'10px 10px 10px 10px'}}>{importtext}</div>
  </Typography>
</div>
</React.Fragment> */}