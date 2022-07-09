const { jsPDF } = require('jspdf/dist/jspdf.node')
const { applyPlugin } = require('jspdf-autotable/dist/jspdf.plugin.autotable')
applyPlugin(jsPDF)
const mysql=require("../../database/conn").con;
const nodemailer=require('../../nodemailer/mailer')
// intialize jsPDF
var doc=new jsPDF({
  orientation:"portrait",
});
module.exports={
  usernameValidation:(callBack)=>
  {
      mysql.query("select * from usersignup",[],(err,results)=>
      {
          if(err)
          {
         return callBack(err)
          } else
           return callBack(null,results)
  })},

create:(data,callBack)=>
{
   //create method definition


//query runnning after registartion validated for unique username to exist or create
   mysql.query("INSERT INTO usersignup (fullname,name,age,weight,gender,email,password,haveDiabetes) VALUES(?,?,?,?,?,?,?,?)",
   [data.fullname,data.username,data.age, data.weight,data.gender,data.email,data.password,data.haveDiabetes],
   (err,results)=>
   {
     if(err)
   {
  return callBack(err)
   } else
    return callBack(null,"deleted")
   })
},

login:(password,email,callBack)=>
{
  console.log(data.password)
    mysql.query("select * from usersignup where email=? && password=?",[data.email,data.password],(err,results)=>

    {

        if(err)
        {
       return callBack(err)
        } else
       
         return callBack(null,results[0])
})},

userDetails:(data,callBack)=>
    {
      console.log(data)
        let createTable = `create table if not exists ${data.username}_table(
            id int primary key auto_increment,
            sugar_level varchar(255),
            morning_meal varchar(255)not null,
            launch varchar(255)not null,
            dinner varchar(255)not null,
            exercise_time varchar(255),
            health_issues varchar(1000)not null,
            date varchar(255)not null

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

    getUsername:(id,callBack)=>
    {

      console.log(id)
        let getUser = `select name from usersignup where id=?`;
        mysql.query(getUser,[id], (err, results)=> {
            if (err) {
          return callBack(err)
            }
           else
           {
            return callBack(null,results)
           }
            })
    },
    getUserid:(email,callBack)=>
    {

        let getUserid = `select id from usersignup where email=?`;
        mysql.query(getUserid,[email], (err, results)=> {
            if (err) {
          return callBack(err)
            }
           else
           {
            return callBack(null,results)
           }
            })
    },

    //API for providing user details to front end for displaying in widget dropdown....
    getUserdetails:(user_id,callBack)=>
    {

        let getDetails = `select * from usersignup where id=?`;
        mysql.query(getDetails,[user_id], (err, results)=> {
            if (err) {
          return callBack(err)
            }
           else
           {
            return callBack(null,results)
           }
            })
    },
  getuser:(id,callBack)=>
  {
    let getUser = `select * from usersignup where id=?`;
    mysql.query(getUser,[id], (err, results, fields)=> {
      if (err) {
        return callBack(err)
      }
      else
      {
        return callBack(null,results)
      }
    })
  },
  // get user by email
  getuserByemail:(email,callBack)=>
  {
    let getUser = `select * from usersignup where email=?`;
    mysql.query(getUser,[email], (err, results, fields)=> {
      if (err) {
        return callBack(err)
      }

      else
      {
        return callBack(null,results)
      }
    })
  },
  // Update user with profile image  for image upload we use multer library
  update_user:(data,callBack)=>
  {
    let update_query = `UPDATE usersignup SET  name=?, age=?, weight=?, email=?, image=? WHERE id=?`;
    mysql.query(update_query,[data.username, data.age,data.weight, data.email, data.image, data.id],
      (err, results, fields)=> {
      if (err) {
        return callBack(err)
      }
      else
      {
        return callBack(null,results)
      }
    })
  },
  // Change password from here
  updatePassword:(data,callBack)=>
  {
    let update_query = `UPDATE usersignup SET password=? WHERE id=?`;
    mysql.query(update_query,[data.password,data.id],
      (err, results, fields)=> {
        if (err) {
          return callBack(err)
        }
        else
        {
          return callBack(null,results)
        }
      })
  },


  // Delete user account
  deleteAccount:(data,callBack)=>
  {
    let delete_user_query = `DELETE FROM usersignup WHERE id=?`;
    let delete_user_table = `DROP TABLE ${data.username}_table`;
    mysql.query(delete_user_query,[data.id],
      (err, results, fields)=> {
        if (err) {
          return callBack(err)
        }
        else
        {
          mysql.query(delete_user_table,[],
            (err, results, fields)=> {
              if (err) {
                return callBack(err)
              }
              else
              {
                return callBack(null,results)
              }
            })
        }
      })
  },


  // update user report
  updateReport:(id,callBack)=>
  {
    let select_query = `SELECT * FROM usersignup  WHERE id=?`;
    mysql.query(select_query,[id],
      (err, results, fields)=> {
        if (err) {
          return callBack(err)
        }
        else
        {
          const user_email=results[0].email
          const username=results[0].name
          const name=results[0].fullname
          mysql.query(`SELECT * FROM ${username}_table`,[],
            (err,results,fields)=>{
            if (err){
              return callBack(err)
            }else{
              const userData=results;
              mysql.query(`SELECT * FROM doctor_table WHERE user_id=?`,[id],
                (err,results,fields)=>{
                if(err){
                  return callBack(err)
                  console.log("Error occured while retrieving doctor data "+err)
                }else {
                    const doctor_email=results[0].email
                     sendPDF(userData,user_email,doctor_email,name)
                      return callBack(null,"success")
                }
                })
            }
            })
        }
      })
  }

}

// function for Sending  pdf to mail
const createReport=(data,name)=>{
  // Setting font
  // define the columns we want and their titles
  const tableColumn = ["S.N", "Sugar Level", "Breakfast", "Lunch", "Dinner","Exercise Time","Health Issues","Date"];
  // define an empty array of rows
  const tableRows = [];
  // for each ticket pass all its data into an array
  data.map((item,index)=>{
    const mealData=[
      index+1,
      item.sugar_level+" mg/dL",
      item.morning_meal,
      item.launch,
      item.dinner,
      item.exercise_time+" minutes",
      item.health_issues,
      item.date
    ];
    // push each item to the row
    tableRows.push(mealData)
  })
  doc.setFont('courier');
  doc.text(15,20,'Daily Activities of '+name);
  doc.autoTable(tableColumn, tableRows, { startY: 25 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // fet an output
  const pdfOutput=doc.output("datauristring");
  return pdfOutput;
}
// Send email
const sendPDF= async (data,from,to,name)=>{
  let pdfOutPDF= await  createReport(data, name);
  nodemailer.sendMail({
    from:from,
    to:to,
    subject:"User Activity Report",
    text:"Email sent from "+name, //
    attachments:[{path:pdfOutPDF}]
  })
}

