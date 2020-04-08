import React, { Component, Fragment } from 'react';

//import { Panel } from '@sencha/ext-modern';
//import { renderWhenReady } from '@sencha/ext-react-modern';
//import { ExtReact, ExtReactRenderer } from '@sencha/ext-react-modern';

import ExtPanel from "@sencha/ext-elements-all/react/ExtPanel";
//import Button from "@sencha/ext-elements-all/reactOrig/Button";
//import ExtReact from "@sencha/ext-elements-all/reactOrig/ExtReact";
//import ExtReactRenderer from "@sencha/ext-elements-all/reactOrig/ExtReactRenderer";

import { connect } from 'react-redux';

const mapStateToDummy = state => {
    return { ...state }
};

const Dummy1 = ({ text = 'not connected dummy' }) => <span>{props.hello}</span>;

const Dummy2 = ({ text = 'not connected dummy' }) => <span>{text}</span>;

const Dummy3 = ({ text = 'not connected dummy' }) => <ExtPanel title={text}></ExtPanel>;

//const Dummy4 = () => <Button text={state.hello}></Button>;

class Dummy extends Component {
    render() {
        return (
            <span>{this.props.hello}</span>
        )
    }
}

class DummyA extends Component {
    render() {
        return (
            <ExtPanel title={this.props.hello}>
                <span>{this.props.hello}</span>
            </ExtPanel>
        )
    }
}

const ConnectedDummy = connect(mapStateToDummy)(DummyA);

class App extends Component {
    render() {
        return (
            <Fragment>
                <div>before extreact</div>
                <ConnectedDummy />
                    <ExtPanel title="Root Panel">
                        <ConnectedDummy />
                    </ExtPanel>
                <div>after extreact</div>
            </Fragment>
        );
    }
}

const mapStateToApp = state => ({
    store: state.store,
    text: state.hello
});

export default connect(mapStateToApp)(App);
