/**
 * @class Ext.chart.series.sprite.Line
 * @extend Ext.chart.series.sprite.Aggregative
 * @alias sprite.lineseries
 *
 * Line series sprite.
 */

/**
 * @cfg {Boolean} [smooth=false]
 * `true` if the sprite uses line smoothing.
 * Line smoothing only works with gapless data.
 */

/**
 * @cfg {Boolean} [fillArea=false]
 * `true` if the sprite paints the area underneath the line.
 */

/**
 * @cfg {Boolean} [step=false]
 * `true` if the line uses steps instead of straight lines to connect the dots.
 * It is ignored if `smooth` is `true`.
 */

/**
 * @cfg {"gap"/"connect"/"origin"} [nullStyle="gap"]
 * Possible values:
 * 'gap' - null points are rendered as gaps.
 * 'connect' - non-null points are connected across null points, so that
 * there is no gap, unless null points are at the beginning/end of the line.
 * Only the visible data points are connected - if a visible data point
 * is followed by a series of null points that go off screen and eventually
 * terminate with a non-null point, the connection won't be made.
 * 'origin' - null data points are rendered at the origin,
 * which is the y-coordinate of a point where the x and y axes meet.
 * This requires that at least the x-coordinate of a point is a valid value.
 */

/**
 * @cfg {Boolean} [preciseStroke=true]
 * `true` if the line uses precise stroke.
 */

/**
 * @cfg {Number} [yCap=Math.pow(2, 20)]
 * Absolute maximum y-value.
 * Larger values will be capped to avoid rendering issues.
 */
