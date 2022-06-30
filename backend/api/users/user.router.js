const {createUser,loginUser, createUserDetails,creategetuser,creategetuserinfo,updateuserinfo}=require('./user.controller')
const router=require('express').Router();
const multer= require("multer");
const path=require('path');

const storage=multer.diskStorage({
  // This describes where to store our image selected from frontend
  destination:(req,file, cb)=>{
    cb(null,'../../images/userimage')
  },
  // making filename unique
  filename:(req,file,cb)=>{
    console.log(file)
    cb(null,Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({storage:storage})
router.post("/",createUser);
router.post("/login",loginUser);
router.post("/userDetails",createUserDetails);
router.put("/getuser",creategetuser);
router.put("/getprofile",creategetuserinfo);
router.put("/updateuser",updateuserinfo);

module.exports=router;
