import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { CenterPanelOverview } from './CenterPanelOverview';
import { CenterPanelExamples } from './CenterPanelExamples';

export default class CenterBottom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
  }

  onClick = (index, name) => {
    this.setState({selectedIndex: index});
    this.props.onMenuClick(index, name)
  }

  a11yProps = (index) => {
  //a11yProps(index) {
    return {
      id: `center-tab-${index}`,
      'aria-controls': `center-tabpanel-${index}`,
    };
  }

  render() {
    //const { selectedIndex } = this.state;
    const {
      code,
      examples2,
      whichexample,
      importtext,
      examples,
      text,
      centervalue,
      propertySelectedIndex,
      handleCenterValueChange,
      onExamplesClick
    } = this.props;
    return (


      <React.Fragment>



    <div style={{flex: '1', display: 'flex', flexDirection: 'column', overflow: 'auto', border: '1px solid red'}}>

      <CenterPanelOverview
      style={{display: 'flex',flex:'1',xheight:'5px'}}
      xstyle={{xminHeight:'300px',xmaxHeight:'300px',display:'flex',flex:'1',xflexGrow:'0',xflexShrink:'0',xflexBasis:'auto',overflow:'auto',flexDirection:'column',justifyContent:'space-between'}}
        centervalue={centervalue}
        importtext={importtext}
        text={text}
        index={0}
        typeSelectedIndex={propertySelectedIndex}




      />
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
          {/* <Tab label="Examples" {...this.a11yProps(0)} /> */}
          <Tab label="Overview" {...this.a11yProps(0)} />
          <Tab label="Examples" {...this.a11yProps(1)} />
        </Tabs>
      </AppBar>
    </div>

    </React.Fragment>


    )
  }

}