const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ToDoList = new Schema({
  task: {
    type: String
  },
  date:{
    type: String
  },
  email:{
    type: String
  }
 
}, {
  collection: 'toDoList'
})

module.exports = mongoose.model('ToDoList', ToDoList)