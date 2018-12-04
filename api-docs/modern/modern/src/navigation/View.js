/**
 * @class Ext.navigation.View
 * @extend Ext.Container
 * @xtype navigationview
 *
 * NavigationView is basically a {@link Ext.Container} with a {@link Ext.layout.Card card} layout, so only one view
 * can be visible at a time. However, NavigationView also adds extra functionality on top of this to allow
 * you to `push` and `pop` views at any time. When you do this, your NavigationView will automatically animate
 * between your current active view, and the new view you want to `push`, or the previous view you want to `pop`.
 *
 * Now, here comes the fun part: you can push any view/item into the NavigationView, at any time, and it will
 * automatically handle the animations between the two views, including adding a back button (if necessary)
 * and showing the new title.
 *
 *     view.push({
 *         title: 'A new view',
 *         html: 'Some new content'
 *     });
 *
 * As you can see, it is as simple as calling the {@link #method-push} method, with a new view (instance or object). Done.
 *
 * You can also `pop` a view at any time. This will remove the top-most view from the NavigationView, and animate back
 * to the previous view. You can do this using the {@link #method-pop} method (which requires no arguments).
 *
 *     view.pop();
 *
 *  Applications that need compatibility with **Older Android** devices will want to see the {@link #layout} prop for details on
 *  disabling navigation view animations as these devices have poor animation support and performance.
 */

/**
 * @cfg {Boolean/Object} navigationBar
 * The NavigationBar used in this navigation view. It defaults to be docked to the top.
 *
 * You can just pass in a normal object if you want to customize the NavigationBar. For example:
 *
 *     navigationBar: {
 *         ui: 'dark',
 *         docked: 'bottom'
 *     }
 *
 * You **cannot** specify a *title* field in this configuration. The title of the navigationBar is taken
 * from the configuration of this views children:
 *
 *     view.push({
 *         title: 'This views title which will be shown in the navigation bar',
 *         html: 'Some HTML'
 *     });
 *
 * @accessor
 */

/**
 * @cfg {String} [defaultBackButtonText='Back']
 * The text to be displayed on the back button if:
 *
 * - The previous view does not have a title.
 * - The {@link #useTitleForBackButtonText} configuration is `true`.
 * @accessor
 */

/**
 * @cfg {Boolean} [useTitleForBackButtonText=false]
 * Set to `false` if you always want to display the {@link #defaultBackButtonText} as the text
 * on the back button. `true` if you want to use the previous views title.
 * @accessor
 */

/**
 * @cfg {Array/Object} items
 * The child items to add to this NavigationView. This is usually an array of Component
 * configurations or instances, for example:
 *
 *     items: [
 *         {
 *             xtype: 'panel',
 *             title: 'My title',
 *             html: 'This is an item'
 *         }
 *     ]
 *
 * If you want a title to be displayed in the {@link #navigationBar}, you must
 * specify a `title` configuration in your view, like above.
 *
 * __Note:__ Only one view will be visible at a time. If you want to change to another view, use the {@link #method-push} or
 * {@link #setActiveItem} methods.
 * @accessor
 */

/**
 * @cfg {Object} layout
 * Layout used in this navigation view, type must be set to 'card'.
 * **Android NOTE:** Older Android devices have poor animation performance. It is recommended to set the animation to null, for example:
 *
 *     layout: {
 *         type: 'card',
 *         animation: null
 *     }
 *
 * @accessor
 */

/**
 * @event push
 * Fires when a view is pushed into this navigation view
 * @param {Ext.navigation.View} this The component instance
 * @param {Mixed} view The view that has been pushed
 */

/**
 * @event pop
 * Fires when a view is popped from this navigation view
 * @param {Ext.navigation.View} this The component instance
 * @param {Mixed} view The view that has been popped
 */

/**
 * @event back
 * Fires when the back button in the navigation view was tapped.
 * @param {Ext.navigation.View} this The component instance\
 */

/**
 * @method push
 * Pushes a new view into this navigation view using the default animation that this view has.
 * @param {Object} view The view to push.
 * @return {Ext.Component} The new item you just pushed.
 */

/**
 * @method pop
 * Removes the current active view from the stack and sets the previous view using the default animation
 * of this view. You can also pass a {@link Ext.ComponentQuery} selector to target what inner item to pop to.
 * @param {Number/String/Object} count If a Number, the number of views you want to pop. If a String, the pops to a matching
 * component query. If an Object, the pops to a matching view instance.
 * @return {Ext.Component} The new active item
 */

/**
 * @method getPreviousItem
 * Returns the previous item, if one exists.
 * @return {Mixed} The previous view
 */

/**
 * @method reset
 * Resets the view by removing all items between the first and last item.
 * @return {Ext.Component} The view that is now active
 */
