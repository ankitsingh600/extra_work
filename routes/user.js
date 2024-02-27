const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../schemas/user")


const router = express.Router();

router.post("/signup", async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    try{
        const user = new User({
            username:req.body.username,
            password:hashedPassword,
            apikey:req.body.apikey,
        })
       await user.save()
       res.status(201).json({"message":"User created successfully"})
    }
    catch (error){
        console.log(error)
    }
})

router.post("/login", async (req,res)=>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({username:username})
        if (!user){
            return res.status(401).json({error:"User not found"})
        }
        const isPwdValid = await bcrypt.compare(password,user.password)
        if (!isPwdValid){
            return res.status(403).json({error:"Not authenticated"})
        }
    
        const token = jwt.sign({userId:user._id},"self", {expiresIn:"1h"});
        return res.status(200).json({token})
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
    }
})

router.post("/preference",async (req,res)=>{
    try{
        const user = await User.findOne({})
        
    }
    catch (error){
        console.log(error)
    }
})

module.exports = router
