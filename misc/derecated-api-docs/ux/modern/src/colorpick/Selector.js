/**
 * Sencha Pro Services presents xtype "colorselector".
 * API has been kept as close to the regular colorpicker as possible. The Selector can be
 * rendered to any container.
 *
 * The default selected color is configurable via {@link #value} prop
 * and The Format is configurable via {@link #format}. Usually used in
 * forms via {@link Ext.ux.colorpick.Button} or {@link Ext.ux.colorpick.Field}.
 *
 *     @example packages=[ext-react]
 *     <ColorSelector
 *         onChange={(picker, color, previousColor) => {
 *             Ext.Msg.alert('Color', color);
 *         }}
 *         format="hex6" // default is hex6, possible values: hex6, rgb, rgba
 *         value="00f" // initial color
 *     />
 */

/**
 * default width and height gives 255x255 color map in Crisp
 */

/**
 * @cfg fieldWidth {Number} Width of the text fields on the container (excluding HEX);
 * since the width of the slider containers is the same as the text field under it
 * (it's the same vbox column), changing this value will also affect the spacing between
 * the sliders.
 */

/**
 * @cfg fieldPad {Number} padding between the sliders and HEX/R/G/B fields.
 */

/**
 * @cfg {Boolean} [showPreviousColor]
 * Whether "previous color" region (in upper right, below the selected color preview) should 
 * be shown;
 * these are relied upon by the {@link Ext.ux.colorpick.Button} and the 
 * {@link Ext.ux.colorpick.Field}.
 */

/**
 * @cfg {String} [okButtonText]
 * Text value for "Ok" button;
 * these are relied upon by the {@link Ext.ux.colorpick.Button} and the 
 * {@link Ext.ux.colorpick.Field}.
 */

/**
 * @cfg {String} [cancelButtonText]
 * Text value for "Cancel" button;
 * these are relied upon by the {@link Ext.ux.colorpick.Button} and the 
 * {@link Ext.ux.colorpick.Field}.
 */

/**
 * @cfg {Boolean} [showOkCancelButtons]
 * Whether Ok and Cancel buttons (in upper right, below the selected color preview) should 
 * be shown;
 * these are relied upon by the {@link Ext.ux.colorpick.Button} and the 
 * {@link Ext.ux.colorpick.Field}.
 */

/**
 * @event change
 * Fires when a color is selected. Simply dragging sliders around will trigger this.
 * @param {Ext.ux.colorpick.Selector} this
 * @param {String} color The value of the selected color as per specified {@link #format}.
 * @param {String} previousColor The previous color value.
 */

/**
 * @event ok
 * Fires when OK button is clicked (see {@link #showOkCancelButtons}).
 * @param {Ext.ux.colorpick.Selector} this
 * @param {String} color The value of the selected color as per specified {@link #format}.
 */

/**
 * @event cancel
 * Fires when Cancel button is clicked (see {@link #showOkCancelButtons}).
 * @param {Ext.ux.colorpick.Selector} this
 */
