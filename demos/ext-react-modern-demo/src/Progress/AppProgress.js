import React, { Component } from 'react'
import { Panel, Progress } from '@sencha/ext-modern';

export default class AppProgress extends Component {

    state = {
        progress: 0
    }

    componentDidMount() {
        this.updateLoop = setInterval(() => {
            let { progress } = this.state;
            progress += 1;
            if (progress > 100) progress = 0;
            this.setState({ progress });
        }, 100)
    }

    render() {
        const { progress } = this.state;

        return (
                <Panel layout={{ type: 'vbox', align: 'center' }}>
                    <Progress value={progress/100.0} text={`Loading: ${progress}%`} width="75%"/>
                    <div style={{marginTop: '20px'}}>Loading: {progress}%</div>
                    <Progress value={progress/100.0} width="75%"/>
                </Panel>
        )
    }

}