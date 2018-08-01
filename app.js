
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('./db/mongoose');

const mainRoute = require('./router/index');

const port = process.env.PORT || 3000;

app.use(cors());

// ==========================================================
// 		 									MIDDLEWARES
// ==========================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/', mainRoute);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
