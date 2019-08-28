import React, { Component } from 'react';
import { Panel, Container } from '@sencha/ext-modern';

import AppComponents2 from './AppComponents2'

export default class AppComponents extends Component {

    render() {
        return (
            <Panel title="at the root" style={{ border: '1px solid green'}} padding="10">
                <AppComponents2 />
            </Panel>
        )
    }

}