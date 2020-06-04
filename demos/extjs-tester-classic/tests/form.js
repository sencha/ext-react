Ext.onReady(function() {
  console.log('onReady')
  const small = "width < 500";
  const medium = "width > 500";
  var o = {
    xtype: 'form',
    renderTo: document.getElementById('route'),
    responsiveConfig: {
      [small]: {
        layout : 'vbox'
      },
      [medium]: {
        layout : 'hbox'
      }
    },
    items: [
      { xtype: 'textfield', fieldLabel: 'Name'},
      { xtype: 'textfield', fieldLabel: 'Email'}
    ]
  }
  var form = Ext.create(o)
})