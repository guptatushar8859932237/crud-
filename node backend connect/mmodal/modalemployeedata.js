const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    
    },
    contact:{
        type:String,
        required:true
    
    },
    address:{
        type:String,
        required:true
    
    },
    department:{
        type:String,
        required:true
    
    }
})
const userData= mongoose.model('employedata' ,userschema )
module.exports= userData