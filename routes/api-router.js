const apiRouter = require("express").Router();
const { topicRouter } = require("./topics-router");
const { usersRouter } = require("./users-router");
const { articlesRouter } = require("./articles-router");
const { commentsRouter } = require("./comments-router");

apiRouter.use("/topics", topicRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
