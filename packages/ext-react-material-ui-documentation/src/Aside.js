import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
//import { TabPanel } from './TabPanel';

const PROPERTIES = 0;
const METHODS = 1;
const EVENTS = 2;

export default class Aside extends Component {

  constructor(props) {
    super(props);
    this.asidevalue = 0;
    this.state = {
      propertyCurrentItem: -1,
      methodCurrentItem: -1,
      eventCurrentItem: -1,
      properties: this.props.properties,
      events: this.props.events,
      methods: this.props.methods,
      selectedIndex: 0,
      thenameprimary: '',
      thetext: ''
    };

  }

  onChangeSearch = (event, value) => {
    var theArray = []
    switch (value) {
      case PROPERTIES:
        theArray = this.props.properties;
        break;
      case METHODS:
        theArray = this.props.methods;
        break;
      case EVENTS:
        theArray = this.props.events;
        break;
      default:
        theArray = this.props.properties;
        break;
    }
    console.log(value)
    var v = event.target.value
    var filteredresult = theArray.filter(obj => {
      if (obj.name !== undefined) {
        return obj.name.startsWith(v);
      }
      else {
        return null
      }
    })
    switch (value) {
      case PROPERTIES:
        this.setState({properties: filteredresult});
        break;
      case METHODS:
        this.setState({methods: filteredresult});
        break;
      case EVENTS:
        this.setState({events: filteredresult});
        break;
      default:
        this.setState({properties: filteredresult});
        break;
    }
  }

  onClickItem = (event, index, name, type) => {
    var theArray = []
    switch (type) {
      case 'properties':
        theArray = this.props.properties;
        break;
      case 'methods':
        theArray = this.props.methods;
        break;
      case 'events':
        theArray = this.props.events;
        break;
      default:
        theArray = this.props.properties;
        break;
    }
    var result = theArray.filter(obj => {
//      return obj.name === event.currentTarget.innerHTML
      return obj.name === name
    })
    var o = result[0]
    if (o === undefined) {
      console.log(event.currentTarget.innerHTML  + ' not found')
      return
    }
    switch (type) {
      case 'properties':
        this.setState({
          propertyCurrentItem: index,
          thenameprimary: o['nameprimary'],
          thetext: o['text'],
        });
        break;
      case 'methods':
        this.setState({
          methodCurrentItem: index,
          thenameprimary: o['nameprimary'],
          thetext: o['text'],
        });
        break;
      case 'events':
        this.setState({
          eventCurrentItem: index,
          thenameprimary: o['nameprimary'],
          thetext: o['text'],
        });
        break;
      default:
        this.setState({
          propertyCurrentItem: index,
          thenameprimary: o['nameprimary'],
          thetext: o['text'],
        });
        break;
    }
  }

  onChangeTab = (name, index) => {
    console.log(document.getElementById('search').value)
    document.getElementById('search').value = ''
    this.setState({
      propertyCurrentItem: -1,
      methodCurrentItem: -1,
      eventCurrentItem: -1,
      thenameprimary: '',
      thetext: '',
      selectedIndex: index
    });
    this.asidevalue = index
  }

  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  render() {
    const {
      propertyCurrentItem,
      methodCurrentItem,
      eventCurrentItem,
      properties,
      methods,
      events,
      thenameprimary,
      thetext,
    } = this.state;

    //console.log(properties)

    return (
      <div className="shadow" style={{background:'white',border:'0px solid gray',margin:'10px 20px 20px 20px',flex: '1', display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
        <div style={{height: '50px'}}>
          <AppBar position="static">
            <Tabs
              indicatorColor="secondary"
              textColor="secondary"
              style={{xheight:'5px',background:'white'}} value={this.asidevalue} onChange={this.onChangeTab} aria-label="simple tabs example">
              {/* <Tab label="Examples" {...this.a11yProps(0)} /> */}
              {/* <Tab label="Properties" {...this.a11yProps(0)} />
              <Tab label="Methods" {...this.a11yProps(1)} />
              <Tab label="Events" {...this.a11yProps(2)} /> */}
              <Tab label="Properties" {...this.a11yProps(0)} />
              <Tab label="Methods" {...this.a11yProps(1)} />
              <Tab label="Events" {...this.a11yProps(2)} />
            </Tabs>
          </AppBar>
        </div>

        <div style={{padding:'10px',display:'flex',height:'70px',background:'white',overflow:'none',borderBottom:'1px solid lightgray',flexDirection: 'row'}}>
          <TextField id="search" style={{flex:'1'}} label="Search" variant="standard"
            onChange={(e) => this.onChangeSearch(e, this.asidevalue)}
          />
        </div>

        <div style={{flex: '1', display: 'flex', flexDirection: 'column', overflow: 'auto'}}>

          {this.asidevalue === 0 &&
          <div style={{height:'100%',padding:'10px',flex:'1',display:'flex',flexFlow:'column wrap'}}>
            {properties.map((property, index) => (
            <div className={`${index === propertyCurrentItem ? "active" : ""}`} style={{margin:'10px 10px 10px 10px',cursor:'pointer'}} key={index}
              onClick={(e) => this.onClickItem(e, index, property.name, 'properties')}
            >
              {property.name}
            </div>
            ))}
          </div>
          }

          {this.asidevalue === 1 &&
          <div style={{height:'100%',padding:'10px',flex:'1',display:'flex',flexFlow:'column wrap'}}>
            {methods.map((method, index) => {
              if (method.access !== 'private') {
                return (
                  <div className={`${index === methodCurrentItem ? "active" : ""}`} style={{margin:'10px 10px 10px 10px',cursor:'pointer'}} key={index}
                    onClick={(e) => this.onClickItem(e, index, method.name, 'methods')}
                  >
                    {method.name}
                  </div>
                )
              }
              else {
                return null
              }
            })}
          </div>
          }

          {this.asidevalue === 2 &&
          <div style={{height:'100%',padding:'10px',flex:'1',display:'flex',flexFlow:'column wrap'}}>
            {events.map((event, index) => (
            <div className={`${index === eventCurrentItem ? "active" : ""}`} style={{margin:'10px 10px 10px 10px',cursor:'pointer'}} key={index}
              onClick={(e) => this.onClickItem(e, index, event.name, 'events')}
            >
              {event.name}
            </div>
            ))}
          </div>
          }
        </div>

        <div style={{padding:'20px',height:'130px',background:'white',overflow:'auto'}}>
          <div style={{fontSize:'18px',fontWeight:'bold'}}>{thenameprimary}</div>
          <div style={{margin:'5px 0 0 0'}}>{thetext}</div>
        </div>

      </div>
    )
  }

}



      // {/* <TabPanel
      // style={{display: 'flex',flex:'1',xheight:'5px'}}
      // xstyle={{xminHeight:'300px',xmaxHeight:'300px',display:'flex',flex:'1',xflexGrow:'0',xflexShrink:'0',xflexBasis:'auto',overflow:'auto',flexDirection:'column',justifyContent:'space-between'}}
      //   value={this.asidevalue}
      //   index={2}
      //   names={propertyNames}
      //   data={properties}
      //   typeSelectedIndex={propertySelectedIndex}
      //   onClickItem={onPropertyClick}
      // />
      // <TabPanel
      //   xstyle={{xminHeight:'300px',xmaxHeight:'300px',display:'flex',flexGrow:'0',flexShrink:'0',flexBasis:'auto',overflow:'auto',flexDirection:'column',justifyContent:'space-between'}}

      //   value={this.asidevalue}
      //   index={3}
      //   names={methodNames}
      //   data={methods}
      //   typeSelectedIndex={methodSelectedIndex}
      //   onClickItem={onMethodClick}
      // />
      // <TabPanel
      //   xstyle={{xminHeight:'300px',xheight:'300px',display:'flex',flexGrow:'1',flexShrink:'0',flexBasis:'auto',overflow:'auto',flexDirection:'column',justifyContent:'space-between'}}

      //   value={this.asidevalue}
      //   index={4}
      //   names={eventNames}
      //   data={events}
      //   typeSelectedIndex={eventSelectedIndex}
      //   onClickItem={onEventClick}
      // /> */}