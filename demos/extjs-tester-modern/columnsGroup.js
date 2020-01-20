//function columns() {

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
                console.dir(grid)
                Ext.Viewport.add([grid])
            }
        });

        var columnGroupProps = {xtype: 'column', text: 'group',listeners: {}}
        var columnGroup = Ext.create(columnGroupProps)
        console.log('Ext.create(' + columnGroup.xtype + ') ' + columnGroup.initialConfig.text)
        console.dir(columnGroupProps)
        console.dir(columnGroup)

        var data = [
            { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
            { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
            { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
            { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
        ]
        grid.setData(data)
        console.log('setData')
        console.dir(data)

        grid.insertColumn(0,columnGroup)
        console.log('grid.insertColumn(0, column)' + ' ' + columnGroup.initialConfig.text)

        var columnChildProps =  {xtype: 'column', text: 'name', dataIndex: 'name',listeners: {}}
        var columnChild = Ext.create(columnChildProps)
        console.log('Ext.create(' + columnChild.xtype + ') ' + columnChild.initialConfig.text)
        console.dir(columnChildProps)
        console.dir(columnChild)

        columnGroup.add(columnChild)
        console.log('column.add(column)' + ' ' + columnGroup.initialConfig.text + ', ' + columnChild.initialConfig.text)

        var columnChild2Props =  {xtype: 'column', text: 'name', dataIndex: 'name',listeners: {}}
        var columnChild2 = Ext.create(columnChild2Props)
        console.log('Ext.create(' + columnChild2.xtype + ') ' + columnChild2.initialConfig.text)
        console.dir(columnChild2Props)
        console.dir(columnChild2)

        columnGroup.add(columnChild2)
        console.log('column.add(column)' + ' ' + columnGroup.initialConfig.text + ', ' + columnChild2.initialConfig.text)



    })
//}