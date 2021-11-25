const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Image = new Schema({
  name: { 
      type: String
    },
  imagePath: { 
      type: String
    },
    email: { 
      type: String
    },
    },{
        collection: 'image'
});

module.exports = mongoose.model('Image', Image);