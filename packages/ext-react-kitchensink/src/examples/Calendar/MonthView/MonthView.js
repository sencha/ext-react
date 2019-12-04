import React, { Component } from 'react';
import { Calendar_Month, Calendar_List } from '@sencha/ext-react-modern';
import { Panel } from '@sencha/ext-react-modern';
import '../data';

export default class CalendarMonthViewExample extends Component {

    store = Ext.create('Ext.calendar.store.Calendars', {
        autoLoad: true,
        proxy:{
            type: 'ajax',
            url: '/KitchenSink/CalendarFull'
        }
    })

    render(){
        return (
            <Panel
                shadow
                title={Ext.Date.format(new Date(),'F Y')}
                layout="hbox"
                header={{ titleAlign:'center' }}
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
                <Calendar_Month
                    flex= {1}
                    visibleWeeks={null}
                    timezoneOffset={0}
                    gestureNavigation={false}
                    store={this.store}
                />
            </Panel>
        )
    }
}