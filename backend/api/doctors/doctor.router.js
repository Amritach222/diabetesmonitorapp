const {createDoctor,creategetDoctor}=require('./doctor.controller')
const router=require('express').Router();

router.post("/",createDoctor);
router.put("/getDoctor",creategetDoctor);
module.exports=router;