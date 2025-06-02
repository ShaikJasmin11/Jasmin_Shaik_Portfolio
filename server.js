const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },
  pool: true, // enable connection pooling
  maxConnections: 1,
  maxMessages: 10
});


const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve your index.html, styles.css, etc.

app.post('/contact', (req, res) => {
  const mailOptions = {
    from: req.body.email,
    to: 'shaikjasmin100@gmail.com', // where YOU want to receive it
    subject: req.body.subject,
    text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Email error:', error);
      return res.status(500).send('Error sending email');
    } else {
      console.log('✅ Email sent:', info.response);
      res.status(200).send('Message sent successfully');
    }
  });
});



const cors = require('cors');
app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
