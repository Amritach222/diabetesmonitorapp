const {createAddDetails,createGetDetails,getTenDetals,updateMealInfo}=require('./userDetails.controller')
const router=require('express').Router();

router.post("/",createAddDetails);
router.put("/getDetails",createGetDetails);
router.put("/getTenDetails",getTenDetals);
router.put("/updateMealInfo",updateMealInfo);
module.exports=router;
