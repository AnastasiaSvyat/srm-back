const express = require('express');
const logTimeRoute = express.Router();
let LogTime = require('../model/logTime');

logTimeRoute.route('/logTimeEmployee').get((req, res) => {
  LogTime.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

logTimeRoute.route('/logTime').post((req, res, next) => {
  console.log(res);
  LogTime.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data);
      res.json(data)
    }
  })
});

logTimeRoute.route('/logTimeById').get((req, res) => {
  var condition = req.query.idEmployee ? { idEmployee: req.query.idEmployee, } : {};
  LogTime.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

logTimeRoute.route('/update-logTime/:id').put((req, res, next) => {
  LogTime.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

logTimeRoute.route('/getLogTimeCurrentMonth').get((req, res) => {
  const monthString = req.query.monthString
  var condition = monthString ? { monthString: monthString } : {};
  LogTime.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});

logTimeRoute.route('/getLogTimeSelectEmployeeCurrentMonth').get((req, res) => {
  const reqFilter = {
    monthString: req.query.monthString,
    idEmployee: req.query.idEmployee
  }
  var condition = reqFilter ? { monthString: reqFilter.monthString,  idEmployee: reqFilter.idEmployee, } : {};
  
  LogTime.findOne(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});

module.exports = logTimeRoute;
