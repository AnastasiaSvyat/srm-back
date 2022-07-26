const express = require('express');
const eventRoute = express.Router();

let Events = require('../model/Events');
var moment = require('moment')
var today = moment().format('YYYY-MM-DD');
var month = moment().format('YYYY-MM-31');

// Add Event
eventRoute.route('/add-event').post((req, res, next) => {


  req.body.date = moment(req.body.date).add(1, 'day').format('YYYY-MM-DD');
      
  Events.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// ALL Events
eventRoute.route('/events').get((req, res) => {
  Events.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

//Event Id
eventRoute.route('/event/:id').get((req, res) => {
  Events.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Later Events
eventRoute.route('/getEvent-Later').get((req, res, next) => {
  var month = moment().format('YYYY-MM-31');
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
  var today = moment().format('YYYY-MM-DD');
  console.log(today)
  Events.find({ date: { $eq: today } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

// eventSelect
eventRoute.route('/getEvent-Select').get((req, res) => {
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
  var today = moment().format('YYYY-MM-DD');
  var month = moment().format('YYYY-MM-31');
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
req.body.date = moment(req.body.date).add(1, 'day').format('YYYY-MM-DD');

  Events.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
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