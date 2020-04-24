import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Aside from './Aside';


export class CenterPanelOverview extends Component {
  render() {
    const { centervalue, index, importtext, text } = this.props;
    var display
    if (centervalue === index) {
      display = 'none'
    }
    else {
      display = 'none'
    }
    return (
      <React.Fragment>
        <Typography
        style={{flex:'1',xheight:'5px'}}
          xstyle={{xmaxHeight:'300px',display:{display},flexGrow:'1',flexShrink:'0',flexBasis:'auto',overflow:'auto',flexDirection:'column',justifyContent:'space-between'}}
          component="div"
          role="tabpanel"
          hidden={centervalue !== index}
          id={`center-tabpanel-${index}`}
          aria-labelledby={`center-tab-${index}`}
        >
        {centervalue === index &&
          <div style={{flex: '1', display: 'flex', flexDirection: 'column', overflow: 'auto', border: '1px solid red'}}>
          <Typography variant="h5">
            {importtext}
          </Typography>
          <Typography variant="h5">
            <pre>
            {text}
            </pre>
          </Typography>
          </div>
        }
        </Typography>
      </React.Fragment>
    )
  }
}

