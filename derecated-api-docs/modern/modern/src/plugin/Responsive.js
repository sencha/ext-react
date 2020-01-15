/**
 * @class Ext.plugin.Responsive
 * @extend Ext.mixin.Responsive
 * @alias plugin.responsive
 * This plugin can be added to component instances to process a `responsiveConfig`. For
 * example:
 *
 *      Ext.create({
 *          xtype: 'panel',
 *          layout: 'hbox',
 *
 *          items: [{
 *              xtype: 'component',
 *              plugins: 'responsive',
 *
 *              responsiveConfig: {
 *                  'width < 800': {
 *                      hidden: true
 *                  },
 *
 *                  'width >= 800': {
 *                      hidden: false
 *                  }
 *              }
 *          },
 *          ...]
 *      });
 *
 * For details see `{@link Ext.mixin.Responsive#responsiveConfig responsiveConfig}`.
 */
