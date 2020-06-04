//function grid() {
Ext.onReady(function() {
  function getStates() {
    let states =  new Ext.data.Store ({
      proxy: {
          type: 'ajax',
          url: "states.json",
          reader: {
              type: 'json',
              rootProperty: 'states'
          },
          noCache: false
      },
    })
    return states;
  }
  var o = {
    xtype: 'comboboxfield',
    label:"States",
    displayField:"name",
    valueField:"abbreviation",
    placeholder:"...",
    store:getStates(),
    id:"cboTest",
    queryMode:"remote",
    queryParam:'filter',
    allQuery:"",
    triggerAction:"all",
    forceSelection:true,
    remoteFilter:true,
    renderTo: document.getElementById('route')
  }
  var combobox = Ext.create(o)
})