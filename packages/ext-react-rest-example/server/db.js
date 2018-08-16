const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')
const data = require('./data');

db.serialize(() => {
  db.run('CREATE TABLE employees (firstName TEXT, lastName TEXT, gender TEXT, age INTEGER, email TEXT)');

  const stmt = db.prepare('INSERT INTO employees VALUES (?, ?, ?, ?, ?)')

  for (let record of data) {
    stmt.run(record.first_name, record.last_name, record.gender, record.age, record.email);  
  }

  stmt.finalize()
})

module.exports = db;