const usersRouter = require('express').Router()
const {getUsername} = require('../controllers/users-controller')

usersRouter.route('/:username').get(getUsername)

module.exports = {usersRouter}