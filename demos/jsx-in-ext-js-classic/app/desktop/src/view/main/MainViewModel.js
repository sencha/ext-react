Ext.define('MyAppName.view.main.MainViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.mainviewmodel',
	data: {
		name: 'MyAppName',
		navCollapsed:       false,
		navview_max_width:    300,
		navview_min_width:     44,
		topview_height:       75,
		bottomview_height:     50,
		detailCollapsed:     true,
		detailview_width:       0,
		detailview_max_width: 300,
		detailview_min_width:   0,

	},
	formulas: {
		navview_width: function(get) {
			return get('navCollapsed') ? get('navview_min_width') : get('navview_max_width');
		},
		detailview_width: function(get) {
			return get('detailCollapsed') ? get('detailview_min_width') : get('detailview_max_width');
		}
	},
	stores: {
    menu: {
      type: "tree",
      proxy: {
        type: 'ajax',
        reader: 'json',
        url: 'resources/desktop/menu.json'
    },
    autoLoad: true
    }
	}

});
