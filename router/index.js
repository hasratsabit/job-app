
const express = require('express');
const router = express.Router();

// Routes
const userRoute = require('./routes/users');



router.use('/users', userRoute);


module.exports = router;