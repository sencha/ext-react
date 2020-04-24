import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Components from "./examples/Components.js"
import Prism from 'prismjs';

export class CenterPanelExamples extends Component {

  componentDidMount() {
    Prism.highlightAll();
    console.log('hi')
    //Prism.highlightElement(document.querySelector('code'));
  }


  render() {
    const {
      reactname,
      code,
      centervalue,
      examples2,
      whichexample,
      examples,
      index,
      onClick} = this.props;
    var display
    if (centervalue === index) {
      display = 'none'
    }
    else {
      display = 'none'
    }


    var theList = require("./examples/ExampleList").getExamples(reactname)

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


<React.Fragment>
{/* <div style={{height: '50px',border: '1px solid green'}}>
  <Typography variant="h3">
    Examples
  </Typography>
</div> */}

<div style={{flex: '1', display: 'flex', flexDirection: 'row', border: '1px solid red'}}>
  <div style={{width:'200px', border: '1px solid yellow'}}>
    <TableContainer component={Paper}>
    <Table className="" aria-label="simple table">
      <TableBody>
        {theList.map((row, index) => (
          <TableRow
            key={index}
            hover
            // onClick={(event) => handleClick(event, row.name)}
            onClick={(event) => onClick(event, index, row.name)}
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
  </div>

  <div style={{flex: '1', display: 'flex', border: '1px solid yellow'}}>
    {/* {examples2 ? Components(examples2[whichexample]) : 'not'} */}
    {/* {{whichexample} ? 'is' : 'not'} */}
    {Components(reactname, whichexample)}
    {/* {examples2.map(block => Components(block))} */}
  </div>

  <div style={{flex: '1', display: 'flex',border: '5px solid green'}}>
    {/* {examples2 ? Components(examples2[whichexample]) : 'not'} */}
    {/* {{whichexample} ? 'is' : 'not'} */}



    <div style={{fontSize: '14px', flex:'1',overflow: 'auto'}}>
      <pre style={{fontSize: '14px', display: 'flex', flex:'1',overflow: 'auto'}}>
        <code className="language-javascript" style={{fontSize: '14px', flex:'1',overflow: 'auto'}}>
          {code['3DPie']['3DPie.js']}
        </code>
      </pre>
    </div>



    {/* {examples2.map(block => Components(block))} */}
  </div>


</div>
</React.Fragment>

        }
        </Typography>
      </React.Fragment>
    )
  }
}