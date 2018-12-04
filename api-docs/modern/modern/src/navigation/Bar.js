/**
 * @class Ext.navigation.Bar
 * @extend Ext.TitleBar
 *
 * This component is used in {@link Ext.navigation.View} to control animations in the toolbar. You should never need to
 * interact with the component directly, unless you are subclassing it.
 * @private
 */

/**
 * @cfg cls
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg {String} [ui='dark']
 * Style options for Toolbar. Either 'light' or 'dark'.
 * @accessor
 */

/**
 * @cfg defaultType
 * @hide
 * @accessor
 */

/**
 * @cfg layout
 * @ignore
 * @accessor
 */

/**
 * @cfg {Array/Object} items The child items to add to this NavigationBar. The {@link #cfg-defaultType} of
 * a NavigationBar is {@link Ext.Button}, so you do not need to specify an `xtype` if you are adding
 * buttons.
 *
 * You can also give items a `align` configuration which will align the item to the `left` or `right` of
 * the NavigationBar.
 * @hide
 * @accessor
 */

/**
 * @cfg {Boolean} [androidAnimation=false]
 * Optionally enable CSS transforms on Android 2
 * for NavigationBar animations.  Note that this may cause flickering if the
 * NavigationBar is hidden.
 * @accessor
 */

/**
 * @event back
 * Fires when the back button was tapped.
 * @param {Ext.navigation.Bar} this This bar
 */
