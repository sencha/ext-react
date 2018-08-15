let seed = 1.3;

const random = () => {
    seed *= 7.3;
    seed -= Math.floor(seed);
    return seed;
};

export default function generateData(count) {
    let record = {
        id: 0,
        g0: 300,
        g1: 700 * random() + 100,
        g2: 700 * random() + 100,
        g3: 700 * random() + 100,
        name: 'Item-0'
    };
    const data = [record];

    for(let i=1; i<count; i++) {
        data.push(record = {
            id: i,
            g0: record.g0 + 30 * random(),
            g1: Math.abs(record.g1 + 300 * random() - 140),
            g2: Math.abs(record.g2 + 300 * random() - 140),
            g3: Math.abs(record.g3 + 300 * random() - 140)
        });
    }

    return data;
}