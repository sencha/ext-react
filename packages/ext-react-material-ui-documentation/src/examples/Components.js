import React from "react";
import GridPage from "./grid/GridPage";
import GridOne from "./grid/GridOne";
import CalendarPage from "./calendar/CalendarPage";
import CalendarOne from "./calendar/CalendarOne";
//import Bar from "./components/Bar";

const Components = {
  GridPage: GridPage,
  GridOne: GridOne,
  CalendarPage: CalendarPage,
  CalendarOne: CalendarOne,
};

export default (reactname, whichexample) => {


  var theList = require("./ExampleList").getExamples(reactname)
  //console.log(theList)
  //setExamples2(theList)

  var value = theList[whichexample]
  //console.log(array)
  //console.log(value)
  if (value !== undefined) {
    //console.log(value.component)
    //console.log(Components[value.component])
  }

  if (value !== undefined) {

    return React.createElement(Components[value.component]);

    //     return React.createElement(Components[value.component], {
    //    key: value._uid,
    //    block: value.block
    //  });
  }

  // if (typeof Components[block] !== "undefined") {
  //   return React.createElement(Components[block], {
  //     key: block._uid,
  //     block: block
  //   });
  // }
  // return React.createElement(
  //   () => <div>The component {block.component} has not been created yet.</div>,
  //   { key: block._uid }
  // );
};