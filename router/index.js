// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();
var Student = require('../model/Student')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
// // route middleware that will happen on every request
// router.use(function(req, res, next) {

//     // log each request to the console
//     console.log(req.method, req.url);

//     // continue doing what we were doing and go to the route
//     next(); 
// });
// Home page route.
router.get('/', function (req, res) {
    res.render('pages/index');
})
router.get('/admin', function (req, res) {

    Student.find({}, function(err, data) {
        // note that data is an array of objects, not a single object!
        res.render('pages/admin', {
           
            students: data
        });
    });
    // res.render('pages/admin',{
    //     user : "admin",
    //     practices: "admin"
    // });
})
// Home page route.
router.post('/Register', multipartMiddleware, function (req, res) {

   
    let root_path =path.dirname(require.main.filename || process.mainModule.filename) 
    var tmp_path = req.files.photo.path;
    let image_name=req.files.photo.name;
    console.log("name",image_name)
    
if(image_name != ""){
    var target_path = root_path + '/public/images/' + req.files.photo.name;
    fs.readFile(tmp_path, function (err, data) {
        if (err) throw err;
        console.log('File read!');

        // Write the file
        fs.writeFile(target_path, data, function (err) {
            if (err) throw err;
            
            console.log('File written!');
        });

    });
}
   

 let  data=Object.assign({}, req.body, {
    image_name: image_name
  })  
   const student = new Student(data);
   student.save()
   .then(() => { res.send('Thank you for your registration!'); })
   .catch((err) => { console.log(err);res.send('Sorry! Something went wrong.'); });
   
})
// About page route.
router.get('/about', function (req, res) {
  res.send('About this wiki');
})

module.exports = router;