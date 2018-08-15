        const nextValue = (prev, min=0, max=20, delta=3) => {
    delta = Ext.Number.randomInt(-delta, delta);

    return isNaN(prev) ? Ext.Number.randomInt(min, max) : Ext.Number.constrain(prev+delta, min, max);
}

let startTime;

export default function addNewData(chart, store, second=1000) {
    //Added cmp to access component attributes in ext-react16 [revisit]
    const xAxis = chart.cmp.getAxes()[1],
        visibleRange = 10000,
        count = store.getCount();

    if(count > 0) {
        let lastRecord = store.getAt(count-1),
            xValue = lastRecord.get('xValue') + second;

        if(xValue - startTime > visibleRange) {
            startTime = xValue - visibleRange;
            xAxis.setMinimum(startTime);
            xAxis.setMaximum(xValue);
        }

        store.add({
            xValue: xValue,
            metric1: nextValue(lastRecord.get('metric1')),
            metric2: nextValue(lastRecord.get('metric2'))
        });
    } else {
        //Added cmp to access component attributes in ext-react16 [revisit]
        chart.cmp.animationSuspended = true;
        startTime = Math.floor(Ext.Date.now() / second) * second;

        xAxis.setMinimum(startTime);
        xAxis.setMaximum(startTime + visibleRange);

        store.add({
            xValue: startTime,
            metric1: nextValue(),
            metric2: nextValue()
        });
       //Added cmp to access component attributes in ext-react16 [revisit]
        chart.cmp.animationSuspended = false;
    }
}