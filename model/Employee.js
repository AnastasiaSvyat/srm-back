const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Employee = new Schema({
  name: {
    type: String
  },
  position:{
    type: String
  },
  birthday:{
    type: String
  },
  salary:{
    type: Number
  },
  phone:{
    type: Number
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  token: {
    type: String
  },
  role: {
    type: String
  }
}, {
  collection: 'employee'
})

module.exports = mongoose.model('Employee', Employee)