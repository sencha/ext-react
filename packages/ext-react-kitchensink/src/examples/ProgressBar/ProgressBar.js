import React, { Component } from 'react'
import { Panel, Progress, Container } from '@sencha/ext-react-modern';

export default class ProgressBarExample extends Component {

    constructor() {
        super();
        this.state = {
            progress: 0
        }
    }

    componentDidMount() {
        this.updateLoop = setInterval(() => {
            let { progress } = this.state;
            progress += 1;
            if (progress > 100) progress = 0;
            this.setState({ progress });
        }, 100)
    }

    componentWillUnmount() {
        clearInterval(this.updateLoop);
    }

    render() {
        const { progress } = this.state;
//                <Container style={{marginTop: '20px'}}>Loading: {progress}%</Container>

        return (
            <Panel layout="vbox" bodyPadding="20" shadow width="300">
                <Progress value={progress/100.0} text={`Loading: ${progress}%`}/>
                <Container style={{marginTop: '20px'}} html={`Loading: ${progress}%`}></Container>
                <Progress value={progress/100.0}/>
            </Panel>
        )
    }

}