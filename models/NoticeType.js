const mongoose = require("mongoose");



const NoticeTypeSchema = new mongoose.Schema({
    notice_type_name:String,
    active_status:String
});
module.exports = mongoose.model('notice_types',NoticeTypeSchema);
