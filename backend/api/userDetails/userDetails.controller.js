const {addDetails,getDetails,getFirstTenDetails,updateMealDetail,getUserActivity}=require("./userDetails.service")
module.exports={
    createAddDetails:(req,res)=>
    {
        const  body=req.body;
            console.log(body.sugar_level)
        addDetails(body,(err,results)=>
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

    createGetDetails:(req,res)=>
    {
        console.log(req.body);
        getDetails(req.body.username,(err,results)=>
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
  // Getting first 10 details
  getTenDetals:(req,res)=>
  {
    const data=req.body;
    getFirstTenDetails(data.username,(err,results)=>
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
  // Update meal info
  updateMealInfo:(req,res)=>
  {
    const data=req.body;
    updateMealDetail(data,(err,results)=>
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
  // get all the uploaded activities
  getUserActivity:(req,res)=>
  {
    const username=req.body.username;
    getUserActivity(username,(err,results)=>
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
