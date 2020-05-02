import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList2() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = (event, index, name, level) => {
    console.log(name)
    if (level == 1) {
      setOpen(!open);
    }
  };

  return (
    <List component="nav" className={classes.root}>
      <ListItem button>
        <ListItemText primary="Sent mail" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Drafts" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <ListItem onClick={(event)=>handleClick2(event, 0, 'inbox', 1)} button>
        <ListItemText className="menuroot" primary="Inbox"/>{open ? <ExpandLess/> : <ExpandMore/>}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem onClick={(event)=>handleClick2(event, 0, 'inbox', 1)} button>
          <ListItemText className="menumid" primary="Today"/>{open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>



        <ListItem onClick={(event)=>handleClick2(event, 0, 'inbox', 2)} button className="menumid">Today</ListItem>
        <ListItem onClick={(event)=>handleClick2(event, 1, 'inbox', 2)} button className="menumid">Tomorrow</ListItem>
      </Collapse>


      <ListItem button >
        <Box onClick={handleClick} style={{fontSize:'16px',fontWeight:'bold'}}>Inbox</Box>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
          <Box style={{fontSize:'16px',fontWeight:'normal'}}>Starred</Box>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}