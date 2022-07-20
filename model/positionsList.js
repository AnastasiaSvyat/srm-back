const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PositionList = new Schema({
    
positionName:{
    type: String
},

}, {
  collection: 'positionList'
})

module.exports = mongoose.model('PositionList', PositionList)