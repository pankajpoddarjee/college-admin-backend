const mongoose = require("mongoose");



const CourseTypeSchema = new mongoose.Schema({
    course_type_name:String,
    short_name:String
});
module.exports = mongoose.model('coursetypes',CourseTypeSchema);
