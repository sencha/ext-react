let rand = 37;
const companies = ['Google', 'Apple', 'Dell', 'Microsoft', 'Adobe'],
    countries = ['Belgium', 'Netherlands', 'United Kingdom', 'Canada', 'United States', 'Australia'],
    persons = ['John', 'Michael', 'Mary', 'Anne', 'Robert'];
    
export function randomItem(data) {
    const k = rand % data.length;

    rand = rand * 1664525 + 1013904223;
    rand &= 0x7FFFFFFF;
    return data[k];
};
export function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime() ));   
}

export function generateData(items=500) {
    const data = [];

    for(let i=0; i<items; i++) {
        data.push({
            company:    randomItem(companies),
            country:    randomItem(countries),
            person:     randomItem(persons),
            date:       randomDate(new Date(2012, 0, 1), new Date()),
            value:      Math.random() * 1000 + 1,
            quantity:   Math.floor(Math.random() * 30 + 1)
        });
    }

    return data;
}