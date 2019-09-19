const {
  fetchArticleById,
  updateArticleVote,
  insertArticleComment,
  fetchComentsForArticleId,
  fetchArticles
} = require("../models/articles-model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params; //{ article_id: '1' }
  fetchArticleById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

// {
//     article: [
//       {
//         article_id: 1,
//         title: "Living in the shadow of a great man",
//         body: "I find this existence challenging",
//         votes: 100,
//         topic: "mitch",
//         author: "butter_bridge",
//         created_at: "2018-11-15T12:21:54.171Z",
//         comment_count: "13"
//       }
//     ];
//   }

exports.patchArticleVote = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  updateArticleVote(inc_votes, article_id)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

// {
//     article: {
//       article_id: 1,
//       title: 'Living in the shadow of a great man',
//       body: 'I find this existence challenging',
//       votes: 101,
//       topic: 'mitch',
//       author: 'butter_bridge',
//       created_at: '2018-11-15T12:21:54.171Z'
//     }
//   }

exports.postArticleComment = (req, res, next) => {
  // { username: 'rogersop', body: 'i love hip hop' } { article_id: '6' }
  const { article_id } = req.params;
  insertArticleComment(req.body, article_id)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

// {
//     comment: {
//       comment_id: 19,
//       author: 'rogersop',
//       article_id: 6,
//       votes: 0,
//       created_at: 2019-09-17T21:57:19.680Z,
//       body: 'i love hip hop'
//     }
//   }

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params; //'1'
  const { sort_by, order_by } = req.query; // 'age'
  fetchComentsForArticleId(article_id, sort_by, order_by)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

// {
//     comments: [
//       {
//         comment_id: 2,
//         author: 'butter_bridge',
//         article_id: 1,
//         votes: 14,
//         created_at: 2016-11-22T12:36:03.389Z,
//         body: 'The beautiful thing about treasure is that it exists.'
//       }]
// }

exports.getArticles = (req, res, next) => {
  const { sort_by, order_by, author, topic } = req.query;
  fetchArticles(sort_by, order_by, author, topic)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

// {
//     articles: [
//       {
//         article_id: 1,
//         title: 'Living in the shadow of a great man',
//         body: 'I find this existence challenging',
//         votes: 100,
//         topic: 'mitch',
//         author: 'butter_bridge',
//         created_at: 2018-11-15T12:21:54.171Z
//       }]
//     }
