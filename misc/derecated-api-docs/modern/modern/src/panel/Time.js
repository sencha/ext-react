/**
 *
 * @class Ext.panel.time
 * @extend Ext.panel
 * @xtype timepanel
 *
 *
 * This component presents a time selection view with different interaction modes
 * depending on the device and configuration options. Default time view is analog
 * clock face.
 *
 * Time panel is mostly used as a picker by {@link Ext.field.Time} but can also be
 * created and used directly.
 *
 * @since 6.6.0
 *
 * Example usage:
 *
 *      @example packages=[ext-react]
 *      import { ExtReact, Container, TimePanel } from '@sencha/ext-react-modern';
 *      import React, { Component } from 'react';
 *      export default class TimeExample extends Component {
 *          render() {
 *              return (
 *                  <ExtReact>
 *                      <Container padding={10} layout={'auto'}>
 *                          <TimePanel shadow/>
 *                      </Container>
 *                  </ExtReact>
 *              )
 *          }
 *      }
 */
/**
* @cfg {Date} [value]
* Time value for the panel. If not set, current time will be displayed.
*/

/**
* @cfg {Boolean} [autoAdvance=true]
* If `true`, time panel will automatically advance to minutes after
* selecting an hour value. Setting this to `false` will disable this
* behavior, and switching from hours to minutes will have to be done
* manually via Time panel header.
*/

/**
* @cfg {Boolean} [vertical=true]
* When `true`, Time header will be at the top of the Time panel.
* When `false`, Time header will be at the left side of the Time panel.
* When `auto`, Time header will be set based on the orientation of the device.
*/

/**
* @cfg {Boolean} [confirmable=false]
* When set to `true`, Time panel will have OK and Cancel buttons in
* a toolbar docked to the bottom of the Panel, and user will need to
* confirm selection by activating OK button.
* When set to `false`, Time panel will not have OK and Cancel buttons
* and selection will be confirmed automatically when minutes are
* selected.
*/

/**
* @cfg {Function} [handler]
* This function, if provided, will be called when Time selection
* is confirmed by activating OK button (if {@link #confirmable} is `true`),
* or selecting minutes.
*/

/**
* @cfg {Function} [declineHandler]
* This function, if provided, will be called when user has activated
* Cancel button (only if {@link #confirmable} is `true`).
*/

/**
* @cfg {Object} [scope='this']
* The scope in which {@link #handler} function will be called.
*/

/**
* @cfg {String} buttonAlign
* @inheritdoc
*/

/**
* @cfg {Object} defaultButtons
* Configuration of the buttons to add to the Time panel if
* {@link #confirmable} is set to `true`.
*
* Default is to provide OK and Cancel buttons.
*/

/**
* @cfg {String} [mode=hour]
* @private
* Default mode for Time Panel. values can be 'hour' or 'minute'
*/

/**
* @cfg {Boolean} meridiem
* Defaults to true for 12 hour format for Time Panel.
*/

/**
* @cfg {Boolean} alignPMInside
* Default false.
*/

/**
 * @cfg {string} hourDisplayFormat
 * Accepted values are `G` or `H`
 * Default G
 * See {@link Ext.Date} for details.
 * @since 7.0
 */