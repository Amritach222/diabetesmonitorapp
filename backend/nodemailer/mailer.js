var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'motherland17102@gmail.com',
    pass: 'aejgjkrwmnsyppfg'
  }
});

var mailOptions = {
  from: 'visioncomputerworldd@gmail.com',
  to: 'amritach222@gmail.com',
  subject: 'Sending Email using Node.js',
  text: `Welcome to the visioncomputer solution we are here to serve you.\n You can freely contact us for any query. \nWe are always ready to help you. Thank you for choosing us.`
};
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
