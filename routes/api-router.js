const apiRouter = require('express').Router()
const {topicRouter} = require('./topics-router')
const {usersRouter} = require('./users-router')

apiRouter.use('/topics', topicRouter)
apiRouter.use('/users', usersRouter)


module.exports = apiRouter