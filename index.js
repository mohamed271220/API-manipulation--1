const express = require('express');
const https= require("https")
const app=express();

const URL="https://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=d034dbce78c2c78947c3a893426deb21&units=metric#"

app.get("/", (req, res) => {

    https.get(URL, ( response) => {
        console.log(response.statusCode)

        response.on("data",(data)=>{
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp
            const icon="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"
            const weatherDescription= weatherData.weather[0].description
            console.log(temp+"   "+weatherDescription);
            res.write("<p>the weather is currently "+weatherDescription+"</p>");
            res.write("<h1>the temp in cairo is "+temp+"C</h1>");
            res.write("<img src="+icon+">")
            res.send();
        })
    })


    // res.send("server is up and running");
})







app.listen(3000,() => {
    console.log("running on port 3000")
})