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
      creator: req.user.username
    })

    const data = await job.save();
    res.json({ success: true, message: 'Job Successfully created.'});
  } catch (err) {
    res.json({ success: false, message: `Error occurred: ${err}`});
  }
});


// Get Jobs By Creators
router.get('/creator', authenticate, async (req, res) => {
  try {
    const jobs = await Job.find({creator: req.user.username });
    if(!jobs) {
      res.json({ success: false, message: `No jobs found.`});
    } else {
      res.json({ success: true, jobs: jobs });
    } 
  } catch (err) {
    res.json({ success: true, message: `Error occurred ${err}`});
  }
});

// Get Single Job
router.get('/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
    if(job) {
      res.json({ success: true, job: job });
    } else {
      res.json({ success: false, message: "Job was not found."});
    }
  } catch (err) {
    res.status(401).json({ success: false, message: `Error occured: ${err}`});
  }
})

// Edit Job
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const job = await Job.findOne({_id: req.params.id});
    if(job.creator !== req.user.username) {
      res.json({ success: false, message: "You are not authorized to delete this job."});
    } else {
      await job.remove();
      res.json({ success: true, message: "Listed job has been deleted."});
    }
  } catch (err) {
    res.json({ success: false, message: `Error occurred: ${err}`});
  }
});



module.exports = router;