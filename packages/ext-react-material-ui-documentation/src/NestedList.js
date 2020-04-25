import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import { getMenu } from './menudata'

class NestedList extends React.Component {
  state = {
    menuSelectedIndex: 0
  };

  handleRootClick = (name, key, type, reactname) => {
    //console.log('rootclick ' + name + ' ' + key)
    this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
    // var n = name.indexOf(' Overview');
    // console.log(n)
    // var reactname = name.substring(0, n);
    var reactname = ''
    this.props.onMenuClick(name, key, type, reactname)
  };

  handleMidClick = (name, key, type, reactname) => {
    //console.log('midclick ' + name + ' ' + key)
    this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
    // var n = name.indexOf(' Overview');
    // console.log(n)
    // var reactname = name.substring(0, n);
    this.props.onMenuClick(name, key, type, reactname)
  };

  handleExampleClick = (name, key, type, reactname) => {
    //console.log('exampleclick ' + name + ' ' + key)
    this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
    //var reactname = ''
    this.props.onMenuClick(name, key, type, reactname)
  };

  render() {
    const menu = getMenu();
    //const menuSelectedIndex = 120;
    const {
      menuSelectedIndex,
    } = this.state;
    return (
      <div>
        <List>
          {menu.map((rootitem, index1) => {
            return (
              <div key={rootitem.id}>
                <ListItem button selected={menuSelectedIndex === (100*rootitem.id)} key={(100*rootitem.id)} onClick={this.handleRootClick.bind(this,rootitem.name,(100*rootitem.id),rootitem.type,rootitem.name)}>
                  <ListItemText style={{fontWeight:'bold',color:'white'}} primary={rootitem.name} primaryTypographyProps={{color:'textPrimary',variant:'h6'}}/>
                  {this.state[rootitem.name] ? (<ExpandLess style={{fontWeight:'bold',color:'white'}}/>) : (<ExpandMore style={{fontWeight:'bold',color:'white'}}/>)}
                </ListItem>
                <Collapse key={rootitem.items.id} component="li" in={this.state[rootitem.name]} timeout="auto" unmountOnExit>
                <List>
                {rootitem.items.map((miditem, index2) =>
                  {
                    return (
                      <div key={miditem.id}>
                        <ListItem button selected={menuSelectedIndex === (100*rootitem.id)+(10*miditem.id)} key={(100*rootitem.id)+(10*miditem.id)} onClick={this.handleMidClick.bind(this,miditem.name,(100*rootitem.id)+(10*miditem.id),miditem.type,rootitem.name)}>
                          <ListItemText style={{fontWeight:'bold'}} primary={miditem.name} primaryTypographyProps={{color:'secondary',variant:'subtitle1',classes:{root:'mid'}}}/>
                          {miditem.subitems ? (this.state[miditem.name] ? (<ExpandLess />) : (<ExpandMore />)):(<div></div>)}
                        </ListItem>
                        {miditem.subitems ? (
                          <Collapse key={miditem.subitems.id} component="li" in={this.state[miditem.name]} timeout="auto" unmountOnExit>
                          <List>
                          {miditem.subitems.map((subitem, index3) => {
                            return (
                              <ListItem button selected={menuSelectedIndex === (100*rootitem.id)+(10*miditem.id+(1*subitem.id))} key={(100*rootitem.id)+(10*miditem.id)+(1*subitem.id)} onClick={this.handleExampleClick.bind(this,subitem.name,(100*rootitem.id)+(10*miditem.id)+(1*subitem.id),subitem.type,rootitem.name)}>
                                <ListItemText style={{fontWeight:'bold'}} primary={subitem.name} primaryTypographyProps={{color:'textPrimary',variant:'subtitle2',classes:{root:'example'}}}/>
                              </ListItem>
                            )
                          })}
                          </List>
                          </Collapse>
                          ): (<div></div>)
                        }
                      </div>
                    )
                  }
                )}
                </List>
                </Collapse>
                <Divider/>
              </div>
            )
          })}
        </List>
      </div>
    );
  }

}
// NestedList.propTypes = {
//     classes: PropTypes.object.isRequired
// };
export default NestedList;
