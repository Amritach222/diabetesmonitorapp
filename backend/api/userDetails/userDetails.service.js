const mysql=require("../../database/conn").con;
module.exports={
addDetails:(data,callBack)=>
{
    console.log(data)
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
},
  // Getting first 10 details from add details database to display in dashboard
  getFirstTenDetails:(username,callBack)=>
  {
    mysql.query(`select * from ${username}_table`,
      (err,results)=>
      {

        if(err)
        {
          return callBack(err)
        } else
          if(results.length>10){
            return callBack(null,results.slice(-10));
          }
          else{
            return callBack(null,results);
          }

      })
  },
  // Api creation for updating meal detail
  updateMealDetail:(data,callBack)=>
  {
    const query=`UPDATE ${data.user}_table SET sugar_level=?, morning_meal=?,launch=?,dinner=?, exercise_time=? WHERE id=?`
    mysql.query(query,
      [data.sugar,data.breakfast,data.lunch,data.dinner,data.etime,data.id],
      (err,results)=>
      {
        if(err)
        {
          return callBack(err)
        }
        else{
          return callBack(null,results);
        }

      })
  },
}
