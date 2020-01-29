/**
 * @class Ext.Dialog
 * @extend Ext.Panel
 * @xtype dialog
 * @xtype window
 *
 * This class provides a convenient way to display a "popup" component that is resizable,
 * draggable, and closable.  Dialogs are not subject to the restrictions of browser
 * popup windows, but provide similar modal experiences.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Dialog, Container, Button } from '@sencha/ext-react-modern';
 *
 *     export default class DialogExample extends Component {
 *
 *         state = {
 *             showDialog: false
 *         }
 *
 *         render() {
 *             const { showDialog } = this.state;
 *
 *             return (
 *                 <ExtReact>
 *                     <Container>
 *                         <Button text="Show Dialog" handler={this.showDialog} ui="action raised"/>
 *                         <Dialog
 *                             displayed={showDialog}
 *                             title="Dialog"
 *                             closable
 *                             maximizable
 *                             closeAction="hide"
 *                             maskTapHandler={this.onCancel}
 *                             bodyPadding="20"
 *                             maxWidth="200"
 *                             defaultFocus="#ok"
 *                             onHide={() => this.setState({ showDialog: false })}
 *                         >
 *                             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
 *                             magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
 *                             commodo consequat.'
 *                             <Button text="Cancel" handler={this.onCancel}/>
 *                             <Button itemId="ok" text="OK" handler={this.onOk}/>
 *                         </Dialog>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *
 *         showDialog = () => {
 *             this.setState({ showDialog: true });
 *         }
 *
 *         onOk = () => {
 *             this.setState({ showDialog: false });
 *         }
 *
 *         onCancel = () => {
 *             this.setState({ showDialog: false });
 *         }
 *
 *     }
 *
 * ## Buttons
 *
 * The above example demonstrates how to set {@link #Ext.Button Buttons} as child items.
 * See the documentation for the {@link #buttons} prop for information on how to
 * configure your own buttons along with Dialog's {@link #standardButtons}.
 *
 * ## Handling ESC and Close
 *
 * Many dialogs have a `Cancel` button (or equivalent) that closes the dialog without
 * taking action. In some cases, this action is first confirmed to avoid data loss.
 *
 * A common problem when implementing dialogs is the presence of `Close` and `ESC` is
 * that they often dismisses the dialog while bypassing the `Cancel` button handler that
 * would normally achieve an orderly shutdown.
 *
 * With `Dialog`, both the ESC key and `close` tool handler call the `close` method
 * to dismiss the dialog. The `close` method (and its {@link #closeAction} prop) are
 * enhanced versions of the implementation in {@link Ext.Panel Panel}.
 *
 * The default dismiss sequence uses the {@link #dismissAction} prop to identify the
 * candidate `Buttons`.  The most common match here is the `Cancel` button.  If there is
 * a matching button then that button's {@link #handler} is called just as if the user
 * had clicked on it instead.
 *
 * The end result is that when using {@link #standardButtons} such as `cancel` or
 * `close`, you seldom need to worry about ESC or `close` tool inconsistency. The handler
 * for your button will be called in all cases.
 *
 * ## Maximize / Restore
 *
 * The ability to {@link #method-maximize maximize} (fill the viewport) with the dialog
 * can be quite useful for complex popups. This can take two forms:
 *
 *  - The {@link #maximizable} prop to provide a {@link Ext.Tool tool} to `maximize` and
 *  also to `restore` the dialog.
 *  - The {@link #maximized} prop to control the current state.
 *
 * The `maximized` prop can be used directly if the {@link #maximizeTool} is not desired.
 * In other words, the ability to control the `maximized` prop is not dependent on
 * whether `maximizable` is set or not.
 * @since 6.5.0
 */

/**
 * @property {Boolean} [isDialog=true]
 * `true` in this class to identify an object this type, or subclass thereof.
 */

/**
 * @event beforemaximize
 * Fires before maximizing the dialog. Returning `false` from this event will cancel
 * the maximization.
 * @param {Ext.Dialog} dialog
 */

/**
 * @event beforerestore
 * Fires before restoring the dialog. Returning `false` from this event will cancel
 * the restoration.
 * @param {Ext.Dialog} dialog
 */

/**
 * @event maximize
 * Fires after the dialog has been maximized. If there is a `maximizeAnimation` this
 * event will fire after the animation is complete.
 * @param {Ext.Dialog} dialog
 */

/**
 * @event restore
 * Fires after the dialog has been restored to its original size. If there is a
 * `restoreAnimation` this event will fire after the animation is complete.
 * @param {Ext.Dialog} dialog
 */

/**
 * @cfg {String/String[]} [dismissAction=['cancel', 'abort', 'no', 'close']]
 * This config lists one or more `itemId` values to look for in this dialog's
 * `buttons`. The first button to be found from this list will be invoked in
 * response to the ESC key or the `close` tool.
 *
 * This config is ignored if a `dismissHandler` is specified.
 *
 * @since 6.5.0
 */

/**
 * @cfg {Object} maximizeAnimation
 * The animation configuration to use when maximizing.
 *
 * @since 6.5.0
 */

/**
 * @cfg {Object/Ext.Dialog} maximizeProxy
 * Configuration options for a proxy dialog to animate to/from maximized state.
 * The `title`, `iconCls`, `ui`, `cls` and `userCls` will be copied to the proxy.
 *
 * @since 6.5.0
 */

/**
 * @cfg {Object/Ext.Tool} maximizeTool
 * Configuration options for the `maximize` tool.
 *
 * @since 6.5.0
 */

/**
 * @cfg {Object} restoreAnimation
 * The animation configuration to use when restoring to normal size.
 *
 * @since 6.5.0
 */

/**
 * @cfg {Object/Ext.Tool} restoreTool
 * Configuration options for the `restore` tool.
 *
 * @since 6.5.0
 */

/**
 * @cfg {Boolean/Ext.drag.Constraint} [constrainDrag=true]
 * Set to `false` to not constrain the dialog to the viewport.
 *
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {String/Function} [dismissHandler]
 * The function or controller method name to call on ESC key press or `close`
 * tool click.
 *
 * If this config is specified, `dismissAction` will be ignored.
 *
 * @controllable
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {Boolean} [maximizable=false]
 * Set to `true` to display the 'maximizeTool` to allow the user to maximize the
 * dialog. Note that when a dialog is maximized, the `maximizeTool` is replaced
 * with the `restoreTool` to give the user the ability to restore the dialog to
 * its previous size.
 *
 * This config only controls the presence of the `maximize` and `restore` tools.
 * The dialog can always be set to `maximized` by directly setting the config or
 * calling the `maximize` and `restore` methods.
 *
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {Boolean} [maximized=false]
 * Set to `true` to display the dialog in a maximized state. Changing this config
 * after construction will utilize the `maximizeAnimation` or `restoreAnimation`.
 *
 * These can be avoided by passing `null` to `maximize` or `restore` methods:
 *
 *      dialog.setMaximized(true);  // uses maximizeAnimation
 *      // or:
 *      dialog.maximize(null);      // no animation for this change
 *
 *      dialog.setMaximized(false); // uses restoreAnimation
 *      // or:
 *      dialog.restore(null);       // no animation for this change
 *
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {String/Function} maskTapHandler
 * The function or method name to call when the modal mask is tapped. A common use
 * for this config is to cancel the dialog.
 *
 *     state = {
 *         showDialog: false
 *     }
 *
 *     render() {
 *         const { showDialog } = this.state;
 *
 *         return (
 *             <ExtReact>
 *                 <Container>
 *                     <Button text="Show Dialog" handler={this.showDialog} ui="action raised"/>
 *                     <Dialog
 *                         displayed={showDialog}
 *                         title="Dialog"
 *                         closable
 *                         maximizable
 *                         closeAction="hide"
 *                         maskTapHandler={this.onCancel}
 *                         bodyPadding="20"
 *                         maxWidth="200"
 *                         defaultFocus="#ok"
 *                         onHide={() => this.setState({ showDialog: false })}
 *                     >
 *                         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
 *                         magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
 *                         commodo consequat.'
 *                         <Button text="Cancel" handler={this.onCancel}/>
 *                         <Button itemId="ok" text="OK" handler={this.onOk}/>
 *                     </Dialog>
 *                 </Container>
 *             </ExtReact>
 *         )
 *     }
 *
 *     showDialog = () => {
 *         this.setState({ showDialog: true });
 *     }
 *
 *     onOk = () => {
 *         this.setState({ showDialog: false });
 *     }
 *
 *     onCancel = () => {
 *         this.setState({ showDialog: false });
 *     }
 *
 * @controllable
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg [modal=true]
 * @inheritdoc
 */

/**
 * @cfg [shadow=true]
 * @inheritdoc
 */

/**
 * @cfg {Ext.Button} buttons
 * {@link Ext.Button Buttons} to appear in the Dialog footer. This is a synonym for the
 * {@link #fbar} prop.
 *
 * The {@link #minButtonWidth} is used as the default
 * {@link Ext.Button#minWidth minWidth} for each of the buttons in the buttons toolbar.
 *
 * ### Child Item Syntax
 * Configure child Button to use your own user-defined Buttons (to incorporate custom
 * buttons along with Dialog's `standardButtons` see the Prop Syntax section below)
 *
 * Example snippet including two user-defined Buttons (Cancel and OK):
 *
 *     <Dialog
 *         displayed={showDialog}
 *         title="Dialog"
 *         closable
 *         maximizable
 *         closeAction="hide"
 *         maskTapHandler={this.onCancel}
 *         bodyPadding="20"
 *         maxWidth="200"
 *         defaultFocus="#ok"
 *         onHide={() => this.setState({ showDialog: false })}
 *     >
 *         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
 *         magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
 *         commodo consequat.'
 *         <Button text="Cancel" handler={this.onCancel}/>
 *         <Button itemId="ok" text="OK" handler={this.onOk}/>
 *     </Dialog>
 *
 * ### Prop Syntax
 * The main advantage of using the `buttons` prop syntax is the availability of
 * {@link Ext.Panel#cfg-standardButtons standardButtons}. The `standardButtons` prop
 * describes many common buttons (such as `ok` above) and provides their `text` as well
 * as the proper, platform-specific ordering.
 *
 * Custom buttons can be mixed with standard buttons or can fully replace them (setting
 * `ok` to `null` would drop it altogether).
 *
 * Example snippet:
 *
 *      buttons: {
 *          ok: 'onOK',
 *
 *          verify: {
 *              text: 'Verify',
 *              handler: 'onVerify',
 *              weight: 200
 *          }
 *      }
 *
 * When combined, custom buttons are presented first. In the above, the `weight` config
 * is used to order the Verify button after the OK button. The weights assigned to the
 * {@link Ext.Panel#cfg!standardButtons standardButtons} vary by platform but `200` is
 * beyond their range.
 *
 * @react-child
 */

/**
 * @cfg hideAnimation
 * @inheritdoc
 */

/**
 * @cfg showAnimation
 * @inheritdoc
 */
