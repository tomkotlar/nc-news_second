const articlesRouter = require('express').Router()
const {getArticlesById} = require('../controllers/articles-controller')

articlesRouter.route('/:article_id').get(getArticlesById)


module.exports = {articlesRouter}