export default Ext.define(null, {
    extend: 'Ext.d3.legend.Color',

    renderItems: function (items) {
        var me = this,
            ticks = [200,100,40,20,10,6,2],
            selection = me.getRenderedItems().data(ticks);

        me.onAddItems(selection.enter());
        me.onUpdateItems(selection);
        me.onRemoveItems(selection.exit());
    }
});