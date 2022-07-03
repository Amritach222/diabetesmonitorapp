var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'motherland17102@gmail.com',
    pass: 'aejgjkrwmnsyppfg'
  }
});
function sendMail(mailOptions){
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports={
  sendMail
}
