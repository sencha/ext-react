import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import GridPage from './examples/grid/GridPage'

// function AsideHeader(props) {
//   const { cat } = props;
//   return (
//     <div>hi {cat}</div>
//   )
// }



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSelectedIndex: 0,
      propertySelectedIndex: 0,
      methodSelectedIndex: 0,
      eventSelectedIndex: 0,
      error: null,
      isLoaded: false,
      value: 0,
      items: [],
      name: '',
      first: '',
      restOfText: '',
      text: '',
      properties: [],
      methods: [],
      events: [],
      propertyNames: [],
      methodNames: [],
      eventNames: [],
      asideCategory: '',
      asideName: '',
      asideText: '',
      asideOptional: 'false',
      asideAccessor: 'false',
      asideFrom: '',
      asideType: '',
      asideValue: '',
    };
  }

  componentDidMount() {
    fetch("doc-material-ui/all.json")
      .then(res => res.json())
      .then(
        (result) => {
          var uniq = [...new Set(result)];
          this.setState({
            isLoaded: true,
            items: uniq
          });
          this.onMenuClick(null, 0, 'calendar')
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log(error)
        }
      )
  }

  onMenuClick = (event, index, name) => {
    fetch("doc-material-ui/" + name + ".json")
    .then(res => res.json())
    .then(
      (result) => {

        var afterExtJS = result.text.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'extjs'(.|\n)*?```/g ) , require("./replacer").replacerExtJS )
        var afterReact = afterExtJS.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'ext-react'(.|\n)*?```/g ) , require("./replacer").replacerReact )
        var afterAngular = afterReact.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'ext-angular'(.|\n)*?```/g ) , require("./replacer").replacerAngular )
        var afterHTML = afterAngular.replace( new RegExp( /```html(.|\n)*?(.|\n)*?```/g ) , require("./replacer").replacerHTML )
        var afterWebComponents = afterHTML.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'ext-web-components'(.|\n)*?```/g ) , require("./replacer").replacerWebComponents )

        var afterAll = afterWebComponents
        var res = afterAll.substring(0, afterAll.indexOf(`\n\n`))
        //var restOfText = '<div style="user-select: text;">' + afterAll.slice(afterAll.indexOf(`\n\n`)+2) + '</div>'

        var m = afterAll.slice(afterAll.indexOf(`\n\n`)+2)
        var restOfText = <div style={{color: 'green',userSelect: 'text'}}>{m}</div>

        //var restOfText = <div>hello</div>

        this.setState({
          menuSelectedIndex: index,
          propertySelectedIndex: -1,
          methodSelectedIndex: -1,
          eventSelectedIndex: -1,
          asideCategory: '',
          value: 0,
          name: name,
          text: result.text,
          first: res,
          restOfText: restOfText,
          properties: result.properties,
          methods: result.methods,
          events: result.events,
          propertyNames: result.propertyNames,
          methodNames: result.methodNames,
          eventNames: result.eventNames,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
        console.log(error)
      }
    )
  };

  onPropertyClick = (event, index, name, properties) => {
    //console.log(properties)
    //console.log(properties[index])
    //console.log(properties[index].accessor)
    if (properties[index].optional === undefined) {
      properties[index].optional = 'false'
    }
    else {
      properties[index].optional = properties[index].optional.toString()
    }
    if (properties[index].accessor === undefined) {
      properties[index].accessor = 'false'
    }
    else {
      properties[index].accessor = properties[index].accessor.toString()
    }
    this.setState({
      asideCategory: 'Property',
      asideName: name,
      asideText: properties[index].text,
      asideOptional: properties[index].optional,
      asideAccessor: properties[index].accessor,
      asideFrom: properties[index].from,
      asideType: properties[index].type,
      asideValue: properties[index].value,
      propertySelectedIndex: index,
    });
  }

  onMethodClick = (event, index, name, properties) => {
    //console.log(properties)
    console.log(properties[index])
    this.setState({
      asideCategory: 'Method',
      asideName: name,
      asideText: properties[index].text,
      methodSelectedIndex: index,
    });
  }

  onEventClick = (event, index, name, events) => {
    //console.log(events)
    console.log(events[index])
    this.setState({
      asideCategory: 'Event',
      asideName: name,
      asideText: events[index].text,
      eventSelectedIndex: index,
    });
  }




  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  handleChange = (event, newValue) => {
    //setValue(newValue);
    this.setState({
      value: newValue
    });
  };


  render() {
    const {
      menuSelectedIndex,
      propertySelectedIndex,
      methodSelectedIndex,
      eventSelectedIndex,

      error,
      isLoaded,
      items,

      value,
      name,
      first,
      restOfText,
      text,
      properties,
      methods,
      events,
      propertyNames,
      methodNames,
      eventNames,
      asideCategory,
      asideName,
      asideText,
      asideOptional,
      asideAccessor,
      asideFrom,
      asideType,
      asideValue,

    } = this.state;

    //var propertyList = gotIt(propertyNames, properties, this.onPropertyClick, 0);
    //var methodList = gotIt(methodNames, methods, this.onMethodClick, 0);
    //var eventList = gotIt(eventNames, events, this.onEventClick, 0);

    if (error) {
      return <Box>Error: {error.message}</Box>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;

    } else {

      const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
      var ht = `import { Ext${nameCapitalized} } from "@sencha/ext-react-material-ui";`


      const renderAsideHeader = ()=>{
        if( asideCategory === 'Property' ||
            asideCategory === 'Method' ||
            asideCategory === 'Event'
        ){
          return (
            <div>
              <div style={{fontSize:'36px'}}>
                {asideCategory} Viewer
            </div>
              <div style={{fontSize:'28px'}}>
                {asideName}
              </div>
              <p></p>
              <div style={{fontSize:'14px'}}>
                {asideText}
              </div>
            </div>
          )
        }
      }

      const renderProperty = ()=>{
        if(asideCategory === 'Property'){
          return (
          <div>
            <br/><br/>
            optional: {asideOptional}
            <br/><br/>
            accessor: {asideAccessor}
            <br/><br/>
            data type(s): {asideType}
            <br/><br/>
            default value: {asideValue}
            <br/><br/>
            <br/><br/>
            inherited from: {asideFrom}
         </div>
          )
        }
      }

      const renderMethod = ()=>{
        if(asideCategory === 'Method'){
          return (
          <div>
            method...
         </div>
          )
        }
      }

      const renderRestOfText = ()=>{
      //if(asideCategory === 'Event'){
          return (
          <div>
            {restOfText}
         </div>
          )
      //  }
      }

      const renderEvent = ()=>{
        if(asideCategory === 'Event'){
          return (
          <div>
            event...
         </div>
          )
        }
      }


    return (
      <React.Fragment>
        <Backdrop open={false}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box className="header">header</Box>
        <Box display="flex" flexDirection="row" flex="1" justifyContent="space-between">
          <Box className="nav">
            <List className="list">
              {items.map((name, index) => (
                <ListItem
                  button
                  key={index}
                  selected={menuSelectedIndex === index}
                  onClick={(event) => this.onMenuClick(event, index, name)}
                >
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className="article">


            <Typography variant="h3">
              Ext{nameCapitalized}
            </Typography>

            <Typography variant="h5">

              {ht}
              <p></p>
              {first}
              <p></p>

              {renderRestOfText()}

            </Typography>

            <div style={{marginTop:'20px',height:'200px',overflow:'scroll'}}>{text}</div>


            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
              <Tab label="Examples" {...this.a11yProps(0)} />
                <Tab label="Properties" {...this.a11yProps(1)} />
                <Tab label="Methods" {...this.a11yProps(2)} />
                <Tab label="Events" {...this.a11yProps(3)} />
              </Tabs>
            </AppBar>

            {/* <TabPanel2 value={value} index={0} type={propertyList}/>
            <TabPanel2 value={value} index={1} type={methodList}/>
            <TabPanel2 value={value} index={2} type={eventList}/> */}


            <TabPanelExample
              value={value}
              index={0}
              names={propertyNames}
              data={properties}
              typeSelectedIndex={propertySelectedIndex}
              onClick={this.onPropertyClick}
            />



            <TabPanel
              value={value}
              index={1}
              names={propertyNames}
              data={properties}
              typeSelectedIndex={propertySelectedIndex}
              onClick={this.onPropertyClick}
            />
            <TabPanel
              value={value}
              index={2}
              names={methodNames}
              data={methods}
              typeSelectedIndex={methodSelectedIndex}
              onClick={this.onMethodClick}
            />
            <TabPanel
              value={value}
              index={3}
              names={eventNames}
              data={events}
              typeSelectedIndex={eventSelectedIndex}
              onClick={this.onEventClick}
            />





          </Box>
          <Box className="aside">
            {renderAsideHeader()}
            {renderProperty()}
            {renderMethod()}
            {renderEvent()}
          </Box>
        </Box>
        <Box className="footer">footer</Box>
      </React.Fragment>
    )


      // return (
      //   <ul>
      //     {items.map(item => (
      //       <li key={item}>
      //         {item}
      //       </li>
      //     ))}
      //   </ul>
      // );
    }


  //   <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
  //   {list(anchor)}
  // </Drawer>


  }

  // list = (items) => (
  //   <List className="list">
  //   {items.map((text, index) => (
  //     <ListItem button key={text}>
  //       <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
  //       <ListItemText primary={text} />
  //     </ListItem>
  //   ))}
  // </List>
  // )

}


function TabPanel(props) {
  const { value, index, names, data, typeSelectedIndex, onClick } = props;
  return (
    <Typography
      style={{height:'400px',overflow:'scroll'}}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
    {value === index &&
      <List className="list">
      {names.map((name, index) => {return(
        <ListItem
          button
          key={index}
          selected={typeSelectedIndex === index}
          onClick={(event) => onClick(event, index, name, data)}
        >
          <ListItemText primary={name}/>
        </ListItem>
      )})}
      </List>
    }
    </Typography>
  );
}

function TabPanelExample(props) {
  const { value, index, names, data, typeSelectedIndex, onClick } = props;
  return (
    <Typography
      style={{height:'400px',overflow:'scroll'}}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
    {value === index &&


        <GridPage />

    }
    </Typography>
  );
}






// function TabPanel2(props) {
//   const { value, index, type } = props;
//   return (
//     <div hidden={value !== index} style={{height:'400px',overflow:'scroll'}}>
//       {type}
//     </div>
//   );
// }

// function TabPanel3(props) {
//   const { value, index, type } = props;
//   return (
//     <Typography
//       style={{height:'400px',overflow:'scroll'}}
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//     >
//       {type}
//     </Typography>
//   );
// }


    // const gotIt = (names, data, onClick, typeSelectedIndex) =>
    // {
    //   var it = names.map((name, index) => {
    //     return (
    //       <ListItem
    //         button
    //         key={index}
    //         selected={typeSelectedIndex === index}
    //         onClick={(event) => onClick(event, index, name, data)}
    //       >
    //         <ListItemText primary={name}/>
    //       </ListItem>
    //     )
    //   })
    //   return it;
    // }


