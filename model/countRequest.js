const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CountRequest = new Schema({
  idEmployee:{
    type: String
  },
  day:{
    type: Number
  },
  month:{
    type: String
  },
}, {
  collection: 'countRequest'
})

module.exports = mongoose.model('CountRequest', CountRequest)