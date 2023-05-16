const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.sendFile( __dirname + "/index.html");
})

app.get('/cal', function(req,res){
    res.sendFile( __dirname + "/bmi.html");
})

app.post('/bmi',function(req,res){
    var w = parseFloat(req.body.weight);
    var h = parseFloat(req.body.height);
    var bmi = w/(h*h);

    res.send("Your bmi is " + bmi);
})

app.post('/',function(req,res){
    var n1 = Number(req.body.num1);
    var n2 = Number(req.body.num2);
    var result = n1 + n2;
    res.send("The result of calculation is " + result);
})

app.listen(3000, function(req,res){
    console.log("server is listening at the port 3000 on the localhost");
})
