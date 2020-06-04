//import React from 'react';
//import { ExtCalendar } from "@sencha/ext-react-material-ui";

class BasicCalendar extends React.Component {

  constructor() {
    super()
    this.store = {
      autoLoad: true,
      proxy: {
        type: 'memory',
        data: [
          {
            id: 1,
            title: 'MyCal',
            eventStore: {
              proxy: {
                type: 'ajax',
                url: datafolder + 'calendar.json'
              }
            }
          },
        ]
      }
    }
  }

  render() {
    return (
      <ExtCalendar
      fitToParent
      store={this.store}
      />
    )
  }
}
