const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newschema = new Schema({
    name: {
        type: String,
        required: true, 
      },
    email: {
        type: String,
        required: true,
      }, 
    password: {
        type: String,
        required: true,
      },
})
const User = mongoose.model('User', newschema);
const Schemas = mongoose.Schema;
const blogschema=new Schemas({
   name: {
    type: String,
    required: true, 
  },
  img: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true, 
  },
  auth: {
    type: String,
    required: true, 
  },
  userid: {
    type: String,
    required: true, 
  },
});
const blog = mongoose.model('blog', blogschema);
module.exports={User,blog};