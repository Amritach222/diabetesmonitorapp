const mysql = require("mysql");
const con=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.MYSQL_DATABASE,
    port:process.env.DB_PORT
});

con.connect((err)=>
{
    if(err)
    throw err;
    console.log("Connection to database has been successful....");
});

module.exports.con=con;
// console.log(con);