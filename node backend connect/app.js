const express = require('express');
const router = require('./rotesss/routess');
const mongoose = require('./databassss/database');
const cors = require('cors');
const app=express();

app.use(cors())
app.use(express.json())
app.use('/',router)

app.listen(5800,()=>{
    console.log('hii this is port 5800')
})
