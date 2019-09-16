const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data');

// console.log(topicData)

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const topicsInsertions = knex("topics")
        .insert(topicData)
        .returning("*")
      const usersInsertions = knex("users")
        .insert(userData)
        .returning("*")
      
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      //console.log(articleData)
      const formatArticleDate = formatDates(articleData);
      //console.log(formatArticleDate)
      return knex
        .insert(formatArticleDate)
        .into("articles")
        .returning("*")
        //.then(res => console.log(res))
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows);
      //console.log(articleRef)
      const formattedComments = formatComments(commentData, articleRef);
      //console.log(commentData)
      return knex("comments")
        .insert(formattedComments)
        .returning("*")
        //.then(res => console.log(res))
    })
    .then(() => {
      console.log('tabels are ready.....')
    })
  };

  