const { forgotPassword,matchOTP,newPassword } = require("./recovery.service");
const mysql=require("../../database/conn").con;
const nodemailer=require('../../nodemailer/mailer')

const {genSaltSync,hashSync,compareSync}=require("bcrypt");
const salt=genSaltSync(10);

module.exports=
{


createForgotPassword:(req,res)=>
    {
        const body=req.body;
        console.log(body)
       
        forgotPassword(body,(err,results)=>

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
        data:"Invalid Email"
    })
}

if(results)
{
    const code = Math.floor(1000 + Math.random() * 9000);
    console.log(code);
    query="UPDATE usersignup SET code=? WHERE email=?"
    mailOptions = {
        from: 'sugartrackers@gmail.com',
        to: body.email,
        subject: 'Recover your password!',
        html:'<p>We received a request to reset your password.</br> Enter the following password reset code:</p></br><h1>'+code+'</h1>'
    }
    mysql.query(query,[code, body.email],(err,results,fields)=>{
        if(err){
            console.log("Error occured: "+err.message)
        }
        else{
            nodemailer.sendMail(mailOptions)
        }
    })
    return res.json({
        success:1,
        data:"correct email"
    })

}else{
  return res.json({
    success:0,
    data:"Invalid Email or Password"
  })
}
        })
    },

    createMatchOTP:(req,res)=>
    {
        const body=req.body;
        
        matchOTP(body,(err,results)=>

        {
if(err)
{
    console.log(err);
}
if(!results)
{
    return res.json({
        success:0,
        data:"Code doesn't match"
    })
}

if(results)
{
    // console.log(results)
    return res.json({
        success:1,
        data:results.code
    })

}else{
  return res.json({
    success:0,
    data:"Code doesn't match"
  })
}
        })
    },

    createNewPassword:(req,res)=>
    {
        const body=req.body;
        body.newPassword=hashSync(body.newPassword,salt);
        // console.log( body.newPassword)
        newPassword(body,(err,results)=>

        {
if(err)
{
    console.log(err);
}
if(!results)
{
    return res.json({
        success:0,
        data:"Something Went Wrong"
    })
}

if(results)
{
    // console.log(results)
    return res.json({
        success:1,
        data:'Password Recovered Successfully'
    })

}else{
  return res.json({
    success:0,
    data:"Something Went Wrong"
  })
}
        })
    }

}