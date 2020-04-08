/**
 * @class Ext.SegmentedButton
 * @extend Ext.Container
 * @xtype segmentedbutton
 *
 * SegmentedButton is a container for a group of {@link Ext.Button}s. Generally a SegmentedButton would be
 * a child of a {@link Ext.Toolbar} and would be used to switch between different views.
 *
 * ## Example usage:
 *
 *     @example packages=[ext-react]
 *     import React from 'react';
 *     import { ExtReact, SegmentedButton, Button, Container, Toolbar } from '@sencha/ext-react-modern';
 *
 *     export default function SegementedButtonExample() {
 *         return (
 *             <ExtReact>
 *                 <Container>
 *                     <Toolbar>
 *                         <div style={{marginRight: '10px'}}>Default UI:</div>
 *                         <SegmentedButton>
 *                             <Button pressed text="Low"/>
 *                             <Button text="Medium"/>
 *                             <Button text="High"/>
 *                         </SegmentedButton>
 *                     </Toolbar>
 *                     <Toolbar margin="0 0 20 0">
 *                         <div style={{marginRight: '10px'}}>Toolbar UI:</div>
 *                         <SegmentedButton>
 *                             <Button ui="default-toolbar" pressed text="Low"/>
 *                             <Button ui="default-toolbar" text="Medium"/>
 *                             <Button ui="default-toolbar" text="High"/>
 *                         </SegmentedButton>
 *                     </Toolbar>
 *                 </Container>
 *             </ExtReact>
 *         )
 *     }
 */

/**
 * @cfg {Boolean} [allowMultiple=false]
 * Allow multiple pressed buttons.
 * @accessor
 */

/**
 * @cfg {Boolean} [allowDepress=false]
 * Allow toggling the pressed state of each button.
 * Defaults to `true` when {@link #allowMultiple} is `true`.
 * @accessor
 */

/**
 * @cfg {Boolean} [allowToggle=true]
 * Allow child buttons to be pressed when tapped on. Set to `false` to allow tapping but not toggling of the buttons.
 * @accessor
 */

/**
 * @cfg {Boolean} [forceSelection=false]
 * If {@link #allowMultiple} is `true`, this prop may be set to `true` to indicate that at least
 * one button in the set must remain pressed at all times.
 *
 * If no {@link #value} is configured, and no child buttons are configured `pressed`, the first child
 * button is set `pressed: true`
 *
 * @since 6.0.2
 */

/**
 * @cfg {Array} [pressedButtons=null]
 * The pressed buttons for this segmented button.
 *
 * You can remove all pressed buttons by calling {@link #setPressedButtons} with an empty array.
 * @accessor
 */

/**
 * @cfg [defaultType='button']
 * @inheritdoc
 */

/**
 * @cfg {String} [defaultUI='segmented']
 * Default {@link Ext.Component#ui ui} to use for buttons in this segmented button.
 * Buttons can override this default by specifying their own UI
 */

/**
 * @cfg {String/Number/String[]/Number[]} value
 * @accessor
 * The value of this button.  When {@link #allowMultiple} is `false`, value is a
 * String or Number.  When {@link #allowMultiple is `true`, value is an array
 * of values.  A value corresponds to a child button's {@link Ext.Button#value
 * value}, or its index if no child button values match the given value.
 *
 * Note that value based setting and index based setting cannot be mixed.
 */

/**
 * @cfg {Boolean} [vertical=false]
 * `true` to display the buttons vertically
 */

/**
 * @event toggle
 * Fires when any child button's pressed state has changed.
 * @param {Ext.SegmentedButton} this
 * @param {Ext.Button} button The toggled button.
 * @param {Boolean} isPressed Boolean to indicate if the button was pressed or not.
 */

/**
 * @event change
 * Fires when the value changes.
 * @param {Ext.SegmentedButton} this
 * @param {Object/Object[]} value The new value. Will be an array with {@link #allowMultiple},
 * a single value if not.
 * @param {Object/Object[]} oldValue The old value. Will be an array with {@link #allowMultiple},
 * a single value if not.
 */

/**
 * @cfg layout
 * @inheritdoc
 */
