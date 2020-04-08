import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, List } from '@sencha/ext-react-modern';
//import AppBar from '../AppBar';
//import { Template } from '@sencha/ext-react-modern';
import { loadSpeakers, loadSpeaker } from './actions';
//import { setTitle } from '../actions';
import Speaker from './Speaker';

class Speakers extends Component {

  store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    proxy: {
        type: 'ajax',

        url: 'resources/speakers.json'
    }
  })


    itemTpl2 = `
        <div class="app-list-content">
            <div class="app-list-headshot" style="background-image: url('{avatar_url}')"></div>
            <div class="app-list-text">
                <div class="app-list-item-title">{name}</div>
                <div class="app-list-item-details">{title} - {company}</div>
            </div>
        </div>
    `

    itemTpl = new Ext.Template(data => (
      <div className="app-list-content">
          <div className="app-list-headshot" style={{backgroundImage: `url(${data.avatar_url})`}}></div>
          <div className="app-list-text">
              <div className="app-list-item-title">{data.name}</div>
              <div className="app-list-item-details">{data.title} - {data.company}</div>
          </div>
      </div>
  ))


    componentDidMount = () => {
        this.props.dispatch(loadSpeakers());
        this.updateData();
    }

    componentDidUpdate = (prevProps) => {
        this.updateData(prevProps)
    }

    updateData = (prevProps) => {
        const id = this.props.match.params.id;

        if (!prevProps || prevProps.match.params.id !== id) {
            this.props.dispatch(loadSpeaker(id))
        }
    }

    // onItemTap = (list, index, target, record) => {
    //     self.location.hash = `/speakers/${record.id}`;
    // }

    onChildTap = ({sender, location, eOpts}) => {
      console.log(location)
      self.location.hash = `/speakers/${location.record.id}`;
  }


    render() {
        const { record, match, ...props } = this.props;
        return (
            <Container
                activeItem={match.params.id ? 1 : 0}
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
                <List
                    {...props}
                    store={this.store}
                    itemTplx='hi {name}'
                    itemTpl={this.itemTpl2}
                    onChildtap={this.onChildTap}
                    itemCls="app-list-item"
                    rowLines
                    flex={1}
                    cls="app-list"
                    maxWidth={!Ext.os.is.Phone && record && 500}
                />
                { (Ext.os.is.Phone || record) && <Speaker speaker={record} flex={1}/> }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return state.speakers;
}

//export default connect(mapStateToProps, null, null, { withRef: true })(Speakers);
export default connect(mapStateToProps, null, null)(Speakers);