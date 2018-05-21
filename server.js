//**ALSO TO RUN THE APP USE nodemon server.js TO THEN RUN IT FROM THE BROWSER

//installed npm express, using: npm install express@4.16.0 --save
//Express is used for apps on servers that can listen for requests from clients

// run: nodemon server.js -e js, hbs this will get nodemon to updats the js and hbs files
//when running

const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
//to run app on Heroku then the port variable will be set on their website
//but if its not set and we run the page locally then port = 3000
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

//middleware function
//have to call next in order for the rest of the functions to execute.
//next signals that the action is complete and the app can continue executing
app.use((request, response, next) => {
  var now = new Date().toString();
  //when the user requests the we page, the date is timestamped to the terminal
  //the request.method is an express api method. https://expressjs.com/en/4x/api.html#req.ips
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);

  fs.appendFile("server.log", log + "\n", (err) => {
    if(err){
      console.log("unable to append file server.log");
    }
  });
  next();
});

//set up middleware for maintenance.hbs file.
//because next() hasnt been called, the page will only display the
//maintenance text, as the rest of the code is unable to run until next() is called
// app.use((request, response, next) => {
//   response.render("maintenance.hbs");
// });

//make the /public/help.html page available to the server
//Enter: http://localhost:3000/help.html in the url to view the page
app.use(express.static(__dirname + "/public"));

//used in the footer.hbs file to dynamically adjust the year in the footer
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

//parses the string Welcome to Node Express to upper case. from the app.get function below
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
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
