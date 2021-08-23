
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
    ci:String,
    name:String,
    date:String,
    department:String,
    problemDescription:String,
    toolName:String,
    toolNumber:Number,
    lastDate:String,
    status:String,
},{timestamps:true});
module.exports = mongoose.model("Report",ReportSchema);;