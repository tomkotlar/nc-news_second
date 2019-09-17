const express = require('express')
const app = express()
const apiRouter = require('./routes/api-router')
const {status404, custom400} = require('./errors')

app.use(express.json())
app.use('/api', apiRouter)

app.all('/*', status404)
app.use(custom400)
//app.use(status400)

module.exports = app