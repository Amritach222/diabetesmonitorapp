const mysql=require("../../database/conn").con;
module.exports={
addDetails:(data,callBack)=>
{

    mysql.query(`INSERT INTO ${data.username}_table (sugar_level,morning_meal,launch,dinner,exercise_time,health_issues,date) VALUES(?,?,?,?,?,?,?)`,
    [data.sugar_level,data.morning_meal,data.launch,data.dinner,data.exercise_time,data.health_issues,data.today_date],
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
    const query=`UPDATE ${data.user}_table SET sugar_level=?, morning_meal=?,launch=?,dinner=?, exercise_time=?, health_issues=? WHERE id=?`
    mysql.query(query,
      [data.sugar,data.breakfast,data.lunch,data.dinner,data.etime, data.issues,data.id],
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
  // Api creation for updating meal detail
  getUserActivity:(username,callBack)=>
  {
    const query=`SELECT * FROM ${username}_table`
    mysql.query(query,
      [],
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

  getSubmissionDate:(data,callBack)=>
  {
    // console.log(data)
    const query=`SELECT date FROM ${data.username}_table where date=?`
    mysql.query(query,
      [data.todayDate],
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
  }
}
