import React, { useState, useEffect } from 'react';
//import axios from "axios";
import Typography from '@material-ui/core/Typography';
import GridPage from './examples/grid/GridPage'

export const TabPanelExample = (props) => {
  const { value, index, names, data, typeSelectedIndex, onClick } = props;
  return (
    <Typography
      style={{maxHeight:'200px',height:'200px',overflow:'scroll'}}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
    {value === index &&


        <GridPage />

    }
    </Typography>
  );
}