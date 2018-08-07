const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const JobSchema = new Schema({
  jobTitle: { type: String, required: true},
  companyName: { type: String, required: true},
  jobDescription: { type: String, required: true},
  creator: { type: mongoose.Schema.Types.ObjectId, required: true },
  applicants: { type: Array},
  jobViews: { type: Number, default: 0}
});

const Jobs = mongoose.model('Jobs', JobSchema);
module.exports = Jobs;
