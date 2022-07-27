const express = require("express");
const http = require("http");
const  bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.post("/",function(req,res){
  console.log(req.body.cityName);
  var query = req.body.cityName;
  var apikey = "cefe14e1ddb0d89f14c581478f24204b";
  var units = "metric" ;
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units;
  http.get(url , function(response){
      console.log(response.statusCode);

      response.on("data",function(data){
        var weatherData  =   JSON.parse(data);
        var  temp = weatherData.main.temp;
        var description = weatherData.weather[0].description;
        var icon = weatherData.weather[0].icon;
        var imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>the temperature in " + query + " is " + temp +" degress celsius</h1>");
        res.write("<h3>the weather description is " + description + "</p>");
        res.write("<img src = " + imgURL +">");
        res.send();

      });

  });
});

app.get("/",function(req , res){
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000,function(req,res){
  console.log("server running on port 3000");
});
