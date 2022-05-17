const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Request = new Schema({
  idEmployee:{
    type: String
  },
  type:{
    type: String
  },
  date:{
    type: String
  },
  month:{
    type: String
  }, 
  endMonth:{
    type: String
  },
  endDate: {
    type: String
  },
  description: {
    type: String
  },
  confirm:{
      type:Boolean
  },
  decline:{
    type:Boolean
  },
  name:{
    type:String
}
}, {
  collection: 'request'
})

module.exports = mongoose.model('Request', Request)