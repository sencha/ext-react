export default Ext.define('KitchenSink.model.Company', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        { name: 'name' },
        {
            name: 'phone', 
            validators: [{ 
                type: 'format', 
                matcher: /^\d{3}-?\d{3}-?\d{4}$/,
                message: 'Must be in the format xxx-xxx-xxxx'
            }]
        },
        { name: 'price', type: 'float'},
        { name: 'priceChange', type: 'float' },
        { name: 'priceChangePct', type: 'float' },
        { name: 'priceLastChange', type: 'date', dateReadFormat: 'n/j' },

        // Calculated field. Depends on price value. Adds it to price history.
        // Trend begins with the current price. Changes get pushed onto the end
        {
            name: 'trend',
            calculate: function(data) {
                // Avoid circular dependency by hiding the read of trend value
                const record = data;
                const trend = Array.from(record['trend'] || []);

                trend.push(data.price);

                if (trend.length === 1) {
                    //let's start the trend off with a change
                    trend.push(data.price + data.priceChange);
                }

                if (trend.length > 10) {
                    trend.shift();
                }

                record.trend = trend;

                return trend;
            },
            
            // It's the same array. But we need Model#set to see it as modified so it
            // is flushed to the UI
            isEqual: function() {
                return false;
            }
        },
        
        // Calculated field. Depends on price history being populated.
        {
            name: 'change',
            type: 'float',
            calculate: function(data) {
                var trend = data.trend,
                    len = trend.length;

                return len > 1 ? trend[len - 1] - trend[len - 2] : 0;
            }
        },
        
        // Calculated field. Depends on price history and last change being populated.
        {
            name: 'pctChange',
            type: 'float',
            calculate: function(data) {
                var trend = data.trend,
                    len = trend.length;

                return len > 1 ? (data.change / trend[len - 2]) * 100 : 0;
            }
        },
        
        // Calculated field, recalculated when price changes
        {
            name: 'lastChange',
            type: 'date',
            calculate: function(data) {
                // Signal that we are dependent upon price so we get recaulculated when price changes
                data.price;

                return new Date();
            }
        },
        {name: 'industry'},
        {name: 'desc'},
        // Rating dependent upon last price change performance 0 = best, 2 = worst
        {
            name: 'rating',
            type: 'int',
            calculate: function(data) {
                var pct = data.pctChange;

                return (pct < 0) ? 2 : ((pct < 1) ? 1 : 0);
            }
        }
    ],

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },
        url: '/KitchenSink/Company'
    },

    validators: {
        name: 'presence'
    },

    addPriceTick: function () {
        // Set data, but pass "clean" flag.
        this.set('price', this.generateNewPrice(), {
            dirty: false
        });
    },

    generateNewPrice: function () {
        var newPrice = Math.abs(this.data.price + Ext.Number.randomInt(-2345, 2345) / 100);

        return Math.round(newPrice * 100) / 100;
    }
});

