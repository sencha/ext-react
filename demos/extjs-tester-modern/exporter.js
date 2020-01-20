function exporter() {

  var csv = Ext.create('Ext.exporter.text.CSV',{fileName: 'a.txt', title: 'the data', data: 'name:hi'})
  var promise = csv.saveAs();
  console.log(csv)

}