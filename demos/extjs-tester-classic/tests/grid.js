
Ext.onReady(function() {

  var data = [
    { name: 'Marc', v: true, email: 'marc@gmail.com',priceChangePct: .25 },
    { name: 'Nick', v: true, email: 'nick@gmail.com',priceChangePct: .35 },
    { name: 'Andy', v: true, email: 'andy@gmail.com',priceChangePct: 1.45 }
  ];
  var store = { xtype: 'store', data: data }

  function onRowDblClick() {
    console.log('onRowDblClick')
  }

  onOpenWindow = (view, rowIndex, colIndex, item, e, record) => {
    console.log('onOpenWindow')
//    this.setState({currentRecord: record.getData()});
  };

  renderSign = (value, context) => {
    let iValue = parseInt(value);
    let color = 'red';

    console.count(`Method renderSign has been called ${value}`);

    if (iValue > 0) { color = 'green'; }
    return `<span style="color:${color};">${value}<i class="fa fa-camera-retro fa-lg"></i></span>`
  };

  var o = {
    xtype: 'grid',
    renderTo: document.getElementById('route'),

  title:"The Grid",
  region:'center',
  store:store,
  //plugins:{'gridfilters'},
  listeners: {
  onRowdblclick:onRowDblClick,
  },
  viewConfig:{
    markDirty: false,
    enableTextSelection: true,
    emptyText: 'No records to display'
  },
  columns: [
    {text: "name", dataIndex: "name"},
    {text: "email", dataIndex: "email", width: 200},
    //{text: "Email 2", dataIndex: "email", width: 200},
    {
      xtype: 'actioncolumn',
      menuDisabled: true,
      width: 40,
      iconCls: 'x-fa fa-envelope',
      handler: onOpenWindow
    },
    {text: "% Change", dataIndex: "priceChangePct", align: "right", producesHTML: false, renderer: renderSign}
  ]
  }

console.log(o)

  var grid = Ext.create(o)
})