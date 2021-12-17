const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: String,
    password: {
        type: String,
        minlength: 6
    }
});

userSchema.pre('save', function(next) {
    bcrypt.genSalt(10)
        .then((salt) => {
            return bcrypt.hash(this.password, salt)
        })
        .then((hashedPassword) => {
            this.password = hashedPassword;
        })
        .catch((err) => console.log('Failed to hash the user\' password', +err));
});


const user = mongoose.model('User', userSchema);

module.exports = user;