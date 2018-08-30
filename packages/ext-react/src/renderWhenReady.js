import React from 'react';
import { reactify } from  './index'
const ExtReact = reactify('ExtReact')
//import { ExtReact } from '@sencha/ext-react'

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
            console.log('constructor')

            this.state = {
                ready: Ext.isReady,
                done: false
            }
        }

        componentWillMount() {
          console.log('componentWillMount')
          console.log(this.state.ready)
            if (!this.state.ready) {
                launchQueue.push(this);
            }
        }

        render() {
          console.log('render')
          console.log(this.state.ready)

          if (this.state.ready === true && this.state.done == false ) {
            console.log('in')
            this.state.done = true
            return <Component {...this.props}/>

            //return <ExtReact><Component {...this.props}/></ExtReact>
            //return <div>hi</div>
          }
          else {
            return false
          }

            // return this.state.ready === true && (
            //     <ExtReact><Component {...this.props}/></ExtReact>
            // );
        }
    }
}

Ext.onReady(() => {
    for (let queued of launchQueue) {
        queued.setState({ ready: true });
    }    
});