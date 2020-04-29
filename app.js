const express = require("express");

const app = new express();

app.get("/", function(req,res){
    res.send("Server is up and running");
});


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});