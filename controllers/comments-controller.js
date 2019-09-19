const {updateComment, removeComment} = require('../models/comments-model')


exports.patchComment = (req, res, next) => {
    //console.log(req.body, req.params, req.query, req.method)
    const{ inc_votes} = req.body 
    const { comment_id } = req.params
    updateComment(comment_id, inc_votes)
        .then((comment) => {
            //console.log({comment})
            res.status(200).send({comment})
        })
        .catch(next)
}

//err => console.log(err)
// {
//     comment: [
//       {
//         comment_id: 2,
//         author: 'butter_bridge',
//         article_id: 1,
//         votes: 15,
//         created_at: 2016-11-22T12:36:03.389Z,
//         body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.'
//       }
//     ]
//   }

exports.deleteComment = (req, res, next) => {
    //console.log(req.body, req.params, req.query, req.method)
   const { comment_id }  = req.params//'7'
   removeComment(comment_id)
        .then((comment) => {
            res.sendStatus(204)
        })
        .catch(next)
} 