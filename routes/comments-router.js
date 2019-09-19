const commentsRouter = require('express').Router()
const {patchComment, deleteComment} = require('../controllers/comments-controller')

const {status405} = require('../errors/index')

commentsRouter.route('/:comment_id')
                .patch(patchComment)
                .delete(deleteComment)
                .all(status405)

module.exports = {commentsRouter}