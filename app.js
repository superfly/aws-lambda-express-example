'use strict'
const express = require('express')
const getRawBody = require('raw-body')
const contentType = require('content-type')
let app = express()

app.set('view engine', 'ejs');

app.all('*', (req, res, next) => {
  const reqContentType = req.headers['content-type'] || 'text/plain'
  const encoding = contentType.parse(reqContentType).parameters.charset

  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb',
    encoding: encoding
  }, function (err, string) {
    if (err) return next(err)
    req.textBody = string.toString()
    res.render('index', {req: req})
  })
})

app.use((err, req, res, next)=> {
  res.send(err)
})

module.exports = app // export your app so aws-serverless-express can use it