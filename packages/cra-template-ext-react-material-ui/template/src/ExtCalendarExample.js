import React, { Component } from 'react';
import { ExtCalendar } from "@sencha/ext-react-material-ui";
//import data from './ExtCalendarData.json';
const Ext = window['Ext'];

export default class ExtCalendarExample extends Component {

  constructor() {
    super()
    this.calstore = Ext.create("Ext.calendar.store.Calendars", {
      autoLoad: true,
      proxy: {
          type: "ajax",
          url: "/ExtReactMaterialUIExamples/CalendarFull",
      },
    });

  }

  render() {
    return (
      <ExtCalendar
        height="400px"
        store={this.calstore}
        views={{
            day: {
                startTime: 6,
                endTime: 22,
            },
            workweek: {
                xtype: "calendar-week",
                controlStoreRange: false,
                titleTpl: this.titleTpl,
                label: "Work Week",
                weight: 15,
                dayHeaderFormat: "D d",
                firstDayOfWeek: 1,
                visibleDays: 5,
            },
        }}
        timezoneOffset={0}
      />
    )
  }

}