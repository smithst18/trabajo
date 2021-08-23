//mongoose que sirve para hacer modelos
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    password: String, 
    ci:String,
    permise: Boolean,
},{
    timestamps:true
});
module.exports = mongoose.model("User",UserSchema);