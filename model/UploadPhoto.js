var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UploadPhoto = new Schema({
  name:{
    type: String
  },
  imagePath:{
    type: String
  },
  email:{
    type: String
  },
}, {
  collection: 'uploadPhoto'
})
module.exports = mongoose.model('UploadPhoto', UploadPhoto);