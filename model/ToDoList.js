const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ToDoList = new Schema({
  task: {
    type: String
  },
  day:{
    type: String
  },
  email:{
    type: String
  },
  date:{
    type: String
  },
  week:{
    type: String
  },
  year:{
    type: String
  },
}, {
  collection: 'toDoList'
})

module.exports = mongoose.model('ToDoList', ToDoList)