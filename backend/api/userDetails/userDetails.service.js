const mysql=require("../../database/conn").con;
module.exports={
addDetails:(data,callBack)=>
{
    
    mysql.query(`INSERT INTO ${data.username}_table (sugar_level,morning_meal,launch,dinner,exercise_time) VALUES(?,?,?,?,?)`,
    [data.sugar_level,data.morning_meal,data.launch,data.dinner,data.exercise_time],
   (err,results)=>
   {
       if(err)
   {
  return callBack(err)
   } else
    return callBack(null,results)
   })
},

getDetails:(username,callBack)=>
{
    
    mysql.query(`select * from ${username}_table`,
   (err,results)=>
   {
       if(err)
   {
  return callBack(err)
   } else
    return callBack(null,results)
   })
}
}