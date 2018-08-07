
const express = require('express');
const router = express.Router();

// Routes
const usersRoute = require('./routes/users');
const jobsRoute = require('./routes/jobs');



router.use('/users', usersRoute);
router.use('/jobs', jobsRoute);


module.exports = router;