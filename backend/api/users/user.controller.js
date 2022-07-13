
const {create,login, userDetails, getUsername,getuser,update_user, getuserByemail,getUserid,getUserdetails, updatePassword,usernameValidation,deleteAccount,updateReport}=require("./user.service.js")


const {hashSync,compareSync, genSaltSync}=require("bcrypt");
const salt=genSaltSync(10)
module.exports={
    createuserValidation:(req,res)=>
    {
        usernameValidation((err,results)=>
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

    createUser:(req,res)=>
    {
        let body=req.body;
        body.password=hashSync(body.password,salt);
        console.log( body.password)

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
    console.log(body)
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
      const result =compareSync(body.password,results.password)
      if(result)
      {
        return res.json({
          success:1,
          data:"Login Successful"
        })

      }else{
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
        const id=req.body.user_id;
        console.log(req.body)
        getUsername(id,(err,results)=>
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

    creategetid:(req,res)=>
    {
        const email=req.body.email;
        console.log(req.body)
        getUserid(email,(err,results)=>
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
    creategetUserdetails:(req,res)=>
    {
        const id=req.body.id;
        getUserdetails(id,(err,results)=>
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
  // Get user by email to store id to localstorage
  getuserbyemail:(req,res)=>
  {
    const email=req.body.email;
    getuserByemail(email,(err,results)=>
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
// Update user profile
  updateuserinfo:(req,res)=>
  {
    const req_data=req.body;
    const data={
        id:req_data.id,
        username:req_data.username,
        age:req_data.age,
        weight:req_data.weight,
        email:req_data.email,
        image:req.file.path,
    }
    console.log(data)
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


  },
  // Update user profile
  updatePassword:(req,res)=>
  {
    const data=req.body;
    data.password=hashSync(data.password,salt);
    updatePassword(data,(err,results)=>
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


  },
  // Delete User account
  deleteAccount:(req,res)=>
  {
    const data=req.body;
    console.log(data.username)
    deleteAccount(data,(err,results)=>
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
        message:results
      })
    })
  },
  // Delete User account
  updateReport:(req,res)=>
  {
    const id=req.body.id;
    // const report =req.file.path
    // const data={
    //   id:id,
    //   report:report
    // }

    updateReport(id,(err,results)=>
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
      if(results){

      return res.status(200).json({
        success:1,
        message:results
      })
      }else{
        return res.status(400).json({
          success:0,
          message:"Unable to insert data"
        })
      }
    })
  }

}
