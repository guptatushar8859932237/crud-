const express = require('express')
const {mydata,updatedata ,loginhash,signupdata,emplodata, employeeGet,getDataById,updategetdata,handledelete} = require('../controllerer/controller')
const router= express.Router();

router.get('/getdata',mydata)
router.post('/signup',signupdata)
router.put('/update',updatedata)
// router.post('/login', loginData)
router.post('/login',loginhash)
router.post('/admin',emplodata)
router.get('/get',employeeGet)
router.get('/getdatabyid/:id',getDataById)
router.put('/updatemp',updategetdata)
router.delete('/delete/:id',handledelete)
module.exports=router;