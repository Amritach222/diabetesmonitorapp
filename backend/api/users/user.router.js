
const {createUser,loginUser, createUserDetails,creategetuser,creategetuserinfo,getusebyemail,updateuserinfo,creategetid,creategetUserdetails,createuserValidation, updatePassword, deleteAccount,updateReport}=require('./user.controller')
const router=require('express').Router();
const multer= require("multer");
// Careating storage to save images
const storage=multer.diskStorage({
  // This describes where to store our image selected from frontend
  destination:(req,file, cb)=>{
    cb(null,'public/images/')
  },
  // making filename unique
  filename:(req,file,cb)=>{
    console.log(file)
    cb(null,Date.now()+file.originalname)
  }
});
const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png'){
    cb(null,true);
  }
  else{
    cb(null,false)
  }
}
var upload=multer({
  storage:storage,
  // limits:{
  //   fileSize:1024 *1024 *5
  // },
  fileFilter:fileFilter
})

// creating storage to store reports
const pdf_storage=multer.diskStorage({
  // This describes where to store our image selected from frontend
  destination:(req,file, cb)=>{
    cb(null,'public/reports/')
  },
  // making filename unique
  filename:(req,file,cb)=>{
    console.log(file)
    cb(null,Date.now()+file.originalname)
  }
});
//defining filter to store pdf
const pdfFilter=(req,file,cb)=>{
  if(file.mimetype==='/jpeg|jpg|png|gif|pdf/'){
    cb(null,true);
  }
  else{
    cb(null,false)
  }
}
var uploadPDF=multer({
  storage:storage,
  // limits:{
  //   fileSize:1024 *1024 *5
  // },
  fileFilter:fileFilter
})
router.post("/",createUser);
router.get("/userValidation",createuserValidation);
router.post("/login",loginUser);
router.post("/userDetails",createUserDetails);
router.put("/getuser",creategetuser);
router.put("/getprofile",creategetuserinfo);
router.put("/getUserid",creategetid)
router.put("/getUserdetails",creategetUserdetails)
router.post("/updateuser",upload.single('profileImage'), updateuserinfo);
router.put("/updatepassword", updatePassword);
router.put('/userbyemail', getusebyemail);// this is to store id to localstorage using email
router.put('/deleteaccount', deleteAccount);
router.put('/sendreport', updateReport);

module.exports=router;

