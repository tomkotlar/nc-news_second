const connection = require("../db/connection");

exports.fetchArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .count({ comment_count: "comments.article_id" })
    .then(res => {
      if (!res.length)
        return Promise.reject({ status: 404, msg: "route not found" });
      else return res;
    });
};

exports.updateArticleVote = (newVote, id) => {
  return (
    connection("articles")
      .where("article_id", id)
      .increment("votes", newVote)
      .returning("*")
      .then(res => {
        if (!res.length)
          return Promise.reject({ status: 404, msg: "route not found" });
        else return res;
      })
  );
};

exports.insertArticleComment = ({ body, username }, articleID) => {
  if (!body && !username)
    return Promise.reject({ status: 400, msg: "bad request" });

  return connection
    .insert({
      body: body,
      article_id: articleID,
      author: username
    })
    .into("comments")
    .returning("*");
};

exports.fetchComentsForArticleId = ( article_id, sort_by = "created_at",  order_by = "desc" ) => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by, order_by)
    .then(res => {
      if (!res.length)
        return Promise.reject({ status: 404, msg: "route not found" });
      else return res;
    });
};

exports.fetchArticles = (sort_by = "created_at", order_by = "desc", author, topic) => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "comments.article_id" })
    .orderBy(sort_by, order_by)
    .modify((queryData) => {
      if (author) queryData.where('articles.author', author)
      if (topic) queryData.where('articles.topic', topic)
      else queryData
    })
};
