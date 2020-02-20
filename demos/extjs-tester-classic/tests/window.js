
Ext.onReady(function() {


  var o = {
    xtype: 'window',
    title: 'Hello',
    autoShow: true,
    height: 200,
    width: 400,
    layout: 'fit',
    items: {  // Let's put an empty grid in just to illustrate fit layout
        xtype: 'grid',
        border: false,
        // One header just for show. There's no data
        columns: [{ header: 'World' }],
        store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
    }
}


  var window = Ext.create(o)
})