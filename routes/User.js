var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');

router.get('/', async function(req, res, next) {
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);

        const skip = (page -1) * size;

        const total = await User.countDocuments();
        const userData = await User.find().skip(skip).limit(size);

        res.json({
            records: userData,
            total,
            page, 
            size
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

module.exports = router;