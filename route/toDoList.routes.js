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
toDoListRoute.route('/get-taskWeek').get((req, res) => {
  const matchСheck = {
    email : req.query.email,
    week: req.query.week,
    year: req.query.year
}
  var condition = matchСheck ? { week:  matchСheck.week, email:  matchСheck.email,year:matchСheck.year} : {};
  ToDoList.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
    });
    });
})

toDoListRoute.route('/get-taskTomorrow').get((req, res) => {
  const matchСheck = {
    email : req.query.email,
    day: req.query.day,
    year: req.query.year,
    month: req.query.month,

  }
  var condition = matchСheck ? { month:  matchСheck.month, day:  matchСheck.month, day:  matchСheck.email,year:matchСheck.year} : {};
  console.log('z',condition);
  ToDoList.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
    });
    });
})

toDoListRoute.route('/get-taskDate').get((req, res) => {
  const matchСheck = {
    day : req.query.day,
    email: req.query.email,
    year: req.query.year,
    month: req.query.month
    

  }

  var condition = matchСheck ? { month:  matchСheck.month, day:  matchСheck.day, email:  matchСheck.email, year:matchСheck.year} : {};
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
