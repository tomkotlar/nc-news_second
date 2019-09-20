const { updateComment, removeComment } = require("../models/comments-model");

exports.patchComment = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  updateComment(comment_id, inc_votes)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};


exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params; 
  removeComment(comment_id)
    .then(comment => {
      res.sendStatus(204);
    })
    .catch(next);
};
