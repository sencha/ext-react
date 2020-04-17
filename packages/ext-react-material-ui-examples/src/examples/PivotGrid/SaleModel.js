const regions = {
    "Belgium": 'Europe',
    "Netherlands": 'Europe',
    "United Kingdom": 'Europe',
    "Canada": 'North America',
    "United States": 'North America',
    "Australia": 'Australia'
};

export default Ext.define(null, {
  extend: 'Ext.data.Model',
  fields: [
    {name: 'id',        type: 'int'},
    {name: 'company',   type: 'string'},
    {name: 'country',   type: 'string'},
    {name: 'person',    type: 'string'},
    {name: 'date',      type: 'date', dateFormat: 'c'},
    {name: 'value',     type: 'float'},
    {name: 'quantity',  type: 'float'},
    {
      name: 'year',
      calculate: function(data){
        return parseInt(Ext.Date.format(data.date, "Y"), 10);
      }
    },
    {
      name: 'month',
      calculate: function(data){
        return parseInt(Ext.Date.format(data.date, "m"), 10) - 1;
      }
    },
    {
      name: 'continent',
      calculate: function(data){
        return regions[data.country];
      }
    }
  ]
})