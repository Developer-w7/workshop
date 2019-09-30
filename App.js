var http = require("http");  
const express = require("express")
const connectDB = require('./Connection')
var Users = require('./model/User')
var routes = require('./router');
const server = express()
server.use(express.static('public'));
server.set('view engine', 'ejs');
/** connect to MongoDB datastore */
connectDB();
var chris = new Users({
  name: 'Chris',
  username: 'sevilayha',
  password: 'password' 
});
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
Users.find({name: 'Chris-dude'}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
});

server.listen(8081);  
// Console will print the message   
console.log('Server running at http://127.0.0.1:8081/');  