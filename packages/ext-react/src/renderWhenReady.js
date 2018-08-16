import React from 'react';

const launchQueue = [];

/**
 * Higher order function that returns a component that waits for a ExtReact to be ready before rendering.
 * @param {class} Component 
 * @return {class}
 */
export default function renderWhenReady(Component) {

    return class ExtReactRenderWhenReady extends React.Component {

        static isExtJSComponent = true;

        constructor() {
            super();

            this.state = {
                ready: Ext.isReady
            }
        }

        componentWillMount() {
            if (!this.state.ready) {
                launchQueue.push(this);
            }
        }

        render() {
            return this.state.ready === true && (
                <Component {...this.props}/>
            );
        }
    }
}

Ext.onReady(() => {
    for (let queued of launchQueue) {
        queued.setState({ ready: true });
    }    
});