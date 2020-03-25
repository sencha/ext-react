Ext.onReady(function() {

  function Renderer(v) {
    return v + ' more'
  }


  var data = [
    { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
    { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
    { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
    { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
  ]

  var o = {
    xtype: 'grid',
    title: 'the grid title',
    columns: [
      {xtype: 'gridcolumn', text: 'Name', dataIndex: 'name', renderer: Renderer}
    ],
    store:{
      xtype: 'store',
      proxy: { type: 'memory' },
      data
    },
    renderTo: document.getElementById('route')
  }
  var grid = Ext.create(o)


  setTimeout(function(){
    alert("Hello");
    grid.setColumns([
      {xtype: 'gridcolumn', text: 'Email', dataIndex: 'email', width: 200},
      {xtype: 'gridcolumn', text: 'Phone', dataIndex: 'phone', width: 200}
    ])
  }, 3000);




  // var column01 = Ext.create({xtype: 'gridcolumn', text: 'Name', dataIndex: 'name'})
  // var column02 = Ext.create({xtype: 'gridcolumn', text: 'Email', dataIndex: 'email', width: 200})
  // var column03 = Ext.create({xtype: 'gridcolumn', text: 'Phone', dataIndex: 'phone', width: 200})

  // grid.setData(data)
  // grid.insertColumn(0,column01)
  //grid.insertColumn(1,column02)
  //grid.insertColumn(2,column03)


})