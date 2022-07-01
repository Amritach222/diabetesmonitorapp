const {doctor,getDoctorDetails}=require("./doctor.service")

module.exports={
    createDoctor:(req,res)=>
    {
        const body=req.body;
        console.log(body)
        doctor(body,(err,results)=>
        {
            if(err)
            {
                console.log(err)
                return res.status(500).json(
                    {
                        success:0,
                        message:'Database connection error'
                    }
                )

            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
        

    },

    creategetDoctor:(req,res)=>
    {
        const user_id=req.body.user_id;
        console.log(req.body)
        getDoctorDetails(user_id,(err,results)=>
        {
            if(err)
            {
                console.log(err)
                return res.status(500).json(
                    {
                        success:0,
                        message:'Database connection error'
                    }
                )
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
        

    }

}