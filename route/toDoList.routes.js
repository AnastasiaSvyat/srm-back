const express = require('express');
const toDoListRoute = express.Router();
var moment = require('moment')
var today = moment().format('YYYY-MM-DD');
var week = moment().add(7, 'days').format('YYYY-MM-DD');
var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
let ToDoList = require('../model/ToDoList');

// Add Event
toDoListRoute.route('/add-task').post((req, res, next) => {
  req.body.date = moment(req.body.date).format('YYYY-MM-DD');
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
    email: req.query.email,
  }
  var condition = matchСheck ? { email: matchСheck.email, date: { $gt: tomorrow, $lte: week } } : {};
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
    email: req.query.email,
  }
  var condition = matchСheck ? { email: matchСheck.email, date: { $eq: tomorrow } } : {};
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
    email: req.query.email,
  }
  var condition = matchСheck ? { email: matchСheck.email, date: { $eq: today } } : {};
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
