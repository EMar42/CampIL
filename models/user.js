const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//using passport-local-mongoose for easy treat over : 
// adding username, hash and salt, hashed pass and salt value

const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)