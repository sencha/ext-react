Ext.define('Ext-and-React.view.main.nav.NavViewController', {
	extend: "Ext.app.ViewController",
	alias: "controller.navviewcontroller",

	initViewModel: function(vm) {},

	onTopViewNavToggle: function () {
		var vm = this.getViewModel();
		vm.set('navCollapsed', !vm.get('navCollapsed'));
	},

	onMenuViewSelectionChange: function(tree, node) {
		if (!node) {
				return;
		}
		this.fireViewEvent("select", node);
	}
});
