export default function() {
    let data = [],
        increment = Math.PI / 18,
        k = 10,
        a = 0,
        i, ln;

    for (i = 0, ln = 100; i < ln; i++) {
        data.push({
            x: a,
            sin: k * Math.sin(a),
            cos: k * Math.cos(a)
        });
        a += increment;
    }    

    return data;
}