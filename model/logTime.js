const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LogTime = new Schema({
    
  idEmployee:{
    type: String
  },
  month:{
    type: Number
  },
  sumHours:{
    type: Number
  },
  monthString:{
    type: String
  },
  timeInProject:{
    type: Array
  },

}, {
  collection: 'logTime'
})

module.exports = mongoose.model('LogTime', LogTime)