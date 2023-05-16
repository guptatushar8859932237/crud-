const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/snchit',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
).then(()=>{
    console.log("connection success")
}).catch("data does not connect")

module.exports=mongoose;
