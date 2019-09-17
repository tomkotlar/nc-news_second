const connection = require("../db/connection");

exports.fetchUserByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .then(response => {
     // console.log(!response.length) // make suere you check/ the if statment work
      if (!response.length ) {
       return Promise.reject({status: 404, msg: 'route not found' })
      } else {
        return response
      }
    })
};
