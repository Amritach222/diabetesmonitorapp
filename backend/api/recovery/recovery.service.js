const mysql=require("../../database/conn").con;

module.exports={
    forgotPassword:(data,callBack)=>
  {
      mysql.query("select * from usersignup where email = ? ",[data.email],(err,results)=>
      {
          if(err)
          {
         return callBack(err)
          } else
           return callBack(null,results[0])
  })},
  matchOTP:(data,callBack)=>
  {
    mysql.query("select code from usersignup where code = ? ",[data.userOTP],(err,results)=>
    {
        if(err)
        {
       return callBack(err)
        } else
         return callBack(null,results[0])
})},

newPassword:(data,callBack)=>
  {
    console.log(data)
    mysql.query("UPDATE usersignup SET password=? WHERE code=?",[data.newPassword,data.code],(err,results)=>
    {
        if(err)
        {
       return callBack(err)
        } else
        // console.log(results)
         return callBack(null,results)
})}
}