/**
 * @class Ext.dom.Shim
 * @extend Ext.dom.Underlay
 * Simple class that provides an iframe shim for any absolutely positioned {@link
 * Ext.dom.Element Element} to prevent windowed objects from showing through.
 * 
 * Not meant to be used directly. Internally shims are applied to Elements using
 * {@link Ext.dom.Element#enableShim enableShim}.  Developers should use the
 * {@link Ext.util.Floating#shim shim} config to add shims to their
 * {@link Ext.Component Components} or set {@link Ext#useShims Ext.useShims}=true.
 * @private
 */
