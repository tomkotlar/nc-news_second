const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVote,
  postArticleComment,
  getArticleComments,
  getArticles
} = require("../controllers/articles-controller");

articlesRouter
  .route('/')
  .get(getArticles)

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVote);

articlesRouter  
  .route('/:article_id/comments')
  .post(postArticleComment)
  .get(getArticleComments)

module.exports = { articlesRouter };
