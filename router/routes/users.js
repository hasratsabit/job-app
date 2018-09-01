
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const authenticate = require('../../middlewares/authenticate');
const _ = require('lodash');

// Creare new user
router.post('/', (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    location: req.body.location,
    userCategory: req.body.userCategory,
    email: req.body.emailGroup.email,
    // email: req.body.email,
    password: req.body.password
  });

  user.save().then(() => {
    res.json({ success: true, message: `Your account has been successfully created.`})
  }).catch((err) => {
    res.json({ success: false, message: `Error occurred: ${err}`});
  })
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if(!user) {
      res.json({ success: false, message: `The username "${req.body.username}" was not found.`});
    } else {
      const validPassword = user.comparePassword(req.body.password);
      if(!validPassword) {
        res.json({ success: false, message: 'Password do not match'});
      } else {
        const token = await user.generateAuthToken();
        const userData = { _id: user._id, userCategory: user.userCategory };
        res.json({ success: true, token, data: userData, message: `You are successfully logged in.`});
      }
    }
  } catch(err) {
    res.json({ success: false, message: `Error occurred ${err}`});
  }
});



// Get Single User
router.get('/profile', authenticate, async (req, res) => {
  try {
    const id = req.user._id;
    const singleUser = await User.findById({_id: id}).select('name email username location');
    res.json({ success: true, user: singleUser });
  } catch (err) {
    res.json({ success: false, message: `Error occurred: ${err}`});
  }
})


module.exports = router;