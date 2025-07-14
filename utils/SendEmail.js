const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'ramacademy.global@gmail.com', 
    pass: 'gztgqyjggjqogcmi', 
  },
 
  secure: true, 
  port: 465,    
  tls: {
    rejectUnauthorized: true, 
  }
});


const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: 'ramacademy.global@gmail.com', 
    to,       
    subject,  
    html,     
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', to);
  } catch (error) {
    console.error('Email send error:', error);
    
  }
};

module.exports = sendEmail; 
