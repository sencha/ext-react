import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Components from "./examples/Components.js";

export default class Examples extends Component {

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

  render() {
    //const { selectedIndex } = this.state;
    const { examples, examples2, onClick, whichexample } = this.props;
    return (
      <React.Fragment>
      <div style={{height: '50px',border: '1px solid green'}}>
        <Typography variant="h3">
          Examples
        </Typography>
      </div>

      <div style={{flex: '1', display: 'flex', flexDirection: 'row', overflow: 'auto', border: '1px solid red'}}>
        <div style={{width:'200px', border: '1px solid yellow'}}>
          <TableContainer component={Paper}>
          <Table className="" aria-label="simple table">
            <TableBody>
              {examples.map((row, index) => (
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
          {Components(examples2[whichexample])}
          {/* {examples2.map(block => Components(block))} */}
        </div>
      </div>
    </React.Fragment>
    )
  }

}