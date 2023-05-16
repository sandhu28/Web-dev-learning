const express = require("express");
const app = express();

app.get("/",function(request,response){
    response.send("<h1>Hello, it's response<h1>");
})

app.get('/about',function(req,res){
    res.send("I am Sukhman from IIT Jodhpur");
})

app.get('/login',function(req,res){
    res.send("enter details");
})

app.listen(3000, function(){
    console.log("server started on port 3000");
});