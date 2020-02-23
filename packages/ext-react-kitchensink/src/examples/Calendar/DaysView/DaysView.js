import React, { Component } from 'react';
import { ExtCalendarDay, ExtCalendarList } from '@sencha/ext-react-modern';
import { ExtPanel } from '@sencha/ext-react-modern';
import './data';

export default class CalendarDayViewExample extends Component {

    store = Ext.create('Ext.calendar.store.Calendars', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/CalendarDays'
        }
    })

    render() {
        return (
            <ExtPanel
                shadow
                title={Ext.Date.format(new Date(), 'F Y')}
                layout="hbox"
                header={{ titleAlign: 'center' }}
            >
                <ExtPanel
                    title="Calendars"
                    ui="light"
                    width={150}
                    bodyPadding={5}
                    hidden={Ext.os.is.Phone}
                >
                  <ExtCalendarList store={this.store}/>
                </ExtPanel>
                <ExtCalendarDay
                    store={this.store}
                    flex={1}
                    timezoneOffset={0}
                    gestureNavigation={false}
                    value={new Date()}
                    startTime={8}
                    endTime={20}
                    visibleDays={2}
                />
            </ExtPanel>
        )
    }
}