import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

export const Layout = () => {
  const [maintab, setMaintab] = useState(0);
  const [detailstab, setDetailstab] = useState(0);
  const [aside, setAside] = useState(0);

  const onMainTabClick = (event, value) => {
    setMaintab(value);
  }

  const onDetailsTabClick = (event, value) => {
    setDetailstab(value);
  }

  return (
    <React.Fragment>
      {/* header */}
      <Box className="h50 border header"></Box>
      {/* header */}
      {/* main */}
      <Box className="hbox border">
        {/* nav */}
        <Box className="w300 vbox border">
          menu
        </Box>
        {/* nav */}
        {/* center */}
        <Box className="hbox border">
          {/* title and body */}
          <Box className="vbox border">
            <Box className="h50 border">title</Box>
            {/* detail section */}
            {maintab === 0 &&
            <Box className="hbox border">
              {/* text section */}
              <Box className="vbox border">text</Box>
              {/* text section */}
              {/* property method event section */}
              <Box className="vbox border">
                {/* property method event tabs section */}
                <Box className="h50 hbox border">  {/*  */}
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={(event) => onDetailsTabClick(event, 0)}>Properties Tab</Button>
                    <Button onClick={(event) => onDetailsTabClick(event, 1)}>Methods Tab</Button>
                    <Button onClick={(event) => onDetailsTabClick(event, 2)}>Events Tab</Button>
                  </ButtonGroup>
                </Box>
                {/* property method event tabs section */}
                {detailstab === 0 &&
                <Box className="vbox border">
                  properties
                </Box>
                }
                {detailstab === 1 &&
                <Box className="vbox border">
                  methods
                </Box>
                }
                {detailstab === 2 &&
                <Box className="vbox border">
                  events
                </Box>
                }
              </Box>
              {/* property method event section */}
            </Box>
            }
            {/* detail section */}
            {/* examples section */}
            {maintab === 1 &&
            <Box className="hbox border">
              {/* examples list */}
              <Box className="w150 vbox border">example list</Box>
              {/* examples list */}
              {/* example app */}
              <Box className="vbox border">example</Box>
              {/* example app */}
              {/* example code */}
              <Box className="vbox border">example code</Box>
              {/* example code */}
            </Box>
            }
            {/* examples section */}
            <Box className="h50 hbox border"> {/* tabs for body */}
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={(event) => onMainTabClick(event, 0)}>Details Tab</Button>
                <Button onClick={(event) => onMainTabClick(event, 1)}>Examples Tab</Button>
              </ButtonGroup>
            </Box>
          </Box>
          {/* title and body */}
        </Box>
        {/* center */}
        {/* aside */}
        {aside === 1 &&
        <Box className="w300 vbox border">
          aside
        </Box>
        }
        {/* aside */}
      </Box>
      {/* main */}
      <Box className="h50 border"></Box>
     </React.Fragment>
  )
}