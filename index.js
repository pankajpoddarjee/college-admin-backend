//const http  = require("http");
const express = require("express");
const cors  = require("cors");
const jwt = require("jsonwebtoken");


const jwtKey ="poddar";

const PORT = process.env.PORT || 4000;

require("./config");

const User = require("./models/User");
const College = require("./models/College");
const collegeRoutes = require('./routes/College');
const userRoutes = require('./routes/User');
const courseTypeRoutes = require('./routes/CourseType');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/course-type', courseTypeRoutes);
app.use('/college', collegeRoutes);
app.use('/user', userRoutes);

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



app.get('/notice-list',async(req,res, next)=>{
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