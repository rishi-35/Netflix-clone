const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    searchHistory:{
        type:Array,
        default:[]
    },
})
const User=mongoose.model('User',userSchema);

module.exports=User;