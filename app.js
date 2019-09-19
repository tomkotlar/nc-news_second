const express = require('express')
const app = express()
const apiRouter = require('./routes/api-router')
const {status404, custom400, status400, status422, status500} = require('./errors')

app.use(express.json())
app.use('/api', apiRouter)

app.all('/*', status404)
app.use(custom400)
app.use(status400)
app.use(status422)
app.use(status500)
module.exports = app