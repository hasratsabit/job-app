const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;


const EmployerSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  username: { type: String, required: true, unique: true, minlength: 5, maxlength: 30 },
  companyName: { type: String, required: true, minlength: 3, maxlength: 30  },
  companySize: { type: Number, required: true },
  email: { type: String, required: true, unique: true, minlength: 3, maxlength: 30 },
  password: { type: String, required: true },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// We don't use the arrow function here, because the keyword doesn't point to the object instance.
EmployerSchema.methods.generateAuthToken = function() {
  let user = this; // Points to the new instance of user created on this schema. 
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString();

  // user.tokens.push({access, token});

  // If not worked.
  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });

}


EmployerSchema.statics.findByCredentials = function(username, password) {
  let User = this;
  
  return User.findOne({username}).then((user) => {
    if(!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          resolve(user);
        }else {
          reject(err);
        }
      })
    })
  })
}


// Hashing Password: We use regular function for 'this' support.
EmployerSchema.pre('save', function(next) {
  let user = this;
   if(user.isModified('password')) {
     bcrypt.genSalt(10, (err, salt) => {
       if(err) return next(err);
       bcryptPassword(salt);
     })
 
     const bcryptPassword = (salt) => {
       bcrypt.hash(user.password, salt, (err, hash) => {
         if(err) return next(err);
         user.password = hash;
         next();
       })
     }
   }else {
     return next();
   }
 })
 
 


 EmployerSchema.methods.comparePassword = function(password) {
   return bcrypt.compare(password, this.password)
 }


const Employer = mongoose.model('Employers', EmployerSchema);
module.exports = Employer;