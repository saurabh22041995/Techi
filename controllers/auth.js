const User = require("../models/user");
const jwt = require('jsonwebtoken'); 
const expressJwt = require('express-jwt');
const { check, validationResult } = require('express-validator');


exports.signup = (req, res) => {

    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err : "Already exist! NOT able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
    
}

exports.signin = (req,res) => {
    const { email,password } = req.body

    User.findOne({ email }, (err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: " User doesn't exist"
            })
        }

        if(!user.autheticate(password)){
            res.status(401).json({
                error: "Email and password do not match"
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        // put token in cookie
        res.cookie("token", token, {expire: new Date()+9999})

        // send res to frontend 
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, name,email,role}})
    })
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You are not Admin, Access Denied"
        })
    }
    next()
}