const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const CollegeSchema = new mongoose.Schema({
    college_name: String, 
    short_name: String, 
    college_code: String, 
    other_name: String, 
    eshtablish: String, 
    college_type: String, 
    undertaking: String, 
    affiliation: String, 
    accreditation: String, 
    principle: String,

    address: String, 
    landmark: String, 
    city: String, 
    district: String, 
    state: String, 
    country: String, 

    email: String, 
    email2: String,
    phone: String,
    website_url: String, 
    website_display: String, 
    
    course_type: String,
    slug: { type: String, slug: "college_name" }
});
module.exports = mongoose.model('College',CollegeSchema);
