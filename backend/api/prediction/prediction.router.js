const {createpredictionDetails} =require( "./prediction.controller")
const router=require('express').Router();

router.post("/",createpredictionDetails);

module.exports=router;