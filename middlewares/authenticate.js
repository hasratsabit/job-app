
const User = require('../models/user');

const authenticate = (req, res, next) => {
  let token = req.header('authorization');

  User.findByToken(token).then((user) => {
    if(!user) {
      res.json({ success: false, message: 'You must be logged in to see this page.'});
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    res.status(401).json({ success: false, message: err });
  })
}


module.exports = authenticate;