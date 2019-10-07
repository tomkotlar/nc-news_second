const {
  fetchArticleById,
  updateArticleVote,
  insertArticleComment,
  fetchComentsForArticleId,
  fetchArticles
} = require("../models/articles-model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params; 
  fetchArticleById(article_id)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};


exports.patchArticleVote = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  updateArticleVote(inc_votes, article_id)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};


exports.postArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  insertArticleComment(req.body, article_id)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};


exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params; 
  const { sort_by, order_by } = req.query; 

    const regex = /\d+/gm
    
    if (!regex.test(article_id)) {
      return next({  status:400, msg: 'bad request' })
    }

    const article = fetchArticleById(article_id)
    const comments = fetchComentsForArticleId(article_id, sort_by, order_by)
    Promise.all([article, comments])
      .then(([article, comments]) => {
        if (article[0].comment_count === '0') {
          res.status(200).send({comments: [ ] })
        } else {
          res.status(200).send({comments})
        }
        return comments
      })
      .catch(next)
};


exports.getArticles = (req, res, next) => {
  const { sort_by, order_by, author, topic } = req.query;
  fetchArticles(sort_by, order_by, author, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

