const express = require('express')
const app = express()
const apiRouter = require('./routes/api-router')
const {status404} = require('./errors')

app.use(express.json())
app.use('/api', apiRouter)

app.all('/*', status404)


module.exports = app