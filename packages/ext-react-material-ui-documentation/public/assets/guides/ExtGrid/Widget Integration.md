# Using Components in Grids
Since ExtJS 5.0, developers have had the ability to embed components within grid cells
using the [[ext:Ext.grid.column.Widget Widget Column class.]]

Beginning in ExtJS 6.2.0, developers have the ability to configure a component to be
displayed in an expansion row below (or, configurably, above) the data row using
the [[ext:Ext.grid.plugin.RowWidget Row Widget plugin.]]

In this guide we will cover how to embed components in grid cells, or in an expansion row.

##The Widget Column

Widget Column allows you to easily embed any Component into a Grid cell.
Adding a Widget Column couldn't be easier. Simply assign your column an `xtype` of
**"widgetcolumn"** and specify its [[ext:Ext.grid.column.Widget#cfg-widget widget]]
config. The `widget` config is an object that contains the **xtype** to create for each
cell.  This `xtype` can refer to any [[ext:Ext.Widget]] or [[ext:Ext.Component]] class.

Using the Widget Column to add Sparkline widgets to a Grid, you can accomplish an
impressive amount of data visualization as you can see below.

<img src="images/KS-sparklines.jpeg"/>

For a live example of the above image, please visit the
[Widget Grid](http://examples.sencha.com/extjs/latest/examples/kitchensink/#widget-grid).

Enough talk, let's see this thing in action.  In the following example, we create a
[[ext:Ext.data.Store store]] with a small set of records that populates a Grid with a
Widget Column.

The Widget Column contains a Progress Bar widget, which is added to each row.

	@example:extjs-6.2.0-triton-classic
	var store = Ext.create('Ext.data.Store', {
	    fields: ['name','progress'],
	    data: [
	        { name: 'Test 1', progress: 0.10 },
	        { name: 'Test 2', progress: 0.23 },
	        { name: 'Test 3', progress: 0.86 },
	        { name: 'Test 4', progress: 0.31 }
	    ]
	});

	Ext.create({
	    xtype: 'grid',
	    title: 'Widget Column Demo',
	    store: store,

	    columns: [{
	        text: 'Test Number',
	        dataIndex: 'name',
	        width: 100
	    }, {
	        xtype: 'widgetcolumn',
	        text: 'Progress',
	        width: 120,
	        dataIndex: 'progress',
	        widget: {
	            xtype: 'progressbarwidget',
	            textTpl: '{value:percent}'
	        }
	    }],

	    width: 220,
	    height: 250,
	    renderTo: document.body
	});

###Understanding the "widget" Config
The `widget` config of a Widget Column is used to define the type of component
to embed in the cells.  Based on the `xtype` contained in the `widget` config,
the Widget Column will create, and manage the lifecycle of instances of the
required component. This config cannot be an instance already because Widget
Column needs one instance per rendered cell.

Each instance is automatically connected with a specific record and row in the Grid.
Over the lifetime of the Grid, the Widgets created for a row will be "recycled" and
connected to different records and rows.

The field referenced by the column's `dataIndex` is bound to the embedded component's
`defaultBindProperty`.

Since 6.2.0, components embedded in grids have access to the ViewModel and all the data
within it. The ViewModel contains two row-specific properties:

    record
    recordIndex

## Row body components.

The [[ext:Ext.grid.plugin.RowWidget Row Widget plugin.]] allows developers to
specify a component to embed in an expansion row in a very similar way to using a Widget Column

To enable this, configure the RowWidget plugin with a `widget` property:

    plugins: [{
        ptype: 'rowwidget',

        // The widget definition describes a widget to be rendered into the expansion row.
        // It has access to the application's ViewModel hierarchy. Its immediate ViewModel
        // contains a record and recordIndex property. These, or any property of the record
        // (including association stores) may be bound to the widget.
        widget: {
            xtype: 'form'
            ...

The embedded component has access to the grid's ViewModel, including the `record` and
`recordIndex` properties.

The grid may be configured with a [[ext:Ext.grid.Panel#cfg-rowViewModel rowViewModel]] setting
which may specify a `type` of ViewModel to create which may include custom data and
formulas to help provide data for the widgets.

See [Row Widget Grid](http://examples.sencha.com/extjs/latest/examples/kitchensink/#row-widget-grid)

<img src="./images/embedded_grid.png"/>

## What is a Widget?

The [[ext:Ext.Widget]] class, or just **"widget"**, is a lightweight class similar to
[[ext:Ext.Component Component]], but consists solely of an [[ext:Ext.dom.Element]] and
associated listeners.  This makes a Widget quite different from a normal Component
because the Ext.Widget class does not derive from [[ext:Ext.Component]]. Component
provides robust life-cycle management, which adds a tremendous amount of functionality.
This functionality, however, comes at some cost.

We have provided a few stock Widgets with ExtJS.  These include:

+ **Progress Bar** ([[ext:Ext.Progress]] or "progressbarwidget")
+ **Slider** ([[ext:Ext.slider.Widget]] or "sliderwidget")
+ **Sparklines** (Ext.sparkline.*)
	+ [[ext:Ext.sparkline.Line Line]] ("sparklineline")
	+ [[ext:Ext.sparkline.Bar Bar]] ("sparklinebar")
	+ [[ext:Ext.sparkline.Discrete Discrete]] ("sparklinediscrete")
	+ [[ext:Ext.sparkline.Bullet Bullet]] ("sparklinebullet")
	+ [[ext:Ext.sparkline.Pie Pie]] ("sparklinepie")
	+ [[ext:Ext.sparkline.Box Box]] ("sparklinebox")
	+ [[ext:Ext.sparkline.TriState TriState]] ("sparklinetristate")

##Using Widgets

As with normal Components, Widgets can be added to the
[[ext:Ext.container.Container#cfg-items items]] of a Container. For example, we can add
a Sparkline to a [[ext:Ext.toolbar.Toolbar toolbar]]:

    @example:extjs-6.2.0-triton-classic
    var panel = Ext.create({
        xtype: 'panel',
        title: 'Title',
        frame: true,
        renderTo: document.body,
        width: 250,
        height: 150,
        html: 'Some text',
        tbar: [{
            text: 'Button'
        }, '->', {
            xtype: 'sparklineline',
            fillColor: '#ddf',
            width: 100,
            height: 20,
            values: [2, 3, 0, 4, -1]
        }]
    });

In the case of Sparklines, you must provide a size (both `width` and `height`) or use an
ExtJS [[ext:Ext.layout.container.Container layout]] manager to do so. This is because
the internal drawings have no natural size.

##Custom Widgets

While ExtJS ships with a "widget-ized" version of the Slider and Progressbar as well
as the new Sparklines, there will most likely be situations in which you'd like to
create your own Widgets. The decision of whether to derive from [[ext:Ext.Component]] vs
[[ext:Ext.Widget]] really comes down to the complexity of the class being created.
Simple componentry can often avoid things like the Component life-cycle and layouts and
just map config properties to the associated elements while responding to element
events (_like 'click', 'dblclick', 'mouseover', etc._).

To create a Widget you extend [[ext:Ext.Widget]] and define your element template and
its [[ext:Ext.Widget#cfg-listeners listeners]].

	Ext.define('MyWidget', {
	    extend: 'Ext.Widget',

	    // The element template - passed to Ext.Element.create()
	    element: {
	        reference: 'element',
	        listeners: {
	            click: 'onClick'
	        },
	        children: [{
	            reference: 'innerElement',
	            listeners: {
	                click: 'onInnerClick'
	            }
	        }]
	    },

	    constructor: function(config) {
	        // Initializes our element from the template, and calls initConfig().
	        this.callParent([config]);

	        // After calling the superclass constructor, the Element is available and
	        // can safely be manipulated.  Reference Elements are instances of
	        // Ext.Element, and are cached on each Widget instance by reference name.
	    },

	    onClick: function() {
	       // Listeners use this Widget instance as their scope
	        console.log('element clicked', this);
	    },

	    onInnerClick: function() {
	        // Access the innerElement reference by name
	        console.log('inner element clicked', this.innerElement);
	    }
	});

This will feel very familiar to those who have written an ExtJS Modern Component. That is
because [[ext:Ext.Widget]] is an enhanced version of **Ext.AbstractComponent** from
ExtJS Modern.  The ability to add `listeners` to the `element` template is one of those
enhancements, but there are a handful of others. Refer to the documentation on
[[ext:Ext.Widget]] for more details.

