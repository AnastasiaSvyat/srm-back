var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CVFile = new Schema({
  name:{
    type: String
  },
  imagePath:{
    type: String
  },
  idEmployee:{
    type: String
  },
}, {
  collection: 'CVFile'
})
module.exports = mongoose.model('CVFile', CVFile);