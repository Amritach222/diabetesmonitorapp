const mysql=require("../../database/conn").con;
module.exports={
create:(data,callBack)=>
{
   //create method definition
   mysql.query("INSERT INTO usersignup (name,age,weight,gender,email,password,cpassword) VALUES(?,?,?,?,?,?,?)",
   [data.username,data.age, data.weight,data.gender,data.email,data.password,data.cpassword],
   (err,results)=>
   {
       if(err)
   {
  return callBack(err)
   } else
    return callBack(null,results)
    //    res.send("Registration Successful");

    //    let createTable = `create table if not exists ${username}_table(
    //        id int primary key auto_increment,
    //        sugar_level varchar(255)not null,
    //        morning_meal varchar(255)not null,
    //        launch varchar(255)not null,
    //        dinner varchar(255)not null,
    //        exercise_time varchar(255)not null
    //    )`;
    //    mysql.query(createTable, (err, results, fields)=> {
    //        if (err) {
    //        console.log(err.message);
    //        }
    //        // res.send("User Table created successfully");
    //        })
   })
},

login:(email,callBack)=>
{
    mysql.query("select * from usersignup where email=?",[email],(err,results)=>
    {
   
        if(err)
        {
       return callBack(err)
        } else
         return callBack(null,results[0])
})},

userDetails:(data,callBack)=>
    {
        let createTable = `create table if not exists ${data.username}_table(
            id int primary key auto_increment,
            sugar_level varchar(255)not null,
            morning_meal varchar(255)not null,
            launch varchar(255)not null,
            dinner varchar(255)not null,
            exercise_time varchar(255)not null
        )`;
        mysql.query(createTable, (err, results, fields)=> {
            if (err) {
          return callBack(err)
            }
           else
           {
            return callBack(null,results)
           }
            })
    },

    getUsername:(email,callBack)=>
    {
        
        let getUser = `select name from usersignup where email=?`;
        mysql.query(getUser,[email], (err, results, fields)=> {
            if (err) {
          return callBack(err)
            }
           else
           {
            return callBack(null,results)
           }
            })
    }

}


   

