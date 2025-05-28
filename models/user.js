const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
});

userSchema.plugin(passportLocalMongoose); //It automatically adds username and password fields to the schema and provides methods for authentication.

module.exports = mongoose.model('User', userSchema);