/**
 * @class Ext.dataview.ListItem
 * @extend Ext.dataview.component.DataItem
 * @xtype listitem
 *
 * A ListItem is a container for {@link Ext.dataview.List} with 
 * useSimpleItems: false. 
 * 
 * ListItem configures and updates the {@link Ext.data.Model records} for  
 * the sub-component items in a list. 
 *   
 * Overwrite the `updateRecord()` method to set a sub-component's value. 
 * the framework calls `updateRecord()` whenever the data in the list updates.
 *
 * The `updatedata` event fires after `updateRecord()` runs.
 *
 * *Note*: Use of ListItem increases overhead since it generates more markup than
 * using the List class with useSimpleItems: true. This overhead is more
 * noticeable in Internet Explorer. If at all possible, use
 * {@link Ext.dataview.SimpleListItem} instead via the List's
 * {@link Ext.dataview.List#useSimpleItems useSimpleItems} config.
 *
 * The following example shows how to configure and update sub-component items
 * in a list:
 *
 *     Ext.define('Twitter.view.TweetListItem', {
 *         extend: 'Ext.dataview.ListItem',
 *         xtype : 'tweetlistitem',
 *         requires: [
 *             'Ext.Img'
 *         ],
 *         config: {
 *             userName: {
 *                 cls: 'username'
 *             },
 *             text: {
 *                 cls: 'text'
 *             },
 *             avatar: {
 *                 docked: 'left',
 *                 xtype : 'image',
 *                 cls   : 'avatar',
 *                 width: '48px',
 *                 height: '48px'
 *             },
 *             layout: {
 *                 type: 'vbox'
 *             }
 *         },
 *     
 *         applyUserName: function(config) {
 *             return Ext.factory(config, Ext.Component, this.getUserName());
 *         },
 *     
 *         updateUserName: function(newUserName) {
 *             if (newUserName) {
 *                 this.insert(0, newUserName);
 *             }
 *         },
 *     
 *         applyText: function(config) {
 *             return Ext.factory(config, Twitter.view.TweetListItemText, this.getText());
 *         },
 *     
 *         updateText: function(newText) {
 *             if (newText) {
 *                 this.add(newText);
 *             }
 *         },
 *     
 *         applyAvatar: function(config) {
 *             return Ext.factory(config, Ext.Img, this.getAvatar());
 *         },
 *     
 *         updateAvatar: function(newAvatar) {
 *             if (newAvatar) {
 *                 this.add(newAvatar);
 *             }
 *         },
 *     
 *         updateRecord: function(record) {     
 *             if (!record) {
 *                 return;
 *             }
 *
 *             this.getUserName().setHtml(record.get('username'));
 *             this.getText().setHtml(record.get('text'));
 *             this.getAvatar().setSrc(record.get('avatar_url'));
 *             this.callParent(arguments);
 *
 *         }
 *     });
 *
 */

/**
 * @event updatedata
 * Fires whenever the data of the DataItem is updated.
 * @param {Ext.dataview.component.DataItem} this The DataItem instance.
 * @param {Object} newData The new data.
 */
