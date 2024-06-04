var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Notice = require('../models/Notice');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   
    try { //alert("sdsd");
        const NoticeData = await Notice.find({});

        res.json({
            records: NoticeData
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

/* SAVE COLLEGES */
router.post('/',async function(req, res, next) {
    if(req.body.college_name && req.body.course_type){
        const data = req.body;
        const doc = {
            
             
            college_id: data.college_name, 
            course_type_id: data.course_type, 
            notice_type_id: data.notice_type, 
            notice_date: data.notice_date, 
            notice_title: data.notice_title, 
            full_url_link: data.full_url_link,  
            active_status: data.active_status,  
            new_tag: data.new_tag

            
        };
        try {
            let notice_ins = new Notice(doc);
            let result = await notice_ins.save();
            if(result){
                res.send({
                success: true,
                message: "Notice insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "Notice data not inserted"
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



module.exports = router;