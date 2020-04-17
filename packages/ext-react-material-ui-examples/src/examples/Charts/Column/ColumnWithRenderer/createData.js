let seed = 1.3;

const random = () => {
    seed *= 7.3;
    seed -= Math.floor(seed);
    return seed;
}

export default function createData(count=9) {
    let record = {
            id: 0,
            g1: 700 * random() + 100,
            g2: 700 * random() + 100,
            g3: 700 * random() + 100,
            g4: 700 * random() + 100,
            g5: 700 * random() + 100,
            g6: 700 * random() + 100,
            name: 'A'
        };
    const data = [record];

    for (let i = 1; i < count; i++) {
        data.push(record = {
            id: i,
            g1: Math.abs(record.g1 + 300 * random() - 140),
            g2: Math.abs(record.g2 + 300 * random() - 140),
            g3: Math.abs(record.g3 + 300 * random() - 140),
            g4: Math.abs(record.g4 + 300 * random() - 140),
            g5: Math.abs(record.g5 + 300 * random() - 140),
            g6: Math.abs(record.g6 + 300 * random() - 140),
            name: String.fromCharCode(65 + i)
        });
    }

    return data;
}