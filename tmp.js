var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gamil id',
    pass: 'gmail password'
  }
});

var mailOptions = {
  from: 'brandname@gmail.com',
  to: 'signup_user_email',
  subject: 'Title',
  text: 'content'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
