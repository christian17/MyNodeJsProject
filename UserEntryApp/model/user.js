var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    user_no    : String,
    name       : String,
    email      : String,
    birthday   : Date
});

var User = mongoose.model( 'User', UserSchema );
module.exports = User;