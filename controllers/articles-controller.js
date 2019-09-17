const {fetchArticlesById} = require('../models/articles-model')

exports.getArticlesById = (req, res, next) => {
   // console.log(req.body, req.params, req.query, req.method)
    const {article_id} = req.params //{ article_id: '1' } 
    fetchArticlesById(article_id)
        .then((article) => {
            //console.log()
            res.status(200).send({article})
        })
        .catch(next)
}