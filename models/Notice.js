

const mongoose = require("mongoose");
const NoticeSchema = new mongoose.Schema({
    college_id:String,
    course_type_id:String,
    notice_type_id: String,
    notice_date: String,
    notice_title: String,
    full_url_link: String,
    active_status: String,
    new_tag: String,
    publish_lu: String
});
module.exports = mongoose.model('college_notices',NoticeSchema);

