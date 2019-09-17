const {fetchUserByUsername} = require('../models/users-model')


exports.getUsername = (req, res, next) => {
   // console.log(req.body, req.params, req.query, req.method)
    const {username} = req.params
    fetchUserByUsername(username)
        .then((username) => {
            res.status(200).send({user: username[0]})
        })
        .catch(next)
}