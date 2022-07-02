const {createAddDetails,createGetDetails,getTenDetals,updateMealInfo,getUserActivity}=require('./userDetails.controller')
const router=require('express').Router();

router.post("/",createAddDetails);
router.put("/getDetails",createGetDetails);
router.put("/getTenDetails",getTenDetals);
router.put("/updateMealInfo",updateMealInfo);
router.put("/getuseractivity",getUserActivity);
module.exports=router;
