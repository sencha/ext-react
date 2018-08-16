export const outerData = [
    {provider: 'Amazon', usage: 370, type: 'public'},
    {provider: 'Azure', usage: 120, type: 'public'},
    {provider: 'TB', usage: 80, type: 'public'},
    {provider: 'Telstra', usage: 50, type: 'public'},
    {provider: 'VMWare', usage: 380, type: 'private'}
];

export const innerData = Object.values(
    outerData
        .sort((a, b) => a.type === b.type ? 0 : -1)
        .reduce((dataMap, item) => {
            let name = item['type'],
                value = dataMap[name];

            if(!value) {
                dataMap[name] = {
                    type: name,
                    usage: item.usage
                };
            } else {
                value.usage += item.usage;
            }
            return dataMap;
        }, {})
);