/**
 * @class Ext.dataview.plugin.ListPaging
 * @extend Ext.plugin.Abstract
 * @alias plugin.listpaging
 * Adds a Load More button at the bottom of the list. When the user presses this button,
 * the next page of data will be loaded into the store and appended to the List.
 *
 * By specifying `{@link #autoPaging}: true`, an 'infinite scroll' effect can be achieved,
 * i.e., the next page of content will load automatically when the user scrolls near the
 * bottom of the list.
 *
 * ## Example
 *
 *     Ext.create('Ext.dataview.List', {
 *
 *         store: Ext.create('TweetStore'),
 *
 *         plugins: [
 *             {
 *                 type: 'listpaging',
 *                 autoPaging: true
 *             }
 *         ],
 *
 *         itemTpl: [
 *             '<img src="{profile_image_url}" />',
 *             '<div class="tweet">{text}</div>'
 *         ]
 *     });
 */

/**
 * @cfg {Boolean} [autoPaging=false]
 * True to automatically load the next page as soon as less than {@link #bufferZone}
 * items are available besides the ones currently visible.
 * @accessor
 */

/**
 * @cfg {Number} [bufferZone=8]
 * Amount of items, besides the ones currently visible, that need to be available until
 * the next page is loaded. If 0 (or null), the next page is loaded when the list is
 * scrolled to the bottom. This config only applies if {@link #autoPaging} is true.
 * @accessor
 */

/**
 * @cfg {String} [loadMoreText='Load More...'] The text used as the label of the Load More button.
 * @accessor
 * @locale
 */

/**
 * @cfg {String} [noMoreRecordsText='No More Records']
 * The text used as the label of the Load More button when the Store's
 * {@link Ext.data.Store#totalCount totalCount} indicates that all of the records
 * available on the server are already loaded
 * @accessor
 * @locale
 */
