const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LogTime = new Schema({
    
  idEmployee:{
    type: String
  },
  month:{
    type: Number
  },
  monthString:{
    type: String
  },
  time:{
    type: Number
  },
}, {
  collection: 'logTime'
})

module.exports = mongoose.model('LogTime', LogTime)