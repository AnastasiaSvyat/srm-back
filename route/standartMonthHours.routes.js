const express = require('express');
const standartMonthHoursRoute = express.Router();
let StandartMonthHours = require('../model/standartMonthHours');

standartMonthHoursRoute.route('/getStandartHours').get((req, res) => {
  StandartMonthHours.findOne((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

standartMonthHoursRoute.route('/update-standartHours/:id').put((req, res, next) => {
  StandartMonthHours.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })

})

standartMonthHoursRoute.route('/add-standartHours').post((req, res, next) => {
  StandartMonthHours.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

module.exports = standartMonthHoursRoute;
