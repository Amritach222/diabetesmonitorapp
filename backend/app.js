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
app.use(express.static('public'))
const APP_PORT=process.env.APP_PORT;
app.use("/api/users",userRouter);
app.use("/api/userDetails",addDetailsRouter);
app.use("/api/doctors",doctorRouter);
//listening to a server
app.listen(APP_PORT,()=>
{
    console.log(`Server is running at port no ${APP_PORT}`);
})
