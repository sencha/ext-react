import React, { Component } from 'react';
import { ExtCalendarWeek, ExtCalendarList } from '@sencha/ext-react-modern';
import { ExtPanel } from '@sencha/ext-react-modern';
import './data';

export default class CalendarWeekViewExample extends Component {

  state = {
    calendarview: 'fullweek',
    visibleDays: 7,
    firstDayOfWeek: 0
  }

  store = Ext.create('Ext.calendar.store.Calendars', {
    autoLoad: true,
    proxy: {
      type: 'ajax',
      url: '/KitchenSink/CalendarWeek'
    }
  })

  changeCalendarView = (button, value) => {
    if (value == 'fullweek') {
      this.setState({
        calendarview: value,
        visibleDays: 7,
        firstDayOfWeek: 0
      })
    }
    else {
      this.setState({
        calendarview: value,
        visibleDays: 5,
        firstDayOfWeek: 0
      })
    }
  }

  render() {
      return (
        <ExtPanel
            shadow
            title={Ext.Date.format(new Date(), 'F Y')}
            layout="hbox"
            header={{
              layout: 'hbox',
              items: [{
                xtype: 'component',
                flex: 1
                }, {
                xtype: 'segmentedbutton',
                items: [{
                  text: Ext.os.is.Phone ? null : 'Full Week',
                  iconCls: Ext.os.is.Phone ? 'x-fa fa-calendar-check-o' : null,
                  value: 'fullweek',
                  handler: () => this.setState({visibleDays:7, firstDayOfWeek: 0})
                  }, {
                  text: Ext.os.is.Phone ? null : 'Work Week',
                  iconCls: Ext.os.is.Phone ? 'x-fa fa-briefcase' : null,
                  value: 'workweek',
                  handler: () => this.setState({visibleDays: 5, firstDayOfWeek: 1})
                }]
              }]
            }}
        >
                <ExtPanel
                    title={'Calendars'}
                    ui={'light'}
                    width={150}
                    bodyPadding={5}
                    hidden={Ext.os.is.Phone}
                >
                    <ExtCalendarList store={this.store}/>
                </ExtPanel>
                <ExtCalendarWeek
                    store={this.store}
                    flex={1}
                    timezoneOffset={0}
                    gestureNavigation={false}
                    value={new Date()}
                    firstDayOfWeek={this.state.firstDayOfWeek}
                    visibleDays={this.state.visibleDays}
                />
            </ExtPanel>
      )
  }
}
