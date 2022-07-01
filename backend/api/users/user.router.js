const {createUser,loginUser, createUserDetails,creategetuser,creategetid,creategetUserdetails,createuserValidation}=require('./user.controller')
const router=require('express').Router();

router.post("/",createUser);
router.get("/userValidation",createuserValidation);
router.post("/login",loginUser);
router.post("/userDetails",createUserDetails)
router.put("/getuser",creategetuser)
router.put("/getUserid",creategetid)
router.put("/getUserdetails",creategetUserdetails)
module.exports=router;