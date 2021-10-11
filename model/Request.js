const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Request = new Schema({
  email:{
    type: String
  },
  type:{
    type: String
  },
  startDate:{
    type: String
  },
  endDate: {
    type: String
  },
  description: {
    type: String
  },
  confirm:{
      type:String
  },
  name:{
    type:String
}
}, {
  collection: 'request'
})

module.exports = mongoose.model('Request', Request)