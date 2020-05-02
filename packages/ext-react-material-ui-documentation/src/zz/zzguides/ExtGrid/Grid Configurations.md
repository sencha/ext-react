# Grid Configurations

[[ext:Ext.grid.Panel]] is one of the centerpieces of ExtJS. It's an incredibly
versatile component that provides an easy way to display, sort, group, and edit data.

## Basic Grid Panel

<img src="./images/simple_grid.png" alt="Basic Grid Panel"/>

Let's get started by creating a basic [[ext:Ext.grid.Panel]].  Here's all you need to
know to get a simple grid up and running:

### Model and Store

[[ext:Ext.grid.Panel]] is simply a component that displays data contained in a
[[ext:Ext.data.Store]]. [[ext:Ext.data.Store]] can be thought of as a collection of
records, or [[ext:Ext.data.Model]] instances.

The benefit of this setup is separating our concerns.  [[ext:Ext.grid.Panel]] is only
concerned with displaying the data, while [[ext:Ext.data.Store]] takes care of fetching
and saving the data using [[ext:Ext.data.proxy.Proxy]].

First, we need to define a [[ext:Ext.data.Model]]. A model is just a collection of
[[ext:Ext.data.field.Field fields]] that represents a type of data.  Let's define a
model that represents a **"User"**:

    Ext.define('User', {
        extend: 'Ext.data.Model',
        fields: [ 'name', 'email', 'phone' ]
    });

Next let's create a [[ext:Ext.data.Store]] that contains several **"User"** instances.

    var userStore = Ext.create('Ext.data.Store', {
        model: 'User',
        data: [
            { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
            { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
            { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
            { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
        ]
    });

For sake of ease, we configured [[ext:Ext.data.Store]] to load its data inline.  In a
real world application, you would most likely configure the [[ext:Ext.data.Store]] to
use an [[ext:Ext.data.proxy.Proxy]] to load data from the server.

### Grid Panel

Now, we have a model, which defines our data structure.  We have also loaded several
model instances into an [[ext:Ext.data.Store]].  Now we're ready to display the data
using [[ext:Ext.grid.Panel]].

In this example, we configured the Grid with [[ext:Ext.Component#cfg-renderTo renderTo]]
to immediately render the Grid into the HTML document.

In many situations, the grid will be a descendant of [[ext:Ext.container.Viewport]],
which means rendering is already handled.

    Ext.create('Ext.grid.Panel', {
        renderTo: document.body,
        store: userStore,
        width: 400,
        height: 200,
        title: 'Application Users',
        columns: [
            {
                text: 'Name',
                width: 100,
                sortable: false,
                hideable: false,
                dataIndex: 'name'
            },
            {
                text: 'Email Address',
                width: 150,
                dataIndex: 'email',
                hidden: true
            },
            {
                text: 'Phone Number',
                flex: 1,
                dataIndex: 'phone'
            }
        ]
    });

And that's all there is to it.

We just created an [[ext:Ext.grid.Panel]] that renders itself to the body element.  We
also told the Grid panel to get its data from the `userStore` that we previously
created.

Finally, we defined the Grid panel's columns and gave them a
[[ext:Ext.grid.column.Column#cfg-dataIndex dataIndex]] property.  This `dataIndex`
associates a field from our model to a column.

The **"Name"** column has a fixed `width` of **"100px"** and has
[[ext:Ext.grid.column.Column#cfg-sortable sorting]] and
[[ext:Ext.grid.column.Column#cfg-hideable hiding]] disabled. The **"Email Address"**
column is hidden by default (it can be shown again by using the menu on any other column
header).  Finally, the **"Phone Number"** column
[[ext:Ext.grid.column.Column#cfg-flex flexes]] to fit the remainder of the Grid panel's
total width.

For a larger example, see the [Basic Grid
Example](http://examples.sencha.com/extjs/latest/examples/kitchensink/#array-grid).

## Renderers

You can use the [[ext:Ext.grid.column.Column#cfg-renderer renderer]] property of the
column config to change the way in which data is displayed. A `renderer` is a function
that modifies the underlying value and returns a new value for display.  Some of the
most common renderers are included in [[ext:Ext.util.Format]], but you can write your
own as well:

    columns: [
        {
            text: 'Birth Date',
            dataIndex: 'birthDate',
            // format the date using a named method from the ViewController
            renderer: 'renderDate',
        },
        {
            text: 'Birth Date',
            dataIndex: 'birthDate',
            // format the date using a formatter from the Ext.util.Format class
            formatter: 'date("m/d/Y")',
        },
        {
            text: 'Email Address',
            dataIndex: 'email',
            // format the email address using a custom renderer
            renderer: function(value) {
                return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
            }
        }
    ]

See the Kitchen Sink's [Basic
Grid](http://examples.sencha.com/extjs/latest/examples/kitchensink/#array-grid) for a live demo
that uses custom renderers.

##Navigation
In accordance with accessibility guidelines, grid cells accept focus, and the focus
rendition my be specified in the theme.

Arrow keys navigate the focus position in two dimensions. TAB tabs out of the grid
into the following focusable element.

This is known as Navigable Mode, and is the default mode for handling focus within
a grid.

If there are focusable elements within a cell (Such as [[Ext.grid.column.Action action columns]]
then the actionable items may be accessed by using the ENTER or F2 key to enter
Actionable Mode wherein focus navigation takes place **within** cells using the TAB key.

Cell editing which is discussed below is a special case of Actionable Mode.

ESC or F2 exits actionable mode, and focus pops up to the encapsulating cell
of the recently focused actionable item.

See https://www.w3.org/TR/wai-aria-practices/#grid for details.

## Selection Models

Grid panels can be used to simply display data.  However, it is often necessary to
interact with the Grid's data.  All Grid panels have an [[ext:Ext.selection.Model]],
which determines how data is selected. The most versatile Selection Model is
[[ext:Ext.grid.selection.SpreadsheetModel]], which may be configured to select
cells, rows, or columns, and to optionally display a selection checkbox if
selecting rows.

See the Kitchen Sink's [Spreadsheet Model](http://examples.sencha.com/extjs/latest/examples/kitchensink/#spreadsheet-checked)
for an example.

Other selection models include [[ext:Ext.selection.RowModel]], where entire rows are selected, and
[[ext:Ext.selection.CellModel]], where individual cells are selected. These are less flexible than
the SpreadsheetModel.

Grid panels use [[ext:Ext.selection.RowModel]] by default, but it's easy to switch to an
[[ext:Ext.grid.selection.SpreadsheetModel]]:

    Ext.create('Ext.grid.Panel', {
        selectionModel: 'spreadsheet',
        store: ...
    });

## Editing

Grid panel has built-in support for editing.  Let's look at the two main editing modes -
row editing and cell editing.

### Cell Editing

[[ext:Ext.grid.plugin.CellEditing Cell editing]] allows you to edit the data in a Grid
panel one cell at a time.  The first step in implementing cell editing is to configure
an editor for each [[ext:Ext.grid.column.Column]] in your Grid Panel that should be
editable.  This is done using the [[ext:Ext.grid.column.Column#cfg-editor]] config.  The
simplest way is to specify just the **xtype** of the field you want to use as an editor:

    Ext.create('Ext.grid.Panel', {
        ...
        columns: [
            {
                text: 'Email Address',
                dataIndex: 'email',
                editor: 'textfield'
           }
        ]
    });

If you need more control over how the editor field behaves, the
[[ext:Ext.grid.column.Column#cfg-editor]] config can also take a config object for a Field.
For example, if we are using a [[ext:Ext.form.field.Text]] and we want to require a
value:

    columns: [
        text: 'Name',
        dataIndex: 'name',
        editor: {
            xtype: 'textfield',
            allowBlank: false
        }
    [

You can use any class in the **"Ext.form.field.*"** package as an editor field.  Lets
suppose we want to edit a column that contains dates.  We can use a
[[ext:Ext.form.field.Date]] editor:

    columns: [
        {
            text: 'Birth Date',
            dataIndex: 'birthDate',
            editor: 'datefield'
        }
    ]

Any [[ext:Ext.grid.column.Column]] in a [[ext:Ext.grid.Panel]] that do not have a
[[ext:Ext.grid.column.Column#cfg-editor]]] configured will not be editable.

Now that we've configured which columns we want to be editable, to enable editing
we need to configure the [[ext:Ext.grid.Panel]] with a [[ext:Ext.grid.plugin.CellEditing]]:

    Ext.create('Ext.grid.Panel', {
        ...
        plugins: [{
            ptype: 'cellediting ',
            clicksToEdit: 1
        }]
    });

And that's all it takes to create an editable Grid using cell editing. See [Cell
Editing](http://examples.sencha.com/extjs/latest/examples/kitchensink/#cell-editing) for a
working example.

<img src="./images/cell_editing.png"/>

### Row Editing

Row editing enables you to edit an entire row at a time, rather than editing cell by
cell.  Row editing works in exactly the same way as cell editing - all we need to do is
change the plugin type to [[ext:Ext.grid.plugin.RowEditing]].

    Ext.create('Ext.grid.Panel', {
        ...
        plugins: [{
            ptype: 'rowediting',
            clicksToEdit: 1
        }]
    });

<img src="./images/row_editing.png"/>

See [Row Editing](https://examples.sencha.com/extjs/latest/examples/kitchensink/#row-editing) for a
working example.

## Grouping

<img src="./images/grouping.png"/>

Organizing the rows into groups is easy.  First we specify a
[[ext:Ext.data.Store#cfg-groupField groupField]] property on our store:


    Ext.create('Ext.data.Store', {
        model: 'Employee',
        data: ...,
        groupField: 'department'
    });

Next, we configure a Grid with [[ext:Ext.grid.feature.Grouping]] that will handle
displaying the rows in groups:

    Ext.create('Ext.grid.Panel', {
        ...
        features: [{ ftype: 'grouping' }]
    });

See the Kitchen Sink's [Grouping Grid
Panel](http://examples.sencha.com/extjs/latest/examples/kitchensink/#grouped-grid) for a live
example.


## Paging

Sometimes your data set is too large to display all on one page.  [[ext:Ext.grid.Panel]]
supports displaying individual pages from the dataset using a
[[ext:Ext.toolbar.Paging]], which loads pages using previous/next buttons.

### Store Setup

Before we can set up paging on a [[ext:Ext.grid.Panel]], we have to configure the
[[ext:Ext.data.Store]] to support paging.  In the below example we add
[[ext:Ext.data.Store#cfg-pageSize]] to the [[ext:Ext.data.Store]], and we configure our
[[ext:Ext.data.reader.Reader]] with a [[ext:Ext.data.reader.Reader#cfg-totalProperty]]:

    Ext.create('Ext.data.Store', {
        model: 'User',
        autoLoad: true,
        pageSize: 100,
        proxy: {
            type: 'ajax',
            url : 'data/users.json',
            reader: {
                type: 'json',
                rootProperty: 'users',
                totalProperty: 'total'
            }
        }
    });

The [[ext:Ext.data.reader.Reader#totalProperty]] config tells
[[ext:Ext.data.reader.Json]] where to get the total number of results in the JSON
response.  This [[ext:Ext.data.Store]] is configured to consume a JSON response that
looks something like this:

    {
        "success": true,
        "total": 4,
        "users": [
            { "name": "Lisa", "email": "lisa@simpsons.com", "phone": "555-111-1224" },
            { "name": "Bart", "email": "bart@simpsons.com", "phone": "555-222-1234" },
            { "name": "Homer", "email": "homer@simpsons.com", "phone": "555-222-1244" },
            { "name": "Marge", "email": "marge@simpsons.com", "phone": "555-222-1254" }
        ]
    }

### Paging Toolbar

Now that we've set up our [[ext:Ext.data.Store]] to support paging, all that's left is
to configure a [[ext:Ext.toolbar.Paging]].  You could put the [[ext:Ext.toolbar.Paging]]
anywhere in your application layout, but typically it is docked to the
[[ext:Ext.grid.Panel]]:

    Ext.create('Ext.grid.Panel', {
        store: userStore,
        columns: ...,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: userStore,   // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        }]
    });

<img src="./images/paging_toolbar.png"/>

See the [Paging Grid](http://examples.sencha.com/extjs/latest/examples/kitchensink/#paging-grid)
for a working example.

### Buffered Rendering

Grids and Trees enable buffered rendering of extremely large datasets as an alternative to using a
paging toolbar.  Your users can scroll through thousands of records without the
performance penalties of rendering all the records on screen at once.

Only enough rows are rendered to fill the visible area of the Grid with a little
[[ext:Ext.grid.Panel-cfg-leadingBufferZone]] overflow either side to allow scrolling. As
scrolling proceeds, new rows are rendered in the direction of scroll, and rows are
removed from the receding side of the table.

Grids use buffered rendering by default, so you no longer need to add the plugin to your
Grid component.

See [Big Data](http://examples.sencha.com/extjs/latest/examples/kitchensink/#big-data-grid)
of [Filtered Tree](http://examples.sencha.com/extjs/latest/examples/kitchensink/#filtered-tree)
for working examples.

### Embedded components.

Since ExtJS 5.0, developers have had the ability to embed components within grid cells
using the [[ext:Ext.grid.column.Widget Widget Column class.]]

In versions prior to 6.2.0, components embedded in this way had no access to the grid's
`Ext.app.ViewModel`. The field referenced by the column's `dataIndex` was bound to
the component's `defaultBindProperty`.

In 6.2.0, components embedded in grids have access to the ViewModel and all the data
within it. The ViewModel contains two row-specific properties:

    record
    recordIndex

Since ExtJS 6.2.0, developers have had the ability to configure a component to be
displayed in an expansion row below (or, configurably, above) the data row.

The embedded component has access to the grid's ViewModel.

See <a href="widgets_widgets_columns.html">Using Components in Grids</a> guide for more details.
