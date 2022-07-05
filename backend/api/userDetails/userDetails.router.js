const {createAddDetails,createGetDetails,getTenDetals,updateMealInfo,getUserActivity,getuserdetailsSubmissionDate}=require('./userDetails.controller')
const router=require('express').Router();

router.post("/",createAddDetails);
router.put("/getDetails",createGetDetails);
router.put("/getTenDetails",getTenDetals);
router.put("/updateMealInfo",updateMealInfo);
router.put("/getuseractivity",getUserActivity);
router.put("/getsubmissionDate",getuserdetailsSubmissionDate);
module.exports=router;
