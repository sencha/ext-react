//https://medium.com/@ali.atwa/getting-started-with-material-ui-for-react-59c82d9ffd93
import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from 'material-ui/styles';

//import ListSubheader from 'material-ui/List/ListSubheader';
//import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
//import Collapse from 'material-ui/transitions/Collapse';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';



import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//import Divider from 'material-ui/Divider';
import Divider from '@material-ui/core/Divider';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});
function getItems() {
     var json =  {
      "list": [{ "id": 1,
                 "title": "Google",
                 "items": [{
                            "id": 1,
                            "name": "Android",
                            "subitems": [{
                              "id": 1,
                              "name": "Nougat"
                            },
                             {
                              "id": 2,
                              "name": "Lollipop"
                            }]
                          },
                          {
                            "id": 2,
                            "name": "Chrome"
                          }
                        ]},
              { "id": 2,
                 "title": "Apple",
                 "items": [{
                            "id": 1,
                            "name": "Mac"
                          },
                          {
                            "id": 2,
                            "name": "Iphone",
                            "subitems": [{
                              "id": 1,
                              "name": "Iphone 6"
                            },
                             {
                              "id": 2,
                              "name": "Iphone 10"
                            }]
                          }
                        ]},
              { "id": 3,
                            "title": "Uber",
                            "items": [{
                              "id": 1,
                              "name": "Eats"
                            },
                             {
                              "id": 2,
                              "name": "Freight"
                            }]
                          }
                        ]};
  return json;
   }
class NestedList extends React.Component {

  classes = {
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
  },
  nested: {
    paddingLeft: '4px',
  }
}



  state = { };
handleClick = (e) => {
    this.setState({ [e]: !this.state[e] });
  };

  handleClickLink = (e) => {
   // this.setState({ [e]: !this.state[e] });
  };




render() {
    const items = getItems();
return (
<div>
       {items.list.map((list) => {
        return (
       <List className={this.classes.root} key={list.id} >
        {list.items.map((item) => {
        return (

    <div key={item.id}>
      {item.subitems != null ?  (
        <div key={item.id}>
       <ListItem button key={item.id} onClick={this.handleClick.bind(this, item.name)} >
       <ListItemText primary={item.name} />
       {this.state[item.name] ? <ExpandLess /> : <ExpandMore />}
       </ListItem>
        <Collapse key={list.items.id} component="li" in={this.state[item.name]} timeout="auto" unmountOnExit>
          <List disablePadding>
              {item.subitems.map((sitem) => {
              return (
              <ListItem button key={sitem.id} className={this.classes.nested}>
                <ListItemText key={sitem.id} primary={sitem.name} />
              </ListItem>
                   )
                      })}
           </List>
        </Collapse> </div>
       ) : (
        <ListItem button onClick={this.handleClickLink.bind(this, item.name)} key={item.id}>
       <ListItemText primary={item.name}  />
       </ListItem> )}
       </div>

       )
      })}
<Divider key={list.id} absolute />
        </List>
        )
        })}
</div>
    );
  }
}
// NestedList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default NestedList;