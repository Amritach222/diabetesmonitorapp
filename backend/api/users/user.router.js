const {createUser,loginUser, createUserDetails,creategetuser}=require('./user.controller')
const router=require('express').Router();

router.post("/",createUser);
router.post("/login",loginUser);
router.post("/userDetails",createUserDetails)
router.put("/getuser",creategetuser)
module.exports=router;