//const http  = require("http");
const express = require("express");
const cors  = require("cors");
const jwt = require("jsonwebtoken");


const jwtKey ="poddar";

const PORT = process.env.PORT || 4000;

require("./config");

const User = require("./User");
const College = require("./College");

const app = express();
app.use(cors());
app.use(express.json());


// Get All User Data
app.get('/',async(req,res)=>{
    try {
        let result = await User.find();
        if(result.length > 0){
            res.send({
            success: true,
            message: "Users get successfully",
            users: result,
            });
        }else{
            res.send({
            success: false,
            message: "No user found"
            });
        }
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

app.get('/college-list',async(req,res, next)=>{
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

app.listen(PORT,()=>{
    console.log("server connected with port : "+PORT);
});


// Get Single User Data By ID
app.get('/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        let result = await User.find({"_id": id});
        if(result.length > 0){
            res.send({
            success: true,
            message: "Users get successfully",
            users: result,
            });
        }else{
            res.send({
            success: false,
            message: "No user found"
            });
        }
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

//Insert Data to User Collection
app.post('/signup',async(req,res)=>{
    const data = req.body;
    const doc = {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        password: data.password
    };
    try {
        let user_ins = new User(doc);
        let result = await user_ins.save();
    
        
        if(result){
            result.password = undefined;
            jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({
                    success: false,
                    message: "Something went wrong"
                    });
                }
                res.send({
                success: true,
                message: "Users get successfully",
                users: result,
                token:token
                });
            });
            
        }else{
            res.send({
            success: false,
            message: "No user found",
            users: result,
            });
        }
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

app.post('/login',async(req,res)=>{
    if(req.body.email && req.body.password){
        const data = req.body;
        try {
            let result = await User.findOne(req.body);
            if(result){
                result.password = undefined;
                jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
                    if(err){
                        res.send({
                        success: false,
                        message: "Something went wrong"
                        });
                    }
                    res.send({
                    success: true,
                    message: "Login successfully",
                    users: result,
                    token:token
                    });
                });
                
                
            }else{
                res.send({
                success: false,
                message: "Wrong credential"
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

app.post('/college',async(req,res)=>{
    console.log(req);
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
