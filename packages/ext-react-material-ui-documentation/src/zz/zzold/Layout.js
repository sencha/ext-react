import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import SplitPane from 'react-split-pane';
//https://coronavirus.jhu.edu/map.html

export const Layout = () => {
  const [maintab, setMaintab] = useState(0);
  const [detailstab, setDetailstab] = useState(0);
  const [aside, setAside] = useState(0);

  return (
    <React.Fragment>
      {/* header */}
      <Box className="hbox border frameheader" style={{maxHeight:'50px'}}>header</Box>
      {/* header */}
      {/* main */}
      <Box className="hbox framemiddle">


        {/* nav */}
        <Box className="w300 vbox border frameleft">
          menu
        </Box>
        {/* nav */}
        {/* center */}
        <Box className="hbox frameright">
          {/* title and body */}
          <Box className="vbox">
            <Box className="h50 border frametop">title</Box>
            {/* detail section */}
            {maintab === 0 &&
            <Box className="hbox">
              {/* text section */}
              <Box className="vbox border frameleft">text</Box>
              {/* text section */}
              {/* property method event section */}
              <Box className="vbox frameright">
                {/* property method event tabs section */}
                <Box className="h50 hbox border frametop">  {/*  */}
                inside top
                </Box>
                {/* property method event tabs section */}
                {detailstab === 0 &&
                <Box className="vbox border ">
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
            <Box className="h50 hbox border framebottom"> {/* tabs for body */}
              inside bottom
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
      <Box className="hbox border framefooter" style={{maxHeight:'50px'}}>footer</Box>
     </React.Fragment>
  )
}