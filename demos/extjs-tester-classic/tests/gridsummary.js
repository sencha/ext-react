//function grid() {
  function renderSummaryName3 (value, context) {
    //console.log(value)
    //console.log(context)
    return context.records.length + ' Names';
  }


Ext.onReady(function() {
  var data = [
    { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
    { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
    { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
    { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
  ]

  var o = {
    xtype: 'grid',
    title: 'the grid title',
    height: 400,
    rowHeight: null,
    plugins: {gridsummaryrow: true},
    columns: [
      {xtype: 'gridcolumn', text: 'Name', dataIndex: 'name', summaryRenderer: renderSummaryName3}
    ],
    renderTo: document.getElementById('route'),
    items: [
      {
        xtype:'toolbar',
        docked: 'top',
        items: [
          {text: 'hi', handler: function() {
            console.log('hi')
            grid.setPlugins({gridsummaryrow: true})
          }}

        ]

      }
    ]
  }
  var grid = Ext.create(o)

    // Ext.application({
    //     name: 'MyApp',
    //     launch: function() {
    //         Ext.Viewport.add([container])
    //     }
    // });
  //container.add(grid)

  //var column01 = Ext.create({xtype: 'gridcolumn', text: 'Name', dataIndex: 'name', summaryRenderer: renderSummaryName3})



  //var column02 = Ext.create({xtype: 'gridcolumn', text: 'Email', dataIndex: 'email', width: 200})
  //var column03 = Ext.create({xtype: 'gridcolumn', text: 'Phone', dataIndex: 'phone', width: 200})

  grid.setData(data)

  grid.setPlugins({gridsummaryrow: true})


  //grid.insertColumn(0,column01)
  //grid.insertColumn(1,column02)
  //grid.insertColumn(2,column03)


})