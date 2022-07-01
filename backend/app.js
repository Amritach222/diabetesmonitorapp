const dotenv=require('dotenv').config({path : './config.env'});
const express=require('express');
const app=express();
const cors=require('cors');
//cors provide a way for flowing informations among different platforms , say (react and node, mysql for here)

const userRouter=require('./api/users/user.router');
const addDetailsRouter=require('./api/userDetails/userDetails.router');
const doctorRouter=require('./api/doctors/doctor.router');
//converts all the json to javascript object
app.use(express.json());
app.use(cors('*'));

const APP_PORT=process.env.APP_PORT;
// const mysql=require("./database/conn").con;

// //handeling request for default request (starting request)
// app.get('/', (req,res)=>
// {
//     res.send('Hello World form the  server');
// })


app.use("/api/users",userRouter);

app.use("/api/userDetails",addDetailsRouter);
app.use("/api/doctors",doctorRouter);


// //handeling post request for register
// app.post('/register', (req,res)=>
// {
//     const username=req.body.username;
//     const age=req.body.age;
//     const weight=req.body.weight;
//     const gender=req.body.gender;
//     const email=req.body.email;
//     const password=req.body.password;
//     const cpassword=req.body.cpassword;
    
//     mysql.query("INSERT INTO usersignup (name,age,weight,gender,email,password,cpassword) VALUES(?,?,?,?,?,?,?)",
//     [username,age, weight,gender,email,password,cpassword],
//     (err,result)=>
//     {
//         if(err)
//     {
//     throw err;
//     } else
//     {
//         res.send("Registration Successful");

//         let createTable = `create table if not exists ${username}_table(
//             id int primary key auto_increment,
//             sugar_level varchar(255)not null,
//             morning_meal varchar(255)not null,
//             launch varchar(255)not null,
//             dinner varchar(255)not null,
//             exercise_time varchar(255)not null
//         )`;
//         mysql.query(createTable, (err, results, fields)=> {
//             if (err) {
//             console.log(err.message);
//             }
//             // res.send("User Table created successfully");
//             })
//     }}
//     )})


    // handeling post request for add details
    // app.post('/addDetails',(req,res)=>
    // {
    //     console.log("Add details running")
    //         const userSugar=req.body.userSugar;
    //         const userWeight=req.body.userWeight;
    //         const userMeal=req.body.userMeal;
    //         const userLaunch=req.body.userLaunch;
    //         const userDinner=req.body.userDinner;
    //         const userExercise=req.body.userExercise;
            
    //         mysql.query(`INSERT INTO sibam_table (sugar_level,morning_meal,launch,dinner,exercise_time) VALUES(?,?,?,?,?)`,
    //         [userSugar,userMeal,userLaunch,userDinner,userExercise],
    //         (err,result)=>
    //         {
    //             if(err)
    //         {
    //             console.log("Error occured")
    //         throw err;
    //         } 
    //         else
    //         {
    //             res.send("Submitted Successfully");
    //     }
    //     //res.send('Posting Your Details)
    
    // })})
   
    
    // })
   
//listening to a server
app.listen(APP_PORT,()=>
{ 
    console.log(`Server is running at port no ${APP_PORT}`);
})