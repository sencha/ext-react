import React, { useState, useEffect } from 'react';
import {
  ExtGrid,
  ExtCalendar,
  ExtD3,
  ExtD3_heatmap,
  ExtPivotgrid
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
//import Avatar from '@material-ui/core/Avatar';
import NestedList from './NestedList';
import Title from './Title';
import Aside from './Aside';
import ReactMarkdown from 'react-markdown'
import SplitPane from 'react-split-pane'
//import { set } from 'd3';

export const App = () => {
  const [data, setData] = useState([]);
  const [version] = useState('7.2.1.0');
  const [menu, setMenu] = useState([]);
  const [guide, setGuide] = useState('');
  const [examplename, setExamplename] = useState('');
  const [overviewcode, setOverviewcode] = useState('');
  const [code, setCode] = useState('');
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
  const [maintab, setMaintab] = useState(3);
  const [aside] = useState(0);

  const logoExtReact = `${process.env.PUBLIC_URL}/assets/images/footer-logo.png`
  const logoMaterialUI = `${process.env.PUBLIC_URL}/assets/images/logo_raw.svg`

  useEffect(() => {

  //   const getMenu = async () => {
  //     let res = await axios.get("./assets/menu/menu.json");
  //     // let { data } = res.data;
  //     // this.setState({ users: data });
  //     setMenu(data);
  //     onMenuClick('Home', 0, 'home', 'Home')
  // };

  // getMenu()




    //setVersion(process.env.REACT_APP_VERSION)
    axios
      .get("./assets/menu/menu.json")
      .then(({ data }) => {
        setMenu(data);
        onMenuClick('Home', 0, 'home', 'Home')
      });

    // axios
    //   .get("./assets/code/ExtGrid/data.json")
    //   .then(({ data }) => {
    //     setGriddata(data);
    //     onMenuClick('Home', 0, 'home', 'Home')
    //   });

    // axios
    //   .get("./assets/code/ExtD3_heatmap/data.json")
    //   .then(({ data }) => {
    //     setHeatmapdata(data);
    //     onMenuClick('Home', 0, 'home', 'Home')
    //   });

  }, []);

  const onMenuClick = (name, key, type, reactname) => {
    // console.log(name)
    // console.log(key)
    // console.log(type)
    // console.log(reactname)
    var folder = ''
    var examplename = ''
    switch (type) {
      case 'overview':
        setOverviewcode('')
        setMaintab(5);
        folder = reactname
        examplename = 'Overview'

        var overviewText = "./assets/doc-material-ui/" + reactname + ".json"
        var overviewCode = './assets/code/' + folder + '/' + examplename + '.js'
        var overviewData = './assets/code/' + folder + '/' + examplename + '.json'
        var generalData = './assets/code/' + folder + '/data.json';
        var properties = "./assets/doc-material-ui/" + reactname + "Properties.json"
        var methods = "./assets/doc-material-ui/" + reactname + "Methods.json"
        var events = "./assets/doc-material-ui/" + reactname + "Events.json"

        function useNull() {return null;}
        axios.all([
          axios.get(overviewText).catch(useNull),
          axios.get(overviewCode).catch(useNull),
          axios.get(overviewData).catch(useNull),
          axios.get(generalData).catch(useNull),
          axios.get(properties).catch(useNull),
          axios.get(methods).catch(useNull),
          axios.get(events).catch(useNull),
        ]).then(axios.spread(function (resOverviewText, resOverviewCode, resOverviewData, resGeneralData, resProperties, resMethods, resEvents) {
          var theData = []
          if (resOverviewData != null) {
            theData = resOverviewData.data
          }
          else if (resGeneralData != null) {
            theData = resGeneralData.data
          }
          setReactname(reactname)
          setImporttext(`import { ${reactname} } from "@sencha/ext-react-material-ui";`)
          setData(theData)
          setText(resOverviewText.data.text)
          setPropertyNames(resProperties.data.propertyNames)
          setProperties(resProperties.data.properties)
          setMethodNames(resMethods.data.methodNames)
          setMethods(resMethods.data.methods)
          setEventNames(resEvents.data.eventNames)
          setEvents(resEvents.data.events)
          setOverviewcode(resOverviewCode.data)
          setMaintab(0);
        }));

        return








        // console.log('./assets/code/' + folder + '/' + examplename + '.js')

        // axios
        // .get('./assets/code/' + folder+ '/' + examplename + '.js')
        // .then(({ data }) => {
        //   var overviewcode = data
        //   console.log(overviewcode)
        //   axios.get('./assets/code/' + folder + '/' + examplename + '.json')
        //   .then(({ data }) => {
        //     setMaintab(0);
        //     setReactname(reactname)
        //     setImporttext(`import { ${reactname} } from "@sencha/ext-react-material-ui";`)
        //     console.log(data)
        //     setData(data)
        //     console.log(overviewcode)
        //     setOverviewcode(overviewcode)

        //     console.log('b')

        //   })




        // });
        break;


      case 'overview2':
        //setOverviewcode('')
        setMaintab(0);
        setReactname(reactname)
        setImporttext(`import { ${reactname} } from "@sencha/ext-react-material-ui";`)



        folder = reactname
        examplename = 'Overview'
        //refactor
        console.log('a')
        axios.get('./assets/code/' + folder + '/' + examplename + '.json')
          .then(({ data }) => {
            console.log('b')
            setData(data)
            console.log('b2')

            axios
            .get('./assets/code/' + folder+ '/' + examplename + '.js')
            .then(({ data }) => {
              setOverviewcode(data)
            });



          })
          .catch(function (error) {
            console.log('c')
            //console.clear()
            //console.log('\n'.repeat('1'));
            axios.get('./assets/code/' + folder + '/data.json')
            .then(({ data }) => {
              console.log('d')



              setData(data)
              axios
              .get('./assets/code/' + folder + '/' + examplename + '.js')
              .then(({ data }) => {
                console.log('e')
                setOverviewcode(data)
              });



            })
            .catch(function (error) {
              //console.clear()
              //console.log('\n'.repeat('1'));
              console.log('f')
              setData([])



              axios
              .get('./assets/code/' + folder+ '/' + examplename + '.js')
              .then(({ data }) => {
                setOverviewcode(data)
              });


            })
          })
          console.log('b3')
        //refactor





        axios
        .get("./assets/doc-material-ui/" + reactname + ".json")
        .then(({ data }) => {
          setText(data.text)
        });
        axios
        .get("./assets/doc-material-ui/" + reactname + "Properties.json")
        .then(({ data }) => {
          setPropertyNames(data.propertyNames)
          setProperties(data.properties)
        });
        axios
        .get("./assets/doc-material-ui/" + reactname + "Methods.json")
        .then(({ data }) => {
          setMethodNames(data.methodNames)
          setMethods(data.methods)
        });
        axios
        .get("./assets/doc-material-ui/" + reactname + "Events.json")
        .then(({ data }) => {
          setEventNames(data.eventNames)
          setEvents(data.events)
        });
        break;
      case 'example':
        setCode('')
        setMaintab(1);
        setReactname(reactname)
        setExamplename(name)




        folder = 'Ext' + reactname
        examplename = name
        //refactor
        axios.get('./assets/code/' + folder + '/' + examplename + '.json')
          .then(({ data }) => {
            setData(data)
          })
          .catch(function (error) {
            console.clear()
            console.log('\n'.repeat('1'));
            axios.get('./assets/code/' + folder + '/data.json')
            .then(({ data }) => {
              setData(data)


              axios
              .get('./assets/code/' + folder + '/' + examplename + '.js')
              .then(({ data }) => {
                setCode(data)
              });


            })
            .catch(function (error) {
              console.clear()
              console.log('\n'.repeat('1'));
               setData([])

               axios
               .get('./assets/code/' + folder + '/' + examplename + '.js')
               .then(({ data }) => {
                 setCode(data)
               });

            })
          })
        //refactor

        break;
      case 'guide':
        setMaintab(3);
        axios
        //.get(require('./guides/' + reactname + '/' + name + '.md'))
        .get('./assets/guides/' + reactname + '/' + name + '.md')
        .then(({ data }) => {
          setGuide(data)
        });
        break;

        case 'home':
          setMaintab(3);
          axios
          //.get(require("./guides/Home/Home.md"))
          .get("./assets/guides/Home/Home.md")
          .then(({ data }) => {
            setGuide(data)
          });
          break;

      case 'welcome':
          setMaintab(3);
          axios
          //.get(require("./guides/Home/Welcome.md"))
          .get("./assets/guides/Home/Welcome.md")
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

  const scope = { data, ExtGrid, ExtCalendar, ExtD3, ExtD3_heatmap, ExtPivotgrid };

  return menu.length ? (
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
            {/* <Avatar alt="" variant="square" src={logoExtReact} />
            <Avatar alt="" variant="square" src={logoMaterialUI} /> */}
            <img style={{margin:'12px 2px 2px 82px'}} alt="" src={logoExtReact}/>
            <img style={{margin:'2px 2px 2px 12px'}} alt="" width="60px" src={logoMaterialUI}/>
            <div style={{margin:'2px 2px 10px 20px'}} >ExtReact for Material UI Documentation</div>
          </Box>

          <Box className="vbox senchablue">
            <NestedList menu={menu} onMenuClick={onMenuClick}/>
          </Box>
        </Box>

        {/* nav */}

        {/* <Box className="w300 vbox">
          splitter
        </Box> */}



        {/* center */}
        <Box className="hbox">
          {/* title and detail */}
          <Box className="vbox">
            {/* title */}
            <Box className="hTitle hbox">
              <Title
                reactname={reactname}
                importtext={importtext}
                version={version}
              />
            </Box>
            {/* title */}
            {/* detail section */}
            {maintab === 0 &&
            <Box className="hbox border" style={{background:'lightgray'}}>
              {/* text section */}
              <Box className="vbox" style={{margin:'20px 10px 20px 20px',background:'white',border:'1px solid gray'}}>
                <pre style={{fontSize:'14px',fontFamily:'Roboto',padding:'30px'}}>
                  {text}
                </pre>
              </Box>
              {/* text section */}
              {/* property method event section */}




              {/* style={{flex:'1',margin:'20px',border:'1px solid gray'}} */}

              <Box className="vbox">

                <Box className="hbox shadow" style={{flex:'1',margin:'20px 20px 10px 20px',border:'1px solid gray',background:'white'}}>
                  {overviewcode !== '' &&
                  <LiveProvider
                    code={overviewcode}
                    scope={scope}
                    theme={theme}
                  >
                   <LivePreview style={{flex:'1'}}/>
                   <LiveError style={{flex:'1'}}/>
                  </LiveProvider>
                  }
                  {overviewcode === '' &&
                    <div className="hbox" style={{margin:'20px 20px 20px 10px'}}>Loading...</div>
                  }

                </Box>

                {/* <Box className="vbox"> */}
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
                {/* </Box> */}
              </Box>
              {/* property method event section */}
            </Box>
            }
            {/* detail section */}
            {/* examples section */}
            {maintab === 3 &&
              <Box className="vbox" style={{padding:'20px',borderLeft:'1px solid gray'}}>
                <ReactMarkdown source={guide} />
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
                <LiveProvider
                  code={code}
                  scope={scope}
                  theme={theme}
                >
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
              <Box className="hbox" style={{padding:'20px',borderLeft:'1px solid gray'}}>
               Loading
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
    <div>Loading...</div>
  );
}