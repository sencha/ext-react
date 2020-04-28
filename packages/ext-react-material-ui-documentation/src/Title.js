import React, { Component } from 'react';

export default class Title extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  onClick = (index, name) => {
    this.setState({selectedIndex: index});
    this.props.onMenuClick(index, name)
  }

  render() {
    //const { selectedIndex } = this.state;
    const { title, reactname, importtext, version } = this.props;
    return (

        <div className="hbox">
          <div style={{fontSize:'24px',margin:'10px 10px 10px 10px'}}>{title}</div>
          <div style={{fontSize:'24px',margin:'10px 10px 10px 10px'}}>{reactname} {reactname !== '' && <span>Component -&gt;</span>}</div>
          <div style={{fontSize:'24px',margin:'10px 10px 10px 15px'}}>{importtext}</div>
          <div style={{fontSize:'24px',margin:'10px 10px 10px 15px',justifyContent:'right',flex:'1',textAlign:'right'}}>{version}</div>
        </div>

    )
  }

}
