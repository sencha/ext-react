import React, { useState, useEffect } from 'react';
//https://github.com/luncheon/flex-splitter-directive
import "flex-splitter-directive"
import "flex-splitter-directive/styles.min.css"

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
import ReactMarkdown from 'react-markdown/with-html'
import axios from "axios";
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
//import CodeIcon from '@material-ui/icons/CodeOutlined';
//import EditIcon from '@material-ui/icons/EditOutlined';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import theme from'./livetheme'
import Title from './Title';
import Aside from './Aside';

var treecmp = {}
export const App = () => {
  const Ext = window['Ext']

  const OVERVIEW = 0;
  const EXAMPLE = 1;
  const GUIDE = 3;
  const LOADING = 5;

  //const [navstore, setNavstore] = useState({});
  //const [selection, setSelection] = useState('');
  const homepage = `${process.env.PUBLIC_URL}/`;
  const datafolder = homepage + 'assets/data/';
  const codefolder = homepage + 'assets/code/';
  const logoExtReact = homepage + `assets/images/footer-logo.png`;
  const logoMaterialUI = homepage + `assets/images/logo_raw.svg`;
//  const [rootopen, setRootopen] = useState(false);
  //const [textforshow, setTextforshow] = useState('Documentation');
  //const [data, setData] = useState([]);
  //const [version, setVersion] = useState('7.2.1.0');
  //const [menu, setMenu] = useState([]);
  const [asidevalue, setAsidevalue] = useState(0);
  const [aside] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);




  //const [treecmp, setTreecmp] = useState({});

  const [initialRequest, setInitialRequest] = useState({
    version: '7.2.1.0',
    menu: [],
    navstore: {},
    selection: {}
  })

  const [pageRequest, setPageRequest] = useState({
    title: '',
    hash: '',
    //componentname: '',
    //examplename: '',
    text: '',
    overviewcode: '',
    code: '',
    desc: '',
    guide: '',

    propertynames: [],
    properties: [],
    methodnames: [],
    methods: [],
    eventnames: [],
    events: [],

    selection2: {},

    maintab: 5
  });

  function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  function on() {
    document.getElementById("overlay").style.display = "block";
  }

  function off() {
    document.getElementById("overlay").style.display = "none";
  }



  useEffect(() => {
    var navStore = null
    var menu = ''
    var showparm = getUrlParameter('show')
    var hash = window.location.hash.substr(1);
    if (showparm.trim().toLowerCase() === 'examples') {
      if (hash === '') { hash = 'exampleshome' }
      //textForShow = 'Examples'
      menu = homepage + "assets/menu/examplesmenu.json"
    }
    else {
      if (hash === '') { hash = 'DocsHome' }
      //textForShow = 'Documentation'
      menu = homepage + "assets/menu/docsmenu.json"
    }
    axios
      .get(menu)
      .then(({ data }) => {
        navStore =  Ext.create('Ext.data.TreeStore', {
          rootVisible: true,
          root: { text: 'All', children: data }
        })
        var node = navStore.findNode('hash', hash);
        var appversion = '7.2.1.0';
        if (process.env.REACT_APP_VERSION !== undefined) {
          appversion = process.env.REACT_APP_VERSION;
        }
        setInitialRequest({
          version: appversion,
          menu: data,
          navstore: navStore,
          selection: node
        });
      })

      function myFunction() {
        if (navStore === null) { return}
        if (window.previoushash !== window.location.hash) {
          if (window.location.hash === '#none') { return }
          window.previoushash = window.location.hash
          var node = navStore.findNode('hash', window.location.hash.substr(1));
          if (node.data.leaf === false) {
            return
          }
          var e = {
            treelist: null,
            record: node,
            eOpts: null
          }
          treecmp.setSelection(node)
          onSelectionchange2(e)

        }
      }
      window.addEventListener("hashchange", myFunction);
  }, []);

  const onSelectionchange=({treelist, record, eOpts}) => {
    var hash = record.data.hash;
    if (record.data.hash === 'none') { return }
    if (window.location.hash === '#' + hash) {
      var e = {
        treelist: treelist,
        record: record,
        eOpts: eOpts
      }
      onSelectionchange2(e)
    }
    else {
      window.location.hash = '#' + hash;
      window.location.hash = hash;
    }
  }

  const onSelectionchange2=({treelist, record, eOpts}) => {
    if (record.data.leaf === true) {
      on()
    }
    else {
      return
    }
    var type = record.data.type;
    var hash = record.data.hash;
    var text = record.data.text;
    var componentname = record.data.componentname;
    //window.location.hash = '#' + hash;
    var folder = ''
    var examplename = ''
    function useNull() {return null;}
    switch (type) {
      case 'overview':
        folder = componentname
        examplename = 'Overview'
        var overviewCode = homepage + 'assets/code/' + folder + '/' + componentname + examplename + '.js'
        var overviewText = homepage + "assets/doc-material-ui/" + componentname + ".json"
        var properties = homepage + "assets/doc-material-ui/" + componentname + "Properties.json"
        var methods = homepage + "assets/doc-material-ui/" + componentname + "Methods.json"
        var events = homepage + "assets/doc-material-ui/" + componentname + "Events.json"
        axios.all([
          axios.get(overviewCode).catch(useNull),
          axios.get(overviewText).catch(useNull),
          axios.get(properties).catch(useNull),
          axios.get(methods).catch(useNull),
          axios.get(events).catch(useNull),
        ]).then(axios.spread(function (
            resOverviewCode,
            resOverviewText,
            resProperties,
            resMethods,
            resEvents
          ) {
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
            setPageRequest({
              title: `${componentname}  -> import { ${componentname} } from "@sencha/ext-react-material-ui";`,
              hash: hash,
              //examplename: examplename,
              componentname: componentname,
              text: afterCfgLink,
              overviewcode: resOverviewCode.data,
              propertynames: resProperties.data.propertyNames,
              properties: resProperties.data.properties,
              methodnames: resMethods.data.methodNames,
              methods: resMethods.data.methods,
              eventnames: resEvents.data.eventNames,
              events: resEvents.data.events,
              maintab: OVERVIEW
            });
            off()
          }));
        break;
        case 'example':
          folder = componentname;
          examplename = hash;
          var exampleCode = homepage + 'assets/code/' + folder + '/' + examplename + '.js'
          var exampleDesc = homepage + 'assets/code/' + folder + '/' + examplename + '.md'
          axios.all([
            axios.get(exampleCode).catch(useNull),
            axios.get(exampleDesc).catch(useNull),
          ]).then(axios.spread(function (
            resExampleCode,
            resExampleDesc,
          ) {
            var desc;
            if (resExampleDesc == null) {
              desc = 'description coming soon'
            }
            else {
              desc = resExampleDesc.data
            }
            setPageRequest({
              title: text,
              hash: hash,
              //examplename: examplename,
              //componentname: componentname,
              code: resExampleCode.data,
              desc: desc,
              maintab: EXAMPLE
            });
            off()
          }));
        break;
        case 'guide':
          console.log(homepage + 'assets/guides/' + componentname + '/' + hash + '.md')
          console.log(record)
          axios
          .get(homepage + 'assets/guides/' + componentname + '/' + hash + '.md')
          .then(({ data }) => {
            setPageRequest({
              selection: record,
              title: text,
              guide: data,
              maintab: GUIDE
            });
            off()
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

  const onMoreClick = (event, index, name, events) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const extReactDidMount = ({cmp, cmpObj}) => {
    treecmp = cmp
    //setTreecmp(cmp)
    //for (var prop in cmpObj) {this[prop] = cmpObj[prop]}
    //console.log(this['tree'])
  }

  const scope = {
    homepage,
    datafolder,
    codefolder,
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

  const{
    version,
    menu,
    navstore,
    selection
  } = initialRequest;

  const {

    // version,
    // textforshow,
    // menu,
    // navstore,
    // selection,


    title,

    text,
    overviewcode,
    code,
    desc,
    guide,

    propertynames,
    properties,
    methodnames,
    methods,
    eventnames,
    events,

    maintab
  } = pageRequest;

  return menu.length ? (
    <React.Fragment>
      {/* {console.log('render')} */}
      {/* header */}
      {/* <Box className="h64 header hHeader"></Box> */}
      {/* header */}
      {/* main */}

      <Box className="hbox">
        {/* nav */}

        <Box className="wMenu vbox">
          <Box className="hTitleleft" style={{borderBottom:'1px solid gray'}}>
            <img style={{margin:'0 2px 2px 60px'}} alt="" width="50px" src={logoExtReact}/>
            {/* &nbsp;&nbsp;for */}
            <img style={{margin:'0 2px 5px 12px'}} alt="" width="50px" src={logoMaterialUI}/>
            {/* <div style={{margin:'2px 2px 10px 70px'}} >{textforshow}</div> */}
          </Box>
          <Box className="vbox senchablue">
            {/* <NestedList menu={menu} rootopen={rootopen} onMenuClick={onMenuClick}/> */}
            <ExtTreelist
              ui="nav"
              scrollable="true"
              store={navstore}
              expanderFirst={false}
              expanderOnly={false}
              extname="tree"
              onReady={ extReactDidMount }
              onSelectionchange={onSelectionchange}
              selection={selection}
            />
          </Box>
          <Box className="hTitleleftbottom" style={{borderTop:'1px solid gray',textAlign:'right'}}>

            <Tooltip title="Settings"><IconButton onClick={onMoreClick}><Icon style={{color:'white'}}>settings</Icon></IconButton></Tooltip>
            <Tooltip title="More"><IconButton onClick={onMoreClick}><Icon style={{color:'white'}}>more_vert</Icon></IconButton></Tooltip>
            <Tooltip title="Key"><IconButton onClick={onMoreClick}><Icon style={{color:'white'}}>vpn_key</Icon></IconButton></Tooltip>
            <Tooltip title="Examples"><IconButton onClick={onMoreClick}><Icon style={{color:'white'}}>build</Icon></IconButton></Tooltip>
            <Tooltip title="Documentation"><IconButton onClick={onMoreClick}><Icon style={{color:'white'}}>description</Icon></IconButton></Tooltip>
            <Tooltip title="Favorites"><IconButton onClick={onMoreClick}><Icon style={{color:'white'}}>favorite</Icon></IconButton></Tooltip>
            <Tooltip title="Help"><IconButton onClick={onMoreClick}><Icon style={{color:'white'}}>help_outline</Icon></IconButton></Tooltip>
          </Box>



        </Box>
        {/* nav */}
        {/* center */}
        <Box className="hbox" style={{flex:'auto'}}>

          {/* title and detail */}
          <Box className="vbox">
            {/* title */}
            <Box className="hTitle hbox">
              <Title title={title} version={version}/>
            </Box>
            {/* title */}
            {/* detail section */}
            {maintab === OVERVIEW &&
            <Box className="hbox border" style={{background:'lightgray'}} data-flex-splitter-horizontal>
              {/* text section */}
              <Box className="vbox shadow" style={{flex:'auto',margin:'20px 10px 20px 20px',background:'white',border:'0px solid gray',padding:'20px'}}>
                <ReactMarkdown source={text} escapeHtml={false}/>
              </Box>
              {/* text section */}
              <div role="separator"></div>
              {/* property method event section */}
              <Box className="vbox" style={{flex:'auto',minWidth:'600px'}}  data-flex-splitter-vertical>
                <Box className="hbox shadow" style={{height:'400px',minHeight:'300px',minWidth:'500px',flex:'auto',margin:'20px 20px 10px 20px',border:'0px solid gray',background:'white'}}>
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
                <div role="separator"></div>
                <Aside
                  asidevalue={asidevalue}
                  handleAsideValueChange={handleAsideValueChange}
                  propertyNames={propertynames}
                  properties={properties}
                  onPropertyClick={onPropertyClick}
                  methodNames={methodnames}
                  methods={methods}
                  onMethodClick={onMethodClick}
                  eventNames={eventnames}
                  events={events}
                  onEventClick={onEventClick}
                />
              </Box>
              {/* property method event section */}
            </Box>
            }
            {/* detail section */}
            {/* examples section */}
            {maintab === GUIDE &&
              <Box className="vbox" style={{background:'lightgray'}}>
                <div className="vbox2 shadow" style={{margin:'20px 20px 20px 20px',background:'white',padding:'20px',border:'0px solid gray'}}>
                  <ReactMarkdown source={guide} escapeHtml={false}/>
                </div>
              </Box>
            }
            {maintab === EXAMPLE &&
            <Box className="hbox border" style={{background:'lightgray'}}>
              {/* example code */}
              <div className="vbox ">

              {/* <Box className='h64' style={{margin:'20px 20px 0 20px',background:'white',border:'1px solid gray'}}>
                <ReactMarkdown source={desc} escapeHtml={false}/>
                  <div style={{fontSize:'18px',margin:'20px 20px 20px 20px',}}>{examplename}  ({componentname}/{hash}.js)</div>
                </Box> */}


                <Box className='h100 shadow' style={{paddingLeft:'15px',margin:'20px 20px 0 20px',background:'white',border:'0px solid gray'}}>
                <ReactMarkdown source={desc} escapeHtml={false}/>
                </Box>
                {code !== '' &&
                <LiveProvider code={code} scope={scope} theme={theme}>
                  <div className="hbox" data-flex-splitter-horizontal>
                    <div className="vbox shadow" style={{flex:'auto',margin:'20px 10px 20px 20px'}}>
                      <div style={{background:'#024059',fontSize:'12px',textAlign:'right',minHeight:'50px',flex:'none',overflow:'auto',margin:'0 0 0 0',border:'0px solid gray',whiteSpace:'inherit'}}>
                      {/* <IconButton aria-label="code">
                        <CodeIcon style={{color:'white'}}/>
                      </IconButton>
                      <IconButton aria-label="edit">
                        <EditIcon style={{color:'white'}}/>
                      </IconButton> */}
                      <IconButton onClick={onMoreClick}>
                        <Icon style={{color:'white'}}>more_vert</Icon>
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>menu</MenuItem>
                        <MenuItem onClick={handleClose}>Coming</MenuItem>
                        <MenuItem onClick={handleClose}>Soon</MenuItem>
                      </Menu>

                      </div>



                      <LiveEditor className="shadow" style={{fontSize:'12px',flex:'1',overflow:'auto',margin:'0 0 0 0',border:'0px solid gray',whiteSpace:'inherit'}}/>
                    </div>
                    <div role="separator"></div>
                    <LivePreview className="shadow" style={{background:'darkgray',padding:'10px',flex:'auto',margin:'20px 20px 20px 10px',border:'1px solid gray'}}/>
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
            {maintab === LOADING &&
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
        <Box className="wMenu vbox border">aside</Box>
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
      {/* <div style={{textAlign:'center',fontSize:'28px',fontStyle:'italic'}}>Loading...</div> */}
    </div>
  </Box>
  );
}