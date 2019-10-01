var http = require("http");  
const express = require("express")
var bodyParser = require('body-parser')
const connectDB = require('./Connection')
var Users = require('./model/Student')
var routes = require('./router');
const server = express()
server.use(express.static('public'));
// parse application/x-www-form-urlencoded

 
// parse application/json
server.use(express.urlencoded());
server.use(express.json())
server.set('view engine', 'ejs');
/** connect to MongoDB datastore */
connectDB();
// var chris = new Users({
//   name: 'Chris',
//   username: 'sevilayha',
//   password: 'password' 
// });
// chris.dudify(function(err, name) {
//   if (err) throw err;

//   console.log('Your new name is ' + name);
// });
// chris.save().then(()=>{
// console.log('saved successfully')
// })
// index page 
// server.get('/', function(req, res) {
//   res.render('pages/index');
// });

server.use('/', routes);
// get all the users
// Users.find({name: 'Chris-dude'}, function(err, users) {
//   if (err) throw err;

//   // object of all the users
//   console.log(users);
// });
let port = 5000 || process.env.PORT
server.listen(port);  
// Console will print the message   
console.log('Server running at http://127.0.0.1:8081/');  