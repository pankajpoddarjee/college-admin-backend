var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CourseType = require('../models/CourseType');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   debugger;
    try {
        const CourseTypeData = await CourseType.find({});
        
        res.json({
            records: CourseTypeData
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});



module.exports = router;