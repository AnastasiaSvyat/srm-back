const express = require('express');
const eventRoute = express.Router();

let Events = require('../model/Events');
var moment = require('moment')
var today = moment().format('YYYY-MM-DD');
var month = moment().format('YYYY-MM-31');

// Add Event
eventRoute.route('/add-event').post((req, res, next) => {
  req.body.date = moment(req.body.date).format('YYYY-MM-DD');
  Events.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get Later Events
eventRoute.route('/getEvent-Later').get((req, res, next) => {
  Events.find({ date: { $gt: month } }).sort({ date: 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

// todayEvents
eventRoute.route('/getEvent-today').get((req, res) => {
  Events.find({ date: { $eq: today } })
    .then(data => {
      res.send(data);
      console.log('l',data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

// eventSelect
eventRoute.route('/getEvent-Select').get((req, res) => {
  console.log(req.query.date);
  Events.find({ date: { $eq: req.query.date } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

// monthEvents
eventRoute.route('/getEvent-month').get((req, res) => {
  Events.find({ date: { $gt: today, $lte: month } }).sort({ date: 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

// Update Event
eventRoute.route('/update-event/:id').put((req, res, next) => {
  EveEventsnt.findByIdAndUpdate(req.params.id, {
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
  Events.findByIdAndRemove(req.params.id, (error, data) => {
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