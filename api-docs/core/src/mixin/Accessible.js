/**
 * @class Ext.mixin.Accessible
 * @extend Ext.Mixin
 *
 * This mixin defines certain config options, properties, and APIs to be used
 * by Components that implement accessible traits according to WAI-ARIA 1.0 specification.
 *
 * @private
 */

/**
 * @cfg {String} [ariaLabel] ARIA label for this Component. It is best to use
 * {@link #ariaLabelledBy} option instead, because screen readers prefer
 * `aria-labelledby` attribute to `aria-label`. {@link #ariaLabel} and
 * {@link #ariaLabelledBy} config options are mutually exclusive.
 */

/**
 * @cfg {String} [ariaLabelledBy] DOM selector for a child element that is to be used
 * as label for this Component, set in `aria-labelledby` attribute.
 * If the selector is by `#id`, the label element can be any existing element,
 * not necessarily a child of the main Component element.
 *
 * {@link #ariaLabelledBy} and {@link #ariaLabel} config options are
 * mutually exclusive, and `ariaLabelledBy` has the higher precedence.
 */

/**
 * @cfg {String} [ariaDescribedBy] DOM selector for a child element that is to be used
 * as description for this Component, set in `aria-describedby` attribute.
 * The selector works the same way as {@link #ariaLabelledBy}.
 */
    
/**
 * @cfg {Object} ariaAttributes
 * An object containing ARIA attributes to be set
 * on this Component's ARIA element. Use this to set the attributes that cannot be
 * determined by the Component's state, such as `aria-live`, `aria-flowto`, etc.
 *
 * **Note** that this config is only meaningful at the Component rendering time,
 * and setting it after that will do nothing.
 * @accessor
 */
