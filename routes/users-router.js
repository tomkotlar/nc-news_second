const usersRouter = require("express").Router();
const { getUsername } = require("../controllers/users-controller");

const { status405 } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(getUsername)
  .all(status405);

module.exports = { usersRouter };
