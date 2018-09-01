
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const generateAuthToken = function() {
  let user = this;
  return jwt.sign({_id: user._id.toHexString(), username: user.username}, 'secret').toString();
}


const findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'secret');
  } catch(err) {
    return Promise.reject(err);
  }

  return User.findOne({
    '_id': decoded._id,
    'username': decoded.username
  })
}


// const removeToken = function(token) {
//   let user = this;
//   return user.update({
//     $pull: {
//       tokens: {token}
//     }
//   })
// }


module.exports = {
  generateAuthToken,
  findByToken
}