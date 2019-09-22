//function columns() {
    var grouped = true;
    console.log('grouped: ' + grouped)
    Ext.onReady(function() {
        var gridProps = {xtype: 'grid', title: 'the grid', listeners: {}};
        var grid = Ext.create(gridProps)
        console.log('Ext.create(' + grid.xtype + ')')
        console.dir(gridProps)
        console.dir(grid)

        console.log('Ext.application')
        Ext.application({
            name: 'MyEWCApp',
            launch: function () {
                console.log('Ext.Viewport.add(' + grid.xtype + ')')
                Ext.Viewport.add([grid])
            }
        });

        if (grouped != true) {
            var columnRootProps =  {xtype: 'column', text: 'name', dataIndex: 'name',listeners: {}}
            var columnRoot = Ext.create(columnRootProps)
            console.log('Ext.create(' + columnRoot.xtype + ')')
            console.dir(columnRootProps)
            console.dir(columnRoot)
        }

        if (grouped == true) {
            var columnGroupProps = {xtype: 'column', text: 'group',listeners: {}}
            var columnGroup = Ext.create(columnGroupProps)
            console.log('Ext.create(' + columnGroup.xtype + ')')
            console.dir(columnGroupProps)
            console.dir(columnGroup)
        }

        var data = [
            { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
            { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
            { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
            { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
        ]
        grid.setData(data)
        console.log('setData')
        console.dir(data)

        if (grouped != true) {
            grid.insertColumn(0,columnRoot)
            console.log('grid.insertColumn(0, column)')
        }

        if (grouped == true) {
            grid.insertColumn(0,columnGroup)
            console.log('grid.insertColumn(0, column)')
        }

        if (grouped == true) {
            var columnChildProps =  {xtype: 'column', text: 'name', dataIndex: 'name',listeners: {}}
            var columnChild = Ext.create(columnChildProps)
            console.log('Ext.create(' + columnChild.xtype + ')')
            console.dir(columnChildProps)
            console.dir(columnChild)
        }

        if (grouped == true) {
            columnGroup.add(columnChild)
            console.log('column.add(column)')
        }

    })
//}