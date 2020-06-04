import React, { useState, useEffect } from 'react';

import axios from "axios";
import Box from '@material-ui/core/Box';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';

import Header from './Header';
import Nav from './Nav';
import Title from './Title';
//import CenterBottom from './CenterBottom';
//import { CenterPanelOverview } from './CenterPanelOverview';
import { CenterPanelExamples } from './CenterPanelExamples';
import Aside from './Aside';

export const AppRecent = () => {
  const [code, setCode] = useState({});
  const [items, setItems] = useState(null);
  const [menuSelectedIndex, setMenuSelectedIndex] = useState(0);
  //const [name, setName] = useState('');
  const [reactname, setReactname] = useState('');
  const [text, setText] = useState('');
  //const [textformatted, setTextformatted] = useState('');

  const [centervalue, setCentervalue] = useState(0);
  const [asidevalue, setAsidevalue] = useState(0);

  const [propertyNames, setPropertyNames] = useState([]);
  const [properties, setProperties] = useState([]);
  //const [propertySelectedIndex, setPropertySelectedIndex] = useState('');
  const [methodNames, setMethodNames] = useState([]);
  const [methods, setMethods] = useState([]);
  //const [methodSelectedIndex, setMethodSelectedIndex] = useState('');
  const [eventNames, setEventNames] = useState([]);
  const [events, setEvents] = useState([]);
  //const [eventSelectedIndex, setEventSelectedIndex] = useState('');

  //const [xtype, setXtype] = useState('');
  const [importtext, setImporttext] = useState('');
  const [examples, setExamples] = useState([]);
  const [examples2, setExamples2] = useState([]);
  const [whichexample, setWhichexample] = useState(0);

  useEffect(() => {
    const code = window._code;
    setCode(code);
    //console.log(code['3DPie']['3DPie.js'])
    axios
      .get("doc-material-ui/all.json")
      .then(({ data }) => {
        setItems(data);
        onMenuClick(0, 'ExtCalendar')
      });
  }, []);

  const onMenuClick = (index, name) => {
    //console.log(new Date())
    setMenuSelectedIndex(index)
    axios
    .get("doc-material-ui/" + name + ".json")
    .then(({ data }) => {
      console.log(new Date())
      setText(data.text)
      setImporttext(`import { ${reactname} } from "@sencha/ext-react-material-ui";`)
      //setName(data.name)
      setReactname(data.reactname)
      setPropertyNames(data.propertyNames)
      setMethodNames(data.methodNames)
      setEventNames(data.eventNames)
      setProperties(data.properties)
      setMethods(data.methods)
      setEvents(data.events)
      setExamples([
        {name: 'ex1', text: 'text'},
        {name: 'Ex2', text: 'text'},
      ])



      var theList = require("./examples/ExampleList").getExamples(data.reactname)
      console.log(theList)
      setExamples2(theList)

      //var afterExtJS = data.text.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'extjs'(.|\n)*?```/g ) , require("./replacer").replacerExtJS )
      //var afterReact = afterExtJS.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'ext-react'(.|\n)*?```/g ) , require("./replacer").replacerReact )
      //var afterAngular = afterReact.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'ext-angular'(.|\n)*?```/g ) , require("./replacer").replacerAngular )
      //var afterHTML = afterAngular.replace( new RegExp( /```html(.|\n)*?(.|\n)*?```/g ) , require("./replacer").replacerHTML )
      //var afterWebComponents = afterHTML.replace( new RegExp( /```javascript\n[ ]*@example[(][ ]*{[ ]*framework:[ ]*'ext-web-components'(.|\n)*?```/g ) , require("./replacer").replacerWebComponents )
      //var afterAll = afterWebComponents
      //var afterAll = afterExtJS
      //var afterAll = data

      //var res = afterAll.substring(0, afterAll.indexOf(`\n\n`))
      //var restOfText = '<div style="user-select: text;">' + afterAll.slice(afterAll.indexOf(`\n\n`)+2) + '</div>'

      //var m = afterAll.slice(afterAll.indexOf(`\n\n`)+2)
      //var textformatted = <div style={{height:'5px',color: 'green',userSelect: 'text'}}>{afterAll}</div>
      //setTextformatted(textformatted)
    });
  }

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleAsideValueChange = (event, newValue) => {
    setAsidevalue(newValue)
  };

  const handleCenterValueChange = (event, newValue) => {
    setCentervalue(newValue)
  };

  const onPropertyClick = (event, index, name, properties) => {
  }

  const onMethodClick = (event, index, name, methods) => {
  }

  const onEventClick = (event, index, name, events) => {
  }

  const onExamplesClick = (event, index, rowname) => {
    setWhichexample(index)
  }

  return items ? (
    <React.Fragment>
      <Box className="header border">
        <Header/>
      </Box>
      <Box className="main border">
        <Box className="nav border">
          <Nav
            items={items}
            menuSelectedIndex={menuSelectedIndex}
            onMenuClick={onMenuClick}
          />
        </Box>
        <Box className="center border">
          <Title
            reactname={reactname}
          />
          <div style={{flex: '1', display: 'flex', flexDirection: 'column', overflow: 'auto', border: '1px solid red'}}>
            {/* <CenterPanelOverview
              style={{display: 'flex',flex:'1',xheight:'5px'}}
              xstyle={{xminHeight:'300px',xmaxHeight:'300px',display:'flex',flex:'1',xflexGrow:'0',xflexShrink:'0',xflexBasis:'auto',overflow:'auto',flexDirection:'column',justifyContent:'space-between'}}
                centervalue={centervalue}
                text={text}
                index={0}
            /> */}

            {/* <Typography
            style={{flex:'1',xheight:'5px'}}
              xstyle={{xmaxHeight:'300px',display:'flex',flexGrow:'1',flexShrink:'0',flexBasis:'auto',overflow:'auto',flexDirection:'column',justifyContent:'space-between'}}
              component="div"
              role="tabpanel"
              hidden={centervalue !== index}
              id={`center-tabpanel-${index}`}
              aria-labelledby={`center-tab-${index}`}
            > */}
            {centervalue === 0 &&
              <div style={{flex: '1', display: 'flex', flexDirection: 'row', overflow: 'auto', border: '1px solid red'}}>
              <Typography variant="h5">
                {importtext}
              </Typography>
              <Typography variant="h5">
                <pre>
                {text}
                </pre>
              </Typography>

              <Aside
            asidevalue={asidevalue}
            handleAsideValueChange={handleAsideValueChange}
            propertyNames={propertyNames}
            properties={properties}
            onPropertyClick={onPropertyClick}
            methodNames={methodNames}
            methods={methods}
            onMethodClick={onMethodClick}
            eventNames={eventNames}
            events={events}
            onEventClick={onEventClick}
          />

              </div>
            }
            {/* </Typography> */}
            <CenterPanelExamples
              code={code}
              xstyle={{xminHeight:'300px',xmaxHeight:'300px',display:'flex',flexGrow:'0',flexShrink:'0',flexBasis:'auto',flexDirection:'column',justifyContent:'space-between'}}
              centervalue={centervalue}
              examples2 ={examples2}
              whichexample={whichexample}
              examples={examples}
              index={1}
              onClick={onExamplesClick}
            />
          </div>
          <div style={{height: '50px',border: '1px solid green'}}>
            <AppBar position="static">
              <Tabs style={{xheight:'5px'}} value={centervalue} onChange={handleCenterValueChange} aria-label="center tabs example">
                {/* <Tab label="Examples" {...a11yProps(0)} /> */}
                <Tab label="Overview" {...a11yProps(0)} />
                <Tab label="Examples" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
          </div>





          {/* <CenterBottom
          reactname={reactname}
          code={code}
            text={text}
            examples2={examples2}
            whichexample={whichexample}
            examples={examples}
            centervalue={centervalue}
            handleCenterValueChange={handleCenterValueChange}
            onExamplesClick={onExamplesClick}
          /> */}
          {/* <Center
            importtext={importtext}
            text={text}
            reactname={reactname}
          />
          <Examples
            whichexample={whichexample}
            importtext={importtext}
            text={text}
            examples={examples}
            examples2={examples2}
            onClick={onExamplesClick}
          /> */}
        </Box>
        <Box className="aside border" >
          <Aside
            asidevalue={asidevalue}
            handleAsideValueChange={handleAsideValueChange}
            propertyNames={propertyNames}
            properties={properties}
            onPropertyClick={onPropertyClick}
            methodNames={methodNames}
            methods={methods}
            onMethodClick={onMethodClick}
            eventNames={eventNames}
            events={events}
            onEventClick={onEventClick}
          />
        </Box>
      </Box>
      <Box className="footer border">
        footer
      </Box>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
}