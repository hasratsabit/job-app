const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

const {findByCredentials, generateAuthToken, findByToken, removeToken} = require('../logic/token');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  username: { type: String, required: true, unique: true, minlength: 5, maxlength: 30 },
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
UserSchema.methods.generateAuthToken = generateAuthToken;
UserSchema.statics.findByToken = findByToken;
UserSchema.statics.findByCredentials = findByCredentials;
UserSchema.methods.removeToken = removeToken;


// Hashing Password: We use regular function for 'this' support.
UserSchema.pre('save', function(next) {
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
 
 


const User = mongoose.model('Users', UserSchema);
module.exports = User;