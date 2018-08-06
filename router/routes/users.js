
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const authenticate = require('../../middlewares/authenticate');
const _ = require('lodash');


router.post('/', (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    userCategory: req.body.userCategory,
    email: req.body.emailGroup.email,
    password: req.body.password
  });

  user.save().then(() => {
    res.json({ success: true, message: `Your account has been successfully created.`})
  }).catch((err) => {
    res.json({ success: false, message: `Error occurred: ${err}`});
  })
});


router.post('/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['username', 'password']);
    const foundUser = await User.findByCredentials(body.username, body.password);
    const token = await foundUser.generateAuthToken();
    const userData = { name: foundUser.name, userCategory: foundUser.userCategory, _id: foundUser._id,}
    res.json({ success: true, userData, token, message: 'Successfully logged in.'});
  } catch(err) {
    res.json({ success: false, message: `Error occurred: ${err}`});
  }
});

router.delete('/logout', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.json({ success: true, message: `You are successfully logged out.`});
  } catch(err) {
    res.status(400).json({ success: false, message: `Error occurred: ${err}`});
  }
})


module.exports = router;