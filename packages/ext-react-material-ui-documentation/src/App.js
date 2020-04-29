import React, { useState, useEffect } from 'react';
import {
  ExtCalendar,
  ExtCalendar_day,
  ExtCalendar_days,
  ExtCalendar_daysview,
  ExtCalendar_dayview,
  ExtCalendar_list,
  ExtCalendar_month,
  ExtCalendar_monthview,
  ExtCalendar_multiview,
  ExtCalendar_week,
  ExtCalendar_weeks,
  ExtCalendar_weeksview,
  ExtCalendar_weekview,
  ExtChart,
  ExtD3,
  ExtD3_canvas,
  ExtD3_heatmap,
  ExtD3_horizontal_tree,
  ExtD3_pack,
  ExtD3_partition,
  ExtD3_sunburst,
  ExtD3_svg,
  ExtD3_tree,
  ExtD3_treemap,
  ExtGrid,
  ExtPivotd3container,
  ExtPivotgrid,
  ExtPivotheatmap,
  ExtPivottreemap,
  ExtPolar,
  ExtTree,
  ExtTreelist
} from "@sencha/ext-react-material-ui";
import axios from "axios";
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';
import theme from'./dark'
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import NestedList from './NestedList';
import Title from './Title';
import Aside from './Aside';
//import ReactMarkdown from 'react-markdown'
import ReactMarkdown from 'react-markdown/with-html'
//import SplitPane from 'react-split-pane'

export const App = () => {
  const homepage = `${process.env.PUBLIC_URL}/`;
  const logoExtReact = homepage + `assets/images/footer-logo.png`;
  const logoMaterialUI = homepage + `assets/images/logo_raw.svg`;
  //const [menuSelectedIndex, setMenuSelectedIndex] = useState(110);
  const [title, setTitle] = useState('');
  const [rootopen, setRootopen] = useState(false);
  //const [setShow] = useState('docs');
  const [textforshow, setTextforshow] = useState('Documentation');
  const [data, setData] = useState([]);
  const [version] = useState('7.2.1.0');
  const [menu, setMenu] = useState([]);
  const [guide, setGuide] = useState('');
  const [examplename, setExamplename] = useState('');
  const [overviewcode, setOverviewcode] = useState('');
  const [code, setCode] = useState('');
  const [reactname, setReactname] = useState('');
  //const [importtext, setImporttext] = useState('');
  const [text, setText] = useState('');
  const [asidevalue, setAsidevalue] = useState(0);
  const [propertyNames, setPropertyNames] = useState([]);
  const [properties, setProperties] = useState([]);
  const [methodNames, setMethodNames] = useState([]);
  const [methods, setMethods] = useState([]);
  const [eventNames, setEventNames] = useState([]);
  const [events, setEvents] = useState([]);
  const [maintab, setMaintab] = useState(5);
  const [aside] = useState(0);

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  useEffect(() => {
    //setVersion(process.env.REACT_APP_VERSION)
    //http://localhost:3000/?show=examples#home
    var menu = ''
    var showparm = getUrlParameter('show')
    if (showparm.trim() === 'examples') {
      showparm = 'examples'
      setTextforshow('Examples')
      menu = homepage + "assets/menu/examplesmenu.json"
      setRootopen(true)
    }
    else {
      showparm = 'docs'
      setTextforshow('Documentation')
      menu = homepage + "assets/menu/docsmenu.json"
      setRootopen(false)
    }
    //setShow(showparm)
    //var hash = window.location.hash.substring(1);
    //console.log(hash)
    axios
      .get(menu)
      .then(({ data }) => {
        setMenu(data);
        // setMenuSelectedIndex(100)
        // window.location.hash = 'home'
        if(showparm === 'docs') {
          onMenuClick('Home Name', 'home', 'Home', 'Home', 'Home')
        }
        else {
          onMenuClick('Examples Name', 'exampleshome', 'ExtExampleshome', 'Examples', 'Examples')
        }
      });
  }, []);


  const onMenuClick = (name, type, reactname, componentname, title) => {
    // console.log(name)
    // console.log(type)
    // console.log(reactname)
    // console.log(componentname)
    // console.log(title)
    if (rootopen == true) {
      setRootopen(false)
    }
    var folder = ''
    var examplename = ''
    function useNull() {return null;}
    if (title !== undefined) {
      setTitle(title)
    }
    else {
      setTitle('')
    }
    switch (type) {
      case 'overview':
        setOverviewcode('')
        setMaintab(5);
        folder = reactname
        examplename = 'Overview'
        var overviewCode = homepage + 'assets/code/' + folder + '/' + examplename + '.js'
        var overviewData = homepage + 'assets/code/' + folder + '/' + examplename + '.json'
        var generalData = homepage + 'assets/code/' + folder + '/data.json';
        var overviewText = homepage + "assets/doc-material-ui/" + reactname + ".json"
        var properties = homepage + "assets/doc-material-ui/" + reactname + "Properties.json"
        var methods = homepage + "assets/doc-material-ui/" + reactname + "Methods.json"
        var events = homepage + "assets/doc-material-ui/" + reactname + "Events.json"
        axios.all([
          axios.get(overviewCode).catch(useNull),
          axios.get(overviewData).catch(useNull),
          axios.get(generalData).catch(useNull),
          axios.get(overviewText).catch(useNull),
          axios.get(properties).catch(useNull),
          axios.get(methods).catch(useNull),
          axios.get(events).catch(useNull),
        ]).then(axios.spread(function (
            resOverviewCode,
            resOverviewData,
            resGeneralData,
            resOverviewText,
            resProperties,
            resMethods,
            resEvents
          ) {
            var theData = []
            if (resOverviewData != null) {
              theData = resOverviewData.data
            }
            else if (resGeneralData != null) {
              theData = resGeneralData.data
            }
            //console.clear()

            //setImporttext(`import { ${reactname} } from "@sencha/ext-react-material-ui";`)
            setTitle(`${reactname}  -> import { ${reactname} } from "@sencha/ext-react-material-ui";`)

            function replacerCfgLink(match) {
              var b = '~~' + match + '~~'
              return b
              // //console.log(match)
              // var s = match.indexOf('!')
              // var e = match.lastIndexOf('#')
              // var val = match.substring(s+1,e-1)
              // return `<a href="javascript:sendToContext('cfg','${val}');">${val}</a>`
              //return `<span class="tooltip" xstyle="background:lightgray;border-bottom: 1px dotted black;">${val}<span class="tooltiptext">Tooltip text</span></span>`
            }
            // function replacerOtherLink(match) {
            //   var start = match.lastIndexOf('.');
            //   var end = match.length;
            //   var val = match.substring(start+1,end-1)
            //   var a = '**' + val + '**'
            //   var b = '~~' + match + '~~'
            //   return a + ' ' + b
            // }

            var afterCfgLink = resOverviewText.data.text.replace( new RegExp( /[{]@link #cfg(.)*?[}]/g) , replacerCfgLink )
            //var afterCfgLink = resOverviewText.data.text.replace( new RegExp( /[{]@link.*[}]/g) , replacerCfgLink )
            setText(afterCfgLink)
            //setText(resOverviewText.data.text)
            setPropertyNames(resProperties.data.propertyNames)
            setProperties(resProperties.data.properties)
            setMethodNames(resMethods.data.methodNames)
            setMethods(resMethods.data.methods)
            setEventNames(resEvents.data.eventNames)
            setEvents(resEvents.data.events)

            setReactname(reactname)
            setData(theData)
            setOverviewcode(resOverviewCode.data)
            setMaintab(0);
          }));
        break;
        case 'example':
          setCode('')
          setMaintab(5);
          folder = componentname; //'Ext' + reactname
          examplename = name
          var exampleCode = homepage + 'assets/code/' + folder + '/' + examplename + '.js'
          var exampleData = homepage + 'assets/code/' + folder + '/' + examplename + '.json'
          var general2Data = homepage + 'assets/code/' + folder + '/data.json';
          axios.all([
            axios.get(exampleCode).catch(useNull),
            axios.get(exampleData).catch(useNull),
            axios.get(general2Data).catch(useNull),
          ]).then(axios.spread(function (
            resExampleCode,
            resExampleData,
            resGeneral2Data,
          ) {
            var theData = []
            if (resExampleData != null) {
              theData = resExampleData.data
            }
            else if (resGeneral2Data != null) {
              theData = resGeneral2Data.data
            }
            //console.clear()
            setExamplename(name)
            setReactname(reactname)
            setData(theData)
            setCode(resExampleCode.data)
            setMaintab(1);
          }));
        break;
        case 'guide':
          setMaintab(3);
          axios
          .get(homepage + 'assets/guides/' + componentname + '/' + name + '.md')
          .then(({ data }) => {
            setGuide(data)
          });
          break;
        case 'exampleshome':
          setMaintab(3);
          axios
          .get(homepage + "assets/guides/Home/exampleshome.md")
          .then(({ data }) => {
            setGuide(data)
          });
          break;
        case 'home':
            setMaintab(3);
            axios
            .get(homepage + "assets/guides/Home/Home.md")
            .then(({ data }) => {
              setGuide(data)
            });
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

  const scope = {
    data,
    ExtCalendar,
    ExtCalendar_day,
    ExtCalendar_days,
    ExtCalendar_daysview,
    ExtCalendar_dayview,
    ExtCalendar_list,
    ExtCalendar_month,
    ExtCalendar_monthview,
    ExtCalendar_multiview,
    ExtCalendar_week,
    ExtCalendar_weeks,
    ExtCalendar_weeksview,
    ExtCalendar_weekview,
    ExtChart,
    ExtD3,
    ExtD3_canvas,
    ExtD3_heatmap,
    ExtD3_horizontal_tree,
    ExtD3_pack,
    ExtD3_partition,
    ExtD3_sunburst,
    ExtD3_svg,
    ExtD3_tree,
    ExtD3_treemap,
    ExtGrid,
    ExtPivotd3container,
    ExtPivotgrid,
    ExtPivotheatmap,
    ExtPivottreemap,
    ExtPolar,
    ExtTree,
    ExtTreelist
   };

  return menu.length ? (
    <React.Fragment>
      {/* header */}
      {/* <Box className="h64 header hHeader"></Box> */}
      {/* header */}
      {/* main */}
      <Box className="hbox">
        {/* nav */}
        <Box className="w300 vbox">
          <Box className="hTitleleft">
            {/* <Avatar alt="" variant="square" src={logoExtReact} />
            <Avatar alt="" variant="square" src={logoMaterialUI} /> */}
            <img style={{margin:'12px 2px 2px 32px'}} alt="" src={logoExtReact}/>
            <img style={{margin:'2px 2px 2px 12px'}} alt="" width="60px" src={logoMaterialUI}/>
            <div style={{margin:'2px 2px 10px 20px'}} >ExtReact for Material UI {textforshow}</div>
          </Box>
          <Box className="vbox senchablue">
            {/* <NestedList menu={menu} menuSelectedIndex={menuSelectedIndex} onMenuClick={onMenuClick}/> */}
            <NestedList menu={menu} rootopen={rootopen} onMenuClick={onMenuClick}/>
          </Box>
        </Box>
        {/* nav */}
        {/* <Box className="w300 vbox">splitter</Box> */}
        {/* center */}
        <Box className="hbox">
          {/* title and detail */}
          <Box className="vbox">
            {/* title */}
            <Box className="hTitle hbox">
              <Title title={title} version={version}/>
            </Box>
            {/* title */}
            {/* detail section */}
            {maintab === 0 &&
            <Box className="hbox border" style={{background:'lightgray'}}>
              {/* text section */}
              <Box className="vbox" style={{margin:'20px 10px 20px 20px',background:'white',border:'1px solid gray',padding:'20px'}}>
                <ReactMarkdown source={text} escapeHtml={false}/>
                {/* <pre style={{fontSize:'14px',fontFamily:'Roboto',padding:'30px'}}>
                  {text}
                </pre> */}
              </Box>
              {/* text section */}
              {/* property method event section */}
              <Box className="vbox">
                <Box className="hbox shadow" style={{flex:'1',margin:'20px 20px 10px 20px',border:'1px solid gray',background:'white'}}>
                  {overviewcode !== '' &&
                  <LiveProvider code={overviewcode} scope={scope} theme={theme}>
                   <LivePreview style={{flex:'1'}}/>
                   <LiveError style={{flex:'1'}}/>
                  </LiveProvider>
                  }
                  {overviewcode === '' &&
                    <div className="hbox" style={{margin:'20px 20px 20px 10px'}}>Loading...</div>
                  }
                </Box>
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
              {/* property method event section */}
            </Box>
            }
            {/* detail section */}
            {/* examples section */}
            {maintab === 3 &&
              <Box className="vbox" style={{background:'lightgray'}}>
                <div className="vbox2" style={{margin:'20px 20px 20px 20px',background:'white',padding:'20px',border:'1px solid gray'}}>
                  <ReactMarkdown source={guide} escapeHtml={false}/>
                </div>
              </Box>
            }
            {maintab === 1 &&
            <Box className="hbox border" style={{background:'lightgray'}}>
              {/* example code */}
              <div className="vbox ">
                <Box className='h64' style={{margin:'20px 20px 0 20px',background:'white',border:'1px solid gray'}}>
                  {reactname} - {examplename}
                </Box>
                {code !== '' &&
                <LiveProvider code={code} scope={scope} theme={theme}>
                  <div className="hbox">
                    <LiveEditor className="shadow" style={{flex:'1',overflow:'auto',margin:'20px 0 20px 20px',border:'1px solid gray',whiteSpace:'inherit'}}/>
                    <LivePreview className="shadow" style={{flex:'1',margin:'20px',border:'1px solid gray'}}/>
                  </div>
                  <LiveError style={{flex:'1',margin:'20px',border:'1px solid gray',background:'white'}}/>
                </LiveProvider>
                }
                {code === '' &&
                  <div className="hbox" style={{margin:'20px 20px 20px 10px'}}>Loading...</div>
                }
              </div>
              {/* example code */}
            </Box>
            }
            {maintab === 5 &&
              <Box className="hbox border" style={{background:'lightgray', alignItems:'center',justifyContent:'center',padding:'20px',border:'1px solid gray'}}>
                <div style={{display:'flex',flexDirection:'column'}}>
                  <div style={{display:'flex',flexDirection:'row'}}>
                    <Avatar alt="" style={{height:'100px',width:'100px',padding:'10px'}} variant="square" src={logoExtReact} />
                    <Avatar alt="" style={{height:'100px',width:'100px',padding:'10px'}} variant="square" src={logoMaterialUI} />
                  </div>
                  <div style={{textAlign:'center',fontSize:'28px',fontStyle:'italic'}}>Loading...</div>
               </div>
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
  ) : (
    <Box className="hbox border" style={{background:'lightgray', alignItems:'center',justifyContent:'center',padding:'20px',border:'1px solid gray'}}>
    <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',flexDirection:'row'}}>
        <Avatar alt="" style={{height:'100px',width:'100px',padding:'10px'}} variant="square" src={logoExtReact} />
        <Avatar alt="" style={{height:'100px',width:'100px',padding:'10px'}} variant="square" src={logoMaterialUI} />
      </div>
      <div style={{textAlign:'center',fontSize:'28px',fontStyle:'italic'}}>Loading...</div>
   </div>
  </Box>
  );
}