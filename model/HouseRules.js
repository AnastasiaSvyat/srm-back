var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HouseRoles = new Schema({
  filePath:{
    type: String
  },
}, {
  collection: 'houseRoles'
})
module.exports = mongoose.model('HouseRoles', HouseRoles);