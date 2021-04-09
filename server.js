
const express=require('express');
const bodyParser=require('body-parser');
const https=require('https');
const port=3000;
const accountSid = 'AC96c3da0c228aeec292f6a0018bca3f82';
const authToken = '09a9617f26c73c35854ea45dd19e411e';
const client = require('twilio')(accountSid, authToken);
const app=express();
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
    


app.post("/", (req, res) =>{
    const shopNumber=req.body.shopId;
    const shopName=req.body.shop_n;
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const phoneNumber=req.body.phoneNo;
    var randomtoken=Math.round((Math.random()*100000),3);
    console.log(randomtoken);
    client.messages
    .create({
     body: 'This is your token : '+randomtoken,
     from: '+14046204878',
     to: '+91'+phoneNumber
    })
    .then(message => console.log(message.sid));
    if(res.statusCode===200){
        res.sendFile(__dirname + '/success.html');
    }
    else{
        res.sendFile(__dirname + '/error.html');
    }
});


app.listen(port,()=>{
    console.log('Server is running on port'+port);
})


