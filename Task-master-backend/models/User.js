const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const { taskSchema } = require(__dirname + '/Task.js');

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    tasks: [taskSchema]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);