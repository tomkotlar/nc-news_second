
exports.status404 = (req, res, next) => {
    res.status(404).send({msg: 'route not found'})
}
exports.custom400 = (err, req, res, next) => {
    if (err.status) 
    res.status(err.status).send({msg: err.msg})
    else next(err)
}

 exports.status400 = (err, req, res, next) => {
    res.status(400).send({msg: err.msg || 'bad request'} )

    
 }