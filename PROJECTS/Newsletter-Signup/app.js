const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express(); 
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));


app.post('/',function(req,res){
    console.log("yes");
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/4f13a30816";

    const options = {
        method: "POST",
        auth: "sukhman:2a62306604a5a38a5d84a22cf9841eff-us21"
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            data = (JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
    
})

app.post('/failure',function(req,res){
    res.redirect('/');
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/new_signup.html");
});


// listen on port 3000 
app.listen(3000, function() {
    console.log("Server is running on port 3000");
});


// key
// 2a62306604a5a38a5d84a22cf9841eff-us21

// list id
// 4f13a30816
