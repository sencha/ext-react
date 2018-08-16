const fs = require('fs'),
    path = require('path'),
    scheduleFile = path.join('..', 'resources', 'schedule.json'),
    scheduleData = JSON.parse(fs.readFileSync(scheduleFile, 'utf-8'));

const result = scheduleData
.filter(event => event.type !== 'date')
.map(event => Object.assign(event, {
    startDate: new Date(`${event.date} 2016 ${event.start_time}`).toISOString(),
    endDate: new Date(`${event.date} 2016 ${event.end_time}`).toISOString(),
    categoryName: event.type && `${event.type.charAt(0).toUpperCase()}${event.type.slice(1)}`,
    speakerNames: event.speakers && event.speakers.length > 0 && event.speakers.map(s => s.name).join(', ')
})
);

fs.writeFileSync(scheduleFile, JSON.stringify(result, null, 4), 'utf-8');