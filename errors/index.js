
exports.status404 = (req, res, next) => {
    res.status(404).send({msg: 'route not found'})
}
exports.custom400 = (err, req, res, next) => {
    if (err.status) 
    res.status(err.status).send({msg: err.msg})
    else next(err)
}

 exports.status400 = (err, req, res, next) => {
    const codePSQL = ['22P02', '23502']
    if (codePSQL.includes(err.code)) 
    res.status(400).send({msg: err.msg || 'bad request'})
    else next(err)    
    
 }

 exports.status422 = (err, req, res, next) => {
     const codePSQL422 = ['23503']
     if (codePSQL422.includes(err.code))
     res.status(422).send({msg: 'unprocessable entity'})
     else next(err)
  }

  exports.status500 = (req, res) => {
      res.status(500).send({msg: 'internal server error...(We are sorry)'})
  }