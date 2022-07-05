const mysql=require("../../database/conn").con;
module.exports={

predictionDetails:(data,callBack)=>
{
    
    mysql.query(`INSERT INTO predict_table (user_id,pregnancy,glucose,blood_pressure,skin_thickness,insulin,bmi,predegree_function) VALUES(?,?,?,?,?,?,?,?)`,
    [data.user_id,data.pregnancy,data.glucose,data.blood_pressure,data.skin_thickness,data.insulin,data.bmi,data.predegree_function],
   (err,results)=>
   {
       if(err)
   {
  return callBack(err)
   } else
    return callBack(null,results)
   })
}}