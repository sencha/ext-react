import React, { useState, useEffect } from 'react';
import axios from "axios";
import Prism from "prismjs";
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'
import Box from '@material-ui/core/Box';

export const Live = () => {
  const [code, setCode] = useState({});
  const [items, setItems] = useState(null);

  useEffect(() => {
    const code = window._code;

    var s = `
    class MyReactComponent extends React.Component {
      clickMe({sender, e}) {
        console.log('click me')
        console.log('sender')
        console.log(sender)
        console.log('this')
        console.dir(this)
      }

      render() {
        return (
    <div>hi</div>
        )
      }
    }
    `
    setCode(s);
    setItems(1)
  })

  return items ? (
    <React.Fragment>
      {/* header */}
      <Box className="main border">
      <LiveProvider code={code} noInline={true}>
        <Box className="vbox border">
        <LiveEditor xstyle={{display:'flex',flexDirection:'row',overflow:'auto'}} className="w300 border"/>
        </Box>
        <LivePreview className="hbox border"/>
        <LiveError className="hbox border"/>
      </LiveProvider>
      </Box>
      </React.Fragment>
  ) : (
    <div>Loading...</div>
  );


}