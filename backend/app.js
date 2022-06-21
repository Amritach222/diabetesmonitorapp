const dotenv=require('dotenv').config({path : './config.env'});
const express=require('express');
const app=express();
const cors=require('cors');
//cors provide a way for flowing informations among different platforms , say (react and node, mysql for here)


app.use(express.json());
app.use(cors());


const PORT=process.env.PORT;
const mysql=require("./database/conn").con;

//handeling request for default request (starting request)
app.get('/', (req,res)=>
{
    res.send('Hello World form the  server');
})


//handeling post request for login
app.post('/login', (req,res)=>
{
    const email=req.body.email;
    const password=req.body.password;
    mysql.query("select * from usersignup where email=? and password=?",[email,password],(err,results)=>
    {
    if(err)
    {
    throw err;
    }
    // console.log(results)
        if(results.length == 1)
        {
    res.send("Login Successful");
        }
        else
        {
            res.send("Invalid username and password !!")
        }
})})

//handeling post request for register
app.post('/register', (req,res)=>
{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const cpassword=req.body.cpassword;
    
    mysql.query("INSERT INTO usersignup (name,email,password,cpassword) VALUES(?,?,?,?)",
    [username,email,password,cpassword],
    (err,result)=>
    {
        if(err)
    {
    throw err;
    } else
    {
        res.send("Registration Successful");

        let createTable = `create table if not exists ${username}_table(
            id int primary key auto_increment,
            weight varchar(255)not null,
            morning_meal varchar(255)not null,
            launch varchar(255)not null,
            dinner varchar(255)not null,
            exercise_time varchar(255)not null
        )`;
        mysql.query(createTable, (err, results, fields)=> {
            if (err) {
            console.log(err.message);
            }
            // res.send("User Table created successfully");
            })
    }}
    )})


    //handeling post request for add details
    app.post('addDetails',(req,res)=>
    {
        {
            const userSugar=req.body.userSugar;
            const userWeight=req.body.userWeight;
            const userMeal=req.body.userMeal;
            const userLaunch=req.body.userLaunch;
            const userDinner=req.body.userDinner;
            const userExercise=req.body.userExercise;

            
            const username=window.localStorage('user');
            mysql.query(`INSERT INTO ${username}_table(name,email,password,cpassword) VALUES(?,?,?,?)`,
            [username,email,password,cpassword],
            (err,result)=>
            {
                if(err)
            {
            throw err;
            } else
            {
                res.send("Registration Successful");
        }
    
    })}
    
    })
   
//listening to a server
app.listen(PORT,()=>
{ 
    console.log(`Server is running at port no ${PORT}`);
})