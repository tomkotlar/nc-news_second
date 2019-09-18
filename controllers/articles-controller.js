const {
  fetchArticleById,
  updateArticleVote,
  insertArticleComment,
  fetchComentsForArticleId
} = require("../models/articles-model");


exports.getArticleById = (req, res, next) => {
  // console.log(req.body, req.params, req.query, req.method)
  const { article_id } = req.params; //{ article_id: '1' }
  fetchArticleById(article_id)
    .then(article => {
      // console.log( {article})
      res.status(200).send({ article });
    })
    .catch(next);
};

//err => console.log(err)

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
  //console.log(req.body, req.params, req.query, req.method)
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  updateArticleVote(inc_votes, article_id)
    .then(([article]) => {
      //console.log({article})
      res.status(200).send({ article });
    })
    .catch(next);
};
//err => console.log(err)
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
  //console.log(req.body, req.params, req.query, req.method)
  // { username: 'rogersop', body: 'i love hip hop' } { article_id: '6' }
  const { article_id } = req.params;
  insertArticleComment(req.body, article_id)
    .then(([comment]) => {
      //console.log({comment})
      res.status(201).send({ comment });
    })
    .catch(next);
};
//err => console.log(err)

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

exports.getComments = (req, res, next) => {
 // console.log(req.body, req.params, req.query, req.method)
  const { article_id } = req.params; //'1'
  const { sort_by} = req.query // 'age'
  fetchComentsForArticleId(article_id, sort_by)
        .then((comments) => {
     //console.log({comments})
    res.status(200).send({ comments });
  });
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