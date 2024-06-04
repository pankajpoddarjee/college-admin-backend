var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var NoticeType = require('../models/NoticeType');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   debugger;
    try {
        const result = await NoticeType.find({});
        
        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});



module.exports = router;