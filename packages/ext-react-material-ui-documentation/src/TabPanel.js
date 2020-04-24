import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



export class TabPanel extends Component {
  render() {
    const { value, index, data, onClick } = this.props;
    var display
    if (value === index) {
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
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >

        {value === index &&

<TableContainer component={Paper}>
<Table className="" aria-label="simple table">
  <TableBody>
    {data.map((row, index) => (
      <TableRow 
        key={index}
        hover
        // onClick={(event) => handleClick(event, row.name)}
        onClick={(event) => onClick(event, row.name)}

      >
        <TableCell component="th" scope="row" style={{padding:'30px'}}>
          <div style={{color:'blue'}}>{row.nameprimary}</div>
          <p></p>
          {row.text}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>





        }


{/*
{value === index &&


<List xstyle={{xmaxHeight:'300px',flexGrow:'1',flexShrink:'0',flexBasis:'auto',display:'flex',flexDirection:'column'}}>
{data.map((item, index) => {return(
  <ListItem
    button
    key={index}
    selected={typeSelectedIndex === index}
    onClick={(event) => onClick(event, index, item.name, data)}
  >

    <div>{item.nameprimary}</div>
    <br></br>
    <pre>{item.text}</pre>
  </ListItem>
)})}
</List>


} */}

    {/* <ListItemText primary={item.nameprimary} secondary={item.text}/> */}

        {/* {value === index &&
        <div style={{maxHeight:'200px',flexGrow:'1',flexShrink:'0',flexBasis:'auto',display:'flex',flexDirection:'column',overflow:'auto'}}>
          {names.map((name, index) => {return(
            <Box variant="contained" color="secondary"
              key={index}
              onClick={(event) => onClick(event, index, name, data)}
            >
            {name}
            </Box>
          )})}
        </div>
        } */}




        {/* {value === index &&
          <List style={{maxHeight:'200px',flexGrow:'1',flexShrink:'0',flexBasis:'auto',display:'flex',flexDirection:'column'}}>
          {names.map((name, index) => {return(
            <ListItem
              button
              key={index}
              selected={typeSelectedIndex === index}
              onClick={(event) => onClick(event, index, name, data)}
            >
              <ListItemText primary={name} secondary={description}/>
            </ListItem>
          )})}
          </List>
        } */}

        </Typography>
      </React.Fragment>
    )
  }
}


// //function TabPanel(props) {
//   const { value, index, names, data, typeSelectedIndex, onClick } = this.props;
//   const [display, setDisplay] = useState('none');



//   return (
//     <Typography
//       style={{xheight:'200px',display:{display},flexGrow:'1',flexShrink:'0',flexBasis:'auto',overflow:'auto',flexDirection:'column',justifyContent:'space-between'}}
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//     >
//     {value === index &&
//       <List style={{xheight:'200px',flexGrow:'1',flexShrink:'0',flexBasis:'auto',display:'flex',flexDirection:'row'}}>
//       {names.map((name, index) => {return(
//         <ListItem
//           button
//           key={index}
//           selected={typeSelectedIndex === index}
//           onClick={(event) => onClick(event, index, name, data)}
//         >
//           <ListItemText primary={name}/>
//         </ListItem>
//       )})}
//       </List>
//     }
//     </Typography>
//   );
// }