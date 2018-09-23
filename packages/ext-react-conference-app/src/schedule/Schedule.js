import React, { Component } from 'react';
import { connect } from 'react-redux';

//import { toggleSearch, filterByDay, toggleFavorite, filterByFavorites } from './actions';
//import { setTitle } from '../actions';
import { loadEvent } from '../event/actions';

import { Container, TabPanel } from '@sencha/ext-modern';
import ScheduleList from './ScheduleList';
import Event from '../event/Event';

class Schedule extends Component {

    constructor({ store }) {
        super();

        this.storeDefaults = {
            source: store,
            autoDestroy: true,
            grouper: {
                property: 'start_time',
                sortProperty: 'startDate'
            }
        };

        this.stores = [
            Ext.create('Ext.data.ChainedStore', { ...this.storeDefaults, filters: [{ property: 'date', value: 'Monday, November 7' }] }),
            Ext.create('Ext.data.ChainedStore', { ...this.storeDefaults, filters: [{ property: 'date', value: 'Tuesday, November 8' }] }),
            Ext.create('Ext.data.ChainedStore', { ...this.storeDefaults, filters: [{ property: 'date', value: 'Wednesday, November 9' }] }),
            Ext.create('Ext.data.ChainedStore', { 
                ...this.storeDefaults, 
                filters: [{ property: 'favorite', value: true }],
                grouper: {
                    groupFn: (item) => `${item.get('date')}, ${item.get('start_time')}`,
                    sortProperty: 'startDate'
                }
            })
        ]
    }

    state = {
        activeItem: 0
    }

    stores = [
        Ext.create('Ext.data.ChainedStore', )
    ]

    componentDidMount = () => {
        this.updateData();
    }

    componentDidUpdate = (prevProps) => {
        this.updateData(prevProps);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event !== this.props.event) {
            this.setState({
                activeItem: this.activeItemForEvent(nextProps.event)
            })
        }
    }

    activeItemForEvent(event) {
        for (let i=0; i<this.stores.length; i++) {
            if (this.stores[i].contains(event)) {
                return i;
            }
        }

        return 0;
    }

    updateData = (prevProps) => {
        const { dispatch } = this.props;
        const id = this.props.match.params.id;

        if (!prevProps || prevProps.match.params.id !== id) {
            dispatch(loadEvent(id, 'Schedule'))
        }
    }

    render() {
        const { store, event, match } = this.props;
        const showEvent = match.params.id && (Ext.os.is.Phone || event);

        const banner = (
            <Container docked="top" className="app-banner">
                <span className="app-banner-content">ExtReact Conference</span>
            </Container>
        )

        return (
            <Container
                activeItem={showEvent ? 1 : 0}
                platformConfig={{
                    "!phone": {
                        layout: 'hbox'
                    },
                    "phone": {
                        layout: {
                            type: 'card',
                            animation: 'slide'
                        }
                    }
                }}
            >
                { !Ext.os.is.Phone && banner }
                <TabPanel
                    flex={1}
                    tabBar={{ shadow: true}}
                    maxWidth={showEvent && 500}
                    activeItem={this.state.activeItem}
                    platformConfig={{
                        "!phone": {
                            flex: 1
                        }
                    }}
                >
                    { Ext.os.is.Phone && banner }
                    <ScheduleList
                        title={Ext.os.is.Phone ? "MON" : 'MONDAY'}
                        event={event}
                        dataStore={this.stores[0]}
                        pinHeaders
                    />
                    <ScheduleList
                        title={Ext.os.is.Phone ? "TUE" : 'TUESDAY'}
                        event={event}
                        dataStore={this.stores[1]}
                        pinHeaders
                    />
                    <ScheduleList
                        title={Ext.os.is.Phone ? "WED" : 'WEDNESDAY'}
                        event={event}
                        dataStore={this.stores[2]}
                        pinHeaders
                    />
                    <ScheduleList
                        iconCls="md-icon-star"
                        tab={{ maxWidth: Ext.os.is.Phone ? 60 : 90 }}
                        dataStore={this.stores[3]}
                        pinHeaders
                    />
                </TabPanel>
                { (Ext.os.is.Phone || showEvent) && <Event event={event} flex={1} header={!Ext.os.is.Phone}/> }
            </Container>
        )
    }
}

const mapStateToProps = ({ schedule, event }) => {
    return { ...schedule, event: (event || {}).record };
}

export default connect(mapStateToProps)(Schedule);
