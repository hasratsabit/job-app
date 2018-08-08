
const Employer = require('../models/employer');


module.exports = (findEmployer) => {

    const findByUsername = (username) => {
        return Employer.findOne({username: username}).then(user => {
            if(!user) {
                return false;
            }
            return user;
        })
    }
}