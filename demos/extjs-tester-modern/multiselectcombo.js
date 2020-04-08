Ext.onReady(function() {

  var ocontainer = {
    xtype: 'container',
    renderTo: document.getElementById('route')
  }
  var container = Ext.create(ocontainer)

  var oformpanel = {
    xtype: 'formpanel',
    shadow: true
  }
  var formpanel = Ext.create(oformpanel)

  container.add(formpanel)

  store = Ext.create('Ext.data.Store', {
    fields: ['name', 'abbrev'],
    data: [
          {"name":"Alabama","abbr":"AL"},
          {"name":"Alaska","abbr":"AK"},
          {"name":"Arizona","abbr":"AZ"}
     ]
  })

  var ocomboboxfield = {
    xtype: 'comboboxfield',
    multiSelect: true,
    label: "State",
    store: store,
    displayField: "name",
    valueField: "abbr",
    queryMode: "local",
    labelAlign: "placeholder",
    clearable: true,
    editable: false,
    width: 400,
    forceSelection: true
  }

  var comboboxfield = Ext.create(ocomboboxfield)
  formpanel.add(comboboxfield)

})