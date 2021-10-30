const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Events = new Schema({
  name: {
    type: String
  },
  type:{
    type: String
  },
  date:{
    type: String
  },
  description: {
    type: String
  },
  day:{
    type: String
  },
  month:{
    type: String
  },
  year:{
    type: String
  },
}, {
  collection: 'events'
})

module.exports = mongoose.model('Events', Events)