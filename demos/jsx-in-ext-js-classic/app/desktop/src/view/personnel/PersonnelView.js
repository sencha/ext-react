Ext.define('jsxInExtJSClassic.view.personnel.PersonnelView',{
	extend: 'Ext.grid.Panel',
	xtype: 'personnelview',
	cls: 'personnelview',
	requires: [],
	controller: 'personnelviewcontroller',
	viewModel: {type: 'personnelviewmodel'},
	store: {type: 'personnelviewstore'},
	columns: [
		{ 
			text: 'Name',
			dataIndex: 'name',
			width: 100,
			cell: {userCls: 'bold'}
		},
		{text: 'Email',dataIndex: 'email',width: 230},
		{
			text: 'Phone',
			dataIndex: 'phone',
			width: 150 
		}
	],
	listeners: {
		select: 'onItemSelected'
	}
});
