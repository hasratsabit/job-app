const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const JobSchema = new Schema({
  jobTitle: { type: String, required: true},
  companyName: { type: String, required: true},
  jobDescription: { type: String, required: true},
  creator: { type: String },
  applicants: { type: Array},
  jobViews: { type: Number, default: 0},
  createdAt: { type: Date, default: Date.now()}
});

const Jobs = mongoose.model('Jobs', JobSchema);
module.exports = Jobs;
