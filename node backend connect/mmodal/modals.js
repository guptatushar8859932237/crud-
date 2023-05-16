const mongoose =require('mongoose')

const userSchema= mongoose.Schema({


    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

const getdata=mongoose.model('sanchitsignup',userSchema)

module.exports=getdata;