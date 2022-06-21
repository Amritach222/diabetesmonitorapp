const mysql = require("mysql");
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sugar tracker",
    port:3306
});

con.connect((err)=>
{
    if(err)
    throw err;
    console.log("Connection to database has been successful....");
});

module.exports.con=con;
console.log(con);