const {createAddDetails}=require('./userDetails.controller')
const router=require('express').Router();

router.post("/",createAddDetails);
module.exports=router;