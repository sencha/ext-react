import React, { Component } from 'react';
import { Calendar_Day, Calendar_List } from '@sencha/ext-react-modern';
import { Panel } from '@sencha/ext-react-modern';
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
            <Panel
                shadow
                title={Ext.Date.format(new Date(), 'F Y')}
                layout="hbox"
                header={{ titleAlign: 'center' }}
            >
                <Panel
                    title="Calendars"
                    ui="light"
                    width={150}
                    bodyPadding={5}
                    hidden={Ext.os.is.Phone}
                >
                    <Calendar_List store={this.store}/>
                </Panel>
                <Calendar_Day
                    store={this.store}
                    flex={1}
                    timezoneOffset={0}
                    gestureNavigation={false}
                    value={new Date()}
                    startTime={8}
                    endTime={20}
                    visibleDays={2}
                />
            </Panel>
        )
    }
}