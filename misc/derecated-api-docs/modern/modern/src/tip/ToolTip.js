/**
 * @class Ext.tip.ToolTip
 * @extend Ext.Panel
 * @xtype tooltip
 *
 * This class provides extra contextual information for components/elements by
 * attaching to a {@link #target}. The tip will show based on mouseover (or touch, 
 * depending on the environment) and {@link #align} itself to the {@link #target}.
 *
 * Typically, tooltips will be created via {@link Ext.Component#tooltip components}, however
 * it is possible to create instances directly.
 *
 *     new Ext.tip.ToolTip({
 *         target: myComponent,
 *         html: 'Here is some help text about this!'
 *     });
 *
 * # Shared instance
 * New instances of tooltips do not need to be created for every item that requires
 * a tooltip. In most cases it is sufficient to use a single shared instance across 
 * the application, which provides a performance benefit. See {@link Ext.tip.Manager} 
 * for an explanation of how shared tips are used.
 *
 * # Delegation
 * 
 * It is common to want to show a tooltip for a repeated view and dynamically update
 * the content based on the current item within this view. This can be achieved using
 * the {@link #delegate} configuration. This means that the tip will only activate
 * when over an item inside the target that matches the {@link #delegate}. After this,
 * the {@link #currentTarget} can be interrogated to get contextual information about which
 * delegate item triggered the show.
 *
 *     var el = Ext.getBody().createChild({
 *         html: '<div data-num="1" class="item">Foo</div>' +
 *               '<div data-num="2" class="item">Bar</div>' +
 *               '<div data-num="3" class="item">Baz</div>' +
 *               '<div class="notip">No tip here</div>'
 *     });
 *
 *     new Ext.tip.ToolTip({
 *         target: el,
 *         delegate: '.item',
 *         listeners: {
 *             beforeshow: function(tip) {
 *                 var current = tip.currentTarget.dom;
 *                 tip.setHtml('Item #' + current.getAttribute('data-num'));
 *             }
 *         }
 *     });
 *
 * # Alignment
 *
 * The following configuration properties allow control over how the ToolTip is aligned relative to
 * the target element and/or mouse pointer:
 *
 * - {@link #anchor}
 * - {@link #anchorToTarget}
 * - {@link #trackMouse}
 * - {@link #mouseOffset}
 *
 * # Showing/Hiding
 *
 * The following configuration properties allow control over how and when the ToolTip is automatically
 * shown and hidden:
 *
 * - {@link #autoHide}
 * - {@link #showDelay}
 * - {@link #hideDelay}
 * - {@link #dismissDelay}
 * 
 * 
 * @since 6.2.0
 */

/**
 * @cfg {String} [align="l-r?"]
 * A string which specifies how this ToolTip is to align with regard to its
 * {@link #currentTarget} by means of identifying the point of the tooltip to
 * join to the point of the target.
 *
 * By default, the tooltip shows at {@link #mouseOffset} pixels from the
 * triggering pointer event. Using this config anchors the ToolTip to its target
 * instead.
 *
 * This may take the following forms:
 *
 * - **Blank**: Defaults to aligning the element's top-left corner to the target's
 *   bottom-left corner ("tl-bl").
 * - **Two anchors**: If two values from the table below are passed separated by a dash,
 *   the first value is used as the element's anchor point, and the second value is
 *   used as the target's anchor point.
 * - **Two edge/offset descriptors:** An edge/offset descriptor is an edge initial
 *   (`t`/`r`/`b`/`l`) followed by a percentage along that side. This describes a
 *   point to align with a similar point in the target. So `'t0-b0'` would be
 *   the same as `'tl-bl'`, `'l0-r50'` would place the top left corner of this item
 *   halfway down the right edge of the target item. This allows more flexibility
 *   and also describes which two edges are considered adjacent when positioning a tip pointer.
 *
 * In addition to the anchor points, the position parameter also supports the "?"
 * character. If "?" is passed at the end of the position string, the element will
 * attempt to align as specified, but the position will be adjusted to constrain to
 * the viewport if necessary. Note that the element being aligned might be swapped to
 * align to a different position than that specified in order to enforce the viewport
 * constraints. Following are all of the supported anchor positions:
 *
 *      Value  Description
 *      -----  -----------------------------
 *      tl     The top left corner
 *      t      The center of the top edge
 *      tr     The top right corner
 *      l      The center of the left edge
 *      c      The center
 *      r      The center of the right edge
 *      bl     The bottom left corner
 *      b      The center of the bottom edge
 *      br     The bottom right corner
 *
 * Example Usage:
 *
 *     // align the top left corner of the tooltip with the top right corner of its target
 *     // (constrained to viewport).
 *     align: 'tl-tr?'
 *
 *     // align the bottom right corner of the tooltip with the center left edge of its target.
 *     align: 'br-l?'
 *
 *     // align the top center of the tooltip with the bottom left corner of its target.
 *     align: 't-bl'
 *
 *     // align the 25% point on the bottom edge of this tooltip
 *     // with the 75% point on the top edge of its target.
 *     align: 'b25-c75'
 *
 * @accessor
 */

/**
 * @cfg {String} [alignDelegate]
 * A selector which identifies child elements of the  {@link #currentTarget} to
 * align to upon show.
 * @accessor
 */

/**
 * @cfg {Boolean} [allowOver=false]
 * Set to `true` to allow mouse exiting the target, but moving into the ToolTip to
 * keep the ToolTip visible. This may be useful for interactive tips.
 *
 * While the mouse is over the tip, the {@link dismissDelay dismiss timer} is
 * inactive, so the tip will not {@link #autoHide}.
 *
 * On touch platforms, a touch on the tooltip is the equivalent, and this cancels
 * the dismiss timer so that a tap outside is then necessary to hide the tip.
 *
 * This is incompatible with the {@link #cfg-trackMouse} config.
 * @accessor
 */

/**
 * @cfg {Boolean} [anchorToTarget=true]
 * By default, the {@link #align} config aligns to the {@link #target}.
 *
 * Configure this as `false` if an anchor is required, but positioning is still
 * relative to the pointer position on show.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoHide=true]
 * True to automatically hide the tooltip after the mouse exits the target element
 * or after the `{@link #dismissDelay}` has expired if set.
 *
 * If `{@link #closable} = true` a close tool button will be rendered into the
 * tooltip header.
 * @accessor
 */

/**
 * @cfg {String} [delegate]
 * A selector which identifies child elements of the target which trigger showing
 * this ToolTip. The {@link #currentTarget} property is set to the triggering
 * element.
 * @accessor
 */

/**
 * @cfg {Number} [dismissDelay=5000]
 * Delay in milliseconds before the tooltip automatically hides.
 *
 * Set this value to `0` to disable automatic hiding.
 * @accessor
 */

/**
 * @cfg {Number} [hideDelay=300]
 * Delay in milliseconds after the mouse exits the target element but before the
 * tooltip actually hides.
 *
 * Set to `0` for the tooltip to hide immediately.
 * @accessor
 */

/**
 * @cfg {Number[]} [mouseOffset=[15,18]]
 * An XY offset from the triggering pointer event position where the tooltip
 * should be shown unless aligned to the target element.
 * @accessor
 */

/**
 * @cfg {Number} [quickShowInterval=250]
 * If a show is triggered within this number of milliseconds of this ToolTip being
 * hidden, it shows immediately regardless of the delay. If rapidly moving from
 * target to target, this ensure that each separate target does not get its own
 * delay.
 * @accessor
 */

/**
 * @cfg {Number} [showDelay=500]
 * Delay in milliseconds before the tooltip displays after the mouse enters the
 * target element.
 *
 * On touch platforms, if {@link #showOnTap} is `true`, a tap on the target shows
 * the tip, and this timer is ignored - the tip is shown immediately.
 * @accessor
 */

/**
 * @cfg {Boolean/String[]} [showOnTap=false]
 * `true` to show this tip on a tap event on the target. If specified as a string,
 * it should be the {@link Ext.event.Event#pointerType} of the event that should
 * trigger a show. Typically, this will be `touch`.
 *
 * This is useful for adding tips on elements which do not have tap listeners. It
 * would not be appropriate for a ToolTip on a {@link Ext.Button Button}.
 * @accessor
 */

/**
 * @cfg {Ext.Component/Ext.dom.Element} target
 * The target that should trigger showing this ToolTip.
 * @accessor
 */

/**
 * @cfg {Boolean} [trackMouse=false]
 * True to have the tooltip follow the mouse as it moves over the target element.
 *
 * Only effective on platforms with pointing devices, this does not address touch
 * events.
 * @accessor
 */
