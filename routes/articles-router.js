const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVote,
  postArticleComment,
  getComments
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVote);

articlesRouter  
  .route('/:article_id/comments')
  .post(postArticleComment)
  .get(getComments)

module.exports = { articlesRouter };
