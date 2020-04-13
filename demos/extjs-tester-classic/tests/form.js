Ext.onReady(function() {
  const small = "width > 100";
  const medium = "width > 500";
  var o = {
    xtype: 'form',
    renderTo: document.getElementById('route'),
    width: "400px",
    height: "400px",
    responsiveConfig: {
      [small]: {
        layout : 'hbox'
      },
      [medium]: {
        layout : 'vbox'
      }
    },
    items: [
      { xtype: 'textfield', fieldLabel: 'Name'},
      { xtype: 'textfield', fieldLabel: 'Email'}
    ]
  }
  var form = Ext.create(o)
})