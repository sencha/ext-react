/**
 * @class Ext.panel.Header
 * @extend Ext.Container
 * @xtype panelheader
 *
 * This container is used to manage the items (such as title and tools) for `Ext.Panel`.
 *
 * @since 6.0.1
 */

/**
 * @cfg {String} icon
 * Path to an image to use as an icon.
 *
 * For instructions on how you can use icon fonts including those distributed in
 * the SDK see {@link #iconCls}.
 * @accessor
 */

/**
 * @cfg {'top'/'right'/'bottom'/'left'} [iconAlign='left']
 * The side of the title to render the icon.
 * @accessor
 */

/**
 * @cfg {String} iconCls
 * @accessor
 * One or more space separated CSS classes to be applied to the icon element.
 * The CSS rule(s) applied should specify a background image to be used as the
 * icon.
 *
 * An example of specifying a custom icon class would be something like:
 *
 *     // specify the property in the config for the class:
 *     iconCls: 'my-home-icon'
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
 *     iconCls: 'x-fa fa-home'
 *
 *     // using Pictos
 *     iconCls: 'pictos pictos-home'
 *
 * Depending on the theme you're using, you may need include the font icon
 * packages in your application in order to use the icons included in the
 * SDK.  For more information see:
 *
 *  - [Font Awesome icons](http://fortawesome.github.io/Font-Awesome/cheatsheet/)
 *  - [Pictos icons](../guides/core_concepts/font_ext.html)
 *  - [Theming Guide](../guides/core_concepts/theming.html)
 */

/**
 * @cfg {'auto'/'90'/'270'/'0'} [titleRotation='auto']
 * The rotation of the {@link #cfg-title}.
 *
 * - `'auto'` - use the default rotation, depending on the {@link Ext.Panel#cfg-headerPosition headerPosition}.
 * - `'0'` - no rotation
 * - `'90'` - rotate 90 degrees clockwise
 * - `'270'` - rotate 270 degrees clockwise
 *
 * The default behavior of this config depends on the {@link Ext.Panel#cfg-headerPosition headerPosition}:
 *
 * - `'top'` or `'bottom'` - `'0'`
 * - `'right'` - `90`
 * - `'left'` - `270`
 */

/**
 * @cfg {String/Ext.panel.Title} title
 * The title text or config object for the {@link Ext.panel.Title Title} component.
 * @accessor
 */

/**
 * @cfg {'left'/'center'/'right'} [titleAlign='left']
 * The alignment of the title text within the available space between the
 * icon and the tools.
 * @accessor
 */
