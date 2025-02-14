const User = require("../models/user.models");
const bcryptjs =require("bcryptjs");
const generateTokenAddCookie = require("../utils/generateToken");
const res = require("express/lib/response");

// login func 
async function login(req,res){
    try{

        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({sucess:false,message:"All the fields required"});
        }

        const user= await User.findOne({email:email});
        if(!user)
            return res.status(400).json({sucess:false,message:"Invalid Creadentials"});

    const isValid=bcryptjs.compare(password,user.password)

    if(!isValid)
        return res.status(400).json({sucess:false,message:"Invalid Creadentials"});
    
    generateTokenAddCookie(user._id,res);
    
    res.status(201).json({sucess:true, user:{
        ...user._doc,
        password:""
    }})
}
catch(err){
    console.log("error in login auth.controlers"+err);
    return  res.status(500).json({sucess:false,message:"Internal-Server error"})
}

}

// logout func 
async function logout(req,res) {
    try{
        res.clearCookie('jwt-netflix')
        return res.status(200).json({sucess:true,message:"logged Out Successfully"})
    }
    catch(err){
        console.log("error in logout Controller"+ err.message);
        return res.status(500).json({sucess:false,message:"Internal-Server Error"});
    }
   
}

// signup fuc 
async function signUp(req,res) {
    try{

        
        const{username,password,email}=req.body;
        if(!username || !password || !email){
            res.status(400).json({sucess:false, message:"all the fields required"})
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if(!emailRegex.test(email)){
            return res.status(400).json({sucess:false, message:"Enter valid Email"})
    }
    if(password.length<6){
        return res.status(400).json({sucess:false, message:"password length should be greater then 6"})
    }
    
    let user=await User.findOne({email:email});
    if(user){
        return res.status(400).json({sucess:false, message:"Email already exists."})
    }
    user=undefined;
    user=await User.findOne({username:username});
    if(user){
        return res.status(400).json({sucess:false, message:"Username already exists."})
    }
    
    const salt= await bcryptjs.genSalt(10);
    const hashedPassword= await bcryptjs.hash(password,salt);

    const images=['/avatar1.jpg','/avatar2.jpg','/avatar3.jpg',]
    const img=images[Math.floor(Math.random()*images.length)]
    
    const newUser= new User({
        username,
        email,
        password:hashedPassword,
        image:img
    })
    
    generateTokenAddCookie(newUser._id,res);

    await newUser.save()
    res.status(201).json({sucess:true, user:{
        ...newUser._doc,
        password:""
    }})
}
catch(err){
    console.log("error in signup auth.controlers"+err);
   return  res.status(500).json({sucess:false,message:"Internal-Server error"})
}

}
 async function authCheck(req,res) {
    try {
        return  res.status(200).json({sucess:true, user:req.user});
    } catch (error) {
        console.log("Error in auth.controlers.js"+error.message);
        return res.status(500).json({sucess:false,message:"Internal-Server-Error"});
    }
 }
module.exports={
    login,
    logout,
    signUp,
    authCheck
}