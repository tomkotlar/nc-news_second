const apiRouter = require('express').Router()
const {topicRouter} = require('./topics-router')


apiRouter.use('/topics', topicRouter)


module.exports = apiRouter