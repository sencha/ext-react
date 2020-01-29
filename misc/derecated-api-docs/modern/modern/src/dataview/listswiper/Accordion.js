/**
 * @class Ext.dataview.listswiper.Accordion
 * @extend Ext.dataview.listswiper.Item
 * @xtype listswiperaccordion
 */

/**
 * @cfg {Boolean} [swipeToCommit=true]
 * Determines if a full swipe should trigger the default action
 * If false a full swipe will result in the accordion being left in the open state
 * @accessor
 */

/**
 * @cfg {String} state
 * 'dragpeek','dragopen', 'dragcommit', 'open', 'undo'
 * @accessor
 */

/**
 * @cfg {Boolean} [scaleDrag=true]
 * Determines if the delta of a drag should be scaled depending on where the drag is started.
 * This causes drags that start in the middle of an item to move the items faster.
 * This means shorter drag distances when dragging from the middle or far sides
 */
