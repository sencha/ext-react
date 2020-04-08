Ext.define('Ext.webcomponents.RendererCell', {
  extend: 'Ext.grid.cell.Base',
  xtype: 'renderercell',
  config: {
      renderer: null,
      summaryRenderer: null,
      forceWidth: false
  },
  setValue: function (value) {
    var me = this, 
        context = me.refreshContext, 
        column = context.column,
        needsSizing = false,
        scope = column.getScope(),
        markup, renderer, result;
    if (context.summary) {
        renderer = me.getSummaryRenderer() || column.getSummaryRenderer();
    }
    renderer = renderer || me.getRenderer() || column.getRenderer();
    if (renderer) {
      var r
      if (typeof renderer == 'string') {
        r = eval(renderer)
      }
      else {
        r = renderer
      }
      markup = r.call(scope, value, context.record, context.dataIndex, me, column);
      if (markup == null) { markup = ''; }
      if (typeof markup === 'object') {
        console.log('in RendererCell - markup is an object, not doing anything...')
      } 
      else {
        Ext.dom.Helper.overwrite(me.bodyElement, markup.toString());
        me.widget = null;
        }
      if (needsSizing && me.getForceWidth()) {
        me.setWidgetWidth(me.getWidth());
      }
    }
    return me;
  },

  updateWidth: function (width, oldWidth) {
    this.callParent(arguments);
    if (this.getForceWidth()) {
      this.setWidgetWidth(width);
    }
  },

  doDestroy: function () {
    this.widget = null;
//??        Ext.react.ReactDOM.unmountComponentAtNode(this.bodyElement.dom);
    this.callParent();
  },

  privates: {
      setWidgetWidth: function (width) {
        var me = this,
            el = me.bodyElement,
            widget, column, leftPad, rightPad;

        if (!me.rendered) {
          return;
        }

        widget = me.widget;

        if (widget) {
          column = me.getColumn();
          leftPad = parseInt(column.getCachedStyle(el, 'padding-left'), 10) || 0;
          rightPad = parseInt(column.getCachedStyle(el, 'padding-right'), 10) || 0;

          // Give the widget a reference to ourself to allow it to do extra measuring
          widget.measurer = column;
          widget.setWidth(width - leftPad - rightPad);
        }
      }
  }
});




function colRenderer(value, record, dataIndex, cell, column) {
//  console.dir('start')
//  console.dir(value)
  // console.dir(record)
  // console.dir(dataIndex)
  // console.dir(cell)
  // console.dir(column)
  // console.dir('end')
  return ('<span style="color:red">' + value + '</span>')
//    return '<ext-panel title="hi"><div>' + value + '</div></ext-panel>'
//  return '<ext-button text="' + value + '"></ext-button>'
}

function renderer() {

  var data = [
    { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
    { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
    { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
    { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
  ]

  var oRoot = {
    xtype: 'container',
    layout: 'fit'
  }
  var container = Ext.create(oRoot)

  var o = {
    xtype: 'grid',
    height: 400,
    title: 'the grid title'
  }
  var grid = Ext.create(o)


  Ext.Viewport.add([container])
  container.add(grid)

  var column01 = Ext.create({
    xtype: 'column',
    text: 'Name',
    dataIndex: 'name',
    width: 300,
//    renderer: colRenderer,
//    cell: { xtype: 'renderercell' }
  })
  var column02 = Ext.create({xtype: 'column', text: 'Email', dataIndex: 'email', width: 200})
  var column03 = Ext.create({xtype: 'column', text: 'Phone', dataIndex: 'phone', width: 200})

  grid.insertColumn(0,column01)

  column01.setCell({ xtype: 'renderercell', renderer: colRenderer })

  grid.insertColumn(1,column02)
  grid.insertColumn(2,column03)

  // grid.addColumn(column01)
  // grid.addColumn(column02)
  // grid.addColumn(column03)

  grid.setData(data)
}