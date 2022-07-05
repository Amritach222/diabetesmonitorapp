const {createDoctor,creategetDoctor,updateDoctor}=require('./doctor.controller')
const router=require('express').Router();

router.post("/",createDoctor);
router.put("/getDoctor",creategetDoctor);
router.put("/updatedoctor",updateDoctor);
module.exports=router;
