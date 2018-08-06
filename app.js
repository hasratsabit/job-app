
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('./db/mongoose');

const mainRoute = require('./router/index');

const port = process.env.PORT || 3000;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET, OPTIONS");
    return res.status(200).json({});
  }
  next();
  });


// ==========================================================
// 		 									MIDDLEWARES
// ==========================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/', mainRoute);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
