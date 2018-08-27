/**
 * By overriding the `addNodes` and `updateNodes` of the stock tree component
 * we are turning it into an org chart.
 */
Ext.define('Ext.react.Orgchart', {
    extend: 'Ext.d3.hierarchy.tree.HorizontalTree',
    xtype: 'orgchart',
    config: {
        imageField: 'url',
        imagePath: ''
    },

    /**
     * First, we create a `clipPath` element that will act as a clip mask
     * for employee images, where the clip shape is a circle.
     */
    setupScene: function () {
        this.superclass.setupScene.apply(this, arguments);

        this.getDefs().append('clipPath')
            .attr('id', 'node-clip')
            .append('circle')
            .attr('r', 45);
    },

    /**
     * Then we override the `addNodes` method that is given a selection
     * of all entering nodes (see https://bost.ocks.org/mike/selection/
     * for more info). Our method populates this selection with `image`
     * elements (instead of the `circle` and `text` elements) and sets
     * their `href` attributes to the value of the `imageField` (a custom
     * config we defined) field of a tree store record, as well as setting
     * the `clip-path` attribute to the `id` of the clip path we defined
     * in the `setupScene` method.
     */
    addNodes: function (selection) {
        var imagePath = this.getImagePath(),
            imageField = this.getImageField();

        selection
            .attr('opacity', 0)
            .append('image')
            .attr('xlink:href', function (node) {
                return imagePath + node.data.get(imageField);
            })
            .attr('x', '-45px')
            .attr('y', '-45px')
            .attr('width', '90px')
            .attr('height', '90px')
            .attr('clip-path', 'url(#node-clip)');
    },

    /**
     * Finally, the `updateNodes` method sets the position of all new and changed
     * nodes in the tree by calling the `nodeTransform` function on the selection
     * of said nodes.
     */
    updateNodes: function (update, enter) {
        var me = this,
            nodeTransform = me.getNodeTransform(),
            selection = update.merge(enter);

        selection
            .transition(me.layoutTransition)
            .attr('opacity', 1)
            .call(nodeTransform);
    }
});
