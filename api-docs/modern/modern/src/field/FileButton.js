/**
 * @class Ext.field.FileButton
 * @extend Ext.Button
 * @xtype filebutton
 * @private
 */

/**
 * @event change
 * Fires when the value has changed.
 * @param {Ext.field.FileButton} this This FileButton
 * @param {String} newValue The new value
 * @param {String} oldValue The original value
 */

/**
 * @cfg {String} value
 * The value of the file button's input
 * @accessor
 */

/**
 * @cfg {Boolean} [multiple=false]
 * Allow selection of multiple files
 * @accessor
 */

/**
 * @cfg {String} accept
 * File input accept attribute documented here (http://www.w3schools.com/tags/att_input_accept.asp)
 * Also can be simple strings -- e.g. audio, video, image
 * @accessor
 */

/**
 * @cfg {String} capture
 * File input capture attribute. Accepts values such as "camera", "camcorder", "microphone"
 * @accessor
 */

/**
 * @method getFiles
 * Returns the field files.
 * @return {FileList} List of the files selected.
 */
