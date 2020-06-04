export default Ext.create('Ext.data.TreeStore', {
     root: {
        text: 'Ext JS',
        expanded: true,
        children: [
            {
                text: 'app',
                children: [
                    { leaf: true, text: 'Application.js', className: 'Ext.app.Applicaton' },
                    { leaf: true, text: 'Controller.js', className: 'Ext.app.Controller' },
                    { leaf: true, text: 'ViewController.js', className: 'Ext.app.ViewController' },
                    { leaf: true, text: 'ViewModel.js', className: 'Ext.app.ViewModel' }
                ]
            },
            {
                text: 'grid',
                expanded: true,
                children: [
                    { leaf: true, text: 'Grid.js', className: 'Ext.grid.Grid' },
                    { leaf: true, text: 'PagingToolbar.js', className: 'Ext.grid.PagingToolbar' },
                    { leaf: true, text: 'Tree.js', className: 'Ext.grid.Tree' }
                ]
            },
            {
                text: 'menu',
                children: [
                    { leaf: true, text: 'CheckItem.js', className: 'Ext.menu.CheckItem' },
                    { leaf: true, text: 'EdgeMenu.js', className: 'Ext.menu.EdgeMenu' },
                    { leaf: true, text: 'Item.js', className: 'Ext.menu.Item' },
                    { leaf: true, text: 'Manager.js', className: 'Ext.menu.Manager' },
                    { leaf: true, text: 'Menu.js', className: 'Ext.menu.Menu' },
                    { leaf: true, text: 'RadioItem.js', className: 'Ext.menu.RadioItem' },
                    { leaf: true, text: 'Separator.js', className: 'Ext.menu.Separator' }
                ]
            },
            {
                text: 'tab',
                children: [
                    { leaf: true, text: 'Bar.js', className: 'Ext.tab.Bar' },
                    { leaf: true, text: 'Panel.js', className: 'Ext.tab.Panel' },
                    { leaf: true, text: 'Tab.js', className: 'Ext.tab.Tab' }
                ]
            },
            { leaf: true, text: 'ActionSheet.js', className: 'Ext.ActionSheet' },
            { leaf: true, text: 'Audio.js', className: 'Ext.Audio' },
            { leaf: true, text: 'Button.js', className: 'Ext.Button' },
            { leaf: true, text: 'Component.js', className: 'Ext.Component' },
            { leaf: true, text: 'Container.js', className: 'Ext.Container' },
            { leaf: true, text: 'Editor.js', className: 'Ext.Editor' },
            { leaf: true, text: 'Gadget.js', className: 'Ext.Gadget' },
            { leaf: true, text: 'Img.js', className: 'Ext.Img' },
            { leaf: true, text: 'LoadMask.js', className: 'Ext.LoadMask' },
            { leaf: true, text: 'MessageBox.js', className: 'Ext.MessageBox' },
            { leaf: true, text: 'Panel.js', className: 'Ext.Panel' },
            { leaf: true, text: 'Sheet.js', className: 'Ext.Sheet' }
        ]
    }
})