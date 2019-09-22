Ext.onReady(function() {

store = new Ext.data.Store({
    fields: ['time', 'd1', 'd2', 'd3', 'd4' ],
    data: [
        { time: new Date('2/25/2018'), d1: 14, d2: 19, d3: 10 },
        { time: new Date('3/4/2018'), d1: 16, d2: 7, d3: 11, d4:10 },
        { time: new Date('3/11/2018'), d1: 11, d2: 25, d3: 10 },
        { time: new Date('3/18/2018'), d1: 6, d2: 4, d3: 11 },
        { time: new Date('3/25/2018'), d1: 36, d2: 12, d3: 10 }
    ]
});

var props = {
    xtype: 'cartesian'
}
var cmp = Ext.create(props);
console.dir(props)
console.dir(cmp)

console.log('Ext.application')
Ext.application({
    name: 'MyEWCApp',
    launch: function () {
        console.log('Ext.Viewport.add(' + cmp.xtype + ')')
        console.dir(cmp)
        Ext.Viewport.add([cmp])
    }
});

cmp.setStore(store);
cmp.setInteractions(['rotate'])
cmp.setAxes(
[{
        type: 'numeric',
        position: 'left',
        fields: ['d1'],
        title: {
            text: 'Sample Values',
            fontSize: 15
        },
        grid: true,
        minimum: 0
     }, {
        type: 'time',
        position: 'bottom',
        fields: ['time'],
        dateFormat: 'j-M-y',
        label: { rotate: { degrees: 60 } },
        title: {
            text: 'Date',
            fontSize: 15
        }
}]
)
    cmp.setSeries(
        [{
            type: 'line',
            style: {
                stroke: '#30BDA7',
                lineWidth: 2
            },
            xField: 'time',
            yField: 'd1',
            marker: {
                type: 'circle',
                radius: 4,
                //scale: 1.2,
                lineWidth: 2,
                fill: 'white'
            }
         }, {
            type: 'area',
            fill: true,
            style: {
                fillOpacity: .6,
            },
            xField: 'time',
            yField: ['d2', 'd3' ],
            marker: {
                type: 'circle',
                radius: 4,
                lineWidth: 2,
                fill: 'white'
            },
            //renderer: this.onSeriesRenderer,
            //tooltip: { trackMouse:true, renderer: this.onTooltipRenderer }
        }]

    )



        // console.log('Ext.create(' + cmp.xtype + ')')
        // console.dir(props)
        // console.dir(cmp)
        return;

        var props = {
            xtype: 'cartesian',
            store: store,
            title: 'cartesian',
            listeners: {},
            interactions:['rotate'],
            axes:[{
               type: 'numeric',
               position: 'left',
               fields: ['d1'],
               title: {
                   text: 'Sample Values',
                   fontSize: 15
               },
               grid: true,
               minimum: 0
            }, {
               type: 'time',
               position: 'bottom',
               fields: ['time'],
               dateFormat: 'j-M-y',
               label: { rotate: { degrees: 60 } },
               title: {
                   text: 'Date',
                   fontSize: 15
               }
           }],
           series:[{
               type: 'line',
               style: {
                   stroke: '#30BDA7',
                   lineWidth: 2
               },
               xField: 'time',
               yField: 'd1',
               marker: {
                   type: 'circle',
                   radius: 4,
                   //scale: 1.2,
                   lineWidth: 2,
                   fill: 'white'
               }
            }, {
               type: 'area',
               fill: true,
               style: {
                   fillOpacity: .6,
               },
               xField: 'time',
               yField: ['d2', 'd3' ],
               marker: {
                   type: 'circle',
                   radius: 4,
                   lineWidth: 2,
                   fill: 'white'
               },
               //renderer: this.onSeriesRenderer,
               //tooltip: { trackMouse:true, renderer: this.onTooltipRenderer }
           }]
        };
        var cmp = Ext.create(props)
        console.log('Ext.create(' + cmp.xtype + ')')
        console.dir(props)
        console.dir(cmp)
        console.log('Ext.application')

        Ext.application({
            name: 'MyEWCApp',
            launch: function () {
                console.log('Ext.Viewport.add(' + cmp.xtype + ')')
                console.dir(cmp)
                Ext.Viewport.add([cmp])
            }
        });

    //     <Cartesian
    //     store={this.store}
    //     interactions={['rotate']}
    //     axes={[{
    //        type: 'numeric',
    //        position: 'left',
    //        fields: ['d1'],
    //        title: {
    //            text: 'Sample Values',
    //            fontSize: 15
    //        },
    //        grid: true,
    //        minimum: 0
    //     }, {
    //        type: 'time',
    //        position: 'bottom',
    //        fields: ['time'],
    //        dateFormat: 'j-M-y',
    //        label: { rotate: { degrees: 60 } },
    //        title: {
    //            text: 'Date',
    //            fontSize: 15
    //        }
    //    }]}
    //    series={[{
    //        type: 'line',
    //        style: {
    //            stroke: '#30BDA7',
    //            lineWidth: 2
    //        },
    //        xField: 'time',
    //        yField: 'd1',
    //        marker: {
    //            type: 'circle',
    //            radius: 4,
    //            //scale: 1.2,
    //            lineWidth: 2,
    //            fill: 'white'
    //        }
    //     }, {
    //        type: 'area',
    //        fill: true,
    //        style: {
    //            fillOpacity: .6,
    //        },
    //        xField: 'time',
    //        yField: ['d2', 'd3' ],
    //        marker: {
    //            type: 'circle',
    //            radius: 4,
    //            lineWidth: 2,
    //            fill: 'white'
    //        },
    //        renderer: this.onSeriesRenderer,
    //        //tooltip: { trackMouse:true, renderer: this.onTooltipRenderer }
    //    }]}
    // />



        // console.log('Ext.application')
        // Ext.application({
        //     name: 'MyEWCApp',
        //     launch: function () {
        //         console.log('Ext.Viewport.add(' + cmp.xtype + ')')
        //         console.dir(cmp)
        //         Ext.Viewport.add([cmp])
        //     }
        // });
        return



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
