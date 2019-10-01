// grab the things we need

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var studentSchema = new Schema({
  user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
  name: String,
  age: String,
  dob:String,
  image_name:String,
  address: String,
  email: String,
  phone: String,
  course:String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }

  
});
studentSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 

  return this.name;
};
// the schema is useless so far
// we need to create a model using it
var Students = mongoose.model('User', studentSchema);

// make this available to our users in our Node applications
module.exports = Students;