const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile( __dirname + "/index.html");
})

app.post('/',function(req,res){
    
    const cityName = req.body.cityName;
    const unit = "metric";
    const key = "22ea133a20b0268c071b20e4bcefe494";

    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ key + "&q=" + cityName + "&units=" + unit;

    https.get(url, function(response){
        response.on('data',(data)=>{

            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const desc = weatherData.weather[0].description;
            
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather at " + cityName + " has " + desc + ".</p>");
            
            res.write("<h1>The temperature of " + cityName + " is " + temp +" degress celcius. <h1/>");

            res.write("<img src=" + imgUrl + ">");

            res.send();
        })
    })

})

app.listen(3002, function(){
    console.log("Server is listening at the port 3002 on localhost");
})