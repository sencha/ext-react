import React, { useState, useEffect } from 'react';
import {
  ExtGrid,
  ExtCalendar
} from "@sencha/ext-react-material-ui";
import axios from "axios";
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'
import theme from'./dark'
import Box from '@material-ui/core/Box';
import NestedList from './NestedList';
import Title from './Title';
import Aside from './Aside';

export const App = () => {
  const [examplename, setExamplename] = useState('');
  const [code, setCode] = useState({});
  const [reactname, setReactname] = useState('');
  const [importtext, setImporttext] = useState('');
  const [text, setText] = useState('');
  const [asidevalue, setAsidevalue] = useState(0);
  const [propertyNames, setPropertyNames] = useState([]);
  const [properties, setProperties] = useState([]);
  const [methodNames, setMethodNames] = useState([]);
  const [methods, setMethods] = useState([]);
  const [eventNames, setEventNames] = useState([]);
  const [events, setEvents] = useState([]);
  const [maintab, setMaintab] = useState(2);
  const [aside, setAside] = useState(0);

 // useEffect(() => {
    // axios
    //   .get("doc-material-ui/all.json")
    //   .then(({ data }) => {
    //     //setItems(data);
    //     //onMenuClick(0, 'ExtCalendar')
    //   });
  //}, []);

  const onMenuClick = (name, key, type, reactname) => {
    switch (type) {
      case 'overview':
        setMaintab(0);
        setReactname(reactname)
        setImporttext(`import { ${reactname} } from "@sencha/ext-react-material-ui";`)
        axios
        .get("doc-material-ui/" + reactname + ".json")
        .then(({ data }) => {
          setText(data.text)
        });
        axios
        .get("doc-material-ui/" + reactname + "Properties.json")
        .then(({ data }) => {
          setPropertyNames(data.propertyNames)
          setProperties(data.properties)
        });
        axios
        .get("doc-material-ui/" + reactname + "Methods.json")
        .then(({ data }) => {
          setMethodNames(data.methodNames)
          setMethods(data.methods)
        });
        axios
        .get("doc-material-ui/" + reactname + "Events.json")
        .then(({ data }) => {
          setEventNames(data.eventNames)
          setEvents(data.events)
        });
        break;
      case 'example':
        setMaintab(1);
        setReactname(reactname)
        var codeitem = reactname + '/' + name + '.js'
        console.log(window._code[codeitem])
        setCode(window._code[codeitem])
        setExamplename(name)
        break;
      case 'home':
        setMaintab(2);
        break;
      case 'guide':
        setMaintab(3);
        break;
      default:
        break;
    }
  }

  const handleAsideValueChange = (event, newValue) => {
    setAsidevalue(newValue)
  };

  const onPropertyClick = (event, index, name, properties) => {
  }

  const onMethodClick = (event, index, name, methods) => {
  }

  const onEventClick = (event, index, name, events) => {
  }

  const scope = { ExtGrid, ExtCalendar };

  return (
    <React.Fragment>
      {/* header */}
      {/* <Box className="hHeader"></Box> */}
      {/* <Box className="h64 header"></Box> */}
      {/* header */}
      {/* main */}
      <Box className="hbox">
        {/* nav */}
        <Box className="w300 vbox">
          <Box className="hTitleleft">
            <img style={{margin:'12px 2px 2px 82px'}} alt="" src="files/footer-logo.png"/>
            <img style={{margin:'2px 2px 2px 12px'}} alt="" width="60px" src="files/logo_raw.svg"/>
            <div style={{margin:'2px 2px 10px 20px'}} >ExtReact for Material UI Documentation</div>
          </Box>
          <Box className="vbox senchablue">
            <NestedList onMenuClick={onMenuClick}/>
          </Box>
        </Box>
        {/* nav */}
        {/* center */}
        <Box className="hbox">
          {/* title and detail */}
          <Box className="vbox">
            {/* title */}
            <Box className="hTitle hbox">
              <Title
                reactname={reactname}
                importtext={importtext}
              />
            </Box>
            {/* title */}
            {/* detail section */}
            {maintab === 0 &&
            <Box className="hbox border">
              {/* text section */}
              <Box className="vbox">
                <pre style={{fontSize:'18px',fontFamily:'Roboto',padding:'30px'}}>
                  {text}
                </pre>
              </Box>
              {/* text section */}
              {/* property method event section */}
              <Box className="vbox">
                <Box className="vbox">
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
              {/* property method event section */}
            </Box>
            }
            {/* detail section */}
            {/* examples section */}
            {maintab === 1 &&
            <Box className="hbox border" style={{background:'lightgray'}}>
              <div className="vbox ">
                <Box className='h64' style={{margin:'20px 20px 0 20px',background:'white',border:'1px solid gray',}}>
                  {reactname} - {examplename}
                </Box>
                <LiveProvider
                  code={code}
                  scope={scope}
                  theme={theme}
                >
                  <div className="hbox">
                    <LiveEditor style={{flex:'1',overflow:'auto',margin:'20px 0 20px 20px',border:'1px solid gray',whiteSpace:'inherit'}}/>
                    <LivePreview style={{flex:'1',margin:'20px',border:'1px solid gray'}}/>
                  </div>
                  <LiveError style={{flex:'1',margin:'20px',border:'1px solid gray',background:'white'}}/>
                </LiveProvider>
              </div>
              {/* example code */}
            </Box>
            }
            {maintab === 2 &&
              <Box className="hbox" style={{padding:'20px',borderLeft:'1px solid gray'}}>
                Welcome to the ExtReact for Material Documentation
              </Box>
            }
            {maintab === 3 &&
              <Box className="hbox" style={{padding:'20px',borderLeft:'1px solid gray'}}>
                Guide
              </Box>
            }
            {/* examples section */}
          </Box>
          {/* title and detail */}
        </Box>
        {/* center */}
        {/* aside */}
        {aside === 1 &&
        <Box className="w300 vbox border">aside</Box>
        }
        {/* aside */}
      </Box>
      {/* main */}
      {/* <Box className="h50 border footer"></Box> */}
     </React.Fragment>
  );
}