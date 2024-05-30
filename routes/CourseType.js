var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CourseType = require('../models/CourseType');
var User = require('../models/User');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   
    try {
        const CourseTypeData = await CourseType.find({});

        res.json({
            records: CourseTypeData
        });
        console.log(CourseTypeData);
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});



module.exports = router;