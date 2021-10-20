const express = require('express');
const eventRoute = express.Router();

let Events = require('../model/Events');
 
// Add Event
eventRoute.route('/add-event').post((req, res, next) => {
  Events.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
    console.log(data);
  }
})
});


// Get all Events
eventRoute.route('/get-event').get((req, res) => {
    Events.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Event 
eventRoute.route('/read-event/:id').get((req, res) => {
    Event.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Event
eventRoute.route('/update-event/:id').put((req, res, next) => {
    Event.findByIdAndUpdate(req.params.id, {
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
eventRoute.route('/delete-event/:id').delete((req, res, next) => {
  
    Event.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = eventRoute;