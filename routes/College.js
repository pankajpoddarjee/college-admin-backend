var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var College = require('../models/College');

/* GET ALL COLLEGES */
router.get('/', async function(req, res, next) {
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);

        const skip = (page -1) * size;

        const total = await College.countDocuments();
        const collegeData = await College.find().skip(skip).limit(size);

        res.json({
            records: collegeData,
            total,
            page, 
            size
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

/* SAVE COLLEGES */
router.post('/',async function(req, res, next) {
    if(req.body.college_name && req.body.address){
        const data = req.body;
        const doc = {
            
            college_name: data.college_name, 
            short_name: data.short_name, 
            college_code: data.college_code, 
            other_name: data.other_name, 
            eshtablish: data.eshtablish, 
            college_type: data.college_type, 
            undertaking: data.undertaking, 
            affiliation: data.affiliation, 
            accreditation: data.accreditation, 
            principle: data.principle,

            address: data.address, 
            landmark: data.landmark, 
            city: data.city, 
            district: data.district, 
            state: data.state, 
            country: data.country, 

            email: data.email, 
            email2: data.email2,
            phone: data.phone,
            website_url: data.website_url, 
            website_display: data.website_display, 
            
            course_type: data.course_type
        };
        try {
            let college_ins = new College(doc);
            let result = await college_ins.save();
            if(result){
                res.send({
                success: true,
                message: "College insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "College data not inserted"
                });
            }
        } catch(error) {
            console.log(error)
            res.status(400).json(error)
        }
    }else{
        res.send({
            success: false,
            message: "Please input required field"
        });
    }
});

/* GET ALL PRODUCTS */
router.get('/all', async function(req, res, next) {   
    try { //alert("sdsd");
        const result = await College.find({});

        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

module.exports = router;