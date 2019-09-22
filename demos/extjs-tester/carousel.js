function carousel() {

  var oRoot = {
    xtype: 'container',
    title: 'root',
    height: '100%',
    layout: 'vbox',
    padding: '10'
  }
  var container = Ext.create(oRoot)

  var o = {
    xtype: 'carousel',
    layout: 'vbox',
    margin: '5 5 5 5',
    flex: '1',
    shadow: true
  }
  var carousel = Ext.create(o)

  Ext.Viewport.add([container])
  container.add(carousel)

  var child01 = Ext.create({
    xtype: 'container', 
    layout: {"type":"vbox", "align": "center", "pack": "center"},
    cls: "card cardLight",
    html:"Swipe left to show the next card..."
  })
  var child02 = Ext.create({
    xtype: 'container', 
    layout: {"type":"vbox", "align": "center", "pack": "center"},
    cls: "card cardLight",
    html:"You can also tap on either side of the indicators."
  })
  var child03 = Ext.create({
    xtype: 'container', 
    layout: {"type":"vbox", "align": "center", "pack": "center"},
    cls: "card cardLight",
    html:"Card #3"
  })
  carousel.insert(0,child01)
  carousel.insert(1,child02)
  carousel.insert(2,child03)

}

  //<ext-container height="100%" layout="vbox" padding="10" fitToParent="true"></ext-container>
  // <ext-carousel layout="vbox" margin="5 5 5 5" flex="1" shadow="true" onready="carousel.readyCarouselHorizontal" >
  //   <ext-container
  //     flex="1"
  //     layout='{"type":"vbox", "align": "center", "pack": "center"}'
  //     cls="card cardLight"
  //     onready="carousel.readyCarouselHorizontalChild"
  //     html="Swipe left to show the next card...">
  //   </ext-container>
  //   <ext-container
  //     flex="1"
  //     layout='{"type":"vbox", "align": "center", "pack": "center"}'
  //     cls="card cardLight"
  //     onready="carousel.readyCarouselHorizontalChild"
  //     html="You can also tap on either side of the indicators.">
  //   </ext-container>
  //   <ext-container
  //     flex="1"
  //     cls="card cardLight"
  //     layout='{"type":"vbox", "align": "center", "pack": "center"}'
  //     onready="carousel.readyCarouselHorizontalChild"
  //     html="Card #3">
  //   </ext-container>
  // </ext-carousel>
  //</ext-carousel>