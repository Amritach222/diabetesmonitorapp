const dotenv=require('dotenv').config({path : './config.env'});
const express=require('express');
const mysql=require("./database/conn").con;
const app=express();
const nodemailer=require('./nodemailer/mailer')
const cors=require('cors');
// importing node  cron to send email on daily basis
var cron = require('node-cron');
//cors provide a way for flowing informations among different platforms , say (react and node, mysql for here)
const userRouter=require('./api/users/user.router');
const addDetailsRouter=require('./api/userDetails/userDetails.router');
const predictionDetailsRouter=require('./././api/prediction/prediction.router');
// Create array of user mail ids
const emails=[]

let mailOptions={};
let insulinMessage={};
// retrieve and save to email template at just 2 min before sending mail
cron.schedule('00 58 19 * * *', () => {
  mysql.query(`SELECT * FROM usersignup`,[],(err, result, fields)=>{
    if(err){
      console.log(err)
    }
    else{
      result.map((item)=>{
        emails.push(item.email)
      })

    }
  })
// mail option object
   mailOptions = {
    from: 'sugartrackers@gmail.com',
    to: emails,
    subject: 'Reminder to upload your meal !',
    html:'<!DOCTYPE html>\n' +
      '<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">\n' +
      '<head>\n' +
      '  <meta charset="UTF-8">\n' +
      '  <meta name="viewport" content="width=device-width,initial-scale=1">\n' +
      '  <meta name="x-apple-disable-message-reformatting">\n' +
      '  <title></title>\n' +
      '  <!--[if mso]>\n' +
      '  <noscript>\n' +
      '    <xml>\n' +
      '      <o:OfficeDocumentSettings>\n' +
      '        <o:PixelsPerInch>96</o:PixelsPerInch>\n' +
      '      </o:OfficeDocumentSettings>\n' +
      '    </xml>\n' +
      '  </noscript>\n' +
      '  <![endif]-->\n' +
      '  <style>\n' +
      '    table, td, div, h1, p {font-family: Arial, sans-serif;}\n' +
      '  </style>\n' +
      '</head>\n' +
      '<body style="margin:0;padding:0;">\n' +
      '  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">\n' +
      '    <tr>\n' +
      '      <td align="center" style="padding:0;">\n' +
      '        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">\n' +
      '          <tr>\n' +
      '            <td align="center" style="padding:40px 0 30px 0;background:#09ec44;">\n' +
      '              <img src="https://is3-ssl.mzstatic.com/image/thumb/Purple126/v4/3b/ed/fc/3bedfc73-9a1b-e17b-8442-117b31592d1b/AppIcon-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg" alt="" width="300" style="height:auto;display:block;" />\n' +
      '            </td>\n' +
      '          </tr>\n' +
      '          <tr>\n' +
      '            <td style="padding:36px 30px 42px 30px;">\n' +
      '              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">\n' +
      '                <tr>\n' +
      '                  <td style="padding:0 0 36px 0;color:#153643;">\n' +
      '                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Time for your daily meal entries</h1>\n' +
      '                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">It\'s time for your daily meal entries. This entry helps you and your doctor understand your eating habits.\nWhether you’re looking to keep your gulcose level intact or simply understand your eating habits a little better, keeping a food journal can be incredibly beneficial.\nTake 5 minutes now to enter your food details.</p>\n' +
      '                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://localhost:3000/#/addDetails" style="color:#0c39e0;text-decoration:underline;">Click here to upload your meal</a></p>\n' +
      '                  </td>\n' +
      '                </tr>\n' +
      '              </table>\n' +
      '            </td>\n' +
      '          </tr>\n' +
      '          <tr>\n' +
      '            <td style="padding:30px;background:#0c39e0;">\n' +
      '              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">\n' +
      '                <tr>\n' +
      '                  <td style="padding:0;width:50%;" align="left">\n' +
      '                    <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">\n' +
      '                      &reg; DiabetesTracker, DiabetesTracker 2021<br/><a href="http://www.example.com" style="color:#ffffff;text-decoration:underline;">Unsubscribe</a>\n' +
      '                    </p>\n' +
      '                  </td>\n' +
      '                  <td style="padding:0;width:50%;" align="right">\n' +
      '                    <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">\n' +
      '                      <tr>\n' +
      '                        <td style="padding:0 0 0 10px;width:38px;">\n' +
      '                          <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>\n' +
      '                        </td>\n' +
      '                        <td style="padding:0 0 0 10px;width:38px;">\n' +
      '                          <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>\n' +
      '                        </td>\n' +
      '                      </tr>\n' +
      '                    </table>\n' +
      '                  </td>\n' +
      '                </tr>\n' +
      '              </table>\n' +
      '            </td>\n' +
      '          </tr>\n' +
      '        </table>\n' +
      '      </td>\n' +
      '    </tr>\n' +
      '  </table>\n' +
      '</body>\n' +
      '</html>'
  };
},);
// retrieve and save to email template at just 2 min before sending mail
cron.schedule('00 58 09 * * *', () => {
  mysql.query(`SELECT * FROM usersignup`, [], (err, result, fields) => {
    if (err) {
      console.log(err)
    } else {
      result.map((item) => {
        emails.push(item.email)
      })

    }
  })
  // mail option object
  insulinMessage = {
    from: 'sugartrackers@gmail.com',
    to: emails,
    subject: 'Reminder to upload your meal !',
    html:'<!DOCTYPE html>\n' +
      '<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">\n' +
      '<head>\n' +
      '  <meta charset="UTF-8">\n' +
      '  <meta name="viewport" content="width=device-width,initial-scale=1">\n' +
      '  <meta name="x-apple-disable-message-reformatting">\n' +
      '  <title></title>\n' +
      '  <!--[if mso]>\n' +
      '  <noscript>\n' +
      '    <xml>\n' +
      '      <o:OfficeDocumentSettings>\n' +
      '        <o:PixelsPerInch>96</o:PixelsPerInch>\n' +
      '      </o:OfficeDocumentSettings>\n' +
      '    </xml>\n' +
      '  </noscript>\n' +
      '  <![endif]-->\n' +
      '  <style>\n' +
      '    table, td, div, h1, p {font-family: Arial, sans-serif;}\n' +
      '  </style>\n' +
      '</head>\n' +
      '<body style="margin:0;padding:0;">\n' +
      '  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">\n' +
      '    <tr>\n' +
      '      <td align="center" style="padding:0;">\n' +
      '        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">\n' +
      '          <tr>\n' +
      '            <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">\n' +
      '              <img src="https://media.istockphoto.com/vectors/-vector-id1045950680?k=20&m=1045950680&s=612x612&w=0&h=2451JHd6xNIGAKSYIzNgvwAc7ggml_5gznOEe8ljKN4=" alt="" width="300" style="height:auto;display:block;" />\n' +
      '            </td>\n' +
      '          </tr>\n' +
      '          <tr>\n' +
      '            <td style="padding:36px 30px 42px 30px;">\n' +
      '              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">\n' +
      '                <tr>\n' +
      '                  <td style="padding:0 0 36px 0;color:#153643;">\n' +
      '                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Hope you are having a great day. It\'s time to log your insulin shots.! </h1>\n' +
      '                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"></p>\n' +
      '                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"></p>\n' +
      '                  </td>\n' +
      '                </tr>\n' +
      '              </table>\n' +
      '            </td>\n' +
      '          </tr>\n' +
      '          <tr>\n' +
      '            <td style="padding:30px;background:#0c39e0;">\n' +
      '              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">\n' +
      '                <tr>\n' +
      '                  <td style="padding:0;width:50%;" align="left">\n' +
      '                    <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">\n' +
      '                      &reg; DiabetesTracker, DiabetesTracker 2021<br/><a href="http://www.example.com" style="color:#ffffff;text-decoration:underline;">Unsubscribe</a>\n' +
      '                    </p>\n' +
      '                  </td>\n' +
      '                  <td style="padding:0;width:50%;" align="right">\n' +
      '                    <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">\n' +
      '                      <tr>\n' +
      '                        <td style="padding:0 0 0 10px;width:38px;">\n' +
      '                          <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>\n' +
      '                        </td>\n' +
      '                        <td style="padding:0 0 0 10px;width:38px;">\n' +
      '                          <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>\n' +
      '                        </td>\n' +
      '                      </tr>\n' +
      '                    </table>\n' +
      '                  </td>\n' +
      '                </tr>\n' +
      '              </table>\n' +
      '            </td>\n' +
      '          </tr>\n' +
      '        </table>\n' +
      '      </td>\n' +
      '    </tr>\n' +
      '  </table>\n' +
      '</body>\n' +
      '</html>'
  };
})

// schedule cron to send email at 8:00 pm
cron.schedule('00 00 20 * * *', () => {
   nodemailer.sendMail(mailOptions)
  nodemailer.sendMail(insulinMessage)
},);

// schedule cron to send email at 10:00 am
cron.schedule('00 00 10 * * *', () => {
  nodemailer.sendMail(insulinMessage)
},);

const doctorRouter=require('./api/doctors/doctor.router');
//converts all the json to javascript object
app.use(express.json());
app.use(cors('*'));
app.use(express.static('public'))
const APP_PORT=process.env.APP_PORT;
app.use("/api/users",userRouter);
app.use("/api/userDetails",addDetailsRouter);
app.use("/api/doctors",doctorRouter);
app.use("/api/prediction",predictionDetailsRouter);
//listening to a server
app.listen(APP_PORT,()=>
{
    console.log(`Server is running at port no ${APP_PORT}`);
})
