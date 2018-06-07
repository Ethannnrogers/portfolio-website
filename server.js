var express = require('express');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var path = require('path');
var htmlRoutes = require('./app/routes/htmlRoutes.js');
require('dotenv').config();
var app = express();
var PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static(__dirname + "public"));

app.post('/send', function(req, res, next) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD
    }
  })
  const mailOptions = {
    from: `${req.body.email}`,
    to: 'erogers999@gmail.com',
    subject: `New Lead: ${req.body.name}`,
    text: `${req.body.message}`
  }
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res)
    }
  })
})

htmlRoutes(app); 

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});