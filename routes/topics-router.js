const topicRouter = require("express").Router();
const { getTopics } = require("../controllers/topics-controller");

const { status405 } = require("../errors/index");

topicRouter
  .route("/")
  .get(getTopics)
  .all(status405);

module.exports = { topicRouter };
