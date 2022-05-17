const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LogTimeRequest = new Schema({
    
  idEmployee:{
    type: String
  },
  date:{
    type: String
  },
  counterUpdateDate:{
    type: String
  },
  year:{
    type: String
  },
  vacation:{
    type: Number
  },
  sickLeave:{
    type: Number
  },
}, {
  collection: 'LogTimeRequest'
})

module.exports = mongoose.model('LogTimeRequest', LogTimeRequest)