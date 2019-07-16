Ext.define('KitchenSink.store.VirtualForum', {
    extend: 'Ext.data.virtual.Store',
    alias: 'store.virtualforum',
    fields: [
        'firstName', 'lastName', 'address', 'company', 'title',
        {
            name: 'id',
            type: 'int'
        }],

    proxy: {
        type: 'ajax',
        url: 'https://llbzr8dkzl.execute-api.us-east-1.amazonaws.com/production/user',
        reader: {
            rootProperty: 'users',
            totalProperty: 'totalCount'
        }
    },
    pageSize: 25,
    autoLoad: true
});