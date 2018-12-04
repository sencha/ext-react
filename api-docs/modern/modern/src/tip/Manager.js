/**
 * @class Ext.tip.Manager
 * @extend Ext.Base
 * This class monitors DOM elements that have attributes encoded
 * to show a tooltip. A single {@link Ext.tip.ToolTip} instance is reused
 * and reconfigured with the attributes retrieved from the DOM.
 *
 * Typically, this class will not be created directly, but rather configured
 * via the application with the {@link Ext.app.Application#quickTips} config to
 * enable this globally.
 *
 * # Configuring via Ext.Component
 *
 * A configuration given to a {@link Ext.Component#tooltip tooltip} config will
 * be registered with this manager and shared tips will be displayed when that
 * component is activated. See {@link Ext.Component#tooltip tooltip} for details.
 *
 * # Configuring via HTML attributes
 *
 * A tip may also be configured by adding data attributes to DOM elements. The
 * following attribute names are supported and map to configurations on the 
 * {@link Ext.tip.ToolTip} class. The following are supported:
 * - `data-qtip`: {@link Ext.tip.ToolTip#html}
 * - `data-qwidth`: {@link Ext.tip.ToolTip#width}
 * - `data-qminWidth`: {@link Ext.tip.ToolTip#minWidth}
 * - `data-qmaxWidth`: {@link Ext.tip.ToolTip#maxWidth}
 * - `data-qtitle`: {@link Ext.tip.ToolTip#title}
 * - `data-qautoHide`: {@link Ext.tip.ToolTip#autoHide}
 * - `data-qcls`: {@link Ext.tip.ToolTip#cls}
 * - `data-qalign`: {@link Ext.tip.ToolTip#align}
 * - `data-qanchor`: {@link Ext.tip.ToolTip#anchor}
 * - `data-qanchorToTarget`: {@link Ext.tip.ToolTip#anchorToTarget}
 * - `data-qshowDelay`: {@link Ext.tip.ToolTip#showDelay}
 * - `data-qhideDelay`: {@link Ext.tip.ToolTip#hideDelay}
 * - `data-qdismissDelay`: {@link Ext.tip.ToolTip#dismissDelay}
 * - `data-qtrackMouse`: {@link Ext.tip.ToolTip#trackMouse}
 *
 * Example usage:
 *
 *     <div class="foo" data-qtip="Message goes here">Hover me</div>
 */

/**
 * @cfg {Boolean} [interceptTitles=false]
 * Set to `true` to automatically use an element's DOM `title` attribute if one is
 * available.
 */

