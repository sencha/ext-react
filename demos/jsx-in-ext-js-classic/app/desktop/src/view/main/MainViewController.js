Ext.define('jsxInExtJSClassic.view.main.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewcontroller',

  // Simply run setCenterViewXtype, passing the record that describes the center view,
  // and updateCenterViewXtype takes care of the rest.
  config: {
    centerViewXtype: null
  },

  initViewModel: function(vm) {
    var me = this;

    // menuItem can change either because the user selected an item in the NavView, or
    // because the record is named in the URL routing information.
    vm.bind("", me.setCenterViewXtype, me);
  },

  updateCenterViewXtype: function(menuItem) {
    if (!menuItem) return;
    var data = menuItem.data;
    if (!Ext.ClassManager.getByAlias("widget." + data.xtype)) {
      console.log(xtype + " does not exist");
      return;
    }

    var centerview = this.lookup("centerview");

    // Lazily add the view to the center container.
    var child = centerview.getComponent(data.xtype) || centerview.add({ xtype: data.xtype, itemId: data.xtype, heading: data.text });

    centerview.setActiveItem(child);

    this.redirectTo(data.xtype);

    this.getViewModel().set("menuItem", menuItem);
    this.getViewModel().set("heading", data.text);
  },

  routes: {
  ':xtype': {action: 'mainRoute'}
  },

  mainRoute:function(xtype) {
    //var menuview = this.lookup('menuview');
    var navview = this.lookup('navview');
    var menuview = navview.items.items[0]
    var centerview = this.lookup('centerview');
    var exists = Ext.ClassManager.getByAlias('widget.' + xtype);
    if (exists === undefined) {
      alert(xtype + ' does not exist');
      return;
    }
    var node = menuview.getStore().findNode('xtype', xtype);
    if (node == null) {

      centerview.add({ xtype: xtype,  itemId: xtype, heading: xtype });
      centerview.setActiveItem(xtype);
      //menuview.setSelection(node);
      var vm = this.getViewModel();
      vm.set('heading', xtype);
      //console.log('unmatchedRoute: ' + xtype);
      //console.dir(menuview.getStore())

      //return;
    }
    else if (!centerview.getComponent(xtype)) {
      centerview.add({ xtype: xtype,  itemId: xtype, heading: node.get('text') });
      centerview.setActiveItem(xtype);
      menuview.setSelection(node);
      var vm = this.getViewModel();
      vm.set('heading', node.get('text'));
    }

  },

  onMenuViewSelectionChange: function (tree, node) {
    if (node == null) { return }
    var vm = this.getViewModel();
    if (node.get('xtype') != undefined) {
      this.redirectTo( node.get('xtype') );
    }
  },

  onHeaderViewNavToggle: function () {
    var vm = this.getViewModel();
    vm.set('navCollapsed', !vm.get('navCollapsed'));
    //var topPic = this.lookup('topPic');
    var topPic = Ext.getCmp('topPic');
    if (vm.get('navCollapsed') == true) {
      topPic.setData({ src:'resources/desktop/5.jpg', caption:'John Smith', imgStyle: 'imgSmall', height: '100px' });
    }
    else {
      topPic.setData({ src:'resources/desktop/5.jpg', caption:'John Smith', imgStyle: 'imgBig', height: '150px' });
    }

  },

  onHeaderViewDetailToggle: function () {
    var vm = this.getViewModel();
    vm.set('detailCollapsed', !vm.get('detailCollapsed'));
    var detailtoggle = this.lookup('detailtoggle');
    if(vm.get('detailCollapsed') === true) {
      //detailtoggle.setType('prev')
      detailtoggle.setIconCls('x-fa fa-arrow-left')
    }
    else {
      //detailtoggle.setType('next')
      detailtoggle.setIconCls('x-fa fa-arrow-right')
    }
  },

  onToolButtonClicked: function (button) {
    Ext.Msg.show({
      title:'Tool Button',
      closable: false,
      message: button.name + ' tool button was clicked',
      buttons: Ext.Msg.OK,
      icon: Ext.Msg.INFO,
      fn: function(btn) {
        if (btn === 'ok') {
          console.log('ok pressed');
        } else {
          console.log('??? pressed');
        }
      }
    })
  }

});