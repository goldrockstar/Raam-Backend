const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/register', async (req, res) => {
  console.log('Received registration request body:', req.body);
  const { 
    FirstName, 
    LastName, 
    EmailAddress, 
    PhoneNumber, 
    CourseofInterest, 
    LevelofEducation, 
    RelevantExperience, 
    AdditionalMessage,
  } = req.body;


  if (!FirstName || !LastName || !EmailAddress || !PhoneNumber || !CourseofInterest || !LevelofEducation || !RelevantExperience || !AdditionalMessage) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
  
    console.log('Applicant Email:', EmailAddress);

    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ramacademy.global@gmail.com', 
        pass: 'gztgqyjggjqogcmi'         
      },
      tls: {
        rejectUnauthorized: false,
      }
    });

    const mailOptions = {
      
      from: 'ramacademy.global@gmail.com',
      to: 'ramacademy.global@gmail.com',

      subject: `New Course Registration: ${CourseofInterest} - ${FirstName} ${LastName}`,
      text: `
        New Course Registration Details:

        First Name: ${FirstName}
        Last Name: ${LastName}
        Email Address: ${EmailAddress}
        Phone Number: ${PhoneNumber}
        Course of Interest: ${CourseofInterest}
        Level of Education: ${LevelofEducation}
        Relevant Experience: ${RelevantExperience}
        Additional Message: ${AdditionalMessage}
      `,
      
      html: `
        <h3>New Course Registration</h3>
        <p><strong>First Name:</strong> ${FirstName}</p>
        <p><strong>Last Name:</strong> ${LastName}</p>
        <p><strong>Email Address:</strong> ${EmailAddress}</p>
        <p><strong>Phone Number:</strong> ${PhoneNumber}</p>
        <p><strong>Course of Interest:</strong> ${CourseofInterest}</p>
        <p><strong>Level of Education:</strong> ${LevelofEducation}</p>
        <p><strong>Relevant Experience:</strong> ${RelevantExperience}</p>
        <p><strong>Additional Message:</strong> ${AdditionalMessage}</p>
      `
    };

  
    await transporter.sendMail(mailOptions);

    
    res.status(200).json({ message: 'Registration successful! Your message has been sent.' });

  } catch (error) {
      console.error('Error sending registration email:', error);
      res.status(500).json({ message: 'Failed to complete registration. Please try again.' });
  }
});

module.exports = router;