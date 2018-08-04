const mongoose = require('mongoose');

mongoose.connect('mongodb://hasratsabit:Lima1234@ds018248.mlab.com:18248/job-app', { useNewUrlParser: true}, (err) => {
  if(err) {
    return console.log(`Error occurred starting the database ${err}`);
  }
  console.log(`Database successfully connected.`);
});

module.exports = mongoose;