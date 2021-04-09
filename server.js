const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const nodemailer = require('nodemailer');
let port = 3000;
let accountSid = 'AC96c3da0c228aeec292f6a0018bca3f82';
let authToken = '09a9617f26c73c35854ea45dd19e411e';
const client = require('twilio')(accountSid, authToken);
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



app.post("/", (req, res) => {
    let shopNumber = req.body.shopId;
    let shopName = req.body.shop_n;
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let phoneNumber = req.body.phoneNo;
    let email= req.body.Email;
    let randomtoken = Math.round((Math.random() * 100000), 3);
    console.log(randomtoken);
    client.messages
        .create({
            body: 'This is your token : ' + randomtoken,
            from: '+14046204878',
            to: '+91' + phoneNumber
        })
        .then(message => console.log(message.sid));
    if (res.statusCode === 200) {
        res.sendFile(__dirname + '/success.html');
    } else {
        res.sendFile(__dirname + '/error.html');
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'suvigyasaxena1402@gmail.com',
            pass: 'suvigya1402'
        }
    });
    const mailOptions = {
        from: 'suvigyasaxena1402@email.com',
        to: email, 
        subject: 'Your token is succesfully generated'+shopName, 
        html: '<p>Dear '+firstName+''+lastName+'</p> <br><p> Your token for the '+shopName+' is  '+randomtoken+'</p>'
    };
    transporter.sendMail(mailOptions, (err, info)=> {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
});


app.listen(port, () => {
    console.log('Server is running on port' + port);
})