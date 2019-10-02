var http = require("http");  
const express = require("express")
const connectDB = require('./Connection')
var Users = require('./model/Student')
var routes = require('./router');
const server = express()
var port = process.env.PORT || 8080;
// server.use(express.static(__dirname + '/public'));
server.use(express.static('public'));
// parse application/x-www-form-urlencoded

// parse application/json
//server.use(express.urlencoded());
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

server.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});