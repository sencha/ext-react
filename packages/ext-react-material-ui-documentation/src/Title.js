import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default class Title extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  onHelpClick = (index, name) => {
    //this.setState({selectedIndex: index});
    //this.props.onMenuClick(index, name)
  }

  render() {
   const { title, version } = this.props;
    return (
        <div className="hbox">
          <div style={{fontSize:'24px',margin:'10px 10px 10px 10px'}}>{title}</div>
          <div style={{fontSize:'24px',margin:'10px 10px 5px 15px',justifyContent:'right',flex:'1',textAlign:'right'}}>
            <Tooltip title="Help"><IconButton style={{margin:'0 0 2px 0'}} onClick={this.onHelpClick}><Icon style={{color:'white'}}>help_outline</Icon></IconButton></Tooltip>
            {version}
          </div>
        </div>
    )
  }

}
