const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVote,
  postArticleComment,
  getArticleComments,
  getArticles
} = require("../controllers/articles-controller");
const {status405} = require('../errors/index')

articlesRouter
  .route('/')
  .get(getArticles)
  .all(status405)

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVote)
  .all(status405)

articlesRouter  
  .route('/:article_id/comments')
  .post(postArticleComment)
  .get(getArticleComments)
  .all(status405)
module.exports = { articlesRouter };
