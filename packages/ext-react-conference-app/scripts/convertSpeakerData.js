const fs = require('fs'),
    path = require('path'),
    https = require('https'),
    avatarPath = path.join('..', 'resources', 'avatars'),
    speakerFile = path.join('..', 'resources', 'speakers.json'),
    speakerData = JSON.parse(fs.readFileSync(speakerFile, 'utf-8'));

const result = speakerData.map(speaker => {
    // Download image file and save it (un-comment on first run when speakers.json contain senchcon URLs)
    const fileName = speaker.avatar_url.match(/\/([^/]*\.(?:png|jpg|jpeg))$/)[1];
    // const avatarFstream = fs.createWriteStream(path.join(avatarPath, fileName));
    // https.get(speaker.avatar_url, response => {
    //     response.pipe(avatarFstream);
    // });

    return Object.assign(speaker, {
        avatar_url: `resources/avatars/${fileName}`,
        sessions: speaker.sessions.map(s => s.id)
    });
});

fs.writeFileSync(speakerFile, JSON.stringify(result, null, 4), 'utf-8');