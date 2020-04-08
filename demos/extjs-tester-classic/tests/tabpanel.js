
Ext.onReady(function() {
  var oTabpanel = {
    xtype: 'tabpanel',
    shadow: true,
    defaults:{
        cls: "card",
        layout: "center"
    },
    renderTo: document.getElementById('route'),
  }
  var tabpanel = Ext.create(oTabpanel)

  var oContainer1 = {
    xtype: 'container',
    title: 'container1'
  }
  var container1 = Ext.create(oContainer1)

  tabpanel.add(container1)

  var oContainer2 = {
    xtype: 'container',
    title: 'container2'
  }
  var container2 = Ext.create(oContainer2)

  tabpanel.add(container2)

  tabpanel.setActiveTab(0)





})