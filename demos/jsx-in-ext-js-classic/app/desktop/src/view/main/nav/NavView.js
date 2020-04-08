//Ext.define('jsxInExtJSClassic.view.main.nav.NavView', {
//	extend: 'Ext.Panel',
//	xtype: 'navview',
//	cls: 'navview',
//	layout: 'fit',
//	tbar: {xtype: 'topview', height: 50},
//	items: [ {xtype: 'menuview', reference: 'menuview', bind: {width: '{menuview_width}'}} ],
//	bbar: {xtype: 'bottomview', bind: {height: '{bottomview_height}'}}
//});

/**
NavView is a component that shows a list of menu options, and the view xtype for each. It is
twoWayBindable on "selection".
NavView is actually composed of several components: a header, a tree list, and a footer. But we're
hiding that from the rest of the app -- we only want code to be aware of NavView, without caring
about the underlying components within it. We could write the rest of the app to select and listen
directly to the tree list, but in a complex app that kind of poor scoping can lead to problems.
*/
Ext.define("jsxInExtJSClassic.view.main.nav.NavView", {
	extend: "Ext.Panel",
	xtype: "navview",
	controller: "navviewcontroller",
	viewModel: { type: "navviewmodel"},
  cls: "navview",
  id: 'navview',
	layout: "fit",

	// This is like a normal config -- where the values are applied as the object is created --
	// but with a renderConfig, the values aren't applied until the component has been rendered.
	renderConfig: {
			store: null,
			micro: false,
			name: null,
			selection: null
	},
	twoWayBindable: ["selection"],

	// Each config property may have a corresponding update method. Ideally, the view should
	// be purely declarative, so these methods are an awkward exception. To minimize the code
	// in the view, just have these call a method in the controller. Another solution is to
	// put the update methods in a separate class, then mix in the class.
	updateStore: function(store) {
			this.lookup("menuview").setStore(store);
	},
	updateMicro: function(micro) {
			this.getController().updateMicro(micro);
	},
	// updateName: function(name) {
	// 		this.getController().updateName(name);
	// },
	updateSelection: function(selection) {
			this.getController().updateSelection(selection);
	},

	tbar: {
			xtype: "topview",
			reference: "topview",
			dock: "top",
//			height: 50
	},
	items: [
			{
					xtype: "menuview",
					reference: "menuview",
					listeners: {
							selectionchange: "onMenuViewSelectionChange"
					}
			}
	],

	bbar: {
			xtype: "bottomview",
			reference: "bottomview",
			height: 50
	}
});

