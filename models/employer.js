const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;


const EmployerSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  username: { type: String, required: true, unique: true, minlength: 5, maxlength: 30 },
  companyName: { type: String, required: true, minlength: 3, maxlength: 30  },
  companySize: { type: Number, required: true },
  email: { type: String, required: true, unique: true, minlength: 3, maxlength: 30 },
  password: { type: String, required: true, minlength: 8, maxlength: 30  }
});

const Employer = mongoose.model('Employers', EmployerSchema);
module.exports = Employer;