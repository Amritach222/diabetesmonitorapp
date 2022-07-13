const {createForgotPassword,createMatchOTP,createNewPassword} =require("./recovery.controller")

const router=require('express').Router();
router.put("/",createForgotPassword);
router.put('/createMatchOTP',createMatchOTP);
router.post('/createNewPassword',createNewPassword);

module.exports=router;