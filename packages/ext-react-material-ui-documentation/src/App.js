import React, { useState, useEffect } from 'react';
import { ExtGrid } from "@sencha/ext-react-material-ui";
import axios from "axios";
import Prism from "prismjs";
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'
import theme from'./dark'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import Nav from './Nav';
import Title from './Title';
import Aside from './Aside';
import Components from "./examples/Components.js"

export const App = () => {
  // const thecode = `
  // const foo = 'foo';
  // const bar = 'bar';
  // console.log(foo + bar);
  // `.trim()


  const [detailsbutton, setDetailsbutton] = useState('primary');
  const [examplesbutton, setExamplesbutton] = useState('default');

  const [examples, setExamples] = useState([]);
  const [examplesindex, setExamplesindex] = useState(0);

  //const [code, setCode] = useState({});
  const [items, setItems] = useState(null);
  const [menuSelectedIndex, setMenuSelectedIndex] = useState(0);
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

  const [whichexample, setWhichexample] = useState(0);

  const [maintab, setMaintab] = useState(0);
  const [detailstab, setDetailstab] = useState(0);
  const [aside, setAside] = useState(0);

  useEffect(() => {
    //const code = window._code;
    var examples = require("./examples/ExampleList").getCode(reactname)
    setExamples(examples);
    setExamplesindex(0);
    //console.log(theList)
    //setCode(codeGrid);
    axios
      .get("doc-material-ui/all.json")
      .then(({ data }) => {
        setItems(data);
        onMenuClick(0, 'ExtCalendar')



      });
  }, []);

  const onExamplesClick = (event, index, name) => {
    setExamplesindex(index)

  }

  const onMenuClick = (index, name) => {
    setMenuSelectedIndex(index)
    setReactname(name)
    setImporttext(`import { ${name} } from "@sencha/ext-react-material-ui";`)


    axios
    .get("doc-material-ui/" + name + ".json")
    .then(({ data }) => {
      setText(data.text)
    });

    axios
    .get("doc-material-ui/" + name + "Properties.json")
    .then(({ data }) => {
      setPropertyNames(data.propertyNames)
      setProperties(data.properties)
    });

    axios
    .get("doc-material-ui/" + name + "Methods.json")
    .then(({ data }) => {
      setMethodNames(data.methodNames)
      setMethods(data.methods)
    });

    axios
    .get("doc-material-ui/" + name + "Events.json")
    .then(({ data }) => {
      setEventNames(data.eventNames)
      setEvents(data.events)
    });

            //window['Prism'].highlightAll();
            setTimeout(() => {
              console.log('prism')
              Prism.highlightAll()
            }, 0)


  }

  const handleAsideValueChange = (event, newValue) => {
    setAsidevalue(newValue)
  };

  // const handleCenterValueChange = (event, newValue) => {
  //   setCentervalue(newValue)
  // };

  const onPropertyClick = (event, index, name, properties) => {
  }

  const onMethodClick = (event, index, name, methods) => {
  }

  const onEventClick = (event, index, name, events) => {
  }

  const onMainTabClick = (event, value) => {
    setMaintab(value);
    if (value == 0) {
      setDetailsbutton('primary')
      setExamplesbutton('default')
    }
    else {
      setDetailsbutton('default')
      setExamplesbutton('primary')
    }
  }

  const onDetailsTabClick = (event, value) => {
    setDetailstab(value);
  }

  const scope = { ExtGrid };

  return items ? (
    <React.Fragment>
      {/* header */}

      {/* <Box className="hHeader">
        <Typography style={{margin:'2px 2px 22px 2px'}} component="h4" variant="h4" align="center" color="textPrimary" >
          <img style={{margin:'2px 2px 2px 2px'}} alt="" src="./files/footer-logo.png"/>
          <img style={{margin:'2px 2px 2px 2px'}} alt="" width="60px" src="./files/logo_raw.svg"/>
          <span style={{margin:'2px 2px 10px 20px'}} >ExtReact for Material UI Documentation</span>

        </Typography>
      </Box> */}



      {/* <Box className="h64 header">
        <div style={{fontSize:'24px',color:'white',margin:'13px 10px 10px 20px'}}>
        ExtReact for Material-UI Documentation
        </div>
      </Box> */}
      {/* header */}
      {/* main */}
      <Box className="hbox">
        {/* nav */}
        <Box className="w300 vbox">
          <Box className="hTitleleft">
            <img style={{margin:'12px 2px 2px 82px'}} alt="" src="./files/footer-logo.png"/>
            <img style={{margin:'2px 2px 2px 12px'}} alt="" width="60px" src="./files/logo_raw.svg"/>
            <div style={{margin:'2px 2px 10px 20px'}} >ExtReact for Material UI Documentation</div>
          </Box>
          <Box style={{flex:'1',overflow:'auto'}}>
            <Nav
              items={items}
              menuSelectedIndex={menuSelectedIndex}
              onMenuClick={onMenuClick}
            />
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
                {/* property method event tabs section */}
                {/* <Box className="h50 hbox border">
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={(event) => onDetailsTabClick(event, 0)}>Properties Tab</Button>
                    <Button onClick={(event) => onDetailsTabClick(event, 1)}>Methods Tab</Button>
                    <Button onClick={(event) => onDetailsTabClick(event, 2)}>Events Tab</Button>
                  </ButtonGroup>
                </Box> */}
                {/* property method event tabs section */}
                {detailstab === 0 &&
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
                }
                {detailstab === 1 &&
                <Box className="vbox border">
                  methods
                </Box>
                }
                {detailstab === 2 &&
                <Box className="vbox border">
                  events
                </Box>
                }
              </Box>
              {/* property method event section */}
            </Box>
            }
            {/* detail section */}
            {/* examples section */}
            {maintab === 1 &&
            <Box className="hbox border">
              {/* examples list */}
              <Box className="w150 vbox">
                <TableContainer component={Paper}>
                  <Table className="" aria-label="simple table">
                    <TableBody>
                      {examples.map((row, index) => (
                        <TableRow
                          key={index}
                          hover
                          // onClick={(event) => handleClick(event, row.name)}
                          onClick={(event) => onExamplesClick(event, index, row.name)}
                        >
                          <TableCell component="th" scope="row">
                            <div style={{color:'blue'}}>{row.name}</div>
                            <p></p>
                            {row.text}
                            <p></p>
                            {row.desc}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              {/* examples list */}
              {/* example app */}
              {/* <Box className="vbox border">
              <div style={{flex: '1', display: 'flex', border: '1px solid yellow'}}>
                {Components(reactname, whichexample)}
              </div>
              </Box> */}
              {/* example app */}
              {/* example code */}


              <div className="vbox ">
                <LiveProvider
                  code={examples[examplesindex].code}
                  scope={scope}
                  theme={theme}
                >
                  <div className="hbox ">
                    <LiveEditor style={{flex:'1',overflow:'auto',whiteSpace:'inherit'}}/>
                    <LivePreview style={{flex:'1'}}/>
                  </div>
                  <LiveError />
                </LiveProvider>
              </div>



              {/* <Box className="hbox border">
                <LiveProvider code={code['3DPie']['3DPie.js']} noInline={true}>
                  <Box className="vbox border">
                  <LiveEditor xstyle={{display:'flex',flexDirection:'row',overflow:'auto'}} className="w300 border"/>
                  </Box>
                  <LivePreview className="hbox border"/>
                  <LiveError className="hbox border"/>
                </LiveProvider>
              </Box> */}



              {/* example code */}
            </Box>
            }
            {/* examples section */}
            <Box className="h50 hbox"> {/* tabs for body */}
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button color={detailsbutton} onClick={(event) => onMainTabClick(event, 0)}>Details Tab</Button>
                <Button color={examplesbutton} onClick={(event) => onMainTabClick(event, 1)}>Examples Tab</Button>
              </ButtonGroup>
            </Box>
          </Box>
          {/* title and detail */}
        </Box>
        {/* center */}
        {/* aside */}
        {aside === 1 &&
        <Box className="w300 vbox border">
          aside
        </Box>
        }
        {/* aside */}
      </Box>
      {/* main */}
      {/* <Box className="h50 border footer"></Box> */}
     </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
}