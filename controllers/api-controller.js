const { fetchEndpoints } = require("../models/api-model");

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints()
    .then(endpointJSON => {
      res.status(200).json(JSON.parse(endpointJSON));
    })
    .catch(next);
};
