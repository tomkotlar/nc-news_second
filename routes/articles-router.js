const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVote,
  postArticleComment
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVote);

articlesRouter  
  .route('/:article_id/comments')
  .post(postArticleComment)

module.exports = { articlesRouter };
