import React, { Component } from 'react';
import { ExtCalendar } from '@sencha/ext-react-modern';
import '../data';

export default class CalendarExample extends Component {

    store = Ext.create('Ext.calendar.store.Calendars', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/CalendarFull'
        }
    });

    titleTpl = ({start, end}) => <div>{formatDate(start)} - {formatDate(end)}</div>

    render() {
        return (
            <ExtCalendar
                shadow
                views={{
                    day: {
                        startTime: 6,
                        endTime: 22
                    },
                    workweek: {
                        xtype: 'calendar-week',
                        controlStoreRange: false,
                        titleTpl: this.titleTpl,
                        label: 'Work Week',
                        weight: 15,
                        dayHeaderFormat: 'D d',
                        firstDayOfWeek: 1,
                        visibleDays: 5
                    }
                }}
                timezoneOffset={0}
                store={this.store}
            />
        );
    }

}

function formatDate(date) {
    return Ext.util.Format.date(date, 'j M');
}