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
            const desc = weatherData.weather[0].description;
            console.log(desc);


        })
    })


    res.send("Server is up and running");
})


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});