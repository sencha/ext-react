/**
 * @class Ext.Decorator
 * @extend Ext.Component
 *
 * In a few words, a Decorator is a Component that wraps around another Component. A typical example of a Decorator is a
 * {@link Ext.field.Field Field}. A form field is nothing more than a decorator around another component, and gives the
 * component a label, as well as extra styling to make it look good in a form.
 *
 * A Decorator can be thought of as a lightweight Container that has only one child item, and no layout overhead.
 * The look and feel of decorators can be styled purely in CSS.
 *
 * Another powerful feature that Decorator provides is config proxying. For example: all config items of a
 * {@link Ext.slider.Slider Slider} also exist in a {@link Ext.field.Slider Slider Field} for API convenience.
 * The {@link Ext.field.Slider Slider Field} simply proxies all corresponding getters and setters
 * to the actual {@link Ext.slider.Slider Slider} instance. Writing out all the setters and getters to do that is a tedious task
 * and a waste of code space. Instead, when you sub-class Ext.Decorator, all you need to do is to specify those config items
 * that you want to proxy to the Component using a special 'proxyConfig' class property. Here's how it may look like
 * in a Slider Field class:
 *
 *     Ext.define('My.field.Slider', {
 *         extend: 'Ext.Decorator',
 *
 *         config: {
 *             component: {
 *                 xtype: 'slider'
 *             }
 *         },
 *
 *         proxyConfig: {
 *             minValue: 0,
 *             maxValue: 100,
 *             increment: 1
 *         }
 *
 *         // ...
 *     });
 *
 * Once `My.field.Slider` class is created, it will have all setters and getters methods for all items listed in `proxyConfig`
 * automatically generated. These methods all proxy to the same method names that exist within the Component instance.
 */

/**
 * @cfg {Object} component
 * The config object to factory the Component that this Decorator wraps around.
 * @accessor
 */
