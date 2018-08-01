
const express = require('express');
const router = express.Router();

// Routes
const employerRoute = require('./routes/employers');



router.use('/employer', employerRoute);


module.exports = router;