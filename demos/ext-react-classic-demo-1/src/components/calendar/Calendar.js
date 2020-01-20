import React, {Component} from 'react';
import {
  ExtCalendar
} from '@sencha/ext-react-classic';

class Calendar extends Component {

  render() {
    return (
      <ExtCalendar
        title = "The Calendar"
      >
      </ExtCalendar>
    )
  }
}
export default Calendar;