
const express = require('express');
const router = express.Router();
const Employer = require('../../models/employer');


router.post('/', async (req, res) => {
  try {
    const employer = new Employer({
      name: req.body.name,
      username: req.body.username,
      companyName: req.body.companyName,
      companySize: req.body.companySize,
      email: req.body.emailGroup.email,
      password: req.body.password
    })

    await employer.save();
    res.send({ success: true, message: `Congratulation ${req.body.name}. Your account has been successfully created.`});
  } catch (err) {
    res.status(400).send({ success: false, message: `Error occured: ${err}`});
  }
})



module.exports = router;