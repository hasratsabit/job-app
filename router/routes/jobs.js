const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Job = require('../../models/job');
const authenticate = require('../../middlewares/authenticate');
const _ = require('lodash');


// Add New Job
router.post('/', authenticate, async (req, res) => {
  try {
    const job = new Job({
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      jobDescription: req.body.jobDescription,
      creator: req.user._id
    })

    const data = await job.save();
    res.json({ success: true, message: 'Job Successfully created.'});
  } catch (err) {
    res.json({ success: false, message: `Error occurred: ${err}`});
  }
});



module.exports = router;