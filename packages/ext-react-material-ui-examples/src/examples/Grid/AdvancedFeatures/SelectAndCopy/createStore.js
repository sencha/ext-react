export default function createStore() {
    return Ext.create('Ext.data.Store', {
        fields: [
            { name: 'year', type: 'int' },
            { name: 'jan', type: 'int', allowNull: true },
            { name: 'feb', type: 'int', allowNull: true },
            { name: 'mar', type: 'int', allowNull: true },
            { name: 'apr', type: 'int', allowNull: true },
            { name: 'may', type: 'int', allowNull: true },
            { name: 'jun', type: 'int', allowNull: true },
            { name: 'jul', type: 'int', allowNull: true },
            { name: 'aug', type: 'int', allowNull: true },
            { name: 'sep', type: 'int', allowNull: true },
            { name: 'oct', type: 'int', allowNull: true },
            { name: 'nov', type: 'int', allowNull: true },
            { name: 'dec', type: 'int', allowNull: true }
        ],
        data: createData()
    });
}

function createData() {
    let data = [],
        thisYear = new Date().getYear() + 1900,
        mod = 0x7fffFFFF,
        // return integer [min,max)
        rand = function (min, max) {
            var r = (seed = ((seed * 214013) + 2531011) % mod) / mod; // [0, 1)
            return Math.floor(r * (max - min)) + min;
        },
        seed = 13;

    for (var year = 1900; year <= thisYear; ++year) {
        data.push([
            year, // id
            year,
            rand(-10, 100),
            rand(-10, 100),
            rand(-10, 200),
            rand(-10, 200),
            rand(-10, 200),
            rand(-10, 300),
            rand(-10, 300),
            rand(-10, 300),
            rand(-10, 600),
            rand(-10, 500),
            rand(-10, 200),
            rand(-10, 100)
        ]);
    }

    return data;
}