const connection = require("../db/connection");


exports.authorExist = author => {
     if (!author) return author
    return connection
        .select('*')
        .from('users')
        .where({username: author})
        .then(author => {
            if (!author.length) {
                return Promise.reject({status: 404, msg: "Author does not exist"})
            }
            return author
        })
}

exports.topicExist = topic => {
     if (!topic) return topic
    return connection 
        .select('*')
        .from('topics')
        .where({slug: topic})
        .then(topic => {
            if (!topic.length) {
                Promise.reject({status: 404, msg: "Topic does not exist"})
            }
            return topic
        })
}