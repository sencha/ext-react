import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Nav extends Component {

  onClick = (index, name) => {
    this.setState({selectedIndex: index});
    this.props.onMenuClick(index, name)
  }

  render() {
    //const { selectedIndex } = this.state;
    const { items, menuSelectedIndex } = this.props;
    return (
      <List style={{height:'5px'}}>
        {items.map((name, index) => (
          <ListItem
            button
            key={index}
            selected={menuSelectedIndex === index}
            onClick={(event) => this.onClick(index, name)}
          >
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    )
  }

}