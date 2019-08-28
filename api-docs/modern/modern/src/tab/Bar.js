/**
 * @class Ext.tab.Bar
 * @extend Ext.Toolbar
 * @xtype tabbar
 *
 * Ext.tab.Bar is used internally by {@link Ext.tab.Panel} to create the bar of tabs that appears at the top of the tab
 * panel. It's unusual to use it directly, instead see the {@link Ext.tab.Panel tab panel docs} for usage instructions.
 *
 * Used in the {@link Ext.tab.Panel} component to display {@link Ext.tab.Tab} components.
 */

/**
 * @cfg {String} [defaultTabUI=null]
 * A default {@link Ext.Component#ui ui} to use for {@link Ext.tab.Tab Tab} items.
 * @accessor
 */

/**
 * @cfg [defaultType='tab']
 * @inheritdoc
 */

/**
 * @cfg layout
 * @inheritdoc
 */

 /**
 * @cfg {String} [tabRotation='default']
 * Specifies tab rotation. Possible values are 'default', 'left',
 * 'none', 'right'.
 * @accessor
 */

/**
 * @event tabchange
 * Fired when active tab changes.
 * @param {Ext.tab.Bar} this
 * @param {Ext.tab.Tab} newTab The new Tab
 * @param {Ext.tab.Tab} oldTab The old Tab
 */
