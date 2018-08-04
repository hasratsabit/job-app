
const express = require('express');
const router = express.Router();
const Employer = require('../../models/employer');
const _ = require('lodash');


router.post('/', (req, res) => {
  const employer = new Employer({
    name: req.body.name,
    username: req.body.username,
    companyName: req.body.companyName,
    companySize: req.body.companySize,
    email: req.body.emailGroup.email,
    password: req.body.password
  });

  employer.save().then(() => {
    return employer.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).json({ success: true, message: `Your account has been successfully created.`})
  }).catch((err) => {
    res.json({ success: false, message: `Error occurred: ${err}`});
  })
});


router.post('/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['username', 'password']);
    const user = await Employer.findByCredentials(body.username, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).json({ success: true, message: 'Successfully logged in.'});
  } catch(err) {
    res.json({ success: false, message: `Error occurred: ${err}`});
  }
})


module.exports = router;