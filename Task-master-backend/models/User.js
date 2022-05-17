const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const { taskSchema } = require(__dirname + '/Task.js');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    googleId: String,
    facebookId: String,
    token: String,
    tasks: [taskSchema]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


module.exports = mongoose.model('User', userSchema);