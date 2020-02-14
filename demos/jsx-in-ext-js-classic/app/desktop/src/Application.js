Ext.define('jsxInExtJSClassic.Application', {
	extend: 'Ext.app.Application',
	name: 'jsxInExtJSClassic',
	requires: ['jsxInExtJSClassic.*'],
	defaultToken: 'homeview',

	launch: function () {
		Ext.ariaWarn = Ext.emptyFn
		Ext.getBody().removeCls('launching')
		var elem = document.getElementById("splash")
		elem.parentNode.removeChild(elem)

		var whichView = 'mainview'
//		var loggedIn = localStorage.getItem("LoggedIn");
//		if(loggedIn != 'true') { whichView = 'loginview' }
		if (Ext.isClassic == true) {
			Ext.create({xtype: whichView, plugins: 'viewport'})
		}
		else {
			Ext.Viewport.add([{xtype: whichView}])
		}
	},

	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
