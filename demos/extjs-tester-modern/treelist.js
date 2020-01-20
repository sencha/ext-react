//function grid() {
Ext.onReady(function() {


    var navItems = {
        type: 'tree',
        rootVisible: true,
        root: {
            expanded: true,
            text: 'All',
            iconCls: 'x-fa fa-sitemap',
            children: [{
                text: 'Home',
                iconCls: 'x-fa fa-home',
                children: [{
                    text: 'Messages',
                    iconCls: 'x-fa fa-inbox',
                    leaf: true
                }, {
                    text: 'Archive',
                    iconCls: 'x-fa fa-database',
                    children: [{
                        text: 'First',
                        iconCls: 'x-fa fa-sliders-h',
                        leaf: true
                    }, {
                        text: 'No Icon',
                        iconCls: null,
                        leaf: true
                    }]
                }, {
                    text: 'Music',
                    iconCls: 'x-fa fa-music',
                    leaf: true
                }, {
                    text: 'Video',
                    iconCls: 'x-fa fa-film',
                    leaf: true
                }]
            }, {
                text: 'Users',
                iconCls: 'x-fa fa-user',
                children: [{
                    text: 'Tagged',
                    iconCls: 'x-fa fa-tag',
                    leaf: true
                }, {
                    text: 'Inactive',
                    iconCls: 'x-fa fa-trash-alt',
                    leaf: true
                }]
            }, {
                text: 'Groups',
                iconCls: 'x-fa fa-users',
                leaf: true
            }, {
                text: 'Settings',
                iconCls: 'x-fa fa-wrench',
                children: [{
                    text: 'Sharing',
                    iconCls: 'x-fa fa-share-alt',
                    leaf: true
                }, {
                    text: 'Notifications',
                    iconCls: 'x-fa fa-flag',
                    leaf: true
                }, {
                    text: 'Network',
                    iconCls: 'x-fa fa-signal',
                    leaf: true
                }]
            }]
        }
    }






  var menu = [
    { text: 'Home', hash: 'home', iconCls: 'x-fa fa-home', leaf: true },
    { text: 'About', hash: 'about', iconCls: 'x-fa fa-question', leaf: true}
  ];

  var treeStore = Ext.create('Ext.data.TreeStore', {
    rootVisible: true,
    root: {
        text: 'All',
        hash: 'all',
        iconCls: 'x-fa fa-home',
        leaf: false,
        childern: menu
    }
  })

  console.log(treeStore)

  var o = {
    xtype: 'treelist',
    height: 300,
    expanderFirst: false,
    expanderOnly: false,
    //store: navItems,
    renderTo: document.getElementById('route')
  }
  var treelist = Ext.create(o)



  treelist.setStore(navItems);


})