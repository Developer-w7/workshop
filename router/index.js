// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();
var Student = require('../model/Student')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var path = require('path');

router.get('/', function (req, res) {
    res.render('pages/index',{reg_no:"",students:null});
})
router.get('/search', function (req, res) {

    Student.find({}, function(err, data) {
        // note that data is an array of objects, not a single object!
        res.render('pages/search', {
           
            students: data
        });
    });
    
})
router.get('/students/', function (req, res) {

    Student.find({}, function(err, data) {
        // note that data is an array of objects, not a single object!
        res.render('pages/students', {
           
            students: data
        });
    });
   
})


router.get('/update/:id', (req, res) => {
    Student.find({registration_number:req.params.id}, (err, data) => {
        if (!err) {
            res.render('pages/index', {
           
                reg_no: req.params.id,
                students: data
            });
        }
        else { console.log('Error in employee delete :' + err); }
    });
});


router.get('/delete/:id', (req, res) => {
    Student.findOneAndRemove({registration_number:req.params.id}, (err, data) => {
        if (!err) {
            res.redirect('/students');
        }
        else { console.log('Error in employee delete :' + err); }
    });
})

router.get('/admin', function (req, res) {

    Student.find({}, function(err, data) {
        // note that data is an array of objects, not a single object!
        res.render('pages/admin', {
           
            students: data
        });
    });
  
})

router.post('/Find', function (req, res) {
    
let searchTerm  =req.body.search_term
console.log(searchTerm)
if(searchTerm != null){
    Student.find({registration_number :searchTerm}, function(err, data) {
        // note that data is an array of objects, not a single object!
        res.render('pages/students', {
           
            students: data
        });
    });
}else{
    res.send('Sorry! Something went wrong.'); 
}
    
 
})

router.post('/Register', multipartMiddleware, function (req, res) {

    if (req.body.reg_number == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);


   
})
insertRecord = (req, res) => {

    let registration_Number = Math.floor(Math.random() * (900000 - 100000) + 100000);
    let root_path =path.dirname(require.main.filename || process.mainModule.filename) 
    let tmp_path = req.files.photo.path;
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
    image_name: image_name,
    registration_number:registration_Number
  })  
   const student = new Student(data);
   student.save()
   .then(() => { res.render('pages/result', {
           message: 'Thank you for your registration!'
}); })
   .catch((err) => {res.send('Sorry! Something went wrong.'); });
}


updateRecord = (req, res) => {
    Student.findOneAndUpdate({ registration_number: req.body.reg_number }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.render('pages/result', {
                message: 'Successfully Updated!'
     })
        }
        else {
            console.log('Error Updating :' + err);
        }
    });
}

module.exports = router;