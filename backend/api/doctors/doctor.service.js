const mysql=require("../../database/conn").con;
module.exports={
doctor:(data,callBack)=>
{
   //create method definition
   console.log("data",data)
   mysql.query("INSERT INTO doctor_table (user_id,name,email,phone) VALUES(?,?,?,?)",
   [data.user_id,data.doctorName,data.doctorEmail, data.doctorPhone],
   (err,results)=>
   {
       if(err)
   {
  return callBack(err)
   } else
    return callBack(null,results)
   
   })
},


getDoctorDetails:(user_id,callBack)=>
{
    
    let getDoctor = `select * from doctor_table where user_id=?`;
    mysql.query(getDoctor,[user_id], (err, results)=> {
        if (err) {
      return callBack(err)
        }
       else
       {
        return callBack(null,results[0])
       }
        })
}
}