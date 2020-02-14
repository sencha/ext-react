Ext.define('jsxInExtJSClassic.view.login.LoginView',{
	extend: 'Ext.Container',
	xtype: 'loginview',
	cls: 'loginview',
	controller: 'loginviewcontroller',
	viewModel: {
		type: 'loginviewmodel'
	},
	requires: [
	//	'Ext.field.Password',
	//	'Ext.field.Checkbox'
	],
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},

	items: [
		{
			cls: 'auth-header',
			html:
				'<span class="logo x-fa fa-circle-o-notch"></span>'+
				'<div class="title">App Name</div>'+
				'<div class="caption">App Description</div>'
		}, 
		{
			xtype: 'formpanel',
			reference: 'form',
			layout: 'vbox',
			ui: 'auth',
			items: [
				// {
				// 	xtype: 'textfield',
				// 	allowBlank: false,
				// 	required: true,
				// 	label: 'User ID',
				// 	name: 'user',
				// 	reference: 'user',
				// 	placeholder: 'user id'
				// }, 
				// {
				// 	xtype: 'passwordfield',
				// 	allowBlank: false,
				// 	required: true,
				// 	label: 'Password',
				// 	name: 'pass',
				// 	reference: 'pass',
				// 	placeholder: 'password'
				// }, 
				// {
				// 	xtype: 'checkbox',
				// 	boxLabel: 'Remember me',
				// 	name: 'remember'
				// }
			],
			buttons: [{
					text: 'Login',
					handler: 'onLogin'
			}]
		}, 
		{
			cls: 'auth-footer',
			html:
				'<div>Ext JS example</div>'+
				'<a href="http://www.sencha.com" target="_blank">'+
						'<span class="logo ext ext-sencha"></span>'+
						'<span class="label">Sencha</span>'+
				'</a>'
		}
	]

});
