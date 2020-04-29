const express = require("express");
const https = require("https");

const app = new express();

app.get("/", function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Kharghar&appid=482b31c6962e567d971dc9cd1b8b7c4c&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            //console.log(data);
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
           
            res.write("<p>The weather is currently " + desc +"</p>");
            res.write("<h1>The temperature in Kharghar is " + temp + " degree celcius<?h1>");
            res.write(`<img src = ${imageUrl}>`)
            res.send();

        })
    })
})


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});