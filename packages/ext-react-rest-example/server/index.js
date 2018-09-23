const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const path = require('path')
const app = express()
const db = require('./db');

require('../webpack.config.js')(process.env).then(config => {
  var port = config.devServer.port
  app.use(webpackDevMiddleware(webpack(config)));
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.listen(port, function () {
    console.log(`ℹ ｢ext｣: Example app listening on port ${port}`);
  })
  app.get('/employees', (req, res) => {
    db.serialize(() => {
      const { page, start, limit, filter, sort } = req.query;
      const criteria = [], params = [];
        if (filter) {
          const filters = {};
          for (let { property, value } of JSON.parse(filter)) {
              filters[property] = value;
          }
          if (filters.firstName) {
            criteria.push('firstName like ?');
            params.push(`%${filters.firstName}%`);
          }
          if (filters.lastName) {
            criteria.push('lastName like ?');
            params.push(`%${filters.lastName}%`);
          }
          if (filters.age) {
            criteria.push('(age >= ? and age <= ?)');
            params.push(filters.age[0]);
            params.push(filters.age[1]);
          }
          if (filters.gender) {
            criteria.push('gender = ?');
            params.push(filters.gender);
          }
          if (filters.text) {
              const nameCriteria = [];
              for (let word of filters.text.split(/\s+/)) {
                nameCriteria.push('(firstName like ? or lastName like ?)');
                params.push(`%${word}%`);
                params.push(`%${word}%`);
              }
              criteria.push(`(${nameCriteria.join(' and ')})`);
          }
        }
        where = criteria.length ? `WHERE ${criteria.join(' and ')}` : '';
        const orderBy = req.query.sort ? ('ORDER BY ' + JSON.parse(sort).map(entry => `${entry.property} ${entry.direction}`).join(', ')) : '';
        const limitClause = limit ? `LIMIT ${start}, ${limit}` : '';
        const sql = `SELECT rowid AS id, * FROM employees ${where} ${orderBy} ${limitClause}`;
        console.log(sql, params);
        db.all(sql, params, (err, rows) => {
          if (err) {
            res.send({ error: err.message })
          } else {
            db.get(`select count(*) as totalRecords from employees ${where}`, params, (err, result) => {
              if (err) {
                res.send({ error: err.message })
              } else {
                res.send({
                  total: result.totalRecords,
                  records: rows
                })
              }
            })
          }
        })
    })
  })
})
