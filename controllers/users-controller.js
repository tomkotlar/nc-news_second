const { fetchUserByUsername } = require("../models/users-model");

exports.getUsername = (req, res, next) => {
  // console.log(req.body, req.params, req.query, req.method)
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(([user]) => {
        //console.log({user})
      res.status(200).send({ user });
    })
    .catch(next);
};
