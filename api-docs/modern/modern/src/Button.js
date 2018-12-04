/**
 * @class Ext.Button
 * @extend Ext.Component
 * @xtype button
 *
 * This class provides a push button with many presentation options. There are various
 * styles of Button you can create by mixing the {@link #icon}, {@link #iconCls},
 * {@link #iconAlign}, {@link #ui}, and {@link #text} props.
 *
 * Here is an example showing multiple button presentations.
 *
 *      @example packages=[reactor]
 *      import React, { Component } from 'react';
 *      import { ExtReact, Container, Button } from '@extjs/ext-react';
 * 
 *      export default class MyExample extends Component {
 *
 *          state = { message: null }
 * 
 *          render() {
 *              return (
 *                  <ExtReact>
 *                      <Container padding="10">
 *                          <Button 
 *                              text="Say Hello" 
 *                              handler={this.sayHello}
 *                              ui="action raised" 
 *                          />
 *                          <Button 
 *                              text="Say Goodbye" 
 *                              handler={this.sayGoodbye}
 *                          />
 *                          { this.state.message }
 *                      </Container>
 *                  </ExtReact>
 *              )
 *          }
 * 
 *          sayHello = () => {
 *              this.setState({ message: 'Hello world!' });  
 *          }
 * 
 *          sayGoodbye = () => {
 *              this.setState({ message: 'Goodbye cruel world.' });  
 *          }
 * 
 *     }
 *
 * ## Icons
 *
 * As you can see in the above example, you can also create a button with just
 * an icon using the {@link #iconCls} prop.  Simply include the Font Awesome class name as
 * your iconCls prop's value.
 *
 * ## Badges
 *
 * Buttons can also have a badge on them, by using the {@link #badgeText} prop.
 *
 * ## Menus
 *
 * You can assign a menu to a button by using the {@link #cfg!menu} prop. This prop can be
 * a reference to a {@link Ext.menu.Menu menu} instance or a {@link Ext.menu.Menu menu}
 * prop object.
 *
 * When assigning a menu to a button, an arrow is automatically added to the button. You can
 * change the alignment of the arrow using the {@link #cfg!arrowAlign} prop.
 *
 * ## UI
 *
 * Buttons also come with a range of different default UIs. Here are the included UIs
 * available (if {@link #$include-button-uis $include-button-uis} is set to `true`):
 *
 * - **normal** - a basic gray button
 * - **back** - a back button
 * - **forward** - a forward button
 * - **round** - a round button
 * - **action** - shaded using the {@link Global_CSS#$active-color $active-color} (dark blue by default)
 * - **decline** - shaded using the {@link Global_CSS#$alert-color $alert-color} (red by default)
 * - **confirm** - shaded using the {@link Global_CSS#$confirm-color $confirm-color} (green by default)
 *
 * You can also append `-round` to each of the last three UI's to give it a round shape:
 *
 * - **action-round**
 * - **decline-round**
 * - **confirm-round**
 *
 * The default {@link #ui} is **normal**.
 *
 * You can also use the {@link #sencha-button-ui sencha-button-ui} CSS Mixin to create
 * your own UIs.
 */

/**
 * @event tap
 * @preventable
 * Fires whenever a button is tapped.
 * @param {Ext.Button} this The item added to the Container.
 * @param {Ext.EventObject} e The event object.
 */

/**
 * @event release
 * @preventable
 * Fires whenever the button is released.
 * @param {Ext.Button} this The item added to the Container.
 * @param {Ext.EventObject} e The event object.
 */

/**
 * @cfg {String} pressedCls
 * The CSS class to add to the Button when it is {@link #pressed}.
 * @accessor
 */

/**
 * @cfg {String} pressingCls
 * The CSS class to add to the Button when it is being pressed by the user.
 * @accessor
 */

/**
 * @cfg {String} badgeCls
 * The CSS class to add to the Button's badge, if it has one.  Badges appear as small
 * numbers, letters, or icons that sit on top of your button.  For instance, a small
 * red number indicating how many updates are available.
 * @accessor
 */

/**
 * @cfg {String} labelCls
 * The CSS class to add to the field's label element.
 * @accessor
 */

/**
 * @cfg {String} [iconCls=null]
 * One or more space separated CSS classes to be applied to the icon element.
 * The CSS rule(s) applied should specify a background image to be used as the
 * icon.
 *
 * An example of specifying a custom icon class would be something like:
 *
 *     // specify the property in the prop for the class:
 *     iconCls="my-home-icon"
 *
 *     // css rule specifying the background image to be used as the icon image:
 *     .my-home-icon {
 *         background-image: url(../images/my-home-icon.gif) !important;
 *     }
 *
 * In addition to specifying your own classes, you can use the font icons
 * provided in the SDK using the following syntax:
 *
 *     // using Font Awesome
 *     iconCls="x-fa fa-home"
 *
 *     // using Pictos
 *     iconCls="pictos pictos-home"
 *
 * Depending on the theme you're using, you may need include the font icon
 * packages in your application in order to use the icons included in the
 * SDK.  For more information see:
 *
 *  - [Font Awesome icons](http://fontawesome.io/cheatsheet/)
 *  - [Pictos icons](../guides/core_concepts/font_ext.html)
 *  - [Theming Guide](../guides/core_concepts/theming.html)
 * @accessor
 */

/**
 * @cfg {"left"/"right"/"center"} [textAlign='null']
 * @since 6.0.1
 */

/**
 * @cfg {String} [menuAlign='tl-bl?']
 * The position to align the menu to (see {@link Ext.util.Positionable#alignTo} for more details).
 */

/**
 * @cfg {Boolean} [destroyMenu=true]
 * Whether or not to destroy any associated menu when this button is destroyed.
 * In addition, a value of `true` for this prop will destroy the currently bound menu
 * when a new menu is set in {@link #setMenu} unless overridden by that method's destroyMenu
 * function argument.
 */

/**
 * @cfg {Boolean} [allowDepress=true]
 * `true` to allow user interaction to set {@link #pressed} to `false` when
 * the button is in the {@link #pressed} state. Only valid when {@link #pressed}
 * is configured.
 *
 * @accessor
 * @since 6.0.2
 */

/**
 * @cfg {String} [badgeText=null]
 * Optional badge text.  Badges appear as small numbers, letters, or icons that sit on
 * top of your button.  For instance, a small red number indicating how many updates
 * are available.
 * @accessor
 */

/**
 * @cfg {String} [text=null]
 * The Button text.
 * @accessor
 */

/**
 * @cfg {String} [icon=false]
 * Url to the icon image to use if you want an icon to appear on your button.
 * @accessor
 */

/**
 * @cfg {String} [iconAlign='left']
 * The position within the Button to render the icon Options are: `top`, `right`, `bottom`, `left` and `center` (when you have
 * no {@link #text} set).
 * @accessor
 */

/**
 * @cfg {Number/Boolean} [pressedDelay=0]
 * The amount of delay between the `tapstart` and the moment we add the `pressingCls` (in milliseconds).
 * Settings this to `true` defaults to 100ms.
 * @accessor
 */

/**
 * @cfg {Ext.menu.Menu} [menu=null]
 * A {@link Ext.menu.Menu Menu} to show when the Button is clicked / tapped.
 *
 * Example snippet:
 *
 *     <Button text="Style">
 *         <Menu>
 *             <MenuItem text="Single" value="single"/>
 *             <MenuItem text="Double" value="double"/>
 *         </Menu>
 *     </Button>
 *
 * @accessor
 * @react-child
 */

/**
 * @cfg {Boolean} [arrow=true]
 * By default, if the button has a {@link #cfg!menu}, an arrow icon is shown to indicate this.
 *
 * Configure `arrow: false` to hide the menu arrow.
 * @accessor
 */

/**
 * @cfg {"right"/"bottom"} [arrowAlign='right']
 * The side of the Button box to render the arrow if the button has an associated
 * {@link #cfg!menu}.
 * @accessor
 */

/**
 * @cfg {Function} [handler=null]
 * The handler function to run when the Button is tapped on.
 * @accessor
 */

/**
 * @cfg {Object} [scope=null]
 * The scope (`this` reference) in which the configured {@link #handler} will be executed,
 * unless the scope is a ViewController method name.
 * @accessor
 */

/**
 * @cfg {String} [autoEvent=null]
 * Optional event name that will be fired instead of `tap` when the Button is tapped on.
 * @accessor
 */

/**
 * @cfg {String} [ui=null]
 * The ui style to render this button with. The valid default options are:
 *
 * - `null` - a basic gray button (default).
 * - `'back'` - a back button.
 * - `'forward'` - a forward button.
 * - `'round'` - a round button.
 * - `'plain'`
 * - `'action'` - shaded using the {@link Global_CSS#$active-color $active-color} (dark blue by default).
 * - `'decline'` - shaded using the {@link Global_CSS#$alert-color $alert-color} (red by default).
 * - `'confirm'` - shaded using the {@link Global_CSS#$confirm-color $confirm-color} (green by default).
 *
 * You can also append `-round` to each of the last three UI's to give it a round shape:
 *
 * - **action-round**
 * - **decline-round**
 * - **confirm-round**
 *
 * @accessor
 */

/**
 * @cfg {String} html The HTML to put in this button.
 *
 * If you want to just add text, please use the {@link #text} configuration.
 * @accessor
 */

/**
 * @cfg {Boolean} [enableToggle=false]
 * Allows this button to have the pressed state toggled via user
 * interaction.
 *
 * @accessor
 * @since 6.0.2
 */

/**
 * @cfg {String/Number} [value=null]
 * The value of this button.  Only applicable when used as an item of a
 * {@link Ext.SegmentedButton Segmented Button}.
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [pressed=false]
 * Sets the pressed state of the button.
 *
 * @evented
 * @since 6.0.2
 */
