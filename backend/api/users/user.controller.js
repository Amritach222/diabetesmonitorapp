const {create,login, userDetails, getUsername,getUserid,getUserdetails,usernameValidation}=require("./user.service")

// const {genSaltSync,hashSync}=require("bcrypt");
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

                // return body;
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
        

    },

    
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
        login(body.email,(err,results)=>
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
        const body=req.body;
        console.log(body)
        getUserdetails(user_id,(err,results)=>
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