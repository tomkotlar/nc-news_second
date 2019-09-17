const connection = require('../db/connection')


exports.fetchArticlesById = (id) => {
    return connection
        .select('author', 
        'title',
        'article_id',
        'body',
        'topic',
        'created_at',
        'votes', 'comment_count')
        .from('articles')
        .join('comments.comment_id', )
}




// {
//     article: [
//       {
//         article_id: 1,
//         title: 'Living in the shadow of a great man',
//         body: 'I find this existence challenging',
//         votes: 100,
//         topic: 'mitch',
//         author: 'butter_bridge',
//         created_at: '2018-11-15T12:21:54.171Z'
//       }]
//     }