/**
 * @class Ext.chart.sprite.BoxPlot
 * @extend Ext.draw.sprite.Sprite
 * @alias sprite.boxplot
 *
 * A sprite that represents an individual box with whiskers.
 * This sprite is meant to be managed by the {@link Ext.chart.series.sprite.BoxPlot}
 * {@link Ext.chart.MarkerHolder MarkerHolder}, but can also be used independently.
 *
 * IMPORTANT: the attributes that represent y-coordinates are in screen coordinates,
 * just like with any other sprite. For this particular sprite this means that, if 'low'
 * and 'high' attributes are 10 and 90, then the minimium whisker is rendered at the top
 * of a draw container {@link Ext.draw.Surface surface} at y = 10, and the maximum whisker
 * is rendered at the bottom at y = 90. But because the series surface is flipped vertically
 * in cartesian charts, this means that there minimum is rendered at the bottom and maximum
 * at the top, just as one would expect.
 */

/**
 * @cfg {Number} [x=0]
 * The coordinate of the horizontal center of a boxplot.
 */

/**
 * @cfg {Number} [low=-20]
 * The y-coordinate of the whisker that represents the minimum.
 */

/**
 * @cfg {Number} [q1=-10]
 * The y-coordinate of the box edge that represents the 1-st quartile.
 */

/**
 * @cfg {Number} [median=0]
 * The y-coordinate of the line that represents the median.
 */

/**
 * @cfg {Number} [q3=10]
 * The y-coordinate of the box edge that represents the 3-rd quartile.
 */

/**
 * @cfg {Number} [high=20]
 * The y-coordinate of the whisker that represents the maximum.
 */

/**
 * @cfg {Number} [boxWidth=12]
 * The width of the box in pixels.
 */

/**
 * @cfg {Number} [whiskerWidth=0.5]
 * The length of the lines at the ends of the whiskers, as a ratio of `boxWidth`.
 */

/**
 * @cfg {Boolean} [crisp=true]
 * Whether to snap the rendered lines to the pixel grid of not.
 * Generally, it's best to have this set to `true` (which is the default) fox pixel perfect
 * results (especially on non-HiDPI displays), but for boxplots with small `boxWidth`
 * visible artifacts caused by pixel grid snapping may become noticeable, and setting this
 * to `false` can be a remedy at the expense of clarity.
 */
