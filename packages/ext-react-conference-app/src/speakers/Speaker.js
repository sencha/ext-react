import React, { Component } from 'react';
import { Container, Panel } from '@sencha/ext-modern';
import ScheduleList from '../schedule/ScheduleList';
import { connect } from 'react-redux';
//import { setTitle } from '../actions';

class Speaker extends Component {

    constructor({ schedule }) {
        super();

        this.store = Ext.create('Ext.data.ChainedStore', {
            autoDestroy: true,
            source: schedule && schedule.store
        });
    }

    componentDidMount = () => this.filterSessions()
    componentDidUpdate = () => this.filterSessions()

    filterSessions() {
        const { speaker } = this.props;

        if (speaker && speaker.data.sessions) {
            this.store.filter({
                value: speaker.data.sessions,
                property: 'id',
                operator: 'in'
            });
        }
    }

    render() {
        const { speaker, ...props } = this.props;
        const data = speaker && speaker.data;

        return (
            <Container {...props} layout="vbox" scrollable padding={20}>
                { speaker && (
                    <Container>
                        <div className="app-speaker-ct">
                            <img className="app-speaker-image" src={data.avatar_url}/>
                            <div className="app-speaker-text">
                                <div className="app-speaker-name">{data.name}</div>
                                <div className="app-speaker-title">{data.title}</div>
                                <div className="app-speaker-company">{data.company}</div>
                                <div className="app-speaker-bio">{data.bio}</div>
                            </div>
                        </div>
                        <h2 style={{marginTop: '40px', color: '#999' }}>Events</h2>
                        <Container shadow>
                            <ScheduleList
                                dataStore={this.store}
                                scrollable={false}
                                showTime
                                eagerLoad
                            />
                        </Container>
                    </Container>
                )}
            </Container>
        )
    }
}

const mapStateToProps = ({ schedule }) => {
    return { schedule };
}

export default connect(mapStateToProps)(Speaker);
