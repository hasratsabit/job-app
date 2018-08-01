const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27018/job-app', (err) => {
  if(err) {
    return console.log(`Error occurred starting the database ${err}`);
  }
  console.log(`Database successfully connected.`);
});

module.exports = mongoose;