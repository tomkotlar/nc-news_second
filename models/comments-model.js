const connection = require('../db/connection')

exports.updateComment = (commentId, newVote) => {
  return connection('comments')
    .where("comment_id", commentId)
    .increment('votes', newVote)
    .returning('*')
    .then((res) => {
        //console.log(res)
        if (!res.length) 
        return Promise.reject({status: 404, msg: "route not found"})
        else return res
    })
}

exports.removeComment = (commentId) => {
    return connection('comments')
    .where('comment_id', commentId)
    .del()
    .then((res) => {
        //console.log(res) //0
        if (res === 0)
        return Promise.reject({status: 404, msg: 'route not found'})
        else return res
    })
}