
        Ext.application({
          name: 'MyEWCApp',
          launch: function launch() {
            console.log('launch')
            //Ext.Viewport.add([me.A.ext]);
            var o = {
              xtype: 'button',
              text: 'the button',
              plugins: {viewport: true}
              //renderTo: document.getElementById('route'),
            }
            var button = Ext.create(o)
            }
        });



// Ext.onReady(function() {
//   var o = {
//     xtype: 'button',
//     text: 'the button',
//     renderTo: document.getElementById('route'),
//   }
//   var button = Ext.create(o)
// })


// me.A.o.plugins = {viewport: true}