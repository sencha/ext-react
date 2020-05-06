  //renderTo: document.getElementById('route'),


Ext.onReady(function() {
  console.log('onReady')
  const small = "width < 500";
  const medium = "width > 500";

var p = {
  xtype: 'panel',
  title: 'hi',
  layout: 'fit',
  plugins: {
    viewport: true
  },
  items: [
    {
      xtype: 'form',

      layout: {
        type: 'hbox'
    },

    responsiveConfig: {
        'width < 800': {
            layout: {
                vertical: true
            }
        },
        'width >= 800': {
            layout: {
                vertical: false
            }
        }
    },



      // responsiveConfig: {
      //   "width < 500": {
      //     layout : 'vbox'
      //   },
      //   "width >= 500": {
      //     layout : 'hbox'
      //   }
      // },



      // responsiveConfig: {
      //   [small]: {
      //     layout : 'vbox'
      //   },
      //   [medium]: {
      //     layout : 'hbox'
      //   }
      // },
      items: [
        { xtype: 'textfield', fieldLabel: 'Name'},
        { xtype: 'textfield', fieldLabel: 'Email'}
      ]
    }
  ]
}

var panel = Ext.create(p)

  // var o = {
  //   xtype: 'form',
  //   responsiveConfig: {
  //     [small]: {
  //       layout : 'vbox'
  //     },
  //     [medium]: {
  //       layout : 'hbox'
  //     }
  //   },
  //   items: [
  //     { xtype: 'textfield', fieldLabel: 'Name'},
  //     { xtype: 'textfield', fieldLabel: 'Email'}
  //   ]
  // }

  // panel.add(o)




  //var form = Ext.create(o)
})