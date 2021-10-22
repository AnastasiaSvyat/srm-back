var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UploadFile = new Schema({
  name:{
    type: String
  },
  email:{
    type: String
  },
  uploaded:{ 
    type: Date, 
    default: Date.now 
  },

}, {
  collection: 'uploadFile'
})
module.exports = mongoose.model('UploadFile', UploadFile);