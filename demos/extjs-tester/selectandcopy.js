function createStore() {
  return Ext.create('Ext.data.Store', {
      fields: [
          { name: 'year', type: 'int' },
          { name: 'jan', type: 'int', allowNull: true },
          { name: 'feb', type: 'int', allowNull: true },
          { name: 'mar', type: 'int', allowNull: true },
          { name: 'apr', type: 'int', allowNull: true },
          { name: 'may', type: 'int', allowNull: true },
          { name: 'jun', type: 'int', allowNull: true },
          { name: 'jul', type: 'int', allowNull: true },
          { name: 'aug', type: 'int', allowNull: true },
          { name: 'sep', type: 'int', allowNull: true },
          { name: 'oct', type: 'int', allowNull: true },
          { name: 'nov', type: 'int', allowNull: true },
          { name: 'dec', type: 'int', allowNull: true }
      ],
      data: createData()
  });
}

function createData() {
  let data = [],
      thisYear = new Date().getFullYear() + 1900,
      mod = 0x7fffFFFF,
      // return integer [min,max)
      rand = function (min, max) {
          var r = (seed = ((seed * 214013) + 2531011) % mod) / mod; // [0, 1)
          return Math.floor(r * (max - min)) + min;
      },
      seed = 13;

  for (var year = 1900; year <= thisYear; ++year) {
      data.push([
          year, // id
          year,
          rand(-10, 100),
          rand(-10, 100),
          rand(-10, 200),
          rand(-10, 200),
          rand(-10, 200),
          rand(-10, 300),
          rand(-10, 300),
          rand(-10, 300),
          rand(-10, 600),
          rand(-10, 500),
          rand(-10, 200),
          rand(-10, 100)
      ]);
  }

  return data;
}

function selectandcopy() {
  var o = {
    xtype: 'grid',
    title: 'Flexible Selection',
    plugins:{
      clipboard: true,
      selectionreplicator: true
    },
    itemRipple:false,
    selectable: {
      columns: true,
      cells: true,
      checkbox: true,
      drag: true,
      extensible: 'both'
    },
    shadow:true,
    rowNumbers:true,
    columnLines:true,
    store: createStore(),
  }
  var grid = Ext.create(o)

  var column01 = Ext.create({xtype: 'column', text:'Year',dataIndex:'year',minWidth:75,flex:1})
  var column02 = Ext.create({xtype: 'column', text:'Jan',dataIndex:'jan',width:75})
  var column03 = Ext.create({xtype: 'column', text:'Feb',dataIndex:'feb',width:75})
  var column04 = Ext.create({xtype: 'column', text:'Mar',dataIndex:'mar',width:75})
  var column05 = Ext.create({xtype: 'column', text:'Apr',dataIndex:'apr',width:75})
  var column06 = Ext.create({xtype: 'column', text:'May',dataIndex:'may',width:75})
  var column07 = Ext.create({xtype: 'column', text:'Jun',dataIndex:'jun',width:75})
  var column08 = Ext.create({xtype: 'column', text:'Jul',dataIndex:'jul',width:75})
  var column09 = Ext.create({xtype: 'column', text:'Aug',dataIndex:'aug',width:75})
  var column10 = Ext.create({xtype: 'column', text:'Sep',dataIndex:'sep',width:75})
  var column11 = Ext.create({xtype: 'column', text:'Oct',dataIndex:'oct',width:75})
  var column12 = Ext.create({xtype: 'column', text:'Nov',dataIndex:'nov',width:75})
  var column13 = Ext.create({xtype: 'column', text:'Dec',dataIndex:'dec',width:75})

  grid.addColumn(column01)
  grid.addColumn(column02)
  grid.addColumn(column03)
  grid.addColumn(column04)
  grid.addColumn(column05)
  grid.addColumn(column06)
  grid.addColumn(column07)
  grid.addColumn(column08)
  grid.addColumn(column09)
  grid.addColumn(column10)
  grid.addColumn(column11)
  grid.addColumn(column12)
  grid.addColumn(column13)

  var container = Ext.create({xtype:'container', layout: 'fit', padding: '10'})
  Ext.Viewport.add([container])
  container.add(grid)
}