/**
 * @class Ext.Progress
 * @extend Ext.Gadget
 * @xtype progress
 * @xtype progressbarwidget
 * @mixin Ext.ProgressBase
 *
 * A simple progress bar widget.
 *
 * You are responsible for showing, updating (via {@link #setValue}) and clearing the
 * progress bar as needed from your own code. This method is most appropriate when you
 * want to show progress throughout an operation that has predictable points of interest
 * at which you can update the control.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, Panel, Progress } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         state = {
 *             progress: 0
 *         }
 *
 *         componentDidMount() {
 *             this.updateLoop = setInterval(() => {
 *                 let { progress } = this.state;
 *                 progress += 1;
 *                 if (progress > 100) progress = 0;
 *                 this.setState({ progress });
 *             }, 100)
 *         }
 *
 *         render() {
 *             const { progress } = this.state;
 *
 *             return (
 *                 <ExtReact>
 *                     <Panel layout={{ type: 'vbox', align: 'center' }}>
 *                         <Progress value={progress/100.0} text={`Loading: ${progress}%`} width="75%"/>
 *                         <div style={{marginTop: '20px'}}>Loading: {progress}%</div>
 *                         <Progress value={progress/100.0} width="75%"/>
 *                     </Panel>
 *                 </ExtReact>
 *             )
 *         }
 *
 *     }
 *
 */

/**
 * @cfg {String} [text=null]
 * The background text
 */

/**
 * @cfg {Boolean} [animate=false]
 * Specify as `true` to have this progress bar animate to new extent when updated.
 */
