/**
 * @class Ext.d3.canvas.HiDPI
 * @extend Ext.Base
 *
 * @singleton
 * This singleton applies overrides to the '2d' context of the HTML5 Canvas element
 * to make it resolution independent.
 *
 * Methods [M] and properties [P] that don't correspond to a number of pixels
 * (or do, but aren't meant to be resolution independent) and don't need to be overriden:
 * - [M] save
 * - [M] restore
 * - [M] scale
 * - [M] rotate
 * - [M] beginPath
 * - [M] closePath
 * - [M] clip
 * - [M] createImageData
 * - [M] getImageData
 * - [M] drawFocusIfNeeded
 * - [M] createPattern
 *
 * - [P] shadowBlur
 * - [P] shadowColor
 * - [P] textAlign
 * - [P] textBaseline
 * - [P] fillStyle
 * - [P] strokeStyle
 * - [P] lineCap
 * - [P] globalAlpha
 * - [P] globalCompositeOperation
 *
 * `fill` and `stroke` methods still have to be overriden, because we cannot
 * override context properties (that do correspond to a number of pixels).
 * But because context properties are not used until a fill or stroke operation
 * is performed, we can postpone scaling them, and do it when `fill` and `stroke`
 * methods are called.
 */

