var express = require('express')
var app = express();
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname , '/public')));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
require("./controllers/burgers_controller.js")(app); // require and invoke all routes
 

 

let port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("listening on port: " + port)
})