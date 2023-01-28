const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req,res){
    
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=87d7dbf3a9616279e4807eb9bdb590c5&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>Greater " + query +" temp is " + temp + " degree celcius </h1>");
            res.write("<p> Weather condition is " + description );
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })

} )






app.listen(3000, function(){
    console.log("server is running on port 3000");
})