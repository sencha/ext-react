const employees = [
        'Alex',
        'Kevin',
        'Nige',
        'Phil',
        'Don',
        'Ross',
        'Vitaly'
    ],
    days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
    ],
    getRandomInt = (min, max) => Math.floor(Math.random() * (max-min+1)) + min,
    randomItem = data => {
        return data[getRandomInt(0, data.length-1)];
    }

export default function refreshRandomData(size=100) {
    const data = [],
        delta = 20 + Math.floor(Math.random() * 260);
    
    for(let i=0; i<size; i++) {
        const day = randomItem(days);
        data.push({
            employee: randomItem(employees),
            dayNumber: Ext.Array.indexOf(days, day),
            day,
            sales: 20 + Math.floor(Math.random() * delta)
        });
    }
    
    return data;
};