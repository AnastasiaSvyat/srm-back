const express = require('express');
const app = express();
const toDoListRoute = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require("../database/db")
const errorHandler = require("../utills/errorHandler")

let ToDoList = require('../model/ToDoList');
 
// Add Event
toDoListRoute.route('/add-task').post((req, res, next) => {
    ToDoList.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
    console.log(data);
  }
})
});


// Get all Events
toDoListRoute.route('/get-task').get((req, res) => {
  const email = req.query.email
  var condition = email ? { email:  email} : {};
  console.log(email);
  console.log(condition);

  ToDoList.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
    });
    });
})

// Get Event 
toDoListRoute.route('/read-task/:id').get((req, res) => {
    ToDoList.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Event
toDoListRoute.route('/update-task/:id').put((req, res, next) => {
    ToDoList.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('event updated successfully!')
    }
  })
})

// Delete Event
toDoListRoute.route('/delete-task/:id').delete((req, res, next) => {
  
    ToDoList.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = toDoListRoute;