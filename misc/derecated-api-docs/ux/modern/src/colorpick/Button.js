/**
 * A simple color swatch that can be clicked to bring up the color selector.
 *
 * The selected color is configurable via {@link #value} and
 * The Format is configurable via {@link #format}.
 *
 *     @example packages=[ext-react]
 *     <ColorButton
 *         onChange={(picker, color, previousColor) => {
 *             Ext.Msg.alert('Color', color);
 *         }}
 *         format="hex6" // default is hex6, possible values: hex6, rgb, rgba
 *         value="00f" // initial color
 *     />
 */

/**
 * @cfg {Object} popup
 * This object configures the popup window and colorselector component displayed
 * when this button is clicked. Applications should not need to configure this.
 * @private
 */

/**
 * @event change
 * Fires when a color is selected.
 * @param {Ext.ux.colorpick.Selector} this
 * @param {String} color The value of the selected color as per specified {@link #format}.
 * @param {String} previousColor The previous color value.
 */
