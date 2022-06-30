const {create,login, userDetails, getUsername,getuser,update_user}=require("./user.service")

const {genSaltSync,hashSync}=require("bcrypt");
module.exports={
    createUser:(req,res)=>
    {
        const body=req.body;
        // const salt=genSaltSync(10);
        // body.password=hashSync("bikey",salt);

        create(body,(err,results)=>
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

                // return body;
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })


    },
    loginUser:(req,res)=>
    {
        const body=req.body;
        login(body,(err,results)=>
        {
            console.log(results)
if(err)
{
    console.log(err);
}
if(!results)
{
    return res.json({
        success:0,
        data:"Invalid Email or Password"
    })
}

if(body.password===results.password)
{
    return res.json({
        success:1,
        data:"Login Successful"
    })
}
else
{
    return res.json({
        success:0,
        data:"Invalid Email or Password"
    })
}
        })
    },


    createUserDetails:(req,res)=>
    {
        const body=req.body;

        userDetails(body,(err,results)=>
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

    creategetuser:(req,res)=>
    {
        const email=req.body.email;
        console.log(req.body)
        getUsername(email,(err,results)=>
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
                data:results[0]
            })
        })


    },
  // get userinfo for profile
  creategetuserinfo:(req,res)=>
  {
    const id=req.body.id;
    getuser(id,(err,results)=>
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
        data:results[0]
      })
    })


  },
  updateuserinfo:(req,res)=>
  {
    const data=req.body;
    update_user(data,(err,results)=>
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
        message:"Successfully Updated"
      })
    })


  }



}
