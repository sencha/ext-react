/**
 * @class Ext.dataview.Component
 * @extend Ext.dataview.Abstract
 * @xtype componentdataview
 * This class is similar to `Ext.dataview.DataView` except it renders components for each
 * record instead of simple chunks of HTML. The `itemTpl` can still be used for components
 * but it is more typical to use the component's config properties
 *
 * The type of component can be controlled using the `itemConfig` and record's fields can
 * be mapped to config properties using `itemDataMap`.
 *
 *      Ext.create({
 *          xtype: 'componentdataview',
 *
 *          store: [
 *              { name: 'Peter',  age: 26 },
 *              { name: 'Ray',   age: 21 },
 *              { name: 'Egon', age: 24 },
 *              { name: 'Winston', age: 24 }
 *          ],
 *
 *          itemConfig: {
 *              xtype: 'button'
 *          },
 *
 *          itemDataMap: {
 *              '#': {
 *                  text: 'name'
 *              }
 *          }
 *      });
 *
 * The `itemDataMap` is a simple and efficient means for mapping fields to configs, but
 * can only apply fields stored in the records' data to configs on the target component.
 * While this can be dynamic by using {@link Ext.data.field.Field#cfg!calculate calculated}
 * fields, more complex mappings should use {@link Ext.data.ViewModel ViewModels} and
 * {@link Ext.Component#cfg!bind data binding}.
 *
 * For example:
 *
 *      Ext.create({
 *          xtype: 'componentdataview',
 *
 *          store: [
 *              { name: 'Peter',  age: 26 },
 *              { name: 'Ray',   age: 21 },
 *              { name: 'Egon', age: 24 },
 *              { name: 'Winston', age: 24 }
 *          ],
 *
 *          itemConfig: {
 *              xtype: 'button',
 *
 *              viewModel: true, // enable per-record binding
 *
 *              bind: 'Go {record.name}!'
 *          }
 *      });
 *
 * ### Historical Note
 *
 * In previous releases, the `useComponents` config allowed any `Ext.dataview.DataView` to
 * switch to using components instead of pure HTML for items. This feature was replaced by
 * this class in version 6.5 as part of the numerous {@link Ext.dataview.List List} and
 * {@link Ext.grid.Grid Grid} additions.
 *
 * @since 6.5.0
 */

/**
 * @cfg {String} itemInnerCls
 * A class to add to the inner element of items.
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {Object/Ext.Component} itemConfig
 * The object is used to configure the data items created by this data view. The
 * `xtype` property of this config overrides the container's `defaultType`.
 * @accessor
 */

/**
 * @cfg {String} itemContentCls
 * A class to add to the element that immediate wraps the item content produced
 * by the `itemTpl` (the "inner-html" element).
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {Object} itemDataMap
 * This object allows you to map {@link Ext.data.Model record} fields to specific
 * configs on component items.
 *
 * The `itemDataMap` object's keys describe the target objects to receive data
 * from the associated {@link #cfg!record record}. These keys are either `'#'`
 * (for the item itself) or a {@link Ext.Component#cfg!reference reference} to
 * a component contained in the item.
 *
 * For each target listed in `itemDataMap`, the value is another map describing
 * the config name (in the key) and the data field name (as the value).
 *
 * For example:
 *
 *      itemDataMap: {
 *          '#': {
 *              title: 'fullName'
 *          },
 *          text: {
 *              html: 'name'
 *          }
 *      }
 *
 * The above is equivalent to:
 *
 *      item.setTitle(item.getRecord().get('fullName'));
 *      item.lookup('text').setHtml(item.getRecord().get('name'));
 *
 * For more complex mapping of data to item, you should use the data binding as
 * described in the class documentation.
 *
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {Number} [maxItemCache=20]
 * The number of components to cache when no longer needed (as opposed to calling
 * `destroy` on them).
 * @accessor
 */

/**
 * @cfg {Boolean} [striped=false]
 * Set this to `true` if you want the items in this DataView to be zebra striped.
 * alternating their background color.
 * Only applicable if the stylesheet provides styling for alternate items.
 *
 * By default the stylesheet does not provide styling for DataView items, but it
 * can be enabled by setting the `ui` to `'basic'`.
 *
 * Lists and Grids provide default styling for striped items
 * @accessor
 */

/**
 * @cfg {Ext.enums.Widget} defaultType
 * As a {@link Ext.Container container}, this config controls the default type of
 * items that are added.
 *
 * Non-data items can also be added to this container, and these will pick up this
 * default. This config will only apply to data items if `itemConfig` does not contain
 * an `xtype` property (which it does by default). This means that data items will
 * *not* be affected by this config unless an `itemConfig` is set that nulls out the
 * `xtype` (not recommended).
 */
