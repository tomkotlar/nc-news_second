const {fetchEndpoints} = require('../models/api-model')

exports.getEndpoints = (req, res, next) => {
   //console.log(req.body, req.params,req.query, req.method )
   fetchEndpoints() 
    .then((endpointJSON ) => {
        res.status(200).json(JSON.parse(endpointJSON))
    })
    .catch(next)
}