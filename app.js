const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = new express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    //console.log("Post request received");
    //console.log(req.body.cityName);
    const data = req.body;
    const query = data.cityName;
    const apiKey = "482b31c6962e567d971dc9cd1b8b7c4c"; 
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            //console.log(data);
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
           
            res.write(`<p>The weather is currently ${desc}.</p>`);
            res.write(`<h1>The temperature in ${query} is ${temp} degree celsius</h1>`);
            res.write(`<img src = ${imageUrl}>`)
            res.send();

        })
    })
})




app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});