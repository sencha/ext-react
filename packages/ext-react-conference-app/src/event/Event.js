import React, { Component } from 'react';
import { Panel, TabBar, Container } from '@sencha/ext-modern';
import { connect } from 'react-redux';
import { setTitle } from '../actions';
import { loadEvent } from './actions';
import days from '../util/days';

class Event extends Component {

    render() {
        const { record, header=true, ...props } = this.props;
        const data = record && record.data;
        const day = data && data.date && data.date.match(/(Monday|Tuesday|Wednesday)/)[1];
        const speaker = data && data.speakers && data.speakers.length > 0 && data.speakers.map(s => s.name).join(', ');

        const speakers = data && data.speakerNames ? `by ${data.speakerNames}` : ''
        const fullDay = data ? day + ':  ' + data.start_time + ' - ' + data.end_time :''

        return (
            <Panel 
                {...props}
                padding="20" 
                scrollable 
                header={header}
                tools={header && { close: () => location.hash = '/schedule' }}
            >
              { data && (
<div>
<div className="app-event-name">{data.title}</div>
<div className="app-event-speaker">{ data.speakerNames ? `by ${data.speakerNames}` : data.category }</div>
<div className="app-event-time">{day} {data.start_time} - {data.end_time}</div>
<div className="app-event-location">{data.location.name}</div>
{ data.description && <hr/> }
<div className="app-event-abstract" dangerouslySetInnerHTML={{ __html: data.description }}/>
</div>
              )}
            </Panel>
        )
    }

}


// <div>
// <div className="app-event-name">{data.title}</div>
// <div className="app-event-speaker">{ data.speakerNames ? `by ${data.speakerNames}` : data.category }</div>
// <div className="app-event-time">{day} {data.start_time} - {data.end_time}</div>
// <div className="app-event-location">{data.location.name}</div>
// { data.description && <hr/> }
// <div className="app-event-abstract" dangerouslySetInnerHTML={{ __html: data.description }}/>
// </div>

// <Container>
// <Container className="app-event-name" html={data.title} />
// <Container className="app-event-speaker" html={speakers} />
// <Container className="app-event-time" html={fullDay} />
// <Container className="app-event-location" html={data.location.name} />
// <Container html='<br/><hr>' />
// <Container className="app-event-location" html={data.description} />
// </Container>



const mapStateToProps = ({event}) => {
    return event;
}

export default connect(mapStateToProps)(Event);