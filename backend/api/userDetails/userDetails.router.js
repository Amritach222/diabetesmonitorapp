const {createAddDetails,createGetDetails}=require('./userDetails.controller')
const router=require('express').Router();

router.post("/",createAddDetails);
router.put("/getDetails",createGetDetails);
module.exports=router;