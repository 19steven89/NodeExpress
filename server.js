//**ALSO TO RUN THE APP USE nodemon server.js TO THEN RUN IT FROM THE BROWSER

//installed npm express, using: npm install express@4.16.0 --save
//Express is used for apps on servers that can listen for requests from clients

// run: nodemon server.js -e js, hbs this will get nodemon to updats the js and hbs files
//when running

const express = require("express");
const hbs = require("hbs");

var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

//make the /public/help.html page available to the server
//Enter: http://localhost:3000/help.html in the url to view the page
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});

//this allows us to set up handler for http request, and could resond by sending the
//html page
// here "/" is the root of the app, 2nd param is the arrow function
app.get("/home", (request, response) => {
  // response.send("<h1>Hello Express!</h1>");
  //render the home page so the data can be changed dynamically in home.hbs using node handlebars
  response.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMsg: "Welcome to Node Express!!"
  });
});

//using localhost:3000/about in the browser URL it will present the content below!
app.get("/about", (request, response) => {
  response.render("about.hbs", {
    pageTitle: "About Page",
  });
});

app.get("/bad", (request, response) => {
  response.send({
    error: "Unable to fulfill request"
  });
});

//3000 is the port number
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
