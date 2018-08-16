const fns = [
    x => Math.sin(5 * x),
    x => x * x * 2 - 1,
    x => Math.sqrt((1 + x) / 2) * 2 - 1,
    x => x * x * x,
    x => Math.cos(10 * x),
    x => 2 * x,
    x => Math.pow(x, -2),
    x => Math.pow(x, -3),
    x => Math.tan(5 * x)
];

let count = -1;

export default function createData() {
    const data = [],
        fn = fns[++count % fns.length];

    for(let x = -2; x <= 2; x += 0.02) {
        data.push({ x, y: fn(x) });
    }

    return data;
}