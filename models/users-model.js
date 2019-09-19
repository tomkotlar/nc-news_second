const connection = require("../db/connection");

exports.fetchUserByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .then(response => {
      if (!response.length ) {
       return Promise.reject({status: 404, msg: 'route not found' })
      } else {
        return response
      }
    })
};
