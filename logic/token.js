
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const findByCredentials = function(username, password) {
  let User = this;
  
  return User.findOne({username}).then((user) => {
    if(!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          resolve(user);
        }else {
          reject(err);
        }
      })
    })
  })
}


const generateAuthToken = function() {
  let user = this; // Points to the new instance of user created on this schema. 
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
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
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}


const removeToken = function(token) {
  let user = this;
  return user.update({
    $pull: {
      tokens: {token}
    }
  })
}


module.exports = {
  findByCredentials,
  generateAuthToken,
  findByToken,
  removeToken
}